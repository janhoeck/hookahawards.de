'use client'

import { useMutateCategory } from '@/lib/hooks'
import { Category } from '@/lib/types'
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

import { EditCategoryForm } from './EditCategoryForm'
import { updateCategoryAction } from './actions'
import { FormState } from './schema'

const INITIAL_FORM_STATE: FormState = {
  category: null,
  success: false,
  errors: null,
}

type EditCategoryButtonProps = {
  category: Category
}

export const EditCategoryButton = (props: EditCategoryButtonProps) => {
  const { category } = props
  const { updateInCache } = useMutateCategory()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [initialFormState, setInitialFormState] = useState(INITIAL_FORM_STATE)
  const [formState, formAction, pending] = useActionState<FormState, FormData>(updateCategoryAction, initialFormState)

  useEffect(() => {
    if (formState.success) {
      updateInCache(formState.category)
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
            <DialogTitle>Kategorie bearbeiten</DialogTitle>
          </DialogHeader>
          <EditCategoryForm
            category={category}
            formState={formState}
            formAction={formAction}
            pending={pending}
          />
          <DialogFooter className='flex justify-end'>
            <Button
              type='submit'
              form='edit-category-form'
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
