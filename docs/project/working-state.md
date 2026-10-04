# QuanNet Working State

> **Purpose:** Small, current handoff surface for humans and agents. This file points to canonical authorities and records the workflow cursor. It must not duplicate full policy or architecture specifications.
>
> **Last updated:** 2026-10-04
>
> **Expected branch:** `codex/senior-backend-evidence-map`
>
> **Last architecture-reviewed HEAD before continuity metadata:** `31d4cbbbf0d381886e2ed10f8021c3a45e57f070`

## Bootstrap

On a new session:

1. Read this file.
2. Verify actual branch/ref and HEAD.
3. Read `AGENTS.md`.
4. Read only the canonical authorities needed by the current task.
5. If Git differs from this file, inspect the intervening commits before proceeding; update this file after the state is understood.

Do not reconstruct unfinished work from chat memory when repository state can answer it.

## Canonical authorities

| Concern | Authority |
|---|---|
| Learner-first learning design | `docs/engineering-learning-standard.md` |
| Architecture execution / mutation semantics | `docs/roadmap/architecture-execution-protocol.md` |
| Capability → Learning Unit decomposition semantics | `docs/roadmap/lesson-decomposition-contract.md` |
| Frozen Senior Backend capability map | `docs/roadmap/senior-backend-deep-track.md` |
| Frozen capability dependency graph | `docs/roadmap/dependency-map.md` |
| Current Learning Unit state | `docs/roadmap/learning-unit-map.md` |
| Learning Unit audit / Stage-1 status | `docs/roadmap/learning-unit-audit.md` |
| Foundation gap evidence | `docs/roadmap/foundation-coverage-audit.md` |
| Stage-1 baseline/review scope | `docs/roadmap/stage-1-review-manifest.json` |
| Durable rationale/history | `docs/project/decision-log.md` |

## Mission guardrails

QuanNet is a learner-first engineering mastery system, not a content library or interview-cram catalog.

Learning design remains mastery-oriented: explain prerequisite mechanisms before dependent mechanisms; keep core lessons self-contained; use Concept Origin Before Definition; connect simplified models to observable evidence; require runnable practice, failure/debug reasoning, transfer and recall where appropriate.

Capability boundaries describe engineering competence. Learning Units describe pedagogical/assessment boundaries. They are not one-to-one by default.

## Current phase

**Pre-Stage 1D — controlled foundation capability amendment preparation.**

The Foundation Coverage Audit is complete. Current audit result: COVERED 40, IMPLICIT 5, TRUE GAP 5.

Durable disposition:

- ADD to core: service discovery/load balancing.
- ADD to core: applied cryptography for credentials/tokens.
- ADD to core: data encryption/key lifecycle.
- ADD to core: durable background jobs/scheduling.
- DEFER from core: stream processing; specialization candidate.

No controlled amendment has been materialized yet.

## Important current facts

- Frozen capabilities: **163**.
- Dependency graph: **318** relations = **194 REQUIRED + 124 RECOMMENDED**.
- Learning Units: **110** = **76 singleton + 34 multi**, with **163 Primary homes**.
- `Service & Network` is REVIEWED and must explicitly reopen for its three new amendment capabilities.
- `Distributed Systems` is PENDING.
- `stage-1-review-manifest.json` baseline remains `412216c591404480a6539f220ea324f9ec53af56`; do not replace it to hide amendments.
- The validator must become amendment-aware before the capability amendment can safely close.
- At architecture HEAD `31d4cbbb`, `validate:content`, `validate:architecture`, and `test:architecture` passed; `npm run check` later failed only at the existing Golden Learning Lab test.

## Exact next task

Perform one bounded **controlled foundation capability amendment**. Do not start Stage 1D.

Required semantic decisions:

1. `net-service-discovery-load-balancing` → `Networking & HTTP`, L3, `Service & Network`.
2. `sec-cryptography-credentials-tokens` → `Security`, L2, `Service & Network`.
3. `sec-data-encryption-key-lifecycle` → `Security`, L2, `Service & Network`.
4. Durable background jobs/scheduling → verify `Messaging & Event-Driven Consistency` is a coherent canonical owner before fixing the final capability ID/owner; otherwise `DEFER_BLOCKER`.
5. Stream Processing remains deferred specialization.

The amendment must preserve audit history and baseline history, make amendment scope explicit in the manifest, harden production validation, update all Primary homes/LU registries, deliberately add real dependency edges, recompute graph counts/fingerprint, revalidate Service & Network, keep Distributed Systems PENDING, and run real validation.

## Stop conditions

Do not start Stage 1D, reset historical baselines, create technology-named tracks by default, force one capability = one Learning Unit, merge merely to reduce count, accept machine PASS as semantic proof, rewrite audit history, or broaden into unrelated learner-facing work.

## Closing rule

After the amendment commits, update this file with the new architecture HEAD, final counts, real validation results, blockers, and the exact next task.
