'use server'

import { surveyRepository } from '@/lib/db'
import { Survey } from '@/lib/types'
import { revalidatePath } from 'next/cache'

import { FormState, schema } from './schema'

export async function updateSurveyAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  const surveyFormData = Object.fromEntries([...formData]) as unknown as Survey
  const { success, error } = schema.safeParse(surveyFormData)

  if (!success) {
    return {
      survey: null,
      success: false,
      errors: error.flatten().fieldErrors,
    }
  }

  try {
    const survey = await surveyRepository.updateSurvey(surveyFormData)
    if (!survey) {
      throw new Error('No survey was returned after update.')
    }

    revalidatePath('/', 'layout')
    return {
      survey: survey,
      success: true,
      errors: null,
    }
  } catch (error) {
    console.error(error)
    return {
      survey: null,
      success: false,
      errors: null,
    }
  }
}
