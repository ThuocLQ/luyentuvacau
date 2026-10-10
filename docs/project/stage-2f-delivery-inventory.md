# Stage 2F Delivery — Exact-key Inventory

NON-CANONICAL WORKING INVENTORY. It is a mechanical projection of the frozen dependency registry through the sealed Learning Unit map. It creates no learner lock.

## Delivery inter-unit relations

| Kind | From capability | From unit | To capability | To unit | Frozen assumed slice |
|---|---|---|---|---|---|
| REQUIRED | os-process-thread-kernel | lu-os-process-thread-kernel | delivery-container-process-lifecycle | lu-delivery-container-process-lifecycle | process lifetime, identity and user/kernel boundary |
| REQUIRED | delivery-container-process-lifecycle | lu-delivery-container-process-lifecycle | delivery-resources-cpu-memory | lu-delivery-resources-cpu-memory | process lifecycle under platform resource boundaries |
| REQUIRED | os-resource-exhaustion | lu-os-resource-exhaustion | delivery-resources-cpu-memory | lu-delivery-resources-cpu-memory | finite CPU/memory and exhaustion behavior |
| RECOMMENDED | os-virtual-memory-page-cache | lu-os-virtual-memory-page-cache | delivery-resources-cpu-memory | lu-delivery-resources-cpu-memory | process-visible memory is not one heap number |
| REQUIRED | os-termination-graceful-shutdown | lu-os-termination-graceful-shutdown | delivery-graceful-shutdown-draining | lu-delivery-graceful-shutdown-draining | termination signal, finite shutdown and resource release |
| REQUIRED | delivery-container-process-lifecycle | lu-delivery-container-process-lifecycle | delivery-graceful-shutdown-draining | lu-delivery-graceful-shutdown-draining | container/process start, running and termination lifecycle |
| RECOMMENDED | concurrency-cancellation-lifetime | lu-concurrency-async-parallelism | delivery-graceful-shutdown-draining | lu-delivery-graceful-shutdown-draining | operations respond cooperatively before lifetime ends |
| REQUIRED | delivery-artifact-image-config | lu-delivery-artifact-provenance | delivery-rollout-rollback-strategies | lu-release-rollout-rollback | immutable artifact identity and reproducible prior version |
| RECOMMENDED | delivery-probes-health | lu-rel-health-probes | delivery-rollout-rollback-strategies | lu-release-rollout-rollback | routing includes or removes an instance from readiness |
| RECOMMENDED | api-versioning-compatibility | lu-api-versioning-compatibility | delivery-rollout-rollback-strategies | lu-release-rollout-rollback | old/new API versions may serve together |
| RECOMMENDED | db-schema-evolution | lu-db-schema-evolution | delivery-rollout-rollback-strategies | lu-release-rollout-rollback | old/new binaries may share evolving data |
| RECOMMENDED | msg-schema-evolution-contract-ownership | lu-msg-schema-evolution-contract-ownership | delivery-rollout-rollback-strategies | lu-release-rollout-rollback | mixed-version producers/consumers and retained events |
| REQUIRED | obs-latency-throughput-saturation | lu-obs-latency-throughput-saturation | delivery-autoscaling-signal-boundary | lu-delivery-autoscaling-signal-boundary | workload pressure identifies a capacity boundary |
| REQUIRED | delivery-resources-cpu-memory | lu-delivery-resources-cpu-memory | delivery-autoscaling-signal-boundary | lu-delivery-autoscaling-signal-boundary | resource requests, limits and constrained workload behavior |
| RECOMMENDED | rel-overload-load-shedding-degradation | lu-rel-overload-load-shedding-degradation | delivery-autoscaling-signal-boundary | lu-delivery-autoscaling-signal-boundary | scale-out cannot solve every overload condition |
| RECOMMENDED | msg-lag-backpressure-evidence | lu-msg-lag-backpressure-evidence | delivery-autoscaling-signal-boundary | lu-delivery-autoscaling-signal-boundary | lag and consume rate represent queued work |
| REQUIRED | delivery-container-process-lifecycle | lu-delivery-container-process-lifecycle | delivery-platform-evidence-debug | lu-delivery-platform-evidence-debug | lifecycle, exit state and restart boundary |
| REQUIRED | delivery-resources-cpu-memory | lu-delivery-resources-cpu-memory | delivery-platform-evidence-debug | lu-delivery-platform-evidence-debug | requests/limits, throttling and OOM behavior |
| REQUIRED | delivery-probes-health | lu-rel-health-probes | delivery-platform-evidence-debug | lu-delivery-platform-evidence-debug | probe configuration, result, routing/restart action |
| RECOMMENDED | delivery-artifact-image-config | lu-delivery-artifact-provenance | delivery-platform-evidence-debug | lu-delivery-platform-evidence-debug | deployed artifact identity and config source |
| RECOMMENDED | net-proxy-lb-forwarded-boundary | lu-net-proxy-tls-forwarded-boundary | delivery-platform-evidence-debug | lu-delivery-platform-evidence-debug | traffic crosses proxy/LB before workload |
| RECOMMENDED | sec-secrets-third-party-trust | lu-sec-secrets-third-party-trust | delivery-cloud-responsibility-managed-services | lu-delivery-cloud-responsibility-managed-services | credentials grant authority at external boundary |
| RECOMMENDED | rel-disaster-recovery-rpo-rto | lu-rel-disaster-recovery-rpo-rto | delivery-cloud-responsibility-managed-services | lu-delivery-cloud-responsibility-managed-services | provider redundancy does not prove RPO/RTO |
| REQUIRED | delivery-artifact-image-config | lu-delivery-artifact-provenance | delivery-platform-transfer | lu-delivery-platform-transfer | portable artifact identity and build/runtime config separation |
| REQUIRED | delivery-platform-evidence-debug | lu-delivery-platform-evidence-debug | delivery-platform-transfer | lu-delivery-platform-transfer | diagnose lifecycle, resource, probe/config and routing evidence |
| REQUIRED | delivery-graceful-shutdown-draining | lu-delivery-graceful-shutdown-draining | delivery-platform-transfer | lu-delivery-platform-transfer | stop routing, drain/cancel and exit within bounded lifetime |
| RECOMMENDED | delivery-cloud-responsibility-managed-services | lu-delivery-cloud-responsibility-managed-services | delivery-platform-transfer | lu-delivery-platform-transfer | provider implementation changes responsibility, not application behavior |
| RECOMMENDED | delivery-autoscaling-signal-boundary | lu-delivery-autoscaling-signal-boundary | delivery-platform-transfer | lu-delivery-platform-transfer | pressure maps to different scaling signals/delays |
| RECOMMENDED | delivery-rollout-rollback-strategies | lu-release-rollout-rollback | delivery-platform-transfer | lu-delivery-platform-transfer | version coexistence, traffic movement and rollback differ |
| RECOMMENDED | delivery-container-process-lifecycle | lu-delivery-container-process-lifecycle | delivery-probes-health | lu-rel-health-probes | platform starts, restarts and terminates workload process |

## Same-unit internal REQUIRED relations

| From capability | To capability | Learning Unit | Reason |
|---|---|---|---|
| rel-health-readiness-semantics | delivery-probes-health | lu-rel-health-probes | Shared health/probe assessment; internal learning order, never external progression. |
| delivery-artifact-image-config | delivery-cicd-promotion-provenance | lu-delivery-artifact-provenance | Immutable identity precedes promotion provenance inside one shared assessment. |
| rel-change-rollout-rollback-risk | delivery-rollout-rollback-strategies | lu-release-rollout-rollback | Risk policy precedes mechanism inside the cross-owner rollout assessment. |

## Mechanical scope check

- Inter-unit: 30 / 30 = 14 REQUIRED + 16 RECOMMENDED across 9 target Units.
- Full Delivery scope: 10 target Units after `lu-delivery-artifact-provenance` is included through its internal order.
- Internal edges are accounted for separately and are not candidate learner locks.
