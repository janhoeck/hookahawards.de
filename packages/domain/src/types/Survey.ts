import { surveySchema } from '../lib/db/schema'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'

/**
 * Represents to full survey type of the database
 */
export type Survey = InferSelectModel<typeof surveySchema>

/**
 * Represents to draft of a survey. This does not contain auto created property
 */
export type SurveyDraft = InferInsertModel<typeof surveySchema>
