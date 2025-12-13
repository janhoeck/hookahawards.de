'use client'

import { Card, CardContent, H3, Muted } from '@janhoeck/ui'

import { VotesByDayChart } from './VotesByDayChart'
import { useDataContext } from '@/components/contexts/data/DataContext'

export const VoteStatisticSection = () => {
  const { votes } = useDataContext()

  return (
    <section>
      <H3 className='mb-6'>Vote Statistik</H3>
      <Card>
        <CardContent className='pl-0'>
          {votes.length === 0 ? <Muted className='ml-6'>Keine Daten vorhanden</Muted> : <VotesByDayChart />}
        </CardContent>
      </Card>
    </section>
  )
}
