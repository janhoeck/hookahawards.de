import { deleteSurveyById, fetchSurveys } from '@/lib/api/surveys'
import { Survey } from '@/lib/types'

import { useDataFactory } from './factory/useDataFactory'
import { useMutationFactory } from './factory/useMutationFactory'

const queryKey = ['surveys'] as const

export const useSurveys = () => {
  return useDataFactory<Survey>({
    queryKey,
    queryFn: async () => {
      const response = await fetchSurveys()
      return response.items
    },
  })
}

export const useMutateSurvey = () => {
  return useMutationFactory<Survey>({
    queryKey,
    deleteMutationFn: deleteSurveyById,
  })
}
