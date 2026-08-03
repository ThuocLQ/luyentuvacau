# Terminology style guide cho cheatsheet Backend .NET

Mục tiêu là viết giống cách một Backend .NET developer Việt Nam giải thích cho đồng nghiệp: giữ thuật ngữ chuẩn của ngành, giải nghĩa ngắn bằng tiếng Việt và không chêm tiếng Anh để làm câu văn có vẻ kỹ thuật hơn.

## Quy tắc dùng thuật ngữ

1. Lần đầu một thuật ngữ quan trọng xuất hiện trong bài, giữ nguyên term và giải thích ngay bằng một câu ngắn.
2. Những lần sau dùng term ngắn, không lặp lại bản dịch.
3. Nếu tiếng Việt tự nhiên và không làm mất nghĩa, ưu tiên tiếng Việt: “ghi dữ liệu”, “giới hạn số request chạy cùng lúc”, “phạm vi ảnh hưởng”.
4. Nếu bản dịch làm developer phải dịch ngược sang tiếng Anh mới nhận ra khái niệm, giữ term tiếng Anh.
5. Một câu chỉ nên giới thiệu một hoặc hai term mới. Nhiều term thì tách câu hoặc dùng bullet.
6. Tên API, type, protocol và pattern được giữ nguyên: `Task.WhenAll`, `CancellationToken`, `DbContext`, REST, gRPC, Outbox, Saga.
7. Vocabulary đã chọn trong body phải được giữ nguyên ở Interview Answer, Follow-up, Quiz, Glossary và Final Recall. Không chuyển sang bản dịch gượng chỉ vì đang tóm tắt.

## Preferred terms

