'use client'

import { useVotesContext } from '@/components/contexts/votes/VotesContext'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  useConfettiCannons,
} from '@janhoeck/ui'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const CONFETTI_FIRED_KEY = 'voting_confetti_fired'

export const VotingFeedback = () => {
  const { hasCompletelyVoted } = useVotesContext()
  const { start } = useConfettiCannons()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    console.log({ hasCompletelyVoted })
    if (hasCompletelyVoted) {
      const hasConfettiFired = localStorage.getItem(CONFETTI_FIRED_KEY)
      console.log({ hasConfettiFired })
      if (!hasConfettiFired) {
        setIsOpen(true)
        start()
        localStorage.setItem(CONFETTI_FIRED_KEY, 'true')
      }
    }
  }, [hasCompletelyVoted, start])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <div className='relative mx-auto'>
            <Image
              height={400}
              width={400}
              src='/images/aykut_young.png'
              alt='Aykut'
            />
          </div>
          <DialogHeader>
            <DialogTitle>Du hast es geschafft!</DialogTitle>
            <DialogDescription>
              Vielen Dank, dass du dir die Zeit genommen und abgestimmt hast. Ich freue mich schon auf 2026!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
