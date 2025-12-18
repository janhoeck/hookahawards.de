import { Category } from '@/lib/types'
import { z } from 'zod'

export const schema = z.object({
  title: z.string().min(1, {
    error: 'Du musst einen Titel angeben',
  }),
  description: z.string().optional().nullable(),
  type: z.enum(['clip', 'survey'], {
    error: 'Du musst einen Typ angeben',
  }),
  position: z.number().min(1),
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
