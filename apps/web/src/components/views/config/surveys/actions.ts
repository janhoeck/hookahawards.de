'use server'

import { Survey } from '@janhoeck/domain'
import { surveyRepository } from '@/lib/db/db'
import { revalidatePath } from 'next/cache'

export async function deleteSurveyAction(survey: Survey) {
  await surveyRepository.deleteSurveyById(survey.id)
  revalidatePath('/', 'layout')
}
