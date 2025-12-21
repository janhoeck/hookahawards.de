import { Category } from '@/lib/types'

import { CategoryTable } from './table/CategoryTable'

type CategoryTableContainerProps = {
  categories: Category[]
}

export const CategoryTableContainer = (props: CategoryTableContainerProps) => {
  const { categories } = props

  if (categories.length === 0) {
    return <span className='text-muted-foreground'>Keine Kategorien vorhanden</span>
  }

  return <CategoryTable categories={categories} />
}
