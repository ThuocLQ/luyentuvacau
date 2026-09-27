# Outbox & Idempotency — Source Map

Research date: 2026-09-27  
Target runtime/product/version: Conceptual relational-database pattern; EF Core transaction behavior applies when the configured provider supports transactions. Broker delivery semantics are product- and contract-specific.  
Purpose: authoring traceability. Core lesson must remain self-contained.

## Learning question

What durable state remains at each crash point when an operation must save business data and notify another service, and where must duplicate protection live?

## Concept dependency map

```text
create Order + notify Inventory
→ save then publish / publish then save
→ one side can survive a crash while the other does not
→ persist notification intent with business state
→ Transactional Outbox
→ relay can republish after crash
→ durable processed-event state + unique constraint
→ inspect database, delivery and provider-status evidence
```

## Sources

| Source | Type / role | Version/date | Fact or concept verified | Teaching insight extracted | How QuanNet uses it |
|---|---|---|---|---|---|
| [EF Core transactions](https://learn.microsoft.com/en-us/ef/core/saving/transactions) | Primary fact | Current, accessed 2026-09-27 | A supported provider applies a single `SaveChanges` atomically; explicit transaction APIs define a larger local boundary. | Start by making the local boundary visible, not by naming a pattern. | Explains why Order + Outbox can commit together without claiming DB + broker atomicity. |
| [AWS Transactional Outbox](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html) | Primary architecture guidance | Current, accessed 2026-09-27 | Dual writes can leave inconsistent state; relays may duplicate messages; consumers should track processed messages. | A crash timeline makes the need and residual duplicate risk concrete. | Grounds the Order/Inventory failure trace and consumer dedupe boundary. |
| [PostgreSQL unique constraints](https://www.postgresql.org/docs/current/ddl-constraints.html) | Primary fact | PostgreSQL 18 current docs, accessed 2026-09-27 | A unique constraint enforces uniqueness across constrained values. | Code-level “check then insert” is not the final guard under concurrency. | Explains why `ProcessedEvents.EventId` needs a database unique rule. |
| [Transactional Outbox pattern](https://microservices.io/patterns/data/transactional-outbox) | Teaching source; cross-checked above | Accessed 2026-09-27 | Relay can crash after publish before recording progress, requiring an idempotent consumer. | The two naive orders reveal the need before the term appears. | Informs original causal sequence and crash-state visual; no prose/diagram copied. |
| [Azure Retry pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/retry) | Primary architecture guidance | Current, accessed 2026-09-27 | A response can be lost after a service processed the request; non-idempotent retries can repeat side effects. | A timeout is evidence of uncertainty, not proof of failure. | Grounds unknown-outcome/reconciliation scenario. |

## Misconceptions / failure cases found during research

- Outbox does not create an atomic transaction across database and broker.
- A relay can publish then crash before durable progress is recorded; duplicate delivery is possible.
- `AnyAsync` followed by insert is not enough when two consumers race; uniqueness must be enforced by the database.
- Idempotent consumer handling protects the local side effect it encloses, not an unrelated payment/email provider.
- A timeout can leave the caller without an outcome even when the provider acted.
- Without provider idempotency/status/callback or another authoritative source, local state cannot prove an external email side effect was sent exactly once.

## Version / workload boundaries

- The lesson is broker-neutral. Publisher confirms, acknowledgements, ordering and retries must follow the selected broker/client delivery contract.
- The EF Core snippet is illustrative; actual transaction/retry behavior depends on provider and configured execution strategy.
- Unique-violation detection is provider-specific. The invariant is one database-enforced event identity.
- Ordering is not global by default; define scope such as per Order only when the business flow needs it.
- The local visual deliberately demonstrates two relay publish attempts, then two controlled consumer deliveries of the same event and local dedupe. It does not assert that publish attempt, broker acceptance or consumer delivery are equivalent, or that any broker has a universal delivery guarantee.

## Claims intentionally kept out

List topics intentionally excluded so the lesson does not become an encyclopedia.

- Kafka/RabbitMQ configuration, partition design and broker-specific exactly-once features.
- 2PC implementation and distributed transaction setup.
- CDC/log-tailing implementation details.
- Full Saga/compensation design.
- Payment-provider-specific status or idempotency contracts.
- A guarantee that an unqueryable external provider both receives an action once and never loses it.

## Originality note

QuanNet may use sources to verify facts and learn teaching patterns, but must not copy/translate:

- transcripts;
- article prose;
- diagrams;
- screenshots;
- distinctive examples;
- near-identical animation sequences.

## Research stop check

Stop when:

- [x] core mechanism verified;
- [x] important misconceptions known;
- [x] version boundary understood;
- [x] teaching representation is clear;
- [x] lab can verify the mechanism;
- [x] production trade-offs are sufficiently grounded.