# QuanNet Learning-Unit Map — Stage 1

> **Status:** DRAFT — Stage 1 Primary-boundary architecture review required.
> **Frozen input SHA:** `771f6541872adceb52786387006059e2059df6a8`.

Frozen capabilities: 163. Proposed Learning Units: 102. Singleton units: 67. Multi-capability units: 35. Single-owner units: 102. Multi-owner units: 0.

File order is **not** curriculum order. REQUIRED/RECOMMENDED projection is **not finalized** in Stage 1.

## Unit Registry

| Unit ID | Working title | Domain candidate | Primary owner set | Primary capability count |
|---|---|---|---|---:|
| lu-race-atomicity | Protect an invariant across unsafe interleaving | Runtime & Concurrency | Concurrency & Async | 3 |
| lu-outbox-duplicate-safe-effect | Persist producer intent and make consumer effect duplicate-safe | Distributed Systems | Messaging & Event-Driven Consistency | 2 |
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
| lu-net-connection-reuse-pooling | Giải thích vì sao client pool/reuse connection và nhận ra giới hạn socket/port hoặc stale connection assumptions | Service & Network | Networking & HTTP | 2 |
| lu-net-failure-localization-unknown-outcome | Tách DNS, connection, TLS, HTTP response và timeout có thể đã tới server để chọn recovery an toàn | Service & Network | Networking & HTTP | 4 |
| lu-net-proxy-lb-forwarded-boundary | Xác định trust boundary client → proxy/LB → application, đặc biệt với forwarded headers | Service & Network | Networking & HTTP | 1 |
| lu-net-streaming-body-cancellation | Quản lý body lifetime và cancellation khi dữ liệu đang transfer để không buffer vô ích hoặc tiếp tục work sau disconnect | Service & Network | Networking & HTTP | 1 |
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

## Stage 1A — Runtime & Concurrency closure record

This batch is **REVIEWED**. Canonical unit sections and audit registries hold the final evidence and membership; this record is not a second registry.

Stage 1 remains DRAFT: every other domain batch is pending and REQUIRED/RECOMMENDED projection is not finalized.