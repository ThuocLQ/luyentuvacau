# Senior Backend Evidence Map

> **Status:** Phase 2 / Step 1 — canonical normalized research map; frozen pending a new research question.
>
> **Purpose:** define the evidence a Backend .NET engineer needs to demonstrate senior-level judgment. This is a research and curriculum-boundary artifact, not a roadmap, lesson plan, case bank, staffing plan, or product specification.
>
> **Research date:** 2026-09-27. Product/documentation versions are rechecked when a version-sensitive lesson is authored.

## 1. Status, purpose and research date

- **Status:** Phase 2 / Step 1 — canonical normalized research map; frozen pending a new research question.
- **Purpose:** define evidence for senior Backend .NET judgment; this is not a roadmap, lesson plan, case bank, product specification, or implementation task.
- **Research date:** 2026-09-27. Version-sensitive sources are rechecked when a lesson is authored.

## 2. Evidence-map invariants

1. A core track earns its place from durable engineering evidence, not from a vendor's popularity or an employer's interview format.
2. Concepts are portable first. The learning order is: portable concept → .NET deep implementation → Java/JVM transfer → a deep dive only where the runtime, engine, or broker changes the conclusion.
3. A lab is evidence, not a demo. Exit evidence must include a mechanism, a failure or boundary, observable data, and a defensible decision.
4. A product is a primary lab stack only when it exposes the intended mechanism. It is never proof that the product itself is the curriculum.
5. Redis as a data system and Cache Engineering are deliberately separate. One teaches Redis storage/replication/Streams boundaries; the other teaches cache-aside, invalidation, stampede, stale-data and source-of-truth decisions.
6. An overlay can change practice format, but cannot replace the core engineering evidence needed by a senior backend engineer.
7. All hour ranges in this document are **LOW-CONFIDENCE** first-pass estimates. They are planning signals, not a completion promise.

## 3. Source hierarchy

1. **Fundamental sources** establish mechanisms and long-lived abstractions.
2. **Official / product / protocol sources** establish current contracts, APIs, release and version boundaries.
3. **Production sources** establish operational reasoning, recovery and trade-off patterns.
4. **Hiring sources** indicate how a subset of employers assess evidence; they do not define the engineering curriculum.
5. **Industry-relevance sources** are context only. They do not make a technology a core track.

## 4. Authoritative source registry

