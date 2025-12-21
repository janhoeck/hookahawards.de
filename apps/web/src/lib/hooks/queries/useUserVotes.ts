import { addVote, fetchUserVotes } from '@/lib/api/votes'
import { useDataFactory } from '@/lib/hooks/queries/factory/useDataFactory'
import { CategoryType, Vote } from '@/lib/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const queryKey = ['votes'] as const

export const useUserVotes = () => {
  return useDataFactory<Vote>({
    queryKey,
    queryFn: fetchUserVotes,
  })
}

export const useAddVote = (categoryId: string, referenceId: string, referenceType: CategoryType) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => {
      return addVote(categoryId, referenceId, referenceType)
    },
    onMutate: async (newVote: Vote) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['votes'] })

      // Snapshot previous value
      const previousVotes = queryClient.getQueryData(['votes'])

      // Optimistically update
      queryClient.setQueryData(['votes'], (prevVotes: Vote[]) => {
        const filtered = prevVotes.filter((prevVote) => prevVote.categoryId !== categoryId)
        return prevVotes ? [...filtered, newVote] : [newVote]
      })

      // Return context with snapshot
      return { previousVotes }
    },
    onError: (_err, _newVote, context) => {
      // Rollback on error
      queryClient.setQueryData(['votes'], context?.previousVotes)
    },
  })
}
