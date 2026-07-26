# Performance & Scalability

## Quick Summary

> **Nói đơn giản:** tối ưu không bắt đầu bằng cache hay tăng máy chủ. Bắt đầu bằng số liệu: request nào chậm, chậm ở đâu, tác động tới người dùng nào. Sau khi biết nút thắt mới chọn đòn bẩy phù hợp.

Tối ưu bắt đầu từ evidence: user impact, p99, saturation và dependency. Scale-out không giúp khi bottleneck là hot key, connection pool hoặc downstream đang chậm.

## Terms to Know

- [[p99 latency]]: nhìn phần request chậm nhất có ảnh hưởng user.
- [[Backpressure]]: không nhận work vô hạn khi consumer đầy.
- [[Load shedding]]: từ chối có chủ đích để bảo toàn phần quan trọng.
- [[Hot partition]]: một key nhận tải lệch quá lớn.

::: production-trap
Chỉ nhìn average latency khiến bạn bỏ qua queueing và tail latency — thứ người dùng thường cảm nhận rõ nhất.
:::

## Tình huống phỏng vấn

"Sau một chiến dịch, p99 của API tăng từ 400 ms lên 5 giây. Em làm gì trong 30 phút đầu, và quyết định scale hay tối ưu dựa vào đâu?"

Performance không phải danh sách mẹo cache/index/async. Nó là vòng lặp: định nghĩa SLO, đo theo tải thật, tìm bottleneck, giảm hoặc phân tách bottleneck, rồi kiểm chứng bằng số liệu và guardrail.

## Mental model

Latency trung bình có thể đẹp nhưng một nhóm request rất chậm vẫn làm người dùng khó chịu; vì vậy cần nhìn p95/p99. Scalability là khả năng tăng tải mà vẫn kiểm soát latency, lỗi và chi phí; không chỉ là tăng số instance.

Latency end-to-end là tổng của queueing, CPU, database, network, dependency và serialization. Khi utilization gần bão hòa, queueing tăng phi tuyến: thêm traffic nhỏ có thể làm p99 tăng rất mạnh. Vì vậy average latency đẹp không chứng minh hệ thống khỏe; phải nhìn percentile, error rate, saturation và backlog.

Scale ngang chỉ hiệu quả khi component gần stateless, dependency phía sau còn headroom và workload có thể partition. Nếu bottleneck là database lock, hot key, connection pool hay downstream API, thêm application instance có thể làm mọi thứ tệ hơn.

## Bắt đầu từ bằng chứng

1. **Ổn định ảnh hưởng:** kiểm tra deploy/feature flag gần nhất, error rate, p95/p99, saturation và queue depth; rollback/disable nếu có bằng chứng giảm impact.
2. **Khoanh vùng bằng trace:** endpoint nào, span nào chiếm thời gian, request nào/tenant nào gây tải; tách app CPU, GC, thread pool, DB wait/query plan, network và dependency latency.
3. **Đối chiếu với tải:** request rate, concurrency, payload/row count, cache hit rate, connection pool, consumer lag. Một trace đơn lẻ không đại diện cho tail latency.
4. **Sửa điểm nghẽn nhỏ nhất có bằng chứng:** query shape/index, N+1, bounded concurrency, payload, cache, queue hoặc capacity. Sau đó load test và theo dõi production.

Không "tuning" bằng cách tăng timeout/connection pool/replica khi chưa biết resource nào đang giới hạn.

## Đòn bẩy hiệu năng phổ biến

| Bottleneck | Câu hỏi cần chứng minh | Hướng xử lý |
|---|---|---|
| Database | Query plan, rows, lock wait, connection saturation? | query/index đúng shape, giảm round trip, pagination, partition/replica khi semantics cho phép |
| CPU/GC | CPU hot, allocation/LOH, serialization? | profile, giảm allocation/payload, batch hợp lý, cache tính toán; tránh tối ưu vi mô vô chứng cứ |
| Thread/connection | blocked thread, queue, pool exhausted? | async end-to-end, deadline, bounded fan-out, connection reuse/pool sizing theo dependency |
| Downstream | latency/error/throttle? | timeout budget, circuit/bulkhead khi cần, cache/fallback đúng semantics, queue work có thể trễ |
| Hot key/partition | một tenant/order/key áp đảo? | partition/key strategy, rate limit, queue per key hoặc thay model ownership |

