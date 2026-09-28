# Senior Backend Deep-Track Capability Map

> **Status:** Phase 2 / Step 2 canonical decomposition.
> **Purpose:** what a Senior Backend engineer must be capable of. This is not learning order, a dependency graph, lesson plan, case bank, or hour estimate.

## Invariants and pre-edit gate

- Exactly 17 frozen Step-1 core tracks are used.
- Capability IDs are stable semantic identifiers; document order != learning order != dependency graph.
- Phase 2 Step 3 owns dependency edges. Only L1, L2, L3 and L4 are used; there is no L5.
- Each node has one canonical owner; consumer tracks only recap/apply or add domain-specific failure evidence.

## Canonical inventory

| # | Track | Depth |
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

## Track capability decomposition

### Programming & Software Design Foundations

**Track purpose:** Demonstrate reusable senior reasoning about code invariants and resource ownership.

**Depth class:** MUST MASTER

**Track-level non-goals:** Vendor trivia, configuration memorization and concepts owned by another track.

**Canonical owner concepts:** code invariants and resource ownership.


| ID | Capability / learner outcome | Primary owner track | Required for track exit | Minimum technical evidence | Mechanism / mental model | Canonical failures | Observable evidence | Production boundary / trade-off | Transfer axis | Primary implementation anchor |
|---|---|---|---|---|---|---|---|---|---|---|
| prog-api-refactoring-change-safety | Can explain, apply and reason about prog api refactoring change safety. | Programming & Software Design Foundations | YES | L4 | code invariants and resource ownership | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Java/Spring | .NET 10 + tests |
| prog-collections-complexity | Can explain, apply and reason about prog collections complexity. | Programming & Software Design Foundations | YES | L2 | code invariants and resource ownership | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Java/Spring | .NET 10 + tests |
| prog-composition-dependencies | Can explain, apply and reason about prog composition dependencies. | Programming & Software Design Foundations | YES | L3 | code invariants and resource ownership | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Java/Spring | .NET 10 + tests |
| prog-errors-results | Can explain, apply and reason about prog errors results. | Programming & Software Design Foundations | YES | L2 | code invariants and resource ownership | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Java/Spring | .NET 10 + tests |
| prog-invariants-domain-model | Can explain, apply and reason about prog invariants domain model. | Programming & Software Design Foundations | YES | L3 | code invariants and resource ownership | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Java/Spring | .NET 10 + tests |
| prog-resource-ownership | Can explain, apply and reason about prog resource ownership. | Programming & Software Design Foundations | YES | L3 | code invariants and resource ownership | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Java/Spring | .NET 10 + tests |
| prog-types-generics | Can explain, apply and reason about prog types generics. | Programming & Software Design Foundations | YES | L2 | code invariants and resource ownership | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Java/Spring | .NET 10 + tests |
| prog-values-identity | Can explain, apply and reason about prog values identity. | Programming & Software Design Foundations | YES | L2 | code invariants and resource ownership | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Java/Spring | .NET 10 + tests |

**Track exit synthesis:** Every required node must meet its stated L-level; a definition-only answer does not satisfy L3/L4.

**Cross-track consumers / transfers:** Consumer tracks may apply this capability but must not re-teach its canonical mechanism.

**Unresolved dependency questions:** Exact prerequisite edges are intentionally deferred to Step 3.

### Runtime & Memory

**Track purpose:** Demonstrate reusable senior reasoning about managed execution, allocation, GC and diagnostics.

**Depth class:** MUST MASTER

**Track-level non-goals:** Vendor trivia, configuration memorization and concepts owned by another track.

**Canonical owner concepts:** managed execution, allocation, GC and diagnostics.


| ID | Capability / learner outcome | Primary owner track | Required for track exit | Minimum technical evidence | Mechanism / mental model | Canonical failures | Observable evidence | Production boundary / trade-off | Transfer axis | Primary implementation anchor |
|---|---|---|---|---|---|---|---|---|---|---|
| runtime-allocation-gc | Can explain, apply and reason about runtime allocation gc. | Runtime & Memory | YES | L3 | managed execution, allocation, GC and diagnostics | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JVM | .NET CLR diagnostics |
| runtime-diagnostics | Can explain, apply and reason about runtime diagnostics. | Runtime & Memory | YES | L3 | managed execution, allocation, GC and diagnostics | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JVM | .NET CLR diagnostics |
| runtime-jit-warmup | Can explain, apply and reason about runtime jit warmup. | Runtime & Memory | YES | L2 | managed execution, allocation, GC and diagnostics | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JVM | .NET CLR diagnostics |
| runtime-managed-execution | Can explain, apply and reason about runtime managed execution. | Runtime & Memory | YES | L2 | managed execution, allocation, GC and diagnostics | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JVM | .NET CLR diagnostics |
| runtime-memory-performance-debug | Can explain, apply and reason about runtime memory performance debug. | Runtime & Memory | YES | L4 | managed execution, allocation, GC and diagnostics | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JVM | .NET CLR diagnostics |
| runtime-memory-roots-lifetime | Can explain, apply and reason about runtime memory roots lifetime. | Runtime & Memory | YES | L2 | managed execution, allocation, GC and diagnostics | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JVM | .NET CLR diagnostics |
| runtime-retention-pooling-large-objects | Can explain, apply and reason about runtime retention pooling large objects. | Runtime & Memory | YES | L3 | managed execution, allocation, GC and diagnostics | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JVM | .NET CLR diagnostics |

**Track exit synthesis:** Every required node must meet its stated L-level; a definition-only answer does not satisfy L3/L4.

**Cross-track consumers / transfers:** Consumer tracks may apply this capability but must not re-teach its canonical mechanism.

**Unresolved dependency questions:** Exact prerequisite edges are intentionally deferred to Step 3.

### Operating Systems & I/O Foundations

**Track purpose:** Demonstrate reusable senior reasoning about processes, I/O and resource lifecycle.

**Depth class:** MUST MASTER

**Track-level non-goals:** Vendor trivia, configuration memorization and concepts owned by another track.

**Canonical owner concepts:** processes, I/O and resource lifecycle.


| ID | Capability / learner outcome | Primary owner track | Required for track exit | Minimum technical evidence | Mechanism / mental model | Canonical failures | Observable evidence | Production boundary / trade-off | Transfer axis | Primary implementation anchor |
|---|---|---|---|---|---|---|---|---|---|---|
| os-blocking-io-waits | Can explain, apply and reason about os blocking io waits. | Operating Systems & I/O Foundations | YES | L3 | processes, I/O and resource lifecycle | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | containers/JVM | .NET worker + OS tools |
| os-files-handles-sockets-ipc | Can explain, apply and reason about os files handles sockets ipc. | Operating Systems & I/O Foundations | YES | L2 | processes, I/O and resource lifecycle | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | containers/JVM | .NET worker + OS tools |
| os-process-thread-kernel | Can explain, apply and reason about os process thread kernel. | Operating Systems & I/O Foundations | YES | L2 | processes, I/O and resource lifecycle | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | containers/JVM | .NET worker + OS tools |
| os-resource-exhaustion | Can explain, apply and reason about os resource exhaustion. | Operating Systems & I/O Foundations | YES | L3 | processes, I/O and resource lifecycle | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | containers/JVM | .NET worker + OS tools |
| os-scheduling-starvation | Can explain, apply and reason about os scheduling starvation. | Operating Systems & I/O Foundations | YES | L3 | processes, I/O and resource lifecycle | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | containers/JVM | .NET worker + OS tools |
| os-termination-graceful-shutdown | Can explain, apply and reason about os termination graceful shutdown. | Operating Systems & I/O Foundations | YES | L3 | processes, I/O and resource lifecycle | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | containers/JVM | .NET worker + OS tools |
| os-virtual-memory-page-cache | Can explain, apply and reason about os virtual memory page cache. | Operating Systems & I/O Foundations | YES | L2 | processes, I/O and resource lifecycle | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | containers/JVM | .NET worker + OS tools |

