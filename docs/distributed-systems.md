# Messaging, Idempotency & Outbox

## Mental Model

Distributed systems exchange messages across unreliable boundaries. A message may be delayed, duplicated or redelivered. Design for at-least-once delivery and make handlers correct when repeated.

## Must Remember

- The dual-write problem occurs when database state and broker publish are separate operations.
- Transactional outbox stores event intent with state in one transaction; a relay publishes later.
- Consumer idempotency needs a stable message/business key and durable deduplication or invariant.
- Ordering is normally only meaningful within a key/partition; do not assume global order.
- Retries need bounded attempts, backoff, jitter and a dead-letter/review path.

## Quick Comparison

| Pattern | Guarantees | Does not guarantee |
|---|---|---|
| Outbox | no lost publish after committed state | exactly-once processing |
| Idempotent consumer | duplicate-safe effect | correct message ordering |
| Saga | explicit multi-step compensation | ACID across services |

## Production Traps

- Marking an outbox row sent before broker confirmation loses events.
- A poison message retried forever blocks partitions and hides incidents.
- “Exactly once” broker settings do not make an external payment call exactly once.

## Senior Trade-offs

Asynchronous events improve resilience and decouple releases, but add delayed visibility and operational tooling. Use synchronous calls for immediate user decisions; use events for facts and work that can safely converge.

## Interview Questions

### Does the outbox give exactly-once delivery?

**Short answer:** No. It closes the database-to-broker dual-write gap but publisher and consumer retries can duplicate delivery. The consumer must be idempotent and the system must support replay.

**Follow-up:** How do you clean dedup records? How do you monitor relay lag?

**Red flags:** “Kafka means duplicates cannot happen.”

## Final Recall

- Assume duplicates and delay.
- Persist event intent atomically.
- Idempotency is business-level correctness.
- Operate retries and DLQ deliberately.
