'use server'

import { updateCategory } from '@/lib/api/categories'
import { revalidatePath } from 'next/cache'

export async function updateCategoriesPositionAction(updates: { id: string; position: number }[]) {
  for (const { id, position } of updates) {
    await updateCategory(id, { position })
  }

  revalidatePath('/', 'layout')
}
