'use client'

import { useCategories, useClips, useStreamers } from '@/lib/hooks'
import { H3 } from '@janhoeck/ui'

import { ConfigSectionSkeleton } from '../ConfigSectionSkeleton'
import { ClipTableContainer } from './ClipTableContainer'
import { CreateClipButton } from './creation/CreateClipButton'

export const ClipsConfigSection = () => {
  const { data: clips, isPending: isClipsPending } = useClips()
  const { data: categories, isPending: isCategoriesPending } = useCategories()
  const { data: streamers, isPending: isStreamersPending } = useStreamers()

  if (isClipsPending || isCategoriesPending || isStreamersPending) {
    return <ConfigSectionSkeleton />
  }

  return (
    <section>
      <div className='flex justify-between'>
        <H3 className='mb-6'>Clips</H3>
        <CreateClipButton
          categories={categories}
          streamers={streamers}
        />
      </div>
      <ClipTableContainer
        categories={categories}
        clips={clips}
        streamers={streamers}
      />
    </section>
  )
}
