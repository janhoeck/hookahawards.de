'use client'

import { useDataContext } from '@/components/contexts/data/DataContext'
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@janhoeck/ui'
import { useActionState, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'

import { createSurveyAction } from './actions'
import { FormState } from './schema'
import { CreateSurveyForm } from './CreateSurveyForm'

export const CreateSurveyButton = () => {
  const { categories, addSurvey } = useDataContext()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [formState, formAction, pending] = useActionState<FormState, FormData>(createSurveyAction, {
    survey: null,
    success: false,
    errors: null,
  })

  const availableCategories = categories.filter((category) => category.type === 'survey')
  const hasSurveyCategories = availableCategories.length !== 0

  useEffect(() => {
    if (formState.success) {
      addSurvey(formState.survey)
      setIsOpen(false)
    }
  }, [formState.success])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button disabled={!hasSurveyCategories}>
          <FaPlus />
          Erstellen
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Umfrage erstellen</DialogTitle>
          </DialogHeader>
          <CreateSurveyForm
            categories={availableCategories}
            formState={formState}
            formAction={formAction}
            pending={pending}
          />
          <DialogFooter className='flex justify-end'>
            <Button
              type='submit'
              form='create-survey-form'
              disabled={pending}
            >
              Erstellen
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
