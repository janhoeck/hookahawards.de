import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'
import * as path from 'path'

config({
  path: [path.resolve(__dirname, '../../.env.local'), path.resolve(__dirname, '../../.env')],
})

export default defineConfig({
  schema: './src/lib/db/schema',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
})
