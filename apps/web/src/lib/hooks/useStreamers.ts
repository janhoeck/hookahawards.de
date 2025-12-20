import { deleteStreamerById, fetchStreamers } from '@/lib/api/streamers'
import { Category, Streamer } from '@/lib/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

const streamerKeys = {
  all: ['streamers'] as const,
  lists: () => [...streamerKeys.all, 'list'] as const,
}

export const useStreamers = () => {
  const { data = [], ...rest } = useQuery({
    placeholderData: [],
    queryKey: streamerKeys.lists(),
    queryFn: fetchStreamers,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
  return { data, ...rest }
}

export const useMutateStreamers = () => {
  const queryClient = useQueryClient()

  const syncStreamerToCache = useCallback(
    (streamer: Streamer) => {
      queryClient.setQueryData<Streamer[]>(streamerKeys.lists(), (old = []) => [...old, streamer])
    },
    [queryClient]
  )

  const deleteMutation = useMutation({
    mutationFn: (streamerId: string) => deleteStreamerById(streamerId),
    onMutate: async (streamerId: string) => {
      await queryClient.cancelQueries({ queryKey: streamerKeys.lists() })
      const previousStreamers = queryClient.getQueryData<Category[]>(streamerKeys.lists())

      // Optimistic Update
      queryClient.setQueryData<Streamer[]>(streamerKeys.lists(), (old = []) =>
        old.filter((streamer) => streamer.id !== streamerId)
      )

      return { previousStreamers }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousStreamers) {
        queryClient.setQueryData(streamerKeys.lists(), context.previousStreamers)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: streamerKeys.lists() })
    },
  })

  return { syncStreamerToCache, deleteMutation }
}
