# Finance/Securities: Order, Ledger và Reconciliation

## Quick Summary

- Với sản phẩm có yêu cầu audit hoặc quy định, hệ thống cần giữ event history, state transition và audit trail; ghi đè dễ làm mất bằng chứng.
- Lệnh đặt, khớp lệnh, số dư tiền/chứng khoán và thanh toán là các khái niệm khác nhau.
- Một lệnh có thể khớp nhiều lần; yêu cầu hủy chỉ nhắm phần còn mở, nhưng có hiệu lực theo xác nhận và quy tắc của venue.
- Mọi message từ sàn hoặc đối tác có thể đến trùng, muộn hoặc sai thứ tự.
- Với luồng có nguồn ngoài như sàn hoặc ngân hàng, đối soát là bước vận hành cần thiết để phát hiện chênh lệch, không phải việc dọn dẹp tùy chọn.

## Scenario: partial fill rồi cancellation

Khách đặt mua 1.000 cổ phiếu. Sàn báo khớp 300, sau đó khách hủy. Một message khớp thêm 200 đến muộn. Nếu hệ thống coi “đã hủy” là xóa cả lệnh, số lượng sở hữu và tiền sẽ sai. Cần giữ từng execution (lần khớp) và tính phần còn mở từ các sự kiện đã xác nhận.

## Mental Model: Order, Execution, Ledger và Settlement

**Order** là ý định mua hoặc bán. **Execution/fill** là bằng chứng một phần lệnh đã thực sự khớp. **Settlement** là quá trình hoàn tất chuyển tiền và tài sản sau giao dịch.

Không nên chỉ giữ một con số `filledQuantity` rồi ghi đè. Hãy lưu từng execution có mã duy nhất, sau đó tính tổng đã khớp. Hủy lệnh đóng phần chưa khớp; nó không xóa các execution đã xảy ra.

Ledger (sổ cái) nên ghi các bút toán mới để điều chỉnh thay vì sửa mất bút toán cũ. Nhờ vậy hệ thống có thể giải thích số dư được tạo ra từ đâu.

## Terms

- **Order** (lệnh): yêu cầu mua hoặc bán với điều kiện cụ thể.
- **Execution/fill** (lần khớp): phần giao dịch đã được sàn xác nhận.
- **Open quantity** (khối lượng còn mở): phần lệnh chưa khớp và chưa hủy.
- **Order state machine**: các state hợp lệ của Order và điều kiện để chuyển state.
- **Settlement** (thanh toán giao dịch): hoàn tất chuyển tiền và chứng khoán giữa các bên.
- **Ledger** (sổ cái): chuỗi bút toán làm căn cứ tính số dư và kiểm tra lịch sử.
- **Reconciliation** (đối soát): so sánh dữ liệu nội bộ với sàn, ngân hàng hoặc đơn vị lưu ký.

## OMS Flow: Order đi từ client tới exchange gateway

```text
Client
  -> Order API
  -> message broker / Kafka
  -> Order Processing Service
  -> Exchange Gateway
  -> status events / executions
  -> Order Processing Service
  -> Order read model
```

- `orderId` nội bộ theo Order xuyên suốt flow; ID hoặc sequence do venue cấp được lưu riêng, không thay thế ID nội bộ.
- `Event ordering` thường chỉ cần đảm bảo trong scope của cùng order hoặc partition key đã chọn. Không mặc định toàn bộ event của hệ thống có một global order.
- Duplicate event được chặn bằng event ID hoặc venue execution ID. Partial fill được persist thành từng execution; tổng filled quantity là projection từ các execution hợp lệ.
- Cancellation là request đóng phần còn open. Nó không xóa execution đã xảy ra và chỉ có hiệu lực theo status/event mà venue trả về.
- Order Processing Service sở hữu Order state và database của nó; Exchange Gateway sở hữu protocol mapping cùng connection state. Không để hai service cùng ghi trực tiếp một Order row.
- Reconciliation so sánh Order/execution nội bộ với report hoặc status từ venue để phát hiện event mất, duplicate, mapping sai hoặc correction.

Đây là flow generic để thảo luận ownership và failure. Delivery guarantee, field, state và cancellation rule cụ thể phải theo contract của broker, gateway và venue đang tích hợp.

## Bank Gateway Flow: timeout, callback và reconciliation

```text
Internal System
  -> Bank Gateway
  -> Bank
  -> status query hoặc callback
  -> Bank Gateway
  -> scheduled reconciliation
```

- Mỗi operation có `transaction reference` ổn định. Khi bank hỗ trợ, dùng idempotency key để retry không tạo thêm transfer.
- Timeout sau khi gửi tạo `unknown outcome`: hệ thống chưa biết bank đã nhận hoặc ghi nhận giao dịch chưa. Giữ state `PendingVerification` và query status theo transaction reference trước khi retry.
- Callback có thể đến trùng hoặc đến sau status query. Consumer persist callback/event ID hoặc business key trong cùng transaction với state transition để xử lý idempotent.
- Scheduled reconciliation so sánh state nội bộ với statement/status phía bank và tạo case có owner khi lệch.
- Audit trail lưu request metadata cần thiết, state transition, actor/system, timestamp và reconciliation decision; không log secret hoặc dữ liệu nhạy cảm ngoài policy.

