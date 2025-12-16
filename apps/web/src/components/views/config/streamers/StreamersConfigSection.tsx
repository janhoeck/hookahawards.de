import { StreamerTableContainer } from './StreamerTableContainer'
import { H3 } from '@janhoeck/ui'
import { CreateStreamerButton } from './creation/CreateStreamerButton'

export const StreamersConfigSection = () => {
  return (
    <section>
      <div className='flex justify-between'>
        <H3 className='mb-6'>Streamer</H3>
        <CreateStreamerButton />
      </div>
      <StreamerTableContainer />
    </section>
  )
}
