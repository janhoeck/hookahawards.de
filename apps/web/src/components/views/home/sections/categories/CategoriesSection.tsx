'use client'

import { useCategories } from '@/lib/hooks'
import { Fragment } from 'react'

import { ClipCategory } from './clip/ClipCategory'
import { SurveyCategory } from './survey/SurveyCategory'

export const CategoriesSection = () => {
  const { isPending, error, data: categories } = useCategories()

  if (isPending || error) {
    return null
  }

  return (
    <section className='flex flex-col space-y-40'>
      {categories.map((category) => (
        <Fragment key={category.id}>
          {category.type === 'clip' && <ClipCategory category={category} />}
          {category.type === 'survey' && <SurveyCategory category={category} />}
        </Fragment>
      ))}
    </section>
  )
}
