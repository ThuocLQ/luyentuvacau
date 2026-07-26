import { Bookmark, BookmarkCheck, CheckCircle2, Circle, Clock3 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { enhanceHtml, renderMarkdown } from '../utils/markdown'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { DocMeta } from '../types/content'

interface Props {
  doc: DocMeta & { content: string }
}

export default function MarkdownDocument({ doc }: Props) {
  const articleRef = useRef<HTMLElement>(null)
  const [readingProgress, setReadingProgress] = useState(0)
  const [completed, setCompleted] = useLocalStorage<string[]>('ltvc-completed', [])
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>('ltvc-bookmarks', [])
  const rendered = useMemo(() => enhanceHtml(renderMarkdown(doc.content)), [doc.content])

  const isCompleted = completed.includes(doc.slug)
  const isBookmarked = bookmarks.includes(doc.slug)

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
      await navigator.clipboard.writeText(code)
      button.textContent = 'Copied'
      setTimeout(() => { button.textContent = 'Copy' }, 1200)
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
          <div className="eyebrow">{doc.category}</div>
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
              className="secondary-button"
              onClick={() => toggleValue(bookmarks, doc.slug, setBookmarks)}
            >
              {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              {isBookmarked ? 'Đã lưu' : 'Lưu tài liệu'}
            </button>
          </div>
        </header>

        <article
          ref={articleRef}
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: rendered.html }}
        />
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
