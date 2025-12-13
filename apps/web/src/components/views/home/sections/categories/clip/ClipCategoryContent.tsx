import ClipCardGrid from './ClipCardGrid'
import { Category } from '@janhoeck/domain'
import { clipRepository } from '@/lib/db/db'

type ClipCategoryContentProps = {
  category: Category
}

export const ClipCategoryContent = async (props: ClipCategoryContentProps) => {
  const { category } = props

  const clips = await clipRepository.getClipsByCategoryId(category.id)

  return (
    <ClipCardGrid
      clips={clips}
      category={category}
    />
  )
}
