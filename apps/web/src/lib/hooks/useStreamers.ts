import { fetchStreamers } from '@/lib/api/streamers'
import { useQuery } from '@tanstack/react-query'

export const useStreamers = () => {
  const { data = [], ...rest } = useQuery({
    placeholderData: [],
    queryKey: ['streamers'],
    queryFn: fetchStreamers,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
  return { data, ...rest }
}
