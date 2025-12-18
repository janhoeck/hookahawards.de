'use client'

import { useVotesContext } from '@/components/contexts/votes/VotesContext'
import { StreamerAvatarList } from '@/components/shared/StreamerAvatar/StreamerAvatarList'
import { useSession } from '@/lib/auth/auth-client'
import { checkVote, extractYoutubeId } from '@/lib/utils'
import { Clip } from '@/lib/types'
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  useIsMounted,
} from '@janhoeck/ui'
import { Check } from 'lucide-react'
import Image from 'next/image'

import { VoteButton } from '../VoteButton'

type ClipCardProps = {
  clip: Clip
  onClickAction: (clip: Clip) => void
}

export const ClipCard = (props: ClipCardProps) => {
  const { clip, onClickAction } = props
  const { votes } = useVotesContext()

  const isMounted = useIsMounted()
  const { data } = useSession()

  const clipYouTubeId = extractYoutubeId(clip.link)
  const clipThumbnailUrl = `https://i.ytimg.com/vi/${clipYouTubeId}/0.jpg`

  const voted = checkVote(votes, clip.id)

  return (
    <Card
      className='group cursor-pointer overflow-hidden pt-0'
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
      <CardHeader>
        <CardTitle>{clip.title}</CardTitle>
        <CardDescription>{clip.description}</CardDescription>
        <StreamerAvatarList streamerIds={clip.streamerIds} />
      </CardHeader>
      <CardFooter className='gap-3 max-sm:flex-col max-sm:items-stretch'>
        <VoteButton
          className='mt-auto w-full'
          categoryId={clip.categoryId}
          referenceId={clip.id}
          type='clip'
          disabled={!isMounted || !data}
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
