# Stage 2A Learning-Unit Dependency Projection Inventory — Working Evidence

NON-CANONICAL WORKING INVENTORY. This artifact mechanically projects the frozen capability dependency graph onto the sealed Learning-Unit map. It makes no semantic prerequisite or learner-lock decision.

## Derivation checks

- Frozen capabilities: 167; canonical Primary homes resolved exactly once: 167.
- Sealed Learning Units: 137.
- Dependency fingerprint: 22ff3ea4c04a4630f00f2253bd0e16d0fb1ad9736026faf95d7c86280e8b77bd.
- Every dependency endpoint resolved through the Primary-Home Registry; no unknown or duplicate home was found.

## REQUIRED relation inventory

Derived rows: **201** = **27 INTERNAL_PRIMARY_ORDER** + **174 PENDING_REQUIRED_REVIEW**.

| From capability | From unit | To capability | To unit | Same unit? | Same owner? | Frozen assumed slice | Mechanical treatment |
|---|---|---|---|---|---|---|---|
| prog-errors-results | lu-prog-errors-results | prog-api-refactoring-change-safety | lu-prog-api-refactoring-change-safety | NO | YES | observable error/result contract and failure semantics | PENDING_REQUIRED_REVIEW |
| prog-invariants-domain-model | lu-prog-invariants-domain-model | prog-api-refactoring-change-safety | lu-prog-api-refactoring-change-safety | NO | YES | valid state and behavior invariant | PENDING_REQUIRED_REVIEW |
| runtime-managed-execution | lu-runtime-managed-execution | runtime-memory-roots-lifetime | lu-runtime-allocation-gc | NO | YES | managed runtime/process boundary | PENDING_REQUIRED_REVIEW |
| runtime-memory-roots-lifetime | lu-runtime-allocation-gc | runtime-allocation-gc | lu-runtime-allocation-gc | YES | YES | reachability from GC roots | INTERNAL_PRIMARY_ORDER |
| runtime-allocation-gc | lu-runtime-allocation-gc | runtime-retention-pooling-large-objects | lu-runtime-allocation-gc | YES | YES | allocation pressure and collection behavior | INTERNAL_PRIMARY_ORDER |
| runtime-diagnostics | lu-runtime-diagnostics | runtime-memory-performance-debug | lu-runtime-diagnostics | YES | YES | hypothesis-driven evidence selection | INTERNAL_PRIMARY_ORDER |
| runtime-retention-pooling-large-objects | lu-runtime-allocation-gc | runtime-memory-performance-debug | lu-runtime-diagnostics | NO | YES | allocation vs pooling vs retention | PENDING_REQUIRED_REVIEW |
| os-process-thread-kernel | lu-os-process-thread-kernel | os-files-handles-sockets-ipc | lu-os-blocking-io-waits | NO | YES | process resource context and user/kernel boundary | PENDING_REQUIRED_REVIEW |
| os-files-handles-sockets-ipc | lu-os-blocking-io-waits | os-blocking-io-waits | lu-os-blocking-io-waits | YES | YES | finite OS resource operation and external completion | INTERNAL_PRIMARY_ORDER |
| os-process-thread-kernel | lu-os-process-thread-kernel | os-scheduling-starvation | lu-os-scheduling-starvation | NO | YES | runnable execution unit and scheduling boundary | PENDING_REQUIRED_REVIEW |
| os-process-thread-kernel | lu-os-process-thread-kernel | os-termination-graceful-shutdown | lu-os-termination-graceful-shutdown | NO | YES | process lifetime and termination | PENDING_REQUIRED_REVIEW |
| os-process-thread-kernel | lu-os-process-thread-kernel | os-virtual-memory-page-cache | lu-os-virtual-memory-page-cache | NO | YES | virtual address-space boundary | PENDING_REQUIRED_REVIEW |
| os-process-thread-kernel | lu-os-process-thread-kernel | os-resource-exhaustion | lu-os-resource-exhaustion | NO | YES | finite thread/process/memory resources | PENDING_REQUIRED_REVIEW |
| os-files-handles-sockets-ipc | lu-os-blocking-io-waits | os-resource-exhaustion | lu-os-resource-exhaustion | NO | YES | handle/socket capacity and lifetime | PENDING_REQUIRED_REVIEW |
| prog-invariants-domain-model | lu-prog-invariants-domain-model | concurrency-interleavings-invariants | lu-race-atomicity | NO | NO | state invariant under transition | PENDING_REQUIRED_REVIEW |
| concurrency-interleavings-invariants | lu-race-atomicity | concurrency-synchronization-atomicity | lu-race-atomicity | YES | YES | unsafe interleaving and critical transition | INTERNAL_PRIMARY_ORDER |
| concurrency-interleavings-invariants | lu-race-atomicity | concurrency-races-check-then-act | lu-race-atomicity | YES | YES | interleaved shared-state change | INTERNAL_PRIMARY_ORDER |
| concurrency-interleavings-invariants | lu-race-atomicity | concurrency-memory-visibility | lu-concurrency-memory-visibility | NO | YES | shared state across execution contexts | PENDING_REQUIRED_REVIEW |
| concurrency-synchronization-atomicity | lu-race-atomicity | concurrency-deadlock-starvation | lu-concurrency-deadlock-starvation | NO | YES | synchronization ownership and wait | PENDING_REQUIRED_REVIEW |
| os-blocking-io-waits | lu-os-blocking-io-waits | concurrency-async-parallelism | lu-concurrency-async-parallelism | NO | NO | external I/O wait lifetime | PENDING_REQUIRED_REVIEW |
| concurrency-async-parallelism | lu-concurrency-async-parallelism | concurrency-cancellation-lifetime | lu-concurrency-async-parallelism | YES | YES | async operation lifetime | INTERNAL_PRIMARY_ORDER |
| prog-resource-ownership | lu-prog-resource-ownership | concurrency-cancellation-lifetime | lu-concurrency-async-parallelism | NO | NO | ownership and authority to end lifetime | PENDING_REQUIRED_REVIEW |
| concurrency-async-parallelism | lu-concurrency-async-parallelism | concurrency-bounded-backpressure | lu-concurrency-async-parallelism | YES | YES | concurrent in-flight operations | INTERNAL_PRIMARY_ORDER |
| concurrency-races-check-then-act | lu-race-atomicity | concurrency-local-vs-distributed | lu-concurrency-local-vs-distributed | NO | YES | synchronization authority scope | PENDING_REQUIRED_REVIEW |
| os-files-handles-sockets-ipc | lu-os-blocking-io-waits | net-tcp-connection-semantics | lu-net-connection-reuse-pooling | NO | NO | socket state, lifetime and resource | PENDING_REQUIRED_REVIEW |
| net-tcp-connection-semantics | lu-net-connection-reuse-pooling | net-connection-reuse-pooling | lu-net-connection-reuse-pooling | YES | YES | establishment, lifetime and closure | INTERNAL_PRIMARY_ORDER |
| net-http-semantics | lu-net-http-streaming-cancellation | net-proxy-lb-forwarded-boundary | lu-net-proxy-tls-forwarded-boundary | NO | YES | request and header semantics | PENDING_REQUIRED_REVIEW |
| net-http-semantics | lu-net-http-streaming-cancellation | net-streaming-body-cancellation | lu-net-http-streaming-cancellation | YES | YES | HTTP body and transfer lifetime | INTERNAL_PRIMARY_ORDER |
| concurrency-cancellation-lifetime | lu-concurrency-async-parallelism | net-streaming-body-cancellation | lu-net-http-streaming-cancellation | NO | NO | cooperative cancellation and lifetime | PENDING_REQUIRED_REVIEW |
| net-request-path-dns | lu-net-request-path-dns | net-failure-localization-unknown-outcome | lu-net-failure-localization-unknown-outcome | NO | YES | name-resolution failure stage | PENDING_REQUIRED_REVIEW |
| net-tcp-connection-semantics | lu-net-connection-reuse-pooling | net-failure-localization-unknown-outcome | lu-net-failure-localization-unknown-outcome | NO | YES | connection establishment and reset stage | PENDING_REQUIRED_REVIEW |
| net-tls-trust-handshake | lu-net-proxy-tls-forwarded-boundary | net-failure-localization-unknown-outcome | lu-net-failure-localization-unknown-outcome | NO | YES | TLS negotiation and trust stage | PENDING_REQUIRED_REVIEW |
| net-http-semantics | lu-net-http-streaming-cancellation | net-failure-localization-unknown-outcome | lu-net-failure-localization-unknown-outcome | NO | YES | response semantics as stage evidence | PENDING_REQUIRED_REVIEW |
| prog-invariants-domain-model | lu-prog-invariants-domain-model | db-modeling-invariants | lu-db-modeling-invariants | NO | NO | business-valid state and invariant ownership. | PENDING_REQUIRED_REVIEW |
| db-physical-storage-pages | lu-db-buffer-io | db-buffer-io | lu-db-buffer-io | YES | YES | database data is accessed in page-sized physical units. | INTERNAL_PRIMARY_ORDER |
| db-index-structures | lu-index-query-shape | db-composite-query-shape | lu-index-query-shape | YES | YES | an ordered/searchable index only narrows rows according to the key path the query can use. | INTERNAL_PRIMARY_ORDER |
| db-execution-operators | lu-execution-plan-estimates | db-optimizer-cardinality-stats | lu-execution-plan-estimates | YES | YES | the optimizer chooses among physical execution operators. | INTERNAL_PRIMARY_ORDER |
| concurrency-interleavings-invariants | lu-race-atomicity | db-transactions-isolation-anomalies | lu-db-transactions-mvcc-isolation | NO | NO | concurrent operations may interleave around shared state and violate an invariant. | PENDING_REQUIRED_REVIEW |
| db-transactions-isolation-anomalies | lu-db-transactions-mvcc-isolation | db-mvcc-visibility | lu-db-transactions-mvcc-isolation | YES | YES | transaction boundary, isolation semantics and concurrent visibility requirements. | INTERNAL_PRIMARY_ORDER |
| db-transactions-isolation-anomalies | lu-db-transactions-mvcc-isolation | db-locks-deadlocks-contention | lu-db-locks-deadlocks-contention | NO | YES | transaction scope and concurrent operations over shared database state. | PENDING_REQUIRED_REVIEW |
| db-transactions-isolation-anomalies | lu-db-transactions-mvcc-isolation | db-wal-crash-recovery | lu-db-wal-crash-recovery | NO | YES | commit/durability boundary of a transaction. | PENDING_REQUIRED_REVIEW |
| db-modeling-invariants | lu-db-modeling-invariants | db-schema-evolution | lu-db-schema-evolution | NO | YES | schema structure, keys, constraints and invariants that migration must preserve. | PENDING_REQUIRED_REVIEW |
| db-locks-deadlocks-contention | lu-db-locks-deadlocks-contention | db-schema-evolution | lu-db-schema-evolution | NO | YES | DDL/data migration can acquire locks and block concurrent work. | PENDING_REQUIRED_REVIEW |
| dist-replication-leader-quorum | lu-dist-replication-leader-quorum | db-replication-failover | lu-db-replication-failover | NO | NO | portable replication roles, acknowledgement and stale-copy semantics. | PENDING_REQUIRED_REVIEW |
| dist-partitioning-ownership-rebalancing | lu-dist-partitioning-ownership-rebalancing | db-partitioning-sharding-boundary | lu-db-partitioning-sharding-boundary | NO | NO | state/key ranges are assigned to owners and ownership may change. | PENDING_REQUIRED_REVIEW |
| os-resource-exhaustion | lu-os-resource-exhaustion | db-connection-pool-exhaustion | lu-db-connection-pool-exhaustion | NO | NO | connections are finite resources and waiting grows when demand exceeds available capacity. | PENDING_REQUIRED_REVIEW |
| db-buffer-io | lu-db-buffer-io | db-production-diagnosis-transfer | lu-db-production-diagnosis-transfer | NO | YES | buffer hit/read behavior distinguishes memory access from physical I/O. | PENDING_REQUIRED_REVIEW |
| db-optimizer-cardinality-stats | lu-execution-plan-estimates | db-production-diagnosis-transfer | lu-db-production-diagnosis-transfer | NO | YES | estimated vs actual cardinality and plan-choice evidence. | PENDING_REQUIRED_REVIEW |
| db-locks-deadlocks-contention | lu-db-locks-deadlocks-contention | db-production-diagnosis-transfer | lu-db-production-diagnosis-transfer | NO | YES | blocking/lock evidence as an alternative explanation for latency. | PENDING_REQUIRED_REVIEW |
| db-connection-pool-exhaustion | lu-db-connection-pool-exhaustion | db-production-diagnosis-transfer | lu-db-production-diagnosis-transfer | NO | YES | connection acquisition wait can dominate request latency independently of query execution. | PENDING_REQUIRED_REVIEW |
| nosql-mongo-aggregate-model | lu-nosql-mongo-aggregate-model | nosql-mongo-index-shard-transaction | lu-nosql-mongo-index-shard-transaction | NO | YES | document/aggregate boundary and expected access pattern. | PENDING_REQUIRED_REVIEW |
| nosql-cassandra-partition-model | lu-nosql-cassandra-lsm-compaction-consistency | nosql-cassandra-lsm-compaction-consistency | lu-nosql-cassandra-lsm-compaction-consistency | YES | YES | partition/clustering organization determines which data is read/written together. | INTERNAL_PRIMARY_ORDER |
| dist-consistency-linearizability | lu-dist-consistency-linearizability | nosql-cassandra-lsm-compaction-consistency | lu-nosql-cassandra-lsm-compaction-consistency | NO | NO | consistency model constrains which replica observations/acknowledgements are acceptable. | PENDING_REQUIRED_REVIEW |
| nosql-redis-structures-memory | lu-nosql-redis-structures-memory | nosql-redis-persistence-replication-cluster-streams | lu-nosql-redis-persistence-replication-cluster-streams | NO | YES | Redis state lives in concrete key/value data structures with finite memory behavior. | PENDING_REQUIRED_REVIEW |
| dist-replication-leader-quorum | lu-dist-replication-leader-quorum | nosql-redis-persistence-replication-cluster-streams | lu-nosql-redis-persistence-replication-cluster-streams | NO | NO | portable replication, lag and failover semantics. | PENDING_REQUIRED_REVIEW |
| nosql-search-inverted-index-analysis | lu-nosql-search-projection | nosql-search-refresh-shards-pagination | lu-nosql-search-projection | YES | YES | documents and terms are represented in an inverted index whose visibility differs from source-of-truth storage. | INTERNAL_PRIMARY_ORDER |
| nosql-mongo-aggregate-model | lu-nosql-mongo-aggregate-model | nosql-model-selection | lu-nosql-model-selection | NO | YES | document/aggregate storage model and its query/update boundary. | PENDING_REQUIRED_REVIEW |
| nosql-cassandra-partition-model | lu-nosql-cassandra-lsm-compaction-consistency | nosql-model-selection | lu-nosql-model-selection | NO | YES | wide-column access-pattern-first partition model. | PENDING_REQUIRED_REVIEW |
| nosql-redis-structures-memory | lu-nosql-redis-structures-memory | nosql-model-selection | lu-nosql-model-selection | NO | YES | in-memory key/value structure and memory boundary. | PENDING_REQUIRED_REVIEW |
| nosql-search-inverted-index-analysis | lu-nosql-search-projection | nosql-model-selection | lu-nosql-model-selection | NO | YES | inverted-index/search projection model. | PENDING_REQUIRED_REVIEW |
| nosql-model-selection | lu-nosql-model-selection | nosql-transfer-storage-choice | lu-nosql-storage-choice-transfer | NO | YES | choose storage family from workload/access/consistency requirements. | PENDING_REQUIRED_REVIEW |
| cache-need-source-of-truth | lu-cache-source-of-truth-invalidation | cache-patterns | lu-cache-patterns | NO | YES | cache is a duplicate/derived copy and another system remains authoritative. | PENDING_REQUIRED_REVIEW |
| cache-need-source-of-truth | lu-cache-source-of-truth-invalidation | cache-invalidation-consistency | lu-cache-source-of-truth-invalidation | YES | YES | cached value may diverge from authoritative state. | INTERNAL_PRIMARY_ORDER |
| cache-patterns | lu-cache-patterns | cache-stampede-penetration-avalanche-hot-key | lu-cache-patterns | YES | YES | cache miss/population/expiry behavior and origin fallback path. | INTERNAL_PRIMARY_ORDER |
| cache-need-source-of-truth | lu-cache-source-of-truth-invalidation | cache-capacity-eviction-fallback | lu-cache-capacity-eviction-fallback | NO | YES | evicted/unavailable cache must fall back to an authoritative source. | PENDING_REQUIRED_REVIEW |
| cache-invalidation-consistency | lu-cache-source-of-truth-invalidation | cache-multilayer-coherence | lu-cache-source-of-truth-invalidation | YES | YES | one cached copy can become stale relative to source. | INTERNAL_PRIMARY_ORDER |
| cache-invalidation-consistency | lu-cache-source-of-truth-invalidation | cache-evidence-transfer | lu-cache-evidence-transfer | NO | YES | staleness/invalidation as one candidate cause. | PENDING_REQUIRED_REVIEW |
| cache-stampede-penetration-avalanche-hot-key | lu-cache-patterns | cache-evidence-transfer | lu-cache-evidence-transfer | NO | YES | load-distribution and miss/expiry overload modes. | PENDING_REQUIRED_REVIEW |
| cache-capacity-eviction-fallback | lu-cache-capacity-eviction-fallback | cache-evidence-transfer | lu-cache-evidence-transfer | NO | YES | finite cache memory, eviction and origin fallback behavior. | PENDING_REQUIRED_REVIEW |
| cache-multilayer-coherence | lu-cache-source-of-truth-invalidation | cache-evidence-transfer | lu-cache-evidence-transfer | NO | YES | layer-specific freshness/version divergence. | PENDING_REQUIRED_REVIEW |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | dist-rpc-unknown-completion | lu-dist-rpc-unknown-completion | NO | YES | a remote component may execute, fail, slow or become unreachable independently of the caller | PENDING_REQUIRED_REVIEW |
| net-failure-localization-unknown-outcome | lu-net-failure-localization-unknown-outcome | dist-rpc-unknown-completion | lu-dist-rpc-unknown-completion | NO | NO | transport-stage evidence and the fact that absence of an HTTP response does not prove absence of remote execution | PENDING_REQUIRED_REVIEW |
| dist-consistency-linearizability | lu-dist-consistency-linearizability | dist-replication-leader-quorum | lu-dist-replication-leader-quorum | NO | YES | allowed read/write histories and required visibility guarantee | PENDING_REQUIRED_REVIEW |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | dist-replication-leader-quorum | lu-dist-replication-leader-quorum | NO | YES | independent replica or network-path failure and uncertainty | PENDING_REQUIRED_REVIEW |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | dist-consensus-coordination-purpose | lu-dist-consensus-coordination-purpose | NO | YES | participants can fail or become mutually unreachable while agreement is still required | PENDING_REQUIRED_REVIEW |
| db-transactions-isolation-anomalies | lu-db-transactions-mvcc-isolation | dist-transactions-2pc-boundary | lu-dist-transactions-2pc-boundary | NO | NO | atomic commit or abort within one transactional resource | PENDING_REQUIRED_REVIEW |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | dist-transactions-2pc-boundary | lu-dist-transactions-2pc-boundary | NO | YES | independent participant/coordinator failure during a multi-step distributed decision | PENDING_REQUIRED_REVIEW |
| prog-invariants-domain-model | lu-prog-invariants-domain-model | dist-reconciliation-convergence | lu-dist-reconciliation-convergence | NO | NO | valid target state and invariant ownership | PENDING_REQUIRED_REVIEW |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | dist-reconciliation-convergence | lu-dist-reconciliation-convergence | NO | YES | partial failure can leave durable incomplete or divergent state | PENDING_REQUIRED_REVIEW |
| dist-rpc-unknown-completion | lu-dist-rpc-unknown-completion | dist-guarantee-recovery-transfer | lu-dist-guarantee-recovery-transfer | NO | YES | ambiguous remote completion states | PENDING_REQUIRED_REVIEW |
| dist-replication-leader-quorum | lu-dist-replication-leader-quorum | dist-guarantee-recovery-transfer | lu-dist-guarantee-recovery-transfer | NO | YES | replica, acknowledgement, stale-read and failover semantics | PENDING_REQUIRED_REVIEW |
| dist-consensus-coordination-purpose | lu-dist-consensus-coordination-purpose | dist-guarantee-recovery-transfer | lu-dist-guarantee-recovery-transfer | NO | YES | agreement, quorum and exclusive-coordination guarantee | PENDING_REQUIRED_REVIEW |
| dist-time-order-causality | lu-dist-time-order-causality | dist-guarantee-recovery-transfer | lu-dist-guarantee-recovery-transfer | NO | YES | wall-clock timestamps do not by themselves define causal or total order | PENDING_REQUIRED_REVIEW |
| dist-reconciliation-convergence | lu-dist-reconciliation-convergence | dist-guarantee-recovery-transfer | lu-dist-guarantee-recovery-transfer | NO | YES | compare actual state with authority and apply repeatable repair | PENDING_REQUIRED_REVIEW |
| msg-model-queue-topic-partition-order | lu-msg-model-queue-topic-partition-order | msg-producer-acks-durability | lu-msg-producer-acks-durability | NO | YES | queue, topic or partition publication boundary and ordering scope | PENDING_REQUIRED_REVIEW |
| dist-replication-leader-quorum | lu-dist-replication-leader-quorum | msg-producer-acks-durability | lu-msg-producer-acks-durability | NO | NO | replica acknowledgement, leader and failover semantics | PENDING_REQUIRED_REVIEW |
| msg-model-queue-topic-partition-order | lu-msg-model-queue-topic-partition-order | msg-consumer-groups-offsets-rebalance | lu-msg-consumer-groups-offsets-rebalance | NO | YES | partitions, destination model and ordering scope | PENDING_REQUIRED_REVIEW |
| msg-model-queue-topic-partition-order | lu-msg-model-queue-topic-partition-order | msg-delivery-retry-poison-dlq | lu-msg-delivery-retry-poison-dlq | NO | YES | broker-delivered record identity and ordering boundary | PENDING_REQUIRED_REVIEW |
| msg-delivery-retry-poison-dlq | lu-msg-delivery-retry-poison-dlq | msg-consumer-idempotency-inbox | lu-outbox-duplicate-safe-effect | NO | YES | repeated delivery of one logical message after failure or retry | PENDING_REQUIRED_REVIEW |
| db-transactions-isolation-anomalies | lu-db-transactions-mvcc-isolation | msg-consumer-idempotency-inbox | lu-outbox-duplicate-safe-effect | NO | NO | one local database transaction can atomically bind deduplication record and business state | PENDING_REQUIRED_REVIEW |
| msg-model-queue-topic-partition-order | lu-msg-model-queue-topic-partition-order | msg-outbox-db-publish-gap | lu-outbox-duplicate-safe-effect | NO | YES | broker publication boundary is distinct from local database commit | PENDING_REQUIRED_REVIEW |
| db-transactions-isolation-anomalies | lu-db-transactions-mvcc-isolation | msg-outbox-db-publish-gap | lu-outbox-duplicate-safe-effect | NO | NO | atomic local database commit boundary | PENDING_REQUIRED_REVIEW |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | msg-outbox-db-publish-gap | lu-outbox-duplicate-safe-effect | NO | NO | one component or communication step may fail independently between two effects | PENDING_REQUIRED_REVIEW |
| msg-consumer-groups-offsets-rebalance | lu-msg-consumer-groups-offsets-rebalance | msg-replay-backfill | lu-msg-replay-backfill | NO | YES | partition offsets, committed position and consumer assignment | PENDING_REQUIRED_REVIEW |
| msg-model-queue-topic-partition-order | lu-msg-model-queue-topic-partition-order | msg-schema-evolution-contract-ownership | lu-msg-schema-evolution-contract-ownership | NO | YES | message contract, producer ownership and independently deployed consumers | PENDING_REQUIRED_REVIEW |
| msg-model-queue-topic-partition-order | lu-msg-model-queue-topic-partition-order | msg-workflow-saga-compensation | lu-msg-workflow-saga-compensation | NO | YES | messages or commands represent independently processed workflow steps | PENDING_REQUIRED_REVIEW |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | msg-workflow-saga-compensation | lu-msg-workflow-saga-compensation | NO | NO | partial completion across independently failing participants | PENDING_REQUIRED_REVIEW |
| dist-rpc-unknown-completion | lu-dist-rpc-unknown-completion | msg-external-side-effect-reconciliation | lu-msg-external-side-effect-reconciliation | NO | NO | remote side effect may have completed despite a timeout or lost response | PENDING_REQUIRED_REVIEW |
| dist-reconciliation-convergence | lu-dist-reconciliation-convergence | msg-external-side-effect-reconciliation | lu-msg-external-side-effect-reconciliation | NO | NO | authoritative state comparison and idempotent reconciliation | PENDING_REQUIRED_REVIEW |
| msg-consumer-groups-offsets-rebalance | lu-msg-consumer-groups-offsets-rebalance | msg-lag-backpressure-evidence | lu-msg-lag-backpressure-evidence | NO | YES | current and committed offsets per partition and consumer assignment | PENDING_REQUIRED_REVIEW |
| concurrency-bounded-backpressure | lu-concurrency-async-parallelism | msg-lag-backpressure-evidence | lu-msg-lag-backpressure-evidence | NO | NO | finite downstream capacity and bounded concurrent work | PENDING_REQUIRED_REVIEW |
| net-http-semantics | lu-net-http-streaming-cancellation | api-contract-resource-semantics | lu-api-contract-resource-semantics | NO | NO | HTTP request/response operation semantics and externally observable protocol behavior. | PENDING_REQUIRED_REVIEW |
| prog-errors-results | lu-prog-errors-results | api-validation-errors-pagination | lu-api-validation-errors-pagination | NO | NO | expected failure versus unexpected exception and failure propagation. | PENDING_REQUIRED_REVIEW |
| api-contract-resource-semantics | lu-api-contract-resource-semantics | api-validation-errors-pagination | lu-api-validation-errors-pagination | NO | YES | request intent, response meaning and externally visible API behavior. | PENDING_REQUIRED_REVIEW |
| api-contract-resource-semantics | lu-api-contract-resource-semantics | api-versioning-compatibility | lu-api-versioning-compatibility | NO | YES | current externally observable API contract and resource semantics. | PENDING_REQUIRED_REVIEW |
| api-contract-resource-semantics | lu-api-contract-resource-semantics | api-request-identity-idempotency | lu-api-request-identity-idempotency | NO | YES | logical API operation and its intended business effect. | PENDING_REQUIRED_REVIEW |
| concurrency-cancellation-lifetime | lu-concurrency-async-parallelism | api-deadlines-timeout-cancellation | lu-api-deadline-retry-policy | NO | NO | cooperative cancellation and logical operation lifetime. | PENDING_REQUIRED_REVIEW |
| dist-rpc-unknown-completion | lu-dist-rpc-unknown-completion | api-deadlines-timeout-cancellation | lu-api-deadline-retry-policy | NO | NO | missing response and remote business completion are separate facts. | PENDING_REQUIRED_REVIEW |
| api-deadlines-timeout-cancellation | lu-api-deadline-retry-policy | api-retry-backoff-jitter | lu-api-deadline-retry-policy | YES | YES | finite end-to-end deadline and propagated cancellation budget. | INTERNAL_PRIMARY_ORDER |
| api-request-identity-idempotency | lu-api-request-identity-idempotency | api-retry-backoff-jitter | lu-api-deadline-retry-policy | NO | YES | stable logical operation identity and duplicate-effect protection. | PENDING_REQUIRED_REVIEW |
| concurrency-bounded-backpressure | lu-concurrency-async-parallelism | api-circuit-bulkhead-rate-limit | lu-api-circuit-bulkhead-rate-limit | NO | NO | finite capacity, bounded concurrent work and overload protection. | PENDING_REQUIRED_REVIEW |
| api-request-identity-idempotency | lu-api-request-identity-idempotency | api-unknown-outcome-reconciliation | lu-api-unknown-outcome-reconciliation | NO | YES | stable logical operation key and persisted operation outcome. | PENDING_REQUIRED_REVIEW |
| dist-rpc-unknown-completion | lu-dist-rpc-unknown-completion | api-unknown-outcome-reconciliation | lu-api-unknown-outcome-reconciliation | NO | NO | remote execution may succeed even when the caller observes timeout or lost response. | PENDING_REQUIRED_REVIEW |
| dist-reconciliation-convergence | lu-dist-reconciliation-convergence | api-unknown-outcome-reconciliation | lu-api-unknown-outcome-reconciliation | NO | NO | authoritative-state comparison and idempotent reconciliation. | PENDING_REQUIRED_REVIEW |
| sec-trust-boundary-threat-model | lu-sec-trust-boundary-threat-model | sec-auth-session-token | lu-sec-auth-session-oauth | NO | YES | actor, asset and trust-boundary identification. | PENDING_REQUIRED_REVIEW |
| sec-auth-session-token | lu-sec-auth-session-oauth | sec-authorization-object-tenant | lu-sec-authorization-object-tenant | NO | YES | authenticated subject and trusted identity claims. | PENDING_REQUIRED_REVIEW |
| api-contract-resource-semantics | lu-api-contract-resource-semantics | sec-authorization-object-tenant | lu-sec-authorization-object-tenant | NO | NO | requested action, target resource and operation semantics. | PENDING_REQUIRED_REVIEW |
| sec-auth-session-token | lu-sec-auth-session-oauth | sec-oauth-oidc-awareness | lu-sec-auth-session-oauth | YES | YES | authentication identity, token validation and caller session/token lifecycle. | INTERNAL_PRIMARY_ORDER |
| sec-trust-boundary-threat-model | lu-sec-trust-boundary-threat-model | sec-injection-ssrf-input-output | lu-sec-injection-ssrf-input-output | NO | YES | untrusted input crossing a trust boundary into a privileged action. | PENDING_REQUIRED_REVIEW |
| sec-trust-boundary-threat-model | lu-sec-trust-boundary-threat-model | sec-browser-boundaries-cors-csrf-xss | lu-sec-browser-boundaries-cors-csrf-xss | NO | YES | trusted versus untrusted actor/origin and protected asset/action. | PENDING_REQUIRED_REVIEW |
| net-http-semantics | lu-net-http-streaming-cancellation | sec-browser-boundaries-cors-csrf-xss | lu-sec-browser-boundaries-cors-csrf-xss | NO | NO | HTTP request/response headers and credential-bearing request behavior. | PENDING_REQUIRED_REVIEW |
| sec-trust-boundary-threat-model | lu-sec-trust-boundary-threat-model | sec-secrets-third-party-trust | lu-sec-secrets-third-party-trust | NO | YES | authority-bearing asset and external trust boundary. | PENDING_REQUIRED_REVIEW |
| sec-trust-boundary-threat-model | lu-sec-trust-boundary-threat-model | sec-abuse-bruteforce-resource-business-flow | lu-sec-abuse-bruteforce-resource-business-flow | NO | YES | actor, protected asset and abuse path across a trust boundary. | PENDING_REQUIRED_REVIEW |
| concurrency-races-check-then-act | lu-race-atomicity | sec-race-business-logic-abuse | lu-sec-race-business-logic-abuse | NO | NO | check-then-act interleaving and non-atomic state transition. | PENDING_REQUIRED_REVIEW |
| sec-trust-boundary-threat-model | lu-sec-trust-boundary-threat-model | sec-audit-detection-evidence | lu-sec-audit-detection-evidence | NO | YES | security-relevant actor, action, asset and trust boundary. | PENDING_REQUIRED_REVIEW |
| sec-authorization-object-tenant | lu-sec-authorization-object-tenant | sec-unseen-attack-transfer | lu-sec-unseen-attack-transfer | NO | YES | subject-action-resource authorization using server-trusted ownership or tenant state. | PENDING_REQUIRED_REVIEW |
| sec-injection-ssrf-input-output | lu-sec-injection-ssrf-input-output | sec-unseen-attack-transfer | lu-sec-unseen-attack-transfer | NO | YES | untrusted input must remain data rather than control over a privileged sink or destination. | PENDING_REQUIRED_REVIEW |
| sec-abuse-bruteforce-resource-business-flow | lu-sec-abuse-bruteforce-resource-business-flow | sec-unseen-attack-transfer | lu-sec-unseen-attack-transfer | NO | YES | identity/resource/business-flow aware abuse reasoning. | PENDING_REQUIRED_REVIEW |
| sec-race-business-logic-abuse | lu-sec-race-business-logic-abuse | sec-unseen-attack-transfer | lu-sec-unseen-attack-transfer | NO | YES | adversarial exploitation of a non-atomic business transition. | PENDING_REQUIRED_REVIEW |
| sec-audit-detection-evidence | lu-sec-audit-detection-evidence | sec-unseen-attack-transfer | lu-sec-unseen-attack-transfer | NO | YES | security audit timeline and evidence needed to investigate an action. | PENDING_REQUIRED_REVIEW |
| obs-signals-correlation | lu-obs-signals-correlation | obs-logs-structured-correlation | lu-obs-logs-structured-correlation | NO | YES | logs are discrete telemetry events and correlation links them to the same logical operation/resource. | PENDING_REQUIRED_REVIEW |
| obs-signals-correlation | lu-obs-signals-correlation | obs-instrumentation-context | lu-obs-instrumentation-tracing | NO | YES | metrics, logs and traces represent different evidence views connected by operation/context identity. | PENDING_REQUIRED_REVIEW |
| obs-instrumentation-context | lu-obs-instrumentation-tracing | obs-cardinality-sampling-cost | lu-obs-cardinality-sampling-cost | NO | YES | instrumented attributes/context become metric dimensions or trace/log fields retained by telemetry systems. | PENDING_REQUIRED_REVIEW |
| obs-instrumentation-context | lu-obs-instrumentation-tracing | obs-tracing-distributed-evidence | lu-obs-instrumentation-tracing | YES | YES | propagate operation/trace context across an execution or service boundary. | INTERNAL_PRIMARY_ORDER |
| runtime-diagnostics | lu-runtime-diagnostics | obs-profiling-runtime-evidence | lu-obs-profiling-runtime-evidence | NO | NO | hypothesis-driven selection of runtime diagnostic evidence. | PENDING_REQUIRED_REVIEW |
| obs-latency-throughput-saturation | lu-obs-latency-throughput-saturation | obs-db-io-downstream-attribution | lu-obs-db-io-downstream-attribution | NO | YES | latency distribution, throughput and saturation represent different observable workload symptoms. | PENDING_REQUIRED_REVIEW |
| obs-tracing-distributed-evidence | lu-obs-instrumentation-tracing | obs-db-io-downstream-attribution | lu-obs-db-io-downstream-attribution | NO | YES | span/dependency timing and causal boundaries across an operation. | PENDING_REQUIRED_REVIEW |
| obs-latency-throughput-saturation | lu-obs-latency-throughput-saturation | obs-load-test-benchmark-validity | lu-obs-load-test-benchmark-validity | NO | YES | throughput, p50/p95/p99 and saturation are workload-dependent measured properties. | PENDING_REQUIRED_REVIEW |
| obs-signals-correlation | lu-obs-signals-correlation | obs-diagnostic-method | lu-obs-diagnostic-method | NO | YES | different telemetry signals answer different questions and need shared operation/resource context. | PENDING_REQUIRED_REVIEW |
| obs-latency-throughput-saturation | lu-obs-latency-throughput-saturation | obs-diagnostic-method | lu-obs-diagnostic-method | NO | YES | interpret latency distribution, rates, errors and finite-resource saturation as symptoms rather than root causes. | PENDING_REQUIRED_REVIEW |
| obs-latency-throughput-saturation | lu-obs-latency-throughput-saturation | rel-user-journey-sli-slo-budget | lu-rel-user-journey-sli-slo-budget | NO | NO | latency distribution, success/error rate and workload measurements can represent user-observable service behavior. | PENDING_REQUIRED_REVIEW |
| api-deadlines-timeout-cancellation | lu-api-deadline-retry-policy | rel-dependency-budgets | lu-rel-dependency-budgets | NO | NO | remaining time budget and propagated deadline/cancellation boundary. | PENDING_REQUIRED_REVIEW |
| concurrency-bounded-backpressure | lu-concurrency-async-parallelism | rel-overload-load-shedding-degradation | lu-rel-overload-load-shedding-degradation | NO | NO | finite service/downstream capacity and bounded in-flight work. | PENDING_REQUIRED_REVIEW |
| obs-latency-throughput-saturation | lu-obs-latency-throughput-saturation | rel-overload-load-shedding-degradation | lu-rel-overload-load-shedding-degradation | NO | NO | observable saturation and latency/throughput behavior near finite capacity. | PENDING_REQUIRED_REVIEW |
| rel-overload-load-shedding-degradation | lu-rel-overload-load-shedding-degradation | rel-cascading-failure-queue-capacity | lu-rel-cascading-failure-queue-capacity | NO | YES | demand beyond sustainable capacity causes queue/resource growth and requires bounded admission/degradation. | PENDING_REQUIRED_REVIEW |
| db-backup-restore | lu-db-backup-restore | rel-disaster-recovery-rpo-rto | lu-rel-disaster-recovery-rpo-rto | NO | NO | backup/restore mechanism, recovered data point and measured restore duration. | PENDING_REQUIRED_REVIEW |
| test-failure-resilience | lu-test-failure-resilience | rel-failure-injection-verification | lu-rel-failure-injection-verification | NO | NO | controlled failure injection, expected invariant/outcome and repeatable post-failure verification. | PENDING_REQUIRED_REVIEW |
| rel-user-journey-sli-slo-budget | lu-rel-user-journey-sli-slo-budget | rel-failure-injection-verification | lu-rel-failure-injection-verification | NO | YES | user-impact reliability target and observable SLI for the experiment. | PENDING_REQUIRED_REVIEW |
| test-risk-strategy-boundaries | lu-test-risk-strategy-boundaries | test-unit-integration-contract | lu-test-risk-strategy-boundaries | YES | YES | identify the risky assumption and the narrowest trustworthy boundary that still contains the real mechanism. | INTERNAL_PRIMARY_ORDER |
| test-unit-integration-contract | lu-test-risk-strategy-boundaries | test-real-dependency-fixtures | lu-test-real-dependency-fixtures | NO | YES | difference between local isolated behavior and an integration boundary whose real semantics matter. | PENDING_REQUIRED_REVIEW |
| concurrency-races-check-then-act | lu-race-atomicity | test-time-concurrency-determinism | lu-test-time-concurrency-determinism | NO | NO | check-then-act race window and concrete unsafe interleaving. | PENDING_REQUIRED_REVIEW |
| prog-invariants-domain-model | lu-prog-invariants-domain-model | test-property-boundary-fuzz | lu-test-property-boundary-fuzz | NO | NO | state or behavior invariant that all valid executions/inputs must preserve. | PENDING_REQUIRED_REVIEW |
| test-risk-strategy-boundaries | lu-test-risk-strategy-boundaries | test-failure-resilience | lu-test-failure-resilience | NO | YES | identify the risky boundary, expected behavior and invariant under failure. | PENDING_REQUIRED_REVIEW |
| test-risk-strategy-boundaries | lu-test-risk-strategy-boundaries | test-migration-compatibility | lu-test-migration-compatibility | NO | YES | derive test boundary and failure risk from a change that spans multiple versions or persisted representations. | PENDING_REQUIRED_REVIEW |
| test-risk-strategy-boundaries | lu-test-risk-strategy-boundaries | test-ci-flakiness-repeatability | lu-test-ci-flakiness-repeatability | NO | YES | relevant test state, intended invariant and trustworthy verdict boundary. | PENDING_REQUIRED_REVIEW |
| test-risk-strategy-boundaries | lu-test-risk-strategy-boundaries | test-review-static-analysis-change-safety | lu-test-review-static-analysis-change-safety | NO | YES | identify changed invariant, contract or failure boundary that deserves evidence. | PENDING_REQUIRED_REVIEW |
| test-unit-integration-contract | lu-test-risk-strategy-boundaries | test-risk-transfer | lu-test-risk-transfer | NO | YES | choose unit, integration or contract boundary according to where the behavior can actually fail. | PENDING_REQUIRED_REVIEW |
| test-failure-resilience | lu-test-failure-resilience | test-risk-transfer | lu-test-risk-transfer | NO | YES | inject a controlled failure and verify durable state, outcome and recovery invariant. | PENDING_REQUIRED_REVIEW |
| prog-invariants-domain-model | lu-prog-invariants-domain-model | arch-boundaries-ownership | lu-arch-boundaries-data-ownership | NO | NO | business-valid state, invariant and the authority responsible for preserving it. | PENDING_REQUIRED_REVIEW |
| arch-boundaries-ownership | lu-arch-boundaries-data-ownership | arch-data-ownership-source-of-truth | lu-arch-boundaries-data-ownership | YES | YES | one boundary owns state/rules and crossing that boundary requires an explicit contract. | INTERNAL_PRIMARY_ORDER |
| arch-requirements-quality-attributes | lu-arch-requirements-quality-attributes | arch-sync-async-integration | lu-arch-sync-async-integration | NO | YES | required response/completion behavior and relevant quality constraints. | PENDING_REQUIRED_REVIEW |
| net-http-semantics | lu-net-http-streaming-cancellation | arch-sync-async-integration | lu-arch-sync-async-integration | NO | NO | request/response operation and caller-visible completion semantics. | PENDING_REQUIRED_REVIEW |
| msg-model-queue-topic-partition-order | lu-msg-model-queue-topic-partition-order | arch-sync-async-integration | lu-arch-sync-async-integration | NO | NO | message destination, delivery boundary and independently processed work. | PENDING_REQUIRED_REVIEW |
| arch-requirements-quality-attributes | lu-arch-requirements-quality-attributes | arch-consistency-latency-availability | lu-arch-consistency-latency-availability | NO | YES | required correctness and quality-attribute scenario. | PENDING_REQUIRED_REVIEW |
| prog-invariants-domain-model | lu-prog-invariants-domain-model | arch-consistency-latency-availability | lu-arch-consistency-latency-availability | NO | NO | business invariant and valid state transition. | PENDING_REQUIRED_REVIEW |
| dist-consistency-linearizability | lu-dist-consistency-linearizability | arch-consistency-latency-availability | lu-arch-consistency-latency-availability | NO | NO | allowed read/write histories and the coordination implications of stronger visibility guarantees. | PENDING_REQUIRED_REVIEW |
| arch-requirements-quality-attributes | lu-arch-requirements-quality-attributes | arch-scale-capacity-partitioning | lu-arch-scale-capacity-partitioning | NO | YES | traffic/data estimates, quality constraints and explicit scale assumptions. | PENDING_REQUIRED_REVIEW |
| obs-latency-throughput-saturation | lu-obs-latency-throughput-saturation | arch-scale-capacity-partitioning | lu-arch-scale-capacity-partitioning | NO | NO | throughput, concurrency, latency and saturation reveal a capacity boundary. | PENDING_REQUIRED_REVIEW |
| arch-boundaries-ownership | lu-arch-boundaries-data-ownership | arch-failure-recovery-security-observability | lu-arch-failure-recovery-security-observability | NO | YES | component/state owner and explicit cross-boundary contracts. | PENDING_REQUIRED_REVIEW |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | arch-failure-recovery-security-observability | lu-arch-failure-recovery-security-observability | NO | NO | independent component/path failure and uncertainty. | PENDING_REQUIRED_REVIEW |
| sec-trust-boundary-threat-model | lu-sec-trust-boundary-threat-model | arch-failure-recovery-security-observability | lu-arch-failure-recovery-security-observability | NO | NO | trust boundary, protected asset and untrusted actor/input path. | PENDING_REQUIRED_REVIEW |
| obs-signals-correlation | lu-obs-signals-correlation | arch-failure-recovery-security-observability | lu-arch-failure-recovery-security-observability | NO | NO | telemetry signals can be correlated around a logical operation or resource. | PENDING_REQUIRED_REVIEW |
| rel-user-journey-sli-slo-budget | lu-rel-user-journey-sli-slo-budget | arch-failure-recovery-security-observability | lu-arch-failure-recovery-security-observability | NO | NO | meaningful user journey and measurable reliability target. | PENDING_REQUIRED_REVIEW |
| arch-boundaries-ownership | lu-arch-boundaries-data-ownership | arch-evolution-migration-strangler | lu-arch-evolution-migration-strangler | NO | YES | state/rule owner and explicit contract across the migration seam. | PENDING_REQUIRED_REVIEW |
| prog-api-refactoring-change-safety | lu-prog-api-refactoring-change-safety | arch-evolution-migration-strangler | lu-arch-evolution-migration-strangler | NO | NO | change-safe refactoring preserves required behavior and makes compatibility impact explicit. | PENDING_REQUIRED_REVIEW |
| arch-requirements-quality-attributes | lu-arch-requirements-quality-attributes | arch-cost-complexity-changeability | lu-arch-cost-complexity-changeability | NO | YES | explicit quality attribute or constraint that a mechanism is intended to buy. | PENDING_REQUIRED_REVIEW |
| arch-requirements-quality-attributes | lu-arch-requirements-quality-attributes | arch-decision-communication-transfer | lu-arch-cost-complexity-changeability | NO | YES | requirements, constraints and assumptions that define decision context. | PENDING_REQUIRED_REVIEW |
| os-process-thread-kernel | lu-os-process-thread-kernel | delivery-container-process-lifecycle | lu-delivery-container-process-lifecycle | NO | NO | process lifetime, process identity and user/kernel execution boundary. | PENDING_REQUIRED_REVIEW |
| delivery-container-process-lifecycle | lu-delivery-container-process-lifecycle | delivery-resources-cpu-memory | lu-delivery-resources-cpu-memory | NO | YES | container lifetime follows its workload process and runs under platform resource boundaries. | PENDING_REQUIRED_REVIEW |
| os-resource-exhaustion | lu-os-resource-exhaustion | delivery-resources-cpu-memory | lu-delivery-resources-cpu-memory | NO | NO | finite process memory/CPU resources and resource-exhaustion behavior. | PENDING_REQUIRED_REVIEW |
| rel-health-readiness-semantics | lu-rel-health-probes | delivery-probes-health | lu-rel-health-probes | YES | NO | difference between cannot make useful progress and should not receive traffic. | INTERNAL_PRIMARY_ORDER |
| os-termination-graceful-shutdown | lu-os-termination-graceful-shutdown | delivery-graceful-shutdown-draining | lu-delivery-graceful-shutdown-draining | NO | NO | termination signal, finite shutdown lifetime and resource release before process exit. | PENDING_REQUIRED_REVIEW |
| delivery-container-process-lifecycle | lu-delivery-container-process-lifecycle | delivery-graceful-shutdown-draining | lu-delivery-graceful-shutdown-draining | NO | YES | container/process start, running and termination lifecycle. | PENDING_REQUIRED_REVIEW |
| delivery-artifact-image-config | lu-delivery-artifact-provenance | delivery-cicd-promotion-provenance | lu-delivery-artifact-provenance | YES | YES | versioned artifact/image, digest and separation of build from runtime configuration. | INTERNAL_PRIMARY_ORDER |
| delivery-artifact-image-config | lu-delivery-artifact-provenance | delivery-rollout-rollback-strategies | lu-release-rollout-rollback | NO | YES | immutable deployable artifact identity and reproducible prior version. | PENDING_REQUIRED_REVIEW |
| rel-change-rollout-rollback-risk | lu-release-rollout-rollback | delivery-rollout-rollback-strategies | lu-release-rollout-rollback | YES | NO | progressive exposure, observation criteria and technical rollback boundary. | INTERNAL_PRIMARY_ORDER |
| obs-latency-throughput-saturation | lu-obs-latency-throughput-saturation | delivery-autoscaling-signal-boundary | lu-delivery-autoscaling-signal-boundary | NO | NO | throughput, queue/concurrency, latency and saturation identify a real capacity boundary. | PENDING_REQUIRED_REVIEW |
| delivery-resources-cpu-memory | lu-delivery-resources-cpu-memory | delivery-autoscaling-signal-boundary | lu-delivery-autoscaling-signal-boundary | NO | YES | platform CPU/memory requests, limits and constrained workload behavior. | PENDING_REQUIRED_REVIEW |
| delivery-container-process-lifecycle | lu-delivery-container-process-lifecycle | delivery-platform-evidence-debug | lu-delivery-platform-evidence-debug | NO | YES | container/process lifecycle, exit state and platform-controlled restart boundary. | PENDING_REQUIRED_REVIEW |
| delivery-resources-cpu-memory | lu-delivery-resources-cpu-memory | delivery-platform-evidence-debug | lu-delivery-platform-evidence-debug | NO | YES | requests/limits, CPU throttling, working memory and platform resource-termination behavior. | PENDING_REQUIRED_REVIEW |
| delivery-probes-health | lu-rel-health-probes | delivery-platform-evidence-debug | lu-delivery-platform-evidence-debug | NO | YES | probe configuration, readiness state, restart/routing action and probe failure reason. | PENDING_REQUIRED_REVIEW |
| delivery-artifact-image-config | lu-delivery-artifact-provenance | delivery-platform-transfer | lu-delivery-platform-transfer | NO | YES | portable artifact identity and separation of build from runtime config. | PENDING_REQUIRED_REVIEW |
| delivery-platform-evidence-debug | lu-delivery-platform-evidence-debug | delivery-platform-transfer | lu-delivery-platform-transfer | NO | YES | diagnose lifecycle, resource, probe/config and routing behavior from platform evidence. | PENDING_REQUIRED_REVIEW |
| delivery-graceful-shutdown-draining | lu-delivery-graceful-shutdown-draining | delivery-platform-transfer | lu-delivery-platform-transfer | NO | YES | stop routing, signal termination, drain/cancel work and exit within a bounded lifetime. | PENDING_REQUIRED_REVIEW |
| net-request-path-dns | lu-net-request-path-dns | net-service-discovery-load-balancing | lu-net-service-discovery-load-balancing | NO | YES | logical name resolution versus endpoint discovery | PENDING_REQUIRED_REVIEW |
| net-tcp-connection-semantics | lu-net-connection-reuse-pooling | net-service-discovery-load-balancing | lu-net-service-discovery-load-balancing | NO | YES | connection target and lifetime | PENDING_REQUIRED_REVIEW |
| sec-trust-boundary-threat-model | lu-sec-trust-boundary-threat-model | sec-cryptography-credentials-tokens | lu-sec-cryptography-credentials-tokens | NO | YES | credential/token asset and boundary | PENDING_REQUIRED_REVIEW |
| sec-cryptography-credentials-tokens | lu-sec-cryptography-credentials-tokens | sec-data-encryption-key-lifecycle | lu-sec-data-encryption-key-lifecycle | NO | YES | hash/encryption/MAC/signature distinction | PENDING_REQUIRED_REVIEW |
| sec-secrets-third-party-trust | lu-sec-secrets-third-party-trust | sec-data-encryption-key-lifecycle | lu-sec-data-encryption-key-lifecycle | NO | YES | secret scope/rotation/audit | PENDING_REQUIRED_REVIEW |
| concurrency-cancellation-lifetime | lu-concurrency-async-parallelism | msg-background-jobs-scheduling | lu-msg-background-jobs-scheduling | NO | NO | operation cancellation/lifetime | PENDING_REQUIRED_REVIEW |
| concurrency-bounded-backpressure | lu-concurrency-async-parallelism | msg-background-jobs-scheduling | lu-msg-background-jobs-scheduling | NO | NO | bounded in-flight work | PENDING_REQUIRED_REVIEW |

