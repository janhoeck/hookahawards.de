import { useCategories, useUserVotes } from '@/lib/hooks/queries'
import { useMemo } from 'react'

export const useVotingProgress = () => {
  const { data: categories } = useCategories()
  const { data: votes } = useUserVotes()

  // Get all category IDs that have been voted on
  const votedCategoryIds = useMemo(() => {
    return new Set(votes.map((vote) => vote.categoryId) || [])
  }, [votes])

  // Calculate voting progress
  const totalCategories = categories.length
  const votedCategories = votedCategoryIds.size
  const allCategoriesVoted = totalCategories > 0 && votedCategories === totalCategories
  const votingProgress = totalCategories > 0 ? (votedCategories / totalCategories) * 100 : 0

  return {
    allCategoriesVoted,
    votingProgress,
  }
}
