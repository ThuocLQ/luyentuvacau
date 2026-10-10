export type RaceLabExperiment = {
  id: 'sequential' | 'unsafe' | 'controlled' | 'protected'
  question: string
  reveal: string
}

const experimentIds: RaceLabExperiment['id'][] = ['sequential', 'unsafe', 'controlled', 'protected']

function block(source: string, name: string) {
  const startMarker = `<!-- QN_RACE_LAB:${name}:START -->`
  const endMarker = `<!-- QN_RACE_LAB:${name}:END -->`
  const start = source.indexOf(startMarker)
  const end = source.indexOf(endMarker)
  if (start < 0 || end < 0 || end <= start) throw new Error(`Race Guided Lab requires the ${name} semantic block.`)
  return { start, end, markdown: source.slice(start + startMarker.length, end).trim() }
}

// These comments are authoring boundaries, not learner-visible headings. They let
// Guided View survive wording edits to the canonical Vietnamese lesson.
export function parseRaceGuidedLab(source: string) {
  const setup = block(source, 'SETUP')
  const experiments = experimentIds.map(id => {
    const experiment = block(source, `EXPERIMENT:${id}`)
    const question = block(source, `EXPERIMENT:${id}:QUESTION`)
    const reveal = block(source, `EXPERIMENT:${id}:REVEAL`)
    if (question.start <= experiment.start || question.end >= experiment.end || reveal.start <= question.end || reveal.end >= experiment.end) throw new Error(`Race Guided Lab has invalid ${id} field boundaries.`)
    return { id, ...experiment, question: question.markdown, reveal: reveal.markdown }
  })
  const starts = [setup.start, ...experiments.map(experiment => experiment.start)]
  if (starts.some((value, index) => index > 0 && value <= starts[index - 1])) throw new Error('Race Guided Lab semantic blocks must stay in teaching order.')
  return { setup: setup.markdown, experiments: experiments.map(({ id, question, reveal }) => ({ id, question, reveal })) }
}
