import { useCategories } from '@/lib/hooks/useCategories'
import { useUserVotes } from '@/lib/hooks/useUserVotes'
import { useMemo } from 'react'

export const useVotingProgress = () => {
  const { data: categoriesData } = useCategories()
  const { data: votes } = useUserVotes()

  // Flatten all categories from all pages
  const allCategories = useMemo(() => {
    if (!categoriesData?.pages) {
      return []
    }
    return categoriesData.pages.flatMap((page) => page.items)
  }, [categoriesData])

  // Get all category IDs that have been voted on
  const votedCategoryIds = useMemo(() => {
    return new Set(votes.map((vote) => vote.categoryId) || [])
  }, [votes])

  // Calculate voting progress
  const totalCategories = allCategories.length
  const votedCategories = votedCategoryIds.size
  const allCategoriesVoted = totalCategories > 0 && votedCategories === totalCategories
  const votingProgress = totalCategories > 0 ? (votedCategories / totalCategories) * 100 : 0

  return {
    allCategoriesVoted,
    votingProgress,
  }
}
