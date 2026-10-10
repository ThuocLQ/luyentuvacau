# QuanNet Learning-Unit Map — Stage 1

> **Status:** FROZEN — Stage 1 Learning-Unit decomposition sealed; Stage 2 progression policy materialized.
> **Frozen input SHA:** `771f6541872adceb52786387006059e2059df6a8`.

Frozen capabilities: 167. Learning Units: 137. Singleton units: 111. Multi-capability units: 26. Single-owner units: 135. Multi-owner units: 2.

File order is **not** curriculum order. REQUIRED/RECOMMENDED projection is **not finalized** in Stage 1.

## Unit Registry

| Unit ID | Working title | Domain candidate | Primary owner set | Primary capability count |
|---|---|---|---|---|
| lu-race-atomicity | Protect an invariant across unsafe interleaving | Runtime & Concurrency | Concurrency & Async | 3 |
| lu-prog-api-refactoring-change-safety | Đưa một API qua thay đổi yêu cầu mà vẫn chỉ ra được contract cũ/mới, caller bị ảnh hưởng và giới hạn refactor | Runtime & Concurrency | Programming & Software Design Foundations | 1 |
| lu-prog-errors-results | Phân loại lỗi dự đoán được và giữ lỗi bất ngờ có ngữ cảnh | Runtime & Concurrency | Programming & Software Design Foundations | 1 |
| lu-prog-invariants-domain-model | Giữ business invariant tại state transition và persistence boundary | Runtime & Concurrency | Programming & Software Design Foundations | 1 |
| lu-prog-composition-dependencies | Nối dependency tại composition root mà không làm core phụ thuộc hạ tầng | Runtime & Concurrency | Programming & Software Design Foundations | 1 |
| lu-prog-collections-complexity | Chọn collection theo đường truy cập, kích thước input và thao tác chiếm chi phí trong hot path | Runtime & Concurrency | Programming & Software Design Foundations | 1 |
| lu-prog-resource-ownership | Chỉ ra ai tạo, ai sở hữu, ai dispose/release và lúc nào resource không còn hợp lệ để dùng | Runtime & Concurrency | Programming & Software Design Foundations | 1 |
| lu-prog-types-generics | Thiết kế type contract khiến invalid state khó biểu diễn, generic bị ràng buộc đúng và null boundary được xử lý rõ | Runtime & Concurrency | Programming & Software Design Foundations | 1 |
| lu-prog-values-identity | Phân biệt value equality với object/reference identity để dự đoán aliasing và mutation | Runtime & Concurrency | Programming & Software Design Foundations | 1 |
| lu-runtime-allocation-gc | Giải thích allocation rate dẫn tới GC work và chọn mitigation sau khi có số liệu | Runtime & Concurrency | Runtime & Memory | 3 |
| lu-runtime-diagnostics | Chọn counter, trace hoặc dump/profile theo một hypothesis về runtime thay vì thu thập mọi thứ | Runtime & Concurrency | Runtime & Memory | 2 |
| lu-runtime-jit-warmup | Phân biệt cold execution, JIT compilation/optimization và steady-state trước khi tin benchmark hoặc SLO đầu phiên | Runtime & Concurrency | Runtime & Memory | 1 |
| lu-runtime-managed-execution | Mô tả ranh giới trách nhiệm giữa application code, managed runtime và native/OS khi debug runtime issue | Runtime & Concurrency | Runtime & Memory | 1 |
| lu-os-blocking-io-waits | Giải thích thread chờ vì completion ở bên ngoài và nhận ra sync I/O đang chiếm worker capacity | Runtime & Concurrency | Operating Systems & I/O Foundations | 2 |
| lu-os-process-thread-kernel | Phân biệt process/address space, thread execution unit và user/kernel boundary khi theo symptom | Runtime & Concurrency | Operating Systems & I/O Foundations | 1 |
| lu-os-scheduling-starvation | Chẩn đoán runnable work không nhận được CPU hoặc execution capacity | Runtime & Concurrency | Operating Systems & I/O Foundations | 1 |
| lu-os-termination-graceful-shutdown | Dừng service có deadline mà không nhận thêm work và không mất trạng thái cần giữ | Runtime & Concurrency | Operating Systems & I/O Foundations | 1 |
| lu-os-virtual-memory-page-cache | Phân biệt virtual memory, working set và page cache khi đọc memory hoặc I/O symptom | Runtime & Concurrency | Operating Systems & I/O Foundations | 1 |
| lu-os-resource-exhaustion | Phân biệt memory, thread, handle và socket exhaustion bằng failure/evidence phù hợp từng resource | Runtime & Concurrency | Operating Systems & I/O Foundations | 1 |
| lu-concurrency-async-parallelism | Phân biệt async chờ completion, concurrency quản lý nhiều work và parallel execution dùng nhiều execution resource | Runtime & Concurrency | Concurrency & Async | 3 |
| lu-concurrency-deadlock-starvation | Chẩn đoán deadlock khác starvation bằng dependency wait và bằng chứng forward progress | Runtime & Concurrency | Concurrency & Async | 1 |
| lu-concurrency-local-vs-distributed | Đánh giá boundary của in-process synchronization và thiết kế lại invariant owner khi service chạy bốn replicas | Runtime & Concurrency | Concurrency & Async | 1 |
| lu-concurrency-memory-visibility | Giải thích vì sao thread khác có thể không quan sát state theo thứ tự ngây thơ và dùng primitive tạo visibility/ordering cần thiết | Runtime & Concurrency | Concurrency & Async | 1 |
| lu-obs-cardinality-sampling-cost | Control telemetry cardinality and sampling cost | Production Engineering | Observability & Performance | 1 |
| lu-obs-instrumentation-tracing | Reconstruct one operation across API, worker and downstream service | Production Engineering | Observability & Performance | 2 |
| lu-obs-latency-throughput-saturation | Read latency, throughput and saturation as one workload signal | Production Engineering | Observability & Performance | 1 |
| lu-obs-db-io-downstream-attribution | Locate the timing boundary responsible for a slow request | Production Engineering | Observability & Performance | 1 |
| lu-obs-diagnostic-method | Turn competing production hypotheses into discriminating evidence | Production Engineering | Observability & Performance | 1 |
| lu-obs-load-test-benchmark-validity | Decide whether a performance claim is supported by a valid experiment | Production Engineering | Observability & Performance | 1 |
| lu-obs-logs-structured-correlation | Make significant events queryable through structured correlated logs | Production Engineering | Observability & Performance | 1 |
| lu-obs-signals-correlation | Choose the smallest signal set that answers an operational question | Production Engineering | Observability & Performance | 1 |
| lu-obs-profiling-runtime-evidence | Interpret runtime profiling evidence before optimizing | Production Engineering | Observability & Performance | 1 |
| lu-rel-cascading-failure-queue-capacity | Trace pressure propagation from one slow dependency across services | Production Engineering | Reliability / SRE | 1 |
| lu-rel-overload-load-shedding-degradation | Protect critical work through explicit admission and degradation policy | Production Engineering | Reliability / SRE | 1 |
| lu-rel-dependency-budgets | Allocate one user journey deadline across dependencies and retries | Production Engineering | Reliability / SRE | 1 |
| lu-rel-user-journey-sli-slo-budget | Define an SLI/SLO around a real user journey | Production Engineering | Reliability / SRE | 1 |
| lu-release-rollout-rollback | Release a risky version progressively and recover safely | Production Engineering | Reliability / SRE; Containers / Kubernetes / Cloud Delivery | 2 |
| lu-rel-disaster-recovery-rpo-rto | Prove a recovery plan meets RPO and RTO | Production Engineering | Reliability / SRE | 1 |
| lu-rel-failure-injection-verification | Run a bounded fault experiment with recovery proof | Production Engineering | Reliability / SRE | 1 |
| lu-rel-health-probes | Keep unsafe traffic out without restarting useful work | Production Engineering | Reliability / SRE; Containers / Kubernetes / Cloud Delivery | 2 |
| lu-rel-incident-response-postmortem | Mitigate an incident while preserving evidence and learning | Production Engineering | Reliability / SRE | 1 |
| lu-delivery-artifact-provenance | Prove the exact artifact and configuration promoted to production | Production Engineering | Containers / Kubernetes / Cloud Delivery | 2 |
| lu-delivery-platform-evidence-debug | Localize a workload failure from platform evidence | Production Engineering | Containers / Kubernetes / Cloud Delivery | 1 |
| lu-delivery-autoscaling-signal-boundary | Choose an autoscaling signal that matches real work pressure | Production Engineering | Containers / Kubernetes / Cloud Delivery | 1 |
| lu-delivery-resources-cpu-memory | Set CPU and memory requests/limits from workload evidence | Production Engineering | Containers / Kubernetes / Cloud Delivery | 1 |
| lu-delivery-platform-transfer | Transfer a workload requirement across platform implementations | Production Engineering | Containers / Kubernetes / Cloud Delivery | 1 |
| lu-delivery-cloud-responsibility-managed-services | Verify application-team responsibility around managed services | Production Engineering | Containers / Kubernetes / Cloud Delivery | 1 |
| lu-delivery-container-process-lifecycle | Reason about the primary process lifecycle inside a container | Production Engineering | Containers / Kubernetes / Cloud Delivery | 1 |
| lu-delivery-graceful-shutdown-draining | Drain traffic and finish bounded work before termination | Production Engineering | Containers / Kubernetes / Cloud Delivery | 1 |
| lu-index-query-shape | Choose a usable index key path | Data & Consistency | Relational Database Engineering | 2 |
| lu-execution-plan-estimates | Read execution pipeline and judge estimates | Data & Consistency | Relational Database Engineering | 2 |
| lu-db-backup-restore | Verify backup and point-in-time restore | Data & Consistency | Relational Database Engineering | 1 |
| lu-db-wal-crash-recovery | Explain WAL crash recovery | Data & Consistency | Relational Database Engineering | 1 |
| lu-db-buffer-io | Separate buffer access from physical page I/O | Data & Consistency | Relational Database Engineering | 2 |
| lu-db-production-diagnosis-transfer | Diagnose database symptoms across competing hypotheses | Data & Consistency | Relational Database Engineering | 1 |
| lu-db-connection-pool-exhaustion | Diagnose database connection-pool exhaustion | Data & Consistency | Relational Database Engineering | 1 |
| lu-db-locks-deadlocks-contention | Diagnose locks, contention and deadlocks | Data & Consistency | Relational Database Engineering | 1 |
| lu-db-transactions-mvcc-isolation | Choose isolation from visible versions and invariants | Data & Consistency | Relational Database Engineering | 2 |
| lu-db-schema-evolution | Evolve schema safely across mixed app versions | Data & Consistency | Relational Database Engineering | 1 |
| lu-db-modeling-invariants | Enforce database modeling invariants | Data & Consistency | Relational Database Engineering | 1 |
| lu-db-partitioning-sharding-boundary | Choose partition or shard key from access locality | Data & Consistency | Relational Database Engineering | 1 |
| lu-db-replication-failover | Reason relational replication and failover | Data & Consistency | Relational Database Engineering | 1 |
| lu-nosql-cassandra-lsm-compaction-consistency | Model Cassandra partitioned LSM writes and reads | Data & Consistency | NoSQL & Specialized Data Systems | 2 |
| lu-nosql-storage-choice-transfer | Choose storage family from workload evidence | Data & Consistency | NoSQL & Specialized Data Systems | 1 |
| lu-nosql-model-selection | Frame storage selection before product choice | Data & Consistency | NoSQL & Specialized Data Systems | 1 |
| lu-nosql-mongo-aggregate-model | Model Mongo aggregate boundaries | Data & Consistency | NoSQL & Specialized Data Systems | 1 |
| lu-nosql-mongo-index-shard-transaction | Tune Mongo query route and transaction boundary | Data & Consistency | NoSQL & Specialized Data Systems | 1 |
| lu-nosql-redis-structures-memory | Choose Redis data structures with memory bounds | Data & Consistency | NoSQL & Specialized Data Systems | 1 |
| lu-nosql-redis-persistence-replication-cluster-streams | Operate Redis durability, topology and Streams | Data & Consistency | NoSQL & Specialized Data Systems | 1 |
| lu-nosql-search-projection | Build and operate a search projection | Data & Consistency | NoSQL & Specialized Data Systems | 2 |
| lu-cache-capacity-eviction-fallback | Protect origin when cache capacity or availability fails | Data & Consistency | Cache Engineering | 1 |
| lu-cache-evidence-transfer | Diagnose cache latency, staleness and origin-load symptoms | Data & Consistency | Cache Engineering | 1 |
| lu-cache-source-of-truth-invalidation | Keep cached copies fresh across layers | Data & Consistency | Cache Engineering | 3 |
| lu-cache-patterns | Choose cache pattern and prevent miss overload | Data & Consistency | Cache Engineering | 2 |
| lu-net-connection-reuse-pooling | Giải thích connection establishment, lifetime và reuse boundary dưới TCP để không suy từ HTTP code sang network cause. + Giải thích vì sao client pool/reuse connection và nhận ra giới hạn socket/port hoặc stale connection assumptions. | Service & Network | Networking & HTTP | 2 |
| lu-net-request-path-dns | Giải thích hostname được resolve thành address trước khi connection và dùng evidence để tách DNS latency/failure. | Service & Network | Networking & HTTP | 1 |
| lu-net-proxy-tls-forwarded-boundary | Kiểm tra identity, trust chain và handshake trước khi coi HTTPS request đã tới HTTP application. + Xác định trust boundary client → proxy/LB → application, đặc biệt với forwarded headers. | Service & Network | Networking & HTTP | 2 |
| lu-net-http-streaming-cancellation | Dùng method, status, header và body như contract giữa client/server, không như danh sách mã cần thuộc. + Quản lý body lifetime và cancellation khi dữ liệu đang transfer để không buffer vô ích hoặc tiếp tục work sau disconnect. | Service & Network | Networking & HTTP | 2 |
| lu-net-failure-localization-unknown-outcome | Tách DNS, connection, TLS, HTTP response và timeout có thể đã tới server để chọn recovery an toàn. | Service & Network | Networking & HTTP | 1 |
| lu-api-circuit-bulkhead-rate-limit | Chọn circuit, bulkhead hoặc rate limit theo dependency/resource/identity boundary. | Service & Network | API Contracts & Resilience | 1 |
| lu-api-contract-resource-semantics | Model operation as explicit contract over resource/state, not controller-to-URL mapping. | Service & Network | API Contracts & Resilience | 1 |
| lu-api-validation-errors-pagination | Design validation, error and pagination contract so client can recover predictably. | Service & Network | API Contracts & Resilience | 1 |
| lu-api-request-identity-idempotency | Define stable logical operation identity so same retry does not repeat business effect. | Service & Network | API Contracts & Resilience | 1 |
| lu-api-versioning-compatibility | Change API while old/new clients coexist without silent break. | Service & Network | API Contracts & Resilience | 1 |
| lu-api-deadline-retry-policy | Set/propagate one end-to-end time budget and distinguish caller deadline from remote completion. + Retry only failure/effect classes safe to retry, with bounded backoff and jitter. | Service & Network | API Contracts & Resilience | 2 |
| lu-api-unknown-outcome-reconciliation | Recover ambiguous mutation by stating known/unknown, using stable identity and querying/reconciling authoritative state. | Service & Network | API Contracts & Resilience | 1 |
| lu-sec-trust-boundary-threat-model | Draw trust boundaries/assets/actors/untrusted input before controls. | Service & Network | Security | 1 |
| lu-sec-abuse-bruteforce-resource-business-flow | Detect/limit legitimate-looking request abuse by identity/resource/business state. | Service & Network | Security | 1 |
| lu-sec-unseen-attack-transfer | Given unfamiliar abuse, identify boundary/asset, attack paths/evidence, protect true owner and assess bypass. | Service & Network | Security | 1 |
| lu-sec-auth-session-oauth | Distinguish authentication/authorization and reason session/token validation, lifetime, revocation. + Explain backend boundary OAuth authorization vs OIDC identity without flow memorization. | Service & Network | Security | 2 |
| lu-sec-authorization-object-tenant | Prove subject may act on this object/tenant using server-trusted ownership/policy. | Service & Network | Security | 1 |
| lu-sec-browser-boundaries-cors-csrf-xss | Distinguish CORS, CSRF and XSS to apply correct browser boundary control. | Service & Network | Security | 1 |
| lu-sec-injection-ssrf-input-output | Trace untrusted data into query/network/output sink and stop it controlling syntax/destination/context. | Service & Network | Security | 1 |
| lu-sec-race-business-logic-abuse | Reproduce concurrent valid requests bypassing invariant and protect atomic owner. | Service & Network | Security | 1 |
| lu-sec-secrets-third-party-trust | Control secret lifecycle and verify third-party data/action before trusting it. | Service & Network | Security | 1 |
| lu-sec-audit-detection-evidence | Produce audit evidence of who did what to which object and which security decision occurred. | Service & Network | Security | 1 |
| lu-net-service-discovery-load-balancing | Route a logical service to healthy backends as endpoints change | Service & Network | Networking & HTTP | 1 |
| lu-sec-cryptography-credentials-tokens | Choose safe cryptographic protection for credentials and tokens | Service & Network | Security | 1 |
| lu-sec-data-encryption-key-lifecycle | Protect sensitive data with an explicit key lifecycle | Service & Network | Security | 1 |
| lu-outbox-duplicate-safe-effect | Persist producer intent and make consumer effect duplicate-safe | Distributed Systems | Messaging & Event-Driven Consistency | 2 |
| lu-dist-partial-failure-uncertainty | Reason about partial failure without inventing remote truth | Distributed Systems | Distributed Systems | 1 |
| lu-dist-replication-leader-quorum | Judge replica acknowledgement and failover guarantees | Distributed Systems | Distributed Systems | 1 |
| lu-dist-consensus-coordination-purpose | Choose coordination for one shared decision | Distributed Systems | Distributed Systems | 1 |
| lu-dist-guarantee-recovery-transfer | Reason across distributed guarantees during recovery | Distributed Systems | Distributed Systems | 1 |
| lu-dist-consistency-linearizability | State the consistency guarantee a business operation needs | Distributed Systems | Distributed Systems | 1 |
| lu-dist-partitioning-ownership-rebalancing | Move ownership without losing in-flight work | Distributed Systems | Distributed Systems | 1 |
| lu-dist-rpc-unknown-completion | Handle remote call whose effect may already exist | Distributed Systems | Distributed Systems | 1 |
| lu-dist-reconciliation-convergence | Repair divergent state toward an authority | Distributed Systems | Distributed Systems | 1 |
| lu-dist-time-order-causality | Use causal or version order when clocks disagree | Distributed Systems | Distributed Systems | 1 |
| lu-dist-transactions-2pc-boundary | Evaluate 2PC prepare/commit and blocking cost | Distributed Systems | Distributed Systems | 1 |
| lu-msg-model-queue-topic-partition-order | Model queue topic partition and ordering scope | Distributed Systems | Messaging & Event-Driven Consistency | 1 |
| lu-msg-consumer-groups-offsets-rebalance | Process partitions through rebalance | Distributed Systems | Messaging & Event-Driven Consistency | 1 |
| lu-msg-replay-backfill | Replay history without corrupting live effects | Distributed Systems | Messaging & Event-Driven Consistency | 1 |
| lu-msg-lag-backpressure-evidence | Diagnose consumer lag as capacity signal | Distributed Systems | Messaging & Event-Driven Consistency | 1 |
| lu-msg-delivery-retry-poison-dlq | Classify retryable delivery and poison | Distributed Systems | Messaging & Event-Driven Consistency | 1 |
| lu-msg-external-side-effect-reconciliation | Recover external side effect after unknown local outcome | Distributed Systems | Messaging & Event-Driven Consistency | 1 |
| lu-msg-producer-acks-durability | State what producer acknowledgement proves | Distributed Systems | Messaging & Event-Driven Consistency | 1 |
| lu-msg-schema-evolution-contract-ownership | Evolve event contract with retained history | Distributed Systems | Messaging & Event-Driven Consistency | 1 |
| lu-msg-workflow-saga-compensation | Recover multi-step workflow with compensation | Distributed Systems | Messaging & Event-Driven Consistency | 1 |
| lu-msg-background-jobs-scheduling | Run scheduled durable work across restarts | Distributed Systems | Messaging & Event-Driven Consistency | 1 |
| lu-test-risk-strategy-boundaries | Choose the smallest trustworthy test boundary for a real mechanism at risk | Architecture & Engineering Reasoning | Testing & Engineering Quality | 2 |
| lu-test-ci-flakiness-repeatability | Diagnose CI failure as product defect, environment dependency or nondeterministic test | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 |
| lu-test-time-concurrency-determinism | Reproduce interleaving and deadline behavior with controlled time and gates | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 |
| lu-test-real-dependency-fixtures | Use a disposable real dependency where engine or protocol semantics are at risk | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 |
| lu-test-failure-resilience | Verify outcome, durable state, retry/recovery and invariant under controlled failure | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 |
| lu-test-risk-transfer | Adapt risk, boundary and falsifying fixture after architecture changes | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 |
| lu-test-migration-compatibility | Prove old/new app and schema/data/event contract coexist during rollout | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 |
| lu-test-property-boundary-fuzz | Falsify an invariant across generated and boundary input | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 |
| lu-test-review-static-analysis-change-safety | Combine review, compiler, analyzer and targeted tests as change evidence | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 |
| lu-arch-requirements-quality-attributes | Turn a vague request into measurable quality scenarios and constraints | Architecture & Engineering Reasoning | Architecture & System Design | 1 |
| lu-arch-boundaries-data-ownership | Choose authority boundary and classify derived copies | Architecture & Engineering Reasoning | Architecture & System Design | 2 |
| lu-arch-failure-recovery-security-observability | Evaluate a design under failure, recovery, trust and evidence constraints | Architecture & Engineering Reasoning | Architecture & System Design | 1 |
| lu-arch-consistency-latency-availability | Choose strong guarantee or stale view from invariant and failure assumptions | Architecture & Engineering Reasoning | Architecture & System Design | 1 |
| lu-arch-cost-complexity-changeability | Reject lifecycle cost that exceeds the property bought and record why | Architecture & Engineering Reasoning | Architecture & System Design | 2 |
| lu-arch-evolution-migration-strangler | Move an old path to a target while coexistence remains safe | Architecture & Engineering Reasoning | Architecture & System Design | 1 |
| lu-arch-scale-capacity-partitioning | Estimate bottleneck and choose a scale or partition boundary from demand | Architecture & Engineering Reasoning | Architecture & System Design | 1 |
| lu-arch-sync-async-integration | Choose sync or async from coupling, completion and recovery | Architecture & Engineering Reasoning | Architecture & System Design | 1 |
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

