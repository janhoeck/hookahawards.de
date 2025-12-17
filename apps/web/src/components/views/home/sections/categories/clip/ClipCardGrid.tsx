'use client'

import { Category, Clip } from '@janhoeck/domain'
import { Variants, motion, stagger } from 'motion/react'
import { useMemo, useState } from 'react'

import { ClipCard } from './ClipCard'
import { ClipDialog } from './dialog/ClipDialog'

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: stagger(0.08) },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 220, damping: 16 },
  },
}

type ClipCardGridProps = {
  clips: Clip[]
  category: Category
}

const ClipCardGrid = (props: ClipCardGridProps) => {
  const { clips, category } = props

  const [selectedClipId, setSelectedClipId] = useState<string | undefined>(undefined)

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedClipId(undefined)
    }
  }

  const selectedClip = clips.find((clip) => clip.id === selectedClipId)

  const prevClip = useMemo<Clip | undefined>(() => {
    if (!selectedClipId) {
      return undefined
    }

    const selectedClipIndex = clips.findIndex((clip) => clip.id === selectedClipId)
    return clips[selectedClipIndex - 1]
  }, [clips, selectedClipId])

  const nextClip = useMemo<Clip | undefined>(() => {
    if (!selectedClipId) {
      return undefined
    }

    const selectedClipIndex = clips.findIndex((clip) => clip.id === selectedClipId)
    return clips[selectedClipIndex + 1]
  }, [clips, selectedClipId])

  return (
    <>
      <motion.div
        className='grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'
        variants={container}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.1 }}
      >
        {clips.map((clip) => (
          <motion.div
            key={clip.id}
            variants={item}
            whileHover={{ scale: 1.03 }}
          >
            <ClipCard
              clip={clip}
              onClickAction={(clip) => setSelectedClipId(clip.id)}
            />
          </motion.div>
        ))}
      </motion.div>
      <ClipDialog
        selectedClip={selectedClip}
        category={category}
        onOpenChange={handleOpenChange}
        onPrevClick={prevClip ? () => setSelectedClipId(prevClip.id) : undefined}
        onNextClick={nextClip ? () => setSelectedClipId(nextClip.id) : undefined}
      />
    </>
  )
}
export default ClipCardGrid
