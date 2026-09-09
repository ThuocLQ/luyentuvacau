import { ArrowRight, CheckCircle2, CircleHelp, Clock3, RotateCcw, ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { completeDocs, docs, questions, sections } from '../data/docs'
import { quizQuestions } from '../data/quizzes'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useReviewProgress } from '../hooks/useReviewProgress'
import { formatReviewReason, type ReviewProgress } from '../lib/review'

function resolveReviewItem(item: ReviewProgress) {
  if (item.kind === 'quiz') {
    const quiz = quizQuestions.find(question => `quiz:${question.id}` === item.id)
    return quiz ? { title: quiz.prompt, to: `/quiz/play?question=${quiz.id}` } : null
  }
  if (item.kind === 'question') {
    const question = questions.find(question => `question:${question.id}` === item.id)
    return question ? { title: question.question, to: `/interview?question=${question.id}` } : null
  }
  const doc = completeDocs.find(doc => `cheatsheet:${doc.slug}` === item.id)
  return doc ? { title: doc.title, to: `/docs/${doc.slug}` } : null
}

const coverageGroups = [
  { label: 'Core Backend', slugs: ['runtime-memory', 'async-concurrency', 'collections-linq', 'solid-design', 'aspnet-pipeline', 'api-security', 'ef-sql', 'sql-index-locking', 'testing-strategy'] },
  { label: 'Production', slugs: ['background-resilience', 'cache-redis', 'performance-scale', 'observability-incidents', 'docker-cicd', 'distributed-systems', 'system-design-framework'] },
  { label: 'Distributed', slugs: ['architecture', 'integration-design', 'consistency-saga', 'event-driven-contracts', 'kafka-rabbitmq', 'realtime-signalr'] },
  { label: 'Cloud', slugs: ['modern-dotnet-versioning', 'kubernetes-backend', 'aws-backend'] },
  { label: 'Specialized', slugs: ['event-sourcing-cqrs', 'eks-security', 'finance-securities'] },
]

