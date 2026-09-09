import { CheckCircle2, CircleHelp, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { completeDocs, questions } from '../data/docs'
import { quizQuestions } from '../data/quizzes'
import { useReviewProgress } from '../hooks/useReviewProgress'
import { formatReviewReason, type ReviewProgress } from '../lib/review'

function resolve(item: ReviewProgress) {
  if (item.kind === 'quiz') { const quiz = quizQuestions.find(question => `quiz:${question.id}` === item.id); return quiz ? { title: quiz.prompt, to: `/quiz/play?question=${quiz.id}`, kind: 'Quiz tình huống' } : null }
  if (item.kind === 'question') { const question = questions.find(question => `question:${question.id}` === item.id); return question ? { title: question.question, to: `/interview?question=${question.id}`, kind: 'Câu hỏi miệng' } : null }
  const doc = completeDocs.find(doc => `cheatsheet:${doc.slug}` === item.id)
  return doc ? { title: doc.title, to: `/docs/${doc.slug}`, kind: 'Cheatsheet' } : null
}

export default function ReviewPage() {
  const { dueItems, progress, snooze } = useReviewProgress()
  const due = dueItems.map(item => ({ item, resolved: resolve(item) })).filter((entry): entry is { item: ReviewProgress, resolved: NonNullable<ReturnType<typeof resolve>> } => Boolean(entry.resolved))
  const scheduled = progress.filter(item => !dueItems.some(dueItem => dueItem.id === item.id)).length
  return <div className="home-page interview-page">
    <section className="home-hero"><div className="hero-copy"><div className="eyebrow">Due for review</div><h1>Ôn đúng lúc.<br />Không ôn lại tất cả.</h1><p>Quiz, câu hỏi miệng và cheatsheet dùng cùng lịch nhắc lại. Missed được nhắc sớm hơn hesitant; confident sẽ giãn dần khi bạn tiếp tục recall tốt.</p></div><div className="hero-progress"><strong>{due.length}</strong><span>nội dung đến hạn</span><p>{scheduled} nội dung đã được lên lịch cho lần sau.</p></div></section>
    {due.length === 0 ? <section className="study-tip"><CheckCircle2 size={18} /><div><p><strong>Hôm nay chưa có nội dung đến hạn.</strong> Làm quiz hoặc luyện oral; sau khi rating, app sẽ xếp lịch ôn chung.</p><div className="hero-actions"><Link className="primary-button" to="/quiz"><CircleHelp size={17} /> Làm quiz tình huống</Link><Link className="secondary-button" to="/interview"><RotateCcw size={17} /> Luyện trả lời miệng</Link></div></div></section> : <section className="question-list">{due.map(({ item, resolved }) => <article className="question-card" key={item.id}><div><span className="category-chip">{resolved.kind}</span><span className="weight-badge">{item.manualPin ? 'đã ghim' : item.lastRating}</span></div><h2>{resolved.title}</h2><p>{formatReviewReason(item)}{item.attempts ? ` · ${item.attempts} lần luyện.` : ''}</p><div className="hero-actions"><Link className="primary-button" to={resolved.to}>Ôn lại</Link><button className="secondary-button" onClick={() => snooze(item.id)}><RotateCcw size={17} /> Hoãn 1 ngày</button></div></article>)}</section>}
  </div>
}