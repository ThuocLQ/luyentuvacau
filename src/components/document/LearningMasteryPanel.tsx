import { englishLevelLabels, techLevelLabels, type EnglishLevel, type LearningStatus, type TechLevel } from '../../data/curriculum'
import { useLearningProgress } from '../../hooks/useLearningProgress'

interface Props { lessonSlug: string }
const statusLabels: Record<LearningStatus, string> = { 'not-started': 'Chưa bắt đầu', learning: 'Đang học', solid: 'Khá vững' }

export default function LearningMasteryPanel({ lessonSlug }: Props) {
  const { get, update } = useLearningProgress()
  const progress = get(lessonSlug)
  return <section className="learning-mastery-panel" aria-labelledby="learning-mastery-title">
    <div><span className="mini-label">Self-assessment</span><h2 id="learning-mastery-title">Đánh giá mastery sau khi làm lab</h2><p>Chỉ tự chọn sau khi bạn đã làm, break/debug và tự giải thích. Không có level nào được tăng tự động.</p></div>
    <div className="mastery-controls">
      <label>Technical mastery<select value={progress.techLevel} onChange={event => update(lessonSlug, { techLevel: Number(event.target.value) as TechLevel })}>{([1, 2, 3, 4] as TechLevel[]).map(level => <option key={level} value={level}>{techLevelLabels[level]}</option>)}</select></label>
      <label>English mastery<select value={progress.englishLevel} onChange={event => update(lessonSlug, { englishLevel: Number(event.target.value) as EnglishLevel })}>{([1, 2, 3, 4] as EnglishLevel[]).map(level => <option key={level} value={level}>{englishLevelLabels[level]}</option>)}</select></label>
      <label>Trạng thái<select value={progress.status} onChange={event => update(lessonSlug, { status: event.target.value as LearningStatus })}>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
    </div>
  </section>
}