import { HomeView } from '@/components/views/home/HomeView'
import { categoryRepository, clipRepository, configRepository, surveyRepository, voteRepository } from '@/lib/db/db'
import { ConfigContextProvider } from '@/components/contexts/config/ConfigContextProvider'
import { DataContextProvider } from '@/components/contexts/data/DataContextProvider'

export default async function HomePage() {

  const [config, categories, clips, surveys, votes] = await Promise.all([
    configRepository.getConfig(),
    categoryRepository.getCategories(),
    clipRepository.getClips(),
    surveyRepository.getSurveys(),
    voteRepository.getVotes(),
  ])

  return (
    <ConfigContextProvider config={config}>
      <DataContextProvider categories={categories} clips={clips} surveys={surveys} votes={votes}>
        <HomeView />
      </DataContextProvider>
    </ConfigContextProvider>
  )
}
