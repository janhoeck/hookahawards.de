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
import { Plus } from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'

import { CreateClipForm } from './CreateClipForm'
import { createClipAction } from './actions'
import { FormState } from './schema'

const INITIAL_FORM_STATE: FormState = {
  clip: null,
  success: false,
  errors: null,
}

export const CreateClipButton = () => {
  const { categories, streamers, addClip } = useDataContext()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [initialFormState, setInitialFormState] = useState(INITIAL_FORM_STATE)
  const [formState, formAction, pending] = useActionState<FormState, FormData>(createClipAction, initialFormState)

  const availableCategories = categories.filter((category) => category.type === 'clip')
  const hasClipCategories = availableCategories.length !== 0

  useEffect(() => {
    if (formState.success) {
      addClip(formState.clip)
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
        <Button disabled={!hasClipCategories}>
          <Plus />
          Erstellen
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clip erstellen</DialogTitle>
          </DialogHeader>
          <CreateClipForm
            categories={availableCategories}
            streamers={streamers}
            formState={formState}
            formAction={formAction}
            pending={pending}
          />
          <DialogFooter className='flex justify-end'>
            <Button
              type='submit'
              form='create-clip-form'
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
