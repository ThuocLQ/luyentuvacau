# Background Jobs, Resilience và Cache

## Quick Summary

- Việc quan trọng không được chỉ nằm trong RAM. App restart là việc biến mất.
- Broker hoặc queue có thể giao cùng một job hơn một lần, nên handler phải xử lý idempotent.
- Chỉ ack sau khi kết quả cần giữ đã được persist.
- Retry chỉ hợp lý với lỗi có thể tự hết; quá tải thì phải giảm concurrency và downstream load.

## Scenario: API trả 200 nhưng job bị mất

API tạo hoá đơn rồi trả `200`. Sau đó nó dùng `Task.Run` gửi email. Pod restart ngay sau response: hoá đơn đã có nhưng email không bao giờ được gửi.

Team chuyển sang broker (hệ thống chuyển job). Worker gửi email xong thì crash trước khi báo broker là đã xử lý. Broker giao lại job, khách nhận hai email. Một lỗi là mất việc; lỗi kia là làm trùng việc. Cần xử lý cả hai.

## Mental Model: accept, persist, process, ack

Một job đáng tin cần ba thứ: nơi persist job qua restart, cách xử lý lại mà không tạo thêm side effect, và ack point rõ. Broker chỉ biết có message; nó không biết email hay payment ở hệ thống khác đã thành công chưa.

**Idempotent handler** thường dùng job ID, event ID hoặc business key để nhận ra side effect cũ. Nếu handler gọi external API, provider cũng cần idempotency key hoặc status query theo operation ID.

## Terms

- [[Durable queue]]: queue vẫn giữ job sau khi app hoặc worker restart.
- **Ack**: lời xác nhận cho broker rằng worker đã xử lý message.
- **DLQ**: nơi cách ly message lỗi không tự hết để không làm nghẽn consumer.
- [[Backpressure]]: giảm tốc độ nhận hoặc chạy việc khi dịch vụ phụ thuộc đang quá tải.

## Cách quyết định, từng bước

1. Xác định việc nào có thể mất và việc nào không. Dọn cache có thể chấp nhận mất; email hoá đơn hoặc đồng bộ đối tác thường không.
2. Nếu không được mất, ghi trạng thái nghiệp vụ và bản ghi job/outbox trong cùng transaction database. App chết sau đó vẫn có bản ghi để worker nhận lại.
3. Mỗi job có ID ổn định. Trước khi tạo side effect, handler kiểm tra processed-job record hoặc business result theo ID đó.
4. Gọi dịch vụ phụ thuộc với timeout. Lỗi như `429` hoặc mất kết nối có thể thử lại có giới hạn; dữ liệu gửi sai hoặc không có quyền thì chuyển DLQ kèm lý do.
5. Lưu kết quả cần giữ, sau đó mới ack. Nếu crash sau ack mà trước khi lưu, job đã mất; nếu crash sau khi lưu mà trước ack, job có thể được giao lại nên handler cần idempotent.
6. Giới hạn số job chạy đồng thời theo sức chịu của database hay partner, rồi xem queue age và lỗi `429` để điều chỉnh.

## Operational Trade-off

| Lựa chọn | Nên dùng khi | Được gì | Đổi lại |
|---|---|---|---|
| `BackgroundService` trong app | polling hoặc việc có thể dựng lại từ persisted state | đơn giản, gần code ứng dụng | không tự làm job trong RAM sống qua restart |
| Durable queue | email hoá đơn, sync đối tác, workflow không được mất | worker chết vẫn làm lại được | cần theo dõi retry, DLQ và tuổi job |
| Retry | lỗi tạm thời và thao tác có `idempotency key` | tự hồi phục lỗi ngắn | retry mù có thể làm đối tác quá tải |
| Đối soát | gọi ra ngoài bị timeout, tạo unknown outcome | tránh tạo side effect trùng | kết quả đến chậm, cần trạng thái pending |

## Recovery và Reconciliation

Partner timeout sau khi có thể đã nhận lệnh. Đừng gửi lại ngay. Worker ghi trạng thái “chưa biết”, hỏi partner bằng request ID; nếu vẫn không biết thì đưa vào job đối soát. Người dùng thấy `pending` thay vì thấy kết quả sai.

Job có dữ liệu sai thì retry thêm không làm dữ liệu tự đúng. Đưa message vào DLQ, giữ correlation ID và lỗi, giao owner sửa dữ liệu hoặc code rồi mới replay có kiểm soát.

## Signals cần theo dõi

Test worker chết: trước external call, sau external call và trước/sau ack. Trong production theo dõi số job đang chờ, job chờ quá lâu, retry cạn, DLQ, số job đang chạy và thời gian phản hồi của partner. Alert khi job quan trọng chờ quá giới hạn nghiệp vụ, không chỉ khi queue có message.

## Interview Answer

“Với job không được mất, em dùng `durable handoff`: persist job và business state vào database hoặc message broker trước khi API báo nhận. Worker dùng job ID để xử lý idempotent và chỉ `ack` sau khi kết quả đã được lưu. Em chỉ retry lỗi tạm thời; external call bị timeout thì coi là unknown outcome và tra cứu trước. Em giới hạn concurrency theo capacity của đối tác, rồi theo dõi job age và DLQ để biết khách đang bị kẹt ở đâu.”

## Follow-up

- Crash sau khi gọi partner nhưng trước ack khác gì crash sau ack?
- Job nào trong hệ thống của bạn được phép bỏ khi quá tải, job nào không?

## Self-check

- App restart ở bất kỳ điểm nào thì job quan trọng còn ở đâu?
- Khi job được giao lại, mã nào cho biết side effect cũ đã có hay chưa?
- Lỗi nào retry được, lỗi nào phải chuyển cho người xử lý?

## Final Recall

- Job không được mất cần durable handoff trước khi API báo nhận.
- Persist kết quả rồi mới ack; message hoặc job được giao lại là bình thường.
- Retry không giải quyết unknown outcome của external call.
