import { marked, Renderer } from 'marked'
import { findGlossaryTerm } from '../data/glossary'

marked.setOptions({
  gfm: true,
  breaks: false
})

export function renderMarkdown(source: string): string {
  const renderer = new Renderer()
  renderer.html = () => ''
  const directives = source.replace(/^:::(concept|definition|must-remember|example|note|warning|production-trap|senior-signal|interview-answer|comparison|final-recall)\s*\n([\s\S]*?)^:::\s*$/gm, (_, type: string, body: string) => `> [!${type}]\n> ${body.trim().replace(/\n/g, '\n> ')}`)
  return marked.parse(directives, { renderer }) as string
}

export interface TocItem {
  id: string
  text: string
  level: number
}

export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function enhanceHtml(html: string): { html: string; toc: TocItem[] } {
  const parser = new DOMParser()
  const document = parser.parseFromString(html, 'text/html')
  const used = new Map<string, number>()
  const toc: TocItem[] = []

  document.querySelectorAll('h1, h2, h3').forEach((heading) => {
    const text = heading.textContent?.trim() || 'section'
    const base = slugify(text) || 'section'
    const count = used.get(base) || 0
    used.set(base, count + 1)
    const id = count === 0 ? base : `${base}-${count + 1}`
    heading.id = id
    toc.push({ id, text, level: Number(heading.tagName.slice(1)) })
  })

  document.querySelectorAll('pre').forEach((pre) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'code-block'
    const toolbar = document.createElement('div')
    toolbar.className = 'code-toolbar'
    toolbar.innerHTML = '<span>Mã / luồng xử lý</span><button class="copy-button" type="button">Chép mã</button>'
    pre.parentNode?.insertBefore(wrapper, pre)
    wrapper.appendChild(toolbar)
    wrapper.appendChild(pre)
  })

  document.querySelectorAll('blockquote').forEach((block) => {
    const first = block.querySelector('p')
    const marker = first?.textContent?.match(/^\[!([a-z-]+)\]\s*/)
    if (!marker || !first) return
    const type = marker[1]
    first.textContent = first.textContent?.replace(/^\[![a-z-]+\]\s*/, '') ?? ''
    block.classList.add('semantic-block', `semantic-${type}`)
    block.dataset.label = type.replace(/-/g, ' ')
  })

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const textNodes: Text[] = []
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text)
  textNodes.forEach((node) => {
    const parent = node.parentElement
    if (!parent || parent.closest('pre, code, a, button, .semantic-block')) return
    const value = node.textContent ?? ''
    if (!/\[\[[^\]]+\]\]/.test(value)) return
    const fragment = document.createDocumentFragment()
    let cursor = 0
    for (const match of value.matchAll(/\[\[([^\]]+)\]\]/g)) {
      const start = match.index ?? 0
      fragment.append(value.slice(cursor, start))
      const reference = match[1].trim()
      const term = findGlossaryTerm(reference)
      if (term) {
        const trigger = document.createElement('button')
        trigger.type = 'button'
        trigger.className = 'term-trigger'
        trigger.dataset.termId = term.id
        trigger.setAttribute('aria-describedby', `term-tooltip-${term.id}`)
        trigger.textContent = reference
        fragment.appendChild(trigger)
      } else fragment.append(reference)
      cursor = start + match[0].length
    }
    fragment.append(value.slice(cursor))
    node.parentNode?.replaceChild(fragment, node)
  })

  document.querySelectorAll('table').forEach((table) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'table-wrapper'
    table.parentNode?.insertBefore(wrapper, table)
    wrapper.appendChild(table)
  })

  document.querySelectorAll('a, img').forEach((node) => {
    const attribute = node.tagName === 'A' ? 'href' : 'src'
    const value = node.getAttribute(attribute)?.trim().toLowerCase()
    const isSafeLink = value && (/^(https?:|mailto:|#|\/)/.test(value))
    const isSafeImage = value && (/^(https?:|\/)/.test(value))
    if ((node.tagName === 'A' && !isSafeLink) || (node.tagName === 'IMG' && !isSafeImage)) node.removeAttribute(attribute)
  })

  return { html: document.body.innerHTML, toc }
}
