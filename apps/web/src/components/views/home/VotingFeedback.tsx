'use client'

import { useVotingProgress } from '@/lib/hooks'
import { getLocalStorageItem, setLocalStorageItem } from '@/lib/utils'
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
import { useCallback, useEffect, useState } from 'react'

const CONFETTI_FIRED_KEY = 'voting_confetti_fired'

export const VotingFeedback = () => {
  const { allCategoriesVoted } = useVotingProgress()
  const { start } = useConfettiCannons()

  const [isOpen, setIsOpen] = useState(false)

  const startConfetti = useCallback(() => {
    start()
  }, [start])

  useEffect(() => {
    if (allCategoriesVoted) {
      const hasConfettiFired = getLocalStorageItem(CONFETTI_FIRED_KEY)
      if (!hasConfettiFired) {
        setIsOpen(true)
        startConfetti()
        setLocalStorageItem(CONFETTI_FIRED_KEY, 'true')
      }
    }
  }, [allCategoriesVoted, startConfetti])

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
