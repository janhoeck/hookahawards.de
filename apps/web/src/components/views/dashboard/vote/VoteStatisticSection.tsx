import { Card, CardContent, H3 } from '@janhoeck/ui'

import { VotesByDayChart } from './VotesByDayChart'

export const VoteStatisticSection = async () => {
  return (
    <section>
      <H3 className='mb-6'>Vote Statistik</H3>
      <Card>
        <CardContent className='pl-0'>
          <VotesByDayChart />
        </CardContent>
      </Card>
    </section>
  )
}
