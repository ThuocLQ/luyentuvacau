# QuanNet Progression and Gating — Phase 1

> **Status:** Candidate product semantics. This is a policy specification, not application code, database schema or UI design.

## Core invariant

A required next lesson unlocks only after its declared prerequisite competence has been demonstrated.

Conceptually:

```text
can_access(user, lesson)
= lesson is published and available
  AND prerequisite_satisfied(user, dependency)
      for every required dependency
```

The future frontend may display this decision but must not be authoritative for it. A later trusted server/database implementation must evaluate access and concurrent results. The current localStorage progress implementation is a **local simulation**, not an access-control authority.

Historical `PASSED` is not automatically active prerequisite satisfaction. Conceptually:

```text
prerequisite_satisfied(user, dependency)
= compatible pass evidence exists
  OR required revalidation has been satisfied
```

A material compatibility/prerequisite policy may leave a new dependency unsatisfied while historical `PASSED` remains visible. It must name the scoped revalidation required; previously learned and reference content remain accessible. Weak ordinary recall never changes prerequisite satisfaction or requests revalidation.

## What a gate is

A gate is a named opportunity to collect evidence for a particular requirement. It is not a generic completion button and not every lesson needs every gate type.

| Gate type | Learning question it can support |
|---|---|
| Prediction | What model does the learner hold before reveal? |
| Knowledge check | Can the learner distinguish a focused concept? |
| Interactive trace | Can the learner follow state through a controlled sequence? |
| Hands-on / lab evidence | Can the learner run and inspect a mechanism? |
| Canonical challenge | Can the learner solve the normal case independently? |
| Debug challenge | Can the learner reason from symptoms and evidence? |
| Explain-back | Can the learner communicate the mechanism and boundary? |
| Transfer / Boss challenge | Can the learner choose and reason in an unseen production-like variation? |

Each gate is either:

- **REQUIRED** — it contributes to `PASSED`; a non-satisfied result blocks declared dependent progression.
- **SUPPORTING** — it records useful practice or review evidence, but does not block immediate progression.

This distinction prevents over-gating while keeping actual prerequisite boundaries honest.

## Required access and unlock behavior

Required curriculum dependencies form an acyclic graph, not merely lesson N → lesson N+1.

```text
Lesson A ──┐
           ├── Lesson C
Lesson B ──┘
```

If both A and B are passed, C becomes `AVAILABLE`. If the graph allows it, multiple lessons can be available together. Recommendation order and access permission are separate concepts.

May be locked:

- dependent required lessons;
- boss gates;
- track milestones.

Must not be locked:

- glossary, references and source docs;
- optional videos and further learning;
- curiosity/exploration material;
- already passed lessons.

QuanNet locks progression, not curiosity. Optional content may declare `recommended_after` without blocking the main path.

## Passing a lesson

Conceptually:

```text
lesson PASSED
when every mandatory progression gate
for one coherent active gate-policy version is satisfied
```

Do not derive PASS from scroll percentage, time spent, mark-complete clicks, self-ratings or one opaque global score. A pass marks credible current prerequisite evidence, not durable mastery. `PASSED` remains the progression truth while a separate retention/mastery status can be `RETAINING` or `MASTERED`.

## Prediction and answer-reveal policy

Prediction can be required because the learner must commit a mental model before reveal. Correctness does not have to be required:

```text
prediction submitted ≠ prediction correct
```

A wrong prediction followed by correct evidence-based reasoning may satisfy the intended learning step when the gate policy says that reasoning is what matters.

When assistance is `answer_revealed` on a gate designed to prove independent capability, the result is `practice_only`. Immediately retrying the same exposed case cannot become independent evidence. The later policy should present an equivalent variation when independent proof is still needed.

## Gate-result semantics

Every meaningful result should conceptually retain:

| Field | Purpose |
|---|---|
| outcome | `satisfied`, `not_satisfied`, `practice_only` or `needs_review` |
| attempt | Preserved chronological attempt identity/count |
| content ID and version | What learner-facing material was used |
| gate-policy ID and version | Which complete required/supporting gate set defines PASS |
| gate ID and version | Which individual gate and evaluator applied |
| assistance level | `none`, `hint`, `guided` or `answer_revealed` |
| evidence summary | Why the result did or did not satisfy the requirement |
| evaluated time | When the policy evaluated it |

These are conceptual result semantics only; Phase 1 intentionally does not invent database tables.

## Version compatibility invariant

Each evaluation keeps its original `content_id`, `content_version`, `gate_policy_id`, `gate_policy_version`, `gate_id` and `gate_version`.

`gate_version` identifies one individual gate definition/evaluator. `gate_policy_version` identifies the complete required/supporting gate set that defines PASS. For example:

```text
Index Foundation — Policy v3
├── Prediction Gate v2
├── Lab Evidence Gate v4
├── Debug Gate v1
└── Explain-back Gate v3
```

A PASS is evaluated against one coherent gate-policy version, or against an explicitly declared compatibility mapping between versions. The system must not silently infer policy compatibility from matching gate IDs.

For example, Policy v1 may have Gate A ✓ and Gate B ✓ while Policy v2 has Gate C ✓. Those individual results cannot create `PASS v2` unless a compatibility mapping explicitly declares that v1 evidence satisfies the required policy-v2 requirements. When a new version is published, compatible old evidence may carry forward only after an explicit compatibility decision. Incompatible evidence remains historical evidence but cannot silently satisfy the active policy; attempts are never deleted.

## Retry and failure policy

```text
record attempt
→ evaluate against gate policy
→ retain result and evidence summary
→ show the smallest useful remediation when needed
→ allow retry according to policy
```

Defaults:

