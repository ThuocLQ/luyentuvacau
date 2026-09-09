export type InterviewFrequency = 'AlmostAlways' | 'Common' | 'RoleDependent' | 'Specialized'
export type ExpectedDepth = 'Foundation' | 'Strong' | 'Deep'
export type ContentStatus = 'Draft' | 'Review' | 'Complete'

export interface CheatsheetMeta {
  slug: string
  title: string
  section: string
  order: number
  description: string
  readingMinutes: number
  tags: string[]
  interviewFrequency: InterviewFrequency
  expectedDepth: ExpectedDepth
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

export interface GlossaryTerm {
  id: string
  term: string
  shortDefinition: string
  explanation?: string
  example?: string
  relatedTerms?: string[]
  relatedDocs?: string[]
  aliases?: string[]
}
