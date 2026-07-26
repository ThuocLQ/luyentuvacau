# Câu hỏi đào sâu và trade-off Senior

## Quick Summary

Follow-up thường đổi điều kiện: tải tăng, partner timeout hoặc dữ liệu cần chính xác hơn. Đừng đổi công nghệ ngay; nêu điều kiện mới, invariant bị ảnh hưởng và lý do quyết định phải đổi.

## Terms to Know

- [[Trade-off]]: lợi ích đổi lấy chi phí hay rủi ro cụ thể.
- [[Failure mode]]: cách hệ thống có thể hỏng trong điều kiện đã nói.

## Mục tiêu của follow-up

Interviewer muốn biết bạn có áp dụng máy móc không. Câu trả lời tốt nói được “với tải hiện tại tôi chọn A; nếu B xảy ra, tôi đo C rồi chuyển sang D”.

## 1. Runtime, async và concurrency

Nếu fan-out tăng, hỏi downstream chịu được bao nhiêu concurrent request. Bound concurrency theo capacity; `async` không tạo thêm capacity. Nếu work phải sống qua restart, dùng durable queue chứ không `Task.Run`.

## 2. API, DI và security

Nếu client retry sau timeout, idempotency record phải nhận ra caller, operation và payload. JWT hợp lệ chưa đủ: authorization còn kiểm resource và tenant.

## 3. Data correctness

Nếu hai request cùng update, unique constraint, transaction hoặc concurrency token giữ invariant. Đừng retry mù nếu operation có external side effect.

## 4. Architecture và integration

Tách service khi ownership, team hoặc scale độc lập có bằng chứng. Sync call cần response ngay; event chấp nhận trễ nhưng cần consumer idempotent.

## 5. Cách tự chấm

Nghe lại câu trả lời: người khác có biết bạn chọn gì, không chọn gì, lỗi nào còn lại và signal nào báo sai không? Nếu không, câu vẫn là khẩu hiệu.

## Final recall

- Nêu assumption.
- Nêu điều đổi khi constraint đổi.
- Nêu evidence thay vì nói “tối ưu/an toàn”.
