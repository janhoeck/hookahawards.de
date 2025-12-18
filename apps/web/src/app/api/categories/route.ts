import { db } from '@/lib/db'
import { categorySchema } from '@/lib/db/schema'
import { buildPaginationResponse, extractPaginationFromUrl } from '@/lib/utils'
import { count } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const { page, limit, offset } = extractPaginationFromUrl(request.url)

  try {
    const [countResponse, itemsResponse] = await Promise.all([
      db.select({ count: count() }).from(categorySchema),
      db.select().from(categorySchema).orderBy(categorySchema.position).limit(limit).offset(offset),
    ])

    const totalItemsCount = countResponse[0]?.count ?? 0

    return NextResponse.json(buildPaginationResponse({ items: itemsResponse, page, limit, offset, totalItemsCount }))
  } catch (error) {
    console.error(error)
    return NextResponse.error()
  }
}
