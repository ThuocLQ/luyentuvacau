import { ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, CheckCircle2, ChevronUp, Circle, Clock3, RotateCcw } from 'lucide-react'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import DocumentToc from './document/DocumentToc'
import PersonalExample from './document/PersonalExample'
import LearningMasteryPanel from './document/LearningMasteryPanel'
import { learningVisualRenderers } from './learning/visualRegistry'
import RaceGuidedLesson, { type RaceGuidedStep } from './learning/race/RaceGuidedLesson'
import RaceAssessment from './learning/race/RacePracticeAssessment'
import TermTooltip from './TermTooltip'
import { enhanceHtml, renderMarkdown } from '../utils/markdown'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useReviewProgress } from '../hooks/useReviewProgress'
import { useScrollSpy } from '../hooks/useScrollSpy'
import type { CheatsheetMeta } from '../types/content'
import { completeDocs, getContentKind } from '../data/docs'
import { findLearningLesson, learningDomains } from '../data/curriculum'

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

function withoutLeadingH1(html: string) {
  const parsed = new DOMParser().parseFromString(html, 'text/html')
  parsed.body.querySelector(':scope > h1')?.remove()
  return parsed.body.innerHTML
}

function markdownSection(source: string, heading: string, until: string) {
  const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const start = source.search(new RegExp(`^## ${escapeRegex(heading)}\\s*$`, 'm'))
  if (start < 0) return ''
  const rest = source.slice(start)
  const end = rest.search(new RegExp(`^## ${escapeRegex(until)}\\s*$`, 'm'))
  return end < 0 ? rest : rest.slice(0, end)
}

function withoutLeadingHeading(html: string) {
  const parsed = new DOMParser().parseFromString(html, 'text/html')
  parsed.body.querySelector(':scope > h1, :scope > h2')?.remove()
  return parsed.body.innerHTML
}

function stripRaceVisualMarkers(source: string) {
  return source.replace(/\r?\n\{\{RACE_VISUAL:[a-z]+\}\}\r?\n/g, '\n')
}

