import { describe, expect, it } from 'vitest'
import { initialRaceAssessment, isRaceAssessmentState, raceRequirements, RACE_ASSESSMENT_VERSION } from './raceAssessment'

describe('Race assessment completion contract', () => {
  it('requires independently checked L1/L2/L3 evidence and a self-reported lab observation', () => {
    const state = initialRaceAssessment()
    state.attempts = [
      { questionId: 'interleaving', answer: 'both-read', correct: true, submittedAt: '2026-10-10T00:00:00.000Z', provenance: 'automatically-checked' },
      { questionId: 'shared-state', answer: ['balance', 'approved-total'], correct: true, submittedAt: '2026-10-10T00:00:00.000Z', provenance: 'automatically-checked' },
      { questionId: 'baseline', answer: '80-30', correct: true, submittedAt: '2026-10-10T00:00:00.000Z', provenance: 'automatically-checked' },
      { questionId: 'variation', answer: '60-50', correct: true, submittedAt: '2026-10-10T00:00:00.000Z', provenance: 'automatically-checked' },
      { questionId: 'debug-evidence', answer: ['operation-id', 'updated-row-count', 'instance-id'], correct: true, submittedAt: '2026-10-10T00:00:00.000Z', provenance: 'automatically-checked' },
    ]
    state.labConfirmed = true
    state.labObservation = '60/50 unsafe approve 110; final balance 40 hoặc 50.'
    state.debugSelfReviewed = true
    state.debugTimeline = 'A và B cùng đọc availability cũ. Cả hai approve, rồi write từ snapshot cũ; đối chiếu operation ID, row count và instance ID để dựng timeline.'

    expect(raceRequirements(state)).toMatchObject({ l1: true, l2: true, lab: true, l3: true, satisfied: true })
    state.labConfirmed = false
    expect(raceRequirements(state).satisfied).toBe(false)
  })

  it('rejects stale assessment versions instead of treating them as compatible evidence', () => {
    expect(isRaceAssessmentState({ ...initialRaceAssessment(), version: 'race-atomicity-v0' })).toBe(false)
    expect(isRaceAssessmentState({ ...initialRaceAssessment(), version: RACE_ASSESSMENT_VERSION })).toBe(true)
  })
})
