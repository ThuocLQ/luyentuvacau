import RaceGoldenLesson from './RaceGoldenLesson'

export type RaceGuidedStep = 0 | 1 | 2 | 3 | 4 | 5

const steps = [
  { id: 'problem-predict', label: '1. Problem & Predict', title: 'Hai request cùng nhìn 100 thì điều gì được phép xảy ra?', prompt: 'Đừng gọi tên race condition vội. Trước hết, dự đoán xem hai withdrawal 80 và 30 có thể cùng được approve không.', action: 'Đi qua timeline. Ở câu hỏi prediction, chọn một đáp án rồi mới bấm Next.', evidence: 'Quan sát Approved tăng thành 110 trước khi write cuối xảy ra.', visual: 'interleaving' as const },
  { id: 'observe-mechanism', label: '2. Observe & Mechanism', title: 'Lỗi không nằm ở một dòng WRITE', prompt: 'Mỗi request tự nó hợp lý, nhưng READ → CHECK → WRITE là một logical operation gồm nhiều bước.', action: 'Ở trace, quay lại hai READ và hai CHECK. Nêu invariant: tổng withdrawal approved không vượt balance ban đầu.', evidence: 'Hai local snapshot đều là 100; snapshot không tự cập nhật khi request còn lại write.', visual: 'interleaving' as const },
  { id: 'guided-practice', label: '3. Guided Practice', title: 'Chạy reproduction có kiểm soát trên máy bạn', prompt: 'Lab này là local simulation, không gọi database hay service ngoài. Barrier chỉ ép interleaving để học, không phải production fix.', action: 'Predict → chuyển sang Xem toàn bài để copy Program.cs → chạy `dotnet run` → đối chiếu sequential, unsafe, protected.', evidence: 'Với 80/30: unsafe approve 2 request, amount 110; final balance có thể là 20 hoặc 70.', visual: 'protection' as const },
  { id: 'break-debug', label: '4. Break & Debug', title: 'Final balance “trông ổn” vẫn không chứng minh đúng', prompt: 'Nếu production báo finalBalance=70 nhưng hai reservation success, điều gì cần giữ lại để debug?', action: 'Viết candidate timeline rồi kiểm tra operation ID, số row thay đổi tại source of truth và instance ID.', evidence: 'approved amount/success count là evidence trực tiếp cho invariant; chỉ final balance là không đủ.', visual: 'protection' as const },
  { id: 'transfer-tradeoffs', label: '5. Transfer & Trade-offs', title: 'Lock trong process không giải quyết nhiều instance', prompt: 'API có bốn instance và inventory nằm ở PostgreSQL: lock nào thật sự bảo vệ invariant?', action: 'So sánh local lock với conditional update hoặc optimistic concurrency tại database boundary.', evidence: 'Một process-local lock không phối hợp được giữa instance A và B.', visual: 'boundary' as const },
  { id: 'explain-recall', label: '6. Explain & Recall', title: 'Giải thích lại bằng evidence thay vì định nghĩa', prompt: 'Nói lại trong 60–120 giây: invariant, interleaving, boundary và evidence debug.', action: 'Tự chấm L1–L4 bằng criteria dưới bài. English track là phần riêng, không nâng technical level tự động.', evidence: 'Bạn có thể đổi 80/30 thành 60/50 và dự đoán unsafe 110, final 40 hoặc 50.', visual: 'boundary' as const },
]

interface Props { step: RaceGuidedStep; onStep: (step: RaceGuidedStep) => void; onShowFull: () => void }

export default function RaceGuidedLesson({ step, onStep, onShowFull }: Props) {
  const current = steps[step]
  return <section className="race-guided" aria-labelledby="race-guided-title">
    <div className="race-guided-header"><span className="mini-label">Guided learning · {current.label}</span><h2 id="race-guided-title">{current.title}</h2><p>{current.prompt}</p></div>
    <ol className="race-stepper" aria-label="Các bước Race Condition">{steps.map((item, index) => <li key={item.id} aria-current={index === step ? 'step' : undefined}><button onClick={() => onStep(index as RaceGuidedStep)}>{item.label}</button></li>)}</ol>
    <div className="race-guided-action"><strong>Việc cần làm</strong><p>{current.action}</p><strong>Evidence cần nhìn</strong><p>{current.evidence}</p>{step === 2 && <button className="secondary-button" onClick={onShowFull}>Xem code lab đầy đủ</button>}</div>
    <RaceGoldenLesson stage={current.visual} />
    <div className="race-guided-controls"><button className="secondary-button" onClick={() => onStep(Math.max(0, step - 1) as RaceGuidedStep)} disabled={step === 0}>Back</button>{step < steps.length - 1 ? <button className="primary-button" onClick={() => onStep((step + 1) as RaceGuidedStep)}>Continue</button> : <button className="primary-button" onClick={onShowFull}>Xem toàn bài & recall</button>}</div>
  </section>
}
