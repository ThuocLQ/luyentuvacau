# SQL, index và locking: giữ invariant trước, tối ưu sau

## Trong 30 giây

- Constraint và transaction giữ đúng dữ liệu trong boundary database; index phục vụ access pattern, không tự sửa query sai.
- Chọn concurrency/isolation từ anomaly không được chấp nhận, rồi kiểm theo DB provider và workload thật.
- Transaction ngắn, không gọi HTTP/email bên trong; deadlock sửa bằng evidence và lock order, không chỉ tăng timeout.
- Retry chỉ bao local operation idempotent; không retry cả payment workflow có external effect.

## Gặp ở đâu ngoài đời?

Hai request cùng tạo payment cho một order hoặc cùng giảm tồn kho. Cả hai đều đọc “còn đủ”, rồi cùng ghi. Cùng lúc, trang lịch sử order chậm vì query sort hàng lớn; team tăng timeout và deadlock xuất hiện nhiều hơn.

Hai vấn đề này khác nhau: một là invariant/concurrency, một là access pattern/contension. Không có một “bật isolation cao nhất” hay “thêm index” chữa cả hai.

## Hiểu đơn giản trước

**Invariant** là quy tắc không được sai, như “một payment attempt theo request key chỉ có một” hoặc “stock không âm”. Check `if` trong application không đủ khi hai transaction cùng đọc trước khi ghi. Unique constraint, check constraint, conditional update hoặc transaction gần data là guard cuối cùng trong database đó.

Index là cấu trúc giúp DB tìm/sort ít row hơn cho một pattern cụ thể. Mỗi index cũng phải được cập nhật khi insert/update/delete, nên có write/storage cost. Execution plan, locking và isolation phụ thuộc SQL Server/PostgreSQL/Oracle cùng cấu hình; đừng copy lock behavior từ provider khác.

## Terms to Know

- [[Index]]: cấu trúc tăng tốc một số filter/join/sort, có chi phí ghi.
- [[Transaction]]: nhóm thay đổi local cùng commit hoặc rollback.
- [[Isolation level]]: quy tắc transaction thấy dữ liệu concurrent đến mức nào.
- [[Deadlock]]: vòng chờ lock khiến DB hủy một transaction để hệ thống tiếp tục.

## Cách quyết định, từng bước

1. Viết invariant và outcome conflict trước: duplicate key trả gì, stock hết trả gì, user có merge/retry được không.
2. Đặt guard gần owner data: unique/check constraint cho rule biểu diễn được; conditional `UPDATE ... WHERE`/version token cho transition concurrent; transaction cho nhiều thay đổi local phải đi cùng nhau.
3. Với query chậm, lấy SQL, actual plan, parameter, rows estimated/actual, reads và waits. Sửa projection/filter/sort/page trước.
4. Thiết kế index theo predicate/join/order thật; deploy rồi đo latency, reads, write latency và lock impact. Table scan có thể đúng với báo cáo đọc phần lớn bảng.
5. Với blocking/deadlock, lấy deadlock graph/wait evidence, rút transaction, thống nhất thứ tự update và kiểm index. Chỉ sau đó chọn retry có budget+jitter cho database unit idempotent.

## Chọn A hay B?

| Lựa chọn | Dùng khi | Được gì | Đổi lại / không dùng khi |
|---|---|---|---|
| Unique/check constraint | invariant biểu diễn được trong một DB | guard cuối cùng dù nhiều app instance | cần map violation thành outcome nghiệp vụ |
| Optimistic token/conditional update | conflict hiếm, user/workflow quyết định merge | không giữ lock dài | caller phải xử lý conflict, không loop retry mù |
| Pessimistic lock | contention cao và cần serialize ngắn | tránh nhiều conflict | tăng blocking/deadlock risk, provider-specific |
| Composite index | filter/sort/join đã xác định | giảm reads/sort cho pattern đó | thêm write/storage cost; column order phải theo plan |
| Isolation mạnh hơn | anomaly hiện tại không chấp nhận | thay đổi visibility/concurrency | có thể tăng blocking/version-store cost, phải đo theo provider |

## Nếu có lỗi thì sao?

Deadlock không phải lỗi để “tăng timeout”: timeout dài chỉ giữ wait lâu hơn. DB chọn victim; đọc graph để biết transaction nào lock bảng/index nào theo thứ tự nào. Chuẩn hóa order update, giảm dữ liệu/thời gian trong transaction và sửa query/index làm lock dài trước. Sau đó retry đúng local unit với jitter/limit.

Lost update, non-repeatable read hoặc phantom không phải từ khóa để thuộc lòng. Hãy bắt đầu bằng rule: ví dụ stock không âm cần conditional decrement/constraint; báo cáo chấp nhận snapshot cũ có thể không cần lock chặt. Cùng isolation name có implementation khác theo provider, nên ghi rõ DB và kiểm test concurrency.

## Chứng minh mình làm đúng

Viết integration/concurrency test hai transaction tranh cùng invariant; test outcome duplicate/conflict thay vì chỉ assert “không nổ”. Lưu plan/waits/deadlock graph khi chẩn đoán. Sau index/isolation change, so p95/p99, logical/physical reads phù hợp provider, write latency, lock wait/deadlock rate và business conflict/retry rate.

## Nói trong phỏng vấn

“Em bắt đầu bằng invariant và boundary. Nếu không được tạo payment trùng, em đặt unique business key/constraint trong database rồi map conflict rõ cho use case; nếu update tranh chấp, chọn token hoặc conditional update tùy conflict có thể xử lý. Với query chậm em xem SQL, plan, rows và waits trước khi thêm index. Deadlock thì em đọc graph, rút transaction và chuẩn hóa lock order; retry chỉ bọc unit database idempotent, không bọc external payment.”

## Interviewer thường hỏi tiếp

- Một unique constraint đã đủ cho idempotency của API/payment chưa? Boundary nào vẫn cần guard?
- Bạn chọn isolation khi báo cáo chấp nhận dữ liệu hơi cũ nhưng cập nhật stock không được âm như thế nào?

## Tự kiểm trước khi qua bài

- Invariant của tôi đang được bảo vệ ở application, database hay cả hai?
- Index này phục vụ SQL/filter/sort nào và tôi đo write cost ra sao?
- Nếu deadlock xảy ra, evidence nào dẫn tôi đến thay đổi thay vì tăng timeout?

## Nhớ một phút

- Guard invariant gần data; index chỉ phục vụ pattern đã đo.
- Isolation/lock là trade-off provider và workload, không phải setting “cao nhất”.
- Transaction ngắn, retry nhỏ và idempotent giúp recovery an toàn.
