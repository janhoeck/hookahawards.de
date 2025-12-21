import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import 'server-only'

import * as schema from './schema'

export const createDatabaseClient = (url: string) => {
  const client = postgres(url, { prepare: false })
  return drizzle(client, { schema })
}

export const db = createDatabaseClient(process.env.DATABASE_URL as string)