export default function HomePage() {
  const [completed] = useLocalStorage<string[]>('ltvc-completed', [])
  const { progress, dueItems } = useReviewProgress()
  const due = dueItems.map(item => ({ item, resolved: resolveReviewItem(item) })).filter((entry): entry is { item: ReviewProgress, resolved: NonNullable<ReturnType<typeof resolveReviewItem>> } => Boolean(entry.resolved))
  const weak = progress.filter(item => item.lastRating !== 'confident').map(item => ({ item, resolved: resolveReviewItem(item) })).filter((entry): entry is { item: ReviewProgress, resolved: NonNullable<ReturnType<typeof resolveReviewItem>> } => Boolean(entry.resolved))
  const almostAlways = completeDocs.filter(doc => doc.interviewFrequency === 'AlmostAlways' && !completed.includes(doc.slug))
  const recommendations = due.slice(0, 3)
  const fallback = almostAlways[0] ?? completeDocs.find(doc => !completed.includes(doc.slug)) ?? completeDocs[0]

  return <div className="home-page cheatsheet-home">
    <section className="home-hero"><div className="hero-copy"><div className="eyebrow">Interview prep dashboard</div><h1>Hôm nay nên ôn gì?</h1><p>Ưu tiên item đến hạn và phần bạn từng chưa chắc. Nếu chưa có lịch ôn, bắt đầu bằng nền tảng xuất hiện gần như mọi vòng Senior Backend .NET.</p><div className="home-actions"><Link className="primary-button" to={recommendations[0]?.resolved.to ?? `/docs/${fallback.slug}`}><RotateCcw size={17} /> {recommendations[0] ? 'Ôn item đến hạn' : `Bắt đầu: ${fallback.title.replace(/^\d+\. /, '')}`}</Link></div></div><div className="hero-progress"><strong>{due.length}</strong><span>nội dung đến hạn</span><p>{completed.length}/{completeDocs.length} cheatsheet đã đánh dấu hoàn thành. Đây là coverage học tập, không phải xác suất pass interview.</p></div></section>

    <section className="library-section"><div className="section-heading"><div><span>Today</span><h2>Ôn theo lý do rõ ràng</h2></div></div>{recommendations.length ? <div className="doc-grid">{recommendations.map(({ item, resolved }) => <Link key={item.id} className="doc-card" to={resolved.to}><div className="doc-card-top"><span className="category-chip">{item.kind === 'quiz' ? 'Quiz' : item.kind === 'question' ? 'Luyện nói' : 'Cheatsheet'}</span><span>{formatReviewReason(item)}</span></div><h3>{resolved.title}</h3><p>{item.lastRating === 'missed' ? 'Bạn từng chưa giải thích chắc. Hãy làm lại trước khi xem gợi ý.' : item.lastRating === 'hesitant' ? 'Bạn đã hiểu một phần; hãy đổi constraint và tự trả lời lại.' : 'Đã đến lịch nhắc lại để kiểm tra recall.'}</p><div className="doc-card-action">Ôn ngay <ArrowRight size={16} /></div></Link>)}</div> : <section className="study-tip"><CheckCircle2 size={18} /><div><p><strong>Chưa có item đến hạn.</strong> Bắt đầu một Tier A, sau đó tự đánh giá quiz hoặc oral để dashboard có tín hiệu ưu tiên.</p><Link className="primary-button" to={`/docs/${fallback.slug}`}>Mở {fallback.title}</Link></div></section>}</section>

    <section className="quick-start-grid"><div className="goal-card"><div className="goal-icon"><ShieldAlert size={20} /></div><div><span className="mini-label">Weak areas</span><h2>Chỗ cần củng cố</h2></div><p>{weak.length ? `${weak.length} item đang có rating missed/hesitant. Ưu tiên chúng trước khi mở thêm topic mới.` : 'Chưa có dữ liệu weakness. Sau mỗi quiz hoặc oral, hãy rating thật để nhận gợi ý đúng.'}</p><Link className="secondary-button" to="/review"><RotateCcw size={17} /> Xem due for review</Link></div><div className="goal-card"><div className="goal-icon"><CircleHelp size={20} /></div><div><span className="mini-label">Frequency × depth</span><h2>Độ ưu tiên interview</h2></div><p><strong>Almost always</strong> cần recall chắc; <strong>Role dependent</strong> ưu tiên theo JD. Nhãn depth nói interviewer mong bạn sâu đến đâu, không phải độ khó của bài.</p><Link className="secondary-button" to="/docs/interview-map">Xem bản đồ ôn</Link></div></section>

    <section className="library-section"><div className="section-heading"><div><span>Coverage</span><h2>Coverage theo nhóm năng lực</h2></div></div><div className="doc-grid">{coverageGroups.map(group => { const groupDocs = docs.filter(doc => group.slugs.includes(doc.slug)); const done = groupDocs.filter(doc => completed.includes(doc.slug)).length; const percent = groupDocs.length ? Math.round(done / groupDocs.length * 100) : 0; return <article className="doc-card" key={group.label}><div className="doc-card-top"><span className="category-chip">{percent}% coverage</span><span>{done}/{groupDocs.length} đã học</span></div><h3>{group.label}</h3><p>Heuristic dựa trên cheatsheet đã đánh dấu hoàn thành; dùng để chọn phần tiếp theo, không phải readiness score tuyệt đối.</p></article> })}</div></section>

    {sections.map(section => { const items = docs.filter(doc => doc.section === section && doc.content); if (!items.length) return null; return <section className="library-section" key={section}><div className="section-heading"><div><span>{section}</span><h2>{section}</h2></div></div><div className="doc-grid">{items.map(doc => <Link key={doc.slug} className="doc-card" to={`/docs/${doc.slug}`}><div className="doc-card-top"><span className="category-chip">{doc.interviewFrequency === 'AlmostAlways' ? 'Almost always' : doc.interviewFrequency === 'RoleDependent' ? 'Role dependent' : doc.interviewFrequency}</span><span><Clock3 size={14} /> {doc.expectedDepth}</span></div><h3>{doc.title}</h3><p>{doc.description}</p><div className="doc-card-action">Mở cheatsheet <ArrowRight size={16} /></div></Link>)}</div></section> })}
  </div>
}
