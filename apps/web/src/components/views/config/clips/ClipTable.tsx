'use client'

import { useDataContext } from '@/components/contexts/data/DataContext'
import { extractYoutubeId } from '@/utils/extract-youtube-id'
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@janhoeck/ui'
import Image from 'next/image'
import { FaRegTrashAlt } from 'react-icons/fa'

import { deleteClip } from './actions'
import { EditClipButton } from './edit/EditClipButton'

export const ClipTable = () => {
  const { clips, categories, removeClip } = useDataContext()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Beschreibung</TableHead>
          <TableHead>Kategorie</TableHead>
          <TableHead>Link</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {clips.map((clip) => {
          const category = categories.find((category) => category.id === clip.categoryId)

          const clipYouTubeId = extractYoutubeId(clip.link)
          const thumnailUrl = `https://i.ytimg.com/vi/${clipYouTubeId}/0.jpg`

          return (
            <TableRow key={clip.id}>
              <TableCell>{clip.title}</TableCell>
              <TableCell>{clip.description}</TableCell>
              <TableCell>{category?.title}</TableCell>
              <TableCell>
                <div className='relative w-32 aspect-video'>
                  <Image
                    fill
                    loading='lazy'
                    className='object-cover rounded'
                    src={thumnailUrl}
                    alt={clip.title}
                    sizes='128px'
                  />
                </div>
              </TableCell>
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
                    <FaRegTrashAlt />
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
