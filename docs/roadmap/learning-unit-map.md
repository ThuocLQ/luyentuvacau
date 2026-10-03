# QuanNet Learning-Unit Map — Stage 1

> **Status:** DRAFT — Stage 1 Primary-boundary architecture review required.
> **Frozen input SHA:** `771f6541872adceb52786387006059e2059df6a8`.

Frozen capabilities: 163. Proposed Learning Units: 88. Singleton units: 48. Multi-capability units: 40. Single-owner units: 88. Multi-owner units: 0.

File order is **not** curriculum order. REQUIRED/RECOMMENDED projection is **not finalized** in Stage 1.

## Unit Registry

| Unit ID | Working title | Domain candidate | Primary owner set | Primary capability count
|---|---|---|---|---:|---:|
| lu-index-query-shape | Choose a usable index key path | Data & Consistency | Relational Database Engineering | 2 |
| lu-execution-plan-estimates | Read execution pipeline and judge estimates | Data & Consistency | Relational Database Engineering | 2 |
| lu-race-atomicity | Protect an invariant across unsafe interleaving | Runtime & Concurrency | Concurrency & Async | 3 |
| lu-outbox-duplicate-safe-effect | Persist producer intent and make consumer effect duplicate-safe | Distributed Systems | Messaging & Event-Driven Consistency | 2 |
| lu-prog-api-refactoring-change-safety | Đưa một API qua thay đổi yêu cầu mà vẫn chỉ ra được contract cũ/mới, caller bị ảnh hưởng và giới hạn refactor | Runtime & Concurrency | Programming & Software Design Foundations | 4 |
| lu-prog-collections-complexity | Chọn collection theo đường truy cập, kích thước input và thao tác chiếm chi phí trong hot path | Runtime & Concurrency | Programming & Software Design Foundations | 1 |
| lu-prog-resource-ownership | Chỉ ra ai tạo, ai sở hữu, ai dispose/release và lúc nào resource không còn hợp lệ để dùng | Runtime & Concurrency | Programming & Software Design Foundations | 1 |
| lu-prog-types-generics | Thiết kế type contract khiến invalid state khó biểu diễn, generic bị ràng buộc đúng và null boundary được xử lý rõ | Runtime & Concurrency | Programming & Software Design Foundations | 1 |
| lu-prog-values-identity | Phân biệt value equality với object/reference identity để dự đoán aliasing và mutation | Runtime & Concurrency | Programming & Software Design Foundations | 1 |
| lu-runtime-allocation-gc | Giải thích allocation rate dẫn tới GC work và chọn mitigation sau khi có số liệu | Runtime & Concurrency | Runtime & Memory | 3 |
| lu-runtime-diagnostics | Chọn counter, trace hoặc dump/profile theo một hypothesis về runtime thay vì thu thập mọi thứ | Runtime & Concurrency | Runtime & Memory | 2 |
| lu-runtime-jit-warmup | Phân biệt cold execution, JIT compilation/optimization và steady-state trước khi tin benchmark hoặc SLO đầu phiên | Runtime & Concurrency | Runtime & Memory | 1 |
| lu-runtime-managed-execution | Mô tả ranh giới trách nhiệm giữa application code, managed runtime và native/OS khi debug runtime issue | Runtime & Concurrency | Runtime & Memory | 1 |
| lu-os-blocking-io-waits | Giải thích thread chờ vì completion ở bên ngoài và nhận ra sync I/O đang chiếm worker capacity | Runtime & Concurrency | Operating Systems & I/O Foundations | 2 |
| lu-os-process-thread-kernel | Phân biệt process/address space, thread execution unit và user/kernel boundary khi theo symptom | Runtime & Concurrency | Operating Systems & I/O Foundations | 4 |
| lu-os-resource-exhaustion | Phân biệt memory, thread, handle và socket exhaustion bằng failure/evidence phù hợp từng resource | Runtime & Concurrency | Operating Systems & I/O Foundations | 1 |
| lu-concurrency-async-parallelism | Phân biệt async chờ completion, concurrency quản lý nhiều work và parallel execution dùng nhiều execution resource | Runtime & Concurrency | Concurrency & Async | 3 |
| lu-concurrency-deadlock-starvation | Chẩn đoán deadlock khác starvation bằng dependency wait và bằng chứng forward progress | Runtime & Concurrency | Concurrency & Async | 1 |
| lu-concurrency-local-vs-distributed | Đánh giá boundary của in-process synchronization và thiết kế lại invariant owner khi service chạy bốn replicas | Runtime & Concurrency | Concurrency & Async | 1 |
| lu-concurrency-memory-visibility | Giải thích vì sao thread khác có thể không quan sát state theo thứ tự ngây thơ và dùng primitive tạo visibility/ordering cần thiết | Runtime & Concurrency | Concurrency & Async | 1 |
| lu-net-connection-reuse-pooling | Giải thích vì sao client pool/reuse connection và nhận ra giới hạn socket/port hoặc stale connection assumptions | Service & Network | Networking & HTTP | 2 |
| lu-net-failure-localization-unknown-outcome | Tách DNS, connection, TLS, HTTP response và timeout có thể đã tới server để chọn recovery an toàn | Service & Network | Networking & HTTP | 4 |
| lu-net-proxy-lb-forwarded-boundary | Xác định trust boundary client → proxy/LB → application, đặc biệt với forwarded headers | Service & Network | Networking & HTTP | 1 |
| lu-net-streaming-body-cancellation | Quản lý body lifetime và cancellation khi dữ liệu đang transfer để không buffer vô ích hoặc tiếp tục work sau disconnect | Service & Network | Networking & HTTP | 1 |
| lu-db-backup-restore | Chứng minh backup khôi phục được dữ liệu cần thiết và đo được thời gian recovery | Data & Consistency | Relational Database Engineering | 2 |
| lu-db-buffer-io | Phân biệt logical buffer access với physical storage I/O khi giải thích query runtime | Data & Consistency | Relational Database Engineering | 3 |
| lu-db-connection-pool-exhaustion | Phân biệt chờ connection với slow query hoặc quá nhiều concurrent request dùng cùng database capacity | Data & Consistency | Relational Database Engineering | 1 |
| lu-db-locks-deadlocks-contention | Xác định resource/operation nào đang wait trên owner nào, rồi tách contention khỏi deadlock | Data & Consistency | Relational Database Engineering | 3 |
| lu-db-modeling-invariants | Model entity/relationship và đặt invariant đúng ở domain/database boundary để state không hợp lệ không persist được | Data & Consistency | Relational Database Engineering | 2 |
| lu-db-mvcc-visibility | Reason version nào transaction nhìn thấy và phân biệt snapshot visibility với lock blocking | Data & Consistency | Relational Database Engineering | 1 |
| lu-db-replication-failover | Reason primary/replica role, lag và failover mà không coi replica là synchronous truth | Data & Consistency | Relational Database Engineering | 1 |
| lu-nosql-cassandra-lsm-compaction-consistency | Trace commit log → memtable → SSTable → compaction/read merge và reason write/read consistency cost | Data & Consistency | NoSQL & Specialized Data Systems | 3 |
| lu-nosql-model-selection | Chọn storage model từ access pattern, consistency need, query shape và ownership thay vì product branding | Data & Consistency | NoSQL & Specialized Data Systems | 4 |
| lu-nosql-mongo-index-shard-transaction | Reason index, shard key and transaction boundary from Mongo query/write pattern | Data & Consistency | NoSQL & Specialized Data Systems | 1 |
| lu-nosql-redis-persistence-replication-cluster-streams | Reason Redis durability, replica lag, cluster slot ownership và Streams consumer pending work at backend-user depth | Data & Consistency | NoSQL & Specialized Data Systems | 1 |
| lu-nosql-search-refresh-shards-pagination | Reason refresh/eventual visibility, shard distribution và pagination cost in a search projection | Data & Consistency | NoSQL & Specialized Data Systems | 1 |
| lu-cache-capacity-eviction-fallback | Reason finite cache memory và behavior khi key bị evict hoặc cache unavailable mà không đánh sập origin | Data & Consistency | Cache Engineering | 3 |
| lu-cache-invalidation-consistency | Reason cached copy becomes stale và dùng event/version/TTL để replace hoặc reject data đúng boundary | Data & Consistency | Cache Engineering | 2 |
| lu-cache-patterns | Distinguish cache-aside, read-through and write interaction by who loads/writes and what failure behavior caller must handle | Data & Consistency | Cache Engineering | 2 |
| lu-dist-consensus-coordination-purpose | Giải thích vì sao một quyết định chung như leader/owner/config cần coordination dù không implement Raft/Paxos | Distributed Systems | Distributed Systems | 4 |
| lu-dist-consistency-linearizability | Nêu consistency guarantee cần cho business operation và reason history read/write có thỏa hay không | Distributed Systems | Distributed Systems | 1 |
| lu-dist-partitioning-ownership-rebalancing | Map key/work tới owner và reason safe rebalance khi in-flight work/state còn tồn tại | Distributed Systems | Distributed Systems | 1 |
| lu-dist-reconciliation-convergence | Detect divergent state và repair idempotently toward source/invariant đã chọn | Distributed Systems | Distributed Systems | 2 |
| lu-dist-time-order-causality | Phân biệt wall-clock với causal/business order, không dùng clock như universal total order | Distributed Systems | Distributed Systems | 1 |
| lu-dist-transactions-2pc-boundary | Explain 2PC atomicity intent across transactional participants and its coordination/failure cost | Distributed Systems | Distributed Systems | 1 |
| lu-msg-consumer-groups-offsets-rebalance | Reason separately partition assignment, offset position và business side effect | Distributed Systems | Messaging & Event-Driven Consistency | 4 |
| lu-msg-delivery-retry-poison-dlq | Distinguish transient failure from poison message và design bounded retry/quarantine | Distributed Systems | Messaging & Event-Driven Consistency | 1 |
| lu-msg-external-side-effect-reconciliation | Handle external side effect with unknown local result and derive safe reconciliation | Distributed Systems | Messaging & Event-Driven Consistency | 1 |
| lu-msg-producer-acks-durability | Reason what producer acknowledgement proves and remaining failure possibilities | Distributed Systems | Messaging & Event-Driven Consistency | 1 |
| lu-msg-schema-evolution-contract-ownership | Evolve event with old producers/consumers/history still present | Distributed Systems | Messaging & Event-Driven Consistency | 1 |
| lu-msg-workflow-saga-compensation | Model multi-step workflow where completed steps may need business compensation, not rollback | Distributed Systems | Messaging & Event-Driven Consistency | 1 |
| lu-api-circuit-bulkhead-rate-limit | Chọn circuit, bulkhead hoặc rate limit theo dependency/resource/identity boundary | Service & Network | API Contracts & Resilience | 1 |
| lu-api-contract-resource-semantics | Model operation as explicit contract over resource/state, not controller-to-URL mapping | Service & Network | API Contracts & Resilience | 4 |
| lu-api-deadlines-timeout-cancellation | Set/propagate one end-to-end time budget and distinguish caller deadline from remote completion | Service & Network | API Contracts & Resilience | 3 |
| lu-sec-abuse-bruteforce-resource-business-flow | Detect/limit legitimate-looking request abuse by identity/resource/business state | Service & Network | Security | 3 |
| lu-sec-audit-detection-evidence | Produce audit evidence of who did what to which object and which security decision occurred | Service & Network | Security | 1 |
| lu-sec-auth-session-token | Distinguish authentication/authorization and reason session/token validation, lifetime, revocation | Service & Network | Security | 3 |
| lu-sec-browser-boundaries-cors-csrf-xss | Distinguish CORS, CSRF and XSS to apply correct browser boundary control | Service & Network | Security | 1 |
| lu-sec-injection-ssrf-input-output | Trace untrusted data into query/network/output sink and stop it controlling syntax/destination/context | Service & Network | Security | 1 |
| lu-sec-race-business-logic-abuse | Reproduce concurrent valid requests bypassing invariant and protect atomic owner | Service & Network | Security | 1 |
| lu-sec-secrets-third-party-trust | Control secret lifecycle and verify third-party data/action before trusting it | Service & Network | Security | 1 |
| lu-obs-cardinality-sampling-cost | Control dimensions/sampling so telemetry remains useful and affordable | Production Engineering | Observability & Performance | 2 |
| lu-obs-db-io-downstream-attribution | Attribute latency to CPU, DB, network, downstream or queue wait using discriminating evidence | Production Engineering | Observability & Performance | 4 |
| lu-obs-load-test-benchmark-validity | Design/reject benchmark from workload, warm-up, distribution and bottleneck similarity to claim | Production Engineering | Observability & Performance | 1 |
| lu-obs-logs-structured-correlation | Produce structured queryable logs for significant events/context | Production Engineering | Observability & Performance | 2 |
| lu-obs-profiling-runtime-evidence | Use CPU/allocation/stack/runtime evidence to locate actual time/memory work | Production Engineering | Observability & Performance | 1 |
| lu-rel-cascading-failure-queue-capacity | Trace one slow dependency into queues/retries/resource exhaustion upstream | Production Engineering | Reliability / SRE | 3 |
| lu-rel-change-rollout-rollback-risk | Release incrementally with evidence and rollback/roll-forward boundary defined first | Production Engineering | Reliability / SRE | 2 |
| lu-rel-disaster-recovery-rpo-rto | Translate business recovery requirement to RPO/RTO and verify mechanism meets it | Production Engineering | Reliability / SRE | 1 |
| lu-rel-failure-injection-verification | Design safe bounded fault test for stated reliability assumption and interpret result | Production Engineering | Reliability / SRE | 1 |
| lu-rel-health-readiness-semantics | Define liveness/readiness semantics so routing/restarts help recovery instead of cascade | Production Engineering | Reliability / SRE | 1 |
| lu-rel-incident-response-postmortem | During/after incident separate mitigation, diagnosis, evidence preservation and system learning | Production Engineering | Reliability / SRE | 1 |
| lu-test-ci-flakiness-repeatability | Diagnose CI failure as product defect, environment dependency or nondeterministic test | Architecture & Engineering Reasoning | Testing & Engineering Quality | 4 |
| lu-test-failure-resilience | Verify outcome, durable state, retry/recovery and invariant under controlled dependency/resource failure | Architecture & Engineering Reasoning | Testing & Engineering Quality | 2 |
| lu-test-migration-compatibility | Prove old/new app and schema/data/event contract coexist during transitional rollout | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 |
| lu-test-property-boundary-fuzz | Falsify invariant over generated/boundary input, not hand-picked happy examples | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 |
| lu-test-review-static-analysis-change-safety | Use review/compiler/analyzer/targeted tests as complementary change evidence | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 |
| lu-test-unit-integration-contract | Choose unit/integration/contract by behavior boundary and state what each cannot prove | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 |
| lu-arch-boundaries-ownership | Choose module/service boundary by invariant, change ownership and operational owner | Architecture & Engineering Reasoning | Architecture & System Design | 4 |
| lu-arch-consistency-latency-availability | Choose where strong guarantee is required and where stale view is acceptable from invariant/failure assumptions | Architecture & Engineering Reasoning | Architecture & System Design | 1 |
| lu-arch-cost-complexity-changeability | Reject design whose lifecycle cost exceeds properties bought and revisit when constraints change | Architecture & Engineering Reasoning | Architecture & System Design | 2 |
| lu-arch-evolution-migration-strangler | Move old to target incrementally while paths coexist safely | Architecture & Engineering Reasoning | Architecture & System Design | 1 |
| lu-arch-scale-capacity-partitioning | Estimate bottleneck and choose scale/partition boundary from measurable demand | Architecture & Engineering Reasoning | Architecture & System Design | 1 |
| lu-arch-sync-async-integration | Choose sync/async from coupling, completion semantics, latency and recovery | Architecture & Engineering Reasoning | Architecture & System Design | 1 |
| lu-delivery-artifact-image-config | Produce reproducible versioned artifact and separate immutable build from runtime config/secret | Production Engineering | Containers / Kubernetes / Cloud Delivery | 4 |
| lu-delivery-autoscaling-signal-boundary | Choose platform scaling signal matching resource/work pressure and know when replicas cannot help | Production Engineering | Containers / Kubernetes / Cloud Delivery | 3 |
| lu-delivery-cloud-responsibility-managed-services | State application-team responsibilities when platform component is managed | Production Engineering | Containers / Kubernetes / Cloud Delivery | 1 |
| lu-delivery-container-process-lifecycle | Explain container as primary-process packaging/runtime boundary, not VM | Production Engineering | Containers / Kubernetes / Cloud Delivery | 3 |

## lu-index-query-shape

### Identity

- **Unit ID:** lu-index-query-shape
- **Working title:** Choose a usable index key path
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-index-structures | Relational Database Engineering | L3 |
| db-composite-query-shape | Relational Database Engineering | L3 |

### Shared problem / need

Giải thích index như ordered/search structure thu hẹp candidate rows và cân read benefit với write/storage cost.

### Shared mechanism / state trace

Index giữ key-to-row navigation; useful predicate/order cho phép engine prune vùng dữ liệu thay vì scan toàn bộ. → B-tree có prefix order; equality prefix thu hẹp vùng trước, range/order phía sau quyết định scan/sort còn lại.

### Shared observable evidence

Plan access node; rows; buffers; index usage; index size/write behavior.; Predicate/order thực; plan; actual rows; Sort node; buffers.

### Shared failure / debug story

Index có nhưng predicate path không dùng; low selectivity; redundant index; write amplification.; Coi (A,B) như (B,A); range đứng trước equality hữu ích; ORDER BY/LIMIT lệch index; function/cast phá searchability.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `db-index-structures`, `db-composite-query-shape` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `db-physical-storage-pages` remains separate pending its own mechanism/evidence boundary.
- `db-execution-operators` remains separate pending its own mechanism/evidence boundary.

## lu-execution-plan-estimates

### Identity

- **Unit ID:** lu-execution-plan-estimates
- **Working title:** Read execution pipeline and judge estimates
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-execution-operators | Relational Database Engineering | L3 |
| db-optimizer-cardinality-stats | Relational Database Engineering | L3 |

### Shared problem / need

Đọc plan như execution pipeline và xác định operator nào làm rows, loops hay work tăng.

### Shared mechanism / state trace

