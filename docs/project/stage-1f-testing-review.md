# Stage 1F Testing & Engineering Quality Review — Working Evidence

NON-CANONICAL WORKING REVIEW ARTIFACT. Final authority remains learning-unit-audit.md and learning-unit-map.md. Delete this file after Stage 1F materialization is externally sealed.

## Scope and result

This Stage 1F-A review covers exactly the 6 historical Testing & Engineering Quality units and 10 scoped Primaries. It does not review Architecture & System Design and does not alter canonical state.

## Historical-unit decisions

| Historical unit | Decision | Proposed final unit(s) | Exact Primary capabilities | Reason |
|---|---|---|---|---|
| lu-test-ci-flakiness-repeatability | SPLIT | lu-test-risk-strategy-boundaries; lu-test-ci-flakiness-repeatability; lu-test-time-concurrency-determinism; lu-test-real-dependency-fixtures | test-risk-strategy-boundaries; test-ci-flakiness-repeatability; test-time-concurrency-determinism; test-real-dependency-fixtures | Risk selection, flaky-verdict diagnosis, deterministic time/interleaving control and real-fixture fidelity each have distinct state, evidence, failure loop and fair assessment boundary. |
| lu-test-failure-resilience | SPLIT | lu-test-failure-resilience; lu-test-risk-transfer | test-failure-resilience; test-risk-transfer | L3 controlled failure verification proves a known mechanism. L4 transfer derives a new risk, boundary and fixture when architecture changes; it must not gate the L3 mechanism. |
| lu-test-migration-compatibility | KEEP | lu-test-migration-compatibility | test-migration-compatibility | Mixed old/new version state, transitional fixture matrix and rollback compatibility form one distinct mechanism and assessment. |
| lu-test-property-boundary-fuzz | KEEP | lu-test-property-boundary-fuzz | test-property-boundary-fuzz | Property, generated input, shrinking and reproducible failing case are one broad-input falsification mechanism. |
| lu-test-review-static-analysis-change-safety | KEEP | lu-test-review-static-analysis-change-safety | test-review-static-analysis-change-safety | Diff intent, static findings, review rationale and targeted dynamic evidence are one complementary change-safety workflow. |
| lu-test-unit-integration-contract | KEEP | lu-test-unit-integration-contract | test-unit-integration-contract | Choosing a unit, integration or contract boundary and stating its blind spot is a focused L3 decision mechanism. |

Proposed result: 10 final units, all singleton. Historical totals: 4 KEEP, 2 SPLIT, 0 MERGE.

## Required merge-pressure decisions

### Risk strategy and unit/integration/contract

**Decision: REJECT MERGE.**

A database-backed business-rule change can require the learner to identify the risky transaction/constraint mechanism, choose an integration boundary, and state that unit/contract tests cannot prove PostgreSQL behavior. That is a useful prerequisite trace, but it does not make one unit coherent. Risk strategy is L2 and must also choose boundaries for migration, fault, review and CI cases without teaching the entire test-type taxonomy. Unit/integration/contract owns the later L3 comparison of what each boundary can and cannot prove. One combined assessment would over-gate reusable risk reasoning behind one test-family decision.

### Unit/integration/contract and real dependency fixtures

**Decision: REJECT MERGE.**

A PostgreSQL transaction/constraint case can prove why an integration boundary is needed and can exercise a disposable database fixture. The state machines remain separate: boundary selection asks where a behavior can fail; fixture work owns version, migration, seed, health, isolation and cleanup of the real dependency. A learner can select integration correctly yet build a leaky or version-wrong fixture, or build a sound fixture for a boundary selected elsewhere. One assessment would hide both independent failures.

### Three-capability risk strategy, boundary choice and fixture construction

**Decision: REJECT MERGE.**

The three-capability case would contain a reusable L2 risk model, L3 boundary taxonomy and L3 infrastructure lifecycle. It needs different transfer variations and failure evidence, so it becomes a mega-unit rather than one causal learning trace. The required edges remain prerequisite guidance, not a grouping rule.

