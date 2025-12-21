'use client'

import { Category, Clip, Streamer } from '@/lib/types'

import { ClipTable } from './ClipTable'

type ClipTableContainerProps = {
  categories: Category[]
  clips: Clip[]
  streamers: Streamer[]
}

export const ClipTableContainer = (props: ClipTableContainerProps) => {
  const { categories, clips, streamers } = props

  const hasClipsCategories = categories.some((category) => category.type === 'clip')
  if (!hasClipsCategories) {
    return <span className='text-muted-foreground'>Erstelle zuerst eine Kategorie vom Typ "Clip"</span>
  }

  if (clips.length === 0) {
    return <span className='text-muted-foreground'>Keine Clips vorhanden</span>
  }

  return (
    <ClipTable
      categories={categories}
      clips={clips}
      streamers={streamers}
    />
  )
}
