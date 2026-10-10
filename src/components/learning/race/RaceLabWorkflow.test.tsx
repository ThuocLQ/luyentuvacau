import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import RaceLabWorkflow from './RaceLabWorkflow'
import { initialRaceLabProgress, raceLabStorageKey } from './raceLabProgress'

const experiments = ['sequential', 'unsafe', 'controlled', 'protected'].map(id => ({ id: id as 'sequential' | 'unsafe' | 'controlled' | 'protected', questionHtml: `<p>Câu hỏi ${id}</p>`, revealHtml: `<p>Đáp án ${id}</p>` }))

beforeEach(() => window.localStorage.clear())
afterEach(cleanup)

describe('Race guided lab progress', () => {
  it('restores experiment 3 with prediction and observation after reload or mode remount', () => {
    const saved = initialRaceLabProgress()
    saved.experimentId = 'controlled'
    saved.phase = 'reveal'
    saved.predictions.controlled = 'Barrier làm hai request cùng tới check.'
    saved.observations.controlled = 'approvedAmount=110.'
    saved.viewed = ['controlled']
    saved.attempted = ['controlled']
    saved.recorded = ['controlled']
    saved.selfReportedExecution = ['controlled']
    window.localStorage.setItem(raceLabStorageKey, JSON.stringify(saved))
    const { unmount } = render(<RaceLabWorkflow setupHtml="<p>setup</p>" experiments={experiments} />)
    expect(screen.getByText('Experiment 3 / 4')).toBeInTheDocument()
    expect(screen.getByText(/Barrier làm hai request/)).toBeInTheDocument()
    expect(screen.getByText(/approvedAmount=110/)).toBeInTheDocument()
    unmount()
    render(<RaceLabWorkflow setupHtml="<p>setup</p>" experiments={experiments} />)
    expect(screen.getByText('Experiment 3 / 4')).toBeInTheDocument()
    expect(screen.getByText('Đáp án controlled')).toBeInTheDocument()
  })

  it('requires an attempt or explicit skip and records self-reported execution separately', () => {
    render(<RaceLabWorkflow setupHtml="<p>setup</p>" experiments={experiments} />)
    expect(screen.getByRole('button', { name: 'Sang bước chạy' })).toBeDisabled()
    fireEvent.click(screen.getByRole('button', { name: 'Bỏ qua dự đoán' }))
    fireEvent.click(screen.getByRole('button', { name: /Tôi đã chạy C# lab/ }))
    expect(screen.getByText(/tự báo cáo đã chạy C# 1\/4/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Bỏ qua ghi chú' }))
    expect(screen.getByText(/Bạn đã bỏ qua dự đoán/)).toBeInTheDocument()
    expect(screen.getByText(/Bạn chưa ghi observation/)).toBeInTheDocument()
    expect(screen.getByText(/không phải verified mastery/)).toBeInTheDocument()
  })

  it('resets incompatible stored lab state safely', () => {
    window.localStorage.setItem(raceLabStorageKey, JSON.stringify({ version: 'old-lab', experimentId: 'protected' }))
    render(<RaceLabWorkflow setupHtml="<p>setup</p>" experiments={experiments} />)
    expect(screen.getByText('Experiment 1 / 4')).toBeInTheDocument()
  })

  it('derives attempt and observation status from current notes after reload and deletion', () => {
    const saved = initialRaceLabProgress()
    saved.phase = 'inspect'
    saved.predictions.sequential = 'Hai request sẽ bị kiểm tra theo thứ tự.'
    saved.observations.sequential = 'approvedCount=1, approvedAmount=80, finalBalance=20'
    saved.attempted = ['sequential']
    saved.recorded = ['sequential']
    window.localStorage.setItem(raceLabStorageKey, JSON.stringify(saved))
    const { unmount } = render(<RaceLabWorkflow setupHtml="<p>setup</p>" experiments={experiments} />)
    expect(screen.getByText(/còn ghi dự đoán 1\/4/)).toBeInTheDocument()
    expect(screen.getByText(/còn ghi observation 1\/4/)).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText(/Observation của bạn/), { target: { value: '' } })
    expect(screen.getByText(/còn ghi observation 0\/4/)).toBeInTheDocument()
    unmount()
    render(<RaceLabWorkflow setupHtml="<p>setup</p>" experiments={experiments} />)
    expect(screen.getByText(/còn ghi dự đoán 1\/4/)).toBeInTheDocument()
    expect(screen.getByText(/còn ghi observation 0\/4/)).toBeInTheDocument()
  })
})
