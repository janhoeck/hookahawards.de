import { eq } from 'drizzle-orm'

import { Category, Vote } from '../../../types'
import { DatabaseClient } from '../database'
import { voteSchema } from '../schema'

export const createVoteRepository = (db: DatabaseClient) => {
  const getVotes = async (): Promise<Vote[]> => {
    try {
      return await db.select().from(voteSchema)
    } catch (error) {
      console.error('Failed to execute getVotes:', error)
      return []
    }
  }

  const getVotesByUserId = async (userId: string): Promise<Vote[]> => {
    try {
      return await db.select().from(voteSchema).where(eq(voteSchema.userId, userId))
    } catch (error) {
      console.error('Failed to execute getVotesByUserId:', error)
      return []
    }
  }

  const getVoteByCategoryId = async (categoryId: Category['id']): Promise<Vote | undefined> => {
    try {
      const response = await db.select().from(voteSchema).where(eq(voteSchema.categoryId, categoryId))
      return response[0]
    } catch (error) {
      console.error('Failed to execute getVoteByCategoryId:', error)
    }
  }

  const insertVote = async (vote: Omit<Vote, 'id' | 'createdAt'>) => {
    await db
      .insert(voteSchema)
      .values({
        userId: vote.userId,
        categoryId: vote.categoryId,
        referenceId: vote.referenceId,
        referenceType: vote.referenceType,
      })
      .onConflictDoUpdate({
        target: [voteSchema.userId, voteSchema.categoryId],
        set: {
          referenceId: vote.referenceId,
          referenceType: vote.referenceType,
        },
      })
  }

  return {
    getVotes,
    getVoteByCategoryId,
    insertVote,
    getVotesByUserId,
  }
}
