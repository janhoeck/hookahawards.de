import { checkVote } from '@/utils/check-vote'
import { Button } from '@janhoeck/ui'
import React, { MouseEventHandler, useState } from 'react'

import { useVotesContext } from './context/VotesContext'
import { CategoryType } from '@janhoeck/domain'

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

  const [isVotePending, setVotePending] = useState<boolean>(false)
  const { votes, isLoading, createVote } = useVotesContext()

  const handleVoteButtonClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation()

    setVotePending(true)
    await createVote(categoryId, referenceId, type)
    setVotePending(false)
  }

  const voted = checkVote(votes, referenceId)

  return (
    <Button
      className={className}
      variant={voted ? 'default' : 'outline'}
      disabled={disabled || isLoading || isVotePending}
      onClick={handleVoteButtonClick}
    >
      {label(voted)}
    </Button>
  )
}
