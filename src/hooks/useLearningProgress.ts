import { useMemo } from 'react'
import { curriculumModules, type LessonProgress } from '../data/curriculum'
import { useLocalStorage } from './useLocalStorage'

type ProgressByModule = Record<string, LessonProgress>
const KEY = 'ltvc-learning-progress-v1'
const initial: ProgressByModule = {}

function isProgress(value: unknown): value is ProgressByModule {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  return Object.values(value as Record<string, unknown>).every(item => {
    if (!item || typeof item !== 'object') return false
    const entry = item as Record<string, unknown>
    return [1, 2, 3, 4].includes(entry.techLevel as number)
      && [1, 2, 3, 4].includes(entry.englishLevel as number)
      && (entry.status === 'not-started' || entry.status === 'learning' || entry.status === 'solid')
  })
}

export function useLearningProgress() {
  const [progress, setProgress] = useLocalStorage<ProgressByModule>(KEY, initial, isProgress)
  const currentModule = useMemo(() => curriculumModules.find(module => progress[module.id]?.status !== 'solid') ?? curriculumModules.at(-1)!, [progress])
  const get = (moduleId: string): LessonProgress => progress[moduleId] ?? { techLevel: 1, englishLevel: 1, status: 'not-started' }
  const update = (moduleId: string, patch: Partial<Pick<LessonProgress, 'techLevel' | 'englishLevel' | 'status'>>) => setProgress(current => ({ ...current, [moduleId]: { ...get(moduleId), ...patch, lastStudiedAt: new Date().toISOString() } }))
  return { progress, currentModule, get, update }
}
