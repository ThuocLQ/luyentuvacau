import { ArrowRight, CheckCircle2, Clock3, Play, ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { completeDocs, docs, sections } from '../data/docs'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function HomePage() {
  const [completed] = useLocalStorage<string[]>('ltvc-completed', [])
  const next = completeDocs.find(doc => !completed.includes(doc.slug)) ?? completeDocs[0]
  return <div className="home-page cheatsheet-home">
    <section className="home-hero"><div className="hero-copy"><div className="eyebrow">Senior Backend .NET Interview Cheatsheet</div><h1>Đọc nhanh.<br />Trả lời sâu.</h1><p>Cheatsheet đã sẵn sàng tập trung vào mental model, production traps và trade-off thường bị hỏi ở Senior Backend .NET interview.</p><div className="home-actions"><Link className="primary-button" to={`/docs/${next.slug}`}><Play size={17} /> Tiếp tục: {next.title.replace(/^\d+\. /, '')}</Link></div></div><div className="hero-progress"><strong>{completeDocs.length}</strong><span>cheatsheet dùng ngay</span><p>Roadmap mở rộng được tách riêng, không che lấp nội dung sẵn sàng ôn.</p></div></section>
    <section className="quick-start-grid"><Link className="continue-card" to="/interview"><span className="mini-label">Interview mode</span><h2>Random question<br />Reveal answer</h2><p>Luyện câu trả lời 30–60 giây, follow-up và red flags.</p><span className="continue-link">Bắt đầu mock interview <ArrowRight size={16} /></span></Link><div className="goal-card"><div className="goal-icon"><ShieldAlert size={20} /></div><div><span className="mini-label">Cách dùng</span><h2>Không học như textbook</h2></div><ol><li>Chọn câu hỏi hoặc cheatsheet đúng gap.</li><li>Nói short answer trước khi reveal.</li><li>Ghi lại trap/trade-off cần review.</li></ol></div></section>
    {sections.map(section => { const items = docs.filter(doc => doc.section === section && doc.content); if (!items.length) return null; return <section className="library-section" key={section}><div className="section-heading"><div><span>{section}</span><h2>{section}</h2></div></div><div className="doc-grid">{items.map(doc => <Link key={doc.slug} className="doc-card" to={`/docs/${doc.slug}`}><div className="doc-card-top"><span className="category-chip">{doc.interviewWeight}</span><span><Clock3 size={14} /> {doc.readingMinutes} phút</span></div><h3>{doc.title}</h3><p>{doc.description}</p><div className="doc-card-action">Mở cheatsheet <ArrowRight size={16} /></div></Link>)}</div></section> })}
    <section className="study-tip"><ShieldAlert size={18} /><p><strong>Roadmap, chưa mở để học:</strong> {docs.filter(doc => !doc.content).map(doc => doc.title).join(' · ')}</p></section>
    <section className="study-tip"><CheckCircle2 size={18} /><p><strong>Cách ôn đúng:</strong> Bookmark để lưu tài liệu muốn đọc lại; dùng <strong>Need Review</strong> khi bạn chưa tự trả lời chắc và muốn đưa nội dung vào hàng đợi ôn tập.</p></section>
  </div>
}
