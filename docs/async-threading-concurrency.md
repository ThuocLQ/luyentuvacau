# Async và concurrency: đừng vượt sức chịu của dependency

## Trong 30 giây

- `await` nhả thread khi app đang chờ I/O; nó không làm database, socket hay đối tác có thêm capacity.
- Fan-out lớn cần **bounded concurrency** (giới hạn số việc chạy cùng lúc) theo dependency thực tế, không theo một con số đoán mò.
- `CancellationToken` là yêu cầu dừng công việc; nó không đảo ngược payment/email đã xảy ra.
- Việc không được mất qua restart phải được lưu bền trong job table hoặc broker; `Task.Run` từ request không phải durable queue.

## Gặp ở đâu ngoài đời?

Endpoint đồng bộ 2.000 đơn hàng với đối tác. Code dùng `Task.WhenAll`, đối tác chậm, socket/connection pool đầy và các request sau xếp hàng. Team thêm retry cho mọi timeout, rồi cả ứng dụng và đối tác cùng quá tải.

Mục tiêu không phải tạo thật nhiều task. Mục tiêu là hoàn thành công việc đúng, trong giới hạn mà dependency chịu được.

## Hiểu đơn giản trước

Với I/O như HTTP, database hay file, thread không cần ngồi chờ response. `await` cho thread quay lại ThreadPool để phục vụ việc khác; khi I/O xong, continuation sẽ được lên lịch chạy. Với CPU-bound work, CPU vẫn phải chạy code trên thread, nên mở thêm task không tạo thêm CPU.

**Concurrency** là nhiều việc cùng tiến triển; **parallelism** là nhiều việc thật sự chạy đồng thời trên CPU. `Task.WhenAll` chờ một nhóm task đã được tạo, nhưng không tự giới hạn số HTTP call hay query đã khởi động.

Trong ASP.NET Core hiện đại, `.Result`/`.Wait()` thường không bị deadlock kiểu SynchronizationContext như ASP.NET Framework cổ điển. Dù vậy chúng vẫn chặn ThreadPool thread khi I/O đang chờ; dưới tải, điều này làm queue tăng và throughput giảm.

## Terms to Know

- [[ThreadPool starvation]]: ThreadPool thiếu thread rảnh để chạy request hoặc continuation vì thread bị block/bận.
- [[Bounded concurrency]]: chỉ cho phép một số việc đồng thời, dựa trên capacity DB/partner/CPU.
- [[Backpressure]]: khi consumer đầy, producer phải chờ, bị từ chối hoặc lưu việc bền thay vì nhận vô hạn.
- [[CancellationToken]]: tín hiệu yêu cầu dừng; code và dependency phải hỗ trợ nó mới phản hồi được.

## Cách quyết định, từng bước

1. Xác định work là I/O-bound hay CPU-bound và dependency nào là nút thắt: DB connection, partner rate limit, CPU, partition.
2. Dùng async end-to-end cho I/O. Tránh `.Result`, `.Wait()` và gọi blocking API trong request path.
3. Đặt limit ở nơi tạo work: `SemaphoreSlim`, bounded `Channel<T>` hoặc worker pool. Chọn limit từ load test, quota hoặc pool size; đo rồi điều chỉnh.
4. Truyền cancellation vào HTTP, EF Core, delay và worker. Với deadline, phân biệt client hủy với timeout của dependency để log/metric đúng.
5. Persist work cần sống qua restart. Worker phải idempotent (xử lý lại không tạo effect mới) và chỉ ack sau khi outcome cần thiết đã được lưu bền.

## Chọn A hay B?

| Cách làm | Dùng khi | Được gì | Đổi lại / không dùng khi |
|---|---|---|---|
| `await` một I/O | một call có response cần ngay | không block thread | không tạo queue/capacity mới |
| `Task.WhenAll` có bound | vài I/O độc lập, đã throttle | giảm thời gian chờ tổng | tạo hàng nghìn task vẫn tạo burst |
| `SemaphoreSlim` | giới hạn resource trong một process | đơn giản, rõ ownership | không phối hợp limit giữa nhiều instance |
| bounded `Channel<T>` | producer/consumer nội bộ, có thể chờ/từ chối | backpressure trong process | dữ liệu mất khi process chết nếu chưa persist |
| broker/job table | email, billing, export, event không được mất | sống qua restart/scale-out | cần dedup, retry policy, DLQ/monitoring |

## Nếu có lỗi thì sao?

Timeout là **unknown outcome** với external write: đối tác có thể đã nhận command nhưng response chưa về. Không retry mù payment/email; dùng stable ID hoặc idempotency key, query/reconcile outcome trước khi tạo effect mới.

`lock` của C# không thể chứa `await`; compiler sẽ chặn ngay. Nếu thật sự cần loại trừ bất đồng bộ trong một process, dùng `SemaphoreSlim.WaitAsync`/`Release` với `try/finally`. Dù vậy, đừng giữ semaphore trong lúc gọi I/O chậm nếu có thể thiết kế lại boundary. `DbContext` cũng không thread-safe; một context không nên chạy nhiều operation đồng thời.

## Chứng minh mình làm đúng

Theo dõi queue depth/age, active worker, wait time của connection pool, downstream 429/5xx, timeout, retry exhausted, ThreadPool queue length và p95/p99. Load test cả dependency chậm, client cancel và worker restart. Limit đúng là limit giữ được SLO và không đẩy dependency qua quota, không phải limit cao nhất làm test local pass.

## Nói trong phỏng vấn

“`async` giúp server không giữ thread trong lúc chờ I/O, nhưng DB và partner vẫn có capacity hữu hạn. Với fan-out, em tìm quota/pool và đặt bounded concurrency tại nơi tạo work, đồng thời truyền cancellation. Nếu work cần sống qua restart, em persist vào queue và handler idempotent vì delivery có thể lặp. Em nhìn queue age, connection wait, timeout và downstream error để điều chỉnh limit.”

## Interviewer thường hỏi tiếp

- `Task.WhenAll` có throttle không? Bạn chọn limit 20 thay vì 200 dựa vào signal nào?
- Nếu client hủy request sau khi partner đã nhận command thì trạng thái nghiệp vụ và retry thế nào?

## Tự kiểm trước khi qua bài

- Tôi có phân biệt I/O-bound với CPU-bound và concurrency với parallelism không?
- Limit của tôi bảo vệ dependency nào, và metric nào báo limit sai?
- Work nào trong hệ thống phải sống sau restart?

## Nhớ một phút

- Async giải phóng thread, không tăng capacity downstream.
- Fan-out cần bound và backpressure; retry có điều kiện/budget.
- Cancellation không đảo external side effect; durable work cần persistence và idempotency.
