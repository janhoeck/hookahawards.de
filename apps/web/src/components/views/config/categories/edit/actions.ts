'use server'

import { updateCategory } from '@/lib/api/categories'
import { Category } from '@/lib/types'
import { revalidatePath } from 'next/cache'

import { FormState, schema } from './schema'

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
    const category = await updateCategory(categoryFormData.id, categoryFormData)
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
    console.error(error)
    return {
      category: null,
      success: false,
      errors: null,
    }
  }
}
