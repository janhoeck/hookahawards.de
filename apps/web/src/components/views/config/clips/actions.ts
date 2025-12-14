'use server'

import { Clip } from '@janhoeck/domain'
import { clipRepository } from '@/lib/db/db'
import { revalidatePath } from 'next/cache'

export async function deleteClipAction(clip: Clip) {
  revalidatePath('/', 'layout')
  await clipRepository.deleteClipById(clip.id)
}
