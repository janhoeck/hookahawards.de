import { fetchCategoryClips } from '@/lib/api/clips'
import { Clip } from '@/lib/types'

import { useDataFactory } from './factory/useDataFactory'

export const getCategoryClipsQuery = (categoryId: string) => ({
  queryKey: ['clips', categoryId] as const,
  queryFn: async () => {
    const response = await fetchCategoryClips(categoryId)
    return response.items
  },
})

export const useCategoryClips = (categoryId: string) => {
  return useDataFactory<Clip>(getCategoryClipsQuery(categoryId))
}
