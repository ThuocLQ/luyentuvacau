# Foundation Coverage Audit

> **Status:** Pre-Stage 1D coverage audit.  
> **Scope:** Frozen Phase 2 capability and Learning Unit state, reviewed against backend-interview foundations. This is an audit, not a capability change request.  
> **Method:** `COVERED` means a named frozen capability already owns the mechanism and evidence boundary. `IMPLICIT` means the boundary is owned but a future unit must teach the named sub-concept explicitly. `TRUE GAP` means no current owner can teach the mechanism and its failure/evidence loop without distorting that owner.

## Source families

- **CMU DB 15-445/645** — storage, indexes, execution, optimization, transactions and recovery: <https://15445.courses.cs.cmu.edu/fall2026/>
- **PostgreSQL documentation** — SQL execution, concurrency, WAL/recovery, backup and high availability: <https://www.postgresql.org/docs/current/>
- **MIT 6.5840** — fault tolerance, replication and consistency: <https://pdos.lcs.mit.edu/6.824/>
- **Google SRE** — SLO/error-budget decisions and cascading failure control: <https://sre.google/sre-book/service-level-objectives/> and <https://sre.google/sre-book/addressing-cascading-failures/>
- **OWASP ASVS/API Security** — verification controls and API threat boundaries: <https://owasp.org/www-project-application-security-verification-standard/> and <https://owasp.org/projects/api-security-project>
- **gRPC / cloud Well-Architected** — contracts, name resolution/load balancing/health and platform responsibility: <https://grpc.io/docs/guides/custom-name-resolution/>, <https://grpc.io/docs/guides/health-checking/> and <https://docs.aws.amazon.com/wellarchitected/latest/framework/>

The source families set the expected mechanisms and evidence; they do not automatically imply a one-chapter-one-capability curriculum.

## Relational database internals

| Concept | Status | Current capability owner(s) | Current Learning Unit(s) | Teach / depth / evidence | Source | Rationale and recommendation |
|---|---|---|---|---|---|---|
| Relational model and invariants | COVERED | `db-modeling-invariants` | `lu-db-modeling-invariants` | L3: constraints, write ownership, broken invariant trace | CMU, PostgreSQL | Clear owner; retain. |
| Page/row physical organization | COVERED | `db-physical-storage-pages` | `lu-db-buffer-io` | L2: page/tuple layout, cold/warm evidence | CMU, PostgreSQL | Clear storage boundary; retain. |
| Buffer pool and I/O | COVERED | `db-buffer-io` | `lu-db-buffer-io` | L3: cache/page read diagnosis | CMU, PostgreSQL | Clear owner; retain. |
| Indexes and query shape | COVERED | `db-index-structures`, `db-composite-query-shape` | `lu-index-query-shape` | L3: access path/plan evidence | CMU, PostgreSQL | Clear owner; retain. |
| Parse, bind, names/types and catalog | IMPLICIT | `db-execution-operators` | `lu-execution-plan-estimates` | L2: explain query pipeline before plan; catalog lookup example | CMU, PostgreSQL | Owned by execution path; authoring requirement, no mutation. |
| Optimizer/cardinality/cost | COVERED | `db-optimizer-cardinality-stats` | `lu-execution-plan-estimates` | L3: estimated vs actual rows/plan choice | CMU, PostgreSQL | Clear owner; retain. |
| Executor/operators | COVERED | `db-execution-operators` | `lu-execution-plan-estimates` | L3: join/sort/scan operator trace | CMU, PostgreSQL | Clear owner; retain. |
| Prepared statements and plan reuse | IMPLICIT | `db-optimizer-cardinality-stats`, `db-execution-operators` | `lu-execution-plan-estimates` | L3: prepare/execute lifecycle, parameter sensitivity, generic/custom/reused plans, invalidation/replanning and `EXPLAIN EXECUTE`; transfer to Oracle binds and SQL Server parameter-sensitive plan cache | CMU Fall 2026, PostgreSQL | Must be taught deeply inside the existing execution/optimizer owners; no new DB capability. |
| Transaction/isolation | COVERED | `db-transactions-isolation-anomalies` | `lu-db-transactions-mvcc-isolation` | L3: anomaly trace and isolation choice | CMU, PostgreSQL | Clear owner; retain. |
| MVCC | COVERED | `db-mvcc-visibility` | `lu-db-transactions-mvcc-isolation` | L3: snapshot visibility evidence | CMU, PostgreSQL | Clear owner; retain. |
| Locks/deadlocks | COVERED | `db-locks-deadlocks-contention` | `lu-db-locks-deadlocks-contention` | L3: wait graph and remedy | CMU, PostgreSQL | Clear owner; retain. |
| WAL, dirty pages, checkpoint, recovery | COVERED | `db-wal-crash-recovery` | `lu-db-wal-crash-recovery` | L3: crash/restart recovery trace | CMU, PostgreSQL | Clear owner; retain. |
| Backup and PITR | COVERED | `db-backup-restore` | `lu-db-backup-restore` | L3: restore verification/RPO evidence | PostgreSQL | Clear owner; retain. |
| Connection pool | COVERED | `db-connection-pool-exhaustion` | `lu-db-connection-pool-exhaustion` | L3: acquire wait/pool saturation | PostgreSQL | Clear owner; retain. |
| Schema migration | COVERED | `db-schema-evolution` | `lu-db-schema-evolution` | L3: compatibility/rollback boundary | PostgreSQL | Clear owner; retain. |
| Replication/failover | COVERED | `db-replication-failover` | `lu-db-replication-failover` | L3: lag/promotion/recovery evidence | PostgreSQL | Clear owner; retain. |
| Partitioning/sharding | COVERED | `db-partitioning-sharding-boundary` | `lu-db-partitioning-sharding-boundary` | L3: ownership/rebalance trade-off | CMU | Clear owner; retain. |

