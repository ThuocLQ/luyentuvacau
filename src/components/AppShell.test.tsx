import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import AppShell from './AppShell'
import { sections } from '../data/docs'

beforeEach(() => window.localStorage.clear())
afterEach(cleanup)

describe('AppShell learner navigation', () => {
  it('keeps learning, practice, review and library as distinct navigation groups', () => {
    render(<MemoryRouter><AppShell /></MemoryRouter>)
    expect(screen.getAllByText('Học').length).toBeGreaterThan(0)
    expect(screen.getByText('Luyện tập')).toBeInTheDocument()
    expect(screen.getByText('Ôn lại')).toBeInTheDocument()
    expect(screen.getByText('Thư viện')).toBeInTheDocument()
  })

  it('keeps documentation sections collapsed until a learner opens one', () => {
    render(<MemoryRouter><AppShell /></MemoryRouter>)
    const section = screen.getByRole('button', { name: 'Nền tảng .NET' })
    expect(section).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(section)
    expect(section).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(section)
    expect(section).toHaveAttribute('aria-expanded', 'false')
  })

  it('puts the active learning document and resume action ahead of secondary navigation', () => {
    window.localStorage.setItem('ltvc-race-guided-step', JSON.stringify(2))
    render(<MemoryRouter initialEntries={['/docs/learning-race-condition']}><AppShell /></MemoryRouter>)
    const focus = screen.getByLabelText('Bài đang học')
    expect(within(focus).getByText(/Race Condition & Concurrency/)).toBeInTheDocument()
    expect(within(focus).getByText('Đang học · Bước 3/6')).toBeInTheDocument()
    expect(within(focus).getByRole('link', { name: 'Tiếp tục bài' })).toHaveAttribute('href', '/docs/learning-race-condition?mode=guided')
    expect(document.querySelector('.learning-secondary-nav')).toBeInTheDocument()
  })

  it('migrates only the former all-expanded sidebar default to collapsed sections', () => {
    window.localStorage.setItem('ltvc-open-sections', JSON.stringify(sections))
    render(<MemoryRouter><AppShell /></MemoryRouter>)
    expect(screen.getByRole('button', { name: 'Nền tảng .NET' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('opens and closes the mobile navigation with dialog semantics', () => {
    render(<MemoryRouter><AppShell /></MemoryRouter>)
    fireEvent.click(screen.getByRole('button', { name: 'Mở menu' }))
    const dialog = screen.getByRole('dialog', { name: 'Điều hướng' })
    expect(dialog).toBeInTheDocument()
    fireEvent.click(within(dialog).getByRole('button', { name: 'Đóng menu' }))
    expect(screen.queryByRole('dialog', { name: 'Điều hướng' })).not.toBeInTheDocument()
  })
})
