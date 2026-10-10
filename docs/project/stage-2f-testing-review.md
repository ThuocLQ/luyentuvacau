# Stage 2F Testing / Verification Dependency Semantic Review — Working Evidence

NON-CANONICAL WORKING EVIDENCE. Local teaching slices, External candidates, whole-unit proxy suitability and later learner locks are separate decisions.

## Testing relation-specific evidence

| Kind | Relation | Decision | Concrete target-native evidence | Ownership / proxy boundary |
|---|---|---|---|---|
| RECOMMENDED | prog-invariants-domain-model -> test-risk-strategy-boundaries | SURFACE | Start a payment update by naming “balance never negative” before ranking the risk of its transition. | Invariant vocabulary orients risk selection; domain-model assessment remains optional. |
| REQUIRED | test-unit-integration-contract -> test-real-dependency-fixtures | LOCAL | A fake payment gateway returns success while a real sandbox rejects an invalid header; choose the boundary and inspect the observable mismatch. | Teach one contract-relevant dependency boundary locally; do not claim the source Unit’s full test-strategy assessment. |
| REQUIRED | concurrency-races-check-then-act -> test-time-concurrency-determinism | LOCAL | Two controlled tasks both pass a stock check before one decrement; use a barrier and assert the violated count. | The target owns deterministic test control; it only introduces one race trace, not the source race-protection assessment. |
| RECOMMENDED | concurrency-cancellation-lifetime -> test-time-concurrency-determinism | SURFACE | Add cancellation during a delayed task and assert cleanup after the virtual timeout. | Optional timing variation, not a prerequisite for deterministic scheduling. |
| RECOMMENDED | test-risk-strategy-boundaries -> test-time-concurrency-determinism | SURFACE | Use risk ranking to choose the interleaving worth controlling first. | Helpful prioritisation context; deterministic evidence is still assessed independently. |
| REQUIRED | prog-invariants-domain-model -> test-property-boundary-fuzz | LOCAL | Generate transfer amounts and assert source plus destination balance stays constant after each accepted transition. | The invariant is stated inside the property test; full domain-model design evidence is not claimed. |
| RECOMMENDED | test-risk-strategy-boundaries -> test-property-boundary-fuzz | SURFACE | Use a boundary-risk note to bias generated values toward zero, maximum and duplicate IDs. | Optional generator focus; no risk-strategy pass is required. |
| REQUIRED | test-risk-strategy-boundaries -> test-failure-resilience | LOCAL | A checkout dependency times out; state the expected user outcome before injecting the fault and checking the recorded result. | Target owns fault experiment/verification; risk is a local expected-behavior prompt only. |
| RECOMMENDED | dist-partial-failure-uncertainty -> test-failure-resilience | SURFACE | Contrast a known rejection with a lost response while deciding what the resilience test can assert. | Distributed uncertainty is useful variation, not required for a local timeout experiment. |
| REQUIRED | test-risk-strategy-boundaries -> test-migration-compatibility | LOCAL | Before migration, name the customer record behavior that must survive; run old reader and new writer against the same fixture. | Target owns compatibility execution; it uses one local risk boundary and does not claim source strategy assessment. |
| RECOMMENDED | api-versioning-compatibility -> test-migration-compatibility | SURFACE | Add an old API client to the migration matrix as an optional compatibility case. | API ownership stays external; migration testing never locks on it. |
| RECOMMENDED | db-schema-evolution -> test-migration-compatibility | SURFACE | Add a nullable-column rollout case to the migration matrix. | Database mechanism is optional context, not a migration-test prerequisite. |
| RECOMMENDED | msg-schema-evolution-contract-ownership -> test-migration-compatibility | SURFACE | Replay an old event into the new consumer as a concrete optional case. | Messaging contract reasoning is surfaced, never gating. |
| REQUIRED | test-risk-strategy-boundaries -> test-ci-flakiness-repeatability | LOCAL | A test intermittently fails only under parallel CI; record the signal, isolate its risk boundary and rerun with a fixed seed. | Target owns repeatability diagnosis; local risk framing does not award source evidence. |
| RECOMMENDED | test-time-concurrency-determinism -> test-ci-flakiness-repeatability | SURFACE | Offer a fake clock/barrier as an optional repair for scheduler-sensitive failures. | Useful tool path, not a condition for flakiness triage. |
| RECOMMENDED | test-real-dependency-fixtures -> test-ci-flakiness-repeatability | SURFACE | Inspect fixture reset and remote cleanup when only CI leaks state. | Optional failure branch; repeatability can be assessed without a real dependency. |
| REQUIRED | test-risk-strategy-boundaries -> test-review-static-analysis-change-safety | LOCAL | A diff changes tenant filtering; identify the risky behavior then check review evidence and a static rule for the changed path. | Target owns review/static evidence; it uses local risk identification without source-unit PASSED. |
| RECOMMENDED | prog-api-refactoring-change-safety -> test-review-static-analysis-change-safety | SURFACE | Compare a compiling rename with a silently changed default parameter. | Optional refactoring contrast; review safety remains teachable locally. |
| REQUIRED | test-unit-integration-contract -> test-risk-transfer | EXTERNAL — WHOLE-UNIT PROXY NOT_ACCEPTABLE | Given a new payments workflow, choose unit, integration or contract evidence before defending the transfer. Prior capability evidence for `test-unit-integration-contract` is substantive. | `lu-test-risk-strategy-boundaries` also contains risk strategy, so whole-unit PASSED would over-gate; keep compatible capability evidence only. |
| REQUIRED | test-failure-resilience -> test-risk-transfer | EXTERNAL — WHOLE-UNIT PROXY ACCEPTABLE | Transfer a fault-injection invariant from HTTP timeout to broker outage and defend the observed recovery evidence. Prior assessment from this singleton Unit is required for the L4 transfer. | `lu-test-failure-resilience` has one Primary; whole-unit PASSED is a fair compatible proxy. |
| RECOMMENDED | test-time-concurrency-determinism -> test-risk-transfer | SURFACE | Use a scheduler race as one optional changed-condition transfer. | Non-blocking technique variation. |
| RECOMMENDED | test-property-boundary-fuzz -> test-risk-transfer | SURFACE | Use generated boundary values as an optional way to challenge the transferred invariant. | Property testing is an optional evidence form. |
| RECOMMENDED | test-migration-compatibility -> test-risk-transfer | SURFACE | Ask whether an old reader/new writer condition changes the test design. | Migration context is optional transfer variation. |
| RECOMMENDED | test-review-static-analysis-change-safety -> test-risk-transfer | SURFACE | Add review/static evidence as a complementary safety signal after choosing runtime evidence. | It does not gate the transfer assessment. |

