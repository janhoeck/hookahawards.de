'use client'

import { validateBasicAuth } from '@/lib/auth/basic/validateBasicAuth'
import { Statistics } from '@/lib/types'

export const fetchStatistics = async (): Promise<Statistics> => {
  await validateBasicAuth()

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/statistics`)
  return response.json()
}
