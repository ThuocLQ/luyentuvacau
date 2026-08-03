import { useEffect, useState, type RefObject } from 'react'

interface ScrollSpyOptions {
  selector: string
  root?: RefObject<HTMLElement | null>
  contentKey?: string
  enabled?: boolean
}

export function useScrollSpy({ selector, root, contentKey, enabled = true }: ScrollSpyOptions) {
  const [activeId, setActiveId] = useState<string | null>(null)
  useEffect(() => {
    if (!enabled) {
      setActiveId(null)
      return
    }
    const headings = [...(root?.current ?? document).querySelectorAll<HTMLElement>(selector)]
    if (!headings.length) return
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]?.target.id) setActiveId(visible[0].target.id)
    }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, .1, .6] })
    headings.forEach(heading => observer.observe(heading))
    return () => observer.disconnect()
  }, [selector, root, contentKey, enabled])
  return activeId
}
