import TableScanVsIndexVisual from './TableScanVsIndexVisual'
import BTreeLookupVisual from './BTreeLookupVisual'
import CompositeIndexVisual from './CompositeIndexVisual'
import PlannerEstimateVisual from './PlannerEstimateVisual'
import ExecutionPlanFlowVisual from './ExecutionPlanFlowVisual'

export type IndexVisualStage = 'scan' | 'btree' | 'composite' | 'planner' | 'plan'
export default function IndexGoldenLesson({ stage }: { stage?: IndexVisualStage }) {
  switch (stage) {
    case 'scan': return <TableScanVsIndexVisual />
    case 'btree': return <BTreeLookupVisual />
    case 'composite': return <CompositeIndexVisual />
    case 'planner': return <PlannerEstimateVisual />
    case 'plan': return <ExecutionPlanFlowVisual />
    default: return <section className="index-golden-lesson"><TableScanVsIndexVisual /><BTreeLookupVisual /><CompositeIndexVisual /><PlannerEstimateVisual /><ExecutionPlanFlowVisual /></section>
  }
}
