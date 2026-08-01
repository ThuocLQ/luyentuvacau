export type QuizType = 'decision' | 'unknown-outcome' | 'diagnosis' | 'boundary' | 'trade-off' | 'sequence' | 'evidence'
export type QuizVerdict = 'best' | 'unsafe' | 'incomplete' | 'overengineered'

export interface QuizOption {
  id: string
  text: string
  verdict: QuizVerdict
  rationale: string
  misconception?: string
}

export interface QuizFollowUp {
  changedConstraint: string
  prompt: string
  expectedDirection: string
}

export interface QuizQuestion {
  id: string
  version: number
  type: QuizType
  topic: string
  difficulty: 'Senior' | 'Lead'
  relatedDoc: string
  relatedSection: string
  scenario: string
  facts: string[]
  constraints: string[]
  prompt: string
  options: QuizOption[]
  correctOptionId: string
  explanation: string
  productionConsequence: string
  explanationDetail: {
    decision: string
    mechanism: string
    tradeOff: string
    failureMode: string
    evidence: string
  }
  recall: string[]
  followUp: QuizFollowUp
  tags: string[]
  relatedInterviewQuestion?: string
}
