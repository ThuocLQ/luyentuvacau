# Outbox và idempotency: giữ đúng khi message bị trùng hoặc bị mất

## Trong 30 giây

- Ghi database và gửi message là hai việc khác nhau; app có thể chết giữa hai việc.
- [[Transactional Outbox]] ghi thay đổi nghiệp vụ và ý định phát event trong cùng transaction local.
- Delivery thực tế thường at-least-once: message có thể đến lại; effect phải được chặn trùng ở consumer.
- Retry chỉ dành cho lỗi tạm thời, có giới hạn; message sai cần DLQ và owner.
- Theo dõi outbox age, publish lag, consumer lag, duplicate và đối soát.

## Gặp ở đâu ngoài đời?

Order đã commit, rồi process mất mạng trước khi phát `OrderCreated`; kho không reserve. Nếu phát event trước rồi transaction rollback, kho lại reserve một order không tồn tại. Đây là dual-write gap: hai hệ thống không cùng một transaction.

## Hiểu đơn giản trước

Database chỉ hứa giữ dữ liệu của chính nó. Broker hay payment provider là boundary khác. Outbox là “phiếu cần gửi” lưu cùng lúc với order. Worker gửi phiếu sau. Worker có thể chết sau khi gửi nhưng trước khi đánh dấu đã gửi, nên consumer phải coi event đến lại là bình thường.

## Từ cần biết

- [[Transactional Outbox]] (phiếu event lưu cùng transaction) — bảo vệ ý định phát event.
- [[Idempotency]] (chạy lại không thêm effect) — bảo vệ consumer/API boundary.
- [[Dead-letter queue]] (nơi cách ly message không tự khỏi) — cần owner và quy trình replay.
- **At-least-once** (có thể giao lại) — không phải “chắc chắn chỉ một lần”.

## Cách quyết định, từng bước

1. Trong transaction tạo Order, ghi outbox row gồm event ID, type, version, payload và correlation ID.
2. Relay claim/lease row để nhiều relay không cùng xử lý; chỉ đánh dấu đã phát sau khi broker xác nhận publish. Crash sau confirmation nhưng trước khi đánh dấu vẫn được phép phát lại.
3. Nếu effect là ghi database local, consumer lưu processed event ID hoặc unique business key trong cùng transaction với effect. Với HTTP/payment/email, local dedup không atomic với provider: dùng provider idempotency/reference rồi đối soát khi outcome chưa biết.
4. Chỉ retry timeout/5xx có khả năng hồi phục; dùng backoff, jitter và retry budget.
5. Message payload/schema sai vào DLQ; owner sửa rồi replay có kiểm soát.

## Chọn A hay B?

| Chọn | Khi dùng | Đổi lại |
|---|---|---|
| Gọi sync | Cần outcome ngay | Timeout lan và phụ thuộc availability |
| Outbox + event | Side effect có thể trễ/độc lập | Consumer trùng, lag, vận hành broker |
| Saga | Nhiều owner, có state trung gian rõ | Cần timeout, compensation/reconciliation |
| Không dùng event | Cùng owner và transaction local đủ | Ít tách thời gian hơn |

## Nếu có lỗi thì sao?

Publisher backlog tăng vì broker lỗi: không xóa outbox row. Báo alert theo age của row cũ nhất; giới hạn tốc độ phát để không làm database/broker quá tải. Nếu consumer đã ghi payment rồi crash, delivery sau phải bị dedupe bằng event ID hoặc payment reference, không charge lần nữa. Retention của processed-ID phải dài hơn cửa sổ replay và phù hợp vòng đời nghiệp vụ: xóa quá sớm cho phép event cũ tạo effect lại, giữ mãi thì tốn storage.

::: production-trap
“Broker bảo đảm exactly-once” không bảo vệ việc ghi database hoặc gọi API bên ngoài. Mỗi effect vẫn cần boundary idempotent của chính nó.
:::

## Chứng minh mình làm đúng

- Dashboard outbox age, publish failure, consumer lag, DLQ và duplicate rejection.
- Test crash ở ba điểm: trước commit, sau commit/trước publish, sau publish/trước ack.
- Replay một event cũ để chứng minh effect không nhân đôi.

## Nói trong phỏng vấn

“Em dùng outbox để order và ý định phát event cùng commit, nên không mất event vì crash giữa hai bước. Em không hứa exactly-once end-to-end: relay có thể phát lại, vì vậy event có ID/version và consumer dedupe trong transaction với effect. Retry chỉ cho lỗi tạm thời; payload lỗi vào DLQ có owner. Em theo dõi outbox age và consumer lag để biết dữ liệu đang chưa hội tụ.”

## Interviewer thường hỏi tiếp

### Outbox không giải quyết gì?

Nó không làm external API hay consumer exactly-once; cũng không tự xử lý schema, ordering, retry hay đối soát.

### Ordering cần ở mức nào?

Chỉ hứa theo key cần thiết, ví dụ `OrderId`. Thứ tự toàn hệ thống vừa đắt vừa thường không cần.

## Tự kiểm trước khi qua bài

- Process chết sau publish thì event được xử lý lại ra sao?
- Unique key nào bảo vệ effect của consumer?
- Alert nào cho bạn biết outbox đang kẹt?

## Nhớ một phút

- Outbox bảo vệ commit local; idempotency bảo vệ từng effect.
- Trùng và muộn là hành vi phải thiết kế, không phải sự cố hiếm.
- DLQ chỉ hữu ích khi có owner và replay được.
