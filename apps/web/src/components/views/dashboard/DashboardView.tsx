import { Headline } from '@/components/shared/Headline'
import { Separator } from '@janhoeck/ui'

import { GeneralStatisticSection } from './general/GeneralStatisticSection'
import { MostVotedSection } from './mostVoted/MostVotedSection'
import { VoteStatisticSection } from './vote/VoteStatisticSection'

export const DashboardView = () => {
  return (
    <div className='container mx-auto max-w-2xl'>
      <Headline>Dashboard</Headline>
      <GeneralStatisticSection />
      <Separator className='my-8' />
      <VoteStatisticSection />
      <Separator className='my-8' />
      <MostVotedSection />
    </div>
  )
}
