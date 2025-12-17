'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@janhoeck/ui'
import { useEffect, useState } from 'react'

import { getCachedAvatar } from './avatarCache'

type StreamerAvatarProps = {
  username: string
}

export const StreamerAvatar = (props: StreamerAvatarProps) => {
  const { username } = props
  const [imageUrl, setImageUrl] = useState<string>(
    'https://static-cdn.jtvnw.net/user-default-pictures-uv/cdd517fe-def4-11e9-948e-784f43822e80-profile_image-150x150.png'
  )

  useEffect(() => {
    getCachedAvatar(username).then(setImageUrl).catch(console.error)
  }, [username])

  return (
    <Avatar>
      <AvatarImage
        src={imageUrl}
        alt={username}
      />
      <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}
