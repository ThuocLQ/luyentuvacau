# Stage 2C Data Dependency Semantic Review — Working Evidence

NON-CANONICAL WORKING REVIEW. This artifact classifies the Stage 2A Data dependency workload. It does not create learner progression locks or mutate the frozen capability dependency graph.

## 1. Scope and completeness

- Target owners: Relational Database Engineering; NoSQL & Specialized Data Systems; Cache Engineering.
- 28 REQUIRED; 23 RECOMMENDED; 51 / 51 total.
- 23 target Learning Units with pending relations; 25 sealed target-owner Learning Units overall.
- Same-owner REQUIRED: 21; cross-owner REQUIRED: 7.
- Every scoped relation is accounted for exactly once; no relation outside Data is classified.

## 2. REQUIRED decision table

| From capability | From unit | To capability | To unit | Frozen assumed slice | Decision | Exact local slice or required prior evidence | Why |
|---|---|---|---|---|---|---|---|
| prog-invariants-domain-model | lu-prog-invariants-domain-model | db-modeling-invariants | lu-db-modeling-invariants | business-valid state and invariant ownership | LOCAL_PREREQUISITE_SLICE | Introduce one concrete business invariant at the database model boundary. | The target owns schema/model evidence; a whole Programming unit would over-gate. |
| concurrency-interleavings-invariants | lu-race-atomicity | db-transactions-isolation-anomalies | lu-db-transactions-mvcc-isolation | concurrent operations may interleave around shared state and violate an invariant | LOCAL_PREREQUISITE_SLICE | Show one two-operation interleaving that threatens a named invariant. | The transaction target can teach this bounded trace locally. |
| db-transactions-isolation-anomalies | lu-db-transactions-mvcc-isolation | db-locks-deadlocks-contention | lu-db-locks-deadlocks-contention | transaction scope and concurrent operations over shared database state | LOCAL_PREREQUISITE_SLICE | Recap transaction lifetime and concurrent operation scope before lock evidence. | The target can assess database locking without requiring all isolation anomalies. |
| db-transactions-isolation-anomalies | lu-db-transactions-mvcc-isolation | db-wal-crash-recovery | lu-db-wal-crash-recovery | commit/durability boundary of a transaction | LOCAL_PREREQUISITE_SLICE | State commit boundary and durable-versus-uncommitted outcome. | WAL target owns crash/recovery evidence. |
| db-modeling-invariants | lu-db-modeling-invariants | db-schema-evolution | lu-db-schema-evolution | schema structure, keys, constraints and invariants that migration must preserve | LOCAL_PREREQUISITE_SLICE | Name the key/constraint invariant a migration must preserve. | No full modelling-unit gate is needed. |
| db-locks-deadlocks-contention | lu-db-locks-deadlocks-contention | db-schema-evolution | lu-db-schema-evolution | DDL/data migration can acquire locks and block concurrent work | LOCAL_PREREQUISITE_SLICE | Introduce lock duration and blocked-traffic evidence. | Migration target owns live-traffic safety evidence. |
| dist-replication-leader-quorum | lu-dist-replication-leader-quorum | db-replication-failover | lu-db-replication-failover | portable replication roles, acknowledgement and stale-copy semantics | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior leader/replica acknowledgement and stale-copy evidence. | Database failover must translate a portable mechanism into engine-specific evidence; a local definition is insufficient. |
| dist-partitioning-ownership-rebalancing | lu-dist-partitioning-ownership-rebalancing | db-partitioning-sharding-boundary | lu-db-partitioning-sharding-boundary | state/key ranges are assigned to owners and ownership may change | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior ownership assignment and rebalance evidence. | Sharding assessment needs demonstrated ownership movement, not a glossary recap. |
| os-resource-exhaustion | lu-os-resource-exhaustion | db-connection-pool-exhaustion | lu-db-connection-pool-exhaustion | connections are finite resources and waiting grows when demand exceeds available capacity | LOCAL_PREREQUISITE_SLICE | Introduce finite connections, wait queue and acquisition latency. | Full OS exhaustion diagnosis would over-gate the pool target. |
| db-buffer-io | lu-db-buffer-io | db-production-diagnosis-transfer | lu-db-production-diagnosis-transfer | buffer hit/read behavior distinguishes memory access from physical I/O | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior hit/read and physical-I/O evidence. | L4 diagnosis must distinguish I/O from other latency causes. |
| db-optimizer-cardinality-stats | lu-execution-plan-estimates | db-production-diagnosis-transfer | lu-db-production-diagnosis-transfer | estimated vs actual cardinality and plan-choice evidence | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior estimated/actual cardinality and plan-choice evidence. | Competing query-plan causes cannot be fairly diagnosed from a local definition. |
| db-locks-deadlocks-contention | lu-db-locks-deadlocks-contention | db-production-diagnosis-transfer | lu-db-production-diagnosis-transfer | blocking/lock evidence as an alternative explanation for latency | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior blocking graph and lock-wait evidence. | L4 transfer must discriminate lock latency from query/I/O latency. |
| db-connection-pool-exhaustion | lu-db-connection-pool-exhaustion | db-production-diagnosis-transfer | lu-db-production-diagnosis-transfer | connection acquisition wait can dominate request latency independently of query execution | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior pool wait and acquisition-latency evidence. | Without it the diagnosis cannot separate pool wait from SQL execution. |
| nosql-mongo-aggregate-model | lu-nosql-mongo-aggregate-model | nosql-mongo-index-shard-transaction | lu-nosql-mongo-index-shard-transaction | document/aggregate boundary and expected access pattern | LOCAL_PREREQUISITE_SLICE | Recap aggregate boundary and access pattern in the Mongo case. | Target adds engine-specific index/shard/transaction evidence. |
| dist-consistency-linearizability | lu-dist-consistency-linearizability | nosql-cassandra-lsm-compaction-consistency | lu-nosql-cassandra-lsm-compaction-consistency | consistency model constrains acceptable replica observation/acknowledgement | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior consistency guarantee and acceptable observation evidence. | Cassandra assessment genuinely depends on consistency semantics; full distributed unit is not automatically a proxy. |
| nosql-redis-structures-memory | lu-nosql-redis-structures-memory | nosql-redis-persistence-replication-cluster-streams | lu-nosql-redis-persistence-replication-cluster-streams | Redis state lives in concrete structures with finite memory behavior | LOCAL_PREREQUISITE_SLICE | Name the structure and finite-memory boundary used by the Redis case. | Persistence/replication target owns its own mechanism evidence. |
| dist-replication-leader-quorum | lu-dist-replication-leader-quorum | nosql-redis-persistence-replication-cluster-streams | lu-nosql-redis-persistence-replication-cluster-streams | portable replication, lag and failover semantics | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior replication, lag and failover evidence. | Redis failover reasoning needs demonstrated portable replication semantics. |
| nosql-mongo-aggregate-model | lu-nosql-mongo-aggregate-model | nosql-model-selection | lu-nosql-model-selection | document/aggregate storage model and its query/update boundary | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior document access-pattern evidence. | Model selection must compare a real document model, not a local label. |
| nosql-cassandra-partition-model | lu-nosql-cassandra-lsm-compaction-consistency | nosql-model-selection | lu-nosql-model-selection | wide-column access-pattern-first partition model | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior partition-key and access-pattern evidence. | Wide-column choice needs demonstrated partition trade-offs. |
| nosql-redis-structures-memory | lu-nosql-redis-structures-memory | nosql-model-selection | lu-nosql-model-selection | in-memory key/value structure and memory boundary | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior key/value and memory-boundary evidence. | A storage-family decision needs more than a local definition. |
| nosql-search-inverted-index-analysis | lu-nosql-search-projection | nosql-model-selection | lu-nosql-model-selection | inverted-index/search projection model | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior inverted-index and source-of-truth projection evidence. | Search is a distinct model with visibility trade-offs; whole search unit is not automatically required. |
| nosql-model-selection | lu-nosql-model-selection | nosql-transfer-storage-choice | lu-nosql-storage-choice-transfer | choose storage family from workload/access/consistency requirements | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Demonstrated multi-family model-selection comparison. | L4 transfer must reuse actual selection evidence, not four local definitions. |
| cache-need-source-of-truth | lu-cache-source-of-truth-invalidation | cache-patterns | lu-cache-patterns | cache is a duplicate/derived copy and another system remains authoritative | LOCAL_PREREQUISITE_SLICE | State source-of-truth versus derived cache in the target example. | Cache patterns can teach the distinction locally. |
| cache-need-source-of-truth | lu-cache-source-of-truth-invalidation | cache-capacity-eviction-fallback | lu-cache-capacity-eviction-fallback | evicted/unavailable cache must fall back to an authoritative source | LOCAL_PREREQUISITE_SLICE | Introduce miss/eviction fallback to the authoritative store. | Capacity target owns eviction/fallback evidence. |
| cache-invalidation-consistency | lu-cache-source-of-truth-invalidation | cache-evidence-transfer | lu-cache-evidence-transfer | staleness/invalidation as one candidate cause | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior stale-read and invalidation evidence. | Transfer diagnosis must distinguish staleness from other cache failures. |
| cache-stampede-penetration-avalanche-hot-key | lu-cache-patterns | cache-evidence-transfer | lu-cache-evidence-transfer | load-distribution and miss/expiry overload modes | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior stampede/penetration/hot-key evidence. | Competing overload modes require substantive mechanism evidence. |
| cache-capacity-eviction-fallback | lu-cache-capacity-eviction-fallback | cache-evidence-transfer | lu-cache-evidence-transfer | finite cache memory, eviction and origin fallback behavior | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior eviction and fallback evidence. | The L4 target must separate capacity failure from staleness and stampede. |
| cache-multilayer-coherence | lu-cache-source-of-truth-invalidation | cache-evidence-transfer | lu-cache-evidence-transfer | layer-specific freshness/version divergence | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior multilayer freshness/version evidence. | A local summary would not prove the layer-divergence failure mode. |

