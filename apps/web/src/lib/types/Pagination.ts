export type PaginationResponse<T> = {
  items: T[]
  pagination: {
    page: number
    offset: number
    limit: number
    total: number
    hasMore: boolean
  }
}

export type PaginationRequest = {
  page: number
  limit: number
  offset: number
}

export type Pagination = {
  page: number
  limit: number
}
