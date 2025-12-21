'use server'

import { validateBasicAuth } from '@/lib/auth/basic/validateBasicAuth'
import { db } from '@/lib/db'
import { clipSchema, clipStreamersSchema } from '@/lib/db/schema'
import { Clip, ClipDraftWithStreamers } from '@/lib/types'
import { eq } from 'drizzle-orm'

export const deleteClipById = async (clipId: string): Promise<void> => {
  await validateBasicAuth()

  await db.delete(clipSchema).where(eq(clipSchema.id, clipId))
}

export const createClip = async (clipData: ClipDraftWithStreamers): Promise<Clip> => {
  await validateBasicAuth()

  const { streamerIds, ...clip } = clipData

  return await db.transaction(async (tx) => {
    const createdClip = await tx.insert(clipSchema).values(clip).returning()
    const newClip = createdClip[0]
    if (!newClip) {
      throw Error('Failed to execute create clip')
    }

    if (streamerIds && streamerIds.length > 0) {
      await tx.insert(clipStreamersSchema).values(
        streamerIds.map((streamerId) => ({
          clipId: newClip.id,
          streamerId,
        }))
      )
    }

    return {
      ...newClip,
      streamerIds: streamerIds || [],
    }
  })
}

export const updateClip = async (clipData: Omit<Clip, 'createdAt'> & { streamerIds?: string[] }) => {
  await validateBasicAuth()

  const { streamerIds, ...clip } = clipData

  return await db.transaction(async (tx) => {
    const updatedClips = await tx.update(clipSchema).set(clip).where(eq(clipSchema.id, clip.id)).returning()

    const updatedClip = updatedClips[0]
    if (!updatedClip) {
      throw Error('Failed to execute update clip')
    }

    if (streamerIds !== undefined) {
      await tx.delete(clipStreamersSchema).where(eq(clipStreamersSchema.clipId, clip.id))

      if (streamerIds.length > 0) {
        await tx.insert(clipStreamersSchema).values(
          streamerIds.map((streamerId) => ({
            clipId: updatedClip.id,
            streamerId,
          }))
        )
      }
    }

    return {
      ...updatedClip,
      streamerIds: streamerIds || [],
    }
  })
}
