import RaceInterleavingVisual from './RaceInterleavingVisual'
import RaceProtectionVisual from './RaceProtectionVisual'
import RaceBoundaryVisual from './RaceBoundaryVisual'

export type RaceVisualStage = 'interleaving' | 'protection' | 'boundary'
export default function RaceGoldenLesson({ stage, onInterleavingConclusion, onInterleavingReset }: { stage?: RaceVisualStage; onInterleavingConclusion?: () => void; onInterleavingReset?: () => void }) {
  switch (stage) {
    case 'interleaving': return <RaceInterleavingVisual onConclusion={onInterleavingConclusion} onReset={onInterleavingReset} />
    case 'protection': return <RaceProtectionVisual />
    case 'boundary': return <RaceBoundaryVisual />
    default: return <section className="race-golden-lesson"><RaceInterleavingVisual onConclusion={onInterleavingConclusion} onReset={onInterleavingReset} /><RaceProtectionVisual /><RaceBoundaryVisual /></section>
  }
}
