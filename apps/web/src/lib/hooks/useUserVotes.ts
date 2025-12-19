import { addVote, fetchUserVotes } from '@/lib/api/votes'
import { CategoryType, Vote } from '@/lib/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useUserVotes = () => {
  return useQuery({
    queryKey: ['votes'],
    queryFn: fetchUserVotes,
    placeholderData: [],
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
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
