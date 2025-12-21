import { getCurrentUser } from '@/lib/auth/auth-server'
import { db } from '@/lib/db'
import { voteSchema } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const result = await db.select().from(voteSchema).where(eq(voteSchema.userId, user.id))
    if (!result) {
      return new NextResponse(null, { status: 204 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error(error)
  }
  return NextResponse.error()
}
