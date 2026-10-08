# Stage 2D Distributed Interaction Dependency Semantic Review - Working Evidence

NON-CANONICAL WORKING REVIEW. This artifact classifies the Stage 2A Distributed Interaction dependency workload. It does not create learner progression locks or mutate the frozen capability dependency graph.

## 1. Scope and completeness

- Target owners: Distributed Systems; Messaging & Event-Driven Consistency; API Contracts & Resilience.
- 45 REQUIRED; 24 RECOMMENDED; 69 / 69 total.
- 25 target Learning Units with pending relations; 28 sealed target-owner Learning Units overall.
- Same-owner REQUIRED: 25; cross-owner REQUIRED: 20.
- RECOMMENDED same-unit relations: 0.
- Every relation is reviewed exactly once.

## 2. REQUIRED decision table

| From capability | From unit | To capability | To unit | Frozen assumed slice | Decision | Exact local slice or required prior evidence | Why |
|---|---|---|---|---|---|---|---|
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | dist-rpc-unknown-completion | lu-dist-rpc-unknown-completion | a remote component may execute, fail, slow or become unreachable independently of the caller | LOCAL_PREREQUISITE_SLICE | Bounded a remote component may execute, fail, slow or become unreachable independently of the caller | Target can construct this boundary locally without claiming the source unit PASSED. |
| net-failure-localization-unknown-outcome | lu-net-failure-localization-unknown-outcome | dist-rpc-unknown-completion | lu-dist-rpc-unknown-completion | transport-stage evidence and the fact that absence of an HTTP response does not prove absence of remote execution | LOCAL_PREREQUISITE_SLICE | Bounded transport-stage evidence and the fact that absence of an HTTP response does not prove absence of remote execution | Target can construct this boundary locally without claiming the source unit PASSED. |
| dist-consistency-linearizability | lu-dist-consistency-linearizability | dist-replication-leader-quorum | lu-dist-replication-leader-quorum | allowed read/write histories and required visibility guarantee | LOCAL_PREREQUISITE_SLICE | Bounded allowed read/write histories and required visibility guarantee | Target can construct this boundary locally without claiming the source unit PASSED. |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | dist-replication-leader-quorum | lu-dist-replication-leader-quorum | independent replica or network-path failure and uncertainty | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior independent replica or network-path failure and uncertainty |  |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | dist-consensus-coordination-purpose | lu-dist-consensus-coordination-purpose | participants can fail or become mutually unreachable while agreement is still required | LOCAL_PREREQUISITE_SLICE | Bounded participants can fail or become mutually unreachable while agreement is still required | Target can construct this boundary locally without claiming the source unit PASSED. |
| db-transactions-isolation-anomalies | lu-db-transactions-mvcc-isolation | dist-transactions-2pc-boundary | lu-dist-transactions-2pc-boundary | atomic commit or abort within one transactional resource | LOCAL_PREREQUISITE_SLICE | Bounded atomic commit or abort within one transactional resource | Target can construct this boundary locally without claiming the source unit PASSED. |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | dist-transactions-2pc-boundary | lu-dist-transactions-2pc-boundary | independent participant/coordinator failure during a multi-step distributed decision | LOCAL_PREREQUISITE_SLICE | Bounded independent participant/coordinator failure during a multi-step distributed decision | Target can construct this boundary locally without claiming the source unit PASSED. |
| prog-invariants-domain-model | lu-prog-invariants-domain-model | dist-reconciliation-convergence | lu-dist-reconciliation-convergence | valid target state and invariant ownership | LOCAL_PREREQUISITE_SLICE | Bounded valid target state and invariant ownership | Target can construct this boundary locally without claiming the source unit PASSED. |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | dist-reconciliation-convergence | lu-dist-reconciliation-convergence | partial failure can leave durable incomplete or divergent state | LOCAL_PREREQUISITE_SLICE | Bounded partial failure can leave durable incomplete or divergent state | Target can construct this boundary locally without claiming the source unit PASSED. |
| dist-rpc-unknown-completion | lu-dist-rpc-unknown-completion | dist-guarantee-recovery-transfer | lu-dist-guarantee-recovery-transfer | ambiguous remote completion states | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior ambiguous remote completion states |  |
| dist-replication-leader-quorum | lu-dist-replication-leader-quorum | dist-guarantee-recovery-transfer | lu-dist-guarantee-recovery-transfer | replica, acknowledgement, stale-read and failover semantics | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior replica, acknowledgement, stale-read and failover semantics |  |
| dist-consensus-coordination-purpose | lu-dist-consensus-coordination-purpose | dist-guarantee-recovery-transfer | lu-dist-guarantee-recovery-transfer | agreement, quorum and exclusive-coordination guarantee | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior agreement, quorum and exclusive-coordination guarantee |  |
| dist-time-order-causality | lu-dist-time-order-causality | dist-guarantee-recovery-transfer | lu-dist-guarantee-recovery-transfer | wall-clock timestamps do not by themselves define causal or total order | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior wall-clock timestamps do not by themselves define causal or total order |  |
| dist-reconciliation-convergence | lu-dist-reconciliation-convergence | dist-guarantee-recovery-transfer | lu-dist-guarantee-recovery-transfer | compare actual state with authority and apply repeatable repair | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior compare actual state with authority and apply repeatable repair |  |
| msg-model-queue-topic-partition-order | lu-msg-model-queue-topic-partition-order | msg-producer-acks-durability | lu-msg-producer-acks-durability | queue, topic or partition publication boundary and ordering scope | LOCAL_PREREQUISITE_SLICE | Bounded queue, topic or partition publication boundary and ordering scope | Target can construct this boundary locally without claiming the source unit PASSED. |
| dist-replication-leader-quorum | lu-dist-replication-leader-quorum | msg-producer-acks-durability | lu-msg-producer-acks-durability | replica acknowledgement, leader and failover semantics | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior replica acknowledgement, leader and failover semantics |  |
| msg-model-queue-topic-partition-order | lu-msg-model-queue-topic-partition-order | msg-consumer-groups-offsets-rebalance | lu-msg-consumer-groups-offsets-rebalance | partitions, destination model and ordering scope | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior partitions, destination model and ordering scope |  |
| msg-model-queue-topic-partition-order | lu-msg-model-queue-topic-partition-order | msg-delivery-retry-poison-dlq | lu-msg-delivery-retry-poison-dlq | broker-delivered record identity and ordering boundary | LOCAL_PREREQUISITE_SLICE | Bounded broker-delivered record identity and ordering boundary | Target can construct this boundary locally without claiming the source unit PASSED. |
| msg-delivery-retry-poison-dlq | lu-msg-delivery-retry-poison-dlq | msg-consumer-idempotency-inbox | lu-outbox-duplicate-safe-effect | repeated delivery of one logical message after failure or retry | LOCAL_PREREQUISITE_SLICE | Bounded repeated delivery of one logical message after failure or retry | Target can construct this boundary locally without claiming the source unit PASSED. |
| db-transactions-isolation-anomalies | lu-db-transactions-mvcc-isolation | msg-consumer-idempotency-inbox | lu-outbox-duplicate-safe-effect | one local database transaction can atomically bind deduplication record and business state | LOCAL_PREREQUISITE_SLICE | Bounded one local database transaction can atomically bind deduplication record and business state | Target can construct this boundary locally without claiming the source unit PASSED. |
| msg-model-queue-topic-partition-order | lu-msg-model-queue-topic-partition-order | msg-outbox-db-publish-gap | lu-outbox-duplicate-safe-effect | broker publication boundary is distinct from local database commit | LOCAL_PREREQUISITE_SLICE | Bounded broker publication boundary is distinct from local database commit | Target can construct this boundary locally without claiming the source unit PASSED. |
| db-transactions-isolation-anomalies | lu-db-transactions-mvcc-isolation | msg-outbox-db-publish-gap | lu-outbox-duplicate-safe-effect | atomic local database commit boundary | LOCAL_PREREQUISITE_SLICE | Bounded atomic local database commit boundary | Target can construct this boundary locally without claiming the source unit PASSED. |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | msg-outbox-db-publish-gap | lu-outbox-duplicate-safe-effect | one component or communication step may fail independently between two effects | LOCAL_PREREQUISITE_SLICE | Bounded one component or communication step may fail independently between two effects | Target can construct this boundary locally without claiming the source unit PASSED. |
| msg-consumer-groups-offsets-rebalance | lu-msg-consumer-groups-offsets-rebalance | msg-replay-backfill | lu-msg-replay-backfill | partition offsets, committed position and consumer assignment | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior partition offsets, committed position and consumer assignment |  |
| msg-model-queue-topic-partition-order | lu-msg-model-queue-topic-partition-order | msg-schema-evolution-contract-ownership | lu-msg-schema-evolution-contract-ownership | message contract, producer ownership and independently deployed consumers | LOCAL_PREREQUISITE_SLICE | Bounded message contract, producer ownership and independently deployed consumers | Target can construct this boundary locally without claiming the source unit PASSED. |
| msg-model-queue-topic-partition-order | lu-msg-model-queue-topic-partition-order | msg-workflow-saga-compensation | lu-msg-workflow-saga-compensation | messages or commands represent independently processed workflow steps | LOCAL_PREREQUISITE_SLICE | Bounded messages or commands represent independently processed workflow steps | Target can construct this boundary locally without claiming the source unit PASSED. |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | msg-workflow-saga-compensation | lu-msg-workflow-saga-compensation | partial completion across independently failing participants | LOCAL_PREREQUISITE_SLICE | Bounded partial completion across independently failing participants | Target can construct this boundary locally without claiming the source unit PASSED. |
| dist-rpc-unknown-completion | lu-dist-rpc-unknown-completion | msg-external-side-effect-reconciliation | lu-msg-external-side-effect-reconciliation | remote side effect may have completed despite a timeout or lost response | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior remote side effect may have completed despite a timeout or lost response |  |
| dist-reconciliation-convergence | lu-dist-reconciliation-convergence | msg-external-side-effect-reconciliation | lu-msg-external-side-effect-reconciliation | authoritative state comparison and idempotent reconciliation | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior authoritative state comparison and idempotent reconciliation |  |
| msg-consumer-groups-offsets-rebalance | lu-msg-consumer-groups-offsets-rebalance | msg-lag-backpressure-evidence | lu-msg-lag-backpressure-evidence | current and committed offsets per partition and consumer assignment | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior current and committed offsets per partition and consumer assignment |  |
| concurrency-bounded-backpressure | lu-concurrency-async-parallelism | msg-lag-backpressure-evidence | lu-msg-lag-backpressure-evidence | finite downstream capacity and bounded concurrent work | LOCAL_PREREQUISITE_SLICE | Bounded finite downstream capacity and bounded concurrent work | Target can construct this boundary locally without claiming the source unit PASSED. |
| net-http-semantics | lu-net-http-streaming-cancellation | api-contract-resource-semantics | lu-api-contract-resource-semantics | HTTP request/response operation semantics and externally observable protocol behavior. | LOCAL_PREREQUISITE_SLICE | Bounded HTTP request/response operation semantics and externally observable protocol behavior. | Target can construct this boundary locally without claiming the source unit PASSED. |
| prog-errors-results | lu-prog-errors-results | api-validation-errors-pagination | lu-api-validation-errors-pagination | expected failure versus unexpected exception and failure propagation. | LOCAL_PREREQUISITE_SLICE | Bounded expected failure versus unexpected exception and failure propagation. | Target can construct this boundary locally without claiming the source unit PASSED. |
| api-contract-resource-semantics | lu-api-contract-resource-semantics | api-validation-errors-pagination | lu-api-validation-errors-pagination | request intent, response meaning and externally visible API behavior. | LOCAL_PREREQUISITE_SLICE | Bounded request intent, response meaning and externally visible API behavior. | Target can construct this boundary locally without claiming the source unit PASSED. |
| api-contract-resource-semantics | lu-api-contract-resource-semantics | api-versioning-compatibility | lu-api-versioning-compatibility | current externally observable API contract and resource semantics. | LOCAL_PREREQUISITE_SLICE | Bounded current externally observable API contract and resource semantics. | Target can construct this boundary locally without claiming the source unit PASSED. |
| api-contract-resource-semantics | lu-api-contract-resource-semantics | api-request-identity-idempotency | lu-api-request-identity-idempotency | logical API operation and its intended business effect. | LOCAL_PREREQUISITE_SLICE | Bounded logical API operation and its intended business effect. | Target can construct this boundary locally without claiming the source unit PASSED. |
| concurrency-cancellation-lifetime | lu-concurrency-async-parallelism | api-deadlines-timeout-cancellation | lu-api-deadline-retry-policy | cooperative cancellation and logical operation lifetime. | LOCAL_PREREQUISITE_SLICE | Bounded cooperative cancellation and logical operation lifetime. | Target can construct this boundary locally without claiming the source unit PASSED. |
| dist-rpc-unknown-completion | lu-dist-rpc-unknown-completion | api-deadlines-timeout-cancellation | lu-api-deadline-retry-policy | missing response and remote business completion are separate facts. | LOCAL_PREREQUISITE_SLICE | Bounded missing response and remote business completion are separate facts. | Target can construct this boundary locally without claiming the source unit PASSED. |
| api-request-identity-idempotency | lu-api-request-identity-idempotency | api-retry-backoff-jitter | lu-api-deadline-retry-policy | stable logical operation identity and duplicate-effect protection. | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior stable logical operation identity and duplicate-effect protection. |  |
| concurrency-bounded-backpressure | lu-concurrency-async-parallelism | api-circuit-bulkhead-rate-limit | lu-api-circuit-bulkhead-rate-limit | finite capacity, bounded concurrent work and overload protection. | LOCAL_PREREQUISITE_SLICE | Bounded finite capacity, bounded concurrent work and overload protection. | Target can construct this boundary locally without claiming the source unit PASSED. |
| api-request-identity-idempotency | lu-api-request-identity-idempotency | api-unknown-outcome-reconciliation | lu-api-unknown-outcome-reconciliation | stable logical operation key and persisted operation outcome. | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior stable logical operation key and persisted operation outcome. |  |
| dist-rpc-unknown-completion | lu-dist-rpc-unknown-completion | api-unknown-outcome-reconciliation | lu-api-unknown-outcome-reconciliation | remote execution may succeed even when the caller observes timeout or lost response. | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior remote execution may succeed even when the caller observes timeout or lost response. |  |
| dist-reconciliation-convergence | lu-dist-reconciliation-convergence | api-unknown-outcome-reconciliation | lu-api-unknown-outcome-reconciliation | authoritative-state comparison and idempotent reconciliation. | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior authoritative-state comparison and idempotent reconciliation. |  |
| concurrency-cancellation-lifetime | lu-concurrency-async-parallelism | msg-background-jobs-scheduling | lu-msg-background-jobs-scheduling | operation cancellation/lifetime | LOCAL_PREREQUISITE_SLICE | Bounded operation cancellation/lifetime | Target can construct this boundary locally without claiming the source unit PASSED. |
| concurrency-bounded-backpressure | lu-concurrency-async-parallelism | msg-background-jobs-scheduling | lu-msg-background-jobs-scheduling | bounded in-flight work | LOCAL_PREREQUISITE_SLICE | Bounded bounded in-flight work | Target can construct this boundary locally without claiming the source unit PASSED. |

