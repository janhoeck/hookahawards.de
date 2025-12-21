import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'

const isServerless = true
const isProduction = process.env.NODE_ENV === 'production'

const dbUrl = process.env.DATABASE_URL
if (!dbUrl) {
  throw new Error('DATABASE_URL environment variable is required')
}

export const postgresClient = postgres(dbUrl, {
  prepare: !isServerless,
  max: isServerless ? 1 : 10,
  idle_timeout: isServerless ? 0 : 300,
  connect_timeout: 5,
  max_lifetime: isServerless ? 60 * 30 : 60 * 60,
  onnotice: isProduction ? undefined : console.log,
  debug: !isProduction,
  transform: {
    undefined: null,
  },
})

// ✅ Drizzle instance
export const db = drizzle(postgresClient, { schema })
