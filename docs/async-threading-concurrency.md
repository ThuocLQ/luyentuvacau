# Async, Threading & Concurrency

## Bài toán backend thực tế

Một endpoint đồng bộ 2.000 đơn hàng với đối tác. Phiên bản đầu gọi `Task.WhenAll` cho mọi đơn, rồi có chỗ dùng `.Result` để lấy kết quả. Khi đối tác chậm, ThreadPool bị block, connection pool cạn, request mới xếp hàng và retry lại làm downstream quá tải hơn.

Điều cần thiết kế không phải chỉ là "dùng `async`". Đó là giới hạn năng lực downstream, hành vi khi quá tải, cancellation, retry an toàn và ownership của state đồng thời.

## Mental model

`async`/`await` là mô hình compose công việc bất đồng bộ; nó không tự tạo thread. Khi await I/O, thread request được trả lại ThreadPool trong lúc chờ. Công việc CPU vẫn cần thread và nếu chạy quá nhiều vẫn gây starvation.

Concurrency là nhiều việc cùng tiến triển; parallelism là nhiều việc thực sự chạy cùng lúc. `Task.WhenAll` tạo concurrency, không tạo throttling. Correctness đến từ state ownership, cancellation và các bound rõ ràng.

## Invariants phải giữ

- I/O đi theo `await` từ đầu đến cuối; không chặn request thread bằng `.Result`/`.Wait()`.
- Mọi call có thể huỷ phải nhận và truyền tiếp `CancellationToken`: HTTP, EF Core, broker, delay và worker loop.
- Giới hạn concurrency theo tài nguyên thực: connection pool, rate limit đối tác, CPU, partition hoặc capacity DB.
- Không giữ `lock` qua `await`; state cần async coordination phải có ownership/primitive phù hợp.
- `DbContext` không thread-safe: một context chỉ có một operation tại một thời điểm.
- Retry chỉ lặp lại operation có idempotency boundary và còn trong deadline/time budget.

## Cách ra quyết định

| Primitive / pattern | Dùng khi | Trade-off / giới hạn |
|---|---|---|
| `Task` + `await` | Một kết quả I/O hoặc CPU-bound đã được schedule hợp lý | Không là hàng đợi bền vững và không tự giới hạn concurrency |
| `Task.WhenAll` | Số fan-out nhỏ, đã có bound hoặc downstream đủ capacity | Launch hàng nghìn task làm cạn socket/DB và mất kiểm soát overload |
| `SemaphoreSlim` | Throttle một resource xác định trong một process | Không tạo durability, fairness hay cross-process coordination |
| `Channel<T>` bounded | Producer/consumer nội bộ cần backpressure | Mất item khi process chết nếu chưa persist; cần policy đầy queue |
| Durable queue/broker | Công việc phải sống qua restart và retry | Consumer phải idempotent, có DLQ, visibility/ack và observability |
| `lock` | Bảo vệ state đồng bộ nhỏ, in-process | Không await bên trong; không dùng để điều phối hệ phân tán |

## Production traps

- Fire-and-forget `Task.Run` từ HTTP request làm exception biến mất, dùng scoped service đã dispose và mất việc khi process restart.
- `Task.WhenAll` không giới hạn trên danh sách lớn tạo burst đến partner API hoặc DB; timeout hàng loạt rồi retry tạo retry storm.
- Chỉ tăng ThreadPool để che `.Result`/blocking I/O: triệu chứng dịu tạm thời nhưng throughput vẫn kém và latency không ổn định.
- Dùng distributed lock cho mọi request làm hệ thống tuần tự hoá; thường cần unique constraint, optimistic concurrency hoặc partition ownership thay vì lock.
- Retry toàn bộ workflow gồm payment/email sau deadlock có thể tạo duplicate side effect.

## Kiểm chứng ở production

Mỗi giới hạn phải gắn với nguồn lực và metric.

