import { db } from '@/lib/db'
import { clipSchema } from '@/lib/db/schema'
import { buildPaginationResponse, extractPaginationFromUrl } from '@/lib/utils'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url)
  const { page, limit, offset } = extractPaginationFromUrl(url)
  const categoryId = url.searchParams.get('categoryId')

  const where = categoryId ? eq(clipSchema.categoryId, categoryId) : undefined

  try {
    const [countResponse, itemsResponse] = await Promise.all([
      db.$count(clipSchema, where),
      await db.query.clipSchema.findMany({
        limit,
        offset,
        where,
        with: {
          streamers: {
            columns: {
              streamerId: true,
            },
          },
        },
      }),
    ])

    const totalItemsCount = countResponse

    return NextResponse.json(
      buildPaginationResponse({
        items: itemsResponse.map((clip) => {
          const { streamers, ...rest } = clip
          return {
            ...rest,
            streamerIds: streamers.map((cs) => cs.streamerId),
          }
        }),
        page,
        limit,
        offset,
        totalItemsCount,
      })
    )
  } catch (error) {
    console.error(error)
    return NextResponse.error()
  }
}
