import OutboxCrashRecoveryVisual from './OutboxCrashRecoveryVisual'

export type OutboxVisualStage = 'crash'

export default function OutboxGoldenLesson({ stage }: { stage?: OutboxVisualStage }) {
  if (stage === 'crash') return <OutboxCrashRecoveryVisual />
  return <section className="outbox-golden-lesson"><OutboxCrashRecoveryVisual /></section>
}