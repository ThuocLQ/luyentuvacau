import { useState } from 'react'

type CrashPoint = 'before-commit' | 'after-commit' | 'after-publish' | 'after-consume'
type SequencePhase = 'published' | 'restarted' | 'consumed-once' | 'consumed-twice'

const labels: Record<CrashPoint, string> = {
  'before-commit': 'Trước DB commit',
  'after-commit': 'Sau DB commit',
  'after-publish': 'Sau publish',
  'after-consume': 'Sau consumer commit',
}

const staticStates: Record<Exclude<CrashPoint, 'after-publish'>, { order: string; outbox: string; publishAttempts: string; consumerDeliveries: string; processed: string; reservation: string; restart: string }> = {
  'before-commit': { order: 'Không có', outbox: 'Không có', publishAttempts: '0', consumerDeliveries: '0', processed: 'Không có', reservation: '0', restart: 'Không có Order/Outbox đã commit để relay.' },
  'after-commit': { order: 'Created', outbox: '#E17 Pending', publishAttempts: '0', consumerDeliveries: '0', processed: 'Không có', reservation: '0', restart: 'Relay có thể đọc Pending rồi thử publish theo delivery contract.' },
  'after-consume': { order: 'Created', outbox: '#E17 Sent/Pending cleanup', publishAttempts: 'Không đếm ở scenario này', consumerDeliveries: 'Không đếm ở scenario này', processed: '#E17', reservation: '1', restart: 'Consumer đã có event identity cùng Reservation; delivery lại không được nhân Reservation.' },
}

const afterPublishStates: Record<SequencePhase, { publishAttempts: string; consumerDeliveries: string; processed: string; reservation: string; detail: string }> = {
  published: { publishAttempts: '1', consumerDeliveries: '0', processed: 'Không có', reservation: '0', detail: 'Relay đã thử publish #E17 một lần, nhưng Outbox vẫn Pending vì process chết trước khi progress durable được ghi.' },
  restarted: { publishAttempts: '2', consumerDeliveries: '0', processed: 'Không có', reservation: '0', detail: 'Relay vẫn thấy Pending nên thử publish lại #E17. Simulation này chỉ đếm publish attempts của relay; broker/client contract thật quyết định message được accept, deliver hoặc redeliver thế nào.' },
  'consumed-once': { publishAttempts: '2', consumerDeliveries: '1', processed: '#E17', reservation: '1', detail: 'Simulation chủ động deliver #E17 cho consumer một lần. Consumer commit ProcessedEvent #E17 cùng Reservation.' },
  'consumed-twice': { publishAttempts: '2', consumerDeliveries: '2', processed: '#E17', reservation: '1', detail: 'Simulation deliver cùng event thêm một lần. Unique event identity giữ ProcessedEvent và Reservation count không đổi.' },
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
    <p>Chọn crash point. Với “Sau publish”, dự đoán trước rồi reveal; sau đó tự chạy restart và consumer delivery flow.</p>
    <fieldset className="outbox-crash-picker">
      <legend>Crash point</legend>
      {(Object.keys(labels) as CrashPoint[]).map(key => <label key={key}><input type="radio" name="outbox-crash" checked={point === key} onChange={() => reset(key)} /> {labels[key]}</label>)}
    </fieldset>
    {isSequence && <fieldset className="outbox-prediction">
      <legend>Trong simulation này, sau khi relay restart, relay đã thử publish #E17 tổng cộng bao nhiêu lần?</legend>
      <label><input type="radio" name="outbox-prediction" checked={prediction === 'one'} onChange={() => setPrediction('one')} /> 1 lần</label>
      <label><input type="radio" name="outbox-prediction" checked={prediction === 'two'} onChange={() => setPrediction('two')} /> 2 lần</label>
    </fieldset>}
    <button className="outbox-reveal" disabled={!canReveal} onClick={() => setRevealed(value => !value)}>{revealed ? 'Ẩn state' : 'Reveal state'}</button>
    {revealed && <>
      <div className="outbox-state-grid" aria-label="state after crash">
        <article><strong>Order</strong><span>{isSequence ? 'Created' : staticStates[point as Exclude<CrashPoint, 'after-publish'>].order}</span></article>
        <article><strong>Outbox</strong><span>{isSequence ? '#E17 Pending' : staticStates[point as Exclude<CrashPoint, 'after-publish'>].outbox}</span></article>
        <article><strong>Relay publish attempts</strong><span>{isSequence ? sequence.publishAttempts : staticStates[point as Exclude<CrashPoint, 'after-publish'>].publishAttempts}</span></article>
        <article><strong>Consumer deliveries</strong><span>{isSequence ? sequence.consumerDeliveries : staticStates[point as Exclude<CrashPoint, 'after-publish'>].consumerDeliveries}</span></article>
        <article><strong>ProcessedEvent</strong><span>{isSequence ? sequence.processed : staticStates[point as Exclude<CrashPoint, 'after-publish'>].processed}</span></article>
        <article><strong>Reservation count</strong><span>{isSequence ? sequence.reservation : staticStates[point as Exclude<CrashPoint, 'after-publish'>].reservation}</span></article>
      </div>
      <p className="outbox-restart" aria-live="polite"><strong>{isSequence ? 'Observation:' : 'Restart:'}</strong> {isSequence ? sequence.detail : staticStates[point as Exclude<CrashPoint, 'after-publish'>].restart}</p>
      {isSequence && <div className="outbox-flow-actions" aria-label="duplicate delivery simulation">
        {phase === 'published' && <button className="secondary-button" onClick={() => setPhase('restarted')}>Restart relay</button>}
        {phase === 'restarted' && <button className="secondary-button" onClick={() => setPhase('consumed-once')}>Deliver #E17 to consumer</button>}
        {phase === 'consumed-once' && <button className="secondary-button" onClick={() => setPhase('consumed-twice')}>Deliver same event again</button>}
      </div>}
    </>}
  </section>
}
