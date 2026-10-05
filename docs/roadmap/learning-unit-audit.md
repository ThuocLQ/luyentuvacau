# QuanNet Learning-Unit Audit — Stage 1

> **Status:** DRAFT — Stage 1 Primary-boundary architecture review required.
> **Frozen input SHA:** `771f6541872adceb52786387006059e2059df6a8`.

## A. Global Summary

| Metric | Result |
|---|---:|
| Frozen capabilities | 167 |
| Proposed Learning Units | 132 |
| Primary assessment homes | 167 |
| Missing Primary capabilities | 0 |
| Duplicate Primary assignments | 0 |
| Unknown capability IDs | 0 |
| Singleton units | 105 |
| Multi-capability units | 27 |
| Single-owner units | 130 |
| Multi-owner units | 2 |

## B. Primary-Home Registry

| Capability ID | Canonical owner | Frozen level | Primary Unit | Domain candidate |
|---|---|---|---|---|
| arch-boundaries-ownership | Architecture & System Design | L3 | lu-arch-boundaries-ownership | Architecture & Engineering Reasoning |
| arch-consistency-latency-availability | Architecture & System Design | L4 | lu-arch-consistency-latency-availability | Architecture & Engineering Reasoning |
| arch-cost-complexity-changeability | Architecture & System Design | L4 | lu-arch-cost-complexity-changeability | Architecture & Engineering Reasoning |
| arch-data-ownership-source-of-truth | Architecture & System Design | L3 | lu-arch-boundaries-ownership | Architecture & Engineering Reasoning |
| arch-decision-communication-transfer | Architecture & System Design | L4 | lu-arch-cost-complexity-changeability | Architecture & Engineering Reasoning |
| arch-evolution-migration-strangler | Architecture & System Design | L3 | lu-arch-evolution-migration-strangler | Architecture & Engineering Reasoning |
| arch-failure-recovery-security-observability | Architecture & System Design | L4 | lu-arch-boundaries-ownership | Architecture & Engineering Reasoning |
| arch-requirements-quality-attributes | Architecture & System Design | L3 | lu-arch-boundaries-ownership | Architecture & Engineering Reasoning |
| arch-scale-capacity-partitioning | Architecture & System Design | L3 | lu-arch-scale-capacity-partitioning | Architecture & Engineering Reasoning |
| arch-sync-async-integration | Architecture & System Design | L3 | lu-arch-sync-async-integration | Architecture & Engineering Reasoning |
| concurrency-async-parallelism | Concurrency & Async | L2 | lu-concurrency-async-parallelism | Runtime & Concurrency |
| concurrency-bounded-backpressure | Concurrency & Async | L3 | lu-concurrency-async-parallelism | Runtime & Concurrency |
| concurrency-cancellation-lifetime | Concurrency & Async | L3 | lu-concurrency-async-parallelism | Runtime & Concurrency |
| concurrency-deadlock-starvation | Concurrency & Async | L3 | lu-concurrency-deadlock-starvation | Runtime & Concurrency |
| concurrency-interleavings-invariants | Concurrency & Async | L3 | lu-race-atomicity | Runtime & Concurrency |
| concurrency-local-vs-distributed | Concurrency & Async | L4 | lu-concurrency-local-vs-distributed | Runtime & Concurrency |
| concurrency-memory-visibility | Concurrency & Async | L3 | lu-concurrency-memory-visibility | Runtime & Concurrency |
| concurrency-races-check-then-act | Concurrency & Async | L3 | lu-race-atomicity | Runtime & Concurrency |
| concurrency-synchronization-atomicity | Concurrency & Async | L3 | lu-race-atomicity | Runtime & Concurrency |
| delivery-artifact-image-config | Containers / Kubernetes / Cloud Delivery | L2 | lu-delivery-artifact-provenance | Production Engineering |
| delivery-autoscaling-signal-boundary | Containers / Kubernetes / Cloud Delivery | L3 | lu-delivery-autoscaling-signal-boundary | Production Engineering |
| delivery-cicd-promotion-provenance | Containers / Kubernetes / Cloud Delivery | L3 | lu-delivery-artifact-provenance | Production Engineering |
| delivery-cloud-responsibility-managed-services | Containers / Kubernetes / Cloud Delivery | L2 | lu-delivery-cloud-responsibility-managed-services | Production Engineering |
| delivery-container-process-lifecycle | Containers / Kubernetes / Cloud Delivery | L2 | lu-delivery-container-process-lifecycle | Production Engineering |
| delivery-graceful-shutdown-draining | Containers / Kubernetes / Cloud Delivery | L3 | lu-delivery-graceful-shutdown-draining | Production Engineering |
| delivery-platform-evidence-debug | Containers / Kubernetes / Cloud Delivery | L3 | lu-delivery-platform-evidence-debug | Production Engineering |
| delivery-platform-transfer | Containers / Kubernetes / Cloud Delivery | L4 | lu-delivery-platform-transfer | Production Engineering |
| delivery-probes-health | Containers / Kubernetes / Cloud Delivery | L3 | lu-rel-health-probes | Production Engineering |
| delivery-resources-cpu-memory | Containers / Kubernetes / Cloud Delivery | L3 | lu-delivery-resources-cpu-memory | Production Engineering |
| delivery-rollout-rollback-strategies | Containers / Kubernetes / Cloud Delivery | L3 | lu-release-rollout-rollback | Production Engineering |
| dist-consensus-coordination-purpose | Distributed Systems | L3 | lu-dist-consensus-coordination-purpose | Distributed Systems |
| dist-consistency-linearizability | Distributed Systems | L3 | lu-dist-consistency-linearizability | Distributed Systems |
| dist-guarantee-recovery-transfer | Distributed Systems | L4 | lu-dist-guarantee-recovery-transfer | Distributed Systems |
| dist-partial-failure-uncertainty | Distributed Systems | L3 | lu-dist-partial-failure-uncertainty | Distributed Systems |
| dist-partitioning-ownership-rebalancing | Distributed Systems | L3 | lu-dist-partitioning-ownership-rebalancing | Distributed Systems |
| dist-reconciliation-convergence | Distributed Systems | L3 | lu-dist-reconciliation-convergence | Distributed Systems |
| dist-replication-leader-quorum | Distributed Systems | L3 | lu-dist-replication-leader-quorum | Distributed Systems |
| dist-rpc-unknown-completion | Distributed Systems | L3 | lu-dist-rpc-unknown-completion | Distributed Systems |
| dist-time-order-causality | Distributed Systems | L3 | lu-dist-time-order-causality | Distributed Systems |
| dist-transactions-2pc-boundary | Distributed Systems | L3 | lu-dist-transactions-2pc-boundary | Distributed Systems |
| msg-consumer-groups-offsets-rebalance | Messaging & Event-Driven Consistency | L3 | lu-msg-consumer-groups-offsets-rebalance | Distributed Systems |
| msg-consumer-idempotency-inbox | Messaging & Event-Driven Consistency | L3 | lu-outbox-duplicate-safe-effect | Distributed Systems |
| msg-delivery-retry-poison-dlq | Messaging & Event-Driven Consistency | L3 | lu-msg-delivery-retry-poison-dlq | Distributed Systems |
| msg-external-side-effect-reconciliation | Messaging & Event-Driven Consistency | L4 | lu-msg-external-side-effect-reconciliation | Distributed Systems |
| msg-lag-backpressure-evidence | Messaging & Event-Driven Consistency | L3 | lu-msg-lag-backpressure-evidence | Distributed Systems |
| msg-model-queue-topic-partition-order | Messaging & Event-Driven Consistency | L2 | lu-msg-model-queue-topic-partition-order | Distributed Systems |
| msg-outbox-db-publish-gap | Messaging & Event-Driven Consistency | L3 | lu-outbox-duplicate-safe-effect | Distributed Systems |
| msg-producer-acks-durability | Messaging & Event-Driven Consistency | L3 | lu-msg-producer-acks-durability | Distributed Systems |
| msg-replay-backfill | Messaging & Event-Driven Consistency | L3 | lu-msg-replay-backfill | Distributed Systems |
| msg-schema-evolution-contract-ownership | Messaging & Event-Driven Consistency | L3 | lu-msg-schema-evolution-contract-ownership | Distributed Systems |
| msg-workflow-saga-compensation | Messaging & Event-Driven Consistency | L3 | lu-msg-workflow-saga-compensation | Distributed Systems |
| obs-cardinality-sampling-cost | Observability & Performance | L3 | lu-obs-cardinality-sampling-cost | Production Engineering |
| obs-db-io-downstream-attribution | Observability & Performance | L3 | lu-obs-db-io-downstream-attribution | Production Engineering |
| obs-diagnostic-method | Observability & Performance | L4 | lu-obs-diagnostic-method | Production Engineering |
| obs-instrumentation-context | Observability & Performance | L3 | lu-obs-instrumentation-tracing | Production Engineering |
| obs-latency-throughput-saturation | Observability & Performance | L2 | lu-obs-latency-throughput-saturation | Production Engineering |
| obs-load-test-benchmark-validity | Observability & Performance | L3 | lu-obs-load-test-benchmark-validity | Production Engineering |
| obs-logs-structured-correlation | Observability & Performance | L2 | lu-obs-logs-structured-correlation | Production Engineering |
| obs-profiling-runtime-evidence | Observability & Performance | L3 | lu-obs-profiling-runtime-evidence | Production Engineering |
| obs-signals-correlation | Observability & Performance | L2 | lu-obs-signals-correlation | Production Engineering |
| obs-tracing-distributed-evidence | Observability & Performance | L3 | lu-obs-instrumentation-tracing | Production Engineering |
| os-blocking-io-waits | Operating Systems & I/O Foundations | L3 | lu-os-blocking-io-waits | Runtime & Concurrency |
| os-files-handles-sockets-ipc | Operating Systems & I/O Foundations | L2 | lu-os-blocking-io-waits | Runtime & Concurrency |
| os-process-thread-kernel | Operating Systems & I/O Foundations | L2 | lu-os-process-thread-kernel | Runtime & Concurrency |
| os-resource-exhaustion | Operating Systems & I/O Foundations | L3 | lu-os-resource-exhaustion | Runtime & Concurrency |
| os-scheduling-starvation | Operating Systems & I/O Foundations | L3 | lu-os-scheduling-starvation | Runtime & Concurrency |
| os-termination-graceful-shutdown | Operating Systems & I/O Foundations | L3 | lu-os-termination-graceful-shutdown | Runtime & Concurrency |
| os-virtual-memory-page-cache | Operating Systems & I/O Foundations | L2 | lu-os-virtual-memory-page-cache | Runtime & Concurrency |
| prog-api-refactoring-change-safety | Programming & Software Design Foundations | L4 | lu-prog-api-refactoring-change-safety | Runtime & Concurrency |
| prog-collections-complexity | Programming & Software Design Foundations | L2 | lu-prog-collections-complexity | Runtime & Concurrency |
| prog-composition-dependencies | Programming & Software Design Foundations | L3 | lu-prog-composition-dependencies | Runtime & Concurrency |
| prog-errors-results | Programming & Software Design Foundations | L2 | lu-prog-errors-results | Runtime & Concurrency |
| prog-invariants-domain-model | Programming & Software Design Foundations | L3 | lu-prog-invariants-domain-model | Runtime & Concurrency |
| prog-resource-ownership | Programming & Software Design Foundations | L3 | lu-prog-resource-ownership | Runtime & Concurrency |
| prog-types-generics | Programming & Software Design Foundations | L2 | lu-prog-types-generics | Runtime & Concurrency |
| prog-values-identity | Programming & Software Design Foundations | L2 | lu-prog-values-identity | Runtime & Concurrency |
| rel-cascading-failure-queue-capacity | Reliability / SRE | L3 | lu-rel-cascading-failure-queue-capacity | Production Engineering |
| rel-change-rollout-rollback-risk | Reliability / SRE | L3 | lu-release-rollout-rollback | Production Engineering |
| rel-dependency-budgets | Reliability / SRE | L3 | lu-rel-dependency-budgets | Production Engineering |
| rel-disaster-recovery-rpo-rto | Reliability / SRE | L3 | lu-rel-disaster-recovery-rpo-rto | Production Engineering |
| rel-failure-injection-verification | Reliability / SRE | L4 | lu-rel-failure-injection-verification | Production Engineering |
| rel-health-readiness-semantics | Reliability / SRE | L3 | lu-rel-health-probes | Production Engineering |
| rel-incident-response-postmortem | Reliability / SRE | L3 | lu-rel-incident-response-postmortem | Production Engineering |
| rel-overload-load-shedding-degradation | Reliability / SRE | L3 | lu-rel-overload-load-shedding-degradation | Production Engineering |
| rel-user-journey-sli-slo-budget | Reliability / SRE | L3 | lu-rel-user-journey-sli-slo-budget | Production Engineering |
| runtime-allocation-gc | Runtime & Memory | L3 | lu-runtime-allocation-gc | Runtime & Concurrency |
| runtime-diagnostics | Runtime & Memory | L3 | lu-runtime-diagnostics | Runtime & Concurrency |
| runtime-jit-warmup | Runtime & Memory | L2 | lu-runtime-jit-warmup | Runtime & Concurrency |
| runtime-managed-execution | Runtime & Memory | L2 | lu-runtime-managed-execution | Runtime & Concurrency |
| runtime-memory-performance-debug | Runtime & Memory | L4 | lu-runtime-diagnostics | Runtime & Concurrency |
| runtime-memory-roots-lifetime | Runtime & Memory | L2 | lu-runtime-allocation-gc | Runtime & Concurrency |
| runtime-retention-pooling-large-objects | Runtime & Memory | L3 | lu-runtime-allocation-gc | Runtime & Concurrency |
| test-ci-flakiness-repeatability | Testing & Engineering Quality | L3 | lu-test-ci-flakiness-repeatability | Architecture & Engineering Reasoning |
| test-failure-resilience | Testing & Engineering Quality | L3 | lu-test-failure-resilience | Architecture & Engineering Reasoning |
| test-migration-compatibility | Testing & Engineering Quality | L3 | lu-test-migration-compatibility | Architecture & Engineering Reasoning |
| test-property-boundary-fuzz | Testing & Engineering Quality | L3 | lu-test-property-boundary-fuzz | Architecture & Engineering Reasoning |
| test-real-dependency-fixtures | Testing & Engineering Quality | L3 | lu-test-ci-flakiness-repeatability | Architecture & Engineering Reasoning |
| test-review-static-analysis-change-safety | Testing & Engineering Quality | L3 | lu-test-review-static-analysis-change-safety | Architecture & Engineering Reasoning |
| test-risk-strategy-boundaries | Testing & Engineering Quality | L2 | lu-test-ci-flakiness-repeatability | Architecture & Engineering Reasoning |
| test-risk-transfer | Testing & Engineering Quality | L4 | lu-test-failure-resilience | Architecture & Engineering Reasoning |
| test-time-concurrency-determinism | Testing & Engineering Quality | L3 | lu-test-ci-flakiness-repeatability | Architecture & Engineering Reasoning |
| test-unit-integration-contract | Testing & Engineering Quality | L3 | lu-test-unit-integration-contract | Architecture & Engineering Reasoning |
| db-index-structures | Relational Database Engineering | L3 | lu-index-query-shape | Data & Consistency |
| db-composite-query-shape | Relational Database Engineering | L3 | lu-index-query-shape | Data & Consistency |
| db-execution-operators | Relational Database Engineering | L3 | lu-execution-plan-estimates | Data & Consistency |
| db-optimizer-cardinality-stats | Relational Database Engineering | L3 | lu-execution-plan-estimates | Data & Consistency |
| db-backup-restore | Relational Database Engineering | L3 | lu-db-backup-restore | Data & Consistency |
| db-wal-crash-recovery | Relational Database Engineering | L3 | lu-db-wal-crash-recovery | Data & Consistency |
| db-buffer-io | Relational Database Engineering | L2 | lu-db-buffer-io | Data & Consistency |
| db-physical-storage-pages | Relational Database Engineering | L2 | lu-db-buffer-io | Data & Consistency |
| db-production-diagnosis-transfer | Relational Database Engineering | L4 | lu-db-production-diagnosis-transfer | Data & Consistency |
| db-connection-pool-exhaustion | Relational Database Engineering | L3 | lu-db-connection-pool-exhaustion | Data & Consistency |
| db-locks-deadlocks-contention | Relational Database Engineering | L3 | lu-db-locks-deadlocks-contention | Data & Consistency |
| db-transactions-isolation-anomalies | Relational Database Engineering | L3 | lu-db-transactions-mvcc-isolation | Data & Consistency |
| db-mvcc-visibility | Relational Database Engineering | L3 | lu-db-transactions-mvcc-isolation | Data & Consistency |
| db-schema-evolution | Relational Database Engineering | L3 | lu-db-schema-evolution | Data & Consistency |
| db-modeling-invariants | Relational Database Engineering | L3 | lu-db-modeling-invariants | Data & Consistency |
| db-partitioning-sharding-boundary | Relational Database Engineering | L3 | lu-db-partitioning-sharding-boundary | Data & Consistency |
| db-replication-failover | Relational Database Engineering | L3 | lu-db-replication-failover | Data & Consistency |
| nosql-cassandra-partition-model | NoSQL & Specialized Data Systems | L3 | lu-nosql-cassandra-lsm-compaction-consistency | Data & Consistency |
| nosql-cassandra-lsm-compaction-consistency | NoSQL & Specialized Data Systems | L3 | lu-nosql-cassandra-lsm-compaction-consistency | Data & Consistency |
| nosql-transfer-storage-choice | NoSQL & Specialized Data Systems | L4 | lu-nosql-storage-choice-transfer | Data & Consistency |
| nosql-model-selection | NoSQL & Specialized Data Systems | L3 | lu-nosql-model-selection | Data & Consistency |
| nosql-mongo-aggregate-model | NoSQL & Specialized Data Systems | L2 | lu-nosql-mongo-aggregate-model | Data & Consistency |
| nosql-mongo-index-shard-transaction | NoSQL & Specialized Data Systems | L3 | lu-nosql-mongo-index-shard-transaction | Data & Consistency |
| nosql-redis-structures-memory | NoSQL & Specialized Data Systems | L2 | lu-nosql-redis-structures-memory | Data & Consistency |
| nosql-redis-persistence-replication-cluster-streams | NoSQL & Specialized Data Systems | L3 | lu-nosql-redis-persistence-replication-cluster-streams | Data & Consistency |
| nosql-search-inverted-index-analysis | NoSQL & Specialized Data Systems | L2 | lu-nosql-search-projection | Data & Consistency |
| nosql-search-refresh-shards-pagination | NoSQL & Specialized Data Systems | L3 | lu-nosql-search-projection | Data & Consistency |
| cache-capacity-eviction-fallback | Cache Engineering | L3 | lu-cache-capacity-eviction-fallback | Data & Consistency |
| cache-evidence-transfer | Cache Engineering | L4 | lu-cache-evidence-transfer | Data & Consistency |
| cache-need-source-of-truth | Cache Engineering | L2 | lu-cache-source-of-truth-invalidation | Data & Consistency |
| cache-invalidation-consistency | Cache Engineering | L3 | lu-cache-source-of-truth-invalidation | Data & Consistency |
| cache-multilayer-coherence | Cache Engineering | L3 | lu-cache-source-of-truth-invalidation | Data & Consistency |
| cache-patterns | Cache Engineering | L2 | lu-cache-patterns | Data & Consistency |
| cache-stampede-penetration-avalanche-hot-key | Cache Engineering | L3 | lu-cache-patterns | Data & Consistency |
| net-tcp-connection-semantics | Networking & HTTP | L2 | lu-net-connection-reuse-pooling | Service & Network |
| net-connection-reuse-pooling | Networking & HTTP | L3 | lu-net-connection-reuse-pooling | Service & Network |
| net-request-path-dns | Networking & HTTP | L2 | lu-net-request-path-dns | Service & Network |
| net-tls-trust-handshake | Networking & HTTP | L2 | lu-net-proxy-tls-forwarded-boundary | Service & Network |
| net-proxy-lb-forwarded-boundary | Networking & HTTP | L3 | lu-net-proxy-tls-forwarded-boundary | Service & Network |
| net-http-semantics | Networking & HTTP | L2 | lu-net-http-streaming-cancellation | Service & Network |
| net-streaming-body-cancellation | Networking & HTTP | L3 | lu-net-http-streaming-cancellation | Service & Network |
| net-failure-localization-unknown-outcome | Networking & HTTP | L4 | lu-net-failure-localization-unknown-outcome | Service & Network |
| api-circuit-bulkhead-rate-limit | API Contracts & Resilience | L3 | lu-api-circuit-bulkhead-rate-limit | Service & Network |
| api-contract-resource-semantics | API Contracts & Resilience | L2 | lu-api-contract-resource-semantics | Service & Network |
| api-validation-errors-pagination | API Contracts & Resilience | L2 | lu-api-validation-errors-pagination | Service & Network |
| api-request-identity-idempotency | API Contracts & Resilience | L3 | lu-api-request-identity-idempotency | Service & Network |
| api-versioning-compatibility | API Contracts & Resilience | L3 | lu-api-versioning-compatibility | Service & Network |
| api-deadlines-timeout-cancellation | API Contracts & Resilience | L3 | lu-api-deadline-retry-policy | Service & Network |
| api-retry-backoff-jitter | API Contracts & Resilience | L3 | lu-api-deadline-retry-policy | Service & Network |
| api-unknown-outcome-reconciliation | API Contracts & Resilience | L4 | lu-api-unknown-outcome-reconciliation | Service & Network |
| sec-trust-boundary-threat-model | Security | L2 | lu-sec-trust-boundary-threat-model | Service & Network |
| sec-abuse-bruteforce-resource-business-flow | Security | L3 | lu-sec-abuse-bruteforce-resource-business-flow | Service & Network |
| sec-unseen-attack-transfer | Security | L4 | lu-sec-unseen-attack-transfer | Service & Network |
| sec-auth-session-token | Security | L3 | lu-sec-auth-session-oauth | Service & Network |
| sec-oauth-oidc-awareness | Security | L2 | lu-sec-auth-session-oauth | Service & Network |
| sec-authorization-object-tenant | Security | L3 | lu-sec-authorization-object-tenant | Service & Network |
| sec-browser-boundaries-cors-csrf-xss | Security | L2 | lu-sec-browser-boundaries-cors-csrf-xss | Service & Network |
| sec-injection-ssrf-input-output | Security | L3 | lu-sec-injection-ssrf-input-output | Service & Network |
| sec-race-business-logic-abuse | Security | L3 | lu-sec-race-business-logic-abuse | Service & Network |
| sec-secrets-third-party-trust | Security | L3 | lu-sec-secrets-third-party-trust | Service & Network |
| sec-audit-detection-evidence | Security | L3 | lu-sec-audit-detection-evidence | Service & Network |
| net-service-discovery-load-balancing | Networking & HTTP | L3 | lu-net-service-discovery-load-balancing | Service & Network |
| sec-cryptography-credentials-tokens | Security | L2 | lu-sec-cryptography-credentials-tokens | Service & Network |
| sec-data-encryption-key-lifecycle | Security | L2 | lu-sec-data-encryption-key-lifecycle | Service & Network |
| msg-background-jobs-scheduling | Messaging & Event-Driven Consistency | L3 | lu-msg-background-jobs-scheduling | Distributed Systems |

