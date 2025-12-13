'use client'

import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'

import { DataContext } from './DataContext'
import { Category, Clip, Survey, Vote } from '@janhoeck/domain'

type Any = Category | Clip | Survey
type UseStateFactoryReturn<T extends Any> = [
  T[],
  (item: T) => void,
  (itemId: T['id'], item: T) => void,
  (itemId: T['id']) => void,
  Dispatch<SetStateAction<T[]>>,
]

function useStateFactory<T extends Any>(initialData: T[]): UseStateFactoryReturn<T> {
  const [items, setItems] = useState<T[]>(initialData)

  const remove = (itemId: T['id']) => {
    setItems((currItems: T[]) => currItems.filter((currItem) => currItem.id !== itemId))
  }

  const update: (itemId: T['id'], item: T) => void = (itemId, item) => {
    setItems((currItems: T[]) => currItems.map((currItem) => (currItem.id === itemId ? item : currItem)))
  }

  const add = (item: T) => {
    setItems((currItems: T[]) => [...currItems, item])
  }

  return [items, add, update, remove, setItems]
}

type InitialStoreData = {
  categories: Category[]
  clips: Clip[]
  surveys: Survey[]
  votes: Vote[]
}

const useStore = (initialData: InitialStoreData) => {
  const [categories, addCategory, updateCategory, _removeCategory] = useStateFactory<Category>(initialData.categories)
  const [clips, addClip, updateClip, removeClip, setClips] = useStateFactory<Clip>(initialData.clips)
  const [surveys, addSurvey, updateSurvey, removeSurvey, setSurveys] = useStateFactory<Survey>(initialData.surveys)
  const [votes] = useState<Vote[]>(initialData.votes)

  const removeCategory: typeof _removeCategory = (categoryId) => {
    _removeCategory(categoryId)
    setClips((prevClips) => prevClips.filter((clip) => clip.categoryId !== categoryId))
    setSurveys((prevSurveys) => prevSurveys.filter((survey) => survey.categoryId !== categoryId))
  }

  return {
    categories,
    clips,
    surveys,
    votes,
    addCategory,
    updateCategory,
    removeCategory,
    addClip,
    updateClip,
    removeClip,
    addSurvey,
    updateSurvey,
    removeSurvey,
  }
}

export type DataContextProviderProps = PropsWithChildren<{
  categories: Category[]
  clips: Clip[]
  surveys: Survey[]
  votes: Vote[]
}>

export const DataContextProvider = (props: DataContextProviderProps) => {
  const { children, categories, clips, surveys, votes } = props
  const store = useStore({ categories, clips, surveys, votes })

  return <DataContext.Provider value={store}>{children}</DataContext.Provider>
}
