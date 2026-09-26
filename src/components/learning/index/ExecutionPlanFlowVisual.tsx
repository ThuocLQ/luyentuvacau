import { useState } from 'react'

type Mode = 'baseline' | 'index'
type Operator = { name: string; work: string; result: boolean }
const details = {
  scan: ['Scan', 'Scan là operator. Seq Scan đọc table lần lượt; Index Scan đi từ Index vào candidate range.', 'Seq Scan / Index Scan'],
  condition: ['Scan condition', '`Filter` và `Index Cond` là qualifier/evidence gắn với scan node, không phải execution-plan node độc lập.', 'Filter / Index Cond dưới scan node'],
  rows: ['Estimate và actual', 'Estimate là prediction trước chạy; actual là outcome quan sát sau chạy.', 'rows=… / actual rows=…'],
  sort: ['Sort', 'Sort là execution-plan node thực khi output từ access path chưa đúng order.', 'Sort node'],
  buffers: ['Buffers', 'Evidence về page/buffer đã chạm, đọc cùng scan và rows.', 'shared hit/read'],
  time: ['Time', 'Timing chịu ảnh hưởng cache/load; so plan shape và relative change.', 'Execution Time'],
} as const
const plans: Record<Mode, { scan: { name: string; qualifier: string; rowWork: string }; operators: Operator[] }> = {
  baseline: {
    scan: { name: 'Seq Scan on orders', qualifier: 'Filter: tenant_id = 42 AND status = Paid', rowWork: 'illustrative: nhiều row được scan; row khớp rời scan' },
    operators: [{ name: 'Sort', work: 'row khớp được sắp newest-first', result: false }, { name: 'Limit 20', work: '20 row rời Limit', result: true }],
  },
  index: {
    scan: { name: 'Index Scan on orders', qualifier: 'Index Cond: tenant_id = 42 AND status = Paid', rowWork: 'illustrative: vào candidate range; row đã có order rời scan' },
    operators: [{ name: 'Limit 20', work: '20 row rời Limit', result: true }],
  },
}

export default function ExecutionPlanFlowVisual() {
  const [mode, setMode] = useState<Mode>('baseline')
  const [layer, setLayer] = useState<keyof typeof details>('scan')
  const [title, description, evidence] = details[layer]
  const plan = plans[mode]
  return <section className="index-visual-card" aria-labelledby="plan-title">
    <span className="mini-label">Visual 5 · Plan as row flow</span><h3 id="plan-title">Execution plan: row flow qua operator thật</h3>
    <div className="index-choice-row" role="group" aria-label="Chọn execution plan"><button className={mode === 'baseline' ? 'active' : ''} onClick={() => setMode('baseline')}>Baseline</button><button className={mode === 'index' ? 'active' : ''} onClick={() => setMode('index')}>After Index</button></div>
    <div className="plan-scan-node" data-testid="scan-node"><strong>{plan.scan.name}</strong><span className="plan-scan-qualifier">{plan.scan.qualifier}</span><small>{plan.scan.rowWork}</small></div>
    <ol className="plan-flow" aria-label={`${mode} plan operators`}>{plan.operators.map(operator => <li key={operator.name} className={operator.result ? 'flow-result' : ''}><span>{operator.name}</span><small>{operator.work}</small></li>)}</ol>
    <p className="plan-flow-note">`Filter` / `Index Cond` là scan-node evidence. `Sort` / `Limit` mới là execution-plan node trong flow này.</p>
    <div className="plan-layer-controls" role="group" aria-label="Chọn chi tiết plan">{(Object.keys(details) as Array<keyof typeof details>).map(key => <button key={key} className={layer === key ? 'active' : ''} onClick={() => setLayer(key)}>{details[key][0]}</button>)}</div>
    <div className="plan-detail" aria-live="polite"><h4>{title}</h4><p>{description}</p><p><strong>Trong EXPLAIN, nhìn:</strong> {evidence}</p></div>
  </section>
}