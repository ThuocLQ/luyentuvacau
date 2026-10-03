# QuanNet Full Learning-Unit Map

> **Status:** DRAFT — architecture review required.
> **Frozen input SHA:** `771f6541872adceb52786387006059e2059df6a8`.

This is semantic architecture only: not lesson authoring, source-map research, detailed cases, assessment variants, UI, progression/backend implementation, sequencing or hour estimation. File order is **not** curriculum order.

**Discovered Learning Units:** 158. No External Required Prerequisite Candidate is declared; parallel eligibility remains possible.

## Unit Registry

| Unit ID | Working title | Domain candidate | Primary owner set | Primary capability count | External prerequisite candidate count |
|---|---|---|---|---:|---:|
| lu-index-query-shape | Choose a usable index key path | Data & Consistency | Relational Database Engineering | 2 | 0 |
| lu-execution-plan-estimates | Read execution pipeline and judge estimates | Data & Consistency | Relational Database Engineering | 2 | 0 |
| lu-race-atomicity | Protect an invariant across unsafe interleaving | Runtime & Concurrency | Concurrency & Async | 3 | 0 |
| lu-outbox-duplicate-safe-effect | Persist producer intent and make consumer effect duplicate-safe | Distributed Systems | Messaging & Event-Driven Consistency | 2 | 0 |
| lu-prog-api-refactoring-change-safety | prog-api-refactoring-change-safety | Runtime & Concurrency | Programming & Software Design Foundations | 1 | 0 |
| lu-prog-collections-complexity | prog-collections-complexity | Runtime & Concurrency | Programming & Software Design Foundations | 1 | 0 |
| lu-prog-composition-dependencies | prog-composition-dependencies | Runtime & Concurrency | Programming & Software Design Foundations | 1 | 0 |
| lu-prog-errors-results | prog-errors-results | Runtime & Concurrency | Programming & Software Design Foundations | 1 | 0 |
| lu-prog-invariants-domain-model | prog-invariants-domain-model | Runtime & Concurrency | Programming & Software Design Foundations | 1 | 0 |
| lu-prog-resource-ownership | prog-resource-ownership | Runtime & Concurrency | Programming & Software Design Foundations | 1 | 0 |
| lu-prog-types-generics | prog-types-generics | Runtime & Concurrency | Programming & Software Design Foundations | 1 | 0 |
| lu-prog-values-identity | prog-values-identity | Runtime & Concurrency | Programming & Software Design Foundations | 1 | 0 |
| lu-runtime-allocation-gc | runtime-allocation-gc | Runtime & Concurrency | Runtime & Memory | 1 | 0 |
| lu-runtime-diagnostics | runtime-diagnostics | Runtime & Concurrency | Runtime & Memory | 1 | 0 |
| lu-runtime-jit-warmup | runtime-jit-warmup | Runtime & Concurrency | Runtime & Memory | 1 | 0 |
| lu-runtime-managed-execution | runtime-managed-execution | Runtime & Concurrency | Runtime & Memory | 1 | 0 |
| lu-runtime-memory-performance-debug | runtime-memory-performance-debug | Runtime & Concurrency | Runtime & Memory | 1 | 0 |
| lu-runtime-memory-roots-lifetime | runtime-memory-roots-lifetime | Runtime & Concurrency | Runtime & Memory | 1 | 0 |
| lu-runtime-retention-pooling-large-objects | runtime-retention-pooling-large-objects | Runtime & Concurrency | Runtime & Memory | 1 | 0 |
| lu-os-blocking-io-waits | os-blocking-io-waits | Runtime & Concurrency | Operating Systems & I/O Foundations | 1 | 0 |
| lu-os-files-handles-sockets-ipc | os-files-handles-sockets-ipc | Runtime & Concurrency | Operating Systems & I/O Foundations | 1 | 0 |
| lu-os-process-thread-kernel | os-process-thread-kernel | Runtime & Concurrency | Operating Systems & I/O Foundations | 1 | 0 |
| lu-os-resource-exhaustion | os-resource-exhaustion | Runtime & Concurrency | Operating Systems & I/O Foundations | 1 | 0 |
| lu-os-scheduling-starvation | os-scheduling-starvation | Runtime & Concurrency | Operating Systems & I/O Foundations | 1 | 0 |
| lu-os-termination-graceful-shutdown | os-termination-graceful-shutdown | Runtime & Concurrency | Operating Systems & I/O Foundations | 1 | 0 |
| lu-os-virtual-memory-page-cache | os-virtual-memory-page-cache | Runtime & Concurrency | Operating Systems & I/O Foundations | 1 | 0 |
| lu-concurrency-async-parallelism | concurrency-async-parallelism | Runtime & Concurrency | Concurrency & Async | 1 | 0 |
| lu-concurrency-bounded-backpressure | concurrency-bounded-backpressure | Runtime & Concurrency | Concurrency & Async | 1 | 0 |
| lu-concurrency-cancellation-lifetime | concurrency-cancellation-lifetime | Runtime & Concurrency | Concurrency & Async | 1 | 0 |
| lu-concurrency-deadlock-starvation | concurrency-deadlock-starvation | Runtime & Concurrency | Concurrency & Async | 1 | 0 |
| lu-concurrency-local-vs-distributed | concurrency-local-vs-distributed | Runtime & Concurrency | Concurrency & Async | 1 | 0 |
| lu-concurrency-memory-visibility | concurrency-memory-visibility | Runtime & Concurrency | Concurrency & Async | 1 | 0 |
| lu-net-connection-reuse-pooling | net-connection-reuse-pooling | Service & Network | Networking & HTTP | 1 | 0 |
| lu-net-failure-localization-unknown-outcome | net-failure-localization-unknown-outcome | Service & Network | Networking & HTTP | 1 | 0 |
| lu-net-http-semantics | net-http-semantics | Service & Network | Networking & HTTP | 1 | 0 |
| lu-net-proxy-lb-forwarded-boundary | net-proxy-lb-forwarded-boundary | Service & Network | Networking & HTTP | 1 | 0 |
| lu-net-request-path-dns | net-request-path-dns | Service & Network | Networking & HTTP | 1 | 0 |
| lu-net-streaming-body-cancellation | net-streaming-body-cancellation | Service & Network | Networking & HTTP | 1 | 0 |
| lu-net-tcp-connection-semantics | net-tcp-connection-semantics | Service & Network | Networking & HTTP | 1 | 0 |
| lu-net-tls-trust-handshake | net-tls-trust-handshake | Service & Network | Networking & HTTP | 1 | 0 |
| lu-db-backup-restore | db-backup-restore | Data & Consistency | Relational Database Engineering | 1 | 0 |
| lu-db-buffer-io | db-buffer-io | Data & Consistency | Relational Database Engineering | 1 | 0 |
| lu-db-connection-pool-exhaustion | db-connection-pool-exhaustion | Data & Consistency | Relational Database Engineering | 1 | 0 |
| lu-db-locks-deadlocks-contention | db-locks-deadlocks-contention | Data & Consistency | Relational Database Engineering | 1 | 0 |
| lu-db-modeling-invariants | db-modeling-invariants | Data & Consistency | Relational Database Engineering | 1 | 0 |
| lu-db-mvcc-visibility | db-mvcc-visibility | Data & Consistency | Relational Database Engineering | 1 | 0 |
| lu-db-partitioning-sharding-boundary | db-partitioning-sharding-boundary | Data & Consistency | Relational Database Engineering | 1 | 0 |
| lu-db-physical-storage-pages | db-physical-storage-pages | Data & Consistency | Relational Database Engineering | 1 | 0 |
| lu-db-production-diagnosis-transfer | db-production-diagnosis-transfer | Data & Consistency | Relational Database Engineering | 1 | 0 |
| lu-db-replication-failover | db-replication-failover | Data & Consistency | Relational Database Engineering | 1 | 0 |
| lu-db-schema-evolution | db-schema-evolution | Data & Consistency | Relational Database Engineering | 1 | 0 |
| lu-db-transactions-isolation-anomalies | db-transactions-isolation-anomalies | Data & Consistency | Relational Database Engineering | 1 | 0 |
| lu-db-wal-crash-recovery | db-wal-crash-recovery | Data & Consistency | Relational Database Engineering | 1 | 0 |
| lu-nosql-cassandra-lsm-compaction-consistency | nosql-cassandra-lsm-compaction-consistency | Data & Consistency | NoSQL & Specialized Data Systems | 1 | 0 |
| lu-nosql-cassandra-partition-model | nosql-cassandra-partition-model | Data & Consistency | NoSQL & Specialized Data Systems | 1 | 0 |
| lu-nosql-model-selection | nosql-model-selection | Data & Consistency | NoSQL & Specialized Data Systems | 1 | 0 |
| lu-nosql-mongo-aggregate-model | nosql-mongo-aggregate-model | Data & Consistency | NoSQL & Specialized Data Systems | 1 | 0 |
| lu-nosql-mongo-index-shard-transaction | nosql-mongo-index-shard-transaction | Data & Consistency | NoSQL & Specialized Data Systems | 1 | 0 |
| lu-nosql-redis-persistence-replication-cluster-streams | nosql-redis-persistence-replication-cluster-streams | Data & Consistency | NoSQL & Specialized Data Systems | 1 | 0 |
| lu-nosql-redis-structures-memory | nosql-redis-structures-memory | Data & Consistency | NoSQL & Specialized Data Systems | 1 | 0 |
| lu-nosql-search-inverted-index-analysis | nosql-search-inverted-index-analysis | Data & Consistency | NoSQL & Specialized Data Systems | 1 | 0 |
| lu-nosql-search-refresh-shards-pagination | nosql-search-refresh-shards-pagination | Data & Consistency | NoSQL & Specialized Data Systems | 1 | 0 |
| lu-nosql-transfer-storage-choice | nosql-transfer-storage-choice | Data & Consistency | NoSQL & Specialized Data Systems | 1 | 0 |
| lu-cache-capacity-eviction-fallback | cache-capacity-eviction-fallback | Data & Consistency | Cache Engineering | 1 | 0 |
| lu-cache-evidence-transfer | cache-evidence-transfer | Data & Consistency | Cache Engineering | 1 | 0 |
| lu-cache-invalidation-consistency | cache-invalidation-consistency | Data & Consistency | Cache Engineering | 1 | 0 |
| lu-cache-multilayer-coherence | cache-multilayer-coherence | Data & Consistency | Cache Engineering | 1 | 0 |
| lu-cache-need-source-of-truth | cache-need-source-of-truth | Data & Consistency | Cache Engineering | 1 | 0 |
| lu-cache-patterns | cache-patterns | Data & Consistency | Cache Engineering | 1 | 0 |
| lu-cache-stampede-penetration-avalanche-hot-key | cache-stampede-penetration-avalanche-hot-key | Data & Consistency | Cache Engineering | 1 | 0 |
| lu-dist-consensus-coordination-purpose | dist-consensus-coordination-purpose | Distributed Systems | Distributed Systems | 1 | 0 |
| lu-dist-consistency-linearizability | dist-consistency-linearizability | Distributed Systems | Distributed Systems | 1 | 0 |
| lu-dist-guarantee-recovery-transfer | dist-guarantee-recovery-transfer | Distributed Systems | Distributed Systems | 1 | 0 |
| lu-dist-partial-failure-uncertainty | dist-partial-failure-uncertainty | Distributed Systems | Distributed Systems | 1 | 0 |
| lu-dist-partitioning-ownership-rebalancing | dist-partitioning-ownership-rebalancing | Distributed Systems | Distributed Systems | 1 | 0 |
| lu-dist-reconciliation-convergence | dist-reconciliation-convergence | Distributed Systems | Distributed Systems | 1 | 0 |
| lu-dist-replication-leader-quorum | dist-replication-leader-quorum | Distributed Systems | Distributed Systems | 1 | 0 |
| lu-dist-rpc-unknown-completion | dist-rpc-unknown-completion | Distributed Systems | Distributed Systems | 1 | 0 |
| lu-dist-time-order-causality | dist-time-order-causality | Distributed Systems | Distributed Systems | 1 | 0 |
| lu-dist-transactions-2pc-boundary | dist-transactions-2pc-boundary | Distributed Systems | Distributed Systems | 1 | 0 |
| lu-msg-consumer-groups-offsets-rebalance | msg-consumer-groups-offsets-rebalance | Distributed Systems | Messaging & Event-Driven Consistency | 1 | 0 |
| lu-msg-delivery-retry-poison-dlq | msg-delivery-retry-poison-dlq | Distributed Systems | Messaging & Event-Driven Consistency | 1 | 0 |
| lu-msg-external-side-effect-reconciliation | msg-external-side-effect-reconciliation | Distributed Systems | Messaging & Event-Driven Consistency | 1 | 0 |
| lu-msg-lag-backpressure-evidence | msg-lag-backpressure-evidence | Distributed Systems | Messaging & Event-Driven Consistency | 1 | 0 |
| lu-msg-model-queue-topic-partition-order | msg-model-queue-topic-partition-order | Distributed Systems | Messaging & Event-Driven Consistency | 1 | 0 |
| lu-msg-producer-acks-durability | msg-producer-acks-durability | Distributed Systems | Messaging & Event-Driven Consistency | 1 | 0 |
| lu-msg-replay-backfill | msg-replay-backfill | Distributed Systems | Messaging & Event-Driven Consistency | 1 | 0 |
| lu-msg-schema-evolution-contract-ownership | msg-schema-evolution-contract-ownership | Distributed Systems | Messaging & Event-Driven Consistency | 1 | 0 |
| lu-msg-workflow-saga-compensation | msg-workflow-saga-compensation | Distributed Systems | Messaging & Event-Driven Consistency | 1 | 0 |
| lu-api-circuit-bulkhead-rate-limit | api-circuit-bulkhead-rate-limit | Service & Network | API Contracts & Resilience | 1 | 0 |
| lu-api-contract-resource-semantics | api-contract-resource-semantics | Service & Network | API Contracts & Resilience | 1 | 0 |
| lu-api-deadlines-timeout-cancellation | api-deadlines-timeout-cancellation | Service & Network | API Contracts & Resilience | 1 | 0 |
| lu-api-request-identity-idempotency | api-request-identity-idempotency | Service & Network | API Contracts & Resilience | 1 | 0 |
| lu-api-retry-backoff-jitter | api-retry-backoff-jitter | Service & Network | API Contracts & Resilience | 1 | 0 |
| lu-api-unknown-outcome-reconciliation | api-unknown-outcome-reconciliation | Service & Network | API Contracts & Resilience | 1 | 0 |
| lu-api-validation-errors-pagination | api-validation-errors-pagination | Service & Network | API Contracts & Resilience | 1 | 0 |
| lu-api-versioning-compatibility | api-versioning-compatibility | Service & Network | API Contracts & Resilience | 1 | 0 |
| lu-sec-abuse-bruteforce-resource-business-flow | sec-abuse-bruteforce-resource-business-flow | Service & Network | Security | 1 | 0 |
| lu-sec-audit-detection-evidence | sec-audit-detection-evidence | Service & Network | Security | 1 | 0 |
| lu-sec-auth-session-token | sec-auth-session-token | Service & Network | Security | 1 | 0 |
| lu-sec-authorization-object-tenant | sec-authorization-object-tenant | Service & Network | Security | 1 | 0 |
| lu-sec-browser-boundaries-cors-csrf-xss | sec-browser-boundaries-cors-csrf-xss | Service & Network | Security | 1 | 0 |
| lu-sec-injection-ssrf-input-output | sec-injection-ssrf-input-output | Service & Network | Security | 1 | 0 |
| lu-sec-oauth-oidc-awareness | sec-oauth-oidc-awareness | Service & Network | Security | 1 | 0 |
| lu-sec-race-business-logic-abuse | sec-race-business-logic-abuse | Service & Network | Security | 1 | 0 |
| lu-sec-secrets-third-party-trust | sec-secrets-third-party-trust | Service & Network | Security | 1 | 0 |
| lu-sec-trust-boundary-threat-model | sec-trust-boundary-threat-model | Service & Network | Security | 1 | 0 |
| lu-sec-unseen-attack-transfer | sec-unseen-attack-transfer | Service & Network | Security | 1 | 0 |
| lu-obs-cardinality-sampling-cost | obs-cardinality-sampling-cost | Production Engineering | Observability & Performance | 1 | 0 |
| lu-obs-db-io-downstream-attribution | obs-db-io-downstream-attribution | Production Engineering | Observability & Performance | 1 | 0 |
| lu-obs-diagnostic-method | obs-diagnostic-method | Production Engineering | Observability & Performance | 1 | 0 |
| lu-obs-instrumentation-context | obs-instrumentation-context | Production Engineering | Observability & Performance | 1 | 0 |
| lu-obs-latency-throughput-saturation | obs-latency-throughput-saturation | Production Engineering | Observability & Performance | 1 | 0 |
| lu-obs-load-test-benchmark-validity | obs-load-test-benchmark-validity | Production Engineering | Observability & Performance | 1 | 0 |
| lu-obs-logs-structured-correlation | obs-logs-structured-correlation | Production Engineering | Observability & Performance | 1 | 0 |
| lu-obs-profiling-runtime-evidence | obs-profiling-runtime-evidence | Production Engineering | Observability & Performance | 1 | 0 |
| lu-obs-signals-correlation | obs-signals-correlation | Production Engineering | Observability & Performance | 1 | 0 |
| lu-obs-tracing-distributed-evidence | obs-tracing-distributed-evidence | Production Engineering | Observability & Performance | 1 | 0 |
| lu-rel-cascading-failure-queue-capacity | rel-cascading-failure-queue-capacity | Production Engineering | Reliability / SRE | 1 | 0 |
| lu-rel-change-rollout-rollback-risk | rel-change-rollout-rollback-risk | Production Engineering | Reliability / SRE | 1 | 0 |
| lu-rel-dependency-budgets | rel-dependency-budgets | Production Engineering | Reliability / SRE | 1 | 0 |
| lu-rel-disaster-recovery-rpo-rto | rel-disaster-recovery-rpo-rto | Production Engineering | Reliability / SRE | 1 | 0 |
| lu-rel-failure-injection-verification | rel-failure-injection-verification | Production Engineering | Reliability / SRE | 1 | 0 |
| lu-rel-health-readiness-semantics | rel-health-readiness-semantics | Production Engineering | Reliability / SRE | 1 | 0 |
| lu-rel-incident-response-postmortem | rel-incident-response-postmortem | Production Engineering | Reliability / SRE | 1 | 0 |
| lu-rel-overload-load-shedding-degradation | rel-overload-load-shedding-degradation | Production Engineering | Reliability / SRE | 1 | 0 |
| lu-rel-user-journey-sli-slo-budget | rel-user-journey-sli-slo-budget | Production Engineering | Reliability / SRE | 1 | 0 |
| lu-test-ci-flakiness-repeatability | test-ci-flakiness-repeatability | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 | 0 |
| lu-test-failure-resilience | test-failure-resilience | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 | 0 |
| lu-test-migration-compatibility | test-migration-compatibility | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 | 0 |
| lu-test-property-boundary-fuzz | test-property-boundary-fuzz | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 | 0 |
| lu-test-real-dependency-fixtures | test-real-dependency-fixtures | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 | 0 |
| lu-test-review-static-analysis-change-safety | test-review-static-analysis-change-safety | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 | 0 |
| lu-test-risk-strategy-boundaries | test-risk-strategy-boundaries | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 | 0 |
| lu-test-risk-transfer | test-risk-transfer | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 | 0 |
| lu-test-time-concurrency-determinism | test-time-concurrency-determinism | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 | 0 |
| lu-test-unit-integration-contract | test-unit-integration-contract | Architecture & Engineering Reasoning | Testing & Engineering Quality | 1 | 0 |
| lu-arch-boundaries-ownership | arch-boundaries-ownership | Architecture & Engineering Reasoning | Architecture & System Design | 1 | 0 |
| lu-arch-consistency-latency-availability | arch-consistency-latency-availability | Architecture & Engineering Reasoning | Architecture & System Design | 1 | 0 |
| lu-arch-cost-complexity-changeability | arch-cost-complexity-changeability | Architecture & Engineering Reasoning | Architecture & System Design | 1 | 0 |
| lu-arch-data-ownership-source-of-truth | arch-data-ownership-source-of-truth | Architecture & Engineering Reasoning | Architecture & System Design | 1 | 0 |
| lu-arch-decision-communication-transfer | arch-decision-communication-transfer | Architecture & Engineering Reasoning | Architecture & System Design | 1 | 0 |
| lu-arch-evolution-migration-strangler | arch-evolution-migration-strangler | Architecture & Engineering Reasoning | Architecture & System Design | 1 | 0 |
| lu-arch-failure-recovery-security-observability | arch-failure-recovery-security-observability | Architecture & Engineering Reasoning | Architecture & System Design | 1 | 0 |
| lu-arch-requirements-quality-attributes | arch-requirements-quality-attributes | Architecture & Engineering Reasoning | Architecture & System Design | 1 | 0 |
| lu-arch-scale-capacity-partitioning | arch-scale-capacity-partitioning | Architecture & Engineering Reasoning | Architecture & System Design | 1 | 0 |
| lu-arch-sync-async-integration | arch-sync-async-integration | Architecture & Engineering Reasoning | Architecture & System Design | 1 | 0 |
| lu-delivery-artifact-image-config | delivery-artifact-image-config | Production Engineering | Containers / Kubernetes / Cloud Delivery | 1 | 0 |
| lu-delivery-autoscaling-signal-boundary | delivery-autoscaling-signal-boundary | Production Engineering | Containers / Kubernetes / Cloud Delivery | 1 | 0 |
| lu-delivery-cicd-promotion-provenance | delivery-cicd-promotion-provenance | Production Engineering | Containers / Kubernetes / Cloud Delivery | 1 | 0 |
| lu-delivery-cloud-responsibility-managed-services | delivery-cloud-responsibility-managed-services | Production Engineering | Containers / Kubernetes / Cloud Delivery | 1 | 0 |
| lu-delivery-container-process-lifecycle | delivery-container-process-lifecycle | Production Engineering | Containers / Kubernetes / Cloud Delivery | 1 | 0 |
| lu-delivery-graceful-shutdown-draining | delivery-graceful-shutdown-draining | Production Engineering | Containers / Kubernetes / Cloud Delivery | 1 | 0 |
| lu-delivery-platform-evidence-debug | delivery-platform-evidence-debug | Production Engineering | Containers / Kubernetes / Cloud Delivery | 1 | 0 |
| lu-delivery-platform-transfer | delivery-platform-transfer | Production Engineering | Containers / Kubernetes / Cloud Delivery | 1 | 0 |
| lu-delivery-probes-health | delivery-probes-health | Production Engineering | Containers / Kubernetes / Cloud Delivery | 1 | 0 |
| lu-delivery-resources-cpu-memory | delivery-resources-cpu-memory | Production Engineering | Containers / Kubernetes / Cloud Delivery | 1 | 0 |
| lu-delivery-rollout-rollback-strategies | delivery-rollout-rollback-strategies | Production Engineering | Containers / Kubernetes / Cloud Delivery | 1 | 0 |

## lu-index-query-shape

