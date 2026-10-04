# Post-Step-3 Lesson Decomposition Contract

> **Status:** FROZEN — Post-Step-3 canonical Lesson Decomposition Contract.
> **Scope:** semantic bridge from frozen capabilities and their dependency graph to future QuanNet Learning Units. This is not a lesson catalog, roadmap, schedule, UI, schema, case bank, or time estimate.

## Purpose and frozen inputs

This contract translates two frozen inputs into a future authoring decision:

```text
frozen capability nodes + frozen capability dependency relations
→ coherent Learning Units
→ explicit Learning-Unit prerequisite candidates
→ future cases, gates and evidence
→ learner-facing authoring
```

It does not modify or reinterpret the frozen capability map or dependency graph. The inputs remain 167 capabilities in 17 core tracks and 332 ordering relations (201 REQUIRED, 131 RECOMMENDED). A Learning Unit is a pedagogical boundary; a capability is an engineering competence boundary. They are not interchangeable.

The existing Index & Execution Plan, Race Condition & Concurrency, and Outbox & Idempotency pilots are validation fixtures only. Their file order, links and historical recommendations are not curriculum evidence.

## Non-equivalences

The decomposition must reject these substitutions:

- `1 capability = 1 lesson`;
- `1 track = 1 course`;
- `1 track = 1 linear lesson chain`;
- track number, capability-table order or dependency-row order = learning order;
- REQUIRED capability edge = automatic lesson lock;
- RECOMMENDED capability edge = required prerequisite;
- a pilot sequence = curriculum sequence.

A domain can have parallel Learning Units and a unit can make several capabilities coherent without becoming a mega-lesson.

## Grouping test

Place capabilities in one proposed Learning Unit only when the answer is credibly **yes** to all applicable tests:

1. **Problem origin** — they arise from the same engineering problem or causal need.
2. **Mechanism continuity** — one mental model carries the learner through the mechanisms without an unrelated model switch.
3. **State/control continuity** — one traceable state, data or control flow connects the concepts.
4. **Canonical-case coherence** — one realistic case can expose the mechanisms naturally.
5. **Observable evidence** — compatible evidence can verify the main claims.
6. **Failure/debug coherence** — one meaningful failure or diagnostic story connects them.
7. **Transfer coherence** — one changed condition can test shared understanding.
8. **Prerequisite boundary** — the unit can remain self-contained for its declared learner boundary.
9. **Ownership** — grouping does not move a canonical mechanism to a different owner.
10. **Assessment coherence** — credible gates can collect evidence for every primary capability, not merely mention its name.

A grouping proposal must name the problem, trace, evidence and failure it shares. Topic similarity alone is insufficient.

## Split criteria

Capabilities should split into different Learning Units when any of the following is true:

- they need different prerequisite foundations or different concept-origin stories;
- their state model, source of truth, correctness boundary or observable evidence differs;
- they have unrelated production failures or debug loops;
- one only shares a broad label with the other;
- grouping would require undeclared knowledge or re-teach a mechanism owned elsewhere;
- one capability needs substantial L3/L4 depth while another is only context;
- one assessment cannot credibly prove every claimed primary capability;
- the unit accumulates multiple independent canonical cases, failure stories or transfer questions.

Split for coherence, not for a fixed lesson count. Conversely, do not split a single causal mechanism merely to maximize coverage rows.

## Capability usage roles / treatments

Every proposed Learning Unit classifies referenced capabilities as:

| Role / treatment | Meaning |
|---|---|
| **Primary capability** | The unit teaches and assesses the frozen capability's canonical mechanism. |
| **Local Prerequisite Slice** | The unit introduces or recaps only the exact frozen Assumed Slice needed by its target mechanism. It is not source-capability coverage or evidence. |
| **External Required Prerequisite Candidate** | Earlier compatible evidence is a candidate only when the exact Assumed Slice cannot be taught fairly or safely as a local slice. |
| **Recap / Applied capability** | The capability's mechanism is reused, recalled, transferred or applied here without claiming its Primary coverage; it may share or differ from the unit's canonical owner track. |
| **RECOMMENDED context** | A direct frozen RECOMMENDED relation is surfaced as explicitly non-blocking context. |

