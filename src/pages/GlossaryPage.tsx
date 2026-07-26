import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import GlossaryList from '../components/GlossaryList'
import { glossary } from '../data/glossary'

export default function GlossaryPage() {
  const [query, setQuery] = useState('')
  const terms = useMemo(() => { const normalized = query.trim().toLowerCase(); return normalized ? glossary.filter(term => `${term.term} ${term.shortDefinition} ${term.explanation ?? ''}`.toLowerCase().includes(normalized)) : glossary }, [query])
  return <div className="glossary-page"><header className="glossary-hero"><span className="eyebrow">Từ điển thuật ngữ</span><h1>Đọc tiếp, không cần rời bài để tra cứu.</h1><p>Giải nghĩa ngắn các thuật ngữ hay gặp trong backend .NET và hệ phân tán.</p><label className="glossary-search"><Search size={18} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Tìm thuật ngữ, ví dụ: idempotency" /><span>{terms.length} mục</span></label></header><GlossaryList terms={terms} /></div>
}
