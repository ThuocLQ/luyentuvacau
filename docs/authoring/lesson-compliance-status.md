# QuanNet Learning Compliance Status

Canonical standard: [engineering-learning-standard.md](../engineering-learning-standard.md)

This is lifecycle memory, not another authoring standard. Read it before broadly reopening a mature lesson.

Lifecycle:

- **Draft** — incomplete or actively authored.
- **Technical candidate** — mechanism, research and code exist; technical hardening is unfinished.
- **Ready for human study** — technical review is sufficient for real learner testing.
- **Human study in progress** — a learner has produced friction evidence for this lineage; the current version has not yet completed a clean validation cycle.
- **Human validated** — a learner completed this exact learner-facing version successfully; broad rewrites need new evidence.

## Index & Execution Plan

Status: **Human study in progress**
Research: [index-execution-plan-source-map.md](../research/index-execution-plan-source-map.md)

Known state:
- Concept Origin and PostgreSQL 17 boundary are explicit.
- plan evidence, estimate experiment and the learner-reported vocabulary patch are applied.
- visual semantics distinguish scan metadata from plan operators.

Reopen only to finish this learner-evidence cycle, for a factual correctness issue, a concrete UI bug, or a material PostgreSQL-version change.

## Race Condition & Concurrency

Status: **Ready for human study — Golden Pilot**
Research: [race-condition-source-map.md](../research/race-condition-source-map.md)

Known state:
- controlled interleaving exposes the invariant before naming the race.
- local versus multi-instance correctness boundary is explicit.
- console lab now states its observable output contract, includes failure/debug evidence and separates L1–L4 technical checks from an optional English explanation.
- this is the selected first Golden Pilot; it is not Human validated until a real learner studies this exact version and records friction evidence.

Reopen only for learner evidence, factual correctness issue, concrete UI bug, or a material runtime-version change.

## Outbox & Idempotency

Status: **Ready for human study**
Research: [outbox-idempotency-source-map.md](../research/outbox-idempotency-source-map.md)

Known state:
- causal dual-write → Outbox → relay duplicate → idempotent consumer flow is explicit.
- local simulation visibly separates duplicate delivery from a single local business effect.
- external-provider uncertainty and broker/client contract boundaries are explicit.

Reopen only for learner evidence, factual correctness issue, concrete UI bug, or a material database/broker contract change.
