# API chậm: đo chỗ chờ trước khi thêm máy

## Trong 30 giây

- CPU thấp không có nghĩa hệ thống khỏe; request có thể đang chờ database, pool, lock hoặc partner.
- Xem SLO, p50/p95/p99, error, saturation và trace của request chậm trước.
- Giảm công việc/query/payload trước khi scale out.
- Cache chỉ cho dữ liệu chấp nhận cũ; key, TTL và fallback là một phần thiết kế.
- Khi dependency đầy, backpressure/rate limit tốt hơn để timeout hàng loạt.

## Gặp ở đâu ngoài đời?

Sau release, p99 tăng từ 300 ms lên 4 giây nhưng CPU chỉ 30%. Trace cho thấy request chờ connection database vì query mới giữ connection lâu. Thêm instance làm app mở thêm connection, database càng nghẽn. Vấn đề là thời gian chờ, không phải số CPU.

## Hiểu đơn giản trước

Latency gồm thời gian làm việc và thời gian xếp hàng. Khi một dependency gần đầy, request mới đứng chờ; một nhóm nhỏ sẽ chậm rất lâu nên p99 tăng trước average. Capacity cuối cùng bị giới hạn bởi thành phần chậm nhất, không phải số instance app.

## Từ cần biết

- [[p99 latency]] (1% request chậm nhất mất bao lâu) — thấy đuôi chậm mà average che đi.
- [[Backpressure]] (điều tiết khi nhận quá khả năng xử lý) — bảo vệ toàn hệ thống.
- [[Cache-aside]] (đọc cache rồi mới đọc nguồn gốc) — đổi latency lấy dữ liệu có thể cũ.
- **Saturation** (tài nguyên gần cạn) — pool/queue/connection/lock đều có thể bão hòa.

## Cách quyết định, từng bước

1. Chốt SLO và so baseline trước/sau release theo version/traffic.
2. Xem percentile, error, throughput, queue/pool/connection và trace của request chậm.
3. Nêu giả thuyết cụ thể: query, N+1, lock, payload, fan-out hay downstream; dùng plan/profiler để xác nhận.
4. Giảm work trước: projection, pagination, batch, index đúng query shape hoặc chuyển việc không cần trả ngay sang worker bền.
5. Canary thay đổi nhỏ, đo lại. Chỉ scale khi bottleneck còn capacity để hưởng lợi.

## Chọn A hay B?

| Chọn | Khi phù hợp | Đổi lại |
|---|---|---|
| Tối ưu query/payload | Trace chỉ rõ database/data work | Cần đo plan và giữ correctness |
| Cache | Dữ liệu đọc nhiều, stale có giới hạn | Invalidation, stampede, cache down |
| Scale out | App stateless, dependency còn headroom | Có thể tăng load xuống dưới |
| Shed/rate limit | Dependency gần cạn | Một số request bị từ chối có kiểm soát |

## Nếu có lỗi thì sao?

Catalog cache hết hạn cùng lúc, hàng nghìn request cùng đổ xuống database (stampede). Dùng TTL có jitter, request coalescing hoặc giới hạn refresh; có fallback và metric hit/miss. Không cache số dư, quota hay giá checkout nếu nghiệp vụ đòi hỏi giá trị mới ngay.

::: production-trap
Tăng thread/pool/concurrency không giới hạn có thể làm dependency chậm nhận nhiều việc hơn và p99 bùng lên. Capacity phải lấy từ số đo, không từ một con số “cho chắc”.
:::

## Chứng minh mình làm đúng

- Dashboard p50/p95/p99, error, throughput và saturation theo version.
- Trace exemplar cho request chậm; execution plan/query count khi nghi database.
- Load test có payload/concurrency gần production, không chỉ benchmark local.
- Đo cache hit/miss/stale và tỉ lệ 429/503 khi có backpressure.

## Nói trong phỏng vấn

“Khi p99 tăng em không thêm máy ngay. Em chốt SLO, so release, xem percentile, saturation và trace để biết request đang làm hay đang chờ. Em giảm query/payload hoặc sửa dependency bottleneck trước; cache chỉ khi dữ liệu chấp nhận stale có hợp đồng rõ. Nếu dependency đầy, em giới hạn concurrency hoặc trả 429/503 có kiểm soát. Mỗi thay đổi canary và đo lại theo p99, không theo cảm giác.”

## Interviewer thường hỏi tiếp

### Vì sao p99 tăng mà average ít đổi?

Chỉ một phần request bị queue, lock hoặc dependency chậm nặng; average trộn chúng với phần nhanh nên che mất ảnh hưởng người dùng tệ nhất.

### Khi nào scale out không giúp?

Khi database, hot partition, connection pool hoặc partner là nút thắt. Instance mới chỉ gửi thêm tải đến cùng một chỗ.

## Tự kiểm trước khi qua bài

- Request chậm đang chờ ở đâu, bằng chứng là gì?
- Dữ liệu nào của bạn chấp nhận cũ bao lâu?
- Khi pool đầy, bạn từ chối/điều tiết request thế nào?

## Nhớ một phút

- Đo tail latency và chỗ chờ trước.
- Giảm work trước, scale sau.
- Cache và backpressure đều là trade-off có điều kiện.
