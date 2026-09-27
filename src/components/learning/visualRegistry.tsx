import type { ReactNode } from 'react'
import IndexGoldenLesson, { type IndexVisualStage } from './index/IndexGoldenLesson'
import RaceGoldenLesson, { type RaceVisualStage } from './race/RaceGoldenLesson'
import OutboxGoldenLesson, { type OutboxVisualStage } from './outbox/OutboxGoldenLesson'

export const learningVisualRenderers: Partial<Record<string, (stage: string) => ReactNode>> = {
  'learning-index-execution-plan': stage => <IndexGoldenLesson stage={stage as IndexVisualStage} />,
  'learning-race-condition': stage => <RaceGoldenLesson stage={stage as RaceVisualStage} />,
  'learning-outbox-idempotency': stage => <OutboxGoldenLesson stage={stage as OutboxVisualStage} />,
}
