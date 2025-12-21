'use client'

import { PaginationResponse, Survey } from '@/lib/types'

export const fetchCategorySurveys = async (categoryId: string): Promise<PaginationResponse<Survey>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/surveys?categoryId=${categoryId}`)
  return await response.json()
}

export const fetchSurveys = async (): Promise<PaginationResponse<Survey>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/surveys?page=1&limit=500`)
  return await response.json()
}
