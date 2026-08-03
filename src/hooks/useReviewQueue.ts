import { useLocalStorage } from './useLocalStorage'

export interface ReviewItem {
  id: string
  kind: 'cheatsheet' | 'question' | 'quiz'
  title: string
  relatedDoc: string
  rating?: 'confident' | 'hesitant' | 'missed'
  updatedAt: string
}

export function useReviewQueue() {
  const [items, setItems] = useLocalStorage<ReviewItem[]>('ltvc-review-queue', [], (value): value is ReviewItem[] => Array.isArray(value) && value.every(item => typeof item === 'object' && item !== null && typeof item.id === 'string' && typeof item.relatedDoc === 'string'))
  const isQueued = (id: string) => items.some(item => item.id === id)
  const addOrUpdate = (item: Omit<ReviewItem, 'updatedAt'>) => setItems(current => {
    const next = { ...item, updatedAt: new Date().toISOString() }
    return current.some(entry => entry.id === item.id) ? current.map(entry => entry.id === item.id ? next : entry) : [...current, next]
  })
  const remove = (id: string) => setItems(current => current.filter(item => item.id !== id))
  return { items, isQueued, addOrUpdate, remove }
}
