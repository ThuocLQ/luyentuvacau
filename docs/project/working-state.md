# QuanNet Working State

> **Purpose:** Small, current handoff surface for humans and agents. This file points to canonical authorities and records the workflow cursor. It must not duplicate full policy or architecture specifications.
>
> **Last updated:** 2026-10-04
>
> **Expected branch:** `codex/senior-backend-evidence-map`
>
> **Last materialization commit:** `5f09fb85e87bfeadce0d7d82a78ffdc50ccc36f1`

## Bootstrap

1. Read this file.
2. Verify actual branch/ref and HEAD.
3. Read `AGENTS.md`.
4. Read only the canonical authorities needed by the current task.
5. If Git differs from this file, inspect the intervening commits before proceeding; update this file after the state is understood.

## Canonical authorities

| Concern | Authority |
|---|---|
| Architecture execution / mutation semantics | `docs/roadmap/architecture-execution-protocol.md` |
| Capability → Learning Unit decomposition semantics | `docs/roadmap/lesson-decomposition-contract.md` |
| Frozen Senior Backend capability map | `docs/roadmap/senior-backend-deep-track.md` |
| Frozen capability dependency graph | `docs/roadmap/dependency-map.md` |
| Current Learning Unit state | `docs/roadmap/learning-unit-map.md` |
| Learning Unit audit / Stage-1 status | `docs/roadmap/learning-unit-audit.md` |
| Foundation gap evidence | `docs/roadmap/foundation-coverage-audit.md` |
| Stage-1 baseline/review scope | `docs/roadmap/stage-1-review-manifest.json` |
| Durable rationale/history | `docs/project/decision-log.md` |

## Current phase

**Pre-Stage 1D — repaired controlled foundation amendment.**

The Foundation Coverage Audit amendment is **MATERIALIZED** by `5f09fb85e87bfeadce0d7d82a78ffdc50ccc36f1`.

- Core additions: service discovery/load balancing; applied cryptography for credentials/tokens; data encryption/key lifecycle; durable background jobs/scheduling.
- Stream Processing remains a deferred specialization.
- Stage 1D has **NOT** started.

## Important current facts

- Frozen capabilities: **167**.
- Dependency graph: **332** relations = **201 REQUIRED + 131 RECOMMENDED**.
- Learning Units: **114** = **80 singleton + 34 multi**, with **167 Primary homes**.
- Service & Network: **25 current final units** and REVIEWED only while its scoped amendment gate passes.
- Distributed Systems remains **PENDING**.
- `stage-1-review-manifest.json` baseline remains `412216c591404480a6539f220ea324f9ec53af56`; original scope plus declared amendment scope must equal the current frozen capability set.
- The repaired dependency registry keeps all 14 amendment relations inside its canonical section.

## Exact next task

External review/seal of the repaired controlled foundation amendment. Do not start Stage 1D until that review passes.

## Stop conditions

Do not start Stage 1D, reset historical baselines, rewrite audit history, broaden curriculum scope, or modify learner-facing content without a separately authorized task.
