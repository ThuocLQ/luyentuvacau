import { ChevronDown, Save } from 'lucide-react'
import { useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const empty = 'Project:\nProblem:\nMy responsibility:\nDecision:\nTrade-off:\nResult:\nWhat I would improve:'
export default function PersonalExample({ slug }: { slug: string }) {
  const [notes, setNotes] = useLocalStorage<Record<string, string>>('ltvc-personal-stories', {})
  const [open, setOpen] = useState(false)
  return <section className="personal-example"><button type="button" onClick={() => setOpen(!open)} aria-expanded={open}><span>Biến thành câu chuyện của bạn</span><ChevronDown size={17} /></button>{open && <div><p>Viết ngắn bằng dữ liệu thật của bạn. Nội dung chỉ lưu trên trình duyệt này.</p><textarea value={notes[slug] ?? empty} onChange={event => setNotes({ ...notes, [slug]: event.target.value })} aria-label="Ghi chú kinh nghiệm cá nhân" /><small><Save size={13} /> Tự động lưu trên thiết bị này</small></div>}</section>
}
