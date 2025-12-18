import { eq } from 'drizzle-orm'

import { Category, Survey, SurveyDraft } from '../../types'
import { DatabaseClient } from '../db'
import { surveySchema } from '../schema'

export const createSurveyRepository = (db: DatabaseClient) => {
  const getSurveys = async (): Promise<Survey[]> => {
    try {
      return await db.select().from(surveySchema)
    } catch (error) {
      console.error('Failed to execute getSurveys:', error)
      return []
    }
  }

  const getSurveysByCategoryId = async (categoryId: Category['id']): Promise<Survey[]> => {
    try {
      const result = await db.select().from(surveySchema).where(eq(surveySchema.categoryId, categoryId))
      return result as Survey[]
    } catch (error) {
      console.error('Failed to execute getSurveysByCategoryId:', error)
      return []
    }
  }

  const deleteSurveyById = async (surveyId: Survey['id']): Promise<void> => {
    await db.delete(surveySchema).where(eq(surveySchema.id, surveyId))
  }

  const insertSurvey = async (survey: SurveyDraft) => {
    const createdSurvey = await db.insert(surveySchema).values(survey).returning()
    return createdSurvey[0]
  }

  const updateSurvey = async (survey: Omit<Survey, 'createdAt'>) => {
    const updatedSurveys = await db.update(surveySchema).set(survey).where(eq(surveySchema.id, survey.id)).returning()
    return updatedSurveys[0]
  }

  return {
    getSurveys,
    getSurveysByCategoryId,
    insertSurvey,
    deleteSurveyById,
    updateSurvey,
  }
}
