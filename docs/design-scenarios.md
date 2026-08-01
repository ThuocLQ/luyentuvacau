# Giải tình huống System Design thường gặp

## Trong 30 giây

- Bắt đầu bằng user journey, dữ liệu gốc và điều không được sai; không bắt đầu bằng tên công nghệ.
- Timeout là kết quả chưa biết, không đồng nghĩa thất bại; duplicate phải được chấp nhận ở boundary.
- Async làm request ngắn hơn nhưng UI phải có pending/fail và operator phải có cách đối soát.
- Mỗi component cần owner, lý do tồn tại và signal vận hành.

## Gặp ở đâu ngoài đời?

Bạn được yêu cầu thiết kế luồng đặt hàng. Người dùng bấm một lần nhưng mạng chập chờn; payment provider timeout; worker email nhận event hai lần. Nếu chỉ vẽ API, queue và database, thiết kế vẫn chưa trả lời việc user thấy gì và ai sửa dữ liệu lệch.

## Hiểu đơn giản trước

Một system design tốt là câu chuyện của một request: dữ liệu được nhận ở đâu, state chuyển thế nào, ai được ghi, và khi kết quả chưa rõ thì làm gì. Queue tách thời gian xử lý chứ không xóa duplicate; cache giúp đọc nhanh chứ không có quyền quyết định tiền hay tồn kho.

## Terms to Know

- [[Idempotency boundary]] (ranh giới gọi lại không tạo thêm hiệu ứng): thường là API nhận command hoặc consumer xử lý event.
- [[Reconciliation]] (đối soát): so sánh bản ghi nội bộ với đối tác để tìm và sửa lệch có audit.
- **Source of truth (nguồn dữ liệu gốc)**: nơi có quyền quyết định trạng thái cuối cùng.
- **DLQ (hàng đợi lỗi)**: giữ message lỗi bền vững thay vì retry vô hạn.

## Cách quyết định, từng bước

1. Hỏi actor, thao tác chính, dữ liệu nhạy cảm, tải/SLO và trạng thái user chấp nhận khi chưa xong.
2. Chốt ownership và invariant. Ví dụ database order giữ transition; provider payment là nguồn sự thật của charge.
3. Vẽ baseline sync tối thiểu cho đường không được sai. Đưa queue vào email/indexing, nơi user chấp nhận pending.
4. Thiết kế unknown outcome, retry có budget, duplicate consumer và đường đối soát trước khi nói scale.
5. Nêu log/trace/metric/alert và runbook của người vận hành.

## Chọn A hay B?

| Nhu cầu | Chọn | Cái giá / khi không dùng |
|---|---|---|
| Giữ invariant trong một owner | Transaction + constraint local | Không bao phủ provider bên ngoài |
| Không mất ý định phát event | Outbox cùng transaction | Consumer vẫn nhận trùng |
| Gửi notification chịu burst | Queue + durable job | Có backlog, UI pending, DLQ |
| Đọc catalog nhanh | Cache/search index | Không quyết định checkout/tồn kho |

## Nếu có lỗi thì sao?

**Case payment:** API lưu order `Pending` và request reference. Provider timeout sau khi nhận request. Thay vì charge lại, hệ thống query provider hoặc đưa record vào reconciliation. User thấy “đang xác nhận”, không phải “thất bại” giả. Chỉ xác nhận khi evidence khớp reference; record lệch có owner xử lý.

**Case notification:** event đến hai lần. Worker tạo delivery theo business key, kiểm consent trước gửi, và chỉ retry lỗi tạm thời. Địa chỉ sai/opt-out là lỗi vĩnh viễn, chuyển trạng thái rõ thay vì làm nghẽn queue.

## Chứng minh mình làm đúng

Theo dõi unknown payment outcome, duplicate suppression, queue age, DLQ age, mismatch reconciliation và p95/p99 của API. Mỗi alert gắn runbook: query reference, khóa thao tác rủi ro nếu cần, đối soát, rồi ghi correction có audit.

## Nói trong phỏng vấn

“Em giả định order không được xác nhận trùng nhưng email có thể chậm. Em để order database sở hữu state transition và lưu outbox cùng transaction; worker gửi email chịu duplicate. Nếu payment timeout, em xem đó là unknown outcome và đối soát theo reference trước retry. Đổi lại UI có pending, nhưng em theo dõi số pending quá tuổi và mismatch để operator xử lý.”

## Interviewer thường hỏi tiếp

- Nếu provider không hỗ trợ idempotency key, identity và workflow đối soát của bạn là gì?
- Nếu search index chậm, request nào vẫn phải bỏ qua index hoàn toàn?

## Tự kiểm trước khi qua bài

- Tôi đã nói user thấy pending/fail thế nào chưa?
- Mỗi dữ liệu quan trọng có owner rõ chưa?
- Timeout, duplicate và reconciliation đã có đường cụ thể chưa?

## Nhớ một phút

- Journey → ownership → invariant → failure → evidence.
- Queue không tự an toàn.
- Unknown outcome cần đối soát, không retry mù.
