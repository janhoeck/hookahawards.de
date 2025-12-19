'use client'

import { useCategorySurveys } from '@/lib/hooks'
import { Category } from '@/lib/types'

import { CategoryContainer } from '../CategoryContainer'
import { SurveyOptionGrid } from './SurveyOptionGrid'

type SurveyVotingSectionProps = {
  category: Category
}

export const SurveyCategory = (props: SurveyVotingSectionProps) => {
  const { category } = props
  const { isPending, error, data } = useCategorySurveys(category.id)

  if (isPending || error) {
    return null
  }

  return (
    <CategoryContainer category={category}>
      <SurveyOptionGrid surveys={data.pages.flatMap((page) => page.items)} />
    </CategoryContainer>
  )
}
