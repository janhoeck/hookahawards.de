import { Category } from '@janhoeck/domain'

import { CategoryContainer } from '../CategoryContainer'
import { ClipCategoryContent } from './ClipCategoryContent'

type ClipCategoryProps = {
  category: Category
}

export const ClipCategory = (props: ClipCategoryProps) => {
  const { category } = props

  return (
    <CategoryContainer category={category}>
      <ClipCategoryContent category={category} />
    </CategoryContainer>
  )
}
