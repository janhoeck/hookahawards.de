import { useQuery } from '@tanstack/react-query'

type Options<T> = {
  queryKey: readonly unknown[]
  queryFn: () => Promise<T[]>
}

export function useDataFactory<T>(options: Options<T>) {
  const { queryKey, queryFn } = options

  const { data = [], ...rest } = useQuery<T[]>({
    queryKey: queryKey,
    queryFn: queryFn,
    notifyOnChangeProps: ['data', 'error', 'isPending'],
  })
  return { data, ...rest }
}
