import { Streamer } from '@janhoeck/domain'
import { z } from 'zod'

export const schema = z.object({
  name: z.string().min(1, {
    error: 'Du musst einen Twitch Username angeben',
  }),
})

export type FormState =
  | {
      streamer: Streamer
      errors: null
      success: true
    }
  | {
      streamer: Streamer | null
      errors: null | Partial<Record<keyof z.infer<typeof schema>, string[]>>
      success: false
    }
