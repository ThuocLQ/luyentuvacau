import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import RacePracticeAssessment from './RacePracticeAssessment'
import { initialRaceAssessment } from './raceAssessment'

beforeEach(() => window.localStorage.clear())
afterEach(cleanup)
const props = { onReviewStep: () => undefined, onBackToGuided: () => undefined }

describe('Race practice assessment', () => {
  it('gives targeted feedback for a wrong answer and allows a retry', () => {
    render(<RacePracticeAssessment {...props} />)
    fireEvent.click(screen.getByLabelText('Chỉ cần có hai thread chạy song song.'))
    fireEvent.click(screen.getByRole('button', { name: 'Nộp câu trả lời' }))
    expect(screen.getByText(/Chưa đúng/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Thử lại' }))
    fireEvent.click(screen.getByLabelText(/Cả hai READ 100/))
    fireEvent.click(screen.getByRole('button', { name: 'Nộp câu trả lời' }))
    expect(screen.getByText(/Chọn đúng hai evidence/)).toBeInTheDocument()
  })

  it('resumes compatible work but discards a stale assessment version', () => {
    const compatible = initialRaceAssessment()
    compatible.currentQuestion = 2
    window.localStorage.setItem('ltvc-race-assessment-v1', JSON.stringify(compatible))
    const { unmount } = render(<RacePracticeAssessment {...props} />)
    expect(screen.getByText(/Với input 80\/30/)).toBeInTheDocument()
    unmount()
    window.localStorage.setItem('ltvc-race-assessment-v1', JSON.stringify({ ...compatible, version: 'old-version' }))
    render(<RacePracticeAssessment {...props} />)
    expect(screen.getByText(/Điều nào cho phép cả A rút 80/)).toBeInTheDocument()
  })

  it('labels lab evidence as self-reported rather than automatically verified', () => {
    const state = initialRaceAssessment()
    state.attempts = [
      { questionId: 'baseline', answer: '80-30', correct: true, submittedAt: '2026-10-10T00:00:00.000Z', provenance: 'automatically-checked' },
      { questionId: 'variation', answer: '60-50', correct: true, submittedAt: '2026-10-10T00:00:00.000Z', provenance: 'automatically-checked' },
    ]
    window.localStorage.setItem('ltvc-race-assessment-v1', JSON.stringify(state))
    render(<RacePracticeAssessment {...props} />)
    expect(screen.getByText(/Đây là ghi nhận của bạn, không phải app xác minh execution/)).toBeInTheDocument()
  })
})
