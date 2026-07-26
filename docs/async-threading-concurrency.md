# Async, Threading & Concurrency

## Mental Model

`async` is a composition model for asynchronous work, not “run on another thread”. I/O awaits release the request thread; CPU work still consumes a thread. Correctness comes from cancellation, ownership and bounded concurrency.

## Must Remember

- Use `await` end-to-end for I/O; `.Result` and `.Wait()` block threads and hide failures in aggregates.
- Pass `CancellationToken` to boundaries that can cancel: HTTP, database, queues and delays.
- `Task.WhenAll` is concurrency, not throttling. Bound fan-out with `SemaphoreSlim` or a channel.
- `lock` protects in-process synchronous state. Do not hold it across `await`.
- `DbContext` is not thread-safe; one concurrent operation per context.

## Quick Comparison

| Primitive | Use for | Avoid when |
|---|---|---|
| `Task` | one async result | modeling an unbounded queue |
| `Channel<T>` | bounded producer/consumer flow | needing cross-process durability |
| `SemaphoreSlim` | throttling a known resource | complex ownership workflows |
| distributed lock | rare single-writer coordination | normal request serialization |

## Production Traps

- Launching thousands of HTTP calls with `WhenAll` overloads connection pools and downstream services.
- Fire-and-forget tasks lose failures when the request scope ends.
- Retrying a non-idempotent write can create duplicate orders.

## Senior Trade-offs

Parallelism reduces wall-clock time only while a downstream dependency has capacity. Prefer a bounded queue with backpressure over unlimited tasks. Use a background service for durable work; it needs retries, shutdown handling and observability.

## Interview Questions

### How would you process 100,000 jobs safely?

**Short answer:** Persist jobs or consume from a durable broker, bound workers to dependency capacity, make handlers idempotent, pass cancellation, and expose queue age, failure and throughput metrics.

**Follow-up:** How do you preserve ordering? What happens on graceful shutdown?

**Red flags:** “Use `Task.Run` for every item.”

## Code / Flow

```csharp
using var gate = new SemaphoreSlim(20);
await Task.WhenAll(items.Select(async item => {
  await gate.WaitAsync(ct); try { await client.SendAsync(item, ct); }
  finally { gate.Release(); }
}));
```

## Final Recall

- Async frees threads for I/O; it does not create capacity.
- Bound concurrency.
- Cancellation is part of the contract.
- Idempotency makes retries safe.
