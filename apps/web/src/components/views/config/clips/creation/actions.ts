'use server'

import { createClip } from '@/lib/api/clips'
import { ClipDraftWithStreamers } from '@/lib/types'
import { revalidatePath } from 'next/cache'

import { FormState, schema } from './schema'

export async function createClipAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  const clipFormData = Object.fromEntries([...formData]) as unknown as ClipDraftWithStreamers
  const { success, data, error } = schema.safeParse(clipFormData)

  if (!success) {
    return {
      clip: null,
      success: false,
      errors: error.flatten().fieldErrors,
    }
  }

  try {
    const clip = await createClip(data)
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
