# System Design Framework cho Senior Backend

## Quick Summary

Trong system design, bắt đầu từ user journey, invariant (quy tắc dữ liệu không được sai) và SLO (mức nhanh/ổn định cần đạt). Baseline (thiết kế nhỏ nhất có thể chạy đúng) với source of truth rõ thường tốt hơn việc vẽ Kafka/microservice trước khi biết workload và failure mode.

> **Nói đơn giản:** trước khi chọn công nghệ, hãy làm rõ “người dùng làm gì”, “điều gì tuyệt đối không được sai” và “thế nào là đủ nhanh/ổn định”. Sau đó mới chọn thành phần nhỏ nhất đáp ứng được các điều đó.

## Terms to Know

- [[SLO]]: mục tiêu dịch vụ đo được, ví dụ p99 và availability.
- [[Data ownership]]: boundary chịu trách nhiệm ghi state và giữ invariant.
- [[Eventual consistency]]: các boundary hội tụ sau một khoảng trễ đã được chấp nhận.
- [[Blast radius]]: phạm vi ảnh hưởng khi một thay đổi hoặc dependency lỗi.
- [[Hot partition]]: key/partition nhận tải lệch quá lớn.

::: senior-signal
Trước khi chọn công nghệ, nói rõ assumption nào sẽ làm bạn đổi thiết kế. Đây là tín hiệu bạn đang ra quyết định theo điều kiện, không theo khẩu hiệu.
:::

## Khi nào gặp

Dùng khi được yêu cầu thiết kế một hệ thống như order service, notification, file upload, chat, feed hoặc payment workflow trong 30–60 phút. Người phỏng vấn không chờ “kiến trúc đúng duy nhất”; họ đánh giá cách bạn làm rõ mục tiêu, chọn boundary, nói về failure mode và ưu tiên trade-off theo workload thật.

## Mental model

Một thiết kế không cần chứng minh rằng bạn biết nhiều dịch vụ. Nó cần chứng minh rằng bạn biết dữ liệu nào là sự thật, lỗi nào có thể xảy ra và hệ thống sẽ khôi phục ra sao. Mỗi cache, queue hay service mới đều cần owner, monitoring và cách xử lý khi nó lỗi.

System design là quá trình giảm rủi ro theo thứ tự. Bắt đầu từ user journey và invariant không được phá vỡ; định lượng workload và SLO; vẽ luồng dữ liệu/boundary; chọn storage và sync/async communication; sau đó mới nói về cache, partition, broker hay microservice. Mỗi thành phần thêm vào tạo thêm failure mode, ownership và vận hành.

Thiết kế tốt nói rõ phần nào cần strong consistency, phần nào chấp nhận eventual consistency, và “đúng” được kiểm chứng bằng signal nào. Không tuyên bố exactly-once, infinite scale hoặc high availability mà không nêu scope và cost.

## Câu trả lời 60 giây

“Tôi bắt đầu bằng một user journey quan trọng và invariant: ví dụ order chỉ được xác nhận khi reservation/balance hợp lệ, và client retry không tạo order trùng. Tôi hỏi quy mô, latency, availability, retention, tenancy và vùng lỗi. Sau đó tôi đưa baseline đơn giản: API stateless, database là source of truth với constraint/transaction, cache-aside cho read được phép stale, và outbox cho event sau commit. Tôi chỉ tách worker/broker khi work bất đồng bộ hoặc độc lập failure domain. Cuối cùng tôi nêu bottleneck, observability, security, rollout và trade-off: phần nào strong consistency, phần nào eventual, cách replay/reconcile khi có lỗi.”

## Khung trả lời theo trình tự

### 1. Làm rõ yêu cầu và scope

Đừng cố trả lời hết trong đầu. Hãy nói các giả định ra thành tiếng. Ví dụ: “Em tạm giả định người dùng chấp nhận thấy thông báo chậm vài giây, nhưng không được tạo đơn trùng.” Câu này giúp interviewer thấy bạn biết yêu cầu nào quan trọng hơn.

Hỏi actor, happy path, trạng thái, action không thể đảo ngược, dữ liệu nhạy cảm, compliance, multi-tenant, tích hợp ngoài và scenario failure. Tách functional requirement khỏi non-functional: p95/p99 latency, request rate, read/write ratio, peak/burst, RPO/RTO, retention, regional requirement và cost envelope.

Đừng đoán im lặng. Nếu interviewer không có số, nêu assumption và ảnh hưởng: “Tôi giả định 1.000 write/s và read nhiều hơn 10 lần; nếu write tăng gấp 100, tôi sẽ xem partition/key design trước khi thêm cache.”

### 2. Chốt invariant và data ownership

Liệt kê điều không được sai: không charge hai lần, sequence status hợp lệ, tenant isolation, audit không bị sửa, quota không âm. Chỉ rõ service/database nào sở hữu record và ai được ghi. Đặt invariant quan trọng vào constraint/transaction gần dữ liệu; application check đơn thuần có race condition.

### 3. Vẽ baseline end-to-end

Vẽ client → gateway/API → application → source-of-truth store. Thêm identity/authz boundary, object storage nếu có blob, và worker/broker khi một hành động không cần hoàn thành trong request. Chỉ ra synchronous call nào nằm trên critical path và timeout/cancellation của nó.

Baseline ưu tiên modular monolith hoặc ít service nếu ownership/team/scale chưa chứng minh cần tách. Nó dễ transaction, deploy và debug hơn distributed system.

