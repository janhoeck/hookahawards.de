import { SocialButton } from '@/components/shared/Footer/SocialButton'
import Link from 'next/link'
import { FaDiscord, FaInstagram, FaTwitch, FaYoutube } from 'react-icons/fa'

export const Footer = () => {
  return (
    <footer className='w-full p-4 flex flex-col items-center'>
      <div className='flex flex-row space-x-4 mb-4'>
        <SocialButton
          href='https://www.instagram.com/aykut_hookah/'
          icon={FaInstagram}
        />
        <SocialButton
          href='https://discord.gg/rwuv2FVD'
          icon={FaDiscord}
        />
        <SocialButton
          href='https://www.twitch.tv/aykut_hookah'
          icon={FaTwitch}
        />
        <SocialButton
          href='https://www.youtube.com/@Aykut_Hookah'
          icon={FaYoutube}
        />
      </div>
      <div className='text-muted-foreground text-center space-y-2'>
        <p>
          <span>All rights reserved</span>
          <span> - </span>
          <Link href='/imprint'>Impressum</Link>
          <span> - </span>
          <Link href='/privacy'>Datenschutz</Link>
        </p>
        <p className='text-sm'>Made with ❤️ for the Community</p>
      </div>
    </footer>
  )
}
