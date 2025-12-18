'use client'

import { Category, Clip, Streamer, Survey, Vote } from '@/lib/types'
import { createContext, useContext } from 'react'

export type DataContextType = {
  categories: Category[]
  clips: Clip[]
  surveys: Survey[]
  votes: Vote[]
  streamers: Streamer[]

  addCategory: (category: Category) => void
  updateCategory: (categoryId: string, category: Category) => void
  removeCategory: (categoryId: string) => void

  addClip: (clip: Clip) => void
  updateClip: (clipId: string, clip: Clip) => void
  removeClip: (clipId: string) => void

  addSurvey: (survey: Survey) => void
  updateSurvey: (surveyId: string, survey: Survey) => void
  removeSurvey: (surveyId: string) => void

  addStreamer: (streamer: Streamer) => void
  updateStreamer: (id: string, streamer: Streamer) => void
  removeStreamer: (id: string) => void
}

const noop = () => {}

export const DataContext = createContext<DataContextType>({
  categories: [],
  clips: [],
  surveys: [],
  votes: [],
  streamers: [],

  addCategory: noop,
  updateCategory: noop,
  removeCategory: noop,

  addClip: noop,
  updateClip: noop,
  removeClip: noop,

  addSurvey: noop,
  updateSurvey: noop,
  removeSurvey: noop,

  addStreamer: noop,
  updateStreamer: noop,
  removeStreamer: noop,
})

export const useDataContext = () => {
  return useContext(DataContext)
}
