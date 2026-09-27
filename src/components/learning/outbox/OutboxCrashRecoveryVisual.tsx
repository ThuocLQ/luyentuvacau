import { useState } from 'react'

type CrashPoint = 'before-commit' | 'after-commit' | 'after-publish' | 'after-consume'

const states: Record<CrashPoint, { order: string; outbox: string; broker: string; processed: string; restart: string }> = {
  'before-commit': { order: 'Không có', outbox: 'Không có', broker: 'Chưa publish', processed: 'Không có', restart: 'Không có Order để relay; request có thể retry theo API contract.' },
  'after-commit': { order: 'Created', outbox: '#E17 Pending', broker: 'Chưa publish', processed: 'Không có', restart: 'Relay đọc Pending rồi publish #E17.' },
  'after-publish': { order: 'Created', outbox: '#E17 Pending', broker: '#E17 có thể đã nhận', processed: 'Có thể chưa có', restart: 'Relay chưa có mốc durable; publish lại là an toàn hơn bỏ mất event.' },
  'after-consume': { order: 'Created', outbox: '#E17 Sent/Pending cleanup', broker: '#E17 có thể delivery lại', processed: '#E17 + Reservation', restart: 'Consumer thấy #E17 đã xử lý nên không tạo Reservation thứ hai.' },
}

const labels: Record<CrashPoint, string> = {
  'before-commit': 'Trước DB commit',
  'after-commit': 'Sau DB commit',
  'after-publish': 'Sau publish',
  'after-consume': 'Sau consumer commit',
}

export default function OutboxCrashRecoveryVisual() {
  const [point, setPoint] = useState<CrashPoint>('after-publish')
  const [revealed, setRevealed] = useState(false)
  const state = states[point]

  return <section className="outbox-visual-card" aria-labelledby="outbox-crash-title">
    <p className="outbox-visual-eyebrow">Local simulation · durable state trace</p>
    <h3 id="outbox-crash-title">Crash ở đâu thì còn gì?</h3>
    <p>Chọn thời điểm process chết. Dự đoán trước, rồi reveal để đối chiếu state durable và hành vi restart.</p>
    <fieldset className="outbox-crash-picker">
      <legend>Crash point</legend>
      {(Object.keys(labels) as CrashPoint[]).map(key => <label key={key}><input type="radio" name="outbox-crash" checked={point === key} onChange={() => { setPoint(key); setRevealed(false) }} /> {labels[key]}</label>)}
    </fieldset>
    <button className="outbox-reveal" onClick={() => setRevealed(value => !value)}>{revealed ? 'Ẩn state' : 'Reveal surviving state'}</button>
    {revealed && <>
      <div className="outbox-state-grid" aria-label="surviving durable state">
        <article><strong>Order</strong><span>{state.order}</span></article>
        <article><strong>Outbox</strong><span>{state.outbox}</span></article>
        <article><strong>Broker</strong><span>{state.broker}</span></article>
        <article><strong>Processed event</strong><span>{state.processed}</span></article>
      </div>
      <p className="outbox-restart"><strong>Restart:</strong> {state.restart}</p>
    </>}
  </section>
}