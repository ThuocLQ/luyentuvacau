# Common Design Scenarios

## Tình huống phỏng vấn

"Hãy thiết kế một hệ thống nhận order, một hệ thống gửi notification, hoặc một API upload file."

Interviewer không chờ một sơ đồ nhiều service. Họ đánh giá cách bạn biến yêu cầu mơ hồ thành quyết định: làm rõ SLO và invariant, chọn boundary/data flow, nhận diện failure mode, rồi nói cách vận hành và phát triển hệ thống. Nếu thiếu dữ kiện, hãy nêu assumption thay vì tự bịa throughput.

## Khung trả lời 8 bước

1. **Làm rõ mục tiêu:** user nào, thao tác chính, phạm vi không làm, data nhạy cảm và compliance.
2. **Chốt SLO và tải:** read/write ratio, peak, payload, p95/p99, availability, RPO/RTO. Nêu assumption và hỏi interviewer xác nhận.
3. **Nêu invariant:** điều gì phải đúng tuyệt đối, điều gì được eventual consistent.
4. **Vẽ luồng happy path nhỏ nhất:** client → API → ownership của state → response; thêm identity/correlation ID.
5. **Chọn data model và boundary:** ai là source of truth, key/partition, index/access pattern, transaction boundary.
6. **Mở rộng theo bottleneck đã dự đoán:** cache/read model/queue/partition/replica chỉ khi đáp ứng requirement cụ thể.
7. **Đi qua failure mode:** timeout, duplicate, stale/out-of-order event, dependency down, deploy/migration, data recovery.
8. **Kết bằng operation và trade-off:** metrics, alert, dashboard/runbook, cost/complexity, điều kiện để đổi thiết kế.

Một câu trả lời tốt đi từ requirement đến mechanism. Nói "dùng Kafka/Redis/microservices" trước khi biết problem là dấu hiệu thiết kế theo công cụ.

## Scenario 1: Order & payment workflow

### Assumption và invariant

Khách tạo order, payment provider authorize/capture, inventory reserve, notification có thể trễ. Invariant: không capture cùng một payment attempt hai lần; order không được transition trái state machine; số lượng đã reserve không vượt khả dụng. Email gửi trùng ít nghiêm trọng hơn ledger/payment sai.

### Thiết kế ban đầu

Order API xác thực caller, nhận idempotency key và tạo `Order`/`PaymentAttempt` trong database transaction. Key, request fingerprint và response được lưu bền để retry client trả cùng kết quả. API thực hiện phần synchronous tối thiểu cần cho UX, ví dụ initiate authorize với provider có provider idempotency key và deadline; các fact đã commit được ghi vào outbox.

Relay publish `OrderCreated`/`PaymentAuthorized`; inventory, fulfillment và notification consume theo business key. Mỗi consumer ghi dedup/effect trong local transaction. Workflow state được model rõ (`Pending`, `Authorized`, `Reserved`, `Confirmed`, `Failed`, `Cancelled`), không chỉ là một boolean.

### Failure và consistency

Provider timeout sau request không chứng minh payment chưa xảy ra: query/reconcile theo provider reference trước khi retry. Relay có thể publish duplicate; consumer phải idempotent. Ordering chỉ kỳ vọng theo `OrderId`/partition; event có version để phát hiện stale/gap. Nếu reserve thành công nhưng fulfillment lỗi, saga owner quyết định retry trong budget hoặc phát compensation idempotent như release reservation/void authorization; action đã xảy ra ngoài đời không thể giả định rollback hoàn toàn.

### Mở rộng và vận hành

Scale API stateless; partition workload theo order/tenant nếu hot key được đo. Không cache balance/inventory stale nếu làm hỏng invariant. Theo dõi checkout p95/p99, payment error/unknown outcome, outbox age, consumer lag, pending saga age, DLQ và reconciliation mismatch. Reconciliation là đường sửa dữ liệu có audit trail, không phải script khẩn cấp duy nhất.

### Trade-off cần nói

Thiết kế này chấp nhận notification và một số read model thấy trễ để đổi lấy availability/retry độc lập. Nó tăng state machine, outbox và vận hành. Nếu business cần payment+inventory quyết định đồng bộ tuyệt đối, phải nêu dependency availability/latency cost và giới hạn thực tế của external provider, không hứa distributed ACID.

## Scenario 2: Notification pipeline

### Assumption và invariant

Một event có thể gửi email, push, SMS; người dùng quản lý consent và có thể unsubscribe. Invariant quan trọng là không gửi tới user đã opt-out và không rò nội dung/PII qua log. Duplicate notification có thể chấp nhận ở mức nào phải được product quyết định; SMS/payment alert thường cần chặt hơn marketing.

### Thiết kế ban đầu

Producer phát business fact qua outbox. Notification service giữ preference/consent source of truth, resolve template và enqueue delivery job bền. Job có delivery identity theo `(event, channel, recipient, template version)` để deduplicate; provider request dùng idempotency key nếu hỗ trợ. Không để request thread gọi SMTP/SMS trực tiếp.

### Failure và scale

Classify lỗi: throttling/timeout có retry budget; invalid address/opt-out/template invalid là permanent và cần trạng thái rõ thay vì retry. Provider callback/bounce cập nhật delivery state idempotent. Partition/limit theo channel hoặc tenant để một chiến dịch không chiếm hết quota; có DLQ, replay tool và audit ai replay lúc nào.

