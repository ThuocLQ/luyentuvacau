# Collections, LINQ và exception: đặt query và lỗi đúng ranh giới

## Trong 30 giây

- Chọn collection theo thao tác chính: `List<T>` để duyệt theo thứ tự, `Dictionary<TKey,TValue>` để tìm theo key, `HashSet<T>` để kiểm tra trùng.
- Với dữ liệu từ database, filter/authorize/sort/project/page trước khi materialize; `ToList()` là ranh giới đưa dữ liệu về memory.
- `IQueryable` là mô tả query còn provider dịch sang SQL; không để nó đi qua use case rồi mất owner.
- Outcome dự đoán được trả result rõ ràng; exception bất ngờ được log/map ở HTTP boundary, không catch tất cả thành `400`.

## Gặp ở đâu ngoài đời?

Trang lịch sử đơn hàng chậm và có lúc hết RAM. Repository trả `IQueryable<Order>`, tầng trên thêm filter sau khi đã join nhiều bảng, rồi gọi `ToList()` trước pagination. Một lỗi database lại bị catch chung và trả `400`, nên client retry sai còn team không thấy incident.

## Hiểu đơn giản trước

`IQueryable` chưa phải dữ liệu; nó là biểu thức để provider (ví dụ EF Core) dịch và chạy. `IEnumerable` là chuỗi đang được duyệt trong app; nó cũng có thể lazy, nên chưa chắc đã là list trong memory. Lúc gọi `ToList`, `First`, `Count` hoặc enumerate là lúc query thực thi/materialize tùy nguồn dữ liệu.

Vì query có chi phí và quyền truy cập, một use case phải sở hữu query shape: tenant scope, filter, sort, cột response và page. Trả `IQueryable` ra ngoài làm caller vô tình đổi SQL, bypass invariant hoặc tạo N+1 khó dự đoán.

## Terms to Know

- [[Query shape]]: filter, join, sort và cột response thực sự cần.
- [[N+1 query]]: lấy danh sách rồi phát sinh thêm query cho từng item.
- **Materialize**: biến query/stream thành object thực trong memory, ví dụ `ToListAsync()`.
- **Expected outcome**: kết quả nghiệp vụ có thể dự đoán như không tìm thấy order; khác với lỗi hạ tầng/bug.

## Cách quyết định, từng bước

1. Nêu access pattern: cần giữ thứ tự, lookup theo key hay loại duplicate? Chọn collection theo thao tác nóng, không theo thói quen.
2. Với list API, scope tenant từ identity ở server, filter, sort ổn định, project DTO, dùng page/cursor rồi mới materialize.
3. Giữ query trong repository/use case có owner. Nếu cần tái dùng, truyền filter specification/DTO có kiểm soát thay vì trả `IQueryable` mở.
4. Đo số SQL command, rows, payload và actual SQL để tìm N+1/over-fetching trước khi thêm `Include`.
5. Map expected outcome ở use case/HTTP boundary (`404`, validation result, conflict); log exception bất ngờ có request/business ID và không lộ chi tiết nội bộ.

## Chọn A hay B?

| Lựa chọn | Dùng khi | Được gì | Đổi lại / không dùng khi |
|---|---|---|---|
| `List<T>` | duyệt theo thứ tự, append, index | đơn giản, cache locality tốt | lookup key lặp lại là O(n) |
| `HashSet<T>` | membership/deduplicate | kiểm tra tồn tại nhanh trung bình | không giữ value theo key, thứ tự không phải contract |
| `Dictionary<TKey,TValue>` | lookup/update theo key | lấy cả value theo key | cần key uniqueness và policy khi key trùng |
| `IQueryable` trong boundary | cần provider translate filter/projection | SQL làm filter/page | không trả ra nhiều tầng hoặc enumerate lặp |
| materialized DTO | boundary public/use case xong query | shape/payload rõ, dễ test | tốn RAM theo page, không compose SQL thêm |

## Nếu có lỗi thì sao?

N+1 không luôn nhìn thấy trong code: vòng lặp đọc navigation property có thể phát thêm query. Khi p99 tăng, log command count/trace database và xem SQL; thường projection hoặc batch theo key tốt hơn `Include` mọi relation. `Include` đôi khi đúng cho graph nhỏ đã biết, nhưng join lớn có thể nhân số dòng.

Đừng dùng exception cho flow bình thường như “không tìm thấy”. Ngược lại, đừng catch mọi exception thành `400`: timeout database, authorization bug hay lỗi mapping cần outcome/alert khác nhau. Cancellation từ client cũng không nên bị log như server error mặc định.

## Chứng minh mình làm đúng

Test list API với tenant khác, sort/page biên và tập dữ liệu lớn. Theo dõi SQL command/request, row/payload size, database latency và p95/p99. Test error mapping: not-found không thành 500, validation không che lỗi hạ tầng và message client không lộ stack trace.

## Nói trong phỏng vấn

“Em chọn collection theo access pattern. Với dữ liệu database, em coi `IQueryable` là query chưa chạy nên giữ nó trong use case có owner: scope tenant, filter, sort, projection và page trước `ToListAsync`. Em đo command count/SQL để tránh N+1. Không tìm thấy là outcome trả result rõ; lỗi hạ tầng hoặc bug được log/map ở boundary thay vì catch hết thành `400`.”

## Interviewer thường hỏi tiếp

- `IEnumerable` có luôn an toàn hơn `IQueryable` không? Khi nào nó vẫn lazy hoặc enumerate hai lần?
- Bạn xử lý duplicate key trong import như thế nào, và unique rule cuối cùng nằm ở đâu?

## Tự kiểm trước khi qua bài

- Query list của tôi materialize ở đâu và ai sở hữu filter tenant/page?
- Tôi có số đo nào chứng minh N+1 hoặc over-fetching?
- Lỗi nào là expected outcome, lỗi nào cần alert?

## Nhớ một phút

- Collection theo access pattern; query theo boundary có owner.
- Filter/project/page trước materialization.
- Expected result và unexpected exception cần đường xử lý khác nhau.