Scan tạo input; join kết hợp; sort/aggregate materialize/consume rows; limit có thể dừng sớm, nên SQL text không phải execution order. → Optimizer ước lượng rows từ statistics/distribution; estimate dẫn chi phí và operator choice, sai estimate kéo theo plan sai.

### Shared observable evidence

EXPLAIN ANALYZE; actual rows; loops; timing; memory/temp work.; Estimated vs actual rows; statistics; distribution/skew; chosen operator.

### Shared failure / debug story

Nested loop trên input lớn; large/spilled sort; row explosion trước aggregate; đọc operator theo thứ tự câu SQL.; Stale statistics; skew; correlated predicates; estimate/actual mismatch; poor join/access choice.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `db-execution-operators`, `db-optimizer-cardinality-stats` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `db-index-structures` remains separate pending its own mechanism/evidence boundary.
- `obs-db-io-downstream-attribution` remains separate pending its own mechanism/evidence boundary.

## lu-race-atomicity

### Identity

- **Unit ID:** lu-race-atomicity
- **Working title:** Protect an invariant across unsafe interleaving
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| concurrency-interleavings-invariants | Concurrency & Async | L3 |
| concurrency-races-check-then-act | Concurrency & Async | L3 |
| concurrency-synchronization-atomicity | Concurrency & Async | L3 |

### Shared problem / need

Viết state transition và các interleaving có thể xảy ra để chứng minh invariant có thể bị phá ở đâu.

### Shared mechanism / state trace

Khi hai operation overlap, read/validate/write có thể xen kẽ; invariant chỉ giữ nếu transition được atomically protected ở đúng owner. → Check tách khỏi act tạo cửa sổ để state đổi; correctness nằm ở compare-and-swap/conditional write/unique constraint chứ không chỉ validation trước đó. → Lock, Interlocked hoặc transactional conditional update serializes/atomically applies state transition theo scope của primitive.

### Shared observable evidence

Step trace; concurrent test barrier; before/after state; affected-row count; audit sequence.; Interleaving trace; concurrent integration test; conditional affected rows; unique violation; version conflict.; Critical-section trace; contention time; affected rows; invariant test dưới parallel load.

### Shared failure / debug story

Oversell inventory; duplicate reservation; lost update; negative balance.; Duplicate creation; lost update; TOCTOU authorization; negative stock.; Read-modify-write lost update; lock sai scope; double release; atomic increment dùng cho invariant nhiều field.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `concurrency-interleavings-invariants`, `concurrency-races-check-then-act`, `concurrency-synchronization-atomicity` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `prog-invariants-domain-model` remains separate pending its own mechanism/evidence boundary.
- `concurrency-memory-visibility` remains separate pending its own mechanism/evidence boundary.

## lu-outbox-duplicate-safe-effect

### Identity

- **Unit ID:** lu-outbox-duplicate-safe-effect
- **Working title:** Persist producer intent and make consumer effect duplicate-safe
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-outbox-db-publish-gap | Messaging & Event-Driven Consistency | L3 |
| msg-consumer-idempotency-inbox | Messaging & Event-Driven Consistency | L3 |

### Shared problem / need

Explain DB commit/broker publish gap and recover it without direct dual-write loss.

### Shared mechanism / state trace

Business state and broker are separate transactional systems; crash can happen between commit, relay publish and relay acknowledgement. → Stable message/operation ID is recorded with local effect atomically or recoverably so replay is recognized.

### Shared observable evidence

Business row; outbox status; relay attempt; broker metadata; consumer ledger.; Message ID; inbox row; business row; transaction record; duplicate/replay test.

### Shared failure / debug story

DB commit but no publish; broker accepts but relay timeout; retry duplicate; outbox stuck.; Crash between dedup check/write; business write succeeds inbox fails; unstable key; duplicate external effect.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `msg-outbox-db-publish-gap`, `msg-consumer-idempotency-inbox` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `msg-model-queue-topic-partition-order` remains separate pending its own mechanism/evidence boundary.
- `db-transactions-isolation-anomalies` remains separate pending its own mechanism/evidence boundary.

## lu-prog-api-refactoring-change-safety

### Identity

- **Unit ID:** lu-prog-api-refactoring-change-safety
- **Working title:** Đưa một API qua thay đổi yêu cầu mà vẫn chỉ ra được contract cũ/mới, caller bị ảnh hưởng và giới hạn refactor
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| prog-api-refactoring-change-safety | Programming & Software Design Foundations | L4 |
| prog-errors-results | Programming & Software Design Foundations | L2 |
| prog-invariants-domain-model | Programming & Software Design Foundations | L3 |
| prog-composition-dependencies | Programming & Software Design Foundations | L3 |

### Shared problem / need

Đưa một API qua thay đổi yêu cầu mà vẫn chỉ ra được contract cũ/mới, caller bị ảnh hưởng và giới hạn refactor.

### Shared mechanism / state trace

Tách public contract khỏi implementation; thay đổi dữ liệu hoặc error semantics phải đi qua adapter/version hoặc một migration boundary có chủ đích. → Result/domain error là phần contract dự đoán được; exception giữ stack/context cho lỗi bất ngờ; partial state cần được ghi nhận thay vì giả thành success. → Invariant là điều luôn đúng cho aggregate/record; validation gần state transition và DB constraint bảo vệ khi nhiều đường ghi cùng tồn tại. → Dependency chỉ được tạo ở composition root; core code phụ thuộc contract do core sở hữu, không đi ngược vào adapter hạ tầng.

### Shared observable evidence

Contract test của consumer; golden response; diff OpenAPI; test hành vi trước/sau; telemetry của endpoint cũ.; Call stack; returned error code; audit/result record; log có correlation ID; test mapping ở API boundary.; State before/after; state-machine test; affected-row count; unique/check constraint; concurrent test.; Dependency graph; constructor signatures; architecture test; unit test thay adapter bằng fake.

### Shared failure / debug story

Breaking response field; caller còn phụ thuộc hành vi cũ; refactor đổi validation ngầm; test chỉ khớp implementation.; Nuốt exception; map lỗi domain thành 500 hoặc ngược lại; retry một lỗi validation; trả success khi mới làm xong một phần.; Invalid transition; business rule bị copy ở nhiều handler; race vượt qua validation; persisted state vi phạm rule.; Service locator; dependency ẩn; vòng phụ thuộc; domain gọi thẳng database/HTTP adapter.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `prog-api-refactoring-change-safety`, `prog-errors-results`, `prog-invariants-domain-model`, `prog-composition-dependencies` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `msg-schema-evolution-contract-ownership` remains separate pending its own mechanism/evidence boundary.
- `api-versioning-compatibility` remains separate pending its own mechanism/evidence boundary.

## lu-prog-collections-complexity

### Identity

- **Unit ID:** lu-prog-collections-complexity
- **Working title:** Chọn collection theo đường truy cập, kích thước input và thao tác chiếm chi phí trong hot path
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| prog-collections-complexity | Programming & Software Design Foundations | L2 |

### Shared problem / need

Chọn collection theo đường truy cập, kích thước input và thao tác chiếm chi phí trong hot path.

### Shared mechanism / state trace

Mỗi cấu trúc đổi chi phí lookup, insert, remove, ordering và memory; đo thao tác thực tế thay vì suy từ tên collection.

### Shared observable evidence

Kích thước input; số lần lookup; benchmark/profile; assertion về ordering và uniqueness.

### Shared failure / debug story

Linear scan trên request nóng; nested loop O(n²); giả định thứ tự sai; duplicate key bị bỏ qua.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| none | No material graph neighbor exists | No plausible merge candidate found after graph-neighborhood review. |

### Explicit exclusions

None material.

## lu-prog-resource-ownership

### Identity

- **Unit ID:** lu-prog-resource-ownership
- **Working title:** Chỉ ra ai tạo, ai sở hữu, ai dispose/release và lúc nào resource không còn hợp lệ để dùng
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| prog-resource-ownership | Programming & Software Design Foundations | L3 |

### Shared problem / need

Chỉ ra ai tạo, ai sở hữu, ai dispose/release và lúc nào resource không còn hợp lệ để dùng.

### Shared mechanism / state trace

Owner chịu trách nhiệm lifetime; borrower không dispose resource không tạo; async flow phải giữ resource sống đến khi consumer cuối hoàn thành.

### Shared observable evidence

Open handle/connection count; dispose/finalization trace; connection-pool state; test double ghi lifetime.

### Shared failure / debug story

Connection/stream leak; dùng resource đã dispose; scope dài hơn request; buffer trả pool khi còn consumer.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| concurrency-cancellation-lifetime | Frozen graph neighborhood with prog-resource-ownership | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| net-streaming-body-cancellation | Frozen graph neighborhood with prog-resource-ownership | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `concurrency-cancellation-lifetime` remains separate pending its own mechanism/evidence boundary.
- `net-streaming-body-cancellation` remains separate pending its own mechanism/evidence boundary.

## lu-prog-types-generics

### Identity

- **Unit ID:** lu-prog-types-generics
- **Working title:** Thiết kế type contract khiến invalid state khó biểu diễn, generic bị ràng buộc đúng và null boundary được xử lý rõ
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| prog-types-generics | Programming & Software Design Foundations | L2 |

### Shared problem / need

Thiết kế type contract khiến invalid state khó biểu diễn, generic bị ràng buộc đúng và null boundary được xử lý rõ.

### Shared mechanism / state trace

Type, nullability và generic constraint mô tả tập giá trị/operation hợp lệ trước runtime; boundary chuyển input không tin cậy thành type nội bộ hợp lệ.

### Shared observable evidence

Compiler/nullability diagnostics; API-boundary tests; generic constraint compile test; invalid-input test.

### Shared failure / debug story

Invalid state vẫn tạo được; unsafe cast; null đi qua boundary; generic API quá rộng và caller hiểu sai capability.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| none | No material graph neighbor exists | No plausible merge candidate found after graph-neighborhood review. |

### Explicit exclusions

None material.

## lu-prog-values-identity

### Identity

- **Unit ID:** lu-prog-values-identity
- **Working title:** Phân biệt value equality với object/reference identity để dự đoán aliasing và mutation
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| prog-values-identity | Programming & Software Design Foundations | L2 |

### Shared problem / need

Phân biệt value equality với object/reference identity để dự đoán aliasing và mutation.

### Shared mechanism / state trace

Hai biến có thể cùng trỏ một mutable object; equality có thể dựa value còn identity dựa instance, nên mutation qua một alias đổi state nhìn thấy ở alias kia.

### Shared observable evidence

Object-state trace; unit test trước/sau mutation; debugger object ID/reference; collection lookup result.

### Shared failure / debug story

Shared mutation bất ngờ; Equals/GetHashCode không nhất quán; Dictionary/Set identity surprise; cache key dùng sai equality.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| none | No material graph neighbor exists | No plausible merge candidate found after graph-neighborhood review. |

### Explicit exclusions

None material.

## lu-runtime-allocation-gc

### Identity

- **Unit ID:** lu-runtime-allocation-gc
- **Working title:** Giải thích allocation rate dẫn tới GC work và chọn mitigation sau khi có số liệu
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| runtime-allocation-gc | Runtime & Memory | L3 |
| runtime-memory-roots-lifetime | Runtime & Memory | L2 |
| runtime-retention-pooling-large-objects | Runtime & Memory | L3 |

### Shared problem / need

Giải thích allocation rate dẫn tới GC work và chọn mitigation sau khi có số liệu.

### Shared mechanism / state trace

Allocation tạo object trên managed heap; khi vùng nhớ cần thu hồi, GC tìm object còn reachable rồi dọn phần còn lại, nên tốc độ cấp phát quyết định tần suất và chi phí collection. → Object sống khi có đường reference từ GC root như stack, static, handle hoặc long-lived collection; scope source code không đồng nghĩa object hết reachable. → Retention là object còn reachable; pool chủ động giữ object để reuse; buffer lớn có allocation/lifetime cost riêng, và pool có thể biến allocation pressure thành retained heap.

### Shared observable evidence

Allocation rate; GC count/time; heap size; generation size; request latency lúc collection.; Heap graph; retaining path; root type; object count/size theo thời gian.; Heap dump; generation/size distribution; pool counters; allocation trace của large buffer.

### Shared failure / debug story

High allocation rate; frequent GC; pause dài; CPU overhead do GC.; Unexpected retention; event handler giữ subscriber; cache/list vô hạn; closure giữ graph lớn.; Pool retains too much; large buffers repeatedly allocated; long-lived owner giữ object graph; wrong-size buffer reuse.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `runtime-allocation-gc`, `runtime-memory-roots-lifetime`, `runtime-retention-pooling-large-objects` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `runtime-managed-execution` remains separate pending its own mechanism/evidence boundary.
- `os-virtual-memory-page-cache` remains separate pending its own mechanism/evidence boundary.

## lu-runtime-diagnostics

### Identity

- **Unit ID:** lu-runtime-diagnostics
- **Working title:** Chọn counter, trace hoặc dump/profile theo một hypothesis về runtime thay vì thu thập mọi thứ
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| runtime-diagnostics | Runtime & Memory | L3 |
| runtime-memory-performance-debug | Runtime & Memory | L4 |

### Shared problem / need

Chọn counter, trace hoặc dump/profile theo một hypothesis về runtime thay vì thu thập mọi thứ.

### Shared mechanism / state trace

Counter trả lời xu hướng; trace cho timeline/causal activity; dump/profile cho object hoặc stack tại thời điểm; tool phải khớp câu hỏi. → Allocation, GC và retention tạo các dấu hiệu khác nhau; thay một biến rồi đo lại mới phân biệt causal effect.

### Shared observable evidence

Hypothesis viết trước; counter time series; trace span/stack; heap dump; profile hotspot.; Symptom timeline; allocation/GC counters; retaining path; controlled before/after experiment; post-change latency.

### Shared failure / debug story

Collecting wrong evidence; dump sau khi symptom biến mất; kết luận leak từ heap size đơn lẻ.; Treating retention as GC tuning; pooling để che leak; mitigation giảm allocation nhưng tăng retained heap.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `runtime-diagnostics`, `runtime-memory-performance-debug` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `runtime-retention-pooling-large-objects` remains separate pending its own mechanism/evidence boundary.
- `obs-profiling-runtime-evidence` remains separate pending its own mechanism/evidence boundary.

## lu-runtime-jit-warmup

### Identity

- **Unit ID:** lu-runtime-jit-warmup
- **Working title:** Phân biệt cold execution, JIT compilation/optimization và steady-state trước khi tin benchmark hoặc SLO đầu phiên
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| runtime-jit-warmup | Runtime & Memory | L2 |

### Shared problem / need

Phân biệt cold execution, JIT compilation/optimization và steady-state trước khi tin benchmark hoặc SLO đầu phiên.

### Shared mechanism / state trace

Lần gọi đầu có thể kích hoạt load, JIT và cache initialization; repeated run mới gần steady state.

### Shared observable evidence

First-request latency; repeated-run timing; JIT counters/events; startup trace.

### Shared failure / debug story

Benchmark đo warm-up như steady workload; first request latency bị che; kết luận sai từ một lần chạy.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| obs-load-test-benchmark-validity | Frozen graph neighborhood with runtime-jit-warmup | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `obs-load-test-benchmark-validity` remains separate pending its own mechanism/evidence boundary.

## lu-runtime-managed-execution

### Identity

- **Unit ID:** lu-runtime-managed-execution
- **Working title:** Mô tả ranh giới trách nhiệm giữa application code, managed runtime và native/OS khi debug runtime issue
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| runtime-managed-execution | Runtime & Memory | L2 |

### Shared problem / need

Mô tả ranh giới trách nhiệm giữa application code, managed runtime và native/OS khi debug runtime issue.

### Shared mechanism / state trace

Application tạo managed work; runtime quản lý execution/memory; native/OS cung cấp thread, virtual memory, socket/file scheduling nên symptom có thể vượt lớp application.

### Shared observable evidence

Managed stack; runtime counters; OS process/thread view; native wait/sockets.

### Shared failure / debug story

Gọi mọi latency là “CLR chậm”; nhầm managed thread với OS process; sửa code khi bottleneck là native I/O.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| runtime-memory-roots-lifetime | Frozen graph neighborhood with runtime-managed-execution | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `runtime-memory-roots-lifetime` remains separate pending its own mechanism/evidence boundary.

## lu-os-blocking-io-waits

### Identity

- **Unit ID:** lu-os-blocking-io-waits
- **Working title:** Giải thích thread chờ vì completion ở bên ngoài và nhận ra sync I/O đang chiếm worker capacity
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| os-blocking-io-waits | Operating Systems & I/O Foundations | L3 |
| os-files-handles-sockets-ipc | Operating Systems & I/O Foundations | L2 |

### Shared problem / need

Giải thích thread chờ vì completion ở bên ngoài và nhận ra sync I/O đang chiếm worker capacity.

### Shared mechanism / state trace

File/socket/database operation hoàn tất qua kernel/external system; blocking giữ execution thread chờ, async cho phép thread làm work khác trong khi completion chưa tới. → Process giữ handle trỏ tới kernel resource; dispose/close giải phóng reference/quota, còn connection pool là owner layer khác với raw socket.

### Shared observable evidence

Blocked stack; wait time; worker/runtime queue; thread count; request queue growth.; Open handle count; socket states; per-process limits; connection-pool state; OS error code.

### Shared failure / debug story

Blocking request path; sync I/O giữ worker; queue growth; timeout do worker starvation.; FD/handle leak; socket exhaustion; close quá sớm; IPC endpoint không được release.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `os-blocking-io-waits`, `os-files-handles-sockets-ipc` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `concurrency-async-parallelism` remains separate pending its own mechanism/evidence boundary.
- `os-process-thread-kernel` remains separate pending its own mechanism/evidence boundary.

## lu-os-process-thread-kernel

### Identity

- **Unit ID:** lu-os-process-thread-kernel
- **Working title:** Phân biệt process/address space, thread execution unit và user/kernel boundary khi theo symptom
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| os-process-thread-kernel | Operating Systems & I/O Foundations | L2 |
| os-scheduling-starvation | Operating Systems & I/O Foundations | L3 |
| os-termination-graceful-shutdown | Operating Systems & I/O Foundations | L3 |
| os-virtual-memory-page-cache | Operating Systems & I/O Foundations | L2 |

