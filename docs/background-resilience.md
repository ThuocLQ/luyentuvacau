# Background Jobs, Caching & Resilience

## Khi nào gặp

Chủ đề này được hỏi khi một request cần gửi email, export report, gọi đối tác, xử lý event, hoặc khi hệ thống chậm/chập chờn dưới lỗi downstream. Mục tiêu không phải là “thêm retry”, mà là bảo toàn dữ liệu, không khuếch đại sự cố và biết khi nào dừng.

## Mental model

Request process, background worker, database và downstream service là các failure domain độc lập. Process có thể chết bất kỳ lúc nào; network có thể timeout dù downstream đã làm xong; message có thể đến nhiều lần và không theo thứ tự. Vì vậy một job đáng tin cậy cần state bền vững, acknowledgement sau khi state an toàn, handler idempotent, retry có giới hạn, và quan sát được.

Cache là bản sao có kiểm soát, không phải source of truth. Nó chỉ giúp latency/throughput khi có key, TTL, invalidation, giới hạn kích thước và phương án hoạt động khi cache mất.

## Câu trả lời 60 giây

“Tôi không dùng `Task.Run` hoặc in-memory queue cho công việc phải sống qua restart. Request sẽ persist command/outbox hoặc job state trước, worker lấy việc theo lease, thực thi handler idempotent và chỉ acknowledge sau khi side effect an toàn. Retry chỉ dành cho lỗi transient đã phân loại, có timeout, exponential backoff, jitter, giới hạn attempt và dead-letter/alert. Với cache, tôi dùng cache-aside cho read-heavy data, TTL và invalidation rõ ràng; dữ liệu correctness-critical vẫn kiểm ở database/source of truth. Tôi theo dõi queue age, retry rate, DLQ, dependency latency và saturation để biết hệ thống đang chậm hay đang mất dữ liệu.”

## Must remember

- `BackgroundService` quản lý lifecycle của process, không làm in-memory work trở nên durable.
- Dùng broker hoặc database job table cho work cần survive restart; persist trước khi trả success cho client khi business contract yêu cầu.
- At-least-once delivery là trạng thái bình thường. Handler phải chịu duplicate bằng idempotency key, inbox/dedup table hoặc invariant database.
- Timeout là ngân sách thời gian, không phải bằng chứng downstream thất bại. Retry có thể tạo duplicate.
- `CancellationToken` dừng nhận work mới và cho shutdown graceful; không hủy bừa operation đã commit một phần.

## Thiết kế job durable

Job record tối thiểu có identity, payload/version, trạng thái, attempt, schedule time, lease owner/expiry, idempotency key, correlation ID và lỗi đã chuẩn hóa. Worker claim atomically bằng lease có expiry để process chết không giữ job mãi. Heartbeat/lease renewal chỉ dùng cho task dài và cần giới hạn.

Handler nên chia boundary: đọc/claim → làm local transaction idempotent → gọi external service có idempotency key nếu hỗ trợ → persist kết quả/next action. Không giữ database transaction mở trong lúc chờ HTTP lâu. Nếu phải publish event sau state change, dùng transactional outbox thay vì dual write.

Shutdown: dừng nhận job mới, cho job đang chạy một thời gian grace period, checkpoint state nếu có thể, rồi để lease hết hạn cho worker khác. Đừng acknowledge trước khi handler bền vững.

## Retry, circuit breaker và backpressure

Retry chỉ có ý nghĩa với lỗi transient như reset connection, `429`, hoặc `5xx` có policy rõ. Không retry validation, authorization, malformed input hoặc business rejection. Mỗi retry cần timeout riêng và tổng deadline của operation; exponential backoff + jitter tránh thundering herd.

Circuit breaker hoặc load shedding bảo vệ khi downstream liên tục lỗi. Bulkhead/queue bound ngăn một dependency chậm chiếm toàn bộ thread/connection. Khi queue tăng, backpressure có thể là trả `429/503`, giảm concurrency hoặc trì hoãn work; không phải tăng retry vô hạn.

## Caching an toàn

Với cache-aside, app đọc cache; miss thì đọc source of truth, sau đó đặt cache với TTL. Invalidate/ghi lại cache sau write tùy consistency cần thiết. Tránh cache stampede bằng request coalescing, stale-while-revalidate hoặc khóa ngắn theo key; không dùng distributed lock dài như một giải pháp mặc định.

