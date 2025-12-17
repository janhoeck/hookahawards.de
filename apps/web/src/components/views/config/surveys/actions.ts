'use server'

import { surveyRepository } from '@/lib/db/db'
import { Survey } from '@janhoeck/domain'
import { revalidatePath } from 'next/cache'

export async function deleteSurveyAction(survey: Survey) {
  await surveyRepository.deleteSurveyById(survey.id)
  revalidatePath('/', 'layout')
}
