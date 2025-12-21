'use client'

import { Clip, PaginationResponse } from '@/lib/types'

export const fetchClips = async (): Promise<PaginationResponse<Clip>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/clips?page=1&limit=500`)
  return await response.json()
}

export const fetchCategoryClips = async (categoryId: string): Promise<PaginationResponse<Clip>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/clips?categoryId=${categoryId}`)
  return await response.json()
}