## 3. External candidate evidence table

External candidate != learner lock. It is capability evidence for later global proxy review only.

| Relation | Required compatible prior evidence | Why local slice is insufficient | Whole-source-unit PASSED proxy |
|---|---|---|---|
| dist-replication-leader-quorum -> db-replication-failover | Leader/replica acknowledgement and stale-copy evidence | Engine-specific failover must translate portable semantics | ACCEPTABLE_CANDIDATE |
| dist-partitioning-ownership-rebalancing -> db-partitioning-sharding-boundary | Ownership assignment and rebalance evidence | Sharding assessment needs ownership movement | NOT_ACCEPTABLE |
| db-buffer-io -> db-production-diagnosis-transfer | Hit/read and physical-I/O evidence | L4 diagnosis must separate I/O | ACCEPTABLE_CANDIDATE |
| db-optimizer-cardinality-stats -> db-production-diagnosis-transfer | Estimated/actual cardinality and plan evidence | Plan causes cannot be reduced to vocabulary | ACCEPTABLE_CANDIDATE |
| db-locks-deadlocks-contention -> db-production-diagnosis-transfer | Blocking graph and lock-wait evidence | Must discriminate lock latency | ACCEPTABLE_CANDIDATE |
| db-connection-pool-exhaustion -> db-production-diagnosis-transfer | Pool wait/acquisition-latency evidence | Must separate pool wait from SQL | NOT_ACCEPTABLE |
| dist-consistency-linearizability -> nosql-cassandra-lsm-compaction-consistency | Consistency guarantee and observation evidence | Cassandra target needs real consistency semantics | NOT_ACCEPTABLE |
| dist-replication-leader-quorum -> nosql-redis-persistence-replication-cluster-streams | Replication, lag and failover evidence | Redis target needs portable replication evidence | ACCEPTABLE_CANDIDATE |
| nosql-mongo-aggregate-model -> nosql-model-selection | Document access-pattern evidence | Model comparison needs a real document model | ACCEPTABLE_CANDIDATE |
| nosql-cassandra-partition-model -> nosql-model-selection | Partition-key/access-pattern evidence | Wide-column trade-offs must be demonstrated | NOT_ACCEPTABLE |
| nosql-redis-structures-memory -> nosql-model-selection | Key/value and memory-boundary evidence | Storage choice needs more than a definition | NOT_ACCEPTABLE |
| nosql-search-inverted-index-analysis -> nosql-model-selection | Inverted-index/source-of-truth evidence | Search projection is a distinct model | NOT_ACCEPTABLE |
| nosql-model-selection -> nosql-transfer-storage-choice | Demonstrated multi-family comparison | L4 transfer needs actual selection evidence | ACCEPTABLE_CANDIDATE |
| cache-invalidation-consistency -> cache-evidence-transfer | Stale-read/invalidation evidence | Transfer must distinguish staleness | ACCEPTABLE_CANDIDATE |
| cache-stampede-penetration-avalanche-hot-key -> cache-evidence-transfer | Stampede/penetration/hot-key evidence | Competing overload modes need mechanism evidence | NOT_ACCEPTABLE |
| cache-capacity-eviction-fallback -> cache-evidence-transfer | Eviction and fallback evidence | Must separate capacity failure | NOT_ACCEPTABLE |
| cache-multilayer-coherence -> cache-evidence-transfer | Multilayer freshness/version evidence | Local summary would not prove divergence | NOT_ACCEPTABLE |

