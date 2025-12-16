'use client'

import { useDataContext } from '@/components/contexts/data/DataContext'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@janhoeck/ui'
import { StreamerAvatarList } from '@/components/shared/StreamerAvatar/StreamerAvatarList'
import { DeleteButtonWithConfirm } from '@/components/views/config/components/DeleteButtonWithConfirm'
import { deleteStreamerAction } from '@/components/views/config/streamers/actions'

export const StreamerTable = () => {
  const { streamers, removeStreamer } = useDataContext()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell className='w-[36px]' />
        </TableRow>
      </TableHeader>
      <TableBody>
        {streamers.map((streamer) => {
          return (
            <TableRow key={streamer.id}>
              <TableCell>
                <StreamerAvatarList streamerIds={[streamer.id]} />
              </TableCell>
              <TableCell className='w-[36px]'>
                <DeleteButtonWithConfirm
                  description={`Bist du sicher, dass du den Streamer "${streamer.name}" wirklich löschen willst?`}
                  onConfirm={async () => {
                    await deleteStreamerAction(streamer)
                    removeStreamer(streamer.id)
                  }}
                />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
