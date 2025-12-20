import { fetchCategoryClips } from '@/lib/api/clips'
import { Clip } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'

export const useCategoryClips = (categoryId: string) => {
  return useQuery<Clip[]>({
    staleTime: 5 * 60 * 1000,
    queryKey: ['clips', categoryId],
    queryFn: async () => {
      const response = await fetchCategoryClips(categoryId)
      return response.items
    },
  })
}
