import { useState } from 'react'

type VisualStage = 'scan' | 'btree' | 'composite' | 'plan'
interface Props { stage?: VisualStage }

const rows = [
  ['01', '12', 'Paid'], ['02', '42', 'Paid'], ['03', '18', 'Pending'], ['04', '42', 'Shipped'],
  ['05', '77', 'Paid'], ['06', '42', 'Paid'], ['07', '31', 'Paid'], ['08', '42', 'Paid'],
  ['09', '55', 'Pending'], ['10', '42', 'Paid'], ['11', '19', 'Paid'], ['12', '42', 'Paid'],
]
const steps = [
  ['Bắt đầu ở root', 'Root biết các nhánh bao phủ khoảng tenant nào.', '1–30 bị loại; 31–60 vẫn có thể chứa 42.'],
  ['Chọn nhánh 31–60', '42 nằm trong khoảng này, nên các nhánh còn lại bị loại chỉ nhờ thứ tự key.', 'Không cần đọc 1–30 hay 61–90.'],
  ['Thu hẹp 41–50', 'Node kế tiếp chia khoảng nhỏ hơn.', '31–40 và 51–60 bị loại.'],
  ['Tới leaf entries', 'Leaf giữ entry đã sắp theo key.', 'Ta đến candidate entries của tenant 42.'],
  ['Đi tiếp theo query', 'Status và thời gian chỉ giúp tiếp nếu chúng nằm đúng sau tenant trong key ghép.', 'Có thể dừng sớm khi đủ LIMIT 20.'],
] as const
const planDetails = {
  limit: ['Limit', 'Dừng sau 20 row đầu tiên của result đã đúng thứ tự.', 'actual rows và thời gian tổng'],
  scan: ['Seq Scan', 'Đọc lần lượt table rồi lọc row phù hợp.', 'Filter, actual rows và buffers'],
  sort: ['Sort', 'Sắp lại row vì access path chưa có thứ tự output.', 'Sort node và row đi vào Sort'],
  index: ['Index Scan', 'Đi từ index vào candidate range; order có thể đã có sẵn.', 'Index Cond, actual rows, buffers và Sort'],
} as const
type PlanNode = keyof typeof planDetails