## C. Unit Composition Registry

| Unit ID | Primary capability IDs | Primary count | Owner set | Singleton / Multi |
|---|---|---|---|---|
| lu-api-circuit-bulkhead-rate-limit | api-circuit-bulkhead-rate-limit | 1 | API Contracts & Resilience | Singleton |
| lu-api-contract-resource-semantics | api-contract-resource-semantics | 1 | API Contracts & Resilience | Singleton |
| lu-api-deadline-retry-policy | api-deadlines-timeout-cancellation; api-retry-backoff-jitter | 2 | API Contracts & Resilience | Multi |
| lu-api-request-identity-idempotency | api-request-identity-idempotency | 1 | API Contracts & Resilience | Singleton |
| lu-api-unknown-outcome-reconciliation | api-unknown-outcome-reconciliation | 1 | API Contracts & Resilience | Singleton |
| lu-api-validation-errors-pagination | api-validation-errors-pagination | 1 | API Contracts & Resilience | Singleton |
| lu-api-versioning-compatibility | api-versioning-compatibility | 1 | API Contracts & Resilience | Singleton |
| lu-arch-boundaries-ownership | arch-boundaries-ownership; arch-data-ownership-source-of-truth; arch-failure-recovery-security-observability; arch-requirements-quality-attributes | 4 | Architecture & System Design | Multi |
| lu-arch-consistency-latency-availability | arch-consistency-latency-availability | 1 | Architecture & System Design | Singleton |
| lu-arch-cost-complexity-changeability | arch-cost-complexity-changeability; arch-decision-communication-transfer | 2 | Architecture & System Design | Multi |
| lu-arch-evolution-migration-strangler | arch-evolution-migration-strangler | 1 | Architecture & System Design | Singleton |
| lu-arch-scale-capacity-partitioning | arch-scale-capacity-partitioning | 1 | Architecture & System Design | Singleton |
| lu-arch-sync-async-integration | arch-sync-async-integration | 1 | Architecture & System Design | Singleton |
| lu-cache-capacity-eviction-fallback | cache-capacity-eviction-fallback | 1 | Cache Engineering | Singleton |
| lu-cache-evidence-transfer | cache-evidence-transfer | 1 | Cache Engineering | Singleton |
| lu-cache-patterns | cache-patterns; cache-stampede-penetration-avalanche-hot-key | 2 | Cache Engineering | Multi |
| lu-cache-source-of-truth-invalidation | cache-need-source-of-truth; cache-invalidation-consistency; cache-multilayer-coherence | 3 | Cache Engineering | Multi |
| lu-concurrency-async-parallelism | concurrency-async-parallelism; concurrency-bounded-backpressure; concurrency-cancellation-lifetime | 3 | Concurrency & Async | Multi |
| lu-concurrency-deadlock-starvation | concurrency-deadlock-starvation | 1 | Concurrency & Async | Singleton |
| lu-concurrency-local-vs-distributed | concurrency-local-vs-distributed | 1 | Concurrency & Async | Singleton |
| lu-concurrency-memory-visibility | concurrency-memory-visibility | 1 | Concurrency & Async | Singleton |
| lu-db-backup-restore | db-backup-restore | 1 | Relational Database Engineering | Singleton |
| lu-db-buffer-io | db-buffer-io; db-physical-storage-pages | 2 | Relational Database Engineering | Multi |
| lu-db-connection-pool-exhaustion | db-connection-pool-exhaustion | 1 | Relational Database Engineering | Singleton |
| lu-db-locks-deadlocks-contention | db-locks-deadlocks-contention | 1 | Relational Database Engineering | Singleton |
| lu-db-modeling-invariants | db-modeling-invariants | 1 | Relational Database Engineering | Singleton |
| lu-db-partitioning-sharding-boundary | db-partitioning-sharding-boundary | 1 | Relational Database Engineering | Singleton |
| lu-db-production-diagnosis-transfer | db-production-diagnosis-transfer | 1 | Relational Database Engineering | Singleton |
| lu-db-replication-failover | db-replication-failover | 1 | Relational Database Engineering | Singleton |
| lu-db-schema-evolution | db-schema-evolution | 1 | Relational Database Engineering | Singleton |
| lu-db-transactions-mvcc-isolation | db-transactions-isolation-anomalies; db-mvcc-visibility | 2 | Relational Database Engineering | Multi |
| lu-db-wal-crash-recovery | db-wal-crash-recovery | 1 | Relational Database Engineering | Singleton |
| lu-delivery-artifact-provenance | delivery-artifact-image-config; delivery-cicd-promotion-provenance | 2 | Containers / Kubernetes / Cloud Delivery | Multi |
| lu-delivery-autoscaling-signal-boundary | delivery-autoscaling-signal-boundary | 1 | Containers / Kubernetes / Cloud Delivery | Singleton |
| lu-delivery-cloud-responsibility-managed-services | delivery-cloud-responsibility-managed-services | 1 | Containers / Kubernetes / Cloud Delivery | Singleton |
| lu-delivery-container-process-lifecycle | delivery-container-process-lifecycle | 1 | Containers / Kubernetes / Cloud Delivery | Singleton |
| lu-delivery-graceful-shutdown-draining | delivery-graceful-shutdown-draining | 1 | Containers / Kubernetes / Cloud Delivery | Singleton |
| lu-delivery-platform-evidence-debug | delivery-platform-evidence-debug | 1 | Containers / Kubernetes / Cloud Delivery | Singleton |
| lu-delivery-platform-transfer | delivery-platform-transfer | 1 | Containers / Kubernetes / Cloud Delivery | Singleton |
| lu-delivery-resources-cpu-memory | delivery-resources-cpu-memory | 1 | Containers / Kubernetes / Cloud Delivery | Singleton |
| lu-dist-consensus-coordination-purpose | dist-consensus-coordination-purpose | 1 | Distributed Systems | Singleton |
| lu-dist-consistency-linearizability | dist-consistency-linearizability | 1 | Distributed Systems | Singleton |
| lu-dist-guarantee-recovery-transfer | dist-guarantee-recovery-transfer | 1 | Distributed Systems | Singleton |
| lu-dist-partial-failure-uncertainty | dist-partial-failure-uncertainty | 1 | Distributed Systems | Singleton |
| lu-dist-partitioning-ownership-rebalancing | dist-partitioning-ownership-rebalancing | 1 | Distributed Systems | Singleton |
| lu-dist-reconciliation-convergence | dist-reconciliation-convergence | 1 | Distributed Systems | Singleton |
| lu-dist-replication-leader-quorum | dist-replication-leader-quorum | 1 | Distributed Systems | Singleton |
| lu-dist-rpc-unknown-completion | dist-rpc-unknown-completion | 1 | Distributed Systems | Singleton |
| lu-dist-time-order-causality | dist-time-order-causality | 1 | Distributed Systems | Singleton |
| lu-dist-transactions-2pc-boundary | dist-transactions-2pc-boundary | 1 | Distributed Systems | Singleton |
| lu-execution-plan-estimates | db-execution-operators; db-optimizer-cardinality-stats | 2 | Relational Database Engineering | Multi |
| lu-index-query-shape | db-index-structures; db-composite-query-shape | 2 | Relational Database Engineering | Multi |
| lu-msg-background-jobs-scheduling | msg-background-jobs-scheduling | 1 | Messaging & Event-Driven Consistency | Singleton |
| lu-msg-consumer-groups-offsets-rebalance | msg-consumer-groups-offsets-rebalance | 1 | Messaging & Event-Driven Consistency | Singleton |
| lu-msg-delivery-retry-poison-dlq | msg-delivery-retry-poison-dlq | 1 | Messaging & Event-Driven Consistency | Singleton |
| lu-msg-external-side-effect-reconciliation | msg-external-side-effect-reconciliation | 1 | Messaging & Event-Driven Consistency | Singleton |
| lu-msg-lag-backpressure-evidence | msg-lag-backpressure-evidence | 1 | Messaging & Event-Driven Consistency | Singleton |
| lu-msg-model-queue-topic-partition-order | msg-model-queue-topic-partition-order | 1 | Messaging & Event-Driven Consistency | Singleton |
| lu-msg-producer-acks-durability | msg-producer-acks-durability | 1 | Messaging & Event-Driven Consistency | Singleton |
| lu-msg-replay-backfill | msg-replay-backfill | 1 | Messaging & Event-Driven Consistency | Singleton |
| lu-msg-schema-evolution-contract-ownership | msg-schema-evolution-contract-ownership | 1 | Messaging & Event-Driven Consistency | Singleton |
| lu-msg-workflow-saga-compensation | msg-workflow-saga-compensation | 1 | Messaging & Event-Driven Consistency | Singleton |
| lu-net-connection-reuse-pooling | net-tcp-connection-semantics; net-connection-reuse-pooling | 2 | Networking & HTTP | Multi |
| lu-net-failure-localization-unknown-outcome | net-failure-localization-unknown-outcome | 1 | Networking & HTTP | Singleton |
| lu-net-http-streaming-cancellation | net-http-semantics; net-streaming-body-cancellation | 2 | Networking & HTTP | Multi |
| lu-net-proxy-tls-forwarded-boundary | net-tls-trust-handshake; net-proxy-lb-forwarded-boundary | 2 | Networking & HTTP | Multi |
| lu-net-request-path-dns | net-request-path-dns | 1 | Networking & HTTP | Singleton |
| lu-net-service-discovery-load-balancing | net-service-discovery-load-balancing | 1 | Networking & HTTP | Singleton |
| lu-nosql-cassandra-lsm-compaction-consistency | nosql-cassandra-partition-model; nosql-cassandra-lsm-compaction-consistency | 2 | NoSQL & Specialized Data Systems | Multi |
| lu-nosql-model-selection | nosql-model-selection | 1 | NoSQL & Specialized Data Systems | Singleton |
| lu-nosql-mongo-aggregate-model | nosql-mongo-aggregate-model | 1 | NoSQL & Specialized Data Systems | Singleton |
| lu-nosql-mongo-index-shard-transaction | nosql-mongo-index-shard-transaction | 1 | NoSQL & Specialized Data Systems | Singleton |
| lu-nosql-redis-persistence-replication-cluster-streams | nosql-redis-persistence-replication-cluster-streams | 1 | NoSQL & Specialized Data Systems | Singleton |
| lu-nosql-redis-structures-memory | nosql-redis-structures-memory | 1 | NoSQL & Specialized Data Systems | Singleton |
| lu-nosql-search-projection | nosql-search-inverted-index-analysis; nosql-search-refresh-shards-pagination | 2 | NoSQL & Specialized Data Systems | Multi |
| lu-nosql-storage-choice-transfer | nosql-transfer-storage-choice | 1 | NoSQL & Specialized Data Systems | Singleton |
| lu-obs-cardinality-sampling-cost | obs-cardinality-sampling-cost | 1 | Observability & Performance | Singleton |
| lu-obs-db-io-downstream-attribution | obs-db-io-downstream-attribution | 1 | Observability & Performance | Singleton |
| lu-obs-diagnostic-method | obs-diagnostic-method | 1 | Observability & Performance | Singleton |
| lu-obs-instrumentation-tracing | obs-instrumentation-context; obs-tracing-distributed-evidence | 2 | Observability & Performance | Multi |
| lu-obs-latency-throughput-saturation | obs-latency-throughput-saturation | 1 | Observability & Performance | Singleton |
| lu-obs-load-test-benchmark-validity | obs-load-test-benchmark-validity | 1 | Observability & Performance | Singleton |
| lu-obs-logs-structured-correlation | obs-logs-structured-correlation | 1 | Observability & Performance | Singleton |
| lu-obs-profiling-runtime-evidence | obs-profiling-runtime-evidence | 1 | Observability & Performance | Singleton |
| lu-obs-signals-correlation | obs-signals-correlation | 1 | Observability & Performance | Singleton |
| lu-os-blocking-io-waits | os-blocking-io-waits; os-files-handles-sockets-ipc | 2 | Operating Systems & I/O Foundations | Multi |
| lu-os-process-thread-kernel | os-process-thread-kernel | 1 | Operating Systems & I/O Foundations | Singleton |
| lu-os-resource-exhaustion | os-resource-exhaustion | 1 | Operating Systems & I/O Foundations | Singleton |
| lu-os-scheduling-starvation | os-scheduling-starvation | 1 | Operating Systems & I/O Foundations | Singleton |
| lu-os-termination-graceful-shutdown | os-termination-graceful-shutdown | 1 | Operating Systems & I/O Foundations | Singleton |
| lu-os-virtual-memory-page-cache | os-virtual-memory-page-cache | 1 | Operating Systems & I/O Foundations | Singleton |
| lu-outbox-duplicate-safe-effect | msg-consumer-idempotency-inbox; msg-outbox-db-publish-gap | 2 | Messaging & Event-Driven Consistency | Multi |
| lu-prog-api-refactoring-change-safety | prog-api-refactoring-change-safety | 1 | Programming & Software Design Foundations | Singleton |
| lu-prog-collections-complexity | prog-collections-complexity | 1 | Programming & Software Design Foundations | Singleton |
| lu-prog-composition-dependencies | prog-composition-dependencies | 1 | Programming & Software Design Foundations | Singleton |
| lu-prog-errors-results | prog-errors-results | 1 | Programming & Software Design Foundations | Singleton |
| lu-prog-invariants-domain-model | prog-invariants-domain-model | 1 | Programming & Software Design Foundations | Singleton |
| lu-prog-resource-ownership | prog-resource-ownership | 1 | Programming & Software Design Foundations | Singleton |
| lu-prog-types-generics | prog-types-generics | 1 | Programming & Software Design Foundations | Singleton |
| lu-prog-values-identity | prog-values-identity | 1 | Programming & Software Design Foundations | Singleton |
| lu-race-atomicity | concurrency-interleavings-invariants; concurrency-races-check-then-act; concurrency-synchronization-atomicity | 3 | Concurrency & Async | Multi |
| lu-rel-cascading-failure-queue-capacity | rel-cascading-failure-queue-capacity | 1 | Reliability / SRE | Singleton |
| lu-rel-dependency-budgets | rel-dependency-budgets | 1 | Reliability / SRE | Singleton |
| lu-rel-disaster-recovery-rpo-rto | rel-disaster-recovery-rpo-rto | 1 | Reliability / SRE | Singleton |
| lu-rel-failure-injection-verification | rel-failure-injection-verification | 1 | Reliability / SRE | Singleton |
| lu-rel-health-probes | delivery-probes-health; rel-health-readiness-semantics | 2 | Containers / Kubernetes / Cloud Delivery; Reliability / SRE | Multi |
| lu-rel-incident-response-postmortem | rel-incident-response-postmortem | 1 | Reliability / SRE | Singleton |
| lu-rel-overload-load-shedding-degradation | rel-overload-load-shedding-degradation | 1 | Reliability / SRE | Singleton |
| lu-rel-user-journey-sli-slo-budget | rel-user-journey-sli-slo-budget | 1 | Reliability / SRE | Singleton |
| lu-release-rollout-rollback | delivery-rollout-rollback-strategies; rel-change-rollout-rollback-risk | 2 | Containers / Kubernetes / Cloud Delivery; Reliability / SRE | Multi |
| lu-runtime-allocation-gc | runtime-allocation-gc; runtime-memory-roots-lifetime; runtime-retention-pooling-large-objects | 3 | Runtime & Memory | Multi |
| lu-runtime-diagnostics | runtime-diagnostics; runtime-memory-performance-debug | 2 | Runtime & Memory | Multi |
| lu-runtime-jit-warmup | runtime-jit-warmup | 1 | Runtime & Memory | Singleton |
| lu-runtime-managed-execution | runtime-managed-execution | 1 | Runtime & Memory | Singleton |
| lu-sec-abuse-bruteforce-resource-business-flow | sec-abuse-bruteforce-resource-business-flow | 1 | Security | Singleton |
| lu-sec-audit-detection-evidence | sec-audit-detection-evidence | 1 | Security | Singleton |
| lu-sec-auth-session-oauth | sec-auth-session-token; sec-oauth-oidc-awareness | 2 | Security | Multi |
| lu-sec-authorization-object-tenant | sec-authorization-object-tenant | 1 | Security | Singleton |
| lu-sec-browser-boundaries-cors-csrf-xss | sec-browser-boundaries-cors-csrf-xss | 1 | Security | Singleton |
| lu-sec-cryptography-credentials-tokens | sec-cryptography-credentials-tokens | 1 | Security | Singleton |
| lu-sec-data-encryption-key-lifecycle | sec-data-encryption-key-lifecycle | 1 | Security | Singleton |
| lu-sec-injection-ssrf-input-output | sec-injection-ssrf-input-output | 1 | Security | Singleton |
| lu-sec-race-business-logic-abuse | sec-race-business-logic-abuse | 1 | Security | Singleton |
| lu-sec-secrets-third-party-trust | sec-secrets-third-party-trust | 1 | Security | Singleton |
| lu-sec-trust-boundary-threat-model | sec-trust-boundary-threat-model | 1 | Security | Singleton |
| lu-sec-unseen-attack-transfer | sec-unseen-attack-transfer | 1 | Security | Singleton |
| lu-test-ci-flakiness-repeatability | test-ci-flakiness-repeatability; test-real-dependency-fixtures; test-risk-strategy-boundaries; test-time-concurrency-determinism | 4 | Testing & Engineering Quality | Multi |
| lu-test-failure-resilience | test-failure-resilience; test-risk-transfer | 2 | Testing & Engineering Quality | Multi |
| lu-test-migration-compatibility | test-migration-compatibility | 1 | Testing & Engineering Quality | Singleton |
| lu-test-property-boundary-fuzz | test-property-boundary-fuzz | 1 | Testing & Engineering Quality | Singleton |
| lu-test-review-static-analysis-change-safety | test-review-static-analysis-change-safety | 1 | Testing & Engineering Quality | Singleton |
| lu-test-unit-integration-contract | test-unit-integration-contract | 1 | Testing & Engineering Quality | Singleton |
## D. Singleton Review Registry

