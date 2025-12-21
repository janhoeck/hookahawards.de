'use client'

import { useStatistics } from '@/lib/hooks'
import { Card, CardContent, H3 } from '@janhoeck/ui'

import { VotesByDayChart } from './VotesByDayChart'

export const VoteStatisticSection = () => {
  const { data } = useStatistics()

  return (
    <section>
      <H3 className='mb-6'>Vote Statistik</H3>
      <Card>
        <CardContent className='pl-0'>
          <VotesByDayChart votesPerDay={data.votesPerDay} />
        </CardContent>
      </Card>
    </section>
  )
}
