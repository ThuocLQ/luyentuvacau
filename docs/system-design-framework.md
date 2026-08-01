# Khung trả lời System Design cho Backend

## Trong 30 giây

- Đi từ hành trình người dùng đến invariant, rồi mới chọn storage/service/queue.
- Baseline nhỏ nhất dễ test, debug và rollback hơn kiến trúc nhiều thành phần.
- Nêu ownership, trạng thái pending/fail, duplicate và unknown outcome trước phần scale.
- Mỗi lựa chọn phải có trade-off và observability đi kèm.

## Gặp ở đâu ngoài đời?

Đề bài “thiết kế đặt hàng” trong 45 phút dễ khiến bạn vẽ Kafka, Redis và microservice. Nhưng interviewer thường cần biết điều đơn giản hơn: một order được tạo một lần bằng cách nào, payment timeout hiển thị gì, và ai phát hiện khi dữ liệu partner lệch.

## Hiểu đơn giản trước

System design không phải sơ đồ càng nhiều hộp càng tốt. Nó là lời giải thích có thứ tự: dữ liệu gốc ở đâu, hành động nào phải đúng ngay, phần nào có thể chậm, và khi hỏng ai có thể khôi phục. Thêm component đồng nghĩa thêm dependency, monitoring và failure mode.

## Terms to Know

- [[SLO]] (mục tiêu mức dịch vụ): ví dụ p99 dưới 500 ms hoặc availability theo cam kết.
- [[Data ownership]] (quyền sở hữu dữ liệu): service/database nào được phép quyết định và ghi state.
- [[Eventual consistency]] (nhất quán sau một khoảng trễ chấp nhận được): search/email cập nhật sau order, không phải dữ liệu tự đúng mãi mãi.
- [[Outbox]] (bản ghi ý định phát event cùng transaction): tránh lưu order xong nhưng mất sự kiện.

## Cách quyết định, từng bước

1. Làm rõ scope: actor, command/read, tải, latency, dữ liệu nhạy cảm và điều không đảo ngược.
2. Nêu NFR/giả định và invariant. Ví dụ “một order chỉ confirm một lần; search có thể chậm vài giây”.
3. Chỉ owner và state chính: `Pending → Confirmed/Failed`; API/contract tối thiểu và idempotency key.
4. Chọn source of truth theo access pattern. Relational DB phù hợp transaction/constraint; object storage cho file; index cho search.
5. Bổ sung async phần không cần xong trong request; thiết kế duplicate, retry, DLQ và UI pending.
6. Nêu scale sau cùng: bottleneck nào được đo, cache/partitioning giải quyết gì, rollback thế nào.

## Chọn A hay B?

| Quyết định | Dùng khi | Đánh đổi |
|---|---|---|
| Sync RPC | User cần kết quả ngay | Latency và availability downstream vào critical path |
| Queue/worker | Công việc chịu trễ và có thể theo dõi | Backlog, duplicate, pending/fail UI |
| Transaction local | Cùng data owner cần giữ invariant | Không rollback toàn workflow liên service |
| Cache-aside | Đọc nhiều, stale data chấp nhận được | Invalidation/fallback và dữ liệu cũ |

## Nếu có lỗi thì sao?

Timeout không cho biết provider đã làm hay chưa. Thiết kế phải lưu reference, query trạng thái hoặc reconciliation trước retry. Với event trùng/muộn, consumer xử lý theo idempotency key/business key và transition có điều kiện. Lỗi vĩnh viễn vào DLQ kèm context, không retry vô hạn.

## Chứng minh mình làm đúng

Nêu trace cho request xuyên service, metric p95/p99/error rate, queue age/DLQ age, tỷ lệ duplicate suppression và mismatch reconciliation. Alert phải chỉ được owner/runbook: điều tra ở đâu, khi nào tắt feature hoặc rollback, record correction ra sao.

## Nói trong phỏng vấn

“Em sẽ chốt trước rằng order không được confirm hai lần, còn email có thể trễ. Order DB là nguồn dữ liệu gốc và giữ transition bằng transaction/constraint. Em dùng outbox cho email để không mất ý định phát event; worker idempotent vì broker có thể giao trùng. Nếu payment timeout, UI giữ pending và hệ thống đối soát theo reference. Em theo dõi pending quá tuổi, queue age và mismatch để vận hành.”

## Interviewer thường hỏi tiếp

- Nếu traffic tăng mười lần, bottleneck đầu tiên bạn đo ở đâu trước khi thêm cache?
- Nếu cần xóa dữ liệu cá nhân nhưng audit phải giữ, boundary và policy của bạn là gì?

## Tự kiểm trước khi qua bài

- Tôi đã nói giả định và trạng thái UI chưa?
- Mỗi component có lý do, owner và failure mode chưa?
- Tôi có hứa guarantee vượt quá boundary không?

## Nhớ một phút

- User journey trước công nghệ.
- Ownership và invariant trước scale.
- Failure/observability là một phần của thiết kế.
