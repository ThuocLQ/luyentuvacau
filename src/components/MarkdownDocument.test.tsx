import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import MarkdownDocument from './MarkdownDocument'
import IndexGoldenLesson from './learning/index/IndexGoldenLesson'
import TableScanVsIndexVisual from './learning/index/TableScanVsIndexVisual'
import CompositeIndexVisual from './learning/index/CompositeIndexVisual'
import PlannerEstimateVisual from './learning/index/PlannerEstimateVisual'
import ExecutionPlanFlowVisual from './learning/index/ExecutionPlanFlowVisual'
import RaceGoldenLesson from './learning/race/RaceGoldenLesson'
import raceLesson from '../../docs/learning/race-condition.md?raw'
import indexLesson from '../../docs/learning/index-execution-plan.md?raw'

vi.mock('../hooks/useReviewProgress', () => ({ useReviewProgress: () => ({ find: () => undefined, pin: vi.fn(), record: vi.fn(), remove: vi.fn() }) }))
vi.mock('../hooks/useScrollSpy', () => ({ useScrollSpy: () => null }))
vi.mock('./document/DocumentToc', () => ({ default: () => null }))
vi.mock('./TermTooltip', () => ({ default: () => null }))

const base = { section: 'Learning Lab', order: 1, readingMinutes: 10, tags: [], interviewFrequency: 'Common' as const, expectedDepth: 'Strong' as const, status: 'Complete' as const, description: 'Test lesson', content: '# Test\n\nNội dung' }
beforeEach(() => { window.scrollTo = vi.fn() })
afterEach(cleanup)

