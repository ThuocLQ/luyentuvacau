# Stage 2B Foundations Dependency Semantic Review — Working Evidence

NON-CANONICAL WORKING REVIEW. This artifact classifies the Stage 2A Foundations dependency workload. It does not create learner progression locks or mutate the frozen capability dependency graph.

## 1. Scope and completeness

- Target-owner batch: Foundations (Programming & Software Design Foundations; Runtime & Memory; Operating Systems & I/O Foundations; Concurrency & Async; Networking & HTTP).
- REQUIRED reviewed: 25 cross-unit relations.
- RECOMMENDED reviewed: 10 relations (9 cross-unit, 1 same-unit).
- Scoped relations accounted for: 35 / 35.
- Target Learning Units with pending relations: 18.
- Sealed Learning Units in the target-owner batch overall: 29.
- No relation outside Batch A is classified here.

A REQUIRED decision is a semantic prerequisite candidate, not a learner lock. A RECOMMENDED decision is non-blocking context only.

## 2. REQUIRED decision table

| From capability | From unit | To capability | To unit | Frozen assumed slice | Decision | Exact local slice or required prior evidence | Why |
|---|---|---|---|---|---|---|---|
| prog-errors-results | lu-prog-errors-results | prog-api-refactoring-change-safety | lu-prog-api-refactoring-change-safety | observable error/result contract and failure semantics | LOCAL_PREREQUISITE_SLICE | Recap result shape, failure semantics, and one observable contract. | Target can assess safe API change without source-unit gating. |
| prog-invariants-domain-model | lu-prog-invariants-domain-model | prog-api-refactoring-change-safety | lu-prog-api-refactoring-change-safety | valid state and behavior invariant | LOCAL_PREREQUISITE_SLICE | State the one invariant the refactoring must preserve. | Narrow invariant is enough; full domain modelling is not target evidence. |
| runtime-managed-execution | lu-runtime-managed-execution | runtime-memory-roots-lifetime | lu-runtime-allocation-gc | managed runtime/process boundary | LOCAL_PREREQUISITE_SLICE | Introduce managed process, heap and runtime boundary. | Target needs the boundary, not full managed-execution evidence. |
| runtime-retention-pooling-large-objects | lu-runtime-allocation-gc | runtime-memory-performance-debug | lu-runtime-diagnostics | allocation vs pooling vs retention | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior allocation, pooling and retention evidence with allocation-rate/heap observations. | L4 diagnosis needs substantive mechanism evidence; a local recap would re-teach retention and pooling failure modes. |
| os-process-thread-kernel | lu-os-process-thread-kernel | os-files-handles-sockets-ipc | lu-os-blocking-io-waits | process resource context and user/kernel boundary | LOCAL_PREREQUISITE_SLICE | Recap process ownership and user/kernel boundary. | Does not reproduce process/thread mechanisms. |
| os-process-thread-kernel | lu-os-process-thread-kernel | os-scheduling-starvation | lu-os-scheduling-starvation | runnable execution unit and scheduling boundary | LOCAL_PREREQUISITE_SLICE | Define runnable work and scheduler hand-off. | Target proves starvation evidence. |
| os-process-thread-kernel | lu-os-process-thread-kernel | os-termination-graceful-shutdown | lu-os-termination-graceful-shutdown | process lifetime and termination | LOCAL_PREREQUISITE_SLICE | State process start/stop lifetime and termination boundary. | Target owns termination evidence. |
| os-process-thread-kernel | lu-os-process-thread-kernel | os-virtual-memory-page-cache | lu-os-virtual-memory-page-cache | virtual address-space boundary | LOCAL_PREREQUISITE_SLICE | Contrast virtual address space and physical pages. | Bounded vocabulary, not process/thread assessment. |
| os-process-thread-kernel | lu-os-process-thread-kernel | os-resource-exhaustion | lu-os-resource-exhaustion | finite thread/process/memory resources | LOCAL_PREREQUISITE_SLICE | Name the finite resource being exhausted. | Universal process/thread gating would over-gate OS foundations. |
| os-files-handles-sockets-ipc | lu-os-blocking-io-waits | os-resource-exhaustion | lu-os-resource-exhaustion | handle/socket capacity and lifetime | LOCAL_PREREQUISITE_SLICE | Add a handle/socket count and lifetime example. | No full blocking-I/O evidence is needed. |
| prog-invariants-domain-model | lu-prog-invariants-domain-model | concurrency-interleavings-invariants | lu-race-atomicity | state invariant under transition | LOCAL_PREREQUISITE_SLICE | Introduce one concrete invariant before the trace. | Race assessment proves interleaving, not domain modelling. |
| concurrency-interleavings-invariants | lu-race-atomicity | concurrency-memory-visibility | lu-concurrency-memory-visibility | shared state across execution contexts | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior shared-state interleaving and visibility observation. | Visibility reasoning depends on demonstrated race evidence. |
| concurrency-synchronization-atomicity | lu-race-atomicity | concurrency-deadlock-starvation | lu-concurrency-deadlock-starvation | synchronization ownership and wait | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior synchronization ownership, wait edges and stalled progress. | Target needs a real wait relationship, not a definition. |
| os-blocking-io-waits | lu-os-blocking-io-waits | concurrency-async-parallelism | lu-concurrency-async-parallelism | external I/O wait lifetime | LOCAL_PREREQUISITE_SLICE | Explain I/O wait lifetime and execution capacity. | Avoids progression inversion from deeper OS diagnosis to async foundation. |
| prog-resource-ownership | lu-prog-resource-ownership | concurrency-cancellation-lifetime | lu-concurrency-async-parallelism | ownership and authority to end lifetime | LOCAL_PREREQUISITE_SLICE | State owner and cancellation authority. | Target proves cancellation behavior. |
| concurrency-races-check-then-act | lu-race-atomicity | concurrency-local-vs-distributed | lu-concurrency-local-vs-distributed | synchronization authority scope | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior check-then-act race and authority scope evidence. | Local/distributed comparison is grounded in the race boundary. |
| os-files-handles-sockets-ipc | lu-os-blocking-io-waits | net-tcp-connection-semantics | lu-net-connection-reuse-pooling | socket state, lifetime and resource | LOCAL_PREREQUISITE_SLICE | Recap socket ownership, lifecycle and descriptor resource. | Whole blocking-I/O unit would over-gate TCP learning. |
| net-http-semantics | lu-net-http-streaming-cancellation | net-proxy-lb-forwarded-boundary | lu-net-proxy-tls-forwarded-boundary | request and header semantics | LOCAL_PREREQUISITE_SLICE | State request/header fields crossing proxy boundary. | Proxy target owns forwarded/trust behavior. |
| concurrency-cancellation-lifetime | lu-concurrency-async-parallelism | net-streaming-body-cancellation | lu-net-http-streaming-cancellation | cooperative cancellation and lifetime | LOCAL_PREREQUISITE_SLICE | Add cancellation/lifetime hand-off at stream boundary. | Target owns body-transfer evidence. |
| net-request-path-dns | lu-net-request-path-dns | net-failure-localization-unknown-outcome | lu-net-failure-localization-unknown-outcome | name-resolution failure stage | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior resolver result/error and pre-connect boundary. | L4 localization must distinguish DNS from later stages. |
| net-tcp-connection-semantics | lu-net-connection-reuse-pooling | net-failure-localization-unknown-outcome | lu-net-failure-localization-unknown-outcome | connection establishment and reset stage | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior connect/reset evidence and connection target. | Prevents transport and HTTP failure being conflated. |
| net-tls-trust-handshake | lu-net-proxy-tls-forwarded-boundary | net-failure-localization-unknown-outcome | lu-net-failure-localization-unknown-outcome | TLS negotiation and trust stage | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior handshake phase, trust result and termination side. | Trust-stage localization needs handshake evidence. |
| net-http-semantics | lu-net-http-streaming-cancellation | net-failure-localization-unknown-outcome | lu-net-failure-localization-unknown-outcome | response semantics as stage evidence | EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE | Prior HTTP status/header/body outcome after transport succeeds. | Separates application response from earlier failure. |
| net-request-path-dns | lu-net-request-path-dns | net-service-discovery-load-balancing | lu-net-service-discovery-load-balancing | logical name resolution versus endpoint discovery | LOCAL_PREREQUISITE_SLICE | Contrast one name lookup with a changing endpoint set. | Discovery target owns routing evidence; no DNS lock. |
| net-tcp-connection-semantics | lu-net-connection-reuse-pooling | net-service-discovery-load-balancing | lu-net-service-discovery-load-balancing | connection target and lifetime | LOCAL_PREREQUISITE_SLICE | Recap picker target and long-lived connection lifetime. | Whole TCP semantics are unnecessary gating. |