### Identity

- **Working title:** Choose a usable index key path
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-index-structures | Relational Database Engineering | L3 |
| db-composite-query-shape | Relational Database Engineering | L3 |

### Why these capabilities belong together

Frozen dry-run grouping preserves one shared causal mechanism and assessment boundary.

### Working canonical problem / case anchor

Index có nhưng predicate path không dùng; low selectivity; redundant index; write amplification.

### State / data / mechanism trace

Index giữ key-to-row navigation; useful predicate/order cho phép engine prune vùng dữ liệu thay vì scan toàn bộ.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| db-index-structures | db-composite-query-shape | an ordered/searchable index only narrows rows according to the key path the query can use. | INTERNAL | Both Primary capabilities share one mechanism/evidence boundary. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Plan access node; rows; buffers; index usage; index size/write behavior.

### Production boundary / trade-off

Read pruning đổi lấy index maintenance/storage khi insert/update/delete.

### Transfer variation

Từ PostgreSQL B-tree sang clustered/secondary-index khác biệt của SQL Server/InnoDB.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-execution-plan-estimates

### Identity

- **Working title:** Read execution pipeline and judge estimates
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-execution-operators | Relational Database Engineering | L3 |
| db-optimizer-cardinality-stats | Relational Database Engineering | L3 |

### Why these capabilities belong together

Frozen dry-run grouping preserves one shared causal mechanism and assessment boundary.

### Working canonical problem / case anchor

Nested loop trên input lớn; large/spilled sort; row explosion trước aggregate; đọc operator theo thứ tự câu SQL.

### State / data / mechanism trace

Scan tạo input; join kết hợp; sort/aggregate materialize/consume rows; limit có thể dừng sớm, nên SQL text không phải execution order.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| db-execution-operators | db-optimizer-cardinality-stats | the optimizer chooses among physical execution operators. | INTERNAL | Both Primary capabilities share one mechanism/evidence boundary. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

EXPLAIN ANALYZE; actual rows; loops; timing; memory/temp work.

### Production boundary / trade-off

Operator phù hợp phụ thuộc cardinality/input, không có “join tốt nhất” tách khỏi dữ liệu.

### Transfer variation

Từ lookup join nhỏ sang join với estimate sai và input lớn.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-race-atomicity

### Identity

- **Working title:** Protect an invariant across unsafe interleaving
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| concurrency-interleavings-invariants | Concurrency & Async | L3 |
| concurrency-races-check-then-act | Concurrency & Async | L3 |
| concurrency-synchronization-atomicity | Concurrency & Async | L3 |

### Why these capabilities belong together

Frozen dry-run grouping preserves one shared causal mechanism and assessment boundary.

### Working canonical problem / case anchor

Oversell inventory; duplicate reservation; lost update; negative balance.

### State / data / mechanism trace

Khi hai operation overlap, read/validate/write có thể xen kẽ; invariant chỉ giữ nếu transition được atomically protected ở đúng owner.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| prog-invariants-domain-model | concurrency-interleavings-invariants | state invariant under transition | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| concurrency-interleavings-invariants | concurrency-synchronization-atomicity | unsafe interleaving and critical transition | INTERNAL | Both Primary capabilities share one mechanism/evidence boundary. |
| concurrency-interleavings-invariants | concurrency-races-check-then-act | interleaved shared-state change | INTERNAL | Both Primary capabilities share one mechanism/evidence boundary. |

### Local Prerequisite Slices

- `prog-invariants-domain-model`: **state invariant under transition**; introduced only for `concurrency-interleavings-invariants`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Step trace; concurrent test barrier; before/after state; affected-row count; audit sequence.

### Production boundary / trade-off

Single-thread reasoning đơn giản nhưng không còn đúng khi request overlap; chọn serialization hoặc atomic store operation theo invariant scope.

### Transfer variation

Từ in-memory counter sang order reservation trong database.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-outbox-duplicate-safe-effect

### Identity

- **Working title:** Persist producer intent and make consumer effect duplicate-safe
- **Learner-facing domain candidate:** Distributed Systems

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-outbox-db-publish-gap | Messaging & Event-Driven Consistency | L3 |
| msg-consumer-idempotency-inbox | Messaging & Event-Driven Consistency | L3 |

### Why these capabilities belong together

Frozen dry-run grouping preserves one shared causal mechanism and assessment boundary.

### Working canonical problem / case anchor

DB commit but no publish; broker accepts but relay timeout; retry duplicate; outbox stuck.

### State / data / mechanism trace

Business state and broker are separate transactional systems; crash can happen between commit, relay publish and relay acknowledgement.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| msg-delivery-retry-poison-dlq | msg-consumer-idempotency-inbox | repeated delivery of one logical message after failure or retry | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| db-transactions-isolation-anomalies | msg-consumer-idempotency-inbox | one local database transaction can atomically bind deduplication record and business state | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| msg-model-queue-topic-partition-order | msg-outbox-db-publish-gap | broker publication boundary is distinct from local database commit | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| db-transactions-isolation-anomalies | msg-outbox-db-publish-gap | atomic local database commit boundary | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| dist-partial-failure-uncertainty | msg-outbox-db-publish-gap | one component or communication step may fail independently between two effects | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `msg-delivery-retry-poison-dlq`: **repeated delivery of one logical message after failure or retry**; introduced only for `msg-consumer-idempotency-inbox`, without source coverage or `PASSED` evidence.
- `db-transactions-isolation-anomalies`: **one local database transaction can atomically bind deduplication record and business state**; introduced only for `msg-consumer-idempotency-inbox`, without source coverage or `PASSED` evidence.
- `msg-model-queue-topic-partition-order`: **broker publication boundary is distinct from local database commit**; introduced only for `msg-outbox-db-publish-gap`, without source coverage or `PASSED` evidence.
- `db-transactions-isolation-anomalies`: **atomic local database commit boundary**; introduced only for `msg-outbox-db-publish-gap`, without source coverage or `PASSED` evidence.
- `dist-partial-failure-uncertainty`: **one component or communication step may fail independently between two effects**; introduced only for `msg-outbox-db-publish-gap`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Business row; outbox status; relay attempt; broker metadata; consumer ledger.

### Production boundary / trade-off

Eventual relay/retry complexity trades for removing dual-write loss window.

### Transfer variation

Kafka relay → RabbitMQ while DB/broker boundary remains.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-prog-api-refactoring-change-safety

### Identity

- **Working title:** prog-api-refactoring-change-safety
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| prog-api-refactoring-change-safety | Programming & Software Design Foundations | L4 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Breaking response field; caller còn phụ thuộc hành vi cũ; refactor đổi validation ngầm; test chỉ khớp implementation.

### State / data / mechanism trace

Tách public contract khỏi implementation; thay đổi dữ liệu hoặc error semantics phải đi qua adapter/version hoặc một migration boundary có chủ đích.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| prog-errors-results | prog-api-refactoring-change-safety | observable error/result contract and failure semantics | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| prog-invariants-domain-model | prog-api-refactoring-change-safety | valid state and behavior invariant | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `prog-errors-results`: **observable error/result contract and failure semantics**; introduced only for `prog-api-refactoring-change-safety`, without source coverage or `PASSED` evidence.
- `prog-invariants-domain-model`: **valid state and behavior invariant**; introduced only for `prog-api-refactoring-change-safety`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Contract test của consumer; golden response; diff OpenAPI; test hành vi trước/sau; telemetry của endpoint cũ.

### Production boundary / trade-off

Giữ compatibility làm tăng thời gian duy trì và test matrix; cắt ngay chỉ hợp lý khi caller được kiểm soát và migration có kế hoạch.

### Transfer variation

Từ API nội bộ cùng repo sang public API có client độc lập và rollout từng nhóm.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-prog-collections-complexity

### Identity

- **Working title:** prog-collections-complexity
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| prog-collections-complexity | Programming & Software Design Foundations | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Linear scan trên request nóng; nested loop O(n²); giả định thứ tự sai; duplicate key bị bỏ qua.

### State / data / mechanism trace

Mỗi cấu trúc đổi chi phí lookup, insert, remove, ordering và memory; đo thao tác thực tế thay vì suy từ tên collection.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Kích thước input; số lần lookup; benchmark/profile; assertion về ordering và uniqueness.

### Production boundary / trade-off

List đơn giản, ít overhead; Dictionary/HashSet nhanh hơn cho lookup nhưng tốn memory và không tự có order nghiệp vụ.

### Transfer variation

Từ danh sách nhỏ trong memory sang lookup theo key của batch lớn hoặc read model.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-prog-composition-dependencies

### Identity

- **Working title:** prog-composition-dependencies
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| prog-composition-dependencies | Programming & Software Design Foundations | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Service locator; dependency ẩn; vòng phụ thuộc; domain gọi thẳng database/HTTP adapter.

### State / data / mechanism trace

Dependency chỉ được tạo ở composition root; core code phụ thuộc contract do core sở hữu, không đi ngược vào adapter hạ tầng.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Dependency graph; constructor signatures; architecture test; unit test thay adapter bằng fake.

### Production boundary / trade-off

Thêm interface chỉ có giá trị ở boundary có biến thể/test seam; quá nhiều abstraction che mất flow và tăng chi phí thay đổi.

### Transfer variation

Từ monolith một process sang module có adapter message broker hoặc persistence riêng.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-prog-errors-results

### Identity

- **Working title:** prog-errors-results
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| prog-errors-results | Programming & Software Design Foundations | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Nuốt exception; map lỗi domain thành 500 hoặc ngược lại; retry một lỗi validation; trả success khi mới làm xong một phần.

### State / data / mechanism trace

Result/domain error là phần contract dự đoán được; exception giữ stack/context cho lỗi bất ngờ; partial state cần được ghi nhận thay vì giả thành success.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Call stack; returned error code; audit/result record; log có correlation ID; test mapping ở API boundary.

### Production boundary / trade-off

Expose error chi tiết giúp caller xử lý nhưng có thể lộ implementation; normalize ở trust boundary, giữ nguyên nhân nội bộ cho trace.

### Transfer variation

Từ validation trong process sang payment call timeout với kết quả chưa chắc chắn.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-prog-invariants-domain-model

### Identity

- **Working title:** prog-invariants-domain-model
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| prog-invariants-domain-model | Programming & Software Design Foundations | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Invalid transition; business rule bị copy ở nhiều handler; race vượt qua validation; persisted state vi phạm rule.

### State / data / mechanism trace

Invariant là điều luôn đúng cho aggregate/record; validation gần state transition và DB constraint bảo vệ khi nhiều đường ghi cùng tồn tại.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

State before/after; state-machine test; affected-row count; unique/check constraint; concurrent test.

### Production boundary / trade-off

Domain guard diễn đạt nghiệp vụ rõ; database constraint bảo vệ cuối cùng nhưng không thay thế message lỗi và flow ở domain.

### Transfer variation

Từ object trong memory sang nhiều request cùng đổi một order trong database.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-prog-resource-ownership

### Identity

- **Working title:** prog-resource-ownership
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| prog-resource-ownership | Programming & Software Design Foundations | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Connection/stream leak; dùng resource đã dispose; scope dài hơn request; buffer trả pool khi còn consumer.

### State / data / mechanism trace

Owner chịu trách nhiệm lifetime; borrower không dispose resource không tạo; async flow phải giữ resource sống đến khi consumer cuối hoàn thành.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Open handle/connection count; dispose/finalization trace; connection-pool state; test double ghi lifetime.

### Production boundary / trade-off

Scope ngắn giảm leak nhưng không được dispose tài nguyên caller vẫn dùng; ownership rõ quan trọng hơn “dispose ở mọi chỗ”.

### Transfer variation

Từ FileStream cục bộ sang response stream và pooled buffer qua async pipeline.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-prog-types-generics

### Identity

- **Working title:** prog-types-generics
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| prog-types-generics | Programming & Software Design Foundations | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Invalid state vẫn tạo được; unsafe cast; null đi qua boundary; generic API quá rộng và caller hiểu sai capability.

### State / data / mechanism trace

Type, nullability và generic constraint mô tả tập giá trị/operation hợp lệ trước runtime; boundary chuyển input không tin cậy thành type nội bộ hợp lệ.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Compiler/nullability diagnostics; API-boundary tests; generic constraint compile test; invalid-input test.

### Production boundary / trade-off

Type chặt giúp loại lỗi sớm nhưng có thể tăng số model/mapper; không dùng generic để che các operation khác nghĩa.

### Transfer variation

Từ C# nullable reference types và constraint sang Java generics/nullable annotation khác nhau.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-prog-values-identity

### Identity

- **Working title:** prog-values-identity
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| prog-values-identity | Programming & Software Design Foundations | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Shared mutation bất ngờ; Equals/GetHashCode không nhất quán; Dictionary/Set identity surprise; cache key dùng sai equality.

### State / data / mechanism trace

Hai biến có thể cùng trỏ một mutable object; equality có thể dựa value còn identity dựa instance, nên mutation qua một alias đổi state nhìn thấy ở alias kia.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Object-state trace; unit test trước/sau mutation; debugger object ID/reference; collection lookup result.

### Production boundary / trade-off

Mutable reference tiện cập nhật chung nhưng khó kiểm soát alias; value/immutable design dễ suy luận hơn nhưng có allocation/copy cost.

### Transfer variation

Từ DTO mutable dùng chung sang value object/record immutable trong domain.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-runtime-allocation-gc

### Identity

- **Working title:** runtime-allocation-gc
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| runtime-allocation-gc | Runtime & Memory | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

High allocation rate; frequent GC; pause dài; CPU overhead do GC.

### State / data / mechanism trace

Allocation tạo object trên managed heap; khi vùng nhớ cần thu hồi, GC tìm object còn reachable rồi dọn phần còn lại, nên tốc độ cấp phát quyết định tần suất và chi phí collection.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| runtime-memory-roots-lifetime | runtime-allocation-gc | reachability from GC roots | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `runtime-memory-roots-lifetime`: **reachability from GC roots**; introduced only for `runtime-allocation-gc`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Allocation rate; GC count/time; heap size; generation size; request latency lúc collection.

### Production boundary / trade-off

Reuse chỉ đáng giá khi allocation thật sự chi phối; pooling sai có thể giữ memory lâu hơn và làm latency xấu hơn.

### Transfer variation

Từ request nhỏ ổn định sang batch serialization lớn có burst allocation.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-runtime-diagnostics

### Identity

- **Working title:** runtime-diagnostics
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| runtime-diagnostics | Runtime & Memory | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Collecting wrong evidence; dump sau khi symptom biến mất; kết luận leak từ heap size đơn lẻ.

### State / data / mechanism trace

Counter trả lời xu hướng; trace cho timeline/causal activity; dump/profile cho object hoặc stack tại thời điểm; tool phải khớp câu hỏi.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Hypothesis viết trước; counter time series; trace span/stack; heap dump; profile hotspot.

### Production boundary / trade-off

Trace/dump có overhead và dữ liệu nhạy cảm; bắt đầu bằng tín hiệu rẻ, escalates khi cần state chi tiết.

### Transfer variation

Từ CPU tăng cục bộ sang incident memory leak trên pod đã restart nhiều lần.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-runtime-jit-warmup

### Identity

- **Working title:** runtime-jit-warmup
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| runtime-jit-warmup | Runtime & Memory | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Benchmark đo warm-up như steady workload; first request latency bị che; kết luận sai từ một lần chạy.

### State / data / mechanism trace

Lần gọi đầu có thể kích hoạt load, JIT và cache initialization; repeated run mới gần steady state.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

First-request latency; repeated-run timing; JIT counters/events; startup trace.

### Production boundary / trade-off

Pre-warm giảm cold latency nhưng tốn startup work và không thay thế capacity planning.

### Transfer variation

Từ CLI chạy một lần sang web service vừa scale-out nhiều instance.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-runtime-managed-execution

### Identity

- **Working title:** runtime-managed-execution
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| runtime-managed-execution | Runtime & Memory | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Gọi mọi latency là “CLR chậm”; nhầm managed thread với OS process; sửa code khi bottleneck là native I/O.

### State / data / mechanism trace

Application tạo managed work; runtime quản lý execution/memory; native/OS cung cấp thread, virtual memory, socket/file scheduling nên symptom có thể vượt lớp application.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Managed stack; runtime counters; OS process/thread view; native wait/sockets.

### Production boundary / trade-off

Managed runtime che nhiều detail nhưng không xoá giới hạn OS; chọn evidence từ lớp tạo ra symptom.

### Transfer variation

Từ .NET service sang JVM service chạy cùng Linux/container boundary.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-runtime-memory-performance-debug

### Identity

- **Working title:** runtime-memory-performance-debug
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| runtime-memory-performance-debug | Runtime & Memory | L4 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Treating retention as GC tuning; pooling để che leak; mitigation giảm allocation nhưng tăng retained heap.

### State / data / mechanism trace

Allocation, GC và retention tạo các dấu hiệu khác nhau; thay một biến rồi đo lại mới phân biệt causal effect.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| runtime-diagnostics | runtime-memory-performance-debug | hypothesis-driven evidence selection | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| runtime-retention-pooling-large-objects | runtime-memory-performance-debug | allocation vs pooling vs retention | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `runtime-diagnostics`: **hypothesis-driven evidence selection**; introduced only for `runtime-memory-performance-debug`, without source coverage or `PASSED` evidence.
- `runtime-retention-pooling-large-objects`: **allocation vs pooling vs retention**; introduced only for `runtime-memory-performance-debug`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Symptom timeline; allocation/GC counters; retaining path; controlled before/after experiment; post-change latency.

### Production boundary / trade-off

Giảm allocation không tự động giảm tail latency; mitigation phải giữ correctness và resource ceiling.

### Transfer variation

Chuyển cách chẩn đoán sang JVM: allocation profiler, GC log và retaining path tương đương.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-runtime-memory-roots-lifetime

### Identity

- **Working title:** runtime-memory-roots-lifetime
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| runtime-memory-roots-lifetime | Runtime & Memory | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Unexpected retention; event handler giữ subscriber; cache/list vô hạn; closure giữ graph lớn.

### State / data / mechanism trace

Object sống khi có đường reference từ GC root như stack, static, handle hoặc long-lived collection; scope source code không đồng nghĩa object hết reachable.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| runtime-managed-execution | runtime-memory-roots-lifetime | managed runtime/process boundary | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `runtime-managed-execution`: **managed runtime/process boundary**; introduced only for `runtime-memory-roots-lifetime`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Heap graph; retaining path; root type; object count/size theo thời gian.

### Production boundary / trade-off

Cache có thể là retention có chủ đích; phải đặt size/TTL/eviction thay vì gọi mọi object sống là leak.

### Transfer variation

Từ List static sang subscription registry hoặc scoped service bị capture bởi singleton.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-runtime-retention-pooling-large-objects

### Identity

- **Working title:** runtime-retention-pooling-large-objects
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| runtime-retention-pooling-large-objects | Runtime & Memory | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Pool retains too much; large buffers repeatedly allocated; long-lived owner giữ object graph; wrong-size buffer reuse.

### State / data / mechanism trace

Retention là object còn reachable; pool chủ động giữ object để reuse; buffer lớn có allocation/lifetime cost riêng, và pool có thể biến allocation pressure thành retained heap.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| runtime-allocation-gc | runtime-retention-pooling-large-objects | allocation pressure and collection behavior | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `runtime-allocation-gc`: **allocation pressure and collection behavior**; introduced only for `runtime-retention-pooling-large-objects`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Heap dump; generation/size distribution; pool counters; allocation trace của large buffer.

### Production boundary / trade-off

Pool giảm churn khi reuse thực; cần limit và return discipline, còn buffer hiếm khi dùng nên để GC có thể đơn giản hơn.

### Transfer variation

Từ byte[] export lớn sang HTTP streaming với buffer size và concurrency khác.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-os-blocking-io-waits

### Identity

- **Working title:** os-blocking-io-waits
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| os-blocking-io-waits | Operating Systems & I/O Foundations | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Blocking request path; sync I/O giữ worker; queue growth; timeout do worker starvation.

### State / data / mechanism trace

File/socket/database operation hoàn tất qua kernel/external system; blocking giữ execution thread chờ, async cho phép thread làm work khác trong khi completion chưa tới.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| os-files-handles-sockets-ipc | os-blocking-io-waits | finite OS resource operation and external completion | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `os-files-handles-sockets-ipc`: **finite OS resource operation and external completion**; introduced only for `os-blocking-io-waits`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Blocked stack; wait time; worker/runtime queue; thread count; request queue growth.

### Production boundary / trade-off

Sync đơn giản trong batch thấp tải; request path concurrent cần tránh giữ finite worker khi chủ yếu chờ I/O.

### Transfer variation

Từ file read trong worker sang outbound HTTP/database call dưới tải.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-os-files-handles-sockets-ipc

### Identity

- **Working title:** os-files-handles-sockets-ipc
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| os-files-handles-sockets-ipc | Operating Systems & I/O Foundations | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

FD/handle leak; socket exhaustion; close quá sớm; IPC endpoint không được release.

### State / data / mechanism trace

Process giữ handle trỏ tới kernel resource; dispose/close giải phóng reference/quota, còn connection pool là owner layer khác với raw socket.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| os-process-thread-kernel | os-files-handles-sockets-ipc | process resource context and user/kernel boundary | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `os-process-thread-kernel`: **process resource context and user/kernel boundary**; introduced only for `os-files-handles-sockets-ipc`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Open handle count; socket states; per-process limits; connection-pool state; OS error code.

### Production boundary / trade-off

Reuse giảm setup cost nhưng giữ handle lâu; close per operation giảm retention nhưng có thể cạn ephemeral port.

### Transfer variation

Từ local file handle sang HttpClient socket pool hoặc Unix/Named Pipe IPC.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-os-process-thread-kernel

### Identity

- **Working title:** os-process-thread-kernel
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| os-process-thread-kernel | Operating Systems & I/O Foundations | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Nhầm process isolation với thread isolation; assume thread crash chỉ ảnh hưởng một request; debug memory ở sai process.

### State / data / mechanism trace

Process có address space/handle table riêng; threads trong một process chia memory; kernel thực hiện privileged I/O/scheduling trên behalf của process.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Process tree; thread list; address-space metrics; stack location user vs kernel.

### Production boundary / trade-off

Tách process tăng isolation nhưng tăng IPC/deployment overhead; thêm thread không tạo process boundary mới.

### Transfer variation

Từ worker đơn process sang container nhiều process hoặc sidecar.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-os-resource-exhaustion

### Identity

- **Working title:** os-resource-exhaustion
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| os-resource-exhaustion | Operating Systems & I/O Foundations | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

OOM/kill; thread creation failure; too many open files; socket/ephemeral-port exhaustion.

### State / data / mechanism trace

Mỗi resource có quota và reclaim path khác: memory pressure/working set, finite runnable threads, kernel handles, socket/port state.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| os-process-thread-kernel | os-resource-exhaustion | finite thread/process/memory resources | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| os-files-handles-sockets-ipc | os-resource-exhaustion | handle/socket capacity and lifetime | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `os-process-thread-kernel`: **finite thread/process/memory resources**; introduced only for `os-resource-exhaustion`, without source coverage or `PASSED` evidence.
- `os-files-handles-sockets-ipc`: **handle/socket capacity and lifetime**; introduced only for `os-resource-exhaustion`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

