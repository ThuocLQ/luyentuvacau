export type TechLevel = 1 | 2 | 3 | 4
export type EnglishLevel = 1 | 2 | 3 | 4
export type LearningStatus = 'not-started' | 'learning' | 'solid'

export interface LessonProgress {
  techLevel: TechLevel
  englishLevel: EnglishLevel
  status: LearningStatus
  lastStudiedAt?: string
}

export interface CurriculumModule {
  id: string
  number: number
  title: string
  principle: string
  suggestedLesson?: { title: string; slug: string; kind: 'learning' | 'reference' }
}

export const curriculumModules: CurriculumModule[] = [
  { id: 'database-internals', number: 1, title: 'Database Internals', principle: 'Persistence · access path', suggestedLesson: { title: 'Index & Execution Plan learning pilot', slug: 'learning-index-execution-plan', kind: 'learning' } },
  { id: 'indexing-execution-plan', number: 2, title: 'Indexing & Execution Plan', principle: 'Selectivity · optimizer', suggestedLesson: { title: 'Index & Execution Plan learning pilot', slug: 'learning-index-execution-plan', kind: 'learning' } },
  { id: 'transaction-isolation', number: 3, title: 'Transaction & Isolation', principle: 'Correctness · visibility', suggestedLesson: { title: 'SQL, index, transaction và locking', slug: 'sql-index-locking', kind: 'reference' } },
  { id: 'concurrency', number: 4, title: 'Concurrency', principle: 'Shared state · atomicity', suggestedLesson: { title: 'Race Condition & Concurrency learning pilot', slug: 'learning-race-condition', kind: 'learning' } },
  { id: 'runtime-memory', number: 5, title: '.NET Runtime & Memory', principle: 'Allocation · lifetime', suggestedLesson: { title: 'C# Runtime, GC và Memory', slug: 'runtime-memory', kind: 'reference' } },
  { id: 'networking-http', number: 6, title: 'Networking & HTTP', principle: 'Latency · boundary', suggestedLesson: { title: 'API Design, Authorization và Idempotency', slug: 'api-security', kind: 'reference' } },
  { id: 'security', number: 7, title: 'Security', principle: 'Identity · authorization', suggestedLesson: { title: 'API Design, Authorization và Idempotency', slug: 'api-security', kind: 'reference' } },
  { id: 'caching-reliability', number: 8, title: 'Caching & Reliability', principle: 'Freshness · failure', suggestedLesson: { title: 'Cache và Redis', slug: 'cache-redis', kind: 'reference' } },
  { id: 'messaging-fundamentals', number: 9, title: 'Messaging Fundamentals', principle: 'Delivery · ownership', suggestedLesson: { title: 'Messaging, idempotency và Outbox', slug: 'distributed-systems', kind: 'reference' } },
  { id: 'kafka-deep-dive', number: 10, title: 'Kafka Deep Dive', principle: 'Ordering · replay', suggestedLesson: { title: 'Kafka và RabbitMQ', slug: 'kafka-rabbitmq', kind: 'reference' } },
  { id: 'consistency-idempotency', number: 11, title: 'Consistency & Idempotency', principle: 'Duplicate · recovery', suggestedLesson: { title: 'Outbox & Idempotency learning pilot', slug: 'learning-outbox-idempotency', kind: 'learning' } },
  { id: 'system-design-reasoning', number: 12, title: 'System Design Reasoning', principle: 'Trade-off · evidence', suggestedLesson: { title: 'Khung System Design', slug: 'system-design-framework', kind: 'reference' } },
]

export const techLevelLabels: Record<TechLevel, string> = { 1: 'L1 · Understand', 2: 'L2 · Apply', 3: 'L3 · Debug', 4: 'L4 · Reason / Trade-off' }
export const englishLevelLabels: Record<EnglishLevel, string> = { 1: 'E1 · Read / Understand', 2: 'E2 · Short Answer', 3: 'E3 · Explain 2–3 minutes', 4: 'E4 · Technical Discussion' }
