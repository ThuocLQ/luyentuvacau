# Stage 2G Architecture Synthesis — Exact-key Inventory

NON-CANONICAL WORKING INVENTORY. Derived from frozen capability relations and sealed Primary homes; no row is a learner lock.

## Architecture inter-unit relations

| Kind | From capability | From unit | To capability | To unit | Frozen assumed slice |
|---|---|---|---|---|---|
| REQUIRED | prog-invariants-domain-model | lu-prog-invariants-domain-model | arch-boundaries-ownership | lu-arch-boundaries-data-ownership | state invariant under transition |
| RECOMMENDED | prog-composition-dependencies | lu-prog-composition-dependencies | arch-boundaries-ownership | lu-arch-boundaries-data-ownership | dependency direction and composition boundary |
| RECOMMENDED | arch-requirements-quality-attributes | lu-arch-requirements-quality-attributes | arch-boundaries-ownership | lu-arch-boundaries-data-ownership | quality attributes constrain responsibility choice |
| RECOMMENDED | cache-need-source-of-truth | lu-cache-source-of-truth-invalidation | arch-data-ownership-source-of-truth | lu-arch-boundaries-data-ownership | cache is a copy with one authoritative source |
| REQUIRED | arch-requirements-quality-attributes | lu-arch-requirements-quality-attributes | arch-sync-async-integration | lu-arch-sync-async-integration | quality attribute and explicitly ranked trade-off |
| REQUIRED | net-http-semantics | lu-net-http-streaming-cancellation | arch-sync-async-integration | lu-arch-sync-async-integration | request/response and timeout/cancellation boundary |
| REQUIRED | msg-model-queue-topic-partition-order | lu-msg-model-queue-topic-partition-order | arch-sync-async-integration | lu-arch-sync-async-integration | queued publication/consumption and ordering boundary |
| RECOMMENDED | dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | arch-sync-async-integration | lu-arch-sync-async-integration | components may fail independently |
| REQUIRED | arch-requirements-quality-attributes | lu-arch-requirements-quality-attributes | arch-consistency-latency-availability | lu-arch-consistency-latency-availability | quality attribute and explicit trade-off |
| REQUIRED | prog-invariants-domain-model | lu-prog-invariants-domain-model | arch-consistency-latency-availability | lu-arch-consistency-latency-availability | invariant that must hold across transitions |
| REQUIRED | dist-consistency-linearizability | lu-dist-consistency-linearizability | arch-consistency-latency-availability | lu-arch-consistency-latency-availability | observable guarantee and stale/conflicting read consequence |
| REQUIRED | arch-requirements-quality-attributes | lu-arch-requirements-quality-attributes | arch-scale-capacity-partitioning | lu-arch-scale-capacity-partitioning | workload quality target and trade-off |
| REQUIRED | obs-latency-throughput-saturation | lu-obs-latency-throughput-saturation | arch-scale-capacity-partitioning | lu-arch-scale-capacity-partitioning | workload pressure and finite-capacity evidence |
| RECOMMENDED | dist-partitioning-ownership-rebalancing | lu-dist-partitioning-ownership-rebalancing | arch-scale-capacity-partitioning | lu-arch-scale-capacity-partitioning | partition ownership and rebalancing consequence |
| REQUIRED | arch-boundaries-ownership | lu-arch-boundaries-data-ownership | arch-failure-recovery-security-observability | lu-arch-failure-recovery-security-observability | one boundary owns state and recovery responsibility |
| REQUIRED | dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | arch-failure-recovery-security-observability | lu-arch-failure-recovery-security-observability | independent component/communication failure |
| REQUIRED | sec-trust-boundary-threat-model | lu-sec-trust-boundary-threat-model | arch-failure-recovery-security-observability | lu-arch-failure-recovery-security-observability | actor, protected asset and trust boundary |
| REQUIRED | obs-signals-correlation | lu-obs-signals-correlation | arch-failure-recovery-security-observability | lu-arch-failure-recovery-security-observability | signals linked by operation/resource context |
| REQUIRED | rel-user-journey-sli-slo-budget | lu-rel-user-journey-sli-slo-budget | arch-failure-recovery-security-observability | lu-arch-failure-recovery-security-observability | user journey target and error/latency budget |
| RECOMMENDED | rel-disaster-recovery-rpo-rto | lu-rel-disaster-recovery-rpo-rto | arch-failure-recovery-security-observability | lu-arch-failure-recovery-security-observability | recovery point/time objective |
| REQUIRED | arch-boundaries-ownership | lu-arch-boundaries-data-ownership | arch-evolution-migration-strangler | lu-arch-evolution-migration-strangler | responsibility boundary during incremental replacement |
| REQUIRED | prog-api-refactoring-change-safety | lu-prog-api-refactoring-change-safety | arch-evolution-migration-strangler | lu-arch-evolution-migration-strangler | behavioral compatibility across a changed boundary |
| RECOMMENDED | api-versioning-compatibility | lu-api-versioning-compatibility | arch-evolution-migration-strangler | lu-arch-evolution-migration-strangler | old/new request contracts coexist |
| RECOMMENDED | db-schema-evolution | lu-db-schema-evolution | arch-evolution-migration-strangler | lu-arch-evolution-migration-strangler | old/new binaries share evolving data |
| RECOMMENDED | msg-schema-evolution-contract-ownership | lu-msg-schema-evolution-contract-ownership | arch-evolution-migration-strangler | lu-arch-evolution-migration-strangler | mixed-version producers/consumers and retained events |
| RECOMMENDED | dist-reconciliation-convergence | lu-dist-reconciliation-convergence | arch-evolution-migration-strangler | lu-arch-evolution-migration-strangler | repair converges stale state toward authority |
| REQUIRED | arch-requirements-quality-attributes | lu-arch-requirements-quality-attributes | arch-cost-complexity-changeability | lu-arch-cost-complexity-changeability | quality target and explicit trade-off |
| RECOMMENDED | arch-boundaries-ownership | lu-arch-boundaries-data-ownership | arch-cost-complexity-changeability | lu-arch-cost-complexity-changeability | ownership boundary affects operational complexity |
| REQUIRED | arch-requirements-quality-attributes | lu-arch-requirements-quality-attributes | arch-decision-communication-transfer | lu-arch-cost-complexity-changeability | quality attribute, trade-off and decision record |
| RECOMMENDED | arch-failure-recovery-security-observability | lu-arch-failure-recovery-security-observability | arch-decision-communication-transfer | lu-arch-cost-complexity-changeability | failure/security/observability consequence of a decision |
| RECOMMENDED | arch-evolution-migration-strangler | lu-arch-evolution-migration-strangler | arch-decision-communication-transfer | lu-arch-cost-complexity-changeability | decision changes during incremental evolution |

## Same-unit relations

| Kind | From capability | To capability | Learning Unit | Reason |
|---|---|---|---|---|
| REQUIRED | arch-boundaries-ownership | arch-data-ownership-source-of-truth | lu-arch-boundaries-data-ownership | Ownership is introduced before source-of-truth evidence in one shared scenario. |
| RECOMMENDED | arch-cost-complexity-changeability | arch-decision-communication-transfer | lu-arch-cost-complexity-changeability | Cost/changeability trade-off is optional context for communicating the decision in the same Unit. |

## Scope reconciliation

- Frozen registry yields 33 incoming Architecture capability relations: 31 inter-unit = 18 REQUIRED + 13 RECOMMENDED, plus the two same-unit relations above.
- The older “32 pending” report is stale: it incorrectly counted the two same-unit edges as inter-unit while omitting one cross-unit RECOMMENDED relation. No relation was discarded.
