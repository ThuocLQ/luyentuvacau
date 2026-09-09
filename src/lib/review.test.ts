import { describe, expect, it } from 'vitest'
import { formatReviewReason, nextConfidenceStreak, nextReviewAt, type ReviewProgress } from './review'

const now = Date.UTC(2026, 8, 9)

describe('shared review scheduling', () => {
  it('uses the same initial intervals for missed, hesitant and confident recall', () => {
    expect(nextReviewAt('missed', 0, now)).toBe(new Date(now + 86_400_000).toISOString())
    expect(nextReviewAt('hesitant', 0, now)).toBe(new Date(now + 3 * 86_400_000).toISOString())
    expect(nextReviewAt('confident', 1, now)).toBe(new Date(now + 7 * 86_400_000).toISOString())
  })

  it('expands only consecutive confident recall, not total attempts', () => {
    const confident = (lastRating: ReviewProgress['lastRating'], confidenceStreak: number) => ({ lastRating, confidenceStreak })
    expect(nextConfidenceStreak(confident('missed', 8), 'confident')).toBe(1)
    expect(nextConfidenceStreak(confident('confident', 1), 'confident')).toBe(2)
    expect(nextConfidenceStreak(confident('confident', 2), 'hesitant')).toBe(0)
    expect(nextConfidenceStreak(confident('hesitant', 0), 'confident')).toBe(1)
    expect(nextReviewAt('confident', 1, now)).toBe(new Date(now + 7 * 86_400_000).toISOString())
    expect(nextReviewAt('confident', 2, now)).toBe(new Date(now + 14 * 86_400_000).toISOString())
    expect(nextReviewAt('confident', 3, now)).toBe(new Date(now + 30 * 86_400_000).toISOString())
  })

  it('distinguishes a manual pin from a fake learning rating', () => {
    const item: ReviewProgress = { id: 'cheatsheet:api-security', kind: 'cheatsheet', attempts: 0, confidenceStreak: 0, lastRating: 'hesitant', lastReviewedAt: new Date(now).toISOString(), nextDueAt: new Date(now).toISOString(), manualPin: true }
    expect(formatReviewReason(item, now)).toBe('Bạn đã ghim để ôn ngay')
  })

  it('explains why a due item is prioritized', () => {
    const item: ReviewProgress = { id: 'quiz:1', kind: 'quiz', attempts: 1, confidenceStreak: 0, lastRating: 'missed', lastReviewedAt: new Date(now).toISOString(), nextDueAt: new Date(now).toISOString() }
    expect(formatReviewReason(item, now)).toContain('đến hạn')
  })
})