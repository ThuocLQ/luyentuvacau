# QuanNet Decision Log

> Durable decisions and rationale for future sessions. Historical context only; current canonical artifacts remain authoritative.

## D-001 — Mastery over content volume

**Status:** ACTIVE

QuanNet is a learner-first engineering mastery system, not a content library, checklist, or interview-cram site. Canonical learning-design authority: `docs/engineering-learning-standard.md`.

## D-002 — Capability != Learning Unit

**Status:** ACTIVE

Capability is an engineering competence boundary. Learning Unit is a pedagogical/assessment boundary. Split/merge by shared problem, mechanism/state trace, observable evidence, failure/debug loop, and credible assessment boundary—not by naming similarity.

## D-003 — Mechanism-first, not tool-catalog-first

**Status:** ACTIVE

Kafka, Redis, gRPC, Kubernetes, Quartz, Hangfire, etc. are implementation anchors/transfer surfaces unless they expose a distinct mechanism/evidence boundary with no coherent existing owner.

## D-004 — Analysis is not materialization

**Status:** ACTIVE

Architecture decisions are complete only when affected canonical artifacts agree, stale state is reconciled, semantic and machine checks pass, validation really ran, and the final report reflects actual state. Historical baselines/audits must not be rewritten merely to make validation easier.

## D-005 — Foundation Coverage Audit disposition

**Date:** 2026-10-04  
**Status:** ACTIVE, MATERIALIZED by `5f09fb85e87bfeadce0d7d82a78ffdc50ccc36f1`

The four accepted core gaps were materialized by the controlled amendment:

1. Service discovery/load balancing.
2. Applied cryptography for credentials/tokens.
3. Data encryption and key lifecycle.
4. Durable background jobs/scheduling under Messaging & Event-Driven Consistency.

Stream Processing remains deferred as a specialization candidate.

## D-006 — Controlled amendments preserve historical scope

**Date:** 2026-10-04  
**Status:** ACTIVE

Do not move the Stage-1 baseline to hide later additions.

Required invariant:

`historical manifest capability scope + declared amendment capability scope = current frozen capability set`

with exact set equality, no duplicates, and no undeclared frozen capability.

A REVIEWED batch receiving an amendment must explicitly reopen/revalidate amended semantic scope before returning to REVIEWED.

## D-007 — Repository continuity outranks chat continuity

**Date:** 2026-10-04  
**Status:** ACTIVE

Use `AGENTS.md` for bootstrap rules, canonical docs for source-of-truth semantics, this log for durable rationale, and `docs/project/working-state.md` for the current workflow cursor.

Actual Git state and canonical artifacts outrank this log; this log outranks the working cursor; chat/model memory is convenience only.

## D-008 — Stage 1E Production Engineering seal

**Date:** 2026-10-05

**Status:** SEALED by `7d345586b4e0054ee8488dc746393f0d5b98e8d4`

Stage 1E closed after canonical materialization of 15 historical units: **6 KEEP / 8 SPLIT / 1 MERGE**. Its 30 Primaries now have 26 final Production units (**22 singleton / 4 multi**, including **2 multi-owner**): `lu-rel-health-probes` and `lu-release-rollout-rollback`. Dependency projection remains **NOT FINALIZED**. Architecture & Engineering Reasoning remains **PENDING**. Do not reopen this semantic/canonical review without concrete evidence.

## D-009 — Stage 1 Learning-Unit semantic decomposition sealed

**Date:** 2026-10-06
**Status:** SEALED by `df4d0ed58b87a3632086c0e0ddfb6adbc3a52c55`

Stage 1F canonical materialization is `2d410ddc325b47a0f17fed1890713c103c8181b4`. The sealed decomposition has **167 Primary homes** and **137 final Learning Units** (**111 singleton / 26 multi**, **135 single-owner / 2 multi-owner**); all Stage-1 semantic-review batches are REVIEWED. Dependency/progression projection remains **NOT FINALIZED**. Do not reopen semantic decomposition without concrete evidence.

## D-010 — Roadmap-first, first-chapter release strategy

**Date:** 2026-10-08
**Status:** ACTIVE

Finish roadmap/progression architecture first, validate a reusable lesson pattern through a Golden Pilot, then release one complete first chapter and begin real study. Develop later dependency-valid chapters in parallel with study; do not wait for the full catalog. Chapter packaging follows coherent Learning Units, not forced track order. Do not weaken mastery evidence to ship faster or treat prototype pilots as official start order without dependency evidence. See `docs/project/first-chapter-delivery-plan.md`.

## D-011 — Stage 2D Distributed Interaction sealed

**Date:** 2026-10-08
**Status:** SEALED after independent final acceptance, evidence commit 6b25b816bcdfec1bba1a4ce0474a9d51f72e0ef6.

