export const RACE_ASSESSMENT_VERSION = 'race-atomicity-v4'

export type RaceAnswer = string | string[]
export interface RaceAttempt { questionId: string; answer: RaceAnswer; correct: boolean; submittedAt: string; provenance: 'automatically-checked' | 'self-reviewed' }
export interface RaceAssessmentState {
  version: typeof RACE_ASSESSMENT_VERSION
  currentQuestion: number
  answers: Record<string, RaceAnswer>
  attempts: RaceAttempt[]
  labObservation: string
  labConfirmed: boolean
  debugTimeline: string
  debugSelfReviewed: boolean
  debugRepairNote: string
  debugRepairSelfReviewed: boolean
}

export interface RaceQuestion {
  id: 'interleaving' | 'shared-state' | 'baseline' | 'variation' | 'debug-failure-repair' | 'transfer-boundary'
  level: 'L1' | 'L2' | 'L3' | 'L4'
  prompt: string
  type: 'single' | 'multiple'
  options: { id: string; label: string }[]
  correct: string[]
  explanation: string
  reviewStep: 0 | 1 | 2 | 3 | 4
}

export const raceQuestions: RaceQuestion[] = [
  { id: 'interleaving', level: 'L1', prompt: 'Điều nào cho phép cả A rút 80 và B rút 30 được approve khi balance ban đầu là 100?', type: 'single', options: [{ id: 'both-read', label: 'Cả hai READ 100 trước khi bất kỳ request nào WRITE.' }, { id: 'parallel', label: 'Chỉ cần có hai thread chạy song song.' }, { id: 'last-write', label: 'WRITE cuối luôn làm balance âm.' }], correct: ['both-read'], explanation: 'Điều cần chứng minh là interleaving: hai local snapshot đều là 100, nên cả hai CHECK đều accept.', reviewStep: 1 },
  { id: 'shared-state', level: 'L1', prompt: 'Chọn đúng hai evidence cần theo dõi để kiểm tra invariant withdrawal.', type: 'multiple', options: [{ id: 'balance', label: 'Balance/source-of-truth hiện tại.' }, { id: 'approved-total', label: 'Tổng approved amount hoặc số operation success.' }, { id: 'thread-name', label: 'Tên thread duy nhất.' }, { id: 'last-write', label: 'Chỉ final balance sau WRITE cuối.' }], correct: ['balance', 'approved-total'], explanation: 'Final balance một mình có thể che lost update. Cần state và tổng effect được approve để đối chiếu invariant.', reviewStep: 1 },
  { id: 'baseline', level: 'L2', prompt: 'Với input 80/30, dòng unsafe trong local lab cần cho evidence nào?', type: 'single', options: [{ id: '80-30', label: 'approvedCount=2, approvedAmount=110, finalBalance=20 hoặc 70.' }, { id: 'safe', label: 'approvedCount=1, approvedAmount=80, finalBalance=20.' }, { id: 'negative', label: 'finalBalance=-10 là evidence bắt buộc.' }], correct: ['80-30'], explanation: 'Approved amount 110 mới chứng minh invariant vỡ; hai final balance là hai WRITE order hợp lệ trong lab.', reviewStep: 2 },
  { id: 'variation', level: 'L2', prompt: 'Sau khi đổi đúng hai input thành 60/50, output unsafe nào đúng?', type: 'single', options: [{ id: '60-50', label: 'approvedCount=2, approvedAmount=110, finalBalance=40 hoặc 50.' }, { id: 'only-60', label: 'approvedCount=1, approvedAmount=60, finalBalance=40.' }, { id: 'always-40', label: 'approvedCount=2, approvedAmount=110, finalBalance luôn 40.' }], correct: ['60-50'], explanation: 'Hai request vẫn cùng approve 110; snapshot cũ khiến WRITE cuối có thể để lại 40 hoặc 50.', reviewStep: 2 },
  { id: 'debug-failure-repair', level: 'L3', prompt: 'Một Wallet sống trong memory có hai endpoint cùng sửa `balance`: `Reserve(80)` dùng `lock(reserveGate)`, còn `Withdraw(30)` dùng `lock(withdrawGate)`. Balance ban đầu là 100. Diagnosis + repair nào đúng?', type: 'single', options: [{ id: 'different-gates', label: 'Hai lock object khác nhau không loại trừ nhau; dùng cùng gate cho toàn bộ READ/CHECK/WRITE của state chung.' }, { id: 'write-only-gate', label: 'Mỗi endpoint đã có một lock nên hai code path không thể overlap.' }, { id: 'interlocked-only', label: 'Chỉ đổi assignment cuối sang `Interlocked.Decrement` là đủ cho invariant withdrawal.' }], correct: ['different-gates'], explanation: 'Tên có chữ lock không quan trọng: hai object khác nhau không phối hợp. Failure là hai code path cùng quyết định từ state cũ; với state in-process, cùng gate phải cover toàn bộ READ/CHECK/WRITE. Database hoặc nhiều instance cần correctness boundary khác.', reviewStep: 3 },
  { id: 'transfer-boundary', level: 'L4', prompt: 'Stretch: inventory sống ở database, API chạy bốn instance. Candidate nào giữ invariant gần source of truth nhất?', type: 'single', options: [{ id: 'database-boundary', label: 'Conditional update/transaction hoặc optimistic concurrency tại database boundary.' }, { id: 'local-lock', label: 'Một lock object trong mỗi API instance.' }, { id: 'semaphore', label: 'SemaphoreSlim chỉ để giới hạn số request.' }], correct: ['database-boundary'], explanation: 'L4 là enrichment: local lock và concurrency limit không phối hợp state giữa các instance.', reviewStep: 4 },
]

