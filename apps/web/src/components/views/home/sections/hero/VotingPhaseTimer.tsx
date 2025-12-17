'use client'

import CountdownTimer from '@/components/shared/Countdown/CountdownTimer'

import { useConfigContext } from '../../../../contexts/config/ConfigContext'

export const VotingPhaseTimer = () => {
  const { votingEndDate } = useConfigContext()
  return <CountdownTimer targetDate={votingEndDate} />
}