RSS/working set and OOM event; thread count/queue; handle count/limit; socket state/port count.

### Production boundary / trade-off

Tăng limit chỉ trì hoãn leak hoặc overload; cap concurrency/lifetime trước, rồi capacity plan theo resource thực sự cạn.

### Transfer variation

Từ bare process có OS limit sang container cgroup memory và orchestrator restart.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-os-scheduling-starvation

### Identity

- **Working title:** os-scheduling-starvation
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| os-scheduling-starvation | Operating Systems & I/O Foundations | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Work tồn tại nhưng không được CPU; thread-pool starvation; priority imbalance; queue tăng dù downstream đã sẵn sàng.

### State / data / mechanism trace

Scheduler chỉ chạy một số runnable threads theo CPU/time slice; blocking/wait và runnable queue là trạng thái khác nhau, starvation là lack of forward progress.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| os-process-thread-kernel | os-scheduling-starvation | runnable execution unit and scheduling boundary | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `os-process-thread-kernel`: **runnable execution unit and scheduling boundary**; introduced only for `os-scheduling-starvation`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

CPU utilization; runnable/thread queue; runtime queue; blocked stack; no-forward-progress timeline.

### Production boundary / trade-off

Tăng thread không sửa CPU-bound saturation; giới hạn parallelism bảo vệ latency nhưng giảm peak throughput.

### Transfer variation

Từ single worker CPU-bound sang nhiều tasks trong container CPU limit.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-os-termination-graceful-shutdown

### Identity

- **Working title:** os-termination-graceful-shutdown
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| os-termination-graceful-shutdown | Operating Systems & I/O Foundations | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Dropped request/message; half-written file/response; accept work sau drain; process bị kill trước cleanup.

### State / data / mechanism trace

Termination signal mở một lifetime deadline; service ngừng nhận work mới, hoàn tất hoặc cancel work đang chạy, flush/release owner resources rồi exit trước deadline.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| os-process-thread-kernel | os-termination-graceful-shutdown | process lifetime and termination | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `os-process-thread-kernel`: **process lifetime and termination**; introduced only for `os-termination-graceful-shutdown`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Signal timestamp; active request/message count; drain duration; cancellation log; exit code; unfinished work record.

### Production boundary / trade-off

Drain dài tăng graceful chance nhưng chậm rollout; deadline bắt buộc force exit nên critical work cần durable handoff trước đó.

### Transfer variation

Từ bare process SIGTERM/CTRL+C sang container preStop/termination grace period.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-os-virtual-memory-page-cache

### Identity

- **Working title:** os-virtual-memory-page-cache
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| os-virtual-memory-page-cache | Operating Systems & I/O Foundations | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Nhầm page cache với application leak; OOM vì chỉ nhìn managed heap; kỳ vọng cold disk latency sau cache warm.

### State / data / mechanism trace

Virtual address space ánh xạ memory; working set là phần resident; OS page cache giữ page file/disk để read sau có thể phục vụ từ RAM.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| os-process-thread-kernel | os-virtual-memory-page-cache | virtual address-space boundary | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `os-process-thread-kernel`: **virtual address-space boundary**; introduced only for `os-virtual-memory-page-cache`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

RSS/working set; page faults; file I/O counters; cache reclaim; cold/warm read timing.

### Production boundary / trade-off

Page cache tăng tốc disk-backed read nhưng cạnh tranh RAM với process; không pin cache như một application source of truth.

### Transfer variation

Từ local file scan sang database/data volume trên container host.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-concurrency-async-parallelism

### Identity

- **Working title:** concurrency-async-parallelism
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| concurrency-async-parallelism | Concurrency & Async | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Wrap sync I/O trong Task.Run; nghĩ await tăng CPU throughput; tạo parallelism vô hạn cho downstream I/O.

### State / data / mechanism trace

Async không tự tạo thread; concurrency là overlap lifetime; parallelism là nhiều work thực sự chạy đồng thời khi CPU/capacity cho phép.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| os-blocking-io-waits | concurrency-async-parallelism | external I/O wait lifetime | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `os-blocking-io-waits`: **external I/O wait lifetime**; introduced only for `concurrency-async-parallelism`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Timeline task/thread; CPU; active operations; request latency; queue depth.

### Production boundary / trade-off

Async giúp không giữ thread khi chờ I/O nhưng không thay capacity; parallel CPU-bound work bị giới hạn core/CPU quota.

### Transfer variation

Từ một HTTP call async sang CPU transform trong consumer nhiều partition.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-concurrency-bounded-backpressure

### Identity

- **Working title:** concurrency-bounded-backpressure
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| concurrency-bounded-backpressure | Concurrency & Async | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Unbounded in-flight tasks; queue/memory growth; pool exhaustion; p99 tăng dù throughput không tăng.

### State / data / mechanism trace

Arrival rate lớn hơn service rate làm in-flight work tích tụ; bounded queue/semaphore buộc producer wait, reject hoặc shed thay vì giữ work vô hạn.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| concurrency-async-parallelism | concurrency-bounded-backpressure | concurrent in-flight operations | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `concurrency-async-parallelism`: **concurrent in-flight operations**; introduced only for `concurrency-bounded-backpressure`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

In-flight count; queue depth; pool usage; throughput; p95/p99; rejection/wait time.

### Production boundary / trade-off

Parallelism cao có thể tăng throughput trước khi làm downstream quá tải; bound hy sinh burst acceptance để giữ resource and latency predictable.

### Transfer variation

Từ một worker sang nhiều replicas cùng chia database/partner quota.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-concurrency-cancellation-lifetime

### Identity

- **Working title:** concurrency-cancellation-lifetime
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| concurrency-cancellation-lifetime | Concurrency & Async | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Token không được forward; continue expensive work sau disconnect; cancel giữa side effect gây unknown outcome; dispose khi child còn dùng.

### State / data / mechanism trace

CancellationToken báo owner rằng result không còn cần hoặc deadline đã hết; code phải observe signal, stop safely và không coi cancel là rollback của side effect đã commit.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| concurrency-async-parallelism | concurrency-cancellation-lifetime | async operation lifetime | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| prog-resource-ownership | concurrency-cancellation-lifetime | ownership and authority to end lifetime | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `concurrency-async-parallelism`: **async operation lifetime**; introduced only for `concurrency-cancellation-lifetime`, without source coverage or `PASSED` evidence.
- `prog-resource-ownership`: **ownership and authority to end lifetime**; introduced only for `concurrency-cancellation-lifetime`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Token propagation trace; active operation count; cancellation log; audit state; cleanup/timeout test.

### Production boundary / trade-off

Cancellation nhanh giảm waste nhưng cleanup cần bounded; critical durable operation cần recovery path thay vì giả định cancel hoàn tác.

### Transfer variation

Từ request-aborted sang hosted worker shutdown và message lease expiry.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-concurrency-deadlock-starvation

### Identity

- **Working title:** concurrency-deadlock-starvation
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| concurrency-deadlock-starvation | Concurrency & Async | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Lock-order deadlock; sync-over-async deadlock; thread-pool starvation; unfair queue.

### State / data / mechanism trace

Deadlock là cycle wait không actor nào tự đi tiếp; starvation là work sẵn sàng nhưng mãi không được capacity/resource.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| concurrency-synchronization-atomicity | concurrency-deadlock-starvation | synchronization ownership and wait | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `concurrency-synchronization-atomicity`: **synchronization ownership and wait**; introduced only for `concurrency-deadlock-starvation`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Wait graph; blocked stacks; lock ownership; queue age; no-forward-progress timeline.

### Production boundary / trade-off

Serialization giảm race nhưng tăng contention; timeout chỉ phát hiện/thoát một số case, không thay lock order/capacity design.

### Transfer variation

Từ two-lock code path sang thread-pool starvation sau synchronous external call.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-concurrency-local-vs-distributed

### Identity

- **Working title:** concurrency-local-vs-distributed
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| concurrency-local-vs-distributed | Concurrency & Async | L4 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

In-process lock không bảo vệ cross-replica; duplicate side effect; split ownership; coordinator unavailable.

### State / data / mechanism trace

Lock trong process chỉ serializes threads cùng address space; bốn replicas có bốn lock, nên shared state cần DB atomicity, partition owner hoặc distributed coordination có explicit failure model.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| concurrency-races-check-then-act | concurrency-local-vs-distributed | synchronization authority scope | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `concurrency-races-check-then-act`: **synchronization authority scope**; introduced only for `concurrency-local-vs-distributed`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Replica IDs trong trace; concurrent calls tới bốn instance; DB affected rows/constraint; ownership metrics.

### Production boundary / trade-off

DB atomic operation đơn giản khi state ở DB; distributed lock thêm lease/failure complexity và không tự tạo business idempotency.

### Transfer variation

Chuyển từ local lock sang DB atomicity hoặc partitioned distributed ownership.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-concurrency-memory-visibility

### Identity

- **Working title:** concurrency-memory-visibility
- **Learner-facing domain candidate:** Runtime & Concurrency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| concurrency-memory-visibility | Concurrency & Async | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Spin loop không thấy flag; đọc object half-published; assume field assignment đủ synchronization.

### State / data / mechanism trace

CPU/compiler có thể reorder/cache reads; volatile, lock hoặc interlocked tạo memory-order guarantees phù hợp để published state được quan sát đúng.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| concurrency-interleavings-invariants | concurrency-memory-visibility | shared state across execution contexts | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `concurrency-interleavings-invariants`: **shared state across execution contexts**; introduced only for `concurrency-memory-visibility`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Controlled repro; trace timestamps; thread dump; code review primitive; memory model documentation.

### Production boundary / trade-off

Stronger synchronization có cost/contention; không dùng volatile để biến compound transition thành atomic.

### Transfer variation

So sánh .NET memory semantics với JMM về visibility và happens-before.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-net-connection-reuse-pooling

### Identity

- **Working title:** net-connection-reuse-pooling
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| net-connection-reuse-pooling | Networking & HTTP | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Socket/ephemeral-port exhaustion; stale pooled connection; pool limit queueing; new client per request.

### State / data / mechanism trace

Mỗi connection có handshake/socket/port cost; pool giữ connection usable theo lifetime/limit, nhưng network peer có thể đóng connection ngoài kiến thức client.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| net-tcp-connection-semantics | net-connection-reuse-pooling | establishment, lifetime and closure | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `net-tcp-connection-semantics`: **establishment, lifetime and closure**; introduced only for `net-connection-reuse-pooling`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Pool counters/state; socket states; port usage; connection setup time; reset/retry trace.

### Production boundary / trade-off

Reuse giảm setup cost nhưng giữ resource và cần lifetime/rotation; pool limit bảo vệ downstream nhưng có thể tạo wait queue.

### Transfer variation

Từ one outbound dependency sang nhiều replicas cùng mở connection tới một partner.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-net-failure-localization-unknown-outcome

### Identity

- **Working title:** net-failure-localization-unknown-outcome
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| net-failure-localization-unknown-outcome | Networking & HTTP | L4 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Retry duplicate after unknown outcome; gán TLS lỗi thành HTTP 500; treat DNS failure as server rejection; mất correlation qua proxy.

### State / data / mechanism trace

Request path qua nhiều layer; timeout sau write không chứng minh server chưa tạo side effect, nên retry cần status query/idempotency contract chứ không chỉ exception type.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| net-request-path-dns | net-failure-localization-unknown-outcome | name-resolution failure stage | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| net-tcp-connection-semantics | net-failure-localization-unknown-outcome | connection establishment and reset stage | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| net-tls-trust-handshake | net-failure-localization-unknown-outcome | TLS negotiation and trust stage | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| net-http-semantics | net-failure-localization-unknown-outcome | response semantics as stage evidence | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `net-request-path-dns`: **name-resolution failure stage**; introduced only for `net-failure-localization-unknown-outcome`, without source coverage or `PASSED` evidence.
- `net-tcp-connection-semantics`: **connection establishment and reset stage**; introduced only for `net-failure-localization-unknown-outcome`, without source coverage or `PASSED` evidence.
- `net-tls-trust-handshake`: **TLS negotiation and trust stage**; introduced only for `net-failure-localization-unknown-outcome`, without source coverage or `PASSED` evidence.
- `net-http-semantics`: **response semantics as stage evidence**; introduced only for `net-failure-localization-unknown-outcome`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

DNS result/timing; socket/TLS error; HTTP status/header; client/server/proxy trace; operation ID and audit state.

### Production boundary / trade-off

Retry nhanh cải thiện transient failure nhưng có thể nhân side effect; recovery contract phải định nghĩa query/reconcile before repeat.

### Transfer variation

Từ local function failure sang remote service call qua proxy/LB và async callback.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-net-http-semantics

### Identity

- **Working title:** net-http-semantics
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| net-http-semantics | Networking & HTTP | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

GET có side effect; status success che validation failure; cache sai vì missing header; body contract thay đổi im lặng.

### State / data / mechanism trace

Method nêu intent; status nêu kết quả ở boundary; headers điều khiển metadata/caching/auth/content negotiation; body mang representation có lifecycle riêng.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Request/response capture; OpenAPI; contract tests; status distribution; cache header inspection.

### Production boundary / trade-off

REST convention giúp interoperability nhưng không thay domain contract; thêm status/header không bù cho error body mơ hồ.

### Transfer variation

Từ internal API sang public endpoint có cache/proxy/client khác version.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-net-proxy-lb-forwarded-boundary

### Identity

- **Working title:** net-proxy-lb-forwarded-boundary
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| net-proxy-lb-forwarded-boundary | Networking & HTTP | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Blind trust forwarded headers; spoofed client IP/scheme; redirect loop; auth/rate-limit dùng sai identity.

### State / data / mechanism trace

App chỉ nên tin forwarded metadata khi request đến từ known proxy/LB đã strip/append đúng; client bên ngoài có thể tự gửi header giả.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| net-http-semantics | net-proxy-lb-forwarded-boundary | request and header semantics | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `net-http-semantics`: **request and header semantics**; introduced only for `net-proxy-lb-forwarded-boundary`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Proxy config; remote IP; raw forwarded headers; trusted-network list; app/proxy access logs.

### Production boundary / trade-off

Forwarded metadata cần cho HTTPS redirect/client IP nhưng mở trust surface; trust exact proxy network, không trust mọi header.

### Transfer variation

Từ local reverse proxy sang cloud load balancer và multi-hop ingress.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-net-request-path-dns

### Identity

- **Working title:** net-request-path-dns
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| net-request-path-dns | Networking & HTTP | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

NXDOMAIN/misconfigured record; slow resolver; stale cached address; IPv6/IPv4 mismatch.

### State / data / mechanism trace

DNS maps hostname to record/address with cache/TTL; connection chỉ bắt đầu sau khi client có usable destination.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Resolution result; resolver timing; TTL/cache state; address attempted; DNS error code.

### Production boundary / trade-off

Caching giảm lookup cost nhưng trì hoãn record change; retry HTTP không sửa name-resolution failure chưa qua được boundary.

### Transfer variation

Từ localhost/static host sang service discovery hoặc cloud DNS failover.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-net-streaming-body-cancellation

### Identity

- **Working title:** net-streaming-body-cancellation
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| net-streaming-body-cancellation | Networking & HTTP | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Buffer entire payload; continue expensive work after disconnect; partial upload treated complete; response stream disposed too early.

### State / data / mechanism trace

Request/response body là stream; consumer đọc dần và must observe cancellation, còn buffering materializes toàn bộ payload và kéo dài memory/lifetime.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| net-http-semantics | net-streaming-body-cancellation | HTTP body and transfer lifetime | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| concurrency-cancellation-lifetime | net-streaming-body-cancellation | cooperative cancellation and lifetime | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `net-http-semantics`: **HTTP body and transfer lifetime**; introduced only for `net-streaming-body-cancellation`, without source coverage or `PASSED` evidence.
- `concurrency-cancellation-lifetime`: **cooperative cancellation and lifetime**; introduced only for `net-streaming-body-cancellation`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Bytes in/out; cancellation/request-aborted trace; memory allocation; stream read/write duration; completion status.

### Production boundary / trade-off

Streaming hạ memory/first-byte latency nhưng làm retry/validation partial phức tạp; full buffer chỉ hợp payload nhỏ cần toàn bộ trước processing.

### Transfer variation

Từ file upload local sang proxy streaming to a remote service with client disconnect.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-net-tcp-connection-semantics

### Identity

- **Working title:** net-tcp-connection-semantics
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| net-tcp-connection-semantics | Networking & HTTP | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Connection refused; reset; handshake timeout; connection exhaustion.

### State / data / mechanism trace

TCP connection được establish rồi giữ state đến close/reset; HTTP request có thể reuse connection nhưng peer/network có thể refuse/reset hoặc capacity cạn trước HTTP.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| os-files-handles-sockets-ipc | net-tcp-connection-semantics | socket state, lifetime and resource | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `os-files-handles-sockets-ipc`: **socket state, lifetime and resource**; introduced only for `net-tcp-connection-semantics`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Socket state; connect timing; errno/socket exception; SYN/connection metrics; server accept count.

### Production boundary / trade-off

Long-lived connection giảm setup nhưng cần handle reset; opening per request tăng port/socket pressure và tail latency.

### Transfer variation

Từ local same-host call sang remote availability zone with NAT/proxy.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-net-tls-trust-handshake

### Identity

- **Working title:** net-tls-trust-handshake
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| net-tls-trust-handshake | Networking & HTTP | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Untrusted issuer; hostname mismatch; expired certificate; incompatible protocol/cipher.

### State / data / mechanism trace

TLS handshake xác thực certificate/name/validity và thương lượng protected channel; HTTP starts only after this boundary succeeds.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Certificate chain/name/expiry; TLS error; handshake timing; client and proxy logs.

### Production boundary / trade-off

Strict validation bảo vệ identity nhưng cần rotation and correct hostname; bypass certificate validation chỉ hợp local test, không production.

### Transfer variation

Từ direct service certificate sang TLS termination at proxy with upstream trust split.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-db-backup-restore

### Identity

- **Working title:** db-backup-restore
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-backup-restore | Relational Database Engineering | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Backup chưa từng restore; thiếu log cần thiết; recovered point không đạt yêu cầu; restore lâu hơn giả định.

### State / data / mechanism trace

Backup là bản dữ liệu/log tại mốc xác định; restore tái tạo state theo phạm vi và point-in-time contract, không phải chỉ file tồn tại.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Backup metadata; restore test; recovered timestamp/rows; duration; checksum/validation result.

### Production boundary / trade-off

Backup dày giảm data loss nhưng tăng storage/IO; Database owns recovery mechanism còn Reliability owns RPO/RTO policy.

### Transfer variation

Từ full backup test local sang point-in-time restore của production-sized dataset.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-db-buffer-io

### Identity

- **Working title:** db-buffer-io
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-buffer-io | Relational Database Engineering | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Benchmark cold/warm không nhất quán; gọi mọi buffer hit là disk I/O; memory pressure làm runtime đổi nhưng bị bỏ qua.

### State / data / mechanism trace

Database buffer/cache có thể phục vụ page đã resident; working set và access pattern quyết định khi nào cần đọc storage.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| db-physical-storage-pages | db-buffer-io | database data is accessed in page-sized physical units. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `db-physical-storage-pages`: **database data is accessed in page-sized physical units.**; introduced only for `db-buffer-io`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

EXPLAIN BUFFERS; cache hits/reads; OS/database I/O; cold/warm timing.

### Production boundary / trade-off

Cache warm làm query nhanh nhưng không đảm bảo production working set luôn fit memory.

### Transfer variation

Từ hot dataset nhỏ sang working set lớn hơn memory sẵn có.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-db-connection-pool-exhaustion

### Identity

- **Working title:** db-connection-pool-exhaustion
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-connection-pool-exhaustion | Relational Database Engineering | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Leaked connection; transaction giữ connection quá lâu; pool nhỏ hơn concurrency không bound; tăng pool làm DB overload thêm.

### State / data / mechanism trace

Pool giới hạn số session; acquisition wait xảy ra trước query khi active connection bị leak, giữ transaction lâu hoặc demand vượt capacity.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| os-resource-exhaustion | db-connection-pool-exhaustion | connections are finite resources and waiting grows when demand exceeds available capacity. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `os-resource-exhaustion`: **connections are finite resources and waiting grows when demand exceeds available capacity.**; introduced only for `db-connection-pool-exhaustion`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Pool active/idle/wait; acquisition latency; DB session count; query duration; request queue.

### Production boundary / trade-off

Tăng pool chỉ có lợi khi DB còn capacity; concurrency limit đôi khi bảo vệ latency tốt hơn.

### Transfer variation

Từ single instance sang nhiều replicas chia cùng DB pool/capacity.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-db-locks-deadlocks-contention

### Identity

- **Working title:** db-locks-deadlocks-contention
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-locks-deadlocks-contention | Relational Database Engineering | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Long transaction giữ lock; inconsistent lock order; hot-row serialization; deadlock cycle.

### State / data / mechanism trace

Lock serializes conflicting access; contention có owner sẽ release, deadlock là cycle wait cần one transaction abort.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| db-transactions-isolation-anomalies | db-locks-deadlocks-contention | transaction scope and concurrent operations over shared database state. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `db-transactions-isolation-anomalies`: **transaction scope and concurrent operations over shared database state.**; introduced only for `db-locks-deadlocks-contention`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Lock/wait view; blocked/blocking session; deadlock report; transaction duration.

### Production boundary / trade-off

Strong serialization bảo vệ invariant nhưng giảm concurrency/tăng latency; retry deadlock cần idempotent flow.

### Transfer variation

Từ two-session update sang hot account row trong nhiều app replicas.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-db-modeling-invariants

### Identity

- **Working title:** db-modeling-invariants
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-modeling-invariants | Relational Database Engineering | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Duplicate logical entity; invalid relationship; nullable field trái domain assumption; invariant chỉ ở app; race bypass validation.

### State / data / mechanism trace

Schema, key, constraint và transaction boundary quyết định state nào có thể persist; application validation không là guard cuối khi có nhiều writer.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| prog-invariants-domain-model | db-modeling-invariants | business-valid state and invariant ownership. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `prog-invariants-domain-model`: **business-valid state and invariant ownership.**; introduced only for `db-modeling-invariants`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Schema/constraints; failing insert/update; concurrent test; constraint violation; persisted rows.

### Production boundary / trade-off

Strict constraint tăng correctness nhưng giảm migration/write flexibility; migration cần làm rõ legacy state.

### Transfer variation

Từ PostgreSQL schema do một service sở hữu sang shared/legacy DB có nhiều writer.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-db-mvcc-visibility

### Identity

- **Working title:** db-mvcc-visibility
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-mvcc-visibility | Relational Database Engineering | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Assume latest committed row luôn visible; nhầm snapshot với lock owner; long transaction giữ cleanup pressure.

### State / data / mechanism trace

