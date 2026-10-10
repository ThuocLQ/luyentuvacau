import { useState } from 'react'

type Experiment = { id: string; questionHtml: string; revealHtml: string }
type Phase = 'predict' | 'run' | 'inspect' | 'reveal'

const phaseCopy: Record<Phase, string> = {
  predict: '1. Dự đoán',
  run: '2. Chạy',
  inspect: '3. Ghi và quan sát',
  reveal: '4. Đối chiếu',
}

export default function RaceLabWorkflow({ setupHtml, experiments }: { setupHtml: string; experiments: Experiment[] }) {
  const [experimentIndex, setExperimentIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('predict')
  const [prediction, setPrediction] = useState('')
  const [observation, setObservation] = useState('')
  const current = experiments[experimentIndex]
  if (!current) throw new Error('Race Guided Lab cannot render without its four semantic experiment blocks.')
  const move = (next: Phase) => setPhase(next)
  const nextExperiment = () => {
    setExperimentIndex(index => index + 1)
    setPhase('predict')
    setPrediction('')
    setObservation('')
  }

  return <section className="race-guided-lab" aria-labelledby="race-guided-lab-title">
    <div><span className="mini-label">Lab chạy được trên Windows</span><h3 id="race-guided-lab-title">Tự dự đoán, chạy và đối chiếu từng tình huống</h3><p>Code ở đây là local simulation. Mỗi experiment chỉ mở lời giải thích sau khi bạn đã có cơ hội tự dự đoán và quan sát.</p></div>
    <div className="race-lab-setup" dangerouslySetInnerHTML={{ __html: setupHtml }} />
    <section className="race-lab-workflow" aria-live="polite" data-experiment={current.id}>
      <header><span className="mini-label">Experiment {experimentIndex + 1} / {experiments.length}</span><strong>{phaseCopy[phase]}</strong></header>
      {phase === 'predict' && <><div dangerouslySetInnerHTML={{ __html: current.questionHtml }} /><label>Dự đoán của bạn <small>(không chấm điểm; một ý ngắn là đủ)</small><textarea value={prediction} onChange={event => setPrediction(event.target.value)} placeholder="Ví dụ: điều gì xảy ra với hai request?" /></label><button className="primary-button" onClick={() => move('run')}>Sang bước chạy</button></>}
      {phase === 'run' && <><p>Chạy `dotnet run` với input hiện tại. Đừng mở đáp án ở bước này; chỉ nhìn các dòng mà chương trình in ra.</p><button className="primary-button" onClick={() => move('inspect')}>Tôi đã chạy hoặc đọc kết quả</button></>}
      {phase === 'inspect' && <><p>Ghi ba evidence bạn vừa thấy: số request được approve, tổng amount approved và final balance. Ba số này giúp phân biệt “balance trông ổn” với rule thật sự còn đúng.</p><label>Observation của bạn <small>(ghi chú local, không dùng để auto-verify)</small><textarea value={observation} onChange={event => setObservation(event.target.value)} placeholder="approvedCount=..., approvedAmount=..., finalBalance=..." /></label><button className="primary-button" onClick={() => move('reveal')}>Mở đối chiếu và giải thích</button></>}
      {phase === 'reveal' && <><div className="race-lab-reveal-copy" dangerouslySetInnerHTML={{ __html: current.revealHtml }} />{experimentIndex < experiments.length - 1 ? <button className="primary-button" onClick={nextExperiment}>Sang experiment tiếp theo</button> : <p className="race-lab-complete">Bạn đã đi qua bốn tình huống. Dùng phần Debug kế tiếp để giải thích evidence, thay vì chỉ nhớ output.</p>}</>}
    </section>
  </section>
}