## 4. Local Prerequisite Slice safety table

Each row is one exact Local REQUIRED relation; no aggregate pseudo-row is used.

| Relation | Local slice | Ownership preserved because | Target evidence does not claim |
|---|---|---|---|
| prog-invariants-domain-model -> db-modeling-invariants | One business-valid state invariant | DB modelling target owns schema evidence | PASSED prog-invariants-domain-model |
| concurrency-interleavings-invariants -> db-transactions-isolation-anomalies | One interleaving around a DB invariant | Transaction target owns isolation evidence | PASSED concurrency-interleavings-invariants |
| db-transactions-isolation-anomalies -> db-locks-deadlocks-contention | Transaction lifetime and concurrent operation scope | Lock target owns DB lock evidence | PASSED db-transactions-isolation-anomalies |
| db-transactions-isolation-anomalies -> db-wal-crash-recovery | Commit/durability boundary | WAL target owns crash/recovery evidence | PASSED db-transactions-isolation-anomalies |
| db-modeling-invariants -> db-schema-evolution | Key/constraint invariant | Migration target owns schema evolution evidence | PASSED db-modeling-invariants |
| db-locks-deadlocks-contention -> db-schema-evolution | Lock duration and blocked traffic | Migration target owns DDL safety evidence | PASSED db-locks-deadlocks-contention |
| os-resource-exhaustion -> db-connection-pool-exhaustion | Finite connections, wait queue, acquisition latency | Pool target owns connection evidence | PASSED os-resource-exhaustion |
| nosql-mongo-aggregate-model -> nosql-mongo-index-shard-transaction | Aggregate boundary/access pattern | Mongo target owns index/shard/transaction evidence | PASSED nosql-mongo-aggregate-model |
| nosql-redis-structures-memory -> nosql-redis-persistence-replication-cluster-streams | Structure and finite-memory boundary | Redis target owns persistence/replication evidence | PASSED nosql-redis-structures-memory |
| cache-need-source-of-truth -> cache-patterns | Source-of-truth versus derived copy | Cache patterns target owns pattern evidence | PASSED cache-need-source-of-truth |
| cache-need-source-of-truth -> cache-capacity-eviction-fallback | Miss/eviction fallback | Capacity target owns eviction evidence | PASSED cache-need-source-of-truth |

