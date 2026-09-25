import { useEffect } from 'react'
import { learningLessons, type LessonProgress } from '../data/curriculum'
import { useLocalStorage } from './useLocalStorage'

type ProgressByLesson = Record<string, LessonProgress>
const KEY = 'ltvc-learning-progress-v1'
const initial: ProgressByLesson = {}
const legacyModuleToLesson: Record<string, string> = {
  'indexing-execution-plan': 'learning-index-execution-plan',
  concurrency: 'learning-race-condition',
  'consistency-idempotency': 'learning-outbox-idempotency',
}

function isProgress(value: unknown): value is ProgressByLesson {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  return Object.values(value as Record<string, unknown>).every(item => {
    if (!item || typeof item !== 'object') return false
    const entry = item as Record<string, unknown>
    return [1, 2, 3, 4].includes(entry.techLevel as number)
      && [1, 2, 3, 4].includes(entry.englishLevel as number)
      && (entry.status === 'not-started' || entry.status === 'learning' || entry.status === 'solid')
  })
}

export function selectCurrentLesson(progress: ProgressByLesson) {
  const inProgress = learningLessons
    .filter(lesson => progress[lesson.slug]?.status === 'learning')
    .sort((left, right) => (Date.parse(progress[right.slug]?.lastStudiedAt ?? '') || 0) - (Date.parse(progress[left.slug]?.lastStudiedAt ?? '') || 0))

  if (inProgress[0]) return inProgress[0]

  return learningLessons.find(lesson => lesson.status !== 'planned' && (progress[lesson.slug]?.status ?? 'not-started') !== 'solid')
    ?? learningLessons
      .slice()
      .sort((left, right) => (Date.parse(progress[right.slug]?.lastStudiedAt ?? '') || 0) - (Date.parse(progress[left.slug]?.lastStudiedAt ?? '') || 0))[0]
    ?? learningLessons[0]
}

export function useLearningProgress() {
  const [progress, setProgress] = useLocalStorage<ProgressByLesson>(KEY, initial, isProgress)
  useEffect(() => {
    setProgress(current => {
      let changed = false
      const next = { ...current }
      for (const [legacyId, lessonSlug] of Object.entries(legacyModuleToLesson)) {
        if (current[legacyId] && !next[lessonSlug]) { next[lessonSlug] = current[legacyId]; changed = true }
      }
      return changed ? next : current
    })
  }, [setProgress])
  const get = (lessonSlug: string): LessonProgress => progress[lessonSlug] ?? { techLevel: 1, englishLevel: 1, status: 'not-started' }
  const update = (lessonSlug: string, patch: Partial<Pick<LessonProgress, 'techLevel' | 'englishLevel' | 'status'>>) => setProgress(current => ({ ...current, [lessonSlug]: { ...(current[lessonSlug] ?? { techLevel: 1, englishLevel: 1, status: 'not-started' }), ...patch, lastStudiedAt: new Date().toISOString() } }))
  const currentLesson = selectCurrentLesson(progress)
  return { progress, currentLesson, get, update }
}