# Observability, Testing & Production Incidents

## Mental Model

Observability lets an operator ask new questions from production evidence. Logs explain events, metrics show trends and traces show a request path. Incident response stabilizes users before satisfying curiosity.

## Must Remember

- Instrument golden signals: latency, traffic, errors and saturation.
- Propagate correlation/trace IDs across HTTP and messages.
- Log structured fields, never secrets; sample noisy success logs.
- Test behavior at the right boundary: unit for rules, integration for persistence, contract for service interfaces.
- Define SLOs and alerts on user impact, not CPU alone.

## Quick Comparison

| Signal | Answers |
|---|---|
| Metrics | Is the system degrading, and how broadly? |
| Logs | What happened for this event? |
| Traces | Which dependency or hop consumed time? |

## Production Traps

- Logging request bodies leaks credentials and PII.
- Alerting on every error creates fatigue; alert on burn rate or sustained impact.
- Restarting everything destroys evidence and can amplify load.

## Senior Trade-offs

High-cardinality labels make diagnosis easy but can make telemetry unaffordable. Retain detailed data around incidents and aggregate routine paths. A rollback is often safer than an urgent hotfix when the blast radius is unknown.

## Senior Answer Pattern

Describe incident work as a timeline: detect impact, stabilize, compare change windows, inspect traces and dependency signals, communicate, then document prevention. Include a decision rule for rollback and a concrete follow-up such as an SLO, load test, runbook or release guard.

## Interview Questions

### What do you do when p99 doubles after deployment?

**Short answer:** Confirm impact, compare deploy and traces/metrics, then roll back or disable the change if that restores safety. Preserve evidence, communicate, and run root cause analysis after stabilization.

**Follow-up:** Which dashboard first? What is your rollback criterion?

**Red flags:** “Read all logs before taking action.”

## Final Recall

- Trace requests across boundaries.
- Alert on user impact.
- Stabilize before diagnosing.
- Make tests and telemetry part of delivery.
