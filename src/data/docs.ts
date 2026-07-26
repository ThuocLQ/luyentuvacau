import runtime from '../../docs/csharp-runtime-memory.md?raw'
import asyncConcurrency from '../../docs/async-threading-concurrency.md?raw'
import pipeline from '../../docs/aspnet-pipeline-di.md?raw'
import apiSecurity from '../../docs/api-design-security.md?raw'
import efSql from '../../docs/ef-core-sql.md?raw'
import architecture from '../../docs/architecture-ddd.md?raw'
import distributed from '../../docs/distributed-systems.md?raw'
import production from '../../docs/observability-incidents.md?raw'
import finance from '../../docs/backend-finance.md?raw'
import type { CheatsheetMeta, InterviewQuestion } from '../types/content'

export const sections = ['Interview Map', 'Core .NET', 'ASP.NET Core', 'Data', 'Architecture', 'Distributed Systems', 'Production', 'System Design', 'Interview', 'Specialization']

const draft = (slug: string, title: string, section: string, order: number, tags: string[], interviewWeight: CheatsheetMeta['interviewWeight'] = 'Medium'): CheatsheetMeta => ({
  slug, title, section, order, tags, interviewWeight, status: 'Draft', readingMinutes: 0,
  description: 'Planned in the interview map; it will appear in the learning flow when its cheatsheet is reviewed.'
})

export const docs: CheatsheetMeta[] = [
  draft('interview-map', '00. Senior Backend .NET Interview Map', 'Interview Map', 0, ['Map', 'Senior'], 'Critical'),
  { slug: 'runtime-memory', title: '01. C# Runtime & Memory', section: 'Core .NET', order: 1, readingMinutes: 9, tags: ['GC', 'Memory', 'CLR'], interviewWeight: 'Critical', status: 'Complete', description: 'Allocation, GC, async state machines, disposal and memory pressure.', content: runtime },
  { slug: 'async-concurrency', title: '02. Async, Threading & Concurrency', section: 'Core .NET', order: 2, readingMinutes: 10, tags: ['async', 'ThreadPool', 'Locks'], interviewWeight: 'Critical', status: 'Complete', description: 'Non-blocking I/O, cancellation, synchronization and bounded work.', content: asyncConcurrency },
  draft('collections-linq', '03. Collections, LINQ & Exceptions', 'Core .NET', 3, ['LINQ', 'Collections']),
  { slug: 'aspnet-pipeline', title: '04. Request Pipeline, DI & Configuration', section: 'ASP.NET Core', order: 4, readingMinutes: 9, tags: ['Middleware', 'DI', 'Options'], interviewWeight: 'Critical', status: 'Complete', description: 'Ordering, lifetime boundaries, configuration validation and request composition.', content: pipeline },
  { slug: 'api-security', title: '05. API Design, Validation & Security', section: 'ASP.NET Core', order: 5, readingMinutes: 10, tags: ['REST', 'Auth', 'Validation'], interviewWeight: 'Critical', status: 'Complete', description: 'Contract design, idempotency, validation and secure defaults.', content: apiSecurity },
  draft('background-resilience', '06. Background Jobs, Caching & Resilience', 'ASP.NET Core', 6, ['Cache', 'Retry']),
  { slug: 'ef-sql', title: '07. EF Core & Data Access', section: 'Data', order: 7, readingMinutes: 10, tags: ['EF Core', 'Tracking', 'SQL'], interviewWeight: 'Critical', status: 'Complete', description: 'Query shape, transactions, N+1 avoidance and safe data boundaries.', content: efSql },
  draft('sql-index-locking', '08. SQL, Index, Transactions & Locking', 'Data', 8, ['Index', 'Locking'], 'High'),
  { slug: 'architecture', title: '09. Modular Monolith, Microservices & DDD', section: 'Architecture', order: 9, readingMinutes: 10, tags: ['DDD', 'Microservices', 'Boundaries'], interviewWeight: 'Critical', status: 'Complete', description: 'Choose boundaries before distributing complexity.', content: architecture },
  draft('integration-design', '10. REST, gRPC, CQRS & Event-Driven Design', 'Architecture', 10, ['CQRS', 'gRPC'], 'High'),
  { slug: 'distributed-systems', title: '11. Messaging, Idempotency & Outbox', section: 'Distributed Systems', order: 11, readingMinutes: 10, tags: ['Outbox', 'Kafka', 'Idempotency'], interviewWeight: 'Critical', status: 'Complete', description: 'Delivery is at-least-once; correctness comes from design.', content: distributed },
  draft('consistency-saga', '12. Retry, Ordering, Saga & Consistency', 'Distributed Systems', 12, ['Saga', 'Ordering'], 'High'),
  draft('performance-scale', '13. Performance & Scalability', 'Production', 13, ['Scale', 'Latency'], 'High'),
  { slug: 'observability-incidents', title: '14. Observability, Testing & Security', section: 'Production', order: 14, readingMinutes: 9, tags: ['Logs', 'Tracing', 'Incidents'], interviewWeight: 'Critical', status: 'Complete', description: 'Make production behavior observable, testable and safe to change.', content: production },
  draft('docker-cicd', '15. Docker, CI/CD & Production Incidents', 'Production', 15, ['Docker', 'CI/CD'], 'High'),
  draft('system-design-framework', '16. System Design Framework', 'System Design', 16, ['System Design'], 'High'),
  draft('design-scenarios', '17. Common Design Scenarios', 'System Design', 17, ['Scenarios'], 'High'),
  draft('core-question-bank', '18. Core Question Bank', 'Interview', 18, ['Questions'], 'Critical'),
  draft('senior-followups', '19. Senior Follow-up & Trade-off Questions', 'Interview', 19, ['Trade-offs'], 'Critical'),
  draft('project-stories', '20. Project Stories & Mock Interview', 'Interview', 20, ['STAR', 'Mock'], 'High'),
  { slug: 'finance-securities', title: '21. Finance/Securities Domain Cheatsheet', section: 'Specialization', order: 21, readingMinutes: 12, tags: ['Order', 'Settlement', 'Ledger'], interviewWeight: 'Specialized', status: 'Review', description: 'Domain invariants for order lifecycle, settlement, EOD and reconciliation.', content: finance }
]

