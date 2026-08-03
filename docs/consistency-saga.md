# Saga, Event Ordering và Reconciliation

## Quick Summary

- **Saga** là cách chia một quy trình dài thành nhiều bước, mỗi bước có transaction riêng và trạng thái rõ ràng.
- Saga không phải một transaction khổng lồ và không thể “rollback” mọi thứ như database.
- Khi một bước thất bại, hệ thống có thể thử lại, làm hành động bù, hoặc chuyển sang đối soát thủ công.
- Timeout chỉ nói “chưa nhận được kết quả”; nó không chứng minh bước đó thất bại.
- Một Saga tốt luôn có điểm dừng, lịch sử trạng thái và cách con người can thiệp.

## Scenario: payment timeout giữa Saga

Quy trình đặt hàng phải giữ hàng, thu tiền và tạo vận đơn. Ba việc thuộc ba hệ thống. Kho đã giữ hàng, cổng thanh toán timeout, còn hệ thống vận chuyển chưa chạy. Ta chưa biết tiền đã bị trừ hay chưa, nên không thể cứ gọi lại hoặc hủy tất cả một cách mù quáng.

## State Flow và Mental Model

Hãy coi Saga như một hồ sơ theo dõi công việc. Hồ sơ ghi: đang ở bước nào, đã gửi yêu cầu nào, kết quả nhận được là gì và tiếp theo phải làm gì.

Mỗi hệ thống tự bảo vệ dữ liệu của mình bằng transaction local. Saga nối các kết quả đó thành một quy trình nghiệp vụ. Nếu bước sau không làm được, “hành động bù” có thể sửa tác động trước đó, ví dụ trả lại phần hàng đã giữ. Nhưng hành động bù là một nghiệp vụ mới; nó cũng có thể thất bại và không phải lúc nào cũng hoàn tác được quá khứ.

## Terms

- **Saga** (quy trình nhiều bước có lưu trạng thái): theo dõi tiến độ qua nhiều hệ thống.
- **Compensation** (hành động bù): tạo một hành động nghiệp vụ để giảm hoặc đảo tác động trước đó, ví dụ hoàn tiền.
- **Unknown outcome**: đã gửi request nhưng chưa biết bên kia đã tạo side effect hay chưa.
- **Giới hạn retry**: số lần hoặc khoảng thời gian tối đa được tự động thử lại.
- **Reconciliation** (đối soát): so sánh bằng chứng giữa các hệ thống để tìm trạng thái đúng.

## Saga Design Checklist

1. Vẽ các trạng thái nghiệp vụ, chẳng hạn `PendingPayment`, `Paid`, `PaymentUnknown`, `Cancelled`.
2. Với từng bước, ghi rõ ai sở hữu dữ liệu, request nào được gửi và bằng chứng nào xác nhận thành công.
3. Gắn một mã nghiệp vụ ổn định cho mỗi thao tác. Với payment, đây phải là mã mà provider nhận và dùng để nhận ra lần gọi lại; mã chỉ lưu nội bộ không tự chặn được charge trùng ở provider.
4. Chỉ retry khi lỗi có thể hồi phục và side effect trước đó chắc chắn chưa xảy ra, hoặc provider/bên nhận cam kết xử lý lại cùng idempotency key mà không tạo side effect mới.
5. Khi gặp unknown outcome, chuyển sang trạng thái riêng và tra cứu theo mã giao dịch; không coi timeout là thất bại.
6. Đặt điểm dừng. Hết retry budget thì cảnh báo và đưa vào hàng đối soát có người xử lý.
7. Lưu lịch sử chuyển trạng thái để điều tra và giải thích cho người dùng.

## Orchestration, Choreography và Trade-off

| Cách điều phối | Hợp khi | Cần chú ý |
|---|---|---|
| Một bộ điều phối (orchestration) | Luồng có nhiều nhánh, cần nhìn rõ trạng thái | Một service giữ hồ sơ Saga và quyết định bước tiếp; nó phải được vận hành tốt |
| Các service tự phản ứng theo event (choreography) | Luồng đơn giản, các bên ít phụ thuộc thứ tự | Order phát event, các bên tự làm bước của mình; khó nhìn toàn cảnh khi nhánh tăng |
| Xử lý thủ công có công cụ hỗ trợ | Tiền bạc hoặc rủi ro cao, không thể đoán | Cần audit log, quyền truy cập và hướng dẫn rõ |

## Nếu có lỗi thì sao?

Cổng thanh toán timeout sau khi nhận request. Saga chuyển sang `PaymentUnknown`, rồi một job tra cứu theo `paymentReference` (mã tham chiếu phía provider). Nếu provider trả `Succeeded`, Saga đi tiếp. Nếu trả `NotFound` và đã qua cửa sổ an toàn theo hợp đồng provider, hệ thống mới retry bằng cùng `idempotency key`.

Nếu hoàn tiền thất bại, không được xóa audit trail rồi coi đơn đã hủy xong. State phải phản ánh đúng: `RefundPending` hoặc `NeedsReview`, kèm alert cho người vận hành. Manual review cần hiển thị transaction reference, dữ liệu đã kiểm tra, action được phép làm và lịch sử ai đã quyết định gì.

::: production-trap
Retry vô hạn không làm hệ thống “tự lành”. Nó có thể tạo tải liên tục, che lỗi dữ liệu và giữ quy trình mắc kẹt mãi mãi.
:::

## State, Audit và Reconciliation Signals

- Test từng điểm dừng giữa các bước và xác nhận Saga tiếp tục từ trạng thái đã lưu.
- Gửi trùng command/event và kiểm tra không giữ hàng, charge hoặc hoàn tiền hai lần.
- Theo dõi số Saga mắc kẹt theo trạng thái và tuổi của Saga cũ nhất.
- Diễn tập quy trình đối soát và ghi lại ai đã quyết định điều gì.

## Interview Answer

“Em dùng Saga như một state machine được persist cho workflow nhiều bước. Mỗi bước có trạng thái, `idempotency key` mà bên nhận hiểu và bằng chứng đã thành công. Timeout được ghi thành `unknown outcome` để tra cứu, không mặc định là thất bại. Retry có giới hạn; hết giới hạn thì chuyển sang manual review có audit log. Compensation, như hoàn tiền, là một business action mới và cũng có thể thất bại nên vẫn phải được theo dõi.”

## Follow-up

### Khi nào chọn orchestration?

Khi quy trình có nhiều nhánh, deadline, bước bù hoặc cần một nơi trả lời “đơn đang ở đâu”. Các service tự phản ứng phù hợp hơn với phản ứng đơn giản giữa vài bên, nhưng vẫn cần correlation ID (mã nối log và event của cùng một đơn) và cách nhìn được toàn luồng.

### Compensation có luôn hoàn tác được không?

Không. Email đã gửi không thể “thu hồi” khỏi trí nhớ người nhận; giá thị trường đã đổi cũng không thể quay lại. Ta chỉ có thể tạo hành động bù hợp lệ về nghiệp vụ và ghi nhận phần không thể đảo ngược.

## Self-check

- Timeout thanh toán sẽ đưa quy trình sang trạng thái nào?
- Điều gì khiến retry dừng lại?
- Người vận hành xem và xử lý Saga mắc kẹt ở đâu?

## Final Recall

- Saga là state machine được persist cho workflow nhiều bước.
- Timeout có thể tạo unknown outcome, không có nghĩa chắc chắn thất bại.
- Compensation là business action mới, có thể lỗi và cần audit trail.
