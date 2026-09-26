import { useState } from 'react'

export default function RaceProtectionVisual() {
  const [mode, setMode] = useState<'unsafe' | 'protected'>('unsafe')
  const rows = mode === 'unsafe'
    ? [['A', 'READ 100'], ['B', 'READ 100'], ['A', 'CHECK → allow 80'], ['B', 'CHECK → allow 30'], ['A', 'WRITE 20'], ['B', 'WRITE 70']]
    : [['A', 'acquire lock → enter critical section'], ['B', 'wait: same lock is held'], ['A', 'READ → CHECK → WRITE 20 → release'], ['B', 'acquire lock'], ['B', 'READ 20 → CHECK 20 ≥ 30 fails → release']]
  return <section className="race-visual-card" aria-labelledby="race-protection-title">
    <span className="mini-label">Visual 2 · Same requests, different boundary</span><h3 id="race-protection-title">Bảo vệ logical operation, không chỉ một line</h3>
    <div className="index-choice-row" role="group" aria-label="Chọn execution mode"><button className={mode === 'unsafe' ? 'active' : ''} onClick={() => setMode('unsafe')}>Unsafe interleaving</button><button className={mode === 'protected' ? 'active' : ''} onClick={() => setMode('protected')}>`lock` trong một process</button></div>
    <ol className={`race-protection-flow ${mode}`}>{rows.map(([actor, event], index) => <li key={`${actor}-${event}`}><span className={`actor ${actor === 'A' ? 'a' : 'b'}`}>Request {actor}</span><strong>{event}</strong><small>{mode === 'protected' && index === 1 ? 'wait vì A đang giữ cùng lock object' : ''}</small></li>)}</ol>
    <p className="race-trace-copy">{mode === 'unsafe' ? <><strong>Non-atomic:</strong> READ → CHECK → WRITE là nhiều bước quan sát được; operation khác có thể xen vào.</> : <><strong>Critical section:</strong> `lock` tạo mutual exclusion cho code dùng cùng lock object. Giữ vùng này ngắn để giảm contention; đừng `await` trong `lock`.</>}</p>
  </section>
}
