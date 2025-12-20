import { fetchStatistics } from '@/lib/api/statistics'
import { Statistics } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'

const PLACEHOLDER_DATA: Statistics = {
  categoriesCount: 0,
  votesCount: 0,
  clipsCount: 0,
  votesPerDay: [],
  mostVotes: [],
}

export const useStatistics = () => {
  const { data = PLACEHOLDER_DATA, ...rest } = useQuery({
    queryKey: ['statistics'],
    queryFn: fetchStatistics,
  })
  return { data, ...rest }
}
