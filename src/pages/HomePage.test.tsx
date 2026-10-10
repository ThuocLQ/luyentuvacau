import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import HomePage from './HomePage'

beforeEach(() => window.localStorage.clear())
afterEach(cleanup)

describe('HomePage Golden Pilot entry', () => {
  it('shows the Golden Pilot to a new learner without replacing the current-lesson path', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>)

    expect(screen.getByRole('link', { name: /Tiếp tục: Index & Execution Plan/i })).toHaveAttribute('href', '/docs/learning-index-execution-plan')
    expect(screen.getByRole('heading', { name: 'Race Condition & Concurrency — Golden Pilot' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Mở Golden Pilot/i })).toHaveAttribute('href', '/docs/learning-race-condition')
    expect(screen.getByText(/không thay đổi lesson đang học/i)).toBeInTheDocument()
  })
})
