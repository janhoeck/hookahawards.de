'use server'

import { validateBasicAuth } from '@/lib/auth/basic/validateBasicAuth'
import { db } from '@/lib/db'
import { surveySchema } from '@/lib/db/schema'
import { Survey, SurveyDraft } from '@/lib/types'
import { eq } from 'drizzle-orm'

export const deleteSurveyById = async (surveyId: string): Promise<void> => {
  await validateBasicAuth()

  await db.delete(surveySchema).where(eq(surveySchema.id, surveyId))
}

export const createSurvey = async (survey: SurveyDraft) => {
  await validateBasicAuth()

  const createdSurvey = await db.insert(surveySchema).values(survey).returning()
  return createdSurvey[0]
}

export const updateSurvey = async (survey: Omit<Survey, 'createdAt'>) => {
  await validateBasicAuth()

  const updatedSurveys = await db.update(surveySchema).set(survey).where(eq(surveySchema.id, survey.id)).returning()
  return updatedSurveys[0]
}
