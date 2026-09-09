import { useMemo } from 'react'
import { quizQuestions } from '../data/quizzes'
import { useReviewProgress } from './useReviewProgress'

type QuizCertainty = 'confident' | 'hesitant' | 'missed'

/** Compatibility adapter: quiz now uses the shared review scheduler. */
export function useQuizProgress() {
  const { progress, record } = useReviewProgress()
  const dueQuestionIds = useMemo(() => progress
    .filter(item => item.kind === 'quiz' && Date.parse(item.nextDueAt) <= Date.now())
    .sort((left, right) => left.nextDueAt.localeCompare(right.nextDueAt))
    .map(item => item.id.replace(/^quiz:/, '')), [progress])
  const recordOutcome = (questionId: string, certainty: QuizCertainty) => {
    const question = quizQuestions.find(item => item.id === questionId)
    record({ id: `quiz:${questionId}`, kind: 'quiz', relatedDoc: question?.relatedDoc, title: question?.prompt }, certainty)
  }
  return { dueQuestionIds, recordOutcome }
}