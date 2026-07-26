import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T, validate?: (value: unknown) => value is T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key)
      if (!saved) return initialValue
      const parsed: unknown = JSON.parse(saved)
      const isExpectedType = Array.isArray(initialValue) ? Array.isArray(parsed) : typeof parsed === typeof initialValue
      return (validate ? validate(parsed) : isExpectedType) ? parsed as T : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* private mode or quota: keep in-memory state */ }
  }, [key, value])

  return [value, setValue] as const
}
