'use server'

import { db } from '@/lib/db'
import { categorySchema } from '@/lib/db/schema'
import { Category, CategoryDraft, Pagination, PaginationResponse } from '@/lib/types'
import { eq } from 'drizzle-orm'

export const fetchCategories = async (pagination: Pagination): Promise<PaginationResponse<Category>> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories?page=${pagination.page}&limit=${pagination.limit}`
  )
  return await response.json()
}

export const deleteCategoryById = async (categoryId: string) => {
  return db.delete(categorySchema).where(eq(categorySchema.id, categoryId))
}

export const updateCategory = async (categoryId: string, updatedCategory: Partial<CategoryDraft>) => {
  const updatedCategories = await db
    .update(categorySchema)
    .set(updatedCategory)
    .where(eq(categorySchema.id, categoryId))
    .returning()
  return updatedCategories[0]
}
