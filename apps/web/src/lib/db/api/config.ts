import { Config } from '../../types'
import { DatabaseClient } from '../db'
import { configSchema } from '../schema'

export const createConfigRepository = (db: DatabaseClient) => {
  const getConfig = async () => {
    try {
      const response = await db.select({ key: configSchema.key, value: configSchema.value }).from(configSchema)
      const configObject = Object.fromEntries(response.map(({ key, value }) => [key, value]))
      return configObject as Config
    } catch (error) {
      console.error('Failed to execute getConfig:', error)
      return {}
    }
  }

  return {
    getConfig,
  }
}
