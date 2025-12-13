export const dynamic = 'force-dynamic'

import { DataContextProvider } from '@/components/contexts/data/DataContextProvider'
import React from 'react'
import { categoryRepository, clipRepository, surveyRepository, voteRepository } from '@/lib/db/db'

type LayoutProps = {
  children: React.ReactNode
}

export default async function Layout(props: LayoutProps) {
  const { children } = props
  const [categories, clips, surveys, votes] = await Promise.all([
    categoryRepository.getCategories(),
    clipRepository.getClips(),
    surveyRepository.getSurveys(),
    voteRepository.getVotes(),
  ])

  return (
    <DataContextProvider
      categories={categories}
      clips={clips}
      surveys={surveys}
      votes={votes}
    >
      {children}
    </DataContextProvider>
  )
}
