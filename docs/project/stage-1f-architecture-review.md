# Stage 1F Architecture & System Design Review — Working Evidence

NON-CANONICAL WORKING REVIEW ARTIFACT. Final authority remains learning-unit-audit.md and learning-unit-map.md. Delete this file after Stage 1F materialization is externally sealed.

## Scope and result

This Stage 1F-B review covers exactly the 6 historical Architecture & System Design units and 10 scoped Primaries. It is analysis-only: canonical registries, dependency rows, review status and learner-facing content remain unchanged.

## 1. Historical decision table

| Historical unit | Decision | Proposed final unit(s) | Exact Primary capabilities | Reason |
|---|---|---|---|---|
| lu-arch-boundaries-ownership | SPLIT | lu-arch-requirements-quality-attributes; lu-arch-boundaries-data-ownership; lu-arch-failure-recovery-security-observability | arch-requirements-quality-attributes; arch-boundaries-ownership + arch-data-ownership-source-of-truth; arch-failure-recovery-security-observability | Requirement framing, L3 authority/source-of-truth design and L4 production synthesis have independent state, evidence and progression boundaries. Boundary ownership and source-of-truth do share one authoritative-write/derived-copy assessment. |
| lu-arch-consistency-latency-availability | KEEP | lu-arch-consistency-latency-availability | arch-consistency-latency-availability | This is one architecture-level guarantee choice: invariant/failure assumption to visibility, stale window, coordination cost and reconciliation path. |
| lu-arch-cost-complexity-changeability | MERGE | lu-arch-cost-complexity-changeability | arch-cost-complexity-changeability + arch-decision-communication-transfer | The modular-monolith versus microservices decision has one option comparison, lifecycle-cost model, ADR evidence and revisit trigger; one bounded assessment credibly proves both L4 Primaries. |
| lu-arch-evolution-migration-strangler | KEEP | lu-arch-evolution-migration-strangler | arch-evolution-migration-strangler | Old/new routing, coexistence, comparison, rollback and retirement form one migration-state mechanism. |
| lu-arch-scale-capacity-partitioning | KEEP | lu-arch-scale-capacity-partitioning | arch-scale-capacity-partitioning | Measured demand, bottleneck evidence, capacity estimate and replica/partition boundary form one scale decision, not a generic partitioning lesson. |
| lu-arch-sync-async-integration | KEEP | lu-arch-sync-async-integration | arch-sync-async-integration | Required completion semantics, lifetime coupling, operation state and recovery model form one integration-style decision. |

Proposed result: 8 final units: 6 singleton and 2 multi. Historical totals: 4 KEEP, 1 SPLIT, 1 MERGE.

## 2. Proposed final allocation

| Proposed final unit | Exact Primary capabilities | Boundary decision |
|---|---|---|
| lu-arch-requirements-quality-attributes | arch-requirements-quality-attributes | Singleton foundation. It turns a vague request into a measurable quality scenario and assumption register without choosing an architecture mechanism. |
| lu-arch-boundaries-data-ownership | arch-boundaries-ownership; arch-data-ownership-source-of-truth | Multi. One authority boundary and its authoritative write path are inseparable in the same order-state/derived-copy case. |
| lu-arch-failure-recovery-security-observability | arch-failure-recovery-security-observability | Singleton L4 synthesis. It evaluates an already-chosen boundary under failure, recovery, trust and evidence paths. |
| lu-arch-consistency-latency-availability | arch-consistency-latency-availability | Singleton L4 guarantee-selection unit. |
| lu-arch-cost-complexity-changeability | arch-cost-complexity-changeability; arch-decision-communication-transfer | Multi. One decision record explains the property bought, lifecycle cost, rejected alternatives and revisit condition. |
| lu-arch-evolution-migration-strangler | arch-evolution-migration-strangler | Singleton migration-state unit. |
| lu-arch-scale-capacity-partitioning | arch-scale-capacity-partitioning | Singleton capacity-and-boundary unit. |
| lu-arch-sync-async-integration | arch-sync-async-integration | Singleton integration-decision unit. |

Allocation check: all 10 scoped Primaries appear exactly once.

## 3. Multi-unit evidence

### lu-arch-boundaries-data-ownership

