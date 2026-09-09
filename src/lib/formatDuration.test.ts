import { describe, expect, it } from 'vitest'
import { formatDuration } from './formatDuration'

describe('formatDuration', () => {
  it('formats the initial 60-second interview timer as 01:00', () => {
    expect(formatDuration(60)).toBe('01:00')
  })

  it('formats countdown values and clamps negative values', () => {
    expect(formatDuration(59)).toBe('00:59')
    expect(formatDuration(1)).toBe('00:01')
    expect(formatDuration(-2)).toBe('00:00')
  })
})
