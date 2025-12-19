import { useConfigContext } from '@/components/contexts/config/ConfigContext'
import { useAddVote, useUserVotes } from '@/lib/hooks'
import { CategoryType } from '@/lib/types'
import { checkVote } from '@/lib/utils'
import { Button } from '@janhoeck/ui'
import React, { MouseEventHandler } from 'react'

type VoteButtonProps = {
  className?: string
  disabled?: boolean
  categoryId: string
  referenceId: string
  type: CategoryType
  label: (selected: boolean) => React.ReactNode
}

export const VoteButton = (props: VoteButtonProps) => {
  const { className, disabled, categoryId, referenceId, type, label } = props

  const { isPending: isFetchPending, data: votes } = useUserVotes()
  const { isPending: isAddVotePending, mutate } = useAddVote(categoryId, referenceId, type)
  const { isVotingPhaseOver } = useConfigContext()

  const handleVoteButtonClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation()
    mutate({
      createdAt: new Date(),
      userId: '',
      categoryId,
      referenceId,
      referenceType: type,
    })
  }

  const voted = checkVote(votes, referenceId)

  return (
    <Button
      className={className}
      variant={voted ? 'default' : 'outline'}
      disabled={disabled || isFetchPending || isAddVotePending || isVotingPhaseOver}
      onClick={handleVoteButtonClick}
    >
      {label(voted)}
    </Button>
  )
}