Flow không khẳng định SLA, callback guarantee hay state machine của một bank cụ thể. Những điểm đó phải được xác nhận từ contract chính thức của integration.

## Lifecycle và Ownership Checklist

1. Vẽ sơ đồ trạng thái của Order và quy tắc chuyển trạng thái; không dùng một cờ `isDone` cho mọi kết quả.
2. Lưu mỗi execution theo mã từ venue (sàn/đối tác). Unique constraint là luật database không cho hai dòng có cùng venue + execution ID, nên một fill đến lại không được ghi hai lần.
3. Không dùng một công thức `open quantity` cho mọi venue. Tính phần còn mở theo quy tắc trạng thái, thời điểm có hiệu lực và thứ tự sequence do venue cung cấp; phải xử lý cả cancel/replace/fill đến muộn theo hợp đồng của venue đó.
4. Ghi tiền và chứng khoán bằng bút toán có tham chiếu tới nghiệp vụ; sửa sai bằng bút toán đảo/điều chỉnh có lịch sử.
5. Tách trạng thái giao dịch khỏi trạng thái settlement vì thời điểm và `data ownership` (nơi có quyền quyết định, ghi dữ liệu) khác nhau.
6. Chạy đối soát định kỳ và theo sự kiện; chênh lệch phải có hàng xử lý, mức độ ưu tiên và người chịu trách nhiệm.
7. Mọi thay đổi nhạy cảm cần audit trail: actor/system nào thực hiện, timestamp, state trước/sau, correlation ID và lý do.

## Ledger và Projection Trade-off

| Cách lưu | Hợp khi | Rủi ro |
|---|---|---|
| Ghi đè số tổng | Dữ liệu không cần audit và có thể tái tạo dễ | Mất history, khó xử lý message muộn hoặc correction |
| Lưu từng sự kiện/bút toán | Tiền, tài sản và lịch sử phải giải thích được | Nhiều dữ liệu hơn, cần projection (bản dữ liệu đọc nhanh) |
| Tính số dư trực tiếp từ mọi event | Quy mô nhỏ hoặc dùng để kiểm tra | Chậm khi dữ liệu lớn |
| Giữ snapshot/projection | Cần đọc nhanh | Phải chứng minh snapshot khớp với ledger nguồn |

## Failure và Reconciliation Cases

Nếu execution đến trùng, unique key theo venue + execution ID khiến lần ghi thứ hai không tạo thêm khối lượng. Nếu execution đến sau cancellation, không suy luận chỉ từ thứ tự message đến. Lưu message, sequence/thời điểm có hiệu lực của venue rồi áp dụng quy tắc venue để biết fill đó hợp lệ trước hay sau cancel; trường hợp không quyết được phải vào hàng đối soát.

Nếu số dư nội bộ lệch với đối tác, không tự động “chỉnh cho bằng” mà không lưu lý do. Tạo case đối soát, giữ bằng chứng hai phía và dùng bút toán điều chỉnh được phê duyệt.

::: warning
Quy tắc thật về trạng thái lệnh, settlement, làm tròn, ngày giao dịch và báo cáo phụ thuộc thị trường, sản phẩm và quy định. Cần xác nhận với chuyên gia domain/compliance trước khi triển khai production.
:::

## Invariant Tests và Audit Evidence

- Test partial fill, duplicate fill, fill đến muộn, cancel và correction.
- Kiểm tra tổng debit và credit theo quy tắc ledger luôn cân bằng.
- Có báo cáo chênh lệch và thời gian xử lý đối soát.
- Có thể truy từ số dư về từng bút toán và nguồn sự kiện.

## Interview Answer

“Em tách Order khỏi execution: Order là intent, còn mỗi execution là fact đã xảy ra và có ID riêng. Cancellation chỉ áp dụng cho open quantity theo status mà venue xác nhận; nó không xóa partial fill đã có. Mỗi execution ID được bảo vệ bằng unique constraint để duplicate event không cộng quantity lần hai. Tiền và tài sản đi qua ledger có audit trail; correction tạo entry mới thay vì sửa mất lịch sử. Vì event có thể đến muộn hoặc thiếu, hệ thống còn cần reconciliation với source bên ngoài.”

## Follow-up

### Khi nào trả lại buying power (sức mua còn có thể dùng)?

Phụ thuộc quy tắc sản phẩm và thị trường. Về mô hình, chỉ giải phóng phần đã hủy hoặc không còn bị giữ theo trạng thái được xác nhận; không lấy “order cancelled” để xóa cả phần đã khớp.

### Vì sao cần cả ledger và đối soát?

Ledger giữ lịch sử nội bộ có thể kiểm toán. Đối soát phát hiện khi dữ liệu nội bộ khác bằng chứng của hệ thống ngoài do message mất, mapping sai, correction hoặc lỗi vận hành.

## Self-check

- Order, execution và settlement khác nhau ở điểm nào?
- Message fill trùng bị chặn bởi khóa nào?
- Khi hai nguồn lệch nhau, ai xử lý và lịch sử được giữ ra sao?

## Final Recall

- Order là intent; execution là fact đã xảy ra.
- Cancellation không xóa partial fill đã có.
- Tiền và tài sản cần ledger, audit trail và reconciliation flow.
