import { NextClipButton } from './buttons/NextClipButton'
import { DesktopOnly, DialogContent, DialogDescription, DialogHeader, DialogTitle, MobileOnly } from '@janhoeck/ui'

import { ResponsiveYouTubeVideo } from './ResponsiveYouTubeVideo'
import { PreviousClipButton } from './buttons/PreviousClipButton'
import { Category, Clip } from '@janhoeck/domain'

export type ClipDialogContentProps = {
  clip: Clip
  category: Category
  onPrevClick?: () => void
  onNextClick?: () => void
}

export const ClipDialogContent = (props: ClipDialogContentProps) => {
  const { clip, category, onNextClick, onPrevClick } = props

  return (
    <DialogContent className='h-screen max-w-screen! block rounded-none bg-transparent'>
      <DialogHeader className='mb-12'>
        <DialogTitle>{clip.title}</DialogTitle>
        <DialogDescription>{clip.description}</DialogDescription>
      </DialogHeader>
      <div className='grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-center gap-4 w-full max-w-5xl mx-auto'>
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