## Networking and service path

| Concept | Status | Current capability owner(s) | Current Learning Unit(s) | Teach / depth / evidence | Source | Rationale and recommendation |
|---|---|---|---|---|---|---|
| DNS | COVERED | `net-request-path-dns` | `lu-net-request-path-dns` | L2: resolver/cache/failure timing | gRPC/platform docs | Clear owner; retain. |
| TCP | COVERED | `net-tcp-connection-semantics` | `lu-net-connection-reuse-pooling` | L2: connect/reset/socket evidence | platform docs | Clear owner; retain. |
| TLS | COVERED | `net-tls-trust-handshake` | `lu-net-proxy-tls-forwarded-boundary` | L2: trust/handshake failure | OWASP, platform docs | Clear owner; retain. |
| HTTP semantics | COVERED | `net-http-semantics` | `lu-net-http-streaming-cancellation` | L3: body/stream/cancel behavior | platform docs | Clear owner; retain. |
| Proxy and forwarded boundary | COVERED | `net-proxy-lb-forwarded-boundary` | `lu-net-proxy-tls-forwarded-boundary` | L3: forwarded identity/trust trace | OWASP | Clear owner; retain. |
| Discovery, L4/L7 load balancing, health selection | TRUE GAP | — | — | L3: logical service → evolving endpoint set → discovery/resolution → LB/routing policy → backend selection → health/load change → redistribution. Cover DNS vs discovery; static/dynamic endpoints; client/proxy balancing; L4/L7; round-robin/least-request/load-aware intuition; connection/request balancing; long-lived connection, affinity, stale endpoint and scale behavior. Evidence: resolver result, backend set, picker decision, connection target, health and request distribution. | gRPC name-resolution/load-balancing/health docs, Google SRE, Well-Architected | **CORE capability-mutation candidate**. Existing owners cover adjacent DNS, proxy trust and readiness but not this complete routing mechanism. |
| Connection reuse | COVERED | `net-connection-reuse-pooling` | `lu-net-connection-reuse-pooling` | L3: age/pool/port pressure | platform docs | Clear owner; retain. |

## Distributed systems and messaging

