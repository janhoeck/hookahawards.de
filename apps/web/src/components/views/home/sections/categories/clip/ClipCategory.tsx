import { CategoryContainer } from '../CategoryContainer'
import { ClipCategoryContent } from './ClipCategoryContent'
import { Category } from '@janhoeck/domain'

type ClipCategoryProps = {
  category: Category
}

export const ClipCategory = async (props: ClipCategoryProps) => {
  const { category } = props

  return (
    <CategoryContainer category={category}>
      <ClipCategoryContent category={category} />
    </CategoryContainer>
  )
}
