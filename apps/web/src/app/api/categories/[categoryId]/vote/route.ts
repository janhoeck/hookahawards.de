import { getCurrentUser } from '@/lib/auth/auth-server'
import { db } from '@/lib/db'
import { voteSchema } from '@/lib/db/schema'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

type Params = Promise<{ categoryId: string }>

const bodySchema = z.object({
  referenceId: z.string(),
  referenceType: z.enum(['clip', 'survey']),
})

export const POST = async (request: NextRequest, { params }: { params: Params }) => {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const userId = user.id
  const { categoryId } = await params

  const body = await request.json()
  if (!body) {
    return NextResponse.json('', { status: 400 })
  }

  const { success, data, error } = bodySchema.safeParse(body)
  if (!success) {
    return NextResponse.json(error, { status: 400 })
  }

  const { referenceId, referenceType } = data
  try {
    const response = await db
      .insert(voteSchema)
      .values({
        userId,
        categoryId,
        referenceId,
        referenceType,
      })
      .onConflictDoUpdate({
        target: [voteSchema.userId, voteSchema.categoryId],
        set: {
          referenceId,
          referenceType,
        },
      })
      .returning()
    return NextResponse.json(response[0], { status: 200 })
  } catch (error) {
    console.error(error)
  }
  return NextResponse.error()
}
