import { useState } from 'react'

const tuples = [
  ['41', 'Paid', '2026-09-24 09:12', '701'], ['42', 'Pending', '2026-09-25 10:15', '810'],
  ['42', 'Paid', '2026-09-25 12:05', '825'], ['42', 'Paid', '2026-09-25 11:40', '824'],
  ['42', 'Paid', '2026-09-25 10:30', '823'], ['42', 'Shipped', '2026-09-24 16:20', '792'],
  ['43', 'Paid', '2026-09-25 12:30', '840'],
]

export default function CompositeIndexVisual() {
  const [mode, setMode] = useState<'fits' | 'missing'>('fits')
  const selected = (tuple: string[]) => tuple[0] === '42' && tuple[1] === 'Paid'
  return <section className="index-visual-card" aria-labelledby="composite-title">
    <span className="mini-label">Visual 3 · Ordered tuples</span><h3 id="composite-title">Composite Index được sắp theo cả tuple</h3>
    <p>Key: <code>(tenant_id, status, created_at DESC, id DESC)</code>. Các row dưới đây là entry theo thứ tự đó.</p>
    <div className="index-choice-row" role="group" aria-label="Chọn query shape"><button className={mode === 'fits' ? 'active' : ''} onClick={() => setMode('fits')}>tenant=42, status=Paid</button><button className={mode === 'missing' ? 'active' : ''} onClick={() => setMode('missing')}>created_at only</button></div>
    <div className="tuple-scroll"><table className="tuple-table"><thead><tr><th>tenant_id</th><th>status</th><th>created_at DESC</th><th>id DESC</th></tr></thead><tbody>{tuples.map(tuple => <tr key={tuple.join('-')} className={mode === 'fits' && selected(tuple) ? 'tuple-selected' : ''}>{tuple.map(value => <td key={value}>{value}</td>)}</tr>)}</tbody></table></div>
    <p className="index-observation">{mode === 'fits' ? <><strong>Contiguous range:</strong> ba tuple được highlight nằm liền nhau. Database có thể vào `42 → Paid`, đọc newest-first và dừng khi đủ `LIMIT`.</> : <><strong>Missing leading key:</strong> chỉ biết `created_at` không nói entry bắt đầu ở tenant/status nào. Các thời điểm cùng ngày nằm rải giữa nhiều tenant, nên không có direct contiguous range theo key này.</>}</p>
  </section>
}