Cache template có version và invalidation rõ. Không cache consent lâu một cách mù quáng. Dashboard cần queue age, success/failure theo provider, retry/DLQ, throttle và duplicate-suppression count.

### Trade-off cần nói

Queue làm delivery resilient nhưng tạo delayed visibility; UI nên hiển thị `queued/sent/failed` thay vì nói "đã gửi" ngay khi command accepted. Multi-provider tăng availability nhưng thêm template parity, routing và reconciliation.

## Scenario 3: File upload & processing

### Assumption và invariant

Người dùng upload file lớn, cần scan virus, trích xuất/convert và tải lại file kết quả. Invariant: không cho file chưa scan truy cập như file trusted; user chỉ được đọc object thuộc tenant/quyền của họ; processing phải chịu retry mà không tạo nhiều artifact mâu thuẫn.

### Thiết kế ban đầu

API tạo metadata record `PendingUpload` và cấp pre-signed upload URL giới hạn object key, content type/size, thời hạn và tenant. Client upload trực tiếp object storage, tránh đi qua web tier. Storage event hoặc callback được xác minh rồi tạo durable processing job theo `FileId`/object version.

Worker scan/convert trong sandbox có resource limit, ghi kết quả vào object version mới và cập nhật state bằng conditional transition. Download URL chỉ cấp sau `Available`; object metadata và access check không tin hoàn toàn vào tên file do client gửi.

### Failure và scale

Upload dở/không callback được dọn bằng TTL/job reconcile. Event duplicate hoặc worker restart được xử lý bằng idempotent file version/state. File độc hại, quá lớn hoặc định dạng không hỗ trợ đi quarantine với retention/audit policy. Queue cho phép bounded concurrency theo CPU/memory; thumbnail/video conversion không được làm trong request path.

### Trade-off cần nói

Direct upload giảm bandwidth web tier nhưng đòi hỏi pre-signed URL, lifecycle policy và audit chặt. Asynchronous processing làm user chờ, đổi lại hệ thống an toàn và scale được; UX cần polling/webhook/status rõ ràng.

## Scenario 4: Read-heavy catalog/search

### Assumption và invariant

Catalog có read traffic cao, update giá/tồn kho; search/facet có thể stale vài giây nhưng checkout phải dùng source of truth. Đừng dùng search index làm nơi quyết định price/inventory cuối cùng.

### Thiết kế ban đầu

Catalog write service sở hữu normalized data và phát outbox event. Search projection/index nhận event idempotent, lưu version để không ghi đè update mới bằng event cũ. Read API dùng cache-aside cho catalog có freshness contract; cache key gồm locale/tenant/version và không chứa data vượt quyền.

Checkout đọc/validate giá và availability từ authoritative service trong transaction/reservation boundary. Khi index lag, UI có thể báo thời điểm update hoặc fallback exact lookup; không cố làm mọi truy vấn full-text transactional.

### Failure và scale

Cache stampede xử lý bằng request coalescing/bounded rebuild và rate limit. Reindex phải có version/alias swap, backfill/replay có kiểm soát, và metric projection lag/mismatch. Partition index theo tenant/catalog khi hot distribution chứng minh cần; test relevance và permission filtering như một contract.

## Cách tự kiểm khi trả lời

Trước khi kết thúc, tự hỏi:

- Invariant nào được database/state machine/constraint bảo vệ? Thành phần nào chỉ eventual consistent?
- Mỗi retry có idempotency key hoặc unique effect chưa? Unknown outcome được reconcile ở đâu?
- Ordering guarantee có scope nào? Event đến cũ/gap thì code làm gì?
- Dependency down, queue đầy, deploy schema mới hoặc operator replay thì điều gì xảy ra?
- Tôi có metric/alert/runbook nào chứng minh hệ thống đang hoạt động và cho phép rollback an toàn?

## Câu hỏi ôn phỏng vấn

### Thiết kế nào bạn đưa ra trước khi biết lưu lượng chính xác?

**Trả lời ngắn:** Em làm baseline đơn giản, stateless ở API, database là source of truth với index/access pattern rõ và boundaries idempotent. Em nêu assumption về SLO/tải, instrument từ đầu, rồi scale cache/queue/partition sau khi thấy bottleneck. Không claim capacity chưa đo.

**Follow-up:** Tín hiệu nào khiến bạn thêm queue? Khi nào cache làm sai business semantics?

**Red flags:** "Dùng microservices + Kafka + Redis ngay từ đầu"; "scale bằng cách tăng server".

### Cách trình bày trade-off khi interviewer đổi requirement?

**Trả lời ngắn:** Em chỉ ra assumption nào đổi, invariant/SLO nào bị tác động, rồi so sánh lựa chọn theo consistency, latency, cost và vận hành. Ví dụ nếu UI phải read-your-write, em dùng synchronous read từ source of truth hoặc trạng thái pending thay vì giả vờ search projection tức thời.

**Follow-up:** Đổi từ eventual sang strong consistency làm dependency nào thành critical path?

**Red flags:** "Kiến trúc tốt là không cần đổi khi requirement đổi".

## Final recall

- System design là chuỗi quyết định có assumption, không phải danh sách service.
- Invariant và SLO định hướng data flow, consistency và scale.
- Failure/reconcile/operation là phần bắt buộc của thiết kế, không phải phần phụ.
