'use server'

import { db } from '@/lib/db'
import { configSchema } from '@/lib/db/schema'
import { Config } from '@/lib/types'

export const fetchConfig = async (): Promise<Config> => {
  const response = await db.select({ key: configSchema.key, value: configSchema.value }).from(configSchema)
  const configObject = Object.fromEntries(response.map(({ key, value }) => [key, value]))
  return configObject as Config
}
