import { InferInsertModel, InferSelectModel } from 'drizzle-orm'

import { clipSchema } from '../lib/db/schema'

/**
 * Base clip type from database
 */
export type ClipBase = InferSelectModel<typeof clipSchema>

/**
 * Represents the full clip type with streamers
 */
export type Clip = ClipBase & {
  streamerIds: string[]
}

/**
 * Represents a draft of a clip. This does not contain auto created properties
 */
export type ClipDraft = InferInsertModel<typeof clipSchema>

/**
 * Represents a clip draft with streamer IDs for creation
 */
export type ClipDraftWithStreamers = ClipDraft & {
  streamerIds: string[]
}
