import { Pagination, PaginationResponse, Survey } from '@/lib/types'

export const fetchSurveys = async (categoryId: string, pagination: Pagination): Promise<PaginationResponse<Survey>> => {
  const response = await fetch(
    `/api/categories/${categoryId}/surveys?page=${pagination.page}&limit=${pagination.limit}`
  )
  return await response.json()
}
