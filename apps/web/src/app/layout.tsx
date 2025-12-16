import { Footer } from '@/components/shared/Footer/Footer'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { categoryRepository, clipRepository, configRepository, surveyRepository, voteRepository } from '@/lib/db/db'
import { ConfigContextProvider } from '@/components/contexts/config/ConfigContextProvider'
import { DataContextProvider } from '@/components/contexts/data/DataContextProvider'

import { bebasNeue, inter } from './fonts'
import './index.css'

type LayoutProps = {
  children: React.ReactNode
}

export default async function Layout(props: LayoutProps) {
  const { children } = props

  const [config, categories, clips, surveys, votes] = await Promise.all([
    configRepository.getConfig(),
    categoryRepository.getCategories(),
    clipRepository.getClips(),
    surveyRepository.getSurveys(),
    voteRepository.getVotes(),
  ])

  return (
    <html className='dark'>
      <body className={twMerge(inter.className, bebasNeue.variable)}>
        <div className='flex flex-col min-h-screen'>
          <ConfigContextProvider config={config}>
            <DataContextProvider categories={categories} clips={clips} surveys={surveys} votes={votes}>
              <main className='container mx-auto px-4 mt-16 mb-16 flex-1'>{children}</main>
            </DataContextProvider>
          </ConfigContextProvider>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
