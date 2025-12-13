'use client'

import { useDataContext } from '@/components/contexts/data/DataContext'

import { CategoryTable } from './CategoryTable'

export const CategoryTableContainer = () => {
  const { categories } = useDataContext()

  if (categories.length === 0) {
    return <span className='text-muted-foreground'>Keine Kategorien vorhanden</span>
  }

  return <CategoryTable />
}
