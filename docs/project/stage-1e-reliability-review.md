# Stage 1E Reliability Review — Working Evidence

NON-CANONICAL WORKING REVIEW ARTIFACT. Final authority remains learning-unit-audit.md and learning-unit-map.md. Delete this file after Stage 1E materialization is externally sealed.

## Historical-unit decisions

| Historical unit | Decision | Proposed final unit(s) | Primary capabilities | Reason |
|---|---|---|---|---|
| lu-rel-cascading-failure-queue-capacity | SPLIT | lu-rel-cascading-failure-queue-capacity; lu-rel-overload-load-shedding-degradation; lu-rel-dependency-budgets | cascade; overload; budgets | Cascade propagation, admission policy and journey-budget allocation require distinct evidence and assessments. |
| lu-rel-change-rollout-rollback-risk | SPLIT | lu-rel-user-journey-sli-slo-budget; lu-rel-change-rollout-rollback-risk (CANDIDATE FOR CROSS-OWNER REVIEW) | SLI/SLO; rollout risk | SLI/SLO is reusable foundation; rollout risk is progressive exposure plus recovery policy. |
| lu-rel-disaster-recovery-rpo-rto | KEEP | lu-rel-disaster-recovery-rpo-rto | rel-disaster-recovery-rpo-rto | Business loss/recovery objectives require an exercised recovery assessment. |
| lu-rel-failure-injection-verification | KEEP | lu-rel-failure-injection-verification | rel-failure-injection-verification | Bounded fault experiments need hypothesis, blast radius, stop conditions and recovery proof. |
| lu-rel-health-readiness-semantics | KEEP; CANDIDATE FOR CROSS-OWNER REVIEW | lu-rel-health-readiness-semantics | rel-health-readiness-semantics | Standalone reliability semantics pending Delivery probe review. |
| lu-rel-incident-response-postmortem | KEEP | lu-rel-incident-response-postmortem | rel-incident-response-postmortem | Mitigation, evidence preservation and verified learning are one operating workflow. |

## Singleton merge review

| Proposed singleton | Strongest real merge candidate(s) | Why merge fails |
|---|---|---|
| lu-rel-cascading-failure-queue-capacity | lu-rel-overload-load-shedding-degradation; lu-rel-dependency-budgets | Cascade needs cross-service pressure evidence; admission and budget allocation are adjacent controls. |
| lu-rel-overload-load-shedding-degradation | lu-rel-cascading-failure-queue-capacity; lu-rel-user-journey-sli-slo-budget | It assesses rejection/degradation under finite capacity, not propagation or reliability policy. |
| lu-rel-dependency-budgets | lu-rel-cascading-failure-queue-capacity; lu-api-deadline-retry-policy | It assesses remaining-deadline allocation; cascade and API mechanics are different boundaries. |
| lu-rel-user-journey-sli-slo-budget | rollout risk; failure injection; incident response | Reusable journey measurement would be over-gated by any specialized workflow. |
| lu-rel-disaster-recovery-rpo-rto | lu-db-backup-restore; lu-dist-replication-leader-quorum; lu-delivery-cloud-responsibility-managed-services | Inputs do not prove recovery objective, loss window and drill duration together. |
| lu-rel-failure-injection-verification | lu-test-failure-resilience; lu-obs-diagnostic-method | General tests and diagnosis do not prove safe reliability experiment scope or recovery. |
| lu-rel-health-readiness-semantics | delivery-probes-health; lu-obs-signals-correlation | Probe implementation awaits Delivery review; signal selection cannot prove routing/restart policy. |
| lu-rel-incident-response-postmortem | lu-obs-diagnostic-method; lu-rel-user-journey-sli-slo-budget | Neither proves mitigation ordering, evidence preservation and verified follow-up. |

## Proposed multi-capability units

None are finalized within the Reliability-only slice.

## Cross-owner candidates for Delivery review

### health semantics ↔ probes

rel-health-readiness-semantics ↔ delivery-probes-health is a CANDIDATE FOR CROSS-OWNER REVIEW. MERGE requires one incident to prove health meaning and platform behavior through dependency state, useful-progress/traffic-eligibility semantics, probe configuration/result, ready-endpoint membership, restart count and traffic outcome. The shared failure loop is readiness wired as liveness, causing restart storms. Otherwise Local Prerequisite Slice is better.

### rollout risk ↔ rollout mechanics

rel-change-rollout-rollback-risk ↔ delivery-rollout-rollback-strategies is a CANDIDATE FOR CROSS-OWNER REVIEW. MERGE requires one progressive-release incident to prove risk policy and platform mechanics through version/traffic split, journey evidence, deployment state, compatibility facts and rollback/roll-forward outcome. Otherwise Local Prerequisite Slice is better.