## 5. RECOMMENDED decision table

| From capability | From unit | To capability | To unit | Same unit? | Frozen assumed slice | Decision | Surface location or omission rationale |
|---|---|---|---|---|---|---|---|
| os-virtual-memory-page-cache | lu-os-virtual-memory-page-cache | db-buffer-io | lu-db-buffer-io | NO | OS memory/page-cache is distinct from database-owned buffer state | SURFACE_RECOMMENDED_CONTEXT | Contrast OS cache and DB buffer ownership. |
| db-physical-storage-pages | lu-db-buffer-io | db-index-structures | lu-index-query-shape | NO | rows and index entries eventually map to physical pages | SURFACE_RECOMMENDED_CONTEXT | Connect physical layout to index access evidence. |
| db-index-structures | lu-index-query-shape | db-execution-operators | lu-execution-plan-estimates | NO | index scan is one possible access operator | SURFACE_RECOMMENDED_CONTEXT | Helps interpret plan operator choice. |
| db-composite-query-shape | lu-index-query-shape | db-optimizer-cardinality-stats | lu-execution-plan-estimates | NO | predicate shape and key ordering affect access paths | SURFACE_RECOMMENDED_CONTEXT | Clarifies optimizer input. |
| prog-invariants-domain-model | lu-prog-invariants-domain-model | db-transactions-isolation-anomalies | lu-db-transactions-mvcc-isolation | NO | business invariant across concurrent transactions | SURFACE_RECOMMENDED_CONTEXT | Reinforces why transaction isolation matters; non-blocking. |
| concurrency-deadlock-starvation | lu-concurrency-deadlock-starvation | db-locks-deadlocks-contention | lu-db-locks-deadlocks-contention | NO | wait-for relationship and lack of progress | SURFACE_RECOMMENDED_CONTEXT | Connects wait graph vocabulary. |
| db-wal-crash-recovery | lu-db-wal-crash-recovery | db-replication-failover | lu-db-replication-failover | NO | log position can represent durable/replicated progress | SURFACE_RECOMMENDED_CONTEXT | Gives recovery-point context without a lock. |
| db-modeling-invariants | lu-db-modeling-invariants | db-partitioning-sharding-boundary | lu-db-partitioning-sharding-boundary | NO | data relationship and invariant placement | SURFACE_RECOMMENDED_CONTEXT | Helps reason about invariant ownership when partitioning. |
| db-wal-crash-recovery | lu-db-wal-crash-recovery | db-backup-restore | lu-db-backup-restore | NO | durable log extends a base backup toward a recovery point | SURFACE_RECOMMENDED_CONTEXT | Clarifies backup/recovery relationship. |
| concurrency-bounded-backpressure | lu-concurrency-async-parallelism | db-connection-pool-exhaustion | lu-db-connection-pool-exhaustion | NO | unbounded work can overrun finite downstream capacity | SURFACE_RECOMMENDED_CONTEXT | Shows why concurrency limits protect pools. |
| dist-partitioning-ownership-rebalancing | lu-dist-partitioning-ownership-rebalancing | nosql-mongo-index-shard-transaction | lu-nosql-mongo-index-shard-transaction | NO | portable partition ownership and skew/rebalancing intuition | SURFACE_RECOMMENDED_CONTEXT | Optional ownership vocabulary for sharding. |
| db-transactions-isolation-anomalies | lu-db-transactions-mvcc-isolation | nosql-mongo-index-shard-transaction | lu-nosql-mongo-index-shard-transaction | NO | transaction scope and coordination cost | SURFACE_RECOMMENDED_CONTEXT | Highlights multi-document transaction trade-off. |
| dist-partitioning-ownership-rebalancing | lu-dist-partitioning-ownership-rebalancing | nosql-cassandra-partition-model | lu-nosql-cassandra-lsm-compaction-consistency | NO | distributed keys map work/state to owners | INTENTIONALLY_NOT_SURFACED | Keep Cassandra partition teaching self-contained; no later distributed vocabulary needed here. |
| dist-partitioning-ownership-rebalancing | lu-dist-partitioning-ownership-rebalancing | nosql-redis-persistence-replication-cluster-streams | lu-nosql-redis-persistence-replication-cluster-streams | NO | partition ownership and redistribution | INTENTIONALLY_NOT_SURFACED | Redis cluster mechanics belong to its target unit, not a prerequisite context. |
| msg-model-queue-topic-partition-order | lu-msg-model-queue-topic-partition-order | nosql-redis-persistence-replication-cluster-streams | lu-nosql-redis-persistence-replication-cluster-streams | NO | consumer/group-like stream vocabulary and ordering scope | INTENTIONALLY_NOT_SURFACED | Messaging vocabulary would distract from Redis persistence/cluster evidence. |
| dist-partitioning-ownership-rebalancing | lu-dist-partitioning-ownership-rebalancing | nosql-search-refresh-shards-pagination | lu-nosql-search-projection | NO | shards divide work/state across owners | INTENTIONALLY_NOT_SURFACED | Search unit already explains its shard/projection boundary. |
| nosql-mongo-index-shard-transaction | lu-nosql-mongo-index-shard-transaction | nosql-transfer-storage-choice | lu-nosql-storage-choice-transfer | NO | document-system failure/cost boundaries | INTENTIONALLY_NOT_SURFACED | Keep transfer framework focused on model choice, not Mongo operations. |
| nosql-cassandra-lsm-compaction-consistency | lu-nosql-cassandra-lsm-compaction-consistency | nosql-transfer-storage-choice | lu-nosql-storage-choice-transfer | NO | LSM/compaction/tombstone/consistency cost boundary | INTENTIONALLY_NOT_SURFACED | Implementation-specific depth belongs in Cassandra unit. |
| nosql-redis-persistence-replication-cluster-streams | lu-nosql-redis-persistence-replication-cluster-streams | nosql-transfer-storage-choice | lu-nosql-storage-choice-transfer | NO | Redis durability/replication/cluster boundary | INTENTIONALLY_NOT_SURFACED | Keep transfer generic rather than implementation-specific. |
| nosql-search-refresh-shards-pagination | lu-nosql-search-projection | nosql-transfer-storage-choice | lu-nosql-storage-choice-transfer | NO | search refresh/shard/pagination/source-of-truth boundary | INTENTIONALLY_NOT_SURFACED | Search operational detail is outside the transfer assessment. |
| concurrency-bounded-backpressure | lu-concurrency-async-parallelism | cache-stampede-penetration-avalanche-hot-key | lu-cache-patterns | NO | finite origin capacity and unbounded recomputation | SURFACE_RECOMMENDED_CONTEXT | Connect bounded concurrency with stampede prevention. |
| nosql-redis-structures-memory | lu-nosql-redis-structures-memory | cache-capacity-eviction-fallback | lu-cache-capacity-eviction-fallback | NO | concrete in-memory implementation has finite memory | SURFACE_RECOMMENDED_CONTEXT | Helps explain capacity/eviction trade-offs. |
| dist-consistency-linearizability | lu-dist-consistency-linearizability | cache-multilayer-coherence | lu-cache-source-of-truth-invalidation | NO | different copies may expose different visibility guarantees | SURFACE_RECOMMENDED_CONTEXT | Adds a concise visibility contrast; remains non-blocking. |

