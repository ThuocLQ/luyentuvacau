import { ArrowRight, BookOpen, CheckCircle2, CircleHelp, Languages, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { learningDomains, learningLessons, techLevelLabels, englishLevelLabels } from '../data/curriculum'
import { useLearningProgress } from '../hooks/useLearningProgress'
import { useReviewProgress } from '../hooks/useReviewProgress'

export default function HomePage() {
  const { currentLesson, get } = useLearningProgress()
  const { dueItems } = useReviewProgress()
  const currentProgress = get(currentLesson.slug)
  const currentDomain = learningDomains.find(domain => domain.id === currentLesson.domainId)!
  const recommended = currentLesson.recommendedNext?.map(slug => learningLessons.find(lesson => lesson.slug === slug)).find(Boolean) ?? learningLessons.find(lesson => lesson.slug !== currentLesson.slug && get(lesson.slug).status !== 'solid')

  return <div className="home-page learning-dashboard">
    <section className="home-hero"><div className="hero-copy"><div className="eyebrow">Engineering learning hub</div><h1>Học để hiểu, làm, debug và reasoning.</h1><p>Chọn lesson theo domain và evidence học tập, không theo deadline hay phần trăm hoàn thành. Progress là self-assessment của từng lesson.</p><div className="home-actions"><Link className="primary-button" to={`/docs/${currentLesson.slug}`}><BookOpen size={17} /> Tiếp tục: {currentLesson.title} <ArrowRight size={17} /></Link><Link className="secondary-button" to="/library">Mở Reference Library</Link></div></div><div className="hero-progress"><strong>{dueItems.length}</strong><span>nội dung đến hạn</span><p>Due review đến từ quiz, interview và self-review hiện có — không phải điểm mastery.</p></div></section>

    <section className="learning-now"><div><span className="mini-label">Current domain</span><h2>{currentDomain.title}</h2><p>{currentDomain.principles}</p><p><strong>Current lesson:</strong> {currentLesson.title}</p></div><div className="lesson-target"><span>Target technical</span><strong>{techLevelLabels[currentLesson.targetTechLevel]}</strong><span>Target English</span><strong>{englishLevelLabels[currentLesson.targetEnglishLevel]}</strong><em>Hiện tại: L{currentProgress.techLevel} / E{currentProgress.englishLevel}</em></div></section>

    <section className="quick-start-grid"><Link className="continue-card" to={`/docs/${currentLesson.slug}`}><div><span className="continue-icon"><BookOpen size={17} /></span><span className="category-chip">Why this lesson</span></div><h2>{currentLesson.title}</h2><p>Đi từ problem → visual → lab → break/debug → explain → transfer → recall. Không coi đã đọc là đã học.</p><span className="continue-link">Mở Learning Lab <ArrowRight size={16} /></span></Link><div className="goal-card"><div className="goal-icon"><Languages size={20} /></div><div><span className="mini-label">Recommended next</span><h2>{recommended?.title ?? 'Làm lại recall trước'}</h2></div><p>{recommended ? 'Đây là gợi ý metadata, không khóa lesson. Chuyển khi bạn đã có evidence cho lesson hiện tại.' : 'Không cần mở lesson mới; dùng recall hoặc làm lại transfer case.'}</p>{recommended && <Link className="secondary-button" to={`/docs/${recommended.slug}`}>Xem lesson</Link>}</div></section>

    <section className="learning-path-section"><div className="inline-heading"><div><span className="mini-label">Learning domains</span><h2>Sáu domain, ba pilot đang active</h2></div><p>Domain là taxonomy định hướng. Những domain planned không được lấp bằng lesson giả.</p></div><div className="module-grid">{learningDomains.map(domain => { const lessons = learningLessons.filter(lesson => lesson.domainId === domain.id); const active = lessons[0]; return <article className={`module-card ${domain.id === currentDomain.id ? 'is-current' : ''}`} key={domain.id}><span>{domain.status === 'planned' ? 'Planned' : 'Active'}</span><strong>{domain.title}</strong><small>{domain.principles}</small><em>{active ? `${active.title} · ${get(active.slug).status}` : 'Chưa có Learning Lab'}</em>{active && <Link to={`/docs/${active.slug}`}>Mở pilot <ArrowRight size={14} /></Link>}</article> })}</div></section>

    <section className="learning-actions"><div><RotateCcw size={20} /><div><strong>{dueItems.length ? `${dueItems.length} nội dung cần recall` : 'Chưa có nội dung đến hạn'}</strong><p>Ôn lại sau khi cố recall, không đọc lại trước rồi mới tự chấm.</p></div></div>{dueItems.length ? <Link className="primary-button" to="/review">Ôn lại</Link> : <Link className="secondary-button" to="/quiz"><CircleHelp size={17} /> Làm quiz tình huống</Link>}</section>
    <section className="study-tip"><CheckCircle2 size={18} /><div><p><strong>Trước khi mở rộng curriculum:</strong> hãy học thật một pilot, ghi friction setup/visual/debug/transfer/English/recall, rồi mới tạo lesson tiếp theo.</p></div></section>
  </div>
}