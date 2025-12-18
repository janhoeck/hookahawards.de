import { Category, Clip } from '@/lib/types'
import { Dialog, DialogOverlay, DialogPortal } from '@janhoeck/ui'

import { ClipDialogContent } from './ClipDialogContent'

export type ClipDialogProps = {
  selectedClip?: Clip
  category: Category
  onOpenChange: (open: boolean) => void
  onPrevClick?: () => void
  onNextClick?: () => void
}

export const ClipDialog = (props: ClipDialogProps) => {
  const { selectedClip, onOpenChange, onNextClick, onPrevClick } = props

  return (
    <Dialog
      open={Boolean(selectedClip)}
      onOpenChange={onOpenChange}
    >
      <DialogPortal>
        <DialogOverlay className='bg-dialog-backdrop fixed inset-0 backdrop-blur-sm' />
        {selectedClip && (
          <ClipDialogContent
            clip={selectedClip}
            onNextClick={onNextClick}
            onPrevClick={onPrevClick}
          />
        )}
      </DialogPortal>
    </Dialog>
  )
}
