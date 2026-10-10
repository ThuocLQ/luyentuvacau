import { useMemo, useState } from 'react'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { answersMatch, hasCorrectAttempt, initialRaceAssessment, isRaceAssessmentState, raceQuestions, raceRequirements, RACE_ASSESSMENT_VERSION, type RaceAnswer } from './raceAssessment'

interface Props { onReviewStep: (step: 0 | 1 | 2 | 3 | 4) => void; onBackToGuided: () => void }
const storageKey = 'ltvc-race-assessment-v1'

export default function RaceAssessment({ onReviewStep, onBackToGuided }: Props) {
  const [state, setState] = useLocalStorage(storageKey, initialRaceAssessment(), isRaceAssessmentState)
  const [feedback, setFeedback] = useState<{ correct: boolean; text: string } | null>(null)
  const current = raceQuestions[state.currentQuestion]
  const requirements = useMemo(() => raceRequirements(state), [state])
  const answer = state.answers[current.id]
  const isMultiple = current.type === 'multiple'
  const viewingOptionalStretch = current.id === 'transfer-boundary' && !hasCorrectAttempt(state, 'transfer-boundary')

  const setAnswer = (value: string) => setState(existing => {
    const currentAnswer = existing.answers[current.id]
    const nextAnswer: RaceAnswer = isMultiple
      ? (Array.isArray(currentAnswer) ? currentAnswer.includes(value) ? currentAnswer.filter(item => item !== value) : [...currentAnswer, value] : [value])
      : value
    return { ...existing, answers: { ...existing.answers, [current.id]: nextAnswer } }
  })

  const submit = () => {
    const correct = answersMatch(answer, current.correct)
    const attempt = { questionId: current.id, answer: answer ?? '', correct, submittedAt: new Date().toISOString(), provenance: 'automatically-checked' as const }
    setState(existing => ({ ...existing, attempts: [...existing.attempts, attempt], currentQuestion: correct && current.id !== 'debug-evidence' && existing.currentQuestion < raceQuestions.length - 1 ? existing.currentQuestion + 1 : existing.currentQuestion }))
    setFeedback({ correct, text: correct ? `Đúng. ${current.explanation}` : `Chưa đúng. ${current.explanation}` })
  }

  const resetCurrent = () => {
    setFeedback(null)
    setState(existing => ({ ...existing, answers: { ...existing.answers, [current.id]: isMultiple ? [] : '' } }))
  }

  return <section className="race-assessment" aria-labelledby="race-assessment-title">
    <header><span className="mini-label">Bài luyện tập · assessment {RACE_ASSESSMENT_VERSION}</span><h2 id="race-assessment-title">Kiểm tra evidence Race Condition</h2><p>Đây là bài đánh giá của Golden Pilot, không phải generic quiz. L1–L3 là điều kiện hoàn thành bài luyện tập; L4 là stretch. English và tự đánh giá mastery vẫn là track riêng.</p></header>
    <ol className="race-assessment-progress" aria-label="Tiến độ bài luyện tập">{raceQuestions.map((question, index) => <li key={question.id} aria-current={index === state.currentQuestion ? 'step' : undefined} className={hasCorrectAttempt(state, question.id) ? 'done' : ''}>{question.level}</li>)}</ol>
    {requirements.satisfied && !viewingOptionalStretch ? <section className="race-assessment-result" aria-live="polite"><h3>Đã thỏa yêu cầu bài luyện tập Race</h3><p>L1, L2 và L3 có evidence theo assessment version này. Lab observation và timeline L3 là <strong>self-reported</strong>; ứng dụng không thể tự xác minh bạn đã chạy code. Không có “Next Lesson” vì lesson tiếp theo của chapter chưa được phát hành.</p><div className="race-assessment-actions"><button className="secondary-button" onClick={onBackToGuided}>Quay lại bài học</button><button className="secondary-button" onClick={() => { setFeedback(null); setState(existing => ({ ...existing, currentQuestion: 5 })) }}>Làm stretch L4</button></div></section> : <>
      <section className="race-question-card" aria-labelledby={`race-question-${current.id}`}><div className="race-question-meta"><span>{current.level}</span><span>Câu {state.currentQuestion + 1} / {raceQuestions.length}</span></div><h3 id={`race-question-${current.id}`}>{current.prompt}</h3><fieldset className="race-answer-options"><legend className="sr-only">Các lựa chọn trả lời</legend>{current.options.map(option => <label key={option.id}><input type={isMultiple ? 'checkbox' : 'radio'} name={current.id} checked={Array.isArray(answer) ? answer.includes(option.id) : answer === option.id} onChange={() => setAnswer(option.id)} />{option.label}</label>)}</fieldset>
        {feedback && <div className={feedback.correct ? 'race-feedback correct' : 'race-feedback incorrect'} role="status"><p>{feedback.text}</p><div><button className="secondary-button" onClick={() => onReviewStep(current.reviewStep)}>Ôn lại đúng phần này</button>{!feedback.correct && <button className="primary-button" onClick={resetCurrent}>Thử lại</button>}</div></div>}
        {!feedback && <div className="race-assessment-actions"><button className="secondary-button" onClick={() => requirements.satisfied && viewingOptionalStretch ? setState(existing => ({ ...existing, currentQuestion: 4 })) : setState(existing => ({ ...existing, currentQuestion: Math.max(0, existing.currentQuestion - 1) }))}>{requirements.satisfied && viewingOptionalStretch ? 'Bỏ qua stretch' : 'Quay lại'}</button><button className="primary-button" disabled={!answer || (Array.isArray(answer) && answer.length === 0)} onClick={submit}>Nộp câu trả lời</button></div>}</section>
      {hasCorrectAttempt(state, 'baseline') && hasCorrectAttempt(state, 'variation') && <section className="race-self-evidence"><h3>Local lab evidence — tự báo cáo</h3><p>Hãy chạy local C# lab trước. Đây là ghi nhận của bạn, không phải app xác minh execution.</p><label>Kết quả bạn quan sát được<input value={state.labObservation} onChange={event => setState(existing => ({ ...existing, labObservation: event.target.value }))} placeholder="Ví dụ: 60/50 unsafe approve 110, final balance 40." /></label><label><input type="checkbox" checked={state.labConfirmed} onChange={event => setState(existing => ({ ...existing, labConfirmed: event.target.checked }))} /> Tôi đã chạy hoặc đối chiếu local lab và ghi observation thật.</label></section>}
      {hasCorrectAttempt(state, 'debug-evidence') && <section className="race-self-evidence"><h3>L3 timeline — tự review</h3><p>Viết candidate timeline cho hai reservation success/finalBalance=70, rồi tự xác nhận nó nêu được boundary và evidence.</p><label className="sr-only" htmlFor="race-debug-timeline">Candidate timeline</label><textarea id="race-debug-timeline" value={state.debugTimeline} onChange={event => setState(existing => ({ ...existing, debugTimeline: event.target.value }))} placeholder="A và B đọc state nào, request nào write trước/sau, evidence nào sẽ kiểm..." /><label><input type="checkbox" checked={state.debugSelfReviewed} onChange={event => setState(existing => ({ ...existing, debugSelfReviewed: event.target.checked }))} /> Tôi đã tự review timeline theo evidence ở Step 4.</label></section>}
      <aside className="race-requirements"><strong>Điều kiện completion</strong><span className={requirements.l1 ? 'met' : ''}>L1 checked</span><span className={requirements.l2 ? 'met' : ''}>L2 checked</span><span className={requirements.lab ? 'met' : ''}>Lab self-reported</span><span className={requirements.l3 ? 'met' : ''}>L3 evidence + self review</span><small>Dropdown mastery và checkbox ghi chú không thể thay các điều kiện này.</small></aside>
    </>}
  </section>
}
