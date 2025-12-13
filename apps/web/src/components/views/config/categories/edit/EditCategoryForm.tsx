import Form from 'next/form'
import { FormState } from './schema'
import { Field, FieldError, FieldGroup, FieldLabel, Input, Textarea } from '@janhoeck/ui'
import { Category } from '@janhoeck/domain'

export type EditCategoryFormProps = {
  /**
   * The current category which gets an update
   */
  category: Category
  formState: FormState
  formAction: (payload: FormData) => void
  pending: boolean
}

export const EditCategoryForm = (props: EditCategoryFormProps) => {
  const { category, formState, formAction, pending } = props
  return (
    <Form
      action={formAction}
      id='edit-category-form'
    >
      <FieldGroup>
        <Input
          type='hidden'
          name='id'
          id='id'
          value={category.id}
        />
        <Field data-invalid={!!formState.errors?.title}>
          <FieldLabel htmlFor='title'>Titel</FieldLabel>
          <Input
            id='title'
            name='title'
            disabled={pending}
            defaultValue={category.title}
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
            defaultValue={category.description ?? ''}
            placeholder='Beschreibung für diese Kategorie (Optional)'
            autoComplete='off'
            aria-invalid={!!formState.errors?.description}
          />
          {formState.errors?.description && <FieldError>{formState.errors.description[0]}</FieldError>}
        </Field>
      </FieldGroup>
    </Form>
  )
}
