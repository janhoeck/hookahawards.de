'use client'

import { useConfigContext } from '@/components/contexts/config/ConfigContext'
import { Card, CardContent, CardHeader, H3, H4, List, Muted } from '@janhoeck/ui'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { TwitchAccountButton } from './TwitchAccountButton'
import { VotingPhaseTimer } from './VotingPhaseTimer'

type HeroSectionProps = {
  className?: string
}

export const HeroSection = (props: HeroSectionProps) => {
  const { className } = props
  const { votingEndDate, isVotingPhaseOver } = useConfigContext()

  return (
    <section className={twMerge(['flex flex-col items-center', className])}>
      <div className='relative mx-auto max-w-4xl space-y-8 px-4 text-center'>
        {/* Background effects */}
        <div className='pointer-events-none absolute inset-0'>
          <div className='bg-primary/10 absolute top-1/2 left-1/2 h-[600px] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl' />
        </div>
        <div className='relative mx-auto h-45 w-45'>
          <Image
            fill
            src='/images/logo.webp'
            alt='Logo'
          />
        </div>
        {/* Subtitle */}
        <div className='mx-auto max-w-2xl space-y-4'>
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
            <Card className='mx-auto max-w-xl'>
              <CardHeader>
                <H4 className='text-foreground text-lg font-semibold'>So funktioniert's:</H4>
              </CardHeader>
              <CardContent>
                <List className='ml-0 space-y-3 text-left'>
                  <li className='flex items-start gap-3'>
                    <span className='bg-primary text-primary-foreground flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold'>
                      1
                    </span>
                    <span className='text-muted-foreground'>Logge dich mit deinem Twitch Account ein</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <span className='bg-primary text-primary-foreground flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold'>
                      2
                    </span>
                    <span className='text-muted-foreground'>Schau dir die nominierten Clips an</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <span className='bg-primary text-primary-foreground flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold'>
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
