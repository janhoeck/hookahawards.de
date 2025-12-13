import { NextClipButton } from './buttons/NextClipButton'
import {
  Card,
  CardContent,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DesktopOnly,
  MobileOnly,
  DialogHeader,
} from '@janhoeck/ui'
import { GoInfo } from 'react-icons/go'

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
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{category.title}</DialogTitle>
        <DialogDescription>{clip.title}</DialogDescription>
      </DialogHeader>
      <div className='grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-center gap-4 w-full max-w-5xl'>
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
      {clip.description && (
        <Card className='max-w-3xl glass-card'>
          <CardContent className='inline-flex flex-row space-x-4'>
            <div className='flex-shrink-0 mt-0.5'>
              <GoInfo size={20} />
            </div>
            <DialogDescription>{clip.description}</DialogDescription>
          </CardContent>
        </Card>
      )}
    </DialogContent>
  )
}
