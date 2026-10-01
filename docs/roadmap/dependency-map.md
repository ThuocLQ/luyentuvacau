# Senior Backend Capability Dependency Map

> **Status:** FROZEN — Phase 2 / Step 3 canonical capability dependency graph.

## Purpose and stop boundary

This map records which prior capability mechanism a target may assume. All 17 core tracks are covered by 318 ordering relations over 163 frozen capability IDs: 194 REQUIRED and 124 RECOMMENDED. It is not a lesson order, learner progression gate, database schema, or frontend rule. Future lesson decomposition decides which capability dependencies become concrete lesson prerequisites only when that mapping is explicitly justified.

## Capability dependency != learner gating

A REQUIRED edge is only a candidate for a later lesson prerequisite; it does not set `LOCKED` or `AVAILABLE`. A RECOMMENDED edge improves comprehension but must never create a learner lock. QuanNet locks progression, not curiosity.

## Relation semantics

- **REQUIRED** — without the source slice, the target would re-teach it or cannot be evaluated fairly.
- **RECOMMENDED** — a small recap can teach the target, but prior exposure materially helps.
- Related/co-learning is not stored as an edge.

## Graph invariants

All 17 core tracks are covered by 318 ordering relations over 163 frozen capability IDs: 194 REQUIRED and 124 RECOMMENDED. REQUIRED edges are acyclic, and REQUIRED + RECOMMENDED ordering edges are acyclic. Track number and registry row order are not learning order. Multiple REQUIRED roots and parallel learning branches are intentional. A REQUIRED edge is only a candidate for a future lesson prerequisite; this artifact does not set `LOCKED` or `AVAILABLE`, RECOMMENDED never creates a progression lock, RELATED/co-learning remains a non-edge, and learner content/reference access is not restricted by this graph.

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
| db-buffer-io | db-production-diagnosis-transfer | REQUIRED | Production diagnosis must distinguish buffer/cache behavior and physical I/O from other latency causes. | buffer hit/read behavior distinguishes memory access from physical I/O. | — |
| db-optimizer-cardinality-stats | db-production-diagnosis-transfer | REQUIRED | Production diagnosis must compare optimizer estimates with actual execution before blaming query syntax or adding an index. | estimated vs actual cardinality and plan-choice evidence. | — |
| db-locks-deadlocks-contention | db-production-diagnosis-transfer | REQUIRED | Production diagnosis must treat blocking and lock waits as a competing explanation for slow requests. | blocking/lock evidence as an alternative explanation for latency. | — |
| db-connection-pool-exhaustion | db-production-diagnosis-transfer | REQUIRED | A slow database-facing request may spend time waiting to acquire a connection even when the eventual SQL execution is fast. | connection acquisition wait can dominate request latency independently of query execution. | — |
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
| nosql-search-inverted-index-analysis | nosql-search-refresh-shards-pagination | REQUIRED | Refresh visibility, sharding and pagination only make sense once the learner understands that search operates over an inverted-index projection rather than authoritative row storage. | documents and terms are represented in an inverted index whose visibility differs from source-of-truth storage. | — |
| dist-partitioning-ownership-rebalancing | nosql-search-refresh-shards-pagination | RECOMMENDED | general partition intuition helps, but search shard behavior can be introduced self-contained. | shards divide work/state across owners. | — |
| nosql-mongo-aggregate-model | nosql-model-selection | REQUIRED | Storage-family selection must compare the document/aggregate boundary as an actual workload model, not a product label. | document/aggregate storage model and its query/update boundary. | — |
| nosql-cassandra-partition-model | nosql-model-selection | REQUIRED | Storage-family selection must understand Cassandra as an access-pattern-first partition model before comparing it with other families. | wide-column access-pattern-first partition model. | — |
| nosql-redis-structures-memory | nosql-model-selection | REQUIRED | Storage-family selection must understand Redis as finite-memory key/value data structures rather than merely "a fast database." | in-memory key/value structure and memory boundary. | — |
| nosql-search-inverted-index-analysis | nosql-model-selection | REQUIRED | Storage-family selection must understand search as an inverted-index projection optimized for retrieval rather than transactional authority. | inverted-index/search projection model. | — |
| nosql-model-selection | nosql-transfer-storage-choice | REQUIRED | L4 transfer assumes the learner can already choose a storage family from workload, access pattern and consistency requirements before the conditions are changed. | choose storage family from workload/access/consistency requirements. | — |
| nosql-mongo-index-shard-transaction | nosql-transfer-storage-choice | RECOMMENDED | Mongo-specific index, shard and transaction failure boundaries provide stronger evidence for rejecting or selecting the document family in an unseen workload. | document-system failure and cost boundaries beyond basic modelling. | — |
| nosql-cassandra-lsm-compaction-consistency | nosql-transfer-storage-choice | RECOMMENDED | LSM, compaction, tombstone and consistency costs deepen transfer reasoning when Cassandra is one of the candidate storage families. | LSM/compaction/tombstone/consistency cost boundary. | — |
| nosql-redis-persistence-replication-cluster-streams | nosql-transfer-storage-choice | RECOMMENDED | Redis durability, replication and cluster behavior clarifies when an in-memory data system stops fitting the workload or recovery need. | Redis durability/replication/cluster boundary. | — |
| nosql-search-refresh-shards-pagination | nosql-transfer-storage-choice | RECOMMENDED | Refresh delay, shard behavior and pagination cost clarify the boundary between search projection and authoritative storage in a new workload. | search refresh/shard/pagination/source-of-truth boundary. | — |
| cache-need-source-of-truth | cache-patterns | REQUIRED | cache patterns only make sense once read/write ownership is explicit. | cache is a duplicate/derived copy and another system remains authoritative. | — |
| cache-need-source-of-truth | cache-invalidation-consistency | REQUIRED | invalidation/freshness exists because two copies can disagree. | cached value may diverge from authoritative state. | — |
| cache-patterns | cache-stampede-penetration-avalanche-hot-key | REQUIRED | the overload modes are consequences of how cached reads populate or miss the cache. | cache miss/population/expiry behavior and origin fallback path. | — |
| concurrency-bounded-backpressure | cache-stampede-penetration-avalanche-hot-key | RECOMMENDED | backpressure gives a stronger overload model, but stampede can be introduced directly from miss concurrency. | finite origin capacity and unbounded concurrent recomputation. | — |
| cache-need-source-of-truth | cache-capacity-eviction-fallback | REQUIRED | capacity/eviction decisions depend on what happens after cached data is absent. | evicted/unavailable cache must fall back to an authoritative source. | — |
| nosql-redis-structures-memory | cache-capacity-eviction-fallback | RECOMMENDED | Redis is a useful implementation anchor, but Cache Engineering must stay vendor-neutral. | one concrete in-memory implementation has finite memory and different data structures. | — |
| cache-invalidation-consistency | cache-multilayer-coherence | REQUIRED | multi-layer coherence generalizes that stale-copy problem across several cache layers/instances. | one cached copy can become stale relative to source. | — |
| dist-consistency-linearizability | cache-multilayer-coherence | RECOMMENDED | formal consistency vocabulary deepens the analysis, but cache coherence can first be taught operationally. | different copies may expose different visibility guarantees. | — |
| cache-invalidation-consistency | cache-evidence-transfer | REQUIRED | L4 cache diagnosis must be able to treat stale or missing invalidation as a direct cause even in a single-layer cache. | staleness/invalidation as one candidate cause. | — |
| cache-stampede-penetration-avalanche-hot-key | cache-evidence-transfer | REQUIRED | L4 cache diagnosis must distinguish origin overload caused by miss, expiry distribution or concentrated key traffic. | load-distribution and miss/expiry overload modes. | — |
| cache-capacity-eviction-fallback | cache-evidence-transfer | REQUIRED | L4 cache diagnosis must distinguish memory pressure, eviction and fallback-induced origin load from freshness failures. | finite cache memory, eviction and origin fallback behavior. | — |
| cache-multilayer-coherence | cache-evidence-transfer | REQUIRED | L4 transfer across cache topologies requires distinguishing which cache layer or instance owns the stale version and how that copy diverged. | layer-specific freshness/version divergence. | — |
| concurrency-local-vs-distributed | dist-partial-failure-uncertainty | RECOMMENDED | The local-vs-distributed boundary makes it easier to see that one process lock or memory model does not imply shared fate across replicas, but partial failure can still be introduced directly. | process-local coordination does not create shared authority or shared failure state across replicas | Concurrency owns local synchronization scope; Distributed Systems owns partial failure |
| net-failure-localization-unknown-outcome | dist-partial-failure-uncertainty | RECOMMENDED | Network-stage evidence gives a concrete example of one path failing while the rest of the system may continue, but distributed partial failure is broader than networking. | DNS, TCP, TLS or HTTP failure on one path does not reveal global system state | Networking owns failure-layer localization; Distributed Systems owns partial failure |
| dist-partial-failure-uncertainty | dist-rpc-unknown-completion | REQUIRED | RPC ambiguity exists because the caller observes messages, replies and timeouts rather than the remote process's internal completion state. | a remote component may execute, fail, slow or become unreachable independently of the caller | — |
| net-failure-localization-unknown-outcome | dist-rpc-unknown-completion | REQUIRED | To reason about an RPC timeout, the learner must distinguish a failure before the request could reach the server from a failure after remote execution may have begun. | transport-stage evidence and the fact that absence of an HTTP response does not prove absence of remote execution | Networking owns path localization; Distributed Systems owns remote-completion uncertainty |
| dist-consistency-linearizability | dist-replication-leader-quorum | REQUIRED | Replication read, acknowledgement and failover choices must be judged against the visibility or ordering guarantee the operation requires. | allowed read/write histories and required visibility guarantee | — |
| dist-partial-failure-uncertainty | dist-replication-leader-quorum | REQUIRED | Replication only becomes an engineering guarantee when copies may lag, fail or become unreachable independently. | independent replica or network-path failure and uncertainty | — |
| dist-partial-failure-uncertainty | dist-consensus-coordination-purpose | REQUIRED | Coordination exists because participants may lose contact or disagree while a safe shared decision still requires one coherent authority or committed value. | participants can fail or become mutually unreachable while agreement is still required | — |
| dist-replication-leader-quorum | dist-consensus-coordination-purpose | RECOMMENDED | Leader and quorum replication provides a useful concrete context for coordination, but consensus purpose can also be introduced with ownership or configuration decisions. | leader, quorum and replicated-decision roles | — |
| concurrency-local-vs-distributed | dist-partitioning-ownership-rebalancing | RECOMMENDED | The local-vs-distributed boundary helps explain why an in-process lock cannot assign ownership across replicas, but partition ownership can be introduced independently. | process-local authority does not define distributed key or work ownership | Concurrency owns local synchronization scope; Distributed Systems owns partition ownership |
| dist-partial-failure-uncertainty | dist-partitioning-ownership-rebalancing | RECOMMENDED | Node loss and temporary unreachability make rebalance transitions more intuitive, but static partition ownership does not require prior partial-failure depth. | a current partition owner may disappear or become unreachable | — |
| db-transactions-isolation-anomalies | dist-transactions-2pc-boundary | REQUIRED | Two-phase commit extends the idea of one transactional commit/abort boundary across multiple transactional participants. | atomic commit or abort within one transactional resource | Relational Database owns local transaction mechanics; Distributed Systems owns cross-resource coordination |
| dist-partial-failure-uncertainty | dist-transactions-2pc-boundary | REQUIRED | Prepared participants and the coordinator may fail or become unreachable between prepare and the final decision. | independent participant/coordinator failure during a multi-step distributed decision | — |
| prog-invariants-domain-model | dist-reconciliation-convergence | REQUIRED | Reconciliation needs a defined valid state or authoritative invariant to know what mismatch should be repaired. | valid target state and invariant ownership | Programming owns invariant definition; Distributed Systems owns convergence/reconciliation |
| dist-partial-failure-uncertainty | dist-reconciliation-convergence | REQUIRED | Reconciliation exists partly because one component may miss or ambiguously complete work while other components continue and preserve divergent state. | partial failure can leave durable incomplete or divergent state | — |
| dist-rpc-unknown-completion | dist-reconciliation-convergence | RECOMMENDED | Unknown RPC completion is a common reason to reconcile state later, although reconciliation also applies to missed events and other divergence. | a remote operation may have executed even though the caller did not receive its outcome | — |
| dist-rpc-unknown-completion | dist-guarantee-recovery-transfer | REQUIRED | L4 distributed reasoning must handle an operation whose remote effect cannot be inferred from a timeout or missing response. | ambiguous remote completion states | — |
| dist-replication-leader-quorum | dist-guarantee-recovery-transfer | REQUIRED | L4 transfer must reason about stale copies, acknowledgement rules and failover when evaluating a changed distributed topology. | replica, acknowledgement, stale-read and failover semantics | — |
| dist-consensus-coordination-purpose | dist-guarantee-recovery-transfer | REQUIRED | L4 transfer must know what agreement or ownership guarantee coordination buys and when loss of quorum prevents safe progress. | agreement, quorum and exclusive-coordination guarantee | — |
| dist-time-order-causality | dist-guarantee-recovery-transfer | REQUIRED | L4 transfer must distinguish wall-clock order from causal or version order when reconstructing a distributed incident. | wall-clock timestamps do not by themselves define causal or total order | — |
| dist-reconciliation-convergence | dist-guarantee-recovery-transfer | REQUIRED | L4 recovery reasoning must include how incomplete or divergent state can converge safely after the incident. | compare actual state with authority and apply repeatable repair | — |
| dist-partitioning-ownership-rebalancing | dist-guarantee-recovery-transfer | RECOMMENDED | Ownership and rebalance depth strengthens transfer when topology or partition distribution changes, but the L4 capability can begin without every partitioning case. | partition ownership, rebalance and hot-owner behavior | — |
| dist-transactions-2pc-boundary | dist-guarantee-recovery-transfer | RECOMMENDED | Two-phase commit gives an additional coordination/recovery boundary to compare with other distributed designs, but it is not required for every L4 incident. | prepare, commit and blocking-recovery boundary across participants | — |
| msg-model-queue-topic-partition-order | msg-producer-acks-durability | REQUIRED | Producer acknowledgement semantics are defined relative to where a record is routed and which broker unit accepts it. | queue, topic or partition publication boundary and ordering scope | — |
| dist-replication-leader-quorum | msg-producer-acks-durability | REQUIRED | A producer acknowledgement may depend on broker replica acknowledgement and leader state, so durability cannot be reasoned about from the client response alone. | replica acknowledgement, leader and failover semantics | Distributed Systems owns portable replication; Messaging owns the producer acknowledgement contract |
| msg-model-queue-topic-partition-order | msg-consumer-groups-offsets-rebalance | REQUIRED | Consumer-group assignment and offsets only make sense once partition and ordering scope are explicit. | partitions, destination model and ordering scope | — |
| dist-partitioning-ownership-rebalancing | msg-consumer-groups-offsets-rebalance | RECOMMENDED | Consumer-group rebalance is one application of assigning and moving work ownership, but broker-specific group mechanics can be taught with a local recap. | owner assignment, reassignment and in-flight work during rebalance | Distributed Systems owns portable ownership; Messaging owns consumer-group semantics |
| msg-model-queue-topic-partition-order | msg-delivery-retry-poison-dlq | REQUIRED | Retry, poison handling and DLQ policy operate on broker-delivered records, so the delivery identity and ordering boundary must already be clear. | broker-delivered record identity and ordering boundary | — |
| dist-partial-failure-uncertainty | msg-delivery-retry-poison-dlq | RECOMMENDED | Partial outage explains why repeated retry can amplify load while the broker and consumer continue running, but retry classification can be taught directly. | downstream may be slow or unavailable while other messaging components remain active | — |
| msg-delivery-retry-poison-dlq | msg-consumer-idempotency-inbox | REQUIRED | Inbox or deduplication exists because retry and recovery can deliver the same logical message more than once. | repeated delivery of one logical message after failure or retry | — |
| db-transactions-isolation-anomalies | msg-consumer-idempotency-inbox | REQUIRED | A local inbox is strongest when deduplication state and the local business effect share one transactional boundary. | one local database transaction can atomically bind deduplication record and business state | Relational Database owns local transaction semantics; Messaging owns duplicate-delivery protection |
| msg-model-queue-topic-partition-order | msg-outbox-db-publish-gap | REQUIRED | Outbox reasoning assumes that publishing a broker record is a separate system effect from committing business state in the database. | broker publication boundary is distinct from local database commit | — |
| db-transactions-isolation-anomalies | msg-outbox-db-publish-gap | REQUIRED | The outbox relies on writing business state and the outbox record in one local transaction before a separate relay publishes it. | atomic local database commit boundary | Relational Database owns local transaction semantics; Messaging owns the DB-to-broker delivery gap |
| dist-partial-failure-uncertainty | msg-outbox-db-publish-gap | REQUIRED | The dual-write gap matters because the process or network may fail after one side has succeeded and before the other side is known complete. | one component or communication step may fail independently between two effects | — |
| msg-producer-acks-durability | msg-outbox-db-publish-gap | RECOMMENDED | Producer acknowledgement depth improves reasoning about relay retries and ambiguous broker acceptance, but the DB-versus-broker atomicity gap can be introduced first. | broker acceptance acknowledgement may itself be ambiguous after timeout | — |
| msg-consumer-groups-offsets-rebalance | msg-replay-backfill | REQUIRED | Replay and backfill need a concrete way to choose historical positions and reason about partition assignment while processing them. | partition offsets, committed position and consumer assignment | — |
| msg-consumer-idempotency-inbox | msg-replay-backfill | RECOMMENDED | Duplicate-safe local effects make replay safer, although some projections are naturally rebuildable without a general inbox mechanism. | repeated delivery and local deduplication behavior | — |
| msg-schema-evolution-contract-ownership | msg-replay-backfill | RECOMMENDED | Historical replay may encounter old event versions, so compatibility depth improves replay safety, but replay can first be taught on one stable schema. | old and new event contracts may coexist in retained history | — |
| msg-model-queue-topic-partition-order | msg-schema-evolution-contract-ownership | REQUIRED | Event schema evolution belongs to a producer-consumer contract over retained messages, not just a local serialization type. | message contract, producer ownership and independently deployed consumers | — |
| prog-api-refactoring-change-safety | msg-schema-evolution-contract-ownership | RECOMMENDED | General contract-change safety is useful prior experience, but event compatibility has distinct retained-history and producer-consumer semantics. | preserve externally consumed behavior while old and new consumers may coexist | Programming owns general change safety; Messaging owns event-contract evolution |
| msg-model-queue-topic-partition-order | msg-workflow-saga-compensation | REQUIRED | A message-driven Saga uses commands or events as durable boundaries between workflow steps, so the messaging interaction model must already be understood. | messages or commands represent independently processed workflow steps | — |
| dist-partial-failure-uncertainty | msg-workflow-saga-compensation | REQUIRED | Saga compensation exists because distributed steps can succeed or fail independently and cannot be rolled back by one local transaction. | partial completion across independently failing participants | — |
| dist-reconciliation-convergence | msg-workflow-saga-compensation | RECOMMENDED | Reconciliation provides useful recovery intuition when compensation itself fails, but Saga state and compensation can be introduced before general reconciliation depth. | repair incomplete distributed state toward a valid outcome | — |
| dist-rpc-unknown-completion | msg-external-side-effect-reconciliation | REQUIRED | An external provider may commit a side effect even when the local caller never receives its response. | remote side effect may have completed despite a timeout or lost response | Distributed Systems owns remote-completion uncertainty; Messaging owns external-effect recovery in an event-driven workflow |
| dist-reconciliation-convergence | msg-external-side-effect-reconciliation | REQUIRED | Safe external-effect recovery requires comparing local state with an authoritative external result and applying repeatable repair. | authoritative state comparison and idempotent reconciliation | — |
| msg-consumer-idempotency-inbox | msg-external-side-effect-reconciliation | RECOMMENDED | Stable operation identity and duplicate-safe local effects help reconciliation, but an inbox cannot prove or deduplicate an external provider effect by itself. | stable local operation identity and duplicate-delivery protection | Messaging keeps local inbox semantics distinct from external-provider state |
| msg-consumer-groups-offsets-rebalance | msg-lag-backpressure-evidence | REQUIRED | Consumer lag is measured relative to partition assignment and offset progress, so those mechanics must already be understood. | current and committed offsets per partition and consumer assignment | — |
| concurrency-bounded-backpressure | msg-lag-backpressure-evidence | REQUIRED | Lag growth must be interpreted against arrival rate, service capacity and bounded in-flight work rather than solved by unlimited consumer concurrency. | finite downstream capacity and bounded concurrent work | Concurrency owns portable backpressure; Messaging owns lag and broker evidence |
| msg-delivery-retry-poison-dlq | msg-lag-backpressure-evidence | RECOMMENDED | Retry storms and poison-message handling can reduce effective consumption rate or hold progress, so they are useful competing hypotheses for lag. | repeated retry or poison handling consumes processing capacity and may block progress | — |
| net-http-semantics | api-contract-resource-semantics | REQUIRED | An HTTP API contract is expressed through request/response protocol semantics, so resource operations cannot be modelled safely without understanding what the HTTP method, status, headers and body communicate. | HTTP request/response operation semantics and externally observable protocol behavior. | Networking owns HTTP protocol semantics; API owns the business/resource contract expressed over HTTP. |
| prog-errors-results | api-validation-errors-pagination | REQUIRED | A stable API error model assumes the learner can distinguish expected domain failure from unexpected exception before mapping those outcomes to a client-visible response. | expected failure versus unexpected exception and failure propagation. | Programming owns general error/result semantics; API owns external validation and error contract. |
| api-contract-resource-semantics | api-validation-errors-pagination | REQUIRED | Validation, error representation and pagination are parts of the client-visible API contract and must preserve the meaning of the resource operation. | request intent, response meaning and externally visible API behavior. | — |
| api-contract-resource-semantics | api-versioning-compatibility | REQUIRED | Compatibility can only be evaluated after the existing request, response and resource behavior has been identified as a contract. | current externally observable API contract and resource semantics. | — |
| prog-api-refactoring-change-safety | api-versioning-compatibility | RECOMMENDED | General change-safety reasoning helps distinguish implementation refactoring from externally breaking change, but API versioning can still introduce compatibility rules locally. | preserve or deliberately migrate externally consumed behavior during change. | Programming owns general change safety; API owns client/server version compatibility. |
| api-contract-resource-semantics | api-request-identity-idempotency | REQUIRED | Request idempotency needs a precise definition of which client attempts represent the same logical API operation versus a genuinely new state transition. | logical API operation and its intended business effect. | — |
| dist-rpc-unknown-completion | api-request-identity-idempotency | RECOMMENDED | Remote-completion ambiguity provides the strongest motivation for stable request identity, but idempotency can first be introduced from ordinary duplicate submission. | a remote operation may have completed even though its response was not received. | Distributed Systems owns remote-completion uncertainty; API owns request-operation identity. |
| concurrency-cancellation-lifetime | api-deadlines-timeout-cancellation | REQUIRED | Deadline propagation assumes cancellation is a cooperative signal tied to operation lifetime rather than an automatic rollback of already completed work. | cooperative cancellation and logical operation lifetime. | Concurrency owns cancellation mechanics; API owns end-to-end deadline and timeout policy. |
| dist-rpc-unknown-completion | api-deadlines-timeout-cancellation | REQUIRED | A timeout or expired deadline must not be interpreted as proof that the remote operation did not execute. | missing response and remote business completion are separate facts. | Distributed Systems owns completion uncertainty; API owns deadline policy. |
| net-failure-localization-unknown-outcome | api-deadlines-timeout-cancellation | RECOMMENDED | Layer-specific networking evidence improves timeout diagnosis and helps separate DNS, connection, TLS and HTTP timing, but API deadline policy can be taught without requiring full network diagnosis first. | different network stages may consume time or fail before an API result is observed. | Networking owns failure-layer localization. |
| api-deadlines-timeout-cancellation | api-retry-backoff-jitter | REQUIRED | A retry policy must fit inside the remaining operation time budget rather than creating attempts that outlive the caller's useful deadline. | finite end-to-end deadline and propagated cancellation budget. | — |
| api-request-identity-idempotency | api-retry-backoff-jitter | REQUIRED | Retrying a mutation safely requires knowing whether another attempt represents the same logical operation and whether repeating it can duplicate the business effect. | stable logical operation identity and duplicate-effect protection. | — |
| concurrency-bounded-backpressure | api-circuit-bulkhead-rate-limit | REQUIRED | Bulkhead and admission-control decisions assume finite execution and downstream capacity; otherwise rejecting or bounding work has no resource model. | finite capacity, bounded concurrent work and overload protection. | Concurrency owns portable bounded work/backpressure; API owns service-boundary resilience policy. |
| dist-partial-failure-uncertainty | api-circuit-bulkhead-rate-limit | RECOMMENDED | Partial dependency failure makes circuit isolation and blast-radius control easier to motivate, but these protection mechanisms can first be taught from finite-capacity overload. | one dependency or path may be unhealthy while unrelated components remain usable. | Distributed Systems owns partial failure. |
| api-request-identity-idempotency | api-unknown-outcome-reconciliation | REQUIRED | Resolving an ambiguous mutation requires a stable operation identity so status lookup, stored result and later retry all refer to the same business operation. | stable logical operation key and persisted operation outcome. | — |
| dist-rpc-unknown-completion | api-unknown-outcome-reconciliation | REQUIRED | The target exists because transport failure cannot determine whether the remote mutation actually completed. | remote execution may succeed even when the caller observes timeout or lost response. | Distributed Systems owns remote-completion uncertainty. |
| dist-reconciliation-convergence | api-unknown-outcome-reconciliation | REQUIRED | Once completion is ambiguous, recovery requires comparing authoritative state and applying a repeatable repair or status transition rather than guessing. | authoritative-state comparison and idempotent reconciliation. | Distributed Systems owns portable reconciliation; API applies it to an ambiguous request operation. |
| api-deadlines-timeout-cancellation | api-unknown-outcome-reconciliation | RECOMMENDED | Deadline semantics provide a common trigger for entering an unknown outcome state, but reconciliation can also follow disconnects or other ambiguous failures. | caller lifetime may end while remote processing remains unresolved. | — |
| sec-trust-boundary-threat-model | sec-auth-session-token | REQUIRED | Authentication only has meaning after identifying which caller or system crosses a trust boundary and what identity must be established before trusting its claims. | actor, asset and trust-boundary identification. | — |
| sec-auth-session-token | sec-authorization-object-tenant | REQUIRED | Object or tenant authorization needs a server-trusted subject identity before policy can decide what that subject may do to a resource. | authenticated subject and trusted identity claims. | Security owns both mechanisms but keeps authentication distinct from authorization. |
| api-contract-resource-semantics | sec-authorization-object-tenant | REQUIRED | Authorization decisions operate on a concrete action and resource, so the API's resource/state-transition semantics must already be explicit. | requested action, target resource and operation semantics. | API owns normal resource contract; Security owns permission to perform that operation. |
| sec-auth-session-token | sec-oauth-oidc-awareness | REQUIRED | OAuth/OIDC role separation only becomes clear once the learner already understands basic identity establishment, token validation and session lifetime. | authentication identity, token validation and caller session/token lifecycle. | — |
| sec-trust-boundary-threat-model | sec-injection-ssrf-input-output | REQUIRED | Injection and SSRF reasoning begins by identifying which data or destination choice is attacker-controlled as it crosses into a trusted interpreter, query or network action. | untrusted input crossing a trust boundary into a privileged action. | — |
| net-request-path-dns | sec-injection-ssrf-input-output | RECOMMENDED | DNS and destination-resolution knowledge improves SSRF analysis because an attacker-controlled hostname may resolve into internal or otherwise forbidden network locations, but injection/SSRF can be introduced before deep networking. | hostname resolution selects a network destination before connection. | Networking owns DNS/path mechanics; Security owns adversarial destination control. |
| sec-trust-boundary-threat-model | sec-browser-boundaries-cors-csrf-xss | REQUIRED | CORS, CSRF and XSS are different trust-boundary failures in the browser model and cannot be distinguished safely without identifying actor, origin and credential boundary. | trusted versus untrusted actor/origin and protected asset/action. | — |
| net-http-semantics | sec-browser-boundaries-cors-csrf-xss | REQUIRED | Backend implications of CORS and CSRF rely on HTTP request, header, cookie/credential and response semantics rather than vulnerability names alone. | HTTP request/response headers and credential-bearing request behavior. | Networking owns HTTP protocol semantics; Security owns browser trust and abuse reasoning. |
| sec-trust-boundary-threat-model | sec-secrets-third-party-trust | REQUIRED | A secret or external callback is security-sensitive only relative to the authority it grants and the trust boundary through which the third-party data or action arrives. | authority-bearing asset and external trust boundary. | — |
| sec-trust-boundary-threat-model | sec-abuse-bruteforce-resource-business-flow | REQUIRED | Abuse controls must identify the actor, resource and sensitive business flow being protected rather than rate-limit every request uniformly. | actor, protected asset and abuse path across a trust boundary. | — |
| api-circuit-bulkhead-rate-limit | sec-abuse-bruteforce-resource-business-flow | RECOMMENDED | Service-level rate and resource protection provides useful mechanics for controlling abusive request volume, but Security adds identity, attacker intent and business-flow dimensions. | admission/rate control over finite service capacity. | API owns general resilience/admission policy; Security applies identity-aware controls against adversarial abuse. |
| concurrency-races-check-then-act | sec-race-business-logic-abuse | REQUIRED | Adversarial race abuse intentionally exploits the same gap between a check and later state transition that exists in an ordinary race condition. | check-then-act interleaving and non-atomic state transition. | Concurrency owns race mechanism; Security owns deliberate exploitation of the business invariant. |
| sec-trust-boundary-threat-model | sec-audit-detection-evidence | REQUIRED | Security audit evidence must record meaningful activity at a trust or privilege boundary; otherwise logs become generic application noise without an investigation model. | security-relevant actor, action, asset and trust boundary. | Security owns which security decision/action requires evidence. |
| obs-logs-structured-correlation | sec-audit-detection-evidence | RECOMMENDED | Structured and correlated logging improves storage and investigation of security events, but the semantics of what must be audited do not depend on first mastering generic observability logging. | stable structured fields and correlation across events. | Observability owns generic logging mechanics; Security owns audit semantics. |
| sec-authorization-object-tenant | sec-unseen-attack-transfer | REQUIRED | An unseen security case may involve a caller legitimately authenticated but unauthorized for a particular object or tenant. | subject-action-resource authorization using server-trusted ownership or tenant state. | — |
| sec-injection-ssrf-input-output | sec-unseen-attack-transfer | REQUIRED | L4 attack transfer must recognize when attacker-controlled input changes query, interpreter, destination or output behavior even when the vulnerability is unlabeled. | untrusted input must remain data rather than control over a privileged sink or destination. | — |
| sec-abuse-bruteforce-resource-business-flow | sec-unseen-attack-transfer | REQUIRED | Unfamiliar incidents may use valid endpoints and credentials at abusive frequency or sequence rather than malformed input. | identity/resource/business-flow aware abuse reasoning. | — |
| sec-race-business-logic-abuse | sec-unseen-attack-transfer | REQUIRED | L4 transfer must test whether concurrent valid-looking requests can violate the business invariant even when each request passes validation individually. | adversarial exploitation of a non-atomic business transition. | — |
| sec-audit-detection-evidence | sec-unseen-attack-transfer | REQUIRED | An unlabeled attack cannot be defended by vulnerability recognition alone; the learner must collect identity, action, target and state evidence that discriminates plausible abuse paths. | security audit timeline and evidence needed to investigate an action. | — |
| sec-secrets-third-party-trust | sec-unseen-attack-transfer | RECOMMENDED | Third-party and credential trust boundaries broaden transfer to webhooks, provider APIs and compromised credentials, but not every unseen attack needs that integration context. | authority-bearing secrets and externally supplied trusted-looking actions. | — |
| sec-browser-boundaries-cors-csrf-xss | sec-unseen-attack-transfer | RECOMMENDED | Browser-origin and ambient-credential cases broaden transfer beyond server-to-server abuse, but browser mechanics are not required for every L4 security incident. | browser origin, ambient credential and script execution trust boundaries. | — |
| obs-signals-correlation | obs-logs-structured-correlation | REQUIRED | Structured logging is one concrete telemetry signal and must preserve stable operation/resource context so events can be correlated instead of remaining isolated prose. | logs are discrete telemetry events and correlation links them to the same logical operation/resource. | Observability owns both signal selection and structured-log mechanics. |
| obs-signals-correlation | obs-instrumentation-context | REQUIRED | Instrumentation must choose which telemetry signal represents a semantic boundary and propagate enough context for that signal to join the same operation. | metrics, logs and traces represent different evidence views connected by operation/context identity. | — |
| obs-instrumentation-context | obs-cardinality-sampling-cost | REQUIRED | Cardinality and sampling costs arise from attributes, dimensions and events emitted by instrumentation, so the learner must know where that telemetry context is created. | instrumented attributes/context become metric dimensions or trace/log fields retained by telemetry systems. | — |
| obs-instrumentation-context | obs-tracing-distributed-evidence | REQUIRED | Distributed tracing depends on context propagation across service, task or message boundaries so independently recorded spans can be connected into one causal operation. | propagate operation/trace context across an execution or service boundary. | — |
| net-http-semantics | obs-tracing-distributed-evidence | RECOMMENDED | HTTP request/response boundaries provide a common concrete model for client/server spans and downstream timing, but tracing also applies to non-HTTP workflows. | one HTTP operation creates a request/response dependency boundary. | Networking owns HTTP semantics; Observability owns trace evidence. |
| msg-model-queue-topic-partition-order | obs-tracing-distributed-evidence | RECOMMENDED | Messaging knowledge improves reasoning about asynchronous span links and consumer correlation where no synchronous parent call remains, but basic tracing can first be taught over HTTP. | producer and consumer work are separate operations connected through a message rather than one synchronous call stack. | Messaging owns broker interaction; Observability owns causal telemetry. |
| runtime-diagnostics | obs-profiling-runtime-evidence | REQUIRED | Using profiler/runtime data diagnostically assumes the learner can choose counters, traces, dumps or profiles according to a hypothesis instead of collecting tools blindly. | hypothesis-driven selection of runtime diagnostic evidence. | Runtime owns CLR/runtime evidence mechanisms; Observability owns diagnostic interpretation. |
| obs-latency-throughput-saturation | obs-db-io-downstream-attribution | REQUIRED | Attribution starts by identifying which portion of end-to-end latency or saturation requires explanation before assigning it to DB, queue, network or downstream work. | latency distribution, throughput and saturation represent different observable workload symptoms. | — |
| obs-tracing-distributed-evidence | obs-db-io-downstream-attribution | REQUIRED | Cross-boundary attribution requires timing evidence that separates application work from downstream calls and waits rather than treating the request as one opaque duration. | span/dependency timing and causal boundaries across an operation. | Observability owns both tracing and cross-boundary attribution. |
| db-execution-operators | obs-db-io-downstream-attribution | RECOMMENDED | Execution-plan knowledge helps determine what happens inside a slow database span, but the attribution capability can first identify the DB as the latency boundary without deep plan analysis. | database execution consists of measurable scan/join/sort/aggregate operators rather than one opaque SQL duration. | Database owns execution mechanics; Observability owns system-level attribution. |
| db-connection-pool-exhaustion | obs-db-io-downstream-attribution | RECOMMENDED | Connection acquisition wait is an important competing explanation for database-facing latency, but generic attribution can be introduced before deep pool diagnosis. | time may be spent waiting for a DB connection before SQL execution begins. | Database owns pool-exhaustion mechanism; Observability uses it as a candidate latency source. |
| obs-latency-throughput-saturation | obs-load-test-benchmark-validity | REQUIRED | A load test cannot be judged valid without knowing which throughput, latency distribution and saturation claim the experiment is attempting to measure. | throughput, p50/p95/p99 and saturation are workload-dependent measured properties. | — |
| runtime-jit-warmup | obs-load-test-benchmark-validity | RECOMMENDED | Runtime warm-up is a common reason early measurements differ from steady-state behavior, but benchmark validity applies beyond JIT runtimes. | cold execution may include compilation/optimization costs absent from steady state. | Runtime owns JIT/warm-up mechanism; Observability owns experiment validity. |
| concurrency-bounded-backpressure | obs-load-test-benchmark-validity | RECOMMENDED | Bounded-work knowledge helps interpret queue growth and saturation under load, but a representative workload can still be designed before mastering the full backpressure mechanism. | arrival rate can exceed finite service capacity and increase in-flight or queued work. | Concurrency owns portable bounded work. |
| obs-signals-correlation | obs-diagnostic-method | REQUIRED | A diagnostic method needs the ability to choose evidence by question and correlate observations around the same operation instead of treating each dashboard independently. | different telemetry signals answer different questions and need shared operation/resource context. | — |
| obs-latency-throughput-saturation | obs-diagnostic-method | REQUIRED | The diagnostic process must distinguish symptom shape such as tail latency, throughput loss, errors or saturation before forming and testing competing causes. | interpret latency distribution, rates, errors and finite-resource saturation as symptoms rather than root causes. | — |
| obs-db-io-downstream-attribution | obs-diagnostic-method | RECOMMENDED | Cross-boundary attribution broadens the set of competing hypotheses the learner can test, but the general diagnostic method must not require mastery of every DB/downstream diagnostic domain first. | end-to-end time may be decomposed among application, DB, queue, network and downstream waits. | — |
| obs-profiling-runtime-evidence | obs-diagnostic-method | RECOMMENDED | Profiling gives deeper evidence for CPU/allocation/wait hypotheses, but the portable hypothesis-evidence method can first be learned with simpler telemetry. | runtime profile or stack evidence can discriminate CPU, allocation and wait hypotheses. | — |
| obs-logs-structured-correlation | obs-diagnostic-method | RECOMMENDED | Structured events often explain state transitions that aggregate metrics cannot, but the diagnostic method is not dependent on logs as a universal first tool. | queryable correlated events can confirm or reject a state-transition hypothesis. | — |
| obs-load-test-benchmark-validity | obs-diagnostic-method | RECOMMENDED | A controlled workload can be useful for reproducing or validating a hypothesis, but many incidents can be diagnosed without first mastering load-test design. | experimental result is only valid under its stated workload and environment conditions. | — |
| obs-latency-throughput-saturation | rel-user-journey-sli-slo-budget | REQUIRED | An SLI/SLO needs measurable good/total, latency or failure behavior rather than an arbitrary availability number. | latency distribution, success/error rate and workload measurements can represent user-observable service behavior. | Observability owns measurement semantics; Reliability owns the target and operating policy. |
| api-deadlines-timeout-cancellation | rel-dependency-budgets | REQUIRED | Allocating an end-to-end reliability budget requires a finite caller deadline that can be divided among dependency work and fallback. | remaining time budget and propagated deadline/cancellation boundary. | API owns request-level deadline mechanics; Reliability owns system-level budget allocation. |
| api-retry-backoff-jitter | rel-dependency-budgets | RECOMMENDED | Retry depth improves reasoning about how repeated attempts consume latency and failure budget, but a dependency budget can first be introduced from deadlines alone. | each retry consumes additional time and downstream capacity. | API owns concrete retry policy. |
| concurrency-bounded-backpressure | rel-overload-load-shedding-degradation | REQUIRED | Load shedding and degradation only make sense against a finite-capacity model where uncontrolled admitted work would otherwise grow queues or consume shared resources. | finite service/downstream capacity and bounded in-flight work. | Concurrency owns portable bounded work; Reliability owns which work to shed or degrade for user impact. |
| obs-latency-throughput-saturation | rel-overload-load-shedding-degradation | REQUIRED | The system must recognize saturation, queue growth or throughput plateau before deciding that intentional rejection/degradation is safer than accepting more work. | observable saturation and latency/throughput behavior near finite capacity. | Observability supplies evidence; Reliability chooses operating policy. |
| rel-overload-load-shedding-degradation | rel-cascading-failure-queue-capacity | REQUIRED | A cascading failure generalizes overload beyond one service: pressure from a slow or saturated dependency propagates through queues and finite resources into upstream components. | demand beyond sustainable capacity causes queue/resource growth and requires bounded admission/degradation. | — |
| api-retry-backoff-jitter | rel-cascading-failure-queue-capacity | RECOMMENDED | Retry amplification is a common contributor to cascade behavior, but cascades can also arise from long waits and shared-resource exhaustion. | multiple retry attempts can multiply traffic against an already degraded dependency. | API owns retry mechanics; Reliability owns system-wide propagation effects. |
| rel-dependency-budgets | rel-cascading-failure-queue-capacity | RECOMMENDED | Budget allocation helps explain why long child waits retain resources and propagate pressure, but cascade reasoning can begin directly from finite capacity and slow dependencies. | dependency time consumption reduces the remaining upstream recovery budget. | — |
| rel-user-journey-sli-slo-budget | rel-change-rollout-rollback-risk | RECOMMENDED | An explicit user-impact target provides a strong criterion for continuing or stopping rollout, but progressive rollout can first be introduced with simpler health/business evidence. | measured user journey and acceptable reliability target over a rollout window. | Reliability owns both policy concepts. |
| api-versioning-compatibility | rel-change-rollout-rollback-risk | RECOMMENDED | Mixed application versions create API compatibility risk during staged rollout, but not every rollout changes an API contract. | old and new API clients/servers may coexist during deployment. | API owns compatibility mechanism; Reliability owns rollout-risk policy. |
| db-schema-evolution | rel-change-rollout-rollback-risk | RECOMMENDED | Schema transitions can make rollback technically impossible even when an old application image still exists, but many rollouts are stateless. | old/new application versions may coexist with evolving database schema and data. | Database owns schema evolution; Reliability owns change risk. |
| msg-schema-evolution-contract-ownership | rel-change-rollout-rollback-risk | RECOMMENDED | Event compatibility affects mixed-version producer/consumer rollout, but message schema changes are only one class of release risk. | old/new producers, consumers and retained events may coexist. | Messaging owns event contract evolution. |
| obs-diagnostic-method | rel-incident-response-postmortem | RECOMMENDED | Hypothesis-driven diagnosis improves evidence preservation and root-cause analysis, but incident handling must still prioritize mitigation even before complete diagnosis. | separate symptom from cause and use evidence to test competing hypotheses. | Observability owns diagnosis method; Reliability owns incident response and learning. |
| rel-user-journey-sli-slo-budget | rel-incident-response-postmortem | RECOMMENDED | A defined user journey and reliability target improve impact quantification, but incident response must work even where formal SLOs are immature. | measure user impact against a meaningful service journey. | — |
| db-backup-restore | rel-disaster-recovery-rpo-rto | REQUIRED | RPO/RTO policy is only meaningful if at least one concrete data recovery mechanism can be tested for recoverable point and restore duration. | backup/restore mechanism, recovered data point and measured restore duration. | Database owns backup/restore mechanism; Reliability owns RPO/RTO business policy. |
| dist-replication-leader-quorum | rel-disaster-recovery-rpo-rto | RECOMMENDED | Replication knowledge helps distinguish availability replicas from real backup/recovery strategy, but DR can be introduced with restore mechanics first. | replicated copies can share corruption or lag and are not automatically independent backups. | Distributed Systems owns replication semantics. |
| test-failure-resilience | rel-failure-injection-verification | REQUIRED | A safe reliability experiment is a specialized failure test and must start from a reproducible injected failure with explicit expected state and recovery evidence. | controlled failure injection, expected invariant/outcome and repeatable post-failure verification. | Testing owns general failure-test mechanics; Reliability owns service reliability assumption and safe blast radius. |
| rel-user-journey-sli-slo-budget | rel-failure-injection-verification | REQUIRED | A reliability fault experiment must state what acceptable user behavior or reliability property it is trying to validate rather than merely proving that infrastructure stayed alive. | user-impact reliability target and observable SLI for the experiment. | — |
| obs-diagnostic-method | rel-failure-injection-verification | RECOMMENDED | Hypothesis/evidence discipline improves experiment design and interpretation, but Reliability still owns fault scope, user impact and safe stop conditions. | prediction, discriminating evidence, controlled experiment and before/after conclusion. | Observability owns generic diagnostic experiment method. |
| obs-signals-correlation | rel-health-readiness-semantics | RECOMMENDED | Telemetry-signal awareness helps distinguish a useful health indicator from arbitrary dependency status, but liveness/readiness semantics can be introduced without first mastering observability. | a signal should correspond to the property the operator intends to act upon. | Observability owns signal mechanics; Reliability owns health meaning and routing/restart policy. |
| prog-invariants-domain-model | test-risk-strategy-boundaries | RECOMMENDED | Explicit business invariants make it easier to identify what a change could violate, but testing risk can also come from protocol, performance or infrastructure behavior rather than a domain invariant. | valid state and behavior that a change must preserve. | Programming owns invariant definition; Testing owns risk-oriented falsification strategy. |
| test-risk-strategy-boundaries | test-unit-integration-contract | REQUIRED | Choosing unit, integration or contract scope must start from the risky mechanism that needs falsification rather than from test-type vocabulary. | identify the risky assumption and the narrowest trustworthy boundary that still contains the real mechanism. | Testing owns both capabilities. |
| test-unit-integration-contract | test-real-dependency-fixtures | REQUIRED | A real dependency fixture is justified when the selected test boundary includes engine or protocol behavior that an isolated double cannot prove. | difference between local isolated behavior and an integration boundary whose real semantics matter. | — |
| concurrency-races-check-then-act | test-time-concurrency-determinism | REQUIRED | A deterministic race test must know which check, mutation and competing interleaving it is trying to force rather than relying on sleeps and chance. | check-then-act race window and concrete unsafe interleaving. | Concurrency owns race mechanics; Testing owns reproducible test control. |
| concurrency-cancellation-lifetime | test-time-concurrency-determinism | RECOMMENDED | Cancellation and shutdown tests often require controlling operation lifetime explicitly, but deterministic concurrency testing also applies to races with no cancellation. | cooperative cancellation and logical operation lifetime. | Concurrency owns cancellation semantics. |
| test-risk-strategy-boundaries | test-time-concurrency-determinism | RECOMMENDED | Risk-oriented boundary selection helps decide which interleaving or time condition is worth controlling, but the deterministic testing mechanism can be introduced directly from a known race. | identify the specific concurrency/time assumption that the test should falsify. | — |
| prog-invariants-domain-model | test-property-boundary-fuzz | REQUIRED | Property-based and boundary testing need an invariant or behavioral rule that must remain true over many generated inputs rather than merely generating random values. | state or behavior invariant that all valid executions/inputs must preserve. | Programming owns invariant semantics; Testing owns broad-input falsification. |
| test-risk-strategy-boundaries | test-property-boundary-fuzz | RECOMMENDED | Risk analysis helps focus generated and boundary inputs on meaningful failure surfaces, but property testing can first be taught from one explicit invariant. | prioritize the input/state region whose failure would matter. | — |
| test-risk-strategy-boundaries | test-failure-resilience | REQUIRED | A failure test must choose a meaningful dependency or resource failure that threatens a real invariant rather than inject faults randomly. | identify the risky boundary, expected behavior and invariant under failure. | Testing owns both general risk strategy and repeatable failure testing. |
| dist-partial-failure-uncertainty | test-failure-resilience | RECOMMENDED | Distributed partial failure provides realistic examples where one dependency fails while other state remains active, but failure testing also applies to local resources and single-process systems. | one dependency or component can fail or become unreachable while the rest of the operation/system retains state. | Distributed Systems owns partial-failure mechanism; Testing owns controlled reproduction. |
| test-risk-strategy-boundaries | test-migration-compatibility | REQUIRED | Migration compatibility testing must identify which transitional old/new combinations can break before constructing a matrix of fixtures. | derive test boundary and failure risk from a change that spans multiple versions or persisted representations. | — |
| api-versioning-compatibility | test-migration-compatibility | RECOMMENDED | API compatibility supplies one concrete mixed-version contract to test, but migration testing also applies to database and event evolution. | old and new API contracts may coexist during rollout. | API owns API compatibility semantics; Testing owns how coexistence is falsified. |
| db-schema-evolution | test-migration-compatibility | RECOMMENDED | Database schema evolution supplies concrete old/new application and data states, but it is one migration domain rather than a universal prerequisite. | old/new binaries, schema versions and persisted data may coexist during migration. | Database owns schema evolution semantics. |
| msg-schema-evolution-contract-ownership | test-migration-compatibility | RECOMMENDED | Retained historical events and independently deployed consumers broaden compatibility testing, but migration testing can first be learned in another versioned boundary. | old/new message contracts and historical events may coexist. | Messaging owns event evolution; Testing owns compatibility falsification. |
| test-risk-strategy-boundaries | test-ci-flakiness-repeatability | REQUIRED | Diagnosing a flaky test requires knowing which state and behavior should determine the verdict so hidden timing, ordering or environment dependencies can be separated from the actual product risk. | relevant test state, intended invariant and trustworthy verdict boundary. | — |
| test-time-concurrency-determinism | test-ci-flakiness-repeatability | RECOMMENDED | Timing and interleaving are common sources of flakes, so deterministic control provides useful diagnostic techniques, but CI flakiness may also come from shared state or environment dependencies. | explicit time/interleaving control replaces sleeps and probabilistic ordering. | — |
| test-real-dependency-fixtures | test-ci-flakiness-repeatability | RECOMMENDED | Real fixtures introduce lifecycle, isolation, port and cleanup failure modes that commonly surface only under parallel CI, but CI repeatability does not require every test to use real dependencies. | fixture startup, state isolation, version and cleanup are part of the test's relevant environment. | — |
| test-risk-strategy-boundaries | test-review-static-analysis-change-safety | REQUIRED | Review, analyzers and regression tests only provide useful change-safety evidence when reviewers know what behavior or contract the change puts at risk. | identify changed invariant, contract or failure boundary that deserves evidence. | Testing owns risk/evidence strategy; static analysis and review are supporting mechanisms. |
| prog-api-refactoring-change-safety | test-review-static-analysis-change-safety | RECOMMENDED | General refactoring/change-safety experience helps distinguish implementation cleanup from behavior-changing risk, but review strategy can still teach this boundary locally. | preserve or intentionally migrate externally meaningful behavior during a code change. | Programming owns general code/change design; Testing owns evidence for change safety. |
| test-unit-integration-contract | test-risk-transfer | REQUIRED | L4 transfer must be able to move the test boundary when the real mechanism changes rather than preserving the same test shape across architectures. | choose unit, integration or contract boundary according to where the behavior can actually fail. | — |
| test-failure-resilience | test-risk-transfer | REQUIRED | An unseen architecture change often introduces a new failure boundary, so L4 testing must preserve invariants when dependency/resource failure modes change. | inject a controlled failure and verify durable state, outcome and recovery invariant. | — |
| test-time-concurrency-determinism | test-risk-transfer | RECOMMENDED | Concurrency changes are an important transfer case where previous happy-path test structure stops being trustworthy, but not every unfamiliar change is concurrent. | control an interleaving, clock or operation lifetime to reproduce a concurrency-sensitive failure. | — |
| test-property-boundary-fuzz | test-risk-transfer | RECOMMENDED | Property and generated-input reasoning broadens transfer to unfamiliar input/state spaces, but L4 risk transfer does not require property-based testing for every architecture change. | test an invariant across broad or generated input and preserve the failing case. | — |
| test-migration-compatibility | test-risk-transfer | RECOMMENDED | Version-transition reasoning strengthens transfer when architecture changes introduce coexistence or migration, but not every changed boundary is versioned. | test old/new representations and transitional compatibility rather than only final state. | — |
| test-review-static-analysis-change-safety | test-risk-transfer | RECOMMENDED | Review and static evidence broaden L4 change reasoning beyond runtime tests, but dynamic risk-boundary selection remains sufficient to begin the transfer capability. | combine diff intent, static findings and targeted dynamic evidence when the implementation changes. | — |
| prog-invariants-domain-model | arch-boundaries-ownership | REQUIRED | A module or service boundary should be drawn around rules/state that need one coherent owner, so the learner must first be able to identify the invariant being protected. | business-valid state, invariant and the authority responsible for preserving it. | Programming owns invariant modelling; Architecture owns system/module ownership boundaries. |
| prog-composition-dependencies | arch-boundaries-ownership | RECOMMENDED | Dependency direction and composition seams make coupling/change boundaries easier to evaluate, but architecture boundaries can still be introduced directly from ownership and invariants. | explicit dependency direction and composition boundary. | Programming owns code-level composition; Architecture owns service/module boundary decisions. |
| arch-requirements-quality-attributes | arch-boundaries-ownership | RECOMMENDED | Latency, isolation, independent-change and operational requirements help decide how strong a boundary should be, but invariant ownership can be introduced before the full requirements capability. | quality attributes and constraints that may justify an independent boundary. | — |
| arch-boundaries-ownership | arch-data-ownership-source-of-truth | REQUIRED | Naming a system-wide source of truth requires an explicit owner that is authorized to accept business-state transitions. | one boundary owns state/rules and crossing that boundary requires an explicit contract. | Architecture owns both system ownership concepts. |
| cache-need-source-of-truth | arch-data-ownership-source-of-truth | RECOMMENDED | Cache Engineering provides a concrete example of authoritative state versus a derived copy, but architecture must generalize that reasoning to indexes, projections and other systems. | a cached copy is derived state and another system remains authoritative. | Cache owns cached-copy correctness; Architecture synthesizes system-wide data authority. |
| arch-requirements-quality-attributes | arch-sync-async-integration | REQUIRED | Sync versus async is not a style preference; the decision only makes sense against required completion semantics, latency, coupling and recovery behavior. | required response/completion behavior and relevant quality constraints. | — |
| net-http-semantics | arch-sync-async-integration | REQUIRED | A synchronous backend integration needs a concrete request/response mechanism whose caller lifetime is coupled to a downstream result. | request/response operation and caller-visible completion semantics. | Networking owns HTTP mechanics; Architecture decides when synchronous integration fits. |
| msg-model-queue-topic-partition-order | arch-sync-async-integration | REQUIRED | An asynchronous option cannot be evaluated responsibly without understanding that work is represented as independently delivered messages rather than one caller-held request stack. | message destination, delivery boundary and independently processed work. | Messaging owns broker semantics; Architecture decides when asynchronous integration fits. |
| dist-partial-failure-uncertainty | arch-sync-async-integration | RECOMMENDED | Partial-failure reasoning deepens the comparison between runtime coupling and durable asynchronous recovery, but basic sync/async choice can be introduced first. | one dependency may fail or become unreachable while other state remains active. | Distributed Systems owns partial failure. |
| arch-requirements-quality-attributes | arch-consistency-latency-availability | REQUIRED | A consistency decision must be evaluated against explicit correctness, latency and availability requirements rather than a universal stronger is better rule. | required correctness and quality-attribute scenario. | Architecture owns requirement-driven synthesis. |
| prog-invariants-domain-model | arch-consistency-latency-availability | REQUIRED | The architecture cannot decide whether stale/eventual state is acceptable without knowing which business invariant the operation must preserve. | business invariant and valid state transition. | Programming owns invariant modelling. |
| dist-consistency-linearizability | arch-consistency-latency-availability | REQUIRED | Architecture chooses where a guarantee is needed; it must not re-teach what the underlying visibility/order guarantees mean. | allowed read/write histories and the coordination implications of stronger visibility guarantees. | Distributed Systems owns consistency mechanisms; Architecture chooses where they are required. |
| arch-requirements-quality-attributes | arch-scale-capacity-partitioning | REQUIRED | Scale architecture must start from workload, growth and latency/capacity assumptions rather than technology-first sharding or replication. | traffic/data estimates, quality constraints and explicit scale assumptions. | — |
| obs-latency-throughput-saturation | arch-scale-capacity-partitioning | REQUIRED | A scaling decision needs evidence of where finite capacity is actually reached; adding replicas cannot be justified from traffic growth alone. | throughput, concurrency, latency and saturation reveal a capacity boundary. | Observability owns measurement; Architecture chooses structural scale boundaries. |
| dist-partitioning-ownership-rebalancing | arch-scale-capacity-partitioning | RECOMMENDED | Partition ownership is useful once scale requires data/work distribution, but architecture can reason about capacity and ordinary replication before sharding. | keys/work map to owners and repartitioning creates distribution and rebalance cost. | Distributed Systems owns partition-ownership mechanism. |
| arch-boundaries-ownership | arch-failure-recovery-security-observability | REQUIRED | Failure, recovery, trust and telemetry must attach to concrete system boundaries and owners; otherwise responsibility remains ambiguous. | component/state owner and explicit cross-boundary contracts. | Architecture owns synthesis of those concerns. |
| dist-partial-failure-uncertainty | arch-failure-recovery-security-observability | REQUIRED | A design cannot be evaluated under failure unless the learner already accepts that dependencies can fail independently and leave uncertain or partial state. | independent component/path failure and uncertainty. | Distributed Systems owns partial-failure mechanism. |
| sec-trust-boundary-threat-model | arch-failure-recovery-security-observability | REQUIRED | Architecture-level security evaluation assumes the learner can identify actor, asset and trust boundary instead of adding generic security controls to a diagram. | trust boundary, protected asset and untrusted actor/input path. | Security owns threat/trust mechanics; Architecture incorporates them into system design. |
| obs-signals-correlation | arch-failure-recovery-security-observability | REQUIRED | A design is not operable if critical state transitions have no evidence path, so architecture evaluation assumes basic telemetry signal and correlation semantics. | telemetry signals can be correlated around a logical operation or resource. | Observability owns telemetry mechanics. |
| rel-user-journey-sli-slo-budget | arch-failure-recovery-security-observability | REQUIRED | Architecture failure/recovery choices need a user-impact criterion rather than simply maximizing infrastructure redundancy. | meaningful user journey and measurable reliability target. | Reliability owns user-impact reliability policy. |
| rel-disaster-recovery-rpo-rto | arch-failure-recovery-security-observability | RECOMMENDED | RPO/RTO provides deeper recovery constraints for stateful designs, but not every architecture exercise requires disaster-recovery depth. | acceptable data-loss window and restoration-time objective. | Reliability owns recovery objectives. |
| arch-boundaries-ownership | arch-evolution-migration-strangler | REQUIRED | Incremental migration requires a seam with explicit old/new ownership; without a boundary there is no safe place to route or retire behavior. | state/rule owner and explicit contract across the migration seam. | — |
| prog-api-refactoring-change-safety | arch-evolution-migration-strangler | REQUIRED | A strangler-style migration changes implementation structure while preserving or deliberately migrating externally meaningful behavior. | change-safe refactoring preserves required behavior and makes compatibility impact explicit. | Programming owns general change safety; Architecture owns system migration strategy. |
| api-versioning-compatibility | arch-evolution-migration-strangler | RECOMMENDED | API coexistence is one important migration boundary, but not every architecture migration exposes versioned APIs. | old/new external contracts may coexist during transition. | API owns API compatibility. |
| db-schema-evolution | arch-evolution-migration-strangler | RECOMMENDED | Database evolution is a major migration case where old/new paths share persisted state, but architectural migration also occurs without schema change. | old/new application versions may coexist with evolving persisted data. | Database owns schema-evolution mechanism. |
| msg-schema-evolution-contract-ownership | arch-evolution-migration-strangler | RECOMMENDED | Event evolution matters when old and new producers/consumers coexist, but it is one migration domain rather than a universal prerequisite. | retained event history and independently deployed contract versions may coexist. | Messaging owns event-contract evolution. |
| dist-reconciliation-convergence | arch-evolution-migration-strangler | RECOMMENDED | Reconciliation is useful when old/new paths temporarily produce divergent state or a dual-write gap, but some migrations need no duplicated state. | compare derived/actual state against authority and repair repeatably. | Distributed Systems owns portable reconciliation. |
| arch-requirements-quality-attributes | arch-cost-complexity-changeability | REQUIRED | Architecture complexity can only be justified by a required property; without requirements there is no basis for deciding whether the lifecycle cost is worth paying. | explicit quality attribute or constraint that a mechanism is intended to buy. | — |
| arch-boundaries-ownership | arch-cost-complexity-changeability | RECOMMENDED | Every additional deployable/ownership boundary has operational and cognitive cost, but lifecycle-cost reasoning also applies to components inside one boundary. | a boundary introduces contracts, deployment and ownership burden. | — |
| arch-requirements-quality-attributes | arch-decision-communication-transfer | REQUIRED | A defensible architecture decision must communicate the context, constraints and assumptions against which one option was selected. | requirements, constraints and assumptions that define decision context. | — |
| arch-cost-complexity-changeability | arch-decision-communication-transfer | RECOMMENDED | Lifecycle-cost reasoning strengthens option comparison and revisit triggers, but an ADR can be taught before the full complexity/cost capability. | a design mechanism has ongoing cost that must be compared with the property it buys. | — |
| arch-failure-recovery-security-observability | arch-decision-communication-transfer | RECOMMENDED | Failure/trust/operability consequences create stronger decision records, but not every architecture decision needs the full L4 production review. | important failure, recovery, trust and evidence consequences of an option. | — |
| arch-evolution-migration-strangler | arch-decision-communication-transfer | RECOMMENDED | Migration experience improves revisit-trigger and changed-assumption reasoning, but architecture decisions can be communicated before a migration exercise. | architecture decisions evolve and may require an incremental transition rather than replacement in one step. | — |
| os-process-thread-kernel | delivery-container-process-lifecycle | REQUIRED | A container still runs a process; understanding its lifecycle requires the process/address-space boundary before adding runtime isolation and packaging. | process lifetime, process identity and user/kernel execution boundary. | OS owns process mechanism; Delivery owns container/runtime implementation. |
| delivery-container-process-lifecycle | delivery-resources-cpu-memory | REQUIRED | CPU/memory requests and limits apply to the process/container runtime boundary, so the learner must first know what workload the platform is constraining. | container lifetime follows its workload process and runs under platform resource boundaries. | — |
| os-resource-exhaustion | delivery-resources-cpu-memory | REQUIRED | Container limits only make sense against finite CPU/memory/resource capacity and the failure behavior when the workload exceeds it. | finite process memory/CPU resources and resource-exhaustion behavior. | OS owns portable resource mechanism; Delivery owns platform requests/limits/throttling/termination. |
| os-virtual-memory-page-cache | delivery-resources-cpu-memory | RECOMMENDED | Virtual-memory and page-cache intuition improves interpretation of RSS, working set and memory-limit surprises, but resource limits can be introduced without OS memory depth. | process-visible memory is not identical to one simplistic managed-heap number. | OS owns memory-system mechanism. |
| rel-health-readiness-semantics | delivery-probes-health | REQUIRED | A platform probe must implement a defined liveness/readiness meaning; otherwise probe configuration can turn a dependency outage into restart or routing cascades. | difference between cannot make useful progress and should not receive traffic. | Reliability owns health semantics; Delivery owns probe implementation. |
| delivery-container-process-lifecycle | delivery-probes-health | RECOMMENDED | Container lifecycle gives concrete startup/restart context for probes, but probe semantics remain anchored in Reliability rather than process packaging. | platform starts, restarts and terminates a workload process. | — |
| os-termination-graceful-shutdown | delivery-graceful-shutdown-draining | REQUIRED | Orchestrator draining is built on the underlying process termination signal/lifetime rather than replacing it. | termination signal, finite shutdown lifetime and resource release before process exit. | OS owns process termination; Delivery owns orchestration/draining integration. |
| delivery-container-process-lifecycle | delivery-graceful-shutdown-draining | REQUIRED | The platform can only coordinate drain, grace period and exit relative to the workload/container lifecycle it controls. | container/process start, running and termination lifecycle. | — |
| concurrency-cancellation-lifetime | delivery-graceful-shutdown-draining | RECOMMENDED | Cooperative cancellation helps drain in-flight asynchronous work, but graceful platform termination also applies to simpler synchronous processes. | logical operations respond cooperatively to cancellation before their lifetime ends. | Concurrency owns cancellation mechanics. |
| delivery-artifact-image-config | delivery-cicd-promotion-provenance | REQUIRED | Promotion/provenance requires an immutable artifact identity that can be traced from source and moved through environments without rebuilding. | versioned artifact/image, digest and separation of build from runtime configuration. | Delivery owns both artifact identity and promotion mechanism. |
| delivery-artifact-image-config | delivery-rollout-rollback-strategies | REQUIRED | A rollout changes which immutable application artifact/version receives traffic, and rollback requires knowing the exact prior artifact. | immutable deployable artifact identity and reproducible prior version. | — |
| rel-change-rollout-rollback-risk | delivery-rollout-rollback-strategies | REQUIRED | Deployment mechanism should implement an already-defined blast-radius and rollback policy rather than inventing reliability policy from Kubernetes primitives. | progressive exposure, observation criteria and technical rollback boundary. | Reliability owns rollout-risk policy; Delivery owns platform rollout mechanics. |
| delivery-probes-health | delivery-rollout-rollback-strategies | RECOMMENDED | Readiness/probe behavior strongly affects whether new replicas receive traffic during rollout, but rollout mechanics can be introduced with a simpler healthy-instance assumption. | platform routing uses readiness state to include or remove an instance. | — |
| api-versioning-compatibility | delivery-rollout-rollback-strategies | RECOMMENDED | API compatibility matters when old/new service versions coexist, but not every rollout changes an API contract. | old/new API versions may serve traffic concurrently. | API owns compatibility semantics. |
| db-schema-evolution | delivery-rollout-rollback-strategies | RECOMMENDED | Schema evolution can make rollback impossible even when an old image is available, but many deployments are stateless with respect to schema. | old/new binaries may coexist with evolving persisted schema/data. | Database owns schema evolution. |
| msg-schema-evolution-contract-ownership | delivery-rollout-rollback-strategies | RECOMMENDED | Old/new producers and consumers can coexist during rollout, but event compatibility is only one release-risk dimension. | mixed-version event producers/consumers and retained event history. | Messaging owns event-contract evolution. |
| obs-latency-throughput-saturation | delivery-autoscaling-signal-boundary | REQUIRED | An autoscaling signal must correspond to measurable resource/work pressure rather than an arbitrary metric. | throughput, queue/concurrency, latency and saturation identify a real capacity boundary. | Observability owns signal interpretation; Delivery owns platform scaling implementation. |
| delivery-resources-cpu-memory | delivery-autoscaling-signal-boundary | REQUIRED | Replica scaling decisions must understand the CPU/memory resource model the scheduler and workload actually consume. | platform CPU/memory requests, limits and constrained workload behavior. | — |
| rel-overload-load-shedding-degradation | delivery-autoscaling-signal-boundary | RECOMMENDED | Reliability overload reasoning helps recognize when scale-out is too slow or shared downstream capacity requires shedding instead, but autoscaling mechanics can be learned independently. | not every overload condition can be solved safely by admitting more parallel work. | Reliability owns overload policy. |
| msg-lag-backpressure-evidence | delivery-autoscaling-signal-boundary | RECOMMENDED | Consumer lag is a useful work-pressure signal for queue consumers, but autoscaling must also support CPU/request-driven workloads. | partition lag and consume rate reflect queued messaging work. | Messaging owns lag evidence. |
| delivery-container-process-lifecycle | delivery-platform-evidence-debug | REQUIRED | Platform diagnosis must distinguish scheduling/startup/restart/process lifecycle failures before examining application behavior. | container/process lifecycle, exit state and platform-controlled restart boundary. | Delivery owns platform lifecycle debugging. |
| delivery-resources-cpu-memory | delivery-platform-evidence-debug | REQUIRED | Platform diagnosis must recognize throttling, OOM and resource constraint evidence rather than misclassifying them as application logic failures. | requests/limits, CPU throttling, working memory and platform resource-termination behavior. | — |
| delivery-probes-health | delivery-platform-evidence-debug | REQUIRED | Readiness/liveness configuration and resulting platform actions are a distinct failure source that application logs alone may not reveal. | probe configuration, readiness state, restart/routing action and probe failure reason. | — |
| delivery-artifact-image-config | delivery-platform-evidence-debug | RECOMMENDED | Artifact/config identity helps diagnose wrong image, missing config, secret or mount cases, but platform debugging can start from lifecycle/resource failures. | deployed artifact identity and runtime configuration source. | — |
| net-proxy-lb-forwarded-boundary | delivery-platform-evidence-debug | RECOMMENDED | Proxy/load-balancer knowledge improves diagnosis of service routing and forwarding failures, but platform evidence debugging also covers non-network failures. | traffic may traverse a proxy/LB boundary before reaching the workload. | Networking owns proxy/LB protocol boundary; Delivery uses platform routing evidence. |
| sec-secrets-third-party-trust | delivery-cloud-responsibility-managed-services | RECOMMENDED | Managed services rely heavily on scoped credentials and external trust boundaries, but responsibility mapping can be introduced before full secret-management depth. | credentials grant authority and external providers remain a trust boundary. | Security owns trust/secret policy; Delivery owns managed-service responsibility mapping. |
| rel-disaster-recovery-rpo-rto | delivery-cloud-responsibility-managed-services | RECOMMENDED | Recovery objectives expose the difference between provider-managed availability features and application-owned restore verification, but managed responsibility is broader than DR. | provider redundancy does not by itself prove application RPO/RTO. | Reliability owns recovery objectives. |
| delivery-artifact-image-config | delivery-platform-transfer | REQUIRED | Moving between platforms must preserve deployable artifact identity and configuration requirements even when packaging/promotion mechanisms change. | portable artifact identity and separation of build from runtime config. | — |
| delivery-platform-evidence-debug | delivery-platform-transfer | REQUIRED | Platform transfer is only credible if the learner can map failure evidence from one platform implementation back to portable process/resource/network concepts. | diagnose lifecycle, resource, probe/config and routing behavior from platform evidence. | — |
| delivery-graceful-shutdown-draining | delivery-platform-transfer | REQUIRED | Shutdown/drain semantics are portable runtime requirements that must survive a move between VM, container orchestrator and managed runtime. | stop routing, signal termination, drain/cancel work and exit within a bounded lifetime. | — |
| delivery-cloud-responsibility-managed-services | delivery-platform-transfer | RECOMMENDED | Managed-service responsibility reasoning strengthens transfer into higher-level cloud platforms, but a VM-to-Kubernetes transfer can be evaluated without it. | provider-managed implementation changes operational responsibility but does not remove application ownership of behavior. | — |
| delivery-autoscaling-signal-boundary | delivery-platform-transfer | RECOMMENDED | Autoscaling behavior is an important platform delta, but not every platform move changes scaling model. | same workload pressure may map to different scaling signals and delay semantics on another platform. | — |
| delivery-rollout-rollback-strategies | delivery-platform-transfer | RECOMMENDED | Deployment strategy differs across platforms and is useful transfer evidence, but platform portability can first be evaluated from runtime requirements. | platforms implement version coexistence, traffic movement and rollback differently. | — |
## Step-2 dependency-question resolution

