import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import 'server-only'

import {
  createCategoryRepository,
  createClipRepository,
  createConfigRepository,
  createStreamerRepository,
  createSurveyRepository,
  createVoteRepository,
} from './api'
import * as schema from './schema'

export type DatabaseClient = ReturnType<typeof createDatabaseClient>

export const createDatabaseClient = (url: string) => {
  const client = postgres(url, { prepare: false })
  return drizzle(client, { schema })
}

export const db = createDatabaseClient(process.env.DATABASE_URL as string)

const categoryRepository = createCategoryRepository(db)
const surveyRepository = createSurveyRepository(db)
const clipRepository = createClipRepository(db)
const voteRepository = createVoteRepository(db)
const configRepository = createConfigRepository(db)
const streamerRepository = createStreamerRepository(db)

export { categoryRepository, surveyRepository, clipRepository, voteRepository, configRepository, streamerRepository }
