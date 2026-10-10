import { useEffect, useState } from 'react'

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

export default function RaceInterleavingVisual({ onConclusion, onReset }: { onConclusion?: () => void; onReset?: () => void }) {
  const [step, setStep] = useState(0)
  const [prediction, setPrediction] = useState<string | null>(null)
  const current = trace[step]
  const needsPrediction = step === 2 && !prediction
  const canDiagnose = step >= 4
  useEffect(() => { if (canDiagnose) onConclusion?.() }, [canDiagnose, onConclusion])
  const reset = () => { setStep(0); setPrediction(null); onReset?.() }
  return <section className="race-visual-card" aria-labelledby="race-interleaving-title">
    <span className="mini-label">Visual 1 · Theo từng nhịp</span><h3 id="race-interleaving-title">Hai request cùng đọc một balance</h3>
    <p><strong>Câu hỏi:</strong> A rút 80 và B rút 30. Khi nào hệ thống đã cho phép rút quá số dư 100?</p>
    <div className={`race-invariant ${canDiagnose ? current.status : 'pending'}`} aria-live="polite"><strong>{canDiagnose ? current.status === 'valid' ? '✓ Invariant còn đúng' : '✗ Invariant bị vi phạm' : '? Chưa kết luận — hãy theo trace'}</strong><span>Rule cần kiểm: approved không vượt 100</span></div>
    <div className="race-timeline" data-layout-boundary aria-live="polite" aria-label={`Timeline step ${step}: ${current.label}`}>
      <div className="race-current-operation"><span>Đang quan sát</span><strong>{current.label}</strong><p>{current.note}</p></div>
      <div className="race-state-grid">
        <div className={`race-lane-event ${current.active === 'A' ? 'active' : ''}`}><strong>Request A · rút 80</strong><span>Snapshot của A</span><b>{current.a}</b></div>
        <div className="race-shared-value"><strong>Shared balance</strong><b>balance = {current.balance}</b><span>{canDiagnose ? `approved = ${current.approved}` : 'approved: chưa reveal kết luận'}</span></div>
        <div className={`race-lane-event ${current.active === 'B' ? 'active' : ''}`}><strong>Request B · rút 30</strong><span>Snapshot của B</span><b>{current.b}</b></div>
      </div>
    </div>
    {needsPrediction && <fieldset className="race-predict"><legend>Cả A và B đều đọc 100. Điều gì có thể xảy ra nếu cả hai cùng check trước khi ai write?</legend><label><input type="radio" name="race-prediction" onChange={() => setPrediction('correct')} /> Cả hai có thể được chấp nhận, tổng là 110.</label><label><input type="radio" name="race-prediction" onChange={() => setPrediction('wrong')} /> B tự thấy write của A nên sẽ tự từ chối.</label></fieldset>}
    {prediction && step === 2 && <p className="race-prediction-feedback">{prediction === 'correct' ? 'Đúng. Chọn Next để reveal hai CHECK.' : 'Không có synchronization nào khiến B tự thấy local snapshot của A đổi. Hãy xem Next.'}</p>}
    {canDiagnose && <p className="race-trace-copy"><strong>Evidence:</strong> approved = {current.approved}; shared balance = {current.balance}. Final balance không đủ để phủ nhận hai approval đã xảy ra.</p>}
    <div className="index-step-controls"><button onClick={reset}>Làm lại</button><button onClick={() => setStep(value => Math.max(0, value - 1))} disabled={step === 0}>Bước trước</button><button onClick={() => setStep(value => Math.min(trace.length - 1, value + 1))} disabled={step === trace.length - 1 || needsPrediction}>Xem bước tiếp</button></div>
  </section>
}
