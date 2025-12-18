'use client'

import { useConfigContext } from '@/components/contexts/config/ConfigContext'
import CountdownTimer from '@/components/shared/Countdown/CountdownTimer'

export const VotingPhaseTimer = () => {
  const { votingEndDate } = useConfigContext()
  return <CountdownTimer targetDate={votingEndDate} />
}
