import Form from 'next/form'
import { FormState } from './schema'
import { Field, FieldError, FieldGroup, FieldLabel, Input } from '@janhoeck/ui'

export type CreateStreamerFormProps = {
  formState: FormState
  formAction: (payload: FormData) => void
  pending: boolean
}

export const CreateStreamerForm = (props: CreateStreamerFormProps) => {
  const { formState, formAction, pending } = props
  return (
    <Form
      action={formAction}
      id='create-streamer-form'
    >
      <FieldGroup>
        <Field data-invalid={!!formState.errors?.name}>
          <FieldLabel htmlFor='name'>Twitch Username</FieldLabel>
          <Input
            id='name'
            name='name'
            disabled={pending}
            placeholder='Der Twitch Username'
            autoComplete='off'
            aria-invalid={!!formState.errors?.name}
          />
          {formState.errors?.name && <FieldError>{formState.errors.name[0]}</FieldError>}
        </Field>
      </FieldGroup>
    </Form>
  )
}