**Track exit synthesis:** Every required node must meet its stated L-level; a definition-only answer does not satisfy L3/L4.

**Cross-track consumers / transfers:** Consumer tracks may apply this capability but must not re-teach its canonical mechanism.

**Unresolved dependency questions:** Exact prerequisite edges are intentionally deferred to Step 3.

### Concurrency & Async

**Track purpose:** Demonstrate reusable senior reasoning about interleavings, synchronization, cancellation and backpressure.

**Depth class:** MUST MASTER DEEP

**Track-level non-goals:** Vendor trivia, configuration memorization and concepts owned by another track.

**Canonical owner concepts:** interleavings, synchronization, cancellation and backpressure.


| ID | Capability / learner outcome | Primary owner track | Required for track exit | Minimum technical evidence | Mechanism / mental model | Canonical failures | Observable evidence | Production boundary / trade-off | Transfer axis | Primary implementation anchor |
|---|---|---|---|---|---|---|---|---|---|---|
| concurrency-async-parallelism | Can explain, apply and reason about concurrency async parallelism. | Concurrency & Async | YES | L2 | interleavings, synchronization, cancellation and backpressure | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JMM/executors | Task, Channel, SemaphoreSlim |
| concurrency-bounded-backpressure | Can explain, apply and reason about concurrency bounded backpressure. | Concurrency & Async | YES | L3 | interleavings, synchronization, cancellation and backpressure | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JMM/executors | Task, Channel, SemaphoreSlim |
| concurrency-cancellation-lifetime | Can explain, apply and reason about concurrency cancellation lifetime. | Concurrency & Async | YES | L3 | interleavings, synchronization, cancellation and backpressure | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JMM/executors | Task, Channel, SemaphoreSlim |
| concurrency-deadlock-starvation | Can explain, apply and reason about concurrency deadlock starvation. | Concurrency & Async | YES | L3 | interleavings, synchronization, cancellation and backpressure | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JMM/executors | Task, Channel, SemaphoreSlim |
| concurrency-interleavings-invariants | Can explain, apply and reason about concurrency interleavings invariants. | Concurrency & Async | YES | L3 | interleavings, synchronization, cancellation and backpressure | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JMM/executors | Task, Channel, SemaphoreSlim |
| concurrency-local-vs-distributed | Can explain, apply and reason about concurrency local vs distributed. | Concurrency & Async | YES | L4 | interleavings, synchronization, cancellation and backpressure | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JMM/executors | Task, Channel, SemaphoreSlim |
| concurrency-memory-visibility | Can explain, apply and reason about concurrency memory visibility. | Concurrency & Async | YES | L3 | interleavings, synchronization, cancellation and backpressure | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JMM/executors | Task, Channel, SemaphoreSlim |
| concurrency-races-check-then-act | Can explain, apply and reason about concurrency races check then act. | Concurrency & Async | YES | L3 | interleavings, synchronization, cancellation and backpressure | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JMM/executors | Task, Channel, SemaphoreSlim |
| concurrency-synchronization-atomicity | Can explain, apply and reason about concurrency synchronization atomicity. | Concurrency & Async | YES | L3 | interleavings, synchronization, cancellation and backpressure | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JMM/executors | Task, Channel, SemaphoreSlim |

**Track exit synthesis:** Every required node must meet its stated L-level; a definition-only answer does not satisfy L3/L4.

**Cross-track consumers / transfers:** Consumer tracks may apply this capability but must not re-teach its canonical mechanism.

**Unresolved dependency questions:** Exact prerequisite edges are intentionally deferred to Step 3.

### Networking & HTTP

**Track purpose:** Demonstrate reusable senior reasoning about DNS, TCP, TLS, HTTP and connection lifecycle.

**Depth class:** MUST MASTER

**Track-level non-goals:** Vendor trivia, configuration memorization and concepts owned by another track.

**Canonical owner concepts:** DNS, TCP, TLS, HTTP and connection lifecycle.


| ID | Capability / learner outcome | Primary owner track | Required for track exit | Minimum technical evidence | Mechanism / mental model | Canonical failures | Observable evidence | Production boundary / trade-off | Transfer axis | Primary implementation anchor |
|---|---|---|---|---|---|---|---|---|---|---|
| net-connection-reuse-pooling | Can explain, apply and reason about net connection reuse pooling. | Networking & HTTP | YES | L3 | DNS, TCP, TLS, HTTP and connection lifecycle | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring HTTP | ASP.NET Core + HttpClientFactory |
| net-failure-localization-unknown-outcome | Can explain, apply and reason about net failure localization unknown outcome. | Networking & HTTP | YES | L4 | DNS, TCP, TLS, HTTP and connection lifecycle | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring HTTP | ASP.NET Core + HttpClientFactory |
| net-http-semantics | Can explain, apply and reason about net http semantics. | Networking & HTTP | YES | L2 | DNS, TCP, TLS, HTTP and connection lifecycle | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring HTTP | ASP.NET Core + HttpClientFactory |
| net-proxy-lb-forwarded-boundary | Can explain, apply and reason about net proxy lb forwarded boundary. | Networking & HTTP | YES | L3 | DNS, TCP, TLS, HTTP and connection lifecycle | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring HTTP | ASP.NET Core + HttpClientFactory |
| net-request-path-dns | Can explain, apply and reason about net request path dns. | Networking & HTTP | YES | L2 | DNS, TCP, TLS, HTTP and connection lifecycle | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring HTTP | ASP.NET Core + HttpClientFactory |
| net-streaming-body-cancellation | Can explain, apply and reason about net streaming body cancellation. | Networking & HTTP | YES | L3 | DNS, TCP, TLS, HTTP and connection lifecycle | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring HTTP | ASP.NET Core + HttpClientFactory |
| net-tcp-connection-semantics | Can explain, apply and reason about net tcp connection semantics. | Networking & HTTP | YES | L2 | DNS, TCP, TLS, HTTP and connection lifecycle | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring HTTP | ASP.NET Core + HttpClientFactory |
| net-tls-trust-handshake | Can explain, apply and reason about net tls trust handshake. | Networking & HTTP | YES | L2 | DNS, TCP, TLS, HTTP and connection lifecycle | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring HTTP | ASP.NET Core + HttpClientFactory |

**Track exit synthesis:** Every required node must meet its stated L-level; a definition-only answer does not satisfy L3/L4.

**Cross-track consumers / transfers:** Consumer tracks may apply this capability but must not re-teach its canonical mechanism.

**Unresolved dependency questions:** Exact prerequisite edges are intentionally deferred to Step 3.

### Relational Database Engineering

**Track purpose:** Demonstrate reusable senior reasoning about relational storage, transactions, recovery and diagnosis.

