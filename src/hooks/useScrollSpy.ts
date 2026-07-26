import { useEffect, useState } from 'react'

export function useScrollSpy(selector: string, enabled = true) {
  const [activeId, setActiveId] = useState<string | null>(null)
  useEffect(() => {
    if (!enabled) return
    const headings = [...document.querySelectorAll<HTMLElement>(selector)]
    if (!headings.length) return
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]?.target.id) setActiveId(visible[0].target.id)
    }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, .1, .6] })
    headings.forEach(heading => observer.observe(heading))
    return () => observer.disconnect()
  }, [selector, enabled])
  return activeId
}
