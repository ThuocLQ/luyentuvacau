# Tình huống System Design thường gặp

## Quick Summary

Khi thiết kế payment, notification, upload hay search, đừng chọn công nghệ trước. Bắt đầu từ dữ liệu không được sai, trạng thái người dùng nhìn thấy và cách xử lý khi request/message bị gửi lại.

## Terms to Know

- [[Idempotency boundary]]: điểm nhận diện để chạy lại không tạo thêm kết quả.
- [[Reconciliation]]: đối soát dữ liệu giữa hai hệ thống để sửa sai lệch có audit.
- **Source of truth (nguồn dữ liệu gốc)**: nơi có quyền quyết định trạng thái cuối cùng; cache, queue và search index không thay thế nó.
- **Business fact**: sự việc nghiệp vụ đã xảy ra, ví dụ `OrderConfirmed`, khác với mệnh lệnh yêu cầu hệ khác làm việc.
- **Consumer**: thành phần nhận và xử lý message; nó phải chịu được message đến trùng.
- **DLQ**: hàng đợi giữ message lỗi vĩnh viễn để không retry vô hạn và không chặn luồng chính.

## Mental model

Mỗi scenario trả lời: source of truth ở đâu, trạng thái nào hợp lệ, retry tạo gì, và operator biết lỗi bằng signal nào. Queue không làm việc “tự an toàn”; nó chỉ tách thời gian xử lý, nên consumer vẫn phải chịu duplicate.

## Scenario 1: Order và payment

Client tạo order với idempotency key. Database lưu order `Pending` và intent phát event trong cùng transaction. Nếu provider timeout, query trạng thái bằng reference trước khi retry; timeout không có nghĩa chưa charge. Chỉ confirm order khi có evidence payment phù hợp.

## Scenario 2: Notification

Producer ghi business fact; worker tạo delivery job bền vững. Consent là source of truth, nên kiểm lại trước khi gửi. Timeout có thể retry theo budget; địa chỉ sai/opt-out là lỗi vĩnh viễn và không retry.

## Scenario 3: File upload

API tạo metadata rồi cấp URL upload giới hạn quyền. File chưa scan không được tải như file tin cậy. Worker scan/convert theo `FileId` và version; event trùng chỉ cập nhật một state hợp lệ.

## Scenario 4: Catalog và search

Search index có thể chậm vài giây, nhưng checkout phải kiểm giá/tồn kho từ nguồn gốc. Cache/search phục vụ đọc; không quyết định invariant tài chính hoặc tồn kho.

## Trade-off cần nói

Async giúp request nhanh và chịu burst, đổi lại UI phải hiển thị `pending/queued/failed`, có DLQ và đối soát. Strong consistency giảm sai lệch nhưng tăng latency và dependency trên critical path.

## Cách tự kiểm khi trả lời

- Dữ liệu gốc ở đâu?
- Duplicate, message muộn, timeout xử lý thế nào?
- Người dùng thấy gì khi chưa xong?
- Metric/alert nào báo operator cần can thiệp?
