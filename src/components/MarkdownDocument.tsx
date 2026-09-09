import { ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, CheckCircle2, ChevronUp, Circle, Clock3, RotateCcw } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import DocumentToc from './document/DocumentToc'
import PersonalExample from './document/PersonalExample'
import TermTooltip from './TermTooltip'
import { enhanceHtml, renderMarkdown } from '../utils/markdown'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useReviewProgress } from '../hooks/useReviewProgress'
import { useScrollSpy } from '../hooks/useScrollSpy'
import type { CheatsheetMeta } from '../types/content'
import { completeDocs } from '../data/docs'

interface Props { doc: CheatsheetMeta & { content: string } }
const statusLabel = { Draft: 'Bản nháp', Review: 'Đang rà soát', Complete: 'Hoàn chỉnh' }
const quickHeadings = /^(quick summary|trong 30 giây|nhớ một phút|terms to know|tóm tắt nhanh|bài toán backend thực tế|khi nào gặp|tình huống phỏng vấn|must remember|những điều phải nhớ|invariants phải giữ|so sánh nhanh|quick comparison|.*câu trả lời.*|.*mẫu trả lời.*|final recall|tự kiểm)$/i

function quickHtml(html: string) {
  const parsed = new DOMParser().parseFromString(html, 'text/html')
  let keep = true
  ;[...parsed.body.children].forEach(node => {
    if (node.tagName === 'H2') keep = quickHeadings.test(node.textContent?.trim() ?? '')
    if (node.tagName !== 'H1' && !keep) node.remove()
  })
  return parsed.body.innerHTML
}