A Local Prerequisite Slice does not transfer canonical ownership, claim the source capability is covered, create `PASSED` evidence for it, or reproduce the full source-owner lesson. If the full source mechanism must be taught and assessed, it must become a deliberately justified Primary capability in a coherent multi-owner unit, or remain in its own unit as an External Required Prerequisite Candidate.

Do not hide a capability required to continue into the target mechanism behind Recap / Applied. Use the frozen REQUIRED-edge treatment instead: Local Prerequisite Slice or External Required Prerequisite Candidate. RECOMMENDED context remains non-blocking.

A consumer track or Learning Unit may recap, apply, transfer or add domain-specific failure evidence, but it must not redefine the canonical owner's mechanism. Reuse is not duplicate teaching.

## REQUIRED-edge completeness invariant

For every capability classified as **Primary**, a proposal must inspect **all incoming REQUIRED** relations in the frozen dependency graph. Each relation receives exactly one explicit lesson-level treatment:

1. **Internal Primary Order** — source and target are both Primary in the same unit; the relation becomes declared internal teaching and assessment order.
2. **Local Prerequisite Slice** — only the exact source slice needed by the target is introduced or recapped locally, subject to the ownership limits above.
3. **External Required Prerequisite Candidate** — earlier demonstrated source evidence is a candidate because local teaching would require substantial re-teaching or make teaching/assessment unfair.

No incoming REQUIRED relation may disappear because a dry-run role table did not list it. Future decomposition validation must require a compact treatment table for every Primary capability. A REQUIRED treatment is a design decision, not an automatic progression lock; RECOMMENDED relations still never hard-lock.

## Global full-decomposition invariants

The future full Learning-Unit map must give every one of the 163 frozen Step-2 capabilities exactly one canonical **Primary assessment home**. A capability may appear elsewhere only through the defined taxonomy: Local Prerequisite Slice, External Required Prerequisite Candidate, Recap / Applied capability or RECOMMENDED context. This guarantees complete coverage without equating one capability with one lesson or duplicating canonical mechanism ownership. If a capability cannot obtain one coherent Primary assessment home without violating the grouping/split criteria, flag an architecture conflict; do not silently duplicate Primary coverage.

| Global structural acceptance check | Required result |
|---|---:|
| Frozen capability count | 167 |
| Primary assessment homes | 167 |
| Missing Primary capabilities | 0 |
| Duplicate Primary capability assignments | 0 |
| Unknown capability IDs | 0 |
| Units without at least one Primary capability | 0 |

The future full map must also classify all 194 frozen REQUIRED relations exactly once as Internal Primary Order, Local Prerequisite Slice or External Required Prerequisite Candidate: 194 classified and 0 unclassified. For every Primary capability, inspect all incoming frozen RECOMMENDED relations as well. Each of the 124 relations is either surfaced as RECOMMENDED context or intentionally not surfaced at Learning-Unit level with a concise rationale. Neither decision can create a learner lock.

Future full-map validation must additionally verify: the required Learning-Unit graph is acyclic; every Local Prerequisite Slice matches the frozen Assumed Slice; every capability owner remains its frozen Step-2 owner; track/document order is not treated as learning order; and multiple roots or parallel progression-eligible units remain possible.

## Four separate graphs

| Model | Question | Does not mean |
|---|---|---|
| Capability dependency | What source mechanism may a target capability assume? | Curriculum or UI order. |
| Internal learning order | What must be introduced first inside one Learning Unit? | An external prerequisite. |
| External Learning-Unit prerequisite candidate | What compatible evidence may genuinely be needed before official progression into another future Learning Unit? | Every REQUIRED capability relation or a current learner-facing lesson policy. |
| Learner progression state | Whether a learner is `LOCKED`, `AVAILABLE`, `IN_PROGRESS` or `PASSED`. | Capability ownership or retention/mastery. |

