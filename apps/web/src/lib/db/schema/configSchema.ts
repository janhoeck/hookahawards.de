import { jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { ConfigValue } from '../../types'

export const configSchema = pgTable('config', {
  key: text('key').primaryKey(),
  value: jsonb('value').$type<ConfigValue>().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
