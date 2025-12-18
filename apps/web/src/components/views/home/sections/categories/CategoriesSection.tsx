'use client'

import { VotesContextProvider } from '@/components/contexts/votes/VotesContextProvider'
import { VotingFeedback } from '@/components/views/home/VotingFeedback'
import { fetchCategories } from '@/lib/api/categories'
import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'

import { ClipCategory } from './clip/ClipCategory'
import { SurveyCategory } from './survey/SurveyCategory'

export const CategoriesSection = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return fetchCategories({ page: 1, limit: 50 })
    },
  })

  if (isPending) {
    return null
  }

  if (error) {
    return null
  }

  return (
    <section className='flex flex-col space-y-40'>
      <VotesContextProvider>
        {data.items.map((category) => (
          <Fragment key={category.id}>
            {category.type === 'clip' && <ClipCategory category={category} />}
            {category.type === 'survey' && <SurveyCategory category={category} />}
          </Fragment>
        ))}
        <VotingFeedback />
      </VotesContextProvider>
    </section>
  )
}
