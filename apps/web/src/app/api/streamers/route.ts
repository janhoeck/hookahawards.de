import { db } from '@/lib/db'
import { streamerSchema } from '@/lib/db/schema'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const response = await db.select().from(streamerSchema)
  return NextResponse.json(response)
}