## RECOMMENDED relation inventory

Derived rows: **131**; every row is **PENDING_RECOMMENDED_REVIEW**. Same-unit: **2**; cross-unit: **129**.

| From capability | From unit | To capability | To unit | Same unit? | Same owner? | Frozen assumed slice | Mechanical treatment |
|---|---|---|---|---|---|---|---|
| prog-composition-dependencies | lu-prog-composition-dependencies | prog-api-refactoring-change-safety | lu-prog-api-refactoring-change-safety | NO | YES | dependency boundary and composition seam | PENDING_RECOMMENDED_REVIEW |
| os-virtual-memory-page-cache | lu-os-virtual-memory-page-cache | runtime-memory-roots-lifetime | lu-runtime-allocation-gc | NO | NO | process virtual-memory boundary | PENDING_RECOMMENDED_REVIEW |
| runtime-diagnostics | lu-runtime-diagnostics | runtime-retention-pooling-large-objects | lu-runtime-allocation-gc | NO | YES | allocation and heap evidence selection | PENDING_RECOMMENDED_REVIEW |
| os-scheduling-starvation | lu-os-scheduling-starvation | concurrency-async-parallelism | lu-concurrency-async-parallelism | NO | NO | runnable-capacity and scheduler delay | PENDING_RECOMMENDED_REVIEW |
| net-tcp-connection-semantics | lu-net-connection-reuse-pooling | net-tls-trust-handshake | lu-net-proxy-tls-forwarded-boundary | NO | YES | established transport connection | PENDING_RECOMMENDED_REVIEW |
| net-tls-trust-handshake | lu-net-proxy-tls-forwarded-boundary | net-proxy-lb-forwarded-boundary | lu-net-proxy-tls-forwarded-boundary | YES | YES | TLS termination boundary | PENDING_RECOMMENDED_REVIEW |
| prog-resource-ownership | lu-prog-resource-ownership | net-streaming-body-cancellation | lu-net-http-streaming-cancellation | NO | NO | stream and buffer lifetime ownership | PENDING_RECOMMENDED_REVIEW |
| os-virtual-memory-page-cache | lu-os-virtual-memory-page-cache | db-buffer-io | lu-db-buffer-io | NO | NO | OS memory/page-cache is distinct from database-owned buffer state. | PENDING_RECOMMENDED_REVIEW |
| db-physical-storage-pages | lu-db-buffer-io | db-index-structures | lu-index-query-shape | NO | YES | rows and index entries eventually map to physical pages. | PENDING_RECOMMENDED_REVIEW |
| db-index-structures | lu-index-query-shape | db-execution-operators | lu-execution-plan-estimates | NO | YES | index scan is one possible access operator among other execution paths. | PENDING_RECOMMENDED_REVIEW |
| db-composite-query-shape | lu-index-query-shape | db-optimizer-cardinality-stats | lu-execution-plan-estimates | NO | YES | predicate shape and key ordering affect candidate access paths. | PENDING_RECOMMENDED_REVIEW |
| prog-invariants-domain-model | lu-prog-invariants-domain-model | db-transactions-isolation-anomalies | lu-db-transactions-mvcc-isolation | NO | NO | business invariant whose correctness matters across concurrent transactions. | PENDING_RECOMMENDED_REVIEW |
| concurrency-deadlock-starvation | lu-concurrency-deadlock-starvation | db-locks-deadlocks-contention | lu-db-locks-deadlocks-contention | NO | NO | wait-for relationship and lack of forward progress. | PENDING_RECOMMENDED_REVIEW |
| db-wal-crash-recovery | lu-db-wal-crash-recovery | db-replication-failover | lu-db-replication-failover | NO | YES | database log position can represent durable/replicated progress. | PENDING_RECOMMENDED_REVIEW |
| db-modeling-invariants | lu-db-modeling-invariants | db-partitioning-sharding-boundary | lu-db-partitioning-sharding-boundary | NO | YES | data relationship and invariant placement. | PENDING_RECOMMENDED_REVIEW |
| db-wal-crash-recovery | lu-db-wal-crash-recovery | db-backup-restore | lu-db-backup-restore | NO | YES | durable log can extend a base backup toward a later recovery point. | PENDING_RECOMMENDED_REVIEW |
| concurrency-bounded-backpressure | lu-concurrency-async-parallelism | db-connection-pool-exhaustion | lu-db-connection-pool-exhaustion | NO | NO | unbounded concurrent work can overrun finite downstream capacity. | PENDING_RECOMMENDED_REVIEW |
| dist-partitioning-ownership-rebalancing | lu-dist-partitioning-ownership-rebalancing | nosql-mongo-index-shard-transaction | lu-nosql-mongo-index-shard-transaction | NO | NO | portable partition ownership and skew/rebalancing intuition. | PENDING_RECOMMENDED_REVIEW |
| db-transactions-isolation-anomalies | lu-db-transactions-mvcc-isolation | nosql-mongo-index-shard-transaction | lu-nosql-mongo-index-shard-transaction | NO | NO | transaction scope and cost of coordinating multiple state changes. | PENDING_RECOMMENDED_REVIEW |
| dist-partitioning-ownership-rebalancing | lu-dist-partitioning-ownership-rebalancing | nosql-cassandra-partition-model | lu-nosql-cassandra-lsm-compaction-consistency | NO | NO | distributed keys map work/state to owners and bad distribution creates hot ownership. | PENDING_RECOMMENDED_REVIEW |
| dist-partitioning-ownership-rebalancing | lu-dist-partitioning-ownership-rebalancing | nosql-redis-persistence-replication-cluster-streams | lu-nosql-redis-persistence-replication-cluster-streams | NO | NO | partition ownership and redistribution. | PENDING_RECOMMENDED_REVIEW |
| msg-model-queue-topic-partition-order | lu-msg-model-queue-topic-partition-order | nosql-redis-persistence-replication-cluster-streams | lu-nosql-redis-persistence-replication-cluster-streams | NO | NO | consumer/group-like stream processing vocabulary and ordering scope. | PENDING_RECOMMENDED_REVIEW |
| dist-partitioning-ownership-rebalancing | lu-dist-partitioning-ownership-rebalancing | nosql-search-refresh-shards-pagination | lu-nosql-search-projection | NO | NO | shards divide work/state across owners. | PENDING_RECOMMENDED_REVIEW |
| nosql-mongo-index-shard-transaction | lu-nosql-mongo-index-shard-transaction | nosql-transfer-storage-choice | lu-nosql-storage-choice-transfer | NO | YES | document-system failure and cost boundaries beyond basic modelling. | PENDING_RECOMMENDED_REVIEW |
| nosql-cassandra-lsm-compaction-consistency | lu-nosql-cassandra-lsm-compaction-consistency | nosql-transfer-storage-choice | lu-nosql-storage-choice-transfer | NO | YES | LSM/compaction/tombstone/consistency cost boundary. | PENDING_RECOMMENDED_REVIEW |
| nosql-redis-persistence-replication-cluster-streams | lu-nosql-redis-persistence-replication-cluster-streams | nosql-transfer-storage-choice | lu-nosql-storage-choice-transfer | NO | YES | Redis durability/replication/cluster boundary. | PENDING_RECOMMENDED_REVIEW |
| nosql-search-refresh-shards-pagination | lu-nosql-search-projection | nosql-transfer-storage-choice | lu-nosql-storage-choice-transfer | NO | YES | search refresh/shard/pagination/source-of-truth boundary. | PENDING_RECOMMENDED_REVIEW |
| concurrency-bounded-backpressure | lu-concurrency-async-parallelism | cache-stampede-penetration-avalanche-hot-key | lu-cache-patterns | NO | NO | finite origin capacity and unbounded concurrent recomputation. | PENDING_RECOMMENDED_REVIEW |
| nosql-redis-structures-memory | lu-nosql-redis-structures-memory | cache-capacity-eviction-fallback | lu-cache-capacity-eviction-fallback | NO | NO | one concrete in-memory implementation has finite memory and different data structures. | PENDING_RECOMMENDED_REVIEW |
| dist-consistency-linearizability | lu-dist-consistency-linearizability | cache-multilayer-coherence | lu-cache-source-of-truth-invalidation | NO | NO | different copies may expose different visibility guarantees. | PENDING_RECOMMENDED_REVIEW |
| concurrency-local-vs-distributed | lu-concurrency-local-vs-distributed | dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | NO | NO | process-local coordination does not create shared authority or shared failure state across replicas | PENDING_RECOMMENDED_REVIEW |
| net-failure-localization-unknown-outcome | lu-net-failure-localization-unknown-outcome | dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | NO | NO | DNS, TCP, TLS or HTTP failure on one path does not reveal global system state | PENDING_RECOMMENDED_REVIEW |
| dist-replication-leader-quorum | lu-dist-replication-leader-quorum | dist-consensus-coordination-purpose | lu-dist-consensus-coordination-purpose | NO | YES | leader, quorum and replicated-decision roles | PENDING_RECOMMENDED_REVIEW |
| concurrency-local-vs-distributed | lu-concurrency-local-vs-distributed | dist-partitioning-ownership-rebalancing | lu-dist-partitioning-ownership-rebalancing | NO | NO | process-local authority does not define distributed key or work ownership | PENDING_RECOMMENDED_REVIEW |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | dist-partitioning-ownership-rebalancing | lu-dist-partitioning-ownership-rebalancing | NO | YES | a current partition owner may disappear or become unreachable | PENDING_RECOMMENDED_REVIEW |
| dist-rpc-unknown-completion | lu-dist-rpc-unknown-completion | dist-reconciliation-convergence | lu-dist-reconciliation-convergence | NO | YES | a remote operation may have executed even though the caller did not receive its outcome | PENDING_RECOMMENDED_REVIEW |
| dist-partitioning-ownership-rebalancing | lu-dist-partitioning-ownership-rebalancing | dist-guarantee-recovery-transfer | lu-dist-guarantee-recovery-transfer | NO | YES | partition ownership, rebalance and hot-owner behavior | PENDING_RECOMMENDED_REVIEW |
| dist-transactions-2pc-boundary | lu-dist-transactions-2pc-boundary | dist-guarantee-recovery-transfer | lu-dist-guarantee-recovery-transfer | NO | YES | prepare, commit and blocking-recovery boundary across participants | PENDING_RECOMMENDED_REVIEW |
| dist-partitioning-ownership-rebalancing | lu-dist-partitioning-ownership-rebalancing | msg-consumer-groups-offsets-rebalance | lu-msg-consumer-groups-offsets-rebalance | NO | NO | owner assignment, reassignment and in-flight work during rebalance | PENDING_RECOMMENDED_REVIEW |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | msg-delivery-retry-poison-dlq | lu-msg-delivery-retry-poison-dlq | NO | NO | downstream may be slow or unavailable while other messaging components remain active | PENDING_RECOMMENDED_REVIEW |
| msg-producer-acks-durability | lu-msg-producer-acks-durability | msg-outbox-db-publish-gap | lu-outbox-duplicate-safe-effect | NO | YES | broker acceptance acknowledgement may itself be ambiguous after timeout | PENDING_RECOMMENDED_REVIEW |
| msg-consumer-idempotency-inbox | lu-outbox-duplicate-safe-effect | msg-replay-backfill | lu-msg-replay-backfill | NO | YES | repeated delivery and local deduplication behavior | PENDING_RECOMMENDED_REVIEW |
| msg-schema-evolution-contract-ownership | lu-msg-schema-evolution-contract-ownership | msg-replay-backfill | lu-msg-replay-backfill | NO | YES | old and new event contracts may coexist in retained history | PENDING_RECOMMENDED_REVIEW |
| prog-api-refactoring-change-safety | lu-prog-api-refactoring-change-safety | msg-schema-evolution-contract-ownership | lu-msg-schema-evolution-contract-ownership | NO | NO | preserve externally consumed behavior while old and new consumers may coexist | PENDING_RECOMMENDED_REVIEW |
| dist-reconciliation-convergence | lu-dist-reconciliation-convergence | msg-workflow-saga-compensation | lu-msg-workflow-saga-compensation | NO | NO | repair incomplete distributed state toward a valid outcome | PENDING_RECOMMENDED_REVIEW |
| msg-consumer-idempotency-inbox | lu-outbox-duplicate-safe-effect | msg-external-side-effect-reconciliation | lu-msg-external-side-effect-reconciliation | NO | YES | stable local operation identity and duplicate-delivery protection | PENDING_RECOMMENDED_REVIEW |
| msg-delivery-retry-poison-dlq | lu-msg-delivery-retry-poison-dlq | msg-lag-backpressure-evidence | lu-msg-lag-backpressure-evidence | NO | YES | repeated retry or poison handling consumes processing capacity and may block progress | PENDING_RECOMMENDED_REVIEW |
| prog-api-refactoring-change-safety | lu-prog-api-refactoring-change-safety | api-versioning-compatibility | lu-api-versioning-compatibility | NO | NO | preserve or deliberately migrate externally consumed behavior during change. | PENDING_RECOMMENDED_REVIEW |
| dist-rpc-unknown-completion | lu-dist-rpc-unknown-completion | api-request-identity-idempotency | lu-api-request-identity-idempotency | NO | NO | a remote operation may have completed even though its response was not received. | PENDING_RECOMMENDED_REVIEW |
| net-failure-localization-unknown-outcome | lu-net-failure-localization-unknown-outcome | api-deadlines-timeout-cancellation | lu-api-deadline-retry-policy | NO | NO | different network stages may consume time or fail before an API result is observed. | PENDING_RECOMMENDED_REVIEW |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | api-circuit-bulkhead-rate-limit | lu-api-circuit-bulkhead-rate-limit | NO | NO | one dependency or path may be unhealthy while unrelated components remain usable. | PENDING_RECOMMENDED_REVIEW |
| api-deadlines-timeout-cancellation | lu-api-deadline-retry-policy | api-unknown-outcome-reconciliation | lu-api-unknown-outcome-reconciliation | NO | YES | caller lifetime may end while remote processing remains unresolved. | PENDING_RECOMMENDED_REVIEW |
| net-request-path-dns | lu-net-request-path-dns | sec-injection-ssrf-input-output | lu-sec-injection-ssrf-input-output | NO | NO | hostname resolution selects a network destination before connection. | PENDING_RECOMMENDED_REVIEW |
| api-circuit-bulkhead-rate-limit | lu-api-circuit-bulkhead-rate-limit | sec-abuse-bruteforce-resource-business-flow | lu-sec-abuse-bruteforce-resource-business-flow | NO | NO | admission/rate control over finite service capacity. | PENDING_RECOMMENDED_REVIEW |
| obs-logs-structured-correlation | lu-obs-logs-structured-correlation | sec-audit-detection-evidence | lu-sec-audit-detection-evidence | NO | NO | stable structured fields and correlation across events. | PENDING_RECOMMENDED_REVIEW |
| sec-secrets-third-party-trust | lu-sec-secrets-third-party-trust | sec-unseen-attack-transfer | lu-sec-unseen-attack-transfer | NO | YES | authority-bearing secrets and externally supplied trusted-looking actions. | PENDING_RECOMMENDED_REVIEW |
| sec-browser-boundaries-cors-csrf-xss | lu-sec-browser-boundaries-cors-csrf-xss | sec-unseen-attack-transfer | lu-sec-unseen-attack-transfer | NO | YES | browser origin, ambient credential and script execution trust boundaries. | PENDING_RECOMMENDED_REVIEW |
| net-http-semantics | lu-net-http-streaming-cancellation | obs-tracing-distributed-evidence | lu-obs-instrumentation-tracing | NO | NO | one HTTP operation creates a request/response dependency boundary. | PENDING_RECOMMENDED_REVIEW |
| msg-model-queue-topic-partition-order | lu-msg-model-queue-topic-partition-order | obs-tracing-distributed-evidence | lu-obs-instrumentation-tracing | NO | NO | producer and consumer work are separate operations connected through a message rather than one synchronous call stack. | PENDING_RECOMMENDED_REVIEW |
| db-execution-operators | lu-execution-plan-estimates | obs-db-io-downstream-attribution | lu-obs-db-io-downstream-attribution | NO | NO | database execution consists of measurable scan/join/sort/aggregate operators rather than one opaque SQL duration. | PENDING_RECOMMENDED_REVIEW |
| db-connection-pool-exhaustion | lu-db-connection-pool-exhaustion | obs-db-io-downstream-attribution | lu-obs-db-io-downstream-attribution | NO | NO | time may be spent waiting for a DB connection before SQL execution begins. | PENDING_RECOMMENDED_REVIEW |
| runtime-jit-warmup | lu-runtime-jit-warmup | obs-load-test-benchmark-validity | lu-obs-load-test-benchmark-validity | NO | NO | cold execution may include compilation/optimization costs absent from steady state. | PENDING_RECOMMENDED_REVIEW |
| concurrency-bounded-backpressure | lu-concurrency-async-parallelism | obs-load-test-benchmark-validity | lu-obs-load-test-benchmark-validity | NO | NO | arrival rate can exceed finite service capacity and increase in-flight or queued work. | PENDING_RECOMMENDED_REVIEW |
| obs-db-io-downstream-attribution | lu-obs-db-io-downstream-attribution | obs-diagnostic-method | lu-obs-diagnostic-method | NO | YES | end-to-end time may be decomposed among application, DB, queue, network and downstream waits. | PENDING_RECOMMENDED_REVIEW |
| obs-profiling-runtime-evidence | lu-obs-profiling-runtime-evidence | obs-diagnostic-method | lu-obs-diagnostic-method | NO | YES | runtime profile or stack evidence can discriminate CPU, allocation and wait hypotheses. | PENDING_RECOMMENDED_REVIEW |
| obs-logs-structured-correlation | lu-obs-logs-structured-correlation | obs-diagnostic-method | lu-obs-diagnostic-method | NO | YES | queryable correlated events can confirm or reject a state-transition hypothesis. | PENDING_RECOMMENDED_REVIEW |
| obs-load-test-benchmark-validity | lu-obs-load-test-benchmark-validity | obs-diagnostic-method | lu-obs-diagnostic-method | NO | YES | experimental result is only valid under its stated workload and environment conditions. | PENDING_RECOMMENDED_REVIEW |
| api-retry-backoff-jitter | lu-api-deadline-retry-policy | rel-dependency-budgets | lu-rel-dependency-budgets | NO | NO | each retry consumes additional time and downstream capacity. | PENDING_RECOMMENDED_REVIEW |
| api-retry-backoff-jitter | lu-api-deadline-retry-policy | rel-cascading-failure-queue-capacity | lu-rel-cascading-failure-queue-capacity | NO | NO | multiple retry attempts can multiply traffic against an already degraded dependency. | PENDING_RECOMMENDED_REVIEW |
| rel-dependency-budgets | lu-rel-dependency-budgets | rel-cascading-failure-queue-capacity | lu-rel-cascading-failure-queue-capacity | NO | YES | dependency time consumption reduces the remaining upstream recovery budget. | PENDING_RECOMMENDED_REVIEW |
| rel-user-journey-sli-slo-budget | lu-rel-user-journey-sli-slo-budget | rel-change-rollout-rollback-risk | lu-release-rollout-rollback | NO | YES | measured user journey and acceptable reliability target over a rollout window. | PENDING_RECOMMENDED_REVIEW |
| api-versioning-compatibility | lu-api-versioning-compatibility | rel-change-rollout-rollback-risk | lu-release-rollout-rollback | NO | NO | old and new API clients/servers may coexist during deployment. | PENDING_RECOMMENDED_REVIEW |
| db-schema-evolution | lu-db-schema-evolution | rel-change-rollout-rollback-risk | lu-release-rollout-rollback | NO | NO | old/new application versions may coexist with evolving database schema and data. | PENDING_RECOMMENDED_REVIEW |
| msg-schema-evolution-contract-ownership | lu-msg-schema-evolution-contract-ownership | rel-change-rollout-rollback-risk | lu-release-rollout-rollback | NO | NO | old/new producers, consumers and retained events may coexist. | PENDING_RECOMMENDED_REVIEW |
| obs-diagnostic-method | lu-obs-diagnostic-method | rel-incident-response-postmortem | lu-rel-incident-response-postmortem | NO | NO | separate symptom from cause and use evidence to test competing hypotheses. | PENDING_RECOMMENDED_REVIEW |
| rel-user-journey-sli-slo-budget | lu-rel-user-journey-sli-slo-budget | rel-incident-response-postmortem | lu-rel-incident-response-postmortem | NO | YES | measure user impact against a meaningful service journey. | PENDING_RECOMMENDED_REVIEW |
| dist-replication-leader-quorum | lu-dist-replication-leader-quorum | rel-disaster-recovery-rpo-rto | lu-rel-disaster-recovery-rpo-rto | NO | NO | replicated copies can share corruption or lag and are not automatically independent backups. | PENDING_RECOMMENDED_REVIEW |
| obs-diagnostic-method | lu-obs-diagnostic-method | rel-failure-injection-verification | lu-rel-failure-injection-verification | NO | NO | prediction, discriminating evidence, controlled experiment and before/after conclusion. | PENDING_RECOMMENDED_REVIEW |
| obs-signals-correlation | lu-obs-signals-correlation | rel-health-readiness-semantics | lu-rel-health-probes | NO | NO | a signal should correspond to the property the operator intends to act upon. | PENDING_RECOMMENDED_REVIEW |
| prog-invariants-domain-model | lu-prog-invariants-domain-model | test-risk-strategy-boundaries | lu-test-risk-strategy-boundaries | NO | NO | valid state and behavior that a change must preserve. | PENDING_RECOMMENDED_REVIEW |
| concurrency-cancellation-lifetime | lu-concurrency-async-parallelism | test-time-concurrency-determinism | lu-test-time-concurrency-determinism | NO | NO | cooperative cancellation and logical operation lifetime. | PENDING_RECOMMENDED_REVIEW |
| test-risk-strategy-boundaries | lu-test-risk-strategy-boundaries | test-time-concurrency-determinism | lu-test-time-concurrency-determinism | NO | YES | identify the specific concurrency/time assumption that the test should falsify. | PENDING_RECOMMENDED_REVIEW |
| test-risk-strategy-boundaries | lu-test-risk-strategy-boundaries | test-property-boundary-fuzz | lu-test-property-boundary-fuzz | NO | YES | prioritize the input/state region whose failure would matter. | PENDING_RECOMMENDED_REVIEW |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | test-failure-resilience | lu-test-failure-resilience | NO | NO | one dependency or component can fail or become unreachable while the rest of the operation/system retains state. | PENDING_RECOMMENDED_REVIEW |
| api-versioning-compatibility | lu-api-versioning-compatibility | test-migration-compatibility | lu-test-migration-compatibility | NO | NO | old and new API contracts may coexist during rollout. | PENDING_RECOMMENDED_REVIEW |
| db-schema-evolution | lu-db-schema-evolution | test-migration-compatibility | lu-test-migration-compatibility | NO | NO | old/new binaries, schema versions and persisted data may coexist during migration. | PENDING_RECOMMENDED_REVIEW |
| msg-schema-evolution-contract-ownership | lu-msg-schema-evolution-contract-ownership | test-migration-compatibility | lu-test-migration-compatibility | NO | NO | old/new message contracts and historical events may coexist. | PENDING_RECOMMENDED_REVIEW |
| test-time-concurrency-determinism | lu-test-time-concurrency-determinism | test-ci-flakiness-repeatability | lu-test-ci-flakiness-repeatability | NO | YES | explicit time/interleaving control replaces sleeps and probabilistic ordering. | PENDING_RECOMMENDED_REVIEW |
| test-real-dependency-fixtures | lu-test-real-dependency-fixtures | test-ci-flakiness-repeatability | lu-test-ci-flakiness-repeatability | NO | YES | fixture startup, state isolation, version and cleanup are part of the test's relevant environment. | PENDING_RECOMMENDED_REVIEW |
| prog-api-refactoring-change-safety | lu-prog-api-refactoring-change-safety | test-review-static-analysis-change-safety | lu-test-review-static-analysis-change-safety | NO | NO | preserve or intentionally migrate externally meaningful behavior during a code change. | PENDING_RECOMMENDED_REVIEW |
| test-time-concurrency-determinism | lu-test-time-concurrency-determinism | test-risk-transfer | lu-test-risk-transfer | NO | YES | control an interleaving, clock or operation lifetime to reproduce a concurrency-sensitive failure. | PENDING_RECOMMENDED_REVIEW |
| test-property-boundary-fuzz | lu-test-property-boundary-fuzz | test-risk-transfer | lu-test-risk-transfer | NO | YES | test an invariant across broad or generated input and preserve the failing case. | PENDING_RECOMMENDED_REVIEW |
| test-migration-compatibility | lu-test-migration-compatibility | test-risk-transfer | lu-test-risk-transfer | NO | YES | test old/new representations and transitional compatibility rather than only final state. | PENDING_RECOMMENDED_REVIEW |
| test-review-static-analysis-change-safety | lu-test-review-static-analysis-change-safety | test-risk-transfer | lu-test-risk-transfer | NO | YES | combine diff intent, static findings and targeted dynamic evidence when the implementation changes. | PENDING_RECOMMENDED_REVIEW |
| prog-composition-dependencies | lu-prog-composition-dependencies | arch-boundaries-ownership | lu-arch-boundaries-data-ownership | NO | NO | explicit dependency direction and composition boundary. | PENDING_RECOMMENDED_REVIEW |
| arch-requirements-quality-attributes | lu-arch-requirements-quality-attributes | arch-boundaries-ownership | lu-arch-boundaries-data-ownership | NO | YES | quality attributes and constraints that may justify an independent boundary. | PENDING_RECOMMENDED_REVIEW |
| cache-need-source-of-truth | lu-cache-source-of-truth-invalidation | arch-data-ownership-source-of-truth | lu-arch-boundaries-data-ownership | NO | NO | a cached copy is derived state and another system remains authoritative. | PENDING_RECOMMENDED_REVIEW |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | arch-sync-async-integration | lu-arch-sync-async-integration | NO | NO | one dependency may fail or become unreachable while other state remains active. | PENDING_RECOMMENDED_REVIEW |
| dist-partitioning-ownership-rebalancing | lu-dist-partitioning-ownership-rebalancing | arch-scale-capacity-partitioning | lu-arch-scale-capacity-partitioning | NO | NO | keys/work map to owners and repartitioning creates distribution and rebalance cost. | PENDING_RECOMMENDED_REVIEW |
| rel-disaster-recovery-rpo-rto | lu-rel-disaster-recovery-rpo-rto | arch-failure-recovery-security-observability | lu-arch-failure-recovery-security-observability | NO | NO | acceptable data-loss window and restoration-time objective. | PENDING_RECOMMENDED_REVIEW |
| api-versioning-compatibility | lu-api-versioning-compatibility | arch-evolution-migration-strangler | lu-arch-evolution-migration-strangler | NO | NO | old/new external contracts may coexist during transition. | PENDING_RECOMMENDED_REVIEW |
| db-schema-evolution | lu-db-schema-evolution | arch-evolution-migration-strangler | lu-arch-evolution-migration-strangler | NO | NO | old/new application versions may coexist with evolving persisted data. | PENDING_RECOMMENDED_REVIEW |
| msg-schema-evolution-contract-ownership | lu-msg-schema-evolution-contract-ownership | arch-evolution-migration-strangler | lu-arch-evolution-migration-strangler | NO | NO | retained event history and independently deployed contract versions may coexist. | PENDING_RECOMMENDED_REVIEW |
| dist-reconciliation-convergence | lu-dist-reconciliation-convergence | arch-evolution-migration-strangler | lu-arch-evolution-migration-strangler | NO | NO | compare derived/actual state against authority and repair repeatably. | PENDING_RECOMMENDED_REVIEW |
| arch-boundaries-ownership | lu-arch-boundaries-data-ownership | arch-cost-complexity-changeability | lu-arch-cost-complexity-changeability | NO | YES | a boundary introduces contracts, deployment and ownership burden. | PENDING_RECOMMENDED_REVIEW |
| arch-cost-complexity-changeability | lu-arch-cost-complexity-changeability | arch-decision-communication-transfer | lu-arch-cost-complexity-changeability | YES | YES | a design mechanism has ongoing cost that must be compared with the property it buys. | PENDING_RECOMMENDED_REVIEW |
| arch-failure-recovery-security-observability | lu-arch-failure-recovery-security-observability | arch-decision-communication-transfer | lu-arch-cost-complexity-changeability | NO | YES | important failure, recovery, trust and evidence consequences of an option. | PENDING_RECOMMENDED_REVIEW |
| arch-evolution-migration-strangler | lu-arch-evolution-migration-strangler | arch-decision-communication-transfer | lu-arch-cost-complexity-changeability | NO | YES | architecture decisions evolve and may require an incremental transition rather than replacement in one step. | PENDING_RECOMMENDED_REVIEW |
| os-virtual-memory-page-cache | lu-os-virtual-memory-page-cache | delivery-resources-cpu-memory | lu-delivery-resources-cpu-memory | NO | NO | process-visible memory is not identical to one simplistic managed-heap number. | PENDING_RECOMMENDED_REVIEW |
| delivery-container-process-lifecycle | lu-delivery-container-process-lifecycle | delivery-probes-health | lu-rel-health-probes | NO | YES | platform starts, restarts and terminates a workload process. | PENDING_RECOMMENDED_REVIEW |
| concurrency-cancellation-lifetime | lu-concurrency-async-parallelism | delivery-graceful-shutdown-draining | lu-delivery-graceful-shutdown-draining | NO | NO | logical operations respond cooperatively to cancellation before their lifetime ends. | PENDING_RECOMMENDED_REVIEW |
| delivery-probes-health | lu-rel-health-probes | delivery-rollout-rollback-strategies | lu-release-rollout-rollback | NO | YES | platform routing uses readiness state to include or remove an instance. | PENDING_RECOMMENDED_REVIEW |
| api-versioning-compatibility | lu-api-versioning-compatibility | delivery-rollout-rollback-strategies | lu-release-rollout-rollback | NO | NO | old/new API versions may serve traffic concurrently. | PENDING_RECOMMENDED_REVIEW |
| db-schema-evolution | lu-db-schema-evolution | delivery-rollout-rollback-strategies | lu-release-rollout-rollback | NO | NO | old/new binaries may coexist with evolving persisted schema/data. | PENDING_RECOMMENDED_REVIEW |
| msg-schema-evolution-contract-ownership | lu-msg-schema-evolution-contract-ownership | delivery-rollout-rollback-strategies | lu-release-rollout-rollback | NO | NO | mixed-version event producers/consumers and retained event history. | PENDING_RECOMMENDED_REVIEW |
| rel-overload-load-shedding-degradation | lu-rel-overload-load-shedding-degradation | delivery-autoscaling-signal-boundary | lu-delivery-autoscaling-signal-boundary | NO | NO | not every overload condition can be solved safely by admitting more parallel work. | PENDING_RECOMMENDED_REVIEW |
| msg-lag-backpressure-evidence | lu-msg-lag-backpressure-evidence | delivery-autoscaling-signal-boundary | lu-delivery-autoscaling-signal-boundary | NO | NO | partition lag and consume rate reflect queued messaging work. | PENDING_RECOMMENDED_REVIEW |
| delivery-artifact-image-config | lu-delivery-artifact-provenance | delivery-platform-evidence-debug | lu-delivery-platform-evidence-debug | NO | YES | deployed artifact identity and runtime configuration source. | PENDING_RECOMMENDED_REVIEW |
| net-proxy-lb-forwarded-boundary | lu-net-proxy-tls-forwarded-boundary | delivery-platform-evidence-debug | lu-delivery-platform-evidence-debug | NO | NO | traffic may traverse a proxy/LB boundary before reaching the workload. | PENDING_RECOMMENDED_REVIEW |
| sec-secrets-third-party-trust | lu-sec-secrets-third-party-trust | delivery-cloud-responsibility-managed-services | lu-delivery-cloud-responsibility-managed-services | NO | NO | credentials grant authority and external providers remain a trust boundary. | PENDING_RECOMMENDED_REVIEW |
| rel-disaster-recovery-rpo-rto | lu-rel-disaster-recovery-rpo-rto | delivery-cloud-responsibility-managed-services | lu-delivery-cloud-responsibility-managed-services | NO | NO | provider redundancy does not by itself prove application RPO/RTO. | PENDING_RECOMMENDED_REVIEW |
| delivery-cloud-responsibility-managed-services | lu-delivery-cloud-responsibility-managed-services | delivery-platform-transfer | lu-delivery-platform-transfer | NO | YES | provider-managed implementation changes operational responsibility but does not remove application ownership of behavior. | PENDING_RECOMMENDED_REVIEW |
| delivery-autoscaling-signal-boundary | lu-delivery-autoscaling-signal-boundary | delivery-platform-transfer | lu-delivery-platform-transfer | NO | YES | same workload pressure may map to different scaling signals and delay semantics on another platform. | PENDING_RECOMMENDED_REVIEW |
| delivery-rollout-rollback-strategies | lu-release-rollout-rollback | delivery-platform-transfer | lu-delivery-platform-transfer | NO | YES | platforms implement version coexistence, traffic movement and rollback differently. | PENDING_RECOMMENDED_REVIEW |
| rel-health-readiness-semantics | lu-rel-health-probes | net-service-discovery-load-balancing | lu-net-service-discovery-load-balancing | NO | NO | traffic eligibility signal | PENDING_RECOMMENDED_REVIEW |
| delivery-platform-evidence-debug | lu-delivery-platform-evidence-debug | net-service-discovery-load-balancing | lu-net-service-discovery-load-balancing | NO | NO | platform routing evidence | PENDING_RECOMMENDED_REVIEW |
| sec-auth-session-token | lu-sec-auth-session-oauth | sec-cryptography-credentials-tokens | lu-sec-cryptography-credentials-tokens | NO | YES | token lifetime and verification context | PENDING_RECOMMENDED_REVIEW |
| delivery-cloud-responsibility-managed-services | lu-delivery-cloud-responsibility-managed-services | sec-data-encryption-key-lifecycle | lu-sec-data-encryption-key-lifecycle | NO | NO | managed-service responsibility | PENDING_RECOMMENDED_REVIEW |
| msg-delivery-retry-poison-dlq | lu-msg-delivery-retry-poison-dlq | msg-background-jobs-scheduling | lu-msg-background-jobs-scheduling | NO | YES | bounded retry classification | PENDING_RECOMMENDED_REVIEW |
| dist-consensus-coordination-purpose | lu-dist-consensus-coordination-purpose | msg-background-jobs-scheduling | lu-msg-background-jobs-scheduling | NO | NO | exclusive owner/lease coordination | PENDING_RECOMMENDED_REVIEW |
| net-http-semantics | lu-net-http-streaming-cancellation | net-service-discovery-load-balancing | lu-net-service-discovery-load-balancing | NO | YES | request versus connection routing | PENDING_RECOMMENDED_REVIEW |

