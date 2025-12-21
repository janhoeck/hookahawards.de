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
import { Plus } from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'

import { CreateCategoryForm } from './CreateCategoryForm'
import { createCategoryAction } from './actions'
import { FormState } from './schema'

const INITIAL_FORM_STATE: FormState = {
  category: null,
  success: false,
  errors: null,
}

type CreateCategoryButtonProps = {
  categories: Category[]
}

export const CreateCategoryButton = (props: CreateCategoryButtonProps) => {
  const { categories } = props
  const { syncToCache } = useMutateCategory()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [initialFormState, setInitialFormState] = useState(INITIAL_FORM_STATE)
  const [formState, formAction, pending] = useActionState<FormState, FormData>(createCategoryAction, initialFormState)

  useEffect(() => {
    if (formState.success) {
      syncToCache(formState.category)
      setInitialFormState(INITIAL_FORM_STATE)
      setIsOpen(false)
    }
  }, [formState, syncToCache])

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
            <DialogTitle>Kategorie erstellen</DialogTitle>
          </DialogHeader>
          <CreateCategoryForm
            categories={categories}
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
