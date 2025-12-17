import { Category, Clip, Streamer } from '@janhoeck/domain'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  MultiSelect,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@janhoeck/ui'
import Form from 'next/form'
import { useState } from 'react'

import { FormState } from './schema'

export type EditClipFormProps = {
  clip: Clip
  categories: Category[]
  streamers: Streamer[]
  formState: FormState
  formAction: (payload: FormData) => void
  pending: boolean
}

export const EditClipForm = (props: EditClipFormProps) => {
  const { clip, categories, streamers, formState, formAction, pending } = props

  const [selectedStreamers, setSelectedStreamers] = useState<string[]>(clip.streamerIds)

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
        <Field>
          <FieldLabel htmlFor='streamerIds'>Teilnehmer</FieldLabel>
          <MultiSelect
            options={streamers.map((streamer) => ({
              value: streamer.id,
              label: streamer.name,
            }))}
            onValueChange={setSelectedStreamers}
            placeholder='Clip Teilnehmer auswählen...'
            defaultValue={selectedStreamers}
            value={selectedStreamers}
          />
          {/* Hidden input for FormData */}
          <input
            type='hidden'
            name='streamerIds'
            value={JSON.stringify(selectedStreamers)}
          />
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
      </FieldGroup>
    </Form>
  )
}
