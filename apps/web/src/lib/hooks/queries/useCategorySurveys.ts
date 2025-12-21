import { fetchCategorySurveys } from '@/lib/api/surveys'
import { Survey } from '@/lib/types'

import { useDataFactory } from './factory/useDataFactory'

export const useCategorySurveys = (categoryId: string) => {
  return useDataFactory<Survey>({
    queryKey: ['surveys', categoryId],
    queryFn: async () => {
      const response = await fetchCategorySurveys(categoryId)
      return response.items
    },
  })
}
