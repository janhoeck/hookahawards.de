import { config as dotenvConfig } from 'dotenv'
import path from 'path'

import { createDatabaseClient } from '../lib'
import { configSchema } from '../lib/db/schema'

const projectRoot = path.resolve(process.cwd(), '../../')

dotenvConfig({ path: path.join(projectRoot, '.env.local') })
dotenvConfig({ path: path.join(projectRoot, '.env') })

const db = createDatabaseClient(process.env.DATABASE_URL!)

async function configSeed() {
  await db
    .insert(configSchema)
    .values([{ key: 'voting_end_date', value: '2025-12-30' }])
    .onConflictDoNothing()
}

configSeed()
  .then(() => {
    console.log('Config seeds inserted')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Seed failed', err)
    process.exit(1)
  })
