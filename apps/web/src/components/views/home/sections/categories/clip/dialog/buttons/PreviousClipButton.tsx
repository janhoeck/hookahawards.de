import { Button } from '@janhoeck/ui'
import { GoChevronLeft } from 'react-icons/go'

type PreviousClipButtonProps = {
  onClick?: () => void
}

export const PreviousClipButton = (props: PreviousClipButtonProps) => {
  const { onClick } = props
  return (
    <Button
      disabled={typeof onClick !== 'function'}
      variant='default'
      onClick={onClick}
    >
      <GoChevronLeft size={20} />
    </Button>
  )
}
