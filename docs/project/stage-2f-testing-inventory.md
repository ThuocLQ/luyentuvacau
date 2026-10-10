# Stage 2F Testing / Verification — Exact-key Inventory

NON-CANONICAL WORKING INVENTORY. It projects frozen capability dependencies through the sealed Unit map and does not create learner locks.

## Testing inter-unit relations

| Kind | From capability | From unit | To capability | To unit | Frozen assumed slice |
|---|---|---|---|---|---|
| RECOMMENDED | prog-invariants-domain-model | lu-prog-invariants-domain-model | test-risk-strategy-boundaries | lu-test-risk-strategy-boundaries | state invariant under transition |
| REQUIRED | test-unit-integration-contract | lu-test-risk-strategy-boundaries | test-real-dependency-fixtures | lu-test-real-dependency-fixtures | test boundary differs from a contract-relevant real dependency |
| REQUIRED | concurrency-races-check-then-act | lu-race-atomicity | test-time-concurrency-determinism | lu-test-time-concurrency-determinism | non-atomic interleaving needs controlled ordering |
| RECOMMENDED | concurrency-cancellation-lifetime | lu-concurrency-async-parallelism | test-time-concurrency-determinism | lu-test-time-concurrency-determinism | cancellation changes operation lifetime |
| RECOMMENDED | test-risk-strategy-boundaries | lu-test-risk-strategy-boundaries | test-time-concurrency-determinism | lu-test-time-concurrency-determinism | risk identifies a timing/concurrency boundary |
| REQUIRED | prog-invariants-domain-model | lu-prog-invariants-domain-model | test-property-boundary-fuzz | lu-test-property-boundary-fuzz | invariant under generated state transitions |
| RECOMMENDED | test-risk-strategy-boundaries | lu-test-risk-strategy-boundaries | test-property-boundary-fuzz | lu-test-property-boundary-fuzz | risk guides generated-input focus |
| REQUIRED | test-risk-strategy-boundaries | lu-test-risk-strategy-boundaries | test-failure-resilience | lu-test-failure-resilience | risk boundary and expected behavior under failure |
| RECOMMENDED | dist-partial-failure-uncertainty | lu-dist-partial-failure-uncertainty | test-failure-resilience | lu-test-failure-resilience | one component may fail independently |
| REQUIRED | test-risk-strategy-boundaries | lu-test-risk-strategy-boundaries | test-migration-compatibility | lu-test-migration-compatibility | identify behavior/data contract at migration boundary |
| RECOMMENDED | api-versioning-compatibility | lu-api-versioning-compatibility | test-migration-compatibility | lu-test-migration-compatibility | old/new clients or servers coexist |
| RECOMMENDED | db-schema-evolution | lu-db-schema-evolution | test-migration-compatibility | lu-test-migration-compatibility | old/new binaries share evolving data |
| RECOMMENDED | msg-schema-evolution-contract-ownership | lu-msg-schema-evolution-contract-ownership | test-migration-compatibility | lu-test-migration-compatibility | producers/consumers and retained events coexist |
| REQUIRED | test-risk-strategy-boundaries | lu-test-risk-strategy-boundaries | test-ci-flakiness-repeatability | lu-test-ci-flakiness-repeatability | risk boundary exposes a non-repeatable test signal |
| RECOMMENDED | test-time-concurrency-determinism | lu-test-time-concurrency-determinism | test-ci-flakiness-repeatability | lu-test-ci-flakiness-repeatability | scheduler/time sensitivity creates repeatability risk |
| RECOMMENDED | test-real-dependency-fixtures | lu-test-real-dependency-fixtures | test-ci-flakiness-repeatability | lu-test-ci-flakiness-repeatability | fixture lifecycle can leak state or network variance |
| REQUIRED | test-risk-strategy-boundaries | lu-test-risk-strategy-boundaries | test-review-static-analysis-change-safety | lu-test-review-static-analysis-change-safety | change risk identifies what review evidence should target |
| RECOMMENDED | prog-api-refactoring-change-safety | lu-prog-api-refactoring-change-safety | test-review-static-analysis-change-safety | lu-test-review-static-analysis-change-safety | change can preserve compile shape while altering behavior |
| REQUIRED | test-unit-integration-contract | lu-test-risk-strategy-boundaries | test-risk-transfer | lu-test-risk-transfer | choose a test boundary from behavior and dependency contract |
| REQUIRED | test-failure-resilience | lu-test-failure-resilience | test-risk-transfer | lu-test-risk-transfer | controlled failure and verified resilience invariant |
| RECOMMENDED | test-time-concurrency-determinism | lu-test-time-concurrency-determinism | test-risk-transfer | lu-test-risk-transfer | timing-sensitive failure is a test-design variation |
| RECOMMENDED | test-property-boundary-fuzz | lu-test-property-boundary-fuzz | test-risk-transfer | lu-test-risk-transfer | generated cases explore a stated invariant boundary |
| RECOMMENDED | test-migration-compatibility | lu-test-migration-compatibility | test-risk-transfer | lu-test-risk-transfer | compatibility is a changed-condition test variation |
| RECOMMENDED | test-review-static-analysis-change-safety | lu-test-review-static-analysis-change-safety | test-risk-transfer | lu-test-risk-transfer | review/static evidence is an additional safety signal |

## Same-unit internal REQUIRED relation

| From capability | To capability | Learning Unit | Reason |
|---|---|---|---|
| test-risk-strategy-boundaries | test-unit-integration-contract | lu-test-risk-strategy-boundaries | Risk boundary is introduced before choosing the unit/integration/contract test boundary in one assessment. |

## Mechanical scope check

- 24 / 24 inter-unit relations = 9 REQUIRED + 15 RECOMMENDED across 9 target Units.
- One same-unit REQUIRED relation is separately accounted for and is not a learner-lock candidate.
