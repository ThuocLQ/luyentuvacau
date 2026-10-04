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
**Status:** ACTIVE, PENDING MATERIALIZATION

Core additions accepted for controlled amendment:

1. Service discovery/load balancing.
2. Applied cryptography for credentials/tokens.
3. Data encryption and key lifecycle.
4. Durable background jobs/scheduling, subject to canonical-owner coherence check.

Stream Processing is deferred as a specialization candidate.

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
