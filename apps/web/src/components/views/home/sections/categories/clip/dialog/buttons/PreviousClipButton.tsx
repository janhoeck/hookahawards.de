import { Button } from '@janhoeck/ui'
import { ChevronLeft } from 'lucide-react'

type PreviousClipButtonProps = {
  onClick?: () => void
}

export const PreviousClipButton = (props: PreviousClipButtonProps) => {
  const { onClick } = props
  return (
    <Button
      disabled={typeof onClick !== 'function'}
      variant='default'
      size='icon'
      onClick={onClick}
    >
      <ChevronLeft />
    </Button>
  )
}
