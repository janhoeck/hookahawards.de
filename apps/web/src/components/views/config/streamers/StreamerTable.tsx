'use client'

import { StreamerAvatarList } from '@/components/shared/StreamerAvatar/StreamerAvatarList'
import { DeleteButtonWithConfirm } from '@/components/views/config/components/DeleteButtonWithConfirm'
import { useMutateStreamer } from '@/lib/hooks'
import { Streamer } from '@/lib/types'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@janhoeck/ui'

type StreamerTableProps = {
  streamers: Streamer[]
}

export const StreamerTable = (props: StreamerTableProps) => {
  const { streamers } = props
  const { deleteMutation } = useMutateStreamer()

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
                  onConfirm={() => {
                    deleteMutation.mutate(streamer.id)
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
