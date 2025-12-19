import { Config } from '@/lib/types'

export const fetchConfig = async (): Promise<Config> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/config`)
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error(error)
  }
  return {}
}
