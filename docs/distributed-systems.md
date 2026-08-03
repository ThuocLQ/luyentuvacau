# Messaging, Idempotency và Outbox

## Quick Summary

- Một lần xử lý nghiệp vụ có thể phải vừa lưu database, vừa báo cho hệ thống khác. Hai việc này không tự động thành một giao dịch chung.
- **Outbox** là bảng lưu “việc cần thông báo” cùng transaction *local* với dữ liệu nghiệp vụ trong cùng database.
- Worker đọc outbox rồi gửi message. Vì worker có thể gửi lại, bên nhận phải xử lý trùng an toàn.
- **Idempotency** nghĩa là cùng một yêu cầu nghiệp vụ được thực hiện lại nhưng không tạo thêm kết quả ngoài ý muốn.
- Outbox giảm nguy cơ quên gửi thông báo; nó không hứa message chỉ đến đúng một lần.

## Scenario: Order đã commit nhưng event chưa được publish

API tạo đơn hàng đã lưu Order thành công, nhưng ứng dụng tắt ngay trước khi gửi `OrderCreated`. Kho không biết để giữ hàng. Nếu ứng dụng gửi message trước rồi lưu Order thất bại, kho lại giữ hàng cho một đơn không tồn tại.

Vấn đề nằm ở khoảng trống giữa hai lần ghi: một lần vào database của Order, một lần vào broker (hệ thống chuyển message).

## Mental Model: Outbox giữ ý định, consumer giữ tính idempotent

Outbox là một “phiếu nhắc việc” nằm trong cùng database với Order. Khi tạo Order, ứng dụng ghi luôn phiếu `cần phát OrderCreated` trong cùng transaction local. Hoặc cả hai cùng được lưu, hoặc cả hai cùng không được lưu. Transaction này **không** bao gồm broker hay consumer.

Sau đó một worker gửi phiếu sang broker. Worker có thể gửi xong rồi chết trước khi đánh dấu phiếu đã gửi. Vì thế message có thể đến lần nữa. Bên nhận dùng `eventId` (mã duy nhất của event) hoặc mã nghiệp vụ duy nhất để nhận ra: “việc này tôi làm rồi”.

Outbox bảo vệ **ý định gửi** đã được lưu. Idempotency bảo vệ **kết quả cuối** không bị nhân đôi. Hai cơ chế giải quyết hai nửa khác nhau của bài toán.

## Message Flow

```text
Order API
  -> local transaction: [Order + Outbox record]
  -> Outbox relay
  -> message broker
  -> Inventory consumer
  -> local transaction: [Processed eventId + Reservation]
```

Hai transaction trong flow thuộc hai database khác nhau. Broker nằm giữa nên message có thể được publish hoặc deliver lại. `eventId` chỉ có tác dụng khi consumer persist processed-event record trong cùng transaction với side effect của chính consumer.

## Terms

- **Local transaction**: các thay đổi trong cùng database cùng commit hoặc rollback.
- **Message broker**: nhận message từ producer và chuyển cho consumer theo delivery contract đã cấu hình.
- **At-least-once** (có thể giao lại): tùy cách cấu hình giao nhận, xác nhận và lưu message của broker, cùng một message có thể được giao nhiều lần. Cần kiểm tra cam kết thật của broker đang dùng.
- **DLQ – dead-letter queue**: nơi cách ly message lỗi không tự hết để team kiểm tra, sửa và replay.
- **Reconciliation** (đối soát): so sánh dữ liệu giữa các bên để tìm và sửa chênh lệch.

## Cách quyết định, từng bước

1. Xác định dữ liệu nào phải cùng đúng. Ví dụ: Order và phiếu outbox phải cùng được lưu.
2. Trong một transaction, ghi Order và outbox row. Row nên có `eventId`, loại event, phiên bản nội dung, dữ liệu cần gửi và thời điểm tạo.
3. Worker lấy các row chưa gửi rồi phát sang broker. Nếu client/broker hỗ trợ publisher confirm hoặc acknowledgement phù hợp, chỉ đánh dấu theo mốc confirm đã chọn trong delivery contract. Mốc đó chưa mặc định có nghĩa consumer đã xử lý xong.
4. Bên nhận lưu `eventId` đã xử lý trong cùng transaction với thay đổi của nó, hoặc dùng một khóa nghiệp vụ duy nhất.
5. Với payment, email hay API ngoài, dùng `idempotency key` mà provider hỗ trợ. Nếu timeout tạo unknown outcome, tra cứu hoặc đối soát trước khi retry.
6. Chỉ tự thử lại lỗi có khả năng hết, như mất mạng ngắn. Lỗi dữ liệu hoặc sai phiên bản cần đưa vào DLQ và có người chịu trách nhiệm.

