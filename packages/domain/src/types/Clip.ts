import { clipSchema } from '../lib/db/schema'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'

/**
 * Represents to full clip type of the database
 */
export type Clip = InferSelectModel<typeof clipSchema>

/**
 * Represents to draft of a clip. This does not contain auto created property
 */
export type ClipDraft = InferInsertModel<typeof clipSchema>
