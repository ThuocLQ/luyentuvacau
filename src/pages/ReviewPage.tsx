import { CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useReviewQueue } from '../hooks/useReviewQueue'

export default function ReviewPage() {
  const { items, remove } = useReviewQueue()
  return <div className="home-page interview-page"><section className="home-hero"><div className="hero-copy"><div className="eyebrow">Review queue</div><h1>Ôn phần chưa chắc.<br />Không ôn lại tất cả.</h1><p>Queue tổng hợp các cheatsheet và câu hỏi bạn tự đánh dấu cần quay lại.</p></div></section>{items.length === 0 ? <section className="study-tip"><CheckCircle2 size={18} /><p>Review queue đang trống. Chọn một cheatsheet hoặc bắt đầu Interview Mode để tạo lần ôn tiếp theo.</p></section> : <section className="question-list">{items.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).map(item => <article className="question-card" key={item.id}><div><span className="category-chip">{item.kind === 'question' ? 'Question' : 'Cheatsheet'}</span>{item.rating && <span className="weight-badge">{item.rating}</span>}</div><h2>{item.title}</h2><div className="hero-actions"><Link className="primary-button" to={item.kind === 'question' ? `/interview?question=${item.id.replace('question:', '')}` : `/docs/${item.relatedDoc}`}>Ôn lại</Link><button className="secondary-button" onClick={() => remove(item.id)}><CheckCircle2 size={17} /> Đã xử lý</button></div></article>)}</section>}</div>
}
