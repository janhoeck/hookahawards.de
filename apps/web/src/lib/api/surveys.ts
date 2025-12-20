import { Pagination, PaginationResponse, Survey } from '@/lib/types'

export const fetchSurveys = async (categoryId: string, pagination: Pagination): Promise<PaginationResponse<Survey>> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/surveys?categoryId=${categoryId}&page=${pagination.page}&limit=${pagination.limit}`
  )
  return await response.json()
}
