import { useEffect, useRef } from 'react'
import type { TocItem } from '../../utils/markdown'

interface Props { items: TocItem[]; activeId: string | null; onNavigate: (id: string) => void }
export default function DocumentToc({ items, activeId, onNavigate }: Props) {
  const activeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => { activeRef.current?.scrollIntoView({ block: 'nearest' }) }, [activeId])
  return <aside className="toc-panel"><div className="toc-sticky"><div className="toc-title"><strong>Trong bài này</strong><span>{activeId ? `${items.findIndex(item => item.id === activeId) + 1} / ${items.length}` : `${items.length} mục`}</span></div><nav aria-label="Mục lục bài viết">{items.map(item => <button key={item.id} ref={activeId === item.id ? activeRef : undefined} className={`toc-level-${item.level} ${activeId === item.id ? 'active' : ''}`} onClick={() => onNavigate(item.id)} aria-current={activeId === item.id ? 'location' : undefined}>{item.text}</button>)}</nav></div></aside>
}
