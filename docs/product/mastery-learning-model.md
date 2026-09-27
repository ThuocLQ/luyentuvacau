# QuanNet Mastery Learning Model — Phase 1

> **Status:** Candidate product semantics. This document defines meaning before UI, database or Supabase implementation.
> 
> **Scope:** learner progression and mastery only. Authoring lifecycle remains in `docs/authoring/lesson-compliance-status.md`.

## Product principle

QuanNet rewards demonstrated competence, not content consumption. Opening a lesson, scrolling, reading time, a streak, marking a card complete or a self-rating can help navigation and reflection, but none is competence evidence.

The current browser implementation stores learner and review progress in `localStorage`. That is a **local simulation** of learner state, not an authoritative mastery record. This Phase 1 model is **code-ready** semantics for a later trusted server/database implementation.

## Three systems that must stay separate

| System | Question answered | Examples | Owner |
|---|---|---|---|
| Authoring lifecycle | Is this lesson ready to be studied? | Ready for human study, Human study in progress, Human validated | Authors; `lesson-compliance-status.md` |
| Learner progression | May this learner enter the next required learning step? | LOCKED, AVAILABLE, IN_PROGRESS, PASSED | Progression policy |
| Learner retention/mastery | How durable and transferable is demonstrated capability? | NOT_STARTED, RETAINING, MASTERED; L1–L4/E1–E4 evidence | Mastery and review policy |

No authoring status is a learner achievement. A learner cannot become `PASSED` because an author marked a lesson Human validated, and a lesson can be Human validated while a particular learner has never attempted it.

## Two orthogonal learner-state axes

```text
progression_status: LOCKED → AVAILABLE → IN_PROGRESS → PASSED

retention_status:   NOT_STARTED → RETAINING → MASTERED
                                      ↑             │
                                      └── weak later evidence ──┘
```

These are two independent state axes, not one mutually exclusive enum. The learner-facing UI may communicate the journey as `Locked → Learn → Pass → Retain → Master`, but domain semantics must retain both statuses.

### Progression status

| State | Meaning | Entry condition | What it does not mean |
|---|---|---|---|
| LOCKED | Required prerequisite competence is not yet demonstrated. | At least one required prerequisite is unsatisfied. | Curiosity content, glossary, references and optional learning must not be hidden. |
| AVAILABLE | The learner may begin required progression work. | The lesson is published/available and all required prerequisites are satisfied. | The learner has understood the lesson. |
| IN_PROGRESS | The learner has started a meaningful progression attempt. | A gate attempt or explicitly tracked learning activity exists. | Mere page open, scroll or elapsed time alone. |
| PASSED | Current mandatory gates provide enough evidence to safely unlock declared dependents. | Active gate policy is satisfied for the active content/gate versions. | Durable recall, transfer or complete senior mastery. |

### Retention/mastery status

| State | Meaning | Entry condition | What it does not mean |
|---|---|---|---|
| NOT_STARTED | No retention cycle has begun for this lesson. | Before the learner earns `progression_status = PASSED`. | The lesson is locked or failed. |
| RETAINING | Delayed review, variation or transfer evidence is due or being collected. | A passed lesson enters the retention cycle, or weak later evidence lowers confidence. | A change to progression access. |
| MASTERED | Durable capability has sufficient delayed recall and/or meaningful transfer evidence. | Retention policy is satisfied. | A fifth technical L-level, perfection, or immunity from later forgetting. |

Examples of valid simultaneous state are:

```text
progression_status = PASSED
retention_status   = RETAINING

progression_status = PASSED
retention_status   = MASTERED
```

`PASSED` is always the progression truth. `MASTERED` is a later retention/mastery claim. They are deliberately different so a learner can continue after credible current evidence while still being asked to retain and transfer the mechanism.

## Sticky progression

Ordinary weak later review never silently changes a passed prerequisite back to `LOCKED`.

```text
weak delayed recall
→ retention_status changes from MASTERED to RETAINING
→ mastery confidence decreases
→ review or targeted remediation becomes due
→ historical pass evidence remains
→ already unlocked dependents stay available
```

Only a material correctness or prerequisite change may explicitly request revalidation. That action must be visible to the learner, preserve historical evidence and explain exactly what changed and which new evidence is needed. It is not a silent deletion or a blanket reset.

## Existing capability scales remain canonical

Technical and English evidence remain separate; this model does not introduce another global L0–L5 ladder.

| Technical capability | English capability |
|---|---|
| L1 — Understand | E1 — Read / Understand |
| L2 — Apply | E2 — Short Answer |
| L3 — Debug | E3 — Explain 2–3 minutes |
| L4 — Reason / Trade-off / Transfer | E4 — Technical Discussion |

The following are evidence dimensions, not replacement global levels or a single percentage score:

- Mental model: can describe the state and mechanism.
- Apply: can use the canonical case.
- Debug: can form and test an explanation from evidence.
- Production reasoning: can state boundary, cost and recovery trade-off.
- Transfer: can reason when a meaningful condition changes.
- Technical communication: reasoning is structured; mechanism, evidence and trade-offs are articulated accurately and clearly. This dimension is language-neutral.

