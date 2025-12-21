'use client'

import { useMutateClip } from '@/lib/hooks'
import { Category, Clip, Streamer } from '@/lib/types'
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

import { EditClipForm } from './EditClipForm'
import { updateClipAction } from './actions'
import { FormState } from './schema'

const INITIAL_FORM_STATE: FormState = {
  clip: null,
  success: false,
  errors: null,
}

type EditClipButtonProps = {
  clip: Clip
  categories: Category[]
  streamers: Streamer[]
}

export const EditClipButton = (props: EditClipButtonProps) => {
  const { clip, categories, streamers } = props
  const { updateInCache } = useMutateClip()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [initialFormState, setInitialFormState] = useState(INITIAL_FORM_STATE)
  const [formState, formAction, pending] = useActionState<FormState, FormData>(updateClipAction, initialFormState)

  const availableCategories = categories.filter((category) => category.type === 'clip')

  useEffect(() => {
    if (formState.success) {
      updateInCache(formState.clip)
      setInitialFormState(INITIAL_FORM_STATE)
      setIsOpen(false)
    }
  }, [formState, updateInCache])

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
            <DialogTitle>Clip bearbeiten</DialogTitle>
          </DialogHeader>
          <EditClipForm
            clip={clip}
            categories={availableCategories}
            streamers={streamers}
            formState={formState}
            formAction={formAction}
            pending={pending}
          />
          <DialogFooter className='flex justify-end'>
            <Button
              type='submit'
              form='edit-clip-form'
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
