'use server'

import { Category } from '@janhoeck/domain'
import { categoryRepository } from '@/lib/db/db'
import { revalidatePath } from 'next/cache'

export async function deleteCategoryAction(category: Category) {
  await categoryRepository.deleteCategoryById(category.id)
  revalidatePath('/', 'layout')
}
