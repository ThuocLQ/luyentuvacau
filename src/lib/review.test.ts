import { describe, expect, it } from 'vitest'
import { formatReviewReason, nextReviewAt, type ReviewProgress } from './review'

const now = Date.UTC(2026, 8, 9)

describe('shared review scheduling', () => {
  it('uses the same initial intervals for missed, hesitant and confident recall', () => {
    expect(nextReviewAt('missed', 1, now)).toBe(new Date(now + 86_400_000).toISOString())
    expect(nextReviewAt('hesitant', 1, now)).toBe(new Date(now + 3 * 86_400_000).toISOString())
    expect(nextReviewAt('confident', 1, now)).toBe(new Date(now + 7 * 86_400_000).toISOString())
  })

  it('expands a confident interval without making it due forever', () => {
    expect(nextReviewAt('confident', 2, now)).toBe(new Date(now + 14 * 86_400_000).toISOString())
    expect(nextReviewAt('confident', 3, now)).toBe(new Date(now + 30 * 86_400_000).toISOString())
  })

  it('explains why a due item is prioritized', () => {
    const item: ReviewProgress = { id: 'quiz:1', kind: 'quiz', attempts: 1, lastRating: 'missed', lastReviewedAt: new Date(now).toISOString(), nextDueAt: new Date(now).toISOString() }
    expect(formatReviewReason(item, now)).toContain('đến hạn')
  })
})
