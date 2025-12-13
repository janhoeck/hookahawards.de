'use server'

import { FormState, schema } from './schema'
import { SurveyDraft } from '@janhoeck/domain'
import { surveyRepository } from '@/lib/db/db'
import { revalidatePath } from 'next/cache'

export async function createSurveyAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  const surveyFormData = Object.fromEntries([...formData]) as unknown as SurveyDraft
  const { success, data, error } = schema.safeParse(surveyFormData)

  if (!success) {
    return {
      survey: null,
      success: false,
      errors: error.flatten().fieldErrors,
    }
  }

  try {
    const survey = await surveyRepository.insertSurvey(data)
    if (!survey) {
      throw new Error('No survey was returned after creation.')
    }

    revalidatePath('/', 'layout')
    return {
      survey,
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