| Preferred term | Giải thích ở lần đầu | Tránh dùng |
|---|---|---|
| request / response | request gửi vào API; response được API trả về | dịch thành “yêu cầu HTTP/phản hồi máy chủ” ở mọi chỗ |
| payload | phần dữ liệu nằm trong request hoặc message | tải trọng |
| endpoint | đường API xử lý một loại request | điểm cuối |
| authentication / authorization | xác định người gọi / kiểm tra người đó được làm gì | dịch lẫn thành “xác thực” mà không phân biệt hai việc |
| claim | thông tin về danh tính nằm trong token | yêu cầu quyền |
| tenant | công ty hoặc nhóm dữ liệu cần tách biệt | người thuê |
| idempotency key | mã đại diện cho cùng một thao tác để retry không tạo side effect mới | khóa chống lặp |
| request fingerprint | hash hoặc canonical representation của payload để phát hiện cùng key nhưng khác request | dấu nhận diện payload |
| side effect | thay đổi nghiệp vụ đã tạo ra, như charge tiền hoặc tạo order | hiệu ứng/tác dụng nghiệp vụ lặp dày |
| unknown outcome | request đã timeout nhưng chưa biết hệ thống phía sau đã tạo side effect hay chưa | trạng thái chưa xác định kết quả của thao tác |
| source of truth | nơi có quyền quyết định trạng thái cuối của dữ liệu | nguồn sự thật |
| cache / cache invalidation | bản sao đọc nhanh / cách làm cache cũ hết hiệu lực | bộ nhớ đệm/vô hiệu hóa bộ nhớ đệm ở mọi chỗ |
| backpressure | giảm hoặc chặn đầu vào khi phía sau không xử lý kịp | áp lực ngược |
| durable queue | queue giữ được job qua process restart | hàng đợi có lưu bền vững |
| durable handoff | job đã được persist trước khi API báo nhận | bàn giao công việc có lưu bền |
| acknowledge / ack | báo message broker rằng message đã được xử lý đến mốc đã cam kết | xác nhận công việc đã được xử lý ở mọi ngữ cảnh |
| producer / consumer | bên publish event / bên nhận và xử lý event | bên sản xuất/bên tiêu thụ |
| dead-letter queue / DLQ | nơi cách ly message không thể tự xử lý | hàng chờ thư chết |
| correlation ID | mã nối log, trace và message của cùng một luồng | mã tương quan |
| trace / metric | đường đi của request / số đo theo thời gian | dấu vết/chỉ số khi gây mơ hồ |
| p95 / p99 | mốc mà 95% / 99% request nhanh hơn | nhóm request chậm mà không nói rõ percentile |
| scale-out | thêm instance để chia tải | mở rộng nhiều phiên bản tiến trình |
| rollback | quay lại phiên bản trước | hoàn tác release |
| blast radius | phạm vi người dùng hoặc hệ thống bị ảnh hưởng | phạm vi thiệt hại |
| business invariant | quy tắc nghiệp vụ không được sai | bất biến đứng riêng không có ví dụ |
| transaction boundary | phạm vi thay đổi có thể commit hoặc rollback cùng nhau | biên giới giao dịch |
| data ownership | nơi hoặc team có quyền quyết định và ghi dữ liệu | chủ sở hữu dữ liệu theo nghĩa con người |
| event ordering | thứ tự event trong phạm vi key hoặc partition đã chọn | thứ tự toàn hệ thống |
| operation ID / transaction reference | ID ổn định dùng để query lại trạng thái một operation | mã thao tác chung chung |
| persist state/response | ghi state hoặc response vào database trước khi báo hoàn tất | trạng thái/kết quả bền |
| recovery / reconciliation flow | flow query, đối soát hoặc xử lý thủ công khi kết quả chưa rõ | đường khôi phục |
| audit trail | history ai hoặc system nào đổi state, lúc nào và vì sao | dấu vết kiểm tra |
| GC / managed heap | GC quản lý object trên managed heap | bộ gom rác ở Interview Answer |
| memory dump / retaining path | snapshot memory và đường reference đang giữ object sống | ảnh chụp bộ nhớ |
| streaming / batch | đọc và xử lý dữ liệu theo stream hoặc từng batch | đọc dữ liệu từng phần hoặc theo lô khi đang nói term chuẩn |
| `ArrayPool<T>` / buffer reuse | thuê và trả buffer để giảm allocation | tái sử dụng vùng nhớ |
| consumer cuối cùng của buffer | phần code cuối cùng còn đọc hoặc ghi buffer | người dùng cuối cùng của buffer |
| concurrency limit | số operation hoặc request được chạy cùng lúc | giới hạn song song |
| downstream load | tải gửi xuống database, provider hoặc service phía sau | tải từ phía sau |

## Cách giới thiệu term

Tốt:

> `Unknown outcome` là trường hợp request đã timeout nhưng client chưa biết hệ thống phía sau có tạo side effect hay chưa. Khi gặp unknown outcome ở payment, tra cứu theo mã giao dịch trước khi retry.

Tốt:

> `Durable handoff` nghĩa là job đã được ghi vào database hoặc message broker trước khi API báo nhận thành công. Job vì thế vẫn còn sau khi process restart.

Không tốt:

> POST có side effect cần khóa chống lặp, dấu nhận diện payload và response được lưu bền.

Viết lại:

> Với API `POST` tạo giao dịch, client có thể retry sau timeout. Server nên dùng `idempotency key`, lưu request fingerprint và kết quả xử lý vào persistent storage để retry không tạo thêm giao dịch.

## Checklist trước khi publish

- Developer Việt Nam có đọc câu này tự nhiên không?
- Người mới có được giải nghĩa ngắn ở lần đầu gặp term không?
- Term dùng trong bài có đúng preferred term của bảng không?
- Có bản dịch gượng khiến người đọc phải dịch ngược sang tiếng Anh không?
- Câu có đang nhồi quá hai khái niệm mới không?
- Tiếng Anh này có giúp nhận diện khái niệm khi interview hay chỉ làm câu văn có vẻ kỹ thuật?
