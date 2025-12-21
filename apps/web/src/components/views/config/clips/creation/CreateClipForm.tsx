'use client'

import { Category, Streamer } from '@/lib/types'
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

export type CreateClipFormProps = {
  categories: Category[]
  streamers: Streamer[]
  formState: FormState
  formAction: (payload: FormData) => void
  pending: boolean
}

export const CreateClipForm = (props: CreateClipFormProps) => {
  const { categories, streamers, formState, formAction, pending } = props
  const [selectedStreamers, setSelectedStreamers] = useState<string[]>([])

  return (
    <Form
      action={formAction}
      id='create-clip-form'
    >
      <FieldGroup>
        <Field data-invalid={!!formState.errors?.title}>
          <FieldLabel htmlFor='title'>Titel</FieldLabel>
          <Input
            id='title'
            name='title'
            disabled={pending}
            placeholder='Der Titel des Clips'
            autoComplete='off'
            aria-invalid={!!formState.errors?.title}
          />
          {formState.errors?.title && <FieldError>{formState.errors.title[0]}</FieldError>}
        </Field>
        <Field data-invalid={!!formState.errors?.categoryId}>
          <FieldLabel htmlFor='title'>Kategorie</FieldLabel>
          <Select name='categoryId'>
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
          <FieldLabel htmlFor='description'>Beschreibung</FieldLabel>
          <Textarea
            id='description'
            name='description'
            disabled={pending}
            placeholder='Beschreibung für diesen Clip (Optional)'
            autoComplete='off'
            aria-invalid={!!formState.errors?.description}
          />
          {formState.errors?.description && <FieldError>{formState.errors.description[0]}</FieldError>}
        </Field>
      </FieldGroup>
    </Form>
  )
}