### Canonical scenario

Tenant filter + ORDER BY must use one composite key path.

### Integrated mechanism / state trace

Key prefix narrows candidates; range/order decides remaining scan and sort.

### Integrated evidence surface

EXPLAIN ANALYZE; actual rows; Sort; buffers; index write cost.

### Failure and debug loop

Changing predicate/order makes the index no longer searchable.

### Shared assessment task

Choose one composite index for tenant/status/date ordering, run the query, and explain access path plus residual sort.

| Primary capability | What evidence in this same task proves it |
|---|---|
| db-index-structures | Plan access node/candidate reduction proves index navigation. |
| db-composite-query-shape | Predicate/order and Sort prove key-path fit. |

### Transfer variation

equality lookup → equality + range + ORDER BY + LIMIT

### Boundary decision

KEEP as a coherent multi-capability unit.

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

### Canonical scenario

A report slows when row distribution changes.

### Integrated mechanism / state trace

Operators consume/produce rows; estimates choose access and join shape.

### Integrated evidence surface

EXPLAIN ANALYZE; estimated/actual rows; loops; stats; temp work.

### Failure and debug loop

Skew/stale stats produce a plausible but bad plan.

### Shared assessment task

Compare two report plans, locate operator work, explain estimate error from statistics/skew, and choose a correction.

| Primary capability | What evidence in this same task proves it |
|---|---|
| db-execution-operators | Actual rows, loops and timing locate operator work. |
| db-optimizer-cardinality-stats | Estimated/actual rows and statistics explain plan choice. |

### Transfer variation

uniform test data → production-like skew

### Boundary decision

KEEP as a coherent multi-capability unit.

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

Given a stock decrement trace with two concurrent requests, require the learner to identify the read/check/write interleaving, name the violated inventory invariant and choose an atomic boundary. The same trace proves the invariant, check-then-act race and synchronization choice.

### Transfer variation

Change from one process to four replicas; retain the local diagnosis but identify the new owner boundary instead of treating a process lock as a distributed solution.

### Merge decisions

Merged because one inventory reservation trace exposes a violated invariant, the check-then-act race and the atomicity remedy. `concurrency-deadlock-starvation` stays separate because it classifies a wait/progress failure rather than a corrupted transition.

### Explicit exclusions

- `prog-invariants-domain-model` remains separate pending its own mechanism/evidence boundary.
- `concurrency-memory-visibility` remains separate pending its own mechanism/evidence boundary.

## lu-prog-api-refactoring-change-safety

### Identity

- **Unit ID:** lu-prog-api-refactoring-change-safety
- **Working title:** Đưa một API qua thay đổi yêu cầu mà vẫn chỉ ra được contract cũ/mới, caller bị ảnh hưởng và giới hạn refactor
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| prog-api-refactoring-change-safety | Programming & Software Design Foundations | L4 |
### Shared problem / need

A public order API must add a cancellation outcome while independently deployed callers still rely on the old contract.
### Shared mechanism / state trace

Compare old and new public contracts, find callers observing the changed semantic, then choose an adapter, version or staged migration boundary. Both caller groups need an explicit compatibility path.
### Shared observable evidence

OpenAPI/contract diff; consumer contract tests for both callers; before/after response trace; endpoint telemetry segmented by contract version.
### Shared failure / debug story

A mobile caller treats a new cancellation outcome as success because a response semantic changed at the wrong boundary.
### Assessment-coherence argument

Given old/new contracts and two caller behaviors, propose a compatibility plan and test evidence. This directly proves L4 change-safety; it does not prove error classification, invariant protection or dependency composition.
### Transfer variation

One caller upgrades now while a mobile release remains pinned for two weeks; preserve both without coupling implementation to either client.
### Merge decisions

Split completed: `prog-errors-results`, `prog-invariants-domain-model` and `prog-composition-dependencies` now have their own Primary homes because their evidence surfaces are outcome classification, state-transition protection and dependency wiring, not published-contract compatibility.
### Explicit exclusions

- `msg-schema-evolution-contract-ownership` remains separate pending its own mechanism/evidence boundary.
- `api-versioning-compatibility` remains separate pending its own mechanism/evidence boundary.

## lu-prog-errors-results

### Identity

- **Unit ID:** lu-prog-errors-results
- **Working title:** Phân loại lỗi dự đoán được và giữ lỗi bất ngờ có ngữ cảnh
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| prog-errors-results | Programming & Software Design Foundations | L2 |

### Shared problem / need

A checkout command can be rejected by a business rule, fail unexpectedly, or finish partly; callers need an honest outcome.

### Shared mechanism / state trace

Model expected rejection as explicit result/error, retain stack/context for unexpected faults, and record partial completion rather than report success.

### Shared observable evidence

Returned error payload; exception stack; operation record; API-boundary mapping test.

### Shared failure / debug story

A domain rejection becomes 500, validation is retried, or a partial write is reported as success.

### Assessment-coherence argument

Classify three outcomes and choose the result/API mapping that proves none is hidden. Compatibility tests do not prove this classification mechanism.

### Transfer variation

The command fails after an external callback: distinguish known rejection from unknown infrastructure failure without inventing success.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| lu-prog-api-refactoring-change-safety | Direct neighboring concern | Caller compatibility evidence does not prove error/result classification. |

### Explicit exclusions

- The candidate remains a separate Primary boundary; it may be prerequisite or applied context without duplicate coverage.
## lu-prog-invariants-domain-model

### Identity

- **Unit ID:** lu-prog-invariants-domain-model
- **Working title:** Giữ business invariant tại state transition và persistence boundary
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| prog-invariants-domain-model | Programming & Software Design Foundations | L3 |

### Shared problem / need

Two handlers can both approve an order transition that must happen only once.

### Shared mechanism / state trace

Name the invariant, enforce it at the transition, then use a database constraint or atomic write as final guard across write paths.

### Shared observable evidence

Before/after state; transition test; affected-row count; unique/check constraint; concurrent attempt result.

### Shared failure / debug story

A rule is copied into handlers, a race passes validation, or invalid state persists through another write path.

### Assessment-coherence argument

Repair the transition so the invariant survives both handler paths and concurrent attempts; a contract-diff exercise cannot prove this state-owner mechanism.

### Transfer variation

Move one write path to a background consumer while preserving the same invariant and persistence guard.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| lu-race-atomicity | Direct neighboring concern | Race evidence proves an interleaving remedy, not the legal transition and persistence guard. |

### Explicit exclusions

- The candidate remains a separate Primary boundary; it may be prerequisite or applied context without duplicate coverage.
## lu-prog-composition-dependencies

### Identity

- **Unit ID:** lu-prog-composition-dependencies
- **Working title:** Nối dependency tại composition root mà không làm core phụ thuộc hạ tầng
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| prog-composition-dependencies | Programming & Software Design Foundations | L3 |

### Shared problem / need

A pricing rule needs a rate provider, but domain code must remain testable and not create infrastructure dependencies itself.

### Shared mechanism / state trace

Composition root creates adapters and passes owned contracts inward; core depends on its abstraction and callers supply replacements at the boundary.

### Shared observable evidence

Constructor graph; registration code; architecture test; fake-adapter unit test; dependency direction diagram.

### Shared failure / debug story

Service locator hides dependency, adapter leaks into domain code, or a circular dependency appears after refactor.

### Assessment-coherence argument

Refactor wiring so a fake rate provider proves core dependency direction; API compatibility and invariant tests do not establish the composition graph.

### Transfer variation

Replace an HTTP provider with a cached provider while constructor contracts and core tests stay unchanged.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| lu-prog-resource-ownership | Direct neighboring concern | Ownership asks who releases a resource; composition asks where dependencies are assembled and which direction they point. |

### Explicit exclusions

- The candidate remains a separate Primary boundary; it may be prerequisite or applied context without duplicate coverage.
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

Given an endpoint that deduplicates and orders 100k product IDs, choose the collection, predict lookup/insert cost and verify it with benchmark plus ordering/uniqueness assertions.
### Transfer variation

Change from mostly lookup to frequent middle insertion; justify a different structure from the measured operation mix.
### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| lu-prog-values-identity | Both affect collection behavior | Equality/aliasing uses an object-state trace; complexity requires operation-count and workload evidence. |
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

Trace a streamed export from creation through the final consumer, assign one owner and release point, and show why early dispose/pool return is unsafe.
### Transfer variation

Replace an in-memory buffer with a pooled buffer while preserving the final-consumer lifetime rule.
### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| lu-concurrency-async-parallelism | Async carries resources across awaits | Bounded concurrency measures queued work; ownership follows one resource to its final consumer. |
| lu-net-streaming-body-cancellation | Both touch stream lifetime | HTTP transfer adds protocol cancellation and response semantics. |
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

Turn untrusted registration input into a valid internal type and make an invalid generic call fail at compile time.
### Transfer variation

Add an optional older-client field and show where null is normalized before the internal model.
### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| lu-prog-invariants-domain-model | Both prevent invalid state | Types constrain representability before runtime; invariants judge a transition and persistence path. |
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

Predict mutation through one alias after using the object as a dictionary key, then verify with object IDs and before/after state.
### Transfer variation

Replace a mutable class with an immutable value object and explain which observable behavior changes.
### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| lu-prog-collections-complexity | Equality is used by collections | The proof is alias/mutation behavior, while collection selection needs workload cost evidence. |
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

Diagnose a large-export latency spike from allocation counters, heap graph and pool counters, then choose mitigation. Each Primary is proved by allocation pressure, retaining path, or pool/large-buffer evidence in one export trace.
### Transfer variation

Change export from 2 MB rows to occasional 64 MB rows and decide whether streaming, batching or pooling changes the measured risk.
### Merge decisions

Merged because one export trace links allocation rate, reachability and retained/pool buffers. `runtime-managed-execution` stays separate because it locates execution responsibility, not a heap lifetime.
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

Start with “why did p99 rise after deployment?”, choose counter, trace or dump, and use a controlled change to reject a false GC hypothesis. Tool selection and diagnosis share the same hypothesis-to-evidence loop.
### Transfer variation

The symptom becomes CPU saturation instead of heap growth; select a profile/trace plan and explain why a heap dump is weak evidence.
### Merge decisions

Merged because the same investigation chooses evidence and interprets it against a runtime hypothesis. `obs-profiling-runtime-evidence` owns cross-system production attribution.
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

Given first-request and steady-state timings plus JIT events, decide whether a regression is warm-up or sustained work.
### Transfer variation

Run after a deployment that invalidates cache and after process restart; isolate which first-use costs recur.
### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| lu-obs-load-test-benchmark-validity | Both concern timing | JIT warm-up needs runtime event/first-call evidence; benchmark validity judges workload and measurement design. |
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

Given a slow request with managed stack, OS thread view and socket wait, assign the symptom to application, runtime or native/OS before choosing a tool.
### Transfer variation

Move the workload from a local process to a container and identify which evidence still belongs to runtime versus OS.
### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| lu-runtime-allocation-gc | Both are runtime investigations | Managed execution locates responsibility across layers; GC traces one heap/allocation mechanism. |
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

Diagnose request-queue growth with blocked stacks, worker count, socket/handle state and pool state; distinguish external completion wait from kernel-resource leak.
### Transfer variation

Change the dependency from file read to socket call and explain which wait/handle evidence changes.
### Merge decisions

Merged because one request trace connects outstanding I/O, waiting worker and handle/socket lifecycle. Scheduler fairness is runnable-work evidence, not external completion.
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
### Shared problem / need

Locate a production symptom in the correct process, thread and user/kernel execution boundary before diagnosing the work itself.
### Shared mechanism / state trace

A process owns an address space and kernel-resource table; threads execute within that process and share memory; user-mode code crosses to kernel for privileged I/O and scheduling.
### Shared observable evidence

Process tree; process ID; thread list; address-space view; user versus kernel stack frames; owning process for an open resource.
### Shared failure / debug story

A symptom is investigated in the wrong process, a thread failure is mistaken for process isolation, or a kernel wait is blamed on application code.
### Assessment-coherence argument

Given a process tree and mixed user/kernel stacks, locate the owning process and execution boundary. Scheduling fairness, shutdown draining and page residency need different state traces and are no longer Primary here.
### Transfer variation

Move a worker into a helper process and identify which memory, handles and threads are no longer shared.
### Merge decisions

Split completed: scheduler progress, graceful termination and virtual-memory/page-cache diagnosis each have a separate Primary assessment boundary. This retained unit is only process/thread/kernel location.
### Explicit exclusions

- `os-files-handles-sockets-ipc` remains separate pending its own mechanism/evidence boundary.
- `os-resource-exhaustion` remains separate pending its own mechanism/evidence boundary.

## lu-os-scheduling-starvation

### Identity

- **Unit ID:** lu-os-scheduling-starvation
- **Working title:** Chẩn đoán runnable work không nhận được CPU hoặc execution capacity
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| os-scheduling-starvation | Operating Systems & I/O Foundations | L3 |

### Shared problem / need

A queue grows though downstream is healthy; runnable work is not making forward progress.

### Shared mechanism / state trace

Separate runnable from blocked work, inspect scheduler/runtime queues and capacity, then explain how priority, pool exhaustion or unfair admission prevents execution.

### Shared observable evidence

CPU utilization; runnable/thread queue; blocked stacks; queue age; worker count; no-forward-progress timeline.

### Shared failure / debug story

Thread-pool starvation is called I/O latency; priority imbalance leaves work waiting; capacity is raised without finding the runnable bottleneck.

### Assessment-coherence argument

Given queue timeline and stacks, identify blocked versus runnable-but-starved work, then choose capacity/fairness remedy. Shutdown/page-cache traces cannot prove scheduler progress.

### Transfer variation

Move workload from shared pool to dedicated worker pool; state which queue and CPU evidence should improve.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| lu-concurrency-async-parallelism | Direct neighboring concern | Bounded concurrency controls application admission; scheduler starvation diagnoses which runnable work receives execution capacity. |

### Explicit exclusions

- The candidate remains a separate Primary boundary; it may be prerequisite or applied context without duplicate coverage.
## lu-os-termination-graceful-shutdown

### Identity

- **Unit ID:** lu-os-termination-graceful-shutdown
- **Working title:** Dừng service có deadline mà không nhận thêm work và không mất trạng thái cần giữ
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| os-termination-graceful-shutdown | Operating Systems & I/O Foundations | L3 |

### Shared problem / need

A service receives termination while requests and messages are still in flight.

### Shared mechanism / state trace

Signal starts a deadline: stop accepting work, remove readiness, drain or cancel active work, persist/ack/release at the correct boundary, then exit before forced termination.

### Shared observable evidence

Signal time; readiness change; active request/message count; drain duration; cancellation log; durable handoff/ack state; exit code.

### Shared failure / debug story

New work is accepted after drain; a message is acked too early; cleanup exceeds grace; process exits with unfinished durable state.

### Assessment-coherence argument

Given a termination timeline, order readiness removal, drain/cancel and durable handoff, then explain which work can be safely acknowledged. Scheduler/page-fault evidence cannot establish this lifecycle.

### Transfer variation

Shorten grace window and choose which work must be handed off durably instead of drained.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| lu-delivery-container-process-lifecycle | Direct neighboring concern | Container lifecycle adds probe/platform semantics; this unit proves the service shutdown deadline and active-work boundary. |

### Explicit exclusions

- The candidate remains a separate Primary boundary; it may be prerequisite or applied context without duplicate coverage.
## lu-os-virtual-memory-page-cache

### Identity

- **Unit ID:** lu-os-virtual-memory-page-cache
- **Working title:** Phân biệt virtual memory, working set và page cache khi đọc memory hoặc I/O symptom
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| os-virtual-memory-page-cache | Operating Systems & I/O Foundations | L2 |

### Shared problem / need

A file-heavy service shows high RSS and faster second reads; decide whether it is an application leak or normal OS caching.

### Shared mechanism / state trace

Virtual mappings become resident working-set pages; OS page cache retains reclaimable file pages, so managed heap, RSS and warm-file latency describe different state.

### Shared observable evidence

RSS/working set; page faults; file I/O counters; cache reclaim; managed heap size; cold versus warm read timing.

### Shared failure / debug story

Page cache is diagnosed as managed leak; only heap size is inspected; warm cache is assumed permanent after host pressure.

