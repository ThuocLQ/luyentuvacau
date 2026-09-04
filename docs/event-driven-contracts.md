# Event-Driven Microservices: Contract, Ownership và Reliability

## Quick Summary

- Event nói một việc đã xảy ra; command yêu cầu một service làm việc. Đừng gọi mọi message là event.
- Service phát event sở hữu dữ liệu và contract của event; service khác không đọc thẳng database của nó.
- Event giúp tách thời gian xử lý, đổi lại chấp nhận eventual consistency, duplicate delivery và cần reconciliation.
- Outbox bảo vệ việc lưu ý định publish cùng business state; consumer vẫn phải idempotent ở nơi tạo side effect.

## Terms

- **event**: business fact đã xảy ra, ví dụ `OrderCreated`.
- **command**: yêu cầu thực hiện việc, ví dụ `ReserveInventory`.
- **event contract**: schema và ý nghĩa mà producer cam kết cho consumer.
- **correlation ID**: ID nối các bước của một hành trình người dùng.
- **causation ID**: ID của message gây ra message hiện tại.
- **eventual consistency**: các read model/service khác sẽ cập nhật sau, không nhất thiết ngay lúc source commit.

## Mental Model: một Order có nhiều subscriber

```text
Order service
  → transaction: Order + Outbox
  → relay publish OrderCreated
       ├→ Inventory consumer giữ hàng
       ├→ Billing consumer tạo invoice draft
       └→ Notification consumer gửi email
```

Ba consumer có thể chạy ở tốc độ khác nhau và một consumer lỗi không nên làm Order transaction rollback. Đổi lại UI và operator cần nhìn thấy trạng thái nào còn `Pending`, message nào ở DLQ và ai chịu trách nhiệm reconcile.

## Event hay command?

| Dùng | Khi cần nói gì | Ví dụ |
|---|---|---|
| Event | fact đã xảy ra, nhiều subscriber có thể quan tâm | `OrderCreated`, `PaymentCaptured` |
| Command | một owner cụ thể cần làm việc | `ReserveInventory`, `GenerateInvoice` |
| Sync API/gRPC | caller cần câu trả lời trước khi đi tiếp | kiểm tra giá cuối hoặc validate quyền |

`OrderCreated` không phải mệnh lệnh “hãy gửi email”. Notification service tự quyết định có gửi hay không. Nếu business bắt buộc inventory phải trả lời trước khi confirm order, nói rõ synchronous boundary hoặc state `Pending`; đừng giả vờ event là transaction xuyên service.

## Practical Example: contract v1 sống cùng consumer cũ

```json
{
  "eventId": "evt-123",
  "eventType": "OrderCreated",
  "version": 1,
  "occurredAt": "2026-09-03T10:00:00Z",
  "orderId": "ord-42",
  "correlationId": "req-9"
}
```

Khi thêm field, ưu tiên field optional và tolerant reader: consumer cũ bỏ qua field nó chưa biết; producer mới vẫn phát payload consumer cũ hiểu. Không rename/xóa field bắt buộc hoặc đổi nghĩa field khi consumer cũ còn sống. Test compatibility với payload thật và replay có kiểm soát trước khi bỏ version cũ.

Payload chỉ chứa dữ liệu consumer thực sự cần. Không biến event thành bản sao toàn bộ schema database; điều đó khóa producer và consumer vào cùng data model. Nếu consumer cần dữ liệu mới, quyết định rõ: mang snapshot đủ dùng, gọi query contract, hoặc chấp nhận read model cập nhật trễ.

## Failure và vận hành

| Tình huống | Cách nghĩ đúng |
|---|---|
| Producer commit DB nhưng broker unavailable | Outbox giữ ý định; relay retry theo policy |
| Consumer crash sau side effect, trước ack | message có thể quay lại; dedupe/idempotency rồi mới ack |
| Payload sai schema hoặc vi phạm rule | phân loại non-transient, DLQ có owner/reason/replay runbook |
| Contract mới làm consumer cũ lỗi | dừng rollout hoặc phát version tương thích; không retry vô hạn |
| Một service chậm | theo dõi consumer lag, retry rate, DLQ age và state cần reconcile |

Dashboard nên nối `correlationId`, event ID, Outbox age, consumer lag, số retry/DLQ và business outcome. Chỉ nhìn broker “healthy” không nói Inventory đã giữ hàng hay invoice đã được tạo.

## Interview Answer

“Em chỉ dùng event cho fact đã xảy ra và để owner của dữ liệu publish contract của mình; service khác không đọc chung database. Em thêm `eventId`, business key, version, correlation ID và thời điểm xảy ra để trace và dedupe. Producer ghi business state với Outbox trong một local transaction. Consumer coi delivery là có thể trùng, persist kết quả/dedupe trước rồi mới ack. Khi đổi contract, em thêm field optional, test consumer cũ và có plan replay/reconciliation thay vì đổi payload phá vỡ âm thầm.”

## Follow-up

- Khi nào consumer nên gọi sync API thay vì chờ event?
- Nếu `OrderCreated` tới Billing hai lần, dedupe bằng event ID hay Order ID phụ thuộc side effect nào?
- Một event v2 đổi nghĩa tiền tệ: compatibility hay event type mới an toàn hơn?

## Final Recall

- Event là fact; command là yêu cầu làm việc.
- Data ownership và contract ownership đi cùng nhau.
- Outbox không tạo exactly-once end-to-end; consumer vẫn cần idempotency.
- Eventual consistency phải hiện ra ở UI, dashboard và reconciliation flow.