- **Shared problem:** Order state must have one authority while Redis, search and analytics serve derived copies with different freshness and rebuild needs.
- **Mechanism/state trace:** business invariant/state → authoritative owner and write path → module/service boundary and explicit contract → derived-copy update/read paths → freshness, rebuild and reconciliation boundary.
- **Evidence:** invariant; state owner; allowed write paths; API/event dependency; source version; copy lag/freshness; rebuild source; reconciliation result; deployment owner.
- **Failure/debug loop:** service-per-table or shared database mutation creates two authorities; a derived store accepts an authoritative write; an unrebuildable projection or unexplained lag appears. Debug starts from the invariant and write authority, then traces the contract and derived-copy flow.
- **Bounded assessment:** Given Order, Redis order summary, search index and analytics projection, draw the authoritative write path and contracts; reject illegal direct writes; classify each copy; set freshness/rebuild/reconciliation evidence; explain how an owner change is deployed without splitting the invariant.
- **Transfer:** Replace Redis/search with an event-fed reporting projection or a read replica, then reassess authority, lag evidence and rebuild procedure.

| Primary capability | Evidence in the same bounded assessment |
|---|---|
| arch-boundaries-ownership | invariant, authorized transition path, module/service owner, contract crossings and deployment responsibility prove a coherent ownership boundary. |
| arch-data-ownership-source-of-truth | authoritative database/write path, derived-copy roles, freshness/rebuild/reconciliation evidence prove source-of-truth reasoning. |

### lu-arch-cost-complexity-changeability

- **Shared problem:** Decide whether splitting a modular monolith into microservices buys a required property worth its ongoing lifecycle cost, and leave a decision that a later team can challenge safely.
- **Mechanism/state trace:** quality scenario and constraint → alternatives → deployment/ownership/incident/data-movement/latency/skills/cloud cost → choose or reject split → ADR context, decision, consequences, evidence and revisit trigger.
- **Evidence:** requirement and estimate; option comparison; ownership and incident burden; deployment count; data movement/latency evidence; cost estimate; ADR; rejected alternatives; measurable revisit trigger.
- **Failure/debug loop:** technology-first microservices, hidden operational cost, an ADR without rejected alternatives, or a stale decision after traffic/team constraints change. Debug replays the requirement, assumptions and evidence, then evaluates whether the trigger has actually occurred.
- **Bounded assessment:** Given a modular monolith with one team and a request for independent deployment of a volatile payment integration, identify the property needed; compare modular extraction, internal module and microservice alternatives; estimate lifecycle cost; choose/reject the split; record the ADR and a concrete revisit trigger.
- **Transfer:** Change the deployment independence, team ownership or latency budget and require a revised choice with explicit consequences rather than a copied ADR.

| Primary capability | Evidence in the same bounded assessment |
|---|---|
| arch-cost-complexity-changeability | lifecycle-cost comparison against the property bought, including operational and change cost, proves the trade-off judgment. |
| arch-decision-communication-transfer | context, assumptions, alternatives, decision, consequences, evidence and revisit trigger prove communicable, revisitable reasoning. |

## 4. Singleton merge-review table