## Cache là trade-off consistency

Cache-aside: đọc cache, miss thì đọc source rồi ghi cache. Nó giảm read load nhưng tạo stale data, stampede và invalidation ownership. Trả lời rõ:

- dữ liệu nào cho phép stale, bao lâu và ai chấp nhận;
- TTL, invalidation sau write và cách tránh nhiều request cùng rebuild hot key;
- cache key có tenant/permission/version không;
- behavior khi cache down: fallback có làm source quá tải không.

Không cache authorization, balance hoặc inventory chỉ vì endpoint chậm nếu stale read phá invariant. Có thể dùng read model riêng, reservation hoặc synchronous check tùy use case.

## Scalability và backpressure

Queue tách workload nhưng không tạo capacity. Đặt max concurrency, prefetch/batch size và queue lag alert theo khả năng consumer/dependency. Khi backlog tăng, backpressure có thể là rate limiting, reject có retry guidance, shed non-critical work hoặc hạ chất lượng có chủ đích. Không để memory queue tăng vô hạn.

Đặt SLO theo user journey, chẳng hạn p95 checkout và tỷ lệ order confirmed; từ đó suy latency budget cho từng dependency. Capacity test cần workload giống thực tế: data distribution, hot tenant, write/read mix, payload và failure injection — không chỉ một request loop trên dataset nhỏ.

## Bẫy production

- Cache hit rate cao nhưng hot keys miss cùng lúc vẫn có thể làm database sập. Dùng request coalescing/lock phân tán có giới hạn khi hợp lý và kiểm tra failure mode.
- Fan-out `Task.WhenAll` cho hàng nghìn item tạo burst tới database/downstream. Bounded concurrency và cancellation/deadline là bắt buộc.
- Auto-scale theo CPU có thể không thấy queue lag, DB lock hay dependency throttle. Scale policy cần tín hiệu phù hợp và quota/headroom ở dependency.
- Logging payload khổng lồ trong hot path có thể tự tạo latency/chi phí; log structured, sampling hợp lý và vẫn giữ trace correlation cho error/tail.

## Mẫu trả lời Senior

"Trước hết em bảo vệ SLO: so deployment/flag, p95/p99, error và saturation để rollback hoặc giảm tải nếu cần. Em dùng trace + metrics để phân biệt app, DB, queue hay dependency; ví dụ nếu span DB chậm, em đọc SQL/actual plan và lock wait thay vì scale web tier. Nếu tail do downstream, em áp deadline theo end-to-end budget, bounded concurrency và fallback chỉ khi nghiệp vụ cho phép. Cache/queue/replica là lựa chọn có semantics và failure mode rõ. Sau sửa, em load test với data distribution thật, đặt alert/guardrail cho latency, error, saturation và backlog."

## Câu hỏi ôn phỏng vấn

### Vì sao p99 tăng mạnh dù average latency chỉ tăng nhẹ?

**Trả lời ngắn:** Khi resource gần bão hòa, queueing và contention làm một phần request chờ lâu, nên tail tăng trước average. Em xem concurrency, queue depth, pool/thread saturation, lock wait và dependency tail latency theo trace, không chỉ nhìn average.

**Follow-up:** Scale app instances có thể làm DB latency tệ hơn khi nào? Bạn đặt alert nào trước khi p99 breach?

**Red flags:** "Average dưới 1 giây là ổn"; "thêm server luôn giải quyết được".

### Cache-aside có những failure mode nào?

**Trả lời ngắn:** Stale data, stampede, invalidation sai, cache key rò tenant/quyền, và fallback làm source quá tải khi cache down. Em chỉ cache dữ liệu có freshness contract, đặt TTL/invalidation/metrics và thiết kế degradation rõ.

**Follow-up:** Làm sao tránh hot-key stampede? Dữ liệu nào không được cache stale?

**Red flags:** "Cache mọi endpoint"; "xóa cache là consistency".

## Final recall

- SLO, percentile, saturation và queueing dẫn đường; average không đủ.
- Trace từ request đến dependency để tìm bottleneck đã đo.
- Scale/cache/queue đều có consistency và failure trade-off.
- Sau tối ưu phải load test và có guardrail vận hành.