describe('Golden Learning Lab visuals', () => {
  it('progresses, predicts and resets the Index B-tree trace', () => {
    render(<IndexGoldenLesson stage="btree" />)
    fireEvent.click(screen.getByLabelText('31–60'))
    expect(screen.getByText(/Đúng. Bây giờ reveal/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(screen.getByText(/Step 2: Node 31–60/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByText(/42 thuộc root branch nào/)).toBeInTheDocument()
  })

  it('teaches scan qualifiers as metadata instead of execution-plan nodes', () => {
    render(<ExecutionPlanFlowVisual />)
    expect(screen.getByTestId('scan-node')).toHaveTextContent('Seq Scan on orders')
    expect(screen.getByText(/Filter: tenant_id = 42/)).toBeInTheDocument()
    const baselineOperators = screen.getByRole('list', { name: 'baseline plan operators' })
    expect(within(baselineOperators).getByText('Sort')).toBeInTheDocument()
    expect(within(baselineOperators).getByText('Limit 20')).toBeInTheDocument()
    expect(within(baselineOperators).queryByText(/Filter:/)).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'After Index' }))
    expect(screen.getByTestId('scan-node')).toHaveTextContent('Index Scan on orders')
    expect(screen.getByText(/Index Cond: tenant_id = 42/)).toBeInTheDocument()
    const indexedOperators = screen.getByRole('list', { name: 'index plan operators' })
    expect(within(indexedOperators).getByText('Limit 20')).toBeInTheDocument()
    expect(within(indexedOperators).queryByText(/Index Cond:/)).not.toBeInTheDocument()
  })

  it('separates selectivity from cardinality-estimate accuracy', () => {
    const { container } = render(<PlannerEstimateVisual />)
    fireEvent.click(screen.getByRole('button', { name: 'Paid = 82%' }))
    expect(screen.getByText('Planner estimate (minh họa)')).toBeInTheDocument()
    expect(screen.getByText('810,000 rows')).toBeInTheDocument()
    expect(screen.queryByText(/estimate 4,000 rows/)).not.toBeInTheDocument()
    expect(container.querySelector('.estimate-track')?.textContent).toBe('')

    fireEvent.click(screen.getByRole('button', { name: 'Estimate accuracy' }))
    fireEvent.click(screen.getByRole('button', { name: 'Bad estimate' }))
    expect(screen.getAllByText('4,000 rows')).toHaveLength(2)
    expect(screen.getAllByText('82,000 rows')).toHaveLength(2)
  })

  it('uses a horizontal semantic label chip rather than vertical body text', () => {
    render(<MemoryRouter><MarkdownDocument doc={{ ...base, slug: 'semantic-chip', title: 'Semantic chip', content: '# Test\n\n:::learning-goal\nĐây là mục tiêu học.\n:::' }} /></MemoryRouter>)
    const block = document.querySelector('.semantic-block')
    expect(block).toHaveAttribute('data-label', 'learning goal')
    expect(block).toHaveClass('semantic-label-horizontal')
    expect(block).not.toHaveClass('semantic-label-vertical')
  })
  it('keeps the table-scan visual focused on candidate work, not page I/O', () => {
    render(<TableScanVsIndexVisual />)
    expect(screen.queryByText(/Page considered/)).not.toBeInTheDocument()
    expect(screen.getByText('Rows considered')).toBeInTheDocument()
    expect(screen.getByText('Candidate rows')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Index theo tenant' })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Shortcut theo tenant' }))
    expect(screen.getByText('Rows considered')).toBeInTheDocument()
  })

  it('shows the equal-prefix composite range contiguously and explains missing leading keys', () => {
    render(<CompositeIndexVisual />)
    const selectedRows = screen.getAllByTestId('paid-range')
    expect(selectedRows).toHaveLength(3)
    expect(selectedRows.map(row => row.dataset.rangeIndex)).toEqual(['1', '2', '3'])
    fireEvent.click(screen.getByRole('button', { name: 'created_at only' }))
    expect(screen.getByText(/key này được sắp toàn cục theo tenant trước/)).toBeInTheDocument()
  })

  it('traces, predicts and resets the Race interleaving with a visible invariant', () => {
    render(<RaceGoldenLesson stage="interleaving" />)
    expect(screen.getByText(/Invariant còn đúng/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(screen.getByText(/Cả A và B đều đọc 100/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()
    fireEvent.click(screen.getByLabelText(/Cả hai có thể được chấp nhận/))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(screen.getByText(/Invariant bị vi phạm/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByText(/Approved 0 \/ 100/)).toBeInTheDocument()
  })

  it('switches Race protection and multi-instance boundary modes', () => {
    render(<><RaceGoldenLesson stage="protection" /><RaceGoldenLesson stage="boundary" /></>)
    fireEvent.click(screen.getByRole('button', { name: '`lock` trong một process' }))
    expect(screen.getByText(/wait: same lock is held/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Hai instance' }))
    expect(screen.getByText(/gateB chỉ sống trong B/)).toBeInTheDocument()
  })

  it('renders Race markers while Learning Quick stays absent', () => {
    render(<MemoryRouter><MarkdownDocument doc={{ ...base, slug: 'learning-race-condition', title: 'Race', contentKind: 'learning', content: `# Test\n\n{{RACE_VISUAL:interleaving}}\n\n{{RACE_VISUAL:protection}}\n\n{{RACE_VISUAL:boundary}}\n\n## Sau visual` }} /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: /Hai request có thể phá invariant/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Ôn nhanh' })).not.toBeInTheDocument()
  })

  it('renders a Learning document without a registered visual normally', () => {
    render(<MemoryRouter><MarkdownDocument doc={{ ...base, slug: 'learning-no-visual', title: 'No visual', contentKind: 'learning', content: '# No visual\n\nNội dung học vẫn hiển thị.' }} /></MemoryRouter>)
    expect(screen.getByText('Nội dung học vẫn hiển thị.')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Ôn nhanh' })).not.toBeInTheDocument()
  })

  it('keeps Index as the broad idea and B-tree as the PostgreSQL 17 strategy', () => {
    expect(indexLesson).toContain('Index là khái niệm rộng')
    expect(indexLesson).toContain('**B-tree** là chiến lược Index cụ thể')
    expect(indexLesson).toContain('PostgreSQL 17, `CREATE INDEX` mặc định tạo B-tree')
  })

  it('maps the scan visual to PostgreSQL evidence without treating emitted rows as examined rows', () => {
    expect(indexLesson).toContain('`Rows Removed by Filter`')
    expect(indexLesson).toContain('actual rows mà scan node emit')
    expect(indexLesson).toContain('`actual rows` là output của scan node sau filtering')
  })

  it('removes the Limit confounder when the lab isolates estimate accuracy', () => {
    const estimateExperiment = indexLesson.split('### Experiment 3')[1].split('### Experiment 4')[0]
    const estimateSql = estimateExperiment.match(/```sql\n([\s\S]*?)```/)?.[1] ?? ''
    expect(estimateSql).toContain('SELECT id, created_at, total')
    expect(estimateExperiment).toContain('cô lập một câu hỏi duy nhất')
    expect(estimateSql).not.toContain('LIMIT')
    expect(estimateSql).not.toContain('ORDER BY')
  })

  it('introduces buffers before BUFFERS evidence and p95 only in the production story', () => {
    const productionStory = indexLesson.indexOf('## Production story')
    const beforeProduction = indexLesson.slice(0, productionStory)
    expect(indexLesson.indexOf('shared buffers')).toBeLessThan(indexLesson.indexOf('### Experiment 3'))
    expect(beforeProduction).not.toContain('p95')
    expect(indexLesson).toContain('100 ms, 110 ms, 120 ms')
    expect(indexLesson).toContain('youtube.com/watch?v=YZSHpDn7GP4')
  })
  it('keeps ordered lookup as B-tree-specific in the final recall and summary', () => {
    const finalRecall = indexLesson.split('## Final recall')[1]
    expect(finalRecall).toContain('B-tree index trong bài này dùng property nào')
    expect(finalRecall).toContain('B-tree index trong bài này dùng key có thứ tự')
  })

  it('uses p95 as a percentile threshold rather than claiming average always hides tail latency', () => {
    const productionStory = indexLesson.split('## Production story')[1].split('## Trade-off')[0]
    expect(productionStory).toContain('average duy nhất không mô tả được toàn bộ distribution')
    expect(productionStory).toContain('95% request hoàn thành không chậm hơn mốc nào')
  })
  it('keeps the source map internal rather than exposing a dead learner link', () => {
    expect(raceLesson).not.toContain('/docs/research/race-condition-source-map')
  })

  it('keeps Quick mode available for reference Markdown', () => {
    render(<MemoryRouter><MarkdownDocument doc={{ ...base, slug: 'reference-test', title: 'Reference', contentKind: 'reference' }} /></MemoryRouter>)
    expect(screen.getByRole('button', { name: 'Ôn nhanh' })).toBeInTheDocument()
  })
})