### Assessment-coherence argument

Given heap, RSS, page-fault and cold/warm-read evidence, classify managed retention, resident mappings or page cache. Process/thread and scheduler traces do not prove residency/reclaim.

### Transfer variation

Run after cache pressure/restart and explain which counters distinguish I/O regression from cache eviction.

### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| lu-runtime-allocation-gc | Direct neighboring concern | Heap-root evidence establishes managed reachability; page-cache assessment needs OS residency and file-I/O evidence. |

### Explicit exclusions

- The candidate remains a separate Primary boundary; it may be prerequisite or applied context without duplicate coverage.
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

Given four snapshots, identify whether memory, threads, handles or sockets reached the limit and choose the next discriminating counter.
### Transfer variation

Run in a container memory limit; distinguish cgroup kill from managed heap growth.
### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| lu-os-process-thread-kernel | Both use process inspection | Process/thread assessment explains execution boundaries; exhaustion identifies finite resource quotas from their failures. |
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

Given a fan-out endpoint and slow downstream, sketch task/thread timeline, propagate cancellation and impose a concurrency limit. Active count, queue depth and outcome state prove async waiting, cancellation and bounded pressure.
### Transfer variation

Move fan-out from I/O-bound requests to CPU-bound image work and decide which limit and execution model changes.
### Merge decisions

Merged because one bounded fan-out trace links awaiting completion, stopping unneeded work and limiting in-flight work. OS scheduling diagnoses runnable CPU allocation, not admission.
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

Classify a wait trace as circular deadlock or starvation, then choose lock ordering, timeout or capacity/fairness remediation. It remains a singleton with wait-for graph and forward-progress evidence.
### Transfer variation

Replace one in-process lock with a database lock and explain why the local diagnosis cannot be reused as the database lock model.
### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| lu-race-atomicity | Both mention synchronization | Atomicity proves one invariant across an interleaving; this unit classifies a blocking/progress failure. |
| lu-db-locks-deadlocks-contention | Both use waits | Database locks require transaction/row-version evidence and a different state owner. |
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

Run one-coupon-per-customer through four replicas, show four local locks, then select a single cross-replica invariant owner.
### Transfer variation

Replace database atomic claim with partition ownership and state new failure/recovery evidence.
### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| lu-race-atomicity | Both protect an invariant | This unit requires replica identity and a cross-replica authority; race proof is in one process. |
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

Reproduce a published flag/data pair, choose lock/volatile/interlocked, and explain the ordering guarantee that makes consumer observation safe.
### Transfer variation

Publish an immutable snapshot instead of mutable fields and identify remaining ordering requirement.
### Merge decisions

| Candidate capability/unit | Why merge looked plausible | Grouping criterion that fails |
|---|---|---|
| lu-race-atomicity | Both expose concurrent incorrectness | Visibility needs memory-publication ordering evidence, not merely an interleaving outcome. |
### Explicit exclusions

- `concurrency-interleavings-invariants` remains separate pending its own mechanism/evidence boundary.





## lu-net-connection-reuse-pooling

### Identity

- **Unit ID:** lu-net-connection-reuse-pooling
- **Working title:** Giải thích connection establishment, lifetime và reuse boundary dưới TCP để không suy từ HTTP code sang network cause. + Giải thích vì sao client pool/reuse connection và nhận ra giới hạn socket/port hoặc stale connection assumptions.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| net-tcp-connection-semantics | Networking & HTTP | L2 |
| net-connection-reuse-pooling | Networking & HTTP | L3 |

### Canonical scenario

Partner lowers idle timeout; traffic spike produces resets and pool queues. Decide TCP versus pool cause before changing retries.

### Integrated mechanism / state trace

TCP connection được establish rồi giữ state đến close/reset; HTTP request có thể reuse connection nhưng peer/network có thể refuse/reset hoặc capacity cạn trước HTTP. → Mỗi connection có handshake/socket/port cost; pool giữ connection usable theo lifetime/limit, nhưng network peer có thể đóng connection ngoài kiến thức client.

### Integrated evidence surface

One trace joins connect/reset/socket state and latency with connection age, pool lifetime, active/queued state and port pressure so TCP lifecycle and reuse boundary are evidenced together.

### Failure and debug loop

A partner lowers idle timeout; the pool checks out an old connection, reset retries open more sockets and replicas behind NAT exhaust ports. Compare reset timing with age, queue and port pressure; do not create a new client per request.

### Shared assessment task

Given connect/reset, socket state, pooled age/lifetime, active/queued count and port usage, decide TCP versus pool cause and set safe lifetime/limit.

| Primary capability | What evidence in this same task proves it |
|---|---|
| net-tcp-connection-semantics | Connect latency, reset/refused error and socket state establish peer lifecycle. |
| net-connection-reuse-pooling | Age/lifetime, pool queue and port pressure establish reuse/limit behavior. |

### Transfer variation

Many app replicas behind NAT call a partner with an idle timeout shorter than the configured pool lifetime.

### Boundary decision

KEEP as one causal mechanism/evidence boundary.

## lu-net-request-path-dns

### Identity

- **Unit ID:** lu-net-request-path-dns
- **Working title:** Giải thích hostname được resolve thành address trước khi connection và dùng evidence để tách DNS latency/failure.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| net-request-path-dns | Networking & HTTP | L2 |

### Canonical scenario

Hostname fails after failover while direct IP works. Locate resolution/cache/address selection, not HTTP.

### Integrated mechanism / state trace

DNS maps hostname to record/address with cache/TTL; connection chỉ bắt đầu sau khi client có usable destination.

### Integrated evidence surface

Resolution result; resolver timing; TTL/cache state; address attempted; DNS error code.

### Failure and debug loop

NXDOMAIN/misconfigured record; slow resolver; stale cached address; IPv6/IPv4 mismatch.

### Shared assessment task

Use resolver timing, TTL, cached/returned addresses and error code to identify the failed DNS step; reject an HTTP retry as evidence-free.

### Transfer variation

Từ localhost/static host sang service discovery hoặc cloud DNS failover.

### Boundary decision

KEEP as a distinct mechanism/evidence boundary after merge pressure review.

## lu-net-proxy-tls-forwarded-boundary

### Identity

- **Unit ID:** lu-net-proxy-tls-forwarded-boundary
- **Working title:** Kiểm tra identity, trust chain và handshake trước khi coi HTTPS request đã tới HTTP application. + Xác định trust boundary client → proxy/LB → application, đặc biệt với forwarded headers.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| net-tls-trust-handshake | Networking & HTTP | L2 |
| net-proxy-lb-forwarded-boundary | Networking & HTTP | L3 |

### Canonical scenario

Ingress causes redirect loop and rate-limits its own address. Verify TLS termination and trusted forwarded headers.

### Integrated mechanism / state trace

TLS handshake xác thực certificate/name/validity và thương lượng protected channel; HTTP starts only after this boundary succeeds. → App chỉ nên tin forwarded metadata khi request đến từ known proxy/LB đã strip/append đúng; client bên ngoài có thể tự gửi header giả.

### Integrated evidence surface

One ingress trace joins certificate/handshake at TLS termination with peer IP, raw forwarded headers, trusted-proxy config and the scheme/client identity observed by the app.

### Failure and debug loop

TLS ends at ingress but the app trusts every forwarded IP from the internet. A spoofed IP/scheme bypasses rate limits or loops redirects. Compare peer IP, raw/transformed headers and trusted-hop list.

### Shared assessment task

Given certificate/handshake, peer address, raw forwarded headers, proxy config and app identity, identify TLS termination, trusted hop and trusted metadata.

| Primary capability | What evidence in this same task proves it |
|---|---|
| net-tls-trust-handshake | Certificate identity/chain/expiry and handshake outcome establish trust/termination. |
| net-proxy-lb-forwarded-boundary | Peer hop, transformed headers and trusted-proxy config establish forwarded identity. |

### Transfer variation

TLS terminates upstream and forwarded metadata crosses another trusted proxy before the app.

### Boundary decision

KEEP as one causal mechanism/evidence boundary.

## lu-net-http-streaming-cancellation

### Identity

- **Unit ID:** lu-net-http-streaming-cancellation
- **Working title:** Dùng method, status, header và body như contract giữa client/server, không như danh sách mã cần thuộc. + Quản lý body lifetime và cancellation khi dữ liệu đang transfer để không buffer vô ích hoặc tiếp tục work sau disconnect.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| net-http-semantics | Networking & HTTP | L2 |
| net-streaming-body-cancellation | Networking & HTTP | L3 |

### Canonical scenario

Client disconnects during large upload while API buffers body and continues export. Preserve contract and stop work.

### Integrated mechanism / state trace

Method nêu intent; status nêu kết quả ở boundary; headers điều khiển metadata/caching/auth/content negotiation; body mang representation có lifecycle riêng. → Request/response body là stream; consumer đọc dần và must observe cancellation, còn buffering materializes toàn bộ payload và kéo dài memory/lifetime.

### Integrated evidence surface

One upload lifecycle combines method/status/header/body contract, bytes transferred, request-aborted signal, downstream cancellation span and allocation/stream lifetime.

### Failure and debug loop

A client disconnects mid-upload but the API buffered the body and a worker keeps exporting downstream. Compare byte count with abort time, response contract and allocation trace; partial upload is not success.

### Shared assessment task

Given method/status/header, bytes, abort signal, downstream span and allocation/stream lifetime, define partial outcome, streaming/cancellation propagation and work stop.

| Primary capability | What evidence in this same task proves it |
|---|---|
| net-http-semantics | Method, status, headers and partial-body outcome in capture/contract test prove HTTP contract. |
| net-streaming-body-cancellation | Byte counts, abort signal, downstream span and stream lifetime prove streaming/cancellation. |

### Transfer variation

A proxy streams a large upload to another service and the caller disconnects mid-body.

### Boundary decision

KEEP as one causal mechanism/evidence boundary.

## lu-net-failure-localization-unknown-outcome

### Identity

- **Unit ID:** lu-net-failure-localization-unknown-outcome
- **Working title:** Tách DNS, connection, TLS, HTTP response và timeout có thể đã tới server để chọn recovery an toàn.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| net-failure-localization-unknown-outcome | Networking & HTTP | L4 |

### Canonical scenario

Payment request times out after it may have crossed the network boundary. State what is known before retry.

### Integrated mechanism / state trace

Request path qua nhiều layer; timeout sau write không chứng minh server chưa tạo side effect, nên retry cần status query/idempotency contract chứ không chỉ exception type.

### Integrated evidence surface

DNS result/timing; socket/TLS error; HTTP status/header; client/server/proxy trace; operation ID and audit state.

### Failure and debug loop

Retry duplicate after unknown outcome; gán TLS lỗi thành HTTP 500; treat DNS failure as server rejection; mất correlation qua proxy.

### Shared assessment task

Use DNS/connect/TLS/HTTP timestamps and server/audit traces to localize the last proven boundary and choose query/reconciliation.

### Transfer variation

Từ local function failure sang remote service call qua proxy/LB và async callback.

### Boundary decision

KEEP as a distinct mechanism/evidence boundary after merge pressure review.

## lu-db-backup-restore

### Identity

- **Unit ID:** lu-db-backup-restore
- **Working title:** Verify backup and point-in-time restore
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-backup-restore | Relational Database Engineering | L3 |

### Canonical scenario

Recover an accidental deletion to the required point in time.

### Integrated mechanism / state trace

Select snapshot/log chain; restore and verify recovered state.

### Integrated evidence surface

Backup metadata; recovered timestamp/rows; duration; checksum.

### Failure and debug loop

A backup that was never restored is unproven.

### Shared assessment task

Inspect backup metadata/logs, choose the recoverable point, then accept or reject the drill from rows, checksum and duration.

### Transfer variation

small local restore → production-sized point-in-time restore

### Boundary decision

KEEP as singleton after merge pressure review.

## lu-db-wal-crash-recovery

### Identity

- **Unit ID:** lu-db-wal-crash-recovery
- **Working title:** Explain WAL crash recovery
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-wal-crash-recovery | Relational Database Engineering | L3 |

### Canonical scenario

Process dies just after commit.

### Integrated mechanism / state trace

WAL records durable intent before page write; restart replays/resolves by log order.

### Integrated evidence surface

WAL position; commit/restart result; recovery log.

### Failure and debug loop

Commit does not mean every data page was flushed.

### Shared assessment task

Use WAL position, commit/restart result and recovery log to explain which state survives a crash.

### Transfer variation

controlled restart → crash immediately after commit

### Boundary decision

KEEP as singleton after merge pressure review.

## lu-db-buffer-io

### Identity

- **Unit ID:** lu-db-buffer-io
- **Working title:** Separate buffer access from physical page I/O
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-buffer-io | Relational Database Engineering | L2 |
| db-physical-storage-pages | Relational Database Engineering | L2 |

### Canonical scenario

Same query is fast warm and slow beyond available memory.

### Integrated mechanism / state trace

Rows live on pages; buffer residency avoids storage read; width and size change page work.

### Integrated evidence surface

EXPLAIN BUFFERS; cache reads/hits; relation size; cold/warm timing.

### Failure and debug loop

Buffer hit is incorrectly called disk I/O.

### Shared assessment task

Run one indexed query cold and warm; explain pages, buffer hits/reads, relation size and storage I/O.

| Primary capability | What evidence in this same task proves it |
|---|---|
| db-buffer-io | Buffer reads/hits and cold/warm timing prove buffer behavior. |
| db-physical-storage-pages | Relation/index size and page stats prove physical page work. |

### Transfer variation

working set fits RAM → working set exceeds RAM

### Boundary decision

KEEP as a coherent multi-capability unit.

## lu-db-production-diagnosis-transfer

### Identity

- **Unit ID:** lu-db-production-diagnosis-transfer
- **Working title:** Diagnose database symptoms across competing hypotheses
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-production-diagnosis-transfer | Relational Database Engineering | L4 |

### Canonical scenario

Slow endpoint may be plan, I/O, lock, transaction or pool.

### Integrated mechanism / state trace

Compare hypotheses; discriminate with plan/rows/buffers, locks and acquisition wait.

### Integrated evidence surface

Hypothesis matrix; plan; lock/pool timeline; before/after.

### Failure and debug loop

Add index before proving the cause.

### Shared assessment task

Rank plan, I/O, lock and pool hypotheses from timelines; name the next discriminating observation and safe mitigation.

### Transfer variation

PostgreSQL incident → equivalent Oracle/MySQL/SQL Server symptom

### Boundary decision

KEEP as singleton after merge pressure review.

## lu-db-connection-pool-exhaustion

### Identity

- **Unit ID:** lu-db-connection-pool-exhaustion
- **Working title:** Diagnose database connection-pool exhaustion
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-connection-pool-exhaustion | Relational Database Engineering | L3 |

### Canonical scenario

Requests wait before query execution.

### Integrated mechanism / state trace

Pool limits sessions; acquisition waits when leaked/held sessions or demand exhaust capacity.

### Integrated evidence surface

Pool active/idle/wait; acquisition latency; session count; request queue.

### Failure and debug loop

Increasing pool overloads the database.

### Shared assessment task

Inspect acquisition wait, active/idle sessions, DB count and query duration; distinguish pool wait from slow SQL.

### Transfer variation

one app replica → several replicas sharing DB capacity

### Boundary decision

KEEP as singleton after merge pressure review.

## lu-db-locks-deadlocks-contention

### Identity

- **Unit ID:** lu-db-locks-deadlocks-contention
- **Working title:** Diagnose locks, contention and deadlocks
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-locks-deadlocks-contention | Relational Database Engineering | L3 |

### Canonical scenario

Two updates block or one transaction aborts.

### Integrated mechanism / state trace

Contention has a releasing owner; deadlock is a wait cycle requiring abort.

### Integrated evidence surface

Blocking tree; deadlock report; transaction duration.

### Failure and debug loop

Long transaction or inconsistent lock order.

### Shared assessment task

Reconstruct a blocking/deadlock wait graph and propose lock-order or transaction-scope change with trade-off.

### Transfer variation

two sessions → hot account row across replicas

### Boundary decision

KEEP as singleton after merge pressure review.

## lu-db-transactions-mvcc-isolation

### Identity

- **Unit ID:** lu-db-transactions-mvcc-isolation
- **Working title:** Choose isolation from visible versions and invariants
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-transactions-isolation-anomalies | Relational Database Engineering | L3 |
| db-mvcc-visibility | Relational Database Engineering | L3 |

### Canonical scenario

Concurrent reservation must preserve one invariant.

### Integrated mechanism / state trace

MVCC determines visible version; isolation/conflict rule determines anomaly allowed.

### Integrated evidence surface

Two-session timeline; snapshot/tx ID; isolation result; lock evidence.

### Failure and debug loop

Snapshot confused with blocking; write skew/lost update.

### Shared assessment task

Interpret a two-session reservation trace, state visible versions, identify anomaly, then choose isolation or invariant guard.

| Primary capability | What evidence in this same task proves it |
|---|---|
| db-transactions-isolation-anomalies | Two-session anomaly/result proves the isolation choice. |
| db-mvcc-visibility | Snapshot/version observation proves visibility. |

### Transfer variation

simple read/write → concurrent reservation/write-skew

### Boundary decision

KEEP as a coherent multi-capability unit.

## lu-db-schema-evolution

### Identity

- **Unit ID:** lu-db-schema-evolution
- **Working title:** Evolve schema safely across mixed app versions
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-schema-evolution | Relational Database Engineering | L3 |

### Canonical scenario

Old/new apps coexist while schema changes.

### Integrated mechanism / state trace

Expand, backfill, compatibility and cleanup keep both contracts live.

### Integrated evidence surface

Migration history; lock duration; compatibility test; backfill progress.

### Failure and debug loop

Destructive migration or incompatible rollback.

### Shared assessment task

Plan expand/backfill/cleanup for mixed old/new versions; use lock, compatibility and backfill evidence to decide cleanup.

### Transfer variation

single-version deploy → rolling mixed-version deploy

### Boundary decision

KEEP as singleton after merge pressure review.

## lu-db-modeling-invariants

### Identity

- **Unit ID:** lu-db-modeling-invariants
- **Working title:** Enforce database modeling invariants
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-modeling-invariants | Relational Database Engineering | L3 |

### Canonical scenario

Multiple writers must not persist invalid state.

### Integrated mechanism / state trace

Schema/key/constraint and transaction boundary decide legal persisted state.

### Integrated evidence surface

Schema; constraint violation; concurrent test; persisted rows.

### Failure and debug loop

Application-only validation is bypassed.

### Shared assessment task

Choose database enforcement for a rule with concurrent writers and demonstrate the rejected invalid write.

### Transfer variation

one service-owned schema → legacy DB with multiple writers

### Boundary decision

KEEP as singleton after merge pressure review.

## lu-db-partitioning-sharding-boundary

### Identity

- **Unit ID:** lu-db-partitioning-sharding-boundary
- **Working title:** Choose partition or shard key from access locality
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-partitioning-sharding-boundary | Relational Database Engineering | L3 |

### Canonical scenario

Data grows until requests must route by key.

### Integrated mechanism / state trace

Key controls placement; locality avoids fan-out; skew creates hot partition.

### Integrated evidence surface

Key distribution; partition size; traffic; fan-out.

### Failure and debug loop

Hot/unbounded partition or scatter query.

### Shared assessment task

Choose a key from measured access distribution, quantify locality/fan-out and name a repartition trigger.

### Transfer variation

uniform tenants → one dominant hot tenant

### Boundary decision

