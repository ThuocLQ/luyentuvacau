import { useMemo } from 'react'
import type { QuizQuestion } from '../types/quiz'
import { useLocalStorage } from './useLocalStorage'

const STORAGE_KEY = 'ltvc-quiz-progress'
const STORAGE_VERSION = 1
const DAY_MS = 24 * 60 * 60 * 1000

type QuizAttemptOutcome = 'again' | 'hesitant' | 'good'
type QuizCertainty = 'confident' | 'hesitant' | 'missed'

interface QuizProgressEntry {
  outcome: QuizAttemptOutcome
  certainty: QuizCertainty
  attempts: number
  nextDueAt: string
}

interface QuizProgressState {
  version: number
  questions: Record<string, QuizProgressEntry>
}

const initialState: QuizProgressState = { version: STORAGE_VERSION, questions: {} }

function isProgressEntry(value: unknown): value is QuizProgressEntry {
  if (typeof value !== 'object' || value === null) return false
  const entry = value as Record<string, unknown>
  return (entry.outcome === 'again' || entry.outcome === 'hesitant' || entry.outcome === 'good')
    && (entry.certainty === 'confident' || entry.certainty === 'hesitant' || entry.certainty === 'missed')
    && typeof entry.attempts === 'number' && Number.isFinite(entry.attempts) && entry.attempts >= 1
    && typeof entry.nextDueAt === 'string' && !Number.isNaN(Date.parse(entry.nextDueAt))
}

function isProgressState(value: unknown): value is QuizProgressState {
  if (typeof value !== 'object' || value === null) return false
  const state = value as Record<string, unknown>
  return state.version === STORAGE_VERSION
    && typeof state.questions === 'object' && state.questions !== null
    && Object.values(state.questions).every(isProgressEntry)
}

function toProgressOutcome(outcome: QuizCertainty): QuizAttemptOutcome {
  if (outcome === 'missed') return 'again'
  if (outcome === 'hesitant') return 'hesitant'
  return 'good'
}

function dueInDays(outcome: QuizAttemptOutcome) {
  if (outcome === 'again') return 1
  if (outcome === 'hesitant') return 3
  return 7
}

/** Removes entries for questions that are no longer published. */
export function removeStaleProgress(state: QuizProgressState, questions: readonly Pick<QuizQuestion, 'id'>[]): QuizProgressState {
  const liveIds = new Set(questions.map(question => question.id))
  const liveQuestions = Object.fromEntries(Object.entries(state.questions).filter(([id]) => liveIds.has(id)))
  return Object.keys(liveQuestions).length === Object.keys(state.questions).length ? state : { ...state, questions: liveQuestions }
}

export function useQuizProgress() {
  const [state, setState] = useLocalStorage<QuizProgressState>(STORAGE_KEY, initialState, isProgressState)

  const dueQuestionIds = useMemo(() => {
    const now = Date.now()
    return Object.entries(state.questions)
      .filter(([, entry]) => Date.parse(entry.nextDueAt) <= now)
      .sort(([, left], [, right]) => Date.parse(left.nextDueAt) - Date.parse(right.nextDueAt))
      .map(([id]) => id)
  }, [state.questions])

  const recordOutcome = (questionId: string, certainty: QuizCertainty) => {
    const outcome = toProgressOutcome(certainty)
    const nextDueAt = new Date(Date.now() + dueInDays(outcome) * DAY_MS).toISOString()
    setState(current => {
      const previous = current.questions[questionId]
      return {
        version: STORAGE_VERSION,
        questions: {
          ...current.questions,
          [questionId]: {
            outcome,
            certainty,
            attempts: (previous?.attempts ?? 0) + 1,
            nextDueAt
          }
        }
      }
    })
  }

  return { dueQuestionIds, recordOutcome }
}