## 3. External candidate evidence table

This table records analysis only; it creates no lock.

| Relation | Required compatible prior evidence | Why local slice is insufficient | Whole-source-unit PASSED proxy |
|---|---|---|---|
| concurrency-interleavings-invariants → concurrency-memory-visibility | Shared-state interleaving and visibility observation | Needs demonstrated race evidence | ACCEPTABLE_CANDIDATE |
| concurrency-synchronization-atomicity → concurrency-deadlock-starvation | Synchronization ownership, wait edges, stalled progress | Needs a real wait relationship | ACCEPTABLE_CANDIDATE |
| concurrency-races-check-then-act → concurrency-local-vs-distributed | Check-then-act race and authority scope | Comparison is grounded in the race boundary | NOT_ACCEPTABLE |
| net-request-path-dns → net-failure-localization-unknown-outcome | Resolver result/error and pre-connect boundary | Must separate name resolution from later stages | ACCEPTABLE_CANDIDATE |
| net-tcp-connection-semantics → net-failure-localization-unknown-outcome | Connect/reset evidence and connection target | Whole source adds unrelated pooling content | NOT_ACCEPTABLE |
| net-tls-trust-handshake → net-failure-localization-unknown-outcome | Handshake phase, trust result, termination side | Requires trust-stage evidence | NOT_ACCEPTABLE |
| net-http-semantics → net-failure-localization-unknown-outcome | HTTP outcome after transport succeeds | Must distinguish application response | NOT_ACCEPTABLE |

