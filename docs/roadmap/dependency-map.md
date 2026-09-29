# Senior Backend Capability Dependency Map

> **Status:** DRAFT — Phase 2 / Step 3 — Batches A + B1 complete

## Purpose and stop boundary

This map records which prior capability mechanism a target may assume. Batch A contains only approved edges whose targets belong to Tracks 1–5. It is not a lesson order, learner progression gate, database schema, or frontend rule.

## Capability dependency != learner gating

A REQUIRED edge is only a candidate for a later lesson prerequisite; it does not set `LOCKED` or `AVAILABLE`. A RECOMMENDED edge improves comprehension but must never create a learner lock. QuanNet locks progression, not curiosity.

## Relation semantics

- **REQUIRED** — without the source slice, the target would re-teach it or cannot be evaluated fairly.
- **RECOMMENDED** — a small recap can teach the target, but prior exposure materially helps.
- Related/co-learning is not stored as an edge.

## Graph invariants

Batch A uses frozen capability IDs only. REQUIRED and all ordering edges must be acyclic; track number and table row order are not learning order. This is not the complete Step-3 graph.

## Dependency registry

| From | To | Relation | Why prior context matters | Assumed slice | Ownership note |
|---|---|---|---|---|---|
| prog-errors-results | prog-api-refactoring-change-safety | REQUIRED | A safe API refactor must preserve or deliberately migrate the caller-visible failure/result behavior. | observable error/result contract and failure semantics | — |
| prog-invariants-domain-model | prog-api-refactoring-change-safety | REQUIRED | Change safety is evaluated against state and behavior that must remain true. | valid state and behavior invariant | — |
| prog-composition-dependencies | prog-api-refactoring-change-safety | RECOMMENDED | Dependency seams make impact isolation easier during refactor, although the target can recap them. | dependency boundary and composition seam | — |
| runtime-managed-execution | runtime-memory-roots-lifetime | REQUIRED | Root/lifetime reasoning assumes a managed runtime owns reachability inside a process while OS is separate. | managed runtime/process boundary | — |
| runtime-memory-roots-lifetime | runtime-allocation-gc | REQUIRED | GC work depends on which allocated objects remain reachable from roots. | reachability from GC roots | — |
| runtime-allocation-gc | runtime-retention-pooling-large-objects | REQUIRED | Pooling and retention must be separated from ordinary allocation and collection churn. | allocation pressure and collection behavior | — |
| runtime-diagnostics | runtime-memory-performance-debug | REQUIRED | Memory diagnosis chooses counter, trace, dump or profile from a hypothesis. | hypothesis-driven evidence selection | Runtime owns runtime evidence; target synthesizes it |
| runtime-retention-pooling-large-objects | runtime-memory-performance-debug | REQUIRED | The diagnostic must distinguish churn, deliberate pool retention and retained object graphs. | allocation vs pooling vs retention | — |
| os-virtual-memory-page-cache | runtime-memory-roots-lifetime | RECOMMENDED | Process VM context helps separate managed reachability from OS memory representation, but roots can be introduced locally. | process virtual-memory boundary | OS owns VM mechanism |
| runtime-diagnostics | runtime-retention-pooling-large-objects | RECOMMENDED | Heap/allocation evidence helps verify a pool is useful rather than hiding retention. | allocation and heap evidence selection | — |
| os-process-thread-kernel | os-files-handles-sockets-ipc | REQUIRED | Handle/socket ownership assumes a process crosses into OS-managed resource state. | process resource context and user/kernel boundary | — |
| os-files-handles-sockets-ipc | os-blocking-io-waits | REQUIRED | I/O waiting is explained by an OS-managed file/socket operation completing externally. | finite OS resource operation and external completion | — |
| os-process-thread-kernel | os-scheduling-starvation | REQUIRED | Starvation needs the model of finite runnable threads scheduled for execution. | runnable execution unit and scheduling boundary | — |
| os-process-thread-kernel | os-termination-graceful-shutdown | REQUIRED | Graceful shutdown begins at the process lifetime and termination boundary. | process lifetime and termination | — |
| os-process-thread-kernel | os-virtual-memory-page-cache | REQUIRED | Page-cache intuition starts from a per-process virtual address-space boundary. | virtual address-space boundary | — |
| os-process-thread-kernel | os-resource-exhaustion | REQUIRED | Resource exhaustion includes finite thread, process and memory capacity beyond handles. | finite thread/process/memory resources | Independent slice from handle exhaustion |
| os-files-handles-sockets-ipc | os-resource-exhaustion | REQUIRED | Exhaustion also depends on finite handle/socket ownership and lifetime. | handle/socket capacity and lifetime | — |
| prog-invariants-domain-model | concurrency-interleavings-invariants | REQUIRED | Concurrent transitions need an invariant whose violation can be observed. | state invariant under transition | Programming owns invariant definition |
| concurrency-interleavings-invariants | concurrency-synchronization-atomicity | REQUIRED | Atomicity protects a critical transition exposed by unsafe interleaving. | unsafe interleaving and critical transition | — |
| concurrency-interleavings-invariants | concurrency-races-check-then-act | REQUIRED | Check-then-act failure assumes state can change between separate operations. | interleaved shared-state change | — |
| concurrency-interleavings-invariants | concurrency-memory-visibility | REQUIRED | Visibility matters when execution contexts observe shared mutable state. | shared state across execution contexts | — |
| concurrency-synchronization-atomicity | concurrency-deadlock-starvation | REQUIRED | Deadlock reasoning needs synchronization ownership and wait relationships. | synchronization ownership and wait | — |
| os-blocking-io-waits | concurrency-async-parallelism | REQUIRED | Async distinction assumes work can wait for external I/O rather than consume CPU. | external I/O wait lifetime | OS owns wait mechanism |
| os-scheduling-starvation | concurrency-async-parallelism | RECOMMENDED | Scheduler capacity helps separate async waiting from starvation, but async can be introduced without it. | runnable-capacity and scheduler delay | — |
| concurrency-async-parallelism | concurrency-cancellation-lifetime | REQUIRED | Cancellation applies to a logical async operation that may outlive one thread. | async operation lifetime | — |
| prog-resource-ownership | concurrency-cancellation-lifetime | REQUIRED | Ending work safely requires knowing who owns operation and resource lifetime. | ownership and authority to end lifetime | Programming owns resource ownership |
| concurrency-async-parallelism | concurrency-bounded-backpressure | REQUIRED | Bounded work assumes many operations can be in flight against finite capacity. | concurrent in-flight operations | — |
| concurrency-races-check-then-act | concurrency-local-vs-distributed | REQUIRED | Local protection scope is visible only after reasoning about competing transition authority. | synchronization authority scope | — |
| os-files-handles-sockets-ipc | net-tcp-connection-semantics | REQUIRED | TCP connection reasoning starts with finite OS-managed socket state and lifetime. | socket state, lifetime and resource | OS owns socket mechanism |
| net-tcp-connection-semantics | net-tls-trust-handshake | RECOMMENDED | Transport context makes TLS-over-connection intuitive, though identity/trust can be taught independently. | established transport connection | Networking owns both boundaries |
| net-tcp-connection-semantics | net-connection-reuse-pooling | REQUIRED | Reuse only makes sense when a connection can survive several HTTP operations. | establishment, lifetime and closure | — |
| net-http-semantics | net-proxy-lb-forwarded-boundary | REQUIRED | Forwarded headers are HTTP protocol data whose rewrite/trust meaning the target evaluates. | request and header semantics | — |
| net-tls-trust-handshake | net-proxy-lb-forwarded-boundary | RECOMMENDED | TLS termination at a proxy clarifies which boundary the application may trust, but HTTP proxy basics stand alone. | TLS termination boundary | — |
| net-http-semantics | net-streaming-body-cancellation | REQUIRED | Streaming body lifetime is part of a finite HTTP request/response operation. | HTTP body and transfer lifetime | — |
| concurrency-cancellation-lifetime | net-streaming-body-cancellation | REQUIRED | Stopping transfer work cooperatively assumes cancellation and operation-lifetime semantics. | cooperative cancellation and lifetime | Concurrency owns cancellation mechanics |
| prog-resource-ownership | net-streaming-body-cancellation | RECOMMENDED | Stream/buffer ownership improves disposal and pooling reasoning; the target can recap it. | stream and buffer lifetime ownership | — |
| net-request-path-dns | net-failure-localization-unknown-outcome | REQUIRED | Failure localization must recognize DNS as a pre-connection stage. | name-resolution failure stage | — |
| net-tcp-connection-semantics | net-failure-localization-unknown-outcome | REQUIRED | The target separates connection/reset/lifetime failure from later stages. | connection establishment and reset stage | — |
| net-tls-trust-handshake | net-failure-localization-unknown-outcome | REQUIRED | The target needs TLS trust/negotiation as a stage distinct from TCP and HTTP. | TLS negotiation and trust stage | — |
| net-http-semantics | net-failure-localization-unknown-outcome | REQUIRED | An HTTP response proves the path reached a later stage than DNS, TCP or TLS. | response semantics as stage evidence | — |

