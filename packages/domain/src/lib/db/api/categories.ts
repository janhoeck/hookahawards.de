import { eq } from 'drizzle-orm'
import { Category, CategoryDraft } from '../../../types'
import { categorySchema } from '../schema'
import { DatabaseClient } from '../database'

export const createCategoryRepository = (db: DatabaseClient) => {
  const getCategories = async (): Promise<Category[]> => {
    try {
      return await db.select().from(categorySchema).orderBy(categorySchema.createdAt)
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

  const updateCategory = async (category: Omit<Category, 'type' | 'createdAt'>) => {
    const updatedCategories = await db
      .update(categorySchema)
      .set(category)
      .where(eq(categorySchema.id, category.id))
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
