# Messaging, Idempotency & Outbox

## Quick Summary

Khi ghi database rồi gửi message là hai việc riêng, app có thể chết giữa chừng: order đã có nhưng event không bao giờ được gửi, hoặc event gửi hai lần. Outbox ghi “việc cần phát” cùng transaction với dữ liệu; consumer vẫn phải chống xử lý trùng.

## Terms to Know

- [[Transactional Outbox]]: bảng event ghi cùng transaction với business state, rồi worker phát sau.
- [[Idempotency]]: cùng một yêu cầu/message chạy lại không tạo effect mới.
- [[Dead-letter queue]]: nơi giữ message lỗi cần điều tra thay vì retry mãi.

::: concept
At-least-once nghĩa là message có thể đến nhiều lần. Mục tiêu thực tế là effect nghiệp vụ chỉ xảy ra một lần theo ID ổn định.
:::

## Tình huống phỏng vấn

Order được commit, sau đó app mất mạng trước khi publish `OrderCreated`. Inventory không biết để reserve. Nếu publish trước rồi transaction rollback, inventory lại reserve một order không tồn tại. Đây là dual-write gap.

## Mental model

Database transaction chỉ bảo vệ dữ liệu trong database đó; broker và service khác là boundary khác. Vì vậy cần lưu intention phát event bền vững cùng state, rồi phát/retry riêng. Không có “exactly once” tự động xuyên database, broker và external provider.

## Transactional outbox

Trong transaction tạo order, ghi thêm outbox row có event ID, type, payload/version và thời gian. Relay (worker chuyên đọc và phát outbox) đọc row chưa phát, publish rồi đánh dấu; relay có thể crash sau publish nên event có thể bị phát lại. Consumer lưu processed ID hoặc dùng unique business key trong cùng transaction với effect để replay an toàn.

Outbox cần monitoring: age của row cũ nhất, số lần retry, lỗi publish và backlog. Nếu không, event mất chậm sẽ chỉ lộ ra khi khách phản ánh.

## Idempotency ở producer, consumer và API

API command dùng idempotency key theo caller + request fingerprint + outcome để retry client trả kết quả cũ. Producer dùng stable event ID (ID không đổi khi event được phát lại). Consumer không chỉ “log duplicate”: nó phải tránh ghi payment/ledger/email lần hai. Mỗi layer bảo vệ duplicate của chính boundary đó.

## Ordering, retry và poison message

Ordering chỉ có nghĩa trong một key/partition, ví dụ `OrderId`; không hứa thứ tự toàn hệ thống. Message cũ đến muộn phải được phát hiện bằng version/sequence hoặc state transition hợp lệ. Retry chỉ cho lỗi tạm thời, có backoff+jitter và giới hạn. Message lỗi dữ liệu cần vào DLQ cùng lý do, correlation ID và owner để sửa/replay.

## Khi nào dùng sync, event hay saga

Dùng sync khi response cần quyết định ngay. Dùng event cho side effect có thể trễ/độc lập, như notification. Dùng saga khi workflow qua nhiều owner có state trung gian và cách compensation/reconciliation rõ; không dùng saga để che một boundary chưa hiểu.

## Vận hành và schema evolution

Thêm field optional trước, giữ semantic cũ, version contract và chạy consumer cũ/mới cùng lúc. Payload phải có trace/correlation ID. Dashboard cần cho thấy publish lag, consumer lag, duplicate, DLQ và mismatch reconciliation.

## Bẫy production

::: production-trap
“Kafka đảm bảo exactly-once” không thay việc consumer, database và external API phải chịu replay/failure.
:::

- Xóa outbox row trước khi có bằng chứng publish/ack.
- Retry toàn bộ workflow gồm payment/email sau lỗi một consumer.
- Không có owner cho DLQ nên message chỉ nằm đó.

## Mẫu trả lời Senior

“Tôi dùng outbox để loại dual-write gap, nhưng coi delivery là at-least-once. Event có ID/version; relay và consumer được quan sát; consumer dedup/effect trong transaction local. Retry có budget, poison message vào DLQ và UI có trạng thái/reconciliation cho việc chưa hội tụ.”

## Câu hỏi ôn phỏng vấn

### Transactional outbox giải quyết điều gì, và không giải quyết điều gì?

Nó đảm bảo state change và ý định phát event cùng commit. Nó không làm consumer/external side effect exactly-once; idempotency và recovery vẫn cần.

### Vì sao không retry toàn bộ workflow sau lỗi consumer?

Các bước trước có thể đã thành công. Retry mù có thể charge/gửi email trùng; retry đúng message/operation idempotent và reconcile outcome khi chưa biết.

## Final recall

- Outbox bảo vệ commit local; idempotency bảo vệ từng boundary.
- Event duplicate, muộn và schema đổi là hành vi phải thiết kế trước.
- DLQ chỉ hữu ích khi có owner và quy trình replay.
