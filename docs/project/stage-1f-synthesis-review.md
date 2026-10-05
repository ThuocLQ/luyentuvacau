# Stage 1F Architecture & Engineering Reasoning Synthesis — Working Evidence

NON-CANONICAL WORKING REVIEW ARTIFACT. This synthesis resolves the approved Testing and Architecture reviews into one materialization blueprint. Final authority remains learning-unit-audit.md and learning-unit-map.md.

## Scope and status

This is a deterministic, analysis-only materialization blueprint for the approved Stage 1F Testing and Architecture reviews. It does not alter canonical architecture, dependency projection, learner-facing content or any sealed Stage 1A–1E decision.

## 1. Historical Decision Ledger

| Historical manifest unit | Disposition | Proposed final unit(s) |
|---|---|---|
| lu-test-ci-flakiness-repeatability | SPLIT | lu-test-risk-strategy-boundaries; lu-test-ci-flakiness-repeatability; lu-test-time-concurrency-determinism; lu-test-real-dependency-fixtures |
| lu-test-failure-resilience | SPLIT | lu-test-failure-resilience; lu-test-risk-transfer |
| lu-test-migration-compatibility | KEEP | lu-test-migration-compatibility |
| lu-test-property-boundary-fuzz | KEEP | lu-test-property-boundary-fuzz |
| lu-test-review-static-analysis-change-safety | KEEP | lu-test-review-static-analysis-change-safety |
| lu-test-unit-integration-contract | MERGE | lu-test-risk-strategy-boundaries |
| lu-arch-boundaries-ownership | SPLIT | lu-arch-requirements-quality-attributes; lu-arch-boundaries-data-ownership; lu-arch-failure-recovery-security-observability |
| lu-arch-consistency-latency-availability | KEEP | lu-arch-consistency-latency-availability |
| lu-arch-cost-complexity-changeability | KEEP | lu-arch-cost-complexity-changeability |
| lu-arch-evolution-migration-strangler | KEEP | lu-arch-evolution-migration-strangler |
| lu-arch-scale-capacity-partitioning | KEEP | lu-arch-scale-capacity-partitioning |
| lu-arch-sync-async-integration | KEEP | lu-arch-sync-async-integration |

Historical totals: **KEEP = 8; SPLIT = 3; MERGE = 1.** Retained historical multi-capability units are KEEP, not MERGE.

## 2. Final Primary allocation

| Final Stage 1F unit | Exact Primary capabilities | Frozen owner | Shape |
|---|---|---|---|
| lu-test-risk-strategy-boundaries | test-risk-strategy-boundaries; test-unit-integration-contract | Testing & Engineering Quality | Multi |
| lu-test-ci-flakiness-repeatability | test-ci-flakiness-repeatability | Testing & Engineering Quality | Singleton |
| lu-test-time-concurrency-determinism | test-time-concurrency-determinism | Testing & Engineering Quality | Singleton |
| lu-test-real-dependency-fixtures | test-real-dependency-fixtures | Testing & Engineering Quality | Singleton |
| lu-test-failure-resilience | test-failure-resilience | Testing & Engineering Quality | Singleton |
| lu-test-risk-transfer | test-risk-transfer | Testing & Engineering Quality | Singleton |
| lu-test-migration-compatibility | test-migration-compatibility | Testing & Engineering Quality | Singleton |
| lu-test-property-boundary-fuzz | test-property-boundary-fuzz | Testing & Engineering Quality | Singleton |
| lu-test-review-static-analysis-change-safety | test-review-static-analysis-change-safety | Testing & Engineering Quality | Singleton |
| lu-arch-requirements-quality-attributes | arch-requirements-quality-attributes | Architecture & System Design | Singleton |
| lu-arch-boundaries-data-ownership | arch-boundaries-ownership; arch-data-ownership-source-of-truth | Architecture & System Design | Multi |
| lu-arch-failure-recovery-security-observability | arch-failure-recovery-security-observability | Architecture & System Design | Singleton |
| lu-arch-consistency-latency-availability | arch-consistency-latency-availability | Architecture & System Design | Singleton |
| lu-arch-cost-complexity-changeability | arch-cost-complexity-changeability; arch-decision-communication-transfer | Architecture & System Design | Multi |
| lu-arch-evolution-migration-strangler | arch-evolution-migration-strangler | Architecture & System Design | Singleton |
| lu-arch-scale-capacity-partitioning | arch-scale-capacity-partitioning | Architecture & System Design | Singleton |
| lu-arch-sync-async-integration | arch-sync-async-integration | Architecture & System Design | Singleton |

