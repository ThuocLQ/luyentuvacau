import { CheckCircle2, Eye, RotateCcw, Shuffle, TimerReset, XCircle } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { questions } from '../data/docs'
import { useReviewQueue } from '../hooks/useReviewQueue'
import { formatDuration } from '../lib/formatDuration'

const SESSION_SECONDS = 60

export default function InterviewPage() {
  const [topic, setTopic] = useState('Tất cả')
  const [difficulty, setDifficulty] = useState('Tất cả')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [started, setStarted] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(SESSION_SECONDS)
  const [liveMessage, setLiveMessage] = useState('')
  const questionHeadingRef = useRef<HTMLHeadingElement>(null)
  const [searchParams] = useSearchParams()
  const { items, addOrUpdate } = useReviewQueue()
  const visible = useMemo(() => questions.filter(question => (topic === 'Tất cả' || question.topic === topic) && (difficulty === 'Tất cả' || question.difficulty === difficulty)), [topic, difficulty])
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

  useEffect(() => {
    if (!started) return
    if (secondsLeft === 10) setLiveMessage('Còn 10 giây.')
    if (secondsLeft === 0) setLiveMessage('Hết 60 giây. Bạn có thể xem gợi ý và tự đánh giá.')
  }, [secondsLeft, started])

  const nextQuestion = () => {
    if (!visible.length) return
    const candidates = visible.filter(question => question.id !== active?.id)
    const next = candidates[Math.floor(Math.random() * candidates.length)] ?? visible[0]
    setActiveId(next.id)
    setRevealed(false)
    setStarted(false)
    setSecondsLeft(SESSION_SECONDS)
    setLiveMessage('Đã chuyển sang câu hỏi mới.')
    window.requestAnimationFrame(() => questionHeadingRef.current?.focus())
  }

  const rate = (rating: 'confident' | 'hesitant' | 'missed') => {
    if (!active) return
    addOrUpdate({ id: `question:${active.id}`, kind: 'question', title: active.question, relatedDoc: active.relatedDoc, rating })
    nextQuestion()
  }

  return <div className="home-page interview-page">
    <section className="home-hero"><div className="hero-copy"><div className="eyebrow">Phiên luyện phỏng vấn</div><h1>Nói thành tiếng.<br />Rồi mới xem gợi ý.</h1><p>Chọn một câu, tự trả lời trong 60 giây, sau đó so sánh với đáp án ngắn, câu hỏi đào sâu và dấu hiệu trả lời chưa đạt.</p></div></section>
    <section className="practice-controls" aria-label="Thiết lập phiên luyện"><label>Chủ đề<select value={topic} onChange={event => setTopic(event.target.value)}><option>Tất cả</option>{[...new Set(questions.map(question => question.topic))].map(value => <option key={value}>{value}</option>)}</select></label><label>Cấp độ<select value={difficulty} onChange={event => setDifficulty(event.target.value)}><option>Tất cả</option><option>Senior</option><option>Lead</option></select></label><button className="primary-button" onClick={nextQuestion}><Shuffle size={17} /> Câu hỏi mới</button><span className="review-count"><RotateCcw size={16} /> {items.length} cần ôn lại</span></section>
    {!active ? <section className="study-tip"><XCircle size={18} /><p>Không có câu hỏi khớp với bộ lọc. Hãy chọn Tất cả hoặc đổi chủ đề.</p></section> : <section className="practice-card">
      <div className="practice-meta"><span className="category-chip">{active.topic}</span><span className="weight-badge">{active.difficulty}</span><span className={secondsLeft <= 10 ? 'timer urgent' : 'timer'}><TimerReset size={16} /> {formatDuration(secondsLeft)}</span></div>
      <h2 ref={questionHeadingRef} tabIndex={-1}>{active.question}</h2><p className="practice-prompt">Nói thành tiếng: bối cảnh → quyết định → trade-off → cách bạn kiểm chứng ở production.</p>
      {!started ? <button className="primary-button" onClick={() => { setStarted(true); setLiveMessage('Bắt đầu đếm 60 giây.') }}><TimerReset size={17} /> Bắt đầu 60 giây</button> : !revealed ? <div className="hero-actions"><button className="primary-button" onClick={() => setRevealed(true)}><Eye size={17} /> Xem gợi ý trả lời</button><button className="secondary-button" onClick={() => { setStarted(false); setSecondsLeft(SESSION_SECONDS); setLiveMessage('Đã đặt lại thời gian.') }}>Đặt lại thời gian</button>{secondsLeft === 0 && <span className="timer urgent">Hết giờ — hãy xem gợi ý và tự đánh giá.</span>}</div> : <div className="answer-panel"><strong>Trả lời ngắn</strong><p>{active.shortAnswer}</p><strong>Câu hỏi đào sâu</strong><ul>{active.followUps.map(item => <li key={item}>{item}</li>)}</ul><strong>Dấu hiệu trả lời chưa đạt</strong><ul>{active.redFlags.map(item => <li key={item}>{item}</li>)}</ul><div className="rating-actions"><span>Tự đánh giá:</span><button className="secondary-button" onClick={() => rate('confident')}><CheckCircle2 size={16} /> Tự tin</button><button className="secondary-button" onClick={() => rate('hesitant')}><RotateCcw size={16} /> Lưỡng lự</button><button className="secondary-button" onClick={() => rate('missed')}><XCircle size={16} /> Chưa biết</button><Link className="secondary-button" to={`/docs/${active.relatedDoc}`}>Ôn cheatsheet</Link></div></div>}
      <p className="sr-only" aria-live="polite">{liveMessage}</p>
    </section>}
  </div>
}
