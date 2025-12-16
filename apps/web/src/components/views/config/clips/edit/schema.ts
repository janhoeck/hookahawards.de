import { z } from 'zod'
import { Clip } from '@janhoeck/domain'

const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[\w-]{11}([?&].*)?$/

export const schema = z.object({
  id: z.uuid(),
  title: z.string().min(1, {
    error: 'Du musst einen Titel angeben',
  }),
  description: z.string().nullable(),
  categoryId: z.uuid({
    error: 'Du musst den Clip einer Kategorie zuordnen',
  }),
  link: z.url({
    pattern: youtubeUrlRegex,
    error: 'Nur YouTube Links sind erlaubt',
  }),
  streamerIds: z.preprocess((val) => {
    if (typeof val === 'string') {
      return JSON.parse(val)
    }
    return val
  }, z.array(z.string())),
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