- Numbering is TrackNumber.QuestionNumber following the frozen Step-2 Unresolved dependency questions bullet order.
- These resolutions introduce no new edge.
- REQUIRED / RECOMMENDED below correspond to existing registry relations.
- NO EDGE means the graph intentionally records no ordering relation.
- Where a question concerns mastery level or lesson design rather than capability ordering, Step 3 does not encode that concern.

TRACK 1 — PROGRAMMING
==================================================

1.1

REQUIRED:
prog-errors-results
→ prog-api-refactoring-change-safety

REQUIRED:
prog-invariants-domain-model
→ prog-api-refactoring-change-safety

RECOMMENDED:
prog-composition-dependencies
→ prog-api-refactoring-change-safety

Resolution:
public change safety requires failure-contract and invariant knowledge;
composition/dependency seams are useful but not a hard prerequisite.


1.2

RECOMMENDED:
prog-resource-ownership
→ net-streaming-body-cancellation

REQUIRED:
concurrency-cancellation-lifetime
→ net-streaming-body-cancellation

Resolution:
resource ownership helps pooled-buffer/stream lifetime reasoning, but
cooperative cancellation/lifetime is the hard prerequisite.


1.3

REQUIRED:
prog-invariants-domain-model
→ concurrency-interleavings-invariants