| Unit ID | Capability | Strongest merge candidate(s) | Why merge rejected |
|---|---|---|---|
| lu-api-circuit-bulkhead-rate-limit | api-circuit-bulkhead-rate-limit | lu-api-deadline-retry-policy; lu-sec-abuse-bruteforce-resource-business-flow | Assessment: slow partner plus tenant burst; queue/admission evidence. Isolation/admission differs from time budget or attacker budget selection. |
| lu-api-contract-resource-semantics | api-contract-resource-semantics | lu-api-validation-errors-pagination; lu-api-request-identity-idempotency | Assessment: ambiguous order; state/status contract. Operation contract differs from recoverable list/error or duplicate identity evidence. |
| lu-api-request-identity-idempotency | api-request-identity-idempotency | lu-api-unknown-outcome-reconciliation; lu-api-deadline-retry-policy | Assessment: lost response; key/fingerprint/outcome claim. Duplicate claim differs from external convergence or retry budget. |
| lu-api-unknown-outcome-reconciliation | api-unknown-outcome-reconciliation | lu-net-failure-localization-unknown-outcome; lu-api-request-identity-idempotency | Assessment: provider timeout; operation ID/provider/local audit. Convergence after a mutation differs from transport location or request dedupe. |
| lu-api-validation-errors-pagination | api-validation-errors-pagination | lu-api-contract-resource-semantics; lu-api-versioning-compatibility | Assessment: invalid payload plus shifting list; ProblemDetails/cursor. Wire recovery/traversal differs from operation state or client coexistence. |
| lu-api-versioning-compatibility | api-versioning-compatibility | lu-api-contract-resource-semantics; lu-prog-api-refactoring-change-safety | Assessment: old client semantic change; diff/consumer telemetry. Independent-client compatibility differs from one state transition or internal refactor. |
| lu-arch-consistency-latency-availability | arch-consistency-latency-availability | arch-requirements-quality-attributes; prog-invariants-domain-model | Different mechanism/evidence boundary prevents one credible assessment policy. |
| lu-arch-evolution-migration-strangler | arch-evolution-migration-strangler | arch-boundaries-ownership; prog-api-refactoring-change-safety | Different mechanism/evidence boundary prevents one credible assessment policy. |
| lu-arch-scale-capacity-partitioning | arch-scale-capacity-partitioning | arch-requirements-quality-attributes; obs-latency-throughput-saturation | Different mechanism/evidence boundary prevents one credible assessment policy. |
| lu-arch-sync-async-integration | arch-sync-async-integration | arch-requirements-quality-attributes; net-http-semantics | Different mechanism/evidence boundary prevents one credible assessment policy. |
| lu-cache-capacity-eviction-fallback | cache-capacity-eviction-fallback | lu-cache-patterns; lu-nosql-redis-structures-memory | Eviction-to-origin containment differs from loader/write and Redis layout evidence. |
| lu-cache-evidence-transfer | cache-evidence-transfer | lu-cache-capacity-eviction-fallback; lu-cache-source-of-truth-invalidation; lu-cache-patterns | L4 diagnosis spans capacity, freshness, layers and miss-overload. |
| lu-concurrency-deadlock-starvation | concurrency-deadlock-starvation | lu-race-atomicity; lu-db-locks-deadlocks-contention | Wait-cycle/forward-progress evidence differs from invariant interleaving and transaction locks. |
| lu-concurrency-local-vs-distributed | concurrency-local-vs-distributed | lu-race-atomicity | Cross-replica authority needs replica identity, absent from local race proof. |
| lu-concurrency-memory-visibility | concurrency-memory-visibility | lu-race-atomicity | Memory-publication ordering differs from an interleaving outcome. |
| lu-db-backup-restore | db-backup-restore | lu-db-wal-crash-recovery; lu-rel-disaster-recovery-rpo-rto | Recovery point/duration differs from WAL replay and DR policy. |
| lu-db-connection-pool-exhaustion | db-connection-pool-exhaustion | lu-os-resource-exhaustion; lu-concurrency-async-parallelism | Pool acquisition/session ownership differs from OS quota and admission evidence. |
| lu-db-locks-deadlocks-contention | db-locks-deadlocks-contention | lu-db-transactions-mvcc-isolation; lu-concurrency-deadlock-starvation | Lock wait-cycle evidence differs from MVCC/isolation and scheduler evidence. |
| lu-db-modeling-invariants | db-modeling-invariants | lu-db-partitioning-sharding-boundary; lu-prog-invariants-domain-model | Legal persisted state differs from locality/fan-out and domain-transition proof. |
| lu-db-partitioning-sharding-boundary | db-partitioning-sharding-boundary | lu-db-modeling-invariants; lu-dist-partitioning-ownership-rebalancing | Distribution/routing/fan-out differs from constraint and ownership evidence. |
| lu-db-production-diagnosis-transfer | db-production-diagnosis-transfer | lu-db-buffer-io; lu-execution-plan-estimates; lu-db-locks-deadlocks-contention; lu-db-connection-pool-exhaustion | L4 competing-hypothesis transfer spans foundations; no foundation trace can assess it. |
| lu-db-replication-failover | db-replication-failover | lu-db-wal-crash-recovery; lu-dist-replication-leader-quorum | Relational role/lag/client outcome differs from WAL and quorum evidence. |
| lu-db-schema-evolution | db-schema-evolution | lu-db-modeling-invariants; lu-rel-change-rollout-rollback-risk | Compatibility/backfill state differs from invariant and rollout policy evidence. |
| lu-db-wal-crash-recovery | db-wal-crash-recovery | lu-db-backup-restore; lu-db-replication-failover | Crash-window log evidence differs from restore and replica role/lag. |
| lu-delivery-autoscaling-signal-boundary | delivery-autoscaling-signal-boundary | Scaling is a control loop | Scaling is a control loop; resource limits and shedding are different controls. |
| lu-delivery-cloud-responsibility-managed-services | delivery-cloud-responsibility-managed-services | Provider/application responsibility differs from DR, security and cross-platform transfer. | Provider/application responsibility differs from DR, security and cross-platform transfer. |
| lu-delivery-container-process-lifecycle | delivery-container-process-lifecycle | Basic start/exit/restart state differs from traffic draining orchestration. | Basic start/exit/restart state differs from traffic draining orchestration. |
| lu-delivery-graceful-shutdown-draining | delivery-graceful-shutdown-draining | Drain orchestration has traffic and durable-work state beyond basic container lifecycle. | Drain orchestration has traffic and durable-work state beyond basic container lifecycle. |
| lu-delivery-platform-evidence-debug | delivery-platform-evidence-debug | Diagnosis chooses among mechanism-specific inputs | Diagnosis chooses among mechanism-specific inputs; lifecycle/resources/health need narrower controls. |
| lu-delivery-platform-transfer | delivery-platform-transfer | L4 transfer synthesizes foundations rather than replacing a mechanism assessment. | L4 transfer synthesizes foundations rather than replacing a mechanism assessment. |
| lu-delivery-resources-cpu-memory | delivery-resources-cpu-memory | Resource controls differ from replica-control-loop behavior. | Resource controls differ from replica-control-loop behavior. |
| lu-dist-consensus-coordination-purpose | dist-consensus-coordination-purpose | lu-dist-replication-leader-quorum; lu-msg-background-jobs-scheduling | Term, membership and quorum prove one authority decision; replica lag proves copy state and scheduler lease/misfire proves durable execution. Their failure loops and safe-progress assessments differ. |
| lu-dist-consistency-linearizability | dist-consistency-linearizability | lu-nosql-cassandra-lsm-compaction-consistency; lu-cache-source-of-truth-invalidation | History/visibility proof decides a consistency guarantee; storage compaction and cache freshness use different state, telemetry and remediation. |
| lu-dist-guarantee-recovery-transfer | dist-guarantee-recovery-transfer | lu-dist-rpc-unknown-completion; lu-dist-reconciliation-convergence | This L4 incident combines lost reply, topology and repair evidence; RPC and reconciliation each prove one narrower mechanism. Merging would make foundation evidence wait for synthesis. |
| lu-dist-partial-failure-uncertainty | dist-partial-failure-uncertainty | lu-dist-rpc-unknown-completion; lu-dist-replication-leader-quorum | Partial failure uses per-hop uncertainty and audit absence; RPC needs send/response state and replication needs ack/failover state. Those evidence sets diagnose different failures and require separate bounded decisions. |
| lu-dist-partitioning-ownership-rebalancing | dist-partitioning-ownership-rebalancing | lu-msg-consumer-groups-offsets-rebalance; lu-db-partitioning-sharding-boundary | Owner epoch/handoff/routing proves portable rebalance; offsets prove broker progress and DB evidence proves query fan-out. Stale-owner debugging is separate. |
| lu-dist-reconciliation-convergence | dist-reconciliation-convergence | lu-dist-rpc-unknown-completion; lu-msg-external-side-effect-reconciliation | Authority/diff/repeatable repair handles missed events beyond RPC; provider callback/reference is a narrower external state machine. |
| lu-dist-replication-leader-quorum | dist-replication-leader-quorum | lu-dist-consensus-coordination-purpose; lu-msg-producer-acks-durability | Replica positions, acknowledgement set and promotion prove durability/visibility; term authority or a producer contract does not. Leader-loss debug and guarantee assessment remain distinct. |
| lu-dist-rpc-unknown-completion | dist-rpc-unknown-completion | lu-dist-reconciliation-convergence; lu-msg-external-side-effect-reconciliation | Send/execution/response ambiguity is proven by operation IDs and server audit; reconciliation needs authority diffs, while provider recovery needs external status. |
| lu-dist-time-order-causality | dist-time-order-causality | lu-msg-model-queue-topic-partition-order; lu-dist-guarantee-recovery-transfer | Causal/version evidence across skewed clocks differs from one partition ordering scope and from multi-guarantee incident synthesis. |
| lu-dist-transactions-2pc-boundary | dist-transactions-2pc-boundary | lu-db-transactions-mvcc-isolation; lu-msg-workflow-saga-compensation | Prepare/coordinator recovery and held locks differ from local visibility and forward compensation; each needs a different failure decision. |
| lu-msg-background-jobs-scheduling | msg-background-jobs-scheduling | lu-msg-delivery-retry-poison-dlq; lu-dist-consensus-coordination-purpose; lu-concurrency-async-parallelism | Trigger/misfire/lease/attempt state proves scheduled recovery; DLQ, authority and local admission expose adjacent but different failures and assessments. |
| lu-msg-consumer-groups-offsets-rebalance | msg-consumer-groups-offsets-rebalance | lu-msg-model-queue-topic-partition-order; lu-msg-replay-backfill; lu-msg-lag-backpressure-evidence | Generation, assignment and offset progress differ from routing model, historic replay range and capacity telemetry. |
| lu-msg-delivery-retry-poison-dlq | msg-delivery-retry-poison-dlq | lu-msg-model-queue-topic-partition-order; lu-msg-lag-backpressure-evidence | Attempt/error/DLQ evidence classifies recovery; routing topology and service-rate saturation need different observations and mitigations. |
| lu-msg-external-side-effect-reconciliation | msg-external-side-effect-reconciliation | lu-dist-rpc-unknown-completion; lu-dist-reconciliation-convergence | Provider reference/callback establishes external truth; generic timeout ambiguity and projection repair cannot prove one external effect. |
| lu-msg-lag-backpressure-evidence | msg-lag-backpressure-evidence | lu-msg-consumer-groups-offsets-rebalance; lu-msg-delivery-retry-poison-dlq | Rates, per-partition lag and downstream saturation diagnose capacity; assignment and poison classification are competing but separate causes. |
| lu-msg-model-queue-topic-partition-order | msg-model-queue-topic-partition-order | lu-msg-consumer-groups-offsets-rebalance; lu-msg-delivery-retry-poison-dlq | Destination/key/partition model is foundational; group offsets and retry classification have separate state, failures and assessments. |
| lu-msg-producer-acks-durability | msg-producer-acks-durability | lu-msg-model-queue-topic-partition-order; lu-dist-replication-leader-quorum; lu-outbox-duplicate-safe-effect | Producer configuration and broker ack/failover prove client durability scope; routing, quorum purpose and DB-to-broker intent remain separate mechanisms. |
| lu-msg-replay-backfill | msg-replay-backfill | lu-msg-consumer-groups-offsets-rebalance; lu-msg-schema-evolution-contract-ownership | Range/checkpoint/live-watermark proves rebuild safety; active assignment and contract compatibility use different evidence and failure loops. |
| lu-msg-schema-evolution-contract-ownership | msg-schema-evolution-contract-ownership | lu-msg-replay-backfill; lu-msg-model-queue-topic-partition-order | Producer/consumer version matrix proves compatibility; replay range and partition routing do not test retained-payload interpretation. |
| lu-msg-workflow-saga-compensation | msg-workflow-saga-compensation | lu-dist-transactions-2pc-boundary; lu-msg-external-side-effect-reconciliation | Workflow state and compensation prove forward recovery; coordinator atomicity and one provider status query are different state machines. |
| lu-net-failure-localization-unknown-outcome | net-failure-localization-unknown-outcome | lu-api-unknown-outcome-reconciliation | Assessment: timed-out mutation; layered timestamps and audit. Network localization is not authoritative business reconciliation. |
| lu-net-request-path-dns | net-request-path-dns | lu-net-failure-localization-unknown-outcome; lu-net-proxy-tls-forwarded-boundary | Assessment: DNS failover trace; TTL/cache/address evidence. DNS proves resolution; the others require post-send ambiguity or transport-trust evidence. |
| lu-net-service-discovery-load-balancing | net-service-discovery-load-balancing | lu-net-request-path-dns; lu-net-proxy-tls-forwarded-boundary; lu-rel-health-readiness-semantics | DNS proves one resolver answer, proxy boundary proves trusted forwarding, and readiness proves traffic eligibility. This unit alone traces evolving endpoint membership through picker selection into connection/request distribution; stale endpoint, unhealthy selection and long-lived skew need that combined evidence and a routing-boundary assessment. |
| lu-nosql-model-selection | nosql-model-selection | lu-nosql-mongo-aggregate-model; lu-nosql-redis-structures-memory; lu-nosql-search-projection | Family framing differs from product mechanisms and L4 comparison. |
| lu-nosql-mongo-aggregate-model | nosql-mongo-aggregate-model | lu-nosql-mongo-index-shard-transaction | Aggregate ownership/growth differs from route, shard and transaction evidence. |
| lu-nosql-mongo-index-shard-transaction | nosql-mongo-index-shard-transaction | lu-nosql-mongo-aggregate-model; lu-dist-partitioning-ownership-rebalancing | Route/transaction scope differs from aggregate modeling and generic rebalance proof. |
| lu-nosql-redis-persistence-replication-cluster-streams | nosql-redis-persistence-replication-cluster-streams | lu-nosql-redis-structures-memory; lu-msg-consumer-groups-offsets-rebalance | Topology/pending-work evidence differs from structures and broker assignment. |
| lu-nosql-redis-structures-memory | nosql-redis-structures-memory | lu-nosql-redis-persistence-replication-cluster-streams; lu-cache-capacity-eviction-fallback | Structure/memory evidence differs from topology and cache fallback. |
| lu-nosql-storage-choice-transfer | nosql-transfer-storage-choice | lu-nosql-model-selection; lu-nosql-cassandra-lsm-compaction-consistency | L4 comparison applies foundations but teaches no one product mechanism. |
| lu-obs-cardinality-sampling-cost | obs-cardinality-sampling-cost | Cardinality controls retention cost and fidelity | Cardinality controls retention cost and fidelity; instrumentation/tracing proves causal boundaries. |
| lu-obs-db-io-downstream-attribution | obs-db-io-downstream-attribution | Attribution proves one causal timing boundary | Attribution proves one causal timing boundary; L4 diagnosis tests competing hypotheses beyond that boundary. |
| lu-obs-diagnostic-method | obs-diagnostic-method | Diagnostic synthesis uses many evidence types | Diagnostic synthesis uses many evidence types; profiling is one evidence source. |
| lu-obs-latency-throughput-saturation | obs-latency-throughput-saturation | Workload symptoms differ from causal attribution of time to one dependency boundary. | Workload symptoms differ from causal attribution of time to one dependency boundary. |
| lu-obs-load-test-benchmark-validity | obs-load-test-benchmark-validity | Benchmark validity governs experiment conditions | Benchmark validity governs experiment conditions; workload metrics are only inputs. |
| lu-obs-logs-structured-correlation | obs-logs-structured-correlation | Structured logging is one signal implementation | Structured logging is one signal implementation; cross-signal selection is separate. |
| lu-obs-profiling-runtime-evidence | obs-profiling-runtime-evidence | Runtime diagnostics collects evidence | Runtime diagnostics collects evidence; this unit interprets it for a production hypothesis. |
| lu-obs-signals-correlation | obs-signals-correlation | Signal selection spans evidence types | Signal selection spans evidence types; log schema alone does not prove it. |
| lu-os-process-thread-kernel | os-process-thread-kernel | lu-os-resource-exhaustion | Process/thread location differs from finite-quota failure evidence. |
| lu-os-resource-exhaustion | os-resource-exhaustion | lu-os-process-thread-kernel | Specific resource limit/failure evidence differs from execution topology. |
| lu-os-scheduling-starvation | os-scheduling-starvation | lu-concurrency-async-parallelism | Runnable capacity/forward progress differs from application admission evidence. |
| lu-os-termination-graceful-shutdown | os-termination-graceful-shutdown | lu-delivery-container-process-lifecycle | Active-work drain/deadline differs from platform probe/container evidence. |
| lu-os-virtual-memory-page-cache | os-virtual-memory-page-cache | lu-runtime-allocation-gc | OS residency/page-cache evidence differs from managed reachability/allocation evidence. |
| lu-prog-api-refactoring-change-safety | prog-api-refactoring-change-safety | lu-api-contract-resource-semantics | Published-contract compatibility is not the foundation mechanisms split out of this unit. |
| lu-prog-collections-complexity | prog-collections-complexity | lu-prog-values-identity | Workload cost evidence differs from alias/mutation evidence. |
| lu-prog-composition-dependencies | prog-composition-dependencies | lu-prog-resource-ownership | Wiring direction is not resource lifetime ownership. |
| lu-prog-errors-results | prog-errors-results | lu-prog-api-refactoring-change-safety | Compatibility evidence does not classify expected rejection, unexpected fault and partial outcome. |
| lu-prog-invariants-domain-model | prog-invariants-domain-model | lu-race-atomicity | Race evidence does not prove the legal domain transition and persistence guard. |
| lu-prog-resource-ownership | prog-resource-ownership | lu-concurrency-async-parallelism; lu-net-streaming-body-cancellation | Final-consumer lifetime differs from admission/cancellation and HTTP-body protocol evidence. |
| lu-prog-types-generics | prog-types-generics | lu-prog-invariants-domain-model | Compile-time representability differs from transition/persistence enforcement. |
| lu-prog-values-identity | prog-values-identity | lu-prog-collections-complexity | Alias/mutation evidence differs from access-path cost evidence. |
| lu-rel-cascading-failure-queue-capacity | rel-cascading-failure-queue-capacity | Cascades diagnose cross-service pressure | Cascades diagnose cross-service pressure; admission control and journey budgets use different state. |
| lu-rel-dependency-budgets | rel-dependency-budgets | Journey budget allocation differs from API retry mechanics and cascade diagnosis. | Journey budget allocation differs from API retry mechanics and cascade diagnosis. |
| lu-rel-disaster-recovery-rpo-rto | rel-disaster-recovery-rpo-rto | Business recovery objectives differ from backup, replication and provider-control mechanisms. | Business recovery objectives differ from backup, replication and provider-control mechanisms. |
| lu-rel-failure-injection-verification | rel-failure-injection-verification | Production-safe experiment design differs from general resilience testing and diagnosis. | Production-safe experiment design differs from general resilience testing and diagnosis. |
| lu-rel-incident-response-postmortem | rel-incident-response-postmortem | Incident command workflow differs from diagnosis and SLI measurement. | Incident command workflow differs from diagnosis and SLI measurement. |
| lu-rel-overload-load-shedding-degradation | rel-overload-load-shedding-degradation | Admission state differs from cascade propagation and SLI/SLO outcome policy. | Admission state differs from cascade propagation and SLI/SLO outcome policy. |
| lu-rel-user-journey-sli-slo-budget | rel-user-journey-sli-slo-budget | SLI/SLO measurement is reusable foundation, not a rollout or incident command workflow. | SLI/SLO measurement is reusable foundation, not a rollout or incident command workflow. |
| lu-runtime-jit-warmup | runtime-jit-warmup | lu-obs-load-test-benchmark-validity | Runtime first-call/JIT evidence differs from workload/measurement design. |
| lu-runtime-managed-execution | runtime-managed-execution | lu-runtime-allocation-gc | Layer-responsibility evidence differs from heap/allocation evidence. |
| lu-sec-abuse-bruteforce-resource-business-flow | sec-abuse-bruteforce-resource-business-flow | lu-api-circuit-bulkhead-rate-limit; lu-sec-unseen-attack-transfer | Assessment: expensive export; account/device/resource cost. Abuse budget differs from dependency isolation or synthesis transfer. |
| lu-sec-audit-detection-evidence | sec-audit-detection-evidence | lu-obs-logs-structured-correlation; lu-sec-secrets-third-party-trust | Assessment: privileged export; audit schema/detection query. Accountable audit differs from diagnostic logs or third-party verification. |
| lu-sec-authorization-object-tenant | sec-authorization-object-tenant | lu-sec-auth-session-oauth; lu-sec-trust-boundary-threat-model | Assessment: cross-tenant update; authoritative ownership/policy. Authentication/threat mapping do not prove object authorization. |
| lu-sec-browser-boundaries-cors-csrf-xss | sec-browser-boundaries-cors-csrf-xss | lu-net-http-streaming-cancellation; lu-sec-injection-ssrf-input-output | Assessment: cookie browser integration; origin/cookie/output evidence. Browser boundary differs from HTTP stream lifecycle and server sink control. |
| lu-sec-cryptography-credentials-tokens | sec-cryptography-credentials-tokens | lu-sec-auth-session-oauth; lu-sec-secrets-third-party-trust | Session/OAuth evidence proves protocol and claim handling; secret/webhook evidence proves scope, rotation and third-party verification. This unit assesses primitive selection, password/reset-token storage and unsafe verification from algorithm/entropy/expiry evidence, a distinct state and failure loop. |
| lu-sec-data-encryption-key-lifecycle | sec-data-encryption-key-lifecycle | lu-sec-secrets-third-party-trust; lu-delivery-cloud-responsibility-managed-services | Secret trust and cloud responsibility do not prove data classification, envelope-key hierarchy, rotation or recovery. This unit requires KMS metadata, encryption metadata and rotation/recovery evidence to debug unreadable old data or an exposed key, so its lifecycle assessment remains independent. |
| lu-sec-injection-ssrf-input-output | sec-injection-ssrf-input-output | lu-net-request-path-dns; lu-sec-browser-boundaries-cors-csrf-xss | Assessment: filter plus fetch URL; binding/destination/egress. SSRF proves server-sink control beyond DNS or browser policy. |
| lu-sec-race-business-logic-abuse | sec-race-business-logic-abuse | lu-concurrency-races-check-then-act; lu-sec-authorization-object-tenant | Assessment: parallel coupon; atomic result/audit. Security exploit/business effect differs from generic race or pre-transition policy. |
| lu-sec-secrets-third-party-trust | sec-secrets-third-party-trust | lu-sec-audit-detection-evidence; lu-sec-trust-boundary-threat-model | Assessment: replayed webhook rotation; signature/timestamp/key audit. Verification/lifecycle differs from recording decisions or mapping paths. |
| lu-sec-trust-boundary-threat-model | sec-trust-boundary-threat-model | lu-sec-secrets-third-party-trust; lu-sec-authorization-object-tenant | Assessment: webhook data flow; actors/assets/crossings. Threat discovery differs from callback verification or object policy. |
| lu-sec-unseen-attack-transfer | sec-unseen-attack-transfer | lu-sec-race-business-logic-abuse; lu-sec-authorization-object-tenant | Assessment: unlabelled session/object/race incident; path and bypass test. Transfer synthesizes; each candidate proves one mechanism. |
| lu-test-migration-compatibility | test-migration-compatibility | test-risk-strategy-boundaries; api-versioning-compatibility | Different mechanism/evidence boundary prevents one credible assessment policy. |
| lu-test-property-boundary-fuzz | test-property-boundary-fuzz | prog-invariants-domain-model; test-risk-strategy-boundaries | Different mechanism/evidence boundary prevents one credible assessment policy. |
| lu-test-review-static-analysis-change-safety | test-review-static-analysis-change-safety | test-risk-strategy-boundaries; prog-api-refactoring-change-safety | Different mechanism/evidence boundary prevents one credible assessment policy. |
| lu-test-unit-integration-contract | test-unit-integration-contract | test-risk-strategy-boundaries; test-real-dependency-fixtures | Different mechanism/evidence boundary prevents one credible assessment policy. |
## E. Multi-Capability Grouping Review

