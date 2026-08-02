# Async và concurrency: làm nhiều việc nhưng không làm nghẽn hệ thống

## Trong 30 giây

- `async`/`await` giúp code chờ I/O mà không giữ luồng chạy chỉ để ngồi đợi. Nó không tạo thêm CPU, socket hay quota của đối tác.
- Concurrency là nhiều việc cùng đang tiến triển; parallelism là nhiều việc thực sự chạy cùng lúc trên CPU.
- Khi gọi dependency, giới hạn số việc chạy song song theo sức chịu thật của dependency. Đừng tạo hàng nghìn request rồi mới hy vọng retry cứu được.

## Gặp ở đâu ngoài đời?

Endpoint đồng bộ 2.000 đơn hàng với đối tác. Code tạo 2.000 HTTP call và đưa vào `Task.WhenAll` (chờ tất cả task cùng hoàn tất). Đối tác chỉ cho 40 call đồng thời, connection pool đầy, timeout tăng và các request khác cũng chậm theo.

Điều cần tối ưu không phải số task. Điều cần giữ là tốc độ làm việc mà database hoặc đối tác chịu được.

## Hiểu đơn giản trước

**Bản chất.** `await` tạm dừng phần còn lại của method cho tới khi `Task` hoàn thành. Nếu Task đang chờ I/O bất đồng bộ, code phục vụ request thường có thể trả quyền chạy để xử lý việc khác trong lúc chờ.

**Cơ chế.** Khi HTTP/database trả kết quả, phần sau `await` được lên lịch chạy tiếp. Chi tiết continuation chạy ở đâu tùy synchronization context và runtime; đừng hiểu `await` như một lời hứa “nhả đúng một ThreadPool thread”.

**Phạm vi.** Async hữu ích nhất cho I/O. Với CPU-bound work, CPU vẫn phải chạy code; tạo nhiều task hơn số core thường chỉ tăng chuyển ngữ cảnh. Trong ASP.NET Core, `.Result` và `.Wait()` thường không gây deadlock kiểu ASP.NET cũ, nhưng vẫn có thể block thread và dẫn tới ThreadPool starvation dưới tải.

**Đừng hiểu nhầm.** `Task.WhenAll` chỉ chờ các task đã tạo; nó không tự đặt giới hạn. `CancellationToken` là yêu cầu dừng, không thể thu hồi payment, email hay shipment đã tới hệ thống bên ngoài.

**Ví dụ nhỏ.** Đối tác cho tối đa 40 request đồng thời. Đặt giới hạn ở chỗ tạo call, bắt đầu gần 40, đo 429/timeout/queue rồi điều chỉnh. Nếu service restart không được mất đơn cần đồng bộ, lưu job bền trước; `Task.Run` từ request không làm việc đó.

## Từ cần biết

- **I/O-bound**: phần lớn thời gian chờ mạng, database hoặc file.
- **CPU-bound**: phần lớn thời gian dùng CPU để tính toán.
- **Bounded concurrency**: chỉ cho một số công việc chạy cùng lúc.
- **ThreadPool starvation**: không còn đủ thread rảnh để xử lý request hoặc continuation đúng lúc.

## Cách quyết định, từng bước

1. Gọi tên nút thắt: CPU, connection pool, rate limit của đối tác hay queue trong app.
2. Dùng API async xuyên suốt cho I/O. Tránh `.Result`, `.Wait()` và API block trong đường request nóng.
3. Đặt giới hạn gần nơi tạo work bằng worker pool, `Channel<T>` bounded hoặc `SemaphoreSlim`. Chọn số ban đầu từ quota/pool/load test, không từ cảm giác.
4. Truyền cancellation và deadline xuống HTTP, EF Core, delay và worker. Ghi riêng client hủy, timeout dependency và lỗi server.
5. Persist công việc không được mất qua restart. Handler phải chịu được việc job được giao lại và có đường kiểm tra unknown outcome nếu external write bị timeout.

## Chọn A hay B?

| Lựa chọn | Dùng khi | Đổi lại |
|---|---|---|
| `await` I/O async | HTTP, database, file có API async | cần truyền cancellation và xử lý lỗi bất đồng bộ |
| Bounded worker/queue | downstream có quota hoặc capacity rõ | việc có thể xếp hàng; cần theo dõi queue age |
| Parallel CPU có giới hạn | công việc tính toán độc lập, CPU còn headroom | cạnh tranh CPU nếu mở quá lớn |
| Durable queue/job | công việc không được mất qua restart | cần retry, idempotency và vận hành |
| `Task.Run` trong request | việc nhỏ, không quan trọng và hiểu rõ lifetime | không thay durable job, không biến sync I/O thành async |

## Nếu có lỗi thì sao?

Timeout sau khi gửi lệnh tạo shipment tạo ra **unknown outcome**: app chưa biết đối tác đã tạo shipment hay chưa. Đừng gửi lại ngay. Giữ trạng thái pending, tra theo request ID hoặc đối soát trước khi retry. Retry mù có thể tạo hai shipment.

Nếu queue tăng nhanh, xem concurrency, quota, error rate và tuổi job. Tăng thread hoặc retry mọi lỗi thường chỉ đẩy thêm tải xuống dependency đang nghẽn. Với payload sai hoặc lỗi quyền, đưa vào đường xử lý rõ thay vì retry vô hạn.

## Chứng minh mình làm đúng

Đo active calls, queue depth/age, 429, timeout, connection-pool wait, ThreadPool counters và p95/p99. Test restart khi job chưa xong, cancellation giữa I/O và trường hợp response bị mất sau external write.

## Nói trong phỏng vấn

“Em dùng `async` để thread không bị block trong lúc chờ database hoặc HTTP response. Cách này không làm downstream chịu được nhiều request hơn. Em tìm dependency đang quá tải, rồi giới hạn số call chạy cùng lúc dựa trên lỗi `429`, timeout và queue depth. Job không được mất phải được persist trước khi chạy. Nếu request đã gửi ra ngoài rồi timeout, em coi đó là `unknown outcome` và tra cứu trước khi retry.”

## Interviewer thường hỏi tiếp

- `Task.WhenAll` khác bounded concurrency ở điểm nào?
- Client hủy request sau khi app gửi payment thì state nào cần lưu?

## Tự kiểm trước khi qua bài

- Công việc của tôi chờ I/O hay dùng CPU?
- Giới hạn song song được suy ra từ capacity nào?
- Nếu process chết hoặc response mất sau external call, tôi xác minh kết quả bằng gì?

## Nhớ một phút

- Async giảm thời gian thread ngồi chờ, không tăng capacity downstream.
- Tạo ít việc hơn nhưng đúng sức chịu tốt hơn tạo thật nhiều task.
- Cancellation dừng việc đang chờ, không rollback side effect bên ngoài.
