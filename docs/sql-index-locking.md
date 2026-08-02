# SQL, index, transaction và locking: hiểu cách database tìm và bảo vệ dữ liệu

## Trong 30 giây

- Index là một “mục lục” riêng do database duy trì để tìm hàng theo một hoặc vài giá trị. Nó không phải nút bấm làm mọi truy vấn nhanh hơn.
- Constraint, câu lệnh cập nhật có điều kiện và transaction bảo vệ các loại quy tắc khác nhau.
- Cách database đặt lock và cho phép các transaction nhìn thấy nhau phụ thuộc hệ quản trị, cấu hình và câu SQL đang chạy.

## Gặp ở đâu ngoài đời?

Trang đơn hàng lọc theo từng công ty, theo trạng thái rồi sắp xếp theo ngày tạo. Khi bảng lớn, trang chậm. Cùng lúc đó, hai nhân viên cùng bấm trừ tồn kho và số lượng có nguy cơ âm.

Đây là hai việc khác nhau. Index giúp database tìm danh sách nhanh hơn. Còn tồn kho không âm là quy tắc dữ liệu; nó cần một cách ghi an toàn.

## Hiểu đơn giản trước

**Bản chất.** Index là “mục lục” của bảng. Database lấy giá trị của một hay nhiều cột, sắp chúng vào một cấu trúc có thể tra cứu — thường là cây B-tree — rồi lưu kèm thông tin để tìm hàng tương ứng. Đây là dữ liệu phụ: khi bảng thay đổi, database cũng phải cập nhật index.

**Cơ chế.** Với câu SQL `WHERE TenantId = 7 ORDER BY CreatedAt DESC`, database có thể đi thẳng tới phần index của công ty số 7 rồi đọc theo thứ tự ngày đã có sẵn. Tuy vậy, bộ phận chọn cách chạy câu SQL (optimizer) vẫn có thể đọc cả bảng nếu cách đó ít tốn công hơn, chẳng hạn khi truy vấn cần gần như mọi hàng.

**Phạm vi.** Cách tổ chức index, cột được lưu kèm và cách khóa dữ liệu khác nhau giữa SQL Server, PostgreSQL và các hệ quản trị khác. Vì vậy, hãy xem câu SQL và kế hoạch chạy thật của đúng hệ thống đang dùng, thay vì áp dụng một mẹo chung cho mọi database.

**Đừng hiểu nhầm.** Index không sửa được truy vấn lấy quá nhiều cột, nối bảng sai, sắp xếp không ổn định hoặc lấy hết dữ liệu về ứng dụng rồi mới chia trang. Riêng unique index hoặc luật `UNIQUE` còn có thể bảo vệ quy tắc không trùng, nên nó không chỉ phục vụ tốc độ.

**Ví dụ nhỏ.** Muốn “trong cùng một công ty không có hai đơn trùng mã”, đặt luật không trùng trên `(TenantId, OrderCode)`. Muốn “tồn kho không âm”, dùng câu lệnh chỉ trừ khi hàng vẫn còn đủ: `UPDATE ... SET Stock = Stock - @n WHERE Id = @id AND Stock >= @n`. Sau đó kiểm tra database có cập nhật được hàng nào không.

## Từ cần biết

- **Index**: phần mục lục phụ giúp database tra cứu hoặc đọc theo một thứ tự có sẵn.
- **Constraint** (quy tắc database kiểm tra khi ghi): ví dụ `UNIQUE` không cho trùng hoặc `CHECK` kiểm tra điều kiện.
- **Transaction** (nhóm thay đổi commit hoặc rollback cùng nhau): ở đây chỉ bao được các thay đổi trong cùng database.
- **Deadlock**: hai transaction giữ lock mà bên kia cần, nên chúng chờ nhau thành một vòng và database phải hủy một bên.

## Cách quyết định, từng bước

1. Viết quy tắc cần giữ: không trùng mã, tồn kho không âm, hay chỉ cần báo người dùng khi có người sửa trước.
2. Đặt constraint ở nơi trực tiếp ghi dữ liệu, để mọi đường ghi đều phải tuân theo. Dùng `UNIQUE` để không cho trùng; dùng `CHECK` để kiểm tra điều kiện trên một hàng; dùng câu lệnh `UPDATE ... WHERE` hoặc version token để phát hiện hai người cùng sửa.
3. Với truy vấn chậm, lấy câu SQL thật, tham số gần với production và kế hoạch chạy thật. Xem database đã đọc bao nhiêu hàng, nối và sắp xếp ở đâu, chờ ở đâu và cuối cùng trả về bao nhiêu hàng.
4. Thiết kế index theo đúng cách truy vấn đang lọc và sắp xếp. Với index gồm nhiều cột, thứ tự cột rất quan trọng: index tốt cho truy vấn A có thể không giúp truy vấn B.
5. Khi gặp deadlock, xem `deadlock graph`, rút ngắn transaction và cho các luồng update dữ liệu theo cùng một thứ tự. Chỉ retry phần ghi database khi biết việc chạy lại không tạo thêm side effect.

