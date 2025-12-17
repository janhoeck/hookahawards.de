import { InferInsertModel, InferSelectModel } from 'drizzle-orm'

import { streamerSchema } from '../lib/db/schema'

/**
 * Represents to full streamer type of the database
 */
export type Streamer = InferSelectModel<typeof streamerSchema>

/**
 * Represents to draft of a streamer. This does not contain auto created properties
 */
export type StreamerDraft = InferInsertModel<typeof streamerSchema>
