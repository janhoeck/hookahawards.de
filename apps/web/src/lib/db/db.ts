import {
  createCategoryRepository,
  createClipRepository,
  createConfigRepository,
  createDatabaseClient,
  createStreamerRepository,
  createSurveyRepository,
  createVoteRepository,
} from '@janhoeck/domain'
import 'server-only'

export const db = createDatabaseClient(process.env.DATABASE_URL as string)

const categoryRepository = createCategoryRepository(db)
const surveyRepository = createSurveyRepository(db)
const clipRepository = createClipRepository(db)
const voteRepository = createVoteRepository(db)
const configRepository = createConfigRepository(db)
const streamerRepository = createStreamerRepository(db)

export { categoryRepository, surveyRepository, clipRepository, voteRepository, configRepository, streamerRepository }
