import { z } from 'zod'
import { Category } from '@janhoeck/domain'

export const schema = z.object({
  title: z.string().min(1, {
    error: 'Du musst einen Titel angeben',
  }),
  description: z.string().optional(),
  type: z.enum(['clip', 'survey'], {
    error: 'Du musst einen Typ angeben',
  }),
})

export type FormState =
  | {
      category: Category
      errors: null
      success: true
    }
  | {
      category: null
      errors: null | Partial<Record<keyof z.infer<typeof schema>, string[]>>
      success: false
    }
