# Performance & Scalability

## Quick Summary

Một API chậm có thể đang chờ database, connection pool hoặc dependency, không nhất thiết thiếu CPU. Đo request chậm, queue và dependency trước; chỉ tối ưu phần đã chứng minh là nút thắt.

## Terms to Know

- [[p99 latency]]: 1% request chậm nhất mất bao lâu; phản ánh trải nghiệm tệ nhất tốt hơn average.
- [[Backpressure]]: giới hạn/điều tiết công việc khi hệ thống nhận nhiều hơn khả năng xử lý.
- [[Cache-aside]]: đọc cache trước, miss thì đọc nguồn dữ liệu và ghi lại cache.

::: production-trap
Scale out trước khi hiểu bottleneck có thể tăng kết nối, queue và chi phí nhưng không giảm latency.
:::

## Tình huống phỏng vấn

Sau release, p99 tăng từ 300 ms lên 4 giây nhưng CPU chỉ 30%. Trace cho thấy request chờ connection database; thêm instance tạo thêm kết nối nên tình hình còn xấu hơn. Cần tìm nơi chờ, không chỉ nhìn CPU trung bình.

## Mental model

Latency gồm thời gian làm việc và thời gian chờ. Khi tài nguyên gần đầy, queue tăng; request đến muộn chờ lâu nên p99 nổ trước average. Capacity là giới hạn của dependency chậm nhất: database, broker, pool hoặc external API.

## Bắt đầu từ bằng chứng

Chốt SLO và so sánh baseline trước/sau. Xem p50/p95/p99, error rate, throughput, saturation (tài nguyên gần cạn) của CPU/memory/pool/queue và trace của request chậm. Xác định query, lock, allocation, downstream call hay payload nào chiếm thời gian. Tối ưu một giả thuyết, rollout nhỏ, rồi đo lại.

## Đòn bẩy hiệu năng phổ biến

Giảm công việc trước: chỉ lấy cột cần thiết, phân trang, batch thay vì N+1 call và stream dữ liệu lớn. Sau đó sửa query/index theo plan, giới hạn fan-out/concurrency, tái dùng connection đúng cách và chuyển work không cần trả ngay sang worker bền vững. Tối ưu code micro chỉ sau khi trace/profiler cho thấy nó đáng kể.

## Cache là trade-off consistency

Cache tốt cho dữ liệu đọc nhiều, chấp nhận cũ trong một khoảng rõ ràng. Ví dụ catalog có thể stale 30 giây; giá checkout không nên chỉ tin cache. Đặt key có tenant/version, TTL và chiến lược invalidation. Chống cache stampede bằng request coalescing (nhiều request cùng chờ một lần refresh) hoặc giới hạn refresh, và có fallback khi cache down.

## Scalability và backpressure

API stateless có thể scale ngang, nhưng database/write key hot không tự scale theo. Chọn partition key từ access pattern và đo hot tenant/key. Khi tải vượt capacity, dùng queue bounded, rate limit, shed work (chủ động bỏ việc ít quan trọng) hoặc trả `429/503` có hướng dẫn retry. Từ chối có kiểm soát tốt hơn nhận hết rồi timeout hàng loạt.

## Bẫy production

- Chỉ báo average latency nên bỏ lỡ nhóm người dùng chờ rất lâu.
- Cache mọi thứ, kể cả balance/quota cần đúng ngay.
- Tăng pool/thread không giới hạn làm downstream quá tải.
- Benchmark local payload nhỏ rồi suy ra production.

## Mẫu trả lời Senior

“Tôi không tối ưu theo cảm giác. Tôi xác định SLO, xem percentile, saturation và trace để phân biệt slow dependency với queueing. Tôi giảm work/query trước, cache chỉ khi stale an toàn, và đặt backpressure khi dependency chạm capacity. Mỗi thay đổi được canary (bật cho một phần nhỏ traffic trước) và so với baseline.”

## Câu hỏi ôn phỏng vấn

### Vì sao p99 tăng mạnh dù average latency chỉ tăng nhẹ?

Một phần nhỏ request có thể bị queue/lock/downstream chậm. Khi gần saturation, các request đó chờ rất lâu nhưng average vẫn che mất chúng.

### Cache-aside có những failure mode nào?

Stale data, invalidation sai, stampede, cache down và key thiếu tenant. Mỗi cache cần freshness contract, fallback và metric hit/miss/latency.

## Final recall

- Đo percentile, queue và dependency trước khi scale.
- Giảm work thường hiệu quả hơn thêm máy.
- Backpressure bảo vệ trải nghiệm khi không thể xử lý tất cả tải.