Multiple logical row versions cùng visibility rules cho transaction; reader có thể thấy snapshot cũ dù writer đã tạo version mới.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| db-transactions-isolation-anomalies | db-mvcc-visibility | transaction boundary, isolation semantics and concurrent visibility requirements. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `db-transactions-isolation-anomalies`: **transaction boundary, isolation semantics and concurrent visibility requirements.**; introduced only for `db-mvcc-visibility`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Two-session query; transaction snapshot/ID khi thực tế; dead-row/version observation; lock evidence để loại blocking.

### Production boundary / trade-off

MVCC giảm read/write blocking ở nhiều workload nhưng long transactions có cleanup/storage cost.

### Transfer variation

Từ PostgreSQL MVCC sang SQL Server/Oracle/InnoDB khác implementation.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-db-partitioning-sharding-boundary

### Identity

- **Working title:** db-partitioning-sharding-boundary
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-partitioning-sharding-boundary | Relational Database Engineering | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Hot partition; unbounded partition; query fan-out toàn shard; bỏ qua repartitioning.

### State / data / mechanism trace

Key quyết định row nằm ở partition nào; targeted query giữ locality còn key lệch tạo hot partition/fan-out.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| dist-partitioning-ownership-rebalancing | db-partitioning-sharding-boundary | state/key ranges are assigned to owners and ownership may change. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `dist-partitioning-ownership-rebalancing`: **state/key ranges are assigned to owners and ownership may change.**; introduced only for `db-partitioning-sharding-boundary`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Key distribution; partition size; per-partition traffic; fan-out count.

### Production boundary / trade-off

Partition giúp manage/route data nhưng tăng operational/query complexity khi access không theo key.

### Transfer variation

Từ table partition nội bộ sang service shard nhiều owner.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-db-physical-storage-pages

### Identity

- **Working title:** db-physical-storage-pages
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-physical-storage-pages | Relational Database Engineering | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Assume one-row lookup là one disk operation; wide row tăng page work; bỏ qua table/index size.

### State / data / mechanism trace

Rows nằm trong storage pages; scan/index eventually reference pages, nên row width/physical relation size ảnh hưởng amount of work.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Page/buffer statistics; relation/index size; EXPLAIN BUFFERS khi phù hợp.

### Production boundary / trade-off

Đây là trực giác backend, không phải database-engine implementation internals.

### Transfer variation

Từ narrow lookup table sang wide event table và large index.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-db-production-diagnosis-transfer

### Identity

- **Working title:** db-production-diagnosis-transfer
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-production-diagnosis-transfer | Relational Database Engineering | L4 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Nhảy từ “slow SQL” sang add index; sửa plan khi problem là pool/lock; áp dụng engine detail sai.

### State / data / mechanism trace

Query shape, plan, cardinality, buffers/I/O, locks, transaction và pool tạo symptom khác nhau; thay đổi chỉ sau khi evidence loại hypothesis khác.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| db-buffer-io | db-production-diagnosis-transfer | buffer hit/read behavior distinguishes memory access from physical I/O. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| db-optimizer-cardinality-stats | db-production-diagnosis-transfer | estimated vs actual cardinality and plan-choice evidence. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| db-locks-deadlocks-contention | db-production-diagnosis-transfer | blocking/lock evidence as an alternative explanation for latency. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| db-connection-pool-exhaustion | db-production-diagnosis-transfer | connection acquisition wait can dominate request latency independently of query execution. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `db-buffer-io`: **buffer hit/read behavior distinguishes memory access from physical I/O.**; introduced only for `db-production-diagnosis-transfer`, without source coverage or `PASSED` evidence.
- `db-optimizer-cardinality-stats`: **estimated vs actual cardinality and plan-choice evidence.**; introduced only for `db-production-diagnosis-transfer`, without source coverage or `PASSED` evidence.
- `db-locks-deadlocks-contention`: **blocking/lock evidence as an alternative explanation for latency.**; introduced only for `db-production-diagnosis-transfer`, without source coverage or `PASSED` evidence.
- `db-connection-pool-exhaustion`: **connection acquisition wait can dominate request latency independently of query execution.**; introduced only for `db-production-diagnosis-transfer`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Hypothesis matrix; measured plan/rows/buffers; lock/pool timeline; before/after experiment.

### Production boundary / trade-off

Mitigation phải giữ invariant và rollout safety, không chỉ giảm một metric.

### Transfer variation

Từ PostgreSQL incident sang SQL Server/MySQL/Oracle với physical implementation khác.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-db-replication-failover

### Identity

- **Working title:** db-replication-failover
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-replication-failover | Relational Database Engineering | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Read-after-write từ lagging replica; stale replica promoted; assumed operation lost/duplicated; client giữ old primary connection.

### State / data / mechanism trace

Replication applies state with delay/role transition; client connection và operation history có thể không cùng mốc với promoted node.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| dist-replication-leader-quorum | db-replication-failover | portable replication roles, acknowledgement and stale-copy semantics. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `dist-replication-leader-quorum`: **portable replication roles, acknowledgement and stale-copy semantics.**; introduced only for `db-replication-failover`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Replication lag/position; role; timeline; operation ID; connection target.

### Production boundary / trade-off

General replication mechanism belongs Distributed Systems; node này owns relational engine evidence and behavior.

### Transfer variation

Từ primary/replica read scale sang failover during in-flight write.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-db-schema-evolution

### Identity

- **Working title:** db-schema-evolution
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-schema-evolution | Relational Database Engineering | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Destructive column change sớm; long blocking migration; rollback incompatible; backfill race with writes.

### State / data / mechanism trace

Expand/backfill/dual-read or compatibility boundary cho phép state/schema đổi dần trước contract cleanup.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| db-modeling-invariants | db-schema-evolution | schema structure, keys, constraints and invariants that migration must preserve. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| db-locks-deadlocks-contention | db-schema-evolution | DDL/data migration can acquire locks and block concurrent work. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `db-modeling-invariants`: **schema structure, keys, constraints and invariants that migration must preserve.**; introduced only for `db-schema-evolution`, without source coverage or `PASSED` evidence.
- `db-locks-deadlocks-contention`: **DDL/data migration can acquire locks and block concurrent work.**; introduced only for `db-schema-evolution`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Schema version; migration history; lock duration; old/new compatibility test; backfill progress.

### Production boundary / trade-off

Compatibility kéo dài migration cost nhưng giảm deploy risk; cleanup chỉ sau khi callers đã rời contract cũ.

### Transfer variation

Từ deploy một version sang rolling deploy mixed app versions.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-db-transactions-isolation-anomalies

### Identity

- **Working title:** db-transactions-isolation-anomalies
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-transactions-isolation-anomalies | Relational Database Engineering | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Lost update; non-repeatable observation; write skew/equivalent anomaly; transaction scope quá lớn.

### State / data / mechanism trace

Isolation defines visibility/conflict behavior của concurrent transactions; invariant có thể cần conditional write, serialization hoặc redesign scope.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| concurrency-interleavings-invariants | db-transactions-isolation-anomalies | concurrent operations may interleave around shared state and violate an invariant. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `concurrency-interleavings-invariants`: **concurrent operations may interleave around shared state and violate an invariant.**; introduced only for `db-transactions-isolation-anomalies`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Two-session timeline; before/after rows; isolation setting; conflict/result.

### Production boundary / trade-off

Higher isolation/serialization tăng correctness nhưng có retry/contention cost; không học như bảng thuộc lòng.

### Transfer variation

Từ single transfer transaction sang concurrent capacity reservation.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-db-wal-crash-recovery

### Identity

- **Working title:** db-wal-crash-recovery
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| db-wal-crash-recovery | Relational Database Engineering | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Assume committed data means every page sync write; unsafe durability setting; expect recovery without required log.

### State / data / mechanism trace

WAL records durable change intent before data page write; recovery can redo/resolve state based on log ordering.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| db-transactions-isolation-anomalies | db-wal-crash-recovery | commit/durability boundary of a transaction. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `db-transactions-isolation-anomalies`: **commit/durability boundary of a transaction.**; introduced only for `db-wal-crash-recovery`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

WAL/log position khi thực tế; commit/restart experiment; recovery log; persisted rows after crash simulation.

### Production boundary / trade-off

Durability setting đổi latency vs data-loss window; không implement WAL engine.

### Transfer variation

Từ controlled restart sang crash/failover with durability policy.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-nosql-cassandra-lsm-compaction-consistency

### Identity

- **Working title:** nosql-cassandra-lsm-compaction-consistency
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-cassandra-lsm-compaction-consistency | NoSQL & Specialized Data Systems | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Tombstone-heavy read; compaction backlog; read amplification; inappropriate consistency assumption.

### State / data / mechanism trace

Writes append to commit log/memtable then flush immutable SSTables; reads merge relevant files and compaction rewrites them, while consistency depends replica response policy.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| nosql-cassandra-partition-model | nosql-cassandra-lsm-compaction-consistency | partition/clustering organization determines which data is read/written together. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| dist-consistency-linearizability | nosql-cassandra-lsm-compaction-consistency | consistency model constrains which replica observations/acknowledgements are acceptable. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `nosql-cassandra-partition-model`: **partition/clustering organization determines which data is read/written together.**; introduced only for `nosql-cassandra-lsm-compaction-consistency`, without source coverage or `PASSED` evidence.
- `dist-consistency-linearizability`: **consistency model constrains which replica observations/acknowledgements are acceptable.**; introduced only for `nosql-cassandra-lsm-compaction-consistency`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

SSTable/compaction metrics; tombstone warnings; read/write latency; replica response behavior.

### Production boundary / trade-off

Write-friendly immutable storage trades for read/compaction amplification and operational tuning.

### Transfer variation

Từ write-heavy time series sang read-heavy range/query workload với tombstone history.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-nosql-cassandra-partition-model

### Identity

- **Working title:** nosql-cassandra-partition-model
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-cassandra-partition-model | NoSQL & Specialized Data Systems | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Huge partition; hot partition; unsupported scan query; poor key distribution.

### State / data / mechanism trace

Partition key routes data; clustering key orders rows inside partition; table design starts from known query not ad-hoc filter.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Partition size/key distribution; request distribution; query shape.

### Production boundary / trade-off

Denormalized tables speed known queries nhưng tăng write/model maintenance and reduce query flexibility.

### Transfer variation

Từ per-tenant uniform traffic sang one tenant/hot device dominates writes.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-nosql-model-selection

### Identity

- **Working title:** nosql-model-selection
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-model-selection | NoSQL & Specialized Data Systems | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Document DB for relational cross-aggregate work; Cassandra without partition query; search as authoritative transactional store; Redis chosen only “fast”.

### State / data / mechanism trace

Mỗi family optimizes different data layout/operation: relational constraints, document aggregate, partition write, key lookup, search projection.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| nosql-mongo-aggregate-model | nosql-model-selection | document/aggregate storage model and its query/update boundary. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| nosql-cassandra-partition-model | nosql-model-selection | wide-column access-pattern-first partition model. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| nosql-redis-structures-memory | nosql-model-selection | in-memory key/value structure and memory boundary. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| nosql-search-inverted-index-analysis | nosql-model-selection | inverted-index/search projection model. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `nosql-mongo-aggregate-model`: **document/aggregate storage model and its query/update boundary.**; introduced only for `nosql-model-selection`, without source coverage or `PASSED` evidence.
- `nosql-cassandra-partition-model`: **wide-column access-pattern-first partition model.**; introduced only for `nosql-model-selection`, without source coverage or `PASSED` evidence.
- `nosql-redis-structures-memory`: **in-memory key/value structure and memory boundary.**; introduced only for `nosql-model-selection`, without source coverage or `PASSED` evidence.
- `nosql-search-inverted-index-analysis`: **inverted-index/search projection model.**; introduced only for `nosql-model-selection`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Access-pattern matrix; query shapes; data growth; consistency/failure requirement.

### Production boundary / trade-off

Specialized fit improves one workload but adds operational, consistency or query-flexibility cost.

### Transfer variation

Từ document-heavy aggregate sang append/read-by-partition workload or transactional source to search projection.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-nosql-mongo-aggregate-model

### Identity

- **Working title:** nosql-mongo-aggregate-model
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-mongo-aggregate-model | NoSQL & Specialized Data Systems | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Unbounded embedded array; assume cross-document update atomic; N+1 reference lookup.

### State / data / mechanism trace

Embedded data updates with one document boundary; references split ownership/lifetime and require later lookup or coordinated update.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Document shape/size; query pattern; update boundary; array growth.

### Production boundary / trade-off

Embed reduces round trips for bounded aggregate; reference contains growth and reuse but adds joins/lookups/consistency handling.

### Transfer variation

Từ order with bounded line items sang customer activity history growing without bound.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-nosql-mongo-index-shard-transaction

### Identity

- **Working title:** nosql-mongo-index-shard-transaction
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-mongo-index-shard-transaction | NoSQL & Specialized Data Systems | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Poor shard key/hot chunk; query misses useful index; distributed transaction assumed cheap; scatter-gather query.

### State / data / mechanism trace

Index narrows candidate documents; shard key routes data; multi-document transaction coordinates changes but crosses normal document locality.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| nosql-mongo-aggregate-model | nosql-mongo-index-shard-transaction | document/aggregate boundary and expected access pattern. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `nosql-mongo-aggregate-model`: **document/aggregate boundary and expected access pattern.**; introduced only for `nosql-mongo-index-shard-transaction`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Query explain/profile; shard distribution; operation latency; transaction scope.

### Production boundary / trade-off

Shard key optimizes route/distribution but constrains future queries; transaction correctness may cost latency/coordination.

### Transfer variation

Từ single-shard aggregate update sang cross-shard reporting or transaction.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-nosql-redis-persistence-replication-cluster-streams

### Identity

- **Working title:** nosql-redis-persistence-replication-cluster-streams
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-redis-persistence-replication-cluster-streams | NoSQL & Specialized Data Systems | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Acknowledged write lost under wrong durability assumption; stale replica; hot slot/key; cross-slot surprise; pending work misunderstood.

### State / data / mechanism trace

Persistence mode controls restart survival; replica apply may lag; hash slot routes keys; Stream group tracks delivered/pending entries per consumer.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| nosql-redis-structures-memory | nosql-redis-persistence-replication-cluster-streams | Redis state lives in concrete key/value data structures with finite memory behavior. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| dist-replication-leader-quorum | nosql-redis-persistence-replication-cluster-streams | portable replication, lag and failover semantics. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `nosql-redis-structures-memory`: **Redis state lives in concrete key/value data structures with finite memory behavior.**; introduced only for `nosql-redis-persistence-replication-cluster-streams`, without source coverage or `PASSED` evidence.
- `dist-replication-leader-quorum`: **portable replication, lag and failover semantics.**; introduced only for `nosql-redis-persistence-replication-cluster-streams`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Persistence config/state; replication offset/lag; slot distribution; Streams consumer/pending state.

### Production boundary / trade-off

Redis speed does not equal durable source of truth; stronger persistence/replication choices cost latency/availability.

### Transfer variation

Từ standalone cache to cluster stream consumer group with failover.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-nosql-redis-structures-memory

### Identity

- **Working title:** nosql-redis-structures-memory
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-redis-structures-memory | NoSQL & Specialized Data Systems | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Giant key/value; wrong structure; unbounded collection; memory underestimated.

### State / data / mechanism trace

String, hash, set, sorted set and stream encode different operations/memory layouts; key cardinality and value size drive RAM need.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Key type/size; memory usage; operation latency; cardinality.

### Production boundary / trade-off

A compact structure for one access pattern may be poor for another; memory must be bounded/observed, not assumed.

### Transfer variation

Từ simple key lookup sang leaderboard or bounded per-user collection.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-nosql-search-inverted-index-analysis

### Identity

- **Working title:** nosql-search-inverted-index-analysis
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-search-inverted-index-analysis | NoSQL & Specialized Data Systems | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Text vs keyword mismatch; wrong analyzer; exact match expected from analyzed text; relevance confused with correctness.

### State / data / mechanism trace

Analyzer transforms text into tokens; inverted index maps tokens to documents, so mapping/analyzer determines match semantics.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Mapping; analyzed tokens; query explanation/profile; returned scores.

### Production boundary / trade-off

Search ranking improves discovery but is not transactional correctness or authoritative source.

### Transfer variation

Từ exact product code lookup sang natural-language product search.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-nosql-search-refresh-shards-pagination

### Identity

- **Working title:** nosql-search-refresh-shards-pagination
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-search-refresh-shards-pagination | NoSQL & Specialized Data Systems | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Write expected instantly searchable; hot shard; deep offset pagination; search result treated as transactional truth.

### State / data / mechanism trace

Indexed write becomes searchable on refresh; shard routes work; deep offset asks shards to collect/skip many hits.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| nosql-search-inverted-index-analysis | nosql-search-refresh-shards-pagination | documents and terms are represented in an inverted index whose visibility differs from source-of-truth storage. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `nosql-search-inverted-index-analysis`: **documents and terms are represented in an inverted index whose visibility differs from source-of-truth storage.**; introduced only for `nosql-search-refresh-shards-pagination`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Refresh timing; shard distribution; query profile; pagination depth; source-of-truth record.

### Production boundary / trade-off

Faster refresh costs resources; cursor/search-after pattern changes navigation semantics but avoids deep offset cost.

### Transfer variation

Từ small catalog offset page sang high-cardinality search with deep navigation.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-nosql-transfer-storage-choice

### Identity

- **Working title:** nosql-transfer-storage-choice
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| nosql-transfer-storage-choice | NoSQL & Specialized Data Systems | L4 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Chọn tool vì trend; bỏ qua source-of-truth; model không hỗ trợ primary query; hide operational cost.

### State / data / mechanism trace

Decision starts with read/write route, ownership, consistency and recovery needs; product behavior demonstrates fit or mismatch, not popularity.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| nosql-model-selection | nosql-transfer-storage-choice | choose storage family from workload/access/consistency requirements. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `nosql-model-selection`: **choose storage family from workload/access/consistency requirements.**; introduced only for `nosql-transfer-storage-choice`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Access matrix; prototype query/profile; data distribution; consistency/failure test; operating cost estimate.

### Production boundary / trade-off

A best local model may create global reconciliation/operational cost; choose smallest model meeting required properties.

### Transfer variation

Document aggregate → append partition workload; transactional source → search projection; cache lookup → durable stream.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-cache-capacity-eviction-fallback

### Identity

- **Working title:** cache-capacity-eviction-fallback
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| cache-capacity-eviction-fallback | Cache Engineering | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Eviction gây origin surge; recursive fallback overload source; fail-open/fail-closed sai.

### State / data / mechanism trace

Cache có capacity/eviction policy; miss hoặc outage chuyển demand về source, nên fallback path là một traffic amplifier tiềm năng.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| cache-need-source-of-truth | cache-capacity-eviction-fallback | evicted/unavailable cache must fall back to an authoritative source. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `cache-need-source-of-truth`: **evicted/unavailable cache must fall back to an authoritative source.**; introduced only for `cache-capacity-eviction-fallback`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Memory; evictions; hit rate; origin QPS; fallback latency/error.

### Production boundary / trade-off

Cache capacity tăng cost không xoá need for origin protection; fallback must have bound/timeout/load-shed behavior.

### Transfer variation

Từ one cache node sang eviction burst trên distributed cluster with origin rate limit.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-cache-evidence-transfer

### Identity

- **Working title:** cache-evidence-transfer
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| cache-evidence-transfer | Cache Engineering | L4 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Treat hit rate as full success; optimize latency while serving stale data; add cache node when hot key is bottleneck.

### State / data / mechanism trace

Hit/miss, TTL, key distribution, source load, freshness and fallback interact; symptom phải được tách bằng timeline/key-level evidence trước mitigation.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| cache-invalidation-consistency | cache-evidence-transfer | staleness/invalidation as one candidate cause. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| cache-stampede-penetration-avalanche-hot-key | cache-evidence-transfer | load-distribution and miss/expiry overload modes. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| cache-capacity-eviction-fallback | cache-evidence-transfer | finite cache memory, eviction and origin fallback behavior. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| cache-multilayer-coherence | cache-evidence-transfer | layer-specific freshness/version divergence. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `cache-invalidation-consistency`: **staleness/invalidation as one candidate cause.**; introduced only for `cache-evidence-transfer`, without source coverage or `PASSED` evidence.
- `cache-stampede-penetration-avalanche-hot-key`: **load-distribution and miss/expiry overload modes.**; introduced only for `cache-evidence-transfer`, without source coverage or `PASSED` evidence.
- `cache-capacity-eviction-fallback`: **finite cache memory, eviction and origin fallback behavior.**; introduced only for `cache-evidence-transfer`, without source coverage or `PASSED` evidence.
- `cache-multilayer-coherence`: **layer-specific freshness/version divergence.**; introduced only for `cache-evidence-transfer`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Hit/miss by key; TTL age; source load; p95/p99; cache error/fallback trace; version timeline.

### Production boundary / trade-off

Correctness freshness and origin stability can conflict; choose explicit stale window and degradation behavior.

### Transfer variation

100 QPS uniform → 10k QPS hot key; one cache node → cluster; Redis → CDN/in-process cache.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-cache-invalidation-consistency

### Identity

- **Working title:** cache-invalidation-consistency
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| cache-invalidation-consistency | Cache Engineering | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Missing invalidation; delayed event; out-of-order update; TTL longer than acceptable freshness.

### State / data / mechanism trace

Source version/timestamp defines newer state; invalidation/update event may arrive delayed/out of order; reader compares/ages cached copy according to freshness contract.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| cache-need-source-of-truth | cache-invalidation-consistency | cached value may diverge from authoritative state. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `cache-need-source-of-truth`: **cached value may diverge from authoritative state.**; introduced only for `cache-invalidation-consistency`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Source version/timestamp; cache version/TTL; invalidation event; read timeline.

### Production boundary / trade-off

Strong freshness raises coordination/latency/complexity; TTL is bounded staleness policy, not proof of immediate correctness.

### Transfer variation

Từ one writer/invalidation tới multi-writer event order and delayed delivery.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-cache-multilayer-coherence

### Identity

- **Working title:** cache-multilayer-coherence
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| cache-multilayer-coherence | Cache Engineering | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

One layer invalidated while another stale; per-instance divergence; rollout mixes cache-key/schema versions.

### State / data / mechanism trace

L1 belongs one instance, L2 is shared, source is authoritative; key/version/schema must let reader locate which layer served stale state.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| cache-invalidation-consistency | cache-multilayer-coherence | one cached copy can become stale relative to source. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `cache-invalidation-consistency`: **one cached copy can become stale relative to source.**; introduced only for `cache-multilayer-coherence`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Layer-specific key/version; instance ID; cache age; request trace.

### Production boundary / trade-off

L1 reduces latency but increases invalidation surface; coordinated versioning may be simpler than trying to purge every layer synchronously.

### Transfer variation

Từ one distributed cache sang in-process + Redis + CDN-like layer.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-cache-need-source-of-truth

### Identity

- **Working title:** cache-need-source-of-truth
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| cache-need-source-of-truth | Cache Engineering | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Cache becomes authority; source update succeeds but cache assumption differs; cached absence treated permanently true.

### State / data / mechanism trace

Cache holds a derived copy keyed to source state; source owns final value/version, cache may be absent/stale and must not become accidental authority.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Source row/version; cache key/value/version; request path; miss/read timeline.