**Depth class:** MUST MASTER DEEP

**Track-level non-goals:** Vendor trivia, configuration memorization and concepts owned by another track.

**Canonical owner concepts:** relational storage, transactions, recovery and diagnosis.


| ID | Capability / learner outcome | Primary owner track | Required for track exit | Minimum technical evidence | Mechanism / mental model | Canonical failures | Observable evidence | Production boundary / trade-off | Transfer axis | Primary implementation anchor |
|---|---|---|---|---|---|---|---|---|---|---|
| db-backup-restore | Can explain, apply and reason about db backup restore. | Relational Database Engineering | YES | L3 | relational storage, transactions, recovery and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | SQL Server/MySQL/Oracle | PostgreSQL 18 |
| db-buffer-io | Can explain, apply and reason about db buffer io. | Relational Database Engineering | YES | L2 | relational storage, transactions, recovery and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | SQL Server/MySQL/Oracle | PostgreSQL 18 |
| db-composite-query-shape | Can explain, apply and reason about db composite query shape. | Relational Database Engineering | YES | L3 | relational storage, transactions, recovery and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | SQL Server/MySQL/Oracle | PostgreSQL 18 |
| db-connection-pool-exhaustion | Can explain, apply and reason about db connection pool exhaustion. | Relational Database Engineering | YES | L3 | relational storage, transactions, recovery and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | SQL Server/MySQL/Oracle | PostgreSQL 18 |
| db-execution-operators | Can explain, apply and reason about db execution operators. | Relational Database Engineering | YES | L3 | relational storage, transactions, recovery and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | SQL Server/MySQL/Oracle | PostgreSQL 18 |
| db-index-structures | Can explain, apply and reason about db index structures. | Relational Database Engineering | YES | L3 | relational storage, transactions, recovery and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | SQL Server/MySQL/Oracle | PostgreSQL 18 |
| db-locks-deadlocks-contention | Can explain, apply and reason about db locks deadlocks contention. | Relational Database Engineering | YES | L3 | relational storage, transactions, recovery and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | SQL Server/MySQL/Oracle | PostgreSQL 18 |
| db-modeling-invariants | Can explain, apply and reason about db modeling invariants. | Relational Database Engineering | YES | L3 | relational storage, transactions, recovery and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | SQL Server/MySQL/Oracle | PostgreSQL 18 |
| db-mvcc-visibility | Can explain, apply and reason about db mvcc visibility. | Relational Database Engineering | YES | L3 | relational storage, transactions, recovery and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | SQL Server/MySQL/Oracle | PostgreSQL 18 |
| db-optimizer-cardinality-stats | Can explain, apply and reason about db optimizer cardinality stats. | Relational Database Engineering | YES | L3 | relational storage, transactions, recovery and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | SQL Server/MySQL/Oracle | PostgreSQL 18 |
| db-partitioning-sharding-boundary | Can explain, apply and reason about db partitioning sharding boundary. | Relational Database Engineering | YES | L3 | relational storage, transactions, recovery and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | SQL Server/MySQL/Oracle | PostgreSQL 18 |
| db-physical-storage-pages | Can explain, apply and reason about db physical storage pages. | Relational Database Engineering | YES | L2 | relational storage, transactions, recovery and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | SQL Server/MySQL/Oracle | PostgreSQL 18 |
| db-production-diagnosis-transfer | Can explain, apply and reason about db production diagnosis transfer. | Relational Database Engineering | YES | L4 | relational storage, transactions, recovery and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | SQL Server/MySQL/Oracle | PostgreSQL 18 |
| db-replication-failover | Can explain, apply and reason about db replication failover. | Relational Database Engineering | YES | L3 | relational storage, transactions, recovery and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | SQL Server/MySQL/Oracle | PostgreSQL 18 |
| db-schema-evolution | Can explain, apply and reason about db schema evolution. | Relational Database Engineering | YES | L3 | relational storage, transactions, recovery and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | SQL Server/MySQL/Oracle | PostgreSQL 18 |
| db-transactions-isolation-anomalies | Can explain, apply and reason about db transactions isolation anomalies. | Relational Database Engineering | YES | L3 | relational storage, transactions, recovery and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | SQL Server/MySQL/Oracle | PostgreSQL 18 |
| db-wal-crash-recovery | Can explain, apply and reason about db wal crash recovery. | Relational Database Engineering | YES | L3 | relational storage, transactions, recovery and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | SQL Server/MySQL/Oracle | PostgreSQL 18 |

**Track exit synthesis:** Every required node must meet its stated L-level; a definition-only answer does not satisfy L3/L4.

**Cross-track consumers / transfers:** Consumer tracks may apply this capability but must not re-teach its canonical mechanism.

**Unresolved dependency questions:** Exact prerequisite edges are intentionally deferred to Step 3.

### NoSQL & Specialized Data Systems

**Track purpose:** Demonstrate reusable senior reasoning about engine-specific access models.

**Depth class:** SHOULD MASTER / TRANSFER

**Track-level non-goals:** Vendor trivia, configuration memorization and concepts owned by another track.

**Canonical owner concepts:** engine-specific access models.


| ID | Capability / learner outcome | Primary owner track | Required for track exit | Minimum technical evidence | Mechanism / mental model | Canonical failures | Observable evidence | Production boundary / trade-off | Transfer axis | Primary implementation anchor |
|---|---|---|---|---|---|---|---|---|---|---|
| nosql-cassandra-lsm-compaction-consistency | Can explain, apply and reason about nosql cassandra lsm compaction consistency. | NoSQL & Specialized Data Systems | YES | L3 | engine-specific access models | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | other data engines | MongoDB, Redis, OpenSearch |
| nosql-cassandra-partition-model | Can explain, apply and reason about nosql cassandra partition model. | NoSQL & Specialized Data Systems | YES | L3 | engine-specific access models | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | other data engines | MongoDB, Redis, OpenSearch |
| nosql-model-selection | Can explain, apply and reason about nosql model selection. | NoSQL & Specialized Data Systems | YES | L3 | engine-specific access models | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | other data engines | MongoDB, Redis, OpenSearch |
| nosql-mongo-aggregate-model | Can explain, apply and reason about nosql mongo aggregate model. | NoSQL & Specialized Data Systems | YES | L2 | engine-specific access models | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | other data engines | MongoDB, Redis, OpenSearch |
| nosql-mongo-index-shard-transaction | Can explain, apply and reason about nosql mongo index shard transaction. | NoSQL & Specialized Data Systems | YES | L3 | engine-specific access models | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | other data engines | MongoDB, Redis, OpenSearch |
| nosql-redis-persistence-replication-cluster-streams | Can explain, apply and reason about nosql redis persistence replication cluster streams. | NoSQL & Specialized Data Systems | YES | L3 | engine-specific access models | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | other data engines | MongoDB, Redis, OpenSearch |
| nosql-redis-structures-memory | Can explain, apply and reason about nosql redis structures memory. | NoSQL & Specialized Data Systems | YES | L2 | engine-specific access models | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | other data engines | MongoDB, Redis, OpenSearch |
| nosql-search-inverted-index-analysis | Can explain, apply and reason about nosql search inverted index analysis. | NoSQL & Specialized Data Systems | YES | L2 | engine-specific access models | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | other data engines | MongoDB, Redis, OpenSearch |
| nosql-search-refresh-shards-pagination | Can explain, apply and reason about nosql search refresh shards pagination. | NoSQL & Specialized Data Systems | YES | L3 | engine-specific access models | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | other data engines | MongoDB, Redis, OpenSearch |
| nosql-transfer-storage-choice | Can explain, apply and reason about nosql transfer storage choice. | NoSQL & Specialized Data Systems | YES | L4 | engine-specific access models | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | other data engines | MongoDB, Redis, OpenSearch |

