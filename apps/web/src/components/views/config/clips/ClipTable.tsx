'use client'

import { useMutateClip } from '@/lib/hooks'
import { Category, Clip, Streamer } from '@/lib/types'
import { shortenText } from '@/lib/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@janhoeck/ui'

import { DeleteButtonWithConfirm } from '../components/DeleteButtonWithConfirm'
import { EditClipButton } from './edit/EditClipButton'

type ClipTableProps = {
  categories: Category[]
  clips: Clip[]
  streamers: Streamer[]
}

export const ClipTable = (props: ClipTableProps) => {
  const { categories, clips, streamers } = props
  const { deleteMutation } = useMutateClip()
  const deleteClip = deleteMutation.mutate

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[250px]'>Title</TableHead>
          <TableHead>Kategorie</TableHead>
          <TableHead>Beschreibung</TableHead>
          <TableHead className='w-[80px]' />
        </TableRow>
      </TableHeader>
      <TableBody>
        {clips.map((clip) => {
          const category = categories.find((category) => category.id === clip.categoryId)

          return (
            <TableRow key={clip.id}>
              <TableCell className='w-[250px]'>{clip.title}</TableCell>
              <TableCell>{category?.title}</TableCell>
              <TableCell className='whitespace-normal'>{shortenText(clip.description ?? '')}</TableCell>
              <TableCell>
                <div className='flex flex-row space-x-2'>
                  <EditClipButton
                    clip={clip}
                    categories={categories}
                    streamers={streamers}
                  />
                  <DeleteButtonWithConfirm
                    description={`Bist du sicher, dass du den Clip "${clip.title}" wirklich löschen?`}
                    onConfirm={() => {
                      deleteClip(clip.id)
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
