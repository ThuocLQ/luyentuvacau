# Retry, Saga và đối soát: xử lý kết quả “chưa biết”

## Trong 30 giây

- Timeout không có nghĩa thao tác thất bại; nó có thể đã xảy ra nhưng response chưa về.
- Retry chỉ lặp phần an toàn, có idempotency key và retry budget.
- Saga là workflow nhiều owner có state, timeout và đường phục hồi; không phải rollback ACID toàn hệ thống.
- Compensation là một hành động nghiệp vụ mới; khi không thể bù, phải đối soát.
- UI cần nói rõ `Pending` thay vì báo thành công hoặc thất bại bừa.

## Gặp ở đâu ngoài đời?

Khách bấm thanh toán. Provider timeout sau khi có thể đã charge. Nếu Order gọi lại ngay, khách có thể bị trừ tiền hai lần. Nếu Order đánh dấu failed, hệ thống có thể bỏ quên khoản đã thu. Trạng thái đúng lúc này là “chưa biết”, không phải true/false.

## Hiểu đơn giản trước

Một workflow qua nhiều service không có nút undo chung. Mỗi bước có dữ liệu riêng và có thể hoàn tất ở thời điểm khác. Saga giữ trạng thái của cả hành trình: đang chờ payment, đã reserve kho, cần hoàn tiền hay cần đối chiếu. Mục tiêu là hội tụ về trạng thái nghiệp vụ đúng, không phải giả vờ mọi bước rollback cùng lúc.

## Từ cần biết

- [[Retry budget]] (giới hạn số lần/thời gian thử lại) — ngăn retry storm.
- [[Saga]] (workflow nhiều owner có state) — điều phối bước và timeout.
- [[Reconciliation]] (đối chiếu với nguồn có thẩm quyền) — xử lý outcome chưa biết.
- **Compensation** (hành động bù nghiệp vụ) — ví dụ hoàn tiền, không phải xóa lịch sử charge.

## Cách quyết định, từng bước

1. Đặt state machine rõ: `PendingPayment`, `Paid`, `Failed`, `NeedsReconciliation`; mỗi transition có điều kiện hợp lệ.
2. Gửi payment với idempotency key; ghi request ID và thời điểm trước khi gọi.
3. Khi timeout, query provider hoặc chờ job đối soát thay vì charge lại mù.
4. Retry chỉ lỗi tạm thời, với backoff+jitter và ngân sách; hết ngân sách thì chuyển state cho operator/reconciliation.
5. Nếu kho đã reserve nhưng payment failed, release reservation như compensation; ghi audit trail thay vì xóa fact.

## Chọn A hay B?

| Chọn | Khi phù hợp | Đổi lại |
|---|---|---|
| Retry ngay | Operation idempotent, outcome biết chắc là chưa xảy ra | Có thể làm downstream quá tải |
| Query/reconcile | Timeout ở external write, outcome chưa biết | Người dùng chờ trạng thái pending |
| Compensation | Có hành động bù hợp lệ | Không luôn đảo ngược toàn bộ thế giới thật |
| Manual review | Giá trị/rủi ro cao, evidence mâu thuẫn | Tốn vận hành nhưng an toàn |

## Nếu có lỗi thì sao?

Event payment cũ đến sau event mới. Consumer phải kiểm tra version/transition hiện tại; không để `Failed` cũ ghi đè `Paid` mới. Nếu workflow bị kẹt, job quét các state quá hạn, thu evidence từ provider và đưa vào queue xử lý có owner.

::: production-trap
Retry toàn bộ workflow sau một lỗi consumer có thể reserve kho, charge tiền hoặc gửi email lần hai. Retry đúng message/operation có ranh giới idempotent.
:::

## Chứng minh mình làm đúng

- Đếm state pending quá hạn, retry exhausted, mismatch provider và thời gian đối soát.
- Test duplicate, out-of-order event, timeout-after-success và restart giữa các bước.
- Có dashboard state machine và runbook cho từng state không hội tụ.

## Nói trong phỏng vấn

“Với payment timeout, em coi outcome là unknown chứ không retry charge ngay. Em lưu idempotency key và state pending, sau đó query hoặc reconciliation với provider. Workflow saga có transition, timeout và retry budget rõ; bước đã làm như reserve kho chỉ được bù bằng action nghiệp vụ hợp lệ. Em theo dõi pending quá hạn và mismatch để biết flow có hội tụ, thay vì hứa rollback distributed transaction.”

## Interviewer thường hỏi tiếp

### Khi nào dùng choreography, khi nào orchestration?

Choreography hợp flow nhỏ, ownership và quan hệ event rõ. Orchestration dễ quan sát khi workflow dài/nhiều nhánh; đổi lại có một coordinator cần owner.

### Compensation có luôn khả thi không?

Không. Hàng đã giao hoặc giao dịch đã settlement có thể chỉ sửa bằng adjustment/audit hoặc manual review.

## Tự kiểm trước khi qua bài

- Timeout nào trong hệ thống của bạn là outcome chưa biết?
- State nào phải hiện cho người dùng trong lúc đợi đối soát?
- Ai sở hữu job xử lý saga kẹt?

## Nhớ một phút

- Unknown outcome không được retry mù.
- Saga quản lý hội tụ, không phải global rollback.
- Retry có budget; lệch dữ liệu cần evidence và đối soát.
