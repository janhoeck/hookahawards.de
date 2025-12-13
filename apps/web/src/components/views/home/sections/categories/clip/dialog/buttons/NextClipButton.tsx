import { Button } from '@janhoeck/ui'
import { GoChevronRight } from 'react-icons/go'

type NextClipButtonProps = {
  onClick?: () => void
}

export const NextClipButton = (props: NextClipButtonProps) => {
  const { onClick } = props
  return (
    <Button
      disabled={typeof onClick !== 'function'}
      variant='default'
      onClick={onClick}
    >
      <GoChevronRight size={20} />
    </Button>
  )
}
