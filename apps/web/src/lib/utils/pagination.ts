import { PaginationRequest, PaginationResponse } from '@/lib/types'

export const extractPaginationFromUrl = (url: URL): PaginationRequest => {
  const searchParams = url.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '50')
  const offset = (page - 1) * limit

  return {
    page,
    limit,
    offset,
  }
}

type Arguments<T> = {
  items: T[]
  page: number
  limit: number
  offset: number
  totalItemsCount: number
}

export const buildPaginationResponse = <T>(args: Arguments<T>): PaginationResponse<T> => {
  const { items, page, limit, offset, totalItemsCount } = args
  return {
    items,
    pagination: {
      page,
      limit,
      offset,
      total: totalItemsCount,
      hasMore: offset + limit < totalItemsCount,
    },
  }
}