| Unit ID | Shared problem / need | Shared mechanism / state trace | Shared observable evidence | Shared failure / debug story | Assessment-coherence argument |
|---|---|---|---|---|---|
| lu-api-deadline-retry-policy | 800 ms three-hop degraded call | remaining deadline then bounded retry | deadline/spans; attempts/error/timing/rate | nested full timeout/retry storm | calculate safe budget and attempt schedule. |
| lu-arch-boundaries-ownership | Choose module/service boundary by invariant, change ownership and operational owner. | Boundary grants one owner authority over state/rules; crossing it needs explicit contract. → Decisions only matter against correctness, latency, availability, throughput, durability, security, operability, changeability and cost needs. → One owner accepts transition; derived systems copy/calculate with different freshness. → Critical transition needs failure behavior, recovery owner, trust path and diagnostic evidence. | State owner; write paths; invariant; API/event dependencies; coupling; deployment owner.; Requirement list; quality scenario; traffic/data estimates; constraints; assumption register.; Write paths; source version; update flow; derived copy; rebuild/reconcile.; Failure table; recovery owner; data flow; telemetry path; RPO/RTO/SLO; operation ID. | Service per table; shared DB mutation; split invariant; chatty arbitrary decomposition; no owner.; Technology-first; scale no number; conflict implicit; optional feature drives core; imagined hyperscale.; Two authorities; cache/search mutated as source; reporting write leaks; unrebuildable projection; migration ambiguity.; No timeout/recovery owner; unmodeled trust path; async uncorrelated; dependency collapse; no recovery plan. | One bounded trace observes all Primary mechanisms. |
| lu-arch-cost-complexity-changeability | Reject design whose lifecycle cost exceeds properties bought and revisit when constraints change. | Component/boundary creates deploy, failure, data movement, skills, cloud and migration cost. → Explicit assumptions let future engineer know why/when decision changes. | Component count; ownership/incident burden; cost; latency/capacity; change frequency.; ADR; capacity evidence; option comparison; risk; revisit condition; outcome. | Microservices no change need; résumé Kafka/Redis/K8s; irrelevant optimization; lock-in ignored.; Diagram no rationale; universal best practice; rejected choices hidden; stale decision persists. | One bounded trace observes all Primary mechanisms. |
| lu-cache-patterns | Read/write and expiry | loader-to-miss mode | loader/expiry/key-QPS | stampede/hot key | one task proves both. |
| lu-cache-source-of-truth-invalidation | Source update with L1/L2 | version/invalidation/layer | version/age/instance | stale layer | one task proves all. |
| lu-concurrency-async-parallelism | Phân biệt async chờ completion, concurrency quản lý nhiều work và parallel execution dùng nhiều execution resource. | Async không tự tạo thread; concurrency là overlap lifetime; parallelism là nhiều work thực sự chạy đồng thời khi CPU/capacity cho phép. → CancellationToken báo owner rằng result không còn cần hoặc deadline đã hết; code phải observe signal, stop safely và không coi cancel là rollback của side effect đã commit. → Arrival rate lớn hơn service rate làm in-flight work tích tụ; bounded queue/semaphore buộc producer wait, reject hoặc shed thay vì giữ work vô hạn. | Timeline task/thread; CPU; active operations; request latency; queue depth.; Token propagation trace; active operation count; cancellation log; audit state; cleanup/timeout test.; In-flight count; queue depth; pool usage; throughput; p95/p99; rejection/wait time. | Wrap sync I/O trong Task.Run; nghĩ await tăng CPU throughput; tạo parallelism vô hạn cho downstream I/O.; Token không được forward; continue expensive work sau disconnect; cancel giữa side effect gây unknown outcome; dispose khi child còn dùng.; Unbounded in-flight tasks; queue/memory growth; pool exhaustion; p99 tăng dù throughput không tăng. | One bounded trace observes all Primary mechanisms. |
| lu-db-buffer-io | Cold/warm query | page-buffer-storage | buffers/size/timing | buffer-hit confusion | one trace proves both. |
| lu-db-transactions-mvcc-isolation | Concurrent reservation | visible version/isolation | snapshots/conflict | write skew | one trace proves both. |
| lu-delivery-artifact-provenance | A production pod runs an image tag that cannot be tied confidently to a source commit or approved deployment. | Trace source commit to immutable image digest, config reference, approval and deployed identity. | Git SHA, image digest, SBOM, config reference, approval record and deployment record. | Mutable tags or production rebuilds lose rollback identity and provenance. | Artifact identity and promotion provenance are one trace from build to deployed state. |
| lu-execution-plan-estimates | Skewed report | operator/estimate trace | rows/loops/stats | bad plan | one plan proves both. |
| lu-index-query-shape | Tenant ordered lookup | composite prefix/range/order | plan/rows/Sort | unusable path | one plan proves index navigation and key-path fit. |
| lu-net-connection-reuse-pooling | partner idle timeout spike | TCP connect/reset then pool reuse/lifetime | socket state/connect timing; pool queue/ports/idle age | new client per request or stale pooled reset | classify both evidence surfaces in one trace. |
| lu-net-http-streaming-cancellation | disconnect during large upload | HTTP contract then stream abort/lifetime | status capture; bytes/abort/allocation | buffering and continued work | define partial outcome and stop boundary. |
| lu-net-proxy-tls-forwarded-boundary | ingress redirect/IP error | TLS termination then trusted forwarded identity | certificate/handshake; peer IP/raw headers/proxy config | spoofed header or wrong termination | identify both boundaries in one ingress trace. |
| lu-nosql-cassandra-lsm-compaction-consistency | Time series | partition-to-LSM-to-replica | distribution/compaction | hot/tombstones | one query proves both. |
| lu-nosql-search-projection | Catalog projection | analyzer-refresh-shard-page | tokens/profile | wrong analyzer/deep offset | one task proves both. |
| lu-obs-instrumentation-tracing | An order API enqueues payment work, but the payment wait disappears after the worker boundary. | Create semantic spans and propagate operation context through HTTP and message metadata so the causal trace stays connected. | Trace tree, parent/link relation, operation ID, headers/message metadata, dependency duration and retry attributes. | Worker context is lost, a span ends too early or downstream timing is detached from the initiating request. | Context propagation establishes the trace boundary; trace evidence verifies the reconstructed path. |
| lu-os-blocking-io-waits | Giải thích thread chờ vì completion ở bên ngoài và nhận ra sync I/O đang chiếm worker capacity. | File/socket/database operation hoàn tất qua kernel/external system; blocking giữ execution thread chờ, async cho phép thread làm work khác trong khi completion chưa tới. → Process giữ handle trỏ tới kernel resource; dispose/close giải phóng reference/quota, còn connection pool là owner layer khác với raw socket. | Blocked stack; wait time; worker/runtime queue; thread count; request queue growth.; Open handle count; socket states; per-process limits; connection-pool state; OS error code. | Blocking request path; sync I/O giữ worker; queue growth; timeout do worker starvation.; FD/handle leak; socket exhaustion; close quá sớm; IPC endpoint không được release. | One bounded trace observes all Primary mechanisms. |
| lu-outbox-duplicate-safe-effect | committed business change | Outbox publish then inbox effect | order/outbox/relay/broker/inbox/ledger IDs | relay crash plus duplicate delivery | One incident proves both durable boundaries. |
| lu-race-atomicity | Viết state transition và các interleaving có thể xảy ra để chứng minh invariant có thể bị phá ở đâu. | Khi hai operation overlap, read/validate/write có thể xen kẽ; invariant chỉ giữ nếu transition được atomically protected ở đúng owner. → Check tách khỏi act tạo cửa sổ để state đổi; correctness nằm ở compare-and-swap/conditional write/unique constraint chứ không chỉ validation trước đó. → Lock, Interlocked hoặc transactional conditional update serializes/atomically applies state transition theo scope của primitive. | Step trace; concurrent test barrier; before/after state; affected-row count; audit sequence.; Interleaving trace; concurrent integration test; conditional affected rows; unique violation; version conflict.; Critical-section trace; contention time; affected rows; invariant test dưới parallel load. | Oversell inventory; duplicate reservation; lost update; negative balance.; Duplicate creation; lost update; TOCTOU authorization; negative stock.; Read-modify-write lost update; lock sai scope; double release; atomic increment dùng cho invariant nhiều field. | One bounded trace observes all Primary mechanisms. |
| lu-rel-health-probes | A dependency outage makes requests unsafe, but the process can still drain work and should not restart. | Define useful-progress and traffic-eligibility semantics, then configure probes so routing and restart actions follow that meaning. | Dependency state, probe configuration/result, ready endpoints, restart count and traffic outcome. | Readiness wired as liveness creates a restart storm or routes traffic to an unsafe instance. | Health meaning and probe behavior share one routing/restart state and outage assessment. |
| lu-release-rollout-rollback | A new checkout version is exposed to 5 percent traffic and breaks a path hidden by aggregate health. | Combine progressive traffic/version mechanics with version-specific journey evidence and compatibility-aware rollback or roll-forward. | Version/traffic split, deployment state, journey SLI, schema/config compatibility facts and recovery record. | A broad release expands blast radius or rollback conflicts with already-written state. | Risk policy and rollout mechanics form one release state machine and one recovery assessment. |
| lu-runtime-allocation-gc | Giải thích allocation rate dẫn tới GC work và chọn mitigation sau khi có số liệu. | Allocation tạo object trên managed heap; khi vùng nhớ cần thu hồi, GC tìm object còn reachable rồi dọn phần còn lại, nên tốc độ cấp phát quyết định tần suất và chi phí collection. → Object sống khi có đường reference từ GC root như stack, static, handle hoặc long-lived collection; scope source code không đồng nghĩa object hết reachable. → Retention là object còn reachable; pool chủ động giữ object để reuse; buffer lớn có allocation/lifetime cost riêng, và pool có thể biến allocation pressure thành retained heap. | Allocation rate; GC count/time; heap size; generation size; request latency lúc collection.; Heap graph; retaining path; root type; object count/size theo thời gian.; Heap dump; generation/size distribution; pool counters; allocation trace của large buffer. | High allocation rate; frequent GC; pause dài; CPU overhead do GC.; Unexpected retention; event handler giữ subscriber; cache/list vô hạn; closure giữ graph lớn.; Pool retains too much; large buffers repeatedly allocated; long-lived owner giữ object graph; wrong-size buffer reuse. | One bounded trace observes all Primary mechanisms. |
| lu-runtime-diagnostics | Chọn counter, trace hoặc dump/profile theo một hypothesis về runtime thay vì thu thập mọi thứ. | Counter trả lời xu hướng; trace cho timeline/causal activity; dump/profile cho object hoặc stack tại thời điểm; tool phải khớp câu hỏi. → Allocation, GC và retention tạo các dấu hiệu khác nhau; thay một biến rồi đo lại mới phân biệt causal effect. | Hypothesis viết trước; counter time series; trace span/stack; heap dump; profile hotspot.; Symptom timeline; allocation/GC counters; retaining path; controlled before/after experiment; post-change latency. | Collecting wrong evidence; dump sau khi symptom biến mất; kết luận leak từ heap size đơn lẻ.; Treating retention as GC tuning; pooling để che leak; mitigation giảm allocation nhưng tăng retained heap. | One bounded trace observes all Primary mechanisms. |
| lu-sec-auth-session-oauth | ID token sent to API | claim validation then OAuth/OIDC role distinction | issuer/audience/expiry; token type/scope/AS metadata | wrong token accepted | decide correct token and access boundary. |
| lu-test-ci-flakiness-repeatability | Diagnose CI failure as product defect, environment dependency or nondeterministic test. | Trustworthy test gives same verdict for same state; hidden clock/order/network/shared state breaks repeatability. → Test value falsifies risky assumption at narrowest boundary that retains actual mechanism. → Clock, barrier, scheduling point and test-data ownership intentionally reach desired state. → Fixture provides controlled real instance/state, observing constraint/transaction/serialization/broker behavior. | Repeat history; seed; test order; worker/env; resource owner; timing; failure artifact.; Risk statement; boundary; reproduced failure; invariant assertion; escaped defect history.; Gate events; controlled clock; task completion; captured interleaving; repeated stability.; Version; migration; seed; health; persisted/message result; cleanup/isolation. | Order dependency; shared DB/static; port collision; external network; timing race; retry hides flake.; Mock removes mechanism; E2E for pure logic; coverage misses path; implementation-shaped test.; Thread.Sleep; occasional race pass; assertion before work done; wall-clock expiry flake; shared mutable tests.; In-memory differs PostgreSQL; mock broker misses redelivery; shared DB leak; version mismatch; wrong migration. | One bounded trace observes all Primary mechanisms. |
| lu-test-failure-resilience | Verify outcome, durable state, retry/recovery and invariant under controlled dependency/resource failure. | Inject known boundary failure then assert observable result and post-recovery state. → Strategy derives from risk/mechanism, not copied feature test structure. | Injected fault; attempts; persisted/audit state; operation ID; result; recovery state.; Risk matrix; boundary; failing/passing fixture; real state; rejected alternative rationale. | Timeout only exception checked; retry duplicates; partial DB write; wrong fallback authority; stub always success.; Copy old shape after boundary moved; mock removes new failure; E2E no localization; green proves untested assumption. | One bounded trace observes all Primary mechanisms. |
## F. Cross-Owner Review