export const initialRaceAssessment = (): RaceAssessmentState => ({ version: RACE_ASSESSMENT_VERSION, currentQuestion: 0, answers: {}, attempts: [], labObservation: '', labConfirmed: false, debugTimeline: '', debugSelfReviewed: false, debugRepairNote: '', debugRepairSelfReviewed: false })

export function isRaceAssessmentState(value: unknown): value is RaceAssessmentState {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const candidate = value as Partial<RaceAssessmentState>
  return candidate.version === RACE_ASSESSMENT_VERSION
    && Number.isInteger(candidate.currentQuestion) && (candidate.currentQuestion ?? -1) >= 0 && (candidate.currentQuestion ?? 99) < raceQuestions.length
    && !!candidate.answers && typeof candidate.answers === 'object' && !Array.isArray(candidate.answers)
    && Array.isArray(candidate.attempts) && typeof candidate.labObservation === 'string' && typeof candidate.labConfirmed === 'boolean'
    && typeof candidate.debugTimeline === 'string' && typeof candidate.debugSelfReviewed === 'boolean'
    && typeof candidate.debugRepairNote === 'string' && typeof candidate.debugRepairSelfReviewed === 'boolean'
}

export function answersMatch(answer: RaceAnswer | undefined, expected: string[]) {
  const actual = (Array.isArray(answer) ? answer : answer ? [answer] : []).slice().sort()
  return actual.length === expected.length && actual.every((value, index) => value === expected.slice().sort()[index])
}

export function hasCorrectAttempt(state: RaceAssessmentState, questionId: RaceQuestion['id']) {
  return state.attempts.some(attempt => attempt.questionId === questionId && attempt.correct)
}

export function raceRequirements(state: RaceAssessmentState) {
  const l1 = hasCorrectAttempt(state, 'interleaving') && hasCorrectAttempt(state, 'shared-state')
  const l2 = hasCorrectAttempt(state, 'baseline') && hasCorrectAttempt(state, 'variation')
  const lab = state.labConfirmed && state.labObservation.trim().length >= 8
  const l3Checked = hasCorrectAttempt(state, 'debug-failure-repair')
  const l3TimelineRecorded = state.debugSelfReviewed && state.debugTimeline.trim().length > 0
  const l3RepairRecorded = state.debugRepairSelfReviewed && state.debugRepairNote.trim().length > 0
  return { l1, l2, lab, l3Checked, l3TimelineRecorded, l3RepairRecorded, satisfied: l1 && l2 && lab && l3Checked && l3TimelineRecorded && l3RepairRecorded }
}
