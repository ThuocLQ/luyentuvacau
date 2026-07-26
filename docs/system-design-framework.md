# Khung System Design cho Backend

## Quick Summary

Đề bài “thiết kế đặt hàng” không bắt đầu bằng Kafka. Bắt đầu bằng việc một người dùng bấm đặt hàng: dữ liệu nào phải đúng, chờ bao lâu được và nếu payment timeout thì màn hình nói gì. Sau đó mới chọn thành phần nhỏ nhất đáp ứng được yêu cầu.

## Terms to Know

- [[SLO]]: mục tiêu đo được, ví dụ p99 dưới 500 ms hoặc availability 99.9%.
- [[Data ownership]]: service hoặc database nào được phép ghi dữ liệu đó.
- [[Eventual consistency]]: các phần hệ thống cập nhật chậm hơn nhau trong khoảng chấp nhận được.
- **Invariant (quy tắc không được sai)**: ví dụ một order chỉ được xác nhận một lần hoặc tồn kho không được âm.
- **Source of truth (nguồn dữ liệu gốc)**: nơi ra quyết định cuối cùng, như database order; cache và search index chỉ là bản sao phục vụ đọc.
- **Outbox**: bản ghi ý định phát event được lưu cùng transaction với dữ liệu nghiệp vụ để không mất event.
- **DLQ**: nơi giữ message lỗi không nên retry mãi, để người vận hành kiểm tra và xử lý.

::: senior-signal
Nêu giả định trước: “Em giả định search có thể chậm vài giây, nhưng không được tạo order trùng.” Khi giả định đổi, hãy nói thiết kế đổi ở đâu.
:::

## Khi nào gặp

Gặp trong vòng design 30–60 phút: order, payment, file upload, notification hoặc search. Interviewer đánh giá cách bạn làm rõ yêu cầu và xử lý lỗi, không chỉ danh sách công nghệ.

## Mental model

Một thiết kế tốt trả lời ba việc: dữ liệu gốc ở đâu, thao tác nào không được sai, và khi lỗi thì khôi phục/đối soát thế nào. Cache, queue và service mới đều tăng điểm có thể lỗi; chỉ thêm khi giải quyết một nhu cầu cụ thể.

## Khung trả lời theo trình tự

### 1. Làm rõ yêu cầu và scope

Hỏi actor, thao tác chính, tải, độ trễ, dữ liệu nhạy cảm và điều không thể đảo ngược. Nếu chưa có số, nêu giả định và ảnh hưởng của nó.

### 2. Chốt invariant và ownership

Ví dụ: một order chỉ xác nhận một lần; tồn kho không âm. Đặt quy tắc gần dữ liệu bằng transaction, constraint hoặc state transition có điều kiện. Nói rõ ai ghi order, ai ghi payment.

### 3. Vẽ baseline end-to-end

Cho API stateless gọi source of truth trước. Chỉ đưa queue/worker vào việc không cần hoàn thành trong request, như gửi email. Baseline đơn giản dễ debug và rollback hơn.

### 4. Chọn storage và scale

Chọn theo access pattern: relational database cho transaction/constraint, object storage cho file, search index cho tìm kiếm. Cache chỉ dành cho đọc chấp nhận dữ liệu cũ; phải có key, TTL và fallback.

### 5. Nói failure và vận hành

Timeout không xác nhận thao tác chưa xảy ra. Nêu idempotency, retry có giới hạn, log/trace/metric, alert và reconciliation (đối soát) cho dữ liệu lệch.

## Quyết định và trade-off

| Chọn | Lợi ích | Cần chấp nhận |
|---|---|---|
| Transaction local | Giữ invariant đơn giản | Chỉ trong một data owner |
| Outbox + event | Không mất ý định phát event | Consumer có thể nhận trùng |
| Cache-aside | Giảm tải đọc | Có stale data và invalidation |
| Sync RPC | Có câu trả lời ngay | Phụ thuộc latency/availability |
| Queue | Hấp thụ burst | Có backlog, retry, DLQ |

## Bẫy production

- Vẽ microservice trước khi biết ownership/team/tải.
- Dùng search index để quyết định giá hoặc tồn kho cuối cùng.
- Nói “exactly once” nhưng không có dedup/reconcile.
- Không nêu metric hay cách rollback.

## Final recall

- User journey → invariant → baseline → failure → scale.
- Nêu điều kiện khiến bạn đổi thiết kế.
- Mỗi thành phần phải có lý do, owner và cách vận hành.