Technical English is represented exclusively by E1–E4. English weakness must never lower technical mastery or technical Communication evidence.

## Evidence strength and assistance

Evidence is not equal merely because it was submitted. A useful default hierarchy is:

```text
recognition
< guided application
< independent canonical case
< debugging from evidence
< unseen variation
< delayed transfer
```

The future system should record assistance as `none`, `hint`, `guided` or `answer_revealed`.

- A prediction may be mandatory as participation, but `prediction submitted` is not the same as `prediction correct`.
- A wrong prediction followed by correct evidence-based reasoning is valuable learning evidence.
- If an assessment intended to prove independent capability reveals its answer, that attempt becomes practice evidence.
- Repeating the same revealed case immediately cannot count as independent proof; use an equivalent variation later when independent evidence is still required.

## Candidate retention cycle

The initial product default is a deliberately adjustable cycle:

```text
progression_status = PASSED
→ retention_status = RETAINING
→ recall around +3 days
→ variation around +7 days
→ transfer/rematch around +21 days
→ retention_status = MASTERED when policy evidence is sufficient
```

The 3/7/21 timings are product defaults for human study, not immutable scientific constants. Weak later evidence can move `retention_status` from `MASTERED` back to `RETAINING`, lower mastery confidence and schedule the smallest useful remediation; it never changes `progression_status = PASSED` or erases a pass.

## Version and history semantics

Every meaningful learner attempt must eventually be attributable to:

```text
content_id
content_version
gate_id
gate_version
```

### Version compatibility invariant

A learner PASS must be evaluated against one coherent gate-policy version, or an explicitly declared compatibility mapping between versions. The system must not silently combine incompatible evidence such as Gate A and Gate B from policy v1 with Gate C from policy v2 and call the result “PASS v2”.

Each attempt retains its original `content_id`, `content_version`, `gate_id` and `gate_version`. When a new version is published, compatible old evidence may carry forward only through an explicit compatibility decision. Incompatible evidence remains historical evidence but cannot silently satisfy the new policy. Historical attempts are never deleted.

| Change class | Meaning | Effect on history and progression |
|---|---|---|
| Editorial-compatible | Typo, formatting or wording that does not alter what evidence means. | Keep history and evidence compatible. |
| Learning-compatible clarification | Explanation improves without changing the required capability. | Keep history; optionally invite review. |
| Material capability change | Gate or required capability meaning changes. | Preserve history; declare compatibility explicitly or require visible new evidence. |
| Breaking prerequisite/correctness change | A prior assumption or required foundation is materially wrong/insufficient. | Preserve history; explicitly request scoped revalidation with rationale and an explicit compatibility decision. |

No content change may silently erase a learner's attempts, pass record or review history.

## Challenge-out

Experienced learners may prove competence without consuming every instructional page. Challenge-out is not a bypass: it must provide evidence equal to or stronger than the normal required gates.

For senior-core topics, a trivial recognition quiz cannot challenge out. An acceptable policy uses independent canonical reasoning, evidence/debug work and communication or transfer appropriate to the topic. A challenge-out pass should be recorded as evidence with its content and gate versions.

## Failure semantics

When a required gate is not satisfied, the system should preserve the attempt, show the missing requirement, recommend the smallest useful remediation and allow retry under policy. It must keep required dependents locked until sufficient evidence exists, but must not reset the entire lesson, erase prior valid evidence or impose meaningless streak/cooldown punishment.

## Pilot mapping proves generality

| Pilot | Candidate required evidence for PASSED | Candidate later evidence for MASTERED |
|---|---|---|
| Index & Execution Plan | prediction; plan/evidence interpretation; canonical query/index case; debug case; explain-back | changed distribution; unseen plan; cross-engine transfer |
| Race Condition & Concurrency | predict overlap; reproduce controlled race; identify invariant; apply synchronization; explain process/local boundary | new interleaving; multi-instance transfer |
| Outbox & Idempotency | crash prediction; distinguish relay publish attempts from consumer deliveries; duplicate local delivery with one local effect; unknown external outcome; explain-back | provider-contract variation; broker/client-assumption variation |

## Phase 1 cross-review

| Perspective | Review question | Phase 1 decision |
|---|---|---|
| Learning integrity | Does evidence represent reasoning rather than exposure? | Reading/time/scroll never pass a lesson; revealed answers are practice only. |
| Progression integrity | Can required work unlock only from demonstrated prerequisites? | `PASSED` unlocks the dependency graph; retention/mastery is a separate axis and ordinary forgetting is sticky. |
| Version integrity | Can we explain which version produced an attempt? | Content/gate IDs and versions are retained; PASS requires one coherent policy or declared compatibility mapping. |
| Product simplicity | Is there one opaque score? | No; small state model plus visible dimensions and gate results. |
| UX transparency | Can a learner tell why progress changed? | Locks, revalidation and remediation must name requirements and evidence. |
| Future technical enforceability | Can a trusted system apply it later? | This specifies durable result semantics without prematurely defining tables or SQL. |

## Deliberately deferred

Phase 1 does not define Supabase, schema, SQL, API contracts, UI screens, scoring formula, adaptive algorithm, AI grading, final retry limits or a new senior curriculum. Those require later implementation/design review and human-study evidence.
