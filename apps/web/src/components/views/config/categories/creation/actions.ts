'use server'

import { FormState, schema } from './schema'
import { CategoryDraft } from '@janhoeck/domain'
import { categoryRepository } from '@/lib/db/db'
import { revalidatePath } from 'next/cache'

export async function createCategoryAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  const values = Object.fromEntries([...formData]) as unknown as CategoryDraft
  const { success, error } = schema.safeParse(values)

  if (!success) {
    return {
      category: null,
      success: false,
      errors: error.flatten().fieldErrors,
    }
  }

  try {
    const category = await categoryRepository.insertCategory(values)
    if (!category) {
      throw new Error('No category was returned after creation.')
    }

    revalidatePath('/', 'layout')
    return {
      category: category,
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
