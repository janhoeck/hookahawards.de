'use server'

import { streamerRepository } from '@/lib/db/db'
import { Streamer } from '@janhoeck/domain'
import { revalidatePath } from 'next/cache'

export async function deleteStreamerAction(streamer: Streamer) {
  await streamerRepository.deleteStreamerById(streamer.id)
  revalidatePath('/', 'layout')
}