| ID | Source / role |
|---|---|
| F-DB-CMU | [CMU 15-445/645](https://15445.courses.cs.cmu.edu/fall2026/schedule.html) — storage, indexes, execution, concurrency, recovery and distributed DB mechanisms |
| F-DS-MIT | [MIT 6.5840](https://pdos.csail.mit.edu/6.824/schedule.html) — distributed agreement, consistency and transaction mechanisms |
| F-NET-STANFORD | [Stanford CS144](https://web.stanford.edu/class/cs144/) — networking foundations |
| F-OS-BERKELEY | [Berkeley CS162](https://cs162.org/) — OS, I/O and resource foundations |
| P-DOTNET | [.NET lifecycle/docs](https://learn.microsoft.com/en-us/dotnet/core/releases-and-support) |
| P-DOTNET-DIAG | [.NET diagnostics](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/) |
| P-JAVA-JLS | [Java Language Specification](https://docs.oracle.com/javase/specs/) |
| P-JAVA-JVMS | [Java Virtual Machine Specification](https://docs.oracle.com/javase/specs/jvms/se25/html/index.html) |
| P-SPRING | [Spring Framework](https://docs.spring.io/spring-framework/reference/) and [Spring Boot](https://docs.spring.io/spring-boot/reference/) references |
| P-PG | [PostgreSQL current documentation](https://www.postgresql.org/docs/current/) — primary lab target, currently PostgreSQL 18 |
| P-SQLSERVER | [SQL Server documentation](https://learn.microsoft.com/en-us/sql/sql-server/) |
| P-MYSQL-INNODB | [MySQL InnoDB reference](https://dev.mysql.com/doc/refman/en/innodb-introduction.html) |
| P-ORACLE | [Oracle Database Concepts](https://docs.oracle.com/en/database/oracle/oracle-database/26/cncpt/) |
| P-MONGO | [MongoDB documentation](https://www.mongodb.com/docs/) |
| P-CASSANDRA | [Apache Cassandra documentation](https://cassandra.apache.org/doc/stable/) |
| P-REDIS | [Redis documentation](https://redis.io/docs/latest/) |
| P-KAFKA | [Apache Kafka documentation](https://kafka.apache.org/documentation/) |
| P-K8S | [Kubernetes documentation](https://kubernetes.io/docs/) |
| P-OTEL | [OpenTelemetry documentation](https://opentelemetry.io/docs/) |
| P-SEARCH | [OpenSearch documentation](https://docs.opensearch.org/latest/) |
| PROTO-HTTP | [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110) |
| PROTO-TLS | [RFC 9846: TLS 1.3](https://www.rfc-editor.org/rfc/rfc9846) — current TLS 1.3 specification; obsoletes RFC 8446 |
| SEC-OWASP | [OWASP API Security](https://api-security.owasp.org/) |
| SEC-PORTSWIGGER | [PortSwigger Web Security Academy](https://portswigger.net/web-security) |
| PROD-GOOGLE-SRE | [Google SRE Book](https://sre.google/sre-book/) |
| PROD-AWS-RETRY | [AWS Builders' Library](https://aws.amazon.com/builders-library/) — timeout, retry and overload |
| PROD-AWS-IDEMPOTENCY | [AWS: idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) |
| ENG-SWE-GOOGLE | [Software Engineering at Google](https://abseil.io/resources/swe-book) |
| HIRE-MICROSOFT | [Microsoft technical interviewing](https://careers.microsoft.com/v2/global/en/hiring-tips/technical-interviewing) |
| HIRE-AMAZON | [Amazon SDE II prep](https://www.amazon.jobs/content/en/how-we-hire/sde-ii-interview-prep) |
| TREND-SO | [Stack Overflow technology survey](https://survey.stackoverflow.co/2025/technology) — context only |
| TREND-GITHUB | [GitHub Octoverse](https://github.blog/news-insights/octoverse/) — context only |
| TREND-CNCF | [CNCF reports](https://www.cncf.io/reports/) — context only |
| TREND-DORA | [DORA research](https://dora.dev/research/) — context only |

Every registry ID is either cited by a dossier below or intentionally retained as a boundary reference for its named implementation lane. The registry is not a reading list.

## 5. Depth-class semantics

| Class | Meaning |
|---|---|
| MUST MASTER DEEP | Explain the mechanism; reproduce and diagnose canonical failures; compare alternatives; transfer across a meaningful implementation boundary. |
| MUST MASTER | Make safe production decisions; reproduce at least one failure; gather evidence and explain the boundary. |
| SHOULD MASTER / TRANSFER | Build durable conceptual fluency and transfer it when the stack demands it; no claim of operator/engine-specialist depth. |
| AWARENESS / ON DEMAND | Recognize the boundary and know when to investigate; no core exit gate. |
| INTERVIEW OVERLAY | Assessment practice over existing engineering knowledge; not a replacement curriculum. |
| CURRENT EXPANSION | Relevant modern practice that must not alter the evergreen core without evidence. |

## 6. Hour-estimation semantics

Each estimate includes first-pass mechanism study, small examples, hands-on work, one canonical debugging/failure exercise, production reasoning, and initial transfer. It excludes spaced recall, remediation, capstones, repeated interview drills and real-production experience. Every range is LOW-CONFIDENCE because dependency decomposition and deduplication have not happened. **No total-program hour count is published.** The unique total remains unresolved until later dependency work and deduplication.

## 7. Canonical portfolio classification

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

## 8. Core track dossiers

### 1. Programming & Software Design Foundations

- **Why Senior needs it:** turn requirements into maintainable boundaries, not merely compiling code. **Depth class:** MUST MASTER. **Status tags:** EVERGREEN FOUNDATION.
- **Fundamental sources:** ENG-SWE-GOOGLE. **Official / product / protocol sources:** P-DOTNET, P-JAVA-JLS. **Production sources:** Not a primary signal for this track. **Hiring signal:** HIRE-MICROSOFT, HIRE-AMAZON. **Industry relevance signal:** TREND-GITHUB (context only).
- **Core capabilities:** invariants, domain/API boundaries, error handling, composition, dependency direction and refactoring. **Canonical failure classes:** leaky abstraction, duplicated rule, invalid state, accidental coupling. **Production symptom classes:** risky changes, inconsistent behavior, regressions. **Evidence / debugging direction:** trace one invariant through code, tests and persistence; distinguish cause from duplicate symptom.
- **Primary lab stack:** .NET 10 service plus focused tests. **Cross-stack / cross-vendor transfer:** Java/Spring uses the same boundary reasoning. **Explicit non-goals:** language-lawyer puzzles or pattern catalog memorization. **Exit evidence / mastery target:** justify a refactor that protects an invariant and falsify the old design with a test. **Estimated first-pass focused hours:** 24–36. **Estimate confidence:** LOW-CONFIDENCE. **Open research questions:** smallest representative refactoring fixture.

### 2. Runtime & Memory

- **Why Senior needs it:** allocation, lifetime and blocking symptoms cannot be solved by guessing at GC. **Depth class:** MUST MASTER. **Status tags:** EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-OS-BERKELEY. **Official / product / protocol sources:** P-DOTNET, P-DOTNET-DIAG, P-JAVA-JVMS. **Production sources:** PROD-GOOGLE-SRE. **Hiring signal:** HIRE-MICROSOFT. **Industry relevance signal:** TREND-SO (context only).
- **Core capabilities:** managed heap, allocation rate, GC generations, retention, stack/heap intuition, pooling boundaries and async resource lifetime. **Canonical failure classes:** allocation churn, retained object, LOH pressure, finalizer leak, unsafe buffer ownership. **Production symptom classes:** rising memory, GC time, OOM, latency spikes. **Evidence / debugging direction:** correlate allocation/heap/GC with a memory dump and retaining path; test one lifetime hypothesis.
- **Primary lab stack:** .NET API/worker with dotnet-counters, dotnet-trace and dotnet-dump. **Cross-stack / cross-vendor transfer:** transfer heap/retention reasoning to JVM; investigate collector differences only when mitigation changes. **Explicit non-goals:** implementing GC or tuning every flag. **Exit evidence / mastery target:** explain a memory symptom from evidence and validate a safe mitigation. **Estimated first-pass focused hours:** 24–40. **Estimate confidence:** LOW-CONFIDENCE. **Open research questions:** Windows-friendly capture fixture.

### 3. Operating Systems & I/O Foundations

- **Why Senior needs it:** processes, threads, virtual memory, handles, sockets and termination are service substrate. **Depth class:** MUST MASTER. **Status tags:** EVERGREEN FOUNDATION.
- **Fundamental sources:** F-OS-BERKELEY. **Official / product / protocol sources:** P-DOTNET, P-K8S. **Production sources:** PROD-GOOGLE-SRE. **Hiring signal:** HIRE-MICROSOFT. **Industry relevance signal:** Not a primary signal for this track.
- **Core capabilities:** process/thread distinction, scheduling/waits, virtual memory/page cache, files/handles/sockets, blocking I/O, limits and graceful termination. **Canonical failure classes:** handle/socket leak, blocked I/O, starvation, memory pressure, termination-loss race. **Production symptom classes:** open-file/connection errors, queue growth, OOM/eviction, lost rollout work. **Evidence / debugging direction:** identify an exhausted OS resource with handle/socket, wait, runtime and container evidence.
- **Primary lab stack:** .NET worker/API with controlled file/socket use and shutdown. **Cross-stack / cross-vendor transfer:** transfers to JVM and containers; command surface is not the concept. **Explicit non-goals:** kernel, driver or scheduler implementation. **Exit evidence / mastery target:** connect an OS resource limit to app behavior and recovery. **Estimated first-pass focused hours:** 20–32. **Estimate confidence:** LOW-CONFIDENCE. **Open research questions:** minimum Windows/Linux evidence set.

### 4. Concurrency & Async

- **Why Senior needs it:** concurrent work must preserve invariants through overlap, cancellation, saturation and failure. **Depth class:** MUST MASTER DEEP. **Status tags:** EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-OS-BERKELEY, F-DS-MIT. **Official / product / protocol sources:** P-DOTNET, P-JAVA-JLS, P-JAVA-JVMS. **Production sources:** PROD-GOOGLE-SRE. **Hiring signal:** HIRE-MICROSOFT, HIRE-AMAZON. **Industry relevance signal:** Not a primary signal for this track.
- **Core capabilities:** async versus thread, await/cancellation, shared-state invariants, lock/atomic/channel choices, bounded concurrency, backpressure, ordering and ThreadPool starvation. **Canonical failure classes:** lost update, deadlock, race, unbounded fan-out, sync-over-async, fire-and-forget loss. **Production symptom classes:** high waits, stuck requests, queue growth, duplicate/missing state, latency collapse. **Evidence / debugging direction:** reproduce the interleaving; inspect tasks/threads, waits, queue depth and persisted result before changing synchronization.
- **Primary lab stack:** .NET async API/worker with PostgreSQL invariant and Channel/SemaphoreSlim exercises. **Cross-stack / cross-vendor transfer:** map to Java executors, CompletableFuture and JMM; deep dive only where memory/interrupt semantics change the conclusion. **Explicit non-goals:** lock-free research or one primitive as universal. **Exit evidence / mastery target:** prove an invariant across a race and defend a concurrency limit from load evidence. **Estimated first-pass focused hours:** 44–70. **Estimate confidence:** LOW-CONFIDENCE. **Open research questions:** deterministic learner race harness.

### 5. Networking & HTTP

- **Why Senior needs it:** a request failure is not automatically an application failure; safe diagnosis starts by locating the layer. **Depth class:** MUST MASTER. **Status tags:** EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-NET-STANFORD. **Official / product / protocol sources:** PROTO-HTTP, PROTO-TLS, P-DOTNET, P-SPRING. **Production sources:** PROD-AWS-RETRY. **Hiring signal:** HIRE-MICROSOFT, HIRE-AMAZON. **Industry relevance signal:** Not a primary signal for this track.
- **Core capabilities:** DNS, TCP, TLS, HTTP semantics, reuse/pools, proxy/load-balancer boundary, timeout, streaming, cancellation and retry safety. **Canonical failure classes:** DNS miss, connection exhaustion, TLS mismatch, proxy header misuse, timeout with unknown outcome, unsafe retry. **Production symptom classes:** connection errors, slow first byte, handshake failure, elevated 5xx/timeout. **Evidence / debugging direction:** timing, trace, socket/pool state, proxy headers and audit evidence identify the layer.
- **Primary lab stack:** ASP.NET Core + downstream stub with HttpClientFactory, cancellation and latency faults. **Cross-stack / cross-vendor transfer:** transfers to Spring WebClient and compliant clients. **Explicit non-goals:** routing certification or packet-capture specialization. **Exit evidence / mastery target:** state failure layer, unknown outcome and safe next action. **Estimated first-pass focused hours:** 24–38. **Estimate confidence:** LOW-CONFIDENCE. **Open research questions:** local TLS/proxy fixture.

### 6. Relational Database Engineering

- **Why Senior needs it:** durable correctness and much backend performance depend on data-model, transaction and query reasoning. **Depth class:** MUST MASTER DEEP. **Status tags:** EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-DB-CMU. **Official / product / protocol sources:** P-PG, P-SQLSERVER, P-MYSQL-INNODB, P-ORACLE. **Production sources:** PROD-GOOGLE-SRE. **Hiring signal:** HIRE-MICROSOFT, HIRE-AMAZON. **Industry relevance signal:** TREND-SO (context only).
- **Core capabilities:** modelling/invariants; physical pages/heap; buffer management; indexes and composite query shape; execution/optimizer/stats; ACID/isolation/MVCC/locking/deadlocks; WAL/recovery; constraints; migrations; replication/failover; partition/sharding; backup/RPO-RTO; pool exhaustion; production query diagnosis. **Canonical failure classes:** slow plan despite index, wrong composite index, stale stats/skew, lock/deadlock, migration under load, exhausted pool, bad backup/failover assumption. **Production symptom classes:** p99 query latency, rows/loops mismatch, buffer/I/O pressure, lock waits, pool saturation, replication/recovery lag. **Evidence / debugging direction:** query shape, actual-vs-estimated rows, plan, buffers, lock/activity and pool evidence; never infer from ORM syntax alone.
- **Primary lab stack:** PostgreSQL 18 + SQL + EF Core/Dapper; PostgreSQL is a lab engine, not the universal model. **Cross-stack / cross-vendor transfer:** compare SQL Server/MySQL/Oracle where layout, MVCC/read consistency, locking, plan or online-DDL changes the result. **Explicit non-goals:** DBA certification or deep operation of four engines. **Exit evidence / mastery target:** predict, observe and defend a query/transaction/recovery decision, then name engine deltas. **Estimated first-pass focused hours:** 70–105. **Estimate confidence:** LOW-CONFIDENCE. **Open research questions:** safe HA/restore and migration-under-traffic fixture.

### 7. NoSQL & Specialized Data Systems

- **Why Senior needs it:** choose an access pattern and correctness boundary, not a fashionable database brand. **Depth class:** SHOULD MASTER / TRANSFER. **Status tags:** CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-DB-CMU, F-DS-MIT. **Official / product / protocol sources:** P-MONGO, P-CASSANDRA, P-REDIS, P-SEARCH. **Production sources:** Not a primary signal for this track. **Hiring signal:** HIRE-AMAZON. **Industry relevance signal:** TREND-SO, TREND-GITHUB (context only).
- **Core capabilities:** MongoDB document/aggregate and index/shard boundary; Cassandra partition/clustering keys, LSM, compaction, tombstones and consistency; Redis key structures, memory, TTL/eviction, persistence, replication, cluster and Streams; Search inverted index, analyzer, relevance, refresh and source-of-truth boundary. **Canonical failure classes:** unbounded document/hot shard, hot/huge Cassandra partition/tombstone scan, Redis eviction/hot key/slot, search mapping mismatch or stale visibility. **Production symptom classes:** unbounded read/write amplification, uneven load, memory loss, inconsistent search result. **Evidence / debugging direction:** inspect query/index/profile, partition/key distribution, memory/latency, refresh and replica evidence.
- **Primary lab stack:** local MongoDB, Redis and OpenSearch; Cassandra model/simulation before multi-region operations. **Cross-stack / cross-vendor transfer:** compare access pattern, partition/consistency and source-of-truth contract; products are not interchangeable. **Explicit non-goals:** operate all products deeply or call JSON “schema-free correctness.” **Exit evidence / mastery target:** reject a mismatched data model and transfer the reason. **Estimated first-pass focused hours:** 30–48. **Estimate confidence:** LOW-CONFIDENCE. **Open research questions:** bounded Cassandra and search fixtures.

### 8. Cache Engineering

- **Why Senior needs it:** cache improves a path only while correctness, invalidation and load-shedding remain explicit. **Depth class:** MUST MASTER. **Status tags:** EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-DS-MIT. **Official / product / protocol sources:** P-REDIS. **Production sources:** PROD-GOOGLE-SRE, PROD-AWS-RETRY. **Hiring signal:** HIRE-MICROSOFT. **Industry relevance signal:** TREND-SO (context only).
- **Core capabilities:** source of truth, cache-aside, TTL, invalidation, consistency window, stampede, hot key, penetration, avalanche, fallback and cache observability. **Canonical failure classes:** stale read, missing invalidation, thundering herd, cache treated as authority, unsafe fallback. **Production symptom classes:** DB surge, skewed latency, stale customer view, Redis saturation. **Evidence / debugging direction:** follow key lifecycle, hit/miss, downstream load, TTL and invalidation event before adding cache capacity.
- **Primary lab stack:** .NET + PostgreSQL source of truth + Redis cache. **Cross-stack / cross-vendor transfer:** transfers to in-process/CDN cache after their invalidation/consistency contract is named. **Explicit non-goals:** Redis data-structure/Streams operation; that belongs to track 7. **Exit evidence / mastery target:** design and test a stale-data and stampede recovery path. **Estimated first-pass focused hours:** 20–34. **Estimate confidence:** LOW-CONFIDENCE. **Open research questions:** common cache metric contract.

### 9. Distributed Systems

- **Why Senior needs it:** multiple processes fail independently; senior decisions state a guarantee, its boundary and recovery. **Depth class:** MUST MASTER DEEP. **Status tags:** EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-DS-MIT, F-OS-BERKELEY. **Official / product / protocol sources:** P-DOTNET, P-JAVA-JVMS. **Production sources:** PROD-GOOGLE-SRE, PROD-AWS-RETRY. **Hiring signal:** HIRE-MICROSOFT, HIRE-AMAZON. **Industry relevance signal:** Not a primary signal for this track.
- **Core capabilities:** partial failure, time/ordering limits, consistency models, ownership, replication, quorum/leader intuition, distributed transaction boundaries, reconciliation and blast radius. **Canonical failure classes:** split/lagged state, duplicate/late message, timeout unknown outcome, failed leader/failover assumption, false global ordering. **Production symptom classes:** divergent balances/status, retry storms, stale reads, cross-service incident. **Evidence / debugging direction:** identify source of truth, causal boundary, audit/reconciliation record and competing hypotheses before proposing coordination.
- **Primary lab stack:** multi-process .NET services with PostgreSQL and controlled faults. **Cross-stack / cross-vendor transfer:** .NET stays a complete deep lane; Java is transfer; only genuine runtime/broker/engine differences add depth. **Explicit non-goals:** implement Raft/Paxos or claim universal consistency. **Exit evidence / mastery target:** explain guarantee, unknown outcome and recovery for an unseen cross-service case. **Estimated first-pass focused hours:** 60–95. **Estimate confidence:** LOW-CONFIDENCE. **Open research questions:** visible deterministic failure simulation.

### 10. Messaging & Event-Driven Consistency

- **Why Senior needs it:** a broker moves records, not automatically one correct business effect. **Depth class:** MUST MASTER. **Status tags:** CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-DS-MIT. **Official / product / protocol sources:** P-KAFKA, P-PG. **Production sources:** PROD-AWS-RETRY, PROD-AWS-IDEMPOTENCY. **Hiring signal:** HIRE-MICROSOFT. **Industry relevance signal:** TREND-CNCF (context only).
- **Core capabilities:** producer/consumer, partition/order scope, ack/offset, retry, duplicate, poison, replay, rebalance, idempotency, outbox/inbox, reconciliation, unknown external effect, schema evolution/compatibility and event ownership. Kafka is the primary case, not the definition. **Canonical failure classes:** duplicate, poison, premature ack, ordering assumption, retry storm, incompatible replay, DB-publish gap, external unknown outcome. **Production symptom classes:** duplicate business action, missing state transition, lag, stuck partition, incompatible consumer. **Evidence / debugging direction:** inspect headers/schema version, consumer ledger, offset/ack state, audit/outbox and broker-client delivery contract.
- **Primary lab stack:** PostgreSQL outbox + Kafka-style producer/consumer. **Cross-stack / cross-vendor transfer:** Kafka → RabbitMQ retains delivery principles but re-evaluates broker contract, routing, ordering and acknowledgement. **Explicit non-goals:** universal exactly-once or broker configuration memorization. **Exit evidence / mastery target:** replay a changed event and prove one local effect is safe. **Estimated first-pass focused hours:** 32–50. **Estimate confidence:** LOW-CONFIDENCE. **Open research questions:** schema-registry fixture.

### 11. API Contracts & Resilience

- **Why Senior needs it:** public behavior must survive retry, timeout, evolution and downstream failure without silently corrupting an operation. **Depth class:** MUST MASTER. **Status tags:** EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-NET-STANFORD, F-DS-MIT. **Official / product / protocol sources:** PROTO-HTTP, P-DOTNET, P-SPRING. **Production sources:** PROD-AWS-RETRY, PROD-AWS-IDEMPOTENCY. **Hiring signal:** HIRE-MICROSOFT. **Industry relevance signal:** Not a primary signal for this track.
- **Core capabilities:** contract/versioning, validation, status semantics, pagination/filtering, idempotency key, timeout/retry/circuit/bulkhead boundaries, cancellation, error taxonomy and backward compatibility. **Canonical failure classes:** breaking response change, retry duplicate, conflicting idempotency key, swallowed cancellation, timeout treated as failure. **Production symptom classes:** client breakage, duplicate transaction, retry storm, inconsistent errors. **Evidence / debugging direction:** inspect contract, request fingerprint, operation/audit record, downstream state and retry budget.
- **Primary lab stack:** ASP.NET Core API + downstream fault stub + persistent idempotency record. **Cross-stack / cross-vendor transfer:** Spring REST uses the same HTTP and side-effect reasoning. **Explicit non-goals:** one resilience library policy for every call. **Exit evidence / mastery target:** defend a compatible contract and safe unknown-outcome flow. **Estimated first-pass focused hours:** 28–44. **Estimate confidence:** LOW-CONFIDENCE. **Open research questions:** canonical error taxonomy.

### 12. Security

- **Why Senior needs it:** backend ownership includes deciding who can act on which object, from which trust boundary, under abuse. **Depth class:** MUST MASTER. **Status tags:** EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY.
- **Fundamental sources:** Not a primary signal for this track. **Official / product / protocol sources:** SEC-OWASP, SEC-PORTSWIGGER, P-DOTNET, P-SPRING, PROTO-TLS. **Production sources:** PROD-GOOGLE-SRE. **Hiring signal:** HIRE-AMAZON. **Industry relevance signal:** Not a primary signal for this track.
- **Core capabilities:** authentication, authorization, object/tenant authorization, session/token, OAuth/OIDC awareness, validation, SQL/NoSQL injection, SSRF, CSRF/CORS/XSS backend implications, abuse, secrets, unsafe third-party trust, race abuse and audit. **Canonical failure classes:** IDOR/tenant escape, injection, SSRF, leaked secret, permissive CORS, token/session misuse, unsafe callback. **Production symptom classes:** unauthorized access, data leak, anomalous traffic, audit gap. **Evidence / debugging direction:** reproduce against a safe fixture; trace identity, policy, object ownership, input and audit decision.
- **Primary lab stack:** ASP.NET Core policy/tenant tests and safe HTTP/database stubs. **Cross-stack / cross-vendor transfer:** Spring Security changes implementation, not trust-boundary reasoning. **Explicit non-goals:** full pentest, cryptography course or compliance certification. **Exit evidence / mastery target:** demonstrate exploit path, layered fix and regression evidence. **Estimated first-pass focused hours:** 34–54. **Estimate confidence:** LOW-CONFIDENCE. **Open research questions:** safe SSRF exercise.

### 13. Observability & Performance

- **Why Senior needs it:** a dashboard is evidence collection, not a root-cause answer. **Depth class:** MUST MASTER. **Status tags:** EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-OS-BERKELEY, F-DB-CMU. **Official / product / protocol sources:** P-OTEL, P-DOTNET-DIAG, P-PG. **Production sources:** PROD-GOOGLE-SRE. **Hiring signal:** HIRE-MICROSOFT. **Industry relevance signal:** TREND-DORA (context only).
- **Core capabilities:** p50/p95/p99, throughput, saturation/errors, CPU, allocation/memory/GC, ThreadPool/queues, blocking/waits, DB I/O, profiling/tracing/metrics/logs, context propagation, sampling, high cardinality, load-test and benchmark validity. **Canonical failure classes:** average hides tail, bad sampling/cardinality, benchmark without workload, missing context, GC/ThreadPool/DB bottleneck guess. **Production symptom classes:** high p99, throughput collapse, CPU/GC pressure, queue growth, slow DB. **Evidence / debugging direction:** symptom → competing hypotheses → discriminating evidence → experiment → root cause → mitigation; never dashboard → guess.
- **Primary lab stack:** OTel + .NET diagnostics + PostgreSQL under controlled load. **Cross-stack / cross-vendor transfer:** Java OTel/JFR-equivalent evidence; vendor dashboards are replaceable. **Explicit non-goals:** monitoring-vendor course or synthetic benchmark presented as production truth. **Exit evidence / mastery target:** defend a root-cause conclusion with disconfirming evidence. **Estimated first-pass focused hours:** 32–52. **Estimate confidence:** LOW-CONFIDENCE. **Open research questions:** local telemetry/load budget.

### 14. Reliability / SRE

- **Why Senior needs it:** service design must include overload, recovery and bounded blast radius. **Depth class:** MUST MASTER. **Status tags:** CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-DS-MIT. **Official / product / protocol sources:** P-OTEL, P-K8S. **Production sources:** PROD-GOOGLE-SRE, PROD-AWS-RETRY. **Hiring signal:** HIRE-AMAZON. **Industry relevance signal:** TREND-DORA (context only).
- **Core capabilities:** SLI/SLO/error budget intuition, load shedding, timeout/retry budgets, graceful degradation, dependency failure, incident evidence, rollout/rollback, backup/recovery and RPO/RTO reasoning. **Canonical failure classes:** retry amplification, cascading failure, unbounded queue, poor readiness, untested recovery. **Production symptom classes:** availability loss, overload, rising error/latency, failed deployment, recovery gap. **Evidence / debugging direction:** define user impact and dependency boundary; use error/latency/saturation plus recovery/audit evidence.
- **Primary lab stack:** .NET services with downstream faults, OTel and local deployment target. **Cross-stack / cross-vendor transfer:** principles survive cloud/tool changes. **Explicit non-goals:** on-call ceremony or SRE job replacement. **Exit evidence / mastery target:** propose a bounded mitigation and recovery verification. **Estimated first-pass focused hours:** 24–40. **Estimate confidence:** LOW-CONFIDENCE. **Open research questions:** safe overload cap.

### 15. Testing & Engineering Quality

- **Why Senior needs it:** quality evidence should falsify risky assumptions before a customer does. **Depth class:** MUST MASTER. **Status tags:** EVERGREEN FOUNDATION.
- **Fundamental sources:** ENG-SWE-GOOGLE. **Official / product / protocol sources:** P-DOTNET, P-SPRING. **Production sources:** PROD-GOOGLE-SRE. **Hiring signal:** HIRE-AMAZON. **Industry relevance signal:** Not a primary signal for this track.
- **Core capabilities:** test pyramid by risk, unit/integration/contract tests, fixtures, deterministic time/concurrency, property/boundary cases, migration and failure testing, CI feedback and review evidence. **Canonical failure classes:** mock proves wrong behavior, flaky test, coverage-only target, missing contract test, production-only failure path. **Production symptom classes:** escaped regression, non-reproducible CI, unsafe release. **Evidence / debugging direction:** state the risky assumption, create a failing test/fixture, then prove behavior at the required boundary.
- **Primary lab stack:** .NET test suite with PostgreSQL/broker stubs and CI-friendly fixtures. **Cross-stack / cross-vendor transfer:** JUnit/Spring test mechanics differ, risk model does not. **Explicit non-goals:** coverage quota or framework trivia. **Exit evidence / mastery target:** add the smallest reliable test that would have caught a risky regression. **Estimated first-pass focused hours:** 24–40. **Estimate confidence:** LOW-CONFIDENCE. **Open research questions:** shared fixture standard.

### 16. Architecture & System Design

- **Why Senior needs it:** design is the act of making requirements, ownership, failure and trade-offs inspectable. **Depth class:** MUST MASTER. **Status tags:** EVERGREEN FOUNDATION; CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-DS-MIT, F-DB-CMU. **Official / product / protocol sources:** P-DOTNET, P-K8S. **Production sources:** PROD-GOOGLE-SRE. **Hiring signal:** HIRE-MICROSOFT, HIRE-AMAZON. **Industry relevance signal:** Not a primary signal for this track.
- **Core capabilities:** requirement clarification, data ownership, synchronous/asynchronous boundaries, capacity assumptions, consistency, failure/recovery, security/observability and incremental delivery. **Canonical failure classes:** diagram-first design, shared DB ownership, unbounded dependency chain, unspoken consistency assumption, no recovery path. **Production symptom classes:** ambiguous responsibility, incident blast radius, costly change, unreconcilable state. **Evidence / debugging direction:** map requirement → invariant → option → evidence → trade-off → recovery; request missing constraints rather than invent them.
- **Primary lab stack:** order/payment-like .NET design with PostgreSQL, cache and broker boundaries. **Cross-stack / cross-vendor transfer:** architecture is portable; technology choice is justified by a contract. **Explicit non-goals:** template diagrams or a second distributed-systems course. **Exit evidence / mastery target:** defend one design under a changed requirement and failure injection. **Estimated first-pass focused hours:** 32–52. **Estimate confidence:** LOW-CONFIDENCE. **Open research questions:** stable scenario vocabulary.

### 17. Containers / Kubernetes / Cloud Delivery

- **Why Senior needs it:** application behavior changes under image, lifecycle, configuration, rollout and platform resource boundaries. **Depth class:** SHOULD MASTER / TRANSFER. **Status tags:** CURRENT PRODUCTION REALITY.
- **Fundamental sources:** F-OS-BERKELEY. **Official / product / protocol sources:** P-K8S, P-DOTNET. **Production sources:** PROD-GOOGLE-SRE. **Hiring signal:** HIRE-MICROSOFT. **Industry relevance signal:** TREND-CNCF (context only).
- **Core capabilities:** image/process boundary, config/secrets, request/limit meaning, probe/lifecycle, deployment/rollout/rollback, logs/metrics and managed-cloud responsibility boundary. **Canonical failure classes:** bad image/config, readiness misconception, OOMKilled, failed rollout, secret leak, treating a pod as durable state. **Production symptom classes:** CrashLoopBackOff, unavailable rollout, throttling, lost work, inaccessible evidence. **Evidence / debugging direction:** read lifecycle/status/events, resource usage, app logs and deployment history before changing YAML.
- **Primary lab stack:** containerized .NET service on local Kubernetes plus one managed-cloud conceptual transfer. **Cross-stack / cross-vendor transfer:** Kubernetes concepts transfer across clouds; provider integrations require their own contract review. **Explicit non-goals:** cluster-admin certification, all cloud services or Helm trivia. **Exit evidence / mastery target:** explain and recover a rollout/lifecycle failure without treating Kubernetes as magic. **Estimated first-pass focused hours:** 28–48. **Estimate confidence:** LOW-CONFIDENCE. **Open research questions:** Windows-friendly local cluster baseline.

## 9. Implementation lanes

### .NET — PRIMARY DEEP IMPLEMENTATION LANE

.NET is the primary place for deep runnable evidence: ASP.NET Core request lifetime, async/Task/ThreadPool, DI/lifetime, EF Core/Dapper query shape, diagnostics, OpenTelemetry, testing and container delivery. P-DOTNET and P-DOTNET-DIAG anchor current behavior. A learner can complete the core engineering map without Java.

### JVM / Java / Spring — SHOULD MASTER / TRANSFER delta lane

P-JAVA-JLS, P-JAVA-JVMS and P-SPRING are used after the portable concept and .NET deep implementation are stable. Reuse the mechanism, then learn only differences that alter behavior: memory model/interrupt/cancellation, runtime diagnostics, framework transaction/lifetime, HTTP client and observability integration. This lane is neither a duplicate foundation nor a requirement to become a Java specialist.

## 10. Overlays

### Big-Tech Interview Overlay — INTERVIEW OVERLAY

- **Purpose:** DSA, time-boxed system-design stress, behavioral/impact communication.
- **Sources:** HIRE-MICROSOFT, HIRE-AMAZON; core track sources remain truth.
- **Boundary:** it changes assessment practice, not the core portfolio. A candidate can skip this overlay and still have a complete senior-backend core.
- **Hours:** 24–45, **LOW-CONFIDENCE**; repeated interview practice is excluded.

### AI-assisted Engineering — CURRENT EXPANSION

- **Purpose:** use generated code and research with verification, provenance, security and test evidence.
- **Sources:** ENG-SWE-GOOGLE, SEC-OWASP, TREND-GITHUB (context only).
- **Boundary:** AI tool change does not alter the core mechanisms. The exit is evidence-backed accept/reject judgment, not prompt tricks.
- **Hours:** 12–20, **LOW-CONFIDENCE**.

## 11. Cross-track / vendor boundaries

- PostgreSQL is the relational primary lab; SQL Server, MySQL/InnoDB and Oracle are transfer deltas, not four duplicate database tracks.
- Kafka is the event primary case; RabbitMQ requires a fresh broker-contract check. Delivery principles persist; ordering, acknowledgement and routing semantics must not be assumed identical.
- Redis data-system work remains in track 7; cache correctness remains track 8.
- Kubernetes can disappear from a role without making core backend reasoning incoherent. It is an implementation lane, not a prerequisite for concurrency, DB, distributed systems or reliability.
- A vendor becoming less popular does not remove an evergreen mechanism. Trend sources are never a promotion rule.

## 12. Adversarial curriculum review

| Challenge | Result |
|---|---|
| Kubernetes disappears | Core remains coherent; only implementation-lane practice changes. |
| SQL Server replaces PostgreSQL | Portable relational mechanisms remain; engine deltas are researched. |
| Kafka becomes RabbitMQ | Delivery principles persist; broker contract is re-evaluated. |
| No Java role | .NET lane remains complete. |
| .NET role moves to Java | Portable mechanisms reuse; Java adds only real deltas. |
| Redis structures/Streams are needed | Track 7 remains useful; Cache Engineering stays separate. |
| No Big-Tech target | Core remains complete; overlay is optional. |
| AI tools change | Core is unaffected; verification practice adapts. |
| Vendor loses popularity | Evergreen mechanism survives; trend evidence stays context-only. |
| Candidate knows APIs but cannot diagnose | Exit evidence fails. |
| Candidate explains but cannot reproduce/debug | Foundation is insufficient. |
| Employer-only topic without engineering evidence | Move it to an overlay or omit it. |

## 13. Remaining research questions

1. Dependency graph and duplicate-concept elimination.
2. Canonical cases and assessment variants.
3. Windows-friendly fixtures for broker, telemetry, restore and local Kubernetes.
4. Version-sensitive lab policy and source recheck cadence.
5. Unique-path hours after dependency decomposition and deduplication.

## 14. Step-1 freeze criteria

- [x] Exactly one canonical portfolio classification has 17 core tracks.
- [x] OS/I/O is an explicit core track; NoSQL has explicit MongoDB, Cassandra, Redis-as-data-system and Search scope.
- [x] Redis-as-data-system and Cache Engineering are separate.
- [x] Every core dossier uses the standard field contract and has a single LOW-CONFIDENCE range.
- [x] Deep tracks include failure, debugging evidence and transfer direction.
- [x] Source IDs used by the map exist in the registry; each registry entry is cited or intentionally retained as an implementation-boundary reference.
- [x] .NET is the deep lane; Java is transfer; overlays are not core.
- [x] No stale aggregate total or obsolete core-track hour range is published.
- [x] Step 1 stops here: no roadmap, dependency map, case bank, lesson, code, Supabase or UI work.
