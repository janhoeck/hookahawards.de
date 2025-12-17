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

import { CreateStreamerForm } from './CreateStreamerForm'
import { createStreamerAction } from './actions'
import { FormState } from './schema'

const INITIAL_FORM_STATE: FormState = {
  streamer: null,
  success: false,
  errors: null,
}

export const CreateStreamerButton = () => {
  const { addStreamer } = useDataContext()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [initialFormState, setInitialFormState] = useState(INITIAL_FORM_STATE)
  const [formState, formAction, pending] = useActionState<FormState, FormData>(createStreamerAction, initialFormState)

  useEffect(() => {
    if (formState.success) {
      addStreamer(formState.streamer)
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
        <Button>
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
          <CreateStreamerForm
            formState={formState}
            formAction={formAction}
            pending={pending}
          />
          <DialogFooter className='flex justify-end'>
            <Button
              type='submit'
              form='create-streamer-form'
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
