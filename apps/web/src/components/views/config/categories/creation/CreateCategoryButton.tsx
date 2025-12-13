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
import { CreateCategoryForm } from './CreateCategoryForm'
import { FormState } from './schema'
import { createCategoryAction } from './actions'

export const CreateCategoryButton = () => {
  const { addCategory } = useDataContext()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [formState, formAction, pending] = useActionState<FormState, FormData>(createCategoryAction, {
    category: null,
    success: false,
    errors: null,
  })

  useEffect(() => {
    if (formState.success) {
      addCategory(formState.category)
      setIsOpen(false)
    }
  }, [formState.success])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button>
          <FaPlus size={16} />
          Erstellen
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kategorie erstellen</DialogTitle>
          </DialogHeader>
          <CreateCategoryForm
            formState={formState}
            formAction={formAction}
            pending={pending}
          />
          <DialogFooter className='flex justify-end'>
            <Button
              type='submit'
              form='create-category-form'
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
