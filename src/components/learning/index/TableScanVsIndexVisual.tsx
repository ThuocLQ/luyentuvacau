import { useState } from 'react'

const rows = [
  { id: '01', tenant: 12, status: 'Paid' }, { id: '02', tenant: 42, status: 'Paid' },
  { id: '03', tenant: 18, status: 'Pending' }, { id: '04', tenant: 42, status: 'Shipped' },
  { id: '05', tenant: 77, status: 'Paid' }, { id: '06', tenant: 42, status: 'Paid' },
  { id: '07', tenant: 31, status: 'Paid' }, { id: '08', tenant: 42, status: 'Paid' },
  { id: '09', tenant: 55, status: 'Pending' }, { id: '10', tenant: 42, status: 'Paid' },
  { id: '11', tenant: 19, status: 'Paid' }, { id: '12', tenant: 42, status: 'Paid' },
]

export default function TableScanVsIndexVisual() {
  const [mode, setMode] = useState<'scan' | 'index'>('scan')
  const candidateRows = rows.filter(row => row.tenant === 42)
  const considered = mode === 'scan' ? rows : candidateRows
  const returned = considered.filter(row => row.status === 'Paid')

  return <section className="index-visual-card" aria-labelledby="scan-lookup-title">
    <span className="mini-label">Visual 1 · Stop & compare</span>
    <h3 id="scan-lookup-title">Table scan và Index path khác nhau ở candidate work nào?</h3>
    <p>Query cần tenant 42, status Paid. Mô hình nhỏ này chỉ đếm row/candidate work; nó không đo page hay I/O production.</p>
    <div className="index-choice-row" role="group" aria-label="Chọn access path">
      <button className={mode === 'scan' ? 'active' : ''} onClick={() => setMode('scan')}>Table scan</button>
      <button className={mode === 'index' ? 'active' : ''} onClick={() => setMode('index')}>Index theo tenant</button>
    </div>
    <div className="index-counters" aria-live="polite">
      <span>Rows considered <strong>{considered.length}</strong></span><span>Candidate rows <strong>{candidateRows.length}</strong></span>
      <span>Eliminated <strong>{considered.length - returned.length}</strong></span><span>Returned <strong>{returned.length}</strong></span>
    </div>
    <div className="index-row-grid">
      {rows.map(row => {
        const active = considered.some(candidate => candidate.id === row.id)
        const match = active && row.status === 'Paid'
        return <div className={`index-row ${active ? 'inspected' : 'skipped'} ${match ? 'returned' : ''}`} key={row.id}>
          <small>row {row.id}</small><strong>tenant {row.tenant}</strong><span>{row.status}</span>
        </div>
      })}
    </div>
    <p className="index-observation"><strong>{mode === 'scan' ? 'Table scan:' : 'Index path:'}</strong> {mode === 'scan' ? 'phải xét toàn bộ dataset của mô hình, rồi mới biết 5 row thuộc tenant 42.' : 'đi vào vùng candidate tenant 42 trước; status vẫn là work còn lại nếu chưa nằm trong Index.'}</p>
  </section>
}