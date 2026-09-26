import { useState } from 'react'

const tuples = [
  ['41', 'Paid', '2026-09-24 09:12', '701'],
  ['42', 'Paid', '2026-09-25 12:05', '825'], ['42', 'Paid', '2026-09-25 11:40', '824'], ['42', 'Paid', '2026-09-25 10:30', '823'],
  ['42', 'Pending', '2026-09-25 10:15', '810'], ['42', 'Shipped', '2026-09-24 16:20', '792'],
  ['43', 'Paid', '2026-09-25 12:30', '840'],
]

export default function CompositeIndexVisual() {
  const [mode, setMode] = useState<'fits' | 'missing'>('fits')
  const selected = (tuple: string[]) => tuple[0] === '42' && tuple[1] === 'Paid'
  return <section className="index-visual-card" aria-labelledby="composite-title">
    <span className="mini-label">Visual 3 · Ordered tuples</span><h3 id="composite-title">Composite Index được sắp theo cả tuple</h3>
    <p>Key: <code>(tenant_id, status, created_at DESC, id DESC)</code>. Visual nhóm các status giống nhau để thấy prefix/range; thứ tự chính xác giữa các text status phụ thuộc database collation.</p>
    <div className="index-choice-row" role="group" aria-label="Chọn query shape"><button className={mode === 'fits' ? 'active' : ''} onClick={() => setMode('fits')}>tenant=42, status=Paid</button><button className={mode === 'missing' ? 'active' : ''} onClick={() => setMode('missing')}>created_at only</button></div>
    <div className="composite-layers" aria-label="Ba lớp thứ tự của composite index">
      <div><small>Layer 1</small><strong>tenant_id = 42</strong><span>thu hẹp outer region</span></div>
      <div><small>Layer 2</small><strong>status = Paid</strong><span>vào contiguous subrange</span></div>
      <div><small>Layer 3</small><strong>created_at DESC, id DESC</strong><span>có thứ tự trong subrange</span></div>
      <div><small>Then</small><strong>LIMIT 20</strong><span>dừng khi đủ row</span></div>
    </div>
    <div className="tuple-scroll"><table className="tuple-table"><thead><tr><th>tenant_id</th><th>status</th><th>created_at DESC</th><th>id DESC</th></tr></thead><tbody>{tuples.map((tuple, index) => <tr key={tuple.join('-')} className={mode === 'fits' && selected(tuple) ? 'tuple-selected' : ''} data-testid={mode === 'fits' && selected(tuple) ? 'paid-range' : undefined} data-range-index={index}>{tuple.map(value => <td key={value}>{value}</td>)}</tr>)}</tbody></table></div>
    <p className="index-observation">{mode === 'fits' ? <><strong>Contiguous range:</strong> ba tuple `42 / Paid` nằm liền nhau. Database có thể vào outer region tenant 42, thu hẹp tới subrange Paid, đọc newest-first rồi dừng khi đủ `LIMIT`.</> : <><strong>Missing leading key:</strong> key này được sắp toàn cục theo tenant trước, rồi status. Không có hai leading value đó, các `created_at` của toàn dataset không tạo một direct contiguous region theo key này.</>}</p>
  </section>
}