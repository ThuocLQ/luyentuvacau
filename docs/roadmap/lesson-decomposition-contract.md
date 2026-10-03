# Post-Step-3 Lesson Decomposition Contract

> **Status:** Draft for human / architecture review.
> **Scope:** semantic bridge from frozen capabilities and their dependency graph to future QuanNet Learning Units. This is not a lesson catalog, roadmap, schedule, UI, schema, case bank, or time estimate.

## Purpose and frozen inputs

This contract translates two frozen inputs into a future authoring decision:

```text
frozen capability nodes + frozen capability dependency relations
→ coherent Learning Units
→ explicit lesson-prerequisite candidates
→ future cases, gates and evidence
→ learner-facing authoring
```

It does not modify or reinterpret the frozen capability map or dependency graph. The inputs remain 163 capabilities in 17 core tracks and 318 ordering relations (194 REQUIRED, 124 RECOMMENDED). A Learning Unit is a pedagogical boundary; a capability is an engineering competence boundary. They are not interchangeable.

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

## Ownership treatment

Every proposed Learning Unit classifies referenced capabilities as:

| Role | Meaning |
|---|---|
| **Primary / owned** | The unit teaches and assesses the canonical mechanism. |
| **Supporting prerequisite** | Earlier demonstrated evidence may be assumed when the unit cannot teach or assess fairly without it. |
| **Local prerequisite slice** | The unit introduces or recaps only the exact assumed slice needed by its target mechanism. It is not source-capability coverage or evidence. |
| **Recap / applied** | A mechanism owned elsewhere is briefly recalled or applied to a new domain-specific problem. |

A local prerequisite slice does not transfer canonical ownership, claim the source capability is covered, create `PASSED` evidence for it, or reproduce the full source-owner lesson. If the full source mechanism must be taught and assessed, it must become a deliberately justified Primary capability in a coherent multi-owner unit, or remain in its own unit as an external prerequisite candidate.

A consumer domain may apply, transfer or add domain-specific failure evidence. It must not redefine the producer domain's canonical mechanism. Reuse is not duplicate teaching.

## REQUIRED-edge completeness invariant

For every capability classified as **Primary**, a proposal must inspect **all incoming REQUIRED** relations in the frozen dependency graph. Each relation receives exactly one explicit lesson-level treatment:

1. **Internal Primary Order** — source and target are both Primary in the same unit; the relation becomes declared internal teaching and assessment order.
2. **Local Prerequisite Slice** — only the exact source slice needed by the target is introduced or recapped locally, subject to the ownership limits above.
3. **External Required Prerequisite Candidate** — earlier demonstrated source evidence is a candidate because local teaching would require substantial re-teaching or make teaching/assessment unfair.

No incoming REQUIRED relation may disappear because a dry-run role table did not list it. Future decomposition validation must require a compact treatment table for every Primary capability. A REQUIRED treatment is a design decision, not an automatic progression lock; RECOMMENDED relations still never hard-lock.

## Four separate graphs

| Model | Question | Does not mean |
|---|---|---|
| Capability dependency | What source mechanism may a target capability assume? | Curriculum or UI order. |
| Internal learning order | What must be introduced first inside one Learning Unit? | An external prerequisite. |
| External lesson prerequisite | What completed evidence is genuinely needed before official progression into another unit? | Every REQUIRED capability relation. |
| Learner progression state | Whether a learner is `LOCKED`, `AVAILABLE`, `IN_PROGRESS` or `PASSED`. | Capability ownership or retention/mastery. |

A REQUIRED edge becomes **internal learning order** when its endpoints are deliberately taught in the same unit. If endpoints are in different units, it becomes an **external prerequisite candidate** only after an explicit fair-teaching/fair-assessment justification. RECOMMENDED relations are recap, preparation, optional material, suggested parallel work or `recommended_after`; they never create a hard progression lock.

