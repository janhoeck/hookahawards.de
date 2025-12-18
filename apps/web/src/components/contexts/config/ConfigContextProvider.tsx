'use client'

import { PropsWithChildren } from 'react'

import { ConfigContext } from './ConfigContext'
import { Config } from '@/lib/types'

export type ConfigContextProviderProps = PropsWithChildren<{
  config: Config
}>

export const ConfigContextProvider = (props: ConfigContextProviderProps) => {
  const { children, config } = props
  const votingEndDate = new Date(config['voting_end_date'] as string)

  return (
    <ConfigContext.Provider
      value={{ votingEndDate, isVotingPhaseOver: votingEndDate.getTime() - new Date().getTime() <= 0 }}
    >
      {children}
    </ConfigContext.Provider>
  )
}
