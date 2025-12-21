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
    notifyOnChangeProps: ['data', 'error', 'isPending'],
  })
  return { data, ...rest }
}
