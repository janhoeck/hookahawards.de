import { db } from '@/lib/db'
import { categorySchema } from '@/lib/db/schema'
import { buildPaginationResponse, extractPaginationFromUrl } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const { page, limit, offset } = extractPaginationFromUrl(new URL(request.url))

  try {
    const [countResponse, itemsResponse] = await Promise.all([
      db.$count(categorySchema),
      db.select().from(categorySchema).orderBy(categorySchema.position).limit(limit).offset(offset),
    ])

    const totalItemsCount = countResponse

    return NextResponse.json(buildPaginationResponse({ items: itemsResponse, page, limit, offset, totalItemsCount }))
  } catch (error) {
    console.error(error)
    return NextResponse.error()
  }
}