### Flakiness and deterministic concurrency

**Decision: REJECT MERGE.**

Deterministic concurrency controls a known clock, gate, ownership or interleaving to reproduce a specific race/deadline. CI flakiness diagnoses an unstable verdict across timing, shared database/static state, port collision, environment, ordering, fixture cleanup and external network. Controlled interleaving can remove one flake class but cannot establish fixture isolation or environment stability. Their frozen relation is RECOMMENDED, and no one bounded assessment can prove both scopes.

### Flakiness and real dependency fixtures

**Decision: REJECT MERGE.**

Fixture lifecycle/isolation can create a CI flake, but that is a causal input rather than a shared unit boundary. Flakiness evidence is repeat history, seed, worker/environment and failure artefact; fixture evidence is dependency version, migration, seed, health, persisted/message result and cleanup. A fixture can be trustworthy while a pure unit test flakes, and a stable fixture can still fail to represent engine semantics.

## Proposed singleton boundary review

| Final singleton unit | Strongest real merge candidate(s) | Mechanism/state distinction | Evidence distinction | Failure/debug distinction | Why one bounded assessment should not prove both |
|---|---|---|---|---|---|
| lu-test-risk-strategy-boundaries | lu-test-unit-integration-contract; lu-test-failure-resilience; lu-test-migration-compatibility | L2 risk statement maps a changed mechanism to the narrowest trustworthy boundary; candidate units execute one later boundary-specific strategy. | Risk statement, invariant and escaped-defect history differ from type comparison, injected-fault or version-matrix evidence. | Mock removes the mechanism or E2E obscures the cause; candidates fail through wrong layer, recovery or mixed-version behavior. | It must remain reusable before several L3 mechanisms rather than be assessed only through one later test type. |
| lu-test-ci-flakiness-repeatability | lu-test-time-concurrency-determinism; lu-test-real-dependency-fixtures | Flakiness tracks verdict stability across ordering, state, ports, environment and network; candidates control one interleaving or operate one fixture lifecycle. | Repeat history, seed, order, worker/env and artefact differ from gate events or dependency version/migration/cleanup. | Shared static state, port collision and external network are not solved by a clock gate; a fixture may be sound yet unrelated tests still flake. | A flake investigation must classify broad causes; a deterministic-race or fixture assessment cannot prove that diagnostic scope. |
| lu-test-time-concurrency-determinism | lu-test-ci-flakiness-repeatability; lu-race-atomicity | Controlled clock/gate/interleaving intentionally reaches a known unsafe schedule; flakiness is diagnosis, and race unit owns production interleaving/invariant semantics. | Gate events, controlled clock, task completion and captured interleaving differ from repeat history or business invariant evidence. | Thread.Sleep and occasional passes are test-control failures, not every CI instability or product-race decision. | One case can use both, but it cannot prove broad flake classification and test-control design without overclaiming. |
| lu-test-real-dependency-fixtures | lu-test-unit-integration-contract; lu-test-migration-compatibility | Fixture owns disposable real engine/protocol lifecycle; boundary selection owns test-family choice and migration owns old/new coexistence matrix. | Version, migration, seed, health, persisted/message result and cleanup differ from blind-spot rationale or old/new compatibility results. | In-memory semantic drift, shared DB leak and wrong migration differ from choosing a wrong boundary or rollout incompatibility. | A PostgreSQL case can connect them, but fixture fidelity/lifecycle requires its own transferable proof. |
| lu-test-failure-resilience | lu-rel-failure-injection-verification; lu-test-risk-transfer | Known failure test binds injected fault to outcome, durable state, attempts and recovery; reliability owns production blast radius, while transfer derives an unfamiliar risk. | Injected fault, operation ID, persisted/audit state and recovery result differ from safe-experiment controls or a new risk matrix. | Retry duplicates, partial writes and wrong fallback authority differ from uncontrolled production chaos or copied test shape after architecture moves. | L3 known-mechanism recovery proof should not require L4 redesign reasoning or SRE operating policy. |
| lu-test-risk-transfer | lu-test-failure-resilience; lu-test-unit-integration-contract | L4 transfer derives a changed invariant, boundary and falsifying fixture after architecture moves; candidates apply known failure or boundary mechanisms. | Risk matrix, rejected alternative rationale and new fixture design differ from one recovery trace or one test-type comparison. | Copying an old test shape after the failure boundary moves differs from retry/recovery or mocked-collaborator failures. | Its assessment must vary architecture and require adaptation, so it would over-gate foundational L3 evidence. |
| lu-test-migration-compatibility | lu-api-versioning-compatibility; lu-db-schema-evolution; lu-test-real-dependency-fixtures | Testing owns a transitional old/new state matrix; API/schema own change semantics and fixtures own dependency lifecycle. | Old/new binary/data/event/request, schema version, migration and rollback evidence differ from contract design or fixture health. | Early destructive change and rollback incompatibility differ from defining an API policy or starting a disposable dependency. | A credible assessment must prove coexistence across transition states, not merely the source mechanism or fixture setup. |
| lu-test-property-boundary-fuzz | prog-invariants-domain-model; lu-test-risk-strategy-boundaries | This unit broadens one stated invariant through generators, boundaries and shrinking; candidates define the invariant or prioritize risk. | Property, seed/input, shrunk case and reproducible counterexample differ from domain transition or risk statement evidence. | Weak property, lost seed and rare generated sequence differ from invalid domain state or wrong boundary choice. | The assessment must expose unknown input/state combinations; defining or prioritizing the rule alone cannot prove it. |
| lu-test-review-static-analysis-change-safety | prog-api-refactoring-change-safety; lu-test-risk-strategy-boundaries | Complementary review/static/dynamic evidence evaluates one implementation change; candidates own contract evolution or initial risk selection. | Diff, review rationale, analyzer output, targeted regression and before/after evidence differ from API coexistence or risk matrix. | Style-only review, unexplained suppression and AI diff accepted green differ from contract rollout or boundary selection. | The assessment must combine static and dynamic evidence after a concrete change; neither candidate proves the full evidence workflow. |
| lu-test-unit-integration-contract | lu-test-risk-strategy-boundaries; lu-test-real-dependency-fixtures | Boundary comparison distinguishes deterministic local logic, real-collaborator integration and external compatibility contract; candidates choose risk or operate fixture lifecycle. | Real dependency state, contract, DB rows, double boundary and omitted-semantics evidence differ from risk statement or version/cleanup evidence. | Mocked SQL, HTTP 200 with wrong DB state and provider semantic change differ from an abstract risk choice or leaky fixture. | It must prove what each test type cannot establish, which fixture setup or risk analysis alone cannot demonstrate. |

## Cross-historical lineage

No proposed final unit combines Primaries from different historical units. All final units remain within the source historical unit after the two approved SPLIT decisions.

## Multi-capability assessment review

No multi-capability unit is proposed. The tested candidate pairs fail assessment coherence: each pair either over-gates an L2/L3 foundation, combines distinct control/fidelity states, or treats a prerequisite relation as a grouping rule.

## Decision ledger for later materialization

| Historical unit | Final disposition | Final unit count | Materialization note |
|---|---|---:|---|
| lu-test-ci-flakiness-repeatability | SPLIT | 4 | Replace the four-capability group with four singleton units. |
| lu-test-failure-resilience | SPLIT | 2 | Separate L3 controlled failure verification from L4 risk transfer. |
| lu-test-migration-compatibility | KEEP | 1 | Preserve its singleton. |
| lu-test-property-boundary-fuzz | KEEP | 1 | Preserve its singleton. |
| lu-test-review-static-analysis-change-safety | KEEP | 1 | Preserve its singleton. |
| lu-test-unit-integration-contract | KEEP | 1 | Preserve its singleton. |

No canonical registry, map, audit, dependency row or review status was changed by this analysis-only artifact.