## Unit-pair aggregation

- REQUIRED cross-unit capability edges: **174**; unique source-unit → target-unit pairs: **170**; duplicated pairs: **4**; maximum edges per pair: **2**.
- RECOMMENDED cross-unit capability edges: **129**; unique source-unit → target-unit pairs: **125**; duplicated pairs: **4**; maximum edges per pair: **2**.

### Duplicated REQUIRED unit pairs

| Source unit → target unit | Capability edges | Count |
|---|---|---|
| lu-arch-requirements-quality-attributes → lu-arch-cost-complexity-changeability | arch-requirements-quality-attributes → arch-cost-complexity-changeability; arch-requirements-quality-attributes → arch-decision-communication-transfer | 2 |
| lu-cache-source-of-truth-invalidation → lu-cache-evidence-transfer | cache-invalidation-consistency → cache-evidence-transfer; cache-multilayer-coherence → cache-evidence-transfer | 2 |
| lu-concurrency-async-parallelism → lu-msg-background-jobs-scheduling | concurrency-cancellation-lifetime → msg-background-jobs-scheduling; concurrency-bounded-backpressure → msg-background-jobs-scheduling | 2 |
| lu-db-transactions-mvcc-isolation → lu-outbox-duplicate-safe-effect | db-transactions-isolation-anomalies → msg-consumer-idempotency-inbox; db-transactions-isolation-anomalies → msg-outbox-db-publish-gap | 2 |

