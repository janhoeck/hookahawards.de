import { PaginationResponse, Survey } from '@/lib/types'

export const fetchSurveys = async (categoryId: string): Promise<PaginationResponse<Survey>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/surveys?categoryId=${categoryId}`)
  return await response.json()
}
