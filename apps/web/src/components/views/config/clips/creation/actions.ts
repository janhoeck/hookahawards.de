'use server'

import { FormState, schema } from './schema'
import { ClipDraft } from '@janhoeck/domain'
import { clipRepository } from '@/lib/db/db'
import { revalidatePath } from 'next/cache'

export async function createClipAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  const clipFormData = Object.fromEntries([...formData]) as unknown as ClipDraft
  const { success, data, error } = schema.safeParse(clipFormData)

  if (!success) {
    return {
      clip: null,
      success: false,
      errors: error.flatten().fieldErrors,
    }
  }

  try {
    const clip = await clipRepository.insertClip(data)
    if (!clip) {
      throw new Error('No clip was returned after creation.')
    }

    revalidatePath('/', 'layout')
    return {
      clip,
      success: true,
      errors: null,
    }
  } catch (error) {
    console.error(error)
    return {
      clip: null,
      success: false,
      errors: null,
    }
  }
}
