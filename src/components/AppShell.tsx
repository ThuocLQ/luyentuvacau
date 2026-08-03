import { BookOpen, ChevronDown, CircleHelp, Home, Menu, Moon, RotateCcw, Search, Sparkles, Sun, X } from 'lucide-react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import Fuse from 'fuse.js'
import { completeDocs, docs, sections } from '../data/docs'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('ltvc-theme', 'light')
  const [openSections, setOpenSections] = useLocalStorage<string[]>('ltvc-open-sections', sections)
  const [query, setQuery] = useState('')
  const activeRef = useRef<HTMLAnchorElement>(null)
  const sidebarRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const location = useLocation(); const navigate = useNavigate()
  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])
  useEffect(() => { activeRef.current?.scrollIntoView({ block: 'nearest' }) }, [location.pathname])
  useEffect(() => {
    const active = completeDocs.find(doc => location.pathname.endsWith(`/docs/${doc.slug}`))
    if (active && !openSections.includes(active.section)) setOpenSections([...openSections, active.section])
  }, [location.pathname, openSections, setOpenSections])
  useEffect(() => { const handler = (event: KeyboardEvent) => { const editable = event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement; if (!editable && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); document.querySelector<HTMLInputElement>('#global-search')?.focus() } if (event.key === 'Escape') { setQuery(''); setMobileOpen(false) } }; window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler) }, [])
  useEffect(() => {
    if (!mobileOpen) return
    const sidebar = sidebarRef.current
    if (!sidebar) return
    const menuButton = menuButtonRef.current
    const focusable = () => [...sidebar.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')]
    const first = focusable()[0]
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.requestAnimationFrame(() => first?.focus())
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const elements = focusable()
      if (!elements.length) return
      const firstElement = elements[0]; const lastElement = elements[elements.length - 1]
      if (event.shiftKey && document.activeElement === firstElement) { event.preventDefault(); lastElement.focus() }
      else if (!event.shiftKey && document.activeElement === lastElement) { event.preventDefault(); firstElement.focus() }
    }
    window.addEventListener('keydown', trapFocus)
    return () => { window.removeEventListener('keydown', trapFocus); document.body.style.overflow = previousOverflow; menuButton?.focus() }
  }, [mobileOpen])
  const fuse = useMemo(() => new Fuse(docs.filter(doc => doc.content), { keys: ['title', 'description', 'tags', 'content'], threshold: .32, ignoreLocation: true }), [])
  const results = query.trim() ? fuse.search(query.trim()).slice(0, 7).map(item => item.item) : []
  const open = (slug: string) => { navigate(`/docs/${slug}`); setQuery(''); setMobileOpen(false) }
  const toggle = (section: string) => setOpenSections(openSections.includes(section) ? openSections.filter(item => item !== section) : [...openSections, section])
  return <div className="app-shell"><aside ref={sidebarRef} id="sidebar-navigation" role={mobileOpen ? 'dialog' : undefined} aria-modal={mobileOpen || undefined} aria-label={mobileOpen ? 'Điều hướng tài liệu' : undefined} className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}><div className="brand"><div className="brand-mark"><BookOpen size={21} /></div><div><strong>Senior .NET Cheatsheet</strong><span>Ôn nhanh để trả lời phỏng vấn</span></div><button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Đóng menu"><X /></button></div><nav className="sidebar-nav" aria-label="Điều hướng tài liệu"><NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><Home size={17} /> Lộ trình ôn</NavLink><NavLink to="/quiz" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><CircleHelp size={17} /> Quiz tình huống</NavLink><NavLink to="/interview" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><Sparkles size={17} /> Luyện phỏng vấn</NavLink><NavLink to="/review" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><RotateCcw size={17} /> Hàng đợi ôn lại</NavLink><NavLink to="/glossary" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><BookOpen size={17} /> Từ điển thuật ngữ</NavLink>{sections.filter(section => completeDocs.some(doc => doc.section === section)).map((section, sectionIndex) => { const isOpen = openSections.includes(section); const panelId = `sidebar-section-${sectionIndex}`; return <section key={section} className="sidebar-section"><button className="nav-label" onClick={() => toggle(section)} aria-expanded={isOpen} aria-controls={panelId}>{section}<ChevronDown size={14} className={isOpen ? 'open' : ''} /></button>{isOpen && <div id={panelId}>{completeDocs.filter(doc => doc.section === section).map(doc => <NavLink key={doc.slug} ref={location.pathname === `/docs/${doc.slug}` ? activeRef : undefined} to={`/docs/${doc.slug}`} onClick={() => setMobileOpen(false)} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><span className="nav-dot" /><span>{doc.title.replace(/^\d+\. /, '')}</span><small>{doc.readingMinutes}p</small></NavLink>)}</div>}</section> })}</nav><div className="sidebar-footer"><span>{completeDocs.length} cheatsheet đang sẵn sàng ôn</span></div></aside><div className="page-area"><header className="topbar"><button ref={menuButtonRef} className="icon-button menu-button" onClick={() => setMobileOpen(true)} aria-label="Mở menu" aria-controls="sidebar-navigation" aria-expanded={mobileOpen}><Menu /></button><div className="search-box"><Search size={18} /><input id="global-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Tìm khái niệm, bẫy production, câu hỏi..." aria-label="Tìm kiếm" /><kbd>Ctrl K</kbd>{query && <div className="search-results">{results.length ? results.map(item => <button key={item.slug} onClick={() => open(item.slug)}><strong>{item.title}</strong><span>{item.section} · {item.description}</span></button>) : <div className="search-empty">Không có cheatsheet phù hợp.</div>}</div>}</div><button className="icon-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Đổi giao diện">{theme === 'light' ? <Moon /> : <Sun />}</button></header><main className="main-content"><Outlet /></main></div>{mobileOpen && <button className="sidebar-overlay" onClick={() => setMobileOpen(false)} aria-label="Đóng menu" />}</div>
}
