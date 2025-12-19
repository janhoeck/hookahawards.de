'use server'

import { ConfigContextProvider } from '@/components/contexts/config/ConfigContextProvider'
import { HomeView } from '@/components/views/home/HomeView'
import { fetchConfig } from '@/lib/api/config'

export default async function HomePage() {
  const config = await fetchConfig()

  return (
    <ConfigContextProvider config={config}>
      <HomeView />
    </ConfigContextProvider>
  )
}