export default function MarkdownDocument({ doc }: Props) {
  const articleRef = useRef<HTMLElement>(null)
  const [readingProgress, setReadingProgress] = useState(0)
  const [mode, setMode] = useLocalStorage<'quick' | 'full'>('ltvc-reading-mode', 'full')
  const [raceView, setRaceView] = useLocalStorage<'guided' | 'full' | 'practice'>('ltvc-race-view', 'guided', (value): value is 'guided' | 'full' | 'practice' => value === 'guided' || value === 'full' || value === 'practice')
  const [raceStep, setRaceStep] = useLocalStorage<RaceGuidedStep>('ltvc-race-guided-step', 0, (value): value is RaceGuidedStep => Number.isInteger(value) && Number(value) >= 0 && Number(value) <= 5)
  const [termId, setTermId] = useState<string | null>(null)
  const [completed, setCompleted] = useLocalStorage<string[]>('ltvc-completed', [])
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>('ltvc-bookmarks', [])
  const { find, pin, record, remove } = useReviewProgress()
  const contentKind = getContentKind(doc)
  const isLearning = contentKind === 'learning'
  const isRaceGoldenPilot = doc.slug === 'learning-race-condition'
  const learningLesson = isLearning ? findLearningLesson(doc.slug) : undefined
  const learningDomain = learningLesson ? learningDomains.find(domain => domain.id === learningLesson.domainId) : undefined
  const visualRenderer = learningVisualRenderers[doc.slug]
  const lessonParts = useMemo(() => visualRenderer ? doc.content.split(/\r?\n\{\{(?:INDEX|RACE|OUTBOX)_VISUAL:([a-z]+)\}\}\r?\n/) : null, [doc.content, visualRenderer])
  const lessonPartRenderings = useMemo(() => lessonParts?.map((part, index) => index % 2 === 0 ? enhanceHtml(renderMarkdown(part)) : null) ?? null, [lessonParts])
  const lessonRendered = useMemo(() => lessonPartRenderings ? {
    html: lessonPartRenderings.filter((part): part is NonNullable<typeof part> => part !== null).map(part => part.html).join(''),
    toc: lessonPartRenderings.filter((part): part is NonNullable<typeof part> => part !== null).flatMap(part => part.toc),
  } : null, [lessonPartRenderings])
  const fullRendered = useMemo(() => enhanceHtml(renderMarkdown(doc.content)), [doc.content])
  const raceMechanismParts = useMemo(() => markdownSection(doc.content, 'Khi hai request dùng chung balance, điều gì xảy ra?', 'Tự chạy: cùng input, ba cách thực thi').split(/\r?\n\{\{RACE_VISUAL:interleaving\}\}\r?\n/), [doc.content])
  const raceLabParts = useMemo(() => {
    const source = markdownSection(doc.content, 'Tự chạy: cùng input, ba cách thực thi', 'Debug: evidence nào cho biết rule đã vỡ?')
    const [code = '', afterOutput = ''] = source.split('Kết quả cần quan sát sau `dotnet run`:')
    const [expected = '', experiments = ''] = afterOutput.split('### Experiment 1 — sequential baseline')
    return { code, expected, experiments: experiments ? `### Experiment 1 — sequential baseline${experiments}` : '' }
  }, [doc.content])
  const raceGuidedContexts = useMemo(() => [
    withoutLeadingHeading(enhanceHtml(renderMarkdown(markdownSection(doc.content, 'Nếu hai request cùng rút tiền, rule nào phải giữ?', 'Sau bài này, bạn sẽ tự làm được gì?'))).html),
    withoutLeadingHeading(enhanceHtml(renderMarkdown(stripRaceVisualMarkers(raceMechanismParts[0] ?? ''))).html),
    '',
    withoutLeadingHeading(enhanceHtml(renderMarkdown(stripRaceVisualMarkers(markdownSection(doc.content, 'Debug: evidence nào cho biết rule đã vỡ?', 'Khi app có nhiều instance, `lock` còn đủ không?')))).html),
    withoutLeadingHeading(enhanceHtml(renderMarkdown(stripRaceVisualMarkers(markdownSection(doc.content, 'Khi app có nhiều instance, `lock` còn đủ không?', 'Tự giải thích lại bằng evidence')))).html),
    withoutLeadingHeading(enhanceHtml(renderMarkdown(stripRaceVisualMarkers(markdownSection(doc.content, 'Tự giải thích lại bằng evidence', 'Đi tiếp')))).html),
  ], [doc.content, raceMechanismParts])
  const raceAfterVisualHtml = useMemo(() => withoutLeadingHeading(enhanceHtml(renderMarkdown(stripRaceVisualMarkers(raceMechanismParts.slice(1).join('\n')))).html), [raceMechanismParts])
  const raceLabCodeHtml = useMemo(() => withoutLeadingHeading(enhanceHtml(renderMarkdown(raceLabParts.code)).html), [raceLabParts])
  const raceLabExpectedHtml = useMemo(() => enhanceHtml(renderMarkdown(raceLabParts.expected)).html, [raceLabParts])
  const raceLabExperimentsHtml = useMemo(() => enhanceHtml(renderMarkdown(raceLabParts.experiments)).html, [raceLabParts])
  const rendered = useMemo(() => lessonRendered ?? (!isLearning && mode === 'quick' ? enhanceHtml(quickHtml(fullRendered.html)) : fullRendered), [fullRendered, lessonRendered, isLearning, mode])
  const showRaceGuided = isRaceGoldenPilot && raceView === 'guided'
  const showRacePractice = isRaceGoldenPilot && raceView === 'practice'
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
        target.scrollIntoView?.({ block: 'start', behavior: 'auto' })
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
  }, [doc.slug, mode, raceView])

  useEffect(() => {
    if (isRaceGoldenPilot && window.location.hash) setRaceView('full')
  }, [doc.slug, isRaceGoldenPilot, setRaceView])

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
  }, [rendered.html, raceLabCodeHtml, raceLabExpectedHtml, raceLabExperimentsHtml])

  const toggleValue = (items: string[], slug: string, setter: (next: string[]) => void) => setter(items.includes(slug) ? items.filter(item => item !== slug) : [...items, slug])
  const navigateToHeading = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    window.history.replaceState(null, '', `#${id}`)
  }
  const switchRaceView = (view: 'guided' | 'full' | 'practice') => {
    if (view === 'guided' && window.location.hash) window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    setRaceView(view)
  }

  return <div className={`document-layout ${isRaceGoldenPilot ? 'race-learning-layout' : ''}`}>
    {!showRaceGuided && !showRacePractice && <div className="reading-progress"><span style={{ width: `${readingProgress}%` }} /></div>}
    <section className="document-main">
      <header className={`document-hero compact-document-hero ${isRaceGoldenPilot ? 'race-document-hero' : ''}`}>
        <div className="breadcrumb">{isLearning ? <><Link to="/">Roadmap</Link><span>/</span><span>{learningDomain?.title ?? 'Learning Lab'}</span><span>/</span><span>{doc.title}</span></> : <><Link to="/library">Library</Link><span>/</span><span>{doc.section}</span><span>/</span><span>{doc.title}</span></>}</div>
        <h1>{doc.title}</h1><p>{doc.description}</p>
        <div className="document-meta-row">{isRaceGoldenPilot ? <><span className="weight-badge">Golden Pilot · Technical L3</span><span><Clock3 size={15} /> {doc.readingMinutes} phút</span></> : <><span className="weight-badge">{contentKind === 'learning' ? 'Learning lab' : contentKind === 'standard' ? 'Standard' : contentKind === 'interview' ? 'Interview practice' : 'Reference'}</span><span className="weight-badge">{doc.interviewFrequency === 'AlmostAlways' ? 'Almost always' : doc.interviewFrequency === 'RoleDependent' ? 'Role dependent' : doc.interviewFrequency}</span><span className="weight-badge">{doc.expectedDepth}</span><span>{statusLabel[doc.status]}</span><span><Clock3 size={15} /> {doc.readingMinutes} phút</span>{doc.tags.slice(0, 3).map(tag => <span className="tag" key={tag}>{tag}</span>)}</>}</div>
        <div className="document-actions">{isRaceGoldenPilot ? <div className="reading-mode" role="group" aria-label="Chế độ học Race Condition"><button className={showRaceGuided ? 'active' : ''} onClick={() => switchRaceView('guided')}>Học theo bước</button><button className={showRacePractice ? 'active' : ''} onClick={() => switchRaceView('practice')}>Bài luyện tập</button><button className={!showRaceGuided && !showRacePractice ? 'active' : ''} onClick={() => switchRaceView('full')}>Xem toàn bài</button></div> : !isLearning && <><div className="reading-mode" role="group" aria-label="Chế độ đọc"><button className={mode === 'quick' ? 'active' : ''} onClick={() => setMode('quick')}>Ôn nhanh</button><button className={mode === 'full' ? 'active' : ''} onClick={() => setMode('full')}>Đầy đủ</button></div><button className={isCompleted ? 'icon-text-button success' : 'icon-text-button'} onClick={() => toggleValue(completed, doc.slug, setCompleted)}>{isCompleted ? <CheckCircle2 size={17} /> : <Circle size={17} />}{isCompleted ? 'Đã học' : 'Hoàn thành'}</button></>}<button className={needsReviewForDoc ? 'icon-text-button active-review' : 'icon-text-button'} onClick={() => reviewItem?.manualPin ? remove(`cheatsheet:${doc.slug}`) : pin({ id: `cheatsheet:${doc.slug}`, kind: 'cheatsheet', title: doc.title, relatedDoc: doc.slug })}><RotateCcw size={17} /> {reviewItem?.manualPin ? 'Bỏ ghim ôn' : needsReviewForDoc ? 'Đã có lịch ôn' : 'Cần ôn lại'}</button><button className="icon-text-button" onClick={() => toggleValue(bookmarks, doc.slug, setBookmarks)}>{isBookmarked ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}{isBookmarked ? 'Đã lưu' : 'Lưu'}</button></div>
      </header>
      {reviewItem?.manualPin && <div className="quiz-certainty document-review-rating"><span>Đọc lại xong, bạn thấy sao?</span><button className="secondary-button" onClick={() => record({ id: reviewItem.id, kind: reviewItem.kind, title: doc.title, relatedDoc: doc.slug }, 'missed')}>Chưa chắc</button><button className="secondary-button" onClick={() => record({ id: reviewItem.id, kind: reviewItem.kind, title: doc.title, relatedDoc: doc.slug }, 'hesitant')}>Còn lưỡng lự</button><button className="secondary-button" onClick={() => record({ id: reviewItem.id, kind: reviewItem.kind, title: doc.title, relatedDoc: doc.slug }, 'confident')}>Tự tin</button></div>}
      {!isLearning && mode === 'quick' && <p className="quick-review-note">Đang lọc các phần để nhắc nhanh. Chuyển sang <strong>Đầy đủ</strong> để đọc ví dụ, bẫy production và trade-off chi tiết.</p>}
      {showRaceGuided ? <article ref={articleRef} className="markdown-body race-guided-body"><RaceGuidedLesson step={raceStep} onStep={setRaceStep} onStartPractice={() => switchRaceView('practice')} labCodeHtml={raceLabCodeHtml} labExpectedHtml={raceLabExpectedHtml} labExperimentsHtml={raceLabExperimentsHtml} contextHtml={raceGuidedContexts} afterVisualHtml={raceAfterVisualHtml} /></article>
      : showRacePractice ? <article ref={articleRef} className="markdown-body race-practice-body"><RaceAssessment onBackToGuided={() => switchRaceView('guided')} onReviewStep={step => { setRaceStep(step); switchRaceView('guided') }} /></article>
      : lessonParts && lessonPartRenderings ? <article ref={articleRef} className="markdown-body">{lessonParts.map((part, index) => index % 2 === 0 ? <div key={`markdown-${index}`} dangerouslySetInnerHTML={{ __html: isRaceGoldenPilot ? withoutLeadingH1(lessonPartRenderings[index]?.html ?? '') : lessonPartRenderings[index]?.html ?? '' }} /> : <Fragment key={`visual-${index}`}>{visualRenderer?.(part)}</Fragment>)}</article>
      : <article ref={articleRef} className="markdown-body" dangerouslySetInnerHTML={{ __html: rendered.html }} />}
      <PersonalExample slug={doc.slug} />
      {learningLesson && <LearningMasteryPanel lessonSlug={learningLesson.slug} evidenceChecks={isRaceGoldenPilot ? ['Nêu invariant và hai snapshot local.', 'Đổi input 60/50, dự đoán rồi đối chiếu output.', 'Viết candidate timeline và ba evidence debug.', 'Chọn correctness boundary cho nhiều instance/database.'] : undefined} allowStatusSelection={!isRaceGoldenPilot} assessmentNote={isRaceGoldenPilot ? 'Technical/English dropdown và các checkbox là tự báo cáo. Chúng không thay thế assessment L1–L3 và không tạo completion.' : undefined} />}
      {learningLesson ? <nav className="doc-pagination learning-pagination" aria-label="Điều hướng Learning Lab"><Link className="secondary-button" to="/"><ArrowLeft size={17} /> Bắt đầu học</Link><Link className="secondary-button" to={`/docs/${learningLesson.referenceSlug}`}>Tài liệu liên quan</Link><Link className="secondary-button" to={learningLesson.quizPath}>Quiz tham khảo</Link><Link className="secondary-button" to={learningLesson.interviewPath}>Câu hỏi tham khảo <ArrowRight size={17} /></Link></nav> : <nav className="doc-pagination" aria-label="Điều hướng cheatsheet">{previousDoc ? <Link className="secondary-button" to={`/docs/${previousDoc.slug}`}><ArrowLeft size={17} /> {previousDoc.title}</Link> : <span />}{nextDoc ? <Link className="primary-button" to={`/docs/${nextDoc.slug}`}>{nextDoc.title} <ArrowRight size={17} /></Link> : <Link className="primary-button" to="/interview">Luyện phỏng vấn <ArrowRight size={17} /></Link>}</nav>}
    </section>
    {!showRaceGuided && !showRacePractice && <DocumentToc items={rendered.toc.filter(item => item.level > 1)} activeId={activeHeading} onNavigate={navigateToHeading} />}
    {readingProgress > 18 && <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })} aria-label="Lên đầu bài"><ChevronUp size={18} /></button>}
    <TermTooltip termId={termId} onClose={() => setTermId(null)} />
  </div>
}