This preserves the product rule: **QuanNet locks progression, not curiosity.** A future locked unit may still expose learning/reference content; locking concerns official required progression, not reading access.

## Semantic Learning-Unit contract

A future unit proposal must contain semantic metadata, not a database schema:

| Field | Required semantic decision |
|---|---|
| Unit ID and working title | Stable planning identity; not a final public catalog promise. |
| Canonical owner/domain | Owner and one of the six learner-facing domains. |
| Primary / supporting / recap capability IDs | Exact frozen IDs and their role. |
| Technical and English evidence target | L1–L4 and, only where relevant, E1–E4; never one combined score. |
| Learner prerequisite boundary | What is assumed, locally introduced or an external prerequisite candidate. |
| Internal order | Problem → simple approach → failure/need → mechanism → evidence. |
| Canonical problem and case | One engineering problem/case that justifies the unit. |
| State/data/mechanism trace | What changes and which boundaries matter. |
| Evidence and debug story | What can be observed; a meaningful failure and diagnosis. |
| Production boundary / trade-off | What the mechanism protects, costs and does not protect. |
| Transfer variation | Meaningful changed condition, not renamed variables. |
| Required/supporting gates and exit evidence | Gates that can credibly support primary capabilities. |
| Version and research status | Version-sensitive boundary plus canonical source-map workflow before major learner-facing authoring. |
| Lifecycle/human-study status | Authoring lifecycle only; not learner achievement. |

A major future unit follows the existing research/source-map and lesson-standard workflow; this contract does not duplicate those standards or research all future units.

## Assessment and progression boundary

Primary capability coverage requires credible evidence across the relevant mental-model, apply, debug, production-reasoning, transfer and technical-communication dimensions. A name in prose, one quiz, a completion click, scrolling, time spent or self-rating is not coverage.

Possible gate types remain the existing prediction, knowledge check, interactive trace, hands-on/lab evidence, canonical challenge, debug challenge, explain-back and transfer/Boss challenge. A unit need not contain every gate. Mandatory gates are selected only when future dependent learning actually needs that evidence.

`PASSED` is credible current progression evidence; `MASTERED` is later retention/delayed-transfer evidence. Technical L1–L4 and English E1–E4 stay separate. Ordinary later forgetting never erases historical `PASSED`.

## Domain architecture and parallelism

Future units remain discoverable in the six learner-facing domains:

- Data & Consistency
- Runtime & Concurrency
- Service & Network
- Distributed Systems
- Production Engineering
- Architecture & Engineering Reasoning

Domain membership does not define prerequisite order. Multiple roots, concurrent progression-eligible units, convergence from several prerequisites and recommended non-blocking relationships are intentional. Missing labs or uneven domain density are acceptable when no coherent unit is justified.

## Dry-run A — database/index region

**Possible unit: “Choose and verify a query access path.”** This is a dry-run, not a final catalog entry and not a claim that the current Index pilot is the final unit.

| Role | Frozen capability IDs | Treatment |
|---|---|---|
| Primary | `db-index-structures`, `db-composite-query-shape`, `db-execution-operators`, `db-optimizer-cardinality-stats` | One causal story: an index narrows candidates; query shape affects usable key path; the optimizer selects operators from estimates. |
| RECOMMENDED context | `db-physical-storage-pages` | Optional page-locality recap; its frozen relation to `db-index-structures` is RECOMMENDED, never a lock. |
| Optional indirect context | `db-buffer-io` | May help a later performance discussion, but has no direct frozen relation to these Primary capabilities and is not presented as one. |
| Split / later unit | `db-production-diagnosis-transfer` | It combines buffer/I/O, cardinality, locks and pool waits into a broader competing-hypothesis diagnosis story. |