## 6. Target-unit over-gating review

| Target unit | LOCAL | EXTERNAL | RECOMMENDED surfaced | Whole-unit PASSED prerequisite? | Evidence note |
|---|---:|---:|---:|---|---|
| lu-db-production-diagnosis-transfer | 0 | 4 | 0 | NO | Four capability-level diagnosis inputs are needed; whole source units would add unrelated mechanisms. |
| lu-db-schema-evolution | 2 | 0 | 0 | NO | Invariant and lock-duration slices are local; do not require both source units PASSED. |
| lu-nosql-model-selection | 0 | 4 | 0 | NO | Compare four model capabilities through evidence; do not gate on four whole units. |
| lu-nosql-storage-choice-transfer | 0 | 1 | 0 | NO | Model-selection evidence is substantive; implementation contexts remain non-blocking. |
| lu-nosql-redis-persistence-replication-cluster-streams | 1 | 1 | 0 | NO | Structure slice is local; replication evidence is capability-level. |
| lu-nosql-mongo-index-shard-transaction | 1 | 0 | 2 | NO | Aggregate slice is local; partition/transaction context remains non-blocking. |
| lu-cache-evidence-transfer | 0 | 4 | 0 | NO | Four failure-mode capabilities are required; no whole source unit is an automatic gate. |
| lu-db-connection-pool-exhaustion | 1 | 0 | 1 | NO | OS resource slice is local; backpressure is optional context. |

