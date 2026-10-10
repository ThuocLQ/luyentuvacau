# Stage 2G Architecture Synthesis Dependency Semantic Review — Working Evidence

NON-CANONICAL WORKING EVIDENCE. Architecture synthesis can require compatible evidence, but capability dependencies, External candidates, proxy suitability and learner locks stay separate.

## Architecture relation-specific evidence

| Kind | Relation | Decision | Concrete target-native evidence | Ownership / proxy boundary |
|---|---|---|---|---|
| REQUIRED | prog-invariants-domain-model -> arch-boundaries-ownership | LOCAL | Split Order and Billing; state that each Order transition keeps total non-negative, then assign who can enforce it. | One invariant makes ownership concrete; no domain-model assessment is claimed. |
| RECOMMENDED | prog-composition-dependencies -> arch-boundaries-ownership | SURFACE | Compare Billing calling Order directly with publishing an event after an Order transition. | Optional dependency-direction contrast, not an ownership prerequisite. |
| RECOMMENDED | arch-requirements-quality-attributes -> arch-boundaries-ownership | SURFACE | Surface latency and change-frequency as prompts while choosing boundary ownership. | Requirements vocabulary helps discussion but never blocks the boundary case. |
| RECOMMENDED | cache-need-source-of-truth -> arch-data-ownership-source-of-truth | SURFACE | Add a stale read-model copy and ask which service remains authoritative. | Cache detail is optional; source-of-truth evidence stays inside the shared Unit. |
| REQUIRED | arch-requirements-quality-attributes -> arch-sync-async-integration | EXTERNAL — WHOLE-UNIT PROXY ACCEPTABLE | Given a checkout requiring low latency but tolerant fulfillment delay, defend synchronous payment and asynchronous fulfillment. Prior assessment of ranked quality trade-offs is needed. | `lu-arch-requirements-quality-attributes` is singleton; PASSED is a fair compatible evidence proxy. |
| REQUIRED | net-http-semantics -> arch-sync-async-integration | LOCAL | A payment HTTP call times out after the server may have committed; contrast request/response waiting with event handoff. | Teach the one HTTP boundary locally; do not claim networking diagnostic evidence. |
| REQUIRED | msg-model-queue-topic-partition-order -> arch-sync-async-integration | LOCAL | Publish OrderCreated, then show one consumer processing later and explain the ordering scope. | Target owns architecture choice; it uses a compact queue trace, not messaging assessment. |
| RECOMMENDED | dist-partial-failure-uncertainty -> arch-sync-async-integration | SURFACE | Add a lost response as an optional reason to prefer a durable handoff. | Partial-failure depth is useful context, never a gate. |
| REQUIRED | arch-requirements-quality-attributes -> arch-consistency-latency-availability | EXTERNAL — WHOLE-UNIT PROXY ACCEPTABLE | A booking flow must choose between immediate confirmation and an availability trade-off; defend the ranked quality attribute. Prior assessment of the trade-off is required. | Singleton requirements Unit makes whole-unit PASSED a fair compatible candidate. |
| REQUIRED | prog-invariants-domain-model -> arch-consistency-latency-availability | LOCAL | Use “one seat cannot be sold twice” to evaluate a stale availability read. | State the invariant in the target; no prior domain-model pass is needed. |
| REQUIRED | dist-consistency-linearizability -> arch-consistency-latency-availability | LOCAL | Two regions read/write a counter; inspect whether the promised read reflects the latest accepted write. | Teach one observable guarantee locally; do not claim full distributed-consistency assessment. |
| REQUIRED | arch-requirements-quality-attributes -> arch-scale-capacity-partitioning | EXTERNAL — WHOLE-UNIT PROXY ACCEPTABLE | A flash sale sets p99 latency and growth targets; choose a partition/capacity approach and defend the trade-off. Prior assessment of quality trade-offs is needed. | Singleton requirements Unit is a fair candidate, still not an implemented lock. |
| REQUIRED | obs-latency-throughput-saturation -> arch-scale-capacity-partitioning | LOCAL | Throughput rises while a shard saturates; choose whether to partition and show the metric that motivates it. | The target teaches one pressure trace, not observability signal mastery. |
| RECOMMENDED | dist-partitioning-ownership-rebalancing -> arch-scale-capacity-partitioning | SURFACE | Add hot-key rebalancing as a changed-condition check after the primary capacity choice. | Partition mechanics enrich transfer but do not gate capacity architecture. |
| REQUIRED | arch-boundaries-ownership -> arch-failure-recovery-security-observability | EXTERNAL — WHOLE-UNIT PROXY NOT_ACCEPTABLE | A payment service owns refund recovery after its dependency fails; the architecture review needs prior capability evidence for responsibility assignment. | `lu-arch-boundaries-data-ownership` is multi-Primary, so whole-unit PASSED would also gate source-of-truth evidence. |
| REQUIRED | dist-partial-failure-uncertainty -> arch-failure-recovery-security-observability | LOCAL | A downstream timeout leaves completion unknown; draw recovery state and observable audit check. | Local failure premise is enough; distributed-system pass is not claimed. |
| REQUIRED | sec-trust-boundary-threat-model -> arch-failure-recovery-security-observability | LOCAL | A partner callback crosses a trust boundary; identify protected asset and evidence needed before retrying recovery. | Target uses one threat boundary but does not assess a full threat model. |
| REQUIRED | obs-signals-correlation -> arch-failure-recovery-security-observability | LOCAL | Correlate one trace, structured log and alert to distinguish failed recovery from slow completion. | One correlation example supports the architecture case without observability Unit evidence. |
| REQUIRED | rel-user-journey-sli-slo-budget -> arch-failure-recovery-security-observability | LOCAL | A checkout error budget is exhausted; choose what recovery signal/alert is meaningful for the user journey. | Local SLI/SLO premise only; no Reliability Unit pass is claimed. |
| RECOMMENDED | rel-disaster-recovery-rpo-rto -> arch-failure-recovery-security-observability | SURFACE | Add a regional-loss RPO/RTO question as a recovery variation. | Disaster recovery is optional scale of the same concern. |
| REQUIRED | arch-boundaries-ownership -> arch-evolution-migration-strangler | EXTERNAL — WHOLE-UNIT PROXY NOT_ACCEPTABLE | Incrementally replace Catalog while routing one responsibility at a time; transfer needs Prior capability evidence for ownership boundaries. | Multi-Primary source makes whole-unit PASSED excessive; retain capability-compatible evidence only. |
| REQUIRED | prog-api-refactoring-change-safety -> arch-evolution-migration-strangler | LOCAL | Move one endpoint behind a facade while proving old caller behavior remains unchanged. | Target owns migration strategy; refactoring safety is a local compatibility fact. |
| RECOMMENDED | api-versioning-compatibility -> arch-evolution-migration-strangler | SURFACE | Add an older mobile client as one migration constraint. | Optional API-specific condition, never an unlock. |
| RECOMMENDED | db-schema-evolution -> arch-evolution-migration-strangler | SURFACE | Add expand/contract schema deployment as a data variation. | Database evolution remains optional context. |
| RECOMMENDED | msg-schema-evolution-contract-ownership -> arch-evolution-migration-strangler | SURFACE | Replay an event produced before the strangler cutover. | Messaging contract context is non-blocking. |
| RECOMMENDED | dist-reconciliation-convergence -> arch-evolution-migration-strangler | SURFACE | Compare old/new projections until repair removes mismatch. | Reconciliation is a useful later variation, not a migration gate. |
| REQUIRED | arch-requirements-quality-attributes -> arch-cost-complexity-changeability | EXTERNAL — WHOLE-UNIT PROXY ACCEPTABLE | Compare a single deployable with split services under explicit cost, latency and change targets. Prior assessment of quality trade-offs is required. | Singleton requirements Unit is fair evidence proxy. |
| RECOMMENDED | arch-boundaries-ownership -> arch-cost-complexity-changeability | SURFACE | Surface boundary count as a reason operational complexity changes. | Optional cost driver; no boundary Unit pass. |
| REQUIRED | arch-requirements-quality-attributes -> arch-decision-communication-transfer | EXTERNAL — WHOLE-UNIT PROXY ACCEPTABLE | Write an ADR for a new region using ranked quality attributes and rejected alternatives. Prior assessment of trade-offs is needed. | Singleton requirements Unit is a fair candidate for the transfer/communication assessment. |
| RECOMMENDED | arch-failure-recovery-security-observability -> arch-decision-communication-transfer | SURFACE | Add failure/recovery evidence as one ADR consequence. | Optional decision detail, not prerequisite accumulation. |
| RECOMMENDED | arch-evolution-migration-strangler -> arch-decision-communication-transfer | SURFACE | Add a future migration trigger and revisit point to the ADR. | Evolution is an optional decision variation. |