export default function MarkdownDocument({ doc }: Props) {
  const articleRef = useRef<HTMLElement>(null)
  const [readingProgress, setReadingProgress] = useState(0)
  const [mode, setMode] = useLocalStorage<'quick' | 'full'>('ltvc-reading-mode', 'full')
  const [termId, setTermId] = useState<string | null>(null)
  const [completed, setCompleted] = useLocalStorage<string[]>('ltvc-completed', [])
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>('ltvc-bookmarks', [])
  const { find, pin, record, remove } = useReviewProgress()
  const fullRendered = useMemo(() => enhanceHtml(renderMarkdown(doc.content)), [doc.content])
  const rendered = useMemo(() => mode === 'quick' ? enhanceHtml(quickHtml(fullRendered.html)) : fullRendered, [fullRendered, mode])
  const activeHeading = useScrollSpy({
    selector: 'h2, h3',
    root: articleRef,
    contentKey: `${doc.slug}:${mode}`,
  })
  const isCompleted = completed.includes(doc.slug)
  const isBookmarked = bookmarks.includes(doc.slug)
  const reviewItem = find(`cheatsheet:${doc.slug}`)
  const needsReviewForDoc = Boolean(reviewItem)
  const currentIndex = completeDocs.findIndex(item => item.slug === doc.slug)
  const previousDoc = completeDocs[currentIndex - 1]
  const nextDoc = completeDocs[currentIndex + 1]

  useEffect(() => {
    const targetId = decodeURIComponent(window.location.hash.slice(1))
    const target = targetId ? document.getElementById(targetId) : null
    if (target) {
      window.requestAnimationFrame(() => {
        target.scrollIntoView({ block: 'start', behavior: 'auto' })
        target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
      })
    } else window.scrollTo({ top: 0, behavior: 'auto' })
    const onScroll = () => {
      const article = articleRef.current
      if (!article) return
      const consumed = Math.max(0, -article.getBoundingClientRect().top + 88)
      const total = Math.max(1, article.offsetHeight - window.innerHeight + 120)
      setReadingProgress(Math.min(100, Math.round((consumed / total) * 100)))
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [doc.slug, mode])

  useEffect(() => {
    const article = articleRef.current
    if (!article) return
    const handleTerm = (target: EventTarget | null) => {
      const trigger = (target as HTMLElement)?.closest<HTMLButtonElement>('.term-trigger')
      if (trigger?.dataset.termId) setTermId(trigger.dataset.termId)
    }
    const clickHandler = async (event: MouseEvent) => {
      handleTerm(event.target)
      const button = (event.target as HTMLElement).closest<HTMLButtonElement>('.copy-button')
      if (!button) return
      const code = button.closest('.code-block')?.querySelector('pre')?.textContent ?? ''
      try { await navigator.clipboard.writeText(code); button.textContent = 'Đã chép'; setTimeout(() => { button.textContent = 'Chép mã' }, 1200) } catch { button.textContent = 'Không thể chép' }
    }
    const focusHandler = (event: FocusEvent) => handleTerm(event.target)
    article.addEventListener('click', clickHandler); article.addEventListener('focusin', focusHandler)
    return () => { article.removeEventListener('click', clickHandler); article.removeEventListener('focusin', focusHandler) }
  }, [rendered.html])

  const toggleValue = (items: string[], slug: string, setter: (next: string[]) => void) => setter(items.includes(slug) ? items.filter(item => item !== slug) : [...items, slug])
  const navigateToHeading = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    window.history.replaceState(null, '', `#${id}`)
  }

  return <div className="document-layout">
    <div className="reading-progress"><span style={{ width: `${readingProgress}%` }} /></div>
    <section className="document-main">
      <header className="document-hero compact-document-hero">
        <div className="breadcrumb"><Link to="/">Thư viện</Link><span>/</span><span>{doc.section}</span><span>/</span><span>Bài {currentIndex + 1} / {completeDocs.length}</span></div>
        <h1>{doc.title}</h1><p>{doc.description}</p>
        <div className="document-meta-row"><span className="weight-badge">{doc.interviewFrequency === 'AlmostAlways' ? 'Almost always' : doc.interviewFrequency === 'RoleDependent' ? 'Role dependent' : doc.interviewFrequency}</span><span className="weight-badge">{doc.expectedDepth}</span><span>{statusLabel[doc.status]}</span><span><Clock3 size={15} /> {doc.readingMinutes} phút</span>{doc.tags.slice(0, 3).map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
        <div className="document-actions"><div className="reading-mode" role="group" aria-label="Chế độ đọc"><button className={mode === 'quick' ? 'active' : ''} onClick={() => setMode('quick')}>Ôn nhanh</button><button className={mode === 'full' ? 'active' : ''} onClick={() => setMode('full')}>Đầy đủ</button></div><button className={isCompleted ? 'icon-text-button success' : 'icon-text-button'} onClick={() => toggleValue(completed, doc.slug, setCompleted)}>{isCompleted ? <CheckCircle2 size={17} /> : <Circle size={17} />}{isCompleted ? 'Đã học' : 'Hoàn thành'}</button><button className={needsReviewForDoc ? 'icon-text-button active-review' : 'icon-text-button'} onClick={() => reviewItem?.manualPin ? remove(`cheatsheet:${doc.slug}`) : pin({ id: `cheatsheet:${doc.slug}`, kind: 'cheatsheet', title: doc.title, relatedDoc: doc.slug })}><RotateCcw size={17} /> {reviewItem?.manualPin ? 'Bỏ ghim ôn' : needsReviewForDoc ? 'Đã có lịch ôn' : 'Cần ôn lại'}</button><button className="icon-text-button" onClick={() => toggleValue(bookmarks, doc.slug, setBookmarks)}>{isBookmarked ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}{isBookmarked ? 'Đã lưu' : 'Lưu'}</button></div>
      </header>
      {reviewItem?.manualPin && <div className="quiz-certainty document-review-rating"><span>Đọc lại xong, bạn thấy sao?</span><button className="secondary-button" onClick={() => record({ id: reviewItem.id, kind: reviewItem.kind, title: doc.title, relatedDoc: doc.slug }, 'missed')}>Chưa chắc</button><button className="secondary-button" onClick={() => record({ id: reviewItem.id, kind: reviewItem.kind, title: doc.title, relatedDoc: doc.slug }, 'hesitant')}>Còn lưỡng lự</button><button className="secondary-button" onClick={() => record({ id: reviewItem.id, kind: reviewItem.kind, title: doc.title, relatedDoc: doc.slug }, 'confident')}>Tự tin</button></div>}
      {mode === 'quick' && <p className="quick-review-note">Đang lọc các phần để nhắc nhanh. Chuyển sang <strong>Đầy đủ</strong> để đọc ví dụ, bẫy production và trade-off chi tiết.</p>}
      <article ref={articleRef} className="markdown-body" dangerouslySetInnerHTML={{ __html: rendered.html }} />
      <PersonalExample slug={doc.slug} />
      <nav className="doc-pagination" aria-label="Điều hướng cheatsheet">{previousDoc ? <Link className="secondary-button" to={`/docs/${previousDoc.slug}`}><ArrowLeft size={17} /> {previousDoc.title}</Link> : <span />}{nextDoc ? <Link className="primary-button" to={`/docs/${nextDoc.slug}`}>{nextDoc.title} <ArrowRight size={17} /></Link> : <Link className="primary-button" to="/interview">Luyện phỏng vấn <ArrowRight size={17} /></Link>}</nav>
    </section>
    <DocumentToc items={rendered.toc.filter(item => item.level > 1)} activeId={activeHeading} onNavigate={navigateToHeading} />
    {readingProgress > 18 && <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })} aria-label="Lên đầu bài"><ChevronUp size={18} /></button>}
    <TermTooltip termId={termId} onClose={() => setTermId(null)} />
  </div>
}
