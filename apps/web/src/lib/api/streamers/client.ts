'use client'

import { Streamer } from '@/lib/types'

export const fetchStreamers = async (): Promise<Streamer[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/streamers`)
  return await response.json()
}
