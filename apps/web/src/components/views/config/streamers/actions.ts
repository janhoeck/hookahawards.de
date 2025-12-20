'use server'

import { deleteStreamerById } from '@/lib/api/streamers'
import { Streamer } from '@/lib/types'
import { revalidatePath } from 'next/cache'

export async function deleteStreamerAction(streamer: Streamer) {
  await deleteStreamerById(streamer.id)
  revalidatePath('/', 'layout')
}
