# Messaging, Idempotency & Outbox

## Quick Summary

> **Nói đơn giản:** khi một việc đi qua database và message broker, cùng một thông điệp có thể được gửi lại. Vì vậy hãy thiết kế để xử lý lặp lại an toàn, thay vì hy vọng nó chỉ đến đúng một lần.

Giả định message có thể trễ, trùng và cần replay. Outbox làm state nội bộ với ý định phát event được ghi nguyên tử; tính đúng ở consumer vẫn cần idempotency, ack đúng chỗ và reconciliation.

## Terms to Know

- [[Transactional outbox]]: ghi state và event intent trong cùng local transaction.
- [[Idempotency]]: retry/replay không tạo business effect trùng.
- [[Ack point]]: chỉ xác nhận sau khi effect đã được ghi bền.
- [[Poison message]]: message lỗi vĩnh viễn, cần DLQ/runbook thay vì retry mãi.
- [[Reconciliation]]: đối chiếu để tìm state không hội tụ.

::: concept
“Exactly once” là claim theo từng boundary. Broker có thể hỗ trợ một phần, nhưng database update và payment provider vẫn cần semantics riêng.
:::

## Tình huống phỏng vấn

"Order đã commit nhưng event không đến consumer; hoặc consumer nhận cùng một event ba lần. Thiết kế thế nào để hệ thống vẫn đúng?"

Đừng hứa "exactly once" cho toàn bộ hệ thống. Qua process, database, broker và API bên thứ ba, thực tế cần giả định message có thể trễ, trùng, đảo thứ tự trong phạm vi nhất định hoặc cần replay.

## Mental model

Distributed system là nơi mạng, process và dependency có thể thất bại độc lập. Timeout chỉ nói rằng bạn chưa nhận được câu trả lời; nó không chứng minh thao tác chưa xảy ra. Hãy lưu state bền, có idempotency (làm lặp lại vẫn ra một kết quả) và có đường đối soát.

Một message flow đáng tin phải trả lời năm câu hỏi:

1. **Business key là gì?** Ví dụ `OrderId`, `PaymentAttemptId`, `ExecutionId`.
2. **State change và event intent được ghi ở đâu?** Có commit nguyên tử tại producer không?
3. **Delivery semantics là gì?** At-least-once, ordering theo partition/key hay không có ordering?
4. **Consumer làm effect idempotent thế nào?** Durable dedup record, unique invariant, hay upsert có version?
5. **Nếu lỗi/replay thì sao?** Retry, DLQ, reprocess, reconciliation và ownership của việc xử lý.

Tính đúng nằm ở business effect, không nằm ở việc broker ghi nhãn một message "exactly once".

## Transactional outbox

Dual-write xuất hiện khi code vừa commit database vừa publish broker: nếu một bước thành công, bước kia thất bại, state và event lệch nhau. Transactional outbox ghi thay đổi nghiệp vụ và "ý định phát event" vào cùng database transaction.

Relay đọc các outbox record chưa publish, publish lên broker rồi đánh dấu/ghi nhận đã publish bằng thao tác an toàn để có thể retry. Tùy broker và cách xác nhận, crash có thể làm relay publish lại trước khi kịp đánh dấu. Đó là expected behavior; consumer phải chịu duplicate.

Outbox **không** tạo exactly-once end-to-end, không tự sắp thứ tự toàn cục, và không thay thế monitoring. Nó đóng khoảng trống atomicity giữa local state và event intent.

## Idempotency ở producer, consumer và API

Idempotency cần khóa ổn định theo nghiệp vụ, scope đúng tenant/caller và nơi lưu bền:

- Với API create/payment: lưu idempotency key, fingerprint request, trạng thái xử lý và response cuối cùng cùng business effect. Replay cùng payload trả kết quả đã ghi; cùng key nhưng payload khác phải bị từ chối.
- Với consumer: lưu `MessageId`/business event identity trong transaction với effect, hoặc enforce effect bằng unique constraint/upsert/version. Dedup TTL phải dài hơn cửa sổ replay thực tế và có chiến lược archive nếu audit yêu cầu.
- Với external provider: dùng idempotency key của provider nếu có, đồng thời giữ mapping nội bộ và reconciliation; provider-side idempotency không thay thế audit của mình.

Chỉ cache message ID trong memory không sống sót sau restart hay scale-out.

## Ordering, retry và poison message

Ordering thường chỉ có ý nghĩa trong một partition hoặc một key. Nếu `OrderId` cần thứ tự, producer phải chọn key nhất quán và consumer phải hiểu phạm vi guarantee của broker. Không được giả định event từ hai topic/partition hay hai aggregate có global order.

