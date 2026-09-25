import { describe, expect, it } from 'vitest'
import { selectCurrentLesson } from './useLearningProgress'

describe('selectCurrentLesson', () => {
  it('resumes the most recently studied learning lesson', () => {
    const current = selectCurrentLesson({
      'learning-index-execution-plan': { techLevel: 2, englishLevel: 2, status: 'learning', lastStudiedAt: '2026-09-20T09:00:00.000Z' },
      'learning-race-condition': { techLevel: 2, englishLevel: 2, status: 'learning', lastStudiedAt: '2026-09-21T09:00:00.000Z' },
    })

    expect(current.slug).toBe('learning-race-condition')
  })

  it('chooses the first non-solid pilot when nothing is in progress', () => {
    const current = selectCurrentLesson({
      'learning-index-execution-plan': { techLevel: 4, englishLevel: 4, status: 'solid', lastStudiedAt: '2026-09-20T09:00:00.000Z' },
    })

    expect(current.slug).toBe('learning-race-condition')
  })

  it('returns the most recently studied lesson after all pilots are solid', () => {
    const current = selectCurrentLesson({
      'learning-index-execution-plan': { techLevel: 4, englishLevel: 4, status: 'solid', lastStudiedAt: '2026-09-22T09:00:00.000Z' },
      'learning-race-condition': { techLevel: 4, englishLevel: 4, status: 'solid', lastStudiedAt: '2026-09-20T09:00:00.000Z' },
      'learning-outbox-idempotency': { techLevel: 4, englishLevel: 4, status: 'solid', lastStudiedAt: '2026-09-21T09:00:00.000Z' },
    })

    expect(current.slug).toBe('learning-index-execution-plan')
  })
})