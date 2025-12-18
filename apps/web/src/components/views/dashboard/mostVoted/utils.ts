import { Category, Clip, Survey, Vote } from '@/lib/types'

export const mostVotesForCategory = (category: Category, items: (Clip | Survey)[], votes: Vote[]) => {
  const voteCountForCategory = votes.reduce<Record<string, number>>((acc, vote) => {
    if (vote.categoryId === category.id) {
      acc[vote.referenceId] = (acc[vote.referenceId] || 0) + 1
    }
    return acc
  }, {})

  if (Object.keys(voteCountForCategory).length === 0) {
    return { items: [], votes: 0 }
  }

  const maxVotes = Math.max(...Object.values(voteCountForCategory))
  const mostVotedItemIds = Object.entries(voteCountForCategory)
    .filter(([, count]) => count === maxVotes)
    .map(([itemId]) => itemId)

  return {
    items: items.filter((item) => mostVotedItemIds.includes(item.id)),
    amount: maxVotes,
  }
}