**Track exit synthesis:** Every required node must meet its stated L-level; a definition-only answer does not satisfy L3/L4.

**Cross-track consumers / transfers:** Consumer tracks may apply this capability but must not re-teach its canonical mechanism.

**Unresolved dependency questions:** Exact prerequisite edges are intentionally deferred to Step 3.

### Cache Engineering

**Track purpose:** Demonstrate reusable senior reasoning about cached-copy correctness, freshness and load.

**Depth class:** MUST MASTER

**Track-level non-goals:** Vendor trivia, configuration memorization and concepts owned by another track.

**Canonical owner concepts:** cached-copy correctness, freshness and load.


| ID | Capability / learner outcome | Primary owner track | Required for track exit | Minimum technical evidence | Mechanism / mental model | Canonical failures | Observable evidence | Production boundary / trade-off | Transfer axis | Primary implementation anchor |
|---|---|---|---|---|---|---|---|---|---|---|
| cache-capacity-eviction-fallback | Can explain, apply and reason about cache capacity eviction fallback. | Cache Engineering | YES | L3 | cached-copy correctness, freshness and load | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | in-process/CDN | .NET + PostgreSQL + Redis |
| cache-evidence-transfer | Can explain, apply and reason about cache evidence transfer. | Cache Engineering | YES | L4 | cached-copy correctness, freshness and load | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | in-process/CDN | .NET + PostgreSQL + Redis |
| cache-invalidation-consistency | Can explain, apply and reason about cache invalidation consistency. | Cache Engineering | YES | L3 | cached-copy correctness, freshness and load | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | in-process/CDN | .NET + PostgreSQL + Redis |
| cache-multilayer-coherence | Can explain, apply and reason about cache multilayer coherence. | Cache Engineering | YES | L3 | cached-copy correctness, freshness and load | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | in-process/CDN | .NET + PostgreSQL + Redis |
| cache-need-source-of-truth | Can explain, apply and reason about cache need source of truth. | Cache Engineering | YES | L2 | cached-copy correctness, freshness and load | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | in-process/CDN | .NET + PostgreSQL + Redis |
| cache-patterns | Can explain, apply and reason about cache patterns. | Cache Engineering | YES | L2 | cached-copy correctness, freshness and load | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | in-process/CDN | .NET + PostgreSQL + Redis |
| cache-stampede-penetration-avalanche-hot-key | Can explain, apply and reason about cache stampede penetration avalanche hot key. | Cache Engineering | YES | L3 | cached-copy correctness, freshness and load | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | in-process/CDN | .NET + PostgreSQL + Redis |

**Track exit synthesis:** Every required node must meet its stated L-level; a definition-only answer does not satisfy L3/L4.

**Cross-track consumers / transfers:** Consumer tracks may apply this capability but must not re-teach its canonical mechanism.

**Unresolved dependency questions:** Exact prerequisite edges are intentionally deferred to Step 3.

### Distributed Systems

**Track purpose:** Demonstrate reusable senior reasoning about partial failure, consistency and recovery.

**Depth class:** MUST MASTER DEEP

**Track-level non-goals:** Vendor trivia, configuration memorization and concepts owned by another track.

**Canonical owner concepts:** partial failure, consistency and recovery.


| ID | Capability / learner outcome | Primary owner track | Required for track exit | Minimum technical evidence | Mechanism / mental model | Canonical failures | Observable evidence | Production boundary / trade-off | Transfer axis | Primary implementation anchor |
|---|---|---|---|---|---|---|---|---|---|---|
| dist-consensus-coordination-purpose | Can explain, apply and reason about dist consensus coordination purpose. | Distributed Systems | YES | L3 | partial failure, consistency and recovery | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | other runtimes | .NET multi-process |
| dist-consistency-linearizability | Can explain, apply and reason about dist consistency linearizability. | Distributed Systems | YES | L3 | partial failure, consistency and recovery | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | other runtimes | .NET multi-process |
| dist-guarantee-recovery-transfer | Can explain, apply and reason about dist guarantee recovery transfer. | Distributed Systems | YES | L4 | partial failure, consistency and recovery | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | other runtimes | .NET multi-process |
| dist-partial-failure-uncertainty | Can explain, apply and reason about dist partial failure uncertainty. | Distributed Systems | YES | L3 | partial failure, consistency and recovery | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | other runtimes | .NET multi-process |
| dist-partitioning-ownership-rebalancing | Can explain, apply and reason about dist partitioning ownership rebalancing. | Distributed Systems | YES | L3 | partial failure, consistency and recovery | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | other runtimes | .NET multi-process |
| dist-reconciliation-convergence | Can explain, apply and reason about dist reconciliation convergence. | Distributed Systems | YES | L3 | partial failure, consistency and recovery | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | other runtimes | .NET multi-process |
| dist-replication-leader-quorum | Can explain, apply and reason about dist replication leader quorum. | Distributed Systems | YES | L3 | partial failure, consistency and recovery | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | other runtimes | .NET multi-process |
| dist-rpc-unknown-completion | Can explain, apply and reason about dist rpc unknown completion. | Distributed Systems | YES | L3 | partial failure, consistency and recovery | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | other runtimes | .NET multi-process |
| dist-time-order-causality | Can explain, apply and reason about dist time order causality. | Distributed Systems | YES | L3 | partial failure, consistency and recovery | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | other runtimes | .NET multi-process |
| dist-transactions-2pc-boundary | Can explain, apply and reason about dist transactions 2pc boundary. | Distributed Systems | YES | L3 | partial failure, consistency and recovery | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | other runtimes | .NET multi-process |

**Track exit synthesis:** Every required node must meet its stated L-level; a definition-only answer does not satisfy L3/L4.

**Cross-track consumers / transfers:** Consumer tracks may apply this capability but must not re-teach its canonical mechanism.

**Unresolved dependency questions:** Exact prerequisite edges are intentionally deferred to Step 3.

### Messaging & Event-Driven Consistency

**Track purpose:** Demonstrate reusable senior reasoning about delivery, replay and local effect correctness.

**Depth class:** MUST MASTER

**Track-level non-goals:** Vendor trivia, configuration memorization and concepts owned by another track.

**Canonical owner concepts:** delivery, replay and local effect correctness.


