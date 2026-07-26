# Finance / Securities Domain Cheatsheet

## Mental Model

Finance systems are state machines with money and ownership invariants. An order, execution, position, cash ledger and settlement instruction are related records, but they do not become true at the same instant. Explain the lifecycle, source of truth and reconciliation boundary before naming technology.

## Must Remember

- Keep separate state machines: an order can be accepted, routed, partially filled, cancelled or expired; each filled quantity can then be allocated and settled. Cancellation stops remaining open quantity, not already executed quantity.
- Buying power is a risk control, not the cash balance. Reserve it before accepting a risk-increasing order and release/adjust it deterministically.
- Execution is a market fact; allocation assigns that fact to accounts; settlement exchanges cash and securities later.
- Use append-only or auditable ledgers for monetary movements. Balances are derived views with clear correction rules.
- Every externally visible state needs an identifier, timestamp, actor/source and immutable audit trail.

## Quick Comparison

| Concept | Meaning | Common mistake |
|---|---|---|
| Order | client instruction | treating acceptance as execution |
| Execution | fill from market/venue | overwriting partial-fill history |
| Ledger | accounting movements | storing only mutable balance |
| Settlement | final delivery/payment | assuming trade date equals settlement date |

## Production Traps

- Duplicate execution messages can double credit a position unless the execution/venue key is idempotent.
- A retry after timeout can submit an order twice unless client order IDs are unique and outcomes are queryable.
- EOD jobs that silently skip an account create tomorrow's reconciliation incident; checkpoints and counts are mandatory.
- Rounding, currency and timezone rules must be explicit; never use floating point for money.

## Senior Trade-offs

Use synchronous validation for immediate risk and user feedback; use durable events for downstream notifications, reporting and reconciliation. A strong ledger gives auditability but requires correction entries rather than mutable edits. Link to core cheatsheets for retries, outbox, transactions and observability—do not re-implement those concepts here.

## Senior Answer Pattern

Anchor the answer on the invariant first: no duplicate execution, no negative buying power beyond policy, and every balance explainable by ledger entries. Then separate the immediate customer path from delayed settlement/EOD work, name the reconciliation source and explain the correction process without mutating history.

## Interview Questions

### How do you make order processing safe under retries?

**Short answer:** Give every client instruction and execution a stable business identifier, persist the state transition and ledger effect atomically within the local source-of-truth transaction, and make each consumer reject or replay duplicates deterministically. Cross-service propagation uses an outbox and reconciliation detects disagreement with venues or custodians.

**Follow-up:** How are partial fills represented? When do you release buying power?

**Red flags:** “Use a distributed lock around the order” or “the broker will not resend.”

## Final Recall

- Model lifecycle and invariants first.
- Money needs auditable movements, not only balances.
- Separate trade, allocation and settlement.
- Reconciliation is a product feature, not a batch afterthought.
