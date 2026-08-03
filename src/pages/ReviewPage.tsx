import { CheckCircle2, CircleHelp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { quizQuestions } from '../data/quizzes'
import { useQuizProgress } from '../hooks/useQuizProgress'
import { useReviewQueue } from '../hooks/useReviewQueue'

export default function ReviewPage() {
  const { items, remove } = useReviewQueue()
  const { dueQuestionIds } = useQuizProgress()
  const sortedItems = [...items].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  const dueQuizQuestions = dueQuestionIds.map(id => quizQuestions.find(question => question.id === id)).filter((question): question is typeof quizQuestions[number] => Boolean(question))

  return <div className="home-page interview-page">
    <section className="home-hero"><div className="hero-copy"><div className="eyebrow">Hàng đợi ôn lại</div><h1>Ôn phần chưa chắc.<br />Không ôn lại tất cả.</h1><p>Hàng đợi tổng hợp các cheatsheet, câu trả lời miệng và quiz đã đến lịch ôn.</p></div></section>
    {dueQuizQuestions.length > 0 && <section className="study-tip"><CircleHelp size={18} /><div><p><strong>{dueQuizQuestions.length} câu quiz</strong> đã đến lịch ôn. Làm lại với một tình huống có điều kiện rõ để kiểm tra xem bạn còn nhớ cơ chế hay chỉ nhớ đáp án.</p><Link className="primary-button" to="/quiz/play?mode=due">Ôn quiz đến hạn</Link></div></section>}
    {items.length === 0 ? <section className="study-tip"><CheckCircle2 size={18} /><p>Chưa có cheatsheet hoặc câu trả lời miệng cần ôn. Bạn vẫn có thể làm quiz theo chủ đề để tìm phần mình chưa chắc.</p><Link className="secondary-button" to="/quiz">Làm quiz tình huống</Link></section> : <section className="question-list">{sortedItems.map(item => <article className="question-card" key={item.id}><div><span className="category-chip">{item.kind === 'question' ? 'Câu hỏi miệng' : item.kind === 'quiz' ? 'Quiz tình huống' : 'Cheatsheet'}</span>{item.rating && <span className="weight-badge">{item.rating}</span>}</div><h2>{item.title}</h2><div className="hero-actions"><Link className="primary-button" to={item.kind === 'question' ? `/interview?question=${item.id.replace('question:', '')}` : item.kind === 'quiz' ? '/quiz' : `/docs/${item.relatedDoc}`}>Ôn lại</Link><button className="secondary-button" onClick={() => remove(item.id)}><CheckCircle2 size={17} /> Đã xử lý</button></div></article>)}</section>}
  </div>
}
