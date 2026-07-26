import { marked } from 'marked'

marked.setOptions({
  gfm: true,
  breaks: false
})

export function renderMarkdown(source: string): string {
  return marked.parse(source) as string
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
    toolbar.innerHTML = '<span>Code / Flow</span><button class="copy-button" type="button">Copy</button>'
    pre.parentNode?.insertBefore(wrapper, pre)
    wrapper.appendChild(toolbar)
    wrapper.appendChild(pre)
  })

  document.querySelectorAll('table').forEach((table) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'table-wrapper'
    table.parentNode?.insertBefore(wrapper, table)
    wrapper.appendChild(table)
  })

  return { html: document.body.innerHTML, toc }
}
