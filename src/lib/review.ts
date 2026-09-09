export type ReviewItemKind = 'quiz' | 'question' | 'cheatsheet'
export type ReviewRating = 'missed' | 'hesitant' | 'confident'

export interface ReviewProgress {
  id: string
  kind: ReviewItemKind
  attempts: number
  confidenceStreak: number
  lastRating: ReviewRating
  lastReviewedAt: string
  nextDueAt: string
  manualPin?: boolean
  relatedDoc?: string
  title?: string
}

const DAY_MS = 24 * 60 * 60 * 1000

export function nextReviewAt(rating: ReviewRating, confidenceStreak: number, now = Date.now()) {
  const days = rating === 'missed' ? 1 : rating === 'hesitant' ? 3 : confidenceStreak >= 3 ? 30 : confidenceStreak >= 2 ? 14 : 7
  return new Date(now + days * DAY_MS).toISOString()
}

export function nextConfidenceStreak(previous: Pick<ReviewProgress, 'lastRating' | 'confidenceStreak'> | undefined, rating: ReviewRating) {
  if (rating !== 'confident') return 0
  return previous?.lastRating === 'confident' ? previous.confidenceStreak + 1 : 1
}

export function formatReviewReason(progress: ReviewProgress, now = Date.now()) {
  if (progress.manualPin) return 'Bạn đã ghim để ôn ngay'
  if (Date.parse(progress.nextDueAt) <= now) return progress.lastRating === 'missed' ? 'Đã đến hạn sau lần chưa chắc' : 'Đã đến lịch ôn lại'
  if (progress.lastRating === 'missed') return 'Cần củng cố sau lần chưa chắc'
  if (progress.lastRating === 'hesitant') return 'Cần ôn lại để bớt lưỡng lự'
  return 'Đã lên lịch nhắc lại'
}

export function isReviewProgress(value: unknown): value is ReviewProgress {
  if (typeof value !== 'object' || value === null) return false
  const item = value as Record<string, unknown>
  return typeof item.id === 'string' && (item.kind === 'quiz' || item.kind === 'question' || item.kind === 'cheatsheet')
    && typeof item.attempts === 'number' && Number.isFinite(item.attempts) && item.attempts >= 0
    && typeof item.confidenceStreak === 'number' && Number.isFinite(item.confidenceStreak) && item.confidenceStreak >= 0
    && (item.lastRating === 'missed' || item.lastRating === 'hesitant' || item.lastRating === 'confident')
    && typeof item.lastReviewedAt === 'string' && !Number.isNaN(Date.parse(item.lastReviewedAt))
    && typeof item.nextDueAt === 'string' && !Number.isNaN(Date.parse(item.nextDueAt))
    && (item.manualPin === undefined || typeof item.manualPin === 'boolean')
    && (item.relatedDoc === undefined || typeof item.relatedDoc === 'string')
    && (item.title === undefined || typeof item.title === 'string')
}
