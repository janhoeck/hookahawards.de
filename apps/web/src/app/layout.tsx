import { Footer } from '@/components/shared/Footer/Footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import { bebasNeue, inter } from './fonts'
import './index.css'

type LayoutProps = {
  children: React.ReactNode
}

const queryClient = new QueryClient()

export default function Layout(props: LayoutProps) {
  const { children } = props

  return (
    <html className='dark'>
      <body className={twMerge(inter.className, bebasNeue.variable)}>
        <div className='flex min-h-screen flex-col'>
          <QueryClientProvider client={queryClient}>
            <main className='container mx-auto mt-16 mb-16 flex-1 px-4'>{children}</main>
          </QueryClientProvider>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
