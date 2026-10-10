import { useMemo } from 'react'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { addExperiment, initialRaceLabProgress, isRaceLabProgress, raceLabStorageKey, type RaceLabExperimentId, type RaceLabPhase } from './raceLabProgress'

type Experiment = { id: RaceLabExperimentId; questionHtml: string; revealHtml: string }

const phaseCopy: Record<RaceLabPhase, string> = {
  predict: '1. Dự đoán',
  run: '2. Chạy',
  inspect: '3. Ghi và quan sát',
  reveal: '4. Đối chiếu',
}

const differenceHints: Record<RaceLabExperimentId, string> = {
  sequential: 'So sánh thứ tự xử lý với điều kiện từ chối của request thứ hai.',
  unsafe: 'Điểm quan trọng là tổng approved amount, không chỉ riêng final balance.',
  controlled: 'Barrier chỉ làm failure lặp lại để quan sát; nó không phải production fix.',
  protected: 'Kiểm tra READ, CHECK và WRITE cùng nằm trong một gate.',
}

export default function RaceLabWorkflow({ setupHtml, experiments }: { setupHtml: string; experiments: Experiment[] }) {
  const [progress, setProgress] = useLocalStorage(raceLabStorageKey, initialRaceLabProgress(), isRaceLabProgress)
  const experimentIndex = Math.max(0, experiments.findIndex(experiment => experiment.id === progress.experimentId))
  const current = experiments[experimentIndex]
  if (!current) throw new Error('Race Guided Lab cannot render without its four semantic experiment blocks.')
  const prediction = progress.predictions[current.id] ?? ''
  const observation = progress.observations[current.id] ?? ''
  const status = useMemo(() => ({
    viewed: progress.viewed.length,
    attempted: Object.values(progress.predictions).filter(note => note.trim()).length,
    recorded: Object.values(progress.observations).filter(note => note.trim()).length,
    selfReportedExecution: progress.selfReportedExecution.length,
  }), [progress])

  const update = (next: Partial<typeof progress>) => setProgress(existing => ({ ...existing, ...next }))
  const setNote = (kind: 'predictions' | 'observations', value: string) => setProgress(existing => {
    const notes = { ...existing[kind], [current.id]: value }
    const notedExperiments = Object.entries(notes).filter(([, note]) => note.trim()).map(([id]) => id as RaceLabExperimentId)
    return { ...existing, [kind]: notes, ...(kind === 'predictions' ? { attempted: notedExperiments } : { recorded: notedExperiments }) }
  })
  const moveToRun = (skipped = false) => setProgress(existing => ({
    ...existing,
    phase: 'run',
    ...(skipped ? { skippedPrediction: addExperiment(existing.skippedPrediction, current.id) } : {}),
  }))
  const moveToInspect = (selfReportedExecution = false) => setProgress(existing => ({ ...existing, phase: 'inspect', ...(selfReportedExecution ? { selfReportedExecution: addExperiment(existing.selfReportedExecution, current.id) } : {}) }))
  const moveToReveal = (skipped = false) => setProgress(existing => ({
    ...existing,
    phase: 'reveal',
    viewed: addExperiment(existing.viewed, current.id),
    ...(skipped ? { skippedObservation: addExperiment(existing.skippedObservation, current.id) } : {}),
  }))
  const nextExperiment = () => {
    const next = experiments[experimentIndex + 1]
    if (next) update({ experimentId: next.id, phase: 'predict' })
  }

  return <section className="race-guided-lab" aria-labelledby="race-guided-lab-title">
    <div><span className="mini-label">Lab chạy được trên Windows</span><h3 id="race-guided-lab-title">Tự dự đoán, chạy và đối chiếu từng tình huống</h3><p>Code ở đây là local simulation. Mỗi experiment chỉ mở lời giải thích sau khi bạn đã có cơ hội tự dự đoán và quan sát.</p></div>
    <div className="race-lab-setup" dangerouslySetInnerHTML={{ __html: setupHtml }} />
    <p className="race-lab-status" aria-live="polite"><strong>Tiến độ ghi nhận trên thiết bị này:</strong> đã xem {status.viewed}/4 · còn ghi dự đoán {status.attempted}/4 · còn ghi observation {status.recorded}/4 · tự báo cáo đã chạy C# {status.selfReportedExecution}/4. Xóa ghi chú sẽ cập nhật lại hai số giữa. Đây là ghi chú học tập, không phải verified mastery.</p>
    <section className="race-lab-workflow" aria-live="polite" data-experiment={current.id} data-phase={progress.phase}>
      <header><span className="mini-label">Experiment {experimentIndex + 1} / {experiments.length}</span><strong>{phaseCopy[progress.phase]}</strong></header>
      {progress.phase === 'predict' && <><div dangerouslySetInnerHTML={{ __html: current.questionHtml }} /><label>Dự đoán của bạn <small>(không chấm điểm; một ý ngắn là đủ)</small><textarea value={prediction} onChange={event => setNote('predictions', event.target.value)} placeholder="Ví dụ: điều gì xảy ra với hai request?" /></label><div className="race-lab-actions"><button className="primary-button" disabled={!prediction.trim()} onClick={() => moveToRun()}>Sang bước chạy</button><button className="secondary-button" onClick={() => moveToRun(true)}>Bỏ qua dự đoán</button></div></>}
      {progress.phase === 'run' && <><p>Chạy `dotnet run` với input hiện tại. Đừng mở đáp án ở bước này; chỉ nhìn các dòng mà chương trình in ra.</p><div className="race-lab-actions"><button className="primary-button" onClick={() => moveToInspect(true)}>Tôi đã chạy C# lab <span className="sr-only">(tự báo cáo)</span></button><button className="secondary-button" onClick={() => moveToInspect()}>Tôi chỉ đọc hoặc inspect output</button></div></>}
      {progress.phase === 'inspect' && <><p>Ghi ba evidence bạn vừa thấy: số request được approve, tổng amount approved và final balance. Ba số này giúp phân biệt “balance trông ổn” với rule thật sự còn đúng.</p><label>Observation của bạn <small>(ghi chú local, không dùng để auto-verify)</small><textarea value={observation} onChange={event => setNote('observations', event.target.value)} placeholder="approvedCount=..., approvedAmount=..., finalBalance=..." /></label><div className="race-lab-actions"><button className="primary-button" disabled={!observation.trim()} onClick={() => moveToReveal()}>Mở đối chiếu và giải thích</button><button className="secondary-button" onClick={() => moveToReveal(true)}>Bỏ qua ghi chú</button></div></>}
      {progress.phase === 'reveal' && <><div className="race-lab-reveal-copy" dangerouslySetInnerHTML={{ __html: current.revealHtml }} /><aside className="race-lab-feedback"><strong>Đối chiếu ghi chú của bạn</strong>{prediction.trim() ? <p>Dự đoán: “{prediction}”</p> : <p>Bạn đã bỏ qua dự đoán ở experiment này.</p>}{observation.trim() ? <p>Observation: “{observation}”</p> : <p>Bạn chưa ghi observation ở experiment này.</p>}<p><strong>Điểm cần so sánh:</strong> {differenceHints[current.id]}</p></aside>{experimentIndex < experiments.length - 1 ? <button className="primary-button" onClick={nextExperiment}>Sang experiment tiếp theo</button> : <p className="race-lab-complete">Bạn đã đi qua bốn tình huống. Phần trạng thái phía trên phân biệt rõ nội dung đã xem, attempt/observation được ghi và execution do bạn tự báo cáo; không mục nào tự chứng minh mastery.</p>}</>}
    </section>
  </section>
}
