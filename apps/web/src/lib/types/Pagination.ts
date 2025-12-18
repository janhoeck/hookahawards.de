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

export type Pagination = {
  page: number
  limit: number
}
