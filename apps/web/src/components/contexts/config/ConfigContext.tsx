'use client'

import { createContext, useContext } from 'react'

export type ConfigContextType = {
  votingEndDate: Date
  isVotingPhaseOver: boolean
}

export const ConfigContext = createContext<ConfigContextType>({
  votingEndDate: new Date(),
  isVotingPhaseOver: false,
})

export const useConfigContext = () => useContext(ConfigContext)
