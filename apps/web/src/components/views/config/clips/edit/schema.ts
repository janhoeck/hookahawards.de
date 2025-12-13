import { z } from 'zod'
import { Clip } from '@janhoeck/domain'

const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[\w-]{11}([?&].*)?$/

export const schema = z.object({
  id: z.uuid(),
  title: z.string().min(1, {
    error: 'Du musst einen Titel angeben',
  }),
  description: z.string().optional(),
  categoryId: z.uuid({
    error: 'Du musst den Clip einer Kategorie zuordnen',
  }),
  link: z.url({
    pattern: youtubeUrlRegex,
    error: 'Nur YouTube Links sind erlaubt',
  }),
})

export type FormState =
  | {
      clip: Clip
      errors: null
      success: true
    }
  | {
      clip: null
      errors: null | Partial<Record<keyof z.infer<typeof schema>, string[]>>
      success: false
    }
