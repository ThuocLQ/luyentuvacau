# API Design, Validation & Security

## Mental Model

An API is a long-lived contract with untrusted callers. Design for clear resource semantics, predictable failures and safe retries. Validation prevents bad input; authorization decides whether a valid caller may perform a specific action.

## Must Remember

- Use stable resource identifiers, explicit pagination and consistent error envelopes.
- Validate shape at the edge, enforce domain invariants in the domain/application layer.
- Authenticate identity; authorize action and resource ownership.
- Treat idempotency keys as a persisted protocol for retryable writes, not a header you merely log.
- Never trust client-supplied tenant, role, price or ownership fields.

## Quick Comparison

| Concern | Question |
|---|---|
| Validation | Is this command structurally and semantically valid? |
| Authorization | May this principal perform it on this resource? |
| Idempotency | Can a repeated request produce the same outcome safely? |

## Production Traps

- Returning database exceptions leaks schema and turns client errors into 500s.
- Offset pagination drifts on a changing dataset; use a cursor for large/live feeds.
- Caching an authorized response without tenant/user-aware keys leaks data.

## Senior Trade-offs

Version only when a breaking contract cannot be evolved compatibly. Strict validation gives reliable contracts but needs clear migration paths. Rate limits protect dependencies but should return actionable retry information.

## Interview Questions

### How do you make POST create-order safe to retry?

**Short answer:** Require an idempotency key scoped to caller and operation, persist request fingerprint plus outcome atomically with the order, and return the stored outcome for the same key.

**Follow-up:** What if the same key has different payload? How long do you retain keys?

**Red flags:** “The client just retries until it works.”

## Final Recall

- Contract first, implementation second.
- Validate input and enforce invariants separately.
- Authorize resources, not only roles.
- Make writes retry-safe deliberately.
