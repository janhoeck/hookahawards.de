import { eq } from 'drizzle-orm'
import { Category, Clip, ClipDraftWithStreamers } from '../../../types'
import { clipSchema, clipStreamersSchema } from '../schema'
import { DatabaseClient } from '../database'

export const createClipRepository = (db: DatabaseClient) => {
  const getClips = async (): Promise<Clip[]> => {
    try {
      const response = await db.query.clipSchema.findMany({
        with: {
          streamers: true,
        },
      })

      return response.map((clip) => ({
        ...clip,
        streamerIds: clip.streamers.map((cs) => cs.streamerId),
      }))
    } catch (error) {
      console.error('Failed to execute getClips:', error)
      return []
    }
  }

  const getClipsByCategoryId = async (categoryId: Category['id']): Promise<Clip[]> => {
    try {
      const response = await db.query.clipSchema.findMany({
        where: eq(clipSchema.categoryId, categoryId),
        with: {
          streamers: true,
        },
      })

      return response.map((clip) => ({
        ...clip,
        streamerIds: clip.streamers.map((cs) => cs.streamerId),
      }))
    } catch (error) {
      console.error('Failed to execute getClipsByCategoryId:', error)
      return []
    }
  }

  const deleteClipById = async (clipId: Clip['id']): Promise<void> => {
    await db.delete(clipSchema).where(eq(clipSchema.id, clipId))
  }

  const insertClip = async (clipData: ClipDraftWithStreamers): Promise<Clip> => {
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

  const updateClip = async (clipData: Omit<Clip, 'createdAt'> & { streamerIds?: string[] }) => {
    const { streamerIds, ...clip } = clipData

    return await db.transaction(async (tx) => {
      const updatedClips = await tx
        .update(clipSchema)
        .set(clip)
        .where(eq(clipSchema.id, clip.id))
        .returning()

      const updatedClip = updatedClips[0]
      if (!updatedClip) {
        throw Error('Failed to execute update clip')
      }

      if (streamerIds !== undefined) {
        await tx
          .delete(clipStreamersSchema)
          .where(eq(clipStreamersSchema.clipId, clip.id))

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

  return {
    getClips,
    getClipsByCategoryId,
    insertClip,
    deleteClipById,
    updateClip,
  }
}