export const completeDocs = docs.filter(doc => doc.content)
export const findDoc = (slug?: string) => docs.find(doc => doc.slug === slug)
export const findCompleteDoc = (slug?: string) => completeDocs.find(doc => doc.slug === slug)

export const questions: InterviewQuestion[] = [
  { id: 'async-blocking', topic: 'Async & Concurrency', difficulty: 'Senior', relatedDoc: 'async-concurrency', question: 'Why is calling .Result or .Wait() in an ASP.NET Core request dangerous?', shortAnswer: 'It blocks a ThreadPool thread while I/O is pending. Under load, blocked threads delay continuations and reduce throughput; use await end-to-end and propagate cancellation.', followUps: ['When can sync-over-async be acceptable?', 'How do you bound fan-out concurrency?'], redFlags: ['“async always creates a thread”', '“ConfigureAwait fixes it in ASP.NET Core”'] },
  { id: 'di-lifetime', topic: 'ASP.NET Core', difficulty: 'Senior', relatedDoc: 'aspnet-pipeline', question: 'Why must a singleton not depend directly on a scoped DbContext?', shortAnswer: 'The singleton outlives the request scope while DbContext is scoped and not thread-safe. It can retain disposed state or cross-request state; create a scope or inject a factory at the operation boundary.', followUps: ['When is IDbContextFactory appropriate?', 'Which services are safe singletons?'], redFlags: ['“DbContext is thread-safe”', '“Make every service singleton for performance”'] },
  { id: 'outbox', topic: 'Distributed Systems', difficulty: 'Lead', relatedDoc: 'distributed-systems', question: 'What problem does the transactional outbox solve, and what does it not solve?', shortAnswer: 'It atomically persists state change and an event intent in one database transaction, removing the dual-write gap. It does not create exactly-once delivery: consumers still need idempotency, observability and replay handling.', followUps: ['How do you safely publish and mark rows?', 'How do you deduplicate a consumer?'], redFlags: ['“Kafka guarantees exactly once everywhere”', '“Retrying the publisher is enough”'] },
  { id: 'index', topic: 'EF Core & SQL', difficulty: 'Senior', relatedDoc: 'ef-sql', question: 'How do you diagnose a slow endpoint backed by EF Core?', shortAnswer: 'Start with the observed query shape and database plan, not guesses. Measure latency/rows, inspect generated SQL, remove N+1 and over-fetching, then add or adjust an index that matches filter and ordering.', followUps: ['Why can an index hurt writes?', 'When should you use projection and AsNoTracking?'], redFlags: ['“Add Include everywhere”', '“Indexes always make queries faster”'] },
  { id: 'microservices', topic: 'Architecture', difficulty: 'Lead', relatedDoc: 'architecture', question: 'When would you keep a modular monolith instead of moving to microservices?', shortAnswer: 'When domain boundaries, team ownership and independent scaling are not proven. A modular monolith preserves transactional simplicity and deployment speed while enforcing modules; extract only a boundary with clear operational benefit.', followUps: ['What evidence justifies extraction?', 'How do you prevent a distributed monolith?'], redFlags: ['“Microservices are more scalable by default”', '“Split by technical layer”'] },
  { id: 'incident', topic: 'Production', difficulty: 'Lead', relatedDoc: 'observability-incidents', question: 'What do you do first when p99 latency doubles after a deploy?', shortAnswer: 'Stabilize user impact first: compare against the deploy, inspect golden signals and traces, then roll back or disable the change if needed. Preserve evidence, communicate status, and only then narrow the root cause.', followUps: ['Which signals do you check?', 'What makes a rollback safe?'], redFlags: ['“Read all logs first”', '“Restart every service”'] }
]