REQUIRED:
concurrency-interleavings-invariants
→ db-transactions-isolation-anomalies

Resolution:
first establish the business/state invariant, then concurrent
interleaving, then DB isolation behavior.
Do NOT add db-modeling-invariants as a hard prerequisite merely because
the final example uses a database.


1.4

NO EDGE.

Resolution:
prog-collections-complexity is intentionally independent of profiling.
Collection/complexity reasoning can be learned before profiler skills.


1.5

NO EDGE.

Resolution:
prog-types-generics is intentionally not a universal prerequisite for
infrastructure adapters.
Generics/nullability may be taught where locally relevant without
hard-gating the infrastructure graph.


==================================================
TRACK 2 — RUNTIME & MEMORY
==================================================

2.1

RECOMMENDED:
os-virtual-memory-page-cache
→ runtime-memory-roots-lifetime

Resolution:
OS virtual-memory context helps distinguish OS memory from managed
reachability, but managed-heap/root reasoning remains self-contained.


2.2

RECOMMENDED:
runtime-diagnostics
→ runtime-retention-pooling-large-objects

Resolution:
profiling/heap evidence improves pooling decisions but does not hard-gate
the introduction of pooling/retention.


2.3

NO EDGE:
runtime-jit-warmup
→ delivery-autoscaling-signal-boundary

