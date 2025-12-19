import { Clip, Pagination, PaginationResponse } from '@/lib/types'

export const fetchClips = async (categoryId: string, pagination: Pagination): Promise<PaginationResponse<Clip>> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${categoryId}/clips?page=${pagination.page}&limit=${pagination.limit}`
  )
  return await response.json()
}