### Duplicated RECOMMENDED unit pairs

| Source unit → target unit | Capability edges | Count |
|---|---|---|
| lu-api-versioning-compatibility → lu-release-rollout-rollback | api-versioning-compatibility → rel-change-rollout-rollback-risk; api-versioning-compatibility → delivery-rollout-rollback-strategies | 2 |
| lu-db-schema-evolution → lu-release-rollout-rollback | db-schema-evolution → rel-change-rollout-rollback-risk; db-schema-evolution → delivery-rollout-rollback-strategies | 2 |
| lu-index-query-shape → lu-execution-plan-estimates | db-index-structures → db-execution-operators; db-composite-query-shape → db-optimizer-cardinality-stats | 2 |
| lu-msg-schema-evolution-contract-ownership → lu-release-rollout-rollback | msg-schema-evolution-contract-ownership → rel-change-rollout-rollback-risk; msg-schema-evolution-contract-ownership → delivery-rollout-rollback-strategies | 2 |

## Naive REQUIRED unit graph diagnostic

Temporary diagnostic only: **137 nodes**, **170 unique cross-unit REQUIRED edges**, **33 zero-incoming roots**, cycle check: **ACYCLIC**.

Indegree histogram:

| Indegree | Unit count |
|---:|---:|
| 0 | 33 |
| 1 | 62 |
| 2 | 28 |
| 3 | 7 |
| 4 | 4 |
| 5 | 3 |

