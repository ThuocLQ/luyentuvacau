# Race Condition Learning Lab — Source Map

Research date: 2026-09-26. This is authoring traceability, not required reading for learners.

| Source | Type | What was verified or learned | How QuanNet uses it |
|---|---|---|---|
| [Microsoft Learn: `lock` statement](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/lock) | Primary | `lock` grants mutual exclusion for a lock object; other threads wait; `await` cannot appear in its body; current C# 13/.NET 9 guidance mentions a dedicated `System.Threading.Lock`. | Scope explanation and short, version-neutral `lock` lab. |
| [Microsoft Learn: Managed threading best practices](https://learn.microsoft.com/en-us/dotnet/standard/threading/managed-threading-best-practices) | Primary / engineering guidance | A read-increment-write can be preempted; `Interlocked` is suitable for simple atomic state changes. | READ → CHECK → WRITE trace; boundary for `Interlocked`. |
| [Microsoft Learn: TAP with async/await](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/task-asynchronous-programming-model) | Primary | `await` does not block the current thread; `async`/`await` do not themselves create threads. | Narrow correction for “async removes races” misconception. |
| [Microsoft Learn: Synchronizing data for multithreading](https://learn.microsoft.com/en-us/dotnet/standard/threading/synchronizing-data-for-multithreading) | Primary | A synchronized region protects code sharing the same lock object; compiler-generated `try/finally` releases it. | Local `lock`/critical-section explanation. |
| [Race Condition, critical section and lock in C#](https://www.youtube.com/watch?v=zMzo0xcS37o) | Teaching video | Interleaving-first teaching and a visual separation between shared resource, critical section and lock. Technical claims were cross-checked against Microsoft docs. | Inspired the original learner-controlled two-lane timeline; no transcript, diagram or timestamp is reused. |

## Claims intentionally kept out

The lab does not teach memory barriers, cache coherence, `volatile`, lock-free algorithms or distributed-lock recipes. They are not needed to establish shared state, invariant, interleaving, atomicity and correctness boundary.
