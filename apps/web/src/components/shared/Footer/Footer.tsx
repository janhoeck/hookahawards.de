import { SocialButton } from '@/components/shared/Footer/SocialButton'
import { SiDiscord, SiInstagram, SiTwitch, SiYoutube } from '@icons-pack/react-simple-icons'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className='flex w-full flex-col items-center p-4'>
      <div className='mb-4 flex flex-row space-x-4'>
        <SocialButton
          href='https://www.instagram.com/aykut_hookah/'
          icon={SiInstagram}
        />
        <SocialButton
          href='https://discord.gg/rwuv2FVD'
          icon={SiDiscord}
        />
        <SocialButton
          href='https://www.twitch.tv/aykut_hookah'
          icon={SiTwitch}
        />
        <SocialButton
          href='https://www.youtube.com/@Aykut_Hookah'
          icon={SiYoutube}
        />
      </div>
      <div className='text-muted-foreground space-y-2 text-center'>
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
