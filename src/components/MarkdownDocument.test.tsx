import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import MarkdownDocument from './MarkdownDocument'
import IndexGoldenLesson from './learning/index/IndexGoldenLesson'

vi.mock('../hooks/useReviewProgress', () => ({ useReviewProgress: () => ({ find: () => undefined, pin: vi.fn(), record: vi.fn(), remove: vi.fn() }) }))
vi.mock('../hooks/useScrollSpy', () => ({ useScrollSpy: () => null }))
vi.mock('./document/DocumentToc', () => ({ default: () => null }))
vi.mock('./TermTooltip', () => ({ default: () => null }))

const base = { section: 'Learning Lab', order: 1, readingMinutes: 10, tags: [], interviewFrequency: 'Common' as const, expectedDepth: 'Strong' as const, status: 'Complete' as const, description: 'Test lesson', content: '# Test\n\nNội dung' }
beforeEach(() => { window.scrollTo = vi.fn() })
afterEach(cleanup)

describe('Index Golden Learning Lesson', () => {
  it('progresses, predicts and resets the B-tree trace', () => {
    render(<IndexGoldenLesson stage="btree" />)
    fireEvent.click(screen.getByLabelText('31–60'))
    expect(screen.getByText(/Đúng. Bây giờ reveal/)).toBeInTheDocument()
    expect(screen.getByText(/Step 1: Root/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(screen.getByText(/Step 2: Node 31–60/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByText(/42 thuộc root branch nào/)).toBeInTheDocument()
  })

  it('switches composite query shape and plan mode', () => {
    render(<><IndexGoldenLesson stage="composite" /><IndexGoldenLesson stage="plan" /></>)
    expect(screen.getByText(/Contiguous range/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'created_at only' }))
    expect(screen.getByText(/Missing leading key/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'After Index' }))
    expect(screen.getByText('Index Cond tenant/status')).toBeInTheDocument()
  })

  it('renders all index markers while Quick mode stays absent', () => {
    render(<MemoryRouter><MarkdownDocument doc={{ ...base, slug: 'learning-index-execution-plan', title: 'Index', contentKind: 'learning', content: `# Test\n\n{{INDEX_VISUAL:scan}}\n\n{{INDEX_VISUAL:btree}}\n\n{{INDEX_VISUAL:composite}}\n\n{{INDEX_VISUAL:planner}}\n\n{{INDEX_VISUAL:plan}}\n\n## Sau visual` }} /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: /Table scan và Index path/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Planner đi từ predicate/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Ôn nhanh' })).not.toBeInTheDocument()
  })

  it('keeps Quick mode available for reference Markdown', () => {
    render(<MemoryRouter><MarkdownDocument doc={{ ...base, slug: 'reference-test', title: 'Reference', contentKind: 'reference' }} /></MemoryRouter>)
    expect(screen.getByRole('button', { name: 'Ôn nhanh' })).toBeInTheDocument()
  })
})
