import { deleteCategoryById, fetchCategories } from '@/lib/api/categories'
import { Category } from '@/lib/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
}

export const useCategories = () => {
  const { data = [], ...rest } = useQuery<Category[]>({
    queryKey: categoryKeys.lists(),
    queryFn: async () => {
      const response = await fetchCategories({ page: 1, limit: 50 })
      return response.items
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
  return { data, ...rest }
}

export const useMutateCategory = () => {
  const queryClient = useQueryClient()

  const syncCategoryToCache = useCallback(
    (category: Category) => {
      queryClient.setQueryData<Category[]>(categoryKeys.lists(), (old = []) => [...old, category])
    },
    [queryClient]
  )

  const updateCategoryInCache = useCallback(
    (updatedCategory: Category) => {
      queryClient.setQueryData<Category[]>(categoryKeys.lists(), (old = []) =>
        old
          .map((category) => (category.id === updatedCategory.id ? { ...category, ...updatedCategory } : category))
          .sort((a, b) => a.position - b.position)
      )
    },
    [queryClient]
  )

  const deleteMutation = useMutation({
    mutationFn: (categoryId: string) => deleteCategoryById(categoryId),
    onMutate: async (categoryId: string) => {
      await queryClient.cancelQueries({ queryKey: categoryKeys.lists() })
      const previousCategories = queryClient.getQueryData<Category[]>(categoryKeys.lists())

      // Optimistic Update
      queryClient.setQueryData<Category[]>(categoryKeys.lists(), (old = []) =>
        old.filter((category) => category.id !== categoryId)
      )

      return { previousCategories }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(categoryKeys.lists(), context.previousCategories)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() })
    },
  })

  return { syncCategoryToCache, updateCategoryInCache, deleteMutation }
}