Allocation check: **20 Primaries; 17 final units; 14 singleton; 3 multi.** Every scoped Primary occurs exactly once.

## 3. Cross-historical lineage

### lu-test-risk-strategy-boundaries

This final multi-unit combines:

- test-risk-strategy-boundaries from historical lu-test-ci-flakiness-repeatability;
- test-unit-integration-contract from historical lu-test-unit-integration-contract.

Therefore the historical CI unit remains SPLIT, while the historical unit/integration/contract unit becomes MERGE.

No Architecture final unit combines Primaries from different historical Architecture units. lu-arch-cost-complexity-changeability is a retained historical multi and therefore KEEP.

## 4. Multi-unit proof summary

### lu-test-risk-strategy-boundaries

- **Internal order:** test-risk-strategy-boundaries → test-unit-integration-contract.
- **Bounded assessment:** Given a database-backed business-rule change, state the risky invariant; identify PostgreSQL transaction/constraint semantics as the real mechanism; reject mocked unit-only evidence; choose integration; explain the distinct question answered by a contract test; state blind spots.

| Primary capability | Evidence in the same bounded assessment |
|---|---|
| test-risk-strategy-boundaries | Risk statement, real mechanism, selected boundary and rejected alternatives prove risk-driven boundary selection. |
| test-unit-integration-contract | Unit/integration/contract comparison with explicit blind spots proves boundary semantics. |

### lu-arch-boundaries-data-ownership

- **Internal REQUIRED order:** arch-boundaries-ownership → arch-data-ownership-source-of-truth.
- **Bounded assessment:** Given Order as authoritative state plus Redis summary, search index and analytics projection, identify the invariant owner and legal write path; draw contracts; classify every derived copy; set freshness, rebuild and reconciliation evidence; reject direct writes that split authority.

| Primary capability | Evidence in the same bounded assessment |
|---|---|
| arch-boundaries-ownership | Invariant, authorized transition path, owner, contract crossings and deployment responsibility prove the boundary. |
| arch-data-ownership-source-of-truth | Authoritative database/write path, copy role, freshness, rebuild and reconciliation evidence prove source-of-truth reasoning. |

### lu-arch-cost-complexity-changeability

- **Internal order:** no internal REQUIRED edge is invented; the frozen graph keeps arch-cost-complexity-changeability → arch-decision-communication-transfer as RECOMMENDED.
- **Bounded assessment:** A modular monolith is proposed for microservice extraction. Identify the property bought; compare alternatives; estimate deployments, ownership, incidents, data movement, latency, skills and cloud cost; choose or reject the split; record ADR context, constraints, decision, consequences, evidence and revisit trigger.

| Primary capability | Evidence in the same bounded assessment |
|---|---|
| arch-cost-complexity-changeability | Lifecycle-cost comparison against the property bought proves trade-off judgment. |
| arch-decision-communication-transfer | ADR context, assumptions, alternatives, consequences, evidence and revisit trigger prove communicable, revisitable reasoning. |

## 5. Singleton completeness

