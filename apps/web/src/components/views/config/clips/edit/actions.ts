'use server'

import { clipRepository } from '@/lib/db/db'
import { Clip } from '@janhoeck/domain'
import { revalidatePath } from 'next/cache'

import { FormState, schema } from './schema'

export async function updateClipAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  const clipFormData = Object.fromEntries([...formData]) as unknown as Clip
  const { success, data, error } = schema.safeParse(clipFormData)

  if (!success) {
    return {
      clip: null,
      success: false,
      errors: error.flatten().fieldErrors,
    }
  }

  try {
    const clip = await clipRepository.updateClip(data)
    if (!clip) {
      throw new Error('No clip was returned after update.')
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
