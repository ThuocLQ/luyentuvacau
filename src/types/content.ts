export type InterviewWeight = 'Critical' | 'High' | 'Medium' | 'Specialized'
export type ContentStatus = 'Draft' | 'Review' | 'Complete'

export interface CheatsheetMeta {
  slug: string
  title: string
  section: string
  order: number
  description: string
  readingMinutes: number
  tags: string[]
  interviewWeight: InterviewWeight
  status: ContentStatus
  content?: string
}

export interface InterviewQuestion {
  id: string
  question: string
  topic: string
  difficulty: 'Senior' | 'Lead'
  shortAnswer: string
  followUps: string[]
  redFlags: string[]
  relatedDoc: string
}
