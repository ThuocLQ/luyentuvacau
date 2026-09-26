import { useState } from 'react'

const traces = [
  { node: 'root', title: 'Root: so 42 với các range', detail: '42 không thể nằm ở 1–30 hay 61–90. Chỉ nhánh 31–60 còn khả năng.', edge: 'middle' },
  { node: 'middle', title: 'Node 31–60: thu hẹp tiếp', detail: '42 không nằm ở 31–40 hay 51–60. Chọn edge dẫn tới 41–50.', edge: 'center' },
  { node: 'leaf', title: 'Leaf: candidate entries', detail: 'Leaf chứa entry đã sắp. Từ đây engine xét candidate entry/row và predicate còn lại.', edge: '' },
] as const

export default function BTreeLookupVisual() {
  const [prediction, setPrediction] = useState<string | null>(null)
  const [step, setStep] = useState(0)
  const active = traces[step]
  const reset = () => { setPrediction(null); setStep(0) }
  const faded = (name: string) => step > 0 && name !== 'middle' && name !== 'leaf'

  return <section className="index-visual-card" aria-labelledby="btree-title">
    <span className="mini-label">Visual 2 · Stop & predict</span><h3 id="btree-title">Tìm key 42 trong B-tree đơn giản hóa</h3>
    <p>SVG mô tả range và connector, không phải layout byte-level của PostgreSQL.</p>
    {!prediction ? <fieldset className="index-predict"><legend>42 thuộc root branch nào?</legend>
      {['1–30', '31–60', '61–90'].map(answer => <label key={answer}><input type="radio" name="btree-prediction" onChange={() => setPrediction(answer)} /> {answer}</label>)}
    </fieldset> : <p className="index-prediction-feedback">{prediction === '31–60' ? 'Đúng. Bây giờ reveal đường đi.' : 'Chưa đúng: 42 chỉ có thể ở 31–60. Bạn vẫn có thể đi trace hoặc Reset để dự đoán lại.'}</p>}
    <div className="btree-svg-wrap" aria-live="polite">
      <svg className="btree-svg" viewBox="0 0 760 390" role="img" aria-label={`B-tree lookup step ${step + 1}: ${active.title}`}>
        <path className={`btree-edge ${step >= 1 ? 'faded' : ''}`} d="M380 82 L130 155" /><path className={`btree-edge ${step >= 1 ? 'chosen' : ''}`} d="M380 82 L380 155" /><path className={`btree-edge ${step >= 1 ? 'faded' : ''}`} d="M380 82 L630 155" />
        <path className={`btree-edge ${step >= 2 ? 'faded' : ''}`} d="M380 207 L275 280" /><path className={`btree-edge ${step >= 2 ? 'chosen' : ''}`} d="M380 207 L380 280" /><path className={`btree-edge ${step >= 2 ? 'faded' : ''}`} d="M380 207 L485 280" />
        <g className="btree-node root"><rect x="290" y="25" width="180" height="58" rx="8"/><text x="380" y="51">root</text><text x="380" y="70">30 | 60</text></g>
        <g className={`btree-node ${faded('left') ? 'faded' : ''}`}><rect x="55" y="155" width="150" height="52" rx="8"/><text x="130" y="186">1–30</text></g>
        <g className={`btree-node ${step >= 1 ? 'active' : ''}`}><rect x="305" y="155" width="150" height="52" rx="8"/><text x="380" y="186">31–60</text></g>
        <g className={`btree-node ${faded('right') ? 'faded' : ''}`}><rect x="555" y="155" width="150" height="52" rx="8"/><text x="630" y="186">61–90</text></g>
        <g className={`btree-node ${step >= 2 ? 'faded' : ''}`}><rect x="210" y="280" width="130" height="48" rx="8"/><text x="275" y="309">31–40</text></g>
        <g className={`btree-node leaf ${step >= 2 ? 'active' : ''}`}><rect x="315" y="280" width="130" height="48" rx="8"/><text x="380" y="309">41–50 · 42</text></g>
        <g className={`btree-node ${step >= 2 ? 'faded' : ''}`}><rect x="420" y="280" width="130" height="48" rx="8"/><text x="485" y="309">51–60</text></g>
      </svg>
    </div>
    <div className="trace-copy"><strong>Step {step + 1}: {active.title}.</strong> {active.detail}</div>
    <div className="index-step-controls"><button onClick={reset}>Reset</button><button onClick={() => setStep(value => Math.max(0, value - 1))} disabled={step === 0}>Previous</button><button onClick={() => setStep(value => Math.min(traces.length - 1, value + 1))} disabled={step === traces.length - 1}>Next</button></div>
  </section>
}
