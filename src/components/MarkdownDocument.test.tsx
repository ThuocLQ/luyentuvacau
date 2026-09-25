import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import MarkdownDocument from './MarkdownDocument'
import IndexGoldenLesson from './learning/index/IndexGoldenLesson'

vi.mock('../hooks/useReviewProgress', () => ({ useReviewProgress: () => ({ find: () => undefined, pin: vi.fn(), record: vi.fn(), remove: vi.fn() }) }))
vi.mock('../hooks/useScrollSpy', () => ({ useScrollSpy: () => null }))
vi.mock('./document/DocumentToc', () => ({ default: () => null }))
vi.mock('./TermTooltip', () => ({ default: () => null }))

const base = {
  section: 'Learning Lab', order: 1, readingMinutes: 10, tags: [], interviewFrequency: 'Common' as const,
  expectedDepth: 'Strong' as const, status: 'Complete' as const, description: 'Test lesson', content: '# Test\n\nNội dung',
}

beforeEach(() => { window.scrollTo = vi.fn() })
afterEach(cleanup)

describe('Index Golden Learning Lesson', () => {
  it('lets the learner advance and reset the B-tree trace', () => {
    render(<IndexGoldenLesson />)
    expect(screen.getByText(/Step 1: Bắt đầu ở root/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Next step' }))
    expect(screen.getByText(/Step 2: Chọn nhánh 31–60/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByText(/Step 1: Bắt đầu ở root/)).toBeInTheDocument()
  })

  it('renders visuals for Index learning content while Quick mode stays absent', () => {
    render(<MemoryRouter><MarkdownDocument doc={{ ...base, slug: 'learning-index-execution-plan', title: 'Index', contentKind: 'learning', content: `# Test

{{INDEX_VISUAL:scan}}

## Sau visual` }} /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: /Table scan và targeted lookup/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Ôn nhanh' })).not.toBeInTheDocument()
  })

  it('keeps Quick mode available for reference Markdown', () => {
    render(<MemoryRouter><MarkdownDocument doc={{ ...base, slug: 'reference-test', title: 'Reference', contentKind: 'reference' }} /></MemoryRouter>)
    expect(screen.getByRole('button', { name: 'Ôn nhanh' })).toBeInTheDocument()
    expect(screen.queryByText(/Table scan và targeted lookup/i)).not.toBeInTheDocument()
  })
})