| Candidate neighborhood | Decision | Reason |
|---|---|---|
| os-virtual-memory-page-cache → runtime-memory-roots-lifetime | REJECTED | Page cache needs faults/reclaim/cold-warm reads; roots/lifetime needs a managed heap retaining path. |
| prog-invariants-domain-model → concurrency-interleavings-invariants | REJECTED | Invariant proof follows legal transition plus persistence guard; interleaving proof needs controlled read/check/write and atomicity result. |
| os-blocking-io-waits → concurrency-async-parallelism | REJECTED | Blocking I/O evidence is external completion and kernel handle/wait; async evidence is task lifetime, cancellation and bounded admission. |
| os-scheduling-starvation → concurrency-async-parallelism | REJECTED | Scheduler starvation needs runnable-queue/CPU forward-progress evidence; bounded concurrency needs application queue and downstream-pressure evidence. |
| prog-resource-ownership → concurrency-cancellation-lifetime | REJECTED | Ownership follows final-consumer release; cancellation proves stop-signal observation and side-effect boundary. |
| os-files-handles-sockets-ipc → net-tcp-connection-semantics | REJECTED | OS proves descriptor ownership/release; TCP proves SYN/connect/reset and peer state. One trace supplies context but cannot prove both mechanisms. |
| concurrency-cancellation-lifetime → net-streaming-body-cancellation | REJECTED | Concurrency proves application cancellation lifetime; HTTP streaming additionally proves byte transfer, partial-body outcome and abort-driven stream disposal. |
| prog-resource-ownership → net-streaming-body-cancellation | REJECTED | Final-consumer disposal is not HTTP abort evidence; streaming needs request-aborted, byte-count and response-stream lifecycle evidence. |
| prog-invariants-domain-model → db-modeling-invariants | REJECTED | Domain transition reasoning is a prerequisite slice; database unit proves persisted constraint behavior with concurrent writers.|
| os-virtual-memory-page-cache → db-buffer-io | REJECTED | OS page-cache evidence is faults/reclaim; database unit proves buffer/page statistics and query working-set behavior.|
| concurrency-interleavings-invariants → db-transactions-isolation-anomalies | REJECTED | Application interleaving/atomicity differs from two-session version visibility and isolation anomalies.|
| prog-invariants-domain-model → db-transactions-isolation-anomalies | REJECTED | Domain invariant names the rule; database unit proves two-session visibility/conflict behavior and isolation choice. |
| concurrency-deadlock-starvation → db-locks-deadlocks-contention | REJECTED | Scheduler forward-progress evidence differs from database lock owner/wait-cycle evidence.|
| dist-replication-leader-quorum → db-replication-failover | REJECTED | Generic quorum protocol differs from relational role, lag and client-operation evidence.|
| dist-partitioning-ownership-rebalancing → db-partitioning-sharding-boundary | REJECTED | Distributed ownership/rebalance differs from relational key distribution and query fan-out evidence.|
| os-resource-exhaustion → db-connection-pool-exhaustion | REJECTED | OS resource class is context; pool acquisition/session ownership is the assessed database mechanism.|
| concurrency-bounded-backpressure → db-connection-pool-exhaustion | REJECTED | Admission policy is context; it does not prove pool acquisition exhaustion diagnosis.|
| dist-partitioning-ownership-rebalancing → nosql-mongo-index-shard-transaction | REJECTED | Generic rebalancing differs from Mongo explain, shard route and transaction-scope evidence.|
| db-transactions-isolation-anomalies → nosql-mongo-index-shard-transaction | REJECTED | Relational isolation is context; Mongo unit proves its own document/shard transaction boundary.|
| dist-partitioning-ownership-rebalancing → nosql-cassandra-partition-model | REJECTED | Ownership vocabulary overlaps but Cassandra case needs partition/clustering query evidence.|
| dist-consistency-linearizability → nosql-cassandra-lsm-compaction-consistency | REJECTED | Guarantee reasoning differs from LSM/compaction and replica-policy operating evidence.|
| dist-replication-leader-quorum → nosql-redis-persistence-replication-cluster-streams | REJECTED | Redis persistence/replica/slot/PEL state is not a quorum protocol assessment.|
| dist-partitioning-ownership-rebalancing → nosql-redis-persistence-replication-cluster-streams | REJECTED | Redis slot and Stream pending work need product-specific evidence.|
| msg-model-queue-topic-partition-order → nosql-redis-persistence-replication-cluster-streams | REJECTED | Broker ordering differs from Redis consumer pending/ack state.|
| dist-partitioning-ownership-rebalancing → nosql-search-refresh-shards-pagination | REJECTED | Search shard/profile/pagination cost differs from rebalancing ownership.|
| concurrency-bounded-backpressure → cache-stampede-penetration-avalanche-hot-key | REJECTED | Admission is context; cache unit distinguishes expiry/miss/key overload shapes.|
| nosql-redis-structures-memory → cache-capacity-eviction-fallback | REJECTED | Redis structure memory differs from derived-copy eviction-to-origin containment.|
| dist-consistency-linearizability → cache-multilayer-coherence | REJECTED | Linearizability differs from freshness/version/layer attribution.|
| concurrency-local-vs-distributed → dist-partial-failure-uncertainty | REJECTED | Cross-owner assumed slice exists, but Stage 1 did not find one shared assessment boundary; revisit only if human review supplies a coherent case. |
| net-failure-localization-unknown-outcome → dist-partial-failure-uncertainty | REJECTED | Cross-owner assumed slice exists, but Stage 1 did not find one shared assessment boundary; revisit only if human review supplies a coherent case. |
| net-failure-localization-unknown-outcome → dist-rpc-unknown-completion | REJECTED | Cross-owner assumed slice exists, but Stage 1 did not find one shared assessment boundary; revisit only if human review supplies a coherent case. |
| concurrency-local-vs-distributed → dist-partitioning-ownership-rebalancing | REJECTED | Cross-owner assumed slice exists, but Stage 1 did not find one shared assessment boundary; revisit only if human review supplies a coherent case. |
| db-transactions-isolation-anomalies → dist-transactions-2pc-boundary | REJECTED | Local isolation proves one database boundary; 2PC needs participant coordination and cross-boundary failure evidence. |
| prog-invariants-domain-model → dist-reconciliation-convergence | REJECTED | Cross-owner assumed slice exists, but Stage 1 did not find one shared assessment boundary; revisit only if human review supplies a coherent case. |
| dist-replication-leader-quorum → msg-producer-acks-durability | REJECTED | Cross-owner assumed slice exists, but Stage 1 did not find one shared assessment boundary; revisit only if human review supplies a coherent case. |
| dist-partitioning-ownership-rebalancing → msg-consumer-groups-offsets-rebalance | REJECTED | Cross-owner assumed slice exists, but Stage 1 did not find one shared assessment boundary; revisit only if human review supplies a coherent case. |
| dist-partial-failure-uncertainty → msg-delivery-retry-poison-dlq | REJECTED | Cross-owner assumed slice exists, but Stage 1 did not find one shared assessment boundary; revisit only if human review supplies a coherent case. |
| db-transactions-isolation-anomalies → msg-consumer-idempotency-inbox | REJECTED | Local transaction is a prerequisite slice; inbox assessment proves duplicate delivery and consumer effect binding. |
| db-transactions-isolation-anomalies → msg-outbox-db-publish-gap | REJECTED | Local atomic commit is a prerequisite slice; outbox assessment proves the database-to-broker publication gap. |
| dist-partial-failure-uncertainty → msg-outbox-db-publish-gap | REJECTED | Cross-owner assumed slice exists, but Stage 1 did not find one shared assessment boundary; revisit only if human review supplies a coherent case. |

