'use server'

import { validateBasicAuth } from '@/lib/auth/basic/validateBasicAuth'
import { db } from '@/lib/db'
import { categorySchema } from '@/lib/db/schema'
import { CategoryDraft } from '@/lib/types'
import { eq } from 'drizzle-orm'

export const deleteCategoryById = async (categoryId: string) => {
  await validateBasicAuth()

  return db.delete(categorySchema).where(eq(categorySchema.id, categoryId))
}

export const updateCategory = async (categoryId: string, updatedCategory: Partial<CategoryDraft>) => {
  await validateBasicAuth()

  const updatedCategories = await db
    .update(categorySchema)
    .set(updatedCategory)
    .where(eq(categorySchema.id, categoryId))
    .returning()
  return updatedCategories[0]
}

export const createCategory = async (category: CategoryDraft) => {
  await validateBasicAuth()

  const createdCategories = await db.insert(categorySchema).values(category).returning()
  return createdCategories[0]
}
