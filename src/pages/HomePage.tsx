import { ArrowRight, CheckCircle2, Clock3, Play, ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { completeDocs, docs, sections } from '../data/docs'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function HomePage() {
  const [completed] = useLocalStorage<string[]>('ltvc-completed', [])
  const next = completeDocs.find(doc => !completed.includes(doc.slug)) ?? completeDocs[0]
  return <div className="home-page cheatsheet-home">
    <section className="home-hero"><div className="hero-copy"><div className="eyebrow">Cheatsheet phỏng vấn Senior Backend .NET</div><h1>Đọc nhanh.<br />Trả lời sâu.</h1><p>Tài liệu tập trung vào mental model, bẫy production và trade-off thường được hỏi ở vòng Senior Backend .NET.</p><div className="home-actions"><Link className="primary-button" to={`/docs/${next.slug}`}><Play size={17} /> Tiếp tục: {next.title.replace(/^\d+\. /, '')}</Link></div></div><div className="hero-progress"><strong>{completeDocs.length}</strong><span>cheatsheet sẵn sàng ôn</span><p>Mỗi chủ đề đều có nội dung và câu hỏi luyện trả lời.</p></div></section>
    <section className="quick-start-grid"><Link className="continue-card" to="/interview"><span className="mini-label">Chế độ luyện phỏng vấn</span><h2>Rút câu hỏi<br />Rồi tự trả lời</h2><p>Luyện câu trả lời 30–60 giây, câu hỏi đào sâu và dấu hiệu trả lời chưa đạt.</p><span className="continue-link">Bắt đầu mock interview <ArrowRight size={16} /></span></Link><div className="goal-card"><div className="goal-icon"><ShieldAlert size={20} /></div><div><span className="mini-label">Cách dùng</span><h2>Không học như giáo trình</h2></div><ol><li>Chọn câu hỏi hoặc cheatsheet đúng lỗ hổng kiến thức.</li><li>Nói câu trả lời ngắn trước khi xem gợi ý.</li><li>Ghi lại bẫy và trade-off cần ôn lại.</li></ol></div></section>
    {sections.map(section => { const items = docs.filter(doc => doc.section === section && doc.content); if (!items.length) return null; return <section className="library-section" key={section}><div className="section-heading"><div><span>{section}</span><h2>{section}</h2></div></div><div className="doc-grid">{items.map(doc => <Link key={doc.slug} className="doc-card" to={`/docs/${doc.slug}`}><div className="doc-card-top"><span className="category-chip">{doc.interviewWeight}</span><span><Clock3 size={14} /> {doc.readingMinutes} phút</span></div><h3>{doc.title}</h3><p>{doc.description}</p><div className="doc-card-action">Mở cheatsheet <ArrowRight size={16} /></div></Link>)}</div></section> })}
    <section className="study-tip"><CheckCircle2 size={18} /><p><strong>Cách ôn đúng:</strong> Đánh dấu tài liệu muốn đọc lại; dùng <strong>Cần ôn lại</strong> khi bạn chưa tự trả lời chắc để đưa nội dung vào hàng đợi.</p></section>
  </div>
}
