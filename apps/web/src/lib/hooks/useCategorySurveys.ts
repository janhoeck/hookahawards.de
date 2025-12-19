import { fetchSurveys } from '@/lib/api/surveys'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useCategorySurveys = (categoryId: string) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['surveys', categoryId],
    queryFn: async ({ pageParam }) => {
      return fetchSurveys(categoryId, { page: pageParam, limit: 10 })
    },
    getNextPageParam: ({ pagination }) => (pagination.hasMore ? pagination.page + 1 : undefined),
  })
}
