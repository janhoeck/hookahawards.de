import { Statistics } from '@/lib/types'

export const fetchStatistics = async (): Promise<Statistics> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/statistics`)
  return response.json()
}
