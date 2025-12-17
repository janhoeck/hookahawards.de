'use client'

import { useDataContext } from '@/components/contexts/data/DataContext'
import { Card, CardContent, H3 } from '@janhoeck/ui'

export const GeneralStatisticSection = () => {
  const { categories, clips, votes } = useDataContext()
  return (
    <section>
      <H3 className='mb-6'>Allgemeine Statistik</H3>
      <div className='grid grid-cols-3 space-x-4'>
        <Card className='glass-card'>
          <CardContent className='text-center'>
            <div className='flex flex-col'>
              <span className='text-primary text-4xl font-bold'>{categories.length}</span>
              <span className='text-foreground'>Kategorien</span>
            </div>
          </CardContent>
        </Card>
        <Card className='glass-card'>
          <CardContent className='text-center'>
            <div className='flex flex-col'>
              <span className='text-primary text-4xl font-bold'>{clips.length}</span>
              <span className='text-foreground'>Clips</span>
            </div>
          </CardContent>
        </Card>
        <Card className='glass-card'>
          <CardContent className='text-center'>
            <div className='flex flex-col'>
              <span className='text-primary text-4xl font-bold'>{votes.length}</span>
              <span className='text-foreground'>Votes</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
