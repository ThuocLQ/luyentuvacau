import { useState } from 'react'

type Trace = { label: string; active: 'A' | 'B' | 'none'; a: string; b: string; balance: number; approved: number; status: 'valid' | 'violated'; note: string }
const trace: Trace[] = [
  { label: 'Bắt đầu', active: 'none', a: '—', b: '—', balance: 100, approved: 0, status: 'valid', note: 'Chưa request nào quan sát balance.' },
  { label: 'A · READ 100', active: 'A', a: 'local = 100', b: '—', balance: 100, approved: 0, status: 'valid', note: 'A chụp một giá trị local. Shared balance chưa đổi.' },
  { label: 'B · READ 100', active: 'B', a: 'local = 100', b: 'local = 100', balance: 100, approved: 0, status: 'valid', note: 'B cũng thấy 100 vì A chưa write.' },
  { label: 'A · CHECK 100 ≥ 80', active: 'A', a: 'approve 80', b: 'local = 100', balance: 100, approved: 80, status: 'valid', note: 'A cho phép rút 80 từ snapshot local của A.' },
  { label: 'B · CHECK 100 ≥ 30', active: 'B', a: 'approve 80', b: 'approve 30', balance: 100, approved: 110, status: 'violated', note: 'Cả hai đã được phép rút tổng 110 từ balance ban đầu 100. Invariant đã bị phá trước cả write cuối.' },
  { label: 'A · WRITE 20', active: 'A', a: 'wrote 20', b: 'approve 30', balance: 20, approved: 110, status: 'violated', note: 'A ghi kết quả tính từ snapshot 100.' },
  { label: 'B · WRITE 70', active: 'B', a: 'wrote 20', b: 'wrote 70', balance: 70, approved: 110, status: 'violated', note: 'B ghi snapshot cũ 100 - 30 và che write của A. Final balance cũng không phản ánh hai withdrawal thành công.' },
]

export default function RaceInterleavingVisual() {
  const [step, setStep] = useState(0)
  const [prediction, setPrediction] = useState<string | null>(null)
  const current = trace[step]
  const needsPrediction = step === 2 && !prediction
  const reset = () => { setStep(0); setPrediction(null) }
  return <section className="race-visual-card" aria-labelledby="race-interleaving-title">
    <span className="mini-label">Visual 1 · Trace một interleaving</span><h3 id="race-interleaving-title">Hai request có thể phá invariant dù mỗi request nhìn riêng đều hợp lý</h3>
    <p><strong>Invariant luôn hiện:</strong> tổng withdrawal được chấp nhận không được vượt balance ban đầu 100.</p>
    <div className={`race-invariant ${current.status}`} aria-live="polite"><strong>{current.status === 'valid' ? '✓ Invariant còn đúng' : '✗ Invariant bị vi phạm'}</strong><span>Approved {current.approved} / 100 · shared balance {current.balance}</span></div>
    <div className="race-timeline" aria-live="polite" aria-label={`Timeline step ${step}: ${current.label}`}>
      <div className="race-lane-header">Request A · rút 80</div><div className="race-lane-header shared">Shared state</div><div className="race-lane-header">Request B · rút 30</div>
      <div className={`race-lane-event ${current.active === 'A' ? 'active' : ''}`}><strong>{current.active === 'A' ? current.label : 'local state'}</strong><span>{current.a}</span></div>
      <div className="race-shared-value"><strong>balance = {current.balance}</strong><span>approved = {current.approved}</span></div>
      <div className={`race-lane-event ${current.active === 'B' ? 'active' : ''}`}><strong>{current.active === 'B' ? current.label : 'local state'}</strong><span>{current.b}</span></div>
    </div>
    {needsPrediction && <fieldset className="race-predict"><legend>Cả A và B đều đọc 100. Điều gì có thể xảy ra nếu cả hai cùng check trước khi ai write?</legend><label><input type="radio" name="race-prediction" onChange={() => setPrediction('correct')} /> Cả hai có thể được chấp nhận, tổng là 110.</label><label><input type="radio" name="race-prediction" onChange={() => setPrediction('wrong')} /> B tự thấy write của A nên sẽ tự từ chối.</label></fieldset>}
    {prediction && step === 2 && <p className="race-prediction-feedback">{prediction === 'correct' ? 'Đúng. Chọn Next để reveal hai CHECK.' : 'Không có synchronization nào khiến B tự thấy local snapshot của A đổi. Hãy xem Next.'}</p>}
    <p className="race-trace-copy"><strong>{current.label}:</strong> {current.note}</p>
    <div className="index-step-controls"><button onClick={reset}>Reset</button><button onClick={() => setStep(value => Math.max(0, value - 1))} disabled={step === 0}>Previous</button><button onClick={() => setStep(value => Math.min(trace.length - 1, value + 1))} disabled={step === trace.length - 1 || needsPrediction}>Next</button></div>
  </section>
}
