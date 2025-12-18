'use server'

import { clipRepository } from '@/lib/db/db'
import { Clip } from '@/lib/types'
import { revalidatePath } from 'next/cache'

export async function deleteClipAction(clip: Clip) {
  revalidatePath('/', 'layout')
  await clipRepository.deleteClipById(clip.id)
}
