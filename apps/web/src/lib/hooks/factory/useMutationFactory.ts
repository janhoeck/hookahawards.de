import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

type Identifiable = { id: string }

type Options<T extends Identifiable> = {
  queryKey: readonly unknown[]
  sort?: (a: T, b: T) => number
  deleteMutationFn: (itemId: string) => Promise<unknown>
}

export function useMutationFactory<T extends Identifiable>(options: Options<T>) {
  const { queryKey, sort, deleteMutationFn } = options
  const queryClient = useQueryClient()

  const syncToCache = useCallback(
    (item: T) => {
      queryClient.setQueryData<T[]>(queryKey, (old = []) => [...old, item])
    },
    [queryClient, queryKey]
  )

  const updateInCache = useCallback(
    (updatedItem: T) => {
      queryClient.setQueryData<T[]>(queryKey, (old = []) =>
        old.map((oldItem) => (oldItem.id === updatedItem.id ? { ...oldItem, ...updatedItem } : oldItem)).sort(sort)
      )
    },
    [queryClient, queryKey, sort]
  )

  const deleteMutation = useMutation({
    mutationFn: deleteMutationFn,
    onMutate: async (itemId: string) => {
      await queryClient.cancelQueries({ queryKey })
      const previousItems = queryClient.getQueryData<T[]>(queryKey)

      // Optimistic Update
      queryClient.setQueryData<T[]>(queryKey, (old = []) => old.filter((item) => item.id !== itemId))

      return { previousItems }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(queryKey, context.previousItems)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  return { syncToCache, updateInCache, deleteMutation }
}
