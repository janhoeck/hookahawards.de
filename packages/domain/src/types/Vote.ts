import { voteSchema } from '../lib/db/schema'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'

/**
 * Represents to full vote type of the database
 */
export type Vote = InferSelectModel<typeof voteSchema>

/**
 * Represents to draft of a vote. This does not contain auto created property
 */
export type VoteDraft = InferInsertModel<typeof voteSchema>
