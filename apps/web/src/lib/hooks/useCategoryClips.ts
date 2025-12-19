import { fetchClips } from '@/lib/api/clips'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useCategoryClips = (categoryId: string) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['clips', categoryId],
    queryFn: async ({ pageParam }) => {
      return fetchClips(categoryId, { page: pageParam, limit: 10 })
    },
    getNextPageParam: ({ pagination }) => (pagination.hasMore ? pagination.page + 1 : undefined),
  })
}
