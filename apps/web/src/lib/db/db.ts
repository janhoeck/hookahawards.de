import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'

const isProduction = process.env.NODE_ENV === 'production'

const dbUrl = process.env.DATABASE_URL
if (!dbUrl) {
  throw new Error('DATABASE_URL environment variable is required')
}

export const postgresClient = postgres(dbUrl, {
  prepare: false,
  max: 5,
  idle_timeout: 0,
  connect_timeout: 5,
  max_lifetime: 60 * 30,
  onnotice: isProduction ? undefined : console.log,
  debug: !isProduction,
  transform: {
    undefined: null,
  },
})

// ✅ Drizzle instance
export const db = drizzle(postgresClient, { schema })
