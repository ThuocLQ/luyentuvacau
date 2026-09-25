import { useState } from 'react'

const rows = [
  { id: '01', tenant: 12, status: 'Paid', page: 'P1' }, { id: '02', tenant: 42, status: 'Paid', page: 'P1' },
  { id: '03', tenant: 18, status: 'Pending', page: 'P1' }, { id: '04', tenant: 42, status: 'Shipped', page: 'P2' },
  { id: '05', tenant: 77, status: 'Paid', page: 'P2' }, { id: '06', tenant: 42, status: 'Paid', page: 'P2' },
  { id: '07', tenant: 31, status: 'Paid', page: 'P3' }, { id: '08', tenant: 42, status: 'Paid', page: 'P3' },
  { id: '09', tenant: 55, status: 'Pending', page: 'P3' }, { id: '10', tenant: 42, status: 'Paid', page: 'P4' },
  { id: '11', tenant: 19, status: 'Paid', page: 'P4' }, { id: '12', tenant: 42, status: 'Paid', page: 'P4' },
]

export default function TableScanVsIndexVisual() {
  const [mode, setMode] = useState<'scan' | 'index'>('scan')
  const considered = mode === 'scan' ? rows : rows.filter(row => row.tenant === 42)
  const returned = considered.filter(row => row.tenant === 42 && row.status === 'Paid')
  const pages = new Set(considered.map(row => row.page)).size

  return <section className="index-visual-card" aria-labelledby="scan-lookup-title">
    <span className="mini-label">Visual 1 · Stop & compare</span>
    <h3 id="scan-lookup-title">Table scan và Index path khác nhau ở work nào?</h3>
    <p>Query cần tenant 42, status Paid. Mô hình nhỏ này đếm row/page đã xét, không mô phỏng số I/O production chính xác.</p>
    <div className="index-choice-row" role="group" aria-label="Chọn access path">
      <button className={mode === 'scan' ? 'active' : ''} onClick={() => setMode('scan')}>Table scan</button>
      <button className={mode === 'index' ? 'active' : ''} onClick={() => setMode('index')}>Index theo tenant</button>
    </div>
    <div className="index-counters" aria-live="polite">
      <span>Page considered <strong>{pages}</strong></span><span>Row considered <strong>{considered.length}</strong></span>
      <span>Eliminated <strong>{considered.length - returned.length}</strong></span><span>Returned <strong>{returned.length}</strong></span>
    </div>
    <div className="index-row-grid">
      {rows.map(row => {
        const active = considered.some(candidate => candidate.id === row.id)
        const match = active && row.tenant === 42 && row.status === 'Paid'
        return <div className={`index-row ${active ? 'inspected' : 'skipped'} ${match ? 'returned' : ''}`} key={row.id}>
          <small>{row.page} · row {row.id}</small><strong>tenant {row.tenant}</strong><span>{row.status}</span>
        </div>
      })}
    </div>
    <p className="index-observation"><strong>{mode === 'scan' ? 'Table scan:' : 'Index path:'}</strong> {mode === 'scan' ? 'phải xét mọi row trong mô hình rồi mới lọc/sort.' : 'đi tới candidate entries tenant 42 trước; status vẫn là work còn lại nếu chưa nằm trong Index.'}</p>
  </section>
}
