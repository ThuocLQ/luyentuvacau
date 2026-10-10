import { useState } from 'react'
import { englishLevelLabels, techLevelLabels, type EnglishLevel, type LearningStatus, type TechLevel } from '../../data/curriculum'
import { useLearningProgress } from '../../hooks/useLearningProgress'
import { useLocalStorage } from '../../hooks/useLocalStorage'

interface Props { lessonSlug: string; evidenceChecks?: string[]; allowStatusSelection?: boolean; assessmentNote?: string }
const statusLabels: Record<LearningStatus, string> = { 'not-started': 'Chưa bắt đầu', learning: 'Đang học', solid: 'Khá vững' }

export default function LearningMasteryPanel({ lessonSlug, evidenceChecks = [], allowStatusSelection = true, assessmentNote }: Props) {
  const { get, update } = useLearningProgress()
  const progress = get(lessonSlug)
  const [reported, setReported] = useLocalStorage<Record<string, string[]>>('ltvc-learning-evidence-v1', {})
  const [evidenceNotes, setEvidenceNotes] = useLocalStorage<Record<string, Record<string, string>>>('ltvc-learning-evidence-notes-v1', {})
  const [friction, setFriction] = useLocalStorage<Record<string, { type: string; note: string }>>('ltvc-learning-friction-v1', {})
  const [frictionType, setFrictionType] = useState(friction[lessonSlug]?.type ?? 'Thuật ngữ')
  const [frictionNote, setFrictionNote] = useState(friction[lessonSlug]?.note ?? '')
  const checks = reported[lessonSlug] ?? []
  const notes = evidenceNotes[lessonSlug] ?? {}
  const toggle = (criterion: string) => setReported(current => ({ ...current, [lessonSlug]: checks.includes(criterion) ? checks.filter(item => item !== criterion) : [...checks, criterion] }))
  const saveFriction = () => setFriction(current => ({ ...current, [lessonSlug]: { type: frictionType, note: frictionNote.trim() } }))
  return <section className="learning-mastery-panel" aria-labelledby="learning-mastery-title">
    <div><span className="mini-label">Tự báo cáo evidence</span><h2 id="learning-mastery-title">Đánh giá sau khi bạn đã làm</h2><p>Tick chỉ là ghi chú của bạn trên trình duyệt này. Nó không tạo PASSED, MASTERED hay tự tăng level.</p></div>
    {evidenceChecks.length > 0 && <fieldset className="mastery-evidence"><legend>Technical L1–L4: đã có evidence nào?</legend>{evidenceChecks.map((criterion, index) => <div className="mastery-evidence-item" key={criterion}><label><input type="checkbox" checked={checks.includes(criterion)} onChange={() => toggle(criterion)} /> <strong>L{index + 1}</strong> {criterion}</label><input aria-label={`Ghi chú evidence L${index + 1}`} value={notes[criterion] ?? ''} onChange={event => setEvidenceNotes(current => ({ ...current, [lessonSlug]: { ...(current[lessonSlug] ?? {}), [criterion]: event.target.value } }))} placeholder="Kết quả, timeline hoặc câu trả lời ngắn (không bắt buộc)" /></div>)}</fieldset>}
    <div className="mastery-controls">
      <label>Technical mastery<select value={progress.techLevel} onChange={event => update(lessonSlug, { techLevel: Number(event.target.value) as TechLevel })}>{([1, 2, 3, 4] as TechLevel[]).map(level => <option key={level} value={level}>{techLevelLabels[level]}</option>)}</select></label>
      <label>English mastery<select value={progress.englishLevel} onChange={event => update(lessonSlug, { englishLevel: Number(event.target.value) as EnglishLevel })}>{([1, 2, 3, 4] as EnglishLevel[]).map(level => <option key={level} value={level}>{englishLevelLabels[level]}</option>)}</select></label>
      {allowStatusSelection && <label>Trạng thái<select value={progress.status} onChange={event => update(lessonSlug, { status: event.target.value as LearningStatus })}>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>}
    </div>
    {assessmentNote && <p className="mastery-assessment-note">{assessmentNote}</p>}
    <p className="mastery-english-note">English E1–E4 là track riêng: chọn sau khi bạn đọc hoặc nói lại phần English explanation, không suy ra từ checkbox technical.</p>
    <div className="learning-friction"><label>Điều làm bạn vướng<select value={frictionType} onChange={event => setFrictionType(event.target.value)}><option>Thuật ngữ</option><option>Visual</option><option>Lab setup/output</option><option>Transfer reasoning</option></select></label><label>Ghi chú ngắn<textarea value={frictionNote} onChange={event => setFrictionNote(event.target.value)} placeholder="Ví dụ: chưa hiểu vì sao final balance 70 vẫn sai." /></label><div className="learning-friction-actions"><button className="secondary-button" onClick={saveFriction}>Lưu ghi chú trên máy này</button><button className="secondary-button" onClick={() => navigator.clipboard?.writeText(`${frictionType}: ${frictionNote.trim()}`)}>Chép để gửi người review</button></div><small>Ghi chú chỉ ở trình duyệt này cho đến khi bạn chủ động chép và gửi.</small></div>
  </section>
}
