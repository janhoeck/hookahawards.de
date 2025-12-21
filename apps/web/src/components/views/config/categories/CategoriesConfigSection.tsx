'use client'

import { useCategories } from '@/lib/hooks'
import { H3 } from '@janhoeck/ui'

import { ConfigSectionSkeleton } from '../ConfigSectionSkeleton'
import { CategoryTableContainer } from './CategoryTableContainer'
import { CreateCategoryButton } from './creation/CreateCategoryButton'

export const CategoriesConfigSection = () => {
  const { data: categories, isPending } = useCategories()

  if (isPending) {
    return <ConfigSectionSkeleton />
  }

  return (
    <section>
      <div className='flex justify-between'>
        <H3 className='mb-6'>Kategorien</H3>
        <CreateCategoryButton categories={categories} />
      </div>
      <CategoryTableContainer categories={categories} />
    </section>
  )
}
