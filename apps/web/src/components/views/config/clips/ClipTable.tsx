'use client'

import { useDataContext } from '@/components/contexts/data/DataContext'
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@janhoeck/ui'

import { deleteClip } from './actions'
import { EditClipButton } from './edit/EditClipButton'
import { shortenText } from '@/utils/shorten-text'
import { Trash } from 'lucide-react'

export const ClipTable = () => {
  const { clips, categories, removeClip } = useDataContext()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Beschreibung</TableHead>
          <TableHead>Kategorie</TableHead>
          <TableHead className='w-[80px]' />
        </TableRow>
      </TableHeader>
      <TableBody>
        {clips.map((clip) => {
          const category = categories.find((category) => category.id === clip.categoryId)

          return (
            <TableRow key={clip.id}>
              <TableCell>{clip.title}</TableCell>
              <TableCell className='whitespace-normal'>{shortenText(clip.description ?? '')}</TableCell>
              <TableCell>{category?.title}</TableCell>
              <TableCell>
                <div className='flex flex-row space-x-2'>
                  <EditClipButton clip={clip} />
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={async () => {
                      await deleteClip(clip)
                      removeClip(clip.id)
                    }}
                  >
                    <Trash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
