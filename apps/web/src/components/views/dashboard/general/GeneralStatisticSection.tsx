'use client'

import { useStatistics } from '@/lib/hooks'
import { Card, CardContent, H3, NumberTicker } from '@janhoeck/ui'

export const GeneralStatisticSection = () => {
  const { data } = useStatistics()

  return (
    <section>
      <H3 className='mb-6'>Allgemeine Statistik</H3>
      <div className='grid grid-cols-3 space-x-4'>
        <Card className='glass-card'>
          <CardContent className='text-center'>
            <div className='flex flex-col'>
              <NumberTicker
                value={data.categoriesCount}
                className='text-primary text-4xl font-bold'
              />
              <span className='text-foreground'>Kategorien</span>
            </div>
          </CardContent>
        </Card>
        <Card className='glass-card'>
          <CardContent className='text-center'>
            <div className='flex flex-col'>
              <NumberTicker
                value={data.clipsCount}
                className='text-primary text-4xl font-bold'
              />
              <span className='text-foreground'>Clips</span>
            </div>
          </CardContent>
        </Card>
        <Card className='glass-card'>
          <CardContent className='text-center'>
            <div className='flex flex-col'>
              <NumberTicker
                value={data.votesCount}
                className='text-primary text-4xl font-bold'
              />
              <span className='text-foreground'>Votes</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
