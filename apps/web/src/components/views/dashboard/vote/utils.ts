import { Vote } from '@janhoeck/domain'

export const groupVotesByDay = (votes: Vote[]) => {
  const grouped = new Map<string, { date: Date; count: number }>()

  for (const vote of votes) {
    const date = new Date(vote.createdAt)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const dateKey = `${year}-${month}-${day}`

    const existing = grouped.get(dateKey)
    if (existing) {
      existing.count++
    } else {
      grouped.set(dateKey, {
        date: new Date(year, month, day, 0, 0, 0, 0),
        count: 1,
      })
    }
  }

  return Array.from(grouped.values()).sort((a, b) => a.date.getTime() - b.date.getTime())
}

export const buildChartData = (data: ReturnType<typeof groupVotesByDay>) => {
  if (data.length === 0) {
    return []
  }

  const timestamps = data.map(({ date }) => date.getTime())
  const startTime = Math.min(...timestamps)
  const endTime = Math.max(...timestamps)

  const dataMap = new Map(data.map((item) => [item.date.getTime(), item.count]))

  const items = []
  let currentTime = startTime

  while (currentTime <= endTime) {
    const currentDate = new Date(currentTime)
    const count = dataMap.get(currentTime) ?? 0

    items.push({
      amount: count,
      date: currentDate.toLocaleDateString('de-DE'),
    })

    currentDate.setDate(currentDate.getDate() + 1)
    currentTime = currentDate.getTime()
  }

  return items
}
