'use client'

import { useVotesContext } from '@/components/contexts/votes/VotesContext'
import { StreamerAvatarList } from '@/components/shared/StreamerAvatar/StreamerAvatarList'
import { useSession } from '@/lib/auth-client'
import { checkVote } from '@/utils/check-vote'
import { extractYoutubeId } from '@/utils/extract-youtube-id'
import { Clip } from '@janhoeck/domain'
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
      className='pt-0 overflow-hidden group cursor-pointer'
      onClick={() => onClickAction(clip)}
    >
      <CardContent className='px-0'>
        <div className='aspect-video relative overflow-hidden'>
          {voted && <Badge className='absolute top-2 right-2 z-10'>Ausgewählt</Badge>}
          <Image
            fill
            loading='lazy'
            className='object-cover group-hover:scale-110 transition-all duration-300'
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
