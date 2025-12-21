import { Streamer } from '@/lib/types'

import { StreamerTable } from './StreamerTable'

type StreamerTableContainerProps = {
  streamers: Streamer[]
}

export const StreamerTableContainer = (props: StreamerTableContainerProps) => {
  const { streamers } = props

  if (streamers.length === 0) {
    return <span className='text-muted-foreground'>Keine Streamer vorhanden</span>
  }

  return <StreamerTable streamers={streamers} />
}