KEEP as singleton after merge pressure review.

## lu-db-replication-failover

### Identity

- **Unit ID:** lu-db-replication-failover
- **Working title:** Reason relational replication and failover
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-replication-failover | Relational Database Engineering | L3 |

### Canonical scenario

Replica lag/failover happens during a write.

### Integrated mechanism / state trace

Apply lag and role transition can diverge from client operation history.

### Integrated evidence surface

Lag/position; role; operation ID; connection target.

### Failure and debug loop

Read-after-write from lagging replica.

### Shared assessment task

Use lag/position, role, connection target and operation ID to decide safe recovery during failover.

### Transfer variation

replica read scale → failover during in-flight write

### Boundary decision

KEEP as singleton after merge pressure review.

## lu-nosql-cassandra-lsm-compaction-consistency

### Identity

- **Unit ID:** lu-nosql-cassandra-lsm-compaction-consistency
- **Working title:** Model Cassandra partitioned LSM writes and reads
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-cassandra-partition-model | NoSQL & Specialized Data Systems | L3 |
| nosql-cassandra-lsm-compaction-consistency | NoSQL & Specialized Data Systems | L3 |

### Canonical scenario

Time-series writes need bounded partitions and readable LSM state.

### Integrated mechanism / state trace

Partition/clustering route rows; log→memtable→SSTable; reads merge files; replica policy costs.

### Integrated evidence surface

Key distribution; compaction metrics; tombstones; latency; replica response.

### Failure and debug loop

Hot partition, read amplification or wrong consistency assumption.

### Shared assessment task

Design a Cassandra key then trace write/read through memtable, SSTables, compaction and replica response.

| Primary capability | What evidence in this same task proves it |
|---|---|
| nosql-cassandra-partition-model | Query route, key distribution and partition size prove the model. |
| nosql-cassandra-lsm-compaction-consistency | Compaction/tombstone/replica evidence proves LSM consistency cost. |

### Transfer variation

uniform partitions → hot tenant plus tombstone-heavy history

### Boundary decision

KEEP as a coherent multi-capability unit.

## lu-nosql-storage-choice-transfer

### Identity

- **Unit ID:** lu-nosql-storage-choice-transfer
- **Working title:** Choose storage family from workload evidence
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-transfer-storage-choice | NoSQL & Specialized Data Systems | L4 |

### Canonical scenario

A new workload needs durable writes, search and low-latency lookup.

### Integrated mechanism / state trace

Compare read/write route, ownership, consistency, recovery and operating cost across families.

### Integrated evidence surface

Access matrix; prototype profile; distribution; failure test; cost estimate.

### Failure and debug loop

Tool chosen by trend instead of rejected evidence.

### Shared assessment task

Compare at least two storage families for an unseen workload and reject one by access, consistency, recovery and cost evidence.

### Transfer variation

document-heavy workload → append-by-partition plus search projection

### Boundary decision

KEEP as singleton after merge pressure review.

## lu-nosql-model-selection

### Identity

- **Unit ID:** lu-nosql-model-selection
- **Working title:** Frame storage selection before product choice
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-model-selection | NoSQL & Specialized Data Systems | L3 |

### Canonical scenario

Team needs storage framing before product branding.

### Integrated mechanism / state trace

Map query, consistency, ownership, growth and recovery needs to family properties.

### Integrated evidence surface

Access matrix; query shapes; growth; required failure behavior.

### Failure and debug loop

Search used as source of truth; Redis selected only because fast.

### Shared assessment task

Classify storage family fit from access, growth, source-of-truth and failure needs before naming a product.

### Transfer variation

document aggregate → append/read-by-partition workload

### Boundary decision

KEEP as singleton after merge pressure review.

## lu-nosql-mongo-aggregate-model

### Identity

- **Unit ID:** lu-nosql-mongo-aggregate-model
- **Working title:** Model Mongo aggregate boundaries
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-mongo-aggregate-model | NoSQL & Specialized Data Systems | L2 |

### Canonical scenario

Order document grows with unbounded activity.

### Integrated mechanism / state trace

Embed binds one document update; reference separates ownership and lookup.

### Integrated evidence surface

Document shape/size; update boundary; array growth.

### Failure and debug loop

Unbounded embed or cross-document atomicity assumption.

### Shared assessment task

Model embed/reference for the given document and defend it from size, array growth and update-boundary evidence.

### Transfer variation

bounded order aggregate → unbounded activity history

### Boundary decision

KEEP as singleton after merge pressure review.

## lu-nosql-mongo-index-shard-transaction

### Identity

- **Unit ID:** lu-nosql-mongo-index-shard-transaction
- **Working title:** Tune Mongo query route and transaction boundary
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-mongo-index-shard-transaction | NoSQL & Specialized Data Systems | L3 |

### Canonical scenario

Mongo workload grows beyond one shard/aggregate.

### Integrated mechanism / state trace

Index narrows documents; shard key routes; transaction crosses normal locality.

### Integrated evidence surface

Query profile; shard distribution; latency; transaction scope.

### Failure and debug loop

Hot chunk, scatter-gather, costly distributed transaction.

### Shared assessment task

Select Mongo index/shard key and justify multi-document transaction from route, profile and latency evidence.

### Transfer variation

single-shard update → cross-shard report/transaction

### Boundary decision

KEEP as singleton after merge pressure review.

## lu-nosql-redis-structures-memory

### Identity

- **Unit ID:** lu-nosql-redis-structures-memory
- **Working title:** Choose Redis data structures with memory bounds
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-redis-structures-memory | NoSQL & Specialized Data Systems | L2 |

### Canonical scenario

Leaderboard needs operation semantics without unbounded RAM.

### Integrated mechanism / state trace

Structure and key cardinality/value size determine operation and memory behavior.

### Integrated evidence surface

Key type/size; memory; latency; cardinality.

### Failure and debug loop

Wrong structure or giant/unbounded key.

### Shared assessment task

Choose Redis structures, estimate memory from cardinality/value size and reject an unbounded option.

### Transfer variation

bounded small keys → high-cardinality large-value workload

### Boundary decision

KEEP as singleton after merge pressure review.

## lu-nosql-redis-persistence-replication-cluster-streams

### Identity

- **Unit ID:** lu-nosql-redis-persistence-replication-cluster-streams
- **Working title:** Operate Redis durability, topology and Streams
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-redis-persistence-replication-cluster-streams | NoSQL & Specialized Data Systems | L3 |

### Canonical scenario

Redis state/work must survive restart, lag and slot movement.

### Integrated mechanism / state trace

Persistence, replica apply, slot route and pending consumer state have distinct operational effects.

### Integrated evidence surface

Persistence; replication lag; slots; consumer/pending state.

### Failure and debug loop

Lost acknowledged write, stale replica, hot slot, misunderstood pending entry.

### Shared assessment task

Use persistence, replication, slots and pending state to explain restart/failover and recover Stream work.

### Transfer variation

standalone cache → clustered Stream consumer group with failover

### Boundary decision

KEEP as singleton after merge pressure review.

## lu-nosql-search-projection

### Identity

- **Unit ID:** lu-nosql-search-projection
- **Working title:** Build and operate a search projection
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-search-inverted-index-analysis | NoSQL & Specialized Data Systems | L2 |
| nosql-search-refresh-shards-pagination | NoSQL & Specialized Data Systems | L3 |

### Canonical scenario

Catalog write must become searchable with correct token meaning and bounded deep navigation.

### Integrated mechanism / state trace

Analyzer→tokens→inverted index; refresh exposes projection; shards collect pages.

### Integrated evidence surface

Mapping/tokens; refresh timing; shard profile; pagination depth; source record.

### Failure and debug loop

Text/keyword mismatch, refresh expectation, hot shard or deep offset.

### Shared assessment task

Index a catalog change, inspect analyzed tokens/output, then trace refresh visibility and shard/pagination cost.

| Primary capability | What evidence in this same task proves it |
|---|---|
| nosql-search-inverted-index-analysis | Mapping, tokens and result prove inverted-index semantics. |
| nosql-search-refresh-shards-pagination | Refresh, shard profile and page depth prove visibility/cost. |

### Transfer variation

shallow search → deep pagination on skewed shards

### Boundary decision

KEEP as a coherent multi-capability unit.

## lu-cache-capacity-eviction-fallback

### Identity

- **Unit ID:** lu-cache-capacity-eviction-fallback
- **Working title:** Protect origin when cache capacity or availability fails
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| cache-capacity-eviction-fallback | Cache Engineering | L3 |

### Canonical scenario

Eviction/outage sends traffic to origin.

### Integrated mechanism / state trace

Finite capacity turns eviction/miss into fallback; bounds and shedding protect origin.

### Integrated evidence surface

Memory; evictions; hit rate; origin QPS; fallback latency/error.

### Failure and debug loop

Recursive fallback creates a cascade.

### Shared assessment task

Use eviction, hit/miss, origin QPS and fallback traces to choose bounded origin protection.

### Transfer variation

healthy cache → widespread eviction/outage with origin pressure

### Boundary decision

KEEP as singleton after merge pressure review.

## lu-cache-evidence-transfer

### Identity

- **Unit ID:** lu-cache-evidence-transfer
- **Working title:** Diagnose cache latency, staleness and origin-load symptoms
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| cache-evidence-transfer | Cache Engineering | L4 |

### Canonical scenario

Latency looks fine but stale data or origin overload remains.

### Integrated mechanism / state trace

Discriminate hit/miss-by-key, TTL age, version, source load and fallback hypotheses.

### Integrated evidence surface

Hit/miss by key; TTL; version timeline; p95/p99; fallback trace.

### Failure and debug loop

Hit rate is treated as the only success metric.

### Shared assessment task

Use key-level hit/miss, TTL, source load, p95 and versions to distinguish stale, hot-key, eviction and invalidation hypotheses.

### Transfer variation

high hit-rate latency case → stale-version incident with good hit rate

### Boundary decision

KEEP as singleton after merge pressure review.

## lu-cache-source-of-truth-invalidation

### Identity

- **Unit ID:** lu-cache-source-of-truth-invalidation
- **Working title:** Keep cached copies fresh across layers
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| cache-need-source-of-truth | Cache Engineering | L2 |
| cache-invalidation-consistency | Cache Engineering | L3 |
| cache-multilayer-coherence | Cache Engineering | L3 |

### Canonical scenario

Source changes while L1 and distributed copies remain.

### Integrated mechanism / state trace

Source owns version; delayed/reordered invalidation and layer identity decide accept/replace/reject.

### Integrated evidence surface

Source/cache version; TTL; invalidation; layer key; instance ID; request trace.

### Failure and debug loop

Cache becomes authority or one layer stays stale.

### Shared assessment task

Update one source record while L1/L2 copies exist; use version, age and layer evidence to decide which copy may serve.

| Primary capability | What evidence in this same task proves it |
|---|---|
| cache-need-source-of-truth | Source row/version and cached copy identify authority. |
| cache-invalidation-consistency | Event, version/TTL and timeline prove freshness decision. |
| cache-multilayer-coherence | Layer key, instance ID and age locate divergence. |

### Transfer variation

one distributed cache → L1 + distributed cache with delayed invalidation

### Boundary decision

KEEP as a coherent multi-capability unit.

## lu-cache-patterns

### Identity

- **Unit ID:** lu-cache-patterns
- **Working title:** Choose cache pattern and prevent miss overload
- **Learner-facing domain candidate:** Data & Consistency

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| cache-patterns | Cache Engineering | L2 |
| cache-stampede-penetration-avalanche-hot-key | Cache Engineering | L3 |

### Canonical scenario

Read/write loader design must survive expiry and miss overload.

### Integrated mechanism / state trace

Pattern assigns loader/write responsibility; miss trace distinguishes stampede, penetration, avalanche and hot key.

### Integrated evidence surface

Loader trace; write order; miss/expiry distribution; per-key QPS; origin load.

### Failure and debug loop

Cache write without source; miss storm; synchronized TTL; hot key.

### Shared assessment task

Trace cache-aside/read-through and write ordering, inject expiry/miss pressure, then select defense for the overload mode.

| Primary capability | What evidence in this same task proves it |
|---|---|
| cache-patterns | Loader calls and source/cache write order prove pattern ownership. |
| cache-stampede-penetration-avalanche-hot-key | Expiry, per-key QPS and origin load identify overload mode. |

### Transfer variation

normal misses → synchronized TTL expiry/hot-key burst

### Boundary decision

KEEP as a coherent multi-capability unit.

## lu-api-circuit-bulkhead-rate-limit

### Identity

- **Unit ID:** lu-api-circuit-bulkhead-rate-limit
- **Working title:** Chọn circuit, bulkhead hoặc rate limit theo dependency/resource/identity boundary.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| api-circuit-bulkhead-rate-limit | API Contracts & Resilience | L3 |

### Canonical scenario

Slow partner and one tenant burst grow queues. Choose control by protected boundary, not all controls.

### Integrated mechanism / state trace

Circuit tạm tránh dependency failing; bulkhead caps concurrent blast radius; rate limit controls admission by quota/identity.

### Integrated evidence surface

Circuit state/reason; queue/concurrency; admitted/rejected rate; tenant identity; dependency latency/errors; probe result.

### Failure and debug loop

Circuit opens on caller error; tenant exhausts shared concurrency; global limit punishes other tenant; unbounded bulkhead queue.

### Shared assessment task

Use dependency state, queue/concurrency, tenant admission and probe evidence to assign circuit, bulkhead or rate limit and define safe degradation.

### Transfer variation

One dependency → multiple tenants/dependencies with isolated budgets.

### Boundary decision

KEEP as a distinct mechanism/evidence boundary after merge pressure review.

## lu-api-contract-resource-semantics

### Identity

- **Unit ID:** lu-api-contract-resource-semantics
- **Working title:** Model operation as explicit contract over resource/state, not controller-to-URL mapping.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| api-contract-resource-semantics | API Contracts & Resilience | L2 |

### Canonical scenario

Client cannot tell whether an order was created, accepted later or rejected. Make a stable state contract.

### Integrated mechanism / state trace

Request expresses intent/input; server evaluates state/invariant; response conveys accepted/completed/rejected stable semantics.

### Integrated evidence surface

Request/response examples; OpenAPI; persisted before/after; contract tests.

### Failure and debug loop

Endpoint hides state transition; GET-like side effect; ambiguous update; caller cannot distinguish accepted/completed/rejected.

### Shared assessment task

Use request/response, before/after state and contract tests to define method/status/representation; reject controller-shaped URL semantics.

### Transfer variation

Internal CRUD endpoint → business operation consumed by independent clients.

### Boundary decision

KEEP as a distinct mechanism/evidence boundary after merge pressure review.

## lu-api-validation-errors-pagination

### Identity

- **Unit ID:** lu-api-validation-errors-pagination
- **Working title:** Design validation, error and pagination contract so client can recover predictably.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| api-validation-errors-pagination | API Contracts & Resilience | L2 |

### Canonical scenario

Invalid creates expose ad-hoc strings while list pages shift. Define recoverable validation and traversal.

### Integrated mechanism / state trace

Validation blocks unsafe transition; error contract separates classes; pagination defines traversal of changing collection.

### Integrated evidence surface

Contract tests; ProblemDetails payload; cursor/offset; query/order; boundary tests.

### Failure and debug loop

Invalid input mapped 500; exception leaks; offset skips/duplicates; unbounded page; field failure unclear.

### Shared assessment task

Use invalid payloads, ProblemDetails, ordering/query data and boundary tests to choose error fields and cursor/offset behavior.

### Transfer variation

Small list → large mutable independent-client dataset.

### Boundary decision

KEEP as a distinct mechanism/evidence boundary after merge pressure review.

## lu-api-request-identity-idempotency

### Identity

- **Unit ID:** lu-api-request-identity-idempotency
- **Working title:** Define stable logical operation identity so same retry does not repeat business effect.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| api-request-identity-idempotency | API Contracts & Resilience | L3 |

### Canonical scenario

Mobile retries create after response loss. Bind one key to one fingerprint and outcome.

### Integrated mechanism / state trace

Key/fingerprint/outcome record separates same-operation retry from a new similar request.

### Integrated evidence surface

Idempotency key; fingerprint; operation record; business row; stored response; retry test.

### Failure and debug loop

Random retry key; same key different payload; crash after effect before record; dedup expiry too short; HTTP method assumed safe.

### Shared assessment task

Use duplicate traces, stored key/fingerprint/outcome and concurrent claims to specify replay, conflict and pending behavior.

### Transfer variation

Create order retry → payment response lost.

### Boundary decision

KEEP as a distinct mechanism/evidence boundary after merge pressure review.

## lu-api-versioning-compatibility

### Identity

- **Unit ID:** lu-api-versioning-compatibility
- **Working title:** Change API while old/new clients coexist without silent break.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| api-versioning-compatibility | API Contracts & Resilience | L3 |

### Canonical scenario

Partner sends old payload after a field changes meaning. Choose compatibility, mapping or version/migration.

### Integrated mechanism / state trace

Compatibility includes syntax and meaning; additive change/version/migration supports independent deploy.

### Integrated evidence surface

Contract/OpenAPI diff; consumer tests; version telemetry; old requests.

### Failure and debug loop

Required field removed; meaning changes; enum breaks client; assume simultaneous upgrade; rollback incompatible.

### Shared assessment task

Use contract diff, consumer tests, old requests and telemetry to classify the change and set rollout/rollback conditions.

### Transfer variation

One frontend deploy → public/mobile/partner clients.

### Boundary decision

KEEP as a distinct mechanism/evidence boundary after merge pressure review.

## lu-api-deadline-retry-policy

### Identity

- **Unit ID:** lu-api-deadline-retry-policy
- **Working title:** Set/propagate one end-to-end time budget and distinguish caller deadline from remote completion. + Retry only failure/effect classes safe to retry, with bounded backoff and jitter.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| api-deadlines-timeout-cancellation | API Contracts & Resilience | L3 |
| api-retry-backoff-jitter | API Contracts & Resilience | L3 |

### Canonical scenario

800 ms budget crosses three services and a reset invites retry. Spend one budget and bound retries.

### Integrated mechanism / state trace

Remaining deadline is split across hops; cancellation signals no useful caller lifetime but does not prove remote side effect absent. → Retry creates another attempt; backoff spaces it; jitter prevents synchronized retry wave.

### Integrated evidence surface

One request timeline contains original deadline, remaining budget per hop, cancellation, attempt/error timestamps, backoff/jitter delay and downstream request rate.

### Failure and debug loop

Gateway has 800 ms, every hop uses 800 ms and the last service retries a reset three times. Child work survives cancellation and attempts overload downstream. Recompute remaining budget before each attempt.

### Shared assessment task

Given a three-hop timeline with deadline, cancellation, error class, attempts, delay and downstream rate, calculate retry budget and allowed attempts.

| Primary capability | What evidence in this same task proves it |
|---|---|
| api-deadlines-timeout-cancellation | Original/remaining deadline, cancellation and spans prove cross-hop budget/lifetime. |
| api-retry-backoff-jitter | Attempt class/timing, delay schedule and downstream rate prove bounded retry. |

### Transfer variation

Three hops see transient failure; retry runs only while inside shrinking end-to-end deadline.

### Boundary decision

KEEP as one causal mechanism/evidence boundary.

## lu-api-unknown-outcome-reconciliation

### Identity

- **Unit ID:** lu-api-unknown-outcome-reconciliation
- **Working title:** Recover ambiguous mutation by stating known/unknown, using stable identity and querying/reconciling authoritative state.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| api-unknown-outcome-reconciliation | API Contracts & Resilience | L4 |

