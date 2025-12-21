import { Clip } from '@/lib/types'
import { DesktopOnly, DialogContent, DialogDescription, DialogHeader, DialogTitle, MobileOnly } from '@janhoeck/ui'

import { ResponsiveYouTubeVideo } from './ResponsiveYouTubeVideo'
import { NextClipButton } from './buttons/NextClipButton'
import { PreviousClipButton } from './buttons/PreviousClipButton'

export type ClipDialogContentProps = {
  clip: Clip
  onPrevClick?: () => void
  onNextClick?: () => void
}

export const ClipDialogContent = (props: ClipDialogContentProps) => {
  const { clip, onNextClick, onPrevClick } = props

  return (
    <DialogContent className='block h-screen max-w-screen! rounded-none bg-transparent'>
      <DialogHeader className='mb-12'>
        <DialogTitle>{clip.title}</DialogTitle>
        <DialogDescription>{clip.description}</DialogDescription>
      </DialogHeader>
      <div className='mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-4 lg:grid-cols-[auto_1fr_auto]'>
        <DesktopOnly>
          <PreviousClipButton onClick={onPrevClick} />
        </DesktopOnly>
        <ResponsiveYouTubeVideo clip={clip} />
        <DesktopOnly>
          <NextClipButton onClick={onNextClick} />
        </DesktopOnly>
        <MobileOnly>
          <div className='flex justify-between'>
            <PreviousClipButton onClick={onPrevClick} />
            <NextClipButton onClick={onNextClick} />
          </div>
        </MobileOnly>
      </div>
    </DialogContent>
  )
}