## 4. Local Prerequisite Slice safety table

| Relation | Local slice | Ownership preserved because | Target evidence does not claim |
|---|---|---|---|
| prog-errors-results → prog-api-refactoring-change-safety | Result/error contract | Target proves its own change-safety contract | PASSED prog-errors-results |
| prog-invariants-domain-model → prog-api-refactoring-change-safety | One valid-state invariant | Premise is local to target case | PASSED prog-invariants-domain-model |
| runtime-managed-execution → runtime-memory-roots-lifetime | Managed runtime/process boundary | Target proves roots/lifetime evidence | PASSED runtime-managed-execution |
| runtime-retention-pooling-large-objects → runtime-memory-performance-debug | Allocation versus pooling versus retention evidence | Diagnostics target proves hypothesis-driven diagnosis; whole allocation unit would add unrelated gating | PASSED runtime-retention-pooling-large-objects |
| os-process-thread-kernel → OS target units | Process/user-kernel context | Each OS target proves its own evidence | PASSED os-process-thread-kernel |
| os-files-handles-sockets-ipc → os-resource-exhaustion | Handle/socket capacity and lifetime | Exhaustion target owns resource evidence | PASSED os-files-handles-sockets-ipc |
| prog-invariants-domain-model → concurrency-interleavings-invariants | One concrete invariant | Concurrency target proves interleaving | PASSED prog-invariants-domain-model |
| os-blocking-io-waits → concurrency-async-parallelism | External I/O wait lifetime | Async target owns concurrency evidence | PASSED os-blocking-io-waits |
| prog-resource-ownership → concurrency-cancellation-lifetime | Owner and cancellation authority | Target proves cancellation | PASSED prog-resource-ownership |
| os-files-handles-sockets-ipc → net-tcp-connection-semantics | Socket state/lifetime/resource | TCP target owns connection semantics | PASSED os-files-handles-sockets-ipc |
| net-http-semantics → net-proxy-lb-forwarded-boundary | Request/header boundary | Proxy target owns forwarded/trust behavior | PASSED net-http-semantics |
| concurrency-cancellation-lifetime → net-streaming-body-cancellation | Cancellation/lifetime hand-off | Streaming target owns body evidence | PASSED concurrency-cancellation-lifetime |
| net-request-path-dns → net-service-discovery-load-balancing | DNS versus endpoint discovery | Discovery target owns routing evidence | PASSED net-request-path-dns |
| net-tcp-connection-semantics → net-service-discovery-load-balancing | Connection target/lifetime | Discovery target owns picker evidence | PASSED net-tcp-connection-semantics |
| os-process-thread-kernel → os-virtual-memory-page-cache | Virtual address-space boundary | Page/cache target owns evidence | PASSED os-process-thread-kernel |
| os-process-thread-kernel → os-scheduling-starvation | Runnable unit/scheduling boundary | Starvation target owns evidence | PASSED os-process-thread-kernel |
| os-process-thread-kernel → os-termination-graceful-shutdown | Process lifetime/termination | Termination target owns evidence | PASSED os-process-thread-kernel |
| os-process-thread-kernel → os-files-handles-sockets-ipc | Process/user-kernel context | Handles target owns evidence | PASSED os-process-thread-kernel |
| os-process-thread-kernel → os-resource-exhaustion | Finite process/thread/memory model | Exhaustion target owns evidence | PASSED os-process-thread-kernel |

