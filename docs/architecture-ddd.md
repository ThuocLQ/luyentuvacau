# Modular Monolith, Microservices & DDD

## Mental Model

Architecture is a set of boundaries that makes change safe. A modular monolith can have strong domain boundaries without network calls; microservices add independent deployment and scaling but also distributed failure modes.

## Must Remember

- Split by business capability and ownership, not controller/service/repository layers.
- A bounded context owns its language, data and invariants.
- Start with a modular monolith when one team, one release cadence and local transactions are valuable.
- Extract a service only when independent ownership, scale or reliability needs justify the operational cost.
- Events communicate facts; commands request work. Keep contracts versionable.

## Quick Comparison

| Choice | Strength | Cost |
|---|---|---|
| Modular monolith | simple deploy, local transactions | disciplined module boundaries required |
| Microservices | independent ownership/deploy | latency, observability, consistency |
| CQRS | optimized separate models | duplication and eventual consistency |

## Production Traps

- Shared database turns services into a distributed monolith.
- Synchronous chains turn one slow dependency into a full outage.
- “DDD” classes without real invariants add ceremony but no protection.

## Senior Trade-offs

Prefer the simplest architecture that meets current constraints and leaves an extraction seam. Eventual consistency is acceptable when users can understand it and compensating behavior exists; it is not acceptable for every invariant.

## Interview Questions

### When would you not choose microservices?

**Short answer:** When boundaries and ownership are unclear, independent scaling is unproven, or transaction simplicity matters more than deployment independence. I would first enforce modules and observability in a monolith.

**Follow-up:** What signals justify extraction? How do you migrate safely?

**Red flags:** “Microservices are automatically more scalable.”

## Final Recall

- Boundaries follow business ownership.
- Distribution adds failure modes.
- Protect invariants where they belong.
- Extract based on evidence, not fashion.