For every incoming REQUIRED relation, first inspect its frozen **Assumed Slice**. It becomes **Internal Primary Order** only when source and target are both Primary in the same unit. It becomes a **Local Prerequisite Slice** when that exact slice can be introduced or recapped locally without teaching the full source mechanism, transferring ownership, claiming source coverage or creating source `PASSED` evidence. It becomes an **External Required Prerequisite Candidate** only when the assumed slice itself needs substantial compatible prior mechanism/evidence and cannot be taught fairly or safely locally. Track separation, unit separation, capability size, convenience and a desire to demonstrate an external prerequisite are not sufficient reasons. RECOMMENDED relations are recap, preparation, optional material, suggested parallel work or `recommended_after`; they never create a hard progression lock.

This preserves the product rule: **QuanNet locks progression, not curiosity.** A future locked unit may still expose learning/reference content; locking concerns official required progression, not reading access.

An External Required Prerequisite Candidate identifies exact source capability evidence, not automatically `source Learning Unit PASSED → target Learning Unit unlocked`. A later lesson-level mapping may use whole-unit `PASSED` only when it is a fair, compatible proxy without unrelated gating. Otherwise reconsider the grouping, use capability-compatible evidence, or retain a Local Prerequisite Slice. Do not solve dependency mapping by over-gating the learner.

After Learning Units and External Required Prerequisite Candidates are derived, validate the resulting required Learning-Unit prerequisite graph. It must be acyclic before it becomes progression policy. If grouping creates mutual unit dependencies, reconsider the grouping or split, or retain an edge as a Local Prerequisite Slice when faithful; never create a circular learner lock or solve it through arbitrary ordering.

## Semantic Learning-Unit contract

A future unit proposal must contain semantic metadata, not a database schema:

| Field | Required semantic decision |
|---|---|
| Unit ID and working title | Stable planning identity; not a final public catalog promise. |
| Learner-facing domain candidate | One existing discovery/navigation domain that best represents the primary learner problem/surface; it does not replace ownership or drive grouping, dependencies or assessment. |
| Primary capability records | Each exact frozen capability ID, its frozen canonical owner track and its frozen technical target level. |
| Local Prerequisite Slice entries | Source capability ID plus the exact frozen Assumed Slice; no source coverage or evidence claim. |
| External Required Prerequisite Candidate entries | Source ID, exact required assumed slice/evidence, compatible prior evidence and why a local slice is insufficient. |
| Recap / Applied capability IDs and RECOMMENDED context | Exact frozen IDs with explicitly non-blocking treatment. |
| Technical and English evidence target | Unit gates aggregate per-Primary L1–L4 evidence; E1–E4 remains orthogonal and never lowers technical evidence. |
| Learner prerequisite boundary | What is locally introduced and what is an external candidate; never whole-unit over-gating by default. |
| Internal order | Problem → simple approach → failure/need → mechanism → evidence. |
| Canonical problem and case | One engineering problem/case that justifies the unit. |
| State/data/mechanism trace | What changes and which boundaries matter. |
| Evidence and debug story | What can be observed; a meaningful failure and diagnosis. |
| Production boundary / trade-off | What the mechanism protects, costs and does not protect. |
| Transfer variation | Meaningful changed condition, not renamed variables. |
| Required/supporting gates and exit evidence | Gates that can credibly support primary capabilities. |
| Version and research status | Version-sensitive boundary plus canonical source-map workflow before major learner-facing authoring. |
| Lifecycle/human-study status | `N/A` before a learner-facing lesson exists, or a linked future lesson artifact; never an implied human-study result for this decomposition unit. |

A Learning Unit is the semantic teaching, assessment and progression boundary that may later become a major learner-facing lesson candidate. It groups coherent Primary capabilities, one declared prerequisite boundary and one coherent pass-evidence policy; a later presentation may have several sections, labs or components. Do not silently split one Learning Unit into independent progression units, or define it by UI page packaging, without a later explicit architecture decision. Use **Learning Unit prerequisite candidate** during decomposition; later learner-facing lesson mapping may materialize that semantic boundary. A major future unit follows the existing research/source-map and lesson-standard workflow; this contract does not duplicate those standards or research all future units.

## Assessment and progression boundary

Primary capability coverage requires credible evidence across the relevant mental-model, apply, debug, production-reasoning, transfer and technical-communication dimensions. A name in prose, one quiz, a completion click, scrolling, time spent or self-rating is not coverage.

