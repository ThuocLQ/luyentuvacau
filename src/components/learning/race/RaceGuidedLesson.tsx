import { useEffect, useRef } from 'react'
import RaceGoldenLesson, { type RaceVisualStage } from './RaceGoldenLesson'

export type RaceGuidedStep = 0 | 1 | 2 | 3 | 4 | 5

const steps: { id: string; label: string; shortLabel: string; title: string; prompt: string; action: string; evidence: string; visual: RaceVisualStage }[] = [
  { id: 'problem-predict', label: '1. Bài toán và dự đoán', shortLabel: '1 / 6 · Dự đoán', title: 'Hai request cùng nhìn 100 thì điều gì được phép xảy ra?', prompt: 'A rút 80, B rút 30. Mỗi request riêng đều có vẻ hợp lý; trước khi gọi tên lỗi, hãy dự đoán hệ thống có thể approve cả hai không.', action: 'Đi từng nhịp timeline. Ở câu prediction, chọn đáp án rồi mới reveal hai CHECK.', evidence: 'Invariant cần giữ là tổng withdrawal được approve không vượt balance ban đầu 100.', visual: 'interleaving' },
  { id: 'observe-mechanism', label: '2. Quan sát cơ chế', shortLabel: '2 / 6 · Cơ chế', title: 'Lỗi không nằm ở riêng dòng WRITE', prompt: 'READ → CHECK → WRITE trông như một lần rút tiền, nhưng thật ra là nhiều bước. Mỗi request giữ một local snapshot riêng.', action: 'Quay lại hai READ và hai CHECK. Xác định lúc nào rule đã vỡ, trước hay sau WRITE cuối.', evidence: 'Hai snapshot đều là 100; approvedAmount=110 là evidence trực tiếp, còn final balance có thể đánh lừa.', visual: 'interleaving' },
  { id: 'guided-practice', label: '3. Thực hành có hướng dẫn', shortLabel: '3 / 6 · Thực hành', title: 'Chạy reproduction có kiểm soát trên máy bạn', prompt: 'Đây là local simulation: Barrier chỉ ép interleaving để học, không phải production fix. Bạn không cần rời Guided View để chạy lab.', action: 'Tạo console app, chép Program.cs, chạy 80/30 rồi đổi đúng hai input thành 60/50. Đối chiếu ba dòng output.', evidence: 'Unsafe approve 2 request và amount=110; protected chỉ approve 1 request. Đừng dùng final balance một mình để kết luận.', visual: 'protection' },
  { id: 'break-debug', label: '4. Phá giả định và debug', shortLabel: '4 / 6 · Debug', title: 'Final balance “trông ổn” vẫn chưa chứng minh đúng', prompt: 'Nếu production báo finalBalance=70 nhưng có hai reservation success, chỉ log balance cuối không đủ để giải thích chuyện gì đã xảy ra.', action: 'Viết candidate timeline: operation nào đọc gì, approve gì, write gì. Sau đó tìm operation ID, số row thay đổi ở source of truth và instance ID.', evidence: 'Success count và approved amount kiểm chứng invariant tốt hơn một snapshot cuối.', visual: 'protection' },
  { id: 'transfer-tradeoffs', label: '5. Chuyển tình huống và trade-off', shortLabel: '5 / 6 · Boundary', title: 'Lock trong process không giải quyết nhiều instance', prompt: 'Bốn API instance cùng sửa một inventory row thì gate trong instance A không phối hợp với gate trong instance B.', action: 'Chuyển visual sang Hai instance. Chọn boundary giữ source of truth: conditional update hoặc optimistic concurrency tại database tùy workflow.', evidence: 'Evidence ở boundary là số row update thực tế, order/reservation row và operation ID của provider khi có side effect.', visual: 'boundary' },
  { id: 'explain-recall', label: '6. Giải thích và nhớ lại', shortLabel: '6 / 6 · Giải thích', title: 'Giải thích bằng evidence, không chỉ bằng định nghĩa', prompt: 'Trong 60–120 giây, nói lại invariant, một interleaving sai, boundary đúng và evidence cần debug.', action: 'Tự ghi evidence L1–L4 dưới bài. English là track riêng: chỉ tự đánh giá sau khi bạn nói lại phần English explanation.', evidence: 'Với 60/50, unsafe vẫn approve 110 và final balance có thể 40 hoặc 50.', visual: 'boundary' },
]

interface Props { step: RaceGuidedStep; onStep: (step: RaceGuidedStep) => void; onShowFull: () => void; labHtml: string; contextHtml: string[] }

export default function RaceGuidedLesson({ step, onStep, onShowFull, labHtml, contextHtml }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const current = steps[step]
  const moveTo = (next: RaceGuidedStep) => onStep(next)

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
    headingRef.current?.scrollIntoView?.({ block: 'start', behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }, [step])

  return <section className="race-guided" aria-labelledby="race-guided-title">
    <div className="race-guided-header"><span className="mini-label">Học theo bước · {current.shortLabel}</span><h2 ref={headingRef} id="race-guided-title" tabIndex={-1}>{current.title}</h2><p>{current.prompt}</p></div>
    <div className="race-step-navigation"><span className="race-current-step" aria-live="polite">{current.shortLabel}</span><details className="race-stage-chooser"><summary>Chọn bước khác</summary><ol aria-label="Các bước Race Condition">{steps.map((item, index) => <li key={item.id} aria-current={index === step ? 'step' : undefined}><button onClick={() => moveTo(index as RaceGuidedStep)}>{item.label}</button></li>)}</ol></details><ol className="race-stepper" aria-label="Các bước Race Condition">{steps.map((item, index) => <li key={item.id} aria-current={index === step ? 'step' : undefined}><button onClick={() => moveTo(index as RaceGuidedStep)}>{item.label}</button></li>)}</ol></div>
    <div className="race-guided-action"><strong>Việc cần làm</strong><p>{current.action}</p><strong>Evidence cần nhìn</strong><p>{current.evidence}</p></div>
    {contextHtml[step] && <div className="race-guided-context" dangerouslySetInnerHTML={{ __html: contextHtml[step] }} />}
    {(['interleaving', 'protection', 'boundary'] as RaceVisualStage[]).map(visual => <div key={visual} hidden={visual !== current.visual}><RaceGoldenLesson stage={visual} /></div>)}
    {step === 2 && <section className="race-guided-lab" aria-labelledby="race-guided-lab-title"><div><span className="mini-label">Lab chạy được trên Windows</span><h3 id="race-guided-lab-title">Predict → Run → Inspect → Interpret</h3><p>Phần này lấy trực tiếp từ bài Race gốc. Nút <strong>Chép mã</strong> nằm ngay trên code block; không cần đổi sang Xem toàn bài.</p></div><div dangerouslySetInnerHTML={{ __html: labHtml }} /></section>}
    <div className="race-guided-controls"><button className="secondary-button" onClick={() => moveTo(Math.max(0, step - 1) as RaceGuidedStep)} disabled={step === 0}>Bước trước</button>{step < steps.length - 1 ? <button className="primary-button" onClick={() => moveTo((step + 1) as RaceGuidedStep)}>Tiếp tục</button> : <button className="primary-button" onClick={onShowFull}>Xem toàn bài</button>}</div>
  </section>
}