### 4. Chọn persistence và query pattern

Chọn relational store cho transaction, constraint, query quan hệ; document/key-value/search/object store khi access pattern và consistency phù hợp. Mô tả primary key, index, partition key, pagination, retention và backup/restore. Tránh bắt đầu bằng tên công nghệ: giải thích vì sao access pattern cần nó.

### 5. Thiết kế scale và async boundary

Stateless API scale ngang sau load balancer. Cache chỉ cho read path được phép stale và có invalidation/tenant key. Queue/broker giúp absorb burst và tách latency, nhưng đổi lại at-least-once, ordering theo scope, poison message, DLQ và backlog monitoring. State change + event dùng transactional outbox; consumer deduplicate/idempotent.

### 6. Failure, observability và security

Nêu timeout, bounded retry+jitter, circuit breaker/bulkhead khi dependency chậm; không retry non-idempotent unknown outcome. Thiết kế correlation ID, structured logs, trace qua async message, golden signals, business metric và alert theo user impact. Nêu authentication, resource/tenant authorization, encryption/secret, audit, rate limit và data lifecycle.

### 7. Rollout và evolution

App mới/cũ, schema/event version, cache format có thể cùng tồn tại. Dùng expand–migrate–contract, feature flag có owner/expiry, canary nếu metric đủ tốt và rollback/roll-forward theo compatibility. Đề cập runbook/reconciliation cho data drift.

## Quyết định và trade-off

| Quyết định | Giá trị | Cost/rủi ro cần nói rõ |
|---|---|---|
| Transaction local + constraint | Invariant mạnh, đơn giản | Giới hạn trong một data owner |
| Outbox + consumer idempotent | Không dual write, replay được | Eventual consistency, vận hành relay/DLQ |
| Cache-aside | Giảm read latency/source load | Stale data, invalidation, stampede |
| Sync RPC | Response ngay, contract trực tiếp | Coupling latency/availability |
| Async message | Absorb burst, tách failure domain | Duplicate/order/replay/monitoring |
| Partition/shard | Scale write/storage | Hot key, rebalancing, cross-partition query |
| Multi-region active-active | Latency/availability tốt hơn | Conflict, consistency và vận hành phức tạp |

## Bẫy production

::: production-trap
Nói “scale ngang” nhưng không nêu partition key, cache stale, recovery hay metric thì chưa phải thiết kế vận hành được.
:::

- Bắt đầu bằng Kafka, Kubernetes, microservice mà chưa có invariant/workload/ownership.
- “Exactly once” mà không mô tả từng boundary database, broker, consumer và external provider.
- Cache dữ liệu balance/quota mà không nêu stale-read impact hoặc reconciliation.
- Gọi nhiều service sync nối tiếp trên critical path, timeout/retry lồng nhau làm p99 nổ.
- Chọn partition key chỉ vì có hash, không kiểm hot tenant/order hoặc query pattern.
- Chỉ nói scale mà bỏ qua backup restore, data deletion, access audit, alert và deploy compatibility.
- Không xác định cái gì sẽ đo: không thể chứng minh thiết kế đạt SLO hay phát hiện backlog/mất dữ liệu.

## Ví dụ: thiết kế tạo order

1. Client gửi `POST /orders` với idempotency key; gateway xác thực và giới hạn rate.
2. API authorize tenant, validate command, transactionally ghi order trạng thái `Pending` cùng idempotency record và outbox event.
3. Relay publish event; inventory/payment worker xử lý at-least-once với dedup key.
4. Worker ghi transition hợp lệ/audit; failure transient được retry có giới hạn, failure cần người xử lý vào DLQ.
5. Query API đọc order từ source of truth; cache chỉ cho summary có TTL/invalidation rõ. Client có thể thấy `Pending` trong thời gian eventual consistency.
6. Dashboard theo dõi create latency, idempotency conflict, outbox age, worker backlog, transition failure và reconciliation mismatch.

Điểm cần nói trong interview là trade-off: nếu “order confirmed” chỉ được trả sau payment, critical path dài và availability phụ thuộc provider; nếu trả `202 Pending`, client cần polling/webhook và UX chấp nhận eventual completion.

## Câu hỏi phỏng vấn

### Bạn bắt đầu system design bằng gì?

**Ý chính:** User journey và invariant, sau đó scale/SLO/assumption. Từ đó chọn baseline nhỏ nhất có source of truth và boundary rõ; scale/async/cache chỉ thêm khi giải quyết một bottleneck hoặc failure mode cụ thể.

**Follow-up:** Phần nào strong consistency? Phần nào eventual? Metric nào báo thiết kế đang sai?

**Red flags:** “Dùng microservices và Kafka ngay”; “cache mọi thứ”.

### Làm sao tránh dual write giữa database và message broker?

**Ý chính:** Persist business state và outbox record trong một local transaction; relay publish retryable; consumer chịu duplicate bằng idempotency. Nó không tạo exactly-once toàn hệ thống, nên vẫn cần quan sát, replay và reconciliation.

## Tự kiểm

- Tôi có thể phát biểu invariant trước khi vẽ component không?
- Tôi có thể tách baseline cần thiết khỏi optimization chưa có evidence không?
- Tôi có thể mô tả failure/retry/duplicate ở từng boundary không?
- Tôi có thể nêu metric, rollout và reconciliation làm thiết kế vận hành được không?