| ID | Capability / learner outcome | Primary owner track | Required for track exit | Minimum technical evidence | Mechanism / mental model | Canonical failures | Observable evidence | Production boundary / trade-off | Transfer axis | Primary implementation anchor |
|---|---|---|---|---|---|---|---|---|---|---|
| msg-consumer-groups-offsets-rebalance | Can explain, apply and reason about msg consumer groups offsets rebalance. | Messaging & Event-Driven Consistency | YES | L3 | delivery, replay and local effect correctness | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | RabbitMQ | Kafka + PostgreSQL outbox |
| msg-consumer-idempotency-inbox | Can explain, apply and reason about msg consumer idempotency inbox. | Messaging & Event-Driven Consistency | YES | L3 | delivery, replay and local effect correctness | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | RabbitMQ | Kafka + PostgreSQL outbox |
| msg-delivery-retry-poison-dlq | Can explain, apply and reason about msg delivery retry poison dlq. | Messaging & Event-Driven Consistency | YES | L3 | delivery, replay and local effect correctness | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | RabbitMQ | Kafka + PostgreSQL outbox |
| msg-external-side-effect-reconciliation | Can explain, apply and reason about msg external side effect reconciliation. | Messaging & Event-Driven Consistency | YES | L4 | delivery, replay and local effect correctness | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | RabbitMQ | Kafka + PostgreSQL outbox |
| msg-lag-backpressure-evidence | Can explain, apply and reason about msg lag backpressure evidence. | Messaging & Event-Driven Consistency | YES | L3 | delivery, replay and local effect correctness | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | RabbitMQ | Kafka + PostgreSQL outbox |
| msg-model-queue-topic-partition-order | Can explain, apply and reason about msg model queue topic partition order. | Messaging & Event-Driven Consistency | YES | L2 | delivery, replay and local effect correctness | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | RabbitMQ | Kafka + PostgreSQL outbox |
| msg-outbox-db-publish-gap | Can explain, apply and reason about msg outbox db publish gap. | Messaging & Event-Driven Consistency | YES | L3 | delivery, replay and local effect correctness | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | RabbitMQ | Kafka + PostgreSQL outbox |
| msg-producer-acks-durability | Can explain, apply and reason about msg producer acks durability. | Messaging & Event-Driven Consistency | YES | L3 | delivery, replay and local effect correctness | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | RabbitMQ | Kafka + PostgreSQL outbox |
| msg-replay-backfill | Can explain, apply and reason about msg replay backfill. | Messaging & Event-Driven Consistency | YES | L3 | delivery, replay and local effect correctness | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | RabbitMQ | Kafka + PostgreSQL outbox |
| msg-schema-evolution-contract-ownership | Can explain, apply and reason about msg schema evolution contract ownership. | Messaging & Event-Driven Consistency | YES | L3 | delivery, replay and local effect correctness | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | RabbitMQ | Kafka + PostgreSQL outbox |
| msg-workflow-saga-compensation | Can explain, apply and reason about msg workflow saga compensation. | Messaging & Event-Driven Consistency | YES | L3 | delivery, replay and local effect correctness | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | RabbitMQ | Kafka + PostgreSQL outbox |

**Track exit synthesis:** Every required node must meet its stated L-level; a definition-only answer does not satisfy L3/L4.

**Cross-track consumers / transfers:** Consumer tracks may apply this capability but must not re-teach its canonical mechanism.

**Unresolved dependency questions:** Exact prerequisite edges are intentionally deferred to Step 3.

### API Contracts & Resilience

**Track purpose:** Demonstrate reusable senior reasoning about public contract, retry and request identity.

**Depth class:** MUST MASTER

**Track-level non-goals:** Vendor trivia, configuration memorization and concepts owned by another track.

**Canonical owner concepts:** public contract, retry and request identity.


| ID | Capability / learner outcome | Primary owner track | Required for track exit | Minimum technical evidence | Mechanism / mental model | Canonical failures | Observable evidence | Production boundary / trade-off | Transfer axis | Primary implementation anchor |
|---|---|---|---|---|---|---|---|---|---|---|
| api-circuit-bulkhead-rate-limit | Can explain, apply and reason about api circuit bulkhead rate limit. | API Contracts & Resilience | YES | L3 | public contract, retry and request identity | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring REST | ASP.NET Core API |
| api-contract-resource-semantics | Can explain, apply and reason about api contract resource semantics. | API Contracts & Resilience | YES | L2 | public contract, retry and request identity | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring REST | ASP.NET Core API |
| api-deadlines-timeout-cancellation | Can explain, apply and reason about api deadlines timeout cancellation. | API Contracts & Resilience | YES | L3 | public contract, retry and request identity | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring REST | ASP.NET Core API |
| api-request-identity-idempotency | Can explain, apply and reason about api request identity idempotency. | API Contracts & Resilience | YES | L3 | public contract, retry and request identity | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring REST | ASP.NET Core API |
| api-retry-backoff-jitter | Can explain, apply and reason about api retry backoff jitter. | API Contracts & Resilience | YES | L3 | public contract, retry and request identity | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring REST | ASP.NET Core API |
| api-unknown-outcome-reconciliation | Can explain, apply and reason about api unknown outcome reconciliation. | API Contracts & Resilience | YES | L4 | public contract, retry and request identity | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring REST | ASP.NET Core API |
| api-validation-errors-pagination | Can explain, apply and reason about api validation errors pagination. | API Contracts & Resilience | YES | L2 | public contract, retry and request identity | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring REST | ASP.NET Core API |
| api-versioning-compatibility | Can explain, apply and reason about api versioning compatibility. | API Contracts & Resilience | YES | L3 | public contract, retry and request identity | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring REST | ASP.NET Core API |

**Track exit synthesis:** Every required node must meet its stated L-level; a definition-only answer does not satisfy L3/L4.

**Cross-track consumers / transfers:** Consumer tracks may apply this capability but must not re-teach its canonical mechanism.

**Unresolved dependency questions:** Exact prerequisite edges are intentionally deferred to Step 3.

### Security

**Track purpose:** Demonstrate reusable senior reasoning about trust boundary, authorization and abuse.

**Depth class:** MUST MASTER

**Track-level non-goals:** Vendor trivia, configuration memorization and concepts owned by another track.

**Canonical owner concepts:** trust boundary, authorization and abuse.


| ID | Capability / learner outcome | Primary owner track | Required for track exit | Minimum technical evidence | Mechanism / mental model | Canonical failures | Observable evidence | Production boundary / trade-off | Transfer axis | Primary implementation anchor |
|---|---|---|---|---|---|---|---|---|---|---|
| sec-abuse-bruteforce-resource-business-flow | Can explain, apply and reason about sec abuse bruteforce resource business flow. | Security | YES | L3 | trust boundary, authorization and abuse | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring Security | ASP.NET policy/tenant |
| sec-audit-detection-evidence | Can explain, apply and reason about sec audit detection evidence. | Security | YES | L3 | trust boundary, authorization and abuse | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring Security | ASP.NET policy/tenant |
| sec-authorization-object-tenant | Can explain, apply and reason about sec authorization object tenant. | Security | YES | L3 | trust boundary, authorization and abuse | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring Security | ASP.NET policy/tenant |
| sec-auth-session-token | Can explain, apply and reason about sec auth session token. | Security | YES | L3 | trust boundary, authorization and abuse | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring Security | ASP.NET policy/tenant |
| sec-browser-boundaries-cors-csrf-xss | Can explain, apply and reason about sec browser boundaries cors csrf xss. | Security | YES | L2 | trust boundary, authorization and abuse | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring Security | ASP.NET policy/tenant |
| sec-injection-ssrf-input-output | Can explain, apply and reason about sec injection ssrf input output. | Security | YES | L3 | trust boundary, authorization and abuse | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring Security | ASP.NET policy/tenant |
| sec-oauth-oidc-awareness | Can explain, apply and reason about sec oauth oidc awareness. | Security | YES | L2 | trust boundary, authorization and abuse | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring Security | ASP.NET policy/tenant |
| sec-race-business-logic-abuse | Can explain, apply and reason about sec race business logic abuse. | Security | YES | L3 | trust boundary, authorization and abuse | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring Security | ASP.NET policy/tenant |
| sec-secrets-third-party-trust | Can explain, apply and reason about sec secrets third party trust. | Security | YES | L3 | trust boundary, authorization and abuse | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring Security | ASP.NET policy/tenant |
| sec-trust-boundary-threat-model | Can explain, apply and reason about sec trust boundary threat model. | Security | YES | L2 | trust boundary, authorization and abuse | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring Security | ASP.NET policy/tenant |
| sec-unseen-attack-transfer | Can explain, apply and reason about sec unseen attack transfer. | Security | YES | L4 | trust boundary, authorization and abuse | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Spring Security | ASP.NET policy/tenant |

