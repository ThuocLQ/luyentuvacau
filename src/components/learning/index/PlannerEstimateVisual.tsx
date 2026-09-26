import { useState } from 'react'

type Stage = 'selectivity' | 'accuracy'
type Selectivity = 'narrow' | 'broad'
type Accuracy = 'good' | 'bad'

const selectivityCases = {
  narrow: { label: 'Paid = 0.1%', actual: 1000, estimate: 980, actualWidth: 8, estimateWidth: 7, copy: 'Predicate hẹp giữ lại khoảng 1,000 / 1,000,000 row: candidate set nhỏ hơn.' },
  broad: { label: 'Paid = 82%', actual: 820000, estimate: 810000, actualWidth: 82, estimateWidth: 81, copy: 'Predicate rộng giữ lại khoảng 820,000 / 1,000,000 row: candidate set lớn hơn.' },
} as const

const accuracyCases = {
  good: { label: 'Estimate gần đúng', estimate: 1000, actual: 980, estimateWidth: 10, actualWidth: 9, copy: 'Estimate gần actual, nên cost comparison có dữ kiện tốt hơn.' },
  bad: { label: 'Estimate lệch lớn', estimate: 4000, actual: 82000, estimateWidth: 8, actualWidth: 82, copy: 'Một plan chọn từ estimate 4,000 có thể không phù hợp khi thực tế là 82,000 row. Kiểm tra statistics, data skew, correlation hoặc parameter/data distribution bất thường.' },
} as const

export default function PlannerEstimateVisual() {
  const [stage, setStage] = useState<Stage>('selectivity')
  const [selectivity, setSelectivity] = useState<Selectivity>('narrow')
  const [accuracy, setAccuracy] = useState<Accuracy>('good')
  const selectedSelectivity = selectivityCases[selectivity]
  const selectedAccuracy = accuracyCases[accuracy]

  return <section className="index-visual-card" aria-labelledby="planner-title">
    <span className="mini-label">Visual 4 · Predict before execution</span><h3 id="planner-title">Planner: selectivity và estimate accuracy là hai câu hỏi khác nhau</h3>
    <div className="index-choice-row" role="group" aria-label="Chọn khái niệm planner"><button className={stage === 'selectivity' ? 'active' : ''} onClick={() => setStage('selectivity')}>Selectivity</button><button className={stage === 'accuracy' ? 'active' : ''} onClick={() => setStage('accuracy')}>Estimate accuracy</button></div>
    {stage === 'selectivity' ? <>
      <p><strong>Stage A — Selectivity:</strong> predicate giữ lại bao nhiêu dữ liệu? Đây là quan hệ giữa query và data, không phải chất lượng estimate.</p>
      <div className="index-choice-row" role="group" aria-label="Chọn selectivity"><button className={selectivity === 'narrow' ? 'active' : ''} onClick={() => setSelectivity('narrow')}>Paid = 0.1%</button><button className={selectivity === 'broad' ? 'active' : ''} onClick={() => setSelectivity('broad')}>Paid = 82%</button></div>
      <div className="planner-chain" aria-live="polite"><div><small>Predicate</small><strong>status = Paid</strong></div><span>→</span><div><small>Selectivity</small><strong>{selectedSelectivity.label}</strong></div><span>→</span><div><small>Planner estimate</small><strong>~{selectedSelectivity.estimate.toLocaleString()} rows</strong></div><span>→</span><div><small>Cost comparison</small><strong>candidate plan</strong></div></div>
      <div className="estimate-bars"><span style={{ width: `${selectedSelectivity.actualWidth}%` }}>illustrative actual {selectedSelectivity.actual.toLocaleString()} rows</span><span className="estimate" style={{ width: `${selectedSelectivity.estimateWidth}%` }}>illustrative estimate {selectedSelectivity.estimate.toLocaleString()} rows</span></div>
      <p className="index-observation">{selectedSelectivity.copy} Nó ảnh hưởng relative cost, không có luật “broad predicate thì luôn Seq Scan”.</p>
    </> : <>
      <p><strong>Stage B — Cardinality estimate accuracy:</strong> planner dự đoán row count gần actual đến đâu? Đây là độ chính xác của prediction, tách biệt với predicate rộng hay hẹp.</p>
      <div className="index-choice-row" role="group" aria-label="Chọn độ chính xác estimate"><button className={accuracy === 'good' ? 'active' : ''} onClick={() => setAccuracy('good')}>Good estimate</button><button className={accuracy === 'bad' ? 'active' : ''} onClick={() => setAccuracy('bad')}>Bad estimate</button></div>
      <div className="planner-chain" aria-live="polite"><div><small>Planner estimate</small><strong>{selectedAccuracy.estimate.toLocaleString()} rows</strong></div><span>→</span><div><small>Execution actual</small><strong>{selectedAccuracy.actual.toLocaleString()} rows</strong></div><span>→</span><div><small>Question</small><strong>plan còn phù hợp?</strong></div></div>
      <div className="estimate-bars"><span style={{ width: `${selectedAccuracy.actualWidth}%` }}>actual {selectedAccuracy.actual.toLocaleString()} rows</span><span className="estimate" style={{ width: `${selectedAccuracy.estimateWidth}%` }}>estimate {selectedAccuracy.estimate.toLocaleString()} rows</span></div>
      <p className="index-observation">{selectedAccuracy.copy}</p>
    </>}
  </section>
}