Possible gate types remain the existing prediction, knowledge check, interactive trace, hands-on/lab evidence, canonical challenge, debug challenge, explain-back and transfer/Boss challenge. A unit need not contain every gate. Required gates are selected from the competence the current Learning Unit claims and the evidence needed to award `PASSED` credibly. Future prerequisite dependencies may require some of this evidence to be compatible for downstream progression, but downstream dependency is not the only reason a gate can be REQUIRED.

`PASSED` is credible current progression evidence; `MASTERED` is later retention/delayed-transfer evidence. Technical L1–L4 and English E1–E4 stay separate. Ordinary later forgetting never erases historical `PASSED`.

## Domain architecture and parallelism

Future units may be associated with one learner-facing domain candidate from the six discovery/navigation domains:

- Data & Consistency
- Runtime & Concurrency
- Service & Network
- Distributed Systems
- Production Engineering
- Architecture & Engineering Reasoning

Domain classification does not define capability grouping, canonical ownership, prerequisite decisions, assessment boundaries or future unit identity. It may be adjusted later for navigation without changing those semantics. Multi-owner grouping does not require multiple learner-facing domains. Multiple roots, concurrent progression-eligible units, convergence from several prerequisites and recommended non-blocking relationships are intentional. Missing labs or uneven domain density are acceptable when no coherent unit is justified.

## Dry-run A — database/index region

These two possible units are deliberately separate. Topic proximity is not enough: choosing an access path does not by itself assess the full execution-pipeline, join, sort, aggregate, loop and row-growth reasoning required by `db-execution-operators`.

### Possible Unit A1 — Choose a usable index key path

| Role | Frozen capability IDs | Treatment |
|---|---|---|
| Primary capability | `db-index-structures`, `db-composite-query-shape` | One access-path story: an ordered search structure narrows candidate rows, then composite key order determines which predicate/order path is usable. |
| RECOMMENDED context | `db-physical-storage-pages` | Optional page-locality recap; `db-physical-storage-pages → db-index-structures` is RECOMMENDED and never a lock. |


| Primary target | Incoming REQUIRED source | Exact frozen Assumed Slice | Lesson-level treatment | Reason |
|---|---|---|---|---|
| `db-index-structures` | none | — | — | No incoming REQUIRED relation. |
| `db-composite-query-shape` | `db-index-structures` | an ordered/searchable index only narrows rows according to the key path the query can use. | Internal Primary Order | Both full mechanisms are Primary in the same access-path trace and evidence set. |

Internal order: expensive scan problem → ordered search structure → composite key path → changed predicate/order variation. `db-index-structures → db-composite-query-shape` is REQUIRED internal order.

### Possible Unit A2 — Read an execution pipeline and judge estimates

| Role | Frozen capability IDs | Treatment |
|---|---|---|
| Primary capability | `db-execution-operators`, `db-optimizer-cardinality-stats` | One execution story: operators produce/consume rows; cardinality estimates drive physical choices; estimate/actual mismatch exposes the failure. |
| RECOMMENDED context | `db-index-structures`, `db-composite-query-shape` | Helpful plan-reading context through frozen RECOMMENDED relations; neither creates a lock. |
| Split / later unit | `db-production-diagnosis-transfer` | It adds buffer/I/O, locks and pool waits to a broader competing-hypothesis diagnosis story. |

| Primary target | Incoming REQUIRED source | Exact frozen Assumed Slice | Lesson-level treatment | Reason |
|---|---|---|---|---|
| `db-execution-operators` | none | — | — | No incoming REQUIRED relation. |
| `db-optimizer-cardinality-stats` | `db-execution-operators` | the optimizer chooses among physical execution operators. | Internal Primary Order | Estimated versus actual rows is assessed against the same operator pipeline. |