### Canonical scenario

Provider transfer times out after possible creation. Recover from authoritative state, not duplicate request.

### Integrated mechanism / state trace

Transport failure and business completion are separate; API needs status/outcome mechanism.

### Integrated evidence surface

Operation ID; business/audit record; provider status; attempts; idempotency outcome; reconciliation result.

### Failure and debug loop

Timeout called failed though committed; blind duplicate retry; status uses other ID; cache trusted as authority; contradictory status.

### Shared assessment task

Use operation ID, provider status, local audit and attempts to define reconciliation and terminal states.

### Transfer variation

Fast internal order write → slow external provider operation.

### Boundary decision

KEEP as a distinct mechanism/evidence boundary after merge pressure review.

## lu-sec-trust-boundary-threat-model

### Identity

- **Unit ID:** lu-sec-trust-boundary-threat-model
- **Working title:** Draw trust boundaries/assets/actors/untrusted input before controls.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-trust-boundary-threat-model | Security | L2 |

### Canonical scenario

Webhook reaches worker able to mutate tenant data. Draw actors/assets/boundaries before controls.

### Integrated mechanism / state trace

Less-trusted data/identity crossing into trusted decision requires authz/validation/constraint proportional to risk.

### Integrated evidence surface

Data-flow diagram; identity/source; asset/operation; boundary notes; abuse cases.

### Failure and debug loop

Internal network assumed trusted; callback authoritative; tenant ID ownership proof; hidden admin endpoint missed.

### Shared assessment task

Use data-flow and payload to mark untrusted crossings and select the first server-side control for each path.

### Transfer variation

Public API → API + worker + webhook callback.

### Boundary decision

KEEP as a distinct mechanism/evidence boundary after merge pressure review.

## lu-sec-abuse-bruteforce-resource-business-flow

### Identity

- **Unit ID:** lu-sec-abuse-bruteforce-resource-business-flow
- **Working title:** Detect/limit legitimate-looking request abuse by identity/resource/business state.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-abuse-bruteforce-resource-business-flow | Security | L3 |

### Canonical scenario

Valid accounts repeatedly trigger expensive export. Limit abuse at the cost-owning dimension.

### Integrated mechanism / state trace

Valid endpoints/credentials can still be abused; budgets/signals need account/device/IP/resource/operation dimensions.

### Integrated evidence surface

Attempt rate; account/device/IP/session; success ratio; resource cost; operation history; limit decision.

### Failure and debug loop

Credential stuffing; OTP abuse; expensive export; scalping; IP-only limit bypass.

### Shared assessment task

Use account/device/IP/resource history, cost and limit decisions to choose budget key and response; reject IP-only protection.

### Transfer variation

Login brute force → authenticated costly business operation.

### Boundary decision

KEEP as a distinct mechanism/evidence boundary after merge pressure review.

## lu-sec-unseen-attack-transfer

### Identity

- **Unit ID:** lu-sec-unseen-attack-transfer
- **Working title:** Given unfamiliar abuse, identify boundary/asset, attack paths/evidence, protect true owner and assess bypass.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-unseen-attack-transfer | Security | L4 |

### Canonical scenario

Unfamiliar incident combines valid session, object IDs and parallel requests. Derive path and durable fix.

### Integrated mechanism / state trace

Authentication, authorization, input trust, resource abuse, race and audit compose through attacker capability and state transition.

### Integrated evidence surface

Request/audit timeline; auth decision; state transition; resource usage; exploit/regression test.

### Failure and debug loop

Patch one payload; UI-only control; symptom block leaves path; fix breaks legitimate tenant flow.

### Shared assessment task

Use timeline, authorization/state/resource evidence and regression test to identify violated owner and a bypass-resistant fix.

### Transfer variation

Known IDOR/race/SSRF → unlabeled production incident.

### Boundary decision

KEEP as a distinct mechanism/evidence boundary after merge pressure review.

## lu-sec-auth-session-oauth

### Identity

- **Unit ID:** lu-sec-auth-session-oauth
- **Working title:** Distinguish authentication/authorization and reason session/token validation, lifetime, revocation. + Explain backend boundary OAuth authorization vs OIDC identity without flow memorization.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-auth-session-token | Security | L3 |
| sec-oauth-oidc-awareness | Security | L2 |

### Canonical scenario

External IdP ID token is sent to resource API. Validate claims and distinguish identity from delegated access.

### Integrated mechanism / state trace

Credential/session/token establishes identity only after issuer/signature/audience/lifetime/state checks as applicable. → OAuth delegates access to resource; OIDC adds identity info; client/resource/auth server roles differ.

### Integrated evidence surface

One identity trace combines token/session validation with issuer, audience, expiry, type, scope, client/resource IDs and authorization-server metadata.

### Failure and debug loop

An API accepts an ID token because its signature is valid but ignores audience and scope. Caller identity exists but no resource access grant exists. Check token type, issuer/audience/expiry, scope and metadata.

### Shared assessment task

Given issuer, audience, expiry, token type, scope, client/resource IDs, AS metadata and auth logs, decide API authentication/access without inferring object/tenant authorization.

| Primary capability | What evidence in this same task proves it |
|---|---|
| sec-auth-session-token | Issuer, audience, expiry, signature/session state and auth logs prove identity/token validity/lifetime. |
| sec-oauth-oidc-awareness | Token type, scope, client/resource IDs and AS metadata prove delegated access versus identity assertion. |

### Transfer variation

An external IdP machine-to-machine client uses different issuer, audience, token type and scope.

### Boundary decision

KEEP as one causal mechanism/evidence boundary.

## lu-sec-authorization-object-tenant

### Identity

- **Unit ID:** lu-sec-authorization-object-tenant
- **Working title:** Prove subject may act on this object/tenant using server-trusted ownership/policy.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-authorization-object-tenant | Security | L3 |

### Canonical scenario

Support user changes another tenant order by ID. Enforce object/tenant policy at server boundary.

### Integrated mechanism / state trace

Authorization evaluates subject + action + resource tenant/owner + policy, not just login.

### Integrated evidence surface

Subject; policy decision; authoritative owner/tenant; negative tests; audit event.

### Failure and debug loop

BOLA/IDOR; tenant request value trusted; admin UI-only guard; filter after data exposed.

### Shared assessment task

Use subject, authoritative owner, policy result, negative test and audit event; reject client tenant or UI check.

### Transfer variation

User account → operator subset across tenant roles.

### Boundary decision

KEEP as a distinct mechanism/evidence boundary after merge pressure review.

## lu-sec-browser-boundaries-cors-csrf-xss

### Identity

- **Unit ID:** lu-sec-browser-boundaries-cors-csrf-xss
- **Working title:** Distinguish CORS, CSRF and XSS to apply correct browser boundary control.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-browser-boundaries-cors-csrf-xss | Security | L2 |

### Canonical scenario

Cookie app adds permissive CORS. Distinguish cross-origin reads, CSRF and XSS.

### Integrated mechanism / state trace

CORS controls browser cross-origin access; CSRF abuses ambient credentials; XSS executes attacker script in trusted origin.

### Integrated evidence surface

Origin; CORS headers; cookie attributes; CSRF token; output context; browser test.

### Failure and debug loop

CORS assumed CSRF defense; wildcard credentials; cookie mutation no CSRF; unsafe content rendered HTML.

### Shared assessment task

Use origin, CORS headers, cookies, CSRF token and output context to choose each control; reject CORS as CSRF defense.

### Transfer variation

Cookie app → bearer-token SPA/API.

### Boundary decision

KEEP as a distinct mechanism/evidence boundary after merge pressure review.

## lu-sec-injection-ssrf-input-output

### Identity

- **Unit ID:** lu-sec-injection-ssrf-input-output
- **Working title:** Trace untrusted data into query/network/output sink and stop it controlling syntax/destination/context.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-injection-ssrf-input-output | Security | L3 |

### Canonical scenario

User supplies report filter and image URL. Stop input controlling query syntax, destination or output context.

### Integrated mechanism / state trace

Injection changes command syntax; SSRF lets attacker choose server destination; typed binding/allow-list separates data/control.

### Integrated evidence surface

Constructed query; parameter binding; destination policy; DNS/IP resolution; test payload; egress logs.

### Failure and debug loop

Concatenated SQL; NoSQL operator injection; metadata/internal fetch; shell composition; wrong-context encoding.

### Shared assessment task

Use query construction, DNS/egress logs and hostile payloads to choose binding, allow-list and encoding.

### Transfer variation

SQL parameterization → dynamic filter → server-side URL fetch.

### Boundary decision

KEEP as a distinct mechanism/evidence boundary after merge pressure review.

## lu-sec-race-business-logic-abuse

### Identity

- **Unit ID:** lu-sec-race-business-logic-abuse
- **Working title:** Reproduce concurrent valid requests bypassing invariant and protect atomic owner.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-race-business-logic-abuse | Security | L3 |

### Canonical scenario

Two coupon redeems pass pre-check together. Protect atomic state owner and prove no duplicate effect.

### Integrated mechanism / state trace

Attacker widens race window; pre-transition authorization/validation cannot protect non-atomic state change.

### Integrated evidence surface

Parallel timeline; operation IDs; before/after state; DB constraint/conditional result; audit sequence.

### Failure and debug loop

Coupon redeemed twice; concurrent spend; duplicate reservation; limit check before insert.

### Shared assessment task

Use concurrent timeline, state, conditional result and audit sequence to select guard and regression test.

### Transfer variation

Accidental race → intentional exploit.

### Boundary decision

KEEP as a distinct mechanism/evidence boundary after merge pressure review.

## lu-sec-secrets-third-party-trust

### Identity

- **Unit ID:** lu-sec-secrets-third-party-trust
- **Working title:** Control secret lifecycle and verify third-party data/action before trusting it.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-secrets-third-party-trust | Security | L3 |

### Canonical scenario

Signed webhook is replayed during key rotation. Verify authority while keeping legitimate deliveries.

### Integrated mechanism / state trace

Secrets grant authority; callbacks cross boundary and need identity/integrity/schema/business validation.

### Integrated evidence surface

Secret rotation/scope/audit; signature/timestamp; provider request/response; replay record.

### Failure and debug loop

Secret repo/log; shared long-lived credential; unverified webhook/replay; upstream field trusted; rotation breaks fleet.

### Shared assessment task

Use rotation/scope audit, signature/timestamp and delivery record to define verification and overlap.

### Transfer variation

Static API key → workload identity/signed webhook.

### Boundary decision

KEEP as a distinct mechanism/evidence boundary after merge pressure review.

## lu-sec-audit-detection-evidence

### Identity

- **Unit ID:** lu-sec-audit-detection-evidence
- **Working title:** Produce audit evidence of who did what to which object and which security decision occurred.
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-audit-detection-evidence | Security | L3 |

### Canonical scenario

Support investigates privileged export without token logging. Create accountable protected audit evidence.

### Integrated mechanism / state trace

Audit records subject/action/target/outcome/correlation at trust/business boundary; detection derives signal from it.

### Integrated evidence surface

Subject/action/object/tenant; decision/reason; operation ID; timestamp/source; controlled destination.

### Failure and debug loop

Success/deny indistinguishable; no tenant target; token logged; audit mutable; noise hides sensitive action.

### Shared assessment task

Use audit schema, request context and detection query to select subject/action/object/tenant/outcome/reason/correlation fields.

### Transfer variation

Login audit → privileged export or tenant-admin change.

### Boundary decision

KEEP as a distinct mechanism/evidence boundary after merge pressure review.



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

## Stage 1A — Runtime & Concurrency closure record

This batch is **REVIEWED**. Canonical unit sections and audit registries hold the final evidence and membership; this record is not a second registry.

At the time of this Stage 1A closure record, Stage 1 remained DRAFT and REQUIRED/RECOMMENDED projection had not started. The current sealed progression policy is recorded in `learning-unit-progression.md`.
## lu-net-service-discovery-load-balancing

### Identity

- **Unit ID:** lu-net-service-discovery-load-balancing
- **Working title:** Route a logical service to healthy backends as endpoints change
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| net-service-discovery-load-balancing | Networking & HTTP | L3 |

### Canonical scenario

Reason from a logical service name to a selected healthy backend as endpoints and load change.

### Integrated mechanism / state trace

A logical service resolves to an evolving endpoint set; a client or proxy picker applies routing policy and removes unhealthy endpoints. Connection reuse and long-lived streams make connection-level distribution different from request-level balancing.

### Integrated evidence surface

Resolver result; endpoint set; picker/routing decision; selected connection target; health state; per-backend request distribution.

### Failure and debug loop

Stale endpoint; unhealthy backend remains selected; uneven long-lived connections; DNS treated as full discovery; affinity overloads one backend.

### Shared assessment task

Given a logical service name, resolver result, changing endpoint set, health states, picker decisions, connection reuse and per-backend request distribution, diagnose whether stale discovery, unhealthy selection or long-lived connection skew caused the incident. Choose client-side or proxy routing and show the selected healthy-backend evidence that would confirm recovery.

### Transfer variation

Static DNS list → dynamic service discovery behind proxy and client-side balancing.

### Boundary decision

Frequent updates improve freshness but add control-plane churn; affinity/reuse reduces setup cost but can skew load.

## lu-sec-cryptography-credentials-tokens

### Identity

- **Unit ID:** lu-sec-cryptography-credentials-tokens
- **Working title:** Choose safe cryptographic protection for credentials and tokens
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-cryptography-credentials-tokens | Security | L2 |

### Canonical scenario

Choose hash, encryption, MAC or signature for a credential/token problem without implementing cryptographic algorithms.

### Integrated mechanism / state trace

Hashing verifies a secret without recovery; encryption protects recoverable data; MAC/signature proves integrity/authenticity. Passwords need salt and adaptive work factor; tokens need CSPRNG-generated unpredictable values and secure verification.

### Integrated evidence surface

Algorithm/purpose decision; password parameters; token entropy/source; verification result; expiry/revocation audit; redacted logs.

### Failure and debug loop

Fast password hash; predictable reset token; reversible password storage; signature confused with encryption; token logged or accepted without expiry/audience check.

### Shared assessment task

Given password-hash parameters, reset-token generation/storage, a signed-token verification path and expiry/audience audit, choose the correct primitive for each asset. Identify one unsafe storage or verification step and show the redacted evidence proving passwords are not recoverable and tokens cannot be accepted outside their intended context.

### Transfer variation

Local password login → signed service token or password-reset link.

### Boundary decision

Stronger work factor increases login cost; short token lifetime limits exposure but raises refresh/availability pressure.

## lu-sec-data-encryption-key-lifecycle

### Identity

- **Unit ID:** lu-sec-data-encryption-key-lifecycle
- **Working title:** Protect sensitive data with an explicit key lifecycle
- **Learner-facing domain candidate:** Service & Network

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-data-encryption-key-lifecycle | Security | L2 |

### Canonical scenario

Set a data-protection boundary and reason about key scope, rotation, revocation and exposure evidence.

### Integrated mechanism / state trace

Data encryption protects stored plaintext; envelope encryption separates data key from KMS-managed key. Key material has scope, storage, rotation and revocation lifecycle; TLS alone does not protect stored data.

### Integrated evidence surface

Data classification; key reference/scope; KMS audit; encryption metadata; rotation/recovery drill; redaction check.

### Failure and debug loop

Secret/key in source; one shared long-lived key; rotation makes old data unreadable; encrypted data with accessible key; sensitive payload logged.

### Shared assessment task

Given data classification, KMS/key metadata, encryption metadata, rotation history and a recovery-drill record, design a key scope and rotation path. Diagnose an unreadable old record or exposed-key risk, then show the audit and recovery evidence that proves the chosen lifecycle protects the classified data.

### Transfer variation

Database column encryption → object storage/export encrypted with KMS.

### Boundary decision

Per-record/envelope keys reduce blast radius but increase key-management and recovery complexity.

## lu-dist-partial-failure-uncertainty

### Identity

- **Unit ID:** lu-dist-partial-failure-uncertainty
- **Working title:** Reason about partial failure without inventing remote truth
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-partial-failure-uncertainty | Distributed Systems | L3 |

### Canonical scenario

Payment times out while inventory and notification show different health.

### Integrated mechanism / state trace

Each component can fail or become unreachable independently; timeout is not remote state.

### Integrated evidence surface

Per-hop timing, health, operation ID and server audit.

### Failure and debug loop

Timeout called failure, retry amplification, false global success.

### Shared assessment task

Classify known, unknown and unobservable state from spans and audit; choose the next safe observation.

### Transfer variation

One timeout to a network partition.

### Boundary decision

SPLIT: reusable uncertainty needs its own evidence before deeper guarantees.

## lu-dist-replication-leader-quorum

### Identity

- **Unit ID:** lu-dist-replication-leader-quorum
- **Working title:** Judge replica acknowledgement and failover guarantees
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-replication-leader-quorum | Distributed Systems | L3 |

### Canonical scenario

A write succeeds just before leader failover.

### Integrated mechanism / state trace

Leader, replica acknowledgements and promotion determine visibility and durability.

### Integrated evidence surface

Role, log position, ack set, lag, promotion and read result.

### Failure and debug loop

Leader receipt called durable; lagging replica promoted.

### Shared assessment task

Given ack policy and failover timeline, state the guarantee and reject unsafe promotion.

### Transfer variation

Three replicas to slow remote region.

### Boundary decision

SPLIT: replica state differs from authority and generic timeout evidence.

## lu-dist-consensus-coordination-purpose

### Identity

- **Unit ID:** lu-dist-consensus-coordination-purpose
- **Working title:** Choose coordination for one shared decision
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-consensus-coordination-purpose | Distributed Systems | L3 |

### Canonical scenario

Two schedulers compete for one lease during membership change.

### Integrated mechanism / state trace

Term, quorum and committed decision establish one authority or deliberately stop progress.

### Integrated evidence surface

Members, term, quorum, lease record and owner timeline.

### Failure and debug loop

Stale epoch creates two owners; writes during quorum loss.

### Shared assessment task

Use membership and lease history to decide safe progress and availability cost.

### Transfer variation

Static group to zone outage.

### Boundary decision

SPLIT: authority decision has distinct state/evidence.

## lu-dist-guarantee-recovery-transfer

### Identity

- **Unit ID:** lu-dist-guarantee-recovery-transfer
- **Working title:** Reason across distributed guarantees during recovery
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-guarantee-recovery-transfer | Distributed Systems | L4 |

### Canonical scenario

Regional incident has lost reply, stale read and repair mismatch.

### Integrated mechanism / state trace

Synthesize uncertainty, replica, coordination, time and repair boundaries into one recovery plan.

### Integrated evidence surface

Incident timeline, term, version, source diff, repair audit and customer result.

### Failure and debug loop

Overclaiming exactly-once; repair from stale authority.

### Shared assessment task

State surviving guarantees and choose recovery owner from incident evidence.

### Transfer variation

Single region to multi-region failover.

### Boundary decision

SPLIT: L4 synthesis must not gate foundation evidence.

## lu-dist-consistency-linearizability

### Identity

- **Unit ID:** lu-dist-consistency-linearizability
- **Working title:** State the consistency guarantee a business operation needs
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-consistency-linearizability | Distributed Systems | L3 |

### Canonical scenario

Account limit is written then read through another replica.

### Integrated mechanism / state trace

Model constrains permitted read/write histories and visibility.

### Integrated evidence surface

Invocation/response history, versions, read source and replica state.

### Failure and debug loop