Existing useful relation instead:

RECOMMENDED:
runtime-jit-warmup
→ obs-load-test-benchmark-validity

Resolution:
warm-up affects measurement validity; it is not a prerequisite for
understanding autoscaling.


2.4

NO LEVEL EDGE.

Resolution:
Step 3 does not encode "L2 before L3" mastery prerequisites.

Existing REQUIRED synthesis is:

runtime-retention-pooling-large-objects
→ runtime-memory-performance-debug

runtime-diagnostics
→ runtime-memory-performance-debug

This is where retention vs leak is evaluated using evidence.


2.5

NO EDGE.

Resolution:
JVM comparison is an implementation/transfer lane, not a prerequisite in
the portable .NET-primary core graph.


==================================================
TRACK 3 — OPERATING SYSTEMS & I/O
==================================================

3.1

REQUIRED:
os-files-handles-sockets-ipc
→ net-tcp-connection-semantics

Resolution:
minimal socket/resource lifecycle precedes TCP connection semantics.


3.2

RECOMMENDED:
os-virtual-memory-page-cache
→ db-buffer-io

Resolution:
page-cache knowledge improves DB I/O reasoning but is not a hard gate.


3.3

REQUIRED:
os-process-thread-kernel
→ os-scheduling-starvation

RECOMMENDED:
os-scheduling-starvation
→ concurrency-async-parallelism