Internal order: query execution pipeline → scan/join/sort/aggregate row growth → estimate-driven operator choice → estimated versus actual rows → changed distribution transfer. `db-execution-operators → db-optimizer-cardinality-stats` is REQUIRED internal order. `db-index-structures → db-execution-operators` and `db-composite-query-shape → db-optimizer-cardinality-stats` remain RECOMMENDED context, not hidden prerequisites. The existing Index pilot is a useful sanity check for plan evidence and vocabulary, but it does not decide either unit boundary or future progression.

## Dry-run B — concurrency/race region

**Possible unit: “Protect one invariant across an unsafe interleaving.”**

| Role | Frozen capability IDs | Treatment |
|---|---|---|
| Primary capability | `concurrency-interleavings-invariants`, `concurrency-races-check-then-act`, `concurrency-synchronization-atomicity` | One trace: read/check/write interleaves, violates an invariant, then needs an atomicity/protection decision. |
| Local Prerequisite Slice | `prog-invariants-domain-model` | Only **state invariant under transition** is introduced to read the race trace. This does not cover the source capability or create its progression evidence. |
| Later possible unit | `concurrency-local-vs-distributed` | Its four-replica boundary needs distinct L4 transfer evidence, so it is not recap/applied inside this local-race unit. |
| Split / later unit | `concurrency-memory-visibility`, `concurrency-deadlock-starvation` | Different mechanism/evidence/failure stories. |

| Primary target | Incoming REQUIRED source | Exact frozen Assumed Slice | Lesson-level treatment | Reason |
|---|---|---|---|---|
| `concurrency-interleavings-invariants` | `prog-invariants-domain-model` | state invariant under transition | Local Prerequisite Slice | The race case needs one stated invariant, not the full domain-model mechanism or source evidence. |
| `concurrency-races-check-then-act` | `concurrency-interleavings-invariants` | interleaved shared-state change | Internal Primary Order | The interleaving trace directly explains the check-then-act failure. |
| `concurrency-synchronization-atomicity` | `concurrency-interleavings-invariants` | unsafe interleaving and critical transition | Internal Primary Order | Atomic protection is evaluated against the same invariant and trace. |

The later possible multi-instance unit treats `concurrency-races-check-then-act → concurrency-local-vs-distributed` as a **Local Prerequisite Slice**: **synchronization authority scope** can be recapped before its four-replica transfer, without claiming the full source capability again. It is not forced into an external prerequisite merely because it is a later unit. Internal order: business rule → two overlapping transitions → controlled `READ → CHECK → WRITE` race → protection/atomicity choice → evidence that the invariant holds. The Race pilot validates that the local causal grouping is teachable; it does not mandate global sequence.

## Dry-run C — messaging/outbox region

**Possible unit: “Persist producer intent and make the consumer effect duplicate-safe.”**

| Role | Frozen capability IDs | Treatment |
|---|---|---|
| Primary capability | `msg-outbox-db-publish-gap`, `msg-consumer-idempotency-inbox` | One end-to-end DB-to-broker trace: durable producer intent, relay crash window, repeated delivery and one duplicate-safe consumer-local effect. |
| Local Prerequisite Slices | `msg-delivery-retry-poison-dlq`, `db-transactions-isolation-anomalies`, `msg-model-queue-topic-partition-order`, `dist-partial-failure-uncertainty` | Only the declared assumed slices needed to follow the trace are introduced. None claims source coverage or `PASSED` evidence. |
| RECOMMENDED context | `msg-producer-acks-durability` | Useful for relay retry/ack ambiguity; never a lock. |
| Split / later unit | `msg-external-side-effect-reconciliation`, `msg-replay-backfill` | External authority/recovery and historical replay have different evidence and correctness boundaries. |

