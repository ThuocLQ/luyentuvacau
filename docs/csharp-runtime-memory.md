# C# Runtime & Memory

## Mental Model

Managed memory removes manual `free`, not ownership. Every allocation adds GC work; every long-lived reference changes when memory can be reclaimed. Senior answers connect allocation rate, object lifetime and latency rather than saying “the GC handles it”.

## Must Remember

- Generational GC optimizes for objects that die young; Gen2 collections are expensive and pause-sensitive.
- `IDisposable` releases scarce unmanaged resources; it does **not** mean memory is immediately collected.
- `using`/`await using` expresses ownership. Do not dispose an object you did not create or receive as owned.
- Avoid accidental retention: static caches, event handlers, closures and large object graphs.
- Prefer `Span<T>`, pooling and streaming only after measuring allocation pressure.

## Quick Comparison

| Tool | Solves | Cost / warning |
|---|---|---|
| `using` | deterministic resource release | only for owned disposable resources |
| `ArrayPool<T>` | repeated large buffers | return in `finally`; clear sensitive data |
| `Span<T>` | zero-copy local slicing | stack-only; cannot cross `await` |
| `WeakReference` | optional cache entries | not a correctness mechanism |

## Production Traps

- Materializing a multi-million-row query before streaming can trigger LOH pressure and long Gen2 pauses.
- Keeping request objects in singleton state leaks tenant/user data across requests.
- Finalizers delay reclamation; use `SafeHandle` and deterministic cleanup instead.

## Senior Trade-offs

Pool buffers when allocation profiling shows a hot path and the lifetime is controlled. Do not pool small, infrequent allocations: complexity, stale data and double-return bugs can cost more than GC. Cache only data with an explicit size, expiry and invalidation policy.

## Senior Answer Pattern

Start with the workload: request rate, payload size, allocation profile and p99 impact. Then name the ownership boundary (`using`, request scope, cache expiry), show the diagnostic you would inspect (allocation rate, Gen2/LOH collections, retaining path), and only then propose pooling or streaming. This makes the answer operational rather than a list of runtime features.

## Interview Questions

### Why can a managed application still run out of memory?

**Short answer:** Reachability, not manual allocation, determines collection. A static cache, long-lived queue, LOH fragmentation or allocation rate faster than collection can exhaust the process.

**Follow-up:** How would you find the retaining path? What metrics distinguish leak from traffic growth?

**Red flags:** “GC always frees unused memory immediately.”

## Code / Flow

```csharp
await using var stream = await blob.OpenReadAsync(ct);
await stream.CopyToAsync(response.Body, ct); // stream; do not buffer whole blob
```

## Final Recall

- Measure allocation and retention before optimizing.
- Dispose resources deterministically.
- Bound caches and queues.
- Explain lifetime before naming a GC generation.
