import { z } from 'zod'
import { Survey } from '@janhoeck/domain'

export const schema = z.object({
  id: z.uuid(),
  title: z.string().min(1, {
    error: 'Du musst einen Titel angeben',
  }),
  description: z.string().optional(),
  categoryId: z.uuid({
    error: 'Du musst der Umfrage einer Kategorie zuordnen',
  }),
})

export type FormState =
  | {
      survey: Survey
      errors: null
      success: true
    }
  | {
      survey: null
      errors: null | Partial<Record<keyof z.infer<typeof schema>, string[]>>
      success: false
    }
