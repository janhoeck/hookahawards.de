import { deleteCategoryById, fetchCategories, updateCategory } from '@/lib/api/categories'
import { Category } from '@/lib/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useCategories = () => {
  const { data = [], ...rest } = useQuery<Category[]>({
    staleTime: 5 * 60 * 1000,
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetchCategories({ page: 1, limit: 50 })
      return response.items
    },
  })
  return { data, ...rest }
}

export const useMutateCategory = () => {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: async (category: Category) => deleteCategoryById(category.id),
    onMutate: async (category: Category) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['categories'] })

      // Snapshot previous value
      const previousCategories = queryClient.getQueryData(['categories'])

      // Optimistically update
      queryClient.setQueryData(['categories'], (prevCategories: Category[]) => {
        return prevCategories.filter((prevCategory) => prevCategory.id !== category.id)
      })

      // Return context with snapshot
      return { previousCategories }
    },
    onError: (_err, _deletedCategory, context) => {
      // Rollback on error
      queryClient.setQueryData(['categories'], context?.previousCategories)
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (updatedCategory: Category) => updateCategory(updatedCategory.id, updatedCategory),
    onMutate: async (updatedCategory: Category) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['categories'] })
      // Snapshot previous value
      const previousCategories = queryClient.getQueryData(['categories'])

      // Optimistically update
      queryClient.setQueryData(['categories'], (prevCategories: Category[]) => {
        return prevCategories.map((prevCategory) => {
          if (prevCategory.id === updatedCategory.id) {
            return { ...prevCategory, ...updatedCategory }
          }
          return prevCategory
        })
      })

      // Return context with snapshot
      return { previousCategories }
    },
    onError: (_err, _deletedCategory, context) => {
      // Rollback on error
      queryClient.setQueryData(['categories'], context?.previousCategories)
    },
  })

  return { deleteMutation, updateMutation }
}
