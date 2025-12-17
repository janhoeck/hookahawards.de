import { z } from 'zod'
import { Survey } from '@janhoeck/domain'

export const schema = z.object({
  title: z.string().min(1, {
    error: 'Du musst einen Titel angeben',
  }),
  description: z.string().optional().nullable(),
  categoryId: z.uuid({
    error: 'Du musst die Umfrage einer Kategorie zuordnen',
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