Stale read violates promise; eventual confused with latest.

### Shared assessment task

Judge if history meets required guarantee and choose stronger/weaker model.

### Transfer variation

Read-after-write to concurrent regional writes.

### Boundary decision

KEEP: history proof differs from cache/storage behavior.

## lu-dist-partitioning-ownership-rebalancing

### Identity

- **Unit ID:** lu-dist-partitioning-ownership-rebalancing
- **Working title:** Move ownership without losing in-flight work
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-partitioning-ownership-rebalancing | Distributed Systems | L3 |

### Canonical scenario

A hot tenant partition moves while requests arrive.

### Integrated mechanism / state trace

Assignment, epoch and handoff move responsibility while router converges.

### Integrated evidence surface

Partition map, owner epoch, route, in-flight count and handoff events.

### Failure and debug loop

Stale route, double owner, duplicate in-flight work.

### Shared assessment task

Find stale ownership and choose drain or fencing from handoff evidence.

### Transfer variation

Static ring to elastic workers.

### Boundary decision

KEEP: ownership handoff differs from offsets and DB sharding.

## lu-dist-rpc-unknown-completion

### Identity

- **Unit ID:** lu-dist-rpc-unknown-completion
- **Working title:** Handle remote call whose effect may already exist
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-rpc-unknown-completion | Distributed Systems | L3 |

### Canonical scenario

Payment RPC times out after send before response.

### Integrated mechanism / state trace

Send, execution and response delivery are independent; timeout cannot infer remote truth.

### Integrated evidence surface

Client deadline, operation ID, server audit, provider status and trace.

### Failure and debug loop

Retry duplicate charge; cancel treated as rollback.

### Shared assessment task

Label unknown outcome, choose query versus retry, and name terminal evidence.

### Transfer variation

RPC to delayed callback.

### Boundary decision

SPLIT: response ambiguity differs from general reconciliation.

## lu-dist-reconciliation-convergence

### Identity

- **Unit ID:** lu-dist-reconciliation-convergence
- **Working title:** Repair divergent state toward an authority
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-reconciliation-convergence | Distributed Systems | L3 |

### Canonical scenario

Projection missed events and diverges from orders.

### Integrated mechanism / state trace

Compare actual state with authority, apply repeatable repair and measure convergence.

### Integrated evidence surface

Source/derived diff, repair ID, mismatch count and before/after state.

### Failure and debug loop

Wrong truth source, non-idempotent repair, endless loop.

### Shared assessment task

Choose authority and idempotent correction; prove mismatch decreases.

### Transfer variation

Missed projection to bank callback reconciliation.

### Boundary decision

SPLIT: repair loop applies beyond RPC.

## lu-dist-time-order-causality

### Identity

- **Unit ID:** lu-dist-time-order-causality
- **Working title:** Use causal or version order when clocks disagree
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-time-order-causality | Distributed Systems | L3 |

### Canonical scenario

Shipment cancellation has conflicting service timestamps.

### Integrated mechanism / state trace

Clock skew and delay require causal relation, version or sequence.

### Integrated evidence surface

Correlation ID, version, send/receive time and trace links.

### Failure and debug loop

Arrival time treated as event time; wrong reconstruction.

### Shared assessment task

Reconstruct supported order and reject false total order.

### Transfer variation

One queue to two-region events.

### Boundary decision

KEEP: causal evidence differs from broker ordering and synthesis.

## lu-dist-transactions-2pc-boundary

### Identity

- **Unit ID:** lu-dist-transactions-2pc-boundary
- **Working title:** Evaluate 2PC prepare/commit and blocking cost
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-transactions-2pc-boundary | Distributed Systems | L3 |

### Canonical scenario

Two databases reserve inventory and record payment.

### Integrated mechanism / state trace

Participants prepare durable intent; coordinator records final decision.

### Integrated evidence surface

Coordinator log, participant state, locks, timeout and recovery.

### Failure and debug loop

Coordinator dies after prepare; external effect assumed rollback.

### Shared assessment task

Choose commit, abort or recovery wait from participant evidence.

### Transfer variation

Two DBs to irreversible provider.

### Boundary decision

KEEP: coordinator protocol differs from local isolation and Saga.

## lu-msg-model-queue-topic-partition-order

### Identity

- **Unit ID:** lu-msg-model-queue-topic-partition-order
- **Working title:** Model queue topic partition and ordering scope
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-model-queue-topic-partition-order | Messaging & Event-Driven Consistency | L2 |

### Canonical scenario

Choose messaging model for customer-keyed orders.

### Integrated mechanism / state trace

Destination controls fan-out; key and partition control ordering scope.

### Integrated evidence surface

Destination config, key, partition, offset, assignment and sequence.

### Failure and debug loop

Queue treated broadcast; wrong key breaks order.

### Shared assessment task

Select model and state ordering guarantee from configuration and records.

### Transfer variation

One partition to keyed group.

### Boundary decision

SPLIT: foundation model cannot wait for replay/lag.

## lu-msg-consumer-groups-offsets-rebalance

### Identity

- **Unit ID:** lu-msg-consumer-groups-offsets-rebalance
- **Working title:** Process partitions through rebalance
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-consumer-groups-offsets-rebalance | Messaging & Event-Driven Consistency | L3 |

### Canonical scenario

Consumer dies and another takes its partitions.

### Integrated mechanism / state trace

Generation assigns partitions; committed offset tracks broker progress.

### Integrated evidence surface

Member/generation, assignment, offsets, rebalance and processing audit.

### Failure and debug loop

Effect succeeds then offset fails; stale member continues.

### Shared assessment task

Diagnose risk and choose commit/abort behavior from group evidence.

### Transfer variation

Stable group to rolling deploy.

### Boundary decision

SPLIT: group state differs from topology, replay and capacity.

## lu-msg-replay-backfill

### Identity

- **Unit ID:** lu-msg-replay-backfill
- **Working title:** Replay history without corrupting live effects
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-replay-backfill | Messaging & Event-Driven Consistency | L3 |

### Canonical scenario

Rebuild search projection while live traffic continues.

### Integrated mechanism / state trace

Range/checkpoint replay uses isolated or idempotent path with live watermark.

### Integrated evidence surface

Range, offsets, IDs, schema, checkpoint, watermark and counts.

### Failure and debug loop

Wrong start, live/backfill race, replayed side effect.

### Shared assessment task

Choose safe range and prove convergence without duplicate effect.

### Transfer variation

Full rebuild to selective customer backfill.

### Boundary decision

SPLIT: historic range differs from active assignment and lag.

## lu-msg-lag-backpressure-evidence

### Identity

- **Unit ID:** lu-msg-lag-backpressure-evidence
- **Working title:** Diagnose consumer lag as capacity signal
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-lag-backpressure-evidence | Messaging & Event-Driven Consistency | L3 |

### Canonical scenario

Lag grows despite adding consumers.

### Integrated mechanism / state trace

Arrival/service rate, hot partition, handler and downstream determine lag.

### Integrated evidence surface

Per-partition lag, rates, duration, retries, assignment and downstream latency.

### Failure and debug loop

Hot partition, retry storm, saturated DB.

### Shared assessment task

Identify limiter and choose bounded mitigation from evidence.

### Transfer variation

Uniform load to one hot tenant.

### Boundary decision

SPLIT: capacity diagnosis differs from replay and group state.

## lu-msg-delivery-retry-poison-dlq

### Identity

- **Unit ID:** lu-msg-delivery-retry-poison-dlq
- **Working title:** Classify retryable delivery and poison
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-delivery-retry-poison-dlq | Messaging & Event-Driven Consistency | L3 |

### Canonical scenario

Malformed invoice blocks a partition while provider outage clears.

### Integrated mechanism / state trace

Classify attempt; bounded retry protects capacity; poison quarantines with recovery path.

### Integrated evidence surface

Message ID, count, error class, schedule, lag, DLQ reason.

### Failure and debug loop

Infinite poison retry; transient sent early to DLQ.

### Shared assessment task

Classify samples and choose retry quarantine or replay.

### Transfer variation

Schema poison to transient 503.

### Boundary decision

KEEP: classification differs from routing and capacity.

## lu-msg-external-side-effect-reconciliation

### Identity

- **Unit ID:** lu-msg-external-side-effect-reconciliation
- **Working title:** Recover external side effect after unknown local outcome
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-external-side-effect-reconciliation | Messaging & Event-Driven Consistency | L4 |

### Canonical scenario

Shipping provider times out after create-label request.

### Integrated mechanism / state trace

Provider may complete independently; reference query/callback reconciles one outcome.

### Integrated evidence surface

Reference ID, provider state, callback, local audit and attempts.

### Failure and debug loop

Retry creates second label; duplicate callback.

### Shared assessment task

Choose retry wait or reconcile and prove one label.

### Transfer variation

Shipping label to bank transfer.

### Boundary decision

KEEP: external authority differs from generic repair.

## lu-msg-producer-acks-durability

### Identity

- **Unit ID:** lu-msg-producer-acks-durability
- **Working title:** State what producer acknowledgement proves
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-producer-acks-durability | Messaging & Event-Driven Consistency | L3 |

### Canonical scenario

Broker leader fails after producer ack.

### Integrated mechanism / state trace

Ack semantics depend on record, replicas and failover state.

### Integrated evidence surface

Producer config, ack log, roles, positions, ISR and failover.

### Failure and debug loop

Ack treated as universal durability; ambiguous retry duplicates.

### Shared assessment task

State guarantee and choose verify/retry from broker evidence.

### Transfer variation

Single broker to quorum ack.

### Boundary decision

KEEP: producer contract differs from generic quorum.

## lu-msg-schema-evolution-contract-ownership

### Identity

- **Unit ID:** lu-msg-schema-evolution-contract-ownership
- **Working title:** Evolve event contract with retained history
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-schema-evolution-contract-ownership | Messaging & Event-Driven Consistency | L3 |

### Canonical scenario

Producer adds field while old consumers remain.

### Integrated mechanism / state trace

Producer owns compatible evolution; retained history exposes old schemas.

### Integrated evidence surface

Schema versions, deployment matrix, payload samples and decode results.

### Failure and debug loop

Required field breaks old consumer; old history fails decode.

### Shared assessment task

Choose compatibility and prove both consumers handle contract.

### Transfer variation

Additive field to migration window.

### Boundary decision

KEEP: contract proof differs from replay range.

## lu-msg-workflow-saga-compensation

### Identity

- **Unit ID:** lu-msg-workflow-saga-compensation
- **Working title:** Recover multi-step workflow with compensation
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-workflow-saga-compensation | Messaging & Event-Driven Consistency | L3 |

### Canonical scenario

Stock reserved and paid order fails shipment.

### Integrated mechanism / state trace

Independent steps persist; compensation is a new business action.

### Integrated evidence surface

Saga state, command IDs, outcomes, compensations and audit.

### Failure and debug loop

Compensation fails; duplicate/out-of-order command.

### Shared assessment task

Choose next action and prove invariant after recovery.

### Transfer variation

Local services to delayed provider callback.

### Boundary decision

KEEP: workflow state differs from 2PC and provider query.

## lu-msg-background-jobs-scheduling

### Identity

- **Unit ID:** lu-msg-background-jobs-scheduling
- **Working title:** Run scheduled durable work across restarts
- **Learner-facing domain candidate:** Distributed Systems

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-background-jobs-scheduling | Messaging & Event-Driven Consistency | L3 |

### Canonical scenario

Nightly job restarts in a misfire window with two workers.

### Integrated mechanism / state trace

Trigger creates durable job; lease selects worker; attempt/idempotency guards effect.

### Integrated evidence surface

Job state, trigger, misfire, lease, attempts, key and audit.

### Failure and debug loop

Missed run, duplicate worker, stuck lease, repeated invoice.

### Shared assessment task

Diagnose duplicate/missed job; choose takeover/retry and prove one effect.

### Transfer variation

Timer to clustered persistent scheduler.

### Boundary decision

KEEP amendment: scheduler trigger/lease differs from DLQ, coordination and local admission.



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

### Canonical scenario

Order commit survives a relay crash and the consumer receives the event twice.

### Integrated mechanism / state trace

Order and Outbox commit together; relay may publish before its acknowledgement; inbox and business effect commit together.

### Integrated evidence surface

Order/outbox rows, relay attempts, broker message ID, inbox row and ledger effect.

### Failure and debug loop

Commit without publish, ambiguous broker acknowledgement and repeated delivery.

### Shared assessment task

Given the transaction, relay log, broker metadata and two deliveries, choose recovery and prove one published intent and one local business effect.

| Primary capability | What evidence in this same task proves it |
|---|---|
| msg-outbox-db-publish-gap | Business/Outbox rows and relay/broker timeline prove the producer gap. |
| msg-consumer-idempotency-inbox | Message identity, inbox row and single ledger effect prove duplicate-safe consumption. |

### Transfer variation

Relay restart then duplicate reporting projection.

### Boundary decision

KEEP: one end-to-end incident proves producer gap and consumer duplicate safety with separate durable evidence.
## lu-obs-cardinality-sampling-cost

### Identity

- **Unit ID:** lu-obs-cardinality-sampling-cost
- **Working title:** Control telemetry cardinality and sampling cost
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-cardinality-sampling-cost | Observability & Performance | L3 |

### Canonical scenario

A checkout metric adds customer ID as a label and ingest cost rises faster than traffic.

### Integrated mechanism / state trace

Choose bounded dimensions and sampling rules; retain an error/slow trace representative enough to investigate.

### Integrated evidence surface

Series count, label values, ingest cost, sample rate and retained error traces.

### Failure and debug loop

A per-user label creates unbounded series or sampling removes the rare failing request.

### Shared assessment task

Given traffic, label and cost data, remove unsafe dimensions and set a sampling policy that preserves the failing class.

### Transfer variation

A new tenant dimension has high churn.

### Boundary decision

Cardinality controls retention cost and fidelity; instrumentation/tracing proves causal boundaries.

## lu-obs-instrumentation-tracing

### Identity

- **Unit ID:** lu-obs-instrumentation-tracing
- **Working title:** Reconstruct one operation across API, worker and downstream service
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-instrumentation-context | Observability & Performance | L3 |
| obs-tracing-distributed-evidence | Observability & Performance | L3 |

### Canonical scenario

An order API enqueues payment work, but the payment wait disappears after the worker boundary.

### Integrated mechanism / state trace

Create semantic spans and propagate operation context through HTTP and message metadata so the causal trace stays connected.

### Integrated evidence surface

Trace tree, parent/link relation, operation ID, headers/message metadata, dependency duration and retry attributes.

### Failure and debug loop

Worker context is lost, a span ends too early or downstream timing is detached from the initiating request.

### Shared assessment task

Given API, worker and payment traces plus instrumentation snippets, repair the missing propagation and show the complete causal path.

| Primary capability | What evidence in this same task proves it |
|---|---|
| obs-instrumentation-context | Instrumentation snippets plus propagated headers/message metadata establish the semantic boundary and operation identity. |
| obs-tracing-distributed-evidence | Trace tree, parent/link relation and downstream timing establish the reconstructed causal path. |

### Transfer variation

Replace the worker with a scheduled relay.

### Boundary decision

Context propagation establishes the trace boundary; trace evidence verifies the reconstructed path.

## lu-obs-latency-throughput-saturation

### Identity

- **Unit ID:** lu-obs-latency-throughput-saturation
- **Working title:** Read latency, throughput and saturation as one workload signal
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-latency-throughput-saturation | Observability & Performance | L2 |

### Canonical scenario

A service keeps its average latency stable while the queue and p99 grow during a traffic step.

### Integrated mechanism / state trace

Compare completed work, latency distribution, queueing and finite-capacity saturation before declaring the bottleneck.

### Integrated evidence surface

Request rate, p50/p95/p99, queue depth, concurrency, CPU and error rate.

### Failure and debug loop

An average hides tail latency or low CPU hides a saturated pool.

### Shared assessment task

Given a load chart, identify the saturation signal and explain why throughput alone is not success.

### Transfer variation

The same request rate moves from a queue-bound to CPU-bound path.

### Boundary decision

Workload symptoms differ from causal attribution of time to one dependency boundary.

## lu-obs-db-io-downstream-attribution

### Identity

- **Unit ID:** lu-obs-db-io-downstream-attribution
- **Working title:** Locate the timing boundary responsible for a slow request
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-db-io-downstream-attribution | Observability & Performance | L3 |

### Canonical scenario

Checkout p99 rises and the team blames SQL before comparing pool wait, query time and payment time.

### Integrated mechanism / state trace

Correlate end-to-end timing with DB, socket, queue and downstream intervals to identify the responsible boundary.

### Integrated evidence surface

Trace timing, query plan/duration, pool acquisition wait, socket timing, dependency duration and queue wait.

### Failure and debug loop

A pool wait is called database execution or a downstream timeout is called application CPU.

### Shared assessment task

Given trace, query and pool evidence, name the timing owner and the next discriminating check.

### Transfer variation

A fan-out request adds one slow remote dependency.

### Boundary decision

Attribution proves one causal timing boundary; L4 diagnosis tests competing hypotheses beyond that boundary.

## lu-obs-diagnostic-method

### Identity

- **Unit ID:** lu-obs-diagnostic-method
- **Working title:** Turn competing production hypotheses into discriminating evidence
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-diagnostic-method | Observability & Performance | L4 |

### Canonical scenario

A latency incident has plausible CPU, database, queue and downstream causes but only one change window.

### Integrated mechanism / state trace

State hypotheses, choose evidence that separates them, run a safe experiment and calibrate confidence.

### Integrated evidence surface

Hypothesis log, trace/profile/metric evidence, experiment result, before/after comparison and confidence statement.

### Failure and debug loop

Dashboard-first guessing, changing several variables or treating correlation as cause.

### Shared assessment task

Given competing incident hypotheses, choose the smallest experiment and defend the conclusion from the evidence.

### Transfer variation

The first experiment contradicts the leading hypothesis.

### Boundary decision

Diagnostic synthesis uses many evidence types; profiling is one evidence source.

## lu-obs-load-test-benchmark-validity

### Identity

- **Unit ID:** lu-obs-load-test-benchmark-validity
- **Working title:** Decide whether a performance claim is supported by a valid experiment
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-load-test-benchmark-validity | Observability & Performance | L3 |

### Canonical scenario

A benchmark reports high throughput from cold code and a tiny uniform dataset.

### Integrated mechanism / state trace

Match workload, warm-up, data distribution, generator capacity and bottleneck conditions to the claim.

### Integrated evidence surface

Workload model, arrival/concurrency, data distribution, warm-up, generator metrics and latency distribution.

### Failure and debug loop

A generator bottleneck or unrealistic data turns a measurement into a misleading claim.

### Shared assessment task

Given a benchmark plan and results, accept or reject the claim and name the missing validity evidence.

### Transfer variation

The production workload has bursty arrivals and skewed keys.

### Boundary decision

Benchmark validity governs experiment conditions; workload metrics are only inputs.

## lu-obs-logs-structured-correlation

### Identity

- **Unit ID:** lu-obs-logs-structured-correlation
- **Working title:** Make significant events queryable through structured correlated logs
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-logs-structured-correlation | Observability & Performance | L2 |

### Canonical scenario

Support needs to find one failed refund but the log contains only prose and inconsistent identifiers.

### Integrated mechanism / state trace

Emit stable event fields and correlation IDs at meaningful state transitions.

### Integrated evidence surface

Event schema, correlation ID, field types, query result, redaction decision and event volume.

### Failure and debug loop

