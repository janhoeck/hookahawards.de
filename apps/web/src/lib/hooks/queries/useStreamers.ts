import { deleteStreamerById, fetchStreamers } from '@/lib/api/streamers'
import { Streamer } from '@/lib/types'

import { useDataFactory } from './factory/useDataFactory'
import { useMutationFactory } from './factory/useMutationFactory'

const queryKey = ['streamers'] as const

export const getStreamersQuery = () => ({
  queryKey,
  queryFn: fetchStreamers,
})

export const useStreamers = () => {
  return useDataFactory<Streamer>(getStreamersQuery())
}

export const useMutateStreamer = () => {
  return useMutationFactory({
    queryKey,
    deleteMutationFn: (streamerId: string) => deleteStreamerById(streamerId),
  })
}
