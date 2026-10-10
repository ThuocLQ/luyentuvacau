import { describe, expect, it } from 'vitest'
import { initialRaceAssessment, isRaceAssessmentState, raceRequirements, RACE_ASSESSMENT_VERSION } from './raceAssessment'

describe('Race assessment completion contract', () => {
  it('requires independently checked L1/L2 and L3 diagnosis+repair plus clearly labelled self-reported evidence', () => {
    const state = initialRaceAssessment()
    state.attempts = [
      { questionId: 'interleaving', answer: 'both-read', correct: true, submittedAt: '2026-10-10T00:00:00.000Z', provenance: 'automatically-checked' },
      { questionId: 'shared-state', answer: ['balance', 'approved-total'], correct: true, submittedAt: '2026-10-10T00:00:00.000Z', provenance: 'automatically-checked' },
      { questionId: 'baseline', answer: '80-30', correct: true, submittedAt: '2026-10-10T00:00:00.000Z', provenance: 'automatically-checked' },
      { questionId: 'variation', answer: '60-50', correct: true, submittedAt: '2026-10-10T00:00:00.000Z', provenance: 'automatically-checked' },
      { questionId: 'debug-failure-repair', answer: 'stale-check-same-gate', correct: true, submittedAt: '2026-10-10T00:00:00.000Z', provenance: 'automatically-checked' },
    ]
    state.labConfirmed = true
    state.labObservation = '60/50 unsafe approve 110; final balance 40 hoặc 50.'
    state.debugSelfReviewed = true
    state.debugTimeline = 'A đọc; B đọc; đối chiếu operation ID, row count và instance ID.'

    expect(raceRequirements(state)).toMatchObject({ l1: true, l2: true, lab: true, l3Checked: true, l3ReflectionRecorded: true, satisfied: true })
    state.labConfirmed = false
    expect(raceRequirements(state).satisfied).toBe(false)
  })

  it('rejects stale assessment versions instead of treating them as compatible evidence', () => {
    expect(isRaceAssessmentState({ ...initialRaceAssessment(), version: 'race-atomicity-v0' })).toBe(false)
    expect(isRaceAssessmentState({ ...initialRaceAssessment(), version: RACE_ASSESSMENT_VERSION })).toBe(true)
  })
})
