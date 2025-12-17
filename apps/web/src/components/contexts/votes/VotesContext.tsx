import { createContext, useContext } from 'react'
import { CategoryType, Vote } from '@janhoeck/domain'

export type VotesContextType = {
  votes: Vote[]
  isLoading: boolean
  createVote: (categoryId: string, referenceId: string, type: CategoryType) => Promise<void>
  hasCompletelyVoted: boolean
}

export const VotesContext = createContext<VotesContextType>({
  votes: [],
  isLoading: true,
  createVote: () => Promise.resolve(),
  hasCompletelyVoted: false,
})

export const useVotesContext = () => {
  const context = useContext(VotesContext)
  if (!context) {
    throw new Error('useVotesContext must be used within a VotesContextProvider')
  }
  return context
}
