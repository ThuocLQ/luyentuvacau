import { useState } from 'react'

type Mode = 'baseline' | 'index'
const details = {
  scan: ['Scan', 'Baseline đọc nhiều row lần lượt; index path vào candidate range.', 'Seq Scan / Index Scan'],
  condition: ['Condition', 'Filter kiểm sau khi row tới node; Index Cond giúp vào range.', 'Filter / Index Cond'],
  rows: ['Estimate và actual', 'Estimate là dự đoán trước chạy; actual là outcome quan sát.', 'rows=… / actual rows=…'],
  sort: ['Sort', 'Baseline cần sắp lại; index order phù hợp có thể không cần Sort.', 'Sort node'],
  buffers: ['Buffers', 'Evidence về page/buffer đã chạm, đọc cùng scan và rows.', 'shared hit/read'],
  time: ['Time', 'Timing chịu ảnh hưởng cache/load; so plan shape và relative change.', 'Execution Time'],
} as const
export default function ExecutionPlanFlowVisual() {
  const [mode, setMode] = useState<Mode>('baseline')
  const [layer, setLayer] = useState<keyof typeof details>('scan')
  const [title, description, evidence] = details[layer]
  const baseline = ['Seq Scan', 'Filter tenant/status', 'Sort newest-first', 'Limit 20']
  const indexed = ['Index Scan', 'Index Cond tenant/status', 'ordered entries', 'Limit 20']
  const flow = mode === 'baseline' ? baseline : indexed
  return <section className="index-visual-card" aria-labelledby="plan-title">
    <span className="mini-label">Visual 5 · Plan as data flow</span><h3 id="plan-title">Execution plan: row flow, không chỉ các box</h3>
    <div className="index-choice-row" role="group" aria-label="Chọn execution plan"><button className={mode === 'baseline' ? 'active' : ''} onClick={() => setMode('baseline')}>Baseline</button><button className={mode === 'index' ? 'active' : ''} onClick={() => setMode('index')}>After Index</button></div>
    <ol className="plan-flow" aria-label={`${mode} plan flow`}>{flow.map((node, index) => <li key={node} className={index === 0 ? 'flow-source' : index === flow.length - 1 ? 'flow-result' : ''}><span>{node}</span><small>{index === 0 ? 'many rows enter' : index === flow.length - 1 ? '20 rows return' : 'work transforms rows'}</small></li>)}</ol>
    <div className="plan-layer-controls" role="group" aria-label="Chọn chi tiết plan">{(Object.keys(details) as Array<keyof typeof details>).map(key => <button key={key} className={layer === key ? 'active' : ''} onClick={() => setLayer(key)}>{details[key][0]}</button>)}</div>
    <div className="plan-detail" aria-live="polite"><h4>{title}</h4><p>{description}</p><p><strong>Trong EXPLAIN, nhìn:</strong> {evidence}</p></div>
  </section>
}
