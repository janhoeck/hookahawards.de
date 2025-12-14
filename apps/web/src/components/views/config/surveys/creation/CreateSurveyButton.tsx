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

import { createSurveyAction } from './actions'
import { FormState } from './schema'
import { CreateSurveyForm } from './CreateSurveyForm'
import { Plus } from 'lucide-react'

const INITIAL_FORM_STATE: FormState = {
  survey: null,
  success: false,
  errors: null,
}

export const CreateSurveyButton = () => {
  const { categories, addSurvey } = useDataContext()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [initialFormState, setInitialFormState] = useState(INITIAL_FORM_STATE)
  const [formState, formAction, pending] = useActionState<FormState, FormData>(createSurveyAction, initialFormState)

  const availableCategories = categories.filter((category) => category.type === 'survey')
  const hasSurveyCategories = availableCategories.length !== 0

  useEffect(() => {
    if (formState.success) {
      addSurvey(formState.survey)
      setInitialFormState(INITIAL_FORM_STATE)
      setIsOpen(false)
    }
  }, [formState])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button disabled={!hasSurveyCategories}>
          <Plus />
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
