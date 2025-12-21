'use client'

import { useStreamers } from '@/lib/hooks'
import { H3 } from '@janhoeck/ui'

import { ConfigSectionSkeleton } from '../ConfigSectionSkeleton'
import { StreamerTableContainer } from './StreamerTableContainer'
import { CreateStreamerButton } from './creation/CreateStreamerButton'

export const StreamersConfigSection = () => {
  const { data: streamers, isPending } = useStreamers()

  if (isPending) {
    return <ConfigSectionSkeleton />
  }

  return (
    <section>
      <div className='flex justify-between'>
        <H3 className='mb-6'>Streamer</H3>
        <CreateStreamerButton />
      </div>
      <StreamerTableContainer streamers={streamers} />
    </section>
  )
}
