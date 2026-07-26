# Async, Threading & Concurrency

## Quick Summary

Một endpoint gọi 2.000 API đối tác cùng lúc có thể làm chính nó chậm hơn: socket cạn, queue dài và retry chồng lên nhau. `async` không tạo thêm capacity; nó chỉ không giữ thread trong lúc đang chờ I/O.

::: concept
Nói đơn giản: `await` trả thread về cho server khi app đang chờ database hoặc network. Nhưng database và đối tác vẫn có giới hạn; phải chủ động giới hạn số việc chạy cùng lúc.
:::

## Terms to Know

- [[ThreadPool starvation]]: thread bị chặn/bận khiến request mới phải chờ.
- [[Bounded concurrency]]: chỉ chạy số việc mà dependency chịu được.
- [[Backpressure]]: khi consumer đầy, producer phải chờ, bị từ chối hoặc lưu việc bền vững.
- [[Durable queue]]: hàng đợi vẫn còn việc sau restart.

## Khi nào gặp

Code dùng `Task.WhenAll` trên danh sách lớn và có `.Result` để lấy kết quả. Khi đối tác chậm, thread bị block, connection pool cạn, các request sau xếp hàng. Thêm retry lúc này thường biến một lỗi chậm thành outage.

## Mental model

**I/O** là lúc app chờ network, database, file hoặc broker. `async`/`await` giúp thread không phải ngồi chờ I/O. Công việc CPU vẫn cần thread; chạy quá nhiều việc CPU vẫn làm ThreadPool bị đói.

**Concurrency** là nhiều việc cùng tiến triển. **Parallelism** là nhiều việc thật sự chạy cùng lúc. `Task.WhenAll` tạo concurrency nhưng không tự throttle. Vì vậy correctness phải đến từ giới hạn, cancellation và ownership của state.

## Cách xử lý theo thứ tự

1. Xác định dependency chịu được bao nhiêu concurrent request: DB connection, rate limit, CPU hoặc partition.
2. Dùng `await` xuyên suốt I/O; không gọi `.Result` hoặc `.Wait()` trong request.
3. Đặt giới hạn concurrency bằng `SemaphoreSlim`, bounded `Channel<T>` hoặc worker pool.
4. Truyền `CancellationToken` đến HTTP, EF Core, delay và worker để request bị hủy không tiếp tục chiếm tài nguyên.
5. Nếu việc không được mất khi restart, persist vào broker/job table; không dùng `Task.Run` trong HTTP request.

## Quyết định và trade-off

| Cách làm | Phù hợp khi | Giới hạn |
|---|---|---|
| `Task` + `await` | một I/O độc lập | không tự tạo queue hay throttle |
| `Task.WhenAll` | fan-out nhỏ, đã có bound | danh sách lớn tạo burst |
| `SemaphoreSlim` | giới hạn resource trong một process | không điều phối nhiều instance |
| Bounded `Channel<T>` | producer/consumer nội bộ | mất việc khi process chết nếu chưa persist |
| Broker/job table | email, billing, export, event phải sống qua restart | consumer phải idempotent và có DLQ |

## Bẫy production

::: production-trap
`Task.WhenAll` trên hàng nghìn item không phải throttling. Timeout hàng loạt rồi retry có thể bắn chết downstream.
:::

- `Task.Run` từ request mất việc khi process restart và có thể dùng scoped service đã dispose.
- Không giữ `lock` qua `await`; nếu cần phối hợp async, dùng primitive phù hợp và ownership rõ.
- `DbContext` không thread-safe: một context chỉ chạy một operation tại một thời điểm.
- Retry chỉ dành cho lỗi transient và operation có idempotency boundary.

## Kiểm chứng ở production

Theo dõi queue depth/age, active workers, timeout, downstream 429/5xx, retry exhaustion, ThreadPool queue length, thời gian chờ connection pool, p95/p99. Load test cả trường hợp dependency chậm và worker restart.

## Mẫu trả lời 45 giây

“`async` giúp không chặn thread khi chờ I/O, nhưng không làm DB hay đối tác có thêm năng lực. Với fan-out lớn, em lấy limit từ dependency, đặt bounded concurrency và truyền cancellation. Việc cần sống qua restart được persist vào queue; handler phải idempotent vì delivery có thể lặp. Em theo dõi queue age, timeout và retry exhaustion để biết giới hạn đã đúng chưa.”

## Câu hỏi phỏng vấn

### Vì sao `.Result` hoặc `.Wait()` nguy hiểm trong ASP.NET Core?

**Trả lời ngắn:** Chúng chặn thread trong lúc I/O đang chờ. Khi tải tăng, ThreadPool thiếu thread để chạy request và continuation, nên throughput giảm và latency tăng.

**Follow-up:** Khi nào sync-over-async chấp nhận được? Bạn giới hạn fan-out thế nào?

**Red flags:** “async luôn tạo thread”; “cứ tăng ThreadPool là xong”.

## Final recall

- `async` giải phóng thread, không tăng capacity downstream.
- Giới hạn concurrency theo tài nguyên thật và có backpressure khi đầy.
- Durable work cần persist, idempotency và retry có ngân sách.