### Shared problem / need

Phân biệt process/address space, thread execution unit và user/kernel boundary khi theo symptom.

### Shared mechanism / state trace

Process có address space/handle table riêng; threads trong một process chia memory; kernel thực hiện privileged I/O/scheduling trên behalf của process. → Scheduler chỉ chạy một số runnable threads theo CPU/time slice; blocking/wait và runnable queue là trạng thái khác nhau, starvation là lack of forward progress. → Termination signal mở một lifetime deadline; service ngừng nhận work mới, hoàn tất hoặc cancel work đang chạy, flush/release owner resources rồi exit trước deadline. → Virtual address space ánh xạ memory; working set là phần resident; OS page cache giữ page file/disk để read sau có thể phục vụ từ RAM.

### Shared observable evidence

Process tree; thread list; address-space metrics; stack location user vs kernel.; CPU utilization; runnable/thread queue; runtime queue; blocked stack; no-forward-progress timeline.; Signal timestamp; active request/message count; drain duration; cancellation log; exit code; unfinished work record.; RSS/working set; page faults; file I/O counters; cache reclaim; cold/warm read timing.

### Shared failure / debug story

Nhầm process isolation với thread isolation; assume thread crash chỉ ảnh hưởng một request; debug memory ở sai process.; Work tồn tại nhưng không được CPU; thread-pool starvation; priority imbalance; queue tăng dù downstream đã sẵn sàng.; Dropped request/message; half-written file/response; accept work sau drain; process bị kill trước cleanup.; Nhầm page cache với application leak; OOM vì chỉ nhìn managed heap; kỳ vọng cold disk latency sau cache warm.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `os-process-thread-kernel`, `os-scheduling-starvation`, `os-termination-graceful-shutdown`, `os-virtual-memory-page-cache` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `os-files-handles-sockets-ipc` remains separate pending its own mechanism/evidence boundary.
- `os-resource-exhaustion` remains separate pending its own mechanism/evidence boundary.

## lu-os-resource-exhaustion

### Identity

- **Unit ID:** lu-os-resource-exhaustion
- **Working title:** Phân biệt memory, thread, handle và socket exhaustion bằng failure/evidence phù hợp từng resource
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| os-resource-exhaustion | Operating Systems & I/O Foundations | L3 |

### Shared problem / need

Phân biệt memory, thread, handle và socket exhaustion bằng failure/evidence phù hợp từng resource.

### Shared mechanism / state trace

Mỗi resource có quota và reclaim path khác: memory pressure/working set, finite runnable threads, kernel handles, socket/port state.

### Shared observable evidence

RSS/working set and OOM event; thread count/queue; handle count/limit; socket state/port count.

### Shared failure / debug story

OOM/kill; thread creation failure; too many open files; socket/ephemeral-port exhaustion.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| os-process-thread-kernel | Frozen graph neighborhood with os-resource-exhaustion | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| os-files-handles-sockets-ipc | Frozen graph neighborhood with os-resource-exhaustion | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `os-process-thread-kernel` remains separate pending its own mechanism/evidence boundary.
- `os-files-handles-sockets-ipc` remains separate pending its own mechanism/evidence boundary.

## lu-concurrency-async-parallelism

### Identity

- **Unit ID:** lu-concurrency-async-parallelism
- **Working title:** Phân biệt async chờ completion, concurrency quản lý nhiều work và parallel execution dùng nhiều execution resource
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| concurrency-async-parallelism | Concurrency & Async | L2 |
| concurrency-cancellation-lifetime | Concurrency & Async | L3 |
| concurrency-bounded-backpressure | Concurrency & Async | L3 |

### Shared problem / need

Phân biệt async chờ completion, concurrency quản lý nhiều work và parallel execution dùng nhiều execution resource.

### Shared mechanism / state trace

Async không tự tạo thread; concurrency là overlap lifetime; parallelism là nhiều work thực sự chạy đồng thời khi CPU/capacity cho phép. → CancellationToken báo owner rằng result không còn cần hoặc deadline đã hết; code phải observe signal, stop safely và không coi cancel là rollback của side effect đã commit. → Arrival rate lớn hơn service rate làm in-flight work tích tụ; bounded queue/semaphore buộc producer wait, reject hoặc shed thay vì giữ work vô hạn.

### Shared observable evidence

Timeline task/thread; CPU; active operations; request latency; queue depth.; Token propagation trace; active operation count; cancellation log; audit state; cleanup/timeout test.; In-flight count; queue depth; pool usage; throughput; p95/p99; rejection/wait time.

### Shared failure / debug story

Wrap sync I/O trong Task.Run; nghĩ await tăng CPU throughput; tạo parallelism vô hạn cho downstream I/O.; Token không được forward; continue expensive work sau disconnect; cancel giữa side effect gây unknown outcome; dispose khi child còn dùng.; Unbounded in-flight tasks; queue/memory growth; pool exhaustion; p99 tăng dù throughput không tăng.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `concurrency-async-parallelism`, `concurrency-cancellation-lifetime`, `concurrency-bounded-backpressure` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `os-blocking-io-waits` remains separate pending its own mechanism/evidence boundary.
- `os-scheduling-starvation` remains separate pending its own mechanism/evidence boundary.

## lu-concurrency-deadlock-starvation

### Identity

- **Unit ID:** lu-concurrency-deadlock-starvation
- **Working title:** Chẩn đoán deadlock khác starvation bằng dependency wait và bằng chứng forward progress
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| concurrency-deadlock-starvation | Concurrency & Async | L3 |

### Shared problem / need

Chẩn đoán deadlock khác starvation bằng dependency wait và bằng chứng forward progress.

### Shared mechanism / state trace

Deadlock là cycle wait không actor nào tự đi tiếp; starvation là work sẵn sàng nhưng mãi không được capacity/resource.

### Shared observable evidence

Wait graph; blocked stacks; lock ownership; queue age; no-forward-progress timeline.

### Shared failure / debug story

Lock-order deadlock; sync-over-async deadlock; thread-pool starvation; unfair queue.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| concurrency-synchronization-atomicity | Frozen graph neighborhood with concurrency-deadlock-starvation | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| db-locks-deadlocks-contention | Frozen graph neighborhood with concurrency-deadlock-starvation | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `concurrency-synchronization-atomicity` remains separate pending its own mechanism/evidence boundary.
- `db-locks-deadlocks-contention` remains separate pending its own mechanism/evidence boundary.

## lu-concurrency-local-vs-distributed

### Identity

- **Unit ID:** lu-concurrency-local-vs-distributed
- **Working title:** Đánh giá boundary của in-process synchronization và thiết kế lại invariant owner khi service chạy bốn replicas
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| concurrency-local-vs-distributed | Concurrency & Async | L4 |

### Shared problem / need

Đánh giá boundary của in-process synchronization và thiết kế lại invariant owner khi service chạy bốn replicas.

### Shared mechanism / state trace

Lock trong process chỉ serializes threads cùng address space; bốn replicas có bốn lock, nên shared state cần DB atomicity, partition owner hoặc distributed coordination có explicit failure model.

### Shared observable evidence

Replica IDs trong trace; concurrent calls tới bốn instance; DB affected rows/constraint; ownership metrics.

### Shared failure / debug story

In-process lock không bảo vệ cross-replica; duplicate side effect; split ownership; coordinator unavailable.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| concurrency-races-check-then-act | Frozen graph neighborhood with concurrency-local-vs-distributed | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| dist-partial-failure-uncertainty | Frozen graph neighborhood with concurrency-local-vs-distributed | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `concurrency-races-check-then-act` remains separate pending its own mechanism/evidence boundary.
- `dist-partial-failure-uncertainty` remains separate pending its own mechanism/evidence boundary.

## lu-concurrency-memory-visibility

### Identity

- **Unit ID:** lu-concurrency-memory-visibility
- **Working title:** Giải thích vì sao thread khác có thể không quan sát state theo thứ tự ngây thơ và dùng primitive tạo visibility/ordering cần thiết
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| concurrency-memory-visibility | Concurrency & Async | L3 |

### Shared problem / need

Giải thích vì sao thread khác có thể không quan sát state theo thứ tự ngây thơ và dùng primitive tạo visibility/ordering cần thiết.

### Shared mechanism / state trace

CPU/compiler có thể reorder/cache reads; volatile, lock hoặc interlocked tạo memory-order guarantees phù hợp để published state được quan sát đúng.

### Shared observable evidence

Controlled repro; trace timestamps; thread dump; code review primitive; memory model documentation.

### Shared failure / debug story

Spin loop không thấy flag; đọc object half-published; assume field assignment đủ synchronization.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| concurrency-interleavings-invariants | Frozen graph neighborhood with concurrency-memory-visibility | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `concurrency-interleavings-invariants` remains separate pending its own mechanism/evidence boundary.

## lu-net-connection-reuse-pooling

### Identity

- **Unit ID:** lu-net-connection-reuse-pooling
- **Working title:** Giải thích vì sao client pool/reuse connection và nhận ra giới hạn socket/port hoặc stale connection assumptions
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| net-connection-reuse-pooling | Networking & HTTP | L3 |
| net-tcp-connection-semantics | Networking & HTTP | L2 |

### Shared problem / need

Giải thích vì sao client pool/reuse connection và nhận ra giới hạn socket/port hoặc stale connection assumptions.

### Shared mechanism / state trace

Mỗi connection có handshake/socket/port cost; pool giữ connection usable theo lifetime/limit, nhưng network peer có thể đóng connection ngoài kiến thức client. → TCP connection được establish rồi giữ state đến close/reset; HTTP request có thể reuse connection nhưng peer/network có thể refuse/reset hoặc capacity cạn trước HTTP.

### Shared observable evidence

Pool counters/state; socket states; port usage; connection setup time; reset/retry trace.; Socket state; connect timing; errno/socket exception; SYN/connection metrics; server accept count.

### Shared failure / debug story

Socket/ephemeral-port exhaustion; stale pooled connection; pool limit queueing; new client per request.; Connection refused; reset; handshake timeout; connection exhaustion.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `net-connection-reuse-pooling`, `net-tcp-connection-semantics` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `os-files-handles-sockets-ipc` remains separate pending its own mechanism/evidence boundary.
- `net-tls-trust-handshake` remains separate pending its own mechanism/evidence boundary.

## lu-net-failure-localization-unknown-outcome

### Identity

- **Unit ID:** lu-net-failure-localization-unknown-outcome
- **Working title:** Tách DNS, connection, TLS, HTTP response và timeout có thể đã tới server để chọn recovery an toàn
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| net-failure-localization-unknown-outcome | Networking & HTTP | L4 |
| net-request-path-dns | Networking & HTTP | L2 |
| net-tls-trust-handshake | Networking & HTTP | L2 |
| net-http-semantics | Networking & HTTP | L2 |

### Shared problem / need

Tách DNS, connection, TLS, HTTP response và timeout có thể đã tới server để chọn recovery an toàn.

### Shared mechanism / state trace

Request path qua nhiều layer; timeout sau write không chứng minh server chưa tạo side effect, nên retry cần status query/idempotency contract chứ không chỉ exception type. → DNS maps hostname to record/address with cache/TTL; connection chỉ bắt đầu sau khi client có usable destination. → TLS handshake xác thực certificate/name/validity và thương lượng protected channel; HTTP starts only after this boundary succeeds. → Method nêu intent; status nêu kết quả ở boundary; headers điều khiển metadata/caching/auth/content negotiation; body mang representation có lifecycle riêng.

### Shared observable evidence

DNS result/timing; socket/TLS error; HTTP status/header; client/server/proxy trace; operation ID and audit state.; Resolution result; resolver timing; TTL/cache state; address attempted; DNS error code.; Certificate chain/name/expiry; TLS error; handshake timing; client and proxy logs.; Request/response capture; OpenAPI; contract tests; status distribution; cache header inspection.

### Shared failure / debug story

Retry duplicate after unknown outcome; gán TLS lỗi thành HTTP 500; treat DNS failure as server rejection; mất correlation qua proxy.; NXDOMAIN/misconfigured record; slow resolver; stale cached address; IPv6/IPv4 mismatch.; Untrusted issuer; hostname mismatch; expired certificate; incompatible protocol/cipher.; GET có side effect; status success che validation failure; cache sai vì missing header; body contract thay đổi im lặng.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `net-failure-localization-unknown-outcome`, `net-request-path-dns`, `net-tls-trust-handshake`, `net-http-semantics` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `net-tcp-connection-semantics` remains separate pending its own mechanism/evidence boundary.
- `dist-partial-failure-uncertainty` remains separate pending its own mechanism/evidence boundary.

## lu-net-proxy-lb-forwarded-boundary

### Identity

- **Unit ID:** lu-net-proxy-lb-forwarded-boundary
- **Working title:** Xác định trust boundary client → proxy/LB → application, đặc biệt với forwarded headers
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| net-proxy-lb-forwarded-boundary | Networking & HTTP | L3 |

### Shared problem / need

Xác định trust boundary client → proxy/LB → application, đặc biệt với forwarded headers.

### Shared mechanism / state trace

App chỉ nên tin forwarded metadata khi request đến từ known proxy/LB đã strip/append đúng; client bên ngoài có thể tự gửi header giả.

### Shared observable evidence

Proxy config; remote IP; raw forwarded headers; trusted-network list; app/proxy access logs.

### Shared failure / debug story

Blind trust forwarded headers; spoofed client IP/scheme; redirect loop; auth/rate-limit dùng sai identity.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| net-http-semantics | Frozen graph neighborhood with net-proxy-lb-forwarded-boundary | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| net-tls-trust-handshake | Frozen graph neighborhood with net-proxy-lb-forwarded-boundary | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `net-http-semantics` remains separate pending its own mechanism/evidence boundary.
- `net-tls-trust-handshake` remains separate pending its own mechanism/evidence boundary.

## lu-net-streaming-body-cancellation

### Identity

- **Unit ID:** lu-net-streaming-body-cancellation
- **Working title:** Quản lý body lifetime và cancellation khi dữ liệu đang transfer để không buffer vô ích hoặc tiếp tục work sau disconnect
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| net-streaming-body-cancellation | Networking & HTTP | L3 |

### Shared problem / need

Quản lý body lifetime và cancellation khi dữ liệu đang transfer để không buffer vô ích hoặc tiếp tục work sau disconnect.

### Shared mechanism / state trace

Request/response body là stream; consumer đọc dần và must observe cancellation, còn buffering materializes toàn bộ payload và kéo dài memory/lifetime.

### Shared observable evidence

Bytes in/out; cancellation/request-aborted trace; memory allocation; stream read/write duration; completion status.

### Shared failure / debug story

Buffer entire payload; continue expensive work after disconnect; partial upload treated complete; response stream disposed too early.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| net-http-semantics | Frozen graph neighborhood with net-streaming-body-cancellation | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| concurrency-cancellation-lifetime | Frozen graph neighborhood with net-streaming-body-cancellation | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `net-http-semantics` remains separate pending its own mechanism/evidence boundary.
- `concurrency-cancellation-lifetime` remains separate pending its own mechanism/evidence boundary.

## lu-db-backup-restore

### Identity

- **Unit ID:** lu-db-backup-restore
- **Working title:** Chứng minh backup khôi phục được dữ liệu cần thiết và đo được thời gian recovery
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-backup-restore | Relational Database Engineering | L3 |
| db-wal-crash-recovery | Relational Database Engineering | L3 |

### Shared problem / need

Chứng minh backup khôi phục được dữ liệu cần thiết và đo được thời gian recovery.

### Shared mechanism / state trace

Backup là bản dữ liệu/log tại mốc xác định; restore tái tạo state theo phạm vi và point-in-time contract, không phải chỉ file tồn tại. → WAL records durable change intent before data page write; recovery can redo/resolve state based on log ordering.

### Shared observable evidence

Backup metadata; restore test; recovered timestamp/rows; duration; checksum/validation result.; WAL/log position khi thực tế; commit/restart experiment; recovery log; persisted rows after crash simulation.

### Shared failure / debug story

Backup chưa từng restore; thiếu log cần thiết; recovered point không đạt yêu cầu; restore lâu hơn giả định.; Assume committed data means every page sync write; unsafe durability setting; expect recovery without required log.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `db-backup-restore`, `db-wal-crash-recovery` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `rel-disaster-recovery-rpo-rto` remains separate pending its own mechanism/evidence boundary.
- `db-transactions-isolation-anomalies` remains separate pending its own mechanism/evidence boundary.

## lu-db-buffer-io

### Identity

- **Unit ID:** lu-db-buffer-io
- **Working title:** Phân biệt logical buffer access với physical storage I/O khi giải thích query runtime
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-buffer-io | Relational Database Engineering | L2 |
| db-physical-storage-pages | Relational Database Engineering | L2 |
| db-production-diagnosis-transfer | Relational Database Engineering | L4 |

### Shared problem / need

Phân biệt logical buffer access với physical storage I/O khi giải thích query runtime.

### Shared mechanism / state trace

Database buffer/cache có thể phục vụ page đã resident; working set và access pattern quyết định khi nào cần đọc storage. → Rows nằm trong storage pages; scan/index eventually reference pages, nên row width/physical relation size ảnh hưởng amount of work. → Query shape, plan, cardinality, buffers/I/O, locks, transaction và pool tạo symptom khác nhau; thay đổi chỉ sau khi evidence loại hypothesis khác.

### Shared observable evidence

EXPLAIN BUFFERS; cache hits/reads; OS/database I/O; cold/warm timing.; Page/buffer statistics; relation/index size; EXPLAIN BUFFERS khi phù hợp.; Hypothesis matrix; measured plan/rows/buffers; lock/pool timeline; before/after experiment.

### Shared failure / debug story

Benchmark cold/warm không nhất quán; gọi mọi buffer hit là disk I/O; memory pressure làm runtime đổi nhưng bị bỏ qua.; Assume one-row lookup là one disk operation; wide row tăng page work; bỏ qua table/index size.; Nhảy từ “slow SQL” sang add index; sửa plan khi problem là pool/lock; áp dụng engine detail sai.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `db-buffer-io`, `db-physical-storage-pages`, `db-production-diagnosis-transfer` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `os-virtual-memory-page-cache` remains separate pending its own mechanism/evidence boundary.
- `db-index-structures` remains separate pending its own mechanism/evidence boundary.

