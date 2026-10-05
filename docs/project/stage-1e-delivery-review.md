# Stage 1E Delivery Review — Working Evidence

NON-CANONICAL WORKING REVIEW ARTIFACT. Final authority remains learning-unit-audit.md and learning-unit-map.md. Delete this file after Stage 1E materialization is externally sealed.

## Historical Delivery decisions

| Historical unit | Decision | Proposed final unit(s) | Exact Primary capabilities | Reason |
|---|---|---|---|---|
| lu-delivery-artifact-image-config | SPLIT | lu-delivery-artifact-provenance; lu-release-rollout-rollback; lu-delivery-platform-evidence-debug | delivery-artifact-image-config; delivery-cicd-promotion-provenance; delivery-rollout-rollback-strategies; delivery-platform-evidence-debug | Immutable artifact/provenance, rollout mechanics and platform debugging have distinct state/evidence boundaries. |
| lu-delivery-autoscaling-signal-boundary | SPLIT | lu-delivery-resources-cpu-memory; lu-delivery-autoscaling-signal-boundary; lu-delivery-platform-transfer | delivery-resources-cpu-memory; delivery-autoscaling-signal-boundary; delivery-platform-transfer | Runtime limits, scaling control loop and L4 platform transfer must not over-gate one another. |
| lu-delivery-cloud-responsibility-managed-services | KEEP | lu-delivery-cloud-responsibility-managed-services | delivery-cloud-responsibility-managed-services | Provider/application responsibility, IAM, quota and recovery verification share one ownership assessment. |
| lu-delivery-container-process-lifecycle | SPLIT | lu-delivery-container-process-lifecycle; lu-rel-health-probes; lu-delivery-graceful-shutdown-draining | delivery-container-process-lifecycle; delivery-probes-health; delivery-graceful-shutdown-draining | Foundational process lifecycle, health/probe behavior and drain orchestration have different learner boundaries. |

## Final Stage 1E Cross-Owner Decisions

| Candidate | Decision | Final unit proposal | Reason |
|---|---|---|---|
| rel-health-readiness-semantics ↔ delivery-probes-health | MERGE | lu-rel-health-probes | One outage trace connects useful-progress/traffic eligibility to probe result, routing membership and restart action. Evidence is dependency state, probe config/result, ready endpoints, restart count and traffic outcome. Failure is readiness wired as liveness causing restart storm. One assessment chooses semantics/config and proves safe routing; Local Prerequisite Slice would split one causal chain. Owners remain Reliability / SRE and Containers / Kubernetes / Cloud Delivery. |
| rel-change-rollout-rollback-risk ↔ delivery-rollout-rollback-strategies | MERGE | lu-release-rollout-rollback | One progressive-release trace connects risk boundary to traffic mechanism and rollback/roll-forward decision. Evidence is version split, deployment state, journey evidence, compatibility facts and recovery record. Failure is broad exposure or incompatible rollback. One assessment proves both; Local Prerequisite Slice is artificial. Owners remain unchanged. |

## Multi-capability unit evidence

### lu-delivery-artifact-provenance

- Shared problem: prove exactly what artifact/config reached production.
- Shared state: source commit to immutable image digest to approved promotion to deployed identity.
- Shared evidence: Git SHA, digest, SBOM, config reference, approval and deployment record.
- Failure loop: mutable tag or production rebuild loses provenance and rollback identity.
- Assessment: trace one deployment chain and reject an unproven artifact.
- Per-Primary proof: digest/config evidence proves delivery-artifact-image-config; build/approval/deployment records prove delivery-cicd-promotion-provenance.

### lu-rel-health-probes

- Shared problem: remove unsafe traffic without restarting a process that can still make useful progress.
- Shared state: health meaning to probe result to routing/restart action.
- Shared evidence: dependency state, probe config/result, ready endpoints, restart count and traffic outcome.
- Failure loop: readiness-as-liveness creates a restart storm.
- Assessment: choose semantics/configuration for the outage and prove traffic drains without destructive restarts.
- Per-Primary proof: semantics evidence proves rel-health-readiness-semantics; platform evidence proves delivery-probes-health.

### lu-release-rollout-rollback

- Shared problem: expose a risky version progressively and recover safely.
- Shared state: version/traffic population to SLI/compatibility boundary to rollback or roll-forward.
- Shared evidence: version split, deployment status, journey evidence, compatibility state and recovery record.
- Failure loop: canary hides the affected path or rollback conflicts with current state.
- Assessment: choose release strategy and recovery decision from the incident evidence.
- Per-Primary proof: risk evidence proves rel-change-rollout-rollback-risk; deployment/traffic evidence proves delivery-rollout-rollback-strategies.

## Singleton boundaries

| Unit | Strongest candidate | Why merge fails |
|---|---|---|
| lu-delivery-platform-evidence-debug | lu-delivery-container-process-lifecycle; lu-delivery-resources-cpu-memory; lu-rel-health-probes | Debug state is workload/platform failure location; evidence is events, exit reason, resource/probe/mount status; failures are pending, CrashLoop or OOM. Inputs do not permit one fair diagnosis assessment. |
| lu-delivery-resources-cpu-memory | lu-delivery-autoscaling-signal-boundary | Resource state is request/limit/throttle/OOM; evidence is RSS, throttling and termination; autoscaling state is signal/delay/replicas. One assessment cannot prove both controls. |
| lu-delivery-autoscaling-signal-boundary | lu-delivery-resources-cpu-memory; approved proposed final unit lu-rel-overload-load-shedding-degradation | Scaling assesses signal/control-loop/downstream pressure; limits and shedding assess different state/actions and failure loops. |
| lu-delivery-platform-transfer | lu-delivery-artifact-provenance; lu-delivery-platform-evidence-debug; lu-delivery-graceful-shutdown-draining | L4 transfer maps requirements across platforms; it synthesizes, rather than replaces, each foundation assessment. |
| lu-delivery-cloud-responsibility-managed-services | lu-rel-disaster-recovery-rpo-rto; lu-sec-secrets-third-party-trust; lu-delivery-platform-transfer | Ownership evidence is service contract, IAM, quota and recovery verification; DR, security and transfer each retain distinct mechanism/failure loops. |
| lu-delivery-container-process-lifecycle | lu-delivery-graceful-shutdown-draining | Lifecycle state is process/container start/exit; draining adds readiness removal, signal, grace and in-flight work. Basic lifecycle should not require orchestration mastery. |
| lu-delivery-graceful-shutdown-draining | lu-delivery-container-process-lifecycle | Drain state is termination, traffic removal, active work, durable handoff and bounded exit; process lifecycle does not prove no-loss shutdown. |

## Lineage

The Delivery artifact historical grouping SPLITs; its rollout output coalesces cross-historically with the Reliability rollout-risk output. The Delivery container historical grouping SPLITs; its probes output MERGEs cross-owner with Reliability health semantics.