## 3. External candidate evidence table

| Relation | Required compatible prior evidence | Why local slice is insufficient | Whole-source-unit PASSED proxy |
|---|---|---|---|
| dist-partial-failure-uncertainty -> dist-replication-leader-quorum | Prior independent replica or network-path failure and uncertainty | Target requires substantive prior evidence; the exact mechanism cannot be reduced to a local vocabulary slice. | ACCEPTABLE_CANDIDATE |
| dist-rpc-unknown-completion -> dist-guarantee-recovery-transfer | Prior ambiguous remote completion states | Target requires substantive prior evidence; the exact mechanism cannot be reduced to a local vocabulary slice. | ACCEPTABLE_CANDIDATE |
| dist-replication-leader-quorum -> dist-guarantee-recovery-transfer | Prior replica, acknowledgement, stale-read and failover semantics | Target requires substantive prior evidence; the exact mechanism cannot be reduced to a local vocabulary slice. | ACCEPTABLE_CANDIDATE |
| dist-consensus-coordination-purpose -> dist-guarantee-recovery-transfer | Prior agreement, quorum and exclusive-coordination guarantee | Target requires substantive prior evidence; the exact mechanism cannot be reduced to a local vocabulary slice. | ACCEPTABLE_CANDIDATE |
| dist-time-order-causality -> dist-guarantee-recovery-transfer | Prior wall-clock timestamps do not by themselves define causal or total order | Target requires substantive prior evidence; the exact mechanism cannot be reduced to a local vocabulary slice. | ACCEPTABLE_CANDIDATE |
| dist-reconciliation-convergence -> dist-guarantee-recovery-transfer | Prior compare actual state with authority and apply repeatable repair | Target requires substantive prior evidence; the exact mechanism cannot be reduced to a local vocabulary slice. | ACCEPTABLE_CANDIDATE |
| dist-replication-leader-quorum -> msg-producer-acks-durability | Prior replica acknowledgement, leader and failover semantics | Target requires substantive prior evidence; the exact mechanism cannot be reduced to a local vocabulary slice. | ACCEPTABLE_CANDIDATE |
| msg-model-queue-topic-partition-order -> msg-consumer-groups-offsets-rebalance | Prior partitions, destination model and ordering scope | Target requires substantive prior evidence; the exact mechanism cannot be reduced to a local vocabulary slice. | ACCEPTABLE_CANDIDATE |
| msg-consumer-groups-offsets-rebalance -> msg-replay-backfill | Prior partition offsets, committed position and consumer assignment | Target requires substantive prior evidence; the exact mechanism cannot be reduced to a local vocabulary slice. | ACCEPTABLE_CANDIDATE |
| dist-rpc-unknown-completion -> msg-external-side-effect-reconciliation | Prior remote side effect may have completed despite a timeout or lost response | Target requires substantive prior evidence; the exact mechanism cannot be reduced to a local vocabulary slice. | ACCEPTABLE_CANDIDATE |
| dist-reconciliation-convergence -> msg-external-side-effect-reconciliation | Prior authoritative state comparison and idempotent reconciliation | Target requires substantive prior evidence; the exact mechanism cannot be reduced to a local vocabulary slice. | ACCEPTABLE_CANDIDATE |
| msg-consumer-groups-offsets-rebalance -> msg-lag-backpressure-evidence | Prior current and committed offsets per partition and consumer assignment | Target requires substantive prior evidence; the exact mechanism cannot be reduced to a local vocabulary slice. | ACCEPTABLE_CANDIDATE |
| api-request-identity-idempotency -> api-retry-backoff-jitter | Prior stable logical operation identity and duplicate-effect protection. | Target requires substantive prior evidence; the exact mechanism cannot be reduced to a local vocabulary slice. | ACCEPTABLE_CANDIDATE |
| api-request-identity-idempotency -> api-unknown-outcome-reconciliation | Prior stable logical operation key and persisted operation outcome. | Target requires substantive prior evidence; the exact mechanism cannot be reduced to a local vocabulary slice. | ACCEPTABLE_CANDIDATE |
| dist-rpc-unknown-completion -> api-unknown-outcome-reconciliation | Prior remote execution may succeed even when the caller observes timeout or lost response. | Target requires substantive prior evidence; the exact mechanism cannot be reduced to a local vocabulary slice. | ACCEPTABLE_CANDIDATE |
| dist-reconciliation-convergence -> api-unknown-outcome-reconciliation | Prior authoritative-state comparison and idempotent reconciliation. | Target requires substantive prior evidence; the exact mechanism cannot be reduced to a local vocabulary slice. | ACCEPTABLE_CANDIDATE |