| Final singleton unit | Strongest real merge candidate(s) | Mechanism/state distinction | Evidence distinction | Failure/debug distinction | Why one bounded assessment should not prove both |
|---|---|---|---|---|---|
| lu-arch-requirements-quality-attributes | lu-arch-boundaries-data-ownership; lu-arch-sync-async-integration; lu-arch-scale-capacity-partitioning; lu-arch-cost-complexity-changeability | It converts a vague need into scenarios, numbers and explicit constraints; candidates choose a boundary or mechanism using that input. | Requirement list, quality scenario, traffic/data estimate and assumption register differ from write authority, integration completion, saturation or lifecycle-cost evidence. | Technology-first design, imaginary hyperscale and unspoken conflicting qualities are diagnosed before any mechanism is chosen. | A design case can consume a requirement slice, but cannot prove reusable requirement framing without hiding it inside every architecture assessment. |
| lu-arch-failure-recovery-security-observability | lu-arch-boundaries-data-ownership; lu-arch-consistency-latency-availability; lu-arch-sync-async-integration | It tests an already-designed boundary under independent failure, recovery ownership, trust path and telemetry path; candidates choose normal-state authority, guarantee or integration style. | Failure table, recovery owner, threat/trust path, operation ID and correlated signals differ from source-of-truth, stale-window or caller-lifetime evidence. | Missing recovery owner, unmodelled trust boundary and untraceable async work require production synthesis, not L3 boundary design repair. | Combining it would force L4 production reasoning before a learner can demonstrate the L3 authority or integration decision. |
| lu-arch-consistency-latency-availability | lu-arch-requirements-quality-attributes; lu-arch-boundaries-data-ownership; lu-arch-failure-recovery-security-observability | It selects a visibility/order guarantee from an invariant and failure assumption, then accepts a stale window, coordination cost and reconciliation path. | Required read/write history, stale window, latency/availability result and reconciliation proof differ from scenario framing, authority map or broad production review. | Asking for universal strong consistency or accepting stale state for a protected invariant differs from vague requirements or ownership ambiguity. | One assessment must expose the guarantee choice; requirements and source ownership are inputs, while L4 failure synthesis evaluates a larger surface. |
| lu-arch-evolution-migration-strangler | lu-arch-boundaries-data-ownership; lu-arch-cost-complexity-changeability | It manages old owner/path to seam, partial routing, coexistence, comparison, rollback and retirement; candidates decide steady-state authority or compare options. | Routing cohort, old/new result comparison, reconciliation, rollback outcome and retirement evidence differ from one authority map or ADR economics. | Dual-write divergence, leaked traffic to old path and unsafe retirement require migration-state diagnosis, not normal boundary or decision-record repair. | A case can use an ownership seam and an ADR, but neither proves safe coexistence, comparison and rollback across a transition. |
| lu-arch-scale-capacity-partitioning | lu-arch-requirements-quality-attributes; obs-latency-throughput-saturation; dist-partitioning-ownership-rebalancing | It turns measured demand into a bottleneck/capacity estimate and then a replica or partition decision; candidates own input framing, measurement mechanics or repartitioning semantics. | Throughput, concurrency, latency, saturation, queue, capacity calculation and shared-bottleneck evidence differ from a requirement register, telemetry construction or key-rebalance state. | Adding replicas to a shared bottleneck, scaling from growth without measurement and premature sharding are architecture-choice failures. | One assessment must prove the structural choice from evidence, not re-prove requirements, observability or distributed partition mechanics. |
| lu-arch-sync-async-integration | lu-arch-requirements-quality-attributes; lu-arch-failure-recovery-security-observability; lu-arch-cost-complexity-changeability | It selects sync/async from required completion, lifetime coupling, latency, operation state and recovery model; candidates frame needs, inspect production synthesis or compare lifetime cost. | Caller-visible completion, timeout/lifetime, persisted operation state, queue/request trace and recovery outcome differ from quality scenarios, threat/telemetry tables or ADR cost data. | Treating async as a speed label, holding a caller through durable work, or retrying without operation state differs from requirement ambiguity or general cost analysis. | A bounded integration assessment can use a requirement slice, but it cannot fairly prove all L4 security/observability or lifecycle economics. |

## 5. Prerequisite treatment

The following table classifies every scoped incoming REQUIRED relation. It does not change dependency-map.md or create progression locks.

