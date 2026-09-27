import { useState } from 'react'

type CrashPoint = 'before-commit' | 'after-commit' | 'after-publish' | 'after-consume'
type SequencePhase = 'published' | 'restarted' | 'consumed-once' | 'consumed-twice'

const labels: Record<CrashPoint, string> = {
  'before-commit': 'Trước DB commit',
  'after-commit': 'Sau DB commit',
  'after-publish': 'Sau publish',
  'after-consume': 'Sau consumer commit',
}

const staticStates: Record<Exclude<CrashPoint, 'after-publish'>, { order: string; outbox: string; broker: string; processed: string; reservation: string; restart: string }> = {
  'before-commit': { order: 'Không có', outbox: 'Không có', broker: '0', processed: 'Không có', reservation: '0', restart: 'Không có Order/Outbox đã commit để relay.' },
  'after-commit': { order: 'Created', outbox: '#E17 Pending', broker: '0', processed: 'Không có', reservation: '0', restart: 'Relay có thể đọc Pending rồi thử publish theo delivery contract.' },
  'after-consume': { order: 'Created', outbox: '#E17 Sent/Pending cleanup', broker: 'có thể delivery lại', processed: '#E17', reservation: '1', restart: 'Consumer đã có event identity cùng Reservation; delivery lại không được nhân Reservation.' },
}

const afterPublishStates: Record<SequencePhase, { deliveries: string; processed: string; reservation: string; detail: string }> = {
  published: { deliveries: '1', processed: 'Không có', reservation: '0', detail: 'Relay đã publish #E17 một lần, nhưng Outbox vẫn Pending vì process chết trước mốc progress durable.' },
  restarted: { deliveries: '2', processed: 'Không có', reservation: '0', detail: 'Restart relay không có bằng chứng progress durable, nên publish lại #E17. Visual này mô phỏng hai lần publish; delivery guarantee thật phụ thuộc broker/client contract.' },
  'consumed-once': { deliveries: '2', processed: '#E17', reservation: '1', detail: 'Consumer commit ProcessedEvent #E17 cùng Reservation một lần.' },
  'consumed-twice': { deliveries: '2', processed: '#E17', reservation: '1', detail: 'Cùng event tới lại: unique event identity giữ ProcessedEvent và Reservation count không đổi.' },
}

export default function OutboxCrashRecoveryVisual() {
  const [point, setPoint] = useState<CrashPoint>('after-publish')
  const [prediction, setPrediction] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [phase, setPhase] = useState<SequencePhase>('published')
  const isSequence = point === 'after-publish'
  const sequence = afterPublishStates[phase]
  const reset = (nextPoint: CrashPoint) => { setPoint(nextPoint); setPrediction(null); setRevealed(false); setPhase('published') }
  const canReveal = !isSequence || prediction !== null

  return <section className="outbox-visual-card" aria-labelledby="outbox-crash-title">
    <p className="outbox-visual-eyebrow">Local simulation · crash and duplicate trace</p>
    <h3 id="outbox-crash-title">Crash ở đâu thì còn gì?</h3>
    <p>Chọn crash point. Với “Sau publish”, dự đoán trước rồi reveal; sau đó tự chạy restart và duplicate consumer flow.</p>
    <fieldset className="outbox-crash-picker">
      <legend>Crash point</legend>
      {(Object.keys(labels) as CrashPoint[]).map(key => <label key={key}><input type="radio" name="outbox-crash" checked={point === key} onChange={() => reset(key)} /> {labels[key]}</label>)}
    </fieldset>
    {isSequence && <fieldset className="outbox-prediction">
      <legend>Dự đoán: sau khi restart relay, #E17 đã được publish bao nhiêu lần trong simulation này?</legend>
      <label><input type="radio" name="outbox-prediction" checked={prediction === 'one'} onChange={() => setPrediction('one')} /> 1 lần</label>
      <label><input type="radio" name="outbox-prediction" checked={prediction === 'two'} onChange={() => setPrediction('two')} /> 2 lần</label>
    </fieldset>}
    <button className="outbox-reveal" disabled={!canReveal} onClick={() => setRevealed(value => !value)}>{revealed ? 'Ẩn state' : 'Reveal state'}</button>
    {revealed && <>
      <div className="outbox-state-grid" aria-label="state after crash">
        <article><strong>Order</strong><span>{isSequence ? 'Created' : staticStates[point as Exclude<CrashPoint, 'after-publish'>].order}</span></article>
        <article><strong>Outbox</strong><span>{isSequence ? '#E17 Pending' : staticStates[point as Exclude<CrashPoint, 'after-publish'>].outbox}</span></article>
        <article><strong>Broker deliveries</strong><span>{isSequence ? sequence.deliveries : staticStates[point as Exclude<CrashPoint, 'after-publish'>].broker}</span></article>
        <article><strong>ProcessedEvent</strong><span>{isSequence ? sequence.processed : staticStates[point as Exclude<CrashPoint, 'after-publish'>].processed}</span></article>
        <article><strong>Reservation count</strong><span>{isSequence ? sequence.reservation : staticStates[point as Exclude<CrashPoint, 'after-publish'>].reservation}</span></article>
      </div>
      <p className="outbox-restart" aria-live="polite"><strong>{isSequence ? 'Observation:' : 'Restart:'}</strong> {isSequence ? sequence.detail : staticStates[point as Exclude<CrashPoint, 'after-publish'>].restart}</p>
      {isSequence && <div className="outbox-flow-actions" aria-label="duplicate delivery simulation">
        {phase === 'published' && <button className="secondary-button" onClick={() => setPhase('restarted')}>Restart relay</button>}
        {phase === 'restarted' && <button className="secondary-button" onClick={() => setPhase('consumed-once')}>Deliver duplicate to consumer</button>}
        {phase === 'consumed-once' && <button className="secondary-button" onClick={() => setPhase('consumed-twice')}>Deliver same event again</button>}
      </div>}
    </>}
  </section>
}