## Chọn A hay B?

| Lựa chọn | Dùng khi | Đổi lại |
|---|---|---|
| Luật `UNIQUE` | dữ liệu không được trùng theo một khóa | cần đổi lỗi trùng thành thông báo nghiệp vụ rõ ràng |
| Luật `CHECK` | điều kiện chỉ cần nhìn dữ liệu trên cùng một hàng | không thay cho quy tắc cần nhìn nhiều hàng hoặc hệ thống bên ngoài |
| Cập nhật kèm mã phiên bản | hai người có thể sửa cùng bản ghi và cần báo có xung đột | ứng dụng phải tải lại hoặc cho người dùng gộp thay đổi |
| Cập nhật có điều kiện | chuyển trạng thái/tồn kho chỉ hợp lệ khi điều kiện còn đúng | cần xử lý trường hợp 0 hàng được cập nhật |
| Index gồm nhiều cột | cách lọc và sắp xếp lặp lại, đã xem kế hoạch chạy | tốn dung lượng và làm thao tác thêm, sửa, xóa dữ liệu nặng hơn |

## Nếu có lỗi thì sao?

Deadlock không phải lý do để tăng timeout. Làm vậy chỉ khiến request chờ lâu hơn. Hãy xem deadlock graph để biết transaction nào đang giữ lock nào, sau đó thống nhất thứ tự update và bỏ những việc không cần thiết ra khỏi transaction. Đừng gọi HTTP hoặc gửi email bên trong transaction database, vì database không thể rollback việc đã xảy ra ở hệ thống bên ngoài.

Nếu câu lệnh không trừ được tồn kho, đó có thể là kết quả bình thường “hết hàng”, không nhất thiết là lỗi 500. Nếu mã phiên bản không còn khớp, báo rằng dữ liệu đã bị người khác sửa để người dùng chọn tải lại, gộp thay đổi hoặc dừng.

## Chứng minh mình làm đúng

Viết bài kiểm tra cho trường hợp hai giao dịch cùng mua món hàng cuối. Trước và sau khi sửa, so sánh kế hoạch chạy thật, lượng dữ liệu database phải đọc, nhóm truy vấn chậm, thời gian ghi và thời gian chờ khóa. Sau khi thêm index, kiểm tra cả thao tác ghi chứ không chỉ trang đọc.

## Nói trong phỏng vấn

“Em tách hai việc: tìm dữ liệu nhanh và giữ dữ liệu luôn đúng. Index là cấu trúc phụ do database duy trì cho một cách filter hoặc sort cụ thể, nên em xem câu SQL và execution plan thật trước khi thêm. Các rule như không trùng mã hoặc tồn kho không âm được bảo vệ bằng constraint ngay tại database. Khi gặp deadlock, em xem deadlock graph, rút ngắn transaction và thống nhất thứ tự update. Em chỉ retry phần ghi khi biết chạy lại không tạo thêm side effect.”

## Interviewer thường hỏi tiếp

- Vì sao index `(TenantId, CreatedAt)` không tự tối ưu tốt cho query chỉ lọc `CreatedAt`?
- Khi nào `CHECK` chưa đủ để bảo vệ quy tắc nghiệp vụ?

## Tự kiểm trước khi qua bài

- Tôi đang giải quyết truy vấn chậm hay quy tắc dữ liệu bị phá vỡ?
- Index này phục vụ SQL nào, và kế hoạch thực thi thực tế nói gì?
- Nếu dữ liệu đã bị người khác sửa trước, người dùng nhận thông báo và lựa chọn nào?

## Nhớ một phút

- Index là mục lục do database duy trì; nó được chọn theo kế hoạch chạy, không phải phép màu.
- Luật đặt trong database giữ dữ liệu đúng; một giao dịch chỉ bao được thay đổi trong database đó.
- Muốn sửa deadlock, hãy nhìn deadlock graph thật trước.
