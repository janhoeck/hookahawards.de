import { Headline } from '@/components/shared/Headline'

import { CategoriesConfigSection } from './categories/CategoriesConfigSection'
import { Separator } from '@janhoeck/ui'
import { ClipsConfigSection } from './clips/ClipsConfigSection'
import { SurveysConfigSection } from './surveys/SurveysConfigSection'

export const ConfigView = () => {
  return (
    <div className='container mx-auto max-w-6xl'>
      <Headline>Konfiguration</Headline>
      <CategoriesConfigSection />
      <Separator className='my-8' />
      <ClipsConfigSection />
      <Separator className='my-8' />
      <SurveysConfigSection />
    </div>
  )
}
