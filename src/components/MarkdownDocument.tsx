import { ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, CheckCircle2, Circle, Clock3, ListChecks, RotateCcw } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { enhanceHtml, renderMarkdown } from '../utils/markdown'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useReviewQueue } from '../hooks/useReviewQueue'
import type { CheatsheetMeta } from '../types/content'
import { completeDocs } from '../data/docs'

interface Props {
  doc: CheatsheetMeta & { content: string }
}

const weightLabel = { Critical: 'Trọng yếu', High: 'Quan trọng', Medium: 'Bổ trợ', Specialized: 'Chuyên ngành' }
const statusLabel = { Draft: 'Bản nháp', Review: 'Đang rà soát', Complete: 'Hoàn chỉnh' }

export default function MarkdownDocument({ doc }: Props) {
  const articleRef = useRef<HTMLElement>(null)
  const [readingProgress, setReadingProgress] = useState(0)
  const [completed, setCompleted] = useLocalStorage<string[]>('ltvc-completed', [])
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>('ltvc-bookmarks', [])
  const { isQueued, addOrUpdate, remove } = useReviewQueue()
  const rendered = useMemo(() => enhanceHtml(renderMarkdown(doc.content)), [doc.content])

  const isCompleted = completed.includes(doc.slug)
  const isBookmarked = bookmarks.includes(doc.slug)
  const needsReviewForDoc = isQueued(`cheatsheet:${doc.slug}`)
  const currentIndex = completeDocs.findIndex(item => item.slug === doc.slug)
  const previousDoc = completeDocs[currentIndex - 1]
  const nextDoc = completeDocs[currentIndex + 1]

  useEffect(() => {
    window.scrollTo({ top: 0 })
    const onScroll = () => {
      const article = articleRef.current
      if (!article) return
      const rect = article.getBoundingClientRect()
      const consumed = Math.max(0, -rect.top + 120)
      const total = Math.max(1, article.offsetHeight - window.innerHeight + 180)
      setReadingProgress(Math.min(100, Math.round((consumed / total) * 100)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [doc.slug])

  useEffect(() => {
    const article = articleRef.current
    if (!article) return
    const clickHandler = async (event: MouseEvent) => {
      const button = (event.target as HTMLElement).closest<HTMLButtonElement>('.copy-button')
      if (!button) return
      const code = button.closest('.code-block')?.querySelector('pre')?.textContent ?? ''
      try {
        await navigator.clipboard.writeText(code)
        button.textContent = 'Đã chép'
        setTimeout(() => { button.textContent = 'Chép mã' }, 1200)
      } catch {
        button.textContent = 'Không thể chép'
      }
    }
    article.addEventListener('click', clickHandler)
    return () => article.removeEventListener('click', clickHandler)
  }, [rendered.html])

  const toggleValue = (items: string[], slug: string, setter: (next: string[]) => void) => {
    setter(items.includes(slug) ? items.filter(item => item !== slug) : [...items, slug])
  }

  return (
    <div className="document-layout">
      <div className="reading-progress"><span style={{ width: `${readingProgress}%` }} /></div>

      <section className="document-main">
        <header className="document-hero">
          <Link className="back-link" to="/"><ArrowLeft size={15} /> Thư viện học</Link>
          <div className="eyebrow">{doc.section} · {weightLabel[doc.interviewWeight]} · {statusLabel[doc.status]}</div>
          <h1>{doc.title}</h1>
          <p>{doc.description}</p>
          <div className="doc-meta">
            <span><Clock3 size={16} /> {doc.readingMinutes} phút</span>
            {doc.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
          </div>
          <div className="hero-actions">
            <button
              className={isCompleted ? 'primary-button success' : 'primary-button'}
              onClick={() => toggleValue(completed, doc.slug, setCompleted)}
            >
              {isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} />}
              {isCompleted ? 'Đã hoàn thành' : 'Đánh dấu đã học'}
            </button>
            <button
              className={needsReviewForDoc ? 'secondary-button active-review' : 'secondary-button'}
              onClick={() => needsReviewForDoc ? remove(`cheatsheet:${doc.slug}`) : addOrUpdate({ id: `cheatsheet:${doc.slug}`, kind: 'cheatsheet', title: doc.title, relatedDoc: doc.slug })}
            >
              <RotateCcw size={18} /> {needsReviewForDoc ? 'Đang cần ôn lại' : 'Cần ôn lại'}
            </button>
            <button
              className="secondary-button"
              onClick={() => toggleValue(bookmarks, doc.slug, setBookmarks)}
            >
              {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              {isBookmarked ? 'Đã lưu' : 'Lưu tài liệu'}
            </button>
          </div>
          <div className="study-prompt"><ListChecks size={17} /><span><strong>Gợi ý khi học:</strong> ghi lại 1 ví dụ thực tế và 1 trade-off bạn có thể giải thích khi phỏng vấn.</span></div>
        </header>

        <article
          ref={articleRef}
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: rendered.html }}
        />
        <nav className="doc-pagination" aria-label="Cheatsheet navigation">
          {previousDoc ? <Link className="secondary-button" to={`/docs/${previousDoc.slug}`}><ArrowLeft size={17} /> {previousDoc.title}</Link> : <span />}
          {nextDoc ? <Link className="primary-button" to={`/docs/${nextDoc.slug}`}>{nextDoc.title} <ArrowRight size={17} /></Link> : <Link className="primary-button" to="/interview">Vào phần luyện phỏng vấn <ArrowRight size={17} /></Link>}
        </nav>
      </section>

      <aside className="toc-panel">
        <div className="toc-sticky">
          <strong>Trong bài này</strong>
          <nav>
            {rendered.toc
              .filter(item => item.level <= 2)
              .slice(0, 45)
              .map(item => (
                <a key={item.id} className={`toc-level-${item.level}`} href={`#${item.id}`}>
                  {item.text}
                </a>
              ))}
          </nav>
        </div>
      </aside>
    </div>
  )
}
