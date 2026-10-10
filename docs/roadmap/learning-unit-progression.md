# QuanNet Learning-Unit Progression Projection — Stage 2

> **Status:** SEALED — canonical progression projection policy.
>
> **Authority:** This document materializes the progression treatment of the frozen capability dependency registry through the sealed 137-Unit map. It does not change the frozen capability graph, Learning-Unit boundaries, or learner-facing order.

## Scope and exact accounting

The frozen registry contains **332** capability relations: **201 REQUIRED** and **131 RECOMMENDED**. Projection through the canonical Primary-home registry yields:

| Relation location | REQUIRED | RECOMMENDED | Total | Canonical treatment |
|---|---:|---:|---:|---|
| Inter-unit | 174 | 129 | 303 | Use the accepted Stage 2B–2G relation evidence: either `LOCAL_PREREQUISITE_SLICE`, `EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE`, or non-blocking `RECOMMENDED` context/omission. |
| Same Unit | 27 | 2 | 29 | Internal learning/evidence order inside one shared Unit; never a Unit-to-Unit progression lock. |
| **Total** | **201** | **131** | **332** | Every frozen relation is accounted for exactly once. |

The **303** inter-unit records are exactly the union of the sealed Stage 2B–2G inventories and decision tables. One same-unit RECOMMENDED relation, `net-tls-trust-handshake → net-proxy-lb-forwarded-boundary`, remains explicitly recorded in Stage 2B because both capabilities belong to `lu-net-proxy-tls-forwarded-boundary`; it is internal context, not an external edge. The remaining same-unit relationships are derived directly from the canonical Unit registry and retain their shared-assessment order.

## Canonical treatment rules

### `LOCAL_PREREQUISITE_SLICE`

The target Unit teaches the named narrow premise in its own scenario and then assesses its own mechanism. A learner does **not** need a `PASSED` record for the source Unit. The source Unit remains the owner of its full assessment and transfer scope.

### `EXTERNAL_REQUIRED_PREREQUISITE_CANDIDATE`

The target uses substantive earlier evidence that cannot honestly be recreated as a short local recap. This is an **evidence candidate**, not a lock:

- a singleton source Unit can be a compatible whole-Unit evidence candidate only where its sealed proxy-fairness review accepts that match;
- a multi-Primary source, or a rejected singleton proxy, must use capability-compatible evidence if a future policy needs it; it must never imply whole-source-Unit `PASSED`;
- a candidate is included in cycle/root diagnostics even when a whole-Unit proxy is rejected.

No actual unit-to-unit progression locks are materialized by this Stage 2 projection.

An approved future gate policy may choose to turn a *fair*, compatible evidence candidate into a progression rule only after it declares its gate version, fallback/entry-assessment behavior, and compatibility rules. That future policy must not silently promote an incompatible proxy into a `PASSED` requirement.

### `RECOMMENDED`

Every `RECOMMENDED` relation is non-blocking. A sealed review either surfaces it as optional context at a concrete moment in the target scenario or intentionally omits it to avoid distraction. It cannot affect `progression_eligible`.

### Same-Unit relationships

Same-Unit `REQUIRED` relationships define assessment/teaching order within the shared problem. Same-Unit `RECOMMENDED` relationships are optional context. Neither creates a separate course, an external candidate edge, or a Unit `PASSED` lock.

## Learner progression semantics

Capability dependency, candidate evidence and learner access are separate concepts.

1. Published/reference content remains viewable, including for a Unit whose official progression is not currently eligible.
2. The current Stage 2 projection creates no external `PASSED` locks. A learner may enter a target through its local scenario and show target evidence.
3. Where an entry assessment is offered, it measures the target-relevant capability evidence only; it is not a fabricated history requirement.
4. If a future versioned gate policy explicitly adopts a fair external candidate, the learner needs a transparent fallback: take the source evidence task, take a compatible entry assessment, or study the local preparation path. Missing historical records must never be silently interpreted as failure.
5. Historical `PASSED` remains sticky. Weak later recall changes retention/mastery evidence, not past progression history or content visibility.

This deliberately preserves multiple entry roots. It does not invent an arbitrary global course order.

## Global graph acceptance

The executable Stage 2 global validator derives the full **137-Unit** node set, deduplicates candidate unit pairs, includes candidates with rejected whole-Unit proxies for cycle analysis, and verifies:

- **64** unique external candidate Unit pairs;
- **100** roots;
- acyclic candidate graph;
- exact 332-relation coverage with no duplicate, missing, or orphan reviewed key;
- proxy fairness stays separate from candidate-edge existence and from any implemented learner lock.

The authoritative relation-specific rationale remains the sealed Stage 2B–2G review evidence. This policy is their canonical progression interpretation, not a replacement for their concrete scenario and assessment evidence.
