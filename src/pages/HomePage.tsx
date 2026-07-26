import { ArrowRight, Bookmark, CheckCircle2, Clock3, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { docs } from '../data/docs'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function HomePage() {
  const [completed] = useLocalStorage<string[]>('ltvc-completed', [])
  const [bookmarks] = useLocalStorage<string[]>('ltvc-bookmarks', [])
  const percent = docs.length ? Math.round((completed.length / docs.length) * 100) : 0

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="eyebrow"><Sparkles size={15} /> Personal Learning System</div>
        <h1>Học có hệ thống.<br />Ôn đúng trọng tâm.</h1>
        <p>Nền tảng tài liệu cá nhân dành cho Backend, Finance, Oracle, System Design và Distributed Systems.</p>
        <div className="home-actions">
          <Link className="primary-button" to="/docs/backend-finance">Bắt đầu học <ArrowRight size={18} /></Link>
          <span>Tự động lưu tiến độ trên trình duyệt</span>
        </div>
      </section>

      <section className="stats-grid">
        <article><CheckCircle2 /><div><strong>{completed.length}/{docs.length}</strong><span>Tài liệu hoàn thành</span></div></article>
        <article><Bookmark /><div><strong>{bookmarks.length}</strong><span>Tài liệu đã lưu</span></div></article>
        <article><Clock3 /><div><strong>{docs.reduce((sum, d) => sum + d.readingMinutes, 0)}</strong><span>Phút nội dung</span></div></article>
      </section>

      <section className="progress-card">
        <div><span>Tiến độ tổng</span><strong>{percent}%</strong></div>
        <div className="progress-track"><span style={{ width: `${percent}%` }} /></div>
      </section>

      <section className="section-heading">
        <div>
          <span>Learning library</span>
          <h2>Tài liệu trọng tâm</h2>
        </div>
      </section>

      <section className="doc-grid">
        {docs.map(doc => (
          <Link key={doc.slug} className="doc-card" to={`/docs/${doc.slug}`}>
            <div className="doc-card-top">
              <span className="category-chip">{doc.category}</span>
              <span>{doc.readingMinutes} phút</span>
            </div>
            <h3>{doc.title}</h3>
            <p>{doc.description}</p>
            <div className="doc-tags">{doc.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
            <div className="doc-card-action">Mở tài liệu <ArrowRight size={16} /></div>
          </Link>
        ))}
      </section>
    </div>
  )
}
