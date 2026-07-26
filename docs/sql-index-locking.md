# SQL, Index, Transactions & Locking

## Quick Summary

Một endpoint danh sách đơn hàng chậm không có nghĩa là “thiếu index”. Trước hết xem nó đọc bao nhiêu dòng, lọc/sắp xếp thế nào và có đang chờ transaction khác hay không. Index, transaction và retry chỉ đúng khi phục vụ một vấn đề đã đo được.

## Terms to Know

- [[Index]]: cấu trúc giúp database tìm ít dòng hơn.
- [[Transaction]]: nhóm thay đổi cùng thành công hoặc cùng thất bại.
- [[Deadlock]]: hai transaction chờ nhau giữ tài nguyên nên database phải hủy một bên.

::: production-trap
Thêm index theo cảm giác có thể làm ghi dữ liệu chậm hơn và vẫn không sửa query sai.
:::

## Tình huống phỏng vấn

Ví dụ trang lịch sử đơn hàng chậm sau khi dữ liệu tăng. Nếu API lấy cả bảng rồi mới lọc ở code, database phải đọc rất nhiều dữ liệu. Người dùng chờ lâu; khi tải tăng, các request chồng lên nhau và có thể gây blocking.

## Mental model

Database cần giữ đúng dữ liệu trước, rồi mới nhanh. Unique constraint bảo vệ “một mã đơn chỉ có một lần”; transaction bảo vệ nhiều thay đổi phải đi cùng nhau. Index giúp tìm dữ liệu nhanh hơn, nhưng mỗi lần insert/update database cũng phải cập nhật index.

## Invariant trước, cơ chế sau

Hãy nêu quy tắc không được sai: không tạo hai payment cho cùng request, số lượng hàng không âm, trạng thái order không nhảy từ `Cancelled` sang `Paid`. Đặt quy tắc bằng constraint và điều kiện cập nhật trong database. Kiểm tra bằng `if` ở application có thể bị hai request chạy đồng thời vượt qua.

## Index và execution plan

Khi query chậm, lấy SQL thật và execution plan (kế hoạch database chọn để chạy query). Xem điều kiện lọc, join, sắp xếp, số dòng ước tính so với thực tế và logical reads. Sau đó sửa query shape: chỉ chọn cột cần dùng, phân trang theo key ổn định, tránh `Include`/join làm nhân bản dữ liệu.

Chỉ thêm composite index khi biết access pattern, ví dụ lọc theo `TenantId`, `Status` rồi sắp theo `CreatedAt`. Đo lại latency, reads và chi phí ghi sau deploy. Scan toàn bảng vẫn có thể đúng nếu báo cáo thực sự đọc phần lớn bảng.

## Isolation, blocking và deadlock

Transaction dài giữ lock lâu: transaction khác phải chờ, nên latency tăng dù CPU thấp. Giữ transaction ngắn, không gọi HTTP/email bên trong transaction và truy cập bảng theo cùng thứ tự. Deadlock là vòng chờ; đọc deadlock graph để biết lock nào tạo vòng, rồi sửa thứ tự hoặc query/index.

## Retry đúng phạm vi

Database có thể chọn một transaction làm “victim” khi deadlock. Chỉ retry operation database nhỏ, idempotent (chạy lại không tạo hiệu ứng mới), có giới hạn và jitter. Không retry cả payment/email trong transaction vì có thể đã gửi side effect trước khi lỗi.

## Bẫy production

- Tăng timeout để che blocking thay vì tìm transaction/query giữ lock.
- Dùng offset lớn cho bảng khổng lồ rồi ngạc nhiên khi trang cuối chậm.
- Chỉ tin ORM log mà không xem SQL và plan thực tế.
- Retry vô hạn khiến load tăng đúng lúc database đang nghẽn.

## Mẫu trả lời Senior

“Tôi bắt đầu từ invariant và evidence. Với endpoint chậm, tôi xem SQL, plan, rows và waits; sửa query shape trước rồi mới thêm index theo filter/sort thực tế. Với deadlock, tôi đọc graph, rút transaction và chuẩn hóa lock order. Retry chỉ bao quanh database unit idempotent, không bao quanh external side effect.”

## Câu hỏi ôn phỏng vấn

### Xử lý deadlock trong cập nhật order hoặc payment thế nào?

Đọc deadlock graph, giảm phạm vi/thời gian transaction, thống nhất thứ tự lock và kiểm tra index. Sau đó retry có giới hạn operation local đã idempotent.

### Chọn isolation level bằng cách nào?

Chọn từ invariant và mức đọc cũ có thể chấp nhận, rồi kiểm bằng workload thật. Isolation mạnh hơn giảm anomaly nhưng có thể tăng blocking hoặc version-store cost.

## Final recall

- Constraint/transaction bảo vệ correctness; index phục vụ access pattern.
- Plan và số liệu quyết định index, không phải tên cột.
- Transaction ngắn và retry đúng boundary giúp hệ thống hồi phục an toàn.
