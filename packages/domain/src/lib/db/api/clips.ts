import { eq } from 'drizzle-orm'
import { Category, Clip, ClipDraft } from '../../../types'
import { clipSchema } from '../schema'
import { DatabaseClient } from '../database'

export const createClipRepository = (db: DatabaseClient) => {
  const getClips = async (): Promise<Clip[]> => {
    try {
      return await db.select().from(clipSchema)
    } catch (error) {
      console.error('Failed to execute getClips:', error)
      return []
    }
  }

  const getClipsByCategoryId = async (categoryId: Category['id']): Promise<Clip[]> => {
    try {
      return await db.select().from(clipSchema).where(eq(clipSchema.categoryId, categoryId))
    } catch (error) {
      console.error('Failed to execute getClipsByCategoryId:', error)
      return []
    }
  }

  const deleteClipById = async (clipId: Clip['id']): Promise<void> => {
    await db.delete(clipSchema).where(eq(clipSchema.id, clipId))
  }

  const insertClip = async (clip: ClipDraft) => {
    const createdClip = await db.insert(clipSchema).values(clip).returning()
    return createdClip[0]
  }

  const updateClip = async (clip: Omit<Clip, 'createdAt'>) => {
    const updatedClips = await db.update(clipSchema).set(clip).where(eq(clipSchema.id, clip.id)).returning()
    return updatedClips[0]
  }

  return {
    getClips,
    getClipsByCategoryId,
    insertClip,
    deleteClipById,
    updateClip,
  }
}
