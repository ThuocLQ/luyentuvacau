import { useState } from 'react'

export default function RaceBoundaryVisual() {
  const [scope, setScope] = useState<'one' | 'many'>('one')
  return <section className="race-visual-card" aria-labelledby="race-boundary-title">
    <span className="mini-label">Visual 3 · Correctness boundary</span><h3 id="race-boundary-title">Cùng code `lock` không tự tạo coordination giữa instance</h3>
    <div className="index-choice-row" role="group" aria-label="Chọn số instance"><button className={scope === 'one' ? 'active' : ''} onClick={() => setScope('one')}>Một instance</button><button className={scope === 'many' ? 'active' : ''} onClick={() => setScope('many')}>Hai instance</button></div>
    <div className={`race-boundary ${scope}`} aria-live="polite"><div className="race-instance"><strong>Instance A</strong><code>lock(gateA)</code><span>{scope === 'one' ? 'cùng process, cùng gate' : 'gateA chỉ sống trong A'}</span></div>{scope === 'many' && <div className="race-instance"><strong>Instance B</strong><code>lock(gateB)</code><span>gateB chỉ sống trong B</span></div>}<div className="race-database"><strong>Inventory row</strong><span>quantity = 1</span><code>UPDATE ... WHERE quantity &gt; 0</code></div></div>
    <p className="race-trace-copy">{scope === 'one' ? 'Nếu mọi request cùng process dùng đúng một gate, lock serializes vùng memory đó.' : 'gateA và gateB là hai process-local lock khác nhau. Nếu invariant nằm ở database inventory, cần đặt atomicity/concurrency rule ở database boundary (ví dụ conditional update, transaction/optimistic concurrency tùy workflow), không mặc định nhảy sang distributed lock.'}</p>
  </section>
}
