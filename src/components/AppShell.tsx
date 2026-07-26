import { BookOpen, Home, Menu, Moon, RotateCcw, Search, Sparkles, Sun, X } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { completeDocs, docs, sections } from '../data/docs'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('ltvc-theme', 'light')
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); document.querySelector<HTMLInputElement>('#global-search')?.focus() }
      if (event.key === 'Escape') { setQuery(''); setMobileOpen(false) }
    }
    window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler)
  }, [])
  const fuse = useMemo(() => new Fuse(docs.filter(doc => doc.content), { keys: ['title', 'description', 'tags', 'content'], threshold: .32, ignoreLocation: true }), [])
  const results = query.trim() ? fuse.search(query.trim()).slice(0, 7).map(item => item.item) : []
  const open = (slug: string) => { navigate(`/docs/${slug}`); setQuery(''); setMobileOpen(false) }
  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><BookOpen size={21} /></div><div><strong>Senior .NET Cheatsheet</strong><span>Fast recall for interviews</span></div><button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Đóng menu"><X /></button></div>
      <nav className="sidebar-nav"><NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><Home size={17} /> Interview map</NavLink><NavLink to="/interview" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><Sparkles size={17} /> Interview mode</NavLink><NavLink to="/review" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><RotateCcw size={17} /> Review queue</NavLink>
        {sections.filter(section => completeDocs.some(doc => doc.section === section)).map(section => <div key={section}><div className="nav-label">{section}</div>{completeDocs.filter(doc => doc.section === section).map(doc => <NavLink key={doc.slug} to={`/docs/${doc.slug}`} onClick={() => setMobileOpen(false)} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><span className="nav-dot" /><span>{doc.title.replace(/^\d+\. /, '')}</span><small>{doc.readingMinutes}p</small></NavLink>)}</div>)}</nav>
      <div className="sidebar-footer"><span>{completeDocs.length} cheatsheet đang sẵn sàng ôn</span></div>
    </aside>
    <div className="page-area"><header className="topbar"><button className="icon-button menu-button" onClick={() => setMobileOpen(true)} aria-label="Mở menu"><Menu /></button><div className="search-box"><Search size={18} /><input id="global-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Tìm concept, trap, question..." aria-label="Tìm kiếm" /><kbd>Ctrl K</kbd>{query && <div className="search-results">{results.length ? results.map(item => <button key={item.slug} onClick={() => open(item.slug)}><strong>{item.title}</strong><span>{item.section} · {item.interviewWeight} · {item.description}</span></button>) : <div className="search-empty">Không có cheatsheet hoàn chỉnh phù hợp.</div>}</div>}</div><button className="icon-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Đổi giao diện">{theme === 'light' ? <Moon /> : <Sun />}</button></header><main className="main-content"><Outlet /></main></div>
    {mobileOpen && <button className="sidebar-overlay" onClick={() => setMobileOpen(false)} aria-label="Đóng menu" />}
  </div>
}
