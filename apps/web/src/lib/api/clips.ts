import { Clip, PaginationResponse } from '@/lib/types'

export const fetchCategoryClips = async (categoryId: string): Promise<PaginationResponse<Clip>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/clips?categoryId=${categoryId}`)
  return await response.json()
}
