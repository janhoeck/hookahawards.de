import { IconType } from '@icons-pack/react-simple-icons'
import { Button } from '@janhoeck/ui'
import Link from 'next/link'

export type SocialButtonProps = {
  href: string
  icon: IconType
}

export const SocialButton = (props: SocialButtonProps) => {
  const { href, icon: Icon } = props
  return (
    <Button
      asChild
      variant='outline'
      size='icon'
    >
      <Link
        href={href}
        target='_blank'
      >
        <Icon />
      </Link>
    </Button>
  )
}
