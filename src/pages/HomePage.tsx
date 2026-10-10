import { ArrowRight, BookOpen, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { learningLessons } from '../data/curriculum'
import { useLearningProgress } from '../hooks/useLearningProgress'
import { useReviewProgress } from '../hooks/useReviewProgress'

const goldenPilot = learningLessons.find(lesson => lesson.slug === 'learning-race-condition')!

function storedGuidedRaceStep() {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem('ltvc-race-guided-step') ?? '0')
    return typeof value === 'number' && Number.isInteger(value) && value > 0 && value <= 5 ? value : 0
  } catch {
    return 0
  }
}

export default function HomePage() {
  const { get, progress } = useLearningProgress()
  const { dueItems } = useReviewProgress()
  const raceGuidedStep = storedGuidedRaceStep()
  const activeLesson = learningLessons
    .filter(lesson => progress[lesson.slug]?.status === 'learning')
    .sort((left, right) => (Date.parse(progress[right.slug]?.lastStudiedAt ?? '') || 0) - (Date.parse(progress[left.slug]?.lastStudiedAt ?? '') || 0))[0]
  const hasActiveLesson = Boolean(activeLesson)
  const raceCompleted = progress[goldenPilot.slug]?.status === 'solid'
  const canResumeRace = !hasActiveLesson && !raceCompleted && raceGuidedStep > 0
  const nextLesson = activeLesson ?? goldenPilot
  const nextProgress = get(nextLesson.slug)
  const raceStepLabel = `Bước ${raceGuidedStep + 1} / 6`

  return <div className="home-page learning-dashboard">
    <section className="home-hero"><div className="hero-copy"><div className="eyebrow">Học theo evidence</div><h1>{hasActiveLesson ? 'Tiếp tục đúng bài bạn đang học.' : canResumeRace ? 'Tiếp tục Golden Pilot ở đúng bước bạn đang học.' : 'Bắt đầu bằng một bài có thể chạy và quan sát.'}</h1><p>{hasActiveLesson ? 'QuanNet giữ lesson đang học của bạn. Không tự đổi lộ trình chỉ vì có bài mới.' : canResumeRace ? `Bạn đã học dở Race Condition ở ${raceStepLabel}. Quay lại đúng Guided step, không thay đổi mastery hay lộ trình khác.` : 'Golden Pilot giúp bạn thấy race condition bằng timeline, local .NET lab và evidence debug trước khi học khái niệm lớn hơn.'}</p><div className="home-actions"><Link className="primary-button" to={`/docs/${nextLesson.slug}`}><BookOpen size={17} /> {hasActiveLesson ? `Tiếp tục: ${nextLesson.title}` : canResumeRace ? `Tiếp tục Golden Pilot · ${raceStepLabel}` : 'Bắt đầu Golden Pilot'} <ArrowRight size={17} /></Link></div></div></section>

    <section className="next-learning-card" aria-labelledby="next-learning-title"><div><span className="mini-label">Việc học tiếp theo</span><h2 id="next-learning-title">{nextLesson.title}</h2><p>{hasActiveLesson ? `Bạn đang tự đánh giá L${nextProgress.techLevel} / E${nextProgress.englishLevel}. Hoàn thành một evidence nhỏ trước khi đổi level.` : canResumeRace ? `Tiếp tục từ ${raceStepLabel}: Guided step đã được lưu cục bộ, không phải một kết quả đánh giá.` : 'Đi theo 6 bước: dự đoán, quan sát, thực hành, debug, chuyển tình huống, giải thích.'}</p></div></section>

    <section className="home-secondary"><div><span className="mini-label">Khám phá thêm</span><div className="home-secondary-links"><Link to="/library">Tài liệu theo chủ đề</Link><Link to="/quiz">Quiz tình huống</Link><Link to="/interview">Luyện phỏng vấn</Link>{dueItems.length > 0 && <Link to="/review"><RotateCcw size={15} /> {dueItems.length} mục cần ôn</Link>}</div></div><p>{hasActiveLesson ? 'Golden Pilot vẫn ở Thư viện khi bạn muốn quay lại; nó không ghi đè lesson hiện tại.' : 'Các record cũ hoặc bài đã hoàn thành không tự biến thành “đang học”. Sau lab, hãy ghi lại thuật ngữ, visual hoặc output nào làm bạn vướng.'}</p></section>
  </div>
}
