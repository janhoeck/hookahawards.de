import { Button } from '@janhoeck/ui'
import Link from 'next/link'
import { IconType } from 'react-icons'

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
        <Icon size={20} />
      </Link>
    </Button>
  )
}
