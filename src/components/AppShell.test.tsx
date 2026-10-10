import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import AppShell from './AppShell'

beforeEach(() => window.localStorage.clear())
afterEach(cleanup)

describe('AppShell learner navigation', () => {
  it('keeps documentation sections collapsed until a learner opens one', () => {
    render(<MemoryRouter><AppShell /></MemoryRouter>)
    const section = screen.getByRole('button', { name: 'Nền tảng .NET' })
    expect(section).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(section)
    expect(section).toHaveAttribute('aria-expanded', 'true')
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
