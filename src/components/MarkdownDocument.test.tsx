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
import OutboxGoldenLesson from './learning/outbox/OutboxGoldenLesson'
import { findCompleteDoc } from '../data/docs'
import { parseRaceGuidedContent, parseRaceGuidedLab } from '../utils/raceGuidedContent'
import raceLesson from '../../docs/learning/race-condition.md?raw'
import indexLesson from '../../docs/learning/index-execution-plan.md?raw'
import outboxLesson from '../../docs/learning/outbox-idempotency.md?raw'

vi.mock('../hooks/useReviewProgress', () => ({ useReviewProgress: () => ({ find: () => undefined, pin: vi.fn(), record: vi.fn(), remove: vi.fn() }) }))
vi.mock('../hooks/useScrollSpy', () => ({ useScrollSpy: () => null }))
vi.mock('./document/DocumentToc', () => ({ default: () => null }))
vi.mock('./TermTooltip', () => ({ default: () => null }))

const base = { section: 'Learning Lab', order: 1, readingMinutes: 10, tags: [], interviewFrequency: 'Common' as const, expectedDepth: 'Strong' as const, status: 'Complete' as const, description: 'Test lesson', content: '# Test\n\nNội dung' }
beforeEach(() => { window.scrollTo = vi.fn(); window.localStorage.clear(); window.history.replaceState(null, '', '/') })
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

  it('traces, predicts and resets the Race interleaving without revealing the diagnosis early', () => {
    render(<RaceGoldenLesson stage="interleaving" />)
    expect(screen.getByText(/Chưa kết luận/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Xem bước tiếp' }))
    fireEvent.click(screen.getByRole('button', { name: 'Xem bước tiếp' }))
    expect(screen.getByText(/Cả A và B đều đọc 100/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Xem bước tiếp' })).toBeDisabled()
    fireEvent.click(screen.getByLabelText(/Cả hai có thể được chấp nhận/))
    expect(screen.getByText(/Đúng. Chọn Next để reveal hai CHECK/i)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Xem bước tiếp' }))
    fireEvent.click(screen.getByRole('button', { name: 'Xem bước tiếp' }))
    expect(screen.getByText(/Invariant bị vi phạm/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Làm lại' }))
    expect(screen.getByText(/Chưa kết luận/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Xem bước tiếp' }))
    fireEvent.click(screen.getByRole('button', { name: 'Xem bước tiếp' }))
    expect(screen.getByRole('button', { name: 'Xem bước tiếp' })).toBeDisabled()
  })

  it('keeps relay publish attempts separate from consumer deliveries', () => {
    render(<OutboxGoldenLesson stage="crash" />)
    fireEvent.click(screen.getByLabelText('Sau publish'))
    fireEvent.click(screen.getByLabelText('2 lần'))
    fireEvent.click(screen.getByRole('button', { name: 'Reveal state' }))
    const state = screen.getByLabelText('state after crash')
    expect(state).toHaveTextContent('#E17 Pending')
    expect(state).toHaveTextContent('Relay publish attempts1')
    expect(state).toHaveTextContent('Consumer deliveries0')
    expect(state).toHaveTextContent('ProcessedEventKhông có')
    expect(state).toHaveTextContent('Reservation count0')

    fireEvent.click(screen.getByRole('button', { name: 'Restart relay' }))
    expect(state).toHaveTextContent('Relay publish attempts2')
    expect(state).toHaveTextContent('Consumer deliveries0')
    fireEvent.click(screen.getByRole('button', { name: 'Deliver #E17 to consumer' }))
    expect(state).toHaveTextContent('Consumer deliveries1')
    expect(state).toHaveTextContent('ProcessedEvent#E17')
    expect(state).toHaveTextContent('Reservation count1')
    fireEvent.click(screen.getByRole('button', { name: 'Deliver same event again' }))
    expect(state).toHaveTextContent('Relay publish attempts2')
    expect(state).toHaveTextContent('Consumer deliveries2')
    expect(state).toHaveTextContent('ProcessedEvent#E17')
    expect(state).toHaveTextContent('Reservation count1')
    expect(state).not.toHaveTextContent('Broker deliveries')
  })
  it('switches Race protection and multi-instance boundary modes', () => {
    render(<><RaceGoldenLesson stage="protection" /><RaceGoldenLesson stage="boundary" /></>)
    fireEvent.click(screen.getByRole('button', { name: 'Dùng `lock` trong một process' }))
    expect(screen.getByText(/wait: same lock is held/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Hai instance' }))
    expect(screen.getByText(/gateB chỉ sống trong B/)).toBeInTheDocument()
  })

  it('renders Race markers while Learning Quick stays absent', () => {
    render(<MemoryRouter><MarkdownDocument doc={{ ...base, slug: 'learning-race-condition', title: 'Race', contentKind: 'learning', content: `# Test\n\n{{RACE_VISUAL:interleaving}}\n\n{{RACE_VISUAL:protection}}\n\n{{RACE_VISUAL:boundary}}\n\n## Sau visual` }} /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: /Hai request cùng đọc một balance/i })).toBeInTheDocument()
    expect(screen.queryByText(/\{\{RACE_VISUAL:/)).not.toBeInTheDocument()
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

  it('keeps scan evidence natural without treating returned rows as examined rows', () => {
    expect(indexLesson).toContain('`Rows Removed by Filter`')
    expect(indexLesson).toContain('actual rows mà scan node trả ra')
    expect(indexLesson).not.toContain('scan node emit')
    expect(indexLesson).not.toContain('row scan emit')
    expect(indexLesson).toContain('`actual rows` là output của scan node sau filtering')
  })

  it('explains workload at its first lesson use and keeps Race heading learner-first', () => {
    const firstWorkload = indexLesson.indexOf('workload')
    expect(indexLesson.slice(Math.max(0, firstWorkload - 80), firstWorkload + 120)).toContain('kiểu và lượng công việc thật hệ thống đang xử lý')
    expect(raceLesson).toContain('Optional observation — tranh cùng lock và phạm vi')
    expect(raceLesson).not.toContain('Optional observation — contention và scope')
  })

  it('keeps Outbox wording broker-neutral and honest about unqueryable email', () => {
    expect(outboxLesson).not.toContain('at-least-once delivery')
    expect(outboxLesson).toContain('Publication và delivery có thể lặp tùy broker/client contract')
    expect(outboxLesson).toContain('không thể đồng thời guarantee **không mất** và **không trùng** email')
  })
  it('removes the Limit confounder when the lab isolates estimate accuracy', () => {
    const estimateExperiment = indexLesson.split('### Experiment 3')[1].split('### Experiment 4')[0]
    const estimateSql = estimateExperiment.match(/```sql\r?\n([\s\S]*?)```/)?.[1] ?? ''
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

  it('renders the complete Golden Pilot with accessible visual controls', () => {
    window.localStorage.setItem('ltvc-race-view', JSON.stringify('full'))
    const raceDocument = findCompleteDoc('learning-race-condition')!
    if (!raceDocument.content) throw new Error('Golden Pilot route must have rendered content')
    render(<MemoryRouter><MarkdownDocument doc={{ ...raceDocument, content: raceDocument.content }} /></MemoryRouter>)
    expect(screen.getAllByRole('heading', { name: 'Race Condition & Concurrency — Golden Pilot' })).toHaveLength(1)
    expect(screen.getByRole('heading', { name: /Hai request cùng đọc một balance/i })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Chọn execution mode' })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Chọn số instance' })).toBeInTheDocument()
    expect(screen.getByText('Tự kiểm L1 đến L4')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Ôn nhanh' })).not.toBeInTheDocument()
  })

  it('guides Race one step at a time and can return to the complete lesson', () => {
    window.localStorage.setItem('ltvc-race-view', JSON.stringify('guided'))
    window.localStorage.setItem('ltvc-race-guided-step', JSON.stringify(0))
    const raceDocument = findCompleteDoc('learning-race-condition')!
    if (!raceDocument.content) throw new Error('Golden Pilot route must have rendered content')
    render(<MemoryRouter><MarkdownDocument doc={{ ...raceDocument, content: raceDocument.content }} /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: /Hai request cùng nhìn 100/i })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }))
    expect(screen.getByRole('heading', { name: /Lỗi không nằm ở.*dòng WRITE/i })).toBeInTheDocument()
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: /Lỗi không nằm ở.*dòng WRITE/i }))
    fireEvent.click(within(document.querySelector('.race-guided-controls')!).getByRole('button', { name: 'Bước trước' }))
    expect(screen.getByRole('heading', { name: /Hai request cùng nhìn 100/i })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Xem toàn bài' }))
    expect(screen.getByText('Tự chạy: cùng input, ba cách thực thi')).toBeInTheDocument()
    const technical = screen.getByLabelText('Technical mastery') as HTMLSelectElement
    expect(technical.value).toBe('1')
    fireEvent.click(screen.getByRole('checkbox', { name: /Nêu invariant/i }))
    expect(technical.value).toBe('1')
    expect(screen.getByText(/không tạo PASSED, MASTERED/i)).toBeInTheDocument()
  })

  it('keeps Guided content when learner-facing Race headings are renamed and rejects missing semantic blocks', () => {
    const renamed = raceLesson.replace('## Khi hai request dùng chung balance, điều gì xảy ra?', '## Một heading biên tập mới')
    expect(parseRaceGuidedContent(renamed).mechanism).toContain('shared mutable state')
    window.localStorage.setItem('ltvc-race-view', JSON.stringify('guided'))
    const raceDocument = findCompleteDoc('learning-race-condition')!
    render(<MemoryRouter><MarkdownDocument doc={{ ...raceDocument, content: renamed }} /></MemoryRouter>)
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }))
    expect(screen.getByText(/shared mutable state/)).toBeInTheDocument()
    expect(() => parseRaceGuidedContent(raceLesson.replace('<!-- QN_RACE_GUIDED:debug:END -->', ''))).toThrow(/debug semantic block/)
  })

  it('uses compact numbered step controls while retaining a named stage chooser', () => {
    window.localStorage.setItem('ltvc-race-view', JSON.stringify('guided'))
    const raceDocument = findCompleteDoc('learning-race-condition')!
    render(<MemoryRouter><MarkdownDocument doc={{ ...raceDocument, content: raceDocument.content! }} /></MemoryRouter>)
    expect(screen.getByRole('button', { name: 'Bước 1: Bài toán và dự đoán' })).toHaveTextContent('1')
    expect(screen.getByRole('button', { name: 'Bước 6: Giải thích và nhớ lại' })).toHaveTextContent('6')
    expect(screen.getByText('Chọn bước khác')).toBeInTheDocument()
  })

  it('keeps the runnable C# lab sequential and hides each output until the learner reveals it', () => {
    window.localStorage.setItem('ltvc-race-view', JSON.stringify('guided'))
    window.localStorage.setItem('ltvc-race-guided-step', JSON.stringify(2))
    const raceDocument = findCompleteDoc('learning-race-condition')!
    render(<MemoryRouter><MarkdownDocument doc={{ ...raceDocument, content: raceDocument.content! }} /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: /Chạy reproduction có kiểm soát/i })).toBeInTheDocument()
    expect(screen.getByText((_, element) => element?.tagName === 'CODE' && element.textContent?.includes('const int firstAmount = 80;') === true)).toBeInTheDocument()
    expect(screen.queryByText(/unsafe: approvedCount=2, approvedAmount=110, finalBalance=20 hoặc 70/)).not.toBeInTheDocument()
    fireEvent.change(screen.getByLabelText(/Dự đoán của bạn/), { target: { value: 'Sequential chỉ approve 80.' } })
    fireEvent.click(screen.getByRole('button', { name: 'Sang bước chạy' }))
    fireEvent.click(screen.getByRole('button', { name: /Tôi đã chạy C# lab/ }))
    fireEvent.change(screen.getByLabelText(/Observation của bạn/), { target: { value: 'Một request bị từ chối.' } })
    fireEvent.click(screen.getByRole('button', { name: 'Mở đối chiếu và giải thích' }))
    expect(screen.getAllByText(/sequential: approvedCount=1/)).toHaveLength(1)
    fireEvent.click(screen.getByRole('button', { name: 'Sang experiment tiếp theo' }))
    fireEvent.change(screen.getByLabelText(/Dự đoán của bạn/), { target: { value: 'Cả hai có thể approve.' } })
    fireEvent.click(screen.getByRole('button', { name: 'Sang bước chạy' }))
    fireEvent.click(screen.getByRole('button', { name: /Tôi đã chạy C# lab/ }))
    fireEvent.change(screen.getByLabelText(/Observation của bạn/), { target: { value: 'approvedAmount=110.' } })
    fireEvent.click(screen.getByRole('button', { name: 'Mở đối chiếu và giải thích' }))
    expect(screen.getByText(/unsafe: approvedCount=2, approvedAmount=110, finalBalance=20 hoặc 70/)).toBeInTheDocument()
    expect(screen.getByText(/firstAmount = 60/)).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Chép mã' }).length).toBeGreaterThan(0)
  })

  it('derives Guided lab composition from semantic markers in the canonical Race Markdown', () => {
    const lab = parseRaceGuidedLab(raceLesson)
    expect(lab.setup).toContain('const int firstAmount = 80;')
    expect(lab.experiments.map(experiment => experiment.id)).toEqual(['sequential', 'unsafe', 'controlled', 'protected'])
    expect(lab.experiments.every(experiment => experiment.question.length > 20 && experiment.reveal.length > 80)).toBe(true)
    expect(lab.experiments[0].question).not.toContain('approvedAmount=80')
    expect(lab.experiments[1].reveal).toContain('approvedAmount=110')
    expect(lab.setup).toContain('Console.WriteLine($"unsafe:')
    expect(lab.experiments[2].reveal).toContain('Console.WriteLine($"read: amount={amount}, current={current}");')
    expect(lab.experiments[2].reveal).toContain('thứ tự hai dòng không được hứa')
    expect(lab.experiments[2].reveal).toContain('Summary `unsafe` vẫn do code mẫu in ra')
    expect(lab.experiments.map(experiment => experiment.question).join('\n')).not.toContain('approvedAmount=110')
    expect(() => parseRaceGuidedLab(raceLesson.replace('<!-- QN_RACE_LAB:SETUP:START -->', ''))).toThrow(/SETUP/i)
    expect(() => parseRaceGuidedLab(raceLesson.replace('<!-- QN_RACE_LAB:EXPERIMENT:unsafe:REVEAL:END -->', ''))).toThrow(/unsafe/i)
  })

  it('keeps every essential canonical section in its intended Guided step without repeating the mental model', () => {
    window.localStorage.setItem('ltvc-race-view', JSON.stringify('guided'))
    const raceDocument = findCompleteDoc('learning-race-condition')!
    render(<MemoryRouter><MarkdownDocument doc={{ ...raceDocument, content: raceDocument.content! }} /></MemoryRouter>)

    const context = () => document.querySelector<HTMLElement>('.race-guided-context')!
    expect(within(context()).getByText(/balance = 100/)).toBeInTheDocument()
    expect(within(context()).getByText(/Rule nghiệp vụ/)).toBeInTheDocument()
    expect(within(context()).queryByText('Shared state là gì?')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }))
    expect(within(context()).getByText('Shared state là gì?')).toBeInTheDocument()
    expect(within(context()).queryByText(/Bây giờ mới gọi tên lỗi/)).not.toBeInTheDocument()
    expect(screen.getByText(/Hãy dự đoán rồi xem đến nhịp CHECK của B/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Xem bước tiếp' }))
    fireEvent.click(screen.getByRole('button', { name: 'Xem bước tiếp' }))
    fireEvent.click(screen.getByLabelText(/Cả hai có thể được chấp nhận/))
    fireEvent.click(screen.getByRole('button', { name: 'Xem bước tiếp' }))
    fireEvent.click(screen.getByRole('button', { name: 'Xem bước tiếp' }))
    const revealedExplanation = document.querySelectorAll<HTMLElement>('.race-guided-context')[1]!
    expect(within(revealedExplanation).queryByText('Shared state là gì?')).not.toBeInTheDocument()
    expect(within(revealedExplanation).getByText(/Bây giờ mới gọi tên lỗi/)).toBeInTheDocument()
    expect(revealedExplanation.querySelector('#interlocked-giai-quyet-dung-bai-toan-nao')).toBeInTheDocument()
    expect(revealedExplanation.querySelector('#async-khong-loai-race')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Làm lại' }))
    expect(screen.getByText(/Hãy dự đoán rồi xem đến nhịp CHECK của B/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }))
    expect(screen.getByRole('heading', { name: /Tự dự đoán, chạy và đối chiếu từng tình huống/i })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }))
    expect(within(context()).getByText(/Khi production có duplicate reservation/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }))
    expect(context().querySelector('#transfer-challenge')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }))
    expect(within(context()).getByText('Tự kiểm L1 đến L4')).toBeInTheDocument()
    expect(within(context()).getByText('Nhớ lại không nhìn đáp án')).toBeInTheDocument()
    expect(within(context()).getByText('Học thêm khi cần')).toBeInTheDocument()
  })

  it('preserves the guided step when switching to Full View and back', () => {
    window.localStorage.setItem('ltvc-race-view', JSON.stringify('guided'))
    window.localStorage.setItem('ltvc-race-guided-step', JSON.stringify(2))
    const raceDocument = findCompleteDoc('learning-race-condition')!
    render(<MemoryRouter><MarkdownDocument doc={{ ...raceDocument, content: raceDocument.content! }} /></MemoryRouter>)
    fireEvent.click(screen.getByRole('button', { name: 'Xem toàn bài' }))
    expect(screen.getByText('Tự chạy: cùng input, ba cách thực thi')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Học theo bước' }))
    expect(screen.getByRole('heading', { name: /Chạy reproduction có kiểm soát/i })).toBeInTheDocument()
  })

  it('opens a deep-linked Race lesson in Full View but lets the learner deliberately return to Guided View', () => {
    window.history.replaceState(null, '', '/docs/learning-race-condition#tu-chay-cung-input-ba-cach-thuc-thi')
    window.localStorage.setItem('ltvc-race-view', JSON.stringify('guided'))
    const raceDocument = findCompleteDoc('learning-race-condition')!
    render(<MemoryRouter><MarkdownDocument doc={{ ...raceDocument, content: raceDocument.content! }} /></MemoryRouter>)
    expect(screen.getByText('Tự chạy: cùng input, ba cách thực thi')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Học theo bước' }))
    expect(window.location.hash).toBe('')
    expect(screen.getByRole('heading', { name: /Hai request cùng nhìn 100/i })).toBeInTheDocument()
  })

  it('falls back to the first guided step when stored data is stale', () => {
    window.localStorage.setItem('ltvc-race-view', JSON.stringify('guided'))
    window.localStorage.setItem('ltvc-race-guided-step', JSON.stringify(99))
    const raceDocument = findCompleteDoc('learning-race-condition')!
    render(<MemoryRouter><MarkdownDocument doc={{ ...raceDocument, content: raceDocument.content! }} /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: /Hai request cùng nhìn 100/i })).toBeInTheDocument()
  })

  it('keeps the Golden Pilot race lab observable and separates L1–L4 from English evidence', () => {
    expect(raceLesson).toContain('unsafe: approvedCount=2, approvedAmount=110, finalBalance=20 hoặc 70')
    expect(raceLesson).toContain('const int firstAmount = 80;')
    expect(raceLesson).toContain('const int secondAmount = 30;')
    expect(raceLesson).toContain('unsafe: approvedCount=2, approvedAmount=110, finalBalance=40 hoặc 50')
    expect(raceLesson).not.toContain('approvedAmount=80, finalBalance={sequentialBalance}')
    expect(raceLesson).toContain('## Tự kiểm L1 đến L4')
    expect(raceLesson).toContain('**English short explanation:**')
    expect(raceLesson).toContain('Không có quiz hay completion nào tự unlock level.')
  })

  it('opens the dedicated Race practice from final Guided step and does not expose a manual completion status', () => {
    window.localStorage.setItem('ltvc-race-view', JSON.stringify('guided'))
    window.localStorage.setItem('ltvc-race-guided-step', JSON.stringify(5))
    const raceDocument = findCompleteDoc('learning-race-condition')!
    render(<MemoryRouter><MarkdownDocument doc={{ ...raceDocument, content: raceDocument.content! }} /></MemoryRouter>)
    expect(screen.getByRole('button', { name: 'Bắt đầu bài luyện tập' })).toBeInTheDocument()
    expect(screen.queryByLabelText('Trạng thái')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Bắt đầu bài luyện tập' }))
    expect(screen.getByRole('heading', { name: 'Kiểm tra evidence Race Condition' })).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Technical mastery'), { target: { value: '4' } })
    expect(screen.queryByRole('heading', { name: 'Đã thỏa yêu cầu bài luyện tập Race' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Next Lesson/i })).not.toBeInTheDocument()
  })

  it('keeps Quick mode available for reference Markdown', () => {
    render(<MemoryRouter><MarkdownDocument doc={{ ...base, slug: 'reference-test', title: 'Reference', contentKind: 'reference' }} /></MemoryRouter>)
    expect(screen.getByRole('button', { name: 'Ôn nhanh' })).toBeInTheDocument()
  })
})