Resolution:
scheduler model owns starvation;
async knowledge does not need to precede the OS starvation mechanism.


3.4

REQUIRED:
os-termination-graceful-shutdown
→ delivery-graceful-shutdown-draining

NO direct prerequisite edge to Messaging.

Resolution:
OS owns process termination;
Delivery owns orchestrator draining;
Messaging retains message acknowledgement/durable-delivery semantics
when the later lab involves a consumer.


3.5

REQUIRED:
os-resource-exhaustion
→ delivery-resources-cpu-memory

RECOMMENDED:
os-virtual-memory-page-cache
→ delivery-resources-cpu-memory

Resolution:
finite-resource behavior is required before platform CPU/memory limits;
deeper VM/page-cache knowledge is supporting context.


==================================================
TRACK 4 — CONCURRENCY & ASYNC
==================================================

4.1

NO EDGE:
concurrency-async-parallelism
→ concurrency-races-check-then-act

Actual prerequisite:

REQUIRED:
concurrency-interleavings-invariants
→ concurrency-races-check-then-act

Resolution:
a race requires interleaving/shared-state reasoning, not async syntax.


4.2

NO EDGE between:
concurrency-synchronization-atomicity
and
db-transactions-isolation-anomalies

Both build from:

concurrency-interleavings-invariants

