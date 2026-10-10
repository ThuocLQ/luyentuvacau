# Stage 2F Delivery Dependency Semantic Review — Working Evidence

NON-CANONICAL WORKING EVIDENCE. Frozen dependency edges are capability relationships; each external candidate below remains non-locking until later policy materialization.

## Delivery relation-specific evidence

| Kind | Relation | Decision | Concrete target-native evidence | Ownership / proxy boundary |
|---|---|---|---|---|
| REQUIRED | os-process-thread-kernel -> delivery-container-process-lifecycle | LOCAL | A container exits with code 0; read PID 1, exit code and restart count to explain why the platform restarts it. | Teach process start/exit as a local premise; do not claim OS user/kernel or address-space assessment. |
| REQUIRED | delivery-container-process-lifecycle -> delivery-resources-cpu-memory | LOCAL | Compare a running web process with a one-shot job; set its request and limit, then inspect throttle/OOM evidence. | The target owns scheduler resource controls; it only recaps lifecycle, not lifecycle evidence. |
| REQUIRED | os-resource-exhaustion -> delivery-resources-cpu-memory | LOCAL | A memory peak crosses a limit and yields OOMKilled while average is low; choose a limit from the trace. | Finite capacity is introduced locally; do not assess OS reclamation/page-cache mechanism. |
| RECOMMENDED | os-virtual-memory-page-cache -> delivery-resources-cpu-memory | SURFACE | Beside RSS, show page cache as a possible reason process-visible memory differs from managed heap. | Optional diagnostic context only; resource-control progression is never gated. |
| REQUIRED | os-termination-graceful-shutdown -> delivery-graceful-shutdown-draining | LOCAL | SIGTERM starts a 30-second timer; remove traffic, finish one request and release a connection before exit. | Teach the signal/lifetime fact locally; do not claim OS signal-delivery assessment. |
| REQUIRED | delivery-container-process-lifecycle -> delivery-graceful-shutdown-draining | LOCAL | A pod becomes terminating while its main process still accepts work; order readiness removal, drain and exit. | Target owns orchestration drain; the source lifecycle is a bounded timeline only. |
| RECOMMENDED | concurrency-cancellation-lifetime -> delivery-graceful-shutdown-draining | SURFACE | Link a cancellation token to one in-flight handler during draining and inspect whether it exits before grace expires. | Helpful implementation detail, not a requirement for simpler synchronous processes. |
| REQUIRED | delivery-artifact-image-config -> delivery-rollout-rollback-strategies | LOCAL | A canary fails; use the recorded image digest to return traffic to the known prior version. | Target needs immutable identity as a locally taught release fact; no artifact/provenance pass is claimed. |
| RECOMMENDED | delivery-probes-health -> delivery-rollout-rollback-strategies | SURFACE | Show readiness withholding a new replica from traffic during a canary. | Optional healthy-instance refinement; no probe lesson completion is required. |
| RECOMMENDED | api-versioning-compatibility -> delivery-rollout-rollback-strategies | SURFACE | Add an old client calling a removed field during mixed-version rollout. | Compatibility is an optional rollback risk prompt, never a rollout unlock. |
| RECOMMENDED | db-schema-evolution -> delivery-rollout-rollback-strategies | SURFACE | Contrast a reversible deploy with a destructive schema migration that blocks rollback. | Schema strategy remains Data-owned and non-blocking here. |
| RECOMMENDED | msg-schema-evolution-contract-ownership -> delivery-rollout-rollback-strategies | SURFACE | Add an older consumer reading a retained event after producer rollout. | Event contract context sharpens a case but does not gate platform rollout mechanics. |
| REQUIRED | obs-latency-throughput-saturation -> delivery-autoscaling-signal-boundary | LOCAL | Queue depth rises while CPU stays low; select lag rather than CPU as the scaling signal and inspect replica delay. | The target teaches one pressure reading; it does not award observability signal-interpretation evidence. |
| REQUIRED | delivery-resources-cpu-memory -> delivery-autoscaling-signal-boundary | LOCAL | CPU request is 500m and pods throttle before the controller adds replicas; explain the signal/controller boundary. | Resource facts are recapped only; target assesses scaling control loop, not resource sizing. |
| RECOMMENDED | rel-overload-load-shedding-degradation -> delivery-autoscaling-signal-boundary | SURFACE | Ask when adding replicas would overload a shared downstream and require shedding instead. | Reliability admission policy is optional contrast, never scale-controller gating. |
| RECOMMENDED | msg-lag-backpressure-evidence -> delivery-autoscaling-signal-boundary | SURFACE | For a worker, chart lag and consume rate as a scaling input. | Queue-specific optional signal; request-driven workloads remain valid without it. |
| REQUIRED | delivery-container-process-lifecycle -> delivery-platform-evidence-debug | LOCAL | A pod is Pending then CrashLoopBackOff; use phase, command, exit code and restart count to choose the next check. | Target owns diagnosis; it recaps lifecycle states without claiming source assessment. |
| REQUIRED | delivery-resources-cpu-memory -> delivery-platform-evidence-debug | LOCAL | Exit reason is OOMKilled with CPU throttling; distinguish resource evidence from an application exception. | The target uses resource symptoms locally and does not assess resource-control design. |
| REQUIRED | delivery-probes-health -> delivery-platform-evidence-debug | LOCAL | A healthy process is removed from endpoints after readiness fails; inspect probe event and routing state. | Probe result/action is local diagnostic evidence; health/probe shared-unit pass is not required. |
| RECOMMENDED | delivery-artifact-image-config -> delivery-platform-evidence-debug | SURFACE | Include deployed digest and config reference in a wrong-image investigation. | Useful branch of diagnosis, not required before lifecycle/resource triage. |
| RECOMMENDED | net-proxy-lb-forwarded-boundary -> delivery-platform-evidence-debug | SURFACE | Add a request that dies at the ingress and compare proxy logs with pod events. | Optional network branch; platform diagnosis remains teachable for non-network failures. |
| RECOMMENDED | sec-secrets-third-party-trust -> delivery-cloud-responsibility-managed-services | SURFACE | In a managed database incident, inspect IAM scope and rotation ownership beside provider responsibility. | Security mechanism remains optional context; responsibility mapping is still assessable locally. |
| RECOMMENDED | rel-disaster-recovery-rpo-rto -> delivery-cloud-responsibility-managed-services | SURFACE | Ask who proves a managed backup restores inside the stated target. | DR target supplies a useful check, not a managed-service prerequisite. |
| REQUIRED | delivery-artifact-image-config -> delivery-platform-transfer | EXTERNAL — WHOLE-UNIT PROXY NOT_ACCEPTABLE | Map an image digest and runtime config from Kubernetes to a managed platform; the target assessment needs portable identity evidence. Prior capability evidence for `delivery-artifact-image-config` is substantive. | `lu-delivery-artifact-provenance` also assesses promotion provenance, so whole-unit PASSED would over-gate; retain capability-compatible evidence only. |
| REQUIRED | delivery-platform-evidence-debug -> delivery-platform-transfer | EXTERNAL — WHOLE-UNIT PROXY ACCEPTABLE | Given two platforms, use observed lifecycle/resource/probe evidence to defend equivalent controls. Prior assessment from this singleton Unit is needed before L4 transfer. | `lu-delivery-platform-evidence-debug` has one Primary; its PASSED evidence is a fair compatible proxy. |
| REQUIRED | delivery-graceful-shutdown-draining -> delivery-platform-transfer | EXTERNAL — WHOLE-UNIT PROXY ACCEPTABLE | Move a service between platforms while proving traffic removal, bounded drain and exit still hold. Prior assessment from this singleton Unit is needed before transfer. | `lu-delivery-graceful-shutdown-draining` has one Primary; whole-unit PASSED is a fair proxy. |
| RECOMMENDED | delivery-cloud-responsibility-managed-services -> delivery-platform-transfer | SURFACE | Compare a self-managed and managed platform responsibility matrix after selecting portable controls. | Optional cloud-layer variation; a container-to-orchestrator transfer does not require it. |
| RECOMMENDED | delivery-autoscaling-signal-boundary -> delivery-platform-transfer | SURFACE | Explain how the same backlog maps to a different controller delay on the destination. | Optional scaling variation, never an L4 transfer lock. |
| RECOMMENDED | delivery-rollout-rollback-strategies -> delivery-platform-transfer | SURFACE | Compare traffic-shift and rollback primitives across platforms. | Useful release variation but not required to verify runtime-equivalent behavior. |
| RECOMMENDED | delivery-container-process-lifecycle -> delivery-probes-health | SURFACE | Show startup/restart state beside a readiness result to prevent confusing liveness with process existence. | The shared health/probe Unit owns assessment; lifecycle is optional context. |

