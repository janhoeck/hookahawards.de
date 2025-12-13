import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'

export type DatabaseClient = ReturnType<typeof createDatabaseClient>

export const createDatabaseClient = (url: string) => {
  const client = postgres(url, { prepare: false })
  return drizzle(client, { schema })
}
