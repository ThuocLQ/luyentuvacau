# Stage 1E Reliability Review — Working Evidence

NON-CANONICAL WORKING REVIEW ARTIFACT. Final authority remains learning-unit-audit.md and learning-unit-map.md. Delete this file after Stage 1E materialization is externally sealed.

## Historical-unit decisions

| Historical unit | Decision | Proposed final unit(s) | Primary capabilities | Reason |
|---|---|---|---|---|
| lu-rel-cascading-failure-queue-capacity | SPLIT | lu-rel-cascading-failure-queue-capacity; lu-rel-overload-load-shedding-degradation; lu-rel-dependency-budgets | rel-cascading-failure-queue-capacity; rel-overload-load-shedding-degradation; rel-dependency-budgets | Cascade propagation, admission policy and journey-budget allocation require distinct state, evidence and assessments. |
| lu-rel-change-rollout-rollback-risk | SPLIT | lu-rel-user-journey-sli-slo-budget; lu-rel-change-rollout-rollback-risk (CANDIDATE FOR CROSS-OWNER REVIEW) | rel-change-rollout-rollback-risk; rel-user-journey-sli-slo-budget | SLI/SLO is reusable foundation; rollout risk is progressive exposure plus recovery policy. |
| lu-rel-disaster-recovery-rpo-rto | KEEP | lu-rel-disaster-recovery-rpo-rto | rel-disaster-recovery-rpo-rto | Business loss/recovery objectives require an exercised recovery assessment. |
| lu-rel-failure-injection-verification | KEEP | lu-rel-failure-injection-verification | rel-failure-injection-verification | Bounded fault experiments need hypothesis, blast radius, stop conditions and recovery proof. |
| lu-rel-health-readiness-semantics | PROVISIONAL KEEP — pending Delivery cross-owner review | lu-rel-health-readiness-semantics | rel-health-readiness-semantics | Final KEEP if separate; final MERGE if Delivery accepts a unit with delivery-probes-health. |
| lu-rel-incident-response-postmortem | KEEP | lu-rel-incident-response-postmortem | rel-incident-response-postmortem | Mitigation, evidence preservation and verified learning are one operating workflow. |

## Rollout cross-historical lineage

If Delivery accepts rel-change-rollout-rollback-risk ↔ delivery-rollout-rollback-strategies, the rollout unit is a cross-historical coalescing/merge of one output from this SPLIT and a Delivery historical output. The Reliability historical row remains SPLIT because its original two-capability grouping ceased to exist. Preserve this lineage during final Stage 1E materialization.

## Singleton merge review

| Proposed singleton | Strongest real merge candidate(s) | Why merge fails |
|---|---|---|
| lu-rel-cascading-failure-queue-capacity | lu-rel-overload-load-shedding-degradation; lu-rel-dependency-budgets | Cascade state is pressure across dependencies/resources; evidence is cross-service latency, queue age, retries and pool/in-flight growth; failure is slow dependency to retained work to retry amplification. Overload controls admitted/rejected work at one boundary, and budgets allocate time. One assessment cannot fairly prove propagation diagnosis and both control choices. |
| lu-rel-overload-load-shedding-degradation | lu-rel-cascading-failure-queue-capacity; approved proposed final unit lu-rel-user-journey-sli-slo-budget | Admission state is accepted versus shed/degraded work; evidence is arrival/service rate, queue/in-flight, rejection and critical latency; failure is accepting beyond sustainable capacity. Cascade and journey policy do not prove the admission decision in one bounded assessment. |
| lu-rel-dependency-budgets | lu-rel-cascading-failure-queue-capacity; lu-api-deadline-retry-policy | Budget state allocates remaining time across a journey; evidence is remaining deadline, per-hop timeout and retry consumption; failure is nested retries exhausting the caller budget. API unit proves request propagation/retry mechanics, not end-to-end allocation; one assessment cannot prove both. |
| approved proposed final unit lu-rel-user-journey-sli-slo-budget | lu-rel-change-rollout-rollback-risk; lu-rel-failure-injection-verification; lu-rel-incident-response-postmortem | Journey state is good/total over a window; evidence is denominator, latency/success and budget burn; failures are misleading availability or wrong denominator. Rollout, fault and incident workflows have distinct control loops, so combining would over-gate this foundation. |
| lu-rel-disaster-recovery-rpo-rto | lu-db-backup-restore; lu-dist-replication-leader-quorum; lu-delivery-cloud-responsibility-managed-services | DR state is recoverable point and restoration duration; evidence is restore drill, recovered delta and dependency checklist; failure is meeting neither RPO nor RTO. Inputs cannot prove business recovery decision and exercise outcome together. |
| lu-rel-failure-injection-verification | lu-test-failure-resilience; approved proposed final unit lu-obs-diagnostic-method | Fault-test state is hypothesis, blast radius and stop condition; evidence is injected fault, SLI and recovery; failure is uncontrolled chaos or unverified recovery. General tests/diagnosis cannot fairly prove production-safe experiment design. |
| lu-rel-health-readiness-semantics | delivery-probes-health capability, currently Primary inside lu-delivery-container-process-lifecycle; final Delivery unit pending Stage 1E-C review; approved proposed final unit lu-obs-signals-correlation | Health state is useful progress versus traffic eligibility; evidence is ready endpoints, dependency state and restart/routing outcome; failure is restart storm from readiness-as-liveness. Signals do not prove policy; probe merge awaits one shared Delivery assessment. |
| lu-rel-incident-response-postmortem | approved proposed final unit lu-obs-diagnostic-method; approved proposed final unit lu-rel-user-journey-sli-slo-budget | Incident state is impact, mitigation, evidence and follow-up; evidence is timeline, snapshots and verified actions; failure is risky changes destroying evidence or blame replacing learning. Diagnosis/SLO evidence alone cannot prove command workflow. |

## Cross-owner candidates for Delivery review

### health semantics ↔ probes

rel-health-readiness-semantics ↔ delivery-probes-health is a CANDIDATE FOR CROSS-OWNER REVIEW. MERGE requires one incident to prove health meaning and platform behavior through dependency state, useful-progress/traffic-eligibility semantics, probe configuration/result, ready-endpoint membership, restart count and traffic outcome. Otherwise Local Prerequisite Slice is better.

### rollout risk ↔ rollout mechanics

rel-change-rollout-rollback-risk ↔ delivery-rollout-rollback-strategies is a CANDIDATE FOR CROSS-OWNER REVIEW. MERGE requires one progressive-release incident to prove risk policy and platform mechanics through version/traffic split, journey evidence, deployment state, compatibility facts and rollback/roll-forward outcome. Otherwise Local Prerequisite Slice is better.
