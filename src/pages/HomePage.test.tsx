import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import HomePage from './HomePage'

beforeEach(() => window.localStorage.clear())
afterEach(cleanup)

describe('HomePage Golden Pilot entry', () => {
  it('starts a new learner at the Golden Pilot', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>)

    expect(screen.getByText(/Golden Pilot giúp bạn thấy race condition/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Bắt đầu Golden Pilot' })).toHaveAttribute('href', '/docs/learning-race-condition')
  })

  it('resumes an active lesson instead of overwriting the learner path', () => {
    window.localStorage.setItem('ltvc-learning-progress-v1', JSON.stringify({
      'learning-index-execution-plan': { techLevel: 2, englishLevel: 1, status: 'learning', lastStudiedAt: '2026-10-10T08:00:00.000Z' },
    }))
    render(<MemoryRouter><HomePage /></MemoryRouter>)

    expect(screen.getByRole('link', { name: /Tiếp tục: Index & Execution Plan/i })).toHaveAttribute('href', '/docs/learning-index-execution-plan')
    expect(screen.getByText(/không tự đổi lộ trình/i)).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Bắt đầu Golden Pilot' })).not.toBeInTheDocument()
  })

  it('resumes a meaningful Guided Race step when no lesson is actively selected', () => {
    window.localStorage.setItem('ltvc-race-guided-step', JSON.stringify(3))
    render(<MemoryRouter><HomePage /></MemoryRouter>)

    expect(screen.getByRole('link', { name: 'Tiếp tục Golden Pilot · Bước 4 / 6' })).toHaveAttribute('href', '/docs/learning-race-condition')
    expect(screen.getByText(/Guided step đã được lưu cục bộ/i)).toBeInTheDocument()
  })

  it('does not let a saved Race step override an active lesson or completed Race record', () => {
    window.localStorage.setItem('ltvc-race-guided-step', JSON.stringify(3))
    window.localStorage.setItem('ltvc-learning-progress-v1', JSON.stringify({
      'learning-index-execution-plan': { techLevel: 2, englishLevel: 1, status: 'learning', lastStudiedAt: '2026-10-10T08:00:00.000Z' },
      'learning-race-condition': { techLevel: 4, englishLevel: 1, status: 'solid', lastStudiedAt: '2026-10-10T07:00:00.000Z' },
    }))
    render(<MemoryRouter><HomePage /></MemoryRouter>)

    expect(screen.getByRole('link', { name: /Tiếp tục: Index & Execution Plan/i })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Tiếp tục Golden Pilot/i })).not.toBeInTheDocument()
  })

  it.each([
    ['completed', 'solid'],
    ['historical', 'not-started'],
  ])('does not present a %s record as an active lesson', (_, status) => {
    window.localStorage.setItem('ltvc-learning-progress-v1', JSON.stringify({
      'learning-index-execution-plan': { techLevel: 3, englishLevel: 2, status, lastStudiedAt: '2026-10-10T08:00:00.000Z' },
    }))
    render(<MemoryRouter><HomePage /></MemoryRouter>)

    expect(screen.getByRole('link', { name: 'Bắt đầu Golden Pilot' })).toHaveAttribute('href', '/docs/learning-race-condition')
    expect(screen.queryByRole('link', { name: /Tiếp tục: Index & Execution Plan/i })).not.toBeInTheDocument()
  })
})