## 5. RECOMMENDED decision table

| From capability | From unit | To capability | To unit | Same unit? | Frozen assumed slice | Decision | Surface location or omission rationale |
|---|---|---|---|---|---|---|---|
| prog-composition-dependencies | lu-prog-composition-dependencies | prog-api-refactoring-change-safety | lu-prog-api-refactoring-change-safety | NO | dependency boundary and composition seam | SURFACE_RECOMMENDED_CONTEXT | Optional seam in refactoring case; improves change-safety reasoning. |
| os-virtual-memory-page-cache | lu-os-virtual-memory-page-cache | runtime-memory-roots-lifetime | lu-runtime-allocation-gc | NO | process virtual-memory boundary | SURFACE_RECOMMENDED_CONTEXT | Contrast virtual memory and managed roots. |
| runtime-diagnostics | lu-runtime-diagnostics | runtime-retention-pooling-large-objects | lu-runtime-allocation-gc | NO | allocation and heap evidence selection | SURFACE_RECOMMENDED_CONTEXT | Connect allocation, pooling and retention observations. |
| os-scheduling-starvation | lu-os-scheduling-starvation | concurrency-async-parallelism | lu-concurrency-async-parallelism | NO | runnable-capacity and scheduler delay | SURFACE_RECOMMENDED_CONTEXT | Optional context for apparent async stalls. |
| net-tcp-connection-semantics | lu-net-connection-reuse-pooling | net-tls-trust-handshake | lu-net-proxy-tls-forwarded-boundary | NO | established transport connection | SURFACE_RECOMMENDED_CONTEXT | Non-blocking transport-stage reminder before TLS. |
| net-tls-trust-handshake | lu-net-proxy-tls-forwarded-boundary | net-proxy-lb-forwarded-boundary | lu-net-proxy-tls-forwarded-boundary | YES | TLS termination boundary | SURFACE_RECOMMENDED_CONTEXT | Same-unit contrast; never INTERNAL_PRIMARY_ORDER. |
| prog-resource-ownership | lu-prog-resource-ownership | net-streaming-body-cancellation | lu-net-http-streaming-cancellation | NO | stream and buffer lifetime ownership | SURFACE_RECOMMENDED_CONTEXT | Optional ownership reminder for stream cancellation. |
| os-virtual-memory-page-cache | lu-os-virtual-memory-page-cache | db-buffer-io | lu-db-buffer-io | NO | OS memory/page-cache versus database buffer state | INTENTIONALLY_NOT_SURFACED | Outside Batch A; avoid distracting foundation scope. |
| rel-health-readiness-semantics | lu-rel-health-probes | net-service-discovery-load-balancing | lu-net-service-discovery-load-balancing | NO | traffic eligibility signal | INTENTIONALLY_NOT_SURFACED | Do not pull later-track reliability semantics into networking foundation. |
| delivery-platform-evidence-debug | lu-delivery-platform-evidence-debug | net-service-discovery-load-balancing | lu-net-service-discovery-load-balancing | NO | platform routing evidence | SURFACE_RECOMMENDED_CONTEXT | Optional routing-evidence example; never a Delivery prerequisite. |