ACCEPTABLE_CANDIDATE != learner lock. It only means a whole-unit PASSED result is currently a fair evidence proxy if global progression later chooses that representation.

## 4. Local Prerequisite Slice safety table

| Relation | Local slice | Ownership preserved because | Target evidence does not claim |
|---|---|---|---|
| dist-partial-failure-uncertainty -> dist-rpc-unknown-completion | Bounded a remote component may execute, fail, slow or become unreachable independently of the caller | Target owns this bounded evidence; it does not claim PASSED dist-partial-failure-uncertainty. |
| net-failure-localization-unknown-outcome -> dist-rpc-unknown-completion | Bounded transport-stage evidence and the fact that absence of an HTTP response does not prove absence of remote execution | Target owns this bounded evidence; it does not claim PASSED net-failure-localization-unknown-outcome. |
| dist-consistency-linearizability -> dist-replication-leader-quorum | Bounded allowed read/write histories and required visibility guarantee | Target owns this bounded evidence; it does not claim PASSED dist-consistency-linearizability. |
| dist-partial-failure-uncertainty -> dist-consensus-coordination-purpose | Bounded participants can fail or become mutually unreachable while agreement is still required | Target owns this bounded evidence; it does not claim PASSED dist-partial-failure-uncertainty. |
| db-transactions-isolation-anomalies -> dist-transactions-2pc-boundary | Bounded atomic commit or abort within one transactional resource | Target owns this bounded evidence; it does not claim PASSED db-transactions-isolation-anomalies. |
| dist-partial-failure-uncertainty -> dist-transactions-2pc-boundary | Bounded independent participant/coordinator failure during a multi-step distributed decision | Target owns this bounded evidence; it does not claim PASSED dist-partial-failure-uncertainty. |
| prog-invariants-domain-model -> dist-reconciliation-convergence | Bounded valid target state and invariant ownership | Target owns this bounded evidence; it does not claim PASSED prog-invariants-domain-model. |
| dist-partial-failure-uncertainty -> dist-reconciliation-convergence | Bounded partial failure can leave durable incomplete or divergent state | Target owns this bounded evidence; it does not claim PASSED dist-partial-failure-uncertainty. |
| msg-model-queue-topic-partition-order -> msg-producer-acks-durability | Bounded queue, topic or partition publication boundary and ordering scope | Target owns this bounded evidence; it does not claim PASSED msg-model-queue-topic-partition-order. |
| msg-model-queue-topic-partition-order -> msg-delivery-retry-poison-dlq | Bounded broker-delivered record identity and ordering boundary | Target owns this bounded evidence; it does not claim PASSED msg-model-queue-topic-partition-order. |
| msg-delivery-retry-poison-dlq -> msg-consumer-idempotency-inbox | Bounded repeated delivery of one logical message after failure or retry | Target owns this bounded evidence; it does not claim PASSED msg-delivery-retry-poison-dlq. |
| db-transactions-isolation-anomalies -> msg-consumer-idempotency-inbox | Bounded one local database transaction can atomically bind deduplication record and business state | Target owns this bounded evidence; it does not claim PASSED db-transactions-isolation-anomalies. |
| msg-model-queue-topic-partition-order -> msg-outbox-db-publish-gap | Bounded broker publication boundary is distinct from local database commit | Target owns this bounded evidence; it does not claim PASSED msg-model-queue-topic-partition-order. |
| db-transactions-isolation-anomalies -> msg-outbox-db-publish-gap | Bounded atomic local database commit boundary | Target owns this bounded evidence; it does not claim PASSED db-transactions-isolation-anomalies. |
| dist-partial-failure-uncertainty -> msg-outbox-db-publish-gap | Bounded one component or communication step may fail independently between two effects | Target owns this bounded evidence; it does not claim PASSED dist-partial-failure-uncertainty. |
| msg-model-queue-topic-partition-order -> msg-schema-evolution-contract-ownership | Bounded message contract, producer ownership and independently deployed consumers | Target owns this bounded evidence; it does not claim PASSED msg-model-queue-topic-partition-order. |
| msg-model-queue-topic-partition-order -> msg-workflow-saga-compensation | Bounded messages or commands represent independently processed workflow steps | Target owns this bounded evidence; it does not claim PASSED msg-model-queue-topic-partition-order. |
| dist-partial-failure-uncertainty -> msg-workflow-saga-compensation | Bounded partial completion across independently failing participants | Target owns this bounded evidence; it does not claim PASSED dist-partial-failure-uncertainty. |
| concurrency-bounded-backpressure -> msg-lag-backpressure-evidence | Bounded finite downstream capacity and bounded concurrent work | Target owns this bounded evidence; it does not claim PASSED concurrency-bounded-backpressure. |
| net-http-semantics -> api-contract-resource-semantics | Bounded HTTP request/response operation semantics and externally observable protocol behavior. | Target owns this bounded evidence; it does not claim PASSED net-http-semantics. |
| prog-errors-results -> api-validation-errors-pagination | Bounded expected failure versus unexpected exception and failure propagation. | Target owns this bounded evidence; it does not claim PASSED prog-errors-results. |
| api-contract-resource-semantics -> api-validation-errors-pagination | Bounded request intent, response meaning and externally visible API behavior. | Target owns this bounded evidence; it does not claim PASSED api-contract-resource-semantics. |
| api-contract-resource-semantics -> api-versioning-compatibility | Bounded current externally observable API contract and resource semantics. | Target owns this bounded evidence; it does not claim PASSED api-contract-resource-semantics. |
| api-contract-resource-semantics -> api-request-identity-idempotency | Bounded logical API operation and its intended business effect. | Target owns this bounded evidence; it does not claim PASSED api-contract-resource-semantics. |
| concurrency-cancellation-lifetime -> api-deadlines-timeout-cancellation | Bounded cooperative cancellation and logical operation lifetime. | Target owns this bounded evidence; it does not claim PASSED concurrency-cancellation-lifetime. |
| dist-rpc-unknown-completion -> api-deadlines-timeout-cancellation | Bounded missing response and remote business completion are separate facts. | Target owns this bounded evidence; it does not claim PASSED dist-rpc-unknown-completion. |
| concurrency-bounded-backpressure -> api-circuit-bulkhead-rate-limit | Bounded finite capacity, bounded concurrent work and overload protection. | Target owns this bounded evidence; it does not claim PASSED concurrency-bounded-backpressure. |
| concurrency-cancellation-lifetime -> msg-background-jobs-scheduling | Bounded operation cancellation/lifetime | Target owns this bounded evidence; it does not claim PASSED concurrency-cancellation-lifetime. |
| concurrency-bounded-backpressure -> msg-background-jobs-scheduling | Bounded bounded in-flight work | Target owns this bounded evidence; it does not claim PASSED concurrency-bounded-backpressure. |

