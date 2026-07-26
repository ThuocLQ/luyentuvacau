import { ArrowRight, Bookmark, CheckCircle2, ChevronRight, Clock3, Compass, Flame, Play, Sparkles, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { docs } from '../data/docs'
import { useLocalStorage } from '../hooks/useLocalStorage'

const categories = ['Tất cả', ...new Set(docs.map(doc => doc.category))]

export default function HomePage() {
  const [completed] = useLocalStorage<string[]>('ltvc-completed', [])
  const [bookmarks] = useLocalStorage<string[]>('ltvc-bookmarks', [])
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const percent = docs.length ? Math.round((completed.length / docs.length) * 100) : 0
  const nextDoc = docs.find(doc => !completed.includes(doc.slug)) ?? docs[0]
  const filteredDocs = useMemo(
    () => activeCategory === 'Tất cả' ? docs : docs.filter(doc => doc.category === activeCategory),
    [activeCategory]
  )

  return (
    <div className="home-page learning-dashboard">
      <section className="home-hero">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={15} /> Interview learning workspace</div>
          <h1>Ôn có lộ trình.<br />Trả lời có chiều sâu.</h1>
          <p>Biến thời gian đọc tài liệu thành một kế hoạch ôn phỏng vấn rõ ràng — từ nền tảng backend tới system design.</p>
          <div className="home-actions">
            <Link className="primary-button" to={`/docs/${nextDoc.slug}`}>Tiếp tục học <ArrowRight size={18} /></Link>
            <span><Flame size={15} /> Hôm nay, hoàn thành một chủ đề nhỏ</span>
          </div>
        </div>
        <div className="hero-progress" aria-label={`Tiến độ tổng ${percent}%`}>
          <div className="progress-ring" style={{ '--progress': `${percent * 3.6}deg` } as React.CSSProperties}>
            <div><strong>{percent}%</strong><span>đã hoàn thành</span></div>
          </div>
          <p><strong>{completed.length}</strong> / {docs.length} chủ đề đã học</p>
        </div>
      </section>

      <section className="quick-start-grid" aria-label="Bắt đầu nhanh">
        <Link className="continue-card" to={`/docs/${nextDoc.slug}`}>
          <span className="mini-label">Học tiếp theo</span>
          <div><span className="continue-icon"><Play size={16} fill="currentColor" /></span><span className="category-chip">{nextDoc.category}</span></div>
          <h2>{nextDoc.title}</h2>
          <p>{nextDoc.description}</p>
          <span className="continue-link">Mở bài học <ArrowRight size={16} /></span>
        </Link>

        <div className="goal-card">
          <div className="goal-icon"><Target size={20} /></div>
          <div><span className="mini-label">Mục tiêu phiên học</span><h2>Hiểu, trả lời, áp dụng</h2></div>
          <ol>
            <li>Đọc ý chính và đánh dấu phần cần nhớ.</li>
            <li>Diễn giải lại bằng ví dụ của chính bạn.</li>
            <li>Quay lại tài liệu đã lưu trước buổi phỏng vấn.</li>
          </ol>
        </div>
      </section>

      <section className="stats-grid compact-stats">
        <article><CheckCircle2 /><div><strong>{completed.length}/{docs.length}</strong><span>chủ đề hoàn thành</span></div></article>
        <article><Bookmark /><div><strong>{bookmarks.length}</strong><span>tài liệu đã lưu</span></div></article>
        <article><Clock3 /><div><strong>{docs.reduce((sum, d) => sum + d.readingMinutes, 0)}</strong><span>phút nội dung</span></div></article>
      </section>

      <section className="learning-path-section">
        <div className="section-heading inline-heading">
          <div><span>Lộ trình gợi ý</span><h2>Đi từng lớp kiến thức</h2></div>
          <p>Không cần học hết một lượt. Hoàn thành từng chặng để nối kiến thức với câu trả lời phỏng vấn.</p>
        </div>
        <div className="learning-path">
          {docs.map((doc, index) => {
            const done = completed.includes(doc.slug)
            return <Link key={doc.slug} className={`path-step ${done ? 'is-done' : ''}`} to={`/docs/${doc.slug}`}>
              <span className="path-number">{done ? <CheckCircle2 size={17} /> : index + 1}</span>
              <span><small>{doc.category}</small><strong>{doc.title}</strong><em>{doc.readingMinutes} phút</em></span>
              <ChevronRight size={16} />
            </Link>
          })}
        </div>
      </section>

      <section className="library-section">
        <div className="section-heading library-heading">
          <div><span>Thư viện ôn tập</span><h2>Chọn chủ đề bạn cần</h2></div>
          <div className="category-filter" role="tablist" aria-label="Lọc tài liệu theo danh mục">
            {categories.map(category => <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category}>{category}</button>)}
          </div>
        </div>

        <div className="doc-grid">
          {filteredDocs.map(doc => {
            const done = completed.includes(doc.slug)
            const saved = bookmarks.includes(doc.slug)
            return <Link key={doc.slug} className={`doc-card ${done ? 'is-complete' : ''}`} to={`/docs/${doc.slug}`}>
              <div className="doc-card-top"><span className="category-chip">{doc.category}</span><span>{done ? <><CheckCircle2 size={14} /> Đã học</> : <><Clock3 size={14} /> {doc.readingMinutes} phút</>}</span></div>
              <h3>{doc.title}</h3>
              <p>{doc.description}</p>
              <div className="doc-card-footer"><div className="doc-tags">{doc.tags.slice(0, 2).map(tag => <span key={tag}>{tag}</span>)}</div>{saved && <Bookmark size={16} aria-label="Đã lưu" />}</div>
              <div className="doc-card-action">{done ? 'Ôn lại bài học' : 'Bắt đầu học'} <ArrowRight size={16} /></div>
            </Link>
          })}
        </div>
      </section>

      <section className="study-tip"><Compass size={18} /><p><strong>Mẹo ôn phỏng vấn:</strong> Đừng chỉ đọc. Sau mỗi bài, hãy tự trả lời: “Khi nào dùng?”, “Trade-off là gì?”, và “Tôi đã từng gặp nó ở đâu?”.</p></section>
    </div>
  )
}
