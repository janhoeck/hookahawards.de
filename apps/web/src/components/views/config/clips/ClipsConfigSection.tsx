import { ClipTableContainer } from './ClipTableContainer'
import { CreateClipButton } from './creation/CreateClipButton'
import { H3 } from '@janhoeck/ui'

export const ClipsConfigSection = () => {
  return (
    <section>
      <div className='flex justify-between'>
        <H3 className='mb-6'>Clips</H3>
        <CreateClipButton />
      </div>
      <ClipTableContainer />
    </section>
  )
}