| Primary target | Incoming REQUIRED relation | Treatment | Exact use in proposed unit |
|---|---|---|---|
| arch-boundaries-ownership | prog-invariants-domain-model → arch-boundaries-ownership | Local Prerequisite Slice | State the invariant under transition so boundary authority can be judged; do not re-teach domain modelling. |
| arch-data-ownership-source-of-truth | arch-boundaries-ownership → arch-data-ownership-source-of-truth | Internal Primary Order | In the same multi-unit, identify the invariant owner and write authority before classifying derived copies. |
| arch-sync-async-integration | arch-requirements-quality-attributes → arch-sync-async-integration | External Required Prerequisite Candidate | Completion/latency constraint must be credible before official integration-choice evidence; a local reminder cannot fairly substitute for scenario/assumption evidence. |
| arch-sync-async-integration | net-http-semantics → arch-sync-async-integration | Local Prerequisite Slice | Introduce the request/response caller-visible completion slice; Networking retains HTTP mechanics. |
| arch-sync-async-integration | msg-model-queue-topic-partition-order → arch-sync-async-integration | Local Prerequisite Slice | Introduce independently delivered work/destination boundary; Messaging retains broker semantics. |
| arch-consistency-latency-availability | arch-requirements-quality-attributes → arch-consistency-latency-availability | External Required Prerequisite Candidate | Guarantee selection needs compatible explicit correctness/quality evidence rather than repeated requirements teaching. |
| arch-consistency-latency-availability | prog-invariants-domain-model → arch-consistency-latency-availability | Local Prerequisite Slice | State the operation invariant whose violation or stale observation matters. |
| arch-consistency-latency-availability | dist-consistency-linearizability → arch-consistency-latency-availability | External Required Prerequisite Candidate | The assumed visibility/order guarantee and coordination implication require substantive compatible prior mechanism evidence; Architecture must not re-own it. |
| arch-scale-capacity-partitioning | arch-requirements-quality-attributes → arch-scale-capacity-partitioning | External Required Prerequisite Candidate | Workload/growth/latency assumptions are reusable input evidence, not a per-unit repeat. |
| arch-scale-capacity-partitioning | obs-latency-throughput-saturation → arch-scale-capacity-partitioning | External Required Prerequisite Candidate | Capacity choice requires trustworthy saturation interpretation; Architecture uses it without re-teaching measurement mechanics. |
| arch-failure-recovery-security-observability | arch-boundaries-ownership → arch-failure-recovery-security-observability | External Required Prerequisite Candidate | L4 synthesis assumes a boundary/owner already evidenced; it must not gate L3 boundary learning in reverse. |
| arch-failure-recovery-security-observability | dist-partial-failure-uncertainty → arch-failure-recovery-security-observability | External Required Prerequisite Candidate | Independent failure/uncertainty is substantive mechanism evidence owned by Distributed Systems. |
| arch-failure-recovery-security-observability | sec-trust-boundary-threat-model → arch-failure-recovery-security-observability | External Required Prerequisite Candidate | Actor/asset/trust-boundary reasoning remains Security-owned and cannot be covered by a local label. |
| arch-failure-recovery-security-observability | obs-signals-correlation → arch-failure-recovery-security-observability | External Required Prerequisite Candidate | Correlated signal semantics are a real observability prerequisite, not generic logging context. |
| arch-failure-recovery-security-observability | rel-user-journey-sli-slo-budget → arch-failure-recovery-security-observability | External Required Prerequisite Candidate | User-impact reliability criteria prevent generic redundancy choices and require compatible SRE evidence. |
| arch-evolution-migration-strangler | arch-boundaries-ownership → arch-evolution-migration-strangler | External Required Prerequisite Candidate | A safe migration seam depends on already-demonstrated old/new ownership and contract boundaries. |
| arch-evolution-migration-strangler | prog-api-refactoring-change-safety → arch-evolution-migration-strangler | External Required Prerequisite Candidate | Behavior-preserving/explicitly migrated change safety is substantive Programming evidence. |
| arch-cost-complexity-changeability | arch-requirements-quality-attributes → arch-cost-complexity-changeability | External Required Prerequisite Candidate | The property being bought must be explicit before lifecycle cost can be justified. |
| arch-decision-communication-transfer | arch-requirements-quality-attributes → arch-decision-communication-transfer | External Required Prerequisite Candidate | Decision context and assumptions are the reusable evidence basis of an ADR. |

RECOMMENDED Architecture relations remain recap, applied context or transfer material; they do not create hard progression eligibility.

## 6. Cross-historical lineage

No proposed final unit combines Primaries from different historical Architecture units. The only accepted multi-units are internal to their historical source:

- lu-arch-boundaries-data-ownership combines the boundary-ownership and source-of-truth outputs of the SPLIT lu-arch-boundaries-ownership mega-unit.
- lu-arch-cost-complexity-changeability retains the two capabilities from its existing historical unit after the MERGE pressure test accepts their shared assessment.

## 7. Cross-owner boundaries

No cross-owner merge is accepted. Architecture consumes and synthesizes Distributed Systems, Reliability, Security, Observability, Networking, Messaging and Programming evidence without re-owning their implementation mechanisms. Their frozen REQUIRED edges are prerequisite/evidence boundaries, not reasons to create cross-owner multi-units.

## 8. Decision ledger for later materialization

| Historical unit | Final disposition | Final unit count | Materialization note |
|---|---|---:|---|
| lu-arch-boundaries-ownership | SPLIT | 3 | Create requirement foundation, authority/source-of-truth multi-unit and L4 production-synthesis singleton; remove the four-capability mega-unit. |
| lu-arch-consistency-latency-availability | KEEP | 1 | Preserve its singleton. |
| lu-arch-cost-complexity-changeability | MERGE | 1 accepted multi | Preserve both Primaries together with canonical-v2 proof evidence. |
| lu-arch-evolution-migration-strangler | KEEP | 1 | Preserve its singleton. |
| lu-arch-scale-capacity-partitioning | KEEP | 1 | Preserve its singleton. |
| lu-arch-sync-async-integration | KEEP | 1 | Preserve its singleton. |

No canonical registry, map, audit, dependency row or review status was changed by this analysis-only artifact.

## 9. Final count check

- Historical Architecture units: 6
- Scoped Primaries: 10
- Proposed final units: 8
- Proposed singleton count: 6
- Proposed multi count: 2