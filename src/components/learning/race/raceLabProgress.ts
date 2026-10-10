export const RACE_LAB_PROGRESS_VERSION = 'race-lab-v1'
export const raceLabStorageKey = 'ltvc-race-lab-progress-v1'

export type RaceLabPhase = 'predict' | 'run' | 'inspect' | 'reveal'
export type RaceLabExperimentId = 'sequential' | 'unsafe' | 'controlled' | 'protected'

export interface RaceLabProgress {
  version: typeof RACE_LAB_PROGRESS_VERSION
  experimentId: RaceLabExperimentId
  phase: RaceLabPhase
  predictions: Partial<Record<RaceLabExperimentId, string>>
  observations: Partial<Record<RaceLabExperimentId, string>>
  viewed: RaceLabExperimentId[]
  attempted: RaceLabExperimentId[]
  recorded: RaceLabExperimentId[]
  selfReportedExecution: RaceLabExperimentId[]
  skippedPrediction: RaceLabExperimentId[]
  skippedObservation: RaceLabExperimentId[]
}

const experimentIds: RaceLabExperimentId[] = ['sequential', 'unsafe', 'controlled', 'protected']
const phases: RaceLabPhase[] = ['predict', 'run', 'inspect', 'reveal']

export const initialRaceLabProgress = (): RaceLabProgress => ({
  version: RACE_LAB_PROGRESS_VERSION,
  experimentId: 'sequential',
  phase: 'predict',
  predictions: {},
  observations: {},
  viewed: [],
  attempted: [],
  recorded: [],
  selfReportedExecution: [],
  skippedPrediction: [],
  skippedObservation: [],
})

export function isRaceLabProgress(value: unknown): value is RaceLabProgress {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const candidate = value as Partial<RaceLabProgress>
  const validIds = (items: unknown): items is RaceLabExperimentId[] => Array.isArray(items) && items.every(item => typeof item === 'string' && experimentIds.includes(item as RaceLabExperimentId))
  const validNotes = (items: unknown) => !!items && typeof items === 'object' && !Array.isArray(items) && Object.values(items).every(item => typeof item === 'string')
  return candidate.version === RACE_LAB_PROGRESS_VERSION
    && typeof candidate.experimentId === 'string' && experimentIds.includes(candidate.experimentId as RaceLabExperimentId)
    && typeof candidate.phase === 'string' && phases.includes(candidate.phase as RaceLabPhase)
    && validNotes(candidate.predictions) && validNotes(candidate.observations)
    && validIds(candidate.viewed) && validIds(candidate.attempted) && validIds(candidate.recorded)
    && validIds(candidate.selfReportedExecution) && validIds(candidate.skippedPrediction) && validIds(candidate.skippedObservation)
}

export function addExperiment(items: RaceLabExperimentId[], id: RaceLabExperimentId) {
  return items.includes(id) ? items : [...items, id]
}
