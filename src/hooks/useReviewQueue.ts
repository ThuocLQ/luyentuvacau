import { useMemo } from 'react'
import { useReviewProgress } from './useReviewProgress'
import type { ReviewItemKind, ReviewRating } from '../lib/review'

export interface ReviewItem {
  id: string
  kind: ReviewItemKind
  title: string
  relatedDoc: string
  rating?: ReviewRating
  updatedAt: string
  nextDueAt: string
}

/** Compatibility adapter: all practice types now persist in one review model. */
export function useReviewQueue() {
  const { progress, record, remove } = useReviewProgress()
  const items = useMemo(() => progress.map(item => ({ id: item.id, kind: item.kind, title: item.title ?? item.id, relatedDoc: item.relatedDoc ?? '', rating: item.lastRating, updatedAt: item.lastReviewedAt, nextDueAt: item.nextDueAt })), [progress])
  const isQueued = (id: string) => progress.some(item => item.id === id)
  const addOrUpdate = (item: Omit<ReviewItem, 'updatedAt' | 'nextDueAt'>) => record({ id: item.id, kind: item.kind, title: item.title, relatedDoc: item.relatedDoc }, item.rating ?? 'hesitant')
  return { items, isQueued, addOrUpdate, remove }
}