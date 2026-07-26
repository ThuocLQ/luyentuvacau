# Background Jobs, Caching & Resilience

## Mental Model

Background work moves a request out of the user-facing latency path; it does not make work durable by itself. Resilience is a budgeted response to known transient failure, not a collection of retries around every call.

## Must Remember

- `BackgroundService` owns graceful start/stop; create a scope for scoped dependencies per work item.
- Durable work needs persistent state or a broker before acknowledgement.
- Cache-aside reads source on miss, writes with explicit TTL and invalidates after authoritative change.
- Every dependency call needs timeout/deadline, cancellation and bounded retry policy.
- Protect dependencies with concurrency limits/bulkheads; use circuit breaking when failure is sustained.

## Quick Comparison

| Pattern | Good for | Risk |
|---|---|---|
| In-process background service | short local work | lost on process restart |
| Durable queue | retriable business work | needs idempotent consumer |
| Cache-aside | read-heavy tolerant data | stale data / stampede |
| Retry with jitter | transient faults | amplifies overload if unbounded |

## Production Traps

- Fire-and-forget from an HTTP request loses exceptions and scoped dependencies after response completion.
- Cache invalidation after a failed write can expose impossible state; update the source first.
- Retrying timeouts without an idempotency boundary can duplicate money movement or email.

## Senior Trade-offs

Cache only data whose staleness is acceptable and observable. Prefer a queue when the business requires eventual completion after process failure. Use retry only when the failure is plausibly transient, the operation is safe to repeat and the caller still has time budget.

## Senior Answer Pattern

Name the delivery guarantee, acknowledgement point, idempotency key and shutdown behavior. For caching, state source of truth, freshness window, invalidation path and stampede protection. Then expose queue age, cache hit rate, timeout rate and retry exhaustion as operating signals.

## Interview Questions

### When would you not retry an HTTP request?

**Short answer:** I do not retry a non-idempotent operation without a key or server-side deduplication, a validation/auth failure, or a request after its deadline. Retrying should be bounded and jittered so it does not turn an outage into overload.

**Follow-up:** How do you stop workers safely? How do you handle a poison message?

**Red flags:** “Retry every exception three times.”

## Final Recall

- Durable work needs a durable handoff.
- Timeouts and cancellation are part of the contract.
- Cache freshness is a product decision.
- Retries need safety, budget and observability.
