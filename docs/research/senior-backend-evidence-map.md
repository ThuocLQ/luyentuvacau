# Senior Backend Evidence Map

> **Status:** Phase 2 / Step 1 — contract-compliant canonical research map.
>
> **Purpose:** define auditable senior Backend .NET evidence. This is not a roadmap, lesson plan, case bank, product spec, implementation task, or total-program estimate.
>
> **Research date:** 2026-09-28. Version-sensitive sources are rechecked when a lesson is authored.

## 1. Evidence-map invariants

1. Durable mechanisms, not vendor popularity or employer format, define the core.
2. Learning order: portable concept → deep .NET implementation → Java transfer → only genuine implementation differences add depth.
3. A lab needs a mechanism, failure/boundary, observable evidence and defensible decision.
4. Redis as a data system is separate from Cache Engineering.
5. Overlays change assessment practice only; they never replace core engineering evidence.
6. Each range is **LOW-CONFIDENCE** first-pass planning only; no total-program hour estimate is published.

## 2. Source hierarchy and registry

Fundamental sources establish mechanisms; official/product/protocol sources establish current contracts; production sources establish operational reasoning; hiring sources are assessment signals only; industry sources are context only.

| ID | Source |
|---|---|
| F-DB-CMU | [CMU 15-445/645](https://15445.courses.cs.cmu.edu/fall2026/schedule.html) |
| F-DS-MIT | [MIT 6.5840](https://pdos.csail.mit.edu/6.824/schedule.html) |
| F-NET-STANFORD | [Stanford CS144](https://web.stanford.edu/class/cs144/) |
| F-OS-BERKELEY | [Berkeley CS162](https://cs162.org/) |
| P-DOTNET | [.NET docs/lifecycle](https://learn.microsoft.com/en-us/dotnet/core/releases-and-support) |
| P-DOTNET-DIAG | [.NET diagnostics](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/) |
| P-JAVA-JLS | [Java Language Specification](https://docs.oracle.com/javase/specs/) |
| P-JAVA-JVMS | [Java Virtual Machine Specification](https://docs.oracle.com/javase/specs/jvms/se25/html/index.html) |
| P-SPRING | [Spring Framework](https://docs.spring.io/spring-framework/reference/) / [Spring Boot](https://docs.spring.io/spring-boot/reference/) |
| P-PG | [PostgreSQL documentation](https://www.postgresql.org/docs/current/) |
| P-SQLSERVER | [SQL Server documentation](https://learn.microsoft.com/en-us/sql/sql-server/) |
| P-MYSQL-INNODB | [MySQL InnoDB](https://dev.mysql.com/doc/refman/en/innodb-introduction.html) |
| P-ORACLE | [Oracle Database Concepts](https://docs.oracle.com/en/database/oracle/oracle-database/26/cncpt/) |
| P-MONGO | [MongoDB docs](https://www.mongodb.com/docs/) |
| P-CASSANDRA | [Cassandra docs](https://cassandra.apache.org/doc/stable/) |
| P-REDIS | [Redis docs](https://redis.io/docs/latest/) |
| P-KAFKA | [Kafka docs](https://kafka.apache.org/documentation/) |
| P-K8S | [Kubernetes docs](https://kubernetes.io/docs/) |
| P-OTEL | [OpenTelemetry docs](https://opentelemetry.io/docs/) |
| P-SEARCH | [OpenSearch docs](https://docs.opensearch.org/latest/) |
| PROTO-HTTP | [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110) |
| PROTO-TLS | [RFC 9846: TLS 1.3](https://www.rfc-editor.org/rfc/rfc9846) |
| SEC-OWASP | [OWASP API Security](https://api-security.owasp.org/) |
| SEC-PORTSWIGGER | [PortSwigger Academy](https://portswigger.net/web-security) |
| PROD-GOOGLE-SRE | [Google SRE Book](https://sre.google/sre-book/) |
| PROD-AWS-RETRY | [AWS Builders' Library](https://aws.amazon.com/builders-library/) |
| PROD-AWS-IDEMPOTENCY | [AWS idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) |
| ENG-SWE-GOOGLE | [Software Engineering at Google](https://abseil.io/resources/swe-book) |
| HIRE-MICROSOFT | [Microsoft technical interviewing](https://careers.microsoft.com/v2/global/en/hiring-tips/technical-interviewing) |
| HIRE-AMAZON | [Amazon SDE II prep](https://www.amazon.jobs/content/en/how-we-hire/sde-ii-interview-prep) |
| TREND-SO | [Stack Overflow survey](https://survey.stackoverflow.co/2025/technology) |
| TREND-GITHUB | [GitHub Octoverse](https://github.blog/news-insights/octoverse/) |
| TREND-CNCF | [CNCF reports](https://www.cncf.io/reports/) |
| TREND-DORA | [DORA research](https://dora.dev/research/) |

## 3. Depth and hour semantics

- **MUST MASTER DEEP:** reproduce/debug failures, compare options and transfer across a meaningful boundary.
- **MUST MASTER:** make a safe production decision, reproduce one failure and gather evidence.
- **SHOULD MASTER / TRANSFER:** build durable conceptual fluency and transfer when stack demands it.
- **AWARENESS / ON DEMAND:** identify the boundary and investigate when needed.
- **INTERVIEW OVERLAY:** assessment practice over core knowledge.
- **CURRENT EXPANSION:** changing practice that does not alter evergreen core.

Ranges include mechanism, examples, hands-on, one canonical debug, production reasoning and initial transfer. They exclude spaced recall, remediation, capstones, repeated interview practice and real production experience. Every range is LOW-CONFIDENCE; the unique total is unresolved.

## 4. Canonical portfolio classification

| # | Core track | Depth class |
|---:|---|---|
| 1 | Programming & Software Design Foundations | MUST MASTER |
| 2 | Runtime & Memory | MUST MASTER |
| 3 | Operating Systems & I/O Foundations | MUST MASTER |
| 4 | Concurrency & Async | MUST MASTER DEEP |
| 5 | Networking & HTTP | MUST MASTER |
| 6 | Relational Database Engineering | MUST MASTER DEEP |
| 7 | NoSQL & Specialized Data Systems | SHOULD MASTER / TRANSFER |
| 8 | Cache Engineering | MUST MASTER |
| 9 | Distributed Systems | MUST MASTER DEEP |
| 10 | Messaging & Event-Driven Consistency | MUST MASTER |
| 11 | API Contracts & Resilience | MUST MASTER |
| 12 | Security | MUST MASTER |
| 13 | Observability & Performance | MUST MASTER |
| 14 | Reliability / SRE | MUST MASTER |
| 15 | Testing & Engineering Quality | MUST MASTER |
| 16 | Architecture & System Design | MUST MASTER |
| 17 | Containers / Kubernetes / Cloud Delivery | SHOULD MASTER / TRANSFER |

## 5. Core track dossiers

### 1. Programming & Software Design Foundations

- **Why Senior needs it:** turns requirements into durable code and business boundaries.
- **Depth class:** MUST MASTER.
- **Status tags:** EVERGREEN FOUNDATION.
- **Fundamental sources:** ENG-SWE-GOOGLE.
- **Official / product / protocol sources:** P-DOTNET, P-JAVA-JLS.
- **Production sources:** Not a primary signal for this track.
- **Hiring signal:** HIRE-MICROSOFT, HIRE-AMAZON.
- **Industry relevance signal:** TREND-GITHUB, context only.
- **Core capabilities:** portable language semantics; values/references/identity where relevant; type systems/generics; collections; practical data structures and complexity; exceptions/error modelling; ownership/lifetime; mutability/immutability; API/code-level design; OOP/SOLID/design principles when they solve a real problem; invariants, composition, dependency direction and refactoring.
- **Canonical failure classes:** leaky abstraction, duplicated rule, invalid state, accidental coupling, hidden ownership.
- **Production symptom classes:** risky change, inconsistent behavior, regression, slow incident repair.
- **Evidence / debugging direction:** trace one invariant through code, tests and persistence; identify the shared cause rather than patching callers.
- **Primary lab stack:** .NET 10 service plus focused tests.
- **Cross-stack / cross-vendor transfer:** Java/Spring shares the boundary and invariant reasoning.
- **Explicit non-goals:** competitive programming, language trivia or design-pattern catalog memorization.
- **Exit evidence / mastery target:** justify a small refactor protecting an invariant and disprove the old design with a test.
- **Estimated first-pass focused hours:** 24–36.
- **Estimate confidence:** LOW-CONFIDENCE.
- **Open research questions:** smallest representative refactoring fixture.

### 2. Runtime & Memory

- **Why Senior needs it:** allocation, lifetime and blocking symptoms require evidence-led reasoning.
- **Depth class:** MUST MASTER.
- **Status tags:** EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-OS-BERKELEY.
- **Official / product / protocol sources:** P-DOTNET, P-DOTNET-DIAG, P-JAVA-JVMS.
- **Production sources:** PROD-GOOGLE-SRE.
- **Hiring signal:** HIRE-MICROSOFT.
- **Industry relevance signal:** TREND-SO, context only.
- **Core capabilities:** managed heap, allocation rate, GC generations, retention, stack/heap intuition, pooling boundary and async resource lifetime.
- **Canonical failure classes:** allocation churn, retained object, LOH pressure, finalizer leak, unsafe buffer ownership.
- **Production symptom classes:** rising memory, GC time, OOM and latency spikes.
- **Evidence / debugging direction:** correlate allocation, managed heap and GC with a memory dump and retaining path.
- **Primary lab stack:** .NET worker/API with dotnet-counters, dotnet-trace and dotnet-dump.
- **Cross-stack / cross-vendor transfer:** transfer heap/retention reasoning to JVM; inspect collector differences only when mitigation changes.
- **Explicit non-goals:** implementing GC or tuning every collector flag.
- **Exit evidence / mastery target:** explain a memory symptom and validate a safe mitigation.
- **Estimated first-pass focused hours:** 24–40.
- **Estimate confidence:** LOW-CONFIDENCE.
- **Open research questions:** Windows-friendly capture fixture.

### 3. Operating Systems & I/O Foundations

- **Why Senior needs it:** processes, threads, virtual memory, handles and sockets underpin every backend service.
- **Depth class:** MUST MASTER.
- **Status tags:** EVERGREEN FOUNDATION.
- **Fundamental sources:** F-OS-BERKELEY.
- **Official / product / protocol sources:** P-DOTNET, P-K8S.
- **Production sources:** PROD-GOOGLE-SRE.
- **Hiring signal:** HIRE-MICROSOFT.
- **Industry relevance signal:** Not a primary signal for this track.
- **Core capabilities:** process/thread distinction, scheduling/waits, virtual memory/page cache, files/handles/sockets, blocking I/O, resource limits and graceful termination.
- **Canonical failure classes:** handle/socket leak, blocked I/O, starvation, memory pressure and termination-loss race.
- **Production symptom classes:** open-file/connection errors, queue growth, OOM/eviction and lost rollout work.
- **Evidence / debugging direction:** identify the exhausted OS resource with handle/socket, wait, runtime and container evidence.
- **Primary lab stack:** .NET worker/API with controlled file/socket use and shutdown.
- **Cross-stack / cross-vendor transfer:** concepts transfer to JVM and containers; commands do not define the concept.
- **Explicit non-goals:** kernel, driver or scheduler implementation.
- **Exit evidence / mastery target:** connect an OS resource limit to application behavior and recovery.
- **Estimated first-pass focused hours:** 20–32.
- **Estimate confidence:** LOW-CONFIDENCE.
- **Open research questions:** minimum Windows/Linux evidence set.

### 4. Concurrency & Async

- **Why Senior needs it:** overlapping work must preserve invariants under cancellation, saturation and failure.
- **Depth class:** MUST MASTER DEEP.
- **Status tags:** EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-OS-BERKELEY, F-DS-MIT.
- **Official / product / protocol sources:** P-DOTNET, P-JAVA-JLS, P-JAVA-JVMS.
- **Production sources:** PROD-GOOGLE-SRE.
- **Hiring signal:** HIRE-MICROSOFT, HIRE-AMAZON.
- **Industry relevance signal:** Not a primary signal for this track.
- **Core capabilities:** async versus thread, await/cancellation, shared-state invariants, lock/atomic/channel choices, bounded concurrency, backpressure, ordering and ThreadPool starvation.
- **Canonical failure classes:** lost update, deadlock, race, unbounded fan-out, sync-over-async and fire-and-forget loss.
- **Production symptom classes:** high waits, stuck requests, queue growth, duplicate/missing state and latency collapse.
- **Evidence / debugging direction:** reproduce an interleaving; inspect tasks, waits, queue depth and persisted result before changing synchronization.
- **Primary lab stack:** .NET async API/worker with PostgreSQL invariant and Channel/SemaphoreSlim exercises.
- **Cross-stack / cross-vendor transfer:** Java executors, CompletableFuture and JMM; add depth only for material memory/interrupt differences.
- **Explicit non-goals:** lock-free research or treating one primitive as universal.
- **Exit evidence / mastery target:** prove an invariant across a race and defend a concurrency limit from load evidence.
- **Estimated first-pass focused hours:** 44–70.
- **Estimate confidence:** LOW-CONFIDENCE.
- **Open research questions:** deterministic learner race harness.

### 5. Networking & HTTP

- **Why Senior needs it:** a request failure needs layer diagnosis before an application fix.
- **Depth class:** MUST MASTER.
- **Status tags:** EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-NET-STANFORD.
- **Official / product / protocol sources:** PROTO-HTTP, PROTO-TLS, P-DOTNET, P-SPRING.
- **Production sources:** PROD-AWS-RETRY.
- **Hiring signal:** HIRE-MICROSOFT, HIRE-AMAZON.
- **Industry relevance signal:** Not a primary signal for this track.
- **Core capabilities:** DNS, TCP, TLS, HTTP semantics, connection reuse/pooling, proxy/LB boundary, timeout, streaming, cancellation and retry safety.
- **Canonical failure classes:** DNS miss, connection exhaustion, TLS mismatch, proxy-header misuse, unknown outcome and unsafe retry.
- **Production symptom classes:** connection errors, slow first byte, handshake failure and elevated timeout/5xx.
- **Evidence / debugging direction:** use timing, trace, socket/pool state, proxy headers and audit records to locate the layer.
- **Primary lab stack:** ASP.NET Core plus downstream stub with HttpClientFactory, cancellation and latency faults.
- **Cross-stack / cross-vendor transfer:** transfer to Spring WebClient and any compliant HTTP client.
- **Explicit non-goals:** routing certification or packet-capture specialization.
- **Exit evidence / mastery target:** state the failure layer, unknown outcome and safe next action.
- **Estimated first-pass focused hours:** 24–38.
- **Estimate confidence:** LOW-CONFIDENCE.
- **Open research questions:** local TLS/proxy fixture.

### 6. Relational Database Engineering

- **Why Senior needs it:** durable correctness and core backend performance depend on transaction and query reasoning.
- **Depth class:** MUST MASTER DEEP.
- **Status tags:** EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-DB-CMU.
- **Official / product / protocol sources:** P-PG, P-SQLSERVER, P-MYSQL-INNODB, P-ORACLE.
- **Production sources:** PROD-GOOGLE-SRE.
- **Hiring signal:** HIRE-MICROSOFT, HIRE-AMAZON.
- **Industry relevance signal:** TREND-SO, context only.
- **Core capabilities:** modelling/invariants, pages/heap, buffer management, indexes/composite query shape, optimizer/stats, ACID/isolation/MVCC/locks/deadlocks, WAL/recovery, constraints, migrations, replication/failover, partition/sharding, backup/RPO-RTO, pool exhaustion and query diagnosis.
- **Canonical failure classes:** indexed-but-slow query, wrong composite index, stale stats/skew, lock/deadlock, migration under load, exhausted pool and bad recovery assumption.
- **Production symptom classes:** p99 query latency, estimate/actual mismatch, buffer/I/O pressure, lock waits, pool saturation and replication lag.
- **Evidence / debugging direction:** use query shape, plan, actual/estimated rows, buffers, locks/activity and pool evidence; never infer from ORM syntax alone.
- **Primary lab stack:** PostgreSQL 18 + SQL + EF Core/Dapper.
- **Cross-stack / cross-vendor transfer:** compare SQL Server, MySQL and Oracle only where layout, MVCC, locks, plan or online DDL changes the result.
- **Explicit non-goals:** DBA certification or deep operation of four engines.
- **Exit evidence / mastery target:** predict, observe and defend a query, transaction or recovery decision.
- **Estimated first-pass focused hours:** 70–105.
- **Estimate confidence:** LOW-CONFIDENCE.
- **Open research questions:** safe HA/restore and migration-under-traffic fixture.

### 7. NoSQL & Specialized Data Systems

- **Why Senior needs it:** choose a data model for access pattern and correctness boundary, not a brand.
- **Depth class:** SHOULD MASTER / TRANSFER.
- **Status tags:** CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-DB-CMU, F-DS-MIT.
- **Official / product / protocol sources:** P-MONGO, P-CASSANDRA, P-REDIS, P-SEARCH.
- **Production sources:** Not a primary signal for this track.
- **Hiring signal:** HIRE-AMAZON.
- **Industry relevance signal:** TREND-SO, TREND-GITHUB, context only.
- **Core capabilities:** choose document, wide-column, key/value or inverted-index model by access pattern, partition and source-of-truth boundary.
- **Canonical failure classes:** unbounded document, hot partition, tombstone scan, unexpected eviction, hot key/slot, stale search visibility.
- **Production symptom classes:** uneven load, amplification, memory loss, stale/incomplete result and slow query.
- **Evidence / debugging direction:** inspect query/index/profile, partition/key distribution, memory/latency, refresh and replica evidence.
- **Primary lab stack:** local MongoDB, Redis and OpenSearch; Cassandra model/simulation before multi-region operation.
- **Cross-stack / cross-vendor transfer:** transfer access-pattern, partition and consistency reasoning; products are not interchangeable.
- **Explicit non-goals:** operating all products deeply or calling JSON schema-free correctness.
- **Exit evidence / mastery target:** reject a mismatched data model and transfer the reason.
- **Estimated first-pass focused hours:** 30–48.
- **Estimate confidence:** LOW-CONFIDENCE.
- **Open research questions:** bounded Cassandra and Search fixtures.

| Explicit subtrack | Mechanism and failure boundary |
|---|---|
| **MongoDB / Document Model** | embed/reference; aggregate/document boundary; indexes; arrays/multikey; aggregation; transaction boundary; shard-key and replica basics. Failures: unbounded document, poor shard key, hot chunk, transaction assumed free. |
| **Cassandra / Wide-column + LSM** | access-pattern-first model; partition/clustering key; commit log; memtable; SSTable; compaction; tombstones/TTL; consistency; hot/huge partition. Failures: hot partition, tombstone scan and false consistency assumption. |
| **Redis as a Data System** | key/value structures; memory; TTL/eviction; persistence; replication; cluster/hash slots; Streams where useful. Failures: eviction surprise, memory growth, hot key/slot and replica assumption. **Redis data-system semantics != Cache Engineering.** |
| **Search / Inverted Index** | inverted index; analyzer/tokenizer; text vs keyword; relevance; refresh/eventual visibility; shard/replica; deep pagination; source-of-truth boundary. Failures: mapping/analyzer mismatch, stale visibility, deep-page cost and search treated as authority. |

### 8. Cache Engineering

- **Why Senior needs it:** cache improves a path only while invalidation and correctness remain explicit.
- **Depth class:** MUST MASTER.
- **Status tags:** EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-DS-MIT.
- **Official / product / protocol sources:** P-REDIS.
- **Production sources:** PROD-GOOGLE-SRE, PROD-AWS-RETRY.
- **Hiring signal:** HIRE-MICROSOFT.
- **Industry relevance signal:** TREND-SO, context only.
- **Core capabilities:** source of truth, cache-aside, TTL, invalidation, consistency window, stampede, hot key, penetration, avalanche and fallback.
- **Canonical failure classes:** stale read, missing invalidation, thundering herd, cache-as-authority and unsafe fallback.
- **Production symptom classes:** DB surge, skewed latency, stale customer view and Redis saturation.
- **Evidence / debugging direction:** follow key lifecycle, hit/miss, downstream load, TTL and invalidation before adding capacity.
- **Primary lab stack:** .NET + PostgreSQL source of truth + Redis cache.
- **Cross-stack / cross-vendor transfer:** transfer to in-process/CDN cache after naming its invalidation/consistency contract.
- **Explicit non-goals:** Redis data-system/Streams operation; that belongs to track 7.
- **Exit evidence / mastery target:** design and test stale-data and stampede recovery.
- **Estimated first-pass focused hours:** 20–34.
- **Estimate confidence:** LOW-CONFIDENCE.
- **Open research questions:** common cache metric contract.

### 9. Distributed Systems

- **Why Senior needs it:** independently failing processes require stated guarantees and recovery.
- **Depth class:** MUST MASTER DEEP.
- **Status tags:** EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-DS-MIT, F-OS-BERKELEY.
- **Official / product / protocol sources:** P-DOTNET, P-JAVA-JVMS.
- **Production sources:** PROD-GOOGLE-SRE, PROD-AWS-RETRY.
- **Hiring signal:** HIRE-MICROSOFT, HIRE-AMAZON.
- **Industry relevance signal:** Not a primary signal for this track.
- **Core capabilities:** partial failure, time/ordering limits, consistency, ownership, replication, quorum/leader intuition, distributed transaction boundary, reconciliation and blast radius.
- **Canonical failure classes:** divergent state, duplicate/late event, timeout unknown outcome, failed leader/failover assumption and false global ordering.
- **Production symptom classes:** divergent status, retry storm, stale read and cross-service incident.
- **Evidence / debugging direction:** identify source of truth, causal boundary, audit/reconciliation record and competing hypotheses.
- **Primary lab stack:** multi-process .NET services with PostgreSQL and controlled faults.
- **Cross-stack / cross-vendor transfer:** .NET remains complete; Java is transfer; runtime/broker/engine differences add depth only when material.
- **Explicit non-goals:** implementing Raft/Paxos or claiming universal consistency.
- **Exit evidence / mastery target:** explain guarantee, unknown outcome and recovery for an unseen case.
- **Estimated first-pass focused hours:** 60–95.
- **Estimate confidence:** LOW-CONFIDENCE.
- **Open research questions:** visible deterministic failure simulation.

### 10. Messaging & Event-Driven Consistency

- **Why Senior needs it:** a broker moves records, not one automatically correct business effect.
- **Depth class:** MUST MASTER.
- **Status tags:** CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-DS-MIT.
- **Official / product / protocol sources:** P-KAFKA, P-PG.
- **Production sources:** PROD-AWS-RETRY, PROD-AWS-IDEMPOTENCY.
- **Hiring signal:** HIRE-MICROSOFT.
- **Industry relevance signal:** TREND-CNCF, context only.
- **Core capabilities:** producer/consumer, partition/order scope, ack/offset, retry, duplicate, poison, replay, rebalance, idempotency, outbox/inbox, reconciliation, unknown external effect, schema evolution/compatibility and event ownership.
- **Canonical failure classes:** duplicate, poison, premature ack, ordering assumption, retry storm, incompatible replay, DB-publish gap and unknown external outcome.
- **Production symptom classes:** duplicate business action, missing state transition, lag, stuck partition and incompatible consumer.
- **Evidence / debugging direction:** inspect headers/schema version, consumer ledger, offset/ack, audit/outbox and delivery contract.
- **Primary lab stack:** PostgreSQL outbox + Kafka-style producer/consumer.
- **Cross-stack / cross-vendor transfer:** Kafka → RabbitMQ retains delivery principles but re-evaluates routing, ordering and acknowledgement contract.
- **Explicit non-goals:** universal exactly-once or broker configuration memorization.
- **Exit evidence / mastery target:** replay a changed event and prove one local effect is safe.
- **Estimated first-pass focused hours:** 32–50.
- **Estimate confidence:** LOW-CONFIDENCE.
- **Open research questions:** schema-registry fixture.

### 11. API Contracts & Resilience

- **Why Senior needs it:** public behavior must survive retry, timeout and evolution without silent corruption.
- **Depth class:** MUST MASTER.
- **Status tags:** EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-NET-STANFORD, F-DS-MIT.
- **Official / product / protocol sources:** PROTO-HTTP, P-DOTNET, P-SPRING.
- **Production sources:** PROD-AWS-RETRY, PROD-AWS-IDEMPOTENCY.
- **Hiring signal:** HIRE-MICROSOFT.
- **Industry relevance signal:** Not a primary signal for this track.
- **Core capabilities:** contract/versioning, validation, status semantics, pagination/filtering, idempotency key, timeout/retry/circuit/bulkhead boundaries, cancellation, error taxonomy and compatibility.
- **Canonical failure classes:** breaking response, retry duplicate, conflicting idempotency key, swallowed cancellation and timeout treated as failure.
- **Production symptom classes:** client breakage, duplicate transaction, retry storm and inconsistent errors.
- **Evidence / debugging direction:** inspect contract, request fingerprint, operation/audit record, downstream state and retry budget.
- **Primary lab stack:** ASP.NET Core API + fault stub + persistent idempotency record.
- **Cross-stack / cross-vendor transfer:** Spring REST shares HTTP and side-effect reasoning.
- **Explicit non-goals:** one resilience-library policy for every call.
- **Exit evidence / mastery target:** defend a compatible contract and safe unknown-outcome flow.
- **Estimated first-pass focused hours:** 28–44.
- **Estimate confidence:** LOW-CONFIDENCE.
- **Open research questions:** canonical error taxonomy.

### 12. Security

- **Why Senior needs it:** backend ownership includes deciding who may act on which object across an adversarial trust boundary.
- **Depth class:** MUST MASTER.
- **Status tags:** EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY.
- **Fundamental sources:** Not a primary signal for this track.
- **Official / product / protocol sources:** SEC-OWASP, SEC-PORTSWIGGER, P-DOTNET, P-SPRING, PROTO-TLS.
- **Production sources:** PROD-GOOGLE-SRE.
- **Hiring signal:** HIRE-AMAZON.
- **Industry relevance signal:** Not a primary signal for this track.
- **Core capabilities:** authentication; authorization; object/tenant authorization; token/session boundary; OAuth/OIDC awareness; validation; SQL/NoSQL injection; SSRF; CSRF/CORS/XSS backend implications; secrets; race-condition abuse; brute-force/login abuse; resource exhaustion; sensitive business-flow abuse; unsafe third-party API trust; security logging/audit.
- **Canonical failure classes:** IDOR/tenant escape, injection, SSRF, leaked secret, permissive CORS, token/session misuse, brute-force, resource exhaustion, unsafe callback/trusted third-party response and race abuse.
- **Production symptom classes:** unauthorized access, data leak, abnormal login or business flow, resource exhaustion and audit gap.
- **Evidence / debugging direction:** reproduce safely; trace identity, policy, ownership, input, upstream trust and audit decision.
- **Primary lab stack:** ASP.NET Core policy/tenant tests and safe HTTP/database stubs.
- **Cross-stack / cross-vendor transfer:** Spring Security changes implementation, not trust-boundary reasoning.
- **Explicit non-goals:** full pentesting, cryptography course or compliance certification.
- **Exit evidence / mastery target:** demonstrate exploit path, layered fix and regression evidence.
- **Estimated first-pass focused hours:** 34–54.
- **Estimate confidence:** LOW-CONFIDENCE.
- **Open research questions:** safe SSRF and abuse fixture.

### 13. Observability & Performance

- **Why Senior needs it:** a dashboard collects evidence; it is not a root-cause answer.
- **Depth class:** MUST MASTER.
- **Status tags:** EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-OS-BERKELEY, F-DB-CMU.
- **Official / product / protocol sources:** P-OTEL, P-DOTNET-DIAG, P-PG.
- **Production sources:** PROD-GOOGLE-SRE.
- **Hiring signal:** HIRE-MICROSOFT.
- **Industry relevance signal:** TREND-DORA, context only.
- **Core capabilities:** p50/p95/p99, throughput, saturation/errors, CPU, allocation/memory/GC, ThreadPool/queues, blocking/waits, DB I/O, profiling/tracing/metrics/logs, context propagation, sampling, cardinality, load test and benchmark validity.
- **Canonical failure classes:** average hides tail, bad sampling/cardinality, unrepresentative benchmark, missing context and guessed bottleneck.
- **Production symptom classes:** high p99, throughput collapse, CPU/GC pressure, queue growth and slow DB.
- **Evidence / debugging direction:** symptom → competing hypotheses → discriminating evidence → experiment → root cause → mitigation; never dashboard → guess.
- **Primary lab stack:** OTel + .NET diagnostics + PostgreSQL under controlled load.
- **Cross-stack / cross-vendor transfer:** Java OTel/JFR-equivalent evidence; dashboard vendor is replaceable.
- **Explicit non-goals:** monitoring-vendor course or synthetic benchmark as production truth.
- **Exit evidence / mastery target:** defend a root-cause conclusion with disconfirming evidence.
- **Estimated first-pass focused hours:** 32–52.
- **Estimate confidence:** LOW-CONFIDENCE.
- **Open research questions:** local telemetry/load budget.

### 14. Reliability / SRE

- **Why Senior needs it:** service design needs overload, recovery and bounded blast radius.
- **Depth class:** MUST MASTER.
- **Status tags:** CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-DS-MIT.
- **Official / product / protocol sources:** P-OTEL, P-K8S.
- **Production sources:** PROD-GOOGLE-SRE, PROD-AWS-RETRY.
- **Hiring signal:** HIRE-AMAZON.
- **Industry relevance signal:** TREND-DORA, context only.
- **Core capabilities:** SLI/SLO/error-budget intuition, load shedding, timeout/retry budget, graceful degradation, dependency failure, incident evidence, rollback and RPO/RTO reasoning.
- **Canonical failure classes:** retry amplification, cascade, unbounded queue, poor readiness and untested recovery.
- **Production symptom classes:** availability loss, overload, rising error/latency, failed deployment and recovery gap.
- **Evidence / debugging direction:** define user impact and dependency boundary; use error/latency/saturation plus recovery evidence.
- **Primary lab stack:** .NET services with downstream faults, OTel and local deployment target.
- **Cross-stack / cross-vendor transfer:** principles survive cloud and tool changes.
- **Explicit non-goals:** on-call ceremony or SRE job replacement.
- **Exit evidence / mastery target:** propose a bounded mitigation and recovery verification.
- **Estimated first-pass focused hours:** 24–40.
- **Estimate confidence:** LOW-CONFIDENCE.
- **Open research questions:** safe overload cap.

### 15. Testing & Engineering Quality

- **Why Senior needs it:** quality evidence should falsify risky assumptions before customers do.
- **Depth class:** MUST MASTER.
- **Status tags:** EVERGREEN FOUNDATION.
- **Fundamental sources:** ENG-SWE-GOOGLE.
- **Official / product / protocol sources:** P-DOTNET, P-SPRING.
- **Production sources:** PROD-GOOGLE-SRE.
- **Hiring signal:** HIRE-AMAZON.
- **Industry relevance signal:** Not a primary signal for this track.
- **Core capabilities:** test-by-risk, unit/integration/contract tests, fixtures, deterministic time/concurrency, property/boundary cases, migration/failure testing, CI and review evidence.
- **Canonical failure classes:** mock proves wrong behavior, flaky test, coverage-only target, missing contract test and production-only failure.
- **Production symptom classes:** escaped regression, non-reproducible CI and unsafe release.
- **Evidence / debugging direction:** state the risky assumption, create a failing fixture, then prove behavior at the required boundary.
- **Primary lab stack:** .NET tests with PostgreSQL/broker stubs and CI-friendly fixtures.
- **Cross-stack / cross-vendor transfer:** JUnit/Spring mechanics differ; risk model does not.
- **Explicit non-goals:** coverage quota or framework trivia.
- **Exit evidence / mastery target:** add the smallest reliable test catching a risky regression.
- **Estimated first-pass focused hours:** 24–40.
- **Estimate confidence:** LOW-CONFIDENCE.
- **Open research questions:** shared fixture standard.

### 16. Architecture & System Design

- **Why Senior needs it:** design makes requirements, ownership, failure and trade-offs inspectable.
- **Depth class:** MUST MASTER.
- **Status tags:** EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-DS-MIT, F-DB-CMU.
- **Official / product / protocol sources:** P-DOTNET, P-K8S.
- **Production sources:** PROD-GOOGLE-SRE.
- **Hiring signal:** HIRE-MICROSOFT, HIRE-AMAZON.
- **Industry relevance signal:** Not a primary signal for this track.
- **Core capabilities:** requirement clarification, data ownership, sync/async boundary, capacity assumptions, consistency, failure/recovery, security/observability and incremental delivery.
- **Canonical failure classes:** diagram-first design, shared DB ownership, unbounded dependency chain, unstated consistency and no recovery path.
- **Production symptom classes:** ambiguous responsibility, blast radius, costly change and unreconcilable state.
- **Evidence / debugging direction:** map requirement → invariant → option → evidence → trade-off → recovery; request missing constraints.
- **Primary lab stack:** order/payment-like .NET design with PostgreSQL, cache and broker boundaries.
- **Cross-stack / cross-vendor transfer:** architecture is portable; technology choice follows a contract.
- **Explicit non-goals:** template diagrams or a second distributed-systems course.
- **Exit evidence / mastery target:** defend a design under a changed requirement and failure injection.
- **Estimated first-pass focused hours:** 32–52.
- **Estimate confidence:** LOW-CONFIDENCE.
- **Open research questions:** stable scenario vocabulary.

### 17. Containers / Kubernetes / Cloud Delivery

- **Why Senior needs it:** app behavior changes under image, lifecycle, configuration, rollout and platform-resource boundaries.
- **Depth class:** SHOULD MASTER / TRANSFER.
- **Status tags:** CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-OS-BERKELEY.
- **Official / product / protocol sources:** P-K8S, P-DOTNET.
- **Production sources:** PROD-GOOGLE-SRE.
- **Hiring signal:** HIRE-MICROSOFT.
- **Industry relevance signal:** TREND-CNCF, context only.
- **Core capabilities:** image/process boundary, config/secrets, requests/limits, probes/lifecycle, deployment/rollout/rollback, logs/metrics and managed-cloud responsibility boundary.
- **Canonical failure classes:** bad image/config, readiness misconception, OOMKilled, failed rollout, secret leak and pod treated as durable state.
- **Production symptom classes:** CrashLoopBackOff, unavailable rollout, throttling, lost work and inaccessible evidence.
- **Evidence / debugging direction:** read lifecycle/status/events, resource usage, app logs and deployment history before changing configuration.
- **Primary lab stack:** containerized .NET service on local Kubernetes plus managed-cloud conceptual transfer.
- **Cross-stack / cross-vendor transfer:** Kubernetes concepts transfer across clouds; provider integrations require contract review.
- **Explicit non-goals:** cluster-admin certification, all cloud services or Helm trivia.
- **Exit evidence / mastery target:** explain and recover a rollout/lifecycle failure without treating Kubernetes as magic.
- **Estimated first-pass focused hours:** 28–48.
- **Estimate confidence:** LOW-CONFIDENCE.
- **Open research questions:** Windows-friendly local cluster baseline.

## 6. Implementation lanes

### .NET — PRIMARY DEEP IMPLEMENTATION LANE

Portable concepts are first, then .NET supplies the runnable depth: **CLR; allocation, GC and LOH; JIT; Task; async/await; ThreadPool; ThreadPool starvation; ASP.NET Core request pipeline; DI lifetimes; EF Core/Dapper boundaries; HttpClientFactory; runtime diagnostics.** These are implementation deltas, not duplicate core concepts. P-DOTNET and P-DOTNET-DIAG are current sources; .NET alone completes the core lane.

### JVM / Java / Spring — SHOULD MASTER / TRANSFER delta lane

After portable mechanism and deep .NET work, transfer to **JVM/bytecode/JIT; heap/GC; Java Memory Model; synchronized; volatile; atomics; ExecutorService; CompletableFuture; Virtual Threads; Spring IoC; Spring proxy/AOP; transaction proxy boundary; JPA/Hibernate persistence context; Hibernate proxies.** These items add depth only when their actual semantics change the conclusion; they are not a duplicate Java curriculum.

## 7. Overlays

- **Big-Tech Interview Overlay — INTERVIEW OVERLAY:** DSA, system-design stress and behavioral/impact practice; HIRE-MICROSOFT and HIRE-AMAZON are signals only. Estimate: 24–45, LOW-CONFIDENCE.
- **AI-assisted Engineering — CURRENT EXPANSION:** generated-code/research verification, provenance, security and tests; ENG-SWE-GOOGLE/SEC-OWASP anchor it. Estimate: 12–20, LOW-CONFIDENCE.

## 8. Cross-track / vendor boundaries

- PostgreSQL is the relational primary lab; SQL Server, MySQL/InnoDB and Oracle are transfer deltas, not duplicate tracks.
- Kafka is the primary case; RabbitMQ retains delivery principles but needs a fresh routing, ordering and acknowledgement-contract review.
- Redis data-system semantics remain track 7; cache correctness remains track 8.
- Kubernetes is a specialized delivery/runtime core track, not a prerequisite for concurrency, database or distributed-systems mechanisms.
- Vendor popularity never promotes a tool to an evergreen mechanism.

## 9. Adversarial curriculum review

| Challenge | Result |
|---|---|
| Kubernetes disappears | Core mechanisms remain coherent; specialized delivery practice changes. |
| SQL Server replaces PostgreSQL | Portable relational mechanisms remain; engine deltas are researched. |
| Kafka becomes RabbitMQ | Delivery principles persist; broker contract is re-evaluated. |
| No Java role | .NET lane remains complete. |
| .NET role moves to Java | Portable reasoning reuses; Java adds real deltas only. |
| Redis structures/Streams are needed | Track 7 helps; Cache Engineering stays separate. |
| No Big-Tech target | Core remains complete; overlay is optional. |
| AI tools change | Core mechanisms stay unchanged. |
| Vendor loses popularity | Evergreen mechanism survives. |
| API-knower cannot diagnose | Exit evidence fails. |
| Candidate explains but cannot reproduce/debug | Foundation is insufficient. |
| Employer-only topic lacks engineering evidence | Move to overlay or omit. |

## 10. Remaining research questions

1. Dependency graph and duplicate-concept elimination.
2. Canonical cases and assessment variants.
3. Windows-friendly broker, telemetry, restore and local-Kubernetes fixtures.
4. Version-sensitive lab recheck cadence.
5. Unique-path hours after dependency decomposition.

## 11. Step-1 freeze criteria

- [x] Exactly 17 core tracks; overlays are not core tracks.
- [x] Every core dossier has independently readable contract fields.
- [x] .NET is primary deep lane; Java is transfer/delta only.
- [x] NoSQL has four explicit subtracks; Redis data system and Cache Engineering remain separate.
- [x] No total-program hour estimate is published.
- [x] This correction stops here: no roadmap, Phase 1, Step 2, code, Supabase or UI changes.
