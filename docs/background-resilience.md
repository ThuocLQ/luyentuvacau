# Background Jobs, Caching & Resilience

## Quick Summary

Job chỉ nằm trong RAM sẽ mất khi app restart. Ghi job bền trước, worker xử lý lặp lại an toàn và chỉ retry lỗi tạm thời; cache là bản sao đọc nhanh, không phải dữ liệu gốc.

## Terms to Know

- [[Durable queue]]: hàng đợi còn dữ liệu sau restart.
- [[Retry budget]]: giới hạn số lần và thời gian retry.
- [[Unknown outcome]]: timeout nhưng chưa biết bên kia đã làm hay chưa.

::: warning
Timeout không chứng minh command thất bại. Với payment/external write, query hoặc reconcile trước khi retry.
:::

## Mental model

Request persist job/outbox rồi mới trả thành công khi contract yêu cầu. Worker claim job, làm effect idempotent và chỉ ack sau khi state an toàn. Cache cần TTL, key theo tenant, giới hạn size và fallback về source of truth.

## Retry, circuit breaker và backpressure

Retry chỉ cho timeout/429/5xx đã phân loại, có deadline và jitter. Khi downstream lỗi liên tục, giảm concurrency hoặc từ chối/buffer work; đừng tạo retry storm.

Ví dụ provider email trả lỗi liên tục. Nếu mọi worker vẫn gửi và retry, queue và provider đều quá tải. Circuit breaker là cơ chế tạm ngừng gọi dependency đang lỗi sau một ngưỡng, trả về fallback/đưa job vào trạng thái chờ; sau thời gian ngắn nó thử vài request để xem dependency đã hồi phục chưa. Dùng nó để bảo vệ tài nguyên, không để che lỗi vĩnh viễn.

Ví dụ worker đã gửi email rồi process chết trước khi đánh dấu hoàn tất. Khi job được giao lại, handler phải dùng delivery ID/idempotency key để provider hoặc database nhận ra đây là lần thử cũ. Chỉ ack/xóa job sau khi outcome bền đã được ghi; ack trước commit có thể làm mất job nếu app chết ngay sau đó.

## Bẫy production

- `Task.Run` từ request mất work khi recycle.
- Ack trước database commit làm mất message.
- Cache key thiếu tenant làm rò dữ liệu.
- Giữ transaction mở khi gọi HTTP gây lock dài.

## Final recall

- Durable handoff, idempotent handler, ack sau persistence.
- Retry có điều kiện và giới hạn.
- Cache không thay invariant của database.