Resolution:
local synchronization and DB transactional atomicity are distinct
applications of concurrency/interleaving reasoning.


4.3

REQUIRED:
prog-resource-ownership
→ concurrency-cancellation-lifetime

REQUIRED:
concurrency-async-parallelism
→ concurrency-cancellation-lifetime

Resolution:
cancellation requires both logical async lifetime and explicit ownership
of who may end work/resources.


4.4

NO EDGE from Networking to:
concurrency-bounded-backpressure

Actual prerequisite:

REQUIRED:
concurrency-async-parallelism
→ concurrency-bounded-backpressure

Resolution:
portable bounded-work/backpressure does not depend on network queue
knowledge.


4.5

RECOMMENDED:
concurrency-local-vs-distributed
→ dist-partitioning-ownership-rebalancing

RECOMMENDED:
dist-partitioning-ownership-rebalancing
→ msg-consumer-groups-offsets-rebalance

Resolution:
the bridge is local-vs-distributed authority
→ portable distributed ownership
→ broker consumer-group ownership;
neither transfer step is a hard gate.


==================================================
TRACK 5 — NETWORKING & HTTP
==================================================

5.1

NO additional edge.

Resolution:
net-request-path-dns is an intentional root capability.
There is no separate service-discovery capability in the frozen map.
DNS becomes REQUIRED when reasoning about
net-failure-localization-unknown-outcome.


