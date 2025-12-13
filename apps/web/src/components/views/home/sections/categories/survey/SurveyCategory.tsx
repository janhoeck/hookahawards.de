import { CategoryContainer } from '../CategoryContainer'
import { SurveyOptionGrid } from './SurveyOptionGrid'
import { Category } from '@janhoeck/domain'
import { surveyRepository } from '@/lib/db/db'

type SurveyVotingSectionProps = {
  category: Category
}

export const SurveyCategory = async (props: SurveyVotingSectionProps) => {
  const { category } = props

  const surveys = await surveyRepository.getSurveysByCategoryId(category.id)

  return (
    <CategoryContainer category={category}>
      <SurveyOptionGrid surveys={surveys} />
    </CategoryContainer>
  )
}
