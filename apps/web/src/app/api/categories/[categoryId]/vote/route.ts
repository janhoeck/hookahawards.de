import { getCurrentUser } from '@/lib/auth/auth-server'
import { voteRepository } from '@/lib/db'
import { NextRequest } from 'next/server'
import { z } from 'zod'

type Params = Promise<{ categoryId: string }>

const bodySchema = z.object({
  referenceId: z.string(),
  referenceType: z.enum(['clip', 'survey']),
})

export const POST = async (request: NextRequest, { params }: { params: Params }) => {
  const user = await getCurrentUser()
  if (!user) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const userId = user.id
  const { categoryId } = await params

  const body = await request.json()
  if (!body) {
    return Response.json('', { status: 400 })
  }

  const { success, data, error } = bodySchema.safeParse(body)
  if (!success) {
    return Response.json(error, { status: 400 })
  }

  try {
    await voteRepository.insertVote({
      userId,
      categoryId,
      referenceId: data.referenceId,
      referenceType: data.referenceType,
    })
    return Response.json('', { status: 200 })
  } catch (error) {
    console.error(error)
  }
  return Response.error()
}
