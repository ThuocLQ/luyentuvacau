# Collections, LINQ và Exceptions

## Quick Summary

- Collection là cách giữ dữ liệu trong bộ nhớ. Chọn theo thao tác chính, không chọn theo thói quen.
- LINQ có thể là thao tác trên dữ liệu đang có trong memory, hoặc mô tả query để thành phần như EF Core dịch sang SQL. Hai việc này không giống nhau.
- Không tìm thấy dữ liệu là kết quả có thể dự đoán; lỗi hạ tầng hoặc bug cần được ghi nhận và xử lý khác.

## Scenario: IQueryable chạy sai boundary

API lịch sử đơn hàng trả `IQueryable<Order>` (mô tả query chưa chạy) lên nhiều tầng. Một tầng khác thêm `Include` (yêu cầu lấy thêm relation), một tầng gọi `ToList()` rồi mới phân trang. Khi database lỗi timeout, tất cả bị catch và trả `400`.

Hậu quả là query khó kiểm soát, tốn RAM và client nhận lỗi sai nghĩa. Cần tách “query chạy ở đâu” và “ai quyết định outcome HTTP”.

## Mental Model

**Bản chất.** `List<T>`, `Dictionary<TKey,TValue>` và `HashSet<T>` là các cấu trúc lưu object trong memory, tối ưu cho các thao tác khác nhau. `IEnumerable<T>` là cách lần lượt lấy phần tử; nó có thể là list có sẵn hoặc nguồn tạo dữ liệu dần.

**Cơ chế.** `IQueryable<T>` giữ một biểu thức query. Provider có thể dịch biểu thức đó sang SQL khi bị thực thi, ví dụ lúc gọi `ToListAsync`, `CountAsync` hoặc duyệt kết quả. Với `IEnumerable<T>`, các method LINQ sau đó thường chạy trong app trên dữ liệu đã lấy về.

**Phạm vi.** Không phải mọi LINQ expression đều dịch được giống nhau trên mọi provider. Khi query vượt qua nhiều tầng, ai cũng có thể thêm filter/join hoặc vô tình thực thi nó; đây là lý do nên để use case sở hữu query shape.

**Đừng hiểu nhầm.** `IEnumerable` không luôn đồng nghĩa “đã có hết trong RAM”; nó có thể lazy. `ToList()` không chỉ là syntax tiện: nó materialize, tức tạo toàn bộ object kết quả lúc đó.

**Ví dụ nhỏ.** Cần kiểm tra một mã đã thấy trong file import: dùng `HashSet<string>`. Cần lấy thông tin khách theo mã: dùng `Dictionary<string, Customer>`. Cần list order: scope tenant, filter, sort, chọn DTO, page rồi mới `ToListAsync`.

## Terms

- **Materialize**: tạo object thực trong memory từ query/stream.
- **Provider**: thành phần hiểu query và thực thi nó, ví dụ EF Core provider cho SQL Server.
- **N+1 query**: lấy danh sách một lần rồi lại phát thêm query cho từng item.
- **Expected outcome**: kết quả nghiệp vụ có thể đoán trước, như không tìm thấy order.

## Decision Workflow

1. Xác định thao tác nóng: duyệt theo thứ tự, tìm theo key hay kiểm tra trùng. Chọn collection phù hợp.
2. Với database, giữ query ở use case có quyền quyết định tenant, filter, sort, projection và page.
3. Đánh dấu ranh giới materialization. Không lấy cả tập dữ liệu về app nếu database có thể filter/page trước.
4. Đo số SQL command, số hàng và payload để tìm N+1 hoặc over-fetching.
5. Trả result rõ cho not-found, validation hoặc conflict. Để exception bất ngờ đi qua error boundary có log và correlation ID.

## Collection và Query Decision Table

| Lựa chọn | Dùng khi | Đổi lại |
|---|---|---|
| `List<T>` | duyệt theo thứ tự, append, truy cập theo vị trí | tìm theo key lặp lại có thể chậm |
| `Dictionary<TKey,TValue>` | cần lấy value bằng key | cần quy tắc key trùng rõ ràng |
| `HashSet<T>` | chỉ cần biết đã có hay chưa | không giữ value theo key |
| `IQueryable` trong use case | còn cần provider filter/project/page | không nên trả rộng qua nhiều boundary |
| DTO đã materialize | đã chốt shape để trả ra ngoài | không thể compose thành SQL thêm |

## Exception Boundary

N+1 thường ẩn trong vòng lặp đọc navigation. Hãy nhìn command count và SQL trước, rồi mới chọn projection, batch hoặc `Include` có chủ đích. `Include` nhiều collection có thể làm số dòng join phình ra, không phải mặc định an toàn.

Đừng dùng exception cho việc “không tìm thấy” nếu đó là outcome bình thường. Cũng đừng catch mọi exception thành `400`: timeout database, lỗi xác thực và bug lập trình không có cùng cách retry hay cùng mức cảnh báo.

## Evidence và test

Test tenant khác nhau, sort/page ở ranh giới và tập dữ liệu lớn. Theo dõi command/request, rows, payload, database latency và p95/p99. Test cả error mapping để client không nhận stack trace hay status sai.

## Interview Answer

“Em chọn cấu trúc dữ liệu theo cách cần tìm, thêm hoặc kiểm tra phần tử. Với database, `IQueryable` mới chỉ mô tả câu truy vấn; dữ liệu chỉ thực sự được lấy khi gọi lệnh như `ToListAsync`. Phần xử lý nghiệp vụ phải quyết định phạm vi công ty, điều kiện lọc, thứ tự, cột cần lấy và cách chia trang trước khi chạy SQL. Trường hợp không tìm thấy được trả thành kết quả rõ ràng; lỗi bất ngờ được ghi lại và đổi thành phản hồi phù hợp ở lớp API, không biến mọi lỗi thành mã 400.”

## Follow-up

- Khi nào `IEnumerable` vẫn có thể tạo dữ liệu chậm hoặc bị duyệt hai lần?
- Vì sao không nên trả `IQueryable` từ API hay application boundary?

## Self-check

- Collection này phục vụ thao tác nào nhiều nhất?
- Query thực thi và materialize ở đâu?
- Lỗi nào là expected outcome, lỗi nào cần alert?

## Final Recall

- Collection theo cách truy cập.
- Query có owner; materialize có thời điểm rõ.
- Outcome bình thường và exception bất ngờ không đi cùng một đường.
