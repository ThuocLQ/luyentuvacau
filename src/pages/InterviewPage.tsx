import { CheckCircle2, Eye, RotateCcw, Shuffle, TimerReset, XCircle } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { questions } from '../data/docs'
import { useReviewQueue } from '../hooks/useReviewQueue'

const SESSION_SECONDS = 60

export default function InterviewPage() {
  const [topic, setTopic] = useState('All')
  const [difficulty, setDifficulty] = useState('All')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [started, setStarted] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(SESSION_SECONDS)
  const [searchParams] = useSearchParams()
  const { items, addOrUpdate, remove } = useReviewQueue()
  const visible = useMemo(() => questions.filter(question => (topic === 'All' || question.topic === topic) && (difficulty === 'All' || question.difficulty === difficulty)), [topic, difficulty])
  const active = visible.find(question => question.id === activeId) ?? visible[0]

  useEffect(() => {
    setActiveId(null)
    setRevealed(false)
    setStarted(false)
    setSecondsLeft(SESSION_SECONDS)
  }, [topic, difficulty])

  useEffect(() => {
    const question = searchParams.get('question')
    if (question && questions.some(item => item.id === question)) {
      setActiveId(question)
      setRevealed(false)
      setStarted(false)
      setSecondsLeft(SESSION_SECONDS)
    }
  }, [searchParams])

  useEffect(() => {
    if (!active || !started || revealed || secondsLeft === 0) return
    const timer = window.setInterval(() => setSecondsLeft(value => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [active, revealed, secondsLeft, started])

  const nextQuestion = () => {
    if (!visible.length) return
    const candidates = visible.filter(question => question.id !== active?.id)
    const next = candidates[Math.floor(Math.random() * candidates.length)] ?? visible[0]
    setActiveId(next.id)
    setRevealed(false)
    setStarted(false)
    setSecondsLeft(SESSION_SECONDS)
  }

  const rate = (rating: 'confident' | 'hesitant' | 'missed') => {
    if (!active) return
    if (rating === 'confident') remove(`question:${active.id}`)
    else addOrUpdate({ id: `question:${active.id}`, kind: 'question', title: active.question, relatedDoc: active.relatedDoc, rating })
    nextQuestion()
  }

  return <div className="home-page interview-page">
    <section className="home-hero"><div className="hero-copy"><div className="eyebrow">Interview practice session</div><h1>Think aloud.<br />Then reveal.</h1><p>Chọn một câu, tự trả lời trong 60 giây, sau đó so sánh với answer, follow-up và red flags.</p></div></section>
    <section className="practice-controls" aria-label="Thiết lập phiên luyện"><label>Topic<select value={topic} onChange={event => setTopic(event.target.value)}><option>All</option>{[...new Set(questions.map(question => question.topic))].map(value => <option key={value}>{value}</option>)}</select></label><label>Level<select value={difficulty} onChange={event => setDifficulty(event.target.value)}><option>All</option><option>Senior</option><option>Lead</option></select></label><button className="primary-button" onClick={nextQuestion}><Shuffle size={17} /> Câu hỏi mới</button><span className="review-count"><RotateCcw size={16} /> {items.length} cần review</span></section>
    {!active ? <section className="study-tip"><XCircle size={18} /><p>Không có câu hỏi khớp với filter. Hãy chọn All hoặc đổi topic.</p></section> : <section className="practice-card">
      <div className="practice-meta"><span className="category-chip">{active.topic}</span><span className="weight-badge">{active.difficulty}</span><span className={secondsLeft <= 10 ? 'timer urgent' : 'timer'} role="status" aria-live="polite"><TimerReset size={16} /> 00:{String(secondsLeft).padStart(2, '0')}</span></div>
      <h2>{active.question}</h2><p className="practice-prompt">Nói thành tiếng: bối cảnh → quyết định → trade-off → cách bạn kiểm chứng ở production.</p>
      {!started ? <button className="primary-button" onClick={() => setStarted(true)}><TimerReset size={17} /> Bắt đầu 60 giây</button> : !revealed ? <div className="hero-actions"><button className="primary-button" onClick={() => setRevealed(true)}><Eye size={17} /> Reveal answer</button><button className="secondary-button" onClick={() => { setStarted(false); setSecondsLeft(SESSION_SECONDS) }}>Reset timer</button>{secondsLeft === 0 && <span className="timer urgent">Hết giờ — hãy reveal và tự đánh giá.</span>}</div> : <div className="answer-panel"><strong>Short answer</strong><p>{active.shortAnswer}</p><strong>Follow-up</strong><ul>{active.followUps.map(item => <li key={item}>{item}</li>)}</ul><strong>Red flags</strong><ul>{active.redFlags.map(item => <li key={item}>{item}</li>)}</ul><div className="rating-actions"><span>Tự đánh giá:</span><button className="secondary-button" onClick={() => rate('confident')}><CheckCircle2 size={16} /> Tự tin</button><button className="secondary-button" onClick={() => rate('hesitant')}><RotateCcw size={16} /> Lưỡng lự</button><button className="secondary-button" onClick={() => rate('missed')}><XCircle size={16} /> Chưa biết</button><Link className="secondary-button" to={`/docs/${active.relatedDoc}`}>Ôn cheatsheet</Link></div></div>}
    </section>}
  </div>
}
