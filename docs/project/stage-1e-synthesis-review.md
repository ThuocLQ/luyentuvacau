# Stage 1E Production Engineering Synthesis — Working Evidence

NON-CANONICAL WORKING REVIEW ARTIFACT. This synthesis resolves the approved Observability, Reliability and Delivery reviews into one materialization blueprint. Final authority remains learning-unit-audit.md and learning-unit-map.md.

## Historical Decision Ledger

| Historical unit | Disposition | Final canonical state |
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

Totals: 6 KEEP, 8 SPLIT, 1 MERGE.

## Final Primary allocation

| Final unit | Primary capabilities | Owners | Singleton/Multi |
|---|---|---|---|
| lu-obs-cardinality-sampling-cost | obs-cardinality-sampling-cost | Observability & Performance | Singleton |
| lu-obs-instrumentation-tracing | obs-instrumentation-context; obs-tracing-distributed-evidence | Observability & Performance | Multi |
| lu-obs-latency-throughput-saturation | obs-latency-throughput-saturation | Observability & Performance | Singleton |
| lu-obs-db-io-downstream-attribution | obs-db-io-downstream-attribution | Observability & Performance | Singleton |
| lu-obs-diagnostic-method | obs-diagnostic-method | Observability & Performance | Singleton |
| lu-obs-load-test-benchmark-validity | obs-load-test-benchmark-validity | Observability & Performance | Singleton |
| lu-obs-logs-structured-correlation | obs-logs-structured-correlation | Observability & Performance | Singleton |
| lu-obs-signals-correlation | obs-signals-correlation | Observability & Performance | Singleton |
| lu-obs-profiling-runtime-evidence | obs-profiling-runtime-evidence | Observability & Performance | Singleton |
| lu-rel-cascading-failure-queue-capacity | rel-cascading-failure-queue-capacity | Reliability / SRE | Singleton |
| lu-rel-overload-load-shedding-degradation | rel-overload-load-shedding-degradation | Reliability / SRE | Singleton |
| lu-rel-dependency-budgets | rel-dependency-budgets | Reliability / SRE | Singleton |
| lu-rel-user-journey-sli-slo-budget | rel-user-journey-sli-slo-budget | Reliability / SRE | Singleton |
| lu-release-rollout-rollback | rel-change-rollout-rollback-risk; delivery-rollout-rollback-strategies | Reliability / SRE; Containers / Kubernetes / Cloud Delivery | Multi |
| lu-rel-disaster-recovery-rpo-rto | rel-disaster-recovery-rpo-rto | Reliability / SRE | Singleton |
| lu-rel-failure-injection-verification | rel-failure-injection-verification | Reliability / SRE | Singleton |
| lu-rel-health-probes | rel-health-readiness-semantics; delivery-probes-health | Reliability / SRE; Containers / Kubernetes / Cloud Delivery | Multi |
| lu-rel-incident-response-postmortem | rel-incident-response-postmortem | Reliability / SRE | Singleton |
| lu-delivery-artifact-provenance | delivery-artifact-image-config; delivery-cicd-promotion-provenance | Containers / Kubernetes / Cloud Delivery | Multi |
| lu-delivery-platform-evidence-debug | delivery-platform-evidence-debug | Containers / Kubernetes / Cloud Delivery | Singleton |
| lu-delivery-autoscaling-signal-boundary | delivery-autoscaling-signal-boundary | Containers / Kubernetes / Cloud Delivery | Singleton |
| lu-delivery-resources-cpu-memory | delivery-resources-cpu-memory | Containers / Kubernetes / Cloud Delivery | Singleton |
| lu-delivery-platform-transfer | delivery-platform-transfer | Containers / Kubernetes / Cloud Delivery | Singleton |
| lu-delivery-cloud-responsibility-managed-services | delivery-cloud-responsibility-managed-services | Containers / Kubernetes / Cloud Delivery | Singleton |
| lu-delivery-container-process-lifecycle | delivery-container-process-lifecycle | Containers / Kubernetes / Cloud Delivery | Singleton |
| lu-delivery-graceful-shutdown-draining | delivery-graceful-shutdown-draining | Containers / Kubernetes / Cloud Delivery | Singleton |

## Cross-historical lineage and internal Primary order

- lu-obs-instrumentation-tracing coalesces outputs of two historical SPLIT decisions; internal REQUIRED order: obs-instrumentation-context → obs-tracing-distributed-evidence.
- lu-delivery-artifact-provenance is the retained coherent subset of Delivery artifact mega-unit SPLIT; internal REQUIRED order: delivery-artifact-image-config → delivery-cicd-promotion-provenance.
- lu-rel-health-probes replaces Reliability historical singleton through MERGE and consumes probes from Delivery SPLIT; internal REQUIRED order: rel-health-readiness-semantics → delivery-probes-health.
- lu-release-rollout-rollback combines Reliability SPLIT output and Delivery SPLIT output; internal REQUIRED order: rel-change-rollout-rollback-risk → delivery-rollout-rollback-strategies.
- Dependency projection remains NOT FINALIZED; dependency-map.md is unchanged.

