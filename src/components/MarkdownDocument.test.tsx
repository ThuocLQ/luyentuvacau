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
    render(<PlannerEstimateVisual />)
    fireEvent.click(screen.getByRole('button', { name: 'Paid = 82%' }))
    expect(screen.getByText(/illustrative estimate 810,000 rows/)).toBeInTheDocument()
    expect(screen.queryByText(/estimate 4,000 rows/)).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Estimate accuracy' }))
    fireEvent.click(screen.getByRole('button', { name: 'Bad estimate' }))
    expect(screen.getByText('4,000 rows')).toBeInTheDocument()
    expect(screen.getByText('82,000 rows')).toBeInTheDocument()
  })

  it('keeps the table-scan visual focused on candidate work, not page I/O', () => {
    render(<TableScanVsIndexVisual />)
    expect(screen.queryByText(/Page considered/)).not.toBeInTheDocument()
    expect(screen.getByText('Rows considered')).toBeInTheDocument()
    expect(screen.getByText('Candidate rows')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Index theo tenant' }))
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

  it('keeps the source map internal rather than exposing a dead learner link', () => {
    expect(raceLesson).not.toContain('/docs/research/race-condition-source-map')
  })

  it('keeps Quick mode available for reference Markdown', () => {
    render(<MemoryRouter><MarkdownDocument doc={{ ...base, slug: 'reference-test', title: 'Reference', contentKind: 'reference' }} /></MemoryRouter>)
    expect(screen.getByRole('button', { name: 'Ôn nhanh' })).toBeInTheDocument()
  })
})
