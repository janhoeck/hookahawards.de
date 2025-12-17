'use client'

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@janhoeck/ui'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import { useDataContext } from '../../../contexts/data/DataContext'
import { buildChartData, groupVotesByDay } from './utils'

const chartConfig = {
  amount: {
    label: 'Votes',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

export const VotesByDayChart = () => {
  const { votes } = useDataContext()

  const data = buildChartData(groupVotesByDay(votes))

  return (
    <ChartContainer
      config={chartConfig}
      className='aspect-auto h-[250px] w-full'
    >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='date'
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
        />
        <YAxis dataKey='amount' />
        <Line
          dataKey='amount'
          type='monotone'
          stroke='var(--color-amount)'
          strokeWidth={2}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className='w-[150px]'
              nameKey='amount'
            />
          }
        />
      </LineChart>
    </ChartContainer>
  )
}
