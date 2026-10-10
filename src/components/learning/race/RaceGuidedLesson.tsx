import { useEffect, useRef, useState } from 'react'
import RaceGoldenLesson, { type RaceVisualStage } from './RaceGoldenLesson'
import RaceLabWorkflow from './RaceLabWorkflow'

export type RaceGuidedStep = 0 | 1 | 2 | 3 | 4 | 5

const steps: { id: string; label: string; shortLabel: string; title: string; prompt: string; action: string; evidence: string; visual: RaceVisualStage }[] = [
  { id: 'problem-predict', label: 'Bài toán và dự đoán', shortLabel: 'Bước 1 / 6 · Dự đoán', title: 'Hai request cùng nhìn 100 thì điều gì được phép xảy ra?', prompt: 'A rút 80, B rút 30. Mỗi request riêng đều có vẻ hợp lý; trước khi gọi tên lỗi, hãy dự đoán hệ thống có thể approve cả hai không.', action: 'Đi từng nhịp timeline. Ở câu prediction, chọn đáp án rồi mới reveal hai CHECK.', evidence: 'Rule cần giữ (invariant) là: tổng tiền được approve không vượt balance ban đầu 100.', visual: 'interleaving' },
  { id: 'observe-mechanism', label: 'Quan sát cơ chế', shortLabel: 'Bước 2 / 6 · Cơ chế', title: 'Lỗi không nằm ở riêng dòng WRITE', prompt: 'READ → CHECK → WRITE trông như một lần rút tiền, nhưng thật ra là nhiều bước. Mỗi request giữ một local snapshot riêng.', action: 'Quay lại hai READ và hai CHECK. Xác định lúc nào rule đã vỡ, trước hay sau WRITE cuối.', evidence: 'Theo dõi tổng tiền đã được approve cùng balance cuối. Balance cuối một mình có thể đánh lừa.', visual: 'interleaving' },
  { id: 'guided-practice', label: 'Chạy lab', shortLabel: 'Bước 3 / 6 · Chạy lab', title: 'Chạy reproduction có kiểm soát trên máy bạn', prompt: 'Đây là local simulation: Barrier chỉ ép interleaving để học, không phải production fix. Bạn không cần rời Guided View để chạy lab.', action: 'Tạo console app, chép Program.cs, chạy 80/30 rồi đổi đúng hai input thành 60/50. Đi lần lượt qua từng experiment.', evidence: 'Ghi số request được approve, tổng amount approved và balance cuối. Đừng dùng balance cuối một mình để kết luận.', visual: 'protection' },
  { id: 'break-debug', label: 'Debug từ evidence', shortLabel: 'Bước 4 / 6 · Debug', title: 'Final balance “trông ổn” vẫn chưa chứng minh đúng', prompt: 'Nếu production báo finalBalance=70 nhưng có hai reservation success, chỉ log balance cuối không đủ để giải thích chuyện gì đã xảy ra.', action: 'Viết candidate timeline (giả thuyết về thứ tự event): operation nào đọc gì, approve gì, write gì. Sau đó tìm operation ID, số row thay đổi ở nơi chốt rule và instance ID.', evidence: 'Success count và approved amount kiểm chứng invariant tốt hơn một snapshot cuối.', visual: 'protection' },
  { id: 'transfer-tradeoffs', label: 'Chuyển tình huống', shortLabel: 'Bước 5 / 6 · Boundary', title: 'Lock trong process không giải quyết nhiều instance', prompt: 'Bốn API instance cùng sửa một inventory row thì gate trong instance A không phối hợp với gate trong instance B.', action: 'Chuyển visual sang Hai instance. Chọn nơi thực sự chốt rule (source of truth): conditional update hoặc optimistic concurrency tại database tùy workflow.', evidence: 'Evidence ở boundary là số row update thực tế, order/reservation row và operation ID của provider khi có side effect.', visual: 'boundary' },
  { id: 'explain-recall', label: 'Giải thích và nhớ lại', shortLabel: 'Bước 6 / 6 · Giải thích', title: 'Giải thích bằng evidence, không chỉ bằng định nghĩa', prompt: 'Trong 60–120 giây, nói lại invariant, một interleaving sai, boundary đúng và evidence cần debug.', action: 'Tự ghi evidence L1–L4 dưới bài. English là track riêng: chỉ tự đánh giá sau khi bạn nói lại phần English explanation.', evidence: 'Với 60/50, unsafe vẫn approve 110 và final balance có thể 40 hoặc 50.', visual: 'boundary' },
]

