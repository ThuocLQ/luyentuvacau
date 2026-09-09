import { useEffect, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { isReviewProgress, nextReviewAt, type ReviewItemKind, type ReviewProgress, type ReviewRating } from '../lib/review'

const STORAGE_KEY = 'ltvc-review-progress-v2'
const MIGRATION_KEY = 'ltvc-review-progress-v2-migrated'
const initialState: ReviewProgress[] = []

function readLegacyProgress(): ReviewProgress[] {
  try {
    const existing = localStorage.getItem(MIGRATION_KEY)
    if (existing) return []
    const now = new Date().toISOString()
    const merged = new Map<string, ReviewProgress>()
    const queue = JSON.parse(localStorage.getItem('ltvc-review-queue') ?? '[]') as Array<Record<string, unknown>>
    if (Array.isArray(queue)) for (const item of queue) {
      if (typeof item.id !== 'string' || typeof item.kind !== 'string' || typeof item.relatedDoc !== 'string') continue
      const lastRating = item.rating === 'confident' ? 'confident' : item.rating === 'missed' ? 'missed' : 'hesitant'
      const lastReviewedAt = typeof item.updatedAt === 'string' && !Number.isNaN(Date.parse(item.updatedAt)) ? item.updatedAt : now
      merged.set(item.id, { id: item.id, kind: item.kind as ReviewItemKind, attempts: 1, lastRating, lastReviewedAt, nextDueAt: nextReviewAt(lastRating, 1, Date.parse(lastReviewedAt)), relatedDoc: item.relatedDoc, title: typeof item.title === 'string' ? item.title : undefined })
    }
    const quiz = JSON.parse(localStorage.getItem('ltvc-quiz-progress') ?? '{}') as { questions?: Record<string, Record<string, unknown>> }
    for (const [id, item] of Object.entries(quiz.questions ?? {})) {
      const lastRating = item.certainty === 'confident' ? 'confident' : item.certainty === 'missed' ? 'missed' : 'hesitant'
      const attempts = typeof item.attempts === 'number' && item.attempts >= 1 ? item.attempts : 1
      const nextDueAt = typeof item.nextDueAt === 'string' && !Number.isNaN(Date.parse(item.nextDueAt)) ? item.nextDueAt : nextReviewAt(lastRating, attempts)
      merged.set(`quiz:${id}`, { id: `quiz:${id}`, kind: 'quiz', attempts, lastRating, lastReviewedAt: now, nextDueAt })
    }
    localStorage.setItem(MIGRATION_KEY, '1')
    return [...merged.values()]
  } catch { return [] }
}

export function useReviewProgress() {
  const [progress, setProgress] = useLocalStorage<ReviewProgress[]>(STORAGE_KEY, initialState, (value): value is ReviewProgress[] => Array.isArray(value) && value.every(isReviewProgress))
  useEffect(() => {
    if (progress.length) return
    const migrated = readLegacyProgress()
    if (migrated.length) setProgress(migrated)
  }, [progress.length, setProgress])

  const dueItems = useMemo(() => progress.filter(item => Date.parse(item.nextDueAt) <= Date.now()).slice().sort((left, right) => left.nextDueAt.localeCompare(right.nextDueAt)), [progress])
  const record = (item: Omit<ReviewProgress, 'attempts' | 'lastRating' | 'lastReviewedAt' | 'nextDueAt'>, rating: ReviewRating) => setProgress(current => {
    const previous = current.find(entry => entry.id === item.id)
    const attempts = (previous?.attempts ?? 0) + 1
    const lastReviewedAt = new Date().toISOString()
    const nextDueAt = nextReviewAt(rating, attempts)
    const next: ReviewProgress = { ...previous, ...item, attempts, lastRating: rating, lastReviewedAt, nextDueAt }
    return previous ? current.map(entry => entry.id === item.id ? next : entry) : [...current, next]
  })
  const remove = (id: string) => setProgress(current => current.filter(item => item.id !== id))
  const find = (id: string) => progress.find(item => item.id === id)
  return { progress, dueItems, record, remove, find }
}
