'use client'

import { Category, Clip, Streamer, Survey, Vote } from '@/lib/types'
import { Dispatch, PropsWithChildren, SetStateAction, useCallback, useState } from 'react'

import { DataContext } from './DataContext'

type Any = Category | Clip | Survey | Streamer
type UseStateFactoryReturn<T extends Any> = [
  T[],
  (item: T) => void,
  (itemId: T['id'], item: T) => void,
  (itemId: T['id']) => void,
  Dispatch<SetStateAction<T[]>>,
]

function useStateFactory<T extends Any>(initialData: T[]): UseStateFactoryReturn<T> {
  const [items, setItems] = useState<T[]>(initialData)

  const remove = useCallback((itemId: T['id']) => {
    setItems((currItems: T[]) => currItems.filter((currItem) => currItem.id !== itemId))
  }, [])

  const update = useCallback((itemId: T['id'], item: T): void => {
    setItems((currItems: T[]) => currItems.map((currItem) => (currItem.id === itemId ? item : currItem)))
  }, [])

  const add = useCallback((item: T) => {
    setItems((currItems: T[]) => [...currItems, item])
  }, [])

  return [items, add, update, remove, setItems]
}

type InitialStoreData = {
  categories: Category[]
  clips: Clip[]
  surveys: Survey[]
  votes: Vote[]
  streamers: Streamer[]
}

const useStore = (initialData: InitialStoreData) => {
  const [categories, addCategory, updateCategory, _removeCategory] = useStateFactory<Category>(initialData.categories)
  const [clips, addClip, updateClip, removeClip, setClips] = useStateFactory<Clip>(initialData.clips)
  const [surveys, addSurvey, updateSurvey, removeSurvey, setSurveys] = useStateFactory<Survey>(initialData.surveys)
  const [votes] = useState<Vote[]>(initialData.votes)
  const [streamers, addStreamer, updateStreamer, removeStreamer] = useStateFactory<Streamer>(initialData.streamers)

  const removeCategory: typeof _removeCategory = (categoryId) => {
    _removeCategory(categoryId)
    setClips((prevClips) => prevClips.filter((clip) => clip.categoryId !== categoryId))
    setSurveys((prevSurveys) => prevSurveys.filter((survey) => survey.categoryId !== categoryId))
  }

  return {
    categories: categories.sort((a, b) => a.position - b.position),
    clips,
    surveys,
    votes,
    streamers,
    addCategory,
    updateCategory,
    removeCategory,
    addClip,
    updateClip,
    removeClip,
    addSurvey,
    updateSurvey,
    removeSurvey,
    addStreamer,
    updateStreamer,
    removeStreamer,
  }
}

export type DataContextProviderProps = PropsWithChildren<{
  categories: Category[]
  clips: Clip[]
  surveys: Survey[]
  votes: Vote[]
  streamers: Streamer[]
}>

export const DataContextProvider = (props: DataContextProviderProps) => {
  const { children, categories, clips, surveys, votes, streamers } = props
  const store = useStore({ categories, clips, surveys, votes, streamers })

  return <DataContext.Provider value={store}>{children}</DataContext.Provider>
}
