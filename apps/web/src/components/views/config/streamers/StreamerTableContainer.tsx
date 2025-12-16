'use client'

import { useDataContext } from '@/components/contexts/data/DataContext'

import { StreamerTable } from './StreamerTable'

export const StreamerTableContainer = () => {
  const { streamers } = useDataContext()

  if (streamers.length === 0) {
    return <span className='text-muted-foreground'>Keine Streamer vorhanden</span>
  }

  return <StreamerTable />
}
