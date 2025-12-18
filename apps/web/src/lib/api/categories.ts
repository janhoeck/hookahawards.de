import { Category, Pagination, PaginationResponse } from '@/lib/types'

export const fetchCategories = async (pagination: Pagination): Promise<PaginationResponse<Category>> => {
  const response = await fetch(`/api/categories?page=${pagination.page}&limit=${pagination.limit}`)
  return await response.json()
}