5.2

REQUIRED:
net-http-semantics
→ api-contract-resource-semantics

REQUIRED:
api-contract-resource-semantics
→ api-request-identity-idempotency

Resolution:
HTTP semantics flow through explicit API operation semantics before
request idempotency; no redundant direct shortcut is needed.


5.3

RECOMMENDED:
net-tls-trust-handshake
→ net-proxy-lb-forwarded-boundary

REQUIRED:
net-http-semantics
→ net-proxy-lb-forwarded-boundary

Resolution:
TLS termination knowledge helps proxy trust reasoning but is not a hard
gate.


5.4

REQUIRED:
concurrency-cancellation-lifetime
→ net-streaming-body-cancellation

RECOMMENDED:
prog-resource-ownership
→ net-streaming-body-cancellation

Resolution:
cancellation/lifetime is required;
ownership of stream/buffer lifetime is supporting context.


5.5

REQUIRED:
net-failure-localization-unknown-outcome
→ dist-rpc-unknown-completion

RECOMMENDED:
dist-rpc-unknown-completion
→ dist-reconciliation-convergence

Also:
dist-rpc-unknown-completion
is REQUIRED by API/external-effect ambiguous-outcome capabilities.

Resolution:
the bridge is network-stage evidence
→ remote completion uncertainty
→ reconciliation/recovery.
No artificial direct dependency on generic audit logging is created.


==================================================
TRACK 6 — RELATIONAL DATABASE
==================================================

6.1

RECOMMENDED:
db-physical-storage-pages
→ db-index-structures

Resolution:
physical page intuition helps, but logical index structure does not need
to be hard-gated by page internals.


6.2

REQUIRED:
db-transactions-isolation-anomalies
→ db-mvcc-visibility


6.3

REQUIRED:
db-transactions-isolation-anomalies
→ db-wal-crash-recovery


6.4

REQUIRED:
db-locks-deadlocks-contention
→ db-schema-evolution


6.5

RECOMMENDED:
os-virtual-memory-page-cache
→ db-buffer-io

Resolution:
enough OS knowledge to distinguish OS page cache from DB-owned buffering
is useful, but DB buffering remains teachable independently.


==================================================
TRACK 7 — NOSQL & SPECIALIZED DATA
==================================================

7.1

General partitioning is RECOMMENDED, not universally REQUIRED, for the
product-specific partition/shard capabilities.

Existing examples:

RECOMMENDED:
dist-partitioning-ownership-rebalancing
→ nosql-cassandra-partition-model

RECOMMENDED:
dist-partitioning-ownership-rebalancing
→ nosql-mongo-index-shard-transaction

RECOMMENDED:
dist-partitioning-ownership-rebalancing
→ nosql-redis-persistence-replication-cluster-streams

RECOMMENDED:
dist-partitioning-ownership-rebalancing
→ nosql-search-refresh-shards-pagination


7.2

NO EDGE from relational page/index capability to Cassandra LSM.

Resolution:
LSM is a distinct storage-family mechanism, not an extension of
relational B-tree/page knowledge.


7.3

Redis:

REQUIRED:
dist-replication-leader-quorum
→ nosql-redis-persistence-replication-cluster-streams

Cassandra:

REQUIRED:
dist-consistency-linearizability
→ nosql-cassandra-lsm-compaction-consistency

Resolution:
there is no blanket "learn generic replication before every NoSQL
system" rule.
Each product consumes the portable mechanism it actually needs.


7.4

REQUIRED:

nosql-mongo-aggregate-model
→ nosql-model-selection

nosql-cassandra-partition-model
→ nosql-model-selection

nosql-redis-structures-memory
→ nosql-model-selection

nosql-search-inverted-index-analysis
→ nosql-model-selection

Resolution:
counter-model introduction comes before responsible storage-family
selection.


7.5

NO generic source-of-truth prerequisite edge into:

nosql-search-inverted-index-analysis

Resolution:
the search capability itself establishes the inverted-index projection
boundary.
Do not force Cache Engineering or Architecture source-of-truth concepts
to precede the first search model.


==================================================
TRACK 8 — CACHE ENGINEERING
==================================================

8.1

REQUIRED:
cache-need-source-of-truth
→ cache-patterns

REQUIRED:
cache-need-source-of-truth
→ cache-invalidation-consistency

REQUIRED:
cache-need-source-of-truth
→ cache-capacity-eviction-fallback

Resolution:
source-of-truth reasoning is the foundational cache capability;
later cache capabilities inherit it transitively where appropriate.


8.2

RECOMMENDED:
concurrency-bounded-backpressure
→ cache-stampede-penetration-avalanche-hot-key


8.3

NO Messaging prerequisite.

Actual prerequisite:

REQUIRED:
cache-need-source-of-truth
→ cache-invalidation-consistency

Resolution:
event ordering is one implementation context for invalidation, not the
origin of cache freshness reasoning.


8.4

RECOMMENDED:
dist-consistency-linearizability
→ cache-multilayer-coherence


8.5

NO EDGE.

Resolution:
negative-caching interaction with authorization/not-found semantics is a
future lesson/case design concern, not a capability-ordering relation in
Step 3.


==================================================
TRACK 9 — DISTRIBUTED SYSTEMS
==================================================

9.1

REQUIRED:
dist-partial-failure-uncertainty
→ dist-rpc-unknown-completion


9.2

REQUIRED:
dist-consistency-linearizability
→ dist-replication-leader-quorum

Also REQUIRED:
dist-partial-failure-uncertainty
→ dist-replication-leader-quorum


9.3

RECOMMENDED:
dist-replication-leader-quorum
→ dist-consensus-coordination-purpose

REQUIRED:
dist-partial-failure-uncertainty
→ dist-consensus-coordination-purpose

Resolution:
replication is a useful coordination example, not a hard prerequisite.


9.4

NO Messaging prerequisite.

REQUIRED:
prog-invariants-domain-model
→ dist-reconciliation-convergence

REQUIRED:
dist-partial-failure-uncertainty
→ dist-reconciliation-convergence

RECOMMENDED:
dist-rpc-unknown-completion
→ dist-reconciliation-convergence

Resolution:
reconciliation remains a portable Distributed Systems capability.


9.5

RECOMMENDED:
concurrency-local-vs-distributed
→ dist-partitioning-ownership-rebalancing

Resolution:
the learner benefits from understanding the local/distributed authority
boundary, but no deep local-synchronization prerequisite is imposed.


==================================================
TRACK 10 — MESSAGING
==================================================

10.1

REQUIRED:
db-transactions-isolation-anomalies
→ msg-outbox-db-publish-gap

Also REQUIRED:
msg-model-queue-topic-partition-order
→ msg-outbox-db-publish-gap

dist-partial-failure-uncertainty
→ msg-outbox-db-publish-gap

Resolution:
yes, local DB transaction semantics is one of the required foundations
for Outbox.


10.2

REQUIRED:
msg-consumer-groups-offsets-rebalance
→ msg-replay-backfill


10.3

NO EDGE between:

api-request-identity-idempotency

and

msg-consumer-idempotency-inbox

Inbox actual prerequisites:

REQUIRED:
msg-delivery-retry-poison-dlq
→ msg-consumer-idempotency-inbox

REQUIRED:
db-transactions-isolation-anomalies
→ msg-consumer-idempotency-inbox

Resolution:
API request idempotency and Messaging inbox idempotency are sibling
applications at different boundaries.


10.4

RECOMMENDED:
dist-partial-failure-uncertainty
→ msg-delivery-retry-poison-dlq

Resolution:
partial-failure reasoning helps retry classification and retry-storm
analysis but is not a hard gate for basic delivery retry.

Producer durability separately requires:

dist-replication-leader-quorum
→ msg-producer-acks-durability


10.5

RECOMMENDED:
dist-reconciliation-convergence
→ msg-workflow-saga-compensation

NO reverse edge.

Resolution:
reconciliation is portable and may strengthen Saga recovery, but Saga
does not own or precede the reconciliation concept.


==================================================
TRACK 11 — API CONTRACTS & RESILIENCE
==================================================

11.1

Transitively REQUIRED:

dist-partial-failure-uncertainty
→ dist-rpc-unknown-completion
→ api-unknown-outcome-reconciliation

There is intentionally NO redundant direct shortcut from partial failure
to the API capability.


11.2

REQUIRED:
api-request-identity-idempotency
→ api-retry-backoff-jitter


11.3

REQUIRED:
concurrency-cancellation-lifetime
→ api-deadlines-timeout-cancellation


11.4

NO Testing prerequisite.

Actual API prerequisite:

REQUIRED:
api-contract-resource-semantics
→ api-versioning-compatibility

RECOMMENDED:
prog-api-refactoring-change-safety
→ api-versioning-compatibility

Testing later verifies compatibility; it does not define it.


11.5

NO Security identity/tenant prerequisite for generic API rate/bulkhead
policy.

REQUIRED:
concurrency-bounded-backpressure
→ api-circuit-bulkhead-rate-limit

Later Security consumes this as:

RECOMMENDED:
api-circuit-bulkhead-rate-limit
→ sec-abuse-bruteforce-resource-business-flow


==================================================
TRACK 12 — SECURITY
==================================================

12.1

REQUIRED:
api-contract-resource-semantics
→ sec-authorization-object-tenant

Also REQUIRED:
sec-auth-session-token
→ sec-authorization-object-tenant


12.2

REQUIRED:
concurrency-races-check-then-act
→ sec-race-business-logic-abuse


12.3

REQUIRED:
sec-auth-session-token
→ sec-oauth-oidc-awareness


12.4

RECOMMENDED:
net-request-path-dns
→ sec-injection-ssrf-input-output

REQUIRED:
sec-trust-boundary-threat-model
→ sec-injection-ssrf-input-output

Resolution:
network destination knowledge helps SSRF, but trust-boundary reasoning is
the hard prerequisite.


12.5

RECOMMENDED:
obs-logs-structured-correlation
→ sec-audit-detection-evidence

REQUIRED:
sec-trust-boundary-threat-model
→ sec-audit-detection-evidence

Resolution:
Security independently owns what must be audited;
Observability logging implementation is supporting context only.


==================================================
TRACK 13 — OBSERVABILITY & PERFORMANCE
==================================================

13.1

RECOMMENDED:
net-http-semantics
→ obs-tracing-distributed-evidence

RECOMMENDED:
msg-model-queue-topic-partition-order
→ obs-tracing-distributed-evidence

REQUIRED:
obs-instrumentation-context
→ obs-tracing-distributed-evidence

