'use client'

import { useDataContext } from '@/components/contexts/data/DataContext'

import { SurveyTable } from './SurveyTable'

export const SurveyTableContainer = () => {
  const { categories, surveys } = useDataContext()

  const hasSurveyCategories = categories.some((category) => category.type === 'survey')
  if (!hasSurveyCategories) {
    return <span className='text-muted-foreground'>Erstelle zuerst eine Kategorie vom Typ "Umfrage"</span>
  }

  if (surveys.length === 0) {
    return <span className='text-muted-foreground'>Keine Umfragen vorhanden</span>
  }

  return <SurveyTable />
}
