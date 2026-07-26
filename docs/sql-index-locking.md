# SQL, Index, Transactions & Locking

## Mental Model

The database protects correctness and executes the plan; application code only requests work. A senior answer starts with the invariant and access pattern, then chooses a constraint, transaction scope, isolation behavior and index—not a generic “add an index”.

## Must Remember

- A unique constraint is the final protection for a uniqueness invariant; application pre-checks are advisory.
- Composite index column order follows selective predicates and ordering, not table column order.
- Transactions hold resources while work runs; keep them local and short.
- Deadlocks are normal under contention. Capture the graph, make access order consistent, then retry only the known transient operation.
- Isolation controls anomalies; choose it based on the business invariant, not habit.

## Quick Comparison

| Need | Default direction | Trade-off |
|---|---|---|
| Prevent duplicate business key | unique constraint | caller handles conflict |
| Read latest committed data | read committed | repeated reads may differ |
| Protect optimistic update | rowversion / concurrency token | caller resolves conflict |
| Speed a query | measured covering/composite index | extra write/storage cost |

## Production Traps

- Indexing every filter degrades writes and can still miss the query ordering.
- Retrying an entire business workflow after a deadlock can duplicate external effects.
- Long transactions around HTTP calls create lock queues and cascading latency.

## Senior Trade-offs

Use optimistic concurrency when conflicts are uncommon and users can retry/merge. Use stricter serialization only when the invariant truly requires it and the contention cost is acceptable. A database transaction cannot make a remote call atomic; use an outbox or compensation boundary.

## Senior Answer Pattern

State the invariant, show the unique/foreign-key/transaction boundary that enforces it, then describe the query plan and retry policy. Finish with the operational proof: slow-query dashboard, deadlock count and conflict-rate alert.

## Interview Questions

### How do you handle a deadlock in a payment or order update?

**Short answer:** Keep the transaction small, access rows in a consistent order, inspect the deadlock graph, and retry only the local idempotent database operation with bounded backoff. I do not repeat external side effects inside that retry.

**Follow-up:** Which isolation level is active? How do you make the command idempotent?

**Red flags:** “Raise transaction timeout” or “retry forever.”

## Final Recall

- Constraints protect invariants.
- Indexes follow measured query shape.
- Deadlocks need diagnosis plus bounded retry.
- Never hold a DB transaction across remote I/O.
