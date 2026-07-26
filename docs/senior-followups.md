# Senior Follow-up & Trade-off Questions

## Mục tiêu của follow-up

Câu hỏi Senior thường bắt đầu từ một câu trả lời đúng nhưng chung chung: "dùng cache", "thêm index", "dùng outbox", "scale ngang". Follow-up kiểm tra liệu bạn có thể nêu điều kiện đúng, failure mode, cách đo và quyết định khi requirement đổi không.

Khi luyện, trả lời theo khung ngắn: **bối cảnh → invariant/SLO → lựa chọn → trade-off/failure → bằng chứng vận hành**. Không cần kể mọi công nghệ; cần nói điều gì sẽ làm bạn đổi quyết định.

## 1. Runtime, async và concurrency

### "Đã `await` rồi, tại sao endpoint vẫn cạn ThreadPool?"

**Cách trả lời:** `await` không tạo thread cho I/O, nhưng thread vẫn có thể bị block bởi `.Result`, lock dài, synchronous I/O, CPU-bound work hoặc continuation bị chậm. Em xem thread-pool queue/thread count, CPU, trace và code path blocking; chuyển I/O sang async end-to-end, tách CPU work có giới hạn, propagate cancellation và không tạo fan-out không giới hạn.

**Trade-off/failure:** Tăng min threads có thể che starvation ngắn hạn nhưng không sửa blocking/dependency saturation. `Task.Run` trong request chỉ chuyển áp lực sang ThreadPool.

**Tự kiểm:** Nếu downstream chậm, cancellation/deadline đi tới đâu? Fan-out tối đa là bao nhiêu và tại sao?

## 2. API, DI và security

### "Idempotency key có cần thiết cho mọi POST không?"

**Cách trả lời:** Không. Em dùng khi retry có thể tạo side effect đáng kể như create order/payment/provisioning. Key được scope theo caller, kèm fingerprint và response bền; replay cùng payload trả kết quả cũ, payload khác bị từ chối. Với command naturally idempotent như set preference về một giá trị xác định, contract/conditional update có thể đủ.

**Trade-off/failure:** Record TTL quá ngắn bỏ sót mobile retry/delayed replay; quá dài tăng storage/privacy. In-memory cache không sống qua restart/scale-out. Idempotency không thay authorization, validation hay database invariant.

**Tự kiểm:** Crash giữa lúc process key và commit business effect thì state nào được lưu? Ai được quyền replay key?

### "Vì sao singleton không được inject scoped DbContext?"

**Cách trả lời:** Singleton sống lâu hơn request scope, còn `DbContext` scoped và không thread-safe. Nó có thể giữ object disposed hoặc state cross-request. Với background/singleton service, tạo scope tại operation boundary hoặc dùng `IDbContextFactory`; đảm bảo mỗi unit of work có lifetime rõ.

**Tự kiểm:** Factory có làm transaction xuyên nhiều request không? Service nào thật sự safe singleton?

## 3. Data correctness

### "Bạn thêm index nào cho endpoint chậm?"

**Cách trả lời:** Em không chọn trước khi có SQL/actual plan. Em kiểm tra predicate, join, sort, rows thực tế, selectivity và read/write mix; sửa query shape/pagination trước, sau đó đề xuất composite/covering index cho access pattern. Em đo latency, logical reads, plan và write cost sau deploy.

**Trade-off/failure:** Index quá nhiều làm insert/update/maintenance đắt hơn. Scan có thể đúng khi query đọc phần lớn bảng. Một index tốt cho tenant nhỏ có thể không tốt với tenant lớn/parameter distribution khác.

**Tự kiểm:** Invariant nào phải là unique constraint chứ không phải index performance? Bạn rollback index migration an toàn thế nào?

### "Deadlock thì retry là đủ phải không?"

**Cách trả lời:** Retry bounded chỉ là recovery sau khi em xem deadlock graph, rút transaction, chuẩn hóa lock order và tối ưu query/index để giảm contention. Em retry duy nhất local database operation idempotent; external payment/email/message không nằm trong retry transaction.

**Trade-off/failure:** Retry có thể làm load burst và duplicate effect nếu boundary sai. Tăng timeout không sửa wait cycle.

**Tự kiểm:** Operation nào bị duplicate nếu process chết sau commit? Lock/resource nào tạo cycle?

## 4. Architecture và integration

### "Tại sao chưa tách microservice?"

**Cách trả lời:** Em giữ modular monolith khi boundary/team ownership/independent scale chưa được chứng minh. Nó có transaction, deploy và debugging đơn giản hơn; module boundary vẫn được enforce. Em tách khi có domain ownership, release cadence, data/access pattern hoặc blast radius độc lập và có năng lực vận hành contract/observability.

**Trade-off/failure:** Tách sớm tạo network failure, eventual consistency, distributed tracing và nhiều deployment. Không tách cũng có nguy cơ module coupling; cần architecture tests/ownership rõ.

**Tự kiểm:** Service mới sở hữu data gì? Nếu dependency down, user journey có còn chạy không?

### "REST, gRPC hay event cho use case này?"

**Cách trả lời:** Em chọn từ caller expectation. REST phù hợp public/client contract, gRPC khi nội bộ kiểm soát hai đầu và schema/streaming/latency mang giá trị rõ, event cho fact đã commit và work chịu được delay. Mọi lựa chọn vẫn cần auth, deadline, schema evolution, idempotency và telemetry.

