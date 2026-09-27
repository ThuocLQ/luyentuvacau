# QuanNet Learning Compliance Status

Canonical standard: [engineering-learning-standard.md](../engineering-learning-standard.md)

This is lifecycle memory, not another authoring standard. Read it before broadly reopening a mature lesson.

## Index & Execution Plan

Status: Human-validation / technically hardened  
Research: [index-execution-plan-source-map.md](../research/index-execution-plan-source-map.md)

Known state:
- Concept Origin and PostgreSQL 17 boundary are explicit.
- plan evidence, estimate experiment and vocabulary-friction audit are hardened.
- visual semantics distinguish scan metadata from plan operators.

Reopen only for real learner evidence, factual correctness issue, concrete UI bug, or a material PostgreSQL-version change.

## Race Condition & Concurrency

Status: Human-validation / technically hardened  
Research: [race-condition-source-map.md](../research/race-condition-source-map.md)

Known state:
- controlled interleaving exposes the invariant before naming the race.
- local versus multi-instance correctness boundary is explicit.
- console lab and vocabulary-friction audit are hardened.

Reopen only for real learner evidence, factual correctness issue, concrete UI bug, or a material runtime-version change.

## Outbox & Idempotency

Status: Human-validation / technically hardened  
Research: [outbox-idempotency-source-map.md](../research/outbox-idempotency-source-map.md)

Known state:
- causal dual-write → Outbox → relay duplicate → idempotent consumer flow is explicit.
- crash-state visual and local simulation lab identify durable evidence.
- external-provider unknown outcome, recovery and reconciliation boundary are explicit.

Reopen only for real learner evidence, factual correctness issue, concrete UI bug, or a material database/broker contract change.