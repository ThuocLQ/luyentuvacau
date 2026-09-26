import RaceInterleavingVisual from './RaceInterleavingVisual'
import RaceProtectionVisual from './RaceProtectionVisual'
import RaceBoundaryVisual from './RaceBoundaryVisual'

export type RaceVisualStage = 'interleaving' | 'protection' | 'boundary'
export default function RaceGoldenLesson({ stage }: { stage?: RaceVisualStage }) {
  switch (stage) {
    case 'interleaving': return <RaceInterleavingVisual />
    case 'protection': return <RaceProtectionVisual />
    case 'boundary': return <RaceBoundaryVisual />
    default: return <section className="race-golden-lesson"><RaceInterleavingVisual /><RaceProtectionVisual /><RaceBoundaryVisual /></section>
  }
}