## 5. RECOMMENDED decision table

| From capability | From unit | To capability | To unit | Same unit? | Frozen assumed slice | Decision | Surface location or omission rationale |
|---|---|---|---|---|---|---|---|
| concurrency-local-vs-distributed | lu-concurrency-local-vs-distributed | dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | NO | process-local coordination does not create shared authority or shared failure state across replicas | SURFACE_RECOMMENDED_CONTEXT | Surface as non-blocking context for mental model, debugging or transfer. |
| net-failure-localization-unknown-outcome | lu-net-failure-localization-unknown-outcome | dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | NO | DNS, TCP, TLS or HTTP failure on one path does not reveal global system state | SURFACE_RECOMMENDED_CONTEXT | Surface as non-blocking context for mental model, debugging or transfer. |
| dist-replication-leader-quorum | lu-dist-replication-leader-quorum | dist-consensus-coordination-purpose | lu-dist-consensus-coordination-purpose | NO | leader, quorum and replicated-decision roles | SURFACE_RECOMMENDED_CONTEXT | Surface as non-blocking context for mental model, debugging or transfer. |
| concurrency-local-vs-distributed | lu-concurrency-local-vs-distributed | dist-partitioning-ownership-rebalancing | lu-dist-partitioning-ownership-rebalancing | NO | process-local authority does not define distributed key or work ownership | INTENTIONALLY_NOT_SURFACED |  |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | dist-partitioning-ownership-rebalancing | lu-dist-partitioning-ownership-rebalancing | NO | a current partition owner may disappear or become unreachable | SURFACE_RECOMMENDED_CONTEXT | Surface as non-blocking context for mental model, debugging or transfer. |
| dist-rpc-unknown-completion | lu-dist-rpc-unknown-completion | dist-reconciliation-convergence | lu-dist-reconciliation-convergence | NO | a remote operation may have executed even though the caller did not receive its outcome | SURFACE_RECOMMENDED_CONTEXT | Surface as non-blocking context for mental model, debugging or transfer. |
| dist-partitioning-ownership-rebalancing | lu-dist-partitioning-ownership-rebalancing | dist-guarantee-recovery-transfer | lu-dist-guarantee-recovery-transfer | NO | partition ownership, rebalance and hot-owner behavior | SURFACE_RECOMMENDED_CONTEXT | Surface as non-blocking context for mental model, debugging or transfer. |
| dist-transactions-2pc-boundary | lu-dist-transactions-2pc-boundary | dist-guarantee-recovery-transfer | lu-dist-guarantee-recovery-transfer | NO | prepare, commit and blocking-recovery boundary across participants | SURFACE_RECOMMENDED_CONTEXT | Surface as non-blocking context for mental model, debugging or transfer. |
| dist-partitioning-ownership-rebalancing | lu-dist-partitioning-ownership-rebalancing | msg-consumer-groups-offsets-rebalance | lu-msg-consumer-groups-offsets-rebalance | NO | owner assignment, reassignment and in-flight work during rebalance | SURFACE_RECOMMENDED_CONTEXT | Surface as non-blocking context for mental model, debugging or transfer. |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | msg-delivery-retry-poison-dlq | lu-msg-delivery-retry-poison-dlq | NO | downstream may be slow or unavailable while other messaging components remain active | SURFACE_RECOMMENDED_CONTEXT | Surface as non-blocking context for mental model, debugging or transfer. |
| msg-producer-acks-durability | lu-msg-producer-acks-durability | msg-outbox-db-publish-gap | lu-outbox-duplicate-safe-effect | NO | broker acceptance acknowledgement may itself be ambiguous after timeout | SURFACE_RECOMMENDED_CONTEXT | Surface as non-blocking context for mental model, debugging or transfer. |
| msg-consumer-idempotency-inbox | lu-outbox-duplicate-safe-effect | msg-replay-backfill | lu-msg-replay-backfill | NO | repeated delivery and local deduplication behavior | SURFACE_RECOMMENDED_CONTEXT | Surface as non-blocking context for mental model, debugging or transfer. |
| msg-schema-evolution-contract-ownership | lu-msg-schema-evolution-contract-ownership | msg-replay-backfill | lu-msg-replay-backfill | NO | old and new event contracts may coexist in retained history | SURFACE_RECOMMENDED_CONTEXT | Surface as non-blocking context for mental model, debugging or transfer. |
| prog-api-refactoring-change-safety | lu-prog-api-refactoring-change-safety | msg-schema-evolution-contract-ownership | lu-msg-schema-evolution-contract-ownership | NO | preserve externally consumed behavior while old and new consumers may coexist | SURFACE_RECOMMENDED_CONTEXT | Surface as non-blocking context for mental model, debugging or transfer. |
| dist-reconciliation-convergence | lu-dist-reconciliation-convergence | msg-workflow-saga-compensation | lu-msg-workflow-saga-compensation | NO | repair incomplete distributed state toward a valid outcome | INTENTIONALLY_NOT_SURFACED |  |
| msg-consumer-idempotency-inbox | lu-outbox-duplicate-safe-effect | msg-external-side-effect-reconciliation | lu-msg-external-side-effect-reconciliation | NO | stable local operation identity and duplicate-delivery protection | SURFACE_RECOMMENDED_CONTEXT | Surface as non-blocking context for mental model, debugging or transfer. |
| msg-delivery-retry-poison-dlq | lu-msg-delivery-retry-poison-dlq | msg-lag-backpressure-evidence | lu-msg-lag-backpressure-evidence | NO | repeated retry or poison handling consumes processing capacity and may block progress | SURFACE_RECOMMENDED_CONTEXT | Surface as non-blocking context for mental model, debugging or transfer. |
| prog-api-refactoring-change-safety | lu-prog-api-refactoring-change-safety | api-versioning-compatibility | lu-api-versioning-compatibility | NO | preserve or deliberately migrate externally consumed behavior during change. | SURFACE_RECOMMENDED_CONTEXT | Surface as non-blocking context for mental model, debugging or transfer. |
| dist-rpc-unknown-completion | lu-dist-rpc-unknown-completion | api-request-identity-idempotency | lu-api-request-identity-idempotency | NO | a remote operation may have completed even though its response was not received. | SURFACE_RECOMMENDED_CONTEXT | Surface as non-blocking context for mental model, debugging or transfer. |
| net-failure-localization-unknown-outcome | lu-net-failure-localization-unknown-outcome | api-deadlines-timeout-cancellation | lu-api-deadline-retry-policy | NO | different network stages may consume time or fail before an API result is observed. | SURFACE_RECOMMENDED_CONTEXT | Surface as non-blocking context for mental model, debugging or transfer. |
| dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | api-circuit-bulkhead-rate-limit | lu-api-circuit-bulkhead-rate-limit | NO | one dependency or path may be unhealthy while unrelated components remain usable. | SURFACE_RECOMMENDED_CONTEXT | Surface as non-blocking context for mental model, debugging or transfer. |
| api-deadlines-timeout-cancellation | lu-api-deadline-retry-policy | api-unknown-outcome-reconciliation | lu-api-unknown-outcome-reconciliation | NO | caller lifetime may end while remote processing remains unresolved. | SURFACE_RECOMMENDED_CONTEXT | Surface as non-blocking context for mental model, debugging or transfer. |
| msg-delivery-retry-poison-dlq | lu-msg-delivery-retry-poison-dlq | msg-background-jobs-scheduling | lu-msg-background-jobs-scheduling | NO | bounded retry classification | SURFACE_RECOMMENDED_CONTEXT | Surface as non-blocking context for mental model, debugging or transfer. |
| dist-consensus-coordination-purpose | lu-dist-consensus-coordination-purpose | msg-background-jobs-scheduling | lu-msg-background-jobs-scheduling | NO | exclusive owner/lease coordination | INTENTIONALLY_NOT_SURFACED |  |