## Architecture target over-gating review

| Target unit | LOCAL | EXTERNAL | SURFACED | OMITTED | Progression treatment | Over-gating check |
|---|---|---|---|---|---|---|
| lu-arch-boundaries-data-ownership | 1 | 0 | 3 | 0 | Internal ownership/data order + local invariant | No whole-unit gate; cache/requirements/dependency direction are optional context. |
| lu-arch-sync-async-integration | 2 | 1 | 1 | 0 | One fair quality-trade-off candidate | HTTP and queue mechanics are local traces, not prior course locks. |
| lu-arch-consistency-latency-availability | 2 | 1 | 0 | 0 | One fair quality-trade-off candidate | Invariant and guarantee are introduced in case; no distributed whole-unit gate. |
| lu-arch-scale-capacity-partitioning | 1 | 1 | 1 | 0 | One fair quality-trade-off candidate | Signal and partition variation do not accumulate source passes. |
| lu-arch-failure-recovery-security-observability | 4 | 1 | 1 | 0 | Capability evidence only for ownership | Multi-Primary boundary Unit cannot be a whole-unit lock; other premises remain local. |
| lu-arch-evolution-migration-strangler | 1 | 1 | 4 | 0 | Capability evidence only for ownership | Migration teaches local compatibility; multi-Primary boundary Unit remains non-locking. |
| lu-arch-cost-complexity-changeability | 0 | 2 | 3 | 0 | Two fair quality-trade-off candidates | Cost/changeability and communication share this Unit; its same-unit relation stays internal and non-blocking. |
| lu-arch-requirements-quality-attributes | 0 | 0 | 0 | 0 | Root architecture Unit | No incoming relation. |

