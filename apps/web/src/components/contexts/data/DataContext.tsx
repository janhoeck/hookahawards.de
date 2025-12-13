'use client'

import { createContext, useContext } from 'react'
import { Category, Clip, Survey, Vote } from '@janhoeck/domain'

export type DataContextType = {
  categories: Category[]
  clips: Clip[]
  surveys: Survey[]
  votes: Vote[]

  addCategory: (category: Category) => void
  updateCategory: (categoryId: Category['id'], category: Category) => void
  removeCategory: (categoryId: Category['id']) => void

  addClip: (clip: Clip) => void
  updateClip: (clipId: Clip['id'], clip: Clip) => void
  removeClip: (clipId: Clip['id']) => void

  addSurvey: (survey: Survey) => void
  updateSurvey: (surveyId: Survey['id'], survey: Survey) => void
  removeSurvey: (surveyId: Survey['id']) => void
}

const noop = () => {}

export const DataContext = createContext<DataContextType>({
  categories: [],
  clips: [],
  surveys: [],
  votes: [],

  addCategory: noop,
  updateCategory: noop,
  removeCategory: noop,

  addClip: noop,
  updateClip: noop,
  removeClip: noop,

  addSurvey: noop,
  updateSurvey: noop,
  removeSurvey: noop,
})

export const useDataContext = () => {
  return useContext(DataContext)
}