## lu-db-connection-pool-exhaustion

### Identity

- **Unit ID:** lu-db-connection-pool-exhaustion
- **Working title:** Phân biệt chờ connection với slow query hoặc quá nhiều concurrent request dùng cùng database capacity
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-connection-pool-exhaustion | Relational Database Engineering | L3 |

### Shared problem / need

Phân biệt chờ connection với slow query hoặc quá nhiều concurrent request dùng cùng database capacity.

### Shared mechanism / state trace

Pool giới hạn số session; acquisition wait xảy ra trước query khi active connection bị leak, giữ transaction lâu hoặc demand vượt capacity.

### Shared observable evidence

Pool active/idle/wait; acquisition latency; DB session count; query duration; request queue.

### Shared failure / debug story

Leaked connection; transaction giữ connection quá lâu; pool nhỏ hơn concurrency không bound; tăng pool làm DB overload thêm.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| os-resource-exhaustion | Frozen graph neighborhood with db-connection-pool-exhaustion | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| concurrency-bounded-backpressure | Frozen graph neighborhood with db-connection-pool-exhaustion | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `os-resource-exhaustion` remains separate pending its own mechanism/evidence boundary.
- `concurrency-bounded-backpressure` remains separate pending its own mechanism/evidence boundary.

## lu-db-locks-deadlocks-contention

### Identity

- **Unit ID:** lu-db-locks-deadlocks-contention
- **Working title:** Xác định resource/operation nào đang wait trên owner nào, rồi tách contention khỏi deadlock
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-locks-deadlocks-contention | Relational Database Engineering | L3 |
| db-transactions-isolation-anomalies | Relational Database Engineering | L3 |
| db-schema-evolution | Relational Database Engineering | L3 |

### Shared problem / need

Xác định resource/operation nào đang wait trên owner nào, rồi tách contention khỏi deadlock.

### Shared mechanism / state trace

Lock serializes conflicting access; contention có owner sẽ release, deadlock là cycle wait cần one transaction abort. → Isolation defines visibility/conflict behavior của concurrent transactions; invariant có thể cần conditional write, serialization hoặc redesign scope. → Expand/backfill/dual-read or compatibility boundary cho phép state/schema đổi dần trước contract cleanup.

### Shared observable evidence

Lock/wait view; blocked/blocking session; deadlock report; transaction duration.; Two-session timeline; before/after rows; isolation setting; conflict/result.; Schema version; migration history; lock duration; old/new compatibility test; backfill progress.

### Shared failure / debug story

Long transaction giữ lock; inconsistent lock order; hot-row serialization; deadlock cycle.; Lost update; non-repeatable observation; write skew/equivalent anomaly; transaction scope quá lớn.; Destructive column change sớm; long blocking migration; rollback incompatible; backfill race with writes.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `db-locks-deadlocks-contention`, `db-transactions-isolation-anomalies`, `db-schema-evolution` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `concurrency-deadlock-starvation` remains separate pending its own mechanism/evidence boundary.
- `db-production-diagnosis-transfer` remains separate pending its own mechanism/evidence boundary.

## lu-db-modeling-invariants

### Identity

- **Unit ID:** lu-db-modeling-invariants
- **Working title:** Model entity/relationship và đặt invariant đúng ở domain/database boundary để state không hợp lệ không persist được
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-modeling-invariants | Relational Database Engineering | L3 |
| db-partitioning-sharding-boundary | Relational Database Engineering | L3 |

### Shared problem / need

Model entity/relationship và đặt invariant đúng ở domain/database boundary để state không hợp lệ không persist được.

### Shared mechanism / state trace

Schema, key, constraint và transaction boundary quyết định state nào có thể persist; application validation không là guard cuối khi có nhiều writer. → Key quyết định row nằm ở partition nào; targeted query giữ locality còn key lệch tạo hot partition/fan-out.

### Shared observable evidence

Schema/constraints; failing insert/update; concurrent test; constraint violation; persisted rows.; Key distribution; partition size; per-partition traffic; fan-out count.

### Shared failure / debug story

Duplicate logical entity; invalid relationship; nullable field trái domain assumption; invariant chỉ ở app; race bypass validation.; Hot partition; unbounded partition; query fan-out toàn shard; bỏ qua repartitioning.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `db-modeling-invariants`, `db-partitioning-sharding-boundary` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `prog-invariants-domain-model` remains separate pending its own mechanism/evidence boundary.
- `db-schema-evolution` remains separate pending its own mechanism/evidence boundary.

## lu-db-mvcc-visibility

### Identity

- **Unit ID:** lu-db-mvcc-visibility
- **Working title:** Reason version nào transaction nhìn thấy và phân biệt snapshot visibility với lock blocking
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-mvcc-visibility | Relational Database Engineering | L3 |

### Shared problem / need

Reason version nào transaction nhìn thấy và phân biệt snapshot visibility với lock blocking.

### Shared mechanism / state trace

Multiple logical row versions cùng visibility rules cho transaction; reader có thể thấy snapshot cũ dù writer đã tạo version mới.

### Shared observable evidence

Two-session query; transaction snapshot/ID khi thực tế; dead-row/version observation; lock evidence để loại blocking.

### Shared failure / debug story

Assume latest committed row luôn visible; nhầm snapshot với lock owner; long transaction giữ cleanup pressure.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| db-transactions-isolation-anomalies | Frozen graph neighborhood with db-mvcc-visibility | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `db-transactions-isolation-anomalies` remains separate pending its own mechanism/evidence boundary.

## lu-db-replication-failover

### Identity

- **Unit ID:** lu-db-replication-failover
- **Working title:** Reason primary/replica role, lag và failover mà không coi replica là synchronous truth
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-replication-failover | Relational Database Engineering | L3 |

### Shared problem / need

Reason primary/replica role, lag và failover mà không coi replica là synchronous truth.

### Shared mechanism / state trace

Replication applies state with delay/role transition; client connection và operation history có thể không cùng mốc với promoted node.

### Shared observable evidence

Replication lag/position; role; timeline; operation ID; connection target.

### Shared failure / debug story

Read-after-write từ lagging replica; stale replica promoted; assumed operation lost/duplicated; client giữ old primary connection.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| dist-replication-leader-quorum | Frozen graph neighborhood with db-replication-failover | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| db-wal-crash-recovery | Frozen graph neighborhood with db-replication-failover | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `dist-replication-leader-quorum` remains separate pending its own mechanism/evidence boundary.
- `db-wal-crash-recovery` remains separate pending its own mechanism/evidence boundary.

## lu-nosql-cassandra-lsm-compaction-consistency

### Identity

- **Unit ID:** lu-nosql-cassandra-lsm-compaction-consistency
- **Working title:** Trace commit log → memtable → SSTable → compaction/read merge và reason write/read consistency cost
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-cassandra-lsm-compaction-consistency | NoSQL & Specialized Data Systems | L3 |
| nosql-cassandra-partition-model | NoSQL & Specialized Data Systems | L3 |
| nosql-transfer-storage-choice | NoSQL & Specialized Data Systems | L4 |

### Shared problem / need

Trace commit log → memtable → SSTable → compaction/read merge và reason write/read consistency cost.

### Shared mechanism / state trace

Writes append to commit log/memtable then flush immutable SSTables; reads merge relevant files and compaction rewrites them, while consistency depends replica response policy. → Partition key routes data; clustering key orders rows inside partition; table design starts from known query not ad-hoc filter. → Decision starts with read/write route, ownership, consistency and recovery needs; product behavior demonstrates fit or mismatch, not popularity.

### Shared observable evidence

SSTable/compaction metrics; tombstone warnings; read/write latency; replica response behavior.; Partition size/key distribution; request distribution; query shape.; Access matrix; prototype query/profile; data distribution; consistency/failure test; operating cost estimate.

### Shared failure / debug story

Tombstone-heavy read; compaction backlog; read amplification; inappropriate consistency assumption.; Huge partition; hot partition; unsupported scan query; poor key distribution.; Chọn tool vì trend; bỏ qua source-of-truth; model không hỗ trợ primary query; hide operational cost.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `nosql-cassandra-lsm-compaction-consistency`, `nosql-cassandra-partition-model`, `nosql-transfer-storage-choice` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `dist-consistency-linearizability` remains separate pending its own mechanism/evidence boundary.
- `dist-partitioning-ownership-rebalancing` remains separate pending its own mechanism/evidence boundary.

## lu-nosql-model-selection

### Identity

- **Unit ID:** lu-nosql-model-selection
- **Working title:** Chọn storage model từ access pattern, consistency need, query shape và ownership thay vì product branding
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-model-selection | NoSQL & Specialized Data Systems | L3 |
| nosql-mongo-aggregate-model | NoSQL & Specialized Data Systems | L2 |
| nosql-redis-structures-memory | NoSQL & Specialized Data Systems | L2 |
| nosql-search-inverted-index-analysis | NoSQL & Specialized Data Systems | L2 |

### Shared problem / need

Chọn storage model từ access pattern, consistency need, query shape và ownership thay vì product branding.

### Shared mechanism / state trace

Mỗi family optimizes different data layout/operation: relational constraints, document aggregate, partition write, key lookup, search projection. → Embedded data updates with one document boundary; references split ownership/lifetime and require later lookup or coordinated update. → String, hash, set, sorted set and stream encode different operations/memory layouts; key cardinality and value size drive RAM need. → Analyzer transforms text into tokens; inverted index maps tokens to documents, so mapping/analyzer determines match semantics.

### Shared observable evidence

Access-pattern matrix; query shapes; data growth; consistency/failure requirement.; Document shape/size; query pattern; update boundary; array growth.; Key type/size; memory usage; operation latency; cardinality.; Mapping; analyzed tokens; query explanation/profile; returned scores.

### Shared failure / debug story

Document DB for relational cross-aggregate work; Cassandra without partition query; search as authoritative transactional store; Redis chosen only “fast”.; Unbounded embedded array; assume cross-document update atomic; N+1 reference lookup.; Giant key/value; wrong structure; unbounded collection; memory underestimated.; Text vs keyword mismatch; wrong analyzer; exact match expected from analyzed text; relevance confused with correctness.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `nosql-model-selection`, `nosql-mongo-aggregate-model`, `nosql-redis-structures-memory`, `nosql-search-inverted-index-analysis` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `nosql-cassandra-partition-model` remains separate pending its own mechanism/evidence boundary.
- `nosql-transfer-storage-choice` remains separate pending its own mechanism/evidence boundary.

## lu-nosql-mongo-index-shard-transaction

### Identity

- **Unit ID:** lu-nosql-mongo-index-shard-transaction
- **Working title:** Reason index, shard key and transaction boundary from Mongo query/write pattern
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-mongo-index-shard-transaction | NoSQL & Specialized Data Systems | L3 |

### Shared problem / need

Reason index, shard key and transaction boundary from Mongo query/write pattern.

### Shared mechanism / state trace

Index narrows candidate documents; shard key routes data; multi-document transaction coordinates changes but crosses normal document locality.

### Shared observable evidence

Query explain/profile; shard distribution; operation latency; transaction scope.

### Shared failure / debug story

Poor shard key/hot chunk; query misses useful index; distributed transaction assumed cheap; scatter-gather query.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| nosql-mongo-aggregate-model | Frozen graph neighborhood with nosql-mongo-index-shard-transaction | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| dist-partitioning-ownership-rebalancing | Frozen graph neighborhood with nosql-mongo-index-shard-transaction | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `nosql-mongo-aggregate-model` remains separate pending its own mechanism/evidence boundary.
- `dist-partitioning-ownership-rebalancing` remains separate pending its own mechanism/evidence boundary.

## lu-nosql-redis-persistence-replication-cluster-streams

### Identity

- **Unit ID:** lu-nosql-redis-persistence-replication-cluster-streams
- **Working title:** Reason Redis durability, replica lag, cluster slot ownership và Streams consumer pending work at backend-user depth
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-redis-persistence-replication-cluster-streams | NoSQL & Specialized Data Systems | L3 |

### Shared problem / need

Reason Redis durability, replica lag, cluster slot ownership và Streams consumer pending work at backend-user depth.

### Shared mechanism / state trace

Persistence mode controls restart survival; replica apply may lag; hash slot routes keys; Stream group tracks delivered/pending entries per consumer.

### Shared observable evidence

Persistence config/state; replication offset/lag; slot distribution; Streams consumer/pending state.

### Shared failure / debug story

Acknowledged write lost under wrong durability assumption; stale replica; hot slot/key; cross-slot surprise; pending work misunderstood.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| nosql-redis-structures-memory | Frozen graph neighborhood with nosql-redis-persistence-replication-cluster-streams | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| dist-replication-leader-quorum | Frozen graph neighborhood with nosql-redis-persistence-replication-cluster-streams | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `nosql-redis-structures-memory` remains separate pending its own mechanism/evidence boundary.
- `dist-replication-leader-quorum` remains separate pending its own mechanism/evidence boundary.

## lu-nosql-search-refresh-shards-pagination

### Identity

- **Unit ID:** lu-nosql-search-refresh-shards-pagination
- **Working title:** Reason refresh/eventual visibility, shard distribution và pagination cost in a search projection
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-search-refresh-shards-pagination | NoSQL & Specialized Data Systems | L3 |

### Shared problem / need

Reason refresh/eventual visibility, shard distribution và pagination cost in a search projection.

### Shared mechanism / state trace

Indexed write becomes searchable on refresh; shard routes work; deep offset asks shards to collect/skip many hits.

### Shared observable evidence

Refresh timing; shard distribution; query profile; pagination depth; source-of-truth record.

### Shared failure / debug story

Write expected instantly searchable; hot shard; deep offset pagination; search result treated as transactional truth.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| nosql-search-inverted-index-analysis | Frozen graph neighborhood with nosql-search-refresh-shards-pagination | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| dist-partitioning-ownership-rebalancing | Frozen graph neighborhood with nosql-search-refresh-shards-pagination | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `nosql-search-inverted-index-analysis` remains separate pending its own mechanism/evidence boundary.
- `dist-partitioning-ownership-rebalancing` remains separate pending its own mechanism/evidence boundary.

## lu-cache-capacity-eviction-fallback

### Identity

- **Unit ID:** lu-cache-capacity-eviction-fallback
- **Working title:** Reason finite cache memory và behavior khi key bị evict hoặc cache unavailable mà không đánh sập origin
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| cache-capacity-eviction-fallback | Cache Engineering | L3 |
| cache-need-source-of-truth | Cache Engineering | L2 |
| cache-evidence-transfer | Cache Engineering | L4 |

### Shared problem / need

Reason finite cache memory và behavior khi key bị evict hoặc cache unavailable mà không đánh sập origin.

### Shared mechanism / state trace

Cache có capacity/eviction policy; miss hoặc outage chuyển demand về source, nên fallback path là một traffic amplifier tiềm năng. → Cache holds a derived copy keyed to source state; source owns final value/version, cache may be absent/stale and must not become accidental authority. → Hit/miss, TTL, key distribution, source load, freshness and fallback interact; symptom phải được tách bằng timeline/key-level evidence trước mitigation.

### Shared observable evidence

Memory; evictions; hit rate; origin QPS; fallback latency/error.; Source row/version; cache key/value/version; request path; miss/read timeline.; Hit/miss by key; TTL age; source load; p95/p99; cache error/fallback trace; version timeline.

### Shared failure / debug story

Eviction gây origin surge; recursive fallback overload source; fail-open/fail-closed sai.; Cache becomes authority; source update succeeds but cache assumption differs; cached absence treated permanently true.; Treat hit rate as full success; optimize latency while serving stale data; add cache node when hot key is bottleneck.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `cache-capacity-eviction-fallback`, `cache-need-source-of-truth`, `cache-evidence-transfer` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `nosql-redis-structures-memory` remains separate pending its own mechanism/evidence boundary.
- `cache-patterns` remains separate pending its own mechanism/evidence boundary.

## lu-cache-invalidation-consistency

### Identity

- **Unit ID:** lu-cache-invalidation-consistency
- **Working title:** Reason cached copy becomes stale và dùng event/version/TTL để replace hoặc reject data đúng boundary
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| cache-invalidation-consistency | Cache Engineering | L3 |
| cache-multilayer-coherence | Cache Engineering | L3 |

### Shared problem / need

Reason cached copy becomes stale và dùng event/version/TTL để replace hoặc reject data đúng boundary.

### Shared mechanism / state trace

Source version/timestamp defines newer state; invalidation/update event may arrive delayed/out of order; reader compares/ages cached copy according to freshness contract. → L1 belongs one instance, L2 is shared, source is authoritative; key/version/schema must let reader locate which layer served stale state.

### Shared observable evidence

Source version/timestamp; cache version/TTL; invalidation event; read timeline.; Layer-specific key/version; instance ID; cache age; request trace.

### Shared failure / debug story

Missing invalidation; delayed event; out-of-order update; TTL longer than acceptable freshness.; One layer invalidated while another stale; per-instance divergence; rollout mixes cache-key/schema versions.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `cache-invalidation-consistency`, `cache-multilayer-coherence` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `cache-need-source-of-truth` remains separate pending its own mechanism/evidence boundary.
- `cache-evidence-transfer` remains separate pending its own mechanism/evidence boundary.

## lu-cache-patterns

### Identity

- **Unit ID:** lu-cache-patterns
- **Working title:** Distinguish cache-aside, read-through and write interaction by who loads/writes and what failure behavior caller must handle
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| cache-patterns | Cache Engineering | L2 |
| cache-stampede-penetration-avalanche-hot-key | Cache Engineering | L3 |

### Shared problem / need

Distinguish cache-aside, read-through and write interaction by who loads/writes and what failure behavior caller must handle.

### Shared mechanism / state trace

Pattern allocates responsibility differently: cache-aside caller reads source on miss; read-through loader mediates; write path must define source/cache ordering. → Stampede recomputes one expired/missing key concurrently; penetration repeats invalid misses; avalanche aligns many expiries; hot key concentrates traffic independent of expiry.

### Shared observable evidence

Request trace; loader call count; source/cache write order; miss/error metrics.; Miss rate; expiry distribution; per-key QPS; origin load; single-flight lock/wait.

### Shared failure / debug story

