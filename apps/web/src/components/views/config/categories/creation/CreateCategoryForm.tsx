import { Category } from '@/lib/types'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@janhoeck/ui'
import Form from 'next/form'

import { FormState } from './schema'

export type CreateCategoryFormProps = {
  categories: Category[]
  formState: FormState
  formAction: (payload: FormData) => void
  pending: boolean
}

export const CreateCategoryForm = (props: CreateCategoryFormProps) => {
  const { categories, formState, formAction, pending } = props

  const nextPosition = Math.max(...categories.map((category) => category.position)) + 1

  return (
    <Form
      action={formAction}
      id='create-category-form'
    >
      <FieldGroup>
        <Input
          type='hidden'
          name='position'
          id='position'
          value={nextPosition}
        />
        <Field data-invalid={!!formState.errors?.title}>
          <FieldLabel htmlFor='title'>Titel</FieldLabel>
          <Input
            id='title'
            name='title'
            disabled={pending}
            placeholder='Der Titel der Kategorie'
            autoComplete='off'
            aria-invalid={!!formState.errors?.title}
          />
          {formState.errors?.title && <FieldError>{formState.errors.title[0]}</FieldError>}
        </Field>
        <Field data-invalid={!!formState.errors?.description}>
          <FieldLabel htmlFor='title'>Beschreibung</FieldLabel>
          <Textarea
            id='description'
            name='description'
            disabled={pending}
            placeholder='Beschreibung für diese Kategorie (Optional)'
            autoComplete='off'
            aria-invalid={!!formState.errors?.description}
          />
          {formState.errors?.description && <FieldError>{formState.errors.description[0]}</FieldError>}
        </Field>
        <Field data-invalid={!!formState.errors?.type}>
          <FieldLabel htmlFor='type'>Typ</FieldLabel>
          <Select
            name='type'
            defaultValue='clip'
          >
            <SelectTrigger
              aria-invalid={!!formState.errors?.type}
              name='type'
            >
              <SelectValue id='type' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Typ</SelectLabel>
                <SelectItem value='clip'>Clip</SelectItem>
                <SelectItem value='sruvey'>Umfrage</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {formState.errors?.type && <FieldError>{formState.errors.type[0]}</FieldError>}
        </Field>
      </FieldGroup>
    </Form>
  )
}
