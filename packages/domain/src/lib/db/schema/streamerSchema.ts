import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export const streamerSchema = pgTable('streamers', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar().notNull(),
})
