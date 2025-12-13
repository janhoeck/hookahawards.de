import 'server-only'

import {
  createCategoryRepository,
  createClipRepository,
  createDatabaseClient,
  createSurveyRepository,
  createVoteRepository,
} from '@janhoeck/domain'

export const db = createDatabaseClient(process.env.DATABASE_URL as string)

const categoryRepository = createCategoryRepository(db)
const surveyRepository = createSurveyRepository(db)
const clipRepository = createClipRepository(db)
const voteRepository = createVoteRepository(db)

export { categoryRepository, surveyRepository, clipRepository, voteRepository }
