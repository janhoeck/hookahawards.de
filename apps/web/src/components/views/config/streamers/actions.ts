'use server'

import { streamerRepository } from '@/lib/db'
import { Streamer } from '@/lib/types'
import { revalidatePath } from 'next/cache'

export async function deleteStreamerAction(streamer: Streamer) {
  await streamerRepository.deleteStreamerById(streamer.id)
  revalidatePath('/', 'layout')
}
