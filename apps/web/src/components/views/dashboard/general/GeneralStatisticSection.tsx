'use client'

import { useStatistics } from '@/lib/hooks'
import { Card, CardContent, H3 } from '@janhoeck/ui'

export const GeneralStatisticSection = () => {
  const { data } = useStatistics()

  return (
    <section>
      <H3 className='mb-6'>Allgemeine Statistik</H3>
      <div className='grid grid-cols-3 space-x-4'>
        <Card className='glass-card'>
          <CardContent className='text-center'>
            <div className='flex flex-col'>
              <span className='text-primary text-4xl font-bold'>{data.categoriesCount}</span>
              <span className='text-foreground'>Kategorien</span>
            </div>
          </CardContent>
        </Card>
        <Card className='glass-card'>
          <CardContent className='text-center'>
            <div className='flex flex-col'>
              <span className='text-primary text-4xl font-bold'>{data.clipsCount}</span>
              <span className='text-foreground'>Clips</span>
            </div>
          </CardContent>
        </Card>
        <Card className='glass-card'>
          <CardContent className='text-center'>
            <div className='flex flex-col'>
              <span className='text-primary text-4xl font-bold'>{data.votesCount}</span>
              <span className='text-foreground'>Votes</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
