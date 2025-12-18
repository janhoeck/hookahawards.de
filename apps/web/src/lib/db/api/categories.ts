import { eq } from 'drizzle-orm'

import { Category, CategoryDraft } from '../../types'
import { DatabaseClient } from '../db'
import { categorySchema } from '../schema'

export const createCategoryRepository = (db: DatabaseClient) => {
  const getCategories = async (): Promise<Category[]> => {
    try {
      return await db.select().from(categorySchema).orderBy(categorySchema.position)
    } catch (error) {
      console.error('Failed to execute getCategories:', error)
      return []
    }
  }

  const deleteCategoryById = async (categoryId: Category['id']): Promise<void> => {
    await db.delete(categorySchema).where(eq(categorySchema.id, categoryId))
  }

  const insertCategory = async (category: CategoryDraft) => {
    const createdCategories = await db.insert(categorySchema).values(category).returning()
    return createdCategories[0]
  }

  const updateCategory = async (categoryId: string, updatedCategory: Partial<CategoryDraft>) => {
    const updatedCategories = await db
      .update(categorySchema)
      .set(updatedCategory)
      .where(eq(categorySchema.id, categoryId))
      .returning()
    return updatedCategories[0]
  }

  return {
    getCategories,
    deleteCategoryById,
    insertCategory,
    updateCategory,
  }
}
