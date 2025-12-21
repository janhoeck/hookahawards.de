import { deleteCategoryById, fetchCategories } from '@/lib/api/categories'
import { Category } from '@/lib/types'

import { useDataFactory } from './factory/useDataFactory'
import { useMutationFactory } from './factory/useMutationFactory'

const queryKey = ['categories'] as const

export const useCategories = () => {
  return useDataFactory({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await fetchCategories({ page: 1, limit: 50 })
      return response.items
    },
  })
}

export const useMutateCategory = () => {
  return useMutationFactory<Category>({
    queryKey: queryKey,
    sort: (a, b) => a.position - b.position,
    deleteMutationFn: (categoryId: string) => deleteCategoryById(categoryId),
  })
}