## 6. Target-unit over-gating review

| Target unit | LOCAL | EXTERNAL | RECOMMENDED surfaced | RECOMMENDED omitted | Whole-unit PASSED prerequisite? | Evidence note |
|---|---:|---:|---:|---:|---|---|
| lu-dist-guarantee-recovery-transfer | 0 | 5 | 2 | 0 | CANDIDATE_ONLY | Five substantive synthesis inputs; all source units are singleton fair proxies. |
| lu-outbox-duplicate-safe-effect | 5 | 0 | 1 | 0 | NO | All five REQUIRED inputs are local slices; no whole-unit gate. |
| lu-api-deadline-retry-policy | 2 | 1 | 1 | 0 | CANDIDATE_ONLY | Only idempotency remains External; cancellation and remote uncertainty are local. |
| lu-api-unknown-outcome-reconciliation | 0 | 3 | 1 | 0 | CANDIDATE_ONLY | Three substantive External inputs; deadline is non-blocking context. |
| lu-msg-background-jobs-scheduling | 2 | 0 | 1 | 1 | NO | Two local concurrency slices; one surfaced and one omitted context. |
| lu-dist-reconciliation-convergence | 2 | 0 | 1 | 0 | NO | Invariant and partial-divergence slices are local. |
| lu-msg-external-side-effect-reconciliation | 0 | 2 | 1 | 0 | CANDIDATE_ONLY | RPC uncertainty and reconciliation are External; idempotency is context. |
| lu-msg-lag-backpressure-evidence | 1 | 1 | 1 | 0 | CANDIDATE_ONLY | Offset evidence is External; bounded pressure is local. |
| lu-msg-replay-backfill | 0 | 1 | 2 | 0 | CANDIDATE_ONLY | Consumer offset evidence is External; schema and idempotency are context. |
| lu-msg-workflow-saga-compensation | 2 | 0 | 0 | 1 | NO | Message-step and partial-completion slices are local; reconciliation is omitted. |
| lu-api-circuit-bulkhead-rate-limit | 1 | 0 | 1 | 0 | NO | Finite-capacity overload boundary is local; partial-failure context is surfaced. |
| lu-api-request-identity-idempotency | 1 | 0 | 1 | 0 | NO | Contract slice is local; RPC uncertainty is surfaced context. |
| lu-api-validation-errors-pagination | 2 | 0 | 0 | 0 | NO | Error/result and contract slices are local. |
| lu-api-versioning-compatibility | 1 | 0 | 1 | 0 | NO | Contract slice is local; refactoring context is surfaced. |
| lu-dist-consensus-coordination-purpose | 1 | 0 | 1 | 0 | NO | Partial-failure setup is local; replication context is surfaced. |
| lu-dist-partial-failure-uncertainty | 0 | 0 | 2 | 0 | NO | Local foundation; two non-blocking contexts only. |
| lu-dist-partitioning-ownership-rebalancing | 0 | 0 | 2 | 0 | NO | Two non-blocking ownership contexts only. |
| lu-dist-replication-leader-quorum | 1 | 1 | 0 | 0 | CANDIDATE_ONLY | Consistency is local; partial-failure slice is local after correction. |
| lu-dist-rpc-unknown-completion | 2 | 0 | 0 | 0 | NO | Transport and partial-failure facts are local. |
| lu-dist-transactions-2pc-boundary | 2 | 0 | 0 | 0 | NO | DB commit and participant-failure slices are local. |
| lu-msg-consumer-groups-offsets-rebalance | 0 | 1 | 0 | 1 | CANDIDATE_ONLY | Queue model is External; ownership analogy omitted. |
| lu-msg-delivery-retry-poison-dlq | 1 | 0 | 1 | 0 | NO | Message publication slice is local and retry pressure is context elsewhere. |
| lu-msg-producer-acks-durability | 1 | 1 | 0 | 0 | CANDIDATE_ONLY | Publication is local; replication evidence is External. |
| lu-msg-schema-evolution-contract-ownership | 1 | 0 | 1 | 0 | NO | Message model is local; refactoring context is surfaced. |
## 7. Batch external-candidate graph diagnostic