- Theo dõi active workers, queue depth/age, throughput, retry count/exhaustion, timeout, downstream 429/5xx và p95/p99.
- Kiểm tra ThreadPool queue length, thread count và thời gian chờ connection pool khi có dấu hiệu starvation.
- Load test với downstream chậm/lỗi một phần: hệ thống cần backpressure hoặc shed load thay vì tăng task vô hạn.
- Diễn tập restart và graceful shutdown: worker dừng nhận việc mới, hoàn tất hoặc trả lại việc an toàn; redelivery không tạo bản ghi trùng.

## Mẫu trả lời 30–45 giây

"`async` giúp không giữ thread khi chờ I/O, nhưng không tăng capacity của DB hay partner API. Với fan-out lớn, tôi chọn bound dựa trên dependency, truyền cancellation và quan sát queue age, timeout, retry exhaustion. Nếu công việc phải sống qua restart, tôi persist vào queue và handler idempotent; `Task.Run` trong request không phải durable background job."

## Mẫu trả lời Senior 2 phút

"Để xử lý 100.000 job, tôi bắt đầu từ contract: job có cần sống qua restart không, thứ tự ở mức nào, dependency chịu bao nhiêu concurrent request và duplicate có gây tác hại gì. Nếu phải bền vững, request ghi intent/job vào storage hoặc broker trước khi acknowledge. Worker đọc có giới hạn, tạo scope cho mỗi item, truyền `CancellationToken` và chỉ ack sau khi business effect được persist an toàn.

Tôi không dùng `Task.WhenAll` không giới hạn. Ví dụ partner cho phép 20 concurrent calls thì throttle ở 20, queue bounded để producer nhận backpressure, và quyết định khi đầy là chờ, reject hay persist. Retry chỉ cho lỗi transient, có jitter, limit và deadline; write phải có idempotency key hoặc consumer dedup. Tôi theo dõi queue age, active work, timeout, retry exhaustion và DLQ, rồi test partner chậm và restart worker. Như vậy async được gắn với capacity, delivery guarantee và khả năng vận hành."

## Câu hỏi follow-up và red flags

### Vì sao `.Result` hoặc `.Wait()` nguy hiểm trong request ASP.NET Core?

**Ý chính:** Nó block ThreadPool thread trong lúc I/O đang chờ. Dưới tải, continuation bị chậm vì thiếu thread, throughput giảm và latency tăng. Dùng `await` end-to-end; không coi `ConfigureAwait(false)` là cách sửa blocking.

**Follow-up:** Khi nào sync-over-async có thể chấp nhận? Bạn chẩn đoán ThreadPool starvation bằng metric nào?

**Red flags:** "async luôn tạo thread mới", "tăng min threads là fix triệt để".

### Làm sao xử lý 100.000 jobs an toàn?

**Ý chính:** Durable handoff nếu cần survive restart; bounded consumers theo capacity; idempotent handler; ack sau persistence; retry có budget; metric queue age/failure/throughput.

**Follow-up:** Shutdown giữa chừng thì sao? Cần preserve ordering ở scope nào? Poison message xử lý thế nào?

**Red flags:** "`Task.Run` cho từng item", "retry mọi exception ba lần", "`WhenAll` tự throttle".

## Code / flow

```csharp
using var gate = new SemaphoreSlim(20);
await Task.WhenAll(items.Select(async item =>
{
    await gate.WaitAsync(ct);
    try
    {
        await client.SendAsync(item, ct);
    }
    finally
    {
        gate.Release();
    }
}));
```

Đoạn trên chỉ phù hợp khi `items` đã có kích thước hợp lý. Với stream rất lớn, dùng `Channel<T>` bounded hoặc durable broker để không tạo toàn bộ task cùng lúc.

## Final recall

- Async giải phóng thread khi chờ I/O; nó không tạo capacity và không làm CPU work miễn phí.
- Bound concurrency theo downstream, có overload policy và metric.
- Cancellation, idempotency, ack point và shutdown là một phần contract.
- Không block async, không giữ lock qua `await`, không chia sẻ `DbContext` đồng thời.