## Testing target over-gating review

| Target unit | LOCAL | EXTERNAL | SURFACED | OMITTED | Progression treatment | Over-gating check |
|---|---|---|---|---|---|---|
| lu-test-risk-strategy-boundaries | 0 | 0 | 1 | 0 | Internal order + optional context | Its required capability relation is internal; invariant framing is non-blocking. |
| lu-test-real-dependency-fixtures | 1 | 0 | 0 | 0 | Local test-boundary premise | One fake/real mismatch is enough; no full strategy Unit pass. |
| lu-test-time-concurrency-determinism | 1 | 0 | 2 | 0 | Local race trace | Controlled interleaving is taught in the target; timing/risk extras remain optional. |
| lu-test-property-boundary-fuzz | 1 | 0 | 1 | 0 | Local invariant statement | Generated testing needs one stated property, not domain-model progression. |
| lu-test-failure-resilience | 1 | 0 | 1 | 0 | Local fault premise | Fault verification stays self-contained; partial failure is optional variation. |
| lu-test-migration-compatibility | 1 | 0 | 3 | 0 | Local compatibility premise | The migration case introduces its own behavior boundary; other evolution domains are optional. |
| lu-test-ci-flakiness-repeatability | 1 | 0 | 2 | 0 | Local diagnosis premise | Risk framing is local; time/fixture branches are surfaced only. |
| lu-test-review-static-analysis-change-safety | 1 | 0 | 1 | 0 | Local change-risk premise | Review/static assessment does not require refactoring unit completion. |
| lu-test-risk-transfer | 0 | 2 | 4 | 0 | One fair Unit proxy + one capability record | L4 transfer needs prior resilience evidence; multi-Primary test-boundary proxy is explicitly rejected. |

## Cross-owner, duplicate-source and synthesis review

- `lu-test-risk-strategy-boundaries` is multi-Primary. Its internal risk-to-boundary relation is not a candidate; its `test-unit-integration-contract` evidence is capability-compatible only for transfer.
- `lu-test-risk-strategy-boundaries` appears as source for four Local targets and two surfaced targets. Each target teaches its own case; none receives an external whole-unit lock.
- `lu-test-failure-resilience` is singleton and its controlled-failure assessment is a fair External candidate for `lu-test-risk-transfer`.
- The testing transfer synthesis keeps diagnosis, property, migration and static-analysis relations optional so it does not become a mega-prerequisite gate.

## Combined candidate graph

The validator computes all 137 canonical Unit nodes and combines sealed Stage 2B–2E candidates, Delivery candidates and these Testing candidates. It includes rejected whole-unit proxy candidates for cycle analysis while keeping them distinct from a future implemented lock.

## Stage 2F independent acceptance

- Delivery exact-key evidence remains 30 / 30 inter-unit relations (14 REQUIRED, 16 RECOMMENDED), three separately verified internal REQUIRED edges and ten full-scope targets.
- Testing exact-key evidence is 24 / 24 inter-unit relations (9 REQUIRED, 15 RECOMMENDED), one separately verified internal REQUIRED edge and nine targets.
- Combined Stage 2F evidence is 54 / 54 inter-unit relations (23 REQUIRED, 31 RECOMMENDED) across 19 full-scope targets, with all four internal edges separately accounted for.
- External candidates remain evidence candidates only. Delivery and Testing each reject a multi-Primary whole-unit proxy; the remaining singleton proxies are fair candidates, not implemented learner locks.
- The full 137-Unit candidate graph is deduplicated, preserves multiple roots and is acyclic. No sealed Stage 2E decision or frozen dependency row was changed.

**Acceptance decision:** Stage 2F Delivery & Testing / Verification is **SEALED**. The next bounded semantic review is Stage 2G Architecture Synthesis.