Top 15 highest-indegree units:

| Unit | Indegree |
|---|---:|
| lu-arch-failure-recovery-security-observability | 5 |
| lu-dist-guarantee-recovery-transfer | 5 |
| lu-sec-unseen-attack-transfer | 5 |
| lu-db-production-diagnosis-transfer | 4 |
| lu-net-failure-localization-unknown-outcome | 4 |
| lu-nosql-model-selection | 4 |
| lu-outbox-duplicate-safe-effect | 4 |
| lu-api-deadline-retry-policy | 3 |
| lu-api-unknown-outcome-reconciliation | 3 |
| lu-arch-consistency-latency-availability | 3 |
| lu-arch-sync-async-integration | 3 |
| lu-cache-evidence-transfer | 3 |
| lu-delivery-platform-evidence-debug | 3 |
| lu-delivery-platform-transfer | 3 |
| lu-api-validation-errors-pagination | 2 |

Acyclic capability projection does **NOT** prove the learner progression graph is acceptable. The later semantic phase may convert cross-unit REQUIRED relations into Local Prerequisite Slices and therefore remove learner-level prerequisite candidates.

## Cross-unit REQUIRED workload by target owner

- Programming & Software Design Foundations: **2**
- Runtime & Memory: **2**
- Operating Systems & I/O Foundations: **6**
- Concurrency & Async: **6**
- Networking & HTTP: **9**
- Relational Database Engineering: **13**
- NoSQL & Specialized Data Systems: **9**
- Cache Engineering: **6**
- Distributed Systems: **14**
- Messaging & Event-Driven Consistency: **19**
- API Contracts & Resilience: **12**
- Security: **18**
- Observability & Performance: **9**
- Reliability / SRE: **8**
- Testing & Engineering Quality: **9**
- Architecture & System Design: **18**
- Containers / Kubernetes / Cloud Delivery: **14**
- Same-owner cross-unit REQUIRED: **115**.
- Cross-owner cross-unit REQUIRED: **59**.

