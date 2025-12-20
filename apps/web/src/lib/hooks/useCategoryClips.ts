import { fetchCategoryClips } from '@/lib/api/clips'
import { Clip } from '@/lib/types'

import { useDataFactory } from './factory/useDataFactory'

export const useCategoryClips = (categoryId: string) => {
  return useDataFactory<Clip>({
    queryKey: ['clips', categoryId],
    queryFn: async () => {
      const response = await fetchCategoryClips(categoryId)
      return response.items
    },
  })
}