| Primary target | Incoming REQUIRED source | Frozen relation | Lesson-level treatment | Reason |
|---|---|---|---|---|
| `db-index-structures` | none | — | — | No incoming REQUIRED relation. |
| `db-composite-query-shape` | `db-index-structures` | `db-index-structures → db-composite-query-shape` | Internal Primary Order | Both mechanisms are Primary in the same access-path trace. |
| `db-execution-operators` | none | — | — | No incoming REQUIRED relation. |
| `db-optimizer-cardinality-stats` | `db-execution-operators` | `db-execution-operators → db-optimizer-cardinality-stats` | Internal Primary Order | Estimated-versus-actual rows is assessed against the operator pipeline in the same case. |

Internal order: expensive scan problem → ordered search structure → composite key path → scan/join/sort operator evidence → estimated versus actual rows → changed data distribution transfer.

The frozen RECOMMENDED relations `db-composite-query-shape → db-optimizer-cardinality-stats`, `db-index-structures → db-execution-operators`, and `db-physical-storage-pages → db-index-structures` remain non-blocking context. The existing Index pilot is a useful sanity check because it already connects plan evidence and vocabulary, but it does not decide this grouping or future progression boundary.

## Dry-run B — concurrency/race region

**Possible unit: “Protect one invariant across an unsafe interleaving.”**

| Role | Frozen capability IDs | Treatment |
|---|---|---|
| Primary | `concurrency-interleavings-invariants`, `concurrency-races-check-then-act`, `concurrency-synchronization-atomicity` | One trace: read/check/write interleaves, violates an invariant, then needs an atomicity/protection decision. |
| Local prerequisite slice | `prog-invariants-domain-model` | Introduce only the business-rule/invariant slice needed to read the race trace. This does not cover the source capability or create its progression evidence. |
| Later possible unit | `concurrency-local-vs-distributed` | Its four-replica boundary needs distinct L4 transfer evidence, so it is not recap/applied inside this local-race unit. |
| Split / later unit | `concurrency-memory-visibility`, `concurrency-deadlock-starvation` | Different mechanism/evidence/failure stories. |

| Primary target | Incoming REQUIRED source | Frozen relation | Lesson-level treatment | Reason |
|---|---|---|---|---|
| `concurrency-interleavings-invariants` | `prog-invariants-domain-model` | `prog-invariants-domain-model → concurrency-interleavings-invariants` | Local Prerequisite Slice | The case needs one stated invariant, not the full domain-model mechanism or source evidence. |
| `concurrency-races-check-then-act` | `concurrency-interleavings-invariants` | `concurrency-interleavings-invariants → concurrency-races-check-then-act` | Internal Primary Order | The interleaving trace directly explains the check-then-act failure. |
| `concurrency-synchronization-atomicity` | `concurrency-interleavings-invariants` | `concurrency-interleavings-invariants → concurrency-synchronization-atomicity` | Internal Primary Order | Atomic protection is evaluated against the same invariant and trace. |

Internal order: business rule → two overlapping transitions → controlled `READ → CHECK → WRITE` race → protection/atomicity choice → evidence that the invariant holds. The later possible multi-instance unit has a genuine **External Required Prerequisite Candidate**: `concurrency-races-check-then-act → concurrency-local-vs-distributed`. Local protection must first be demonstrated before testing why one process-local lock does not protect four replicas. This is an example of a REQUIRED capability relation becoming an external lesson-prerequisite candidate because the later L4 transfer needs a separate mechanism boundary and evidence set. The Race pilot validates that the local causal grouping is teachable; it does not mandate global sequence.

## Dry-run C — messaging/outbox region

**Possible unit: “Keep the intent to publish when DB commit and broker publish are separate.”**

