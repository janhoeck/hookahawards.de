import { VotesPerDayStatistics } from '@/lib/types'

export const buildChartData = (data: VotesPerDayStatistics) => {
  if (data.length === 0) {
    return []
  }

  return data.map((data) => ({
    amount: data.count,
    date: new Date(data.createdAt).toLocaleDateString('de-DE'),
  }))
}