Resolution:
network/messaging paths are tracing contexts, not universal hard
prerequisites.


13.2

REQUIRED:
runtime-diagnostics
→ obs-profiling-runtime-evidence


13.3

RECOMMENDED:
db-execution-operators
→ obs-db-io-downstream-attribution

The hard evidence prerequisites are Observability capabilities:

obs-latency-throughput-saturation
→ obs-db-io-downstream-attribution

obs-tracing-distributed-evidence
→ obs-db-io-downstream-attribution


13.4

NO EDGE.

Resolution:
percentiles, throughput and saturation are intentionally taught inside
the same capability:
obs-latency-throughput-saturation.

Do not invent an ordering edge inside one capability.


13.5

YES — diagnostic method starts with a minimal evidence foundation.

REQUIRED:

obs-signals-correlation
→ obs-diagnostic-method

obs-latency-throughput-saturation
→ obs-diagnostic-method

Only RECOMMENDED:

obs-db-io-downstream-attribution
obs-profiling-runtime-evidence
obs-logs-structured-correlation
obs-load-test-benchmark-validity

→ obs-diagnostic-method


==================================================
TRACK 14 — RELIABILITY / SRE
==================================================

14.1

REQUIRED:
obs-latency-throughput-saturation
→ rel-user-journey-sli-slo-budget


14.2

Transitively REQUIRED:

concurrency-bounded-backpressure
→ rel-overload-load-shedding-degradation
→ rel-cascading-failure-queue-capacity

No redundant direct shortcut is needed.


14.3

NO Delivery prerequisite.

Existing direction:

REQUIRED:
rel-health-readiness-semantics
→ delivery-probes-health

Health semantics precede platform implementation.


14.4

REQUIRED:
db-backup-restore
→ rel-disaster-recovery-rpo-rto


14.5

REQUIRED:
test-failure-resilience
→ rel-failure-injection-verification

Also REQUIRED:
rel-user-journey-sli-slo-budget
→ rel-failure-injection-verification


==================================================
TRACK 15 — TESTING
==================================================

15.1

NO blanket DB/Messaging prerequisite.

REQUIRED:
test-unit-integration-contract
→ test-real-dependency-fixtures

Resolution:
the generic fixture capability depends on recognizing the real
integration boundary; concrete DB/broker mechanism becomes relevant in
the particular test scenario.


15.2

REQUIRED:
concurrency-races-check-then-act
→ test-time-concurrency-determinism


15.3

RECOMMENDED:

api-versioning-compatibility
→ test-migration-compatibility

db-schema-evolution
→ test-migration-compatibility

msg-schema-evolution-contract-ownership
→ test-migration-compatibility

REQUIRED:
test-risk-strategy-boundaries
→ test-migration-compatibility

Resolution:
no single API/DB/Event evolution domain is a universal hard prerequisite.


15.4

REQUIRED:
test-failure-resilience
→ rel-failure-injection-verification

NO reverse edge.


15.5

Risk strategy is the Testing root, but it is not made a direct hard
parent of every node.

REQUIRED from test-risk-strategy-boundaries to:

test-unit-integration-contract
test-failure-resilience
test-migration-compatibility
test-ci-flakiness-repeatability
test-review-static-analysis-change-safety

RECOMMENDED to:

test-time-concurrency-determinism
test-property-boundary-fuzz

test-real-dependency-fixtures is reached through
test-unit-integration-contract.

test-risk-transfer deliberately does NOT have a direct REQUIRED shortcut
from risk strategy because the requirement is already carried through
its required child capabilities.


==================================================
TRACK 16 — ARCHITECTURE
==================================================

16.1

NO whole-track or L3 prerequisite barrier.

Resolution:
Step 3 does not encode "all these tracks must reach L3".

Architecture synthesis uses capability-specific REQUIRED edges only.

arch-requirements-quality-attributes remains an intentional root so
architecture reasoning can begin before every technical track is
complete.


16.2

REQUIRED:
msg-model-queue-topic-partition-order
→ arch-sync-async-integration

Also REQUIRED:
net-http-semantics
→ arch-sync-async-integration

arch-requirements-quality-attributes
→ arch-sync-async-integration


16.3

REQUIRED:
dist-consistency-linearizability
→ arch-consistency-latency-availability


16.4

API / DB / Event evolution are all RECOMMENDED, not REQUIRED:

api-versioning-compatibility
→ arch-evolution-migration-strangler

db-schema-evolution
→ arch-evolution-migration-strangler

msg-schema-evolution-contract-ownership
→ arch-evolution-migration-strangler

Hard foundations are:

arch-boundaries-ownership
prog-api-refactoring-change-safety

→ arch-evolution-migration-strangler


16.5

For:
arch-failure-recovery-security-observability

REQUIRED:

arch-boundaries-ownership
dist-partial-failure-uncertainty
sec-trust-boundary-threat-model
obs-signals-correlation
rel-user-journey-sli-slo-budget

RECOMMENDED:

rel-disaster-recovery-rpo-rto

Resolution:
specific capability evidence is required; entire Reliability or Security
tracks are not globally gated.


==================================================
TRACK 17 — DELIVERY
==================================================

17.1

Container lifecycle:

REQUIRED:
os-process-thread-kernel
→ delivery-container-process-lifecycle

Graceful draining:

REQUIRED:
os-termination-graceful-shutdown
→ delivery-graceful-shutdown-draining

REQUIRED:
delivery-container-process-lifecycle
→ delivery-graceful-shutdown-draining

Resolution:
process lifecycle precedes container lifecycle;
OS termination semantics specifically precede orchestrated draining.


17.2

REQUIRED:
rel-health-readiness-semantics
→ delivery-probes-health


17.3

REQUIRED:
obs-latency-throughput-saturation
→ delivery-autoscaling-signal-boundary

Also REQUIRED:
delivery-resources-cpu-memory
→ delivery-autoscaling-signal-boundary


17.4

API / DB / Event compatibility are RECOMMENDED, not REQUIRED:

api-versioning-compatibility
→ delivery-rollout-rollback-strategies

db-schema-evolution
→ delivery-rollout-rollback-strategies

msg-schema-evolution-contract-ownership
→ delivery-rollout-rollback-strategies

Hard prerequisites are:

delivery-artifact-image-config
rel-change-rollout-rollback-risk

→ delivery-rollout-rollback-strategies


17.5

NO Testing prerequisite for provenance.

REQUIRED:
delivery-artifact-image-config
→ delivery-cicd-promotion-provenance

Resolution:
test repeatability and artifact provenance are separate concepts.
CI may execute tests, but test semantics do not define build-once /
promote-exact-artifact provenance.


==================================================

## Batch-A audit

- Dependency rows: 40
- REQUIRED: 33
- RECOMMENDED: 7
- No non-edge was stored. In particular, no edge is added from async to check-then-act races, VM to allocation/GC, TCP to HTTP semantics, generics to all adapters, or collection complexity to diagnostics.
- Cycle and frozen-ID validation applies only to Batch A; this does not claim the complete Step-3 graph exists or has been audited.

## Batch-B1 audit

- B1 rows: 60
- B1 REQUIRED: 37
- B1 RECOMMENDED: 23
- cumulative rows: 100
- cumulative REQUIRED: 70
- cumulative RECOMMENDED: 30
- unknown capability IDs: 0
- duplicate From/To pairs: 0
- REQUIRED cycle: none in current A+B1 partial graph
- REQUIRED + RECOMMENDED cycle: none in current A+B1 partial graph
- new target tracks: 6–8 only

## Batch-B2 audit

- B2 rows: 48
- B2 REQUIRED: 31
- B2 RECOMMENDED: 17
- cumulative rows: 148
- cumulative REQUIRED: 101
- cumulative RECOMMENDED: 47
- unknown capability IDs: 0
- duplicate From/To pairs: 0
- REQUIRED cycle: none in current A+B1+B2 partial graph
- REQUIRED + RECOMMENDED cycle: none in current partial graph
- B2 REQUIRED transitive redundancy through REQUIRED-only paths: 0
- new target tracks: 9–10 only

## Batch-C1 audit

- C1 rows: 39
- C1 REQUIRED: 29
- C1 RECOMMENDED: 10
- cumulative rows: 187
- cumulative REQUIRED: 130
- cumulative RECOMMENDED: 57
- unknown capability IDs: 0
- duplicate From/To pairs: 0
- REQUIRED cycle: none in current A+B1+B2+C1 partial graph
- REQUIRED + RECOMMENDED cycle: none
- C1 REQUIRED transitive redundancy through REQUIRED-only paths: 0
- new target tracks: 11–12 only

## Batch-C2 audit

- C2 rows: 40
- C2 REQUIRED: 18
- C2 RECOMMENDED: 22
- cumulative rows: 227
- cumulative REQUIRED: 148
- cumulative RECOMMENDED: 79
- unknown capability IDs: 0
- duplicate From/To pairs: 0
- REQUIRED cycle: none in current partial graph
- REQUIRED + RECOMMENDED cycle: none
- C2 REQUIRED transitive redundancy through REQUIRED-only paths: 0
- new target tracks: 13–14 only

## Batch-C3 audit

- C3 rows: 25
- C3 REQUIRED: 10
- C3 RECOMMENDED: 15
- cumulative rows: 252
- cumulative REQUIRED: 158
- cumulative RECOMMENDED: 94
- unknown capability IDs: 0
- duplicate From/To pairs: 0
- REQUIRED cycle: none in current partial graph
- REQUIRED + RECOMMENDED cycle: none
- C3 REQUIRED transitive redundancy through REQUIRED-only paths: 0
- new target track: 15 only

## Batch-D audit

- D rows: 66
- D REQUIRED: 36
- D RECOMMENDED: 30
- cumulative rows: 318
- cumulative REQUIRED: 194
- cumulative RECOMMENDED: 124
- frozen capabilities: 163
- unknown capability IDs: 0
- duplicate From/To pairs: 0
- REQUIRED cycle: none
- REQUIRED + RECOMMENDED cycle: none
- approved REQUIRED transitive semantic exceptions: exactly 3
- all other REQUIRED transitive redundancies: 0
- REQUIRED roots: 38
- fully isolated capabilities: 3
- longest REQUIRED chain: 6
- new target tracks: 16–17 only

## Final whole-graph audit

- Frozen capability IDs: 163
- Dependency rows: 318
- REQUIRED: 194
- RECOMMENDED: 124
- Unknown capability IDs: 0
- Duplicate From/To pairs: 0
- Mixed-relation duplicate pairs: 0
- REQUIRED cycles: 0
- REQUIRED + RECOMMENDED cycles: 0
- REQUIRED roots: 38
- Fully isolated capabilities: 3
- Longest REQUIRED chain: 6
- Approved REQUIRED transitive semantic exceptions: 3
- All other REQUIRED transitive redundancies: 0
- Empty reasons: 0
- Empty assumed slices: 0
- Generic semantic filler patterns: 0

Isolated capabilities:

- prog-values-identity
- prog-types-generics
- prog-collections-complexity

Canonical registry fingerprint:

SHA-256: db5ba3052c4cd1b91966df7469a1d566a93e255efdfcb47d6c70bb3543611703

Canonicalization: 318 data rows only → exact row text → LF between rows → final LF → UTF-8 → SHA-256.

## Ownership closure

- Programming owns invariants / code-level design.
- Runtime owns managed execution/runtime mechanisms.
- OS owns process/resource/I/O mechanisms.
- Concurrency owns local interleaving/cancellation/backpressure.
- Networking owns protocol/path mechanics.
- DB owns relational engine/storage/transaction mechanics.
- NoSQL owns product/storage-family mechanics.
- Cache owns cached-copy correctness.
- Distributed Systems owns portable distributed uncertainty, consistency, replication, ownership and reconciliation.
- Messaging owns broker delivery/event-driven consistency boundaries.
- API owns request/contract/resilience policy.
- Security owns adversarial trust/authorization/abuse reasoning.
- Observability owns telemetry/evidence/diagnostic mechanics.
- Reliability owns user-impact operating/recovery policy.
- Testing owns falsification/repeatability strategy.
- Architecture synthesizes; it does not become owner of mechanisms above.
- Delivery owns runtime/platform implementation; it does not redefine OS/Reliability/Observability/Security mechanisms.

## Step-3 closure

Phase 2 / Step 3 is frozen.

The capability dependency graph is the canonical ordering model for the 163 frozen Senior Backend capabilities.

It does not define lesson order or learner lock state.

Future lesson decomposition may map REQUIRED capability dependencies onto concrete required lesson prerequisites only where that mapping is explicitly justified.

RECOMMENDED relations remain non-blocking.

Any future graph change requires reopening Step 3 and updating the registry fingerprint.