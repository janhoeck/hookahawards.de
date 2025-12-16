'use client'

import ClipCardGrid from './ClipCardGrid'
import { Category } from '@janhoeck/domain'
import { useDataContext } from '@/components/contexts/data/DataContext'

type ClipCategoryContentProps = {
  category: Category
}

export const ClipCategoryContent = (props: ClipCategoryContentProps) => {
  const { category } = props
  const { clips } = useDataContext()

  return (
    <ClipCardGrid
      clips={clips.filter((clip) => clip.categoryId === category.id)}
      category={category}
    />
  )
}
