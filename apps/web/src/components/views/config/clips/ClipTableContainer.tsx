'use client'

import { useDataContext } from '../../../contexts/data/DataContext'
import { ClipTable } from './ClipTable'

export const ClipTableContainer = () => {
  const { categories, clips } = useDataContext()

  const hasClipsCategories = categories.some((category) => category.type === 'clip')
  if (!hasClipsCategories) {
    return <span className='text-muted-foreground'>Erstelle zuerst eine Kategorie vom Typ "Clip"</span>
  }

  if (clips.length === 0) {
    return <span className='text-muted-foreground'>Keine Clips vorhanden</span>
  }

  return <ClipTable />
}
