import Form from 'next/form'
import { FormState } from './schema'
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
import { Category, Clip } from '@janhoeck/domain'

export type EditClipFormProps = {
  clip: Clip
  categories: Category[]
  formState: FormState
  formAction: (payload: FormData) => void
  pending: boolean
}

export const EditClipForm = (props: EditClipFormProps) => {
  const { clip, categories, formState, formAction, pending } = props
  return (
    <Form
      action={formAction}
      id='edit-clip-form'
    >
      <FieldGroup>
        <Input
          type='hidden'
          name='id'
          id='id'
          value={clip.id}
        />
        <Field data-invalid={!!formState.errors?.title}>
          <FieldLabel htmlFor='title'>Titel</FieldLabel>
          <Input
            id='title'
            name='title'
            disabled={pending}
            placeholder='Der Titel des Clips'
            defaultValue={clip.title}
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
            placeholder='Beschreibung für diesen Clip (Optional)'
            defaultValue={clip.description ?? ''}
            autoComplete='off'
            aria-invalid={!!formState.errors?.description}
          />
          {formState.errors?.description && <FieldError>{formState.errors.description[0]}</FieldError>}
        </Field>
        <Field data-invalid={!!formState.errors?.categoryId}>
          <FieldLabel htmlFor='title'>Kategorie</FieldLabel>
          <Select
            name='categoryId'
            defaultValue={clip.categoryId}
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
        <Field data-invalid={!!formState.errors?.link}>
          <FieldLabel htmlFor='link'>YouTube URL</FieldLabel>
          <Input
            id='link'
            name='link'
            disabled={pending}
            placeholder='https://www.youtube.com/watch?v=N_oO_LJY-y8'
            defaultValue={clip.link}
            autoComplete='off'
            aria-invalid={!!formState.errors?.link}
          />
          {formState.errors?.link && <FieldError>{formState.errors.link[0]}</FieldError>}
        </Field>
      </FieldGroup>
    </Form>
  )
}
