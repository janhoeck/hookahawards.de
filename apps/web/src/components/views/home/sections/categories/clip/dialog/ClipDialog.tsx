import { Category, Clip } from '@janhoeck/domain'
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
  const { selectedClip, category, onOpenChange, onNextClick, onPrevClick } = props

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
            category={category}
            onNextClick={onNextClick}
            onPrevClick={onPrevClick}
          />
        )}
      </DialogPortal>
    </Dialog>
  )
}