| prog-invariants-domain-model | db-modeling-invariants | REQUIRED | database modelling decides which invariants should also be represented by schema, key or constraint rather than only application code. | business-valid state and invariant ownership. | — |
| db-physical-storage-pages | db-buffer-io | REQUIRED | buffer/cache reasoning assumes that logical requests ultimately access database pages whose presence in memory changes physical I/O. | database data is accessed in page-sized physical units. | — |
| os-virtual-memory-page-cache | db-buffer-io | RECOMMENDED | this helps prevent calling every database buffer hit/miss a disk I/O, but DB buffer behavior can still be introduced independently. | OS memory/page-cache is distinct from database-owned buffer state. | — |
| db-physical-storage-pages | db-index-structures | RECOMMENDED | page intuition helps explain locality and I/O cost, but logical index search can be taught before physical page depth. | rows and index entries eventually map to physical pages. | — |
| db-index-structures | db-composite-query-shape | REQUIRED | composite-key order cannot be reasoned about without first understanding what an index search structure actually provides. | an ordered/searchable index only narrows rows according to the key path the query can use. | — |
| db-index-structures | db-execution-operators | RECOMMENDED | index knowledge improves plan reading, but scans/joins/sorts can first be taught without index internals. | index scan is one possible access operator among other execution paths. | — |
| db-execution-operators | db-optimizer-cardinality-stats | REQUIRED | cardinality estimates matter because they influence which scan/join/ sort strategy the optimizer selects. | the optimizer chooses among physical execution operators. | — |
| db-composite-query-shape | db-optimizer-cardinality-stats | RECOMMENDED | this makes optimizer choices easier to interpret, but cardinality/statistics concepts do not depend on composite indexes. | predicate shape and key ordering affect candidate access paths. | — |
| concurrency-interleavings-invariants | db-transactions-isolation-anomalies | REQUIRED | transaction isolation exists to constrain observable interleavings and their anomalies. | concurrent operations may interleave around shared state and violate an invariant. | — |
| prog-invariants-domain-model | db-transactions-isolation-anomalies | RECOMMENDED | this is retained even though a path exists through concurrency; the target directly chooses isolation from the business invariant, not merely from concurrency vocabulary. | business invariant whose correctness matters across concurrent transactions. | — |
| db-transactions-isolation-anomalies | db-mvcc-visibility | REQUIRED | MVCC visibility rules only make sense relative to which transaction observations are allowed. | transaction boundary, isolation semantics and concurrent visibility requirements. | — |
| db-transactions-isolation-anomalies | db-locks-deadlocks-contention | REQUIRED | database locking protects/serializes transactional work and its waits exist inside transaction lifetime. | transaction scope and concurrent operations over shared database state. | — |
| concurrency-deadlock-starvation | db-locks-deadlocks-contention | RECOMMENDED | local concurrency gives useful deadlock intuition, but database locks can be explained from DB sessions/transactions alone. | wait-for relationship and lack of forward progress. | — |
| db-transactions-isolation-anomalies | db-wal-crash-recovery | REQUIRED | WAL and crash recovery explain how committed transactional effects can be reconstructed after failure. | commit/durability boundary of a transaction. | — |
| db-modeling-invariants | db-schema-evolution | REQUIRED | a migration cannot be evaluated safely without knowing what data shape and invariant are being changed. | schema structure, keys, constraints and invariants that migration must preserve. | — |
| db-locks-deadlocks-contention | db-schema-evolution | REQUIRED | live schema evolution must reason about lock duration and traffic, not only the final schema. | DDL/data migration can acquire locks and block concurrent work. | — |
| dist-replication-leader-quorum | db-replication-failover | REQUIRED | Database owns engine-specific replica/failover evidence; Distributed Systems owns the general replication mechanism. | portable replication roles, acknowledgement and stale-copy semantics. | — |
| db-wal-crash-recovery | db-replication-failover | RECOMMENDED | especially useful for PostgreSQL-style replication reasoning, but replication as a concept is not universally implemented by the same WAL mechanism. | database log position can represent durable/replicated progress. | — |
| dist-partitioning-ownership-rebalancing | db-partitioning-sharding-boundary | REQUIRED | relational sharding applies the portable partition-ownership mechanism to database data and query boundaries. | state/key ranges are assigned to owners and ownership may change. | — |
| db-modeling-invariants | db-partitioning-sharding-boundary | RECOMMENDED | model knowledge helps identify safe partition boundaries, but partition ownership itself is separately teachable. | data relationship and invariant placement. | — |
| db-wal-crash-recovery | db-backup-restore | RECOMMENDED | important for PITR-style recovery, but backup/restore can first be understood with snapshots/full backups. | durable log can extend a base backup toward a later recovery point. | — |
| os-resource-exhaustion | db-connection-pool-exhaustion | REQUIRED | pool exhaustion is one concrete finite-resource exhaustion mode. | connections are finite resources and waiting grows when demand exceeds available capacity. | — |
| concurrency-bounded-backpressure | db-connection-pool-exhaustion | RECOMMENDED | helps explain why enlarging a pool may move overload into the database, but pool semantics can be taught without full backpressure depth. | unbounded concurrent work can overrun finite downstream capacity. | — |
| db-buffer-io | db-production-diagnosis-transfer | REQUIRED | The target uses this source mechanism at its own data or cache boundary. |  | — |
| db-optimizer-cardinality-stats | db-production-diagnosis-transfer | REQUIRED | The target uses this source mechanism at its own data or cache boundary. |  | — |
| db-locks-deadlocks-contention | db-production-diagnosis-transfer | REQUIRED | The target uses this source mechanism at its own data or cache boundary. |  | — |
| db-connection-pool-exhaustion | db-production-diagnosis-transfer | REQUIRED | The target uses this source mechanism at its own data or cache boundary. |  | — |
| nosql-mongo-aggregate-model | nosql-mongo-index-shard-transaction | REQUIRED | index, shard-key and transaction decisions are made relative to how documents are grouped and accessed. | document/aggregate boundary and expected access pattern. | — |
| dist-partitioning-ownership-rebalancing | nosql-mongo-index-shard-transaction | RECOMMENDED | Mongo shard reasoning benefits from it, but basic product shard-key behavior may be taught with a focused recap. | portable partition ownership and skew/rebalancing intuition. | — |
| db-transactions-isolation-anomalies | nosql-mongo-index-shard-transaction | RECOMMENDED | relational transaction experience helps expose the changed boundary, but Mongo transactions must not be taught as relational transactions with different syntax. | transaction scope and cost of coordinating multiple state changes. | — |
| dist-partitioning-ownership-rebalancing | nosql-cassandra-partition-model | RECOMMENDED | Cassandra partition modelling can first be taught access-pattern-first; deep distributed rebalancing is helpful context rather than a hard gate. | distributed keys map work/state to owners and bad distribution creates hot ownership. | — |
| nosql-cassandra-partition-model | nosql-cassandra-lsm-compaction-consistency | REQUIRED | SSTable/read/compaction behavior is only useful when tied to Cassandra's partition access model. | partition/clustering organization determines which data is read/written together. | — |
| dist-consistency-linearizability | nosql-cassandra-lsm-compaction-consistency | REQUIRED | the Cassandra node applies consistency choices; it should not re-teach general distributed consistency from scratch. | consistency model constrains which replica observations/acknowledgements are acceptable. | — |
| nosql-redis-structures-memory | nosql-redis-persistence-replication-cluster-streams | REQUIRED | durability/replication/cluster reasoning assumes what state Redis is actually storing. | Redis state lives in concrete key/value data structures with finite memory behavior. | — |
| dist-replication-leader-quorum | nosql-redis-persistence-replication-cluster-streams | REQUIRED | Redis owns its implementation behavior; Distributed Systems owns general replication reasoning. | portable replication, lag and failover semantics. | — |
| dist-partitioning-ownership-rebalancing | nosql-redis-persistence-replication-cluster-streams | RECOMMENDED | useful for hash-slot/cluster intuition, but Redis cluster mechanics can be introduced with local recap. | partition ownership and redistribution. | — |
| msg-model-queue-topic-partition-order | nosql-redis-persistence-replication-cluster-streams | RECOMMENDED | helps compare Redis Streams with messaging systems, but Streams is not itself a prerequisite for the messaging track. | consumer/group-like stream processing vocabulary and ordering scope. | — |
| nosql-search-inverted-index-analysis | nosql-search-refresh-shards-pagination | REQUIRED | The target uses this source mechanism at its own data or cache boundary. |  | — |
| dist-partitioning-ownership-rebalancing | nosql-search-refresh-shards-pagination | RECOMMENDED | general partition intuition helps, but search shard behavior can be introduced self-contained. | shards divide work/state across owners. | — |
| nosql-mongo-aggregate-model | nosql-model-selection | REQUIRED | The target uses this source mechanism at its own data or cache boundary. |  | — |
| nosql-cassandra-partition-model | nosql-model-selection | REQUIRED | The target uses this source mechanism at its own data or cache boundary. |  | — |
| nosql-redis-structures-memory | nosql-model-selection | REQUIRED | The target uses this source mechanism at its own data or cache boundary. |  | — |
| nosql-search-inverted-index-analysis | nosql-model-selection | REQUIRED | The target uses this source mechanism at its own data or cache boundary. |  | — |
| nosql-model-selection | nosql-transfer-storage-choice | REQUIRED | The target uses this source mechanism at its own data or cache boundary. |  | — |
| nosql-mongo-index-shard-transaction | nosql-transfer-storage-choice | RECOMMENDED | The target uses this source mechanism at its own data or cache boundary. |  | — |
| nosql-cassandra-lsm-compaction-consistency | nosql-transfer-storage-choice | RECOMMENDED | The target uses this source mechanism at its own data or cache boundary. |  | — |
| nosql-redis-persistence-replication-cluster-streams | nosql-transfer-storage-choice | RECOMMENDED | The target uses this source mechanism at its own data or cache boundary. |  | — |
| nosql-search-refresh-shards-pagination | nosql-transfer-storage-choice | RECOMMENDED | The target uses this source mechanism at its own data or cache boundary. |  | — |
| cache-need-source-of-truth | cache-patterns | REQUIRED | cache patterns only make sense once read/write ownership is explicit. | cache is a duplicate/derived copy and another system remains authoritative. | — |
| cache-need-source-of-truth | cache-invalidation-consistency | REQUIRED | invalidation/freshness exists because two copies can disagree. | cached value may diverge from authoritative state. | — |
| cache-patterns | cache-stampede-penetration-avalanche-hot-key | REQUIRED | the overload modes are consequences of how cached reads populate or miss the cache. | cache miss/population/expiry behavior and origin fallback path. | — |
| concurrency-bounded-backpressure | cache-stampede-penetration-avalanche-hot-key | RECOMMENDED | backpressure gives a stronger overload model, but stampede can be introduced directly from miss concurrency. | finite origin capacity and unbounded concurrent recomputation. | — |
| cache-need-source-of-truth | cache-capacity-eviction-fallback | REQUIRED | capacity/eviction decisions depend on what happens after cached data is absent. | evicted/unavailable cache must fall back to an authoritative source. | — |
| nosql-redis-structures-memory | cache-capacity-eviction-fallback | RECOMMENDED | Redis is a useful implementation anchor, but Cache Engineering must stay vendor-neutral. | one concrete in-memory implementation has finite memory and different data structures. | — |
| cache-invalidation-consistency | cache-multilayer-coherence | REQUIRED | multi-layer coherence generalizes that stale-copy problem across several cache layers/instances. | one cached copy can become stale relative to source. | — |
| dist-consistency-linearizability | cache-multilayer-coherence | RECOMMENDED | formal consistency vocabulary deepens the analysis, but cache coherence can first be taught operationally. | different copies may expose different visibility guarantees. | — |
| cache-invalidation-consistency | cache-evidence-transfer | REQUIRED | The target uses this source mechanism at its own data or cache boundary. |  | — |
| cache-stampede-penetration-avalanche-hot-key | cache-evidence-transfer | REQUIRED | The target uses this source mechanism at its own data or cache boundary. |  | — |
| cache-capacity-eviction-fallback | cache-evidence-transfer | REQUIRED | The target uses this source mechanism at its own data or cache boundary. |  | — |
| cache-multilayer-coherence | cache-evidence-transfer | REQUIRED | The target uses this source mechanism at its own data or cache boundary. | layer-specific freshness/version divergence. | — |
## Batch-A audit

- Dependency rows: 40
- REQUIRED: 33
- RECOMMENDED: 7
- No non-edge was stored. In particular, no edge is added from async to check-then-act races, VM to allocation/GC, TCP to HTTP semantics, generics to all adapters, or collection complexity to diagnostics.
- Cycle and frozen-ID validation applies only to Batch A; this does not claim the complete Step-3 graph exists or has been audited.

## Pending batches

Batches B–D will add approved targets for Tracks 6–17. No lesson IDs, progression schema, learner locks, UI, hours or case bank are introduced here.