All 69 relations were reconciled against the frozen registry: **45 REQUIRED** = 29 Local + 16 External candidates; **24 RECOMMENDED** = 21 surfaced + 3 intentionally omitted. The 16 External candidate unit pairs remain candidate-only (not learner locks); local ownership claims and 25 target over-gating records are complete. Combined Foundations + Data + Distributed Interaction graph: 137 units, 37 external unit edges, 118 roots, maximum indegree 5, acyclic. Begin Stage 2E with a bounded Production Safety inventory/review slice; do not reopen sealed Stage 2D without concrete evidence.

## D-012 — Stage 2E Security bounded review accepted

**Date:** 2026-10-10
**Status:** ACTIVE; Stage 2E remains IN_REVIEW

Security has 25 relation-specific decisions across 11 target Learning Units: **18 REQUIRED** = 12 Local slices + 6 External evidence candidates, and **7 RECOMMENDED** = 5 surfaced + 2 omitted. Five singleton whole-unit proxies into `lu-sec-unseen-attack-transfer` are acceptable candidates only. `sec-auth-session-token → sec-authorization-object-tenant` is not a whole-unit proxy: `lu-sec-auth-session-oauth` also owns OAuth/OIDC awareness, so later policy must use compatible authentication evidence rather than whole-unit PASSED. An executable validator and negative tests now enforce inventory identity, row shape, duplicate decisions, proxy membership/fairness and target over-gating coverage. Observability and Reliability / SRE remain unreviewed.

## D-013 — Stage 2E Observability bounded review accepted

**Date:** 2026-10-10
**Status:** ACTIVE; Stage 2E remains IN_REVIEW

Observability has 19 relation-specific decisions across 7 target Learning Units: **9 REQUIRED** = 6 Local slices + 3 External evidence candidates, and **10 RECOMMENDED** = 10 surfaced contexts. The runtime-diagnostics → profiling candidate explicitly rejects whole-unit PASSED because `lu-runtime-diagnostics` is multi-Primary; two singleton evidence candidates into `lu-obs-diagnostic-method` are fair but remain non-locking. The executable graph now derives all 137 Units, includes rejected-proxy candidates, deduplicates pairs and verifies 43 prior+Security edges / 116 roots and 46 prior+Security+Observability edges / 114 roots, acyclic. Reliability / SRE remains unreviewed.

## D-014 — Stage 2E Production Safety sealed

**Date:** 2026-10-10
**Status:** SEALED

Stage 2E independently reconciled all **64** inventory relations (**35 REQUIRED**, **29 RECOMMENDED**) across **27** target Learning Units. The final treatment is 19 Local slices + 16 External evidence candidates and 27 surfaced + 2 omitted non-blocking contexts. All four multi-Primary External sources reject whole-unit PASSED proxy treatment; candidates remain distinct from learner locks. The validator checks frozen dependency membership, the two separately handled same-unit internal relations, exact inventory/target coverage, proxy fairness, duplicate decisions and the full 137-Unit graph. Final graph: **53** unique candidate edges, **108** roots, acyclic. Next task is Stage 2F Delivery & Verification; do not reopen the sealed Stage 2E evidence without concrete contradiction.

## D-015 — Stage 2F Delivery & Testing / Verification sealed

**Date:** 2026-10-10
**Status:** SEALED

Stage 2F reconciled **54** inter-unit relations (**23 REQUIRED**, **31 RECOMMENDED**) across **19** full-scope target Units. Delivery supplied 30 relations, three separately verified same-unit REQUIRED edges and one internal-only target; Testing supplied 24 relations and one same-unit REQUIRED edge. Multi-Primary artifact/provenance and test-boundary sources reject whole-unit PASSED proxies; the remaining singleton External candidates are fair evidence candidates only, not learner locks. The combined 137-Unit graph contains **58** deduplicated candidate edges, **106** roots and no cycle. Next task: Stage 2G Architecture Synthesis; do not reopen sealed Stage 2F evidence without concrete contradiction.

## D-016 — Stage 2G Architecture Synthesis sealed

**Date:** 2026-10-10
**Status:** SEALED

Stage 2G reconciled **31** inter-unit relations (**18 REQUIRED**, **13 RECOMMENDED**) plus two same-unit relations across eight full-scope Architecture Units. It has 11 Local slices and seven External evidence candidates. The singleton quality-attribute Unit is a fair compatible proxy for five synthesis assessments; the multi-Primary boundaries/data-ownership Unit explicitly rejects whole-unit PASSED proxy treatment for failure/recovery and evolution. The combined 137-Unit candidate graph has **64** deduplicated edges, **100** roots and no cycle. Global Stage 2 remains unsealed: perform cross-stage synthesis, proxy-fairness/over-gating acceptance and only then canonical progression materialization.
