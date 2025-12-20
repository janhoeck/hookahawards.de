'use server'

import { db } from '@/lib/db'
import { streamerSchema } from '@/lib/db/schema'
import { Streamer, StreamerDraft } from '@/lib/types'
import { eq } from 'drizzle-orm'

export const fetchStreamers = async (): Promise<Streamer[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/streamers`)
  return await response.json()
}

export const deleteStreamerById = async (id: string): Promise<void> => {
  await db.delete(streamerSchema).where(eq(streamerSchema.id, id))
}

export const createStreamer = async (streamer: StreamerDraft) => {
  const createdCategories = await db.insert(streamerSchema).values(streamer).returning()
  return createdCategories[0]
}
