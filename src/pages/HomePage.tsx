import { ArrowRight, BookOpen, CheckCircle2, CircleHelp, Languages, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { curriculumModules, englishLevelLabels, techLevelLabels, type EnglishLevel, type LearningStatus, type TechLevel } from '../data/curriculum'
import { useLearningProgress } from '../hooks/useLearningProgress'
import { useReviewProgress } from '../hooks/useReviewProgress'

const statusLabels: Record<LearningStatus, string> = { 'not-started': 'Chưa bắt đầu', learning: 'Đang học', solid: 'Khá vững' }

export default function HomePage() {
  const { currentModule, get, update } = useLearningProgress()
  const { dueItems } = useReviewProgress()
  const current = get(currentModule.id)
  const next = currentModule.suggestedLesson ?? curriculumModules.find(module => module.suggestedLesson)?.suggestedLesson
  const solidCount = curriculumModules.filter(module => get(module.id).status === 'solid').length

  return <div className="home-page learning-dashboard">
    <section className="home-hero">
      <div className="hero-copy"><div className="eyebrow">Engineering learning hub</div><h1>Học để làm, debug và reasoning.</h1><p>Suggested pace: approximately 12 weeks. Progress by mastery, not calendar. Mỗi module chỉ là hướng đi; mức độ tự đánh giá quyết định bước tiếp theo.</p><div className="home-actions">{next && <Link className="primary-button" to={`/docs/${next.slug}`}><BookOpen size={17} /> Mở: {next.title} <ArrowRight size={17} /></Link>}<Link className="secondary-button" to="/library">Mở Library</Link></div></div>
      <div className="hero-progress"><strong>{dueItems.length}</strong><span>nội dung đến hạn</span><p>{solidCount}/{curriculumModules.length} module tự đánh giá khá vững. Đây không phải điểm readiness.</p></div>
    </section>

    <section className="learning-now" aria-labelledby="learning-now-title"><div><span className="mini-label">Current module</span><h2 id="learning-now-title">{String(currentModule.number).padStart(2, '0')}. {currentModule.title}</h2><p>{currentModule.principle}</p></div><div className="mastery-controls"><label>Tech mastery<select value={current.techLevel} onChange={event => update(currentModule.id, { techLevel: Number(event.target.value) as TechLevel })}>{([1, 2, 3, 4] as TechLevel[]).map(level => <option key={level} value={level}>{techLevelLabels[level]}</option>)}</select></label><label>English mastery<select value={current.englishLevel} onChange={event => update(currentModule.id, { englishLevel: Number(event.target.value) as EnglishLevel })}>{([1, 2, 3, 4] as EnglishLevel[]).map(level => <option key={level} value={level}>{englishLevelLabels[level]}</option>)}</select></label><label>Trạng thái<select value={current.status} onChange={event => update(currentModule.id, { status: event.target.value as LearningStatus })}>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></div></section>

    <section className="quick-start-grid"><Link className="continue-card" to={next ? `/docs/${next.slug}` : '/library'}><div><span className="continue-icon"><BookOpen size={17} /></span><span className="category-chip">Next lesson</span></div><h2>{next?.title ?? 'Chọn một lesson'}</h2><p>Đi theo problem → visual → do → break → debug → explain → transfer → recall.</p><span className="continue-link">Bắt đầu learning loop <ArrowRight size={16} /></span></Link><div className="goal-card"><div className="goal-icon"><Languages size={20} /></div><div><span className="mini-label">Target mastery</span><h2>Tách kỹ thuật và English</h2></div><p>Tech: hiểu → áp dụng → debug → trade-off. English: đọc hiểu → trả lời ngắn → giải thích → thảo luận. Hai mức này không gộp thành một điểm.</p><Link className="secondary-button" to="/interview">Luyện nói</Link></div></section>

    <section className="learning-path-section"><div className="inline-heading"><div><span className="mini-label">Suggested track</span><h2>12 module, không phải deadline 12 tuần</h2></div><p>Đi tiếp khi bạn có bằng chứng mình hiểu và xử lý được failure; không cần hoàn thành theo lịch.</p></div><div className="module-grid">{curriculumModules.map(module => { const progress = get(module.id); return <article className={`module-card ${module.id === currentModule.id ? 'is-current' : ''}`} key={module.id}><span>{String(module.number).padStart(2, '0')}</span><strong>{module.title}</strong><small>{module.principle}</small><em>{statusLabels[progress.status]} · L{progress.techLevel} / E{progress.englishLevel}</em>{module.suggestedLesson && <Link to={`/docs/${module.suggestedLesson.slug}`}>Mở lesson <ArrowRight size={14} /></Link>}</article> })}</div></section>

    <section className="learning-actions"><div><RotateCcw size={20} /><div><strong>{dueItems.length ? `${dueItems.length} nội dung cần recall` : 'Chưa có nội dung đến hạn'}</strong><p>Review queue vẫn dùng scheduler hiện có; dashboard không suy mastery từ việc cuộn trang.</p></div></div>{dueItems.length ? <Link className="primary-button" to="/review">Ôn lại</Link> : <Link className="secondary-button" to="/quiz"><CircleHelp size={17} /> Làm quiz tình huống</Link>}</section>
    <section className="study-tip"><CheckCircle2 size={18} /><div><p><strong>Chuẩn học tập.</strong> Nội dung tham chiếu được biên tập theo <Link to="/docs/engineering-learning-standard">Engineering Learning Standard</Link> và <Link to="/docs/content-editorial-standard">Content Editorial Standard</Link>. Learning Lab chỉ là pilot: ưu tiên chất lượng vòng học hơn số lesson.</p></div></section>
  </div>
}