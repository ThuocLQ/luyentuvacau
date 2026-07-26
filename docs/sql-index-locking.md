# SQL, Index, Transactions & Locking

## Tình huống phỏng vấn

"Hai request cùng tạo lệnh cho một business key, một request deadlock. Làm sao vừa giữ đúng dữ liệu vừa không tạo tác dụng phụ trùng?"

Câu trả lời Senior mở đầu bằng **invariant**: điều gì tuyệt đối không được sai? Sau đó mới nói đến unique constraint, transaction, isolation, index và retry. Timeout hay retry không phải cơ chế bảo toàn nghiệp vụ.

## Mental model

Database đồng thời làm hai việc: bảo vệ tính đúng đắn khi nhiều transaction tranh chấp, và chọn execution plan để truy cập dữ liệu. Lock là hệ quả bình thường của concurrency; vấn đề là lock giữ quá lâu, thứ tự truy cập không nhất quán, hoặc workload/index làm transaction đọc-ghi nhiều hơn cần thiết.

Ứng dụng có thể pre-check, nhưng database constraint mới là hàng rào cuối cùng khi request chạy song song.

## Invariant trước, cơ chế sau

| Invariant/tình huống | Cơ chế chính | Điều cần xử lý ở ứng dụng |
|---|---|---|
| Không trùng mã nghiệp vụ | `UNIQUE` constraint/index | map duplicate-key thành kết quả/idempotent response phù hợp |
| Không tạo bản ghi con mồ côi | foreign key | xử lý lỗi domain/validation rõ ràng |
| Không ghi đè bản cập nhật người khác | rowversion/optimistic concurrency | reload/merge/cho người dùng quyết định |
| Chuyển trạng thái nhiều hàng nguyên tử | transaction ngắn, constraint | xác định lock order và retry cục bộ nếu transient |
| Số dư/giới hạn không âm | transaction cùng điều kiện/constraint theo model | không dựa vào read-then-write ngoài transaction |

Không có isolation level nào tự biến một mô hình dữ liệu thiếu constraint thành đúng.

## Index và execution plan

Index là cấu trúc phục vụ **một access pattern cụ thể**, không phải sticker "nhanh" cho cột. Đọc query thật: `WHERE`, `JOIN`, `ORDER BY`, cột projection, số hàng và độ chọn lọc. Với composite index, thứ tự key thường cần phục vụ predicate equality trước, sau đó là range/order — nhưng hãy để plan và workload xác nhận, không học thuộc một công thức.

Index có chi phí: ghi/update nhiều hơn, tốn storage, maintenance và có thể làm optimizer chọn plan khác. Một covering index có thể giảm lookup cho hot read, nhưng không nên bọc mọi cột chỉ để tránh lookup.

Khi chẩn đoán, xem actual plan và actual rows thay vì chỉ nhìn estimated plan. Các dấu hiệu đáng điều tra gồm scan trên bảng lớn, sort/hash/spill tốn tài nguyên, chênh lệch estimate-thực tế, lock wait và blocked session. Scan không mặc định là lỗi: quét phần lớn bảng đôi khi rẻ hơn seek + lookup.

## Isolation, blocking và deadlock

`Read committed` là điểm khởi đầu phổ biến nhưng không có nghĩa hai lần đọc luôn giống nhau. Các database/cấu hình khác nhau có snapshot semantics khác nhau; khi trả lời hãy nêu rõ engine đang dùng và anomaly cần tránh thay vì khẳng định một isolation "tốt nhất".

- **Optimistic concurrency** phù hợp khi conflict hiếm và có cách giải quyết rõ ràng.
- **Pessimistic locking/stricter isolation** có thể cần khi invariant yêu cầu serial behavior trong đoạn ngắn, đổi lại là contention và throughput thấp hơn.
- **Deadlock** xảy ra khi transaction chờ vòng tròn; nó không đồng nghĩa database hỏng. Hãy lấy deadlock graph, tìm resource và thứ tự truy cập, rồi chuẩn hóa thứ tự/giảm scope.

Giữ transaction ngắn: validate đầu vào trước, đọc/ghi local cần thiết, commit, rồi mới gọi service ngoài. Không giữ transaction trong lúc chờ HTTP, user input hoặc broker.

## Retry đúng phạm vi

Deadlock victim và vài lỗi kết nối là transient theo định nghĩa vận hành, nhưng retry chỉ an toàn cho **đơn vị database local idempotent**. Bounded retry có exponential backoff và jitter; ghi nhận retry count để thấy contention thay vì che nó đi.

Không retry nguyên workflow nếu workflow đã gọi cổng thanh toán, gửi email hay publish message không có idempotency boundary. Commit state + outbox trong transaction local, sau đó để relay/consumer xử lý retry theo cơ chế của chúng.

## Bẫy production

- Tăng command timeout chỉ khiến lock được giữ lâu hơn; nó không giải quyết deadlock hoặc query plan tệ.
- `SELECT` trước rồi `INSERT` không thay thế `UNIQUE` constraint vì hai request có thể cùng vượt qua bước đọc.
- Offset pagination sâu có thể giữ/read nhiều hơn mong đợi; dùng seek pagination nếu access pattern là feed tuần tự.
- Thêm index theo từng ticket có thể làm write path chậm và gây index bloat. Quyết định dựa trên plan, tần suất read/write, và theo dõi sau deploy.

## Mẫu trả lời Senior

"Invariant ở đây là một business key chỉ có một bản ghi và trạng thái chuyển đổi không bị ghi đè. Em enforce uniqueness bằng constraint, giữ local transaction thật ngắn và dùng concurrency token khi cập nhật cạnh tranh. Với deadlock, em lấy graph để biết hai transaction giữ/chờ resource nào, chuẩn hóa thứ tự truy cập và tối ưu query/index để giảm thời gian lock. Em chỉ retry phần database idempotent với backoff có giới hạn; external side effect nằm ngoài transaction và đi qua idempotency/outbox. Em theo dõi deadlock rate, lock wait, conflict rate và slow plan để chứng minh thay đổi hiệu quả."

## Câu hỏi ôn phỏng vấn

### Xử lý deadlock trong cập nhật order hoặc payment thế nào?

**Trả lời ngắn:** Lấy deadlock graph trước, rút ngắn transaction và ép các code path truy cập tài nguyên theo cùng thứ tự. Sau đó retry có giới hạn chỉ cho transaction database idempotent. Không lặp lại payment/email/remote call trong retry đó.

**Follow-up:** Unique constraint bảo vệ invariant nào? Làm sao biết index thay đổi có làm write path đắt hơn?

**Red flags:** "Tăng timeout"; "retry cả workflow mãi mãi".

### Chọn isolation level bằng cách nào?

**Trả lời ngắn:** Từ anomaly làm hỏng invariant và workload contention. Xác định engine/cấu hình hiện tại, thử phương án optimistic hoặc constraint trước; chỉ tăng isolation/lock scope khi cần serial behavior đã được chứng minh, sau đó đo blocking và throughput.

**Follow-up:** Snapshot isolation thay đổi read/write conflict ra sao trên database bạn dùng?

**Red flags:** "Serializable luôn an toàn nhất nên luôn dùng".

## Final recall

- Constraint bảo vệ invariant; pre-check chỉ hỗ trợ UX.
- Index phục vụ query shape đã đo và có write cost.
- Deadlock cần graph, scope nhỏ, lock order nhất quán và retry có giới hạn.
- Không giữ database transaction qua remote I/O.
