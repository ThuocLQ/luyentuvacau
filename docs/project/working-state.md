# QuanNet Working State

> **Purpose:** Small, current handoff surface for humans and agents. This file points to canonical authorities and records the workflow cursor. It must not duplicate full policy or architecture specifications.
>
> **Last updated:** 2026-10-08
>
> **Expected branch:** `codex/senior-backend-evidence-map`
>
> **Final Stage 1D seal commit:** `b0523472726c5e5230a512ac855e9dbcdd9f0cec`
>
> **Stage 1F canonical materialization commit:** `2d410ddc325b47a0f17fed1890713c103c8181b4`
>
> **Stage 1F validation seal:** `df4d0ed58b87a3632086c0e0ddfb6adbc3a52c55`

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

**Stage 2 - Learning-Unit dependency/progression projection**

Stage 2A: **MECHANICAL INVENTORY VERIFIED**.

Stage 2B Foundations - **SEALED** after external review. Seal reference: c40ccdf8fb65f8830d3b3ef6360fca634bf94054.

Final Foundations result: 20 Local; 5 External; 9 surfaced RECOMMENDED; 1 intentionally not surfaced; external candidate graph ACYCLIC.

Stage 2C Data - **SEALED** after external review. Seal reference: 5cd6cb509768d5033a0430fa287be82fd026df36.

Final Data result: 11 Local; 17 External; 15 surfaced RECOMMENDED; 8 intentionally not surfaced; external candidate graph ACYCLIC.

Stage 2 rules: capability dependency != learner progression; REQUIRED does not automatically create a hard lock; external candidate != whole-source-unit PASSED; RECOMMENDED is always non-blocking; track/document order is not curriculum order; final external graph must be acyclic and preserve multiple roots; QuanNet locks progression, not curiosity, and learner content remains viewable when progression is gated.

Stage 2D Distributed Interaction - **SEMANTIC REVIEW IN_REVIEW**. Candidate until external seal: 29 Local / 16 External REQUIRED (14 Local / 11 External same-owner; 15 Local / 5 External cross-owner); 21 surfaced RECOMMENDED; 3 intentionally not surfaced; 45 REQUIRED / 24 RECOMMENDED; 16 External unit pairs; candidate graph ACYCLIC.

Stage 2 batches: A Foundations - SEALED; B Data - SEALED; C Distributed Interaction - IN_REVIEW; D Production Safety - PENDING; E Delivery & Verification - PENDING; F Architecture Synthesis - PENDING.

Forward workflow: Stage 2A inventory -> semantic batches A-F -> global synthesis -> proxy fairness -> over-gating/cycle validation -> canonical materialization -> Stage 2 seal -> Golden Pilot -> human pilot acceptance -> reusable authoring pattern -> complete first chapter -> chapter release acceptance -> user learning + parallel Codex development. See `docs/project/first-chapter-delivery-plan.md`.

## Important current facts

- Frozen capabilities: **167**.
- Dependency graph: **332** relations = **201 REQUIRED + 131 RECOMMENDED**.
- Primary homes: **167**.
- Learning Units: **137** = **111 singleton + 26 multi**.
- Single-owner units: **135**.
- Multi-owner units: **2**.
- Service & Network: **25 current final units** and REVIEWED.
- Distributed Systems: **21 current final units** and REVIEWED by `29e1b0a05e8ed1f08270c04395a42a20886a97ec`.
- Production Engineering: **30 Primaries → 26 final units = 22 singleton + 4 multi**, including **2 multi-owner** units; **REVIEWED / SEALED**.
- Stage 1F: **12 historical units; 8 KEEP / 3 SPLIT / 1 MERGE; 20 Primaries; 17 final units = 14 singleton + 3 multi; 0 new multi-owner**.
- Stage 1 Learning-Unit semantic decomposition: **SEALED**.
- Dependency / Learning-Unit progression projection: **NOT FINALIZED**.
- `stage-1-review-manifest.json` baseline remains `412216c591404480a6539f220ea324f9ec53af56`; original scope plus declared amendment scope must equal the current frozen capability set.
- The repaired dependency registry keeps all 14 amendment relations inside its canonical section.

## Exact next task

- Stage 2D Local 29/29 reviewed.
- Stage 2D External 16/16 reviewed at batch level.
- Stage 2D RECOMMENDED 24/24 implementation complete, pending independent final acceptance.
- Stage 2D remains IN_REVIEW.

Exact next task: Independently review all 69 Stage 2D relations, over-gating, proxy fairness, external graph and cross-artifact consistency. Seal Stage 2D only if all acceptance gates pass. Then proceed to Production Safety.

## Stop conditions

Do not reopen sealed Stage 1D, reset historical baselines, rewrite audit history, broaden curriculum scope, or modify learner-facing content without a separately authorized task.