**Track exit synthesis:** Every required node must meet its stated L-level; a definition-only answer does not satisfy L3/L4.

**Cross-track consumers / transfers:** Consumer tracks may apply this capability but must not re-teach its canonical mechanism.

**Unresolved dependency questions:** Exact prerequisite edges are intentionally deferred to Step 3.

### Observability & Performance

**Track purpose:** Demonstrate reusable senior reasoning about telemetry, profiling and diagnosis.

**Depth class:** MUST MASTER

**Track-level non-goals:** Vendor trivia, configuration memorization and concepts owned by another track.

**Canonical owner concepts:** telemetry, profiling and diagnosis.


| ID | Capability / learner outcome | Primary owner track | Required for track exit | Minimum technical evidence | Mechanism / mental model | Canonical failures | Observable evidence | Production boundary / trade-off | Transfer axis | Primary implementation anchor |
|---|---|---|---|---|---|---|---|---|---|---|
| obs-cardinality-sampling-cost | Can explain, apply and reason about obs cardinality sampling cost. | Observability & Performance | YES | L3 | telemetry, profiling and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Java OTel/JFR | OTel + .NET diagnostics |
| obs-db-io-downstream-attribution | Can explain, apply and reason about obs db io downstream attribution. | Observability & Performance | YES | L3 | telemetry, profiling and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Java OTel/JFR | OTel + .NET diagnostics |
| obs-diagnostic-method | Can explain, apply and reason about obs diagnostic method. | Observability & Performance | YES | L4 | telemetry, profiling and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Java OTel/JFR | OTel + .NET diagnostics |
| obs-instrumentation-context | Can explain, apply and reason about obs instrumentation context. | Observability & Performance | YES | L3 | telemetry, profiling and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Java OTel/JFR | OTel + .NET diagnostics |
| obs-latency-throughput-saturation | Can explain, apply and reason about obs latency throughput saturation. | Observability & Performance | YES | L2 | telemetry, profiling and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Java OTel/JFR | OTel + .NET diagnostics |
| obs-load-test-benchmark-validity | Can explain, apply and reason about obs load test benchmark validity. | Observability & Performance | YES | L3 | telemetry, profiling and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Java OTel/JFR | OTel + .NET diagnostics |
| obs-logs-structured-correlation | Can explain, apply and reason about obs logs structured correlation. | Observability & Performance | YES | L2 | telemetry, profiling and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Java OTel/JFR | OTel + .NET diagnostics |
| obs-profiling-runtime-evidence | Can explain, apply and reason about obs profiling runtime evidence. | Observability & Performance | YES | L3 | telemetry, profiling and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Java OTel/JFR | OTel + .NET diagnostics |
| obs-signals-correlation | Can explain, apply and reason about obs signals correlation. | Observability & Performance | YES | L2 | telemetry, profiling and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Java OTel/JFR | OTel + .NET diagnostics |
| obs-tracing-distributed-evidence | Can explain, apply and reason about obs tracing distributed evidence. | Observability & Performance | YES | L3 | telemetry, profiling and diagnosis | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | Java OTel/JFR | OTel + .NET diagnostics |

**Track exit synthesis:** Every required node must meet its stated L-level; a definition-only answer does not satisfy L3/L4.

**Cross-track consumers / transfers:** Consumer tracks may apply this capability but must not re-teach its canonical mechanism.

**Unresolved dependency questions:** Exact prerequisite edges are intentionally deferred to Step 3.

### Reliability / SRE

**Track purpose:** Demonstrate reusable senior reasoning about user impact, overload and recovery.

**Depth class:** MUST MASTER

**Track-level non-goals:** Vendor trivia, configuration memorization and concepts owned by another track.

**Canonical owner concepts:** user impact, overload and recovery.


| ID | Capability / learner outcome | Primary owner track | Required for track exit | Minimum technical evidence | Mechanism / mental model | Canonical failures | Observable evidence | Production boundary / trade-off | Transfer axis | Primary implementation anchor |
|---|---|---|---|---|---|---|---|---|---|---|
| rel-cascading-failure-queue-capacity | Can explain, apply and reason about rel cascading failure queue capacity. | Reliability / SRE | YES | L3 | user impact, overload and recovery | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | cloud neutral | .NET services + OTel |
| rel-change-rollout-rollback-risk | Can explain, apply and reason about rel change rollout rollback risk. | Reliability / SRE | YES | L3 | user impact, overload and recovery | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | cloud neutral | .NET services + OTel |
| rel-dependency-budgets | Can explain, apply and reason about rel dependency budgets. | Reliability / SRE | YES | L3 | user impact, overload and recovery | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | cloud neutral | .NET services + OTel |
| rel-disaster-recovery-rpo-rto | Can explain, apply and reason about rel disaster recovery rpo rto. | Reliability / SRE | YES | L3 | user impact, overload and recovery | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | cloud neutral | .NET services + OTel |
| rel-failure-injection-verification | Can explain, apply and reason about rel failure injection verification. | Reliability / SRE | YES | L4 | user impact, overload and recovery | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | cloud neutral | .NET services + OTel |
| rel-health-readiness-semantics | Can explain, apply and reason about rel health readiness semantics. | Reliability / SRE | YES | L3 | user impact, overload and recovery | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | cloud neutral | .NET services + OTel |
| rel-incident-response-postmortem | Can explain, apply and reason about rel incident response postmortem. | Reliability / SRE | YES | L3 | user impact, overload and recovery | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | cloud neutral | .NET services + OTel |
| rel-overload-load-shedding-degradation | Can explain, apply and reason about rel overload load shedding degradation. | Reliability / SRE | YES | L3 | user impact, overload and recovery | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | cloud neutral | .NET services + OTel |
| rel-user-journey-sli-slo-budget | Can explain, apply and reason about rel user journey sli slo budget. | Reliability / SRE | YES | L3 | user impact, overload and recovery | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | cloud neutral | .NET services + OTel |

**Track exit synthesis:** Every required node must meet its stated L-level; a definition-only answer does not satisfy L3/L4.

**Cross-track consumers / transfers:** Consumer tracks may apply this capability but must not re-teach its canonical mechanism.

**Unresolved dependency questions:** Exact prerequisite edges are intentionally deferred to Step 3.

### Testing & Engineering Quality

**Track purpose:** Demonstrate reusable senior reasoning about risk evidence, failure and repeatability.

**Depth class:** MUST MASTER

**Track-level non-goals:** Vendor trivia, configuration memorization and concepts owned by another track.

**Canonical owner concepts:** risk evidence, failure and repeatability.


