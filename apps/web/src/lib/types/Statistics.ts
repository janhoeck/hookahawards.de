export type MostVotedItem = {
  categoryId: string
  categoryTitle: string
  itemId: string
  itemTitle: string
  voteCount: number
}

export type MostVotes = Array<MostVotedItem>

type VotePerDayStatistic = {
  count: number
  createdAt: string
}

export type VotesPerDayStatistics = Array<VotePerDayStatistic>

export type Statistics = {
  categoriesCount: number
  votesCount: number
  clipsCount: number
  votesPerDay: VotesPerDayStatistics
  mostVotes: MostVotes
}
