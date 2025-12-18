'use server'

import { streamerRepository } from '@/lib/db'
import { SurveyDraft } from '@/lib/types'
import { revalidatePath } from 'next/cache'

import { FormState, schema } from './schema'

export async function createStreamerAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  const streamerFormData = Object.fromEntries([...formData]) as unknown as SurveyDraft
  const { success, data, error } = schema.safeParse(streamerFormData)

  if (!success) {
    return {
      streamer: null,
      success: false,
      errors: error.flatten().fieldErrors,
    }
  }

  try {
    const streamer = await streamerRepository.insertStreamer(data)
    if (!streamer) {
      throw new Error('No streamer was returned after creation.')
    }

    revalidatePath('/', 'layout')
    return {
      streamer,
      success: true,
      errors: null,
    }
  } catch (error) {
    console.error(error)
    return {
      streamer: null,
      success: false,
      errors: null,
    }
  }
}