### Production boundary / trade-off

Cache is justified only when it saves known source work or latency; add no cache without source/freshness contract.

### Transfer variation

Từ positive value cache sang negative cache and source record created later.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-cache-patterns

### Identity

- **Working title:** cache-patterns
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| cache-patterns | Cache Engineering | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Write updates cache but not source; cache-aside miss storm; double-write ordering ambiguity.

### State / data / mechanism trace

Pattern allocates responsibility differently: cache-aside caller reads source on miss; read-through loader mediates; write path must define source/cache ordering.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| cache-need-source-of-truth | cache-patterns | cache is a duplicate/derived copy and another system remains authoritative. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `cache-need-source-of-truth`: **cache is a duplicate/derived copy and another system remains authoritative.**; introduced only for `cache-patterns`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Request trace; loader call count; source/cache write order; miss/error metrics.

### Production boundary / trade-off

Hiding pattern behind library does not remove ownership; simple cache-aside is flexible but callers must manage miss/invalidation.

### Transfer variation

Từ read-only catalog cache sang write-heavy profile update.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-cache-stampede-penetration-avalanche-hot-key

### Identity

- **Working title:** cache-stampede-penetration-avalanche-hot-key
- **Learner-facing domain candidate:** Data & Consistency

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| cache-stampede-penetration-avalanche-hot-key | Cache Engineering | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Origin collapse after expiry; invalid-key probe overload; synchronized TTL burst; one key/slot saturated.

### State / data / mechanism trace

Stampede recomputes one expired/missing key concurrently; penetration repeats invalid misses; avalanche aligns many expiries; hot key concentrates traffic independent of expiry.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| cache-patterns | cache-stampede-penetration-avalanche-hot-key | cache miss/population/expiry behavior and origin fallback path. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `cache-patterns`: **cache miss/population/expiry behavior and origin fallback path.**; introduced only for `cache-stampede-penetration-avalanche-hot-key`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Miss rate; expiry distribution; per-key QPS; origin load; single-flight lock/wait.

### Production boundary / trade-off

Jitter/single-flight/negative cache/sharding solve different modes; applying one blindly can hide freshness or contention problem.

### Transfer variation

Từ ordinary misses to adversarial invalid-key traffic, then a single viral key.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-dist-consensus-coordination-purpose

### Identity

- **Working title:** dist-consensus-coordination-purpose
- **Learner-facing domain candidate:** Distributed Systems

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-consensus-coordination-purpose | Distributed Systems | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

No quorum; stale epoch; two actors believe exclusive ownership; coordination service dependency.

### State / data / mechanism trace

Participants cần agree decision/order despite failure; safe progress cần đủ reachable members theo protocol rule.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| dist-partial-failure-uncertainty | dist-consensus-coordination-purpose | participants can fail or become mutually unreachable while agreement is still required | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `dist-partial-failure-uncertainty`: **participants can fail or become mutually unreachable while agreement is still required**; introduced only for `dist-consensus-coordination-purpose`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Leader/epoch/term; membership; quorum availability; committed decision/version; ownership record.

### Production boundary / trade-off

Agreement mạnh đổi latency và không progress an toàn ở một số partition.

### Transfer variation

Single scheduler → replicated scheduler có một active owner.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-dist-consistency-linearizability

### Identity

- **Working title:** dist-consistency-linearizability
- **Learner-facing domain candidate:** Distributed Systems

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-consistency-linearizability | Distributed Systems | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Stale read violates expectation; writers observe incompatible state; assume global latest under eventual convergence.

### State / data / mechanism trace

Consistency model giới hạn ordering/visibility history được phép giữa replicas/processes.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Timestamp/sequence-tagged history; versions; read-after-write result; replica/source record.

### Production boundary / trade-off

Stronger coordination/visibility costs latency, partition availability hoặc throughput.

### Transfer variation

Catalog read tolerates stale → balance/reservation needs stronger ordering.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-dist-guarantee-recovery-transfer

### Identity

- **Working title:** dist-guarantee-recovery-transfer
- **Learner-facing domain candidate:** Distributed Systems

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-guarantee-recovery-transfer | Distributed Systems | L4 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Claim guarantee không có; recovery duplicates unknown effect; topology invalidates assumption.

### State / data / mechanism trace

Partial failure, RPC uncertainty, consistency, replication, ownership and reconciliation compose; timeline phải gắn operation identity/state owner.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| dist-rpc-unknown-completion | dist-guarantee-recovery-transfer | ambiguous remote completion states | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| dist-replication-leader-quorum | dist-guarantee-recovery-transfer | replica, acknowledgement, stale-read and failover semantics | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| dist-consensus-coordination-purpose | dist-guarantee-recovery-transfer | agreement, quorum and exclusive-coordination guarantee | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| dist-time-order-causality | dist-guarantee-recovery-transfer | wall-clock timestamps do not by themselves define causal or total order | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| dist-reconciliation-convergence | dist-guarantee-recovery-transfer | compare actual state with authority and apply repeatable repair | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `dist-rpc-unknown-completion`: **ambiguous remote completion states**; introduced only for `dist-guarantee-recovery-transfer`, without source coverage or `PASSED` evidence.
- `dist-replication-leader-quorum`: **replica, acknowledgement, stale-read and failover semantics**; introduced only for `dist-guarantee-recovery-transfer`, without source coverage or `PASSED` evidence.
- `dist-consensus-coordination-purpose`: **agreement, quorum and exclusive-coordination guarantee**; introduced only for `dist-guarantee-recovery-transfer`, without source coverage or `PASSED` evidence.
- `dist-time-order-causality`: **wall-clock timestamps do not by themselves define causal or total order**; introduced only for `dist-guarantee-recovery-transfer`, without source coverage or `PASSED` evidence.
- `dist-reconciliation-convergence`: **compare actual state with authority and apply repeatable repair**; introduced only for `dist-guarantee-recovery-transfer`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Timeline; per-system state; operation ID; ownership/version records; recovery result.

### Production boundary / trade-off

Stronger guarantee/coordination costs latency, availability, complexity và recovery burden.

### Transfer variation

Single-region replicated service → multi-region or temporary partition.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-dist-partial-failure-uncertainty

### Identity

- **Working title:** dist-partial-failure-uncertainty
- **Learner-facing domain candidate:** Distributed Systems

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-partial-failure-uncertainty | Distributed Systems | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

One dependency unreachable; slow mistaken dead; retry amplification; local success inferred global success.

### State / data / mechanism trace

Không có shared failure state; caller observes message/reply/timeout through network, not remote internal truth.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Per-node health/state; operation ID; request timings; dependency error rate; trace hop completion.

### Production boundary / trade-off

Short timeout detects quickly but false-timeout risk; long timeout consumes resource/delays recovery.

### Transfer variation

One downstream → replicas where only one path impaired.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-dist-partitioning-ownership-rebalancing

### Identity

- **Working title:** dist-partitioning-ownership-rebalancing
- **Learner-facing domain candidate:** Distributed Systems

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-partitioning-ownership-rebalancing | Distributed Systems | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Hot owner; stale router; zero/double ownership; duplicate in-flight work.

### State / data / mechanism trace

Assignment maps partition to owner; epoch/rebalance moves responsibility while router and workers converge.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Assignment; owner/epoch; traffic per partition; rebalance events; lag/in-flight count.

### Production boundary / trade-off

More partitions improve parallelism but add metadata, rebalance and coordination cost.

### Transfer variation

Static ownership → replicas added/removed under traffic.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-dist-reconciliation-convergence

### Identity

- **Working title:** dist-reconciliation-convergence
- **Learner-facing domain candidate:** Distributed Systems

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-reconciliation-convergence | Distributed Systems | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Non-idempotent repair; endless loop; wrong truth source; missing record never emitted.

### State / data / mechanism trace

Reconciliation compares actual against authoritative state/invariant then applies repeatable correction until mismatch converges.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| prog-invariants-domain-model | dist-reconciliation-convergence | valid target state and invariant ownership | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| dist-partial-failure-uncertainty | dist-reconciliation-convergence | partial failure can leave durable incomplete or divergent state | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `prog-invariants-domain-model`: **valid target state and invariant ownership**; introduced only for `dist-reconciliation-convergence`, without source coverage or `PASSED` evidence.
- `dist-partial-failure-uncertainty`: **partial failure can leave durable incomplete or divergent state**; introduced only for `dist-reconciliation-convergence`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Source-vs-derived diff; audit/event history; job result; repair operation ID; mismatch count.

### Production boundary / trade-off

Accept temporary divergence/operational work to recover missed or ambiguous effects.

### Transfer variation

Event projection mismatch → payment/provider reconciliation.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-dist-replication-leader-quorum

### Identity

- **Working title:** dist-replication-leader-quorum
- **Learner-facing domain candidate:** Distributed Systems

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-replication-leader-quorum | Distributed Systems | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Stale replica read; leader fails during operation; insufficient ack assumed durable; stale node promoted.

### State / data / mechanism trace

Replicas copy state; leader/quorum rule controls acceptance and when value is sufficiently replicated.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| dist-consistency-linearizability | dist-replication-leader-quorum | allowed read/write histories and required visibility guarantee | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| dist-partial-failure-uncertainty | dist-replication-leader-quorum | independent replica or network-path failure and uncertainty | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `dist-consistency-linearizability`: **allowed read/write histories and required visibility guarantee**; introduced only for `dist-replication-leader-quorum`, without source coverage or `PASSED` evidence.
- `dist-partial-failure-uncertainty`: **independent replica or network-path failure and uncertainty**; introduced only for `dist-replication-leader-quorum`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Leader/role; replica lag/position; ack count/state; operation version; failover timeline.

### Production boundary / trade-off

More synchronous ack improves guarantee but adds latency and reduces availability.

### Transfer variation

Single primary async replica → majority acknowledgement topology.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-dist-rpc-unknown-completion

### Identity

- **Working title:** dist-rpc-unknown-completion
- **Learner-facing domain candidate:** Distributed Systems

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-rpc-unknown-completion | Distributed Systems | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Side effect succeeded but client timeout; retry duplicates; server continues after client abandoned.

### State / data / mechanism trace

Execution and response delivery are independent events.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| dist-partial-failure-uncertainty | dist-rpc-unknown-completion | a remote component may execute, fail, slow or become unreachable independently of the caller | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| net-failure-localization-unknown-outcome | dist-rpc-unknown-completion | transport-stage evidence and the fact that absence of an HTTP response does not prove absence of remote execution | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `dist-partial-failure-uncertainty`: **a remote component may execute, fail, slow or become unreachable independently of the caller**; introduced only for `dist-rpc-unknown-completion`, without source coverage or `PASSED` evidence.
- `net-failure-localization-unknown-outcome`: **transport-stage evidence and the fact that absence of an HTTP response does not prove absence of remote execution**; introduced only for `dist-rpc-unknown-completion`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Operation/idempotency ID; server audit; client timing; status query; trace span.

### Production boundary / trade-off

Automatic retry helps transient failure but unsafe without idempotency/reconciliation under unknown completion.

### Transfer variation

Read-only RPC → payment/order mutation.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-dist-time-order-causality

### Identity

- **Working title:** dist-time-order-causality
- **Learner-facing domain candidate:** Distributed Systems

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-time-order-causality | Distributed Systems | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Last-write-wins on skewed clock; arrival time assumed event time; timeout logic assumes perfect clocks.

### State / data / mechanism trace

Nodes have independent clocks/delay; version/causal relation can be meaningful when timestamps skew or delivery reorders.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Operation IDs; sequence/version; producer/receive timestamps; trace/audit causality.

### Production boundary / trade-off

Sequence metadata adds state/protocol complexity but avoids false clock ordering.

### Transfer variation

Single-process callbacks → multi-service/region events.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-dist-transactions-2pc-boundary

### Identity

- **Working title:** dist-transactions-2pc-boundary
- **Learner-facing domain candidate:** Distributed Systems

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| dist-transactions-2pc-boundary | Distributed Systems | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Prepared participant with unavailable coordinator; long-held resources; prepare failure; assume 2PC covers external side effect.

### State / data / mechanism trace

Prepare makes participants commit-capable; coordinator later records commit/abort decision.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| db-transactions-isolation-anomalies | dist-transactions-2pc-boundary | atomic commit or abort within one transactional resource | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| dist-partial-failure-uncertainty | dist-transactions-2pc-boundary | independent participant/coordinator failure during a multi-step distributed decision | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `db-transactions-isolation-anomalies`: **atomic commit or abort within one transactional resource**; introduced only for `dist-transactions-2pc-boundary`, without source coverage or `PASSED` evidence.
- `dist-partial-failure-uncertainty`: **independent participant/coordinator failure during a multi-step distributed decision**; introduced only for `dist-transactions-2pc-boundary`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Coordinator/participant state; prepare/commit record; locks held; recovery log.

### Production boundary / trade-off

Cross-resource atomicity trades for blocking, coordination latency, recovery complexity and availability.

### Transfer variation

Local DB transaction → two transactional resource managers.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-msg-consumer-groups-offsets-rebalance

### Identity

- **Working title:** msg-consumer-groups-offsets-rebalance
- **Learner-facing domain candidate:** Distributed Systems

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-consumer-groups-offsets-rebalance | Messaging & Event-Driven Consistency | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Offset commit before effect; effect succeeds then offset fails; rebalance interrupts work; stale ownership assumption.

### State / data / mechanism trace

Group assigns partitions; offset marks broker read position, not durable business effect.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| msg-model-queue-topic-partition-order | msg-consumer-groups-offsets-rebalance | partitions, destination model and ordering scope | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `msg-model-queue-topic-partition-order`: **partitions, destination model and ordering scope**; introduced only for `msg-consumer-groups-offsets-rebalance`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Assignment; current/committed offset; generation/member; processing/audit record; rebalance event.

### Production boundary / trade-off

Early commit risks lost work; late commit raises duplicate replay risk.

### Transfer variation

One consumer → group scaling/rebalance with in-flight messages.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-msg-delivery-retry-poison-dlq

### Identity

- **Working title:** msg-delivery-retry-poison-dlq
- **Learner-facing domain candidate:** Distributed Systems

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-delivery-retry-poison-dlq | Messaging & Event-Driven Consistency | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Infinite poison retry blocks partition; retry storm; DLQ graveyard; transient sent DLQ early.

### State / data / mechanism trace

Failed delivery retries; permanently invalid record repeats until classified/quarantined/skipped by explicit policy.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| msg-model-queue-topic-partition-order | msg-delivery-retry-poison-dlq | broker-delivered record identity and ordering boundary | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `msg-model-queue-topic-partition-order`: **broker-delivered record identity and ordering boundary**; introduced only for `msg-delivery-retry-poison-dlq`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Attempt count; error class; message ID; retry timestamps; lag; DLQ reason.

### Production boundary / trade-off

Retry increases recovery chance but burns capacity; DLQ preserves progress but needs owner/reprocess policy.

### Transfer variation

One bad message → downstream-wide outage.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-msg-external-side-effect-reconciliation

### Identity

- **Working title:** msg-external-side-effect-reconciliation
- **Learner-facing domain candidate:** Distributed Systems

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-external-side-effect-reconciliation | Messaging & Event-Driven Consistency | L4 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Charged but locally timeout-failed; retry double charge; callback lost; permanent divergence.

### State / data / mechanism trace

Provider may commit while response lost; local DB/event cannot prove provider state.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| dist-rpc-unknown-completion | msg-external-side-effect-reconciliation | remote side effect may have completed despite a timeout or lost response | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| dist-reconciliation-convergence | msg-external-side-effect-reconciliation | authoritative state comparison and idempotent reconciliation | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `dist-rpc-unknown-completion`: **remote side effect may have completed despite a timeout or lost response**; introduced only for `msg-external-side-effect-reconciliation`, without source coverage or `PASSED` evidence.
- `dist-reconciliation-convergence`: **authoritative state comparison and idempotent reconciliation**; introduced only for `msg-external-side-effect-reconciliation`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

External operation/idempotency ID; status query; local audit; callback history; reconciliation result.

### Production boundary / trade-off

Immediate retry lowers wait but risks duplicate; status query/reconciliation adds delay/complexity to reduce ambiguity.

### Transfer variation

Tolerable duplicate email → payment/refund unacceptable duplicate.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-msg-lag-backpressure-evidence

### Identity

- **Working title:** msg-lag-backpressure-evidence
- **Learner-facing domain candidate:** Distributed Systems

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-lag-backpressure-evidence | Messaging & Event-Driven Consistency | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Hot partition; slow handler/downstream; retry storm; rebalance pause; consumers exceed shared capacity.

### State / data / mechanism trace

Lag grows when arrival exceeds effective consumption or work is unevenly distributed/blocked.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| msg-consumer-groups-offsets-rebalance | msg-lag-backpressure-evidence | current and committed offsets per partition and consumer assignment | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| concurrency-bounded-backpressure | msg-lag-backpressure-evidence | finite downstream capacity and bounded concurrent work | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `msg-consumer-groups-offsets-rebalance`: **current and committed offsets per partition and consumer assignment**; introduced only for `msg-lag-backpressure-evidence`, without source coverage or `PASSED` evidence.
- `concurrency-bounded-backpressure`: **finite downstream capacity and bounded concurrent work**; introduced only for `msg-lag-backpressure-evidence`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Per-partition lag; arrival/consume rate; handler duration; retry rate; assignment; downstream pool/latency.

### Production boundary / trade-off

More consumers may drain backlog but overload DB/downstream; bounds respect shared capacity.

### Transfer variation

Uniform partitions → hot partition or degraded database.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-msg-model-queue-topic-partition-order

### Identity

- **Working title:** msg-model-queue-topic-partition-order
- **Learner-facing domain candidate:** Distributed Systems

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-model-queue-topic-partition-order | Messaging & Event-Driven Consistency | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Assume global partition order; wrong key; queue treated broadcast; partitions changed without order review.

### State / data / mechanism trace

Records route to queue/topic/partition; parallel consumers preserve order only where broker contract/key assignment does.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Topic/queue config; partition/key; offset/sequence; consumer assignment.

### Production boundary / trade-off

More partitions improve parallelism but increase ordering/rebalance complexity.

### Transfer variation

Single queue/consumer → partitioned topic/group.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-msg-producer-acks-durability

### Identity

- **Working title:** msg-producer-acks-durability
- **Learner-facing domain candidate:** Distributed Systems

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-producer-acks-durability | Messaging & Event-Driven Consistency | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Ack weaker than assumed; timeout after accept; retry duplicate; leader changes during send.

### State / data / mechanism trace

Broker acceptance/replication policy decides when ack returns; client timeout can overlap accepted record.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| msg-model-queue-topic-partition-order | msg-producer-acks-durability | queue, topic or partition publication boundary and ordering scope | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| dist-replication-leader-quorum | msg-producer-acks-durability | replica acknowledgement, leader and failover semantics | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `msg-model-queue-topic-partition-order`: **queue, topic or partition publication boundary and ordering scope**; introduced only for `msg-producer-acks-durability`, without source coverage or `PASSED` evidence.
- `dist-replication-leader-quorum`: **replica acknowledgement, leader and failover semantics**; introduced only for `msg-producer-acks-durability`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Producer result/error; message key/ID; broker offset; replica/leader state; retry attempt.

### Production boundary / trade-off

Stronger ack improves durability but adds latency/unavailability during replica failure.

### Transfer variation

Local broker → replicated leader failover.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-msg-replay-backfill

### Identity

- **Working title:** msg-replay-backfill
- **Learner-facing domain candidate:** Distributed Systems

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-replay-backfill | Messaging & Event-Driven Consistency | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Payment/email replayed; live/backfill race; old schema unreadable; wrong starting offset.

### State / data / mechanism trace

Reprocess records from selected offset/range; projection work differs from side effects that must be suppressed/idempotent.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| msg-consumer-groups-offsets-rebalance | msg-replay-backfill | partition offsets, committed position and consumer assignment | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `msg-consumer-groups-offsets-rebalance`: **partition offsets, committed position and consumer assignment**; introduced only for `msg-replay-backfill`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Replay range; offsets; IDs/schema version; inbox ledger; derived before/after.

### Production boundary / trade-off

Replayability needs durable history, compatible contracts and replay-safe consumers.

### Transfer variation

Rebuild read model → backfill after bug while live traffic continues.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-msg-schema-evolution-contract-ownership

### Identity

- **Working title:** msg-schema-evolution-contract-ownership
- **Learner-facing domain candidate:** Distributed Systems

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-schema-evolution-contract-ownership | Messaging & Event-Driven Consistency | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Required field removed; meaning changes silently; consumer cannot read history; producer assumes synchronized deploy.

### State / data / mechanism trace

Event contract has syntax and semantic meaning; compatibility includes deployed consumers and retained history replay.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| msg-model-queue-topic-partition-order | msg-schema-evolution-contract-ownership | message contract, producer ownership and independently deployed consumers | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `msg-model-queue-topic-partition-order`: **message contract, producer ownership and independently deployed consumers**; introduced only for `msg-schema-evolution-contract-ownership`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Schema/event version; compatibility test; historical sample; consumer error; ownership doc.

### Production boundary / trade-off

Compatibility discipline costs version work but enables independent deploy/replay safety.

### Transfer variation

Single-team event → multiple independent services.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-msg-workflow-saga-compensation

### Identity

- **Working title:** msg-workflow-saga-compensation
- **Learner-facing domain candidate:** Distributed Systems

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| msg-workflow-saga-compensation | Messaging & Event-Driven Consistency | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Compensation fails; duplicate step/compensation; out-of-order transition; irreversible effect treated rollbackable.

### State / data / mechanism trace

Workflow persists progress; each step has outcome/possible compensation; compensation is new business operation.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| msg-model-queue-topic-partition-order | msg-workflow-saga-compensation | messages or commands represent independently processed workflow steps | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| dist-partial-failure-uncertainty | msg-workflow-saga-compensation | partial completion across independently failing participants | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `msg-model-queue-topic-partition-order`: **messages or commands represent independently processed workflow steps**; introduced only for `msg-workflow-saga-compensation`, without source coverage or `PASSED` evidence.
- `dist-partial-failure-uncertainty`: **partial completion across independently failing participants**; introduced only for `msg-workflow-saga-compensation`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Workflow state; step IDs; commands/events; compensation attempt; business records.

### Production boundary / trade-off

Avoid global transaction but accept temporary inconsistency/state-machine complexity.

### Transfer variation

Reserve inventory + payment → add irreversible notification/shipment.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-api-circuit-bulkhead-rate-limit

### Identity

- **Working title:** api-circuit-bulkhead-rate-limit
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| api-circuit-bulkhead-rate-limit | API Contracts & Resilience | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Circuit opens on caller error; tenant exhausts shared concurrency; global limit punishes other tenant; unbounded bulkhead queue.

### State / data / mechanism trace

Circuit tạm tránh dependency failing; bulkhead caps concurrent blast radius; rate limit controls admission by quota/identity.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| concurrency-bounded-backpressure | api-circuit-bulkhead-rate-limit | finite capacity, bounded concurrent work and overload protection. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `concurrency-bounded-backpressure`: **finite capacity, bounded concurrent work and overload protection.**; introduced only for `api-circuit-bulkhead-rate-limit`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Circuit state/reason; queue/concurrency; admitted/rejected rate; tenant identity; dependency latency/errors; probe result.

