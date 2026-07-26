# EF Core & Data Access

## Mental Model

EF Core translates object queries to SQL; the database executes the plan. Treat EF as a productivity layer, not a reason to ignore SQL, transaction boundaries or data volume.

## Must Remember

- Project only fields needed by the endpoint; use `AsNoTracking` for read models.
- Inspect generated SQL and actual query plans for slow paths.
- Avoid N+1: shape data deliberately with projection, controlled includes or separate batched queries.
- Keep a transaction as short as possible; do not call remote services inside it.
- Use optimistic concurrency tokens where lost updates matter.

## Quick Comparison

| Mode | Best for | Caveat |
|---|---|---|
| Tracking | update a loaded aggregate | memory and change detection overhead |
| `AsNoTracking` | read API/projection | changes are not persisted automatically |
| Explicit transaction | multiple local writes | locks grow with duration |

## Production Traps

- `Include` on multiple collections can explode result rows; measure split queries versus joins.
- Loading entities just to update one column increases lock time and conflict surface.
- A missing composite index makes a “fast locally” endpoint scan production data.

## Senior Trade-offs

Use EF for ordinary transactional workflows and raw SQL where a measured hot query, bulk operation or vendor feature needs it. Do not abandon EF merely because SQL exists; do not hide performance problems behind repositories that expose `IQueryable` everywhere.

## Senior Answer Pattern

For a slow data path, narrate the evidence chain: endpoint latency and row count, generated SQL, actual plan, index/selectivity, then corrected query shape. Include a regression guard such as an integration test, query budget or dashboard. This demonstrates that the fix will survive the next data-volume increase.

## Interview Questions

### How do you prevent N+1 in EF Core?

**Short answer:** Start from the response shape, inspect SQL, then project the data needed in one controlled query or use a deliberate batch. Do not blindly add `Include`; it can create cartesian explosions.

**Follow-up:** When do split queries help? What index supports the predicate?

**Red flags:** “Lazy loading is fine because EF caches.”

## Final Recall

- Query shape and indexes decide latency.
- Keep transactions short.
- Use tracking only when updating.
- Verify SQL in tests and telemetry.