## Cross-unit RECOMMENDED workload by target owner

- Programming & Software Design Foundations: **1**
- Runtime & Memory: **2**
- Concurrency & Async: **1**
- Networking & HTTP: **5**
- Relational Database Engineering: **10**
- NoSQL & Specialized Data Systems: **10**
- Cache Engineering: **3**
- Distributed Systems: **8**
- Messaging & Event-Driven Consistency: **11**
- API Contracts & Resilience: **5**
- Security: **7**
- Observability & Performance: **10**
- Reliability / SRE: **12**
- Testing & Engineering Quality: **15**
- Architecture & System Design: **13**
- Containers / Kubernetes / Cloud Delivery: **16**
- Same-owner cross-unit RECOMMENDED: **54**.
- Cross-owner cross-unit RECOMMENDED: **75**.

## Four-graph boundary

1. Capability dependency graph
2. Internal Learning-Unit order
3. External Learning-Unit prerequisite candidate graph
4. Learner progression state

- This Stage 2A inventory completes **none** of graphs 3 or 4.
- INTERNAL_PRIMARY_ORDER applies only when both Primaries are already inside the same sealed Learning Unit.
- PENDING_REQUIRED_REVIEW is not a lock.
- PENDING_RECOMMENDED_REVIEW is never a lock.
- Track number, document order and owner are not progression order.