| prog-errors-results → api-validation-errors-pagination | REJECTED | Local result/error modeling differs from wire-level ProblemDetails field stability and cursor traversal under changing collections. |

| prog-api-refactoring-change-safety → api-versioning-compatibility | REJECTED | Internal refactoring safety differs from independent-client compatibility proven by contract diff, old payloads and rollout telemetry. |

| dist-rpc-unknown-completion → api-request-identity-idempotency | REJECTED | Distributed uncertainty is context; API idempotency proves same-key/fingerprint claim, replay and conflict behavior. |

| dist-rpc-unknown-completion → api-deadlines-timeout-cancellation | REJECTED | Unknown completion is a consequence; this API unit proves remaining deadline propagation and bounded retry timing. |

| dist-rpc-unknown-completion → api-unknown-outcome-reconciliation | REJECTED | RPC identifies ambiguity; reconciliation proves authoritative operation status and terminal convergence. |

| dist-reconciliation-convergence → api-unknown-outcome-reconciliation | REJECTED | System-wide replica/workflow convergence differs from one operation ID reconciled against provider and local audit state. |

| concurrency-cancellation-lifetime → api-deadlines-timeout-cancellation | REJECTED | Local cancellation lifetime differs from cross-hop budget propagation, remaining time and retry cutoff. |

