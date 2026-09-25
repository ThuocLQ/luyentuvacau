export type TechLevel = 1 | 2 | 3 | 4
export type EnglishLevel = 1 | 2 | 3 | 4
export type LearningStatus = 'not-started' | 'learning' | 'solid'

export interface LessonProgress {
  techLevel: TechLevel
  englishLevel: EnglishLevel
  status: LearningStatus
  lastStudiedAt?: string
}

export interface LearningDomain {
  id: string
  title: string
  principles: string
  status: 'active' | 'planned'
}

export interface LearningLessonMeta {
  slug: string
  domainId: string
  title: string
  status: 'pilot' | 'available' | 'planned'
  targetTechLevel: TechLevel
  targetEnglishLevel: EnglishLevel
  prerequisites?: string[]
  referenceSlug: string
  quizPath: string
  interviewPath: string
}

export const learningDomains: LearningDomain[] = [
  { id: 'data-consistency', title: 'Data & Consistency', principles: 'Persistence · query execution · correctness', status: 'active' },
  { id: 'runtime-concurrency', title: 'Runtime & Concurrency', principles: 'Execution · memory · shared state', status: 'active' },
  { id: 'service-network', title: 'Service & Network', principles: 'Communication · boundary · latency', status: 'planned' },
  { id: 'distributed-systems', title: 'Distributed Systems', principles: 'Delivery · consistency · recovery', status: 'active' },
  { id: 'production-engineering', title: 'Production Engineering', principles: 'Observe · operate · recover', status: 'planned' },
  { id: 'architecture-reasoning', title: 'Architecture & Engineering Reasoning', principles: 'Ownership · trade-off · changeability', status: 'planned' },
]

export const learningLessons: LearningLessonMeta[] = [
  { slug: 'learning-index-execution-plan', domainId: 'data-consistency', title: 'Index & Execution Plan', status: 'pilot', targetTechLevel: 3, targetEnglishLevel: 2, referenceSlug: 'sql-index-locking', quizPath: '/quiz?topic=EF%20Core%20v%C3%A0%20SQL', interviewPath: '/interview?question=sql-lost-update' },
  { slug: 'learning-race-condition', domainId: 'runtime-concurrency', title: 'Race Condition & Concurrency', status: 'pilot', targetTechLevel: 3, targetEnglishLevel: 2, referenceSlug: 'async-concurrency', quizPath: '/quiz?topic=Async%20v%C3%A0%20background%20work', interviewPath: '/interview?question=async-fanout' },
  { slug: 'learning-outbox-idempotency', domainId: 'distributed-systems', title: 'Outbox & Idempotency', status: 'pilot', targetTechLevel: 4, targetEnglishLevel: 3, referenceSlug: 'distributed-systems', quizPath: '/quiz?topic=Outbox%20v%C3%A0%20Saga', interviewPath: '/interview?question=idempotency-key' },
]

export const findLearningLesson = (slug: string) => learningLessons.find(lesson => lesson.slug === slug)
export const techLevelLabels: Record<TechLevel, string> = { 1: 'L1 · Understand', 2: 'L2 · Apply', 3: 'L3 · Debug', 4: 'L4 · Reason / Trade-off' }
export const englishLevelLabels: Record<EnglishLevel, string> = { 1: 'E1 · Read / Understand', 2: 'E2 · Short Answer', 3: 'E3 · Explain 2–3 minutes', 4: 'E4 · Technical Discussion' }
