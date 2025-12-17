'use client'

import { useDataContext } from '@/components/contexts/data/DataContext'
import { Category } from '@janhoeck/domain'

import ClipCardGrid from './ClipCardGrid'

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