String parsing, missing correlation, inconsistent field types or secret leakage prevent a reliable query.

### Shared assessment task

Given an incident question and log samples, design a stable event schema and retrieve the affected operation.

### Transfer variation

The event crosses a tenant boundary with redaction requirements.

### Boundary decision

Structured logging is one signal implementation; cross-signal selection is separate.

## lu-obs-signals-correlation

### Identity

- **Unit ID:** lu-obs-signals-correlation
- **Working title:** Choose the smallest signal set that answers an operational question
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-signals-correlation | Observability & Performance | L2 |

### Canonical scenario

A user journey is slow; metrics show a spike, logs show retries and traces show one dependency wait.

### Integrated mechanism / state trace

Select and correlate metrics, logs and traces around a question rather than collecting every signal.

### Integrated evidence surface

Metric dimensions/time, structured event fields, trace IDs and a joined request timeline.

### Failure and debug loop

A metric spike lacks context, logs cannot join or a trace is treated as business completion.

### Shared assessment task

Given an incident question and three signal sources, choose the minimum evidence set and justify the correlation.

### Transfer variation

One source is delayed or sampled.

### Boundary decision

Signal selection spans evidence types; log schema alone does not prove it.

## lu-obs-profiling-runtime-evidence

### Identity

- **Unit ID:** lu-obs-profiling-runtime-evidence
- **Working title:** Interpret runtime profiling evidence before optimizing
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-profiling-runtime-evidence | Observability & Performance | L3 |

### Canonical scenario

An export endpoint is slow and memory grows, but the suspected CPU hotspot is actually I/O wait.

### Integrated mechanism / state trace

Capture representative CPU, allocation, stack and wait evidence, then test the production hypothesis.

### Integrated evidence surface

CPU samples, allocations, GC data, stacks, ThreadPool queue and wait traces.

### Failure and debug loop

Optimizing without a profile or reading a non-representative capture as production truth.

### Shared assessment task

Given a capture and latency symptom, identify the dominant work or wait and propose a measured next change.

### Transfer variation

The same code runs under a different allocation rate.

### Boundary decision

Runtime diagnostics collects evidence; this unit interprets it for a production hypothesis.

## lu-rel-cascading-failure-queue-capacity

### Identity

- **Unit ID:** lu-rel-cascading-failure-queue-capacity
- **Working title:** Trace pressure propagation from one slow dependency across services
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-cascading-failure-queue-capacity | Reliability / SRE | L3 |

### Canonical scenario

A slow payment dependency increases in-flight work, queues and retries until upstream workers are exhausted.

### Integrated mechanism / state trace

Follow retained work and retry amplification across dependency/service boundaries under finite capacity.

### Integrated evidence surface

Dependency latency, queue age, in-flight work, retry rate, pool utilization and cross-service error timeline.

### Failure and debug loop

Long waits retain workers and retries multiply pressure upstream.

### Shared assessment task

Given a dependency slowdown timeline, identify the propagation path and the earliest containment point.

### Transfer variation

The dependency intermittently recovers while the queue remains old.

### Boundary decision

Cascades diagnose cross-service pressure; admission control and journey budgets use different state.

## lu-rel-overload-load-shedding-degradation

### Identity

- **Unit ID:** lu-rel-overload-load-shedding-degradation
- **Working title:** Protect critical work through explicit admission and degradation policy
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-overload-load-shedding-degradation | Reliability / SRE | L3 |

### Canonical scenario

Traffic exceeds sustainable capacity and the service must preserve checkout while shedding recommendations.

### Integrated mechanism / state trace

Choose accepted, deferred, rejected or degraded work at a finite-capacity boundary.

### Integrated evidence surface

Arrival/service rate, queue/in-flight counts, rejection reason, critical latency and user impact.

### Failure and debug loop

Accepting all work until OOM or shedding only after expensive work has consumed capacity.

### Shared assessment task

Given demand and priority classes, set an admission/degradation policy and prove critical work stays protected.

### Transfer variation

A batch job competes with interactive traffic.

### Boundary decision

Admission state differs from cascade propagation and SLI/SLO outcome policy.

## lu-rel-dependency-budgets

### Identity

- **Unit ID:** lu-rel-dependency-budgets
- **Working title:** Allocate one user journey deadline across dependencies and retries
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-dependency-budgets | Reliability / SRE | L3 |

### Canonical scenario

Checkout has an 800 ms promise, but nested retries let a downstream call outlive the caller.

### Integrated mechanism / state trace

Allocate remaining deadline, timeout and retry allowance per hop from the end-to-end budget.

### Integrated evidence surface

Remaining deadline, per-hop timeout, retry consumption, dependency latency and critical-path trace.

### Failure and debug loop

Nested retries exhaust the caller budget or an optional dependency blocks the critical path.

### Shared assessment task

Given a journey deadline and dependency timings, assign per-hop limits and reject an unsafe retry plan.

### Transfer variation

One optional dependency becomes best-effort.

### Boundary decision

Journey budget allocation differs from API retry mechanics and cascade diagnosis.

## lu-rel-user-journey-sli-slo-budget

### Identity

- **Unit ID:** lu-rel-user-journey-sli-slo-budget
- **Working title:** Define an SLI/SLO around a real user journey
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-user-journey-sli-slo-budget | Reliability / SRE | L3 |

### Canonical scenario

A service reports uptime while customers cannot complete refunds.

### Integrated mechanism / state trace

Define good/total events, window and error budget around the user-visible outcome.

### Integrated evidence surface

Denominator, success/latency events, time window, burn rate and excluded outcomes.

### Failure and debug loop

A wrong denominator or availability-only metric hides the failed journey.

### Shared assessment task

Given business events, define the SLI/SLO and calculate whether the budget supports a change.

### Transfer variation

A rare but high-value journey has different criticality.

### Boundary decision

SLI/SLO measurement is reusable foundation, not a rollout or incident command workflow.

## lu-release-rollout-rollback

### Identity

- **Unit ID:** lu-release-rollout-rollback
- **Working title:** Release a risky version progressively and recover safely
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-change-rollout-rollback-risk | Reliability / SRE | L3 |
| delivery-rollout-rollback-strategies | Containers / Kubernetes / Cloud Delivery | L3 |

### Canonical scenario

A new checkout version is exposed to 5 percent traffic and breaks a path hidden by aggregate health.

### Integrated mechanism / state trace

Combine progressive traffic/version mechanics with version-specific journey evidence and compatibility-aware rollback or roll-forward.

### Integrated evidence surface

Version/traffic split, deployment state, journey SLI, schema/config compatibility facts and recovery record.

### Failure and debug loop

A broad release expands blast radius or rollback conflicts with already-written state.

### Shared assessment task

Given canary evidence and compatibility state, choose rollout, rollback or roll-forward and prove the safe recovery.

| Primary capability | What evidence in this same task proves it |
|---|---|
| rel-change-rollout-rollback-risk | Version-specific journey evidence and compatibility boundary establish the risk decision. |
| delivery-rollout-rollback-strategies | Deployment/traffic state and recovery record establish rollout mechanics. |

### Transfer variation

A flag changes behavior without undoing a persisted side effect.

### Boundary decision

Risk policy and rollout mechanics form one release state machine and one recovery assessment.

## lu-rel-disaster-recovery-rpo-rto

### Identity

- **Unit ID:** lu-rel-disaster-recovery-rpo-rto
- **Working title:** Prove a recovery plan meets RPO and RTO
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-disaster-recovery-rpo-rto | Reliability / SRE | L3 |

### Canonical scenario

A regional failure requires restoring order history within two hours with at most five minutes of loss.

### Integrated mechanism / state trace

Translate business loss/time objectives into backup, restore, dependency and verification steps.

### Integrated evidence surface

Restore drill timing, recovered data delta, dependency checklist, integrity checks and declared objectives.

### Failure and debug loop

A backup exists but restore time or recovered point misses the business objective.

### Shared assessment task

Given RPO/RTO and drill evidence, decide whether the plan is acceptable and identify the failing step.

### Transfer variation

One dependency is managed by a cloud provider.

### Boundary decision

Business recovery objectives differ from backup, replication and provider-control mechanisms.

## lu-rel-failure-injection-verification

### Identity

- **Unit ID:** lu-rel-failure-injection-verification
- **Working title:** Run a bounded fault experiment with recovery proof
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-failure-injection-verification | Reliability / SRE | L4 |

### Canonical scenario

A team wants to verify retry behavior by injecting payment latency in production.

### Integrated mechanism / state trace

State a hypothesis, constrain blast radius, set stop conditions, inject one fault and verify recovery.

### Integrated evidence surface

Experiment plan, injected fault, SLI, stop condition, rollback/recovery evidence and audit timeline.

### Failure and debug loop

Uncontrolled chaos expands impact or recovery is assumed instead of measured.

### Shared assessment task

Given a reliability assumption, design the smallest safe fault test and define the evidence that passes it.

### Transfer variation

The fault is a dropped callback instead of latency.

### Boundary decision

Production-safe experiment design differs from general resilience testing and diagnosis.

## lu-rel-health-probes

### Identity

- **Unit ID:** lu-rel-health-probes
- **Working title:** Keep unsafe traffic out without restarting useful work
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-health-readiness-semantics | Reliability / SRE | L3 |
| delivery-probes-health | Containers / Kubernetes / Cloud Delivery | L3 |

### Canonical scenario

A dependency outage makes requests unsafe, but the process can still drain work and should not restart.

### Integrated mechanism / state trace

Define useful-progress and traffic-eligibility semantics, then configure probes so routing and restart actions follow that meaning.

### Integrated evidence surface

Dependency state, probe configuration/result, ready endpoints, restart count and traffic outcome.

### Failure and debug loop

Readiness wired as liveness creates a restart storm or routes traffic to an unsafe instance.

### Shared assessment task

Given the outage, choose health semantics and probe configuration, then prove traffic drains without destructive restarts.

| Primary capability | What evidence in this same task proves it |
|---|---|
| rel-health-readiness-semantics | Dependency state and useful-progress/traffic-eligibility decision establish health meaning. |
| delivery-probes-health | Probe configuration/result, ready endpoints, restart count and traffic outcome establish platform behavior. |

### Transfer variation

A worker has no inbound traffic but must report lease health.

### Boundary decision

Health meaning and probe behavior share one routing/restart state and outage assessment.

## lu-rel-incident-response-postmortem

### Identity

- **Unit ID:** lu-rel-incident-response-postmortem
- **Working title:** Mitigate an incident while preserving evidence and learning
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-incident-response-postmortem | Reliability / SRE | L3 |

### Canonical scenario

A payment outage is ongoing and a quick configuration change could erase the evidence needed to understand it.

### Integrated mechanism / state trace

Separate impact command, safe mitigation, evidence preservation and verified follow-up.

### Integrated evidence surface

Incident timeline, snapshots, mitigation actions, owner decisions, customer impact and follow-up verification.

### Failure and debug loop

Risky mitigation destroys evidence or blame replaces a system-learning action.

### Shared assessment task

Given an active incident timeline, choose the next mitigation and write the evidence-preserving follow-up.

### Transfer variation

The incident spans a third-party dependency.

### Boundary decision

Incident command workflow differs from diagnosis and SLI measurement.

## lu-delivery-artifact-provenance

### Identity

- **Unit ID:** lu-delivery-artifact-provenance
- **Working title:** Prove the exact artifact and configuration promoted to production
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-artifact-image-config | Containers / Kubernetes / Cloud Delivery | L2 |
| delivery-cicd-promotion-provenance | Containers / Kubernetes / Cloud Delivery | L3 |

### Canonical scenario

A production pod runs an image tag that cannot be tied confidently to a source commit or approved deployment.

### Integrated mechanism / state trace

Trace source commit to immutable image digest, config reference, approval and deployed identity.

### Integrated evidence surface

Git SHA, image digest, SBOM, config reference, approval record and deployment record.

### Failure and debug loop

Mutable tags or production rebuilds lose rollback identity and provenance.

### Shared assessment task

Given a deployment chain, accept or reject the artifact/config provenance before release.

| Primary capability | What evidence in this same task proves it |
|---|---|
| delivery-artifact-image-config | Digest, config reference and SBOM establish immutable artifact/config identity. |
| delivery-cicd-promotion-provenance | Build, approval and deployment records establish promotion provenance. |

### Transfer variation

A rollback selects an older immutable digest.

### Boundary decision

Artifact identity and promotion provenance are one trace from build to deployed state.

## lu-delivery-platform-evidence-debug

### Identity

- **Unit ID:** lu-delivery-platform-evidence-debug
- **Working title:** Localize a workload failure from platform evidence
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-platform-evidence-debug | Containers / Kubernetes / Cloud Delivery | L3 |

### Canonical scenario

A pod is Pending, then CrashLoops after a deployment, and the team must distinguish configuration, resource and probe causes.

### Integrated mechanism / state trace

Correlate workload state with scheduler events, exit reasons, resource status, mount/config and probe observations.

### Integrated evidence surface

Events, pod phase, exit reason, resource status, probe result, mount/config state and deployment revision.

### Failure and debug loop

Changing replicas before locating the failure makes a CrashLoop or OOM harder to diagnose.

### Shared assessment task

Given platform evidence, name the failure location and the next discriminating check.

### Transfer variation

The same workload fails only on one node class.

### Boundary decision

Diagnosis chooses among mechanism-specific inputs; lifecycle/resources/health need narrower controls.

## lu-delivery-autoscaling-signal-boundary

### Identity

- **Unit ID:** lu-delivery-autoscaling-signal-boundary
- **Working title:** Choose an autoscaling signal that matches real work pressure
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-autoscaling-signal-boundary | Containers / Kubernetes / Cloud Delivery | L3 |

### Canonical scenario

Replica count grows on CPU while a queue-backed worker falls further behind.

### Integrated mechanism / state trace

Relate signal, controller delay, replica response and downstream pressure before scaling.

### Integrated evidence surface

Scaling signal, target, replica history, queue/latency, controller events and downstream saturation.

### Failure and debug loop

More replicas cannot help a serialized downstream or a delayed signal reacts after overload.

### Shared assessment task

Given a workload trace, choose a scale signal and state the boundary where replicas stop helping.

### Transfer variation

The workload moves from request-driven to queue-driven.

### Boundary decision

Scaling is a control loop; resource limits and shedding are different controls.

## lu-delivery-resources-cpu-memory

### Identity

- **Unit ID:** lu-delivery-resources-cpu-memory
- **Working title:** Set CPU and memory requests/limits from workload evidence
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-resources-cpu-memory | Containers / Kubernetes / Cloud Delivery | L3 |

### Canonical scenario

A service is CPU-throttled under load and another is OOMKilled despite low average memory.

### Integrated mechanism / state trace

Map requests, limits, throttling and memory termination to observed runtime demand.

### Integrated evidence surface

Requests/limits, RSS, CPU throttling, OOM termination, GC/allocation and node placement.

### Failure and debug loop

Averaged metrics hide a short memory peak or too-low CPU limit creates latency.

### Shared assessment task

Given workload evidence, set resource boundaries and explain the expected throttle/OOM behavior.

### Transfer variation

A new batch changes memory burst shape.

### Boundary decision

Resource controls differ from replica-control-loop behavior.

## lu-delivery-platform-transfer

### Identity

- **Unit ID:** lu-delivery-platform-transfer
- **Working title:** Transfer a workload requirement across platform implementations
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-platform-transfer | Containers / Kubernetes / Cloud Delivery | L4 |

### Canonical scenario

The same service moves from one orchestration platform to another with equivalent delivery constraints.

### Integrated mechanism / state trace

Map artifact, resource, health, scaling and shutdown requirements to platform-specific primitives and evidence.

### Integrated evidence surface

Requirement mapping, platform configuration, observed behavior and trade-off record.

### Failure and debug loop

A familiar platform feature is chosen without proving the required behavior.

### Shared assessment task

Given requirements and two platforms, choose equivalent controls and defend the transfer evidence.

### Transfer variation

A platform lacks a direct probe or autoscaling primitive.

### Boundary decision

L4 transfer synthesizes foundations rather than replacing a mechanism assessment.

## lu-delivery-cloud-responsibility-managed-services

### Identity

- **Unit ID:** lu-delivery-cloud-responsibility-managed-services
- **Working title:** Verify application-team responsibility around managed services
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-cloud-responsibility-managed-services | Containers / Kubernetes / Cloud Delivery | L2 |

### Canonical scenario

A managed database incident reveals unclear ownership for IAM, quotas, backups and recovery verification.

### Integrated mechanism / state trace

Separate provider contract from application-team configuration, access, quota and recovery responsibilities.

### Integrated evidence surface

Service contract, IAM policy, quota settings, recovery verification and operational runbook.

### Failure and debug loop

Assuming managed means no application responsibility leaves access or recovery unverified.

### Shared assessment task

Given a managed-service incident, assign each responsibility and name the evidence that proves it is covered.

### Transfer variation

The provider changes a service tier or retention default.

### Boundary decision

Provider/application responsibility differs from DR, security and cross-platform transfer.

## lu-delivery-container-process-lifecycle

### Identity

- **Unit ID:** lu-delivery-container-process-lifecycle
- **Working title:** Reason about the primary process lifecycle inside a container
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-container-process-lifecycle | Containers / Kubernetes / Cloud Delivery | L2 |

### Canonical scenario

A container starts, its primary process exits and the platform repeatedly restarts it.

### Integrated mechanism / state trace

Treat the container as primary-process packaging/runtime boundary with explicit start, exit and restart state.

### Integrated evidence surface

Container state, process exit code, restart count, image command and startup logs.

### Failure and debug loop

A VM mental model hides a short-lived main process or restart policy behavior.

### Shared assessment task

Given startup and exit evidence, explain the lifecycle state and the next process-level fix.

### Transfer variation

The workload changes from a web process to a one-shot job.

### Boundary decision

Basic start/exit/restart state differs from traffic draining orchestration.

## lu-delivery-graceful-shutdown-draining

### Identity

- **Unit ID:** lu-delivery-graceful-shutdown-draining
- **Working title:** Drain traffic and finish bounded work before termination
- **Learner-facing domain candidate:** Production Engineering

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-graceful-shutdown-draining | Containers / Kubernetes / Cloud Delivery | L3 |

### Canonical scenario

A deployment terminates workers while requests and queued jobs are still active.

### Integrated mechanism / state trace

Remove traffic, receive termination, stop intake, finish or hand off active work, then exit within grace.

### Integrated evidence surface

Readiness state, termination signal, in-flight work, durable handoff, grace deadline and exit result.

### Failure and debug loop

Process exits before work is durable or receives traffic after shutdown begins.

### Shared assessment task

Given a termination timeline, design the drain sequence and prove no active work is silently lost.

### Transfer variation

A worker must hand off a leased job before its deadline.

### Boundary decision

Drain orchestration has traffic and durable-work state beyond basic container lifecycle.

## Stage 1E closure

Production Engineering is REVIEWED. The 15 approved historical decisions are materialized in the canonical registries and exactly 26 canonical unit bodies. The batch has 30 scoped Primaries, 22 singleton units, 4 multi-capability units and 2 multi-owner units. Dependency projection remains NOT FINALIZED. Architecture & Engineering Reasoning remains PENDING.
## lu-test-risk-strategy-boundaries

### Identity

- **Unit ID:** lu-test-risk-strategy-boundaries
- **Working title:** Choose the smallest trustworthy test boundary for a real mechanism at risk
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-risk-strategy-boundaries | Testing & Engineering Quality | L2 |
| test-unit-integration-contract | Testing & Engineering Quality | L3 |