| Final singleton unit | Strongest merge candidate(s) | Why merge remains rejected |
|---|---|---|
| lu-test-ci-flakiness-repeatability | lu-test-time-concurrency-determinism; lu-test-real-dependency-fixtures | Flakiness diagnoses verdict instability across ordering, shared state, ports, environment and network using repeat history/seed/worker artefacts. Controlled interleaving and fixture lifecycle can cause one class of flake but cannot prove broad diagnosis or repair. |
| lu-test-time-concurrency-determinism | lu-test-ci-flakiness-repeatability; lu-race-atomicity | Clock/gate/ownership control reaches a known schedule with captured interleaving. CI diagnosis owns broad instability; race unit owns production invariant semantics. A sleep/race-control assessment cannot prove either broader boundary. |
| lu-test-real-dependency-fixtures | lu-test-risk-strategy-boundaries; lu-test-migration-compatibility | Fixture owns dependency version, migration, seed, health, isolation, cleanup and persisted/message result. Boundary selection chooses where evidence belongs; migration checks old/new coexistence. A correct integration choice does not prove a sound fixture. |
| lu-test-failure-resilience | lu-rel-failure-injection-verification; lu-test-risk-transfer | Controlled failure test binds injected fault to outcome, durable state, attempts and recovery. Reliability owns production experiment/blast radius; transfer derives a new architecture-specific risk. One known-failure test cannot prove either. |
| lu-test-risk-transfer | lu-test-failure-resilience; lu-test-risk-strategy-boundaries | L4 transfer changes architecture and requires a new invariant, boundary and fixture with rejected-alternative rationale. A known recovery trace or an initial boundary choice does not prove adaptation after the failure boundary moves. |
| lu-test-migration-compatibility | lu-api-versioning-compatibility; lu-db-schema-evolution; lu-test-real-dependency-fixtures | Transitional old/new state matrix, schema/event/request versions and rollback evidence are testing-owned. API/schema own change semantics and fixtures own lifecycle; neither proves coexistence across a rollout. |
| lu-test-property-boundary-fuzz | prog-invariants-domain-model; lu-test-risk-strategy-boundaries | Generated/boundary input, shrinking, seed and reproducible counterexample test broad falsification. Defining an invariant or choosing risk/boundary lacks the unknown-input evidence and debugging loop. |
| lu-test-review-static-analysis-change-safety | prog-api-refactoring-change-safety; lu-test-risk-strategy-boundaries | It combines diff intent, review rationale, analyzer findings and targeted dynamic regression after a concrete change. API evolution or initial risk selection cannot prove the complementary static/dynamic evidence workflow. |
| lu-arch-requirements-quality-attributes | lu-arch-boundaries-data-ownership; lu-arch-sync-async-integration; lu-arch-scale-capacity-partitioning; lu-arch-cost-complexity-changeability | It turns vague need into quality scenario, estimates, constraints and assumption register. Candidate units consume that input for a mechanism decision; embedding it would repeat foundation evidence and hide technology-first/imaginary-scale failures. |
| lu-arch-failure-recovery-security-observability | lu-arch-boundaries-data-ownership; lu-arch-consistency-latency-availability; lu-arch-sync-async-integration | This L4 review evaluates an existing boundary under partial failure, recovery owner, trust path and telemetry evidence. Combining it would over-gate L3 authority/integration choices and conflate normal-state mechanism evidence with production synthesis. |
| lu-arch-consistency-latency-availability | lu-arch-requirements-quality-attributes; lu-arch-boundaries-data-ownership; lu-arch-failure-recovery-security-observability | It selects visibility/order from invariant and failure assumption, then judges stale window, coordination, latency/availability and reconciliation. Requirement framing, authority mapping and broad production review have separate evidence and debug loops. |
| lu-arch-evolution-migration-strangler | lu-arch-boundaries-data-ownership; lu-arch-cost-complexity-changeability | Migration owns seam, partial routing, coexistence, comparison, rollback and retirement. Steady-state authority or ADR economics cannot prove old/new divergence detection and safe retirement. |
| lu-arch-scale-capacity-partitioning | lu-arch-requirements-quality-attributes; obs-latency-throughput-saturation; dist-partitioning-ownership-rebalancing | It turns measured demand into bottleneck/capacity estimate and replica/partition choice. Requirements own assumptions, Observability owns measurement semantics, and Distributed Systems owns rebalance mechanics; no one assessment should re-prove all three. |
| lu-arch-sync-async-integration | lu-arch-requirements-quality-attributes; lu-arch-failure-recovery-security-observability; lu-arch-cost-complexity-changeability | It chooses sync/async from completion semantics, coupling, latency, operation state and recovery. Requirement framing, L4 trust/telemetry synthesis and lifecycle-cost ADR need separate evidence and failures. |

Singleton completeness: 14/14 final singleton units reviewed; 0 missing; 0 generic nearest-related placeholders.

## 6. Prerequisite treatment

Prerequisite classification is materialization metadata/evidence, not a dependency mutation. dependency-map.md remains unchanged and dependency projection remains **NOT FINALIZED**.

