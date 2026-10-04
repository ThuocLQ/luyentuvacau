# QuanNet Architecture Execution Protocol

> **Status:** CANONICAL OPERATIONAL PROTOCOL
>
> **Purpose:** Define how roadmap and curriculum architecture decisions are executed, propagated, verified, and reported. This protocol does not redefine the semantic rules in the frozen [Lesson Decomposition Contract](./lesson-decomposition-contract.md).

## Authority and separation of concerns

Use this protocol for roadmap/curriculum architecture tasks that create, review, split, merge, reassign, project, freeze, or otherwise mutate architecture artifacts.

- `lesson-decomposition-contract.md` defines the semantic correctness of Learning Unit decomposition.
- This protocol defines execution, propagation, consistency, validation, and completion semantics.

This is an operational protocol, not a curriculum artifact.

## Core principle

> **ANALYSIS IS NOT MATERIALIZATION.**

A `KEEP`, `SPLIT`, `MERGE`, `REASSIGN`, `DELETE`, `REJECT`, or `DEFER_BLOCKER` decision is not complete merely because it appears in reasoning, an appendix, an audit note, terminal output, or a final report. In an architecture mutation task, it is complete only when every affected canonical artifact represents the same final state.

## Required workflow

Architecture mutation tasks follow this order unless the task is explicitly analysis-only:

```text
READ AUTHORITY
→ DECLARE SCOPE
→ INVENTORY EXACT ENTITIES
→ SEMANTIC REVIEW / DECISION
→ DECISION LEDGER
→ MATERIALIZE DECISIONS
→ REMOVE / RECONCILE STALE STATE
→ MACHINE INVARIANTS
→ SEMANTIC COMPLETENESS
→ CROSS-ARTIFACT CONSISTENCY
→ REAL VALIDATION
→ COMMIT
→ FINAL REPORT FROM FINAL CANONICAL STATE
```

## Task modes

### Analysis-only

An analysis-only task may inspect, compare, identify candidates, make recommendations, and prepare a proposed Decision Ledger. It must not mark architecture `REVIEWED` or `FROZEN`, claim canonical decisions were applied, or silently mutate canonical registries.

When the analysis finds required changes, the scope remains pending until an architecture mutation task materializes them.

### Architecture mutation

An architecture mutation task must complete both the semantic decision and its canonical materialization in the same task before reporting its affected scope complete.

## Declared scope and entity inventory

Before mutation, record:

- authoritative inputs;
- mutable files;
- immutable or frozen files;
- exact entities in scope;
- explicitly out-of-scope entities; and
- acceptance invariants.

The final report must use this same scope. Do not silently expand it.

For a bounded review, enumerate every entity before editing. Every entity receives a disposition; no entity may silently disappear from review.

## Decision Ledger

Maintain a temporary Decision Ledger before materialization. It does not need to be committed.

| Entity | Current state | Decision | Concrete reason | Required canonical mutations | Status |
| --- | --- | --- | --- | --- | --- |

Decision values are task-specific but must be explicit. Typical values are `KEEP`, `SPLIT`, `MERGE`, `REASSIGN`, `DELETE`, `REJECT`, and `DEFER_BLOCKER`.

A decision is not done until all required canonical mutations are complete.

## Decision-to-materialization contract

### KEEP

- The canonical entity still exists.
- Canonical semantic evidence supports the decision.
- The audit agrees.
- No contradictory alternative decision remains.

### SPLIT

- Create the resulting canonical entities.
- Reassign every affected Primary or owned item exactly once.
- Update registries, canonical detail sections, counts, and audit.
- Remove the obsolete grouping and stale references.
- Verify no item is missing or duplicated.

### MERGE

- Create or retain the final merged canonical entity.
- Move every affected item exactly once.
- Update registries, the canonical detail section, counts, and audit.
- Delete obsolete entities and remove stale references.

### REASSIGN

- Update the canonical home and both old and new memberships.
- Update audit and registry while preserving ownership semantics.
- Verify the previous assignment no longer remains.

### DELETE

- Remove the canonical entity and every reference to it.
- Prove that no required item became orphaned.

### REJECT

- Leave canonical architecture unchanged.
- When the task requires review evidence, record the concrete failed criterion in the canonical audit surface.

### DEFER_BLOCKER

- Record the blocker.
- Keep the scope `PENDING` or `IN_REVIEW`.
- Do not mark it `REVIEWED` or `FROZEN`.

## One canonical source of truth

Canonical architecture has one current state. Do not leave an old canonical section alongside a contradictory appendix or audit note. Temporary working evidence may exist during the task, but before completion it must be integrated into canonical representation or removed.

A final report is never a source of truth.

## Review status semantics

Architecture review states are:

```text
PENDING → IN_REVIEW → REVIEWED → FROZEN
```

`REVIEWED` is allowed only when:

1. every declared entity has a disposition;
2. every mutation decision is materialized;
3. canonical registries and detail sections agree;
4. no stale contradictory state remains;
5. machine invariants pass;
6. semantic acceptance checks pass for the declared scope; and
7. validation evidence is recorded honestly.

If any entity is missing, deferred, or contradictory, the status must not be `REVIEWED`. `FROZEN` additionally requires the phase-specific freeze gate.

## Evidence and batching rules

Deep semantic work must be bounded: default to no more than roughly 20 semantic Learning Units per deep-review task, with smaller batches for complex units. If the requested scope is too large for entity-specific reasoning, stop before mutation and return a batching plan. This default may be overridden only for work that is primarily mechanical.

Generic boilerplate is not semantic acceptance proof. Evidence must name the actual criterion, such as the state owner, mechanism, evidence surface, failure/debug loop, canonical problem, assessment task, transfer boundary, ownership conflict, or prerequisite-only use.

When semantic evidence is required, place it in the canonical architecture or audit section defined by the artifact. Do not leave the only real reasoning in an appendix, temporary note, or final response.

## Consistency and completion gates

Before completion, compare every representation of the affected architecture, including counts, registries, detailed sections, audit registry, review status, and prerequisite/projected graph where applicable. No architecture fact may disagree across these surfaces.

Mechanically check every Decision Ledger row after mutation:

- `KEEP`: the entity still matches accepted evidence.
- `SPLIT`: the old grouping no longer exists.
- `MERGE`: obsolete entities no longer exist.
- `REASSIGN`: the previous assignment is absent.
- `DELETE`: no stale references remain.
- `REJECT`: canonical state was not accidentally changed.
- `DEFER_BLOCKER`: the scope was not marked `REVIEWED`.

A textual decision not reflected in canonical state is a task failure.

Each phase must declare machine-checkable invariants. For current Learning-Unit work, examples include frozen capabilities, Primary homes, missing/duplicate/unknown IDs, at least one Primary per unit, frozen owner and L-level alignment, map/audit membership agreement, and unique unit IDs. Check these mechanically whenever possible.

Machine correctness does not imply semantic acceptance. For Learning-Unit grouping, apply the semantic contract in [lesson-decomposition-contract.md](./lesson-decomposition-contract.md); this execution protocol does not replace it.

## Validation, diff, commit, and report

Before completion, inspect the actual diff and verify that only allowed files changed, frozen files are unchanged, and no generated, temporary, or unrelated cleanup was included.

Run every validation command explicitly required by the task. Report only commands that actually ran and their actual result. For a known unrelated baseline failure, report its exact stage, test, and error, and prove that changed files are unrelated before classifying it as baseline. Never rewrite a failure as a pass.

Do not commit a mutation task until the Decision Ledger is complete, materialization and stale-state reconciliation are complete, machine invariants and semantic scope checks pass, cross-artifact consistency passes, and required validation has executed.

Before committing, ask:

1. Did every scoped entity receive a decision?
2. Did every `SPLIT`, `MERGE`, or `REASSIGN` change canonical state?
3. Does any appendix contradict the registry?
4. Does the audit match the map?
5. Are global counts recalculated?
6. Did any stale ID or reference remain?
7. Was `REVIEWED` applied despite a missing or deferred item?
8. Was generic template text used instead of real semantic evidence?
9. Did every required validation run?
10. Does the final report describe actual state rather than intent?

Any failed answer blocks completion. Generate the final report from the final canonical state, listing actual counts, IDs, assignments, validation, and unresolved blockers.
## Derived registry exactness

After an architecture mutation, derive the final canonical entity set from the authoritative assignment state. Every derived registry must have exact set equality with that state: no missing entity, stale entity, or pre-split/pre-merge classification is allowed.

For current Learning-Unit work, derive unit membership from the Primary-Home Registry, then require:

- Unit Composition Registry unit set = derived unit set;
- Singleton Review Registry unit set = every unit whose Primary count is 1; and
- Multi-Capability Grouping Review unit set = every unit whose Primary count is greater than 1.

Row counts must match derived counts, each row must use final canonical membership, no singleton may remain in the Multi registry, and no multi unit may appear in the Singleton registry. A stale classification blocks REVIEWED.

Canonical-registry Markdown tables must also be machine-checked for expected column count, one physical row per entity, no concatenated rows, and no literal newline escape artifacts such as backslash-n or PowerShell-style backtick-n inside table structure. Content validation does not replace this structural check.
## Executable architecture gate

Machine-verifiable architecture rules belong in executable validation. A PASS is necessary, not sufficient, to mark a batch `REVIEWED`; a FAIL blocks both `REVIEWED` and the commit, and no final report can waive it. Batch scope comes from the review manifest, and `npm run check` runs these gates before generic tests. Incomplete validator implementation or failing implementation tests are work to finish, not blockers. A blocker is only an unavailable required authoritative input/tool, an irreconcilable source contradiction, or a change that would require modifying an explicitly frozen artifact.