### Canonical scenario

A database-backed business-rule change must preserve a transaction or constraint invariant while callers and providers evolve.

### Integrated mechanism / state trace

Risky assumption → identify the real database mechanism → locate the behavior boundary → choose unit, integration or contract evidence → state the blind spot.

### Integrated evidence surface

Risk statement, PostgreSQL transaction/constraint behavior, selected boundary, rejected alternatives, real rows or provider contract and explicit blind spots.

### Failure and debug loop

A mock removes SQL semantics, an E2E test hides localization, or a contract test misses local transaction state. Return to the risky mechanism and retest at the smallest boundary that contains it.

### Shared assessment task

State the invariant, identify PostgreSQL semantics, reject mocked/unit-only evidence, choose integration, compare unit/integration/contract scope and state what the chosen boundary cannot prove.

| Primary capability | What evidence in this same task proves it |
|---|---|
| test-risk-strategy-boundaries | Risk statement, real mechanism, selected boundary and rejected alternatives. |
| test-unit-integration-contract | Unit/integration/contract comparison and explicit blind spots. |

### Transfer variation

Pure deterministic rule → PostgreSQL transaction/constraint → independently deployed provider contract.

### Boundary decision

Risk selection precedes boundary comparison inside one assessment; fixture lifecycle and migration compatibility remain separate units.

## lu-test-ci-flakiness-repeatability

### Identity

- **Unit ID:** lu-test-ci-flakiness-repeatability
- **Working title:** Diagnose CI failure as product defect, environment dependency or nondeterministic test
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-ci-flakiness-repeatability | Testing & Engineering Quality | L3 |

### Canonical scenario

The same commit passes on one worker and fails on another after parallel test execution.

### Integrated mechanism / state trace

Repeat the verdict while controlling order, worker, environment, shared database/static state, ports and network; classify product defect versus test or environment instability.

### Integrated evidence surface

Repeat history, seed, test order, worker/environment, resource owner, timing and failure artefact.

### Failure and debug loop

Retry hides an unstable verdict, quarantine reduces protection, or shared state creates order dependence. Reproduce with the same seed and isolate the first changed state.

### Shared assessment task

Given a flaky CI failure, classify the cause, reproduce it with captured seed/order/worker evidence, and name the smallest safe containment without calling retry health.

### Transfer variation

Local stable run → constrained parallel workers → changed environment or dependency.

### Boundary decision

The unit diagnoses verdict repeatability; deterministic gates and real fixtures remain separate controls.

## lu-test-time-concurrency-determinism

### Identity

- **Unit ID:** lu-test-time-concurrency-determinism
- **Working title:** Reproduce interleaving and deadline behavior with controlled time and gates
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-time-concurrency-determinism | Testing & Engineering Quality | L3 |

### Canonical scenario

A timeout race passes locally but fails when a worker is slow.

### Integrated mechanism / state trace

Replace wall-clock luck with a controlled clock, barrier, scheduling point, task ownership and deterministic completion.

### Integrated evidence surface

Gate events, controlled clock, task completion, captured interleaving and repeated stable verdict.

### Failure and debug loop

Thread.Sleep makes a race probabilistic, an assertion runs before work completes, or shared mutable data leaks across tests. Inspect the trace and move control to the causal scheduling point.

### Shared assessment task

Construct a gate-controlled timeout/interleaving test, capture event order, and demonstrate repeatable failure followed by repeatable repair.

### Transfer variation

TTL expiry → concurrent update → cancellation/shutdown boundary.

### Boundary decision

Test-control mechanism is distinct from CI-wide flake diagnosis and production race semantics.

## lu-test-real-dependency-fixtures

### Identity

- **Unit ID:** lu-test-real-dependency-fixtures
- **Working title:** Use a disposable real dependency where engine or protocol semantics are at risk
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-real-dependency-fixtures | Testing & Engineering Quality | L3 |

### Canonical scenario

A repository mock reports success, but PostgreSQL constraint or broker redelivery behavior is the actual risk.

### Integrated mechanism / state trace

Provision a versioned disposable dependency, apply migration and seed, verify health, run the behavior, capture persisted/message result, then clean up isolated state.

### Integrated evidence surface

Dependency version, migration, seed, health, persisted row/message, isolation and cleanup result.

### Failure and debug loop

In-memory behavior drifts from PostgreSQL, a mock broker misses redelivery, or shared state leaks. Compare the real state and fixture lifecycle before changing the assertion.

### Shared assessment task

Build a disposable PostgreSQL or broker fixture for one risky behavior and record setup, health, result and cleanup evidence.

### Transfer variation

Mock repository → PostgreSQL → database plus broker fixture.

### Boundary decision

Fixture fidelity and lifecycle are separate from choosing the test family or testing an old/new migration matrix.

## lu-test-failure-resilience

### Identity

- **Unit ID:** lu-test-failure-resilience
- **Working title:** Verify outcome, durable state, retry/recovery and invariant under controlled failure
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-failure-resilience | Testing & Engineering Quality | L3 |

### Canonical scenario

A dependency times out during a business mutation and the test must prove the final state is safe.

### Integrated mechanism / state trace

Inject a known boundary failure → capture attempts and operation ID → inspect durable/audit state → recover → assert invariant and duplicate behavior.

### Integrated evidence surface

Injected fault, attempts, operation ID, persisted/audit state, response and recovery state.

### Failure and debug loop

Checking only an exception misses duplicate effects or partial writes. Trace state before and after recovery and verify the authority.

### Shared assessment task

Inject one dependency timeout or deadlock and prove response, durable state, retry policy and invariant after recovery.

### Transfer variation

HTTP timeout → broker redelivery → database deadlock retry.

### Boundary decision

Known-mechanism recovery evidence is distinct from SRE experiment policy and L4 risk transfer.

## lu-test-risk-transfer

### Identity

- **Unit ID:** lu-test-risk-transfer
- **Working title:** Adapt risk, boundary and falsifying fixture after architecture changes
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-risk-transfer | Testing & Engineering Quality | L4 |

### Canonical scenario

A monolith write becomes an event-fed projection and the old test shape misses eventual-consistency failure.

### Integrated mechanism / state trace

Changed architecture → derive invariant and risk → locate new boundary → design falsifying fixture → reject copied test shape → interpret evidence.

### Integrated evidence surface

Risk matrix, selected boundary, failing/passing fixture, real state and rejected alternative rationale.

### Failure and debug loop

Copying an old unit test leaves a projection race untested, a mock removes the new broker mechanism, or green E2E hides localization. Compare the new state path.

### Shared assessment task

Produce a new risk statement, boundary, fixture, expected failure and blind spot rather than copying the old test.

### Transfer variation

Monolith write → event/projection eventual consistency.

### Boundary decision

This L4 transfer adapts to a changed mechanism and should not gate known L3 recovery evidence.

## lu-test-migration-compatibility

### Identity

- **Unit ID:** lu-test-migration-compatibility
- **Working title:** Prove old/new app and schema/data/event contract coexist during rollout
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-migration-compatibility | Testing & Engineering Quality | L3 |

### Canonical scenario

An old application instance and a new schema version run together during a rolling deployment.

### Integrated mechanism / state trace

Old/new request, data and event representations coexist → compatibility matrix → migration → rollback attempt → verify each reader/writer.

### Integrated evidence surface

Old/new fixture, schema version, old data/event/request, migration result and rollback result.

### Failure and debug loop

A new reader runs before migration, an old writer cannot read new state, a destructive change blocks rollback or an old fixture fails. Reproduce the exact transition state.

### Shared assessment task

Run a compatibility matrix across old/new app and schema/event versions and prove migration plus rollback behavior.

### Transfer variation

Database migration → database plus API/event rolling migration.

### Boundary decision

Transitional compatibility is distinct from API policy, schema mechanism and disposable fixture lifecycle.

## lu-test-property-boundary-fuzz

### Identity

- **Unit ID:** lu-test-property-boundary-fuzz
- **Working title:** Falsify an invariant across generated and boundary input
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-property-boundary-fuzz | Testing & Engineering Quality | L3 |

### Canonical scenario

A parser or business rule must hold across malformed combinations and numeric boundaries not covered by examples.

### Integrated mechanism / state trace

State property → generate broad inputs → target boundary transitions → shrink failure → preserve seed and replay.

### Integrated evidence surface

Property, seed/input, boundary values, shrunk example and reproducible counterexample.

### Failure and debug loop

Weak property passes everything, seed is lost, or a rare sequence cannot be replayed. Shrink to the smallest violating transition and keep the seed.

### Shared assessment task

Define one invariant, generate boundary cases, capture a failing seed, shrink it and show the repaired case remains covered.

### Transfer variation

Numeric boundary → nested API/message payload.

### Boundary decision

Broad-input falsification needs its own generator/shrink/debug loop, not just invariant definition or risk selection.

## lu-test-review-static-analysis-change-safety

### Identity

- **Unit ID:** lu-test-review-static-analysis-change-safety
- **Working title:** Combine review, compiler, analyzer and targeted tests as change evidence
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-review-static-analysis-change-safety | Testing & Engineering Quality | L3 |

### Canonical scenario

A broad refactor changes a public contract and must be checked before runtime.

### Integrated mechanism / state trace

Diff intent → review boundary → compiler/analyzer findings → targeted dynamic regression → before/after comparison.

### Integrated evidence surface

Diff, review rationale, analyzer output, invariant/contract, regression result and before/after evidence.

### Failure and debug loop

Style-only review, unexplained suppression, AI diff accepted green or tests asserting the old requirement; trace the changed contract and add targeted evidence.

### Shared assessment task

Review one cross-boundary change, explain the risk, inspect static evidence and run the smallest regression that proves changed behavior.

### Transfer variation

Hand patch → broad automated refactor across boundaries.

### Boundary decision

Complementary static/dynamic evidence is distinct from risk selection and API migration semantics.
## lu-arch-requirements-quality-attributes

### Identity

- **Unit ID:** lu-arch-requirements-quality-attributes
- **Working title:** Turn a vague request into measurable quality scenarios and constraints
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-requirements-quality-attributes | Architecture & System Design | L3 |

### Canonical scenario

A request for a new service says fast and highly available but gives no traffic, data or failure assumptions.

### Integrated mechanism / state trace

Vague request → functional need → quality-attribute scenario → traffic/data estimate → constraint and assumption register.

### Integrated evidence surface

Requirement list, quality scenario, traffic/data estimate, scale/constraint and assumption register.

### Failure and debug loop

Technology-first design, imagined hyperscale or hidden conflicting qualities appears when assumptions are made explicit; return to the request and quantify the disputed constraint.

### Shared assessment task

Rewrite the request as measurable scenarios with estimates, constraints, conflicts and assumptions before selecting a design.

### Transfer variation

Internal 100 users → burst, SLO and compliance external workload.

### Boundary decision

Foundation framing is reusable input; it is not repeated as a hidden gate in every mechanism unit.

## lu-arch-boundaries-data-ownership

### Identity

- **Unit ID:** lu-arch-boundaries-data-ownership
- **Working title:** Choose authority boundary and classify derived copies
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-boundaries-ownership | Architecture & System Design | L3 |
| arch-data-ownership-source-of-truth | Architecture & System Design | L3 |

### Canonical scenario

Order state is authoritative in one service/database while Redis, search and analytics contain derived copies.

### Integrated mechanism / state trace

Invariant/state → owner and authorized write path → explicit boundary contract → derived-copy update/read → freshness, rebuild and reconciliation.

### Integrated evidence surface

Invariant, state owner, write paths, contract crossings, deployment owner, source version, copy role, freshness, rebuild source and reconciliation.

### Failure and debug loop

Shared database mutation or a projection accepting business writes creates two authorities; trace the invariant and write owner before debugging stale or unrebuildable copies.

### Shared assessment task

Identify the invariant owner, legal transitions and contracts, classify every copy and provide freshness, rebuild and reconciliation evidence.

| Primary capability | What evidence in this same task proves it |
|---|---|
| arch-boundaries-ownership | Invariant, authorized transition path, owner, contract crossings and deployment responsibility. |
| arch-data-ownership-source-of-truth | Authoritative write path, derived-copy role, freshness, rebuild source and reconciliation. |

### Transfer variation

Replace Redis/search with an event-fed projection or read replica and reassess authority, lag and rebuild.

### Boundary decision

Boundary ownership is the internal first step; source-of-truth reasoning is assessed next in the same Order trace.

## lu-arch-failure-recovery-security-observability

### Identity

- **Unit ID:** lu-arch-failure-recovery-security-observability
- **Working title:** Evaluate a design under failure, recovery, trust and evidence constraints
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-failure-recovery-security-observability | Architecture & System Design | L4 |

### Canonical scenario

An already-designed payment boundary must remain diagnosable and recoverable when a dependency fails or an untrusted caller reaches it.

### Integrated mechanism / state trace

Normal boundary → independent failure → recovery owner/state → trust boundary → telemetry/correlation path → user-impact decision.

### Integrated evidence surface

Failure table, recovery owner, data flow, trust path, telemetry path, operation ID and RPO/RTO/SLO evidence.

### Failure and debug loop

No timeout or recovery owner, uncorrelated async work, dependency collapse or unmodelled trust path; trace the transition and assign owner/evidence.

### Shared assessment task

Review one boundary under failure, recovery, trust and observability constraints and state the repair owner and evidence path.

### Transfer variation

Normal dependency → outage, security or recovery case.

### Boundary decision

L4 synthesis is separate so it does not over-gate L3 authority or integration choices.

## lu-arch-consistency-latency-availability

### Identity

- **Unit ID:** lu-arch-consistency-latency-availability
- **Working title:** Choose strong guarantee or stale view from invariant and failure assumptions
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-consistency-latency-availability | Architecture & System Design | L4 |

### Canonical scenario

A catalog view may be stale, but inventory reservation must not violate its business invariant.

### Integrated mechanism / state trace

Invariant plus failure assumption → required visibility/order → allowed stale window → coordination cost → latency/availability impact → reconciliation.

### Integrated evidence surface

Invariant, read/write history, source/replica role, stale window, SLO, failure assumption and reconciliation path.

### Failure and debug loop

Eventual consistency is used for an atomic invariant, strong coordination is wasted on a report, or stale window is undefined; replay the history and quantify the trade-off.

### Shared assessment task

Choose guarantees for catalog and reservation, state stale windows, coordination cost, failure impact and reconciliation.

### Transfer variation

Catalog projection → balance or inventory reservation.

### Boundary decision

Architecture chooses where guarantees are required; Distributed Systems owns underlying consistency mechanics.

## lu-arch-cost-complexity-changeability

### Identity

- **Unit ID:** lu-arch-cost-complexity-changeability
- **Working title:** Reject lifecycle cost that exceeds the property bought and record why
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-cost-complexity-changeability | Architecture & System Design | L4 |
| arch-decision-communication-transfer | Architecture & System Design | L4 |

### Canonical scenario

A modular monolith is proposed for microservice extraction to gain independent payment deployment.

### Integrated mechanism / state trace

Required property → alternatives → deployment/ownership/incident/data/latency/skills/cloud cost → decision → ADR and revisit trigger.

### Integrated evidence surface

Property and estimates, option comparison, component/owner burden, cost/latency evidence, ADR context, constraints, consequences, evidence and measurable revisit trigger.

### Failure and debug loop

Résumé-driven Kafka/Kubernetes, hidden incident burden or stale ADR; replay assumptions and compare the measured trigger before changing architecture.

### Shared assessment task

Identify the property, compare modular extraction/internal module/microservice, estimate lifecycle costs, choose or reject, and record ADR plus measurable revisit trigger.

| Primary capability | What evidence in this same task proves it |
|---|---|
| arch-cost-complexity-changeability | Lifecycle-cost comparison against the required property. |
| arch-decision-communication-transfer | ADR context, assumptions, alternatives, consequences, evidence and revisit trigger. |

### Transfer variation

Change team ownership, deployment independence or latency budget and revise the decision.

### Boundary decision

Both Primaries retain their historical multi-unit; the graph relation between them is RECOMMENDED, not an invented REQUIRED edge.

## lu-arch-evolution-migration-strangler

### Identity

- **Unit ID:** lu-arch-evolution-migration-strangler
- **Working title:** Move an old path to a target while coexistence remains safe
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-evolution-migration-strangler | Architecture & System Design | L3 |

### Canonical scenario

A legacy order module must move to a service without a big-bang cutover.

### Integrated mechanism / state trace

Old owner/path → migration seam → partial routing/coexistence → comparison/reconciliation → rollback → retire old path.

### Integrated evidence surface

Traffic split, old/new result comparison, compatibility, migration progress, reconciliation and rollback evidence.

### Failure and debug loop

Dual-write divergence, leaked traffic, incompatible readers, impossible rollback or permanent seam; compare paths and stop at the last safe cohort.

### Shared assessment task

Design a staged strangler migration with seam, cohort, compatibility, comparison, rollback and retirement criteria.

### Transfer variation

Legacy module → independently deployed service or old datastore → new live path.

### Boundary decision

Migration-state evidence differs from steady-state ownership, source-of-truth mapping and ADR economics.

## lu-arch-scale-capacity-partitioning

### Identity

- **Unit ID:** lu-arch-scale-capacity-partitioning
- **Working title:** Estimate bottleneck and choose a scale or partition boundary from demand
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-scale-capacity-partitioning | Architecture & System Design | L3 |

### Canonical scenario

Traffic grows until latency rises while the database remains the shared bottleneck.

### Integrated mechanism / state trace

Measured demand → identify actual bottleneck → estimate capacity → choose replica/partition boundary → detect shared bottleneck that blocks scale-out.

### Integrated evidence surface

Rate, concurrency, CPU/memory, downstream capacity, key distribution, queue and latency.

### Failure and debug loop

Adding replicas while the database is saturated, sharding without access pattern, skew or late autoscale; correlate saturation with the proposed boundary.

### Shared assessment task

Use workload numbers to find the bottleneck, compare replication and partitioning, and state capacity evidence and the shared limit.

### Transfer variation

Service/DB → replicas → sharded ownership after the bottleneck is measured.

### Boundary decision

Architecture chooses structural scale; Observability and Distributed Systems retain measurement and partition ownership mechanisms.

## lu-arch-sync-async-integration

### Identity

- **Unit ID:** lu-arch-sync-async-integration
- **Working title:** Choose sync or async from coupling, completion and recovery
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capabilities

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-sync-async-integration | Architecture & System Design | L3 |

### Canonical scenario

An order API must decide whether payment completion is part of the response or a tracked operation.

### Integrated mechanism / state trace

Required completion semantics → caller coupling/lifetime → latency → operation state → recovery model → sync or async choice.

### Integrated evidence surface

Required response, critical path, availability, timeout, operation state, queue/lag, retry and recovery evidence.

### Failure and debug loop

Async is selected only for a speed slogan, a long workflow blocks callers, immediate answer is promised via an event, or async has no status; trace the caller and durable operation state.

### Shared assessment task

Compare sync payment authorization with async fulfillment, state completion semantics, operation state, failure/recovery and the chosen boundary.

### Transfer variation

Inventory lookup → order/payment fulfillment.

### Boundary decision

HTTP and broker mechanics remain external/local prerequisite slices; Architecture decides the integration style.

## Stage 1F closure

**REVIEWED.** Architecture & Engineering Reasoning is REVIEWED. Stage-1 Learning-Unit semantic decomposition is now complete. Dependency and progression projection remain NOT FINALIZED and are not started by this mutation.
