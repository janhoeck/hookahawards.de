import { H3 } from '@janhoeck/ui'

import { SurveyTableContainer } from './SurveyTableContainer'
import { CreateSurveyButton } from './creation/CreateSurveyButton'

export const SurveysConfigSection = () => {
  return (
    <section>
      <div className='flex justify-between'>
        <H3 className='mb-6'>Umfragen</H3>
        <CreateSurveyButton />
      </div>
      <SurveyTableContainer />
    </section>
  )
}
