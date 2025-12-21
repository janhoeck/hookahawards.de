import { deleteClipById, fetchClips } from '@/lib/api/clips'
import { Clip } from '@/lib/types'

import { useDataFactory } from './factory/useDataFactory'
import { useMutationFactory } from './factory/useMutationFactory'

const queryKey = ['clips'] as const

export const useClips = () => {
  return useDataFactory<Clip>({
    queryKey,
    queryFn: async () => {
      const response = await fetchClips()
      return response.items
    },
  })
}

export const useMutateClip = () => {
  return useMutationFactory<Clip>({
    queryKey,
    deleteMutationFn: deleteClipById,
  })
}
