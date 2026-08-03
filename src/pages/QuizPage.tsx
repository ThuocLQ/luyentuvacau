import { ArrowRight, CheckCircle2, CircleAlert, ExternalLink, RotateCcw, XCircle } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { quizQuestions } from '../data/quizzes'
import { useQuizProgress } from '../hooks/useQuizProgress'
import { useReviewQueue } from '../hooks/useReviewQueue'

type Certainty = 'confident' | 'hesitant' | 'missed'
const SESSION_SIZE = 5

function stableOptionOrder<T extends { id: string }>(items: readonly T[], seed: string) {
  const hash = [...seed].reduce((total, character) => (total * 31 + character.charCodeAt(0)) >>> 0, 0)
  return [...items].sort((left, right) => {
    const leftRank = (hash ^ left.id.charCodeAt(0)) >>> 0
    const rightRank = (hash ^ right.id.charCodeAt(0)) >>> 0
    return leftRank - rightRank
  })
}

export default function QuizPage() {
  const [searchParams] = useSearchParams()
  const { dueQuestionIds, recordOutcome } = useQuizProgress()
  const { addOrUpdate, remove } = useReviewQueue()
  const feedbackRef = useRef<HTMLHeadingElement>(null)
  const questionRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(0)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const [rated, setRated] = useState(false)
  const topic = searchParams.get('topic') ?? 'Tất cả'
  const dueMode = searchParams.get('mode') === 'due'

  const sourceQuestions = useMemo(() => {
    return dueMode
      ? quizQuestions.filter(question => dueQuestionIds.includes(question.id))
      : quizQuestions.filter(question => topic === 'Tất cả' || question.topic === topic)
  }, [dueMode, dueQuestionIds, topic])
  const [sessionIds, setSessionIds] = useState<string[]>(() => sourceQuestions.slice(0, SESSION_SIZE).map(question => question.id))
  const session = useMemo(() => sessionIds.map(id => quizQuestions.find(question => question.id === id)).filter((question): question is typeof quizQuestions[number] => Boolean(question)), [sessionIds])
  const question = session[position]
  const visibleOptions = useMemo(() => question ? stableOptionOrder(question.options, question.id) : [], [question])
  const isCorrect = selectedOptionId === question?.correctOptionId
  const isLastQuestion = position >= session.length - 1

  useEffect(() => {
    setSessionIds(sourceQuestions.slice(0, SESSION_SIZE).map(question => question.id))
    setPosition(0)
    setSelectedOptionId(null)
    setSubmitted(false)
    setAnnouncement('')
    setRated(false)
  // A quiz session stays stable after a rating changes the review queue.
  // It is rebuilt only when the user explicitly changes its route/filter.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, dueMode])

  useEffect(() => {
    if (!submitted) return
    feedbackRef.current?.focus()
    setAnnouncement(isCorrect ? 'Đáp án đúng. Xem lý do bên dưới.' : 'Đáp án chưa phù hợp nhất. Xem lý do bên dưới.')
  }, [isCorrect, submitted])

  useEffect(() => {
    if (submitted) return
    window.requestAnimationFrame(() => questionRef.current?.focus())
  }, [position, submitted])

  const submit = () => {
    if (!selectedOptionId || !question) return
    setSubmitted(true)
  }
  const continueSession = () => {
    setSelectedOptionId(null)
    setSubmitted(false)
    setRated(false)
    setAnnouncement('Câu hỏi mới đã sẵn sàng.')
    setPosition(current => current + 1)
  }
  const rate = (certainty: Certainty) => {
    if (!question || rated) return
    const outcome = isCorrect ? certainty : 'missed'
    recordOutcome(question.id, outcome)
    if (outcome === 'confident') remove(`quiz:${question.id}`)
    else addOrUpdate({ id: `quiz:${question.id}`, kind: 'quiz', title: question.prompt, relatedDoc: question.relatedDoc, rating: outcome })
    setRated(true)
    if (isLastQuestion) return
    continueSession()
  }

  if (!question) return <div className="home-page quiz-page"><section className="study-tip"><CircleAlert size={18} /><p>{dueMode ? 'Chưa có câu nào trong hàng đợi quiz. Hãy làm quiz theo chủ đề hoặc luyện trả lời miệng trước.' : 'Chủ đề này chưa có quiz phù hợp. Hãy quay lại chọn chủ đề khác.'}</p><Link className="primary-button" to="/quiz">Về trang quiz</Link></section></div>

  return <div className="home-page quiz-page">
    <div className="quiz-session-header">
      <Link className="back-link" to="/quiz">← Quay lại quiz</Link>
      <span className="category-chip">{question.topic}</span>
      <p>Câu {position + 1} trong phiên{session.length > 1 ? ` · ${session.length} câu` : ''}</p>
    </div>
    <section className="quiz-question-card" aria-labelledby="quiz-question-title" ref={questionRef} tabIndex={-1}>
      <p className="quiz-scenario"><strong>Mục tiêu của câu:</strong> {question.learningObjective}</p>
      {question.scenario && <p className="quiz-scenario">{question.scenario}</p>}
      <div className="quiz-context"><div><strong>Dữ kiện</strong><ul>{question.facts.map(item => <li key={item}>{item}</li>)}</ul></div><div><strong>Ràng buộc</strong><ul>{question.constraints.map(item => <li key={item}>{item}</li>)}</ul></div></div>
      <fieldset disabled={submitted}>
        <legend id="quiz-question-title">{question.prompt}</legend>
        <div className="quiz-options">
          {visibleOptions.map(option => <label className={`quiz-option ${selectedOptionId === option.id ? 'selected' : ''} ${submitted && option.id === question.correctOptionId ? 'correct' : ''} ${submitted && selectedOptionId === option.id && !isCorrect ? 'incorrect' : ''}`} key={option.id}>
            <input type="radio" name={question.id} value={option.id} checked={selectedOptionId === option.id} onChange={() => setSelectedOptionId(option.id)} />
            <span>{option.text}</span>
          </label>)}
        </div>
      </fieldset>
      {!submitted && <button className="primary-button quiz-submit" onClick={submit} disabled={!selectedOptionId}>Chấm đáp án <ArrowRight size={17} /></button>}
    </section>

    <p className="sr-only" aria-live="polite">{announcement}</p>
    {submitted && <section className={`quiz-feedback ${isCorrect ? 'success' : 'warning'}`} aria-labelledby="quiz-feedback-title">
      <h2 id="quiz-feedback-title" ref={feedbackRef} tabIndex={-1}>{isCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />}{isCorrect ? 'Đáp án phù hợp nhất' : 'Cần xem lại điều kiện của bài toán'}</h2>
      {question.explanation && <p>{question.explanation}</p>}
      <div className="quiz-rationale-list">
        {visibleOptions.map(option => <article key={option.id} className={option.id === question.correctOptionId ? 'correct' : ''}><strong>{option.id === question.correctOptionId ? 'Phương án tốt nhất' : 'Chưa phù hợp'}: {option.text}</strong><p>{option.rationale}</p></article>)}
      </div>
      {question.productionConsequence && <p className="quiz-consequence"><strong>Nếu làm sai ở production:</strong> {question.productionConsequence}</p>}
      <div className="quiz-reasoning"><p><strong>Cơ chế:</strong> {question.explanationDetail.mechanism}</p><p><strong>Đánh đổi:</strong> {question.explanationDetail.tradeOff}</p><p><strong>Bằng chứng cần xem:</strong> {question.explanationDetail.evidence}</p><p><strong>Tự nói lại:</strong> {question.recall.join(' ')}</p><p><strong>Nếu điều kiện đổi:</strong> {question.followUp.changedConstraint} — {question.followUp.prompt}</p></div>
      <div className="quiz-learning-links">
        <Link className="secondary-button" to={`/docs/${question.relatedDoc}#${question.relatedSection}`}><ExternalLink size={16} /> Đọc phần liên quan</Link>
        {question.relatedInterviewQuestion && <Link className="secondary-button" to={`/interview?question=${encodeURIComponent(question.relatedInterviewQuestion)}`}><RotateCcw size={16} /> Luyện nói câu này</Link>}
      </div>
      <div className="quiz-certainty" aria-label="Tự đánh giá mức chắc chắn">
        <span>Sau khi đọc lý do, bạn thấy sao?</span>
        <button className="secondary-button" onClick={() => rate('confident')} disabled={!isCorrect || rated}><CheckCircle2 size={16} /> Đúng và tự giải thích được</button>
        <button className="secondary-button" onClick={() => rate('hesitant')} disabled={rated}><RotateCcw size={16} /> Còn lưỡng lự</button>
        <button className="secondary-button" onClick={() => rate('missed')} disabled={rated}><XCircle size={16} /> Chưa rõ</button>
      </div>
      {isLastQuestion && <Link className="primary-button" to="/quiz">Xem lịch ôn quiz <ArrowRight size={17} /></Link>}
    </section>}
  </div>
}