**Trade-off/failure:** Event không làm request quyết định tức thời; synchronous chain làm availability/latency phụ thuộc nhau. gRPC không cứu database-bound endpoint.

**Tự kiểm:** Consumer cần thứ tự nào? Caller có thể nhận `accepted/pending` hay phải có final answer ngay?

## 5. Distributed consistency

### "Outbox đã bảo đảm exactly-once chưa?"

**Cách trả lời:** Chưa. Outbox atomically lưu local state và event intent, loại bỏ dual-write gap. Relay có thể publish lại sau crash, consumer có thể receive lại, nên effect phải idempotent bằng dedup/unique invariant/version. Ordering chỉ có scope; replay và reconcile là cần thiết.

**Trade-off/failure:** Dedup retention quá ngắn làm late replay tạo duplicate; quá dài tốn storage. Broker setting không làm external provider exactly once.

**Tự kiểm:** Relay đánh dấu published sau xác nhận thế nào? Metric nào cho thấy outbox đang kẹt?

### "Saga compensation có phải rollback không?"

**Cách trả lời:** Không. Saga là state machine gồm local commits và compensation nghiệp vụ. `ReleaseReservation` hoặc `VoidAuthorization` có semantics, có thể duplicate/fail và không luôn đảo được effect ngoài đời. Em đặt owner, timeout, pending state, audit và reconciliation cho unknown outcome.

**Trade-off/failure:** Choreography đơn giản ban đầu nhưng khó nhìn khi nhiều consumer; orchestration rõ flow nhưng là component cần durable state/HA.

**Tự kiểm:** Bước nào không thể compensate? Ai xử lý saga treo quá deadline?

## 6. Performance và production

### "p99 tăng gấp mười sau deploy, việc đầu tiên là gì?"

**Cách trả lời:** Em giảm impact trước: đối chiếu deploy/flag, error rate, p95/p99, saturation và rollback/disable nếu bằng chứng rõ. Sau đó dùng trace+metrics để xác định app, DB, queue hay downstream; bảo toàn evidence và giao tiếp status. Root cause sau stabilization.

**Trade-off/failure:** Restart hàng loạt xóa evidence và có thể làm retry storm. Scale web tier khi DB lock/downstream throttle có thể tăng pressure.

**Tự kiểm:** Alert nào báo trước breach? Rollback có compatibility với schema/message mới không?

### "Khi nào cache trở thành bug?"

**Cách trả lời:** Khi freshness/permission/invalidation không khớp semantics: user thấy balance/inventory cũ, cache key rò tenant, hoặc miss đồng thời làm stampede. Em chỉ cache data có staleness contract, có TTL/invalidation/observability và fallback không làm origin sập.

**Trade-off/failure:** Cache hit rate tốt vẫn che hot key và stale data. Distributed cache thêm outage/eviction/network dependency.

**Tự kiểm:** Dữ liệu này được stale bao lâu? Cache down thì traffic chuyển đi đâu?

## 7. Cách tự chấm một câu trả lời

Sau mỗi câu, tự chấm 0–2 cho từng tiêu chí:

| Tiêu chí | 0 | 1 | 2 |
|---|---|---|---|
| Chính xác | slogan/cường điệu | đúng nhưng thiếu điều kiện | nêu rõ scope và giới hạn |
| Trade-off | chỉ một giải pháp | có nhắc nhược điểm | chọn theo invariant/SLO và điều kiện đổi hướng |
| Failure mode | không nói lỗi | nói retry chung chung | duplicate, timeout, ordering, recovery cụ thể |
| Evidence | "em sẽ tối ưu" | có metric chung | metric/trace/plan/alert và cách kiểm chứng |
| Trình bày | lan man | có cấu trúc một phần | 1–2 phút, kết luận rõ, follow-up sẵn sàng |

Điểm thấp không phải để học thuộc đáp án. Ghi một action cụ thể vào Review Queue: ví dụ "luyện answer deadlock 90 giây, phải nêu deadlock graph + retry boundary".

## Câu hỏi tự kiểm

### Nếu interviewer nói "requirement thay đổi", bạn phản ứng thế nào?

**Trả lời ngắn:** Em xác nhận assumption nào đổi, invariant/SLO nào bị tác động, rồi so sánh lại consistency, latency, cost và operation. Em không bảo vệ thiết kế cũ như chân lý; em nêu migration/rollout để chuyển an toàn.

**Red flags:** "Kiến trúc tốt thì không phải thay đổi".

### Làm sao tránh trả lời chung chung ở cấp Senior?

**Trả lời ngắn:** Mỗi mechanism phải đi kèm điều kiện dùng, failure mode, telemetry và boundary. Thay "dùng retry" bằng loại lỗi, budget, idempotency và DLQ; thay "thêm cache" bằng freshness, invalidation và fallback.

**Red flags:** Liệt kê framework mà không nối với problem.

## Final recall

- Senior follow-up kiểm tra scope, consequence và evidence của quyết định.
- Luôn nói invariant/SLO trước mechanism, failure mode trước lời hứa.
- Một câu trả lời ngắn nhưng có boundary và metric đáng tin hơn một catalogue công nghệ.
