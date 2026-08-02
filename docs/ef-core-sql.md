# EF Core và SQL: LINQ chỉ là điểm bắt đầu

## Trong 30 giây

- EF Core nhận biểu thức LINQ, dịch phần hệ quản trị database hỗ trợ sang SQL, gửi SQL cho database và tạo object từ kết quả trả về.
- Database, không phải tên method LINQ, chọn kế hoạch đọc/join/sort. Vì vậy phải xem SQL và plan (cách database định đọc dữ liệu) khi chậm.
- Tracking giúp EF biết entity nào đã đổi để `SaveChanges` ghi lại. No-tracking hợp với nhiều màn hình chỉ đọc, nhưng không tự cứu query lấy quá nhiều dữ liệu.

## Gặp ở đâu ngoài đời?

`GET /orders` chỉ hiển thị 20 đơn mỗi trang nhưng chậm dần. Code `Include` nhiều collection, gọi `ToListAsync()` trước rồi mới cắt trang. Team thêm `AsNoTracking()` nhưng thời gian gần như không đổi.

Vấn đề chính là app lấy quá nhiều hàng và quá nhiều cột. Tracking chỉ là một phần chi phí sau khi database đã trả dữ liệu.

## Hiểu đơn giản trước

**Bản chất.** EF Core là ORM: nó ánh xạ object .NET với dữ liệu quan hệ. Một LINQ query chưa phải dữ liệu; EF Core dịch nó sang SQL của hệ quản trị database, database chạy SQL, rồi EF Core lấy kết quả về và tạo object .NET trong RAM (materialize).

**Cơ chế.** Query list tốt thường đi theo thứ tự: giới hạn tenant → filter → sort có thứ tự rõ → chọn đúng cột cần trả → phân trang → mới lấy kết quả về. Sau đó EF Core có thể theo dõi entity trong Change Tracker để phát hiện thay đổi khi gọi `SaveChanges`.

**Phạm vi.** SQL sinh ra, index hỗ trợ, plan, lock và khả năng dịch LINQ phụ thuộc hệ quản trị database và phiên bản. Một biểu thức chạy với SQL Server chưa chắc tương tự với hệ khác.

**Đừng hiểu nhầm.** `AsNoTracking()` không làm database đọc ít hàng hơn. Ngược lại, tracking không luôn tệ: nó có identity resolution, tức cùng một entity có thể được dùng lại trong context thay vì tạo nhiều object.

**Ví dụ nhỏ.** Trang danh sách chỉ cần mã, trạng thái, ngày tạo: `Select` thẳng sang DTO rồi `AsNoTracking()` là hợp lý. Màn hình sửa một đơn: load entity cần sửa, đặt concurrency token nếu có nguy cơ ghi đè, sau đó `SaveChanges` là hợp lý.

## Từ cần biết

- **Query shape**: cột, filter, join, sort và số hàng endpoint thực sự cần.
- **Materialize**: biến kết quả database thành object trong bộ nhớ, ví dụ `ToListAsync()`.
- **Tracking**: EF giữ thông tin entity để nhận ra thay đổi và ghi bằng `SaveChanges`.
- **Execution plan**: cách database chọn đọc, join và sort cho SQL cụ thể.

## Cách quyết định, từng bước

1. Chốt symptom: route nào chậm, input nào, bao nhiêu hàng, p95/p99 và DB đang chờ gì.
2. Lấy SQL thật, command count và actual plan với tham số gần thực tế. Đừng kết luận từ LINQ nhìn có vẻ đẹp.
3. Sửa query shape trước: tenant filter, projection, sort deterministic và page trước khi materialize.
4. Chọn tracking theo mục đích. List chỉ đọc thường dùng DTO/no-tracking; update cần entity hoặc update có điều kiện.
5. Chỉ cân nhắc `Include`, split query, index hay cache sau khi biết chúng thay đổi SQL và dữ liệu trả về thế nào.

## Chọn A hay B?

| Lựa chọn | Dùng khi | Đổi lại |
|---|---|---|
| DTO projection + no-tracking | response chỉ đọc, không cần entity để sửa | không có entity tracked để sửa rồi `SaveChanges` |
| Tracking query | read-modify-write trong một context ngắn | tốn theo dõi/snapshot; không dùng như cache toàn app |
| `Include` có chủ đích | cần một graph nhỏ trong một response | nhiều collection có thể nhân số dòng do join |
| Split query | join nhiều collection gây trùng dữ liệu đáng kể | nhiều round-trip; cần chú ý consistency và sort unique khi phân trang |
| Keyset pagination | người dùng đi tiếp theo một thứ tự ổn định | không nhảy tự do đến mọi số trang như offset |

## Nếu có lỗi thì sao?

N+1 là một query lấy danh sách rồi phát thêm query cho từng item. Đừng đoán từ code: log số command mỗi request và xem SQL. `Include` không luôn sai, nhưng nhiều collection có thể làm dữ liệu lặp rất lớn; projection hoặc batch theo key thường rõ hơn.

Khi hai người sửa cùng ticket, version token có thể khiến update thứ hai không khớp. Đây là conflict cần quyết định nghiệp vụ, không phải exception để retry mù. Còn HTTP/email không nên nằm trong transaction database vì database không thể rollback side effect đã xảy ra ở hệ thống ngoài.

## Chứng minh mình làm đúng

Test tenant filter, page boundary, thứ tự sort và hai update đồng thời. Theo dõi command count, rows/payload, actual plan, DB wait, pool wait và p95/p99. So sánh trước/sau với cùng tham số thay vì benchmark local nhỏ.

## Nói trong phỏng vấn

“Em coi câu LINQ là đầu vào, chưa phải bằng chứng về hiệu năng. EF Core dịch nó thành SQL, database chọn cách chạy, rồi EF tạo các đối tượng trong bộ nhớ và có thể ghi nhớ chúng để phát hiện thay đổi. Với API danh sách, em giới hạn đúng công ty, lọc, sắp xếp, chỉ lấy các cột cần trả và chia trang trước `ToListAsync`. Chế độ không theo dõi chỉ phù hợp với màn hình đọc; nó không làm database tự đọc ít dữ liệu hơn. Khi hai người cùng sửa, em dùng mã phiên bản hoặc câu lệnh cập nhật có điều kiện và trả thông báo xung đột phù hợp cho người dùng.”

## Interviewer thường hỏi tiếp

- Vì sao no-tracking đôi khi tạo nhiều instance cho cùng một row liên quan?
- Split query đổi lợi ích join lớn lấy rủi ro gì?

## Tự kiểm trước khi qua bài

- Tôi đã xem SQL, actual plan và parameter thật chưa?
- `ToListAsync` nằm sau filter, projection và page chưa?
- Đây là read-only hay read-modify-write, và tracking có phục vụ mục đích đó không?

## Nhớ một phút

- LINQ không phải SQL; plan mới nói database làm gì.
- Lấy đúng shape trước, tối ưu tracking sau.
- Conflict cần outcome rõ, không retry ghi đè.
