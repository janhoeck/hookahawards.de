'use client'

import { useDataContext } from '@/components/contexts/data/DataContext'
import { Survey } from '@/lib/types'
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
import { PenLine } from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'

import { EditSurveyForm } from './EditSurveyForm'
import { updateSurveyAction } from './actions'
import { FormState } from './schema'

const INITIAL_FORM_STATE: FormState = {
  survey: null,
  success: false,
  errors: null,
}

type EditSurveyButtonProps = {
  survey: Survey
}

export const EditSurveyButton = (props: EditSurveyButtonProps) => {
  const { survey } = props
  const { categories, updateSurvey } = useDataContext()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [initialFormState, setInitialFormState] = useState(INITIAL_FORM_STATE)
  const [formState, formAction, pending] = useActionState<FormState, FormData>(updateSurveyAction, initialFormState)

  const availableCategories = categories.filter((category) => category.type === 'survey')

  useEffect(() => {
    if (formState.success) {
      updateSurvey(survey.id, formState.survey)
      setInitialFormState(INITIAL_FORM_STATE)
      setIsOpen(false)
    }
  }, [formState, survey.id, updateSurvey])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant='outline'
          size='icon'
        >
          <PenLine />
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Umfrage bearbeiten</DialogTitle>
          </DialogHeader>
          <EditSurveyForm
            survey={survey}
            categories={availableCategories}
            formState={formState}
            formAction={formAction}
            pending={pending}
          />
          <DialogFooter className='flex justify-end'>
            <Button
              type='submit'
              form='edit-survey-form'
              disabled={pending}
            >
              Aktualisieren
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
