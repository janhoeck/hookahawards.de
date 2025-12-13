'use server'

import { FormState, schema } from './schema'
import { Category } from '@janhoeck/domain'
import { categoryRepository } from '@/lib/db/db'
import { revalidatePath } from 'next/cache'

export async function updateCategoryAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  const categoryFormData = Object.fromEntries([...formData]) as unknown as Category
  const { success, error } = schema.safeParse(categoryFormData)

  if (!success) {
    return {
      category: null,
      success: false,
      errors: error.flatten().fieldErrors,
    }
  }

  try {
    const category = await categoryRepository.updateCategory(categoryFormData)
    if (!category) {
      throw Error('No category was returned after update')
    }

    revalidatePath('/', 'layout')
    return {
      category,
      success: true,
      errors: null,
    }
  } catch (error) {
    return {
      category: null,
      success: false,
      errors: null,
    }
  }
}
