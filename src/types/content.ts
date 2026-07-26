export type DocCategory = 'Backend' | 'Database' | 'Architecture' | 'Distributed' | 'Practice'

export interface DocMeta {
  slug: string
  title: string
  description: string
  category: DocCategory
  icon: string
  readingMinutes: number
  tags: string[]
  featured?: boolean
}

export interface SearchEntry {
  slug: string
  title: string
  description: string
  content: string
  category: string
  tags: string[]
}
