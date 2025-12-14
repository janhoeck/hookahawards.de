import { Button } from '@janhoeck/ui'
import { ChevronRight } from 'lucide-react'

type NextClipButtonProps = {
  onClick?: () => void
}

export const NextClipButton = (props: NextClipButtonProps) => {
  const { onClick } = props
  return (
    <Button
      disabled={typeof onClick !== 'function'}
      variant='default'
      size='icon'
      onClick={onClick}
    >
      <ChevronRight />
    </Button>
  )
}
