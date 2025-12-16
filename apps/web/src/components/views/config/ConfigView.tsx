import { Headline } from '@/components/shared/Headline'

import { CategoriesConfigSection } from './categories/CategoriesConfigSection'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@janhoeck/ui'
import { ClipsConfigSection } from './clips/ClipsConfigSection'
import { SurveysConfigSection } from './surveys/SurveysConfigSection'
import { StreamersConfigSection } from './streamers/StreamersConfigSection'

enum TabsType {
  CATEGORIES = 'categories',
  SURVEY_OPTIONS = 'survey_options',
  CLIPS = 'clips',
  STREAMERS = 'streamers',
}

export const ConfigView = () => {
  return (
    <div className='container mx-auto max-w-6xl'>
      <Headline>Konfiguration</Headline>
      <Tabs defaultValue={TabsType.CATEGORIES}>
        <div className='sticky top-6 z-10 flex justify-center'>
          <TabsList>
            <TabsTrigger value={TabsType.CATEGORIES}>Kategorien</TabsTrigger>
            <TabsTrigger value={TabsType.CLIPS}>Clips</TabsTrigger>
            <TabsTrigger value={TabsType.SURVEY_OPTIONS}>Umfrage Optionen</TabsTrigger>
            <TabsTrigger value={TabsType.STREAMERS}>Streamer</TabsTrigger>
          </TabsList>
        </div>
        <div className='mt-20'>
          <TabsContent value={TabsType.CATEGORIES}>
            <CategoriesConfigSection />
          </TabsContent>
          <TabsContent value={TabsType.CLIPS}>
            <ClipsConfigSection />
          </TabsContent>
          <TabsContent value={TabsType.SURVEY_OPTIONS}>
            <SurveysConfigSection />
          </TabsContent>
          <TabsContent value={TabsType.STREAMERS}>
            <StreamersConfigSection />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
