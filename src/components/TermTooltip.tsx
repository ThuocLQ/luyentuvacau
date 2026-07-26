import { X } from 'lucide-react'
import { useEffect } from 'react'
import { findGlossaryTerm } from '../data/glossary'

interface Props { termId: string | null; onClose: () => void }

export default function TermTooltip({ termId, onClose }: Props) {
  const term = termId ? findGlossaryTerm(termId) : undefined
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])
  if (!term) return null
  return <div id={`term-tooltip-${term.id}`} className="term-tooltip" role="tooltip">
    <div><strong>{term.term}</strong><p>{term.shortDefinition}</p>{term.explanation && <p className="term-explanation">{term.explanation}</p>}</div>
    <button type="button" onClick={onClose} aria-label={`Đóng giải thích ${term.term}`}><X size={15} /></button>
  </div>
}