## Delivery target over-gating review

| Target unit | LOCAL | EXTERNAL | SURFACED | OMITTED | Progression treatment | Over-gating check |
|---|---|---|---|---|---|---|
| lu-delivery-artifact-provenance | 0 | 0 | 0 | 0 | Internal order only | The artifact-to-provenance relation is inside the shared Unit; no external lock. |
| lu-delivery-container-process-lifecycle | 1 | 0 | 0 | 0 | Local introduction | Process premise is sufficient for container lifecycle assessment. |
| lu-delivery-resources-cpu-memory | 2 | 0 | 1 | 0 | Local introduction | Capacity and lifecycle are taught through the resource trace; OS depth is not gated. |
| lu-delivery-graceful-shutdown-draining | 2 | 0 | 1 | 0 | Local introduction | Drain assessment needs a small termination/lifecycle timeline, not source PASSED. |
| lu-release-rollout-rollback | 1 | 0 | 4 | 0 | Local release fact + optional risks | Cross-owner risk policy is internal; no external prerequisite is created. |
| lu-delivery-autoscaling-signal-boundary | 2 | 0 | 2 | 0 | Local control-loop premise | Signal/resource facts are introduced in the case; overload and lag are optional variants. |
| lu-delivery-platform-evidence-debug | 3 | 0 | 2 | 0 | Local diagnostic evidence | Diagnosis samples lifecycle/resource/probe evidence without claiming their full Units. |
| lu-delivery-cloud-responsibility-managed-services | 0 | 0 | 2 | 0 | Non-blocking context | Security and DR are prompts, not conditions for responsibility mapping. |
| lu-delivery-platform-transfer | 0 | 3 | 3 | 0 | Two fair external candidates; one capability record | L4 synthesis requires prior debug/drain evidence; artifact whole-unit proxy is explicitly rejected. |
| lu-rel-health-probes | 0 | 0 | 1 | 0 | Internal health/probe order | The Reliability-to-probe edge is internal; lifecycle is surfaced only. |

## Cross-owner and duplicate-source review

- `lu-rel-health-probes` remains one sealed multi-owner Unit. Its two internal health/probe capabilities are internal order, not an external candidate.
- `lu-release-rollout-rollback` remains one sealed multi-owner Unit. Rollout-risk policy and rollout mechanism are internal order.
- `lu-delivery-container-process-lifecycle` appears for resources, draining, debugging and probe context; each target assessment uses a different small slice, so no duplicate external lock is introduced.
- The only external candidate pairs are `lu-delivery-platform-evidence-debug -> lu-delivery-platform-transfer` and `lu-delivery-graceful-shutdown-draining -> lu-delivery-platform-transfer`; artifact provenance is retained as capability evidence only.

## Combined candidate graph

Full-node graph is calculated by the validator from all 137 canonical Units, sealed Stage 2B–2E evidence and these Delivery External candidates. Candidate edges, proxy fairness and future learner locks remain distinct.