interface Props { step: RaceGuidedStep; onStep: (step: RaceGuidedStep) => void; onStartPractice: () => void; labSetupHtml: string; labExperiments: { id: string; questionHtml: string; revealHtml: string }[]; contextHtml: string[]; afterVisualHtml: string }

export default function RaceGuidedLesson({ step, onStep, onStartPractice, labSetupHtml, labExperiments, contextHtml, afterVisualHtml }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [hasSeenRaceConclusion, setHasSeenRaceConclusion] = useState(false)
  const current = steps[step]
  const moveTo = (next: RaceGuidedStep) => onStep(next)

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
    headingRef.current?.scrollIntoView?.({ block: 'start', behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }, [step])

  return <section className="race-guided" data-layout-boundary aria-labelledby="race-guided-title">
    <div className="race-guided-header"><span className="mini-label">Học theo bước · {current.shortLabel}</span><h2 ref={headingRef} id="race-guided-title" tabIndex={-1}>{current.title}</h2><p>{current.prompt}</p></div>
    <div className="race-step-navigation"><span className="race-current-step" aria-live="polite">{current.shortLabel}</span><details className="race-stage-chooser"><summary>Chọn bước khác</summary><ol aria-label="Các bước Race Condition">{steps.map((item, index) => <li key={item.id} aria-current={index === step ? 'step' : undefined}><button onClick={() => moveTo(index as RaceGuidedStep)}>{index + 1}. {item.label}</button></li>)}</ol></details><ol className="race-stepper" aria-label="Tiến trình sáu bước Race Condition">{steps.map((item, index) => <li key={item.id} aria-current={index === step ? 'step' : undefined}><button aria-label={`Bước ${index + 1}: ${item.label}`} title={item.label} onClick={() => moveTo(index as RaceGuidedStep)}>{index + 1}</button></li>)}</ol></div>
    <div className="race-guided-action"><div><strong>Việc cần làm</strong><p>{current.action}</p></div><div><strong>Dấu hiệu cần nhìn</strong><p>{current.evidence}</p></div></div>
    {contextHtml[step] && <div className="race-guided-context" dangerouslySetInnerHTML={{ __html: contextHtml[step] }} />}
    {(['interleaving', 'protection', 'boundary'] as RaceVisualStage[]).map(visual => <div key={visual} hidden={visual !== current.visual}><RaceGoldenLesson stage={visual} onInterleavingConclusion={() => setHasSeenRaceConclusion(true)} onInterleavingReset={() => setHasSeenRaceConclusion(false)} /></div>)}
    {step === 1 && (hasSeenRaceConclusion ? <div className="race-guided-context" dangerouslySetInnerHTML={{ __html: afterVisualHtml }} /> : <p className="race-reveal-hint">Hãy dự đoán rồi xem đến nhịp CHECK của B. Phần giải thích đầy đủ sẽ mở sau khi bạn tự thấy invariant bị phá.</p>)}
    {step === 2 && <RaceLabWorkflow setupHtml={labSetupHtml} experiments={labExperiments} />}
    <div className="race-guided-controls"><button className="secondary-button" onClick={() => moveTo(Math.max(0, step - 1) as RaceGuidedStep)} disabled={step === 0}>Bước trước</button>{step < steps.length - 1 ? <button className="primary-button" onClick={() => moveTo((step + 1) as RaceGuidedStep)}>Tiếp tục</button> : <button className="primary-button" onClick={onStartPractice}>Bắt đầu bài luyện tập</button>}</div>
  </section>
}
