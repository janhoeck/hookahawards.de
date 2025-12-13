import { Fragment } from 'react'

import { ClipCategory } from './clip/ClipCategory'
import { SurveyCategory } from './survey/SurveyCategory'
import { VotesContextProvider } from './context/VotesContextProvider'
import { categoryRepository } from '@/lib/db/db'

export const CategoriesSection = async () => {
  const categories = await categoryRepository.getCategories()

  return (
    <section className='flex flex-col space-y-40'>
      <VotesContextProvider>
        {categories.map((category) => (
          <Fragment key={category.id}>
            {category.type === 'clip' && <ClipCategory category={category} />}
            {category.type === 'survey' && <SurveyCategory category={category} />}
          </Fragment>
        ))}
      </VotesContextProvider>
    </section>
  )
}
