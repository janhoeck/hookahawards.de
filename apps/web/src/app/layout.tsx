import QueryProvider from '@/components/contexts/QueryProvider'
import { Footer } from '@/components/shared/Footer/Footer'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import { bebasNeue, inter } from './fonts'
import './index.css'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout(props: LayoutProps) {
  const { children } = props

  return (
    <html className='dark'>
      <body className={twMerge(inter.className, bebasNeue.variable)}>
        <div className='flex min-h-screen flex-col'>
          <QueryProvider>
            <main className='container mx-auto mt-16 mb-16 flex-1 px-4'>{children}</main>
          </QueryProvider>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
