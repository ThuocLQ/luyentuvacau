import { useMemo, useState } from 'react'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { answersMatch, hasCorrectAttempt, initialRaceAssessment, isRaceAssessmentState, raceQuestions, raceRequirements, RACE_ASSESSMENT_VERSION, type RaceAnswer } from './raceAssessment'

interface Props { onReviewStep: (step: 0 | 1 | 2 | 3 | 4) => void; onBackToGuided: () => void }
const storageKey = 'ltvc-race-assessment-v4'

export default function RaceAssessment({ onReviewStep, onBackToGuided }: Props) {
  const [state, setState] = useLocalStorage(storageKey, initialRaceAssessment(), isRaceAssessmentState)
  const [feedback, setFeedback] = useState<{ questionId: string; correct: boolean; text: string } | null>(null)
  const current = raceQuestions[state.currentQuestion]
  const requirements = useMemo(() => raceRequirements(state), [state])
  const answer = state.answers[current.id]
  const isMultiple = current.type === 'multiple'
  const viewingOptionalStretch = current.id === 'transfer-boundary' && !hasCorrectAttempt(state, 'transfer-boundary')
  const needsRequiredEvidence = hasCorrectAttempt(state, 'debug-failure-repair') && !requirements.satisfied

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
    setState(existing => ({ ...existing, attempts: [...existing.attempts, attempt] }))
    setFeedback({ questionId: current.id, correct, text: correct ? `Đúng. ${current.explanation}` : `Chưa đúng. ${current.explanation}` })
  }

  const continueAfterFeedback = () => {
    if (!feedback?.correct || feedback.questionId !== current.id) return
    setFeedback(null)
    setState(existing => {
      const updatedRequirements = raceRequirements(existing)
      if (current.id === 'debug-failure-repair' && !updatedRequirements.satisfied) return existing
      return updatedRequirements.satisfied
        ? existing
        : { ...existing, currentQuestion: Math.min(existing.currentQuestion + 1, raceQuestions.length - 1) }
    })
  }

  const resetCurrent = () => {
    setFeedback(null)
    setState(existing => ({ ...existing, answers: { ...existing.answers, [current.id]: isMultiple ? [] : '' } }))
  }

  return <section className="race-assessment" aria-labelledby="race-assessment-title">
    <header><span className="mini-label">Bài luyện tập · assessment {RACE_ASSESSMENT_VERSION}</span><h2 id="race-assessment-title">Kiểm tra evidence Race Condition</h2><p>Đây là bài đánh giá của Golden Pilot, không phải generic quiz. L1–L3 là điều kiện hoàn thành bài luyện tập; L4 là stretch. English và tự đánh giá mastery vẫn là track riêng.</p></header>
    <ol className="race-assessment-progress" aria-label="Tiến độ bài luyện tập">{raceQuestions.map((question, index) => <li key={question.id} aria-current={index === state.currentQuestion ? 'step' : undefined} className={hasCorrectAttempt(state, question.id) ? 'done' : ''}>{question.level}</li>)}</ol>
    {requirements.satisfied && !viewingOptionalStretch && !feedback ? <section className="race-assessment-result" aria-live="polite"><h3>Đã thỏa yêu cầu bài luyện tập Race</h3><p>L1/L2 và diagnosis L3 được auto-check. Lab observation, candidate timeline và repair note L3 là <strong>self-reported / self-reviewed</strong>; ứng dụng không thể tự xác minh bạn đã chạy code hoặc đánh giá chất lượng reasoning mở. Không có “Next Lesson” vì lesson tiếp theo của chapter chưa được phát hành.</p><div className="race-assessment-actions"><button className="secondary-button" onClick={onBackToGuided}>Quay lại bài học</button><button className="secondary-button" onClick={() => { setFeedback(null); setState(existing => ({ ...existing, currentQuestion: 5 })) }}>Làm stretch L4</button></div></section> : <>
      {needsRequiredEvidence && !feedback ? <section className="race-evidence-gate" aria-live="polite"><h3>Hoàn thiện evidence bắt buộc trước stretch L4</h3><p>Diagnosis L3 đã được auto-check. Để hoàn thành L1–L3, hãy ghi observation lab thật, tự review candidate timeline và repair note ở dưới. Đây là self-reported evidence, không phải machine verification.</p></section> : <section className="race-question-card" aria-labelledby={`race-question-${current.id}`}><div className="race-question-meta"><span>{current.level}</span><span>Câu {state.currentQuestion + 1} / {raceQuestions.length}</span></div><h3 id={`race-question-${current.id}`}>{current.prompt}</h3><fieldset className="race-answer-options"><legend className="sr-only">Các lựa chọn trả lời</legend>{current.options.map(option => <label key={option.id}><input type={isMultiple ? 'checkbox' : 'radio'} name={current.id} checked={Array.isArray(answer) ? answer.includes(option.id) : answer === option.id} onChange={() => setAnswer(option.id)} />{option.label}</label>)}</fieldset>
        {feedback?.questionId === current.id && <div className={feedback.correct ? 'race-feedback correct' : 'race-feedback incorrect'} role="status"><p>{feedback.text}</p><div><button className="secondary-button" onClick={() => onReviewStep(current.reviewStep)}>Ôn lại đúng phần này</button>{feedback.correct ? <button className="primary-button" onClick={continueAfterFeedback}>Tiếp tục</button> : <button className="primary-button" onClick={resetCurrent}>Thử lại</button>}</div></div>}
        {!feedback && <div className="race-assessment-actions"><button className="secondary-button" onClick={() => requirements.satisfied && viewingOptionalStretch ? setState(existing => ({ ...existing, currentQuestion: 4 })) : setState(existing => ({ ...existing, currentQuestion: Math.max(0, existing.currentQuestion - 1) }))}>{requirements.satisfied && viewingOptionalStretch ? 'Bỏ qua stretch' : 'Quay lại'}</button><button className="primary-button" disabled={!answer || (Array.isArray(answer) && answer.length === 0)} onClick={submit}>Nộp câu trả lời</button></div>}</section>}
      {hasCorrectAttempt(state, 'baseline') && hasCorrectAttempt(state, 'variation') && <section className="race-self-evidence"><h3>Local lab evidence — tự báo cáo</h3><p>Hãy chạy local C# lab trước. Đây là ghi nhận của bạn, không phải app xác minh execution.</p><label>Kết quả bạn quan sát được<input value={state.labObservation} onChange={event => setState(existing => ({ ...existing, labObservation: event.target.value }))} placeholder="Ví dụ: 60/50 unsafe approve 110, final balance 40." /></label><label><input type="checkbox" checked={state.labConfirmed} onChange={event => setState(existing => ({ ...existing, labConfirmed: event.target.checked }))} /> Tôi đã chạy hoặc đối chiếu local lab và ghi observation thật.</label></section>}
      {hasCorrectAttempt(state, 'debug-failure-repair') && <section className="race-self-evidence"><h3>L3 debug note — tự review</h3><p>Auto-check chỉ xác nhận diagnosis của case hai lock khác nhau. Hai ghi chú dưới đây là reasoning mở: app lưu câu trả lời của bạn nhưng không tự chấm chất lượng debug.</p><label className="sr-only" htmlFor="race-debug-timeline">Candidate timeline</label><textarea id="race-debug-timeline" value={state.debugTimeline} onChange={event => setState(existing => ({ ...existing, debugTimeline: event.target.value }))} placeholder="Reserve và Withdraw giữ gate nào, cùng đọc state gì, evidence nào sẽ kiểm..." /><label><input type="checkbox" checked={state.debugSelfReviewed} onChange={event => setState(existing => ({ ...existing, debugSelfReviewed: event.target.checked }))} /> Tôi đã tự review timeline theo evidence ở Step 4.</label><hr /><p><strong>Independent repair note:</strong> nêu lock object nào sai phạm vi, rồi viết 2–5 dòng pseudo-code/C# cho một shared gate bao quanh READ → CHECK → WRITE.</p><label className="sr-only" htmlFor="race-debug-repair">Minimal corrected code path</label><textarea id="race-debug-repair" value={state.debugRepairNote} onChange={event => setState(existing => ({ ...existing, debugRepairNote: event.target.value }))} placeholder="lock (_balanceGate) { if (balance >= amount) { balance -= amount; } }" /><p className="race-self-review-rubric"><strong>Tự review:</strong> cùng một stable gate cho cả hai path; gate bao phủ đủ READ/CHECK/WRITE; và bạn ghi rõ boundary này chỉ đúng cho state trong một process, không thay thế database/multi-instance boundary.</p><label><input type="checkbox" checked={state.debugRepairSelfReviewed} onChange={event => setState(existing => ({ ...existing, debugRepairSelfReviewed: event.target.checked }))} /> Tôi đã đối chiếu repair note với ba điểm trong rubric.</label></section>}
      <aside className="race-requirements"><strong>Điều kiện completion</strong><span className={requirements.l1 ? 'met' : ''}>L1 checked</span><span className={requirements.l2 ? 'met' : ''}>L2 checked</span><span className={requirements.lab ? 'met' : ''}>Lab self-reported</span><span className={requirements.l3Checked ? 'met' : ''}>L3 diagnosis checked</span><span className={requirements.l3TimelineRecorded ? 'met' : ''}>L3 timeline self-reviewed</span><span className={requirements.l3RepairRecorded ? 'met' : ''}>L3 repair self-reviewed</span><small>Dropdown mastery và checkbox ghi chú không thể thay các điều kiện auto-check.</small></aside>
    </>}
  </section>
}
