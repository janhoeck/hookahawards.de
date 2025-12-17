import { InferInsertModel, InferSelectModel } from 'drizzle-orm'

import { categorySchema } from '../lib/db/schema'

/**
 * Represents to full category type of the database
 */
export type Category = InferSelectModel<typeof categorySchema>

export type CategoryType = Category['type']

/**
 * Represents to draft of a category. This does not contain auto created property
 */
export type CategoryDraft = InferInsertModel<typeof categorySchema>