### Production boundary / trade-off

Intentionally reject/degrade some work to avoid shared collapse; Concurrency owns generic bound while API owns boundary policy.

### Transfer variation

One dependency → multiple tenants/dependencies with isolated budgets.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-api-contract-resource-semantics

### Identity

- **Working title:** api-contract-resource-semantics
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| api-contract-resource-semantics | API Contracts & Resilience | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Endpoint hides state transition; GET-like side effect; ambiguous update; caller cannot distinguish accepted/completed/rejected.

### State / data / mechanism trace

Request expresses intent/input; server evaluates state/invariant; response conveys accepted/completed/rejected stable semantics.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| net-http-semantics | api-contract-resource-semantics | HTTP request/response operation semantics and externally observable protocol behavior. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `net-http-semantics`: **HTTP request/response operation semantics and externally observable protocol behavior.**; introduced only for `api-contract-resource-semantics`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Request/response examples; OpenAPI; persisted before/after; contract tests.

### Production boundary / trade-off

Precise contract exposes more states/errors but removes caller assumptions.

### Transfer variation

Internal CRUD endpoint → business operation consumed by independent clients.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-api-deadlines-timeout-cancellation

### Identity

- **Working title:** api-deadlines-timeout-cancellation
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| api-deadlines-timeout-cancellation | API Contracts & Resilience | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Every hop full timeout; child outlives request; token not forwarded; timeout treated as no remote effect.

### State / data / mechanism trace

Remaining deadline is split across hops; cancellation signals no useful caller lifetime but does not prove remote side effect absent.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| concurrency-cancellation-lifetime | api-deadlines-timeout-cancellation | cooperative cancellation and logical operation lifetime. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| dist-rpc-unknown-completion | api-deadlines-timeout-cancellation | missing response and remote business completion are separate facts. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `concurrency-cancellation-lifetime`: **cooperative cancellation and logical operation lifetime.**; introduced only for `api-deadlines-timeout-cancellation`, without source coverage or `PASSED` evidence.
- `dist-rpc-unknown-completion`: **missing response and remote business completion are separate facts.**; introduced only for `api-deadlines-timeout-cancellation`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Request deadline; CancellationToken trace; span durations; downstream timeout; active work after disconnect; audit state.

### Production boundary / trade-off

Short budget bounds tail/resource but rejects slow valid work; long budget amplifies overload.

### Transfer variation

One downstream call → three-service deadline chain.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-api-request-identity-idempotency

### Identity

- **Working title:** api-request-identity-idempotency
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| api-request-identity-idempotency | API Contracts & Resilience | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Random retry key; same key different payload; crash after effect before record; dedup expiry too short; HTTP method assumed safe.

### State / data / mechanism trace

Key/fingerprint/outcome record separates same-operation retry from a new similar request.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| api-contract-resource-semantics | api-request-identity-idempotency | logical API operation and its intended business effect. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `api-contract-resource-semantics`: **logical API operation and its intended business effect.**; introduced only for `api-request-identity-idempotency`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Idempotency key; fingerprint; operation record; business row; stored response; retry test.

### Production boundary / trade-off

Persistent idempotency/retention costs state but enables safe retry; distinct from messaging inbox.

### Transfer variation

Create order retry → payment response lost.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-api-retry-backoff-jitter

### Identity

- **Working title:** api-retry-backoff-jitter
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| api-retry-backoff-jitter | API Contracts & Resilience | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Retry non-idempotent mutation; nested retries multiply; immediate storm; retry auth/validation; budget exceeds deadline.

### State / data / mechanism trace

Retry creates another attempt; backoff spaces it; jitter prevents synchronized retry wave.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| api-deadlines-timeout-cancellation | api-retry-backoff-jitter | finite end-to-end deadline and propagated cancellation budget. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| api-request-identity-idempotency | api-retry-backoff-jitter | stable logical operation identity and duplicate-effect protection. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `api-deadlines-timeout-cancellation`: **finite end-to-end deadline and propagated cancellation budget.**; introduced only for `api-retry-backoff-jitter`, without source coverage or `PASSED` evidence.
- `api-request-identity-idempotency`: **stable logical operation identity and duplicate-effect protection.**; introduced only for `api-retry-backoff-jitter`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Attempt count; error class; timing; downstream rate; operation ID; remaining deadline.

### Production boundary / trade-off

Retry improves transient recovery but adds latency/load/unknown-effect risk.

### Transfer variation

One reset → thousands clients hitting degraded dependency.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-api-unknown-outcome-reconciliation

### Identity

- **Working title:** api-unknown-outcome-reconciliation
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| api-unknown-outcome-reconciliation | API Contracts & Resilience | L4 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Timeout called failed though committed; blind duplicate retry; status uses other ID; cache trusted as authority; contradictory status.

### State / data / mechanism trace

Transport failure and business completion are separate; API needs status/outcome mechanism.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| api-request-identity-idempotency | api-unknown-outcome-reconciliation | stable logical operation key and persisted operation outcome. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| dist-rpc-unknown-completion | api-unknown-outcome-reconciliation | remote execution may succeed even when the caller observes timeout or lost response. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| dist-reconciliation-convergence | api-unknown-outcome-reconciliation | authoritative-state comparison and idempotent reconciliation. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `api-request-identity-idempotency`: **stable logical operation key and persisted operation outcome.**; introduced only for `api-unknown-outcome-reconciliation`, without source coverage or `PASSED` evidence.
- `dist-rpc-unknown-completion`: **remote execution may succeed even when the caller observes timeout or lost response.**; introduced only for `api-unknown-outcome-reconciliation`, without source coverage or `PASSED` evidence.
- `dist-reconciliation-convergence`: **authoritative-state comparison and idempotent reconciliation.**; introduced only for `api-unknown-outcome-reconciliation`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Operation ID; business/audit record; provider status; attempts; idempotency outcome; reconciliation result.

### Production boundary / trade-off

Async status model adds state/API work but safely handles long/ambiguous effects.

### Transfer variation

Fast internal order write → slow external provider operation.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-api-validation-errors-pagination

### Identity

- **Working title:** api-validation-errors-pagination
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| api-validation-errors-pagination | API Contracts & Resilience | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Invalid input mapped 500; exception leaks; offset skips/duplicates; unbounded page; field failure unclear.

### State / data / mechanism trace

Validation blocks unsafe transition; error contract separates classes; pagination defines traversal of changing collection.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| prog-errors-results | api-validation-errors-pagination | expected failure versus unexpected exception and failure propagation. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| api-contract-resource-semantics | api-validation-errors-pagination | request intent, response meaning and externally visible API behavior. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `prog-errors-results`: **expected failure versus unexpected exception and failure propagation.**; introduced only for `api-validation-errors-pagination`, without source coverage or `PASSED` evidence.
- `api-contract-resource-semantics`: **request intent, response meaning and externally visible API behavior.**; introduced only for `api-validation-errors-pagination`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Contract tests; ProblemDetails payload; cursor/offset; query/order; boundary tests.

### Production boundary / trade-off

Richer contract improves client behavior but increases compatibility surface.

### Transfer variation

Small list → large mutable independent-client dataset.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-api-versioning-compatibility

### Identity

- **Working title:** api-versioning-compatibility
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| api-versioning-compatibility | API Contracts & Resilience | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Required field removed; meaning changes; enum breaks client; assume simultaneous upgrade; rollback incompatible.

### State / data / mechanism trace

Compatibility includes syntax and meaning; additive change/version/migration supports independent deploy.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| api-contract-resource-semantics | api-versioning-compatibility | current externally observable API contract and resource semantics. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `api-contract-resource-semantics`: **current externally observable API contract and resource semantics.**; introduced only for `api-versioning-compatibility`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Contract/OpenAPI diff; consumer tests; version telemetry; old requests.

### Production boundary / trade-off

Version support increases test/maintenance matrix but permits independent rollout.

### Transfer variation

One frontend deploy → public/mobile/partner clients.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-sec-abuse-bruteforce-resource-business-flow

### Identity

- **Working title:** sec-abuse-bruteforce-resource-business-flow
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-abuse-bruteforce-resource-business-flow | Security | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Credential stuffing; OTP abuse; expensive export; scalping; IP-only limit bypass.

### State / data / mechanism trace

Valid endpoints/credentials can still be abused; budgets/signals need account/device/IP/resource/operation dimensions.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| sec-trust-boundary-threat-model | sec-abuse-bruteforce-resource-business-flow | actor, protected asset and abuse path across a trust boundary. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `sec-trust-boundary-threat-model`: **actor, protected asset and abuse path across a trust boundary.**; introduced only for `sec-abuse-bruteforce-resource-business-flow`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Attempt rate; account/device/IP/session; success ratio; resource cost; operation history; limit decision.

### Production boundary / trade-off

Aggressive limits reduce abuse but false-positive shared NAT/legitimate high volume.

### Transfer variation

Login brute force → authenticated costly business operation.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-sec-audit-detection-evidence

### Identity

- **Working title:** sec-audit-detection-evidence
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-audit-detection-evidence | Security | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Success/deny indistinguishable; no tenant target; token logged; audit mutable; noise hides sensitive action.

### State / data / mechanism trace

Audit records subject/action/target/outcome/correlation at trust/business boundary; detection derives signal from it.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| sec-trust-boundary-threat-model | sec-audit-detection-evidence | security-relevant actor, action, asset and trust boundary. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `sec-trust-boundary-threat-model`: **security-relevant actor, action, asset and trust boundary.**; introduced only for `sec-audit-detection-evidence`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Subject/action/object/tenant; decision/reason; operation ID; timestamp/source; controlled destination.

### Production boundary / trade-off

Detail helps investigation but increases privacy/storage/sensitive-data exposure.

### Transfer variation

Login audit → privileged export or tenant-admin change.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-sec-auth-session-token

### Identity

- **Working title:** sec-auth-session-token
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-auth-session-token | Security | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Expired accepted; wrong issuer/audience; fixation/reuse; logout assumed instant stateless revoke; token exposure.

### State / data / mechanism trace

Credential/session/token establishes identity only after issuer/signature/audience/lifetime/state checks as applicable.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| sec-trust-boundary-threat-model | sec-auth-session-token | actor, asset and trust-boundary identification. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `sec-trust-boundary-threat-model`: **actor, asset and trust-boundary identification.**; introduced only for `sec-auth-session-token`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Token/session metadata; issuer/audience/expiry; auth logs; revocation store; claims.

### Production boundary / trade-off

Self-contained token reduces lookup but makes immediate revoke/claim lifetime harder.

### Transfer variation

Server session → signed bearer token across services.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-sec-authorization-object-tenant

### Identity

- **Working title:** sec-authorization-object-tenant
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-authorization-object-tenant | Security | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

BOLA/IDOR; tenant request value trusted; admin UI-only guard; filter after data exposed.

### State / data / mechanism trace

Authorization evaluates subject + action + resource tenant/owner + policy, not just login.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| sec-auth-session-token | sec-authorization-object-tenant | authenticated subject and trusted identity claims. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| api-contract-resource-semantics | sec-authorization-object-tenant | requested action, target resource and operation semantics. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `sec-auth-session-token`: **authenticated subject and trusted identity claims.**; introduced only for `sec-authorization-object-tenant`, without source coverage or `PASSED` evidence.
- `api-contract-resource-semantics`: **requested action, target resource and operation semantics.**; introduced only for `sec-authorization-object-tenant`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Subject; policy decision; authoritative owner/tenant; negative tests; audit event.

### Production boundary / trade-off

Central policy improves consistency but needs resource data; duplicated checks drift.

### Transfer variation

User account → operator subset across tenant roles.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-sec-browser-boundaries-cors-csrf-xss

### Identity

- **Working title:** sec-browser-boundaries-cors-csrf-xss
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-browser-boundaries-cors-csrf-xss | Security | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

CORS assumed CSRF defense; wildcard credentials; cookie mutation no CSRF; unsafe content rendered HTML.

### State / data / mechanism trace

CORS controls browser cross-origin access; CSRF abuses ambient credentials; XSS executes attacker script in trusted origin.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| sec-trust-boundary-threat-model | sec-browser-boundaries-cors-csrf-xss | trusted versus untrusted actor/origin and protected asset/action. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| net-http-semantics | sec-browser-boundaries-cors-csrf-xss | HTTP request/response headers and credential-bearing request behavior. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `sec-trust-boundary-threat-model`: **trusted versus untrusted actor/origin and protected asset/action.**; introduced only for `sec-browser-boundaries-cors-csrf-xss`, without source coverage or `PASSED` evidence.
- `net-http-semantics`: **HTTP request/response headers and credential-bearing request behavior.**; introduced only for `sec-browser-boundaries-cors-csrf-xss`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Origin; CORS headers; cookie attributes; CSRF token; output context; browser test.

### Production boundary / trade-off

Controls depend on auth architecture; no blind CSRF defense on non-cookie token API.

### Transfer variation

Cookie app → bearer-token SPA/API.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-sec-injection-ssrf-input-output

### Identity

- **Working title:** sec-injection-ssrf-input-output
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-injection-ssrf-input-output | Security | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Concatenated SQL; NoSQL operator injection; metadata/internal fetch; shell composition; wrong-context encoding.

### State / data / mechanism trace

Injection changes command syntax; SSRF lets attacker choose server destination; typed binding/allow-list separates data/control.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| sec-trust-boundary-threat-model | sec-injection-ssrf-input-output | untrusted input crossing a trust boundary into a privileged action. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `sec-trust-boundary-threat-model`: **untrusted input crossing a trust boundary into a privileged action.**; introduced only for `sec-injection-ssrf-input-output`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Constructed query; parameter binding; destination policy; DNS/IP resolution; test payload; egress logs.

### Production boundary / trade-off

Strict allow-list reduces flexibility but enforces boundary; blacklist brittle.

### Transfer variation

SQL parameterization → dynamic filter → server-side URL fetch.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-sec-oauth-oidc-awareness

### Identity

- **Working title:** sec-oauth-oidc-awareness
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-oauth-oidc-awareness | Security | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

ID token used API token; wrong audience; code/token exposed; OAuth assumed arbitrary attribute proof.

### State / data / mechanism trace

OAuth delegates access to resource; OIDC adds identity info; client/resource/auth server roles differ.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| sec-auth-session-token | sec-oauth-oidc-awareness | authentication identity, token validation and caller session/token lifecycle. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `sec-auth-session-token`: **authentication identity, token validation and caller session/token lifecycle.**; introduced only for `sec-oauth-oidc-awareness`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Token type; issuer; audience; scope; client/resource IDs; AS metadata.

### Production boundary / trade-off

Delegation avoids local credentials but adds token/redirect/config trust boundary.

### Transfer variation

First-party SPA/API → external IdP or machine-to-machine API.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-sec-race-business-logic-abuse

### Identity

- **Working title:** sec-race-business-logic-abuse
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-race-business-logic-abuse | Security | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Coupon redeemed twice; concurrent spend; duplicate reservation; limit check before insert.

### State / data / mechanism trace

Attacker widens race window; pre-transition authorization/validation cannot protect non-atomic state change.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| concurrency-races-check-then-act | sec-race-business-logic-abuse | check-then-act interleaving and non-atomic state transition. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `concurrency-races-check-then-act`: **check-then-act interleaving and non-atomic state transition.**; introduced only for `sec-race-business-logic-abuse`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Parallel timeline; operation IDs; before/after state; DB constraint/conditional result; audit sequence.

### Production boundary / trade-off

Atomic storage/serialization costs contention/retry; Security owns adversarial application.

### Transfer variation

Accidental race → intentional exploit.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-sec-secrets-third-party-trust

### Identity

- **Working title:** sec-secrets-third-party-trust
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-secrets-third-party-trust | Security | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Secret repo/log; shared long-lived credential; unverified webhook/replay; upstream field trusted; rotation breaks fleet.

### State / data / mechanism trace

Secrets grant authority; callbacks cross boundary and need identity/integrity/schema/business validation.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| sec-trust-boundary-threat-model | sec-secrets-third-party-trust | authority-bearing asset and external trust boundary. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `sec-trust-boundary-threat-model`: **authority-bearing asset and external trust boundary.**; introduced only for `sec-secrets-third-party-trust`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Secret rotation/scope/audit; signature/timestamp; provider request/response; replay record.

### Production boundary / trade-off

Scoped short credential shrinks blast radius but increases rotation/dependency complexity.

### Transfer variation

Static API key → workload identity/signed webhook.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-sec-trust-boundary-threat-model

### Identity

- **Working title:** sec-trust-boundary-threat-model
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-trust-boundary-threat-model | Security | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Internal network assumed trusted; callback authoritative; tenant ID ownership proof; hidden admin endpoint missed.

### State / data / mechanism trace

Less-trusted data/identity crossing into trusted decision requires authz/validation/constraint proportional to risk.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Data-flow diagram; identity/source; asset/operation; boundary notes; abuse cases.

### Production boundary / trade-off

More isolation/control costs delivery; model meaningful assets not fear list.

### Transfer variation

Public API → API + worker + webhook callback.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-sec-unseen-attack-transfer

### Identity

- **Working title:** sec-unseen-attack-transfer
- **Learner-facing domain candidate:** Service & Network

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| sec-unseen-attack-transfer | Security | L4 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Patch one payload; UI-only control; symptom block leaves path; fix breaks legitimate tenant flow.

### State / data / mechanism trace

Authentication, authorization, input trust, resource abuse, race and audit compose through attacker capability and state transition.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| sec-authorization-object-tenant | sec-unseen-attack-transfer | subject-action-resource authorization using server-trusted ownership or tenant state. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| sec-injection-ssrf-input-output | sec-unseen-attack-transfer | untrusted input must remain data rather than control over a privileged sink or destination. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| sec-abuse-bruteforce-resource-business-flow | sec-unseen-attack-transfer | identity/resource/business-flow aware abuse reasoning. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| sec-race-business-logic-abuse | sec-unseen-attack-transfer | adversarial exploitation of a non-atomic business transition. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| sec-audit-detection-evidence | sec-unseen-attack-transfer | security audit timeline and evidence needed to investigate an action. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `sec-authorization-object-tenant`: **subject-action-resource authorization using server-trusted ownership or tenant state.**; introduced only for `sec-unseen-attack-transfer`, without source coverage or `PASSED` evidence.
- `sec-injection-ssrf-input-output`: **untrusted input must remain data rather than control over a privileged sink or destination.**; introduced only for `sec-unseen-attack-transfer`, without source coverage or `PASSED` evidence.
- `sec-abuse-bruteforce-resource-business-flow`: **identity/resource/business-flow aware abuse reasoning.**; introduced only for `sec-unseen-attack-transfer`, without source coverage or `PASSED` evidence.
- `sec-race-business-logic-abuse`: **adversarial exploitation of a non-atomic business transition.**; introduced only for `sec-unseen-attack-transfer`, without source coverage or `PASSED` evidence.
- `sec-audit-detection-evidence`: **security audit timeline and evidence needed to investigate an action.**; introduced only for `sec-unseen-attack-transfer`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Request/audit timeline; auth decision; state transition; resource usage; exploit/regression test.

### Production boundary / trade-off

Restriction reduces attack surface but adds false positives/friction/compatibility cost.

### Transfer variation

Known IDOR/race/SSRF → unlabeled production incident.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-obs-cardinality-sampling-cost

### Identity

- **Working title:** obs-cardinality-sampling-cost
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-cardinality-sampling-cost | Observability & Performance | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

User/order ID label; rare failure sampled away; head sampling loses slow trace; cost grows faster than traffic.

### State / data / mechanism trace

Metric label combinations create time-series cardinality; sampling retains subset by policy.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| obs-instrumentation-context | obs-cardinality-sampling-cost | instrumented attributes/context become metric dimensions or trace/log fields retained by telemetry systems. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `obs-instrumentation-context`: **instrumented attributes/context become metric dimensions or trace/log fields retained by telemetry systems.**; introduced only for `obs-cardinality-sampling-cost`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Series count; ingest/storage; sample rate; retained slow/error traces; cost.

### Production boundary / trade-off

Fidelity trades CPU/network/storage/privacy cost; sample is not full population truth.

### Transfer variation

Low volume API → multi-tenant traffic with user dimensions.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-obs-db-io-downstream-attribution

### Identity

- **Working title:** obs-db-io-downstream-attribution
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-db-io-downstream-attribution | Observability & Performance | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Slow endpoint blamed SQL; pool wait omitted; timeout called app processing; N+1 hidden aggregate.

### State / data / mechanism trace

End-to-end latency composes work/wait across boundaries; correlation compares candidates.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| obs-latency-throughput-saturation | obs-db-io-downstream-attribution | latency distribution, throughput and saturation represent different observable workload symptoms. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| obs-tracing-distributed-evidence | obs-db-io-downstream-attribution | span/dependency timing and causal boundaries across an operation. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `obs-latency-throughput-saturation`: **latency distribution, throughput and saturation represent different observable workload symptoms.**; introduced only for `obs-db-io-downstream-attribution`, without source coverage or `PASSED` evidence.
- `obs-tracing-distributed-evidence`: **span/dependency timing and causal boundaries across an operation.**; introduced only for `obs-db-io-downstream-attribution`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Trace timing; query/plan; acquisition wait; socket/downstream timing; queue wait; profile.

### Production boundary / trade-off

Fine attribution costs instrumentation; measure only decision boundaries.

### Transfer variation

Slow request → shared DB/downstream saturation.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-obs-diagnostic-method

### Identity

- **Working title:** obs-diagnostic-method
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-diagnostic-method | Observability & Performance | L4 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Dashboard-first guess; correlation as cause; confirmation bias; many variables changed; metric improves but user symptom remains.

### State / data / mechanism trace

Evidence changes confidence between plausible causes; dashboards without hypothesis are not diagnosis.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| obs-signals-correlation | obs-diagnostic-method | different telemetry signals answer different questions and need shared operation/resource context. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| obs-latency-throughput-saturation | obs-diagnostic-method | interpret latency distribution, rates, errors and finite-resource saturation as symptoms rather than root causes. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `obs-signals-correlation`: **different telemetry signals answer different questions and need shared operation/resource context.**; introduced only for `obs-diagnostic-method`, without source coverage or `PASSED` evidence.
- `obs-latency-throughput-saturation`: **interpret latency distribution, rates, errors and finite-resource saturation as symptoms rather than root causes.**; introduced only for `obs-diagnostic-method`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Trace/profile; allocation/GC; queue/pool; DB wait/plan; network timing; before/after.

### Production boundary / trade-off

Certainty may need invasive evidence; experiment balances value and production risk.

### Transfer variation

HTTP p99 → worker throughput collapse.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-obs-instrumentation-context

### Identity

- **Working title:** obs-instrumentation-context
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-instrumentation-context | Observability & Performance | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Span ends before async work; state transition missing; context lost in worker; token/payload logged.

### State / data / mechanism trace

