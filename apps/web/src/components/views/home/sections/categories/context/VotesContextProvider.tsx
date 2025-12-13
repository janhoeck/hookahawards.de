'use client'

import { useSession } from '@/lib/auth-client'
import React, { startTransition, useEffect, useOptimistic, useState } from 'react'

import { VotesContext } from './VotesContext'
import { CategoryType, Vote } from '@janhoeck/domain'

export type VotesContextProviderProps = {
  children: React.ReactNode
}

export const VotesContextProvider = (props: VotesContextProviderProps) => {
  const { children } = props

  const [isLoading, setLoading] = useState<boolean>(true)
  const [votes, setVotes] = useState<Vote[]>([])
  const { data } = useSession()

  const [optimisticVotes, addOptimisticVote] = useOptimistic(votes, (state, newVote: Vote) => {
    const filtered = state.filter((v) => v.categoryId !== newVote.categoryId)
    return [...filtered, newVote]
  })

  useEffect(() => {
    if (!data) {
      return
    }

    const loadVotes = async () => {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/votes`)
      if (!response.ok) {
        setLoading(false)
        return
      }

      if (response.status === 204) {
        setLoading(false)
        return
      }

      const votes = (await response.json()) as Vote[]
      setVotes(votes)
      setLoading(false)
    }

    loadVotes()
  }, [data])

  const createVote = async (categoryId: string, referenceId: string, type: CategoryType) => {
    if (!data) {
      return
    }

    const alreadyVotedForReference = optimisticVotes.some((vote) => vote.referenceId === referenceId)
    // Check to prevent voting for the same reference id again
    if (alreadyVotedForReference) {
      return
    }

    // 1. Optimistic Update: Update the state immediately
    const optimisticVote: Vote = {
      userId: data.user.id,
      categoryId,
      referenceId,
      referenceType: type,
      createdAt: new Date(),
    }

    startTransition(async () => {
      addOptimisticVote(optimisticVote)

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${categoryId}/vote`, {
          method: 'POST',
          body: JSON.stringify({ referenceId, referenceType: type }),
        })

        if (!response.ok) {
          throw new Error('Vote failed')
        }

        setVotes((prevVotes) => {
          // Remove already existing votes for this category
          const filtered = prevVotes.filter((v) => v.categoryId !== categoryId)
          return [...filtered, optimisticVote]
        })
      } catch (error) {
        console.error('Failed to submit vote:', error)
      }
    })
  }

  return (
    <VotesContext.Provider value={{ votes: optimisticVotes, isLoading, createVote }}>{children}</VotesContext.Provider>
  )
}
