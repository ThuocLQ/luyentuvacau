# Senior Backend Capability Dependency Map

> **Status:** DRAFT — Phase 2 / Step 3 — Batch A of 4

## Purpose and stop boundary

This map records which prior capability mechanism a target may assume. Batch A contains only approved edges whose targets belong to Tracks 1–5. It is not a lesson order, learner progression gate, database schema, or frontend rule.

## Capability dependency != learner gating

A REQUIRED edge is only a candidate for a later lesson prerequisite; it does not set `LOCKED` or `AVAILABLE`. A RECOMMENDED edge improves comprehension but must never create a learner lock. QuanNet locks progression, not curiosity.

## Relation semantics

- **REQUIRED** — without the source slice, the target would re-teach it or cannot be evaluated fairly.
- **RECOMMENDED** — a small recap can teach the target, but prior exposure materially helps.
- Related/co-learning is not stored as an edge.

## Graph invariants

Batch A uses frozen capability IDs only. REQUIRED and all ordering edges must be acyclic; track number and table row order are not learning order. This is not the complete Step-3 graph.

## Dependency registry

| From | To | Relation | Why prior context matters | Assumed slice | Ownership note |
|---|---|---|---|---|---|
| prog-errors-results | prog-api-refactoring-change-safety | REQUIRED | A safe API refactor must preserve or deliberately migrate the caller-visible failure/result behavior. | observable error/result contract and failure semantics | — |
| prog-invariants-domain-model | prog-api-refactoring-change-safety | REQUIRED | Change safety is evaluated against state and behavior that must remain true. | valid state and behavior invariant | — |
| prog-composition-dependencies | prog-api-refactoring-change-safety | RECOMMENDED | Dependency seams make impact isolation easier during refactor, although the target can recap them. | dependency boundary and composition seam | — |
| runtime-managed-execution | runtime-memory-roots-lifetime | REQUIRED | Root/lifetime reasoning assumes a managed runtime owns reachability inside a process while OS is separate. | managed runtime/process boundary | — |
| runtime-memory-roots-lifetime | runtime-allocation-gc | REQUIRED | GC work depends on which allocated objects remain reachable from roots. | reachability from GC roots | — |
| runtime-allocation-gc | runtime-retention-pooling-large-objects | REQUIRED | Pooling and retention must be separated from ordinary allocation and collection churn. | allocation pressure and collection behavior | — |
| runtime-diagnostics | runtime-memory-performance-debug | REQUIRED | Memory diagnosis chooses counter, trace, dump or profile from a hypothesis. | hypothesis-driven evidence selection | Runtime owns runtime evidence; target synthesizes it |
| runtime-retention-pooling-large-objects | runtime-memory-performance-debug | REQUIRED | The diagnostic must distinguish churn, deliberate pool retention and retained object graphs. | allocation vs pooling vs retention | — |
| os-virtual-memory-page-cache | runtime-memory-roots-lifetime | RECOMMENDED | Process VM context helps separate managed reachability from OS memory representation, but roots can be introduced locally. | process virtual-memory boundary | OS owns VM mechanism |
| runtime-diagnostics | runtime-retention-pooling-large-objects | RECOMMENDED | Heap/allocation evidence helps verify a pool is useful rather than hiding retention. | allocation and heap evidence selection | — |
| os-process-thread-kernel | os-files-handles-sockets-ipc | REQUIRED | Handle/socket ownership assumes a process crosses into OS-managed resource state. | process resource context and user/kernel boundary | — |
| os-files-handles-sockets-ipc | os-blocking-io-waits | REQUIRED | I/O waiting is explained by an OS-managed file/socket operation completing externally. | finite OS resource operation and external completion | — |
| os-process-thread-kernel | os-scheduling-starvation | REQUIRED | Starvation needs the model of finite runnable threads scheduled for execution. | runnable execution unit and scheduling boundary | — |
| os-process-thread-kernel | os-termination-graceful-shutdown | REQUIRED | Graceful shutdown begins at the process lifetime and termination boundary. | process lifetime and termination | — |
| os-process-thread-kernel | os-virtual-memory-page-cache | REQUIRED | Page-cache intuition starts from a per-process virtual address-space boundary. | virtual address-space boundary | — |
| os-process-thread-kernel | os-resource-exhaustion | REQUIRED | Resource exhaustion includes finite thread, process and memory capacity beyond handles. | finite thread/process/memory resources | Independent slice from handle exhaustion |
| os-files-handles-sockets-ipc | os-resource-exhaustion | REQUIRED | Exhaustion also depends on finite handle/socket ownership and lifetime. | handle/socket capacity and lifetime | — |
| prog-invariants-domain-model | concurrency-interleavings-invariants | REQUIRED | Concurrent transitions need an invariant whose violation can be observed. | state invariant under transition | Programming owns invariant definition |
| concurrency-interleavings-invariants | concurrency-synchronization-atomicity | REQUIRED | Atomicity protects a critical transition exposed by unsafe interleaving. | unsafe interleaving and critical transition | — |
| concurrency-interleavings-invariants | concurrency-races-check-then-act | REQUIRED | Check-then-act failure assumes state can change between separate operations. | interleaved shared-state change | — |
| concurrency-interleavings-invariants | concurrency-memory-visibility | REQUIRED | Visibility matters when execution contexts observe shared mutable state. | shared state across execution contexts | — |
| concurrency-synchronization-atomicity | concurrency-deadlock-starvation | REQUIRED | Deadlock reasoning needs synchronization ownership and wait relationships. | synchronization ownership and wait | — |
| os-blocking-io-waits | concurrency-async-parallelism | REQUIRED | Async distinction assumes work can wait for external I/O rather than consume CPU. | external I/O wait lifetime | OS owns wait mechanism |
| os-scheduling-starvation | concurrency-async-parallelism | RECOMMENDED | Scheduler capacity helps separate async waiting from starvation, but async can be introduced without it. | runnable-capacity and scheduler delay | — |
| concurrency-async-parallelism | concurrency-cancellation-lifetime | REQUIRED | Cancellation applies to a logical async operation that may outlive one thread. | async operation lifetime | — |
| prog-resource-ownership | concurrency-cancellation-lifetime | REQUIRED | Ending work safely requires knowing who owns operation and resource lifetime. | ownership and authority to end lifetime | Programming owns resource ownership |
| concurrency-async-parallelism | concurrency-bounded-backpressure | REQUIRED | Bounded work assumes many operations can be in flight against finite capacity. | concurrent in-flight operations | — |
| concurrency-races-check-then-act | concurrency-local-vs-distributed | REQUIRED | Local protection scope is visible only after reasoning about competing transition authority. | synchronization authority scope | — |
| os-files-handles-sockets-ipc | net-tcp-connection-semantics | REQUIRED | TCP connection reasoning starts with finite OS-managed socket state and lifetime. | socket state, lifetime and resource | OS owns socket mechanism |
| net-tcp-connection-semantics | net-tls-trust-handshake | RECOMMENDED | Transport context makes TLS-over-connection intuitive, though identity/trust can be taught independently. | established transport connection | Networking owns both boundaries |
| net-tcp-connection-semantics | net-connection-reuse-pooling | REQUIRED | Reuse only makes sense when a connection can survive several HTTP operations. | establishment, lifetime and closure | — |
| net-http-semantics | net-proxy-lb-forwarded-boundary | REQUIRED | Forwarded headers are HTTP protocol data whose rewrite/trust meaning the target evaluates. | request and header semantics | — |
| net-tls-trust-handshake | net-proxy-lb-forwarded-boundary | RECOMMENDED | TLS termination at a proxy clarifies which boundary the application may trust, but HTTP proxy basics stand alone. | TLS termination boundary | — |
| net-http-semantics | net-streaming-body-cancellation | REQUIRED | Streaming body lifetime is part of a finite HTTP request/response operation. | HTTP body and transfer lifetime | — |
| concurrency-cancellation-lifetime | net-streaming-body-cancellation | REQUIRED | Stopping transfer work cooperatively assumes cancellation and operation-lifetime semantics. | cooperative cancellation and lifetime | Concurrency owns cancellation mechanics |
| prog-resource-ownership | net-streaming-body-cancellation | RECOMMENDED | Stream/buffer ownership improves disposal and pooling reasoning; the target can recap it. | stream and buffer lifetime ownership | — |
| net-request-path-dns | net-failure-localization-unknown-outcome | REQUIRED | Failure localization must recognize DNS as a pre-connection stage. | name-resolution failure stage | — |
| net-tcp-connection-semantics | net-failure-localization-unknown-outcome | REQUIRED | The target separates connection/reset/lifetime failure from later stages. | connection establishment and reset stage | — |
| net-tls-trust-handshake | net-failure-localization-unknown-outcome | REQUIRED | The target needs TLS trust/negotiation as a stage distinct from TCP and HTTP. | TLS negotiation and trust stage | — |
| net-http-semantics | net-failure-localization-unknown-outcome | REQUIRED | An HTTP response proves the path reached a later stage than DNS, TCP or TLS. | response semantics as stage evidence | — |

## Batch-A audit

- Dependency rows: 40
- REQUIRED: 33
- RECOMMENDED: 7
- No non-edge was stored. In particular, no edge is added from async to check-then-act races, VM to allocation/GC, TCP to HTTP semantics, generics to all adapters, or collection complexity to diagnostics.
- Cycle and frozen-ID validation applies only to Batch A; this does not claim the complete Step-3 graph exists or has been audited.

## Pending batches

Batches B–D will add approved targets for Tracks 6–17. No lesson IDs, progression schema, learner locks, UI, hours or case bank are introduced here.
