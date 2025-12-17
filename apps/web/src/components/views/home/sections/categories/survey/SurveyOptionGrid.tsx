'use client'

import { useSession } from '@/lib/auth-client'
import { Survey } from '@janhoeck/domain'
import { Variants, motion, stagger } from 'motion/react'

import { VoteButton } from '../VoteButton'

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: stagger(0.07) },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 18,
    },
  },
}

type SurveyItemGridProps = {
  surveys: Survey[]
}

export const SurveyOptionGrid = (props: SurveyItemGridProps) => {
  const { surveys } = props

  const { data } = useSession()
  const disabled = !data

  return (
    <motion.div
      className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'
      variants={container}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
    >
      {surveys.map((survey) => (
        <motion.div
          key={survey.id}
          variants={item}
          whileHover={
            disabled
              ? undefined
              : {
                  scale: 1.04,
                  transition: { type: 'spring', stiffness: 300, damping: 15 },
                }
          }
          whileTap={disabled ? undefined : { scale: 0.98 }}
        >
          <VoteButton
            className='w-full transition-all duration-300'
            categoryId={survey.categoryId}
            referenceId={survey.id}
            type='survey'
            label={() => survey.title}
            disabled={disabled}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
