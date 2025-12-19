import { db } from '@/lib/db'
import { clipSchema } from '@/lib/db/schema'
import { buildPaginationResponse, extractPaginationFromUrl } from '@/lib/utils'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

type Params = Promise<{ categoryId: string }>

export const GET = async (request: NextRequest, { params }: { params: Params }) => {
  const { page, limit, offset } = extractPaginationFromUrl(request.url)
  const { categoryId } = await params

  try {
    const [countResponse, itemsResponse] = await Promise.all([
      db.$count(clipSchema, eq(clipSchema.categoryId, categoryId)),
      db.query.clipSchema.findMany({
        limit,
        offset,
        where: eq(clipSchema.categoryId, categoryId),
        with: {
          streamers: true,
        },
      }),
    ])

    const totalItemsCount = countResponse

    return NextResponse.json(
      buildPaginationResponse({
        items: itemsResponse.map((clip) => ({
          ...clip,
          streamerIds: clip.streamers.map((cs) => cs.streamerId),
        })),
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