## Proposed semantic review batches

No semantic classifications are made here; these batches only partition pending review workload.

### Batch A — Foundations

Target owners: Programming & Software Design Foundations; Runtime & Memory; Operating Systems & I/O Foundations; Concurrency & Async; Networking & HTTP.
- Pending REQUIRED: **25** (same-owner 20; cross-owner 5).
- Pending RECOMMENDED: **9**.
- Target Learning Units: **29**.

### Batch B — Data

Target owners: Relational Database Engineering; NoSQL & Specialized Data Systems; Cache Engineering.
- Pending REQUIRED: **28** (same-owner 21; cross-owner 7).
- Pending RECOMMENDED: **23**.
- Target Learning Units: **25**.

### Batch C — Distributed Interaction

Target owners: Distributed Systems; Messaging & Event-Driven Consistency; API Contracts & Resilience.
- Pending REQUIRED: **45** (same-owner 25; cross-owner 20).
- Pending RECOMMENDED: **24**.
- Target Learning Units: **28**.

### Batch D — Production Safety

Target owners: Security; Observability & Performance; Reliability / SRE.
- Pending REQUIRED: **36** (same-owner 26; cross-owner 10).
- Pending RECOMMENDED: **34**.
- Target Learning Units: **30**.

### Batch E — Delivery & Verification

Target owners: Containers / Kubernetes / Cloud Delivery; Testing & Engineering Quality.
- Pending REQUIRED: **23** (same-owner 17; cross-owner 6).
- Pending RECOMMENDED: **36**.
- Target Learning Units: **19**.

### Batch F — Architecture Synthesis

Target owners: Architecture & System Design.
- Pending REQUIRED: **18** (same-owner 7; cross-owner 11).
- Pending RECOMMENDED: **13**.
- Target Learning Units: **8**.

## Completeness check

- REQUIRED: **201 / 201** = **27 INTERNAL_PRIMARY_ORDER + 174 PENDING_REQUIRED_REVIEW**.
- RECOMMENDED: **131 / 131** = **131 PENDING_RECOMMENDED_REVIEW**.
- Grand total: **332 / 332** frozen dependency relations inventoried exactly once.
- Missing relations: **0**; duplicate relations: **0**; unknown capabilities: **0**; unknown Learning Units: **0**.
- No semantic dependency decision was made.

