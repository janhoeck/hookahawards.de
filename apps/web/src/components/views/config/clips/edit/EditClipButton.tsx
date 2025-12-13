'use client'

import { useDataContext } from '@/components/contexts/data/DataContext'
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@janhoeck/ui'
import { useActionState, useEffect, useState } from 'react'
import { FaPen } from 'react-icons/fa'

import { updateClipAction } from './actions'
import { DialogHeader } from '@janhoeck/ui'
import { EditClipForm } from './EditClipForm'
import { FormState } from './schema'
import { Clip } from '@janhoeck/domain'

export type EditClipButtonProps = {
  clip: Clip
}

export const EditClipButton = (props: EditClipButtonProps) => {
  const { clip } = props
  const { categories, updateClip } = useDataContext()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [formState, formAction, pending] = useActionState<FormState, FormData>(updateClipAction, {
    clip: null,
    success: false,
    errors: null,
  })

  const availableCategories = categories.filter((category) => category.type === 'clip')

  useEffect(() => {
    if (formState.success) {
      updateClip(clip.id, formState.clip)
      setIsOpen(false)
    }
  }, [formState.success])

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
          <FaPen />
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
