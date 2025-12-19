import { Streamer } from '@/lib/types'

export const fetchStreamers = async (): Promise<Streamer[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/streamers`)
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error(error)
  }
  return []
}
