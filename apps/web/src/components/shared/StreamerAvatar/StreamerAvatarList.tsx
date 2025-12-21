import { useStreamers } from '@/lib/hooks'
import { Muted } from '@janhoeck/ui'
import Link from 'next/link'

import { StreamerAvatar } from './StreamerAvatar'
import { StreamerAvatarListSkeleton } from './StreamerAvatarListSkeleton'

type StreamerAvatarListProps = {
  streamerIds: string[]
}

export const StreamerAvatarList = (props: StreamerAvatarListProps) => {
  const { streamerIds } = props
  const { isPending, data: streamers } = useStreamers()

  if (streamerIds.length === 0) {
    return null
  }

  if (isPending) {
    return <StreamerAvatarListSkeleton amount={streamerIds.length} />
  }

  return (
    <div className='flex flex-row flex-wrap items-center gap-2'>
      <div className='*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2'>
        {streamerIds.map((streamerId) => (
          <StreamerAvatar
            key={streamerId}
            username={streamers.find((streamer) => streamer.id === streamerId)?.name ?? ''}
          />
        ))}
      </div>
      <Muted>
        {streamerIds.flatMap((streamerId, index) => {
          const username = streamers.find((streamer) => streamer.id === streamerId)?.name ?? ''
          return [
            <Link
              key={streamerId}
              href={`https://twitch.tv/${username}`}
              target='_blank'
              onClick={(event) => event.stopPropagation()}
            >
              {username}
            </Link>,
            index < streamerIds.length - 1 ? ', ' : null,
          ]
        })}
      </Muted>
    </div>
  )
}