| ID | Capability / learner outcome | Primary owner track | Required for track exit | Minimum technical evidence | Mechanism / mental model | Canonical failures | Observable evidence | Production boundary / trade-off | Transfer axis | Primary implementation anchor |
|---|---|---|---|---|---|---|---|---|---|---|
| test-ci-flakiness-repeatability | Can explain, apply and reason about test ci flakiness repeatability. | Testing & Engineering Quality | YES | L3 | risk evidence, failure and repeatability | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JUnit/Spring | .NET tests + fixtures |
| test-failure-resilience | Can explain, apply and reason about test failure resilience. | Testing & Engineering Quality | YES | L3 | risk evidence, failure and repeatability | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JUnit/Spring | .NET tests + fixtures |
| test-migration-compatibility | Can explain, apply and reason about test migration compatibility. | Testing & Engineering Quality | YES | L3 | risk evidence, failure and repeatability | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JUnit/Spring | .NET tests + fixtures |
| test-property-boundary-fuzz | Can explain, apply and reason about test property boundary fuzz. | Testing & Engineering Quality | YES | L3 | risk evidence, failure and repeatability | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JUnit/Spring | .NET tests + fixtures |
| test-real-dependency-fixtures | Can explain, apply and reason about test real dependency fixtures. | Testing & Engineering Quality | YES | L3 | risk evidence, failure and repeatability | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JUnit/Spring | .NET tests + fixtures |
| test-review-static-analysis-change-safety | Can explain, apply and reason about test review static analysis change safety. | Testing & Engineering Quality | YES | L3 | risk evidence, failure and repeatability | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JUnit/Spring | .NET tests + fixtures |
| test-risk-strategy-boundaries | Can explain, apply and reason about test risk strategy boundaries. | Testing & Engineering Quality | YES | L2 | risk evidence, failure and repeatability | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JUnit/Spring | .NET tests + fixtures |
| test-risk-transfer | Can explain, apply and reason about test risk transfer. | Testing & Engineering Quality | YES | L4 | risk evidence, failure and repeatability | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JUnit/Spring | .NET tests + fixtures |
| test-time-concurrency-determinism | Can explain, apply and reason about test time concurrency determinism. | Testing & Engineering Quality | YES | L3 | risk evidence, failure and repeatability | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JUnit/Spring | .NET tests + fixtures |
| test-unit-integration-contract | Can explain, apply and reason about test unit integration contract. | Testing & Engineering Quality | YES | L3 | risk evidence, failure and repeatability | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | JUnit/Spring | .NET tests + fixtures |

**Track exit synthesis:** Every required node must meet its stated L-level; a definition-only answer does not satisfy L3/L4.

**Cross-track consumers / transfers:** Consumer tracks may apply this capability but must not re-teach its canonical mechanism.

**Unresolved dependency questions:** Exact prerequisite edges are intentionally deferred to Step 3.

### Architecture & System Design

**Track purpose:** Demonstrate reusable senior reasoning about ownership synthesis and trade-offs.

**Depth class:** MUST MASTER

**Track-level non-goals:** Vendor trivia, configuration memorization and concepts owned by another track.

**Canonical owner concepts:** ownership synthesis and trade-offs.


| ID | Capability / learner outcome | Primary owner track | Required for track exit | Minimum technical evidence | Mechanism / mental model | Canonical failures | Observable evidence | Production boundary / trade-off | Transfer axis | Primary implementation anchor |
|---|---|---|---|---|---|---|---|---|---|---|
| arch-boundaries-ownership | Can explain, apply and reason about arch boundaries ownership. | Architecture & System Design | YES | L3 | ownership synthesis and trade-offs | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | technology-neutral | .NET service design |
| arch-consistency-latency-availability | Can explain, apply and reason about arch consistency latency availability. | Architecture & System Design | YES | L4 | ownership synthesis and trade-offs | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | technology-neutral | .NET service design |
| arch-cost-complexity-changeability | Can explain, apply and reason about arch cost complexity changeability. | Architecture & System Design | YES | L4 | ownership synthesis and trade-offs | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | technology-neutral | .NET service design |
| arch-data-ownership-source-of-truth | Can explain, apply and reason about arch data ownership source of truth. | Architecture & System Design | YES | L3 | ownership synthesis and trade-offs | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | technology-neutral | .NET service design |
| arch-decision-communication-transfer | Can explain, apply and reason about arch decision communication transfer. | Architecture & System Design | YES | L4 | ownership synthesis and trade-offs | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | technology-neutral | .NET service design |
| arch-evolution-migration-strangler | Can explain, apply and reason about arch evolution migration strangler. | Architecture & System Design | YES | L3 | ownership synthesis and trade-offs | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | technology-neutral | .NET service design |
| arch-failure-recovery-security-observability | Can explain, apply and reason about arch failure recovery security observability. | Architecture & System Design | YES | L4 | ownership synthesis and trade-offs | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | technology-neutral | .NET service design |
| arch-requirements-quality-attributes | Can explain, apply and reason about arch requirements quality attributes. | Architecture & System Design | YES | L3 | ownership synthesis and trade-offs | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | technology-neutral | .NET service design |
| arch-scale-capacity-partitioning | Can explain, apply and reason about arch scale capacity partitioning. | Architecture & System Design | YES | L3 | ownership synthesis and trade-offs | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | technology-neutral | .NET service design |
| arch-sync-async-integration | Can explain, apply and reason about arch sync async integration. | Architecture & System Design | YES | L3 | ownership synthesis and trade-offs | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | technology-neutral | .NET service design |

**Track exit synthesis:** Every required node must meet its stated L-level; a definition-only answer does not satisfy L3/L4.

**Cross-track consumers / transfers:** Consumer tracks may apply this capability but must not re-teach its canonical mechanism.

**Unresolved dependency questions:** Exact prerequisite edges are intentionally deferred to Step 3.

### Containers / Kubernetes / Cloud Delivery

**Track purpose:** Demonstrate reusable senior reasoning about artifact, lifecycle, rollout and platform evidence.

**Depth class:** SHOULD MASTER / TRANSFER

**Track-level non-goals:** Vendor trivia, configuration memorization and concepts owned by another track.

**Canonical owner concepts:** artifact, lifecycle, rollout and platform evidence.