| Target / relation | Treatment | Materialization use |
|---|---|---|
| test-risk-strategy-boundaries → test-unit-integration-contract | Internal Primary Order | Risk statement and real mechanism precede test-boundary comparison in the accepted multi-unit. |
| prog-invariants-domain-model → arch-boundaries-ownership | Local Prerequisite Slice | State the invariant under transition without re-teaching Programming ownership. |
| arch-boundaries-ownership → arch-data-ownership-source-of-truth | Internal Primary Order | Establish authority/write path before classifying derived copies. |
| arch-requirements-quality-attributes → arch-sync-async-integration | External Required Prerequisite Candidate | Reusable completion/latency constraint evidence. |
| net-http-semantics → arch-sync-async-integration | Local Prerequisite Slice | Request/response completion slice; Networking retains HTTP mechanics. |
| msg-model-queue-topic-partition-order → arch-sync-async-integration | Local Prerequisite Slice | Independently delivered-work boundary; Messaging retains broker semantics. |
| arch-requirements-quality-attributes → arch-consistency-latency-availability | External Required Prerequisite Candidate | Explicit correctness/quality scenario is required for fair guarantee choice. |
| prog-invariants-domain-model → arch-consistency-latency-availability | Local Prerequisite Slice | State the affected invariant. |
| dist-consistency-linearizability → arch-consistency-latency-availability | External Required Prerequisite Candidate | Visibility/order guarantee and coordination implication stay Distributed Systems-owned. |
| arch-requirements-quality-attributes → arch-scale-capacity-partitioning | External Required Prerequisite Candidate | Workload/growth/latency assumptions are reusable evidence. |
| obs-latency-throughput-saturation → arch-scale-capacity-partitioning | External Required Prerequisite Candidate | Saturation interpretation is substantive Observability evidence. |
| arch-boundaries-ownership → arch-failure-recovery-security-observability | External Required Prerequisite Candidate | L4 synthesis assumes already-evidenced owner/boundary. |
| dist-partial-failure-uncertainty → arch-failure-recovery-security-observability | External Required Prerequisite Candidate | Independent failure/uncertainty is Distributed Systems-owned. |
| sec-trust-boundary-threat-model → arch-failure-recovery-security-observability | External Required Prerequisite Candidate | Trust/asset/actor reasoning is Security-owned. |
| obs-signals-correlation → arch-failure-recovery-security-observability | External Required Prerequisite Candidate | Correlated telemetry semantics are Observability-owned. |
| rel-user-journey-sli-slo-budget → arch-failure-recovery-security-observability | External Required Prerequisite Candidate | User-impact reliability criteria are Reliability-owned. |
| arch-boundaries-ownership → arch-evolution-migration-strangler | External Required Prerequisite Candidate | Migration seam requires prior owner/contract evidence. |
| prog-api-refactoring-change-safety → arch-evolution-migration-strangler | External Required Prerequisite Candidate | Change-safe behavior evidence is Programming-owned. |
| arch-requirements-quality-attributes → arch-cost-complexity-changeability | External Required Prerequisite Candidate | The property bought must be explicit before cost is justified. |
| arch-requirements-quality-attributes → arch-decision-communication-transfer | External Required Prerequisite Candidate | Requirement context and assumptions are ADR evidence. |

Other Testing REQUIRED relations remain unchanged; this synthesis invents no additional dependency treatment.

## 7. Cross-owner review

Stage 1F introduces **0 new multi-owner final units**. The three Stage 1F multi-units are each single-owner.

Architecture consumes evidence from Programming, Distributed Systems, Networking, Messaging, Security, Observability and Reliability without re-owning their mechanisms.

## 8. Count projection

Before Stage 1F canonical materialization:

- Frozen Primaries = 167
- Primary homes = 167
- Learning Units = 132
- singleton = 105
- multi = 27

Stage 1F current historical state contributes 20 Primaries in 12 historical units. Proposed Stage 1F state is 20 Primaries in 17 final units: 14 singleton and 3 multi.

Therefore proposed global state:

- 167 Primary homes
- 137 Learning Units
- 111 singleton
- 26 multi

Check: **111 + 26 = 137.** No Primary may be added, removed or duplicated.

## 9. Conflict check

- Testing and Architecture reviews allocate no shared Primary.
- All 20 Stage 1F Primaries occur exactly once in the proposed final allocation.
- No final unit is empty.
- All 12 historical units have exactly one disposition.
- No Stage 1A–1E canonical decision is reopened.
- No new cross-owner unit is introduced.
- dependency-map.md remains untouched.