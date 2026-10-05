# Stage 1E Observability Review — Working Evidence

NON-CANONICAL WORKING REVIEW ARTIFACT. Final authority remains learning-unit-audit.md and learning-unit-map.md. Delete this file after Stage 1E materialization is externally sealed.

## Historical-unit decisions

| Historical unit | Decision | Proposed final unit(s) | Primary capabilities in each final unit | Reason |
|---|---|---|---|---|
| lu-obs-cardinality-sampling-cost | SPLIT | lu-obs-cardinality-sampling-cost; lu-obs-instrumentation-tracing | cardinality: obs-cardinality-sampling-cost; instrumentation/tracing: obs-instrumentation-context, obs-tracing-distributed-evidence | Instrumentation decides where meaningful telemetry and context are created; cardinality/sampling decides what can be retained affordably. State, evidence and failure loops differ. |
| lu-obs-db-io-downstream-attribution | SPLIT | lu-obs-latency-throughput-saturation; lu-obs-instrumentation-tracing; lu-obs-db-io-downstream-attribution; lu-obs-diagnostic-method | latency: obs-latency-throughput-saturation; instrumentation/tracing: obs-instrumentation-context, obs-tracing-distributed-evidence; attribution: obs-db-io-downstream-attribution; diagnostic: obs-diagnostic-method | Measurement, trace construction, locating a latency owner, and L4 diagnosis are independently assessable; L4 synthesis must not gate L2/L3 foundations. |
| lu-obs-load-test-benchmark-validity | KEEP | lu-obs-load-test-benchmark-validity | obs-load-test-benchmark-validity | Workload representativeness, warm-up, generator validity and bottleneck similarity form one experiment-validity mechanism. |
| lu-obs-logs-structured-correlation | SPLIT | lu-obs-logs-structured-correlation; lu-obs-signals-correlation | logs: obs-logs-structured-correlation; signals: obs-signals-correlation | Structured logging is one concrete signal implementation; signal selection/correlation is reusable evidence-selection knowledge. |
| lu-obs-profiling-runtime-evidence | KEEP | lu-obs-profiling-runtime-evidence | obs-profiling-runtime-evidence | Profiling has its own capture, runtime evidence and hotspot/wait interpretation boundary. |

## Proposed final allocation

| Final unit | Primary capabilities |
|---|---|
| lu-obs-cardinality-sampling-cost | obs-cardinality-sampling-cost |
| lu-obs-instrumentation-tracing | obs-instrumentation-context; obs-tracing-distributed-evidence |
| lu-obs-latency-throughput-saturation | obs-latency-throughput-saturation |
| lu-obs-db-io-downstream-attribution | obs-db-io-downstream-attribution |
| lu-obs-diagnostic-method | obs-diagnostic-method |
| lu-obs-load-test-benchmark-validity | obs-load-test-benchmark-validity |
| lu-obs-logs-structured-correlation | obs-logs-structured-correlation |
| lu-obs-signals-correlation | obs-signals-correlation |
| lu-obs-profiling-runtime-evidence | obs-profiling-runtime-evidence |

## Proposed multi-capability unit

### lu-obs-instrumentation-tracing

- **Shared problem:** An order crosses API, worker and payment service, but the payment wait is invisible.
- **Shared mechanism:** Instrument semantic boundaries, create spans and propagate context across synchronous and asynchronous boundaries so one operation remains causally connected.
- **Shared evidence:** Trace tree, parent/child or link relation, operation ID, propagated headers/message metadata, dependency duration and retry attributes.
- **Shared failure/debug loop:** Context is lost at a worker, a span ends before background work, or downstream timing is detached from the initiating operation.
- **Bounded assessment:** Given API, worker and downstream traces plus instrumentation snippets, place the missing boundary/context propagation and prove the reconstructed causal path and downstream wait. This proves both context instrumentation and distributed trace evidence.

## Singleton merge review

| Proposed singleton | Strongest merge candidate | Why merge fails |
|---|---|---|
| lu-obs-cardinality-sampling-cost | lu-obs-instrumentation-tracing | Instrumentation proves where fields/context originate; cardinality proves whether dimensions/events can be retained within cost and fidelity limits. A trace can be well instrumented while still causing cardinality explosion or sampling away rare failures. |
| lu-obs-latency-throughput-saturation | lu-obs-db-io-downstream-attribution | Latency/throughput/saturation describes workload symptoms; attribution needs a separate causal decision about where time is spent. |
| lu-obs-db-io-downstream-attribution | lu-obs-diagnostic-method | Attribution asks for the responsible timing boundary; diagnostic method is L4 synthesis across hypotheses, experiments and confidence. |
| lu-obs-diagnostic-method | lu-obs-profiling-runtime-evidence | Profiling is one evidence source; diagnostic method must work with traces, logs, metrics, experiments and incomplete evidence. |
| lu-obs-load-test-benchmark-validity | lu-obs-latency-throughput-saturation | Measurements supply inputs, while validity assesses whether workload, warm-up, data and generator make a claim credible. |
| lu-obs-logs-structured-correlation | lu-obs-signals-correlation | Logs prove stable event schema/queryability; signals/correlation proves selection across metric, log and trace evidence. |
| lu-obs-signals-correlation | lu-obs-logs-structured-correlation | Signal selection requires choosing the minimum evidence set for a question; logging is only one implementation. |
| lu-obs-profiling-runtime-evidence | runtime-diagnostics | Runtime diagnostics owns collection mechanisms; this unit assesses interpreting CPU, allocation, stack and wait evidence for a production hypothesis. |

## Cross-owner considerations

No unresolved cross-owner merge is proposed by this Observability slice. The accepted instrumentation/tracing unit remains within the Observability & Performance owner. Runtime diagnostics remains a prerequisite/evidence source rather than a shared-assessment merge.
