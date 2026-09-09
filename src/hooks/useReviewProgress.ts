import { useEffect, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { completeDocs, questions } from '../data/docs'
import { quizQuestions } from '../data/quizzes'
import { isReviewProgress, nextConfidenceStreak, nextReviewAt, type ReviewItemKind, type ReviewProgress, type ReviewRating } from '../lib/review'

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
      merged.set(item.id, { id: item.id, kind: item.kind as ReviewItemKind, attempts: 1, confidenceStreak: lastRating === 'confident' ? 1 : 0, lastRating, lastReviewedAt, nextDueAt: nextReviewAt(lastRating, 1, Date.parse(lastReviewedAt)), relatedDoc: item.relatedDoc, title: typeof item.title === 'string' ? item.title : undefined })
    }
    const quiz = JSON.parse(localStorage.getItem('ltvc-quiz-progress') ?? '{}') as { questions?: Record<string, Record<string, unknown>> }
    for (const [id, item] of Object.entries(quiz.questions ?? {})) {
      const lastRating = item.certainty === 'confident' ? 'confident' : item.certainty === 'missed' ? 'missed' : 'hesitant'
      const attempts = typeof item.attempts === 'number' && item.attempts >= 1 ? item.attempts : 1
      const nextDueAt = typeof item.nextDueAt === 'string' && !Number.isNaN(Date.parse(item.nextDueAt)) ? item.nextDueAt : nextReviewAt(lastRating, attempts)
      merged.set(`quiz:${id}`, { id: `quiz:${id}`, kind: 'quiz', attempts, confidenceStreak: lastRating === 'confident' ? 1 : 0, lastRating, lastReviewedAt: now, nextDueAt })
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

  const validIds = useMemo(() => new Set([
    ...completeDocs.map(doc => `cheatsheet:${doc.slug}`),
    ...questions.map(question => `question:${question.id}`),
    ...quizQuestions.map(question => `quiz:${question.id}`),
  ]), [])
  useEffect(() => {
    setProgress(current => {
      const retained = current.filter(item => validIds.has(item.id))
      return retained.length === current.length ? current : retained
    })
  }, [setProgress, validIds])

  const dueItems = useMemo(() => progress.filter(item => Date.parse(item.nextDueAt) <= Date.now()).slice().sort((left, right) => left.nextDueAt.localeCompare(right.nextDueAt)), [progress])
  const record = (item: Omit<ReviewProgress, 'attempts' | 'confidenceStreak' | 'lastRating' | 'lastReviewedAt' | 'nextDueAt'>, rating: ReviewRating) => setProgress(current => {
    const previous = current.find(entry => entry.id === item.id)
    const attempts = (previous?.attempts ?? 0) + 1
    const lastReviewedAt = new Date().toISOString()
    const confidenceStreak = nextConfidenceStreak(previous, rating)
    const nextDueAt = nextReviewAt(rating, confidenceStreak)
    const next: ReviewProgress = { ...previous, ...item, attempts, confidenceStreak, lastRating: rating, lastReviewedAt, nextDueAt, manualPin: false }
    return previous ? current.map(entry => entry.id === item.id ? next : entry) : [...current, next]
  })
  const pin = (item: Omit<ReviewProgress, 'attempts' | 'confidenceStreak' | 'lastRating' | 'lastReviewedAt' | 'nextDueAt' | 'manualPin'>) => setProgress(current => {
    const previous = current.find(entry => entry.id === item.id)
    const now = new Date().toISOString()
    const next: ReviewProgress = previous
      ? { ...previous, ...item, manualPin: true, nextDueAt: now }
      : { ...item, attempts: 0, confidenceStreak: 0, lastRating: 'hesitant', lastReviewedAt: now, nextDueAt: now, manualPin: true }
    return previous ? current.map(entry => entry.id === item.id ? next : entry) : [...current, next]
  })
  const snooze = (id: string, days = 1) => setProgress(current => current.map(item => item.id === id
    ? { ...item, manualPin: false, nextDueAt: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString() }
    : item))
  const remove = (id: string) => setProgress(current => current.filter(item => item.id !== id))
  const find = (id: string) => progress.find(item => item.id === id)
  return { progress, dueItems, record, pin, snooze, remove, find }
}
