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

import { createClipAction } from './actions'
import { FormState } from './schema'
import { CreateClipForm } from './CreateClipForm'

export const CreateClipButton = () => {
  const { categories, addClip } = useDataContext()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [formState, formAction, pending] = useActionState<FormState, FormData>(createClipAction, {
    clip: null,
    success: false,
    errors: null,
  })

  const availableCategories = categories.filter((category) => category.type === 'clip')
  const hasClipCategories = availableCategories.length !== 0

  useEffect(() => {
    if (formState.success) {
      addClip(formState.clip)
      setIsOpen(false)
    }
  }, [formState.success])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button disabled={!hasClipCategories}>
          <FaPlus size={16} />
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
