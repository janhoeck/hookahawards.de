import { db } from '@/lib/db'
import { clipSchema } from '@/lib/db/schema'
import { buildPaginationResponse, extractPaginationFromUrl } from '@/lib/utils'
import { count, eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

type Params = Promise<{ categoryId: string }>

export const GET = async (request: NextRequest, { params }: { params: Params }) => {
  const { page, limit, offset } = extractPaginationFromUrl(request.url)
  const { categoryId } = await params

  try {
    const [countResponse, itemsResponse] = await Promise.all([
      db.select({ count: count() }).from(clipSchema).where(eq(clipSchema.categoryId, categoryId)),
      db
        .select()
        .from(clipSchema)
        .orderBy(clipSchema.createdAt)
        .where(eq(clipSchema.categoryId, categoryId))
        .limit(limit)
        .offset(offset),
    ])

    const totalItemsCount = countResponse[0]?.count ?? 0

    return NextResponse.json(buildPaginationResponse({ items: itemsResponse, page, limit, offset, totalItemsCount }))
  } catch (error) {
    console.error(error)
    return NextResponse.error()
  }
}