Events/spans at meaningful transitions; propagated context links calls/tasks/messages.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| obs-signals-correlation | obs-instrumentation-context | metrics, logs and traces represent different evidence views connected by operation/context identity. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `obs-signals-correlation`: **metrics, logs and traces represent different evidence views connected by operation/context identity.**; introduced only for `obs-instrumentation-context`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Parent/child tree; operation ID; semantic attributes; structured log; headers/message metadata.

### Production boundary / trade-off

Attributes aid diagnosis but raise overhead/cardinality/privacy risk.

### Transfer variation

HTTP request → background consumer same operation.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-obs-latency-throughput-saturation

### Identity

- **Working title:** obs-latency-throughput-saturation
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-latency-throughput-saturation | Observability & Performance | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Average hides p99; throughput stable while queue grows; low CPU masks pool bottleneck; reject improves latency but errors ignored.

### State / data / mechanism trace

Throughput is completed work, latency distribution measures wait/work, saturation approaches finite capacity, errors are failed work.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

p50/p95/p99; rates; success/error; CPU; queue; pool; concurrency.

### Production boundary / trade-off

High utilization may improve efficiency but drives queue/tail latency near capacity.

### Transfer variation

100 RPS steady → burst plateaus throughput and raises queue/p99.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-obs-load-test-benchmark-validity

### Identity

- **Working title:** obs-load-test-benchmark-validity
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-load-test-benchmark-validity | Observability & Performance | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Cold startup claimed steady; tiny uniform data; generator bottleneck; microbenchmark claims throughput; no dependency failure.

### State / data / mechanism trace

Result is valid only for experiment conditions: concurrency, data, warm-up, environment.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| obs-latency-throughput-saturation | obs-load-test-benchmark-validity | throughput, p50/p95/p99 and saturation are workload-dependent measured properties. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `obs-latency-throughput-saturation`: **throughput, p50/p95/p99 and saturation are workload-dependent measured properties.**; introduced only for `obs-load-test-benchmark-validity`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Workload model; arrival/concurrency; dataset; warm-up; saturation; generator metrics; latency distribution.

### Production boundary / trade-off

Realism costs environment/time; simple benchmark only supports narrow claim.

### Transfer variation

Method microbenchmark → API load → skew/hot-key scenario.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-obs-logs-structured-correlation

### Identity

- **Working title:** obs-logs-structured-correlation
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-logs-structured-correlation | Observability & Performance | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

String-only regex; inconsistent field types; secret/PII; no resource/operation; noisy duplicates.

### State / data / mechanism trace

Stable fields make events queryable/correlatable instead of prose parsing.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| obs-signals-correlation | obs-logs-structured-correlation | logs are discrete telemetry events and correlation links them to the same logical operation/resource. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `obs-signals-correlation`: **logs are discrete telemetry events and correlation links them to the same logical operation/resource.**; introduced only for `obs-logs-structured-correlation`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Event schema; correlation ID; query result; volume.

### Production boundary / trade-off

More logs not more observability; use semantic events.

### Transfer variation

One logfile → centralized multi-replica/service logs.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-obs-profiling-runtime-evidence

### Identity

- **Working title:** obs-profiling-runtime-evidence
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-profiling-runtime-evidence | Observability & Performance | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Optimize without profile; CPU blamed GC; latency blamed CPU while I/O wait; non-representative capture.

### State / data / mechanism trace

Profiler/runtime diagnostics sample execution/allocation and reveal hotspot/wait unseen by endpoint metric.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| runtime-diagnostics | obs-profiling-runtime-evidence | hypothesis-driven selection of runtime diagnostic evidence. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `runtime-diagnostics`: **hypothesis-driven selection of runtime diagnostic evidence.**; introduced only for `obs-profiling-runtime-evidence`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

CPU samples; allocation; GC; stacks; ThreadPool queue; wait trace.

### Production boundary / trade-off

Deep profile has overhead and needs representative window.

### Transfer variation

CPU worker → ASP.NET p99 sync blocking/starvation.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-obs-signals-correlation

### Identity

- **Working title:** obs-signals-correlation
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-signals-correlation | Observability & Performance | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Metric spike lacks context; logs uncorrelated; trace ID lost async; collect all signals no question.

### State / data / mechanism trace

Metrics aggregate behavior, logs discrete structured events, traces causal path; context connects views.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Trace/span; operation ID; metric dimensions/time; fields; request timeline.

### Production boundary / trade-off

Correlation improves diagnosis but costs instrumentation/storage/privacy/cardinality.

### Transfer variation

Single request → async workflow across services.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-obs-tracing-distributed-evidence

### Identity

- **Working title:** obs-tracing-distributed-evidence
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| obs-tracing-distributed-evidence | Observability & Performance | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Missing child span; retry opaque; message link absent; trace assumed business completion; wrong attribution.

### State / data / mechanism trace

Spans represent timed operations with parent/causal relation; context links downstream when possible.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| obs-instrumentation-context | obs-tracing-distributed-evidence | propagate operation/trace context across an execution or service boundary. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `obs-instrumentation-context`: **propagate operation/trace context across an execution or service boundary.**; introduced only for `obs-tracing-distributed-evidence`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Span timeline; parent/link; duration; status; dependency attrs; retry attempts.

### Production boundary / trade-off

Detail costs instrumentation/sample/storage.

### Transfer variation

HTTP chain → producer/consumer span links.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-rel-cascading-failure-queue-capacity

### Identity

- **Working title:** rel-cascading-failure-queue-capacity
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-cascading-failure-queue-capacity | Reliability / SRE | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Long timeout holds workers; retries multiply; unbounded queue; shared pool starvation.

### State / data / mechanism trace

Slow dependency extends in-flight lifetime; queues/retries consume finite caller resources and propagate pressure.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| rel-overload-load-shedding-degradation | rel-cascading-failure-queue-capacity | demand beyond sustainable capacity causes queue/resource growth and requires bounded admission/degradation. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `rel-overload-load-shedding-degradation`: **demand beyond sustainable capacity causes queue/resource growth and requires bounded admission/degradation.**; introduced only for `rel-cascading-failure-queue-capacity`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Dependency latency; in-flight; queue age; retry rate; pools; error timeline.

### Production boundary / trade-off

Buffer absorbs burst but excess queue turns slowdown into long-tail cascade.

### Transfer variation

Slow DB → service chain sharing resources.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-rel-change-rollout-rollback-risk

### Identity

- **Working title:** rel-change-rollout-rollback-risk
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-change-rollout-rollback-risk | Reliability / SRE | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

100% deploy; schema rollback incompatibility; unrepresentative canary; flag doesn’t undo effect; health misses business failure.

### State / data / mechanism trace

Progressive exposure limits blast radius; rollback works only while code/data/config compatible.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Version; traffic percentage; SLI/error by version; schema/config; business KPI; rollback result.

### Production boundary / trade-off

Staging slows delivery but limits blast radius/provides evidence.

### Transfer variation

Stateless API → schema/event mixed-version change.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-rel-dependency-budgets

### Identity

- **Working title:** rel-dependency-budgets
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-dependency-budgets | Reliability / SRE | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Child timeout exceeds caller; nested retries; optional blocks critical; dependency reliability insufficient.

### State / data / mechanism trace

User journey has finite time/error capacity; each dependency/retry consumes a portion.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| api-deadlines-timeout-cancellation | rel-dependency-budgets | remaining time budget and propagated deadline/cancellation boundary. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `api-deadlines-timeout-cancellation`: **remaining time budget and propagated deadline/cancellation boundary.**; introduced only for `rel-dependency-budgets`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Deadline; per-hop timeout; retries; dependency latency/error; critical trace; budget.

### Production boundary / trade-off

More child budget helps slow success but leaves less fallback time.

### Transfer variation

One dependency → fan-out varied criticality.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-rel-disaster-recovery-rpo-rto

### Identity

- **Working title:** rel-disaster-recovery-rpo-rto
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-disaster-recovery-rpo-rto | Reliability / SRE | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Restore slower RTO; replica assumed backup; restore point misses RPO; config/secrets missing; no drill.

### State / data / mechanism trace

RPO bounds loss window; RTO restoration time; capability depends backup/replication/rebuild and dependencies.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| db-backup-restore | rel-disaster-recovery-rpo-rto | backup/restore mechanism, recovered data point and measured restore duration. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `db-backup-restore`: **backup/restore mechanism, recovered data point and measured restore duration.**; introduced only for `rel-disaster-recovery-rpo-rto`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Restore result; recovered time; data delta; duration; checklist; exercise report.

### Production boundary / trade-off

Lower RPO/RTO needs more replication, automation, capacity/cost.

### Transfer variation

DB restore → service recovery including broker/read models/config.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-rel-failure-injection-verification

### Identity

- **Working title:** rel-failure-injection-verification
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-failure-injection-verification | Reliability / SRE | L4 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Chaos no hypothesis; too broad blast; unrealistic fault; infra survives user journey fails; recovery unverified.

### State / data / mechanism trace

Inject one controlled fault, predict, observe user/system evidence, compare outcome and stop safely.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| test-failure-resilience | rel-failure-injection-verification | controlled failure injection, expected invariant/outcome and repeatable post-failure verification. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| rel-user-journey-sli-slo-budget | rel-failure-injection-verification | user-impact reliability target and observable SLI for the experiment. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `test-failure-resilience`: **controlled failure injection, expected invariant/outcome and repeatable post-failure verification.**; introduced only for `rel-failure-injection-verification`, without source coverage or `PASSED` evidence.
- `rel-user-journey-sli-slo-budget`: **user-impact reliability target and observable SLI for the experiment.**; introduced only for `rel-failure-injection-verification`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Hypothesis; fault; scope; SLI; queues; recovery; stop condition; state.

### Production boundary / trade-off

Realism yields confidence but introduces controlled risk/cost.

### Transfer variation

Local dependency kill → shared dependency degradation under load.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-rel-health-readiness-semantics

### Identity

- **Working title:** rel-health-readiness-semantics
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-health-readiness-semantics | Reliability / SRE | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

DB outage restarts fleet; ready before warmup; ready while incapable; expensive probe; transient removal.

### State / data / mechanism trace

Liveness means no useful progress; readiness means traffic eligibility; dependency signal need not trigger death.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Probe reason; restart count; ready endpoints; dependency state; routing; startup/drain.

### Production boundary / trade-off

Sensitive probes remove bad nodes quickly but amplify shared failure.

### Transfer variation

Process health → Kubernetes service/LB deployment.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-rel-incident-response-postmortem

### Identity

- **Working title:** rel-incident-response-postmortem
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-incident-response-postmortem | Reliability / SRE | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Risky experiment pre-mitigation; many changes destroy evidence; blame; vague action; prevention unverified.

### State / data / mechanism trace

Contain user impact first; root cause follows stabilization; timeline prevents hindsight.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Timeline; impact; actions; snapshots; hypothesis; mitigation; owner/test.

### Production boundary / trade-off

Fast mitigation may reduce feature/capacity; impact boundary beats diagnostic purity.

### Transfer variation

One outage → multi-service cascade.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-rel-overload-load-shedding-degradation

### Identity

- **Working title:** rel-overload-load-shedding-degradation
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-overload-load-shedding-degradation | Reliability / SRE | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Accept until OOM; shed after expensive work; fallback equally costly; batch starves interactive; degradation incorrect.

### State / data / mechanism trace

Demand beyond capacity grows queue/resource use; admission/degradation bounds work.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| concurrency-bounded-backpressure | rel-overload-load-shedding-degradation | finite service/downstream capacity and bounded in-flight work. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| obs-latency-throughput-saturation | rel-overload-load-shedding-degradation | observable saturation and latency/throughput behavior near finite capacity. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `concurrency-bounded-backpressure`: **finite service/downstream capacity and bounded in-flight work.**; introduced only for `rel-overload-load-shedding-degradation`, without source coverage or `PASSED` evidence.
- `obs-latency-throughput-saturation`: **observable saturation and latency/throughput behavior near finite capacity.**; introduced only for `rel-overload-load-shedding-degradation`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Rates; queue/in-flight; saturation; rejection; critical latency; user impact.

### Production boundary / trade-off

Partial rejection trades for avoiding total failure; Concurrency owns portable bound.

### Transfer variation

One endpoint → several services overload shared DB.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-rel-user-journey-sli-slo-budget

### Identity

- **Working title:** rel-user-journey-sli-slo-budget
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| rel-user-journey-sli-slo-budget | Reliability / SRE | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Uptime hides broken journey; arbitrary SLO; wrong denominator; equal criticality; 100% policy.

### State / data / mechanism trace

SLI measures behavior; SLO target over window; budget is allowed gap from perfect.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| obs-latency-throughput-saturation | rel-user-journey-sli-slo-budget | latency distribution, success/error rate and workload measurements can represent user-observable service behavior. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `obs-latency-throughput-saturation`: **latency distribution, success/error rate and workload measurements can represent user-observable service behavior.**; introduced only for `rel-user-journey-sli-slo-budget`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Journey; good/total; latency/success; window; budget; failures.

### Production boundary / trade-off

Stricter SLO costs engineering/slows change; looser violates expectation.

### Transfer variation

Endpoint availability → multi-step journey with dependency/latency.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-test-ci-flakiness-repeatability

### Identity

- **Working title:** test-ci-flakiness-repeatability
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-ci-flakiness-repeatability | Testing & Engineering Quality | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Order dependency; shared DB/static; port collision; external network; timing race; retry hides flake.

### State / data / mechanism trace

Trustworthy test gives same verdict for same state; hidden clock/order/network/shared state breaks repeatability.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| test-risk-strategy-boundaries | test-ci-flakiness-repeatability | relevant test state, intended invariant and trustworthy verdict boundary. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `test-risk-strategy-boundaries`: **relevant test state, intended invariant and trustworthy verdict boundary.**; introduced only for `test-ci-flakiness-repeatability`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Repeat history; seed; test order; worker/env; resource owner; timing; failure artifact.

### Production boundary / trade-off

Quarantine unblocks temporarily but reduces protection; retry never proves health.

### Transfer variation

Local stable → parallel constrained CI workers.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-test-failure-resilience

### Identity

- **Working title:** test-failure-resilience
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-failure-resilience | Testing & Engineering Quality | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Timeout only exception checked; retry duplicates; partial DB write; wrong fallback authority; stub always success.

### State / data / mechanism trace

Inject known boundary failure then assert observable result and post-recovery state.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| test-risk-strategy-boundaries | test-failure-resilience | identify the risky boundary, expected behavior and invariant under failure. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `test-risk-strategy-boundaries`: **identify the risky boundary, expected behavior and invariant under failure.**; introduced only for `test-failure-resilience`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Injected fault; attempts; persisted/audit state; operation ID; result; recovery state.

### Production boundary / trade-off

Setup cost directly falsifies production assumptions happy path misses.

### Transfer variation

HTTP timeout → broker redelivery → DB deadlock retry.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-test-migration-compatibility

### Identity

- **Working title:** test-migration-compatibility
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-migration-compatibility | Testing & Engineering Quality | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

New reads column before migration; old cannot read new state; destructive early change; rollback incompatible; old fixture fails.

### State / data / mechanism trace

Test production transitional states, not only final migration state.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| test-risk-strategy-boundaries | test-migration-compatibility | derive test boundary and failure risk from a change that spans multiple versions or persisted representations. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `test-risk-strategy-boundaries`: **derive test boundary and failure risk from a change that spans multiple versions or persisted representations.**; introduced only for `test-migration-compatibility`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Old/new fixture; schema version; old data/event/request; migration; rollback test.

### Production boundary / trade-off

Matrix costs fixtures/time but catches release defect invisible final state.

### Transfer variation

DB migration → DB + API/event rolling migration.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-test-property-boundary-fuzz

### Identity

- **Working title:** test-property-boundary-fuzz
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-property-boundary-fuzz | Testing & Engineering Quality | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Size boundary; malformed parser combination; rare sequence violates invariant; weak property; seed lost.

### State / data / mechanism trace

Property states behavior over many input; boundary targets transitions; fuzz explores omitted combinations.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| prog-invariants-domain-model | test-property-boundary-fuzz | state or behavior invariant that all valid executions/inputs must preserve. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `prog-invariants-domain-model`: **state or behavior invariant that all valid executions/inputs must preserve.**; introduced only for `test-property-boundary-fuzz`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Property; seed/input; shrunk example; boundary values; reproducible case.

### Production boundary / trade-off

Broad exploration finds unknowns but needs reproducible diagnosis.

### Transfer variation

Numeric boundary → nested API/message payload.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-test-real-dependency-fixtures

### Identity

- **Working title:** test-real-dependency-fixtures
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-real-dependency-fixtures | Testing & Engineering Quality | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

In-memory differs PostgreSQL; mock broker misses redelivery; shared DB leak; version mismatch; wrong migration.

### State / data / mechanism trace

Fixture provides controlled real instance/state, observing constraint/transaction/serialization/broker behavior.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| test-unit-integration-contract | test-real-dependency-fixtures | difference between local isolated behavior and an integration boundary whose real semantics matter. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `test-unit-integration-contract`: **difference between local isolated behavior and an integration boundary whose real semantics matter.**; introduced only for `test-real-dependency-fixtures`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Version; migration; seed; health; persisted/message result; cleanup/isolation.

### Production boundary / trade-off

Fidelity trades startup/infra/cleanup cost.

### Transfer variation

Mock repo → disposable PostgreSQL → DB + broker fixture.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-test-review-static-analysis-change-safety

### Identity

- **Working title:** test-review-static-analysis-change-safety
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-review-static-analysis-change-safety | Testing & Engineering Quality | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Style-only review; unexplained suppression; AI diff accepted green; test old requirement; risky diff no regression.

### State / data / mechanism trace

Static finds non-executed classes; review assesses intent/boundary; tests exercise dynamic behavior.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| test-risk-strategy-boundaries | test-review-static-analysis-change-safety | identify changed invariant, contract or failure boundary that deserves evidence. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `test-risk-strategy-boundaries`: **identify changed invariant, contract or failure boundary that deserves evidence.**; introduced only for `test-review-static-analysis-change-safety`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Diff; review rationale; analyzer; invariant/contract; regression test; before/after.

### Production boundary / trade-off

Strong gates slow change but catch pre-runtime risk; noisy rules lose signal.

### Transfer variation

Hand patch → broad AI refactor across boundaries.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-test-risk-strategy-boundaries

### Identity

- **Working title:** test-risk-strategy-boundaries
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-risk-strategy-boundaries | Testing & Engineering Quality | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Mock removes mechanism; E2E for pure logic; coverage misses path; implementation-shaped test.

### State / data / mechanism trace

Test value falsifies risky assumption at narrowest boundary that retains actual mechanism.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Risk statement; boundary; reproduced failure; invariant assertion; escaped defect history.

### Production boundary / trade-off

Narrow fast/local vs wider real-boundary confidence.

### Transfer variation

Pure domain rule → PostgreSQL transaction behavior.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-test-risk-transfer

### Identity

- **Working title:** test-risk-transfer
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-risk-transfer | Testing & Engineering Quality | L4 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Copy old shape after boundary moved; mock removes new failure; E2E no localization; green proves untested assumption.

### State / data / mechanism trace

Strategy derives from risk/mechanism, not copied feature test structure.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| test-unit-integration-contract | test-risk-transfer | choose unit, integration or contract boundary according to where the behavior can actually fail. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| test-failure-resilience | test-risk-transfer | inject a controlled failure and verify durable state, outcome and recovery invariant. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `test-unit-integration-contract`: **choose unit, integration or contract boundary according to where the behavior can actually fail.**; introduced only for `test-risk-transfer`, without source coverage or `PASSED` evidence.
- `test-failure-resilience`: **inject a controlled failure and verify durable state, outcome and recovery invariant.**; introduced only for `test-risk-transfer`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Risk matrix; boundary; failing/passing fixture; real state; rejected alternative rationale.

### Production boundary / trade-off

Breadth/depth raises confidence and maintenance; focus unique high-risk mechanism.

### Transfer variation

Monolith write → event/projection eventual consistency.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-test-time-concurrency-determinism

### Identity

- **Working title:** test-time-concurrency-determinism
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-time-concurrency-determinism | Testing & Engineering Quality | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Thread.Sleep; occasional race pass; assertion before work done; wall-clock expiry flake; shared mutable tests.

### State / data / mechanism trace

Clock, barrier, scheduling point and test-data ownership intentionally reach desired state.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| concurrency-races-check-then-act | test-time-concurrency-determinism | check-then-act race window and concrete unsafe interleaving. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `concurrency-races-check-then-act`: **check-then-act race window and concrete unsafe interleaving.**; introduced only for `test-time-concurrency-determinism`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Gate events; controlled clock; task completion; captured interleaving; repeated stability.

### Production boundary / trade-off

Seam adds design surface but converts probabilistic failure to evidence.

### Transfer variation

TTL → race → cancellation/shutdown.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-test-unit-integration-contract

### Identity

- **Working title:** test-unit-integration-contract
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| test-unit-integration-contract | Testing & Engineering Quality | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Mock repo claimed SQL; HTTP 200 DB wrong; semantic provider change missed; duplicate layers no evidence.

### State / data / mechanism trace

Unit isolates deterministic logic; integration runs real collaborator; contract verifies external compatibility.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| test-risk-strategy-boundaries | test-unit-integration-contract | identify the risky assumption and the narrowest trustworthy boundary that still contains the real mechanism. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `test-risk-strategy-boundaries`: **identify the risky assumption and the narrowest trustworthy boundary that still contains the real mechanism.**; introduced only for `test-unit-integration-contract`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Real dependency state; contract; DB rows; double boundary; failure lost when wrong layer mocked.

### Production boundary / trade-off

Real boundary confidence costs setup/debug; isolation cannot prove omitted semantics.

### Transfer variation

Single-repo API → independent consumer/provider.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-arch-boundaries-ownership

### Identity

- **Working title:** arch-boundaries-ownership
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-boundaries-ownership | Architecture & System Design | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Service per table; shared DB mutation; split invariant; chatty arbitrary decomposition; no owner.

### State / data / mechanism trace

Boundary grants one owner authority over state/rules; crossing it needs explicit contract.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| prog-invariants-domain-model | arch-boundaries-ownership | business-valid state, invariant and the authority responsible for preserving it. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `prog-invariants-domain-model`: **business-valid state, invariant and the authority responsible for preserving it.**; introduced only for `arch-boundaries-ownership`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

State owner; write paths; invariant; API/event dependencies; coupling; deployment owner.

### Production boundary / trade-off

Finer boundary enables isolation/change but adds contracts/network/consistency.

### Transfer variation

Modular monolith → extract one independently owned capability.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-arch-consistency-latency-availability

### Identity

- **Working title:** arch-consistency-latency-availability
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-consistency-latency-availability | Architecture & System Design | L4 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Eventual for atomic invariant; strong for harmless report; CAP slogan; stale window undefined.

### State / data / mechanism trace

