import { eq } from 'drizzle-orm'

import { Streamer, StreamerDraft } from '../../types'
import { DatabaseClient } from '../db'
import { streamerSchema } from '../schema'

export const createStreamerRepository = (db: DatabaseClient) => {
  const getStreamers = async (): Promise<Streamer[]> => {
    try {
      return await db.select().from(streamerSchema)
    } catch (error) {
      console.error('Failed to execute getStreamers:', error)
      return []
    }
  }

  const deleteStreamerById = async (id: string): Promise<void> => {
    await db.delete(streamerSchema).where(eq(streamerSchema.id, id))
  }

  const insertStreamer = async (streamer: StreamerDraft) => {
    const createdCategories = await db.insert(streamerSchema).values(streamer).returning()
    return createdCategories[0]
  }

  return {
    getStreamers,
    insertStreamer,
    deleteStreamerById,
  }
}