Write updates cache but not source; cache-aside miss storm; double-write ordering ambiguity.; Origin collapse after expiry; invalid-key probe overload; synchronized TTL burst; one key/slot saturated.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `cache-patterns`, `cache-stampede-penetration-avalanche-hot-key` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `cache-need-source-of-truth` remains separate pending its own mechanism/evidence boundary.
- `concurrency-bounded-backpressure` remains separate pending its own mechanism/evidence boundary.

## lu-dist-consensus-coordination-purpose

### Identity

- **Unit ID:** lu-dist-consensus-coordination-purpose
- **Working title:** Giải thích vì sao một quyết định chung như leader/owner/config cần coordination dù không implement Raft/Paxos
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-consensus-coordination-purpose | Distributed Systems | L3 |
| dist-partial-failure-uncertainty | Distributed Systems | L3 |
| dist-replication-leader-quorum | Distributed Systems | L3 |
| dist-guarantee-recovery-transfer | Distributed Systems | L4 |

### Shared problem / need

Giải thích vì sao một quyết định chung như leader/owner/config cần coordination dù không implement Raft/Paxos.

### Shared mechanism / state trace

Participants cần agree decision/order despite failure; safe progress cần đủ reachable members theo protocol rule. → Không có shared failure state; caller observes message/reply/timeout through network, not remote internal truth. → Replicas copy state; leader/quorum rule controls acceptance and when value is sufficiently replicated. → Partial failure, RPC uncertainty, consistency, replication, ownership and reconciliation compose; timeline phải gắn operation identity/state owner.

### Shared observable evidence

Leader/epoch/term; membership; quorum availability; committed decision/version; ownership record.; Per-node health/state; operation ID; request timings; dependency error rate; trace hop completion.; Leader/role; replica lag/position; ack count/state; operation version; failover timeline.; Timeline; per-system state; operation ID; ownership/version records; recovery result.

### Shared failure / debug story

No quorum; stale epoch; two actors believe exclusive ownership; coordination service dependency.; One dependency unreachable; slow mistaken dead; retry amplification; local success inferred global success.; Stale replica read; leader fails during operation; insufficient ack assumed durable; stale node promoted.; Claim guarantee không có; recovery duplicates unknown effect; topology invalidates assumption.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `dist-consensus-coordination-purpose`, `dist-partial-failure-uncertainty`, `dist-replication-leader-quorum`, `dist-guarantee-recovery-transfer` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `concurrency-local-vs-distributed` remains separate pending its own mechanism/evidence boundary.
- `net-failure-localization-unknown-outcome` remains separate pending its own mechanism/evidence boundary.

## lu-dist-consistency-linearizability

### Identity

- **Unit ID:** lu-dist-consistency-linearizability
- **Working title:** Nêu consistency guarantee cần cho business operation và reason history read/write có thỏa hay không
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-consistency-linearizability | Distributed Systems | L3 |

### Shared problem / need

Nêu consistency guarantee cần cho business operation và reason history read/write có thỏa hay không.

### Shared mechanism / state trace

Consistency model giới hạn ordering/visibility history được phép giữa replicas/processes.

### Shared observable evidence

Timestamp/sequence-tagged history; versions; read-after-write result; replica/source record.

### Shared failure / debug story

Stale read violates expectation; writers observe incompatible state; assume global latest under eventual convergence.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| nosql-cassandra-lsm-compaction-consistency | Frozen graph neighborhood with dist-consistency-linearizability | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| cache-multilayer-coherence | Frozen graph neighborhood with dist-consistency-linearizability | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `nosql-cassandra-lsm-compaction-consistency` remains separate pending its own mechanism/evidence boundary.
- `cache-multilayer-coherence` remains separate pending its own mechanism/evidence boundary.

## lu-dist-partitioning-ownership-rebalancing

### Identity

- **Unit ID:** lu-dist-partitioning-ownership-rebalancing
- **Working title:** Map key/work tới owner và reason safe rebalance khi in-flight work/state còn tồn tại
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-partitioning-ownership-rebalancing | Distributed Systems | L3 |

### Shared problem / need

Map key/work tới owner và reason safe rebalance khi in-flight work/state còn tồn tại.

### Shared mechanism / state trace

Assignment maps partition to owner; epoch/rebalance moves responsibility while router and workers converge.

### Shared observable evidence

Assignment; owner/epoch; traffic per partition; rebalance events; lag/in-flight count.

### Shared failure / debug story

Hot owner; stale router; zero/double ownership; duplicate in-flight work.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| db-partitioning-sharding-boundary | Frozen graph neighborhood with dist-partitioning-ownership-rebalancing | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| nosql-mongo-index-shard-transaction | Frozen graph neighborhood with dist-partitioning-ownership-rebalancing | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `db-partitioning-sharding-boundary` remains separate pending its own mechanism/evidence boundary.
- `nosql-mongo-index-shard-transaction` remains separate pending its own mechanism/evidence boundary.

## lu-dist-reconciliation-convergence

### Identity

- **Unit ID:** lu-dist-reconciliation-convergence
- **Working title:** Detect divergent state và repair idempotently toward source/invariant đã chọn
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-reconciliation-convergence | Distributed Systems | L3 |
| dist-rpc-unknown-completion | Distributed Systems | L3 |

### Shared problem / need

Detect divergent state và repair idempotently toward source/invariant đã chọn.

### Shared mechanism / state trace

Reconciliation compares actual against authoritative state/invariant then applies repeatable correction until mismatch converges. → Execution and response delivery are independent events.

### Shared observable evidence

Source-vs-derived diff; audit/event history; job result; repair operation ID; mismatch count.; Operation/idempotency ID; server audit; client timing; status query; trace span.

### Shared failure / debug story

Non-idempotent repair; endless loop; wrong truth source; missing record never emitted.; Side effect succeeded but client timeout; retry duplicates; server continues after client abandoned.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `dist-reconciliation-convergence`, `dist-rpc-unknown-completion` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `prog-invariants-domain-model` remains separate pending its own mechanism/evidence boundary.
- `dist-partial-failure-uncertainty` remains separate pending its own mechanism/evidence boundary.

## lu-dist-time-order-causality

### Identity

- **Unit ID:** lu-dist-time-order-causality
- **Working title:** Phân biệt wall-clock với causal/business order, không dùng clock như universal total order
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-time-order-causality | Distributed Systems | L3 |

### Shared problem / need

Phân biệt wall-clock với causal/business order, không dùng clock như universal total order.

### Shared mechanism / state trace

Nodes have independent clocks/delay; version/causal relation can be meaningful when timestamps skew or delivery reorders.

### Shared observable evidence

Operation IDs; sequence/version; producer/receive timestamps; trace/audit causality.

### Shared failure / debug story

Last-write-wins on skewed clock; arrival time assumed event time; timeout logic assumes perfect clocks.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| dist-guarantee-recovery-transfer | Frozen graph neighborhood with dist-time-order-causality | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `dist-guarantee-recovery-transfer` remains separate pending its own mechanism/evidence boundary.

## lu-dist-transactions-2pc-boundary

### Identity

- **Unit ID:** lu-dist-transactions-2pc-boundary
- **Working title:** Explain 2PC atomicity intent across transactional participants and its coordination/failure cost
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-transactions-2pc-boundary | Distributed Systems | L3 |

### Shared problem / need

Explain 2PC atomicity intent across transactional participants and its coordination/failure cost.

### Shared mechanism / state trace

Prepare makes participants commit-capable; coordinator later records commit/abort decision.

### Shared observable evidence

Coordinator/participant state; prepare/commit record; locks held; recovery log.

### Shared failure / debug story

Prepared participant with unavailable coordinator; long-held resources; prepare failure; assume 2PC covers external side effect.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| db-transactions-isolation-anomalies | Frozen graph neighborhood with dist-transactions-2pc-boundary | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| dist-partial-failure-uncertainty | Frozen graph neighborhood with dist-transactions-2pc-boundary | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `db-transactions-isolation-anomalies` remains separate pending its own mechanism/evidence boundary.
- `dist-partial-failure-uncertainty` remains separate pending its own mechanism/evidence boundary.

## lu-msg-consumer-groups-offsets-rebalance

### Identity

- **Unit ID:** lu-msg-consumer-groups-offsets-rebalance
- **Working title:** Reason separately partition assignment, offset position và business side effect
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-consumer-groups-offsets-rebalance | Messaging & Event-Driven Consistency | L3 |
| msg-model-queue-topic-partition-order | Messaging & Event-Driven Consistency | L2 |
| msg-replay-backfill | Messaging & Event-Driven Consistency | L3 |
| msg-lag-backpressure-evidence | Messaging & Event-Driven Consistency | L3 |

### Shared problem / need

Reason separately partition assignment, offset position và business side effect.

### Shared mechanism / state trace

Group assigns partitions; offset marks broker read position, not durable business effect. → Records route to queue/topic/partition; parallel consumers preserve order only where broker contract/key assignment does. → Reprocess records from selected offset/range; projection work differs from side effects that must be suppressed/idempotent. → Lag grows when arrival exceeds effective consumption or work is unevenly distributed/blocked.

### Shared observable evidence

Assignment; current/committed offset; generation/member; processing/audit record; rebalance event.; Topic/queue config; partition/key; offset/sequence; consumer assignment.; Replay range; offsets; IDs/schema version; inbox ledger; derived before/after.; Per-partition lag; arrival/consume rate; handler duration; retry rate; assignment; downstream pool/latency.

### Shared failure / debug story

Offset commit before effect; effect succeeds then offset fails; rebalance interrupts work; stale ownership assumption.; Assume global partition order; wrong key; queue treated broadcast; partitions changed without order review.; Payment/email replayed; live/backfill race; old schema unreadable; wrong starting offset.; Hot partition; slow handler/downstream; retry storm; rebalance pause; consumers exceed shared capacity.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `msg-consumer-groups-offsets-rebalance`, `msg-model-queue-topic-partition-order`, `msg-replay-backfill`, `msg-lag-backpressure-evidence` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `dist-partitioning-ownership-rebalancing` remains separate pending its own mechanism/evidence boundary.
- `nosql-redis-persistence-replication-cluster-streams` remains separate pending its own mechanism/evidence boundary.

## lu-msg-delivery-retry-poison-dlq

### Identity

- **Unit ID:** lu-msg-delivery-retry-poison-dlq
- **Working title:** Distinguish transient failure from poison message và design bounded retry/quarantine
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-delivery-retry-poison-dlq | Messaging & Event-Driven Consistency | L3 |

### Shared problem / need

Distinguish transient failure from poison message và design bounded retry/quarantine.

### Shared mechanism / state trace

Failed delivery retries; permanently invalid record repeats until classified/quarantined/skipped by explicit policy.

### Shared observable evidence

Attempt count; error class; message ID; retry timestamps; lag; DLQ reason.

### Shared failure / debug story

Infinite poison retry blocks partition; retry storm; DLQ graveyard; transient sent DLQ early.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| msg-model-queue-topic-partition-order | Frozen graph neighborhood with msg-delivery-retry-poison-dlq | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| dist-partial-failure-uncertainty | Frozen graph neighborhood with msg-delivery-retry-poison-dlq | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `msg-model-queue-topic-partition-order` remains separate pending its own mechanism/evidence boundary.
- `dist-partial-failure-uncertainty` remains separate pending its own mechanism/evidence boundary.

## lu-msg-external-side-effect-reconciliation

### Identity

- **Unit ID:** lu-msg-external-side-effect-reconciliation
- **Working title:** Handle external side effect with unknown local result and derive safe reconciliation
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-external-side-effect-reconciliation | Messaging & Event-Driven Consistency | L4 |

### Shared problem / need

Handle external side effect with unknown local result and derive safe reconciliation.

### Shared mechanism / state trace

Provider may commit while response lost; local DB/event cannot prove provider state.

### Shared observable evidence

External operation/idempotency ID; status query; local audit; callback history; reconciliation result.

### Shared failure / debug story

Charged but locally timeout-failed; retry double charge; callback lost; permanent divergence.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| dist-rpc-unknown-completion | Frozen graph neighborhood with msg-external-side-effect-reconciliation | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| dist-reconciliation-convergence | Frozen graph neighborhood with msg-external-side-effect-reconciliation | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `dist-rpc-unknown-completion` remains separate pending its own mechanism/evidence boundary.
- `dist-reconciliation-convergence` remains separate pending its own mechanism/evidence boundary.

## lu-msg-producer-acks-durability

### Identity

- **Unit ID:** lu-msg-producer-acks-durability
- **Working title:** Reason what producer acknowledgement proves and remaining failure possibilities
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-producer-acks-durability | Messaging & Event-Driven Consistency | L3 |

### Shared problem / need

Reason what producer acknowledgement proves and remaining failure possibilities.

### Shared mechanism / state trace

Broker acceptance/replication policy decides when ack returns; client timeout can overlap accepted record.

### Shared observable evidence

Producer result/error; message key/ID; broker offset; replica/leader state; retry attempt.

### Shared failure / debug story

Ack weaker than assumed; timeout after accept; retry duplicate; leader changes during send.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| msg-model-queue-topic-partition-order | Frozen graph neighborhood with msg-producer-acks-durability | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| dist-replication-leader-quorum | Frozen graph neighborhood with msg-producer-acks-durability | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `msg-model-queue-topic-partition-order` remains separate pending its own mechanism/evidence boundary.
- `dist-replication-leader-quorum` remains separate pending its own mechanism/evidence boundary.

## lu-msg-schema-evolution-contract-ownership

### Identity

- **Unit ID:** lu-msg-schema-evolution-contract-ownership
- **Working title:** Evolve event with old producers/consumers/history still present
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-schema-evolution-contract-ownership | Messaging & Event-Driven Consistency | L3 |

### Shared problem / need

Evolve event with old producers/consumers/history still present.

### Shared mechanism / state trace

Event contract has syntax and semantic meaning; compatibility includes deployed consumers and retained history replay.

### Shared observable evidence

Schema/event version; compatibility test; historical sample; consumer error; ownership doc.

### Shared failure / debug story

Required field removed; meaning changes silently; consumer cannot read history; producer assumes synchronized deploy.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| msg-replay-backfill | Frozen graph neighborhood with msg-schema-evolution-contract-ownership | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| msg-model-queue-topic-partition-order | Frozen graph neighborhood with msg-schema-evolution-contract-ownership | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `msg-replay-backfill` remains separate pending its own mechanism/evidence boundary.
- `msg-model-queue-topic-partition-order` remains separate pending its own mechanism/evidence boundary.

## lu-msg-workflow-saga-compensation

### Identity

- **Unit ID:** lu-msg-workflow-saga-compensation
- **Working title:** Model multi-step workflow where completed steps may need business compensation, not rollback
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-workflow-saga-compensation | Messaging & Event-Driven Consistency | L3 |

### Shared problem / need

Model multi-step workflow where completed steps may need business compensation, not rollback.

### Shared mechanism / state trace

Workflow persists progress; each step has outcome/possible compensation; compensation is new business operation.

### Shared observable evidence

Workflow state; step IDs; commands/events; compensation attempt; business records.

### Shared failure / debug story

Compensation fails; duplicate step/compensation; out-of-order transition; irreversible effect treated rollbackable.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| msg-model-queue-topic-partition-order | Frozen graph neighborhood with msg-workflow-saga-compensation | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| dist-partial-failure-uncertainty | Frozen graph neighborhood with msg-workflow-saga-compensation | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `msg-model-queue-topic-partition-order` remains separate pending its own mechanism/evidence boundary.
- `dist-partial-failure-uncertainty` remains separate pending its own mechanism/evidence boundary.

## lu-api-circuit-bulkhead-rate-limit

### Identity

- **Unit ID:** lu-api-circuit-bulkhead-rate-limit
- **Working title:** Chọn circuit, bulkhead hoặc rate limit theo dependency/resource/identity boundary
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| api-circuit-bulkhead-rate-limit | API Contracts & Resilience | L3 |

### Shared problem / need

Chọn circuit, bulkhead hoặc rate limit theo dependency/resource/identity boundary.

### Shared mechanism / state trace

Circuit tạm tránh dependency failing; bulkhead caps concurrent blast radius; rate limit controls admission by quota/identity.

### Shared observable evidence

Circuit state/reason; queue/concurrency; admitted/rejected rate; tenant identity; dependency latency/errors; probe result.

### Shared failure / debug story

Circuit opens on caller error; tenant exhausts shared concurrency; global limit punishes other tenant; unbounded bulkhead queue.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| concurrency-bounded-backpressure | Frozen graph neighborhood with api-circuit-bulkhead-rate-limit | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| dist-partial-failure-uncertainty | Frozen graph neighborhood with api-circuit-bulkhead-rate-limit | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `concurrency-bounded-backpressure` remains separate pending its own mechanism/evidence boundary.
- `dist-partial-failure-uncertainty` remains separate pending its own mechanism/evidence boundary.

## lu-api-contract-resource-semantics

### Identity

- **Unit ID:** lu-api-contract-resource-semantics
- **Working title:** Model operation as explicit contract over resource/state, not controller-to-URL mapping
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| api-contract-resource-semantics | API Contracts & Resilience | L2 |
| api-validation-errors-pagination | API Contracts & Resilience | L2 |
| api-versioning-compatibility | API Contracts & Resilience | L3 |
| api-request-identity-idempotency | API Contracts & Resilience | L3 |

### Shared problem / need

Model operation as explicit contract over resource/state, not controller-to-URL mapping.

### Shared mechanism / state trace

Request expresses intent/input; server evaluates state/invariant; response conveys accepted/completed/rejected stable semantics. → Validation blocks unsafe transition; error contract separates classes; pagination defines traversal of changing collection. → Compatibility includes syntax and meaning; additive change/version/migration supports independent deploy. → Key/fingerprint/outcome record separates same-operation retry from a new similar request.

### Shared observable evidence

Request/response examples; OpenAPI; persisted before/after; contract tests.; Contract tests; ProblemDetails payload; cursor/offset; query/order; boundary tests.; Contract/OpenAPI diff; consumer tests; version telemetry; old requests.; Idempotency key; fingerprint; operation record; business row; stored response; retry test.

### Shared failure / debug story

