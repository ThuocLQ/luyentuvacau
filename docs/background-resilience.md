# Background job bền vững: không mất việc, không làm trùng việc

## Trong 30 giây

- `Task.Run` hay queue trong RAM không sống qua restart; việc quan trọng cần durable handoff.
- Job handler phải idempotent vì broker có thể giao lại.
- Ack/xóa job chỉ sau khi effect bền đã được ghi.
- Retry có điều kiện, deadline và budget; timeout external write thường cần query outcome trước.
- Bounded concurrency và circuit breaker bảo vệ dependency khi nó chậm.

## Gặp ở đâu ngoài đời?

API tạo invoice rồi chạy `Task.Run` để gửi email. App recycle ngay sau response: invoice có, email mất. Chuyển sang broker nhưng worker gửi email xong lại crash trước ack: lần giao lại gửi email lần hai. Hai lỗi khác nhau: mất việc và làm trùng việc.

## Hiểu đơn giản trước

Một background job an toàn có ba điểm: giao việc bền, xử lý có thể lặp và xác nhận đúng lúc. Broker chỉ giữ job; nó không hiểu email/payment đã tạo effect gì. Handler cần một ID ổn định và nơi ghi outcome để lần chạy sau biết phải làm tiếp hay dừng.

## Từ cần biết

- [[Durable queue]] (hàng đợi sống qua restart) — nơi giao việc quan trọng.
- [[Ack point]] (điểm xác nhận an toàn) — chỉ sau persistence/effect cần thiết.
- [[Circuit breaker]] (tạm ngừng gọi dependency lỗi) — bảo vệ capacity, không che lỗi.
- [[Backpressure]] (làm chậm/từ chối khi quá tải) — tốt hơn nhận vô hạn.

## Cách quyết định, từng bước

1. Request ghi business state và job/outbox trong transaction nếu job không được mất.
2. Worker nhận job, dùng job ID/idempotency key để kiểm tra effect đã có chưa.
3. Gọi dependency với timeout; phân loại lỗi tạm thời, lỗi vĩnh viễn và unknown outcome.
4. Ghi outcome bền, rồi mới ack. Crash bất kỳ lúc nào phải chạy lại an toàn.
5. Giới hạn concurrency theo capacity thật của database/partner; mở circuit khi partner liên tục lỗi.

## Chọn A hay B?

| Chọn | Khi dùng | Đổi lại |
|---|---|---|
| In-process `BackgroundService` | Việc có thể mất hoặc chỉ dọn dẹp nội bộ | Không durable qua crash/deploy |
| Durable queue | Email, invoice, sync đối tác, workflow quan trọng | Cần broker, retry, DLQ, vận hành |
| Retry | Lỗi tạm thời, effect idempotent | Có thể khuếch đại tải |
| Reconcile | Outcome external write chưa biết | Trễ hơn nhưng tránh duplicate |

## Nếu có lỗi thì sao?

Partner trả timeout sau khi nhận yêu cầu. Không retry ngay nếu không biết partner đã làm chưa: query bằng idempotency key/reference, hoặc cho reconciliation job xử lý. Job payload sai thì vào DLQ kèm lỗi và owner; đừng để retry vô hạn chiếm hết worker.

::: production-trap
Ack trước khi ghi outcome làm mất job khi process chết ngay sau ack. Ack sau outcome có thể giao lại; đó là lý do handler phải idempotent.
:::

## Chứng minh mình làm đúng

- Theo dõi queue depth, job age, success/failure, retry exhausted, DLQ và dependency latency.
- Test restart trước/sau external call và trước/sau ack.
- Cảnh báo khi concurrency chạm limit hoặc circuit mở quá lâu.

## Nói trong phỏng vấn

“Em không dùng `Task.Run` cho việc không được mất. Em lưu job bền, handler có job ID để delivery lại không tạo effect trùng, và chỉ ack sau khi outcome đã ghi bền. Retry chỉ cho lỗi tạm thời có budget; với timeout ở external write em query hoặc đối soát trước. Em giới hạn concurrency theo partner và theo dõi job age, DLQ để biết người dùng đang chờ ở đâu.”

## Interviewer thường hỏi tiếp

### BackgroundService có dùng được không?

Có, cho polling/dọn dẹp có thể khôi phục từ state bền. Nó không tự biến hàng đợi memory thành durable job queue.

### Tại sao không retry mọi exception?

Validation, auth hoặc payload sai không tự khỏi; retry chỉ làm tắc queue. Cần phân loại và DLQ/manual handling.

## Tự kiểm trước khi qua bài

- Nếu worker chết ngay sau external call, lần sau biết outcome bằng gì?
- Ack ở đâu và vì sao?
- Capacity nào quyết định số job chạy song song?

## Nhớ một phút

- Durable handoff, idempotent handler, ack sau outcome.
- Retry có điều kiện và giới hạn.
- Khi quá tải, bảo vệ dependency trước.