## 7. Provisional external-candidate graph diagnostic

Using Data External decisions only:

- Capability candidate relations: 17.
- Unique source-unit → target-unit candidate pairs: 16 (the two cache-source capabilities in lu-cache-source-of-truth-invalidation share one target pair).
- Target units with 0 external candidates: 15 of 23.
- Target units with 1 external candidate: 5.
- Target units with 2+ external candidates: 3 (diagnosis, model-selection and cache-evidence targets; indegree 4 each).
- Maximum candidate indegree: 4.
- Candidate subgraph: ACYCLIC.
- No target is labelled LOCKED or AVAILABLE.

## 8. Cross-owner review

- Same-owner REQUIRED: 8 LOCAL, 13 EXTERNAL = 21.
- Cross-owner REQUIRED: 3 LOCAL, 4 EXTERNAL = 7.
- Total: 28.
- Cross-owner status itself does not determine prerequisite treatment.

## 9. Synthesis-target review

- lu-db-production-diagnosis-transfer: substantive buffer, cardinality, lock and pool evidence is necessary. Whole-unit PASSED proxies would over-gate when units contain unrelated Primaries; capability-level evidence keeps the L4 diagnosis reachable.
- lu-nosql-model-selection: four capability-level model comparisons are necessary. Whole Mongo/Cassandra/Redis/Search units would over-gate with engine-specific mechanisms; the target remains reachable through capability evidence.
- lu-nosql-storage-choice-transfer: demonstrated model-selection evidence is necessary for L4 transfer. Four implementation units remain context only; the target is reachable through one capability-level candidate.
- lu-cache-evidence-transfer: staleness, stampede, capacity and multilayer evidence is necessary. Whole source units would duplicate unrelated cache Primaries; capability-level evidence preserves reachability.

## 10. Final counts

- REQUIRED: 11 LOCAL_PREREQUISITE_SLICE + 17 EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE = 28.
- RECOMMENDED: 17 SURFACE_RECOMMENDED_CONTEXT + 6 INTENTIONALLY_NOT_SURFACED = 23.
- Total: 51 / 51.
- Missing: 0; extra: 0; duplicate: 0; UNKNOWN: 0.
- Learner locks: 0.
- Canonical mutation: 0.