Endpoint hides state transition; GET-like side effect; ambiguous update; caller cannot distinguish accepted/completed/rejected.; Invalid input mapped 500; exception leaks; offset skips/duplicates; unbounded page; field failure unclear.; Required field removed; meaning changes; enum breaks client; assume simultaneous upgrade; rollback incompatible.; Random retry key; same key different payload; crash after effect before record; dedup expiry too short; HTTP method assumed safe.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `api-contract-resource-semantics`, `api-validation-errors-pagination`, `api-versioning-compatibility`, `api-request-identity-idempotency` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `net-http-semantics` remains separate pending its own mechanism/evidence boundary.
- `sec-authorization-object-tenant` remains separate pending its own mechanism/evidence boundary.

## lu-api-deadlines-timeout-cancellation

### Identity

- **Unit ID:** lu-api-deadlines-timeout-cancellation
- **Working title:** Set/propagate one end-to-end time budget and distinguish caller deadline from remote completion
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| api-deadlines-timeout-cancellation | API Contracts & Resilience | L3 |
| api-retry-backoff-jitter | API Contracts & Resilience | L3 |
| api-unknown-outcome-reconciliation | API Contracts & Resilience | L4 |

### Shared problem / need

Set/propagate one end-to-end time budget and distinguish caller deadline from remote completion.

### Shared mechanism / state trace

Remaining deadline is split across hops; cancellation signals no useful caller lifetime but does not prove remote side effect absent. → Retry creates another attempt; backoff spaces it; jitter prevents synchronized retry wave. → Transport failure and business completion are separate; API needs status/outcome mechanism.

### Shared observable evidence

Request deadline; CancellationToken trace; span durations; downstream timeout; active work after disconnect; audit state.; Attempt count; error class; timing; downstream rate; operation ID; remaining deadline.; Operation ID; business/audit record; provider status; attempts; idempotency outcome; reconciliation result.

### Shared failure / debug story

Every hop full timeout; child outlives request; token not forwarded; timeout treated as no remote effect.; Retry non-idempotent mutation; nested retries multiply; immediate storm; retry auth/validation; budget exceeds deadline.; Timeout called failed though committed; blind duplicate retry; status uses other ID; cache trusted as authority; contradictory status.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `api-deadlines-timeout-cancellation`, `api-retry-backoff-jitter`, `api-unknown-outcome-reconciliation` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `concurrency-cancellation-lifetime` remains separate pending its own mechanism/evidence boundary.
- `dist-rpc-unknown-completion` remains separate pending its own mechanism/evidence boundary.

## lu-sec-abuse-bruteforce-resource-business-flow

### Identity

- **Unit ID:** lu-sec-abuse-bruteforce-resource-business-flow
- **Working title:** Detect/limit legitimate-looking request abuse by identity/resource/business state
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-abuse-bruteforce-resource-business-flow | Security | L3 |
| sec-trust-boundary-threat-model | Security | L2 |
| sec-unseen-attack-transfer | Security | L4 |

### Shared problem / need

Detect/limit legitimate-looking request abuse by identity/resource/business state.

### Shared mechanism / state trace

Valid endpoints/credentials can still be abused; budgets/signals need account/device/IP/resource/operation dimensions. → Less-trusted data/identity crossing into trusted decision requires authz/validation/constraint proportional to risk. → Authentication, authorization, input trust, resource abuse, race and audit compose through attacker capability and state transition.

### Shared observable evidence

Attempt rate; account/device/IP/session; success ratio; resource cost; operation history; limit decision.; Data-flow diagram; identity/source; asset/operation; boundary notes; abuse cases.; Request/audit timeline; auth decision; state transition; resource usage; exploit/regression test.

### Shared failure / debug story

Credential stuffing; OTP abuse; expensive export; scalping; IP-only limit bypass.; Internal network assumed trusted; callback authoritative; tenant ID ownership proof; hidden admin endpoint missed.; Patch one payload; UI-only control; symptom block leaves path; fix breaks legitimate tenant flow.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `sec-abuse-bruteforce-resource-business-flow`, `sec-trust-boundary-threat-model`, `sec-unseen-attack-transfer` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `api-circuit-bulkhead-rate-limit` remains separate pending its own mechanism/evidence boundary.
- `sec-auth-session-token` remains separate pending its own mechanism/evidence boundary.

## lu-sec-audit-detection-evidence

### Identity

- **Unit ID:** lu-sec-audit-detection-evidence
- **Working title:** Produce audit evidence of who did what to which object and which security decision occurred
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-audit-detection-evidence | Security | L3 |

### Shared problem / need

Produce audit evidence of who did what to which object and which security decision occurred.

### Shared mechanism / state trace

Audit records subject/action/target/outcome/correlation at trust/business boundary; detection derives signal from it.

### Shared observable evidence

Subject/action/object/tenant; decision/reason; operation ID; timestamp/source; controlled destination.

### Shared failure / debug story

Success/deny indistinguishable; no tenant target; token logged; audit mutable; noise hides sensitive action.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| sec-trust-boundary-threat-model | Frozen graph neighborhood with sec-audit-detection-evidence | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| obs-logs-structured-correlation | Frozen graph neighborhood with sec-audit-detection-evidence | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `sec-trust-boundary-threat-model` remains separate pending its own mechanism/evidence boundary.
- `obs-logs-structured-correlation` remains separate pending its own mechanism/evidence boundary.

## lu-sec-auth-session-token

### Identity

- **Unit ID:** lu-sec-auth-session-token
- **Working title:** Distinguish authentication/authorization and reason session/token validation, lifetime, revocation
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-auth-session-token | Security | L3 |
| sec-authorization-object-tenant | Security | L3 |
| sec-oauth-oidc-awareness | Security | L2 |

### Shared problem / need

Distinguish authentication/authorization and reason session/token validation, lifetime, revocation.

### Shared mechanism / state trace

Credential/session/token establishes identity only after issuer/signature/audience/lifetime/state checks as applicable. → Authorization evaluates subject + action + resource tenant/owner + policy, not just login. → OAuth delegates access to resource; OIDC adds identity info; client/resource/auth server roles differ.

### Shared observable evidence

Token/session metadata; issuer/audience/expiry; auth logs; revocation store; claims.; Subject; policy decision; authoritative owner/tenant; negative tests; audit event.; Token type; issuer; audience; scope; client/resource IDs; AS metadata.

### Shared failure / debug story

Expired accepted; wrong issuer/audience; fixation/reuse; logout assumed instant stateless revoke; token exposure.; BOLA/IDOR; tenant request value trusted; admin UI-only guard; filter after data exposed.; ID token used API token; wrong audience; code/token exposed; OAuth assumed arbitrary attribute proof.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `sec-auth-session-token`, `sec-authorization-object-tenant`, `sec-oauth-oidc-awareness` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `sec-trust-boundary-threat-model` remains separate pending its own mechanism/evidence boundary.
- `api-contract-resource-semantics` remains separate pending its own mechanism/evidence boundary.

## lu-sec-browser-boundaries-cors-csrf-xss

### Identity

- **Unit ID:** lu-sec-browser-boundaries-cors-csrf-xss
- **Working title:** Distinguish CORS, CSRF and XSS to apply correct browser boundary control
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-browser-boundaries-cors-csrf-xss | Security | L2 |

### Shared problem / need

Distinguish CORS, CSRF and XSS to apply correct browser boundary control.

### Shared mechanism / state trace

CORS controls browser cross-origin access; CSRF abuses ambient credentials; XSS executes attacker script in trusted origin.

### Shared observable evidence

Origin; CORS headers; cookie attributes; CSRF token; output context; browser test.

### Shared failure / debug story

CORS assumed CSRF defense; wildcard credentials; cookie mutation no CSRF; unsafe content rendered HTML.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| sec-trust-boundary-threat-model | Frozen graph neighborhood with sec-browser-boundaries-cors-csrf-xss | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| net-http-semantics | Frozen graph neighborhood with sec-browser-boundaries-cors-csrf-xss | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `sec-trust-boundary-threat-model` remains separate pending its own mechanism/evidence boundary.
- `net-http-semantics` remains separate pending its own mechanism/evidence boundary.

## lu-sec-injection-ssrf-input-output

### Identity

- **Unit ID:** lu-sec-injection-ssrf-input-output
- **Working title:** Trace untrusted data into query/network/output sink and stop it controlling syntax/destination/context
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-injection-ssrf-input-output | Security | L3 |

### Shared problem / need

Trace untrusted data into query/network/output sink and stop it controlling syntax/destination/context.

### Shared mechanism / state trace

Injection changes command syntax; SSRF lets attacker choose server destination; typed binding/allow-list separates data/control.

### Shared observable evidence

Constructed query; parameter binding; destination policy; DNS/IP resolution; test payload; egress logs.

### Shared failure / debug story

Concatenated SQL; NoSQL operator injection; metadata/internal fetch; shell composition; wrong-context encoding.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| sec-trust-boundary-threat-model | Frozen graph neighborhood with sec-injection-ssrf-input-output | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| net-request-path-dns | Frozen graph neighborhood with sec-injection-ssrf-input-output | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `sec-trust-boundary-threat-model` remains separate pending its own mechanism/evidence boundary.
- `net-request-path-dns` remains separate pending its own mechanism/evidence boundary.

## lu-sec-race-business-logic-abuse

### Identity

- **Unit ID:** lu-sec-race-business-logic-abuse
- **Working title:** Reproduce concurrent valid requests bypassing invariant and protect atomic owner
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-race-business-logic-abuse | Security | L3 |

### Shared problem / need

Reproduce concurrent valid requests bypassing invariant and protect atomic owner.

### Shared mechanism / state trace

Attacker widens race window; pre-transition authorization/validation cannot protect non-atomic state change.

### Shared observable evidence

Parallel timeline; operation IDs; before/after state; DB constraint/conditional result; audit sequence.

### Shared failure / debug story

Coupon redeemed twice; concurrent spend; duplicate reservation; limit check before insert.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| concurrency-races-check-then-act | Frozen graph neighborhood with sec-race-business-logic-abuse | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| sec-unseen-attack-transfer | Frozen graph neighborhood with sec-race-business-logic-abuse | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `concurrency-races-check-then-act` remains separate pending its own mechanism/evidence boundary.
- `sec-unseen-attack-transfer` remains separate pending its own mechanism/evidence boundary.

## lu-sec-secrets-third-party-trust

### Identity

- **Unit ID:** lu-sec-secrets-third-party-trust
- **Working title:** Control secret lifecycle and verify third-party data/action before trusting it
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-secrets-third-party-trust | Security | L3 |

### Shared problem / need

Control secret lifecycle and verify third-party data/action before trusting it.

### Shared mechanism / state trace

Secrets grant authority; callbacks cross boundary and need identity/integrity/schema/business validation.

### Shared observable evidence

Secret rotation/scope/audit; signature/timestamp; provider request/response; replay record.

### Shared failure / debug story

Secret repo/log; shared long-lived credential; unverified webhook/replay; upstream field trusted; rotation breaks fleet.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| sec-trust-boundary-threat-model | Frozen graph neighborhood with sec-secrets-third-party-trust | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| sec-unseen-attack-transfer | Frozen graph neighborhood with sec-secrets-third-party-trust | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `sec-trust-boundary-threat-model` remains separate pending its own mechanism/evidence boundary.
- `sec-unseen-attack-transfer` remains separate pending its own mechanism/evidence boundary.

## lu-obs-cardinality-sampling-cost

### Identity

- **Unit ID:** lu-obs-cardinality-sampling-cost
- **Working title:** Control dimensions/sampling so telemetry remains useful and affordable
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-cardinality-sampling-cost | Observability & Performance | L3 |
| obs-instrumentation-context | Observability & Performance | L3 |

### Shared problem / need

Control dimensions/sampling so telemetry remains useful and affordable.

### Shared mechanism / state trace

Metric label combinations create time-series cardinality; sampling retains subset by policy. → Events/spans at meaningful transitions; propagated context links calls/tasks/messages.

### Shared observable evidence

Series count; ingest/storage; sample rate; retained slow/error traces; cost.; Parent/child tree; operation ID; semantic attributes; structured log; headers/message metadata.

### Shared failure / debug story

User/order ID label; rare failure sampled away; head sampling loses slow trace; cost grows faster than traffic.; Span ends before async work; state transition missing; context lost in worker; token/payload logged.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `obs-cardinality-sampling-cost`, `obs-instrumentation-context` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `obs-signals-correlation` remains separate pending its own mechanism/evidence boundary.
- `obs-tracing-distributed-evidence` remains separate pending its own mechanism/evidence boundary.

## lu-obs-db-io-downstream-attribution

### Identity

- **Unit ID:** lu-obs-db-io-downstream-attribution
- **Working title:** Attribute latency to CPU, DB, network, downstream or queue wait using discriminating evidence
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-db-io-downstream-attribution | Observability & Performance | L3 |
| obs-latency-throughput-saturation | Observability & Performance | L2 |
| obs-tracing-distributed-evidence | Observability & Performance | L3 |
| obs-diagnostic-method | Observability & Performance | L4 |

### Shared problem / need

Attribute latency to CPU, DB, network, downstream or queue wait using discriminating evidence.

### Shared mechanism / state trace

End-to-end latency composes work/wait across boundaries; correlation compares candidates. → Throughput is completed work, latency distribution measures wait/work, saturation approaches finite capacity, errors are failed work. → Spans represent timed operations with parent/causal relation; context links downstream when possible. → Evidence changes confidence between plausible causes; dashboards without hypothesis are not diagnosis.

### Shared observable evidence

Trace timing; query/plan; acquisition wait; socket/downstream timing; queue wait; profile.; p50/p95/p99; rates; success/error; CPU; queue; pool; concurrency.; Span timeline; parent/link; duration; status; dependency attrs; retry attempts.; Trace/profile; allocation/GC; queue/pool; DB wait/plan; network timing; before/after.

### Shared failure / debug story

Slow endpoint blamed SQL; pool wait omitted; timeout called app processing; N+1 hidden aggregate.; Average hides p99; throughput stable while queue grows; low CPU masks pool bottleneck; reject improves latency but errors ignored.; Missing child span; retry opaque; message link absent; trace assumed business completion; wrong attribution.; Dashboard-first guess; correlation as cause; confirmation bias; many variables changed; metric improves but user symptom remains.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `obs-db-io-downstream-attribution`, `obs-latency-throughput-saturation`, `obs-tracing-distributed-evidence`, `obs-diagnostic-method` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `db-execution-operators` remains separate pending its own mechanism/evidence boundary.
- `db-connection-pool-exhaustion` remains separate pending its own mechanism/evidence boundary.

## lu-obs-load-test-benchmark-validity

### Identity

- **Unit ID:** lu-obs-load-test-benchmark-validity
- **Working title:** Design/reject benchmark from workload, warm-up, distribution and bottleneck similarity to claim
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-load-test-benchmark-validity | Observability & Performance | L3 |

### Shared problem / need

Design/reject benchmark from workload, warm-up, distribution and bottleneck similarity to claim.

### Shared mechanism / state trace

Result is valid only for experiment conditions: concurrency, data, warm-up, environment.

### Shared observable evidence

Workload model; arrival/concurrency; dataset; warm-up; saturation; generator metrics; latency distribution.

### Shared failure / debug story

Cold startup claimed steady; tiny uniform data; generator bottleneck; microbenchmark claims throughput; no dependency failure.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| obs-latency-throughput-saturation | Frozen graph neighborhood with obs-load-test-benchmark-validity | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| runtime-jit-warmup | Frozen graph neighborhood with obs-load-test-benchmark-validity | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `obs-latency-throughput-saturation` remains separate pending its own mechanism/evidence boundary.
- `runtime-jit-warmup` remains separate pending its own mechanism/evidence boundary.

## lu-obs-logs-structured-correlation

### Identity

- **Unit ID:** lu-obs-logs-structured-correlation
- **Working title:** Produce structured queryable logs for significant events/context
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-logs-structured-correlation | Observability & Performance | L2 |
| obs-signals-correlation | Observability & Performance | L2 |

### Shared problem / need

Produce structured queryable logs for significant events/context.

### Shared mechanism / state trace

Stable fields make events queryable/correlatable instead of prose parsing. → Metrics aggregate behavior, logs discrete structured events, traces causal path; context connects views.

### Shared observable evidence

Event schema; correlation ID; query result; volume.; Trace/span; operation ID; metric dimensions/time; fields; request timeline.

### Shared failure / debug story

String-only regex; inconsistent field types; secret/PII; no resource/operation; noisy duplicates.; Metric spike lacks context; logs uncorrelated; trace ID lost async; collect all signals no question.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `obs-logs-structured-correlation`, `obs-signals-correlation` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `sec-audit-detection-evidence` remains separate pending its own mechanism/evidence boundary.
- `obs-diagnostic-method` remains separate pending its own mechanism/evidence boundary.

## lu-obs-profiling-runtime-evidence

### Identity

- **Unit ID:** lu-obs-profiling-runtime-evidence
- **Working title:** Use CPU/allocation/stack/runtime evidence to locate actual time/memory work
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-profiling-runtime-evidence | Observability & Performance | L3 |

### Shared problem / need

Use CPU/allocation/stack/runtime evidence to locate actual time/memory work.

### Shared mechanism / state trace

Profiler/runtime diagnostics sample execution/allocation and reveal hotspot/wait unseen by endpoint metric.

### Shared observable evidence

CPU samples; allocation; GC; stacks; ThreadPool queue; wait trace.

### Shared failure / debug story

Optimize without profile; CPU blamed GC; latency blamed CPU while I/O wait; non-representative capture.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| runtime-diagnostics | Frozen graph neighborhood with obs-profiling-runtime-evidence | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| obs-diagnostic-method | Frozen graph neighborhood with obs-profiling-runtime-evidence | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `runtime-diagnostics` remains separate pending its own mechanism/evidence boundary.
- `obs-diagnostic-method` remains separate pending its own mechanism/evidence boundary.

## lu-rel-cascading-failure-queue-capacity

### Identity

- **Unit ID:** lu-rel-cascading-failure-queue-capacity
- **Working title:** Trace one slow dependency into queues/retries/resource exhaustion upstream
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-cascading-failure-queue-capacity | Reliability / SRE | L3 |
| rel-overload-load-shedding-degradation | Reliability / SRE | L3 |
| rel-dependency-budgets | Reliability / SRE | L3 |

