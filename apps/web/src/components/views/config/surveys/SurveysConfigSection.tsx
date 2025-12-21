'use client'

import { useCategories } from '@/lib/hooks'
import { useSurveys } from '@/lib/hooks/queries/useSurveys'
import { H3 } from '@janhoeck/ui'

import { ConfigSectionSkeleton } from '../ConfigSectionSkeleton'
import { SurveyTableContainer } from './SurveyTableContainer'
import { CreateSurveyButton } from './creation/CreateSurveyButton'

export const SurveysConfigSection = () => {
  const { data: surveys, isPending: isSurveysPending } = useSurveys()
  const { data: categories, isPending: isCategoriesPending } = useCategories()

  if (isSurveysPending || isCategoriesPending) {
    return <ConfigSectionSkeleton />
  }

  return (
    <section>
      <div className='flex justify-between'>
        <H3 className='mb-6'>Umfragen</H3>
        <CreateSurveyButton categories={categories} />
      </div>
      <SurveyTableContainer
        categories={categories}
        surveys={surveys}
      />
    </section>
  )
}