export default function IndexGoldenLesson({ stage }: Props) {
  const [scanMode, setScanMode] = useState<'scan' | 'index'>('scan')
  const [step, setStep] = useState(0)
  const [prediction, setPrediction] = useState<string | null>(null)
  const [queryMode, setQueryMode] = useState<'fits' | 'misses'>('fits')
  const [planNode, setPlanNode] = useState<PlanNode>('limit')
  const show = (name: VisualStage) => !stage || stage === name
  const isIndex = scanMode === 'index'
  const visibleRows = isIndex ? rows.filter(([, tenant]) => tenant === '42') : rows
  const [title, meaning, evidence] = planDetails[planNode]
  const planNodes = isIndex ? ['limit', 'index'] as PlanNode[] : ['limit', 'sort', 'scan'] as PlanNode[]
  const activeStep = steps[step]

  return <section className="index-golden-lesson" aria-label="Index learning visual">
    {show('scan') && <section className="index-visual-card" aria-labelledby="scan-lookup-title">
      <div><span className="mini-label">Visual 1 · Stop & compare</span><h3 id="scan-lookup-title">Table scan và targeted lookup khác nhau ở work nào?</h3><p>Query cần tenant 42. Không có index, database kiểm tra từng row. Có index theo tenant, nó đi tới nhóm tenant 42 trước rồi mới xét điều kiện khác.</p></div>
      <div className="index-choice-row" role="group" aria-label="Chọn cách đọc dữ liệu"><button className={scanMode === 'scan' ? 'active' : ''} onClick={() => setScanMode('scan')}>Không có index</button><button className={scanMode === 'index' ? 'active' : ''} onClick={() => setScanMode('index')}>Có index theo tenant</button></div>
      <div className="index-row-grid" aria-live="polite">{rows.map(([id, tenant, status]) => <div className={visibleRows.some(([current]) => current === id) ? 'index-row inspected' : 'index-row skipped'} key={id}><span>row {id}</span><strong>tenant {tenant}</strong><small>{status}</small></div>)}</div>
      <p className="index-observation"><strong>{isIndex ? 'Targeted lookup:' : 'Table scan:'}</strong> {isIndex ? `mô hình chỉ vào ${visibleRows.length} candidate row của tenant 42 trước; status vẫn phải xét nếu không có trong index.` : 'mô hình inspect cả 12 row vì chưa có đường đi gần hơn tới tenant 42.'}</p>
    </section>}

    {show('btree') && <section className="index-visual-card" aria-labelledby="btree-title">
      <div><span className="mini-label">Visual 2 · Stop & predict</span><h3 id="btree-title">Tìm tenant 42 trong B-tree đơn giản hóa</h3><p>B-tree là mô hình key có thứ tự. Nó giúp loại các nhánh không thể chứa key trước khi đọc candidate entries.</p></div>
      {!prediction && <fieldset className="index-predict"><legend>Trước khi reveal: 42 còn có thể nằm trong khoảng nào?</legend><label><input type="radio" name="btree-prediction" onChange={() => setPrediction('wrong')} /> 1–30</label><label><input type="radio" name="btree-prediction" onChange={() => setPrediction('right')} /> 31–60</label><label><input type="radio" name="btree-prediction" onChange={() => setPrediction('wrong')} /> 61–90</label></fieldset>}
      {prediction && <p className="index-prediction-feedback">{prediction === 'right' ? 'Đúng: 42 nằm trong 31–60. Đi từng bước để thấy các nhánh khác bị loại.' : '42 không nằm trong khoảng đã chọn. Dùng Reset để dự đoán lại.'}</p>}
      <div className="btree-stage" aria-live="polite"><div className="btree-node root">Root<br /><strong>1–30 · 31–60 · 61–90</strong></div><div className="btree-arrow">↓</div><div className="btree-node active-range">{step < 2 ? '31–60' : step < 4 ? '41–50' : 'leaf: 42, 42, 42…'}</div><p><strong>Step {step + 1}: {activeStep[0]}.</strong> {activeStep[1]} <em>{activeStep[2]}</em></p></div>
      <div className="index-step-controls"><button onClick={() => { setStep(0); setPrediction(null) }}>Reset</button><button onClick={() => setStep(value => Math.max(0, value - 1))} disabled={step === 0}>Previous</button><button onClick={() => setStep(value => Math.min(steps.length - 1, value + 1))} disabled={step === steps.length - 1}>Next step</button></div>
    </section>}

    {show('composite') && <section className="index-visual-card" aria-labelledby="composite-title">
      <div><span className="mini-label">Visual 3 · Composite order</span><h3 id="composite-title">Index ghép được sắp theo key ghép, không phải từng cột độc lập</h3><p>Thứ tự khái niệm là tenant → status → created_at → id. Query cần bắt đầu từ phần đầu thứ tự đó để đi vào một range nhỏ.</p></div>
      <div className="index-choice-row" role="group" aria-label="Chọn query shape"><button className={queryMode === 'fits' ? 'active' : ''} onClick={() => setQueryMode('fits')}>Có tenant + status</button><button className={queryMode === 'misses' ? 'active' : ''} onClick={() => setQueryMode('misses')}>Chỉ có created_at</button></div>
      <div className="composite-keys"><span>tenant 42</span><span>Paid</span><span>created_at DESC</span><span>id DESC</span></div>
      <p className="index-observation"><strong>{queryMode === 'fits' ? 'Fit:' : 'Không fit theo cách cũ:'}</strong> {queryMode === 'fits' ? 'tenant 42 → Paid tạo candidate range; phần sau đã newest-first nên Limit 20 có thể dừng sớm.' : 'chỉ biết created_at không cho database điểm bắt đầu theo tenant/status ở đầu key.'}</p>
    </section>}

    {show('plan') && <section className="index-visual-card" aria-labelledby="plan-title">
      <div><span className="mini-label">Visual 4 · Plan anatomy</span><h3 id="plan-title">Execution plan là evidence về strategy database đã chọn</h3><p>Chọn node để học dần. Plan thật có thể khác mô hình; hãy tìm mechanism và evidence, không săn một plan duy nhất.</p></div>
      <div className="plan-toggle" role="group" aria-label="Chọn plan"><button className={!isIndex ? 'active' : ''} onClick={() => { setScanMode('scan'); setPlanNode('scan') }}>Baseline: Limit → Sort → Seq Scan</button><button className={isIndex ? 'active' : ''} onClick={() => { setScanMode('index'); setPlanNode('index') }}>After index: Limit → Index Scan</button></div>
      <div className="plan-stack">{planNodes.map(node => <button key={node} className={planNode === node ? 'plan-node active' : 'plan-node'} onClick={() => setPlanNode(node)}>{planDetails[node][0]}</button>)}</div>
      <div className="plan-detail" aria-live="polite"><h4>{title}</h4><p>{meaning}</p><p><strong>Trong EXPLAIN, nhìn:</strong> {evidence}</p></div>
      <table className="index-evidence-table"><thead><tr><th>Mental model</th><th>Evidence PostgreSQL</th></tr></thead><tbody><tr><td>candidate range</td><td>Index Cond</td></tr><tr><td>row thực sự trả ra</td><td>actual rows</td></tr><tr><td>phải sắp lại</td><td>Sort node</td></tr><tr><td>dữ liệu đã chạm</td><td>Buffers</td></tr></tbody></table>
    </section>}
  </section>
}