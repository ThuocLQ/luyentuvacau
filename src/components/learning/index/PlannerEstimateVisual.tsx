import { useState } from 'react'

export default function PlannerEstimateVisual() {
  const [distribution, setDistribution] = useState<'narrow' | 'broad'>('narrow')
  const actual = distribution === 'narrow' ? 120 : 82000
  const estimate = distribution === 'narrow' ? 100 : 4000
  const likely = distribution === 'narrow' ? 'Index path có thể rẻ: candidate range nhỏ.' : 'Scan/bitmap path có thể cạnh tranh: candidate range lớn.'
  return <section className="index-visual-card" aria-labelledby="planner-title">
    <span className="mini-label">Visual 4 · Estimate before execution</span><h3 id="planner-title">Planner đi từ predicate tới cost như thế nào?</h3>
    <p><code>WHERE status = 'Paid'</code> không tự nói query sẽ nhanh hay chậm. Distribution quyết định predicate giữ lại bao nhiêu row.</p>
    <div className="index-choice-row" role="group" aria-label="Chọn distribution"><button className={distribution === 'narrow' ? 'active' : ''} onClick={() => setDistribution('narrow')}>Paid = 0.1%</button><button className={distribution === 'broad' ? 'active' : ''} onClick={() => setDistribution('broad')}>Paid = 82%</button></div>
    <div className="planner-chain" aria-live="polite"><div><small>Predicate</small><strong>status = Paid</strong></div><span>→</span><div><small>Selectivity</small><strong>{distribution === 'narrow' ? 'loại gần hết' : 'giữ lại phần lớn'}</strong></div><span>→</span><div><small>Estimate</small><strong>{estimate.toLocaleString()} rows</strong></div><span>→</span><div><small>Candidate plan</small><strong>{likely}</strong></div></div>
    <div className="estimate-bars"><span style={{ width: `${distribution === 'narrow' ? 6 : 82}%` }}>actual {actual.toLocaleString()} rows</span><span className="estimate" style={{ width: `${distribution === 'narrow' ? 5 : 18}%` }}>estimate {estimate.toLocaleString()}</span></div>
    <p className="index-observation"><strong>Statistics:</strong> `ANALYZE` cung cấp tóm tắt distribution để estimate. Estimate/actual mismatch là evidence để kiểm statistics hoặc correlation; không kết luận planner sai chỉ từ một plan.</p>
  </section>
}