| concurrency-bounded-backpressure → api-circuit-bulkhead-rate-limit | REJECTED | Generic bounded admission differs from choosing circuit, bulkhead or tenant rate limit using dependency/identity evidence. |

| concurrency-races-check-then-act → sec-race-business-logic-abuse | REJECTED | Generic interleaving differs from attacker-exploitable business effect and atomic owner proof. |

| net-http-semantics → sec-browser-boundaries-cors-csrf-xss | REJECTED | Server HTTP contract differs from browser origin, ambient credential and script-execution evidence. |

| net-request-path-dns → sec-injection-ssrf-input-output | REJECTED | DNS resolves intended destinations; SSRF proves untrusted input cannot control server-side destination and egress. |

| obs-logs-structured-correlation → sec-audit-detection-evidence | REJECTED | Diagnostic correlation differs from protected accountable subject/action/object/tenant/outcome audit records. |

| rel-health-readiness-semantics ↔ delivery-probes-health | ACCEPTED MERGE | One outage state connects useful progress, probe result, routing membership and restart action; one assessment proves both Primaries. |

| rel-change-rollout-rollback-risk ↔ delivery-rollout-rollback-strategies | ACCEPTED MERGE | One progressive-release state connects risk evidence, traffic mechanics and recovery decision; one assessment proves both Primaries. |
## G. Stage-2 Input Note

REQUIRED and RECOMMENDED projection is **NOT FINALIZED** in Stage 1. The frozen relation graph remains untouched; Stage 2 will project all 201 REQUIRED and 131 RECOMMENDED relations after Primary boundaries are accepted.

## H. Architecture Conflicts

None.

## Stage-1 semantic review batches

- Runtime & Concurrency — REVIEWED
- Data & Consistency — REVIEWED
- Service & Network — REVIEWED
- Distributed Systems — REVIEWED
- Production Engineering — REVIEWED
- Architecture & Engineering Reasoning — PENDING