## Code: ghi business state và Outbox cùng transaction

```csharp
await using var tx = await db.Database.BeginTransactionAsync(ct);

var order = Order.Create(command.OrderId, command.CustomerId);
var message = new OutboxMessage(
    id: Guid.NewGuid(),
    type: "OrderCreated",
    aggregateId: order.Id,
    payload: JsonSerializer.Serialize(new { order.Id }),
    occurredAtUtc: clock.GetUtcNow());

db.Orders.Add(order);
db.OutboxMessages.Add(message);
await db.SaveChangesAsync(ct);
await tx.CommitAsync(ct);
```

Code chỉ bảo đảm `Order` và Outbox record cùng commit trong database này. Relay vẫn phải publish rồi đánh dấu theo delivery contract của broker; consumer vẫn phải xử lý duplicate. Không giữ transaction database mở trong lúc gọi broker.

## Delivery Trade-off

| Cách | Hợp khi | Cái giá phải trả |
|---|---|---|
| Gọi đồng bộ | Người dùng cần câu trả lời ngay | Hệ thống gọi bị phụ thuộc vào tốc độ và tình trạng của bên kia |
| Outbox + message | Việc sau có thể hoàn thành trễ một chút | Phải xử lý message trùng, theo dõi hàng đợi và độ trễ |
| Chỉ dùng transaction local | Mọi thay đổi nằm trong cùng database và cùng owner | Không giải quyết được việc gọi hệ thống ngoài |

## Nếu có lỗi thì sao?

Nếu broker ngừng hoạt động, các row outbox vẫn còn trong database. Khi broker hồi phục, worker gửi tiếp. Cần cảnh báo khi row cũ nhất nằm chờ quá lâu.

Nếu bên nhận đã cập nhật dữ liệu rồi ứng dụng tắt trước khi xác nhận message, broker sẽ giao lại. `eventId` đã lưu giúp bên nhận bỏ qua lần xử lý thứ hai.

Nếu gọi cổng thanh toán bị timeout, “không nhận được câu trả lời” chưa có nghĩa là “chưa trừ tiền”. Hãy tra cứu theo mã giao dịch trước khi thử charge lại.

::: warning
Không có một nhãn “exactly-once” nào tự bảo vệ toàn bộ chuỗi database → broker → API ngoài. Mỗi nơi tạo side effect phải có cách xử lý idempotent riêng.
:::

## Failure Injection và Signals

- Thử cho ứng dụng dừng ở ba điểm: trước commit, sau commit nhưng trước khi gửi, và sau khi gửi nhưng trước khi đánh dấu.
- Gửi lại cùng một `eventId` và kiểm tra dữ liệu chỉ thay đổi một lần.
- Theo dõi tuổi của row outbox cũ nhất, số lần gửi lỗi, độ trễ consumer và số message trong DLQ.
- Có màn hình hoặc quy trình để xem, sửa và phát lại message lỗi.

## Interview Answer

“Em ghi business state và Outbox record trong cùng local transaction, nên sau commit luôn còn record để relay publish event. Relay hoặc broker có thể deliver lại, vì vậy consumer persist event ID trong cùng transaction với side effect của nó. Với external API, em dùng idempotency key mà provider hiểu và chuyển timeout thành unknown outcome để query hoặc reconciliation. Em không hứa exactly-once end-to-end; em bảo vệ từng idempotency boundary.”

## Follow-up

### Outbox không giải quyết điều gì?

Nó không tự bảo đảm thứ tự message, không sửa message sai và không làm API bên ngoài trở thành idempotent. Nó chỉ bảo đảm: khi transaction nghiệp vụ đã commit, ý định phát message cũng đã được lưu.

### Có cần giữ thứ tự mọi message không?

Thường chỉ cần giữ thứ tự trong cùng một đối tượng, chẳng hạn các event của cùng `OrderId`. Ép toàn hệ thống có một thứ tự duy nhất rất tốn kém và ít khi cần.

## Self-check

- Ứng dụng chết sau khi gửi nhưng trước khi đánh dấu thì điều gì xảy ra?
- Khóa nào ngăn cùng một payment hoặc email được tạo hai lần?
- Bạn biết outbox đang kẹt bằng tín hiệu nào?

## Final Recall

- Outbox record và business state cùng commit trong local transaction.
- Consumer phải xử lý idempotent tại nơi tạo side effect.
- Duplicate hoặc delayed message là failure mode phải thiết kế trước.
