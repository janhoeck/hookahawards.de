'use server'

import { validateBasicAuth } from '@/lib/auth/basic/validateBasicAuth'
import { db } from '@/lib/db'
import { streamerSchema } from '@/lib/db/schema'
import { StreamerDraft } from '@/lib/types'
import { eq } from 'drizzle-orm'

export const deleteStreamerById = async (id: string): Promise<void> => {
  await validateBasicAuth()

  await db.delete(streamerSchema).where(eq(streamerSchema.id, id))
}

export const createStreamer = async (streamer: StreamerDraft) => {
  await validateBasicAuth()

  const createdCategories = await db.insert(streamerSchema).values(streamer).returning()
  return createdCategories[0]
}
