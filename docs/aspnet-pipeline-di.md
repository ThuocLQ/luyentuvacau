# Request Pipeline, DI & Configuration

## Mental Model

ASP.NET Core is an ordered request pipeline. Middleware can short-circuit, enrich or handle errors; DI constructs the object graph per lifetime. Production bugs usually come from incorrect order, lifetime mismatch or configuration that fails late.

## Must Remember

- Exception handling belongs early; authentication precedes authorization; endpoints run after routing.
- Singleton: application lifetime. Scoped: request/message lifetime. Transient: new instance each resolution.
- A singleton must not capture scoped state. Use `IServiceScopeFactory`/factory at the operation boundary.
- Bind options once, validate on startup and use `IOptionsMonitor` only for legitimate reloads.
- Middleware should be small, explicit and avoid reading the response body unless required.

## Quick Comparison

| Lifetime | Typical examples | Danger |
|---|---|---|
| Singleton | stateless client, cache, config reader | captured request state |
| Scoped | DbContext, unit-of-work, current user | used after request ends |
| Transient | lightweight formatter/handler | expensive graph repeatedly built |

## Production Traps

- Registering `DbContext` as singleton causes concurrency and stale tracking failures.
- Logging secrets because configuration objects are dumped at startup.
- Authentication middleware after endpoints means policies never see a principal.

## Senior Trade-offs

Keep cross-cutting concerns such as correlation, errors and auth in middleware; keep business decisions in endpoints/handlers. Avoid “service locator” resolution inside application code because dependencies become invisible and hard to test.

## Senior Answer Pattern

When asked about a pipeline issue, walk the request from ingress to endpoint: correlation/error handling, forwarded headers, routing, authentication, authorization and endpoint execution. For DI questions, identify the state owner and lifetime before choosing a registration. That sequence catches both ordering bugs and captured-scope bugs.

## Interview Questions

### Why is DI lifetime a correctness concern, not only performance?

**Short answer:** Lifetime defines ownership and thread/request boundaries. Capturing a scoped DbContext in a singleton crosses both boundaries and can use disposed or concurrent state.

**Follow-up:** How do hosted services use scoped dependencies?

**Red flags:** “Singleton is always faster, so use it everywhere.”

## Final Recall

- Pipeline order is behavior.
- Match service lifetime to state lifetime.
- Validate configuration before serving traffic.
- Keep middleware cross-cutting.
