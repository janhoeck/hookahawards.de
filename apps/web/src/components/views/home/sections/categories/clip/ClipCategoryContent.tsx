'use client'

import { useCategoryClips } from '@/lib/hooks'
import { Category } from '@/lib/types'

import ClipCardGrid from './ClipCardGrid'

type ClipCategoryContentProps = {
  category: Category
}

export const ClipCategoryContent = (props: ClipCategoryContentProps) => {
  const { category } = props
  const { isPending, error, data } = useCategoryClips(category.id)

  if (isPending || error) {
    return null
  }

  return (
    <ClipCardGrid
      clips={data.pages.flatMap((page) => page.items)}
      category={category}
    />
  )
}
