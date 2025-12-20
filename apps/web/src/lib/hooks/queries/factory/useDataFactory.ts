import { useQuery } from '@tanstack/react-query'

type Identifiable = { id: string }

type Options<T> = {
  queryKey: readonly unknown[]
  queryFn: () => Promise<T[]>
}

export function useDataFactory<T extends Identifiable>(options: Options<T>) {
  const { queryKey, queryFn } = options

  const { data = [], ...rest } = useQuery<T[]>({
    queryKey: queryKey,
    queryFn: queryFn,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
  return { data, ...rest }
}
