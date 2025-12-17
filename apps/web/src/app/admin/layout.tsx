import { DataContextProvider } from '@/components/contexts/data/DataContextProvider'
import { categoryRepository, clipRepository, streamerRepository, surveyRepository, voteRepository } from '@/lib/db/db'
import React from 'react'

type LayoutProps = {
  children: React.ReactNode
}

export default async function Layout(props: LayoutProps) {
  const { children } = props
  const [categories, clips, surveys, votes, streamers] = await Promise.all([
    categoryRepository.getCategories(),
    clipRepository.getClips(),
    surveyRepository.getSurveys(),
    voteRepository.getVotes(),
    streamerRepository.getStreamers(),
  ])

  return (
    <DataContextProvider
      categories={categories}
      clips={clips}
      surveys={surveys}
      votes={votes}
      streamers={streamers}
    >
      {children}
    </DataContextProvider>
  )
}
