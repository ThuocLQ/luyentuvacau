# Retry, Ordering, Saga & Consistency

## Quick Summary

Khi payment timeout, “gửi lại ngay” có thể charge hai lần vì provider đã nhận nhưng response chưa về. Retry tốt bắt đầu bằng việc biết outcome có thể đã xảy ra, rồi chỉ lặp lại phần an toàn. Saga giúp điều phối nhiều bước độc lập, không phải rollback database toàn cầu.

## Terms to Know

- [[Retry budget]]: số lần/thời gian retry được phép trước khi dừng và báo lỗi.
- [[Saga]]: workflow nhiều service với state, timeout và bước bù trừ hoặc đối soát.
- [[Reconciliation]]: so sánh state nội bộ với nguồn có thẩm quyền để sửa lệch.

::: definition
Eventual consistency là chấp nhận các phần hệ thống cập nhật lệch nhau trong một khoảng thời gian có kiểm soát, kèm cách hội tụ và thông báo cho người dùng.
:::

## Tình huống phỏng vấn

Order đã tạo, inventory reserve thành công nhưng payment provider timeout. Không thể kết luận payment fail. Nếu retry charge ngay, khách có thể trả tiền hai lần; nếu rollback tất cả, reservation có thể đã thành fact ở service khác.

## Mental model

Mỗi service có transaction riêng. Workflow xuyên service cần state machine: đang chờ gì, lỗi nào retry, khi nào bù trừ, ai xem được trạng thái và ai xử lý trường hợp kẹt. “Eventually” không phải lời hứa mơ hồ; nó phải có giới hạn thời gian và đường recovery.

## Retry đúng phạm vi

Retry lỗi tạm thời như timeout/network với deadline, exponential backoff và jitter. Trước retry side effect, query outcome bằng stable ID nếu có thể. Không retry validation, authorization hoặc payload sai. Khi hết budget, lưu trạng thái cần xử lý thay vì bỏ mất request.

## Ordering và stale message

Broker chỉ thường giữ thứ tự trong một partition. Với `OrderId`, dùng version/sequence hoặc kiểm transition để message cũ không ghi đè state mới. Đừng dựa vào timestamp máy gửi; clock và delivery có thể lệch. Nếu phát hiện gap, giữ/pending event hoặc reconcile theo source of truth.

## Saga: orchestration hay choreography

Orchestration có một coordinator biết state và gửi command; dễ thấy workflow, timeout và audit hơn. Choreography để các service tự nghe event; hợp flow đơn giản nhưng khó biết toàn cảnh khi nhiều bước. Chọn cách nào cũng cần owner của workflow, ID correlation, idempotency, timeout và metric pending age.

Compensation là action nghiệp vụ ngược, ví dụ release reservation; nó không xóa lịch sử hay luôn đảo được external effect. Khi không thể bù trừ, dùng reconciliation/exception workflow có người chịu trách nhiệm.

## Reconciliation là một phần của thiết kế

Đặt job/flow đối chiếu order/payment/inventory theo ID và control total (tổng số lượng hoặc tổng tiền đã biết để so lại). Mismatch phải vào queue có owner, evidence và thao tác an toàn. Đây là cách xử lý late message, bug cũ hoặc provider trả outcome muộn; không phải script chỉ chạy lúc sự cố.

## Bẫy production

- Retry vô hạn làm dependency quá tải và che lỗi dữ liệu.
- Nói “rollback saga” nhưng payment/notification đã xảy ra ngoài hệ thống.
- Tin thứ tự global và để message cũ ghi đè status.
- Không đo pending saga age nên workflow kẹt nhiều ngày mới biết.

## Mẫu trả lời Senior

“Tôi model workflow bằng state rõ, retry có budget và chỉ retry operation idempotent. Với outcome chưa rõ, tôi query/reconcile trước khi tạo effect mới. Saga có owner, timeout và compensation thực sự; phần không bù được đi vào exception/reconciliation có audit.”

## Câu hỏi ôn phỏng vấn

### Khi nào retry trở thành nguy hiểm?

Khi action có side effect và outcome chưa rõ, hoặc lỗi không tạm thời. Khi đó query/dedup/exception workflow an toàn hơn gửi lại mù.

### Saga có rollback như database transaction không?

Không. Các bước đã commit ở owner khác; compensation là business action mới, có thể thất bại hoặc không đảo hết tác động.

## Final recall

- Retry là policy có điều kiện, không phải vòng lặp vô hạn.
- Ordering phải có scope và state cần chống event cũ.
- Saga cần visibility, timeout và reconciliation.