## Cross-owner, duplicate-source and synthesis review

- `lu-arch-requirements-quality-attributes` is singleton and supplies five compatible External evidence candidates; they all test the same prior trade-off skill, but are candidates rather than five sequential learner locks.
- `lu-arch-boundaries-data-ownership` is multi-Primary. Its ownership capability is needed for failure/recovery and evolution synthesis, yet whole-unit PASSED would over-gate source-of-truth evidence; both proxies are rejected.
- The two frozen same-unit relations remain internal: ownership precedes source-of-truth evidence, and cost/changeability is non-blocking context for communication/transfer.
- Every synthesis scenario has a bounded decision record, observable trade-off evidence and a local/capability-compatible prerequisite boundary; none requires every adjacent architecture Unit to be PASSED.

## Combined candidate graph

The validator combines all 137 Units, sealed Stage 2B–2F evidence and this package’s External classifications, including rejected whole-unit proxies for cycle analysis. Deduplication, roots and acyclicity are mechanically checked.

## Stage 2G independent acceptance

- Exact frozen scope is 31 / 31 inter-unit relations = 18 REQUIRED + 13 RECOMMENDED, plus two separately handled same-unit relations. The older 32-relation count was reconciled, not silently changed.
- Local slices preserve source ownership; seven External candidates are evidence candidates only. Five singleton quality-attribute proxies are fair, while the two multi-Primary ownership proxies explicitly reject whole-unit PASSED.
- Architecture synthesis remains bounded: quality attributes are reused as compatible evidence without turning every related architecture Unit into a sequential lock; internal ownership/data and cost/communication order remains internal.
- The full 137-Unit graph combines every sealed Stage 2B–2F candidate plus rejected-proxy candidates, is deduplicated, preserves multiple roots and is acyclic.

**Package decision:** Stage 2G Architecture Synthesis is **SEALED**. Global Stage 2 acceptance and canonical progression materialization remain separate work.