| Concept | Status | Current capability owner(s) | Current Learning Unit(s) | Teach / depth / evidence | Source | Rationale and recommendation |
|---|---|---|---|---|---|---|
| RPC and partial failure | COVERED | `dist-rpc-unknown-completion`, `dist-partial-failure-uncertainty` | `lu-dist-reconciliation-convergence`, `lu-dist-consensus-coordination-purpose` | L3: timeout/unknown-outcome trace | MIT 6.5840 | Clear owners; retain. |
| Time/order/causality | COVERED | `dist-time-order-causality` | `lu-dist-time-order-causality` | L3: ordering scope/evidence | MIT 6.5840 | Clear owner; retain. |
| Consistency | COVERED | `dist-consistency-linearizability` | `lu-dist-consistency-linearizability` | L3: stated guarantee/failure trace | MIT 6.5840 | Clear owner; retain. |
| Replication/quorum and consensus | COVERED | `dist-replication-leader-quorum`, `dist-consensus-coordination-purpose` | `lu-dist-consensus-coordination-purpose` | L3: term/quorum/availability | MIT 6.5840 | Clear owner; retain. |
| Partition/rebalancing | COVERED | `dist-partitioning-ownership-rebalancing` | `lu-dist-partitioning-ownership-rebalancing` | L3: ownership transfer/rebalance | MIT 6.5840 | Clear owner; retain. |
| Reconciliation | COVERED | `dist-reconciliation-convergence` | `lu-dist-reconciliation-convergence` | L3: source/diff/repeatable repair | MIT 6.5840 | Clear owner; retain. |
| Distributed transaction boundary | COVERED | `dist-transactions-2pc-boundary` | `lu-dist-transactions-2pc-boundary` | L3: commit/blocking/recovery | MIT 6.5840 | Clear owner; retain. |
| Queue/topic/partition/order | COVERED | `msg-model-queue-topic-partition-order` | `lu-msg-consumer-groups-offsets-rebalance` | L3: routing/order scope | MIT 6.5840 | Clear owner; retain. |
| Producer durability | COVERED | `msg-producer-acks-durability` | `lu-msg-producer-acks-durability` | L3: ack contract/failure trace | platform docs | Clear owner; retain. |
| Consumer groups/offset/rebalance | COVERED | `msg-consumer-groups-offsets-rebalance` | `lu-msg-consumer-groups-offsets-rebalance` | L3: assignment/offset/effect | platform docs | Clear owner; retain. |
| Duplicate-safe effects and retry/DLQ | COVERED | `msg-consumer-idempotency-inbox`, `msg-delivery-retry-poison-dlq` | `lu-outbox-duplicate-safe-effect`, `lu-msg-delivery-retry-poison-dlq` | L3: duplicate/retry/audit state | MIT 6.5840 | Clear owners; retain. |
| Replay/backfill/schema evolution | COVERED | `msg-replay-backfill`, `msg-schema-evolution-contract-ownership` | `lu-msg-consumer-groups-offsets-rebalance`, `lu-msg-schema-evolution-contract-ownership` | L3: replay window/schema compatibility | platform docs | Clear owners; retain. |
| Saga/compensation/external reconciliation | COVERED | `msg-workflow-saga-compensation`, `msg-external-side-effect-reconciliation` | matching LUs | L3: side effect/recovery evidence | MIT 6.5840 | Clear owners; retain. |

## Security

| Concept | Status | Current capability owner(s) | Current Learning Unit(s) | Teach / depth / evidence | Source | Rationale and recommendation |
|---|---|---|---|---|---|---|
| Trust boundaries/authn/authz/OAuth-OIDC | COVERED | `sec-trust-boundary-threat-model`, `sec-auth-session-token`, `sec-authorization-object-tenant`, `sec-oauth-oidc-awareness` | auth/security LUs | L3: object/tenant decision trace | OWASP ASVS/API | Clear owners; retain. |
| Web/API and business-flow abuse | COVERED | `sec-browser-boundaries-cors-csrf-xss`, `sec-injection-ssrf-input-output`, `sec-abuse-bruteforce-resource-business-flow`, `sec-race-business-logic-abuse` | security LUs | L3: attack/mitigation/evidence | OWASP ASVS/API | Clear owners; retain. |
| Secrets and audit | COVERED | `sec-secrets-third-party-trust`, `sec-audit-detection-evidence` | security LUs | L3: rotation/audit query | OWASP ASVS | Clear owners; retain. |
| Applied cryptography for credentials and tokens | TRUE GAP | — | — | L2: hash vs encryption vs MAC/signature; password salt/work factor and secure verification; CSPRNG and secure token generation | OWASP ASVS | **CORE capability-mutation candidate**. Safe use is needed, not cryptographic algorithm implementation. |
| Data encryption and key lifecycle | TRUE GAP | — | — | L2: at-rest boundary, sensitive-data protection, envelope/KMS intuition, key scope/storage, rotation/revocation and exposure evidence | OWASP ASVS, Well-Architected | **CORE capability-mutation candidate**; TLS/secrets do not own data-key lifecycle. |

## Production, applied platforms and cloud

