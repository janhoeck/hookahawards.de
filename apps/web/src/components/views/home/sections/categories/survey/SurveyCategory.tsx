'use client'

import { useDataContext } from '@/components/contexts/data/DataContext'
import { Category } from '@janhoeck/domain'

import { CategoryContainer } from '../CategoryContainer'
import { SurveyOptionGrid } from './SurveyOptionGrid'

type SurveyVotingSectionProps = {
  category: Category
}

export const SurveyCategory = (props: SurveyVotingSectionProps) => {
  const { category } = props
  const { surveys } = useDataContext()

  return (
    <CategoryContainer category={category}>
      <SurveyOptionGrid surveys={surveys.filter((survey) => survey.categoryId === category.id)} />
    </CategoryContainer>
  )
}