## Runtime & Concurrency batch closure

**REVIEWED.** All 17 original in-scope units have an explicit disposition: 15 retained (including the four required singleton reviews) and 2 split. Canonical unit sections, Primary-home registry, composition registry, singleton review and cross-owner review hold the final state. REQUIRED and RECOMMENDED projection remains **NOT FINALIZED**.


## Runtime & Concurrency Decision Ledger

| Original unit | Primary disposition | Final canonical state |
|---|---|---|
| lu-race-atomicity | KEEP | lu-race-atomicity |
| lu-prog-api-refactoring-change-safety | SPLIT | lu-prog-api-refactoring-change-safety; lu-prog-errors-results; lu-prog-invariants-domain-model; lu-prog-composition-dependencies |
| lu-prog-collections-complexity | KEEP | lu-prog-collections-complexity |
| lu-prog-resource-ownership | KEEP | lu-prog-resource-ownership |
| lu-prog-types-generics | KEEP | lu-prog-types-generics |
| lu-prog-values-identity | KEEP | lu-prog-values-identity |
| lu-runtime-allocation-gc | KEEP | lu-runtime-allocation-gc |
| lu-runtime-diagnostics | KEEP | lu-runtime-diagnostics |
| lu-runtime-jit-warmup | KEEP | lu-runtime-jit-warmup |
| lu-runtime-managed-execution | KEEP | lu-runtime-managed-execution |
| lu-os-blocking-io-waits | KEEP | lu-os-blocking-io-waits |
| lu-os-process-thread-kernel | SPLIT | lu-os-process-thread-kernel; lu-os-scheduling-starvation; lu-os-termination-graceful-shutdown; lu-os-virtual-memory-page-cache |
| lu-os-resource-exhaustion | KEEP | lu-os-resource-exhaustion |
| lu-concurrency-async-parallelism | KEEP | lu-concurrency-async-parallelism |
| lu-concurrency-deadlock-starvation | KEEP | lu-concurrency-deadlock-starvation |
| lu-concurrency-local-vs-distributed | KEEP | lu-concurrency-local-vs-distributed |
| lu-concurrency-memory-visibility | KEEP | lu-concurrency-memory-visibility |

## Data & Consistency batch closure

**REVIEWED.** The Decision Ledger below accounts for all 17 original units: **7 KEEP, 7 SPLIT, 3 MERGE**. Final state is 25 Data & Consistency units.

## Data & Consistency Decision Ledger

| Original unit | Primary disposition | Final canonical state |
|---|---|---|
| lu-index-query-shape | KEEP | lu-index-query-shape |
| lu-execution-plan-estimates | KEEP | lu-execution-plan-estimates |
| lu-db-backup-restore | SPLIT | lu-db-backup-restore; lu-db-wal-crash-recovery |
| lu-db-buffer-io | SPLIT | lu-db-buffer-io; lu-db-production-diagnosis-transfer |
| lu-db-connection-pool-exhaustion | KEEP | lu-db-connection-pool-exhaustion |
| lu-db-locks-deadlocks-contention | SPLIT | lu-db-locks-deadlocks-contention; lu-db-transactions-mvcc-isolation; lu-db-schema-evolution |
| lu-db-modeling-invariants | SPLIT | lu-db-modeling-invariants; lu-db-partitioning-sharding-boundary |
| lu-db-mvcc-visibility | MERGE | lu-db-transactions-mvcc-isolation |
| lu-db-replication-failover | KEEP | lu-db-replication-failover |
| lu-nosql-cassandra-lsm-compaction-consistency | SPLIT | lu-nosql-cassandra-lsm-compaction-consistency; lu-nosql-storage-choice-transfer |
| lu-nosql-model-selection | SPLIT | lu-nosql-model-selection; lu-nosql-mongo-aggregate-model; lu-nosql-redis-structures-memory; lu-nosql-search-projection |
| lu-nosql-mongo-index-shard-transaction | KEEP | lu-nosql-mongo-index-shard-transaction |
| lu-nosql-redis-persistence-replication-cluster-streams | KEEP | lu-nosql-redis-persistence-replication-cluster-streams |
| lu-nosql-search-refresh-shards-pagination | MERGE | lu-nosql-search-projection |
| lu-cache-capacity-eviction-fallback | SPLIT | lu-cache-capacity-eviction-fallback; lu-cache-source-of-truth-invalidation; lu-cache-evidence-transfer |
| lu-cache-invalidation-consistency | MERGE | lu-cache-source-of-truth-invalidation |
| lu-cache-patterns | KEEP | lu-cache-patterns |

## Service & Network batch closure

**REVIEWED.** Service & Network — REVIEWED. The historical pre-amendment ledger accounts for **14 / 14 original units** with **7 KEEP, 5 SPLIT, 2 MERGE**, yielding **22 historical pre-amendment final units**. The controlled amendment then adds **3 singleton units** (`lu-net-service-discovery-load-balancing`, `lu-sec-cryptography-credentials-tokens`, `lu-sec-data-encryption-key-lifecycle`), so the **current final Service & Network total is 25**. Five historical multi-unit capability-proof tables, strengthened singleton boundaries and registry exactness pass; REQUIRED and RECOMMENDED projection is still **NOT FINALIZED**.


## Service & Network Decision Ledger

| Original unit | Primary disposition | Final canonical state |
|---|---|---|
| lu-net-connection-reuse-pooling | KEEP | lu-net-connection-reuse-pooling |
| lu-net-failure-localization-unknown-outcome | SPLIT | lu-net-failure-localization-unknown-outcome; lu-net-request-path-dns; lu-net-proxy-tls-forwarded-boundary; lu-net-http-streaming-cancellation |
| lu-net-proxy-lb-forwarded-boundary | MERGE | lu-net-proxy-tls-forwarded-boundary |
| lu-net-streaming-body-cancellation | MERGE | lu-net-http-streaming-cancellation |
| lu-api-circuit-bulkhead-rate-limit | KEEP | lu-api-circuit-bulkhead-rate-limit |
| lu-api-contract-resource-semantics | SPLIT | lu-api-contract-resource-semantics; lu-api-validation-errors-pagination; lu-api-versioning-compatibility; lu-api-request-identity-idempotency |
| lu-api-deadlines-timeout-cancellation | SPLIT | lu-api-deadline-retry-policy; lu-api-unknown-outcome-reconciliation |
| lu-sec-abuse-bruteforce-resource-business-flow | SPLIT | lu-sec-abuse-bruteforce-resource-business-flow; lu-sec-trust-boundary-threat-model; lu-sec-unseen-attack-transfer |
| lu-sec-audit-detection-evidence | KEEP | lu-sec-audit-detection-evidence |
| lu-sec-auth-session-token | SPLIT | lu-sec-auth-session-oauth; lu-sec-authorization-object-tenant |
| lu-sec-browser-boundaries-cors-csrf-xss | KEEP | lu-sec-browser-boundaries-cors-csrf-xss |
| lu-sec-injection-ssrf-input-output | KEEP | lu-sec-injection-ssrf-input-output |
| lu-sec-race-business-logic-abuse | KEEP | lu-sec-race-business-logic-abuse |
| lu-sec-secrets-third-party-trust | KEEP | lu-sec-secrets-third-party-trust |

## Service & Network controlled amendment ledger

| Added capability | Final unit | Disposition | Evidence boundary |
|---|---|---|---|
| net-service-discovery-load-balancing | lu-net-service-discovery-load-balancing | ADD | evolving endpoint set, health-aware routing and distribution evidence |
| sec-cryptography-credentials-tokens | lu-sec-cryptography-credentials-tokens | ADD | credential/token cryptographic purpose and verification evidence |
| sec-data-encryption-key-lifecycle | lu-sec-data-encryption-key-lifecycle | ADD | data encryption/key lifecycle and rotation evidence |

**REVIEWED.** Amendment scope is complete; historical ledger remains unchanged and final Service & Network unit count is 25.

## Distributed Systems batch closure

**REVIEWED.** 13 historical originals: **10 KEEP, 3 SPLIT, 0 MERGE**; **20 historical final units**. +1 controlled amendment (`lu-msg-background-jobs-scheduling`) gives **21 current Distributed Systems units**. Multi proof tables: **1 / 1**. Singleton review: **20 / 20**. Dependency projection remains **NOT FINALIZED**.

## Distributed Systems Decision Ledger

| Original unit | Primary disposition | Final canonical state |
|---|---|---|
| lu-outbox-duplicate-safe-effect | KEEP | lu-outbox-duplicate-safe-effect |
| lu-dist-consensus-coordination-purpose | SPLIT | lu-dist-partial-failure-uncertainty; lu-dist-replication-leader-quorum; lu-dist-consensus-coordination-purpose; lu-dist-guarantee-recovery-transfer |
| lu-dist-consistency-linearizability | KEEP | lu-dist-consistency-linearizability |
| lu-dist-partitioning-ownership-rebalancing | KEEP | lu-dist-partitioning-ownership-rebalancing |
| lu-dist-reconciliation-convergence | SPLIT | lu-dist-rpc-unknown-completion; lu-dist-reconciliation-convergence |
| lu-dist-time-order-causality | KEEP | lu-dist-time-order-causality |
| lu-dist-transactions-2pc-boundary | KEEP | lu-dist-transactions-2pc-boundary |
| lu-msg-consumer-groups-offsets-rebalance | SPLIT | lu-msg-model-queue-topic-partition-order; lu-msg-consumer-groups-offsets-rebalance; lu-msg-replay-backfill; lu-msg-lag-backpressure-evidence |
| lu-msg-delivery-retry-poison-dlq | KEEP | lu-msg-delivery-retry-poison-dlq |
| lu-msg-external-side-effect-reconciliation | KEEP | lu-msg-external-side-effect-reconciliation |
| lu-msg-producer-acks-durability | KEEP | lu-msg-producer-acks-durability |
| lu-msg-schema-evolution-contract-ownership | KEEP | lu-msg-schema-evolution-contract-ownership |
| lu-msg-workflow-saga-compensation | KEEP | lu-msg-workflow-saga-compensation |

## Distributed Systems controlled amendment ledger

| Added capability | Final unit | Disposition | Evidence boundary |
|---|---|---|---|
| msg-background-jobs-scheduling | lu-msg-background-jobs-scheduling | KEEP | trigger, misfire, lease, attempt and idempotent recovery |


## Production Engineering batch closure

**REVIEWED.** 15 historical originals: **6 KEEP, 8 SPLIT, 1 MERGE**; **30 scoped Primaries** now form **26 final units**: **22 singleton, 4 multi, 2 multi-owner**. Canonical-v2 proof completeness: **4 / 4** Stage 1E multi units. Singleton review: **22 / 22**. Dependency projection remains **NOT FINALIZED**.

## Production Engineering Decision Ledger

| Original unit | Primary disposition | Final canonical state |
|---|---|---|
| lu-obs-cardinality-sampling-cost | SPLIT | lu-obs-cardinality-sampling-cost; lu-obs-instrumentation-tracing |
| lu-obs-db-io-downstream-attribution | SPLIT | lu-obs-latency-throughput-saturation; lu-obs-instrumentation-tracing; lu-obs-db-io-downstream-attribution; lu-obs-diagnostic-method |
| lu-obs-load-test-benchmark-validity | KEEP | lu-obs-load-test-benchmark-validity |
| lu-obs-logs-structured-correlation | SPLIT | lu-obs-logs-structured-correlation; lu-obs-signals-correlation |
| lu-obs-profiling-runtime-evidence | KEEP | lu-obs-profiling-runtime-evidence |
| lu-rel-cascading-failure-queue-capacity | SPLIT | lu-rel-cascading-failure-queue-capacity; lu-rel-overload-load-shedding-degradation; lu-rel-dependency-budgets |
| lu-rel-change-rollout-rollback-risk | SPLIT | lu-rel-user-journey-sli-slo-budget; lu-release-rollout-rollback |
| lu-rel-disaster-recovery-rpo-rto | KEEP | lu-rel-disaster-recovery-rpo-rto |
| lu-rel-failure-injection-verification | KEEP | lu-rel-failure-injection-verification |
| lu-rel-health-readiness-semantics | MERGE | lu-rel-health-probes |
| lu-rel-incident-response-postmortem | KEEP | lu-rel-incident-response-postmortem |
| lu-delivery-artifact-image-config | SPLIT | lu-delivery-artifact-provenance; lu-release-rollout-rollback; lu-delivery-platform-evidence-debug |
| lu-delivery-autoscaling-signal-boundary | SPLIT | lu-delivery-resources-cpu-memory; lu-delivery-autoscaling-signal-boundary; lu-delivery-platform-transfer |
| lu-delivery-cloud-responsibility-managed-services | KEEP | lu-delivery-cloud-responsibility-managed-services |
| lu-delivery-container-process-lifecycle | SPLIT | lu-delivery-container-process-lifecycle; lu-rel-health-probes; lu-delivery-graceful-shutdown-draining |