## 6. Target-unit over-gating review

| Target unit | LOCAL | EXTERNAL | RECOMMENDED surfaced | Whole-unit gating fair? | Evidence note |
|---|---:|---:|---:|---|---|
| lu-concurrency-async-parallelism | 2 | 0 | 1 | No | Avoid deeper OS diagnosis as a gate for async foundation. |
| lu-net-failure-localization-unknown-outcome | 0 | 4 | 0 | No | Four capability inputs are needed; whole source units add unrelated gates. |
| lu-net-proxy-tls-forwarded-boundary | 1 | 1 | 1 | No | HTTP is local; TLS evidence is capability-specific. |
| lu-net-service-discovery-load-balancing | 2 | 0 | 0 | No | DNS/TCP slices are local; later-track recommendations stay non-blocking. |
| lu-prog-api-refactoring-change-safety | 2 | 0 | 1 | Yes | Contract and invariant slices are bounded. |
| lu-runtime-allocation-gc | 1 | 0 | 1 | Yes | Managed boundary and diagnostic context suffice. |
| lu-runtime-diagnostics | 0 | 1 | 1 | No | L4 diagnosis needs capability evidence, but not unrelated whole-unit gates. |
| lu-os-resource-exhaustion | 2 | 0 | 0 | Yes | Finite-resource slices are local. |

## 7. Provisional external-candidate graph diagnostic

Using only the eight Batch A relations classified as EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE:

- Candidate capability relations: 8.
- Unique source-unit → target-unit candidate pairs: 8.
- Target units with 0 external candidates: 13 of 18 scoped target units.
- Target units with 1 external candidate: 4.
- Target units with 2+ external candidates: 1 (lu-net-failure-localization-unknown-outcome, indegree 4).
- Maximum candidate indegree: 4.
- Candidate subgraph: ACYCLIC.

This diagnostic does not label targets LOCKED or AVAILABLE.

## 8. Cross-owner review

- Same-owner REQUIRED: 20 LOCAL, 8 EXTERNAL.
- Cross-owner REQUIRED: 5 LOCAL, 0 EXTERNAL.
- Cross-owner is not a reason for either decision.
- No decision requires a later-track Production or Delivery capability before a Foundations target. Reliability and Delivery relations are RECOMMENDED and remain non-blocking.

## 9. Final counts

- REQUIRED: LOCAL_PREREQUISITE_SLICE 17 + EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE 8 = 25.
- RECOMMENDED: SURFACE_RECOMMENDED_CONTEXT 8 + INTENTIONALLY_NOT_SURFACED 2 = 10.
- Total accounted: 35 / 35.
- UNKNOWN: 0.
- DEFERRED REQUIRED classification: 0.
- Learner locks created: 0.
- Canonical mutation: 0.
