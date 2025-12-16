'use client'

import { CategoryContainer } from '../CategoryContainer'
import { SurveyOptionGrid } from './SurveyOptionGrid'
import { Category } from '@janhoeck/domain'
import { useDataContext } from '@/components/contexts/data/DataContext'

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
