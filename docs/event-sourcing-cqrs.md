# Event Sourcing và CQRS: Audit, Projection và Consistency

## Quick Summary

- Event Sourcing lưu các domain event bất biến làm source of truth; state hiện tại được dựng lại từ event stream. Kafka topic không tự biến hệ thống thành Event Sourcing.
- CQRS chỉ là tách command/read concern. CQRS có thể dùng cùng database và không bắt buộc Event Sourcing.
- Event Sourcing hợp khi business history, audit và khả năng dựng lại state là yêu cầu thật; không phải mặc định tốt hơn CRUD.
- Projection/read model cập nhật async nên có lag, checkpoint, replay và reconciliation cần được thiết kế như production concern.

## Terms

- **event store**: nơi lưu event stream theo aggregate và là source of truth của Event Sourcing.
- **aggregate**: ranh giới domain bảo vệ invariant, ví dụ một Order hoặc Ledger account.
- **expected version**: version stream mà command dựa vào; append chỉ thành công nếu stream chưa bị ai đổi.
- **projection**: process đọc event để tạo read model/query view.
- **snapshot**: ảnh state tại một version để không replay toàn bộ stream mỗi lần load.
- **upcasting**: chuyển event version cũ sang shape mới khi đọc/replay.

## Mental Model: command không ghi state trực tiếp

```text
Command ConfirmOrder
  → load Order stream (hoặc snapshot + event sau snapshot)
  → kiểm invariant
  → append OrderConfirmed với expected version
  → projection cập nhật OrderReadModel
  → query đọc OrderReadModel
```

Command chỉ append event sau khi aggregate xác nhận quy tắc. State hiện tại là kết quả replay stream. Projection có thể chậm hơn stream vài giây, nên UI phải biết hiển thị `Pending`/version nào thay vì hứa read-your-write ở mọi màn hình.

## Khi nào đáng dùng?

| Dùng Event Sourcing khi | Không nên dùng mặc định khi |
|---|---|
| cần lịch sử business đầy đủ, audit, correction và dựng lại state | CRUD profile/catalog đơn giản, history không phải yêu cầu |
| rules theo aggregate và decision phụ thuộc chuỗi thay đổi | team chưa có khả năng vận hành projection/replay/versioning |
| ledger/order lifecycle cần giải thích “vì sao state thành như vậy” | read model phải đồng bộ tức thì ở mọi chỗ nhưng chưa có thiết kế consistency |

Ví dụ ledger dùng `MoneyCredited` và `MoneyDebited` để giữ facts/correction; không sửa xóa event cũ để “cho đẹp”. Một correction là event mới có ý nghĩa rõ. Nhưng database CRUD với audit log tốt có thể đơn giản và đúng hơn cho nhiều domain.

## Practical Example: optimistic concurrency

Hai command cùng load Order ở stream version 10. Cả hai cùng muốn append event. Chỉ command append với `expectedVersion = 10` thành công; command còn lại nhận conflict, reload stream rồi để business rule quyết định retry/merge hay báo lỗi. Không retry mù khi command có thể không còn hợp lệ.

```csharp
var order = await eventStore.LoadAsync<Order>(orderId, cancellationToken);
order.Confirm(); // kiểm invariant trong aggregate

await eventStore.AppendAsync(
    streamId: $"order-{orderId}",
    expectedVersion: order.Version,
    events: order.DequeueChanges(),
    cancellationToken);
```

Code là pseudocode. `expectedVersion` phải là version trước khi append; provider cụ thể có API khác nhau. Event store không tự publish integration event đúng cho mọi consumer — vẫn cần boundary/Outbox và contract rõ nếu event đi ra ngoài service.

## Projection, replay và event evolution

Projection phải có checkpoint/idempotency: process crash sau khi ghi read model nhưng trước checkpoint thì event có thể được đọc lại. Rebuild projection vào store/version mới rồi swap là an toàn hơn xóa read model production mù quáng.

Event đã là historical fact nên khó đổi. Trước khi đổi schema/ý nghĩa, chọn strategy: consumer chịu được optional field, upcast khi đọc, event type mới, hoặc migration/rebuild có kiểm soát. Cân nhắc PII retention ngay từ đầu: “event bất biến” không miễn trừ yêu cầu xóa/ẩn dữ liệu nhạy cảm.

Snapshot chỉ là optimization. Snapshot hỏng hoặc cũ phải có thể rebuild từ event stream; đừng biến snapshot thành source of truth thứ hai mà không có quy tắc recovery.

## Failure và consistency

- Projection lag: đo stream position/checkpoint age, cho UI trạng thái chờ hoặc query command side khi thật sự cần.
- Projection lỗi payload: dừng đúng projection, giữ event, sửa rồi replay có kiểm soát; không bỏ event để dashboard xanh lại.
- Event bị duplicate ở integration boundary: event store append có concurrency boundary riêng, nhưng consumer ngoài service vẫn cần idempotency.
- Invariant xuyên nhiều aggregate/service: Event Sourcing một aggregate không thay Saga, compensation hay reconciliation.

## Interview Answer

“Em chỉ chọn Event Sourcing khi business cần history và khả năng dựng lại state thật sự, như ledger hoặc order lifecycle có audit sâu. Em lưu event stream theo aggregate, append với expected version để chặn concurrent write, và projection tạo read model cho query. CQRS chỉ là tách đường command/read, không đồng nghĩa phải dùng Event Sourcing hay Kafka. Em chấp nhận projection lag nhưng theo dõi checkpoint, có replay strategy, event evolution và PII policy. Với CRUD đơn giản, em chọn transactional store và audit log vì dễ vận hành hơn.”

## Follow-up

- Người dùng vừa confirm Order nhưng read model chưa cập nhật: UI trả gì?
- Snapshot có thể xóa event cũ không? Vì sao?
- Khi nào audit log trên relational database đủ tốt hơn Event Sourcing?

## Final Recall

- Broker log và Event Sourcing không phải một thứ.
- CQRS không bắt buộc Event Sourcing.
- Expected version bảo vệ concurrent append; projection phải chịu replay và lag.
- Chọn Event Sourcing vì domain need, không vì muốn kiến trúc “xịn”.
