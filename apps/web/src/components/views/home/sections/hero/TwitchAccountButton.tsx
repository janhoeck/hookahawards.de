'use client'

import { signIn, useSession } from '@/lib/auth/auth-client'
import { SiTwitch } from '@icons-pack/react-simple-icons'
import { Button } from '@janhoeck/ui'
import Image from 'next/image'

export const TwitchAccountButton = () => {
  const { data } = useSession()

  // If data is present, the user is logged in
  if (data) {
    return (
      <Button
        variant='default'
        size='lg'
        className='w-full'
      >
        {data.user.image && (
          <div className='relative h-6 w-6 flex-shrink-0 overflow-hidden rounded-full'>
            <Image
              fill
              src={data.user.image}
              alt={data.user.name}
              sizes='26px'
            />
          </div>
        )}
        Viel Spaß beim Abstimmen, {data.user.name}
      </Button>
    )
  }

  return (
    <Button
      variant='outline'
      size='lg'
      className='w-full'
      onClick={() =>
        signIn.social({
          provider: 'twitch',
          callbackURL: '/',
          errorCallbackURL: '/error',
          newUserCallbackURL: '/',
        })
      }
    >
      <SiTwitch />
      Mit Twitch anmelden
    </Button>
  )
}
