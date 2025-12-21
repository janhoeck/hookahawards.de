import { Category, Survey } from '@/lib/types'
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
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@janhoeck/ui'
import Form from 'next/form'

import { FormState } from './schema'

export type EditSurveyFormProps = {
  survey: Survey
  categories: Category[]
  formState: FormState
  formAction: (payload: FormData) => void
  pending: boolean
}

export const EditSurveyForm = (props: EditSurveyFormProps) => {
  const { survey, categories, formState, formAction, pending } = props
  return (
    <Form
      action={formAction}
      id='edit-survey-form'
    >
      <FieldGroup>
        <Input
          type='hidden'
          name='id'
          id='id'
          value={survey.id}
        />
        <Field data-invalid={!!formState.errors?.title}>
          <FieldLabel htmlFor='title'>Titel</FieldLabel>
          <Input
            id='title'
            name='title'
            disabled={pending}
            placeholder='Der Titel der Umfrage'
            defaultValue={survey.title}
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
            placeholder='Beschreibung für diese Umfrage (Optional)'
            defaultValue={survey.description ?? ''}
            autoComplete='off'
            aria-invalid={!!formState.errors?.description}
          />
          {formState.errors?.description && <FieldError>{formState.errors.description[0]}</FieldError>}
        </Field>
        <Field data-invalid={!!formState.errors?.categoryId}>
          <FieldLabel htmlFor='title'>Kategorie</FieldLabel>
          <Select
            name='categoryId'
            defaultValue={survey.categoryId}
          >
            <SelectTrigger
              aria-invalid={!!formState.errors?.categoryId}
              name='categoryId'
            >
              <SelectValue id='categoryId' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                  >
                    {category.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {formState.errors?.categoryId && <FieldError>{formState.errors.categoryId[0]}</FieldError>}
        </Field>
      </FieldGroup>
    </Form>
  )
}
