import { describe, expect, test } from 'vitest'
import { buildChartData, groupVotesByDay } from './utils'
import { Vote } from '@janhoeck/domain'

describe('Test utils.test.ts', () => {
  const votes: Vote[] = [
    {
      userId: '123',
      categoryId: '1',
      referenceId: '1',
      referenceType: 'clip',
      createdAt: new Date('2025-01-01'),
    },
    {
      userId: '123',
      categoryId: '1',
      referenceId: '1',
      referenceType: 'clip',
      createdAt: new Date('2025-01-01'),
    },
    {
      userId: '123',
      categoryId: '1',
      referenceId: '1',
      referenceType: 'clip',
      createdAt: new Date('2025-01-01'),
    },
    {
      userId: '123',
      categoryId: '1',
      referenceId: '1',
      referenceType: 'clip',
      createdAt: new Date('2025-01-05'),
    },
  ]

  test('group dates together correctly', () => {
    const groupedVotes = groupVotesByDay(votes)
    expect(groupedVotes.length).toBe(2)
  })

  test('buildChartData should create between dates', () => {
    const groupedVotes = groupVotesByDay(votes)
    const chartData = buildChartData(groupedVotes)
    console.log(chartData)
    expect(1).toBe(1)
  })
})