Consumer nên kiểm tra version/sequence khi domain cần phát hiện stale event. Có thể buffer, bỏ qua hoặc reconcile tùy invariant; không cố "sửa" bằng retry vô hạn. Retry cần phân loại lỗi, deadline/budget, exponential backoff + jitter, số lần tối đa và observability. Message lỗi không khắc phục được đi vào DLQ/quarantine cùng lý do, payload an toàn và runbook để sửa/replay.

Một poison message retry mãi có thể chặn partition và biến sự cố nhỏ thành backlog lớn.

## Khi nào dùng sync, event hay saga

Gọi đồng bộ phù hợp cho quyết định người dùng cần biết ngay và dependency phải trả lời trong latency budget. Event phù hợp cho fact đã commit, fan-out, công việc có thể hội tụ dần. Đổi lại, event mang delayed visibility, duplicate, schema evolution và vận hành backlog.

Saga điều phối nhiều local transaction khi không có ACID xuyên service. Compensation là một business action mới, không phải nút undo kỹ thuật: có thể không đảo tuyệt đối nếu thế giới bên ngoài đã thấy effect. Xác định semantic lock/trạng thái pending, timeout, owner và reconciliation trước khi chọn saga.

## Vận hành và schema evolution

Theo dõi outbox oldest age/lag, publish failure, consumer lag, retry rate, DLQ age/count, dedup conflict và reconciliation mismatch. Correlation ID nối trace từ request đến outbox, broker và consumer; tránh log payload nhạy cảm.

Event là contract. Thêm field theo hướng backward compatible, consumer chịu được field lạ/thiếu theo schema, version hoặc topic khi thay đổi breaking; giữ replay test cho consumer trước khi deploy producer mới.

## Bẫy production

::: production-trap
Ack consumer trước khi persist effect có thể mất work khi process chết. Retry một unknown outcome với payment có thể double-charge.
:::

- Đánh dấu outbox đã gửi trước khi broker xác nhận có thể làm mất event.
- Ack consumer trước khi effect được lưu bền làm mất work khi process chết.
- "Kafka exactly once" không làm cuộc gọi payment provider hoặc email exactly once.
- Retry mọi exception che lỗi validation/schema và làm queue phình. Lỗi permanent cần quarantine và quyết định của người vận hành.

## Mẫu trả lời Senior

"Với `OrderId` là business key, em commit order và outbox record trong một local transaction. Relay có thể publish lặp sau crash, vì vậy consumer lưu event identity hoặc enforce unique business effect trong cùng transaction với update của nó. Ordering chỉ được kỳ vọng theo partition key `OrderId`; event stale được phát hiện qua version/sequence và đưa vào reconcile khi cần. Retry có budget, backoff, jitter và DLQ cho lỗi permanent. Em theo dõi outbox age, lag, retries, DLQ và mismatch để biết flow đang hội tụ, chứ không tuyên bố exactly once."

## Câu hỏi ôn phỏng vấn

### Transactional outbox giải quyết điều gì, và không giải quyết điều gì?

**Trả lời ngắn:** Nó ghi state change và event intent trong cùng local transaction, loại bỏ khoảng trống dual-write. Relay/consumer vẫn có thể retry và tạo duplicate; vì vậy cần consumer idempotent, replay và quan sát vận hành. Nó không bảo đảm global ordering hay exactly-once end-to-end.

**Follow-up:** Relay đánh dấu record lúc nào? Dedup record được giữ bao lâu và dựa vào đâu?

**Red flags:** "Publish xong thì update database"; "broker bảo đảm không có duplicate ở mọi nơi".

### Vì sao không retry toàn bộ workflow sau lỗi consumer?

**Trả lời ngắn:** Workflow có thể đã tạo external side effect. Em retry handler idempotent ở phạm vi đã biết, tách lỗi transient/permanent và dùng idempotency key hoặc reconciliation cho external boundary. Nếu không chắc effect trước đó, không được giả định retry là an toàn.

**Follow-up:** Message mất thứ tự theo `OrderId` thì handler quyết định gì? Khi nào chuyển DLQ?

**Red flags:** "Cứ retry đến khi thành công".

## Final recall

- Giả định duplicate, delay và replay; thiết kế business effect idempotent.
- Outbox làm local state + event intent nguyên tử, không tạo exactly-once toàn hệ thống.
- Ordering có scope theo key/partition; stale event cần domain decision.
- Retry, DLQ, reconciliation và telemetry là một phần của correctness.
