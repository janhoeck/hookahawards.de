import { Vote } from '@/lib/types'

/**
 * Check if the current user voted for the reference id (clip / survey)
 * @param userVotes
 * @param referenceId
 */
export const checkVote = (userVotes: Vote[], referenceId: string): boolean => {
  return userVotes.some((vote) => vote.referenceId === referenceId)
}