## Multi-unit proof summary

| Final unit | Primary capability | Evidence in the same bounded assessment |
|---|---|---|
| lu-obs-instrumentation-tracing | obs-instrumentation-context | Instrumentation snippets and propagated context show semantic boundaries across API, worker and downstream service. |
| lu-obs-instrumentation-tracing | obs-tracing-distributed-evidence | Trace tree, links and downstream timing prove the reconstructed causal path. |
| lu-delivery-artifact-provenance | delivery-artifact-image-config | Digest, config source and SBOM prove immutable artifact/config identity. |
| lu-delivery-artifact-provenance | delivery-cicd-promotion-provenance | Build, approval and deployment records prove promotion provenance. |
| lu-rel-health-probes | rel-health-readiness-semantics | Dependency, useful-progress and traffic-eligibility evidence prove health meaning. |
| lu-rel-health-probes | delivery-probes-health | Probe configuration, events and routing/restart behavior prove implementation. |
| lu-release-rollout-rollback | rel-change-rollout-rollback-risk | Version-specific journey evidence and compatibility boundary prove risk decision. |
| lu-release-rollout-rollback | delivery-rollout-rollback-strategies | Deployment/traffic state and recovery record prove rollout mechanism. |

## Singleton completeness

| Final singleton unit | Strongest merge candidate(s) | Why merge remains rejected |
|---|---|---|
| lu-obs-cardinality-sampling-cost | lu-obs-instrumentation-tracing | Cardinality/sampling controls retained dimensions, cost and fidelity; instrumentation/tracing creates semantic boundaries and propagated context. Cardinality evidence is dimension volume, cost and sampled-loss behavior; tracing evidence is span/context continuity. A cardinality explosion can occur with correct traces, so one assessment cannot prove both failure loops. |
| lu-obs-latency-throughput-saturation | lu-obs-db-io-downstream-attribution | This unit measures workload symptoms through latency, throughput and saturation. Attribution assigns a causal timing owner from traces, database and downstream evidence. The first fails by misleading symptom interpretation; the second by blaming the wrong boundary, so a bounded assessment should not prove both. |
| lu-obs-db-io-downstream-attribution | approved proposed final unit lu-obs-diagnostic-method | Attribution identifies the responsible database/I/O/downstream timing boundary from query, dependency and trace evidence. Diagnostic method is L4 hypothesis/experiment/confidence synthesis across incomplete evidence. One attribution case cannot fairly prove the broader diagnostic loop. |
| lu-obs-diagnostic-method | lu-obs-profiling-runtime-evidence | Profiling supplies one runtime evidence source such as CPU, allocation, stack or wait data. Diagnostic method chooses and tests hypotheses across traces, logs, metrics and experiments. A profiler hotspot alone neither proves confidence calibration nor rules out competing causes. |
| lu-obs-load-test-benchmark-validity | lu-obs-latency-throughput-saturation | Load-test validity governs workload representativeness, warm-up, generator behavior and bottleneck similarity. Latency/throughput/saturation records measurements. The failure boundary is an invalid performance claim versus an incorrectly interpreted production symptom; one run should not certify both. |
| lu-obs-logs-structured-correlation | approved proposed final unit lu-obs-signals-correlation | Structured logs define stable event schema, correlation fields and queryable records. Signals correlation chooses a minimum cross-signal evidence set for a question. A good JSON log schema does not prove the right metric/trace/log combination for diagnosis. |
| lu-obs-signals-correlation | lu-obs-logs-structured-correlation | Signal selection/correlation evaluates evidence sufficiency across metrics, logs and traces. Logging is one concrete signal implementation. The failure is missing or misleading cross-signal reasoning versus unqueryable/uncorrelated log events; one assessment would hide that distinction. |
| lu-obs-profiling-runtime-evidence | lu-runtime-diagnostics | lu-runtime-diagnostics owns runtime collection mechanisms. This unit interprets capture output into a production CPU, allocation, stack or wait hypothesis. Collection success is observable separately from correct production interpretation, so they require distinct assessments. |
| lu-rel-cascading-failure-queue-capacity | approved proposed final unit lu-rel-overload-load-shedding-degradation; approved proposed final unit lu-rel-dependency-budgets | Cascading failure tracks pressure propagation across services using queue age, retries, in-flight work and cross-service latency. Overload controls admission at one boundary; budgets allocate a journey budget. A slow dependency/retry-amplification investigation cannot also prove correct shedding and deadline allocation. |
| lu-rel-overload-load-shedding-degradation | lu-rel-cascading-failure-queue-capacity; approved proposed final unit lu-rel-user-journey-sli-slo-budget | Overload state is accepted versus shed/degraded work, observed through arrival/service rate, queue/in-flight counts, rejection and critical latency. Cascades diagnose propagated pressure, while SLI/SLO defines outcome policy. One bounded exercise cannot prove both an admission-control choice and those distinct loops. |
| lu-rel-dependency-budgets | lu-rel-cascading-failure-queue-capacity; lu-api-deadline-retry-policy | Dependency budgets allocate remaining deadline, timeout and retry consumption across an end-to-end journey. Evidence is per-hop time and retry use; failure is nested retries exhausting the caller budget. Cascade diagnosis and API propagation mechanics do not prove correct journey-level allocation in the same assessment. |
| lu-rel-user-journey-sli-slo-budget | lu-release-rollout-rollback; lu-rel-failure-injection-verification; lu-rel-incident-response-postmortem | SLI/SLO state is good/total events over a window, with denominator, latency/success and burn evidence. Release, fault and incident work use that evidence but add different control loops. Combining them would make a reusable foundation depend on operational mechanics rather than assess the measurement boundary itself. |
| lu-rel-disaster-recovery-rpo-rto | lu-db-backup-restore; lu-dist-replication-leader-quorum; lu-delivery-cloud-responsibility-managed-services | DR owns recoverable point and restoration duration, proved by a restore drill, recovered delta and dependency checklist. Backup, replication and managed-service controls are inputs; none proves business recovery objectives and exercised outcome together. |
| lu-rel-failure-injection-verification | lu-test-failure-resilience; approved proposed final unit lu-obs-diagnostic-method | Failure injection controls a production-safe hypothesis, blast radius and stop condition, with injected fault, SLI and recovery evidence. General resilience tests and diagnosis do not prove safe experiment design; the failure boundary is uncontrolled chaos or unverified recovery. |
| lu-rel-incident-response-postmortem | approved proposed final unit lu-obs-diagnostic-method; approved proposed final unit lu-rel-user-journey-sli-slo-budget | Incident response owns impact, mitigation, evidence preservation and verified follow-up, shown by timeline, snapshots and actions. Diagnosis and SLI/SLO are evidence inputs, not proof of command workflow; merging would miss failures such as risky mitigation destroying evidence or blame replacing learning. |
| lu-delivery-platform-evidence-debug | lu-delivery-container-process-lifecycle; lu-delivery-resources-cpu-memory; lu-rel-health-probes | Platform debugging locates workload/platform failures using events, exit reason, resource, probe and mount status. Lifecycle, resources and health are mechanism-specific inputs. A fair diagnosis exercise must choose among Pending, CrashLoop and OOM causes, whereas each candidate needs a narrower control assessment. |
| lu-delivery-autoscaling-signal-boundary | lu-delivery-resources-cpu-memory; approved proposed final unit lu-rel-overload-load-shedding-degradation | Autoscaling owns a signal, controller delay, replica response and downstream pressure. Resource limits own request/limit/throttle/OOM state; shedding owns admission/degradation policy. The observable control loops and failures differ, so a scaling case should not certify either control. |
| lu-delivery-resources-cpu-memory | lu-delivery-autoscaling-signal-boundary | Resources own requests, limits, throttling and OOM, with RSS, CPU throttling and termination evidence. Autoscaling owns signal/delay/replica state. An OOM or throttle diagnosis does not prove a safe scale boundary, and a scaling response does not prove resource-limit correctness. |
| lu-delivery-platform-transfer | lu-delivery-artifact-provenance; lu-delivery-platform-evidence-debug; lu-delivery-graceful-shutdown-draining | Platform transfer is L4 mapping of requirements across platforms; provenance, debugging and draining each have concrete lower-level state and evidence. A transfer comparison synthesizes those foundations rather than proving any one mechanism failure loop. |
| lu-delivery-cloud-responsibility-managed-services | lu-rel-disaster-recovery-rpo-rto; lu-sec-secrets-third-party-trust; lu-delivery-platform-transfer | Managed-service ownership is established by service contract, IAM, quota and recovery-verification evidence. DR, security and transfer retain recovery, trust and synthesis mechanisms respectively. One assessment cannot establish the provider/application responsibility boundary and all three other failure loops. |
| lu-delivery-container-process-lifecycle | lu-delivery-graceful-shutdown-draining | Process lifecycle covers container start, main-process exit and restart state. Draining adds readiness removal, termination signal, grace period, in-flight work and durable handoff. Basic lifecycle evidence does not prove no-loss shutdown orchestration. |
| lu-delivery-graceful-shutdown-draining | lu-delivery-container-process-lifecycle | Draining owns termination-to-traffic-removal-to-active-work-to-bounded-exit state, proved by readiness, signal, in-flight and durable-handoff evidence. Lifecycle proves start/exit/restart behavior only; one assessment would not expose a shutdown that loses work. |

Singleton completeness: 22/22 final singleton units reviewed; 0 missing; 0 generic nearest-related placeholders.

## Derived count and conflict check

- Before: 30 scoped Primary capabilities, 15 units, 7 singleton, 8 multi.
- Proposed: 30 scoped Primary capabilities, 26 units, 22 singleton, 4 multi, 2 multi-owner units.
- Global proposed: 167 Primary homes, 132 Learning Units, 105 singleton, 27 multi.
- Check: all 30 scoped Primaries appear exactly once; no extra Primary entered; no final unit is empty; all 15 historical units have one disposition; approved working artifacts agree after the final Delivery cross-owner resolutions.
