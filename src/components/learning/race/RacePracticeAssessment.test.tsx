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
    expect(screen.getByText(/Điều nào cho phép cả A rút 80/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Tiếp tục' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }))
    expect(screen.getByText(/Chọn đúng hai evidence/)).toBeInTheDocument()
  })

  it('resumes compatible work but discards a stale assessment version', () => {
    const compatible = initialRaceAssessment()
    compatible.currentQuestion = 2
    window.localStorage.setItem('ltvc-race-assessment-v2', JSON.stringify(compatible))
    const { unmount } = render(<RacePracticeAssessment {...props} />)
    expect(screen.getByText(/Với input 80\/30/)).toBeInTheDocument()
    unmount()
    window.localStorage.setItem('ltvc-race-assessment-v2', JSON.stringify({ ...compatible, version: 'old-version' }))
    render(<RacePracticeAssessment {...props} />)
    expect(screen.getByText(/Điều nào cho phép cả A rút 80/)).toBeInTheDocument()
  })

  it('labels lab evidence as self-reported rather than automatically verified', () => {
    const state = initialRaceAssessment()
    state.attempts = [
      { questionId: 'baseline', answer: '80-30', correct: true, submittedAt: '2026-10-10T00:00:00.000Z', provenance: 'automatically-checked' },
      { questionId: 'variation', answer: '60-50', correct: true, submittedAt: '2026-10-10T00:00:00.000Z', provenance: 'automatically-checked' },
    ]
    window.localStorage.setItem('ltvc-race-assessment-v2', JSON.stringify(state))
    render(<RacePracticeAssessment {...props} />)
    expect(screen.getByText(/Đây là ghi nhận của bạn, không phải app xác minh execution/)).toBeInTheDocument()
  })

  it('lets a learner review an earlier question without granting later completion', () => {
    render(<RacePracticeAssessment {...props} />)
    fireEvent.click(screen.getByLabelText(/Cả hai READ 100/))
    fireEvent.click(screen.getByRole('button', { name: 'Nộp câu trả lời' }))
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }))
    expect(screen.getByText(/Chọn đúng hai evidence/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Quay lại' }))
    expect(screen.getByText(/Điều nào cho phép cả A rút 80/)).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Đã thỏa yêu cầu bài luyện tập Race' })).not.toBeInTheDocument()
  })

  it('keeps feedback with the answered question, completes required evidence, resumes cleanly, and can finish optional L4', () => {
    const { unmount } = render(<RacePracticeAssessment {...props} />)
    const submitAndContinue = () => {
      fireEvent.click(screen.getByRole('button', { name: 'Nộp câu trả lời' }))
      expect(screen.getByRole('button', { name: 'Tiếp tục' })).toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }))
    }

    fireEvent.click(screen.getByLabelText(/Cả hai READ 100/))
    submitAndContinue()
    fireEvent.click(screen.getByLabelText(/Balance\/source-of-truth/))
    fireEvent.click(screen.getByLabelText(/Tổng approved amount/))
    submitAndContinue()
    fireEvent.click(screen.getByLabelText(/approvedCount=2, approvedAmount=110, finalBalance=20 hoặc 70/))
    submitAndContinue()
    fireEvent.click(screen.getByLabelText(/approvedCount=2, approvedAmount=110, finalBalance=40 hoặc 50/))
    fireEvent.click(screen.getByRole('button', { name: 'Nộp câu trả lời' }))
    expect(screen.getByText(/Sau khi đổi đúng hai input/)).toBeInTheDocument()
    expect(screen.getByText(/Local lab evidence/)).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Kết quả bạn quan sát được'), { target: { value: '60/50 unsafe approve 110, final balance 50.' } })
    fireEvent.click(screen.getByLabelText(/Tôi đã chạy hoặc đối chiếu local lab/))
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }))

    fireEvent.click(screen.getByLabelText(/Cả hai có thể CHECK từ cùng snapshot 100/))
    fireEvent.click(screen.getByRole('button', { name: 'Nộp câu trả lời' }))
    expect(screen.getByText(/Wallet chỉ sống trong memory/)).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Candidate timeline'), { target: { value: 'A và B cùng đọc availability cũ; đối chiếu operation ID, row count và instance ID trước khi sửa database boundary.' } })
    fireEvent.click(screen.getByLabelText(/Tôi đã tự review timeline/))
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }))
    expect(screen.getByRole('heading', { name: 'Đã thỏa yêu cầu bài luyện tập Race' })).toBeInTheDocument()

    unmount()
    render(<RacePracticeAssessment {...props} />)
    expect(screen.getByRole('heading', { name: 'Đã thỏa yêu cầu bài luyện tập Race' })).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Làm stretch L4' }))
    fireEvent.click(screen.getByLabelText(/Conditional update\/transaction/))
    fireEvent.click(screen.getByRole('button', { name: 'Nộp câu trả lời' }))
    expect(screen.getByRole('button', { name: 'Tiếp tục' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }))
    expect(screen.getByRole('heading', { name: 'Đã thỏa yêu cầu bài luyện tập Race' })).toBeInTheDocument()
  })
})
