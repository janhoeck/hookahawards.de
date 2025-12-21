'use client'

import { Category, Survey } from '@/lib/types'

import { SurveyTable } from './SurveyTable'

type SurveyTableContainerProps = {
  categories: Category[]
  surveys: Survey[]
}

export const SurveyTableContainer = (props: SurveyTableContainerProps) => {
  const { categories, surveys } = props

  const hasSurveyCategories = categories.some((category) => category.type === 'survey')
  if (!hasSurveyCategories) {
    return <span className='text-muted-foreground'>Erstelle zuerst eine Kategorie vom Typ "Umfrage"</span>
  }

  if (surveys.length === 0) {
    return <span className='text-muted-foreground'>Keine Umfragen vorhanden</span>
  }

  return (
    <SurveyTable
      categories={categories}
      surveys={surveys}
    />
  )
}
