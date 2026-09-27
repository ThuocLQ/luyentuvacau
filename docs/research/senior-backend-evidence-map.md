# QuanNet Senior Backend Evidence Map

> Draft research foundation — Phase 2, Step 1.

Research date: 2026-09-27
Scope: evidence for why and how deep a future Senior Backend curriculum should go. This is not a roadmap, lesson plan, dependency map, case bank, UI design, or data model.

## Decision rules

- Phase 1 learner semantics are frozen. Technical evidence remains L1–L4; English remains separate at E1–E4.
- Index, Race Condition, and Outbox are pilots, not proof of Senior-core coverage.
- Depth follows mechanism risk, production failure cost, and transfer value—not popularity.
- Teach the portable mechanism once, implement deeply in .NET, then transfer to Java/JVM and identify only material deltas.
- Hours are curriculum-planning estimates for deliberate study/evidence work, not scientific measurements.

## Source hierarchy and baseline

| Role | Authoritative sources | Purpose |
|---|---|---|
| Fundamental | [CMU 15-445/645](https://15445.courses.cs.cmu.edu/fall2026/schedule.html), [MIT 6.5840](https://pdos.csail.mit.edu/6.824/schedule.html), [Stanford CS144](https://web.stanford.edu/class/cs144/), [Berkeley CS162](https://cs162.org/) | Storage, query execution, concurrency, RPC, replication, consensus, OS and networking mechanisms. |
| Product | [PostgreSQL 18.6](https://www.postgresql.org/docs/current/), [.NET lifecycle](https://learn.microsoft.com/en-us/dotnet/core/releases-and-support), [JEP 444](https://openjdk.org/jeps/444), [Spring](https://docs.spring.io/spring-framework/reference/), [Kafka](https://kafka.apache.org/documentation/), [Redis](https://redis.io/docs/latest/), [MongoDB](https://www.mongodb.com/docs/), [Kubernetes](https://kubernetes.io/docs/), [OpenTelemetry](https://opentelemetry.io/docs/), [OWASP API Security](https://api-security.owasp.org/) | Product/version truth at lesson authoring. |
| Production | [Google SRE](https://sre.google/sre-book/), [AWS Builders' Library](https://aws.amazon.com/builders-library/), [Software Engineering at Google](https://abseil.io/resources/swe-book) | Failure classes and operating practice. |
| Hiring | [Microsoft](https://careers.microsoft.com/v2/global/en/hiring-tips/technical-interviewing), [Amazon SDE II](https://www.amazon.jobs/content/en/how-we-hire/sde-ii-interview-prep) | Interview signal only, not curriculum truth. |
| Context only | [Stack Overflow 2025](https://survey.stackoverflow.co/2025/technology), [CNCF](https://www.cncf.io/reports/), [DORA](https://dora.dev/research/) | Prioritization only, never mechanism truth. |

### Version boundaries

- PostgreSQL primary lab is 18.6; PostgreSQL 19 is development/beta at this research date.
- .NET primary lane is .NET 10 LTS, supported through November 2028.
- Java transfer boundary: Java 25 LTS; Java 27 current release; Virtual Threads finalized in JDK 21. They do not change race correctness.
- Re-check Spring, Kafka, Kubernetes, Redis, MongoDB, Cassandra and OpenTelemetry for every lesson; this map does not freeze vendor configurations.

## Senior-core exit model

L1 understand mechanism → L2 apply canonical case → L3 debug from evidence → L4 reason about trade-off and transfer → explain clearly. Technical communication is language-neutral; English evidence is separately measured.

Every eventual track needs an observable mechanism, a controlled failure, an evidence/debug direction, and a changed-condition transfer. Reading content is never exit evidence.

## Portfolio classification

| Track | Depth class | Status tags | Hours |
|---|---|---|---:|
| Programming & Runtime | MUST MASTER | EVERGREEN FOUNDATION; IMPLEMENTATION-SPECIFIC CURRENT | 18–28 |
| Concurrency & Async | MUST MASTER DEEP | EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY | 28–42 |
| Networking & HTTP | MUST MASTER | EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY | 20–30 |
| Relational Database | MUST MASTER DEEP | EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY | 36–54 |
| NoSQL & Specialized Data | SHOULD MASTER / TRANSFER | CURRENT PRODUCTION REALITY | 22–34 |
| Distributed Systems | MUST MASTER DEEP | EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY | 36–54 |
| Messaging & Data Consistency | MUST MASTER | EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY | 26–40 |
| Cache Engineering | MUST MASTER | EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY | 18–28 |
| API & Resilience | MUST MASTER | EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY | 22–34 |
| Security | MUST MASTER | EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY | 24–38 |
| Observability & Performance | MUST MASTER | EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY | 22–34 |
| Reliability / SRE | MUST MASTER | EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY | 20–32 |
| Testing & Engineering Quality | MUST MASTER | EVERGREEN FOUNDATION | 20–30 |
| Architecture & System Design | MUST MASTER | EVERGREEN FOUNDATION; INTERVIEW OVERLAY | 26–40 |
| Containers / Kubernetes / Delivery | SHOULD MASTER / TRANSFER | CURRENT PRODUCTION REALITY; IMPLEMENTATION-SPECIFIC CURRENT | 22–34 |
| .NET / CLR / ASP.NET Core | MUST MASTER | IMPLEMENTATION-SPECIFIC CURRENT | 30–46 |
| JVM / Java / Spring | SHOULD MASTER / TRANSFER | IMPLEMENTATION-SPECIFIC CURRENT | 24–38 |
| Big-Tech Coding / Interview | INTERVIEW OVERLAY | INTERVIEW OVERLAY | 18–30 |
| AI-assisted Engineering | CURRENT EXPANSION | EMERGING / WATCH | 10–18 |

**Total before overlap removal: 422–652 focused hours.** A future dependency map must remove duplicate mechanism teaching before a unique-path estimate is claimed.

## Track evidence

Each row states why/evidence; capabilities; failure → symptom → evidence; primary lab and transfer; non-goals; exit evidence; open question.

### 1. Programming & Runtime Principles — MUST MASTER
Why: senior debugging separates code from runtime behavior; CS162 plus .NET/JVM product sources. Capabilities: process/thread boundary, allocation, GC/JIT, blocking vs async I/O, cancellation and ownership. Failure: allocation/retention or blocking request path → latency/memory growth → counters, dump, retaining path, ThreadPool metrics. Lab: .NET 10 minimal API plus diagnostics; transfer to JVM heap/GC/JIT. Non-goals: writing GC or memorizing collectors. Exit: choose evidence before a bounded runtime fix. Open: minimum local diagnostics setup.

### 2. Concurrency & Async — MUST MASTER DEEP
Why: CMU concurrency and MIT RPC/threads show interleavings are fundamental. Capabilities: invariant, atomicity, lost update, check-then-act, lock scope, cancellation, bounded concurrency, backpressure, sync-over-async, local vs distributed state. Failure: lost update/deadlock/starvation/local lock across instances → duplicate/stall/latency → trace, wait graph, runtime/database evidence. Lab: Task, SemaphoreSlim/Channel, optimistic concurrency; transfer to JMM, atomics, executors, CompletableFuture, Virtual Threads. Non-goals: lock-free research. Exit: L4 explains invariant/interleaving/evidence/multi-instance boundary. Open: one inspectable cross-runtime race.

### 3. Networking & HTTP — MUST MASTER
Why: CS144 and official HTTP/TLS sources explain layers beneath APIs; first-party hiring guidance names HTTP/TLS/TCP/IP. Capabilities: DNS/TCP/TLS/HTTP boundaries, connection reuse, timeout budget, streaming, proxy/load-balancer boundary, retry safety. Failure: ambiguous timeout, connection exhaustion, unsafe retry, untrusted forwarded header → trace/socket-pool/audit evidence. Lab: ASP.NET Core + HttpClientFactory delay/cancellation; transfer to Spring WebClient. Non-goals: implementing TCP or status-code trivia. Exit: trace request and justify timeout/retry ownership. Open: safe local proxy/TLS lab.

### 4. Relational Database Engineering — MUST MASTER DEEP
Why: CMU covers storage through recovery; PostgreSQL covers indexes, concurrency, monitoring, WAL and HA. Capabilities: constraints, query shape, plans, selectivity, transactions/isolation, locks/MVCC, migration/recovery. Failure: indexed-but-slow query, wrong composite order, skew/stale stats, deadlock/anomaly, migration under traffic → EXPLAIN ANALYZE/BUFFERS, estimate/actual, lock/activity and rollout evidence. Lab: PostgreSQL 18 SQL with EF Core/Dapper. Transfer boundary: PostgreSQL heap/MVCC differs materially from SQL Server clustered layout, InnoDB and Oracle consistency. Non-goals: parallel vendor tutorials/DBA catalog. Exit: debug plan or transaction evidence and justify trade-off. Open: realistic inspectable skew data.

### 5. NoSQL & Specialized Data Systems — SHOULD MASTER / TRANSFER
Why: a senior must choose a data model for access pattern and consistency boundary, not say NoSQL as one thing. Capabilities: document modelling, LSM/wide-column partition thinking, key-value latency/eviction, inverted-index search semantics. Failure: unbounded document, hot partition, wrong consistency/read assumption, eviction, relevance treated as relational correctness → model/partition/eviction/query evidence. Lab: MongoDB document model, Cassandra partition-design simulation, Redis data structures, Elasticsearch/OpenSearch-style inverted-index mental model. Non-goals: operate all four in depth or treat them as relational substitutes. Exit: reject a mismatched storage choice and transfer access-pattern reasoning. Open: which search engine is practical for local labs.

### 6. Distributed Systems — MUST MASTER DEEP
Why: MIT 6.5840 includes RPC, Raft, linearizability, transactions, Spanner, chain replication and sharded KV. Capabilities: partial failure, replication, consistency boundary, quorum/leader concepts, partitioning, coordination and time uncertainty. Failure: timeout ambiguity, stale replica, leader unavailable, retry amplification, coordination bottleneck, clock assumption → correlation trace, replica/leader state, lag and load evidence. Lab: multi-process .NET key-value/order simulation; transfer to Java service design. Non-goals: implementing Raft/Paxos or claiming CAP is a design recipe. Exit: state guarantees, unknowns, evidence and recovery under a changed topology. Open: minimal simulation with visible state.

### 7. Messaging & Data Consistency — MUST MASTER
Why: Kafka and production sources make delivery, replay and side effects core backend concerns. Capabilities: producer/consumer boundary, idempotency, ordering scope, retries, offset/ack timing, outbox/inbox, reconciliation. Failure: duplicate delivery, poison message, premature commit, rebalance, retry storm, DB-publish gap, external unknown outcome → message metadata, consumer ledger, broker/client contract and audit evidence. Lab: PostgreSQL outbox + local broker/Kafka-style flow; transfer to RabbitMQ semantics only where delivery/ack differs. Non-goals: promise exactly-once as universal outcome or memorize broker configuration. Exit: prove one local effect under duplicate/replay and explain recovery. Open: select broker fixture.

### 8. Cache Engineering — MUST MASTER
Why: caching changes correctness and failure behavior, not merely speed. Capabilities: source of truth, cache-aside, invalidation, TTL, stampede, hot key, penetration, replica lag and fallback. Failure: synchronized expiry/stale data/cache outage → hit rate, key distribution, origin load, age/version evidence. Lab: Redis cache-aside around PostgreSQL source of truth; transfer to in-process/CDN cache boundaries. Non-goals: cache every read or treat cache as authoritative. Exit: design failure-safe invalidation/fallback and explain changed workload. Open: cache metrics contract.

### 9. API & Resilience — MUST MASTER
Why: API boundary is where retries, timeouts, idempotency and overload become customer-visible. Capabilities: contract/versioning, validation, authorization boundary, idempotency key, timeout/retry/backoff/jitter, circuit/load shedding, rate/size limits. Failure: retry duplicates operation, retry storm, cascading timeout, ambiguous outcome → traces, idempotency record, saturation and downstream evidence. Lab: ASP.NET Core API + downstream stub + persistent idempotency/reconciliation. Transfer: Spring controller/filter/resilience libraries do not change contract reasoning. Non-goals: universal retry recipe. Exit: justify a policy from side-effect and failure contract. Open: common error taxonomy.

### 10. Security — MUST MASTER
Why: OWASP API Security captures realistic authorization and abuse boundaries. Capabilities: authentication vs authorization, object/function/property authorization, tenant boundary, input/output validation, secrets, SSRF, injection, abuse controls and audit trail. Failure: BOLA, brute force, resource/business-flow abuse, SQL/NoSQL injection, SSRF, race abuse, unsafe third-party trust → authorization decision/audit/log/request evidence. Lab: ASP.NET Core policy/claim + tenant/resource test suite and hostile requests. Transfer: Spring Security filters/annotations and data access differ, principle does not. Non-goals: cryptography implementation, broad pentest curriculum. Exit: demonstrate exploit path, evidence and layered fix. Open: safe SSRF lab boundaries.

### 11. Observability & Performance — MUST MASTER
Why: OTel/SRE support traces, metrics, logs and context propagation. Failures: missing context, high-cardinality cost, p99 hidden by average, sampled-away root cause; evidence is trace/log/metric correlation and profiles. Lab: OTel-instrumented .NET API; transfer to Java agent/SDK. Non-goal: dashboard decoration or one vendor. Exit: choose discriminating evidence before concluding. Open: low-cost local telemetry stack.

### 12. Reliability / SRE — MUST MASTER
Why: Google SRE/AWS support SLI/SLO, overload, capacity, degradation, incident and rollback reasoning. Failures: cascading failure, queue growth, bad retry, failed restore; evidence is saturation/latency/error/queue/recovery signal. Lab: controlled downstream failure and runbook; transfer across deploy targets. Non-goal: ceremony or availability promise. Exit: reduce blast radius and state recovery evidence. Open: safe load-generator limit.

### 13. Testing & Engineering Quality — MUST MASTER
Why: Software Engineering at Google grounds deterministic unit/integration/contract/property testing, review and change safety. Failures: flake, mock-hidden contract break, migration release failure; evidence is repeatability and real-boundary test. Lab: .NET order/outbox suite; transfer to JUnit/Testcontainers. Non-goal: coverage percentage as quality. Exit: choose smallest test that can falsify the risky assumption. Open: repository fixture standard.

### 14. Architecture & System Design — MUST MASTER
Why: hiring signal validates design relevance; core mechanisms prevent diagram-only answers. Failures: shared DB coupling, unclear source of truth, synchronous chain, unbounded fanout; evidence is dependency/data/latency path. Lab: evolving order/payment design; transfer to unfamiliar domain. Non-goal: memorized templates or hyperscale theatre. Exit: state requirements, unknowns, options, decision and recovery. Open: common scenario vocabulary without a case bank.

### 15. Containers / Kubernetes / Delivery — SHOULD MASTER / TRANSFER
Why: Kubernetes docs establish pod lifecycle, probes, requests/limits, termination, rollout/rollback and autoscaling. Failures: liveness cascade, readiness error, OOM/CPU throttle, dropped work, capacity loss; evidence is events, probe/resource state, logs and rollout history. Lab: .NET API/worker on local Kubernetes; transfer to Spring/managed cluster. Non-goal: cluster administration. Exit: explain lifecycle mismatch and safe rollout/rollback. Open: Windows-friendly local cluster.

## Implementation lanes and overlays

### 16. .NET / CLR / ASP.NET Core — MUST MASTER
Primary deep lane: CLR allocation/GC/LOH, JIT, Task/async-await, ThreadPool starvation, request pipeline, DI lifetime, EF Core/Dapper, HttpClientFactory and diagnostics. Evidence is a runnable service, not framework trivia. Do not present a .NET convention as a portable principle. Open: a stable .NET 10 diagnostics baseline.

### 17. JVM / Java / Spring — SHOULD MASTER / TRANSFER
Deep only material deltas: JVM/bytecode/JIT, heap/GC, Java Memory Model, synchronized/volatile/atomics, executors/CompletableFuture/Virtual Threads, Spring IoC/proxy/AOP, transaction-proxy boundary, Hibernate persistence-context/proxies. Do not conflate Java, JVM, Spring Framework, Spring Boot, JPA and Hibernate. Exit: explain a .NET-to-Java delta without losing the portable mechanism. Open: which Spring transaction/proxy cases deserve a runnable transfer lab.

### 18. Big-Tech Coding / Interview — INTERVIEW OVERLAY
Use hiring sources as relevance signal. Practice constraint clarification, invariant/complexity, tests, trade-offs and follow-ups with evidence-first cards tied to core tracks. Do not target problem count or bypass foundations. Exit: solve/explain an unfamiliar bounded problem with assumptions and tests. Open: a rubric that preserves the separate English axis.

### 19. AI-assisted Engineering — CURRENT EXPANSION
Verify generated code/claims, constrain context, protect secrets, write tests, inspect diffs and catch hallucinated APIs/dependency confusion. Lab: accept/reject a generated patch with official docs, tests and review evidence. Do not teach prompt tricks or treat output as authority. Open: sensitive-context policy.

## Cross-vendor and cross-stack boundaries

- **Relational:** portable query/isolation/recovery first; PostgreSQL 18 primary lab; compare SQL Server, MySQL/InnoDB and Oracle only where physical layout, secondary indexes, MVCC/read consistency, locking, plans, identity or online DDL changes reasoning.
- **NoSQL:** MongoDB teaches document-model boundary; Cassandra partition/LSM/wide-column thinking; Redis key-value/in-memory/eviction; Elasticsearch/OpenSearch-style systems inverted-index search. They are not one NoSQL category.
- **Messaging:** do not copy Kafka ordering/offset semantics into RabbitMQ; use broker-specific sources when delivery contract changes.
- **Runtime/web:** cancellation, ownership and HTTP boundaries are portable first; .NET and JVM/Spring are explicit transfer deltas.

## Assumptions rejected and deferred questions

- Popularity does not make a topic core; trend reports are context-only.
- Kubernetes is important but remains SHOULD MASTER / TRANSFER: it does not outrank concurrency, relational database or distributed-systems mechanisms.
- Virtual Threads do not remove backpressure, bounded concurrency, synchronization or distributed correctness.
- AI assistance never substitutes for testing, debugging, architecture, security or database reasoning.

Deferred to later steps: final lesson order/prerequisite graph; canonical scenario inventory and assessment variants; lab fixture/broker/local-Kubernetes details; unique-path hours after overlap removal; retention-policy versioning (explicitly Phase 4).

## Research stop check

- [x] Mechanism, source hierarchy and version boundaries identified.
- [x] Every track has depth, canonical failure/evidence direction, lab/transfer boundary, exit capability, non-goal and open/deferred boundary.
- [x] Scope held: no lessons, roadmap, dependency map, case bank, code, Supabase or UI changes.