Operations need different visibility/order; stronger coordination affects latency/availability.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| arch-requirements-quality-attributes | arch-consistency-latency-availability | required correctness and quality-attribute scenario. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| prog-invariants-domain-model | arch-consistency-latency-availability | business invariant and valid state transition. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| dist-consistency-linearizability | arch-consistency-latency-availability | allowed read/write histories and the coordination implications of stronger visibility guarantees. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `arch-requirements-quality-attributes`: **required correctness and quality-attribute scenario.**; introduced only for `arch-consistency-latency-availability`, without source coverage or `PASSED` evidence.
- `prog-invariants-domain-model`: **business invariant and valid state transition.**; introduced only for `arch-consistency-latency-availability`, without source coverage or `PASSED` evidence.
- `dist-consistency-linearizability`: **allowed read/write histories and the coordination implications of stronger visibility guarantees.**; introduced only for `arch-consistency-latency-availability`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Invariant; history; source/replica role; SLO; failure assumption; reconciliation path.

### Production boundary / trade-off

Coordination buys correctness at latency/availability/operational cost.

### Transfer variation

Catalog projection → balance/inventory reservation.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-arch-cost-complexity-changeability

### Identity

- **Working title:** arch-cost-complexity-changeability
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-cost-complexity-changeability | Architecture & System Design | L4 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Microservices no change need; résumé Kafka/Redis/K8s; irrelevant optimization; lock-in ignored.

### State / data / mechanism trace

Component/boundary creates deploy, failure, data movement, skills, cloud and migration cost.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| arch-requirements-quality-attributes | arch-cost-complexity-changeability | explicit quality attribute or constraint that a mechanism is intended to buy. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `arch-requirements-quality-attributes`: **explicit quality attribute or constraint that a mechanism is intended to buy.**; introduced only for `arch-cost-complexity-changeability`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Component count; ownership/incident burden; cost; latency/capacity; change frequency.

### Production boundary / trade-off

Extra mechanism justified only for required property worth lifecycle cost.

### Transfer variation

Startup → growth constraints or simplify after shrink.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-arch-data-ownership-source-of-truth

### Identity

- **Working title:** arch-data-ownership-source-of-truth
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-data-ownership-source-of-truth | Architecture & System Design | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Two authorities; cache/search mutated as source; reporting write leaks; unrebuildable projection; migration ambiguity.

### State / data / mechanism trace

One owner accepts transition; derived systems copy/calculate with different freshness.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| arch-boundaries-ownership | arch-data-ownership-source-of-truth | one boundary owns state/rules and crossing that boundary requires an explicit contract. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `arch-boundaries-ownership`: **one boundary owns state/rules and crossing that boundary requires an explicit contract.**; introduced only for `arch-data-ownership-source-of-truth`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Write paths; source version; update flow; derived copy; rebuild/reconcile.

### Production boundary / trade-off

Single authority simplifies correctness but can require async stale views.

### Transfer variation

DB source → Redis + search + analytics projection.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-arch-decision-communication-transfer

### Identity

- **Working title:** arch-decision-communication-transfer
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-decision-communication-transfer | Architecture & System Design | L4 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Diagram no rationale; universal best practice; rejected choices hidden; stale decision persists.

### State / data / mechanism trace

Explicit assumptions let future engineer know why/when decision changes.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| arch-requirements-quality-attributes | arch-decision-communication-transfer | requirements, constraints and assumptions that define decision context. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `arch-requirements-quality-attributes`: **requirements, constraints and assumptions that define decision context.**; introduced only for `arch-decision-communication-transfer`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

ADR; capacity evidence; option comparison; risk; revisit condition; outcome.

### Production boundary / trade-off

Documentation costs time but prevents repeated debate/cargo cult.

### Transfer variation

10x traffic, compliance, team split or weaker latency need.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-arch-evolution-migration-strangler

### Identity

- **Working title:** arch-evolution-migration-strangler
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-evolution-migration-strangler | Architecture & System Design | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Big bang; dual write no reconcile; divergence; rollback impossible; seam permanent.

### State / data / mechanism trace

Add seam, route subset, keep compatibility/ownership, observe then remove old.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| arch-boundaries-ownership | arch-evolution-migration-strangler | state/rule owner and explicit contract across the migration seam. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| prog-api-refactoring-change-safety | arch-evolution-migration-strangler | change-safe refactoring preserves required behavior and makes compatibility impact explicit. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `arch-boundaries-ownership`: **state/rule owner and explicit contract across the migration seam.**; introduced only for `arch-evolution-migration-strangler`, without source coverage or `PASSED` evidence.
- `prog-api-refactoring-change-safety`: **change-safe refactoring preserves required behavior and makes compatibility impact explicit.**; introduced only for `arch-evolution-migration-strangler`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Traffic split; old/new comparison; compatibility; progress; reconcile; rollback.

### Production boundary / trade-off

Temporary duplication reduces blast radius but costs complexity.

### Transfer variation

Legacy module → service or old datastore → new live.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-arch-failure-recovery-security-observability

### Identity

- **Working title:** arch-failure-recovery-security-observability
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-failure-recovery-security-observability | Architecture & System Design | L4 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

No timeout/recovery owner; unmodeled trust path; async uncorrelated; dependency collapse; no recovery plan.

### State / data / mechanism trace

Critical transition needs failure behavior, recovery owner, trust path and diagnostic evidence.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| arch-boundaries-ownership | arch-failure-recovery-security-observability | component/state owner and explicit cross-boundary contracts. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| dist-partial-failure-uncertainty | arch-failure-recovery-security-observability | independent component/path failure and uncertainty. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| sec-trust-boundary-threat-model | arch-failure-recovery-security-observability | trust boundary, protected asset and untrusted actor/input path. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| obs-signals-correlation | arch-failure-recovery-security-observability | telemetry signals can be correlated around a logical operation or resource. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| rel-user-journey-sli-slo-budget | arch-failure-recovery-security-observability | meaningful user journey and measurable reliability target. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `arch-boundaries-ownership`: **component/state owner and explicit cross-boundary contracts.**; introduced only for `arch-failure-recovery-security-observability`, without source coverage or `PASSED` evidence.
- `dist-partial-failure-uncertainty`: **independent component/path failure and uncertainty.**; introduced only for `arch-failure-recovery-security-observability`, without source coverage or `PASSED` evidence.
- `sec-trust-boundary-threat-model`: **trust boundary, protected asset and untrusted actor/input path.**; introduced only for `arch-failure-recovery-security-observability`, without source coverage or `PASSED` evidence.
- `obs-signals-correlation`: **telemetry signals can be correlated around a logical operation or resource.**; introduced only for `arch-failure-recovery-security-observability`, without source coverage or `PASSED` evidence.
- `rel-user-journey-sli-slo-budget`: **meaningful user journey and measurable reliability target.**; introduced only for `arch-failure-recovery-security-observability`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Failure table; recovery owner; data flow; telemetry path; RPO/RTO/SLO; operation ID.

### Production boundary / trade-off

Operability adds implementation/operating cost; mechanisms stay owned by their tracks.

### Transfer variation

Normal dependency → outage/security/recovery case.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-arch-requirements-quality-attributes

### Identity

- **Working title:** arch-requirements-quality-attributes
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-requirements-quality-attributes | Architecture & System Design | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Technology-first; scale no number; conflict implicit; optional feature drives core; imagined hyperscale.

### State / data / mechanism trace

Decisions only matter against correctness, latency, availability, throughput, durability, security, operability, changeability and cost needs.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Requirement list; quality scenario; traffic/data estimates; constraints; assumption register.

### Production boundary / trade-off

Explicitness improves decision until speculative precision becomes theatre.

### Transfer variation

100-user internal → burst/SLO/compliance external.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-arch-scale-capacity-partitioning

### Identity

- **Working title:** arch-scale-capacity-partitioning
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-scale-capacity-partitioning | Architecture & System Design | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Add replicas while DB saturated; shard without pattern; skew; late autoscale; ignore burst/concurrency.

### State / data / mechanism trace

Scale-out helps only distributable work and cannot remove shared bottleneck.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| arch-requirements-quality-attributes | arch-scale-capacity-partitioning | traffic/data estimates, quality constraints and explicit scale assumptions. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| obs-latency-throughput-saturation | arch-scale-capacity-partitioning | throughput, concurrency, latency and saturation reveal a capacity boundary. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `arch-requirements-quality-attributes`: **traffic/data estimates, quality constraints and explicit scale assumptions.**; introduced only for `arch-scale-capacity-partitioning`, without source coverage or `PASSED` evidence.
- `obs-latency-throughput-saturation`: **throughput, concurrency, latency and saturation reveal a capacity boundary.**; introduced only for `arch-scale-capacity-partitioning`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Rate; concurrency; CPU/memory; downstream capacity; key distribution; queue/latency.

### Production boundary / trade-off

Partitions/replicas add capacity but routing/coordination/cost.

### Transfer variation

Service/DB → replicas → sharded ownership after bottleneck known.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-arch-sync-async-integration

### Identity

- **Working title:** arch-sync-async-integration
- **Learner-facing domain candidate:** Architecture & Engineering Reasoning

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| arch-sync-async-integration | Architecture & System Design | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Async for scale only; long workflow blocks chain; immediate answer via event; sync cascade; async no status.

### State / data / mechanism trace

Sync couples caller lifetime to response; async decouples time but needs durable state/retry/completion model.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| arch-requirements-quality-attributes | arch-sync-async-integration | required response/completion behavior and relevant quality constraints. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| net-http-semantics | arch-sync-async-integration | request/response operation and caller-visible completion semantics. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| msg-model-queue-topic-partition-order | arch-sync-async-integration | message destination, delivery boundary and independently processed work. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `arch-requirements-quality-attributes`: **required response/completion behavior and relevant quality constraints.**; introduced only for `arch-sync-async-integration`, without source coverage or `PASSED` evidence.
- `net-http-semantics`: **request/response operation and caller-visible completion semantics.**; introduced only for `arch-sync-async-integration`, without source coverage or `PASSED` evidence.
- `msg-model-queue-topic-partition-order`: **message destination, delivery boundary and independently processed work.**; introduced only for `arch-sync-async-integration`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Required response; critical path; availability; operation state; queue/lag; recovery.

### Production boundary / trade-off

Sync simple/immediate vs runtime coupling; async decoupling vs state complexity.

### Transfer variation

Inventory lookup → order/payment fulfillment.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-delivery-artifact-image-config

### Identity

- **Working title:** delivery-artifact-image-config
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-artifact-image-config | Containers / Kubernetes / Cloud Delivery | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Rebuild production differently; latest tag lost provenance; secret baked image; config drift; unknown rollback artifact.

### State / data / mechanism trace

Build creates versioned image; runtime injects config; same digest promotes environments.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Digest/tag; Git SHA; config source; SBOM/provenance; deployed identity.

### Production boundary / trade-off

Promotion metadata adds discipline but makes audit/rollback reliable.

### Transfer variation

dotnet publish → container UAT → production digest.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-delivery-autoscaling-signal-boundary

### Identity

- **Working title:** delivery-autoscaling-signal-boundary
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-autoscaling-signal-boundary | Containers / Kubernetes / Cloud Delivery | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

CPU for I/O bottleneck; consumers beyond DB; burst faster scale; hot partition; cold scale violates latency.

### State / data / mechanism trace

Autoscaler observes signal then changes replicas after delay; scale helps parallel app work but can increase downstream pressure.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| obs-latency-throughput-saturation | delivery-autoscaling-signal-boundary | throughput, queue/concurrency, latency and saturation identify a real capacity boundary. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| delivery-resources-cpu-memory | delivery-autoscaling-signal-boundary | platform CPU/memory requests, limits and constrained workload behavior. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `obs-latency-throughput-saturation`: **throughput, queue/concurrency, latency and saturation identify a real capacity boundary.**; introduced only for `delivery-autoscaling-signal-boundary`, without source coverage or `PASSED` evidence.
- `delivery-resources-cpu-memory`: **platform CPU/memory requests, limits and constrained workload behavior.**; introduced only for `delivery-autoscaling-signal-boundary`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Signal; replicas; CPU/queue/concurrency; downstream; events; p95/p99.

### Production boundary / trade-off

Aggressive scaling raises headroom but cost/churn/downstream load.

### Transfer variation

CPU service → queue consumer sharing DB pool.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-delivery-cicd-promotion-provenance

### Identity

- **Working title:** delivery-cicd-promotion-provenance
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-cicd-promotion-provenance | Containers / Kubernetes / Cloud Delivery | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Separate prod rebuild; tag moves digest; no source tie; manual bypass; rollback artifact absent.

### State / data / mechanism trace

CI builds once; registry stores immutable artifact; CD promotes exact reference.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| delivery-artifact-image-config | delivery-cicd-promotion-provenance | versioned artifact/image, digest and separation of build from runtime configuration. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `delivery-artifact-image-config`: **versioned artifact/image, digest and separation of build from runtime configuration.**; introduced only for `delivery-cicd-promotion-provenance`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

SHA; pipeline run; digest; registry metadata; deployment record; approval.

### Production boundary / trade-off

Discipline/storage cost buys reproducibility/audit/rollback.

### Transfer variation

Manual binary → CI image promotion.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-delivery-cloud-responsibility-managed-services

### Identity

- **Working title:** delivery-cloud-responsibility-managed-services
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-cloud-responsibility-managed-services | Containers / Kubernetes / Cloud Delivery | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Managed DB assumed infallible; restore unclear; provider SLA equals app SLO; IAM/network ignored; queue semantics assumed same.

### State / data / mechanism trace

Provider manages agreed hardware/control plane, but app owns usage, model, access, capacity, failure behavior/cost and often recovery verification.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| — | — | — | — | No incoming REQUIRED relation. |

### Local Prerequisite Slices

None.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Service contract; config; IAM; recovery; quota; telemetry; cost.

### Production boundary / trade-off

Managed reduces undifferentiated ops but costs/constraints/lock-in/control.

### Transfer variation

Self-hosted DB/Redis/broker → cloud managed.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-delivery-container-process-lifecycle

### Identity

- **Working title:** delivery-container-process-lifecycle
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-container-process-lifecycle | Containers / Kubernetes / Cloud Delivery | L2 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Child lifecycle wrong; PID assumption; durable data ephemeral FS; restart equals recovery.

### State / data / mechanism trace

Runtime starts process with filesystem/network/resource boundaries; container lifetime follows primary process.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| os-process-thread-kernel | delivery-container-process-lifecycle | process lifetime, process identity and user/kernel execution boundary. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `os-process-thread-kernel`: **process lifetime, process identity and user/kernel execution boundary.**; introduced only for `delivery-container-process-lifecycle`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Process tree; state/restart; mounts; exit code; runtime events.

### Production boundary / trade-off

Packaging improves reproducibility but not durable state/app recovery.

### Transfer variation

Bare process → .NET service container.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-delivery-graceful-shutdown-draining

### Identity

- **Working title:** delivery-graceful-shutdown-draining
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-graceful-shutdown-draining | Containers / Kubernetes / Cloud Delivery | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Still routed after SIGTERM; ack after lost work; grace short; LB delay ignored; no durable handoff.

### State / data / mechanism trace

Termination → readiness removal → signal → grace window → drain/cancel/ack/release → exit.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| os-termination-graceful-shutdown | delivery-graceful-shutdown-draining | termination signal, finite shutdown lifetime and resource release before process exit. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| delivery-container-process-lifecycle | delivery-graceful-shutdown-draining | container/process start, running and termination lifecycle. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `os-termination-graceful-shutdown`: **termination signal, finite shutdown lifetime and resource release before process exit.**; introduced only for `delivery-graceful-shutdown-draining`, without source coverage or `PASSED` evidence.
- `delivery-container-process-lifecycle`: **container/process start, running and termination lifecycle.**; introduced only for `delivery-graceful-shutdown-draining`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Termination/readiness time; endpoints; active work; signal; grace; exit.

### Production boundary / trade-off

Longer drain reduces loss but slows rollout; beyond grace needs durable handoff.

### Transfer variation

Process shutdown → K8s HTTP + consumer rollout.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-delivery-platform-evidence-debug

### Identity

- **Working title:** delivery-platform-evidence-debug
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-platform-evidence-debug | Containers / Kubernetes / Cloud Delivery | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

CrashLoop no exit reason; pending pod app-log only; OOMKill normal crash; mount ignored; selector mismatch.

### State / data / mechanism trace

Platform state/events cover scheduling, startup, probes, resources/restarts; app logs alone omit not-running cause.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| delivery-container-process-lifecycle | delivery-platform-evidence-debug | container/process lifecycle, exit state and platform-controlled restart boundary. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| delivery-resources-cpu-memory | delivery-platform-evidence-debug | requests/limits, CPU throttling, working memory and platform resource-termination behavior. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| delivery-probes-health | delivery-platform-evidence-debug | probe configuration, readiness state, restart/routing action and probe failure reason. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `delivery-container-process-lifecycle`: **container/process lifecycle, exit state and platform-controlled restart boundary.**; introduced only for `delivery-platform-evidence-debug`, without source coverage or `PASSED` evidence.
- `delivery-resources-cpu-memory`: **requests/limits, CPU throttling, working memory and platform resource-termination behavior.**; introduced only for `delivery-platform-evidence-debug`, without source coverage or `PASSED` evidence.
- `delivery-probes-health`: **probe configuration, readiness state, restart/routing action and probe failure reason.**; introduced only for `delivery-platform-evidence-debug`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Workload status; events; exit; metrics; logs; config refs; endpoints; revision.

### Production boundary / trade-off

Platform evidence maps back to portable process/resource/network concepts.

### Transfer variation

Docker failure → Kubernetes → managed equivalent.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-delivery-platform-transfer

### Identity

- **Working title:** delivery-platform-transfer
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-platform-transfer | Containers / Kubernetes / Cloud Delivery | L4 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

YAML treated architecture; health shifts; filesystem assumption; CPU/memory change; debug evidence hidden.

### State / data / mechanism trace

Artifact/config/resource/health/shutdown/network/telemetry are portable requirements; platform implementations differ.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| delivery-artifact-image-config | delivery-platform-transfer | portable artifact identity and separation of build from runtime config. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| delivery-platform-evidence-debug | delivery-platform-transfer | diagnose lifecycle, resource, probe/config and routing behavior from platform evidence. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| delivery-graceful-shutdown-draining | delivery-platform-transfer | stop routing, signal termination, drain/cancel work and exit within a bounded lifetime. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `delivery-artifact-image-config`: **portable artifact identity and separation of build from runtime config.**; introduced only for `delivery-platform-transfer`, without source coverage or `PASSED` evidence.
- `delivery-platform-evidence-debug`: **diagnose lifecycle, resource, probe/config and routing behavior from platform evidence.**; introduced only for `delivery-platform-transfer`, without source coverage or `PASSED` evidence.
- `delivery-graceful-shutdown-draining`: **stop routing, signal termination, drain/cancel work and exit within a bounded lifetime.**; introduced only for `delivery-platform-transfer`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Requirement matrix; platform config; lifecycle behavior; deployment/failure result.

### Production boundary / trade-off

Native feature convenience trades migration/lock-in cost.

### Transfer variation

Compose/VM → K8s → managed container.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-delivery-probes-health

### Identity

- **Working title:** delivery-probes-health
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-probes-health | Containers / Kubernetes / Cloud Delivery | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Readiness wired liveness; outage restart loop; early warmup; expensive probe; terminating still routed.

### State / data / mechanism trace

Platform calls probe and converts result to routing/restart by configured type.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| rel-health-readiness-semantics | delivery-probes-health | difference between cannot make useful progress and should not receive traffic. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `rel-health-readiness-semantics`: **difference between cannot make useful progress and should not receive traffic.**; introduced only for `delivery-probes-health`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Probe config/result; K8s events; ready condition; restarts; routing.

### Production boundary / trade-off

Strict frequency reacts faster but false removal/load risk.

### Transfer variation

One health endpoint → startup/readiness/liveness.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-delivery-resources-cpu-memory

### Identity

- **Working title:** delivery-resources-cpu-memory
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-resources-cpu-memory | Containers / Kubernetes / Cloud Delivery | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Throttle called lock; OOM only GC; no request; excessive reservation; limit ignores working/native/page cache.

### State / data / mechanism trace

Scheduler uses requests; CPU may throttle and memory policy may kill/evict workload.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| delivery-container-process-lifecycle | delivery-resources-cpu-memory | container lifetime follows its workload process and runs under platform resource boundaries. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| os-resource-exhaustion | delivery-resources-cpu-memory | finite process memory/CPU resources and resource-exhaustion behavior. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `delivery-container-process-lifecycle`: **container lifetime follows its workload process and runs under platform resource boundaries.**; introduced only for `delivery-resources-cpu-memory`, without source coverage or `PASSED` evidence.
- `os-resource-exhaustion`: **finite process memory/CPU resources and resource-exhaustion behavior.**; introduced only for `delivery-resources-cpu-memory`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Requests/limits; throttle; RSS; OOM; restart; node/pod metrics.

### Production boundary / trade-off

Higher reservation gives headroom vs lower density; tight limit contains but exposes burst.

### Transfer variation

Local process → CPU quota/memory limit container.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.

## lu-delivery-rollout-rollback-strategies

### Identity

- **Working title:** delivery-rollout-rollback-strategies
- **Learner-facing domain candidate:** Production Engineering

### Primary capability records

| Capability ID | Canonical owner | Frozen target level |
|---|---|---|
| delivery-rollout-rollback-strategies | Containers / Kubernetes / Cloud Delivery | L3 |

### Why these capabilities belong together

This capability retains a distinct mechanism/evidence boundary; adjacency alone is not a grouping reason.

### Working canonical problem / case anchor

Old/new incompatible; availability gap; irreversible schema/event; unrepresentative canary; readiness stall.

### State / data / mechanism trace

Platform moves traffic/version sets over time; strategy controls coexistence/exposure.

### Incoming REQUIRED treatments

| Source | Target | Exact Assumed Slice | Treatment | Reason |
|---|---|---|---|---|
| delivery-artifact-image-config | delivery-rollout-rollback-strategies | immutable deployable artifact identity and reproducible prior version. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |
| rel-change-rollout-rollback-risk | delivery-rollout-rollback-strategies | progressive exposure, observation criteria and technical rollback boundary. | LOCAL_SLICE | Exact slice is introduced locally; source coverage/PASSED is not claimed. |

### Local Prerequisite Slices

- `delivery-artifact-image-config`: **immutable deployable artifact identity and reproducible prior version.**; introduced only for `delivery-rollout-rollback-strategies`, without source coverage or `PASSED` evidence.
- `rel-change-rollout-rollback-risk`: **progressive exposure, observation criteria and technical rollback boundary.**; introduced only for `delivery-rollout-rollback-strategies`, without source coverage or `PASSED` evidence.

### External Required Prerequisite Candidates

None.

### RECOMMENDED context surfaced

None.

### Internal learning order

Problem → limitation → mechanism → observable evidence → transfer.

### Observable evidence / debug story

Replica/version; deployment status; traffic; readiness; digest; rollback history.

### Production boundary / trade-off

Staging lowers blast radius but needs capacity/operational complexity.

### Transfer variation

Stateless rolling → mixed schema/event rollout.

### Candidate gates / exit evidence

Prediction/trace, application/debug, explain-back and changed-condition transfer at the frozen target level.

### Research / version status

Research status: NOT YET PERFORMED FOR LEARNER-FACING AUTHORING.