### Shared problem / need

Trace one slow dependency into queues/retries/resource exhaustion upstream.

### Shared mechanism / state trace

Slow dependency extends in-flight lifetime; queues/retries consume finite caller resources and propagate pressure. → Demand beyond capacity grows queue/resource use; admission/degradation bounds work. → User journey has finite time/error capacity; each dependency/retry consumes a portion.

### Shared observable evidence

Dependency latency; in-flight; queue age; retry rate; pools; error timeline.; Rates; queue/in-flight; saturation; rejection; critical latency; user impact.; Deadline; per-hop timeout; retries; dependency latency/error; critical trace; budget.

### Shared failure / debug story

Long timeout holds workers; retries multiply; unbounded queue; shared pool starvation.; Accept until OOM; shed after expensive work; fallback equally costly; batch starves interactive; degradation incorrect.; Child timeout exceeds caller; nested retries; optional blocks critical; dependency reliability insufficient.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `rel-cascading-failure-queue-capacity`, `rel-overload-load-shedding-degradation`, `rel-dependency-budgets` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `api-retry-backoff-jitter` remains separate pending its own mechanism/evidence boundary.
- `concurrency-bounded-backpressure` remains separate pending its own mechanism/evidence boundary.

## lu-rel-change-rollout-rollback-risk

### Identity

- **Unit ID:** lu-rel-change-rollout-rollback-risk
- **Working title:** Release incrementally with evidence and rollback/roll-forward boundary defined first
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-change-rollout-rollback-risk | Reliability / SRE | L3 |
| rel-user-journey-sli-slo-budget | Reliability / SRE | L3 |

### Shared problem / need

Release incrementally with evidence and rollback/roll-forward boundary defined first.

### Shared mechanism / state trace

Progressive exposure limits blast radius; rollback works only while code/data/config compatible. → SLI measures behavior; SLO target over window; budget is allowed gap from perfect.

### Shared observable evidence

Version; traffic percentage; SLI/error by version; schema/config; business KPI; rollback result.; Journey; good/total; latency/success; window; budget; failures.

### Shared failure / debug story

100% deploy; schema rollback incompatibility; unrepresentative canary; flag doesn’t undo effect; health misses business failure.; Uptime hides broken journey; arbitrary SLO; wrong denominator; equal criticality; 100% policy.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `rel-change-rollout-rollback-risk`, `rel-user-journey-sli-slo-budget` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `api-versioning-compatibility` remains separate pending its own mechanism/evidence boundary.
- `db-schema-evolution` remains separate pending its own mechanism/evidence boundary.

## lu-rel-disaster-recovery-rpo-rto

### Identity

- **Unit ID:** lu-rel-disaster-recovery-rpo-rto
- **Working title:** Translate business recovery requirement to RPO/RTO and verify mechanism meets it
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-disaster-recovery-rpo-rto | Reliability / SRE | L3 |

### Shared problem / need

Translate business recovery requirement to RPO/RTO and verify mechanism meets it.

### Shared mechanism / state trace

RPO bounds loss window; RTO restoration time; capability depends backup/replication/rebuild and dependencies.

### Shared observable evidence

Restore result; recovered time; data delta; duration; checklist; exercise report.

### Shared failure / debug story

Restore slower RTO; replica assumed backup; restore point misses RPO; config/secrets missing; no drill.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| db-backup-restore | Frozen graph neighborhood with rel-disaster-recovery-rpo-rto | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| dist-replication-leader-quorum | Frozen graph neighborhood with rel-disaster-recovery-rpo-rto | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `db-backup-restore` remains separate pending its own mechanism/evidence boundary.
- `dist-replication-leader-quorum` remains separate pending its own mechanism/evidence boundary.

## lu-rel-failure-injection-verification

### Identity

- **Unit ID:** lu-rel-failure-injection-verification
- **Working title:** Design safe bounded fault test for stated reliability assumption and interpret result
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-failure-injection-verification | Reliability / SRE | L4 |

### Shared problem / need

Design safe bounded fault test for stated reliability assumption and interpret result.

### Shared mechanism / state trace

Inject one controlled fault, predict, observe user/system evidence, compare outcome and stop safely.

### Shared observable evidence

Hypothesis; fault; scope; SLI; queues; recovery; stop condition; state.

### Shared failure / debug story

Chaos no hypothesis; too broad blast; unrealistic fault; infra survives user journey fails; recovery unverified.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| test-failure-resilience | Frozen graph neighborhood with rel-failure-injection-verification | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| rel-user-journey-sli-slo-budget | Frozen graph neighborhood with rel-failure-injection-verification | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `test-failure-resilience` remains separate pending its own mechanism/evidence boundary.
- `rel-user-journey-sli-slo-budget` remains separate pending its own mechanism/evidence boundary.

## lu-rel-health-readiness-semantics

### Identity

- **Unit ID:** lu-rel-health-readiness-semantics
- **Working title:** Define liveness/readiness semantics so routing/restarts help recovery instead of cascade
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-health-readiness-semantics | Reliability / SRE | L3 |

### Shared problem / need

Define liveness/readiness semantics so routing/restarts help recovery instead of cascade.

### Shared mechanism / state trace

Liveness means no useful progress; readiness means traffic eligibility; dependency signal need not trigger death.

### Shared observable evidence

Probe reason; restart count; ready endpoints; dependency state; routing; startup/drain.

### Shared failure / debug story

DB outage restarts fleet; ready before warmup; ready while incapable; expensive probe; transient removal.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| obs-signals-correlation | Frozen graph neighborhood with rel-health-readiness-semantics | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| delivery-probes-health | Frozen graph neighborhood with rel-health-readiness-semantics | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `obs-signals-correlation` remains separate pending its own mechanism/evidence boundary.
- `delivery-probes-health` remains separate pending its own mechanism/evidence boundary.

## lu-rel-incident-response-postmortem

### Identity

- **Unit ID:** lu-rel-incident-response-postmortem
- **Working title:** During/after incident separate mitigation, diagnosis, evidence preservation and system learning
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-incident-response-postmortem | Reliability / SRE | L3 |

### Shared problem / need

During/after incident separate mitigation, diagnosis, evidence preservation and system learning.

### Shared mechanism / state trace

Contain user impact first; root cause follows stabilization; timeline prevents hindsight.

### Shared observable evidence

Timeline; impact; actions; snapshots; hypothesis; mitigation; owner/test.

### Shared failure / debug story

Risky experiment pre-mitigation; many changes destroy evidence; blame; vague action; prevention unverified.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| obs-diagnostic-method | Frozen graph neighborhood with rel-incident-response-postmortem | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| rel-user-journey-sli-slo-budget | Frozen graph neighborhood with rel-incident-response-postmortem | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `obs-diagnostic-method` remains separate pending its own mechanism/evidence boundary.
- `rel-user-journey-sli-slo-budget` remains separate pending its own mechanism/evidence boundary.

## lu-test-ci-flakiness-repeatability

### Identity

- **Unit ID:** lu-test-ci-flakiness-repeatability
- **Working title:** Diagnose CI failure as product defect, environment dependency or nondeterministic test
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-ci-flakiness-repeatability | Testing & Engineering Quality | L3 |
| test-risk-strategy-boundaries | Testing & Engineering Quality | L2 |
| test-time-concurrency-determinism | Testing & Engineering Quality | L3 |
| test-real-dependency-fixtures | Testing & Engineering Quality | L3 |

### Shared problem / need

Diagnose CI failure as product defect, environment dependency or nondeterministic test.

### Shared mechanism / state trace

Trustworthy test gives same verdict for same state; hidden clock/order/network/shared state breaks repeatability. → Test value falsifies risky assumption at narrowest boundary that retains actual mechanism. → Clock, barrier, scheduling point and test-data ownership intentionally reach desired state. → Fixture provides controlled real instance/state, observing constraint/transaction/serialization/broker behavior.

### Shared observable evidence

Repeat history; seed; test order; worker/env; resource owner; timing; failure artifact.; Risk statement; boundary; reproduced failure; invariant assertion; escaped defect history.; Gate events; controlled clock; task completion; captured interleaving; repeated stability.; Version; migration; seed; health; persisted/message result; cleanup/isolation.

### Shared failure / debug story

Order dependency; shared DB/static; port collision; external network; timing race; retry hides flake.; Mock removes mechanism; E2E for pure logic; coverage misses path; implementation-shaped test.; Thread.Sleep; occasional race pass; assertion before work done; wall-clock expiry flake; shared mutable tests.; In-memory differs PostgreSQL; mock broker misses redelivery; shared DB leak; version mismatch; wrong migration.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `test-ci-flakiness-repeatability`, `test-risk-strategy-boundaries`, `test-time-concurrency-determinism`, `test-real-dependency-fixtures` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `prog-invariants-domain-model` remains separate pending its own mechanism/evidence boundary.
- `test-unit-integration-contract` remains separate pending its own mechanism/evidence boundary.

## lu-test-failure-resilience

### Identity

- **Unit ID:** lu-test-failure-resilience
- **Working title:** Verify outcome, durable state, retry/recovery and invariant under controlled dependency/resource failure
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-failure-resilience | Testing & Engineering Quality | L3 |
| test-risk-transfer | Testing & Engineering Quality | L4 |

### Shared problem / need

Verify outcome, durable state, retry/recovery and invariant under controlled dependency/resource failure.

### Shared mechanism / state trace

Inject known boundary failure then assert observable result and post-recovery state. → Strategy derives from risk/mechanism, not copied feature test structure.

### Shared observable evidence

Injected fault; attempts; persisted/audit state; operation ID; result; recovery state.; Risk matrix; boundary; failing/passing fixture; real state; rejected alternative rationale.

### Shared failure / debug story

Timeout only exception checked; retry duplicates; partial DB write; wrong fallback authority; stub always success.; Copy old shape after boundary moved; mock removes new failure; E2E no localization; green proves untested assumption.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `test-failure-resilience`, `test-risk-transfer` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `rel-failure-injection-verification` remains separate pending its own mechanism/evidence boundary.
- `test-risk-strategy-boundaries` remains separate pending its own mechanism/evidence boundary.

## lu-test-migration-compatibility

### Identity

- **Unit ID:** lu-test-migration-compatibility
- **Working title:** Prove old/new app and schema/data/event contract coexist during transitional rollout
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-migration-compatibility | Testing & Engineering Quality | L3 |

### Shared problem / need

Prove old/new app and schema/data/event contract coexist during transitional rollout.

### Shared mechanism / state trace

Test production transitional states, not only final migration state.

### Shared observable evidence

Old/new fixture; schema version; old data/event/request; migration; rollback test.

### Shared failure / debug story

New reads column before migration; old cannot read new state; destructive early change; rollback incompatible; old fixture fails.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| test-risk-strategy-boundaries | Frozen graph neighborhood with test-migration-compatibility | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| api-versioning-compatibility | Frozen graph neighborhood with test-migration-compatibility | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `test-risk-strategy-boundaries` remains separate pending its own mechanism/evidence boundary.
- `api-versioning-compatibility` remains separate pending its own mechanism/evidence boundary.

## lu-test-property-boundary-fuzz

### Identity

- **Unit ID:** lu-test-property-boundary-fuzz
- **Working title:** Falsify invariant over generated/boundary input, not hand-picked happy examples
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-property-boundary-fuzz | Testing & Engineering Quality | L3 |

### Shared problem / need

Falsify invariant over generated/boundary input, not hand-picked happy examples.

### Shared mechanism / state trace

Property states behavior over many input; boundary targets transitions; fuzz explores omitted combinations.

### Shared observable evidence

Property; seed/input; shrunk example; boundary values; reproducible case.

### Shared failure / debug story

Size boundary; malformed parser combination; rare sequence violates invariant; weak property; seed lost.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| prog-invariants-domain-model | Frozen graph neighborhood with test-property-boundary-fuzz | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| test-risk-strategy-boundaries | Frozen graph neighborhood with test-property-boundary-fuzz | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `prog-invariants-domain-model` remains separate pending its own mechanism/evidence boundary.
- `test-risk-strategy-boundaries` remains separate pending its own mechanism/evidence boundary.

## lu-test-review-static-analysis-change-safety

### Identity

- **Unit ID:** lu-test-review-static-analysis-change-safety
- **Working title:** Use review/compiler/analyzer/targeted tests as complementary change evidence
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-review-static-analysis-change-safety | Testing & Engineering Quality | L3 |

### Shared problem / need

Use review/compiler/analyzer/targeted tests as complementary change evidence.

### Shared mechanism / state trace

Static finds non-executed classes; review assesses intent/boundary; tests exercise dynamic behavior.

### Shared observable evidence

Diff; review rationale; analyzer; invariant/contract; regression test; before/after.

### Shared failure / debug story

Style-only review; unexplained suppression; AI diff accepted green; test old requirement; risky diff no regression.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| test-risk-strategy-boundaries | Frozen graph neighborhood with test-review-static-analysis-change-safety | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| prog-api-refactoring-change-safety | Frozen graph neighborhood with test-review-static-analysis-change-safety | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `test-risk-strategy-boundaries` remains separate pending its own mechanism/evidence boundary.
- `prog-api-refactoring-change-safety` remains separate pending its own mechanism/evidence boundary.

## lu-test-unit-integration-contract

### Identity

- **Unit ID:** lu-test-unit-integration-contract
- **Working title:** Choose unit/integration/contract by behavior boundary and state what each cannot prove
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-unit-integration-contract | Testing & Engineering Quality | L3 |

### Shared problem / need

Choose unit/integration/contract by behavior boundary and state what each cannot prove.

### Shared mechanism / state trace

Unit isolates deterministic logic; integration runs real collaborator; contract verifies external compatibility.

### Shared observable evidence

Real dependency state; contract; DB rows; double boundary; failure lost when wrong layer mocked.

### Shared failure / debug story

Mock repo claimed SQL; HTTP 200 DB wrong; semantic provider change missed; duplicate layers no evidence.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| test-risk-strategy-boundaries | Frozen graph neighborhood with test-unit-integration-contract | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| test-real-dependency-fixtures | Frozen graph neighborhood with test-unit-integration-contract | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `test-risk-strategy-boundaries` remains separate pending its own mechanism/evidence boundary.
- `test-real-dependency-fixtures` remains separate pending its own mechanism/evidence boundary.

## lu-arch-boundaries-ownership

### Identity

- **Unit ID:** lu-arch-boundaries-ownership
- **Working title:** Choose module/service boundary by invariant, change ownership and operational owner
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-boundaries-ownership | Architecture & System Design | L3 |
| arch-requirements-quality-attributes | Architecture & System Design | L3 |
| arch-data-ownership-source-of-truth | Architecture & System Design | L3 |
| arch-failure-recovery-security-observability | Architecture & System Design | L4 |

### Shared problem / need

Choose module/service boundary by invariant, change ownership and operational owner.

### Shared mechanism / state trace

Boundary grants one owner authority over state/rules; crossing it needs explicit contract. → Decisions only matter against correctness, latency, availability, throughput, durability, security, operability, changeability and cost needs. → One owner accepts transition; derived systems copy/calculate with different freshness. → Critical transition needs failure behavior, recovery owner, trust path and diagnostic evidence.

### Shared observable evidence

State owner; write paths; invariant; API/event dependencies; coupling; deployment owner.; Requirement list; quality scenario; traffic/data estimates; constraints; assumption register.; Write paths; source version; update flow; derived copy; rebuild/reconcile.; Failure table; recovery owner; data flow; telemetry path; RPO/RTO/SLO; operation ID.

### Shared failure / debug story

Service per table; shared DB mutation; split invariant; chatty arbitrary decomposition; no owner.; Technology-first; scale no number; conflict implicit; optional feature drives core; imagined hyperscale.; Two authorities; cache/search mutated as source; reporting write leaks; unrebuildable projection; migration ambiguity.; No timeout/recovery owner; unmodeled trust path; async uncorrelated; dependency collapse; no recovery plan.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `arch-boundaries-ownership`, `arch-requirements-quality-attributes`, `arch-data-ownership-source-of-truth`, `arch-failure-recovery-security-observability` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `prog-invariants-domain-model` remains separate pending its own mechanism/evidence boundary.
- `prog-composition-dependencies` remains separate pending its own mechanism/evidence boundary.

## lu-arch-consistency-latency-availability

### Identity

- **Unit ID:** lu-arch-consistency-latency-availability
- **Working title:** Choose where strong guarantee is required and where stale view is acceptable from invariant/failure assumptions
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-consistency-latency-availability | Architecture & System Design | L4 |

### Shared problem / need

Choose where strong guarantee is required and where stale view is acceptable from invariant/failure assumptions.

### Shared mechanism / state trace

Operations need different visibility/order; stronger coordination affects latency/availability.

### Shared observable evidence

Invariant; history; source/replica role; SLO; failure assumption; reconciliation path.

### Shared failure / debug story

Eventual for atomic invariant; strong for harmless report; CAP slogan; stale window undefined.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| arch-requirements-quality-attributes | Frozen graph neighborhood with arch-consistency-latency-availability | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| prog-invariants-domain-model | Frozen graph neighborhood with arch-consistency-latency-availability | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `arch-requirements-quality-attributes` remains separate pending its own mechanism/evidence boundary.
- `prog-invariants-domain-model` remains separate pending its own mechanism/evidence boundary.

## lu-arch-cost-complexity-changeability

### Identity

- **Unit ID:** lu-arch-cost-complexity-changeability
- **Working title:** Reject design whose lifecycle cost exceeds properties bought and revisit when constraints change
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-cost-complexity-changeability | Architecture & System Design | L4 |
| arch-decision-communication-transfer | Architecture & System Design | L4 |

### Shared problem / need

Reject design whose lifecycle cost exceeds properties bought and revisit when constraints change.

### Shared mechanism / state trace

Component/boundary creates deploy, failure, data movement, skills, cloud and migration cost. → Explicit assumptions let future engineer know why/when decision changes.

### Shared observable evidence

Component count; ownership/incident burden; cost; latency/capacity; change frequency.; ADR; capacity evidence; option comparison; risk; revisit condition; outcome.

### Shared failure / debug story