| Concept | Status | Current capability owner(s) | Current Learning Unit(s) | Teach / depth / evidence | Source | Rationale and recommendation |
|---|---|---|---|---|---|---|
| Observability, instrumentation, latency/throughput/saturation, load/profile | COVERED | `obs-*` | observability LUs | L3: discriminating evidence/hypothesis | Google SRE | Clear owners; retain. |
| SLI/SLO/error budgets, overload/cascades | COVERED | `rel-user-journey-sli-slo-budget`, `rel-overload-load-shedding-degradation`, `rel-cascading-failure-queue-capacity` | reliability LUs | L3: budget/queue/degradation trace | Google SRE | Clear owners; retain. |
| Health/readiness, rollout/rollback, incident/DR | COVERED | `rel-health-readiness-semantics`, `rel-change-rollout-rollback-risk`, `rel-incident-response-postmortem`, `rel-disaster-recovery-rpo-rto` | reliability LUs | L3: operational decision evidence | Google SRE | Clear owners; retain. |
| Configuration engineering and feature/runtime config rollback | IMPLICIT | `delivery-artifact-image-config`, `rel-change-rollout-rollback-risk` | delivery/reliability LUs | L3: mutable config/flag rollback with audit | Well-Architected | Owned across artifact and rollout; require an explicit linked scenario, no mutation. |
| gRPC/Protobuf/serialization | IMPLICIT | `api-versioning-compatibility`, `api-deadlines-timeout-cancellation`, `net-streaming-body-cancellation`, `dist-rpc-unknown-completion` | API/network/distributed LUs | L3: Protobuf wire/schema and field-number evolution, unary/streaming RPC, deadline/cancellation, unknown completion/retry and service-config/LB where relevant | gRPC docs | Deep cross-cutting authoring obligation within existing mechanism owners; do not create technology-named `grpc-*` capability. |
| Background jobs/scheduling | TRUE GAP | — | — | L3: schedule/trigger → durable ownership → acquisition/execution → crash/misfire → retry/recovery → concurrency/idempotency → evidence | .NET Hosted Services, Quartz.NET persistent store/misfire/clustering, Hangfire | **CORE capability-mutation candidate**. Queue/outbox do not own scheduler/misfire semantics. |
| Stream processing | TRUE GAP | — | — | L3: event time, out-of-order events, windows, state stores, stateful aggregation/join, replay/recovery and processing guarantees | Apache Kafka Streams | **SPECIALIZATION candidate**, not an automatic core addition. Messaging replay does not own stream-time/state mechanics. |
| Cloud IAM/VPC/NAT/service networking | IMPLICIT | `delivery-cloud-responsibility-managed-services`, `net-connection-reuse-pooling`, `net-proxy-lb-forwarded-boundary` | delivery/network LUs | L2: IAM least privilege and subnet/NAT path evidence | Well-Architected | Managed-service owner explicitly includes IAM/network; authoring requirement before mutation. |

## Closure

| Status | Count |
|---|---:|
| COVERED | 40 |
| IMPLICIT | 5 |
| TRUE GAP | 5 |

### TRUE GAP candidates

1. Applied cryptography for credentials and tokens — **CORE capability-mutation candidate**.
2. Data encryption and key lifecycle — **CORE capability-mutation candidate**.
3. Service discovery/load balancing — **CORE capability-mutation candidate**.
4. Background jobs/scheduling — **CORE capability-mutation candidate**.
5. Stream processing — **SPECIALIZATION candidate**; not an automatic core addition.

Counts are row-level audit counts derived from the classifications above. No capability is changed in this audit.

### Authoring requirements without capability mutation

Future decomposition must teach deeply inside the current owners: SQL parse/bind/catalog; prepared-plan lifecycle; configuration/feature rollout and rollback; IAM/VPC/NAT/service networking; and gRPC/Protobuf compatibility, deadlines, streaming and unknown completion. `IMPLICIT` is not optional or a brief mention. Service discovery/load balancing is a TRUE GAP and must not be hidden in adjacent owners.


## Controlled amendment resolution

The following pre-amendment TRUE GAP evidence remains historical: `40 COVERED / 5 IMPLICIT / 5 TRUE GAP`. Controlled amendment `foundation-core-amendment-2026` materializes four CORE candidates: `net-service-discovery-load-balancing`, `sec-cryptography-credentials-tokens`, `sec-data-encryption-key-lifecycle`, and `msg-background-jobs-scheduling` (**ADD**). `Stream Processing` remains **DEFERRED** as a specialization; no core capability is added for it.
