'use client'

import { StreamerAvatarList } from '@/components/shared/StreamerAvatar/StreamerAvatarList'
import { useSession } from '@/lib/auth/auth-client'
import { useUserVotes } from '@/lib/hooks'
import { Clip } from '@/lib/types'
import { checkVote, extractYoutubeId } from '@/lib/utils'
import { Badge, Card, CardContent, CardFooter, CardHeader, CardTitle, useIsMounted } from '@janhoeck/ui'
import { Check } from 'lucide-react'
import Image from 'next/image'

import { VoteButton } from '../VoteButton'

type ClipCardProps = {
  clip: Clip
  onClickAction: (clip: Clip) => void
}

export const ClipCard = (props: ClipCardProps) => {
  const { clip, onClickAction } = props
  const { data: votes } = useUserVotes()

  const isMounted = useIsMounted()
  const { data: session } = useSession()

  const clipYouTubeId = extractYoutubeId(clip.link)
  const clipThumbnailUrl = `https://i.ytimg.com/vi/${clipYouTubeId}/0.jpg`

  const voted = checkVote(votes, clip.id)

  return (
    <Card
      className='group h-full cursor-pointer overflow-hidden pt-0'
      onClick={() => onClickAction(clip)}
    >
      <CardContent className='px-0'>
        <div className='relative aspect-video overflow-hidden'>
          {voted && <Badge className='absolute top-2 right-2 z-10'>Ausgewählt</Badge>}
          <Image
            fill
            loading='lazy'
            quality={100}
            className='object-cover transition-all duration-300 group-hover:scale-110'
            src={clipThumbnailUrl}
            alt={clip.title}
            sizes='(max-width: 768px) 100vw, 384px'
          />
        </div>
      </CardContent>
      <CardHeader className='grow grid-rows-[min-content_auto]'>
        <CardTitle className='pb-2'>{clip.title}</CardTitle>
        <StreamerAvatarList streamerIds={clip.streamerIds} />
      </CardHeader>
      <CardFooter className='gap-3 max-sm:flex-col max-sm:items-stretch'>
        <VoteButton
          className='mt-auto w-full'
          categoryId={clip.categoryId}
          referenceId={clip.id}
          type='clip'
          disabled={!isMounted || !session}
          label={(voted) =>
            voted ? (
              <>
                <Check />
                Ausgewählt
              </>
            ) : (
              'Auswählen'
            )
          }
        />
      </CardFooter>
    </Card>
  )
}