Microservices no change need; résumé Kafka/Redis/K8s; irrelevant optimization; lock-in ignored.; Diagram no rationale; universal best practice; rejected choices hidden; stale decision persists.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `arch-cost-complexity-changeability`, `arch-decision-communication-transfer` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `arch-requirements-quality-attributes` remains separate pending its own mechanism/evidence boundary.
- `arch-boundaries-ownership` remains separate pending its own mechanism/evidence boundary.

## lu-arch-evolution-migration-strangler

### Identity

- **Unit ID:** lu-arch-evolution-migration-strangler
- **Working title:** Move old to target incrementally while paths coexist safely
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-evolution-migration-strangler | Architecture & System Design | L3 |

### Shared problem / need

Move old to target incrementally while paths coexist safely.

### Shared mechanism / state trace

Add seam, route subset, keep compatibility/ownership, observe then remove old.

### Shared observable evidence

Traffic split; old/new comparison; compatibility; progress; reconcile; rollback.

### Shared failure / debug story

Big bang; dual write no reconcile; divergence; rollback impossible; seam permanent.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| arch-boundaries-ownership | Frozen graph neighborhood with arch-evolution-migration-strangler | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| prog-api-refactoring-change-safety | Frozen graph neighborhood with arch-evolution-migration-strangler | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `arch-boundaries-ownership` remains separate pending its own mechanism/evidence boundary.
- `prog-api-refactoring-change-safety` remains separate pending its own mechanism/evidence boundary.

## lu-arch-scale-capacity-partitioning

### Identity

- **Unit ID:** lu-arch-scale-capacity-partitioning
- **Working title:** Estimate bottleneck and choose scale/partition boundary from measurable demand
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-scale-capacity-partitioning | Architecture & System Design | L3 |

### Shared problem / need

Estimate bottleneck and choose scale/partition boundary from measurable demand.

### Shared mechanism / state trace

Scale-out helps only distributable work and cannot remove shared bottleneck.

### Shared observable evidence

Rate; concurrency; CPU/memory; downstream capacity; key distribution; queue/latency.

### Shared failure / debug story

Add replicas while DB saturated; shard without pattern; skew; late autoscale; ignore burst/concurrency.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| arch-requirements-quality-attributes | Frozen graph neighborhood with arch-scale-capacity-partitioning | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| obs-latency-throughput-saturation | Frozen graph neighborhood with arch-scale-capacity-partitioning | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `arch-requirements-quality-attributes` remains separate pending its own mechanism/evidence boundary.
- `obs-latency-throughput-saturation` remains separate pending its own mechanism/evidence boundary.

## lu-arch-sync-async-integration

### Identity

- **Unit ID:** lu-arch-sync-async-integration
- **Working title:** Choose sync/async from coupling, completion semantics, latency and recovery
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-sync-async-integration | Architecture & System Design | L3 |

### Shared problem / need

Choose sync/async from coupling, completion semantics, latency and recovery.

### Shared mechanism / state trace

Sync couples caller lifetime to response; async decouples time but needs durable state/retry/completion model.

### Shared observable evidence

Required response; critical path; availability; operation state; queue/lag; recovery.

### Shared failure / debug story

Async for scale only; long workflow blocks chain; immediate answer via event; sync cascade; async no status.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| arch-requirements-quality-attributes | Frozen graph neighborhood with arch-sync-async-integration | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| net-http-semantics | Frozen graph neighborhood with arch-sync-async-integration | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `arch-requirements-quality-attributes` remains separate pending its own mechanism/evidence boundary.
- `net-http-semantics` remains separate pending its own mechanism/evidence boundary.

## lu-delivery-artifact-image-config

### Identity

- **Unit ID:** lu-delivery-artifact-image-config
- **Working title:** Produce reproducible versioned artifact and separate immutable build from runtime config/secret
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-artifact-image-config | Containers / Kubernetes / Cloud Delivery | L2 |
| delivery-cicd-promotion-provenance | Containers / Kubernetes / Cloud Delivery | L3 |
| delivery-rollout-rollback-strategies | Containers / Kubernetes / Cloud Delivery | L3 |
| delivery-platform-evidence-debug | Containers / Kubernetes / Cloud Delivery | L3 |

### Shared problem / need

Produce reproducible versioned artifact and separate immutable build from runtime config/secret.

### Shared mechanism / state trace

Build creates versioned image; runtime injects config; same digest promotes environments. → CI builds once; registry stores immutable artifact; CD promotes exact reference. → Platform moves traffic/version sets over time; strategy controls coexistence/exposure. → Platform state/events cover scheduling, startup, probes, resources/restarts; app logs alone omit not-running cause.

### Shared observable evidence

Digest/tag; Git SHA; config source; SBOM/provenance; deployed identity.; SHA; pipeline run; digest; registry metadata; deployment record; approval.; Replica/version; deployment status; traffic; readiness; digest; rollback history.; Workload status; events; exit; metrics; logs; config refs; endpoints; revision.

### Shared failure / debug story

Rebuild production differently; latest tag lost provenance; secret baked image; config drift; unknown rollback artifact.; Separate prod rebuild; tag moves digest; no source tie; manual bypass; rollback artifact absent.; Old/new incompatible; availability gap; irreversible schema/event; unrepresentative canary; readiness stall.; CrashLoop no exit reason; pending pod app-log only; OOMKill normal crash; mount ignored; selector mismatch.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `delivery-artifact-image-config`, `delivery-cicd-promotion-provenance`, `delivery-rollout-rollback-strategies`, `delivery-platform-evidence-debug` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `delivery-platform-transfer` remains separate pending its own mechanism/evidence boundary.
- `rel-change-rollout-rollback-risk` remains separate pending its own mechanism/evidence boundary.

## lu-delivery-autoscaling-signal-boundary

### Identity

- **Unit ID:** lu-delivery-autoscaling-signal-boundary
- **Working title:** Choose platform scaling signal matching resource/work pressure and know when replicas cannot help
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-autoscaling-signal-boundary | Containers / Kubernetes / Cloud Delivery | L3 |
| delivery-resources-cpu-memory | Containers / Kubernetes / Cloud Delivery | L3 |
| delivery-platform-transfer | Containers / Kubernetes / Cloud Delivery | L4 |

### Shared problem / need

Choose platform scaling signal matching resource/work pressure and know when replicas cannot help.

### Shared mechanism / state trace

Autoscaler observes signal then changes replicas after delay; scale helps parallel app work but can increase downstream pressure. → Scheduler uses requests; CPU may throttle and memory policy may kill/evict workload. → Artifact/config/resource/health/shutdown/network/telemetry are portable requirements; platform implementations differ.

### Shared observable evidence

Signal; replicas; CPU/queue/concurrency; downstream; events; p95/p99.; Requests/limits; throttle; RSS; OOM; restart; node/pod metrics.; Requirement matrix; platform config; lifecycle behavior; deployment/failure result.

### Shared failure / debug story

CPU for I/O bottleneck; consumers beyond DB; burst faster scale; hot partition; cold scale violates latency.; Throttle called lock; OOM only GC; no request; excessive reservation; limit ignores working/native/page cache.; YAML treated architecture; health shifts; filesystem assumption; CPU/memory change; debug evidence hidden.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `delivery-autoscaling-signal-boundary`, `delivery-resources-cpu-memory`, `delivery-platform-transfer` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `obs-latency-throughput-saturation` remains separate pending its own mechanism/evidence boundary.
- `rel-overload-load-shedding-degradation` remains separate pending its own mechanism/evidence boundary.

## lu-delivery-cloud-responsibility-managed-services

### Identity

- **Unit ID:** lu-delivery-cloud-responsibility-managed-services
- **Working title:** State application-team responsibilities when platform component is managed
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-cloud-responsibility-managed-services | Containers / Kubernetes / Cloud Delivery | L2 |

### Shared problem / need

State application-team responsibilities when platform component is managed.

### Shared mechanism / state trace

Provider manages agreed hardware/control plane, but app owns usage, model, access, capacity, failure behavior/cost and often recovery verification.

### Shared observable evidence

Service contract; config; IAM; recovery; quota; telemetry; cost.

### Shared failure / debug story

Managed DB assumed infallible; restore unclear; provider SLA equals app SLO; IAM/network ignored; queue semantics assumed same.

### Assessment-coherence argument

The nearest candidates below were tested; one case/evidence policy would not credibly prove both mechanisms.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| sec-secrets-third-party-trust | Frozen graph neighborhood with delivery-cloud-responsibility-managed-services | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |
| rel-disaster-recovery-rpo-rto | Frozen graph neighborhood with delivery-cloud-responsibility-managed-services | Different canonical mechanism/evidence boundary; one assessment would not credibly prove both. |

### Explicit exclusions

- `sec-secrets-third-party-trust` remains separate pending its own mechanism/evidence boundary.
- `rel-disaster-recovery-rpo-rto` remains separate pending its own mechanism/evidence boundary.

## lu-delivery-container-process-lifecycle

### Identity

- **Unit ID:** lu-delivery-container-process-lifecycle
- **Working title:** Explain container as primary-process packaging/runtime boundary, not VM
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-container-process-lifecycle | Containers / Kubernetes / Cloud Delivery | L2 |
| delivery-probes-health | Containers / Kubernetes / Cloud Delivery | L3 |
| delivery-graceful-shutdown-draining | Containers / Kubernetes / Cloud Delivery | L3 |

### Shared problem / need

Explain container as primary-process packaging/runtime boundary, not VM.

### Shared mechanism / state trace

Runtime starts process with filesystem/network/resource boundaries; container lifetime follows primary process. → Platform calls probe and converts result to routing/restart by configured type. → Termination → readiness removal → signal → grace window → drain/cancel/ack/release → exit.

### Shared observable evidence

Process tree; state/restart; mounts; exit code; runtime events.; Probe config/result; K8s events; ready condition; restarts; routing.; Termination/readiness time; endpoints; active work; signal; grace; exit.

### Shared failure / debug story

Child lifecycle wrong; PID assumption; durable data ephemeral FS; restart equals recovery.; Readiness wired liveness; outage restart loop; early warmup; expensive probe; terminating still routed.; Still routed after SIGTERM; ack after lost work; grace short; LB delay ignored; no durable handoff.

### Assessment-coherence argument

One mechanism trace and one evidence policy can show the contribution of every Primary capability; split pressure was checked against the direct graph neighborhood.

### Transfer variation

Change workload, failure mode, deployment boundary or data distribution while keeping the same claimed mechanism.

### Merge decisions

Merged because `delivery-container-process-lifecycle`, `delivery-probes-health`, `delivery-graceful-shutdown-draining` share a direct mechanism neighborhood, compatible evidence and one bounded assessment story.

### Explicit exclusions

- `os-process-thread-kernel` remains separate pending its own mechanism/evidence boundary.
- `delivery-resources-cpu-memory` remains separate pending its own mechanism/evidence boundary.

## Stage 1A — Runtime & Concurrency semantic boundary evidence

This batch reviews only Programming Foundations, Runtime & Memory, Operating Systems & I/O Foundations, and Concurrency & Async. It does not finalize prerequisite projection.

| Unit | Canonical shared scenario | Integrated evidence surface | Integrated failure/debug story | Shared assessment task and proof | Transfer variation | Boundary decision |
|---|---|---|---|---|---|---|
| `lu-prog-api-refactoring-change-safety` | A public order API adds a new cancellation outcome while old clients remain live. | Contract diff, consumer contract tests and before/after response trace. | A caller treats the new outcome as success because compatibility was changed at the wrong boundary. | Propose a compatible change plan: identifies affected callers, adapter/version boundary and test evidence. This proves L4 change-safety; errors, invariants and composition remain foundations, not additional Primary mechanisms. | Same API change, but one client is an independently deployed mobile release. | **Split pressure accepted:** retain L4 capability only; foundations are excluded. |
| `lu-runtime-allocation-gc` | A large export allocates short-lived rows while one retained graph prevents expected memory recovery. | One allocation timeline plus managed-heap snapshot and retaining path. | Throughput falls as allocation rate causes GC work, while a rooted object keeps a large graph alive. | Diagnose the trace, separate allocation pressure from retention, and choose streaming/batching/pooling only where ownership permits. This proves roots/lifetime, allocation/GC and retention/pooling together. | Same export under a long-lived singleton cache. | **Retained multi-unit:** one heap/evidence surface proves the full memory chain. |
| `lu-runtime-diagnostics` | A service slows after deployment and memory rises only under production-shaped traffic. | Heap dump, allocation profile, GC counters and request latency correlation. | A suspected GC issue is actually allocation churn visible in profile; the learner must test the hypothesis. | Build a ranked diagnosis from the same profile/counters and justify the next measurement. L3 diagnostics and L4 performance-debug are both evidenced by one hypothesis loop. | Repeat under warm JIT versus steady-state load. | **Retained multi-unit:** same evidence-to-hypothesis mechanism. |
| `lu-os-blocking-io-waits` | A worker holds a file/socket handle while a synchronous read blocks shutdown. | One process/thread/handle timeline with wait state and handle count. | Shutdown hangs because the owning operation still waits on I/O. | Trace resource ownership through open, wait, cancellation and close; identify who can release it. | Replace local file read with a slow socket peer. | **Retained multi-unit:** one resource-operation lifecycle. |
| `lu-os-process-thread-kernel` | A service receives termination while a busy worker and page pressure delay exit. | Process tree, thread states, shutdown log and memory/page counters. | Scheduler delay, graceful drain and virtual-memory pressure are independent diagnostic loops. | No single task can prove process model, scheduling, termination and page-cache reasoning without separate cases. | N/A — split required. | **Split pressure accepted:** process/thread, scheduling/termination and page-cache stay independent where map boundaries already separate them. |
| `lu-concurrency-async-parallelism` | A burst of jobs fans out to a bounded worker pool; cancellation arrives while downstream is slow. | One in-flight work timeline: queue depth, active tasks, cancellation signal and completion records. | Unbounded fan-out exhausts capacity; cancellation is ignored after work ownership changes. | Configure bounded concurrency, propagate cancellation, and explain which tasks may start/finish. This proves async execution, lifetime/cancellation and backpressure in one capacity-control case. | Single request becomes burst traffic with downstream latency. | **Retained multi-unit:** one in-flight work/capacity state machine. |
| `lu-race-atomicity` | Two checkout requests reserve the same stock row concurrently. | Interleaving timeline, row version/affected-row evidence and invariant test. | Check-then-act produces oversell; local lock choice must be rejected or scoped correctly. | Reproduce the race then replace it with atomic transition/conflict handling and prove the invariant. | Same invariant across four replicas. | **Retained frozen dry-run:** concrete contradiction not found. |
| `lu-concurrency-deadlock-starvation` | Two workers acquire resources in opposite order while a queued task never receives capacity. | Wait-for graph, lock acquisition trace and queue wait time. | Circular wait differs from starvation: one has a cycle, the other has progress unfairness. | Classify the trace and choose ordering/timeout/capacity remedy. | One lock becomes a database plus in-process lock boundary. | **Retained multi-unit:** same waiting/ownership evidence surface. |
| `lu-concurrency-local-vs-distributed` | Four replicas each hold an in-process lock for the same reservation key. | Replica IDs, concurrent requests and shared-store affected rows. | Local synchronization appears correct in one instance but duplicates side effects across replicas. | Explain the authority mismatch and choose DB atomicity/partition owner rather than a local lock. | Add process restart during an active reservation. | **Singleton retained:** distributed authority has a different state owner and evidence surface. |
| `lu-concurrency-memory-visibility` | Producer writes a flag/data pair while another execution context observes stale ordering. | Minimal concurrent trace with observed values and synchronization boundary. | Code is race-free in intent but visibility/order is not guaranteed. | Explain the observation and select the correct synchronization primitive. | Move from one thread pair to a task/worker handoff. | **Singleton retained:** visibility proof needs a distinct memory-order case. |
| `lu-runtime-jit-warmup` | A cold endpoint misses latency SLO only on first requests after rollout. | Startup request timings, compilation events and steady-state comparison. | Cold-path latency is mistaken for steady-state allocation or database regression. | Design a warmup measurement that separates compilation from request work. | New deployment revision with different hot path. | **Singleton retained:** compilation lifecycle differs from heap/state ownership. |
| `lu-runtime-managed-execution` | A request schedules CPU work while ThreadPool capacity is saturated. | Request/task/thread-pool timeline and queue counters. | Blocking work starves available workers and delays unrelated requests. | Identify execution ownership and choose async I/O versus awaited CPU work. | CPU work shifts to burst fan-out. | **Singleton retained:** execution scheduling is not heap retention or cancellation ownership. |
| `lu-os-resource-exhaustion` | Handle count grows until new connection opens fail. | Process resource counters, failed-open errors and handle-leak trace. | A leak becomes admission failure rather than a slow I/O wait. | Locate the unreleased owner and set an observable resource budget. | Same leak in a container limit. | **Singleton retained:** exhaustion threshold/operating limit differs from one I/O lifecycle. |

### Cross-owner candidates reviewed

| Candidate | Decision | Concrete grouping reason |
|---|---|---|
| `prog-invariants-domain-model` ↔ `concurrency-interleavings-invariants` | REJECTED | Domain invariant defines valid business state; concurrency unit proves which interleaving breaks it. One shared task would use the former as context rather than assess its full domain-transition design. |
| `prog-resource-ownership` ↔ `concurrency-cancellation-lifetime` | REJECTED | Resource owner/dispose boundary and cancellation propagation have different authoritative state; cancellation unit may recap ownership without duplicating the resource-lifetime mechanism. |
| `os-blocking-io-waits` ↔ `concurrency-async-parallelism` | REJECTED | I/O wait is a resource-operation lifecycle; bounded concurrency is queue/capacity control. A combined task needs two independent evidence surfaces. |
| `os-scheduling-starvation` ↔ `concurrency-async-parallelism` | REJECTED | OS scheduling fairness and application-level in-flight capacity are separate control authorities despite similar symptoms. |
| `os-files-handles-sockets-ipc` ↔ `net-tcp-connection-semantics` | REJECTED | OS handle lifecycle and TCP handshake/connection-state evidence belong to different systems. |
| `os-virtual-memory-page-cache` ↔ `runtime-memory-roots-lifetime` | REJECTED | Page residency is OS physical-memory evidence; roots/retaining paths are managed-heap reachability evidence. |