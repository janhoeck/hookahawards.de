'use client'

import { twMerge } from 'tailwind-merge'
import { TwitchAccountButton } from './TwitchAccountButton'
import { Card, CardContent, CardHeader, H3, H4, List, Muted } from '@janhoeck/ui'
import Image from 'next/image'
import { VotingPhaseTimer } from './VotingPhaseTimer'
import { useConfigContext } from '@/components/contexts/config/ConfigContext'

type HeroSectionProps = {
  className?: string
}

export const HeroSection = (props: HeroSectionProps) => {
  const { className } = props
  const { votingEndDate, isVotingPhaseOver } = useConfigContext()

  return (
    <section className={twMerge(['flex flex-col items-center', className])}>
      <div className='relative max-w-4xl mx-auto text-center space-y-8 px-4'>
        {/* Background effects */}
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[600px] bg-primary/10 rounded-full blur-3xl' />
        </div>
        <div className='relative h-45 w-45 mx-auto'>
          <Image
            fill
            src='/images/logo.webp'
            alt='Logo'
          />
        </div>
        {/* Subtitle */}
        <div className='space-y-4 max-w-2xl mx-auto'>
          <H3>Willkommen zum „Best of 2025" Community-Voting!</H3>
          <Muted>
            Das Jahr 2025 war voller legendärer Momente, unerwarteter Fails und absoluter Highlight-Clips. Jetzt ist
            deine Stimme gefragt! Hier kannst du für die besten Clips des Jahres abstimmen und gemeinsam mit der
            Community entscheiden, welche Momente in die Hall of Fame kommen. Du hast Zeit bis zum{' '}
            {votingEndDate.toLocaleDateString('de-DE')} abzustimmen.
          </Muted>
        </div>

        {/* Countdown */}
        <VotingPhaseTimer />

        {!isVotingPhaseOver && (
          <>
            {/* How it works */}
            <Card className='max-w-xl mx-auto'>
              <CardHeader>
                <H4 className='font-semibold text-lg text-foreground'>So funktioniert's:</H4>
              </CardHeader>
              <CardContent>
                <List className='space-y-3 text-left ml-0'>
                  <li className='flex items-start gap-3'>
                    <span className='flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center'>
                      1
                    </span>
                    <span className='text-muted-foreground'>Logge dich mit deinem Twitch Account ein</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <span className='flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center'>
                      2
                    </span>
                    <span className='text-muted-foreground'>Schau dir die nominierten Clips an</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <span className='flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center'>
                      3
                    </span>
                    <span className='text-muted-foreground'>Wähle deinen Favoriten in jeder Kategorie</span>
                  </li>
                </List>
              </CardContent>
            </Card>
            <TwitchAccountButton />
          </>
        )}
      </div>
    </section>
  )
}