- External capability candidate relations: 16.
- Unique source-unit -> target-unit candidate pairs: 16.
- Candidate subgraph: ACYCLIC.
- No capability-level L target inversion remains.
- No target is labelled LOCKED or AVAILABLE.

## 8. Combined sealed/candidate graph diagnostic

- Foundations: 5 unique External unit pairs.
- Data: 16 unique External unit pairs.
- Distributed Interaction: 16 unique External unit pairs.
- Combined: 37 unique External source-unit -> target-unit pairs across 137 Learning Units.
- 137 nodes; 118 zero-incoming roots; 19 units with one-or-more External incoming edges; maximum candidate indegree 5.
- Combined graph: ACYCLIC.
- No External candidate capability relation in the reviewed three batches has a source frozen target level higher than its target frozen target level after the Stage 2D corrections.
- Acyclicity is necessary but not sufficient.

## 9. Cross-owner review

- Same-owner REQUIRED: 14 LOCAL / 11 EXTERNAL = 25.
- Cross-owner REQUIRED: 15 LOCAL / 5 EXTERNAL = 20.
- Grand: 29 LOCAL / 16 EXTERNAL = 45.
- Cross-owner is not itself a decision reason.

## 10. Synthesis-target review

- lu-dist-guarantee-recovery-transfer: five substantive prior capability evidence requirements remain External; all five source units are singleton fair PASSED proxy candidates; target remains CANDIDATE_ONLY.
- lu-outbox-duplicate-safe-effect: all five REQUIRED inputs are Local slices; duplicate delivery, atomic local transaction, DB/broker gap and partial failure are covered by its own canonical incident; no whole-unit source gate.
- lu-msg-external-side-effect-reconciliation: RPC unknown completion and reconciliation remain substantive External evidence; both source units are singleton acceptable candidates; idempotency is surfaced non-blocking context.
- lu-api-deadline-retry-policy: cancellation/lifetime and remote-completion uncertainty are Local; only api-request-identity-idempotency -> api-retry-backoff-jitter remains External; network failure localization is surfaced context.
- lu-api-unknown-outcome-reconciliation: identity/idempotency, RPC uncertainty and reconciliation remain External; all three source units are singleton acceptable proxies; deadline context is surfaced non-blocking.

## 11. Duplicate-source-unit review

- lu-db-transactions-mvcc-isolation -> lu-outbox-duplicate-safe-effect has two capability-level REQUIRED relations, both Local, creating zero whole-unit gates.
- lu-concurrency-async-parallelism -> lu-msg-background-jobs-scheduling has two capability-level REQUIRED relations, both Local, creating zero whole-unit gates.
- Multiple capability relations between one unit pair never imply duplicate progression gates.

## 12. Final counts

- REQUIRED: 29 LOCAL_PREREQUISITE_SLICE + 16 EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE = 45 / 45.
- RECOMMENDED: 21 SURFACE_RECOMMENDED_CONTEXT + 3 INTENTIONALLY_NOT_SURFACED = 24 / 24.
- External proxy: 16 ACCEPTABLE_CANDIDATE; 0 NOT_ACCEPTABLE; 0 DEFER.
- Missing: 0; extra: 0; duplicate: 0; UNKNOWN: 0.
- Unresolved REQUIRED classifications: 0.
- Learner locks created: 0.
- Canonical mutation: 0.