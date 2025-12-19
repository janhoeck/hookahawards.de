import { fetchCategories } from '@/lib/api/categories'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useCategories = () => {
  return useInfiniteQuery({
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    queryKey: ['categories'],
    queryFn: async ({ pageParam }) => {
      return fetchCategories({ page: pageParam, limit: 50 })
    },
    getNextPageParam: ({ pagination }) => (pagination.hasMore ? pagination.page + 1 : undefined),
  })
}
