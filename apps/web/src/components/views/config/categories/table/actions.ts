'use server'

import { categoryRepository } from '@/lib/db/db'
import { Category } from '@janhoeck/domain'
import { revalidatePath } from 'next/cache'

export async function deleteCategoryAction(category: Category) {
  await categoryRepository.deleteCategoryById(category.id)
  revalidatePath('/', 'layout')
}

export async function updateCategoriesPositionAction(updates: { id: string; position: number }[]) {
  for (const { id, position } of updates) {
    await categoryRepository.updateCategory(id, { position })
  }

  revalidatePath('/', 'layout')
}
