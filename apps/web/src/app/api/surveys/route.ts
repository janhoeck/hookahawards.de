import { db } from '@/lib/db'
import { surveySchema } from '@/lib/db/schema'
import { buildPaginationResponse, extractPaginationFromUrl } from '@/lib/utils'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url)
  const { page, limit, offset } = extractPaginationFromUrl(url)
  const categoryId = url.searchParams.get('categoryId')

  const where = categoryId ? eq(surveySchema.categoryId, categoryId) : undefined

  try {
    const [countResponse, itemsResponse] = await Promise.all([
      db.$count(surveySchema, where),
      db.select().from(surveySchema).orderBy(surveySchema.createdAt).where(where).limit(limit).offset(offset),
    ])

    const totalItemsCount = countResponse

    return NextResponse.json(buildPaginationResponse({ items: itemsResponse, page, limit, offset, totalItemsCount }))
  } catch (error) {
    console.error(error)
    return NextResponse.error()
  }
}