| Role | Frozen capability IDs | Treatment |
|---|---|---|
| Primary | `msg-outbox-db-publish-gap`, `msg-consumer-idempotency-inbox` | One end-to-end DB-to-broker trace: durable intent, relay crash window, duplicate delivery and one local effect. |
| Supporting prerequisite candidate | `msg-delivery-retry-poison-dlq` | Retry/poison classification has its own policy and evidence boundary. Its demonstrated evidence is a candidate before assessing duplicate-consumer handling. |
| Local prerequisite slices | `db-transactions-isolation-anomalies`, `msg-model-queue-topic-partition-order`, `dist-partial-failure-uncertainty` | Respectively: one local atomic-write boundary; the destination/key/ordering scope needed by the trace; and the fact that one path may fail after another effect. None claims source coverage or `PASSED` evidence. |
| RECOMMENDED context | `msg-producer-acks-durability` | Useful for relay retry/ack ambiguity; never a lock. |
| Split / later unit | `msg-external-side-effect-reconciliation`, `msg-replay-backfill` | External authority/recovery and historical replay have different evidence and correctness boundaries. |

| Primary target | Incoming REQUIRED source | Frozen relation | Lesson-level treatment | Reason |
|---|---|---|---|---|
| `msg-outbox-db-publish-gap` | `msg-model-queue-topic-partition-order` | `msg-model-queue-topic-partition-order → msg-outbox-db-publish-gap` | Local Prerequisite Slice | The trace needs its destination/key/ordering scope, not full broker-model coverage. |
| `msg-outbox-db-publish-gap` | `db-transactions-isolation-anomalies` | `db-transactions-isolation-anomalies → msg-outbox-db-publish-gap` | Local Prerequisite Slice | Teach only the local atomic business-row/outbox-write boundary; no transaction-isolation source evidence is claimed. |
| `msg-outbox-db-publish-gap` | `dist-partial-failure-uncertainty` | `dist-partial-failure-uncertainty → msg-outbox-db-publish-gap` | Local Prerequisite Slice | The trace needs only that a component/path may fail independently after another effect; the unit does not cover or pass the Distributed Systems capability. |
| `msg-consumer-idempotency-inbox` | `msg-delivery-retry-poison-dlq` | `msg-delivery-retry-poison-dlq → msg-consumer-idempotency-inbox` | External Required Prerequisite Candidate | Full retry classification, bounded retry and DLQ ownership require separate policy evidence; reducing them to a recap would make duplicate handling assessment unfair. |
| `msg-consumer-idempotency-inbox` | `db-transactions-isolation-anomalies` | `db-transactions-isolation-anomalies → msg-consumer-idempotency-inbox` | Local Prerequisite Slice | Teach only the local inbox-row/business-effect atomic-or-recoverable boundary; it does not claim the database source capability. |

Outbox and consumer idempotency remain grouped in this design example: the same canonical trace follows one committed business change through relay uncertainty, duplicate delivery and one consumer-local effect. The retry/poison policy remains external because it has a separate state/policy/debug boundary; its prerequisite candidate does not dissolve the shared DB-to-broker consistency story. `msg-producer-acks-durability → msg-outbox-db-publish-gap` remains RECOMMENDED context, never a lock. The Outbox pilot is a stress test for this choice, not authority for a final prerequisite boundary.

## Adversarial checks

| Case | Contract decision |
|---|---|
| A. Three REQUIRED parents from different owners | Do not create three prior lessons by default. Internalize a focused source concept when the unit remains self-contained; otherwise make only the demonstrated evidence genuinely necessary for fair teaching/assessment an external candidate. |
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

The following are **open design questions**, not hidden decisions in this contract:

- What maximum Learning-Unit scope still permits one coherent canonical case, failure story and gate set?
- When may a unit span more than one canonical owner without creating duplicate teaching?
- When can one canonical case be reused across units while preserving independent assessment evidence?
- May one prerequisite evidence record satisfy multiple downstream units, and under what version-compatibility rule?
- How should lesson-version compatibility map back to capability evidence?
- How should canonical-case design be separated from assessment variants?
- How should unique-path workload/hour estimation consume a future lesson graph?

**Resolved contract rules** are the grouping, ownership, graph separation and non-lock rules above. These open questions require later architecture/product review; this document does not settle them for convenience.