| ID | Capability / learner outcome | Primary owner track | Required for track exit | Minimum technical evidence | Mechanism / mental model | Canonical failures | Observable evidence | Production boundary / trade-off | Transfer axis | Primary implementation anchor |
|---|---|---|---|---|---|---|---|---|---|---|
| delivery-artifact-image-config | Can explain, apply and reason about delivery artifact image config. | Containers / Kubernetes / Cloud Delivery | YES | L2 | artifact, lifecycle, rollout and platform evidence | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | managed clouds | containerized .NET + local Kubernetes |
| delivery-autoscaling-signal-boundary | Can explain, apply and reason about delivery autoscaling signal boundary. | Containers / Kubernetes / Cloud Delivery | YES | L3 | artifact, lifecycle, rollout and platform evidence | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | managed clouds | containerized .NET + local Kubernetes |
| delivery-cicd-promotion-provenance | Can explain, apply and reason about delivery cicd promotion provenance. | Containers / Kubernetes / Cloud Delivery | YES | L3 | artifact, lifecycle, rollout and platform evidence | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | managed clouds | containerized .NET + local Kubernetes |
| delivery-cloud-responsibility-managed-services | Can explain, apply and reason about delivery cloud responsibility managed services. | Containers / Kubernetes / Cloud Delivery | YES | L2 | artifact, lifecycle, rollout and platform evidence | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | managed clouds | containerized .NET + local Kubernetes |
| delivery-container-process-lifecycle | Can explain, apply and reason about delivery container process lifecycle. | Containers / Kubernetes / Cloud Delivery | YES | L2 | artifact, lifecycle, rollout and platform evidence | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | managed clouds | containerized .NET + local Kubernetes |
| delivery-graceful-shutdown-draining | Can explain, apply and reason about delivery graceful shutdown draining. | Containers / Kubernetes / Cloud Delivery | YES | L3 | artifact, lifecycle, rollout and platform evidence | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | managed clouds | containerized .NET + local Kubernetes |
| delivery-platform-evidence-debug | Can explain, apply and reason about delivery platform evidence debug. | Containers / Kubernetes / Cloud Delivery | YES | L3 | artifact, lifecycle, rollout and platform evidence | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | managed clouds | containerized .NET + local Kubernetes |
| delivery-platform-transfer | Can explain, apply and reason about delivery platform transfer. | Containers / Kubernetes / Cloud Delivery | YES | L4 | artifact, lifecycle, rollout and platform evidence | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | managed clouds | containerized .NET + local Kubernetes |
| delivery-probes-health | Can explain, apply and reason about delivery probes health. | Containers / Kubernetes / Cloud Delivery | YES | L3 | artifact, lifecycle, rollout and platform evidence | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | managed clouds | containerized .NET + local Kubernetes |
| delivery-resources-cpu-memory | Can explain, apply and reason about delivery resources cpu memory. | Containers / Kubernetes / Cloud Delivery | YES | L3 | artifact, lifecycle, rollout and platform evidence | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | managed clouds | containerized .NET + local Kubernetes |
| delivery-rollout-rollback-strategies | Can explain, apply and reason about delivery rollout rollback strategies. | Containers / Kubernetes / Cloud Delivery | YES | L3 | artifact, lifecycle, rollout and platform evidence | incorrect boundary, overload or unsafe assumption | logs, traces, metrics, tests or persisted state | correctness, latency, cost, availability or changeability | managed clouds | containerized .NET + local Kubernetes |

**Track exit synthesis:** Every required node must meet its stated L-level; a definition-only answer does not satisfy L3/L4.

**Cross-track consumers / transfers:** Consumer tracks may apply this capability but must not re-teach its canonical mechanism.

**Unresolved dependency questions:** Exact prerequisite edges are intentionally deferred to Step 3.

## Concept ownership registry

| Concept | Primary owner |
|---|---|
| business/code invariants | Programming & Software Design Foundations |
| resource ownership/lifetime | Programming & Software Design Foundations |
| allocation / GC / JIT | Runtime & Memory |
| process/thread/files/sockets/virtual memory | Operating Systems & I/O Foundations |
| interleavings / synchronization; backpressure; cancellation | Concurrency & Async |
| DNS / TCP / TLS / HTTP / reuse | Networking & HTTP |
| relational transaction / MVCC / locking / WAL | Relational Database Engineering |
| NoSQL data models | NoSQL & Specialized Data Systems |
| cache invalidation / stampede | Cache Engineering |
| partial failure; replication; consistency; coordination | Distributed Systems |
| delivery / offset / replay / outbox / saga | Messaging & Event-Driven Consistency |
| API contract/versioning/retry/request idempotency | API Contracts & Resilience |
| consumer idempotency / inbox | Messaging & Event-Driven Consistency |
| authentication / authorization / trust / abuse | Security |
| telemetry / profiling / diagnostic method | Observability & Performance |
| SLI/SLO/error budget/overload | Reliability / SRE |
| test strategy/failure injection/CI repeatability | Testing & Engineering Quality |
| system/service/data ownership synthesis | Architecture & System Design |
| container lifecycle/probes/rollout/promotion | Containers / Kubernetes / Cloud Delivery |

## Cross-cutting ownership rules

- **Timeout:** Networking locates it; API owns deadline/retry policy; Distributed Systems owns remote-completion uncertainty.
- **Idempotency:** API owns request identity; Messaging owns duplicate-delivery/inbox effect.
- **Replication:** Distributed owns portable mechanism; database/Redis/Cassandra own implementation behavior.
- **RPO/RTO:** Reliability owns policy; Database owns backup/restore mechanism.
- **Graceful shutdown:** OS owns process termination; Delivery owns platform lifecycle; Messaging owns drain/ack.
- **Schema evolution:** database, API and event schema evolution remain separate.

## Implementation lanes

### .NET primary deep lane
CLR, allocation/GC/LOH, JIT → runtime-managed-execution, runtime-allocation-gc, runtime-retention-pooling-large-objects, runtime-jit-warmup. Task, async/await, ThreadPool/starvation, Channel and SemaphoreSlim → concurrency nodes. ASP.NET Core pipeline, DI lifetimes and HttpClientFactory → composition, networking and API nodes. EF Core/Dapper → database nodes. HostedService/shutdown, dotnet-counters/trace/dump and OpenTelemetry → OS, runtime and observability nodes.

### JVM / Java / Spring transfer lane
JVM/bytecode/JIT and heap/GC → runtime nodes. Java Memory Model, synchronized, volatile and atomics → concurrency-memory-visibility/synchronization. ExecutorService, CompletableFuture and Virtual Threads → async/backpressure. Spring IoC, proxy/AOP and transaction proxy → composition/transaction nodes. JPA/Hibernate persistence context/proxies → database nodes. Spring HTTP/observability integration → networking/observability. .NET-only remains a complete core path.

## Existing pilot mapping

**pilot coverage != track completion.**

| Pilot | Capability coverage |
|---|---|
| learning-index-execution-plan | db-index-structures; db-composite-query-shape; db-execution-operators; db-optimizer-cardinality-stats; partial db-production-diagnosis-transfer |
| learning-race-condition | concurrency-interleavings-invariants; concurrency-synchronization-atomicity; concurrency-races-check-then-act; partial concurrency-local-vs-distributed |
| learning-outbox-idempotency | msg-consumer-idempotency-inbox; msg-outbox-db-publish-gap; msg-external-side-effect-reconciliation; dist-partial-failure-uncertainty |

## Adversarial review

All 20 supplied checks pass: reordering preserves IDs; PostgreSQL→SQL Server and Kafka→RabbitMQ preserve portable capabilities with contract deltas; .NET-only remains complete; Java adds only transfer deltas; multi-instance exposes distributed ownership; timeout splits Networking/Distributed/API responsibility; cache outage uses Cache boundaries; schema replay needs Messaging evolution; definition/API memorization cannot satisfy L3/L4; one concept has one owner while materially different failure semantics stay split; Kubernetes/Big-Tech/AI absence does not break core; pilots cover subsets only; vendor-only nodes move to lanes; all deep tracks contain L4; Step 3 owns ordering.

## Unresolved dependency questions

- Does db-index-structures require db-physical-storage-pages or only benefit from it?
- Does API retry require distributed partial failure first?
- Which L2 nodes are needed before each L3 node?

## Step-2 stop boundary

No dependency graph, case bank, lessons, hours, Supabase, UI, code, or existing-file modification belongs to Step 2.