| Primary target | Incoming REQUIRED source | Exact frozen Assumed Slice | Lesson-level treatment | Reason |
|---|---|---|---|---|
| `msg-outbox-db-publish-gap` | `msg-model-queue-topic-partition-order` | broker publication boundary is distinct from local database commit | Local Prerequisite Slice | The trace needs the separate broker/DB boundary, not full queue/topic/partition coverage. |
| `msg-outbox-db-publish-gap` | `db-transactions-isolation-anomalies` | atomic local database commit boundary | Local Prerequisite Slice | Teach only the business-row/outbox-write atomic boundary; no transaction-isolation source evidence is claimed. |
| `msg-outbox-db-publish-gap` | `dist-partial-failure-uncertainty` | one component or communication step may fail independently between two effects | Local Prerequisite Slice | The dual-write trace needs this failure fact, not full Distributed Systems capability coverage. |
| `msg-consumer-idempotency-inbox` | `msg-delivery-retry-poison-dlq` | repeated delivery of one logical message after failure or retry | Local Prerequisite Slice | Teach only that retry/recovery can deliver the same logical message again; do not cover retry classification, bounded retry or DLQ policy. |
| `msg-consumer-idempotency-inbox` | `db-transactions-isolation-anomalies` | one local database transaction can atomically bind deduplication record and business state | Local Prerequisite Slice | Teach only the inbox-row/business-effect atomic-or-recoverable boundary; it does not claim database source capability coverage. |

Outbox and consumer idempotency remain grouped in this design example because the same canonical trace follows one committed business change through relay uncertainty, repeated delivery and one consumer-local effect; the unit can collect coherent state, failure and duplicate-safety evidence for both Primary capabilities. Full retry/DLQ policy remains a separate capability even though its narrow repeated-delivery slice is local here. `msg-producer-acks-durability → msg-outbox-db-publish-gap` remains RECOMMENDED context, never a lock. The Outbox pilot is a stress test for this choice, not authority for a final prerequisite boundary.
## Adversarial checks

| Case | Contract decision |
|---|---|
| A. Three REQUIRED parents from different owners | Do not create three prior lessons by default. Use a Local Prerequisite Slice when the unit remains self-contained; otherwise make only the demonstrated evidence genuinely necessary for fair teaching/assessment an External Required Prerequisite Candidate. |
| B. REQUIRED pair in one unit | Preserve it as explicit internal mechanism order; no external prerequisite is created. |
| C. Unstudied RECOMMENDED source | Target remains progression-eligible; provide recap/preparation, never a hard lock. |
| D. Broad topic, different mechanisms/evidence | Split. Topic labels do not overcome different state, evidence or failure boundaries. |
| E. Mega-unit risk | Split when it requires multiple independent cases, separate debug loops, excessive new vocabulary, incompatible gates or an undeclared prerequisite. |
| F. Consumer uses external owner mechanism | Mark it recap/applied; teach only the consumer-domain boundary and link back to canonical owner. |
| G. Progression-locked future lesson | Keep content/reference material viewable; gate official progression only. |
| H. Pilot groups differently | The contract wins. Pilots are validation artifacts, not curriculum authority. |

## Anti-patterns prevented

- capability-per-lesson and track-as-linear-course planning;
- row/track order treated as curriculum order;
- every REQUIRED edge converted into a lock;
- RECOMMENDED converted into a prerequisite;
- fake `recommendedNext` links or placeholder lessons;
- weekly filler curriculum or total-hour estimates before decomposition stabilizes;
- duplicate mechanism teaching under a consumer owner;
- mega-lessons with unrelated mechanisms;
- “coverage by mention” or assessment disconnected from claimed capability;
- pilot order reused as curriculum order;
- curriculum UI designed before semantic unit boundaries.

## Open questions

### Blocking before full decomposition

None in this contract. Learning Unit semantic boundary, canonical ownership representation, Local Prerequisite Slice treatment and the three REQUIRED-edge treatments are resolved here.

### Safe to defer

- What practical scope threshold should constrain multi-owner units before the unit becomes too broad or begins duplicating owner-specific teaching?
- When can one canonical case be reused across units while preserving independent assessment evidence?
- May one prerequisite evidence record satisfy multiple downstream units, and under what version-compatibility rule?
- How should lesson-version compatibility map back to capability evidence?
- How should canonical-case design be separated from assessment variants?
- How should unique-path workload/hour estimation consume a future lesson graph?

These questions require later architecture/product review; this document does not settle them for convenience.

## Freeze discoverability

This contract is FROZEN. `AGENTS.md` carries the scoped repository-entrypoint rule for future curriculum / Learning Unit decomposition work; ordinary lesson editing continues to follow the existing authoring workflow and need not read this contract unless it changes decomposition semantics.