Không cache authorization decision hoặc balance/availability correctness-critical quá lâu nếu không có version/invalidation đáng tin. Đặt size limit, key namespace theo tenant, TTL có jitter khi nhiều key được tạo cùng lúc, và metric hit ratio nhưng không đánh giá cache chỉ bằng hit ratio: phải xem latency, source load và stale-read impact.

## Quyết định và trade-off

| Quyết định | Dùng khi | Điều phải chứng minh |
|---|---|---|
| In-process channel | Work có thể mất khi restart, cùng process, có backpressure | Mất work chấp nhận được và shutdown behavior rõ |
| Broker/database job | Email, billing, event, export hoặc work cần audit | Idempotency, retry, DLQ và replay |
| Cache-aside | Đọc nhiều, stale read chấp nhận trong TTL | Invalidation, tenant isolation, fallback source |
| Write-through | Cần cache cập nhật cùng write, đơn giản hóa read | Cache failure semantics và write latency |
| Circuit breaker | Downstream liên tục fail/chậm | Fallback có ý nghĩa, alert và recovery policy |

## Bẫy production

- `Task.Run` trong endpoint: process recycle làm mất work, scoped dependency bị dispose, không có retry/audit.
- Retry mọi exception: khuếch đại outage, gọi trùng payment hoặc che lỗi code.
- Acknowledge message trước khi database commit: mất work khi process chết.
- Giữ transaction mở khi gọi HTTP: lock lâu, deadlock và giảm throughput.
- Cache key thiếu tenant/user: lộ dữ liệu giữa khách hàng.
- Đặt TTL dài để “giảm database” cho dữ liệu thay đổi nhanh: trả stale data sai nghiệp vụ.
- Không đặt queue/concurrency bound: backlog ăn hết memory hoặc downstream bị bắn quá tải khi hồi phục.

## Ví dụ

```csharp
protected override async Task ExecuteAsync(CancellationToken stoppingToken)
{
    while (!stoppingToken.IsCancellationRequested)
    {
        var job = await store.TryClaimAsync(workerId, lease: TimeSpan.FromMinutes(2), stoppingToken);
        if (job is null)
        {
            await Task.Delay(TimeSpan.FromSeconds(1), stoppingToken);
            continue;
        }

        try
        {
            await handler.HandleIdempotentlyAsync(job, stoppingToken);
            await store.CompleteAsync(job.Id, stoppingToken);
        }
        catch (TransientDependencyException ex) when (job.Attempt < 5)
        {
            await store.RescheduleAsync(job.Id, Backoff.WithJitter(job.Attempt), ex.Code, stoppingToken);
        }
        catch (Exception ex)
        {
            await store.MoveToDeadLetterAsync(job.Id, ex.GetType().Name, stoppingToken);
        }
    }
}
```

Pseudo-code này vẫn cần handler idempotent: `CompleteAsync` không cứu được duplicate nếu worker hoàn thành external effect rồi chết trước khi ghi complete.

## Câu hỏi phỏng vấn

### Vì sao `BackgroundService` không phải durable job queue?

**Ý chính:** Nó chỉ chạy cùng lifecycle của host; in-memory work có thể mất lúc restart/deploy. Durable work cần state persist/broker, acknowledgement sau state an toàn và handler idempotent cho redelivery.

**Follow-up:** Graceful shutdown hoạt động thế nào? Khi nào dùng database job table thay broker?

**Red flags:** “Gọi `Task.Run` là đủ”; “worker retry mọi exception”.

### Timeout có nghĩa downstream chưa thực hiện command không?

**Ý chính:** Không. Timeout chỉ nghĩa caller không nhận được kết quả trong budget. Downstream có thể đã commit; retry cần idempotency key hoặc truy vấn trạng thái trước khi tạo side effect mới.

## Tự kiểm

- Tôi có thể chỉ ra lúc nào job được persist, claim, acknowledge và replay không?
- Tôi có thể phân loại một lỗi thành transient, permanent hoặc unknown outcome không?
- Tôi có thể giải thích cache stale ảnh hưởng invariant nào và fallback ra sao không?
- Tôi có thể nêu dashboard gồm queue age, DLQ, saturation, retry và dependency latency không?