- preserve every attempt; never overwrite failure history;
- do not reset the whole lesson after one failure;
- do not use arbitrary punitive cooldowns by default;
- preserve earlier valid evidence;
- if answer reveal removed independence, require a later equivalent variation rather than a same-case repeat;
- keep only the required dependent content locked while evidence is missing.

## Unlock flow and consistency

From the learner's perspective, completing the last required gate should behave atomically:

```text
record attempt
→ evaluate gate
→ if final required gate is satisfied, preserve historical lesson PASSED
→ evaluate each active dependency through compatibility/revalidation policy
→ make newly eligible lessons AVAILABLE
→ set retention/mastery status to RETAINING and schedule review
```

The later technical implementation must make duplicate submit/retry and concurrent completion safe. It must not double-count evidence or produce contradictory unlock state. Later weak recall may move retention/mastery from MASTERED to RETAINING, but must not change historical PASSED, active prerequisite satisfaction or re-lock dependents. Only explicit material version/prerequisite compatibility policy may require scoped revalidation.

## Lock transparency

A future UI must explain a lock as requirements and remaining evidence, not only show an icon.

```text
Required:
✓ Index Foundation
✓ Plan evidence
○ Composite Index classic case
○ Explain index choice without notes

2 / 4 satisfied
```

The learner must see why access is locked, what remains and which action can resolve it.

## Boss gates

A boss challenge is a transfer-oriented gate, not a harder definition quiz. It should:

- avoid naming the concept the learner should choose;
- supply production-like symptoms and inspectable evidence;
- include competing hypotheses;
- require mechanism plus evidence-based reasoning;
- reveal the answer only after a meaningful attempt;
- treat a revealed boss case as practice until an equivalent independent case exists.

## Pilot gate policy examples

| Pilot | Required candidate gates | Later retention/mastery gates |
|---|---|---|
| Index & Execution Plan | prediction; plan/evidence interpretation; canonical index case; debug case; explain-back | changed-distribution variation; unseen plan; cross-engine transfer |
| Race Condition & Concurrency | overlap prediction; controlled reproduction; invariant identification; synchronization application; boundary explain-back | new interleaving; multi-instance transfer |
| Outbox & Idempotency | crash prediction; publish-attempt vs consumer-delivery distinction; duplicate delivery with one local effect; unknown external outcome; explain-back | provider-contract variation; broker/client-assumption variation |

These examples demonstrate a common policy shape without introducing a special-case architecture for any pilot.

## Edge-case requirements for later phases

Later design and implementation must explicitly support the following; Phase 1 does not solve them with SQL.

| Case | Required behavior |
|---|---|
| Duplicate submit caused by retry/network | Same logical attempt must not create contradictory or double unlock results. |
| Two browser tabs complete final gate concurrently | One coherent learner-visible pass/unlock result; preserve both attempts if distinct. |
| Lesson version changes while in progress | Attribute each evaluation to original content, gate-policy and gate versions. Carry old evidence forward only through an explicit compatibility mapping; otherwise retain historical PASS/attempts, explain the scoped revalidation and leave only newly gated dependencies unsatisfied. |
| Answer revealed before independent pass | Record practice evidence and offer equivalent independent variation later. |
| Challenge-out pass | Accept only equal-or-stronger evidence; record how it was earned. |
| Lesson with multiple prerequisites | Evaluate all required graph edges, then show which ones remain. |
| Multiple lessons unlock at once | Make each eligible lesson AVAILABLE; do not force a false linear order. |
| Weak later recall | Lower retention/mastery confidence and schedule review; historical PASS and active prerequisite satisfaction remain unchanged. |
| Material correctness change to a passed lesson | Keep historical PASS and attempts visible; explicit compatibility policy may require scoped revalidation before new dependencies are satisfied. |
| Legacy localStorage migration | Preserve/label legacy confidence appropriately; do not falsely convert it into authoritative pass evidence. |
| Remote/local progress conflict | Resolve with preserved attempt history and visible reconciliation; do not silently discard evidence. |
| Optional branch incomplete while main path continues | Keep main required path open when its own prerequisites are satisfied. |

## Phase 1 cross-review

| Perspective | Gate-policy conclusion |
|---|---|
| Learning integrity | Required gates collect reasoning/application evidence rather than page exposure. |
| Progression integrity | Only active prerequisite satisfaction unlocks required dependents; historical `PASSED` stays visible while retention/mastery can change. |
| Version integrity | Results retain content, gate-policy and gate versions plus assistance; PASS uses one coherent policy version or declared compatibility mapping. |
| Product simplicity | A gate has a small explicit result vocabulary, not a hidden global score. |
| UX transparency | Each lock identifies remaining requirements and the action that can resolve it. |
| Future technical enforceability | A trusted future evaluator can make attempt, pass and unlock behavior consistent under retry/concurrency. |

### Gate-policy dependency review

- Required edges are acyclic and each gate maps to a declared prerequisite capability.
- Optional recommendations never create hidden blocking edges.

### Gate-policy measurement review

- Exposure signals are never substituted for competence evidence.
- Assistance and version context stay attached to results.

### Gate-policy learning review

- Prediction tests the mental model before reveal.
- Failure produces targeted remediation and later variation, not punishment.

### Gate-policy UX review

- Locks expose the missing requirements and next useful action.
- Already passed learning remains accessible; curiosity materials stay open.

### Gate-policy technical-integrity review

- Future authoritative evaluation is server/database-side, not frontend-only.
- Attempt recording, pass evaluation and dependency unlock must be consistent under retry and concurrency.

## Deliberately deferred

Phase 1 does not define UI components, access-control APIs, Supabase, SQL, tables, RLS, migration algorithm, specific scoring thresholds, final retry limits, AI evaluation or a new curriculum roadmap. Those decisions need a separately reviewed technical/product phase.
