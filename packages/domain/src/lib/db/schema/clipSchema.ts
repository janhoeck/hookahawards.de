import { pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { categorySchema } from './categorySchema'
import { streamerSchema } from './streamerSchema'

export const clipSchema = pgTable('clips', {
  id: uuid('id').primaryKey().defaultRandom(),
  categoryId: uuid('category_id')
    .notNull()
    .references(() => categorySchema.id, { onDelete: 'cascade' }),
  link: text('link').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const clipRelations = relations(clipSchema, ({ many, one }) => ({
  streamers: many(clipStreamersSchema),
  category: one(categorySchema, {
    fields: [clipSchema.categoryId],
    references: [categorySchema.id],
  }),
}))

export const clipStreamersSchema = pgTable(
  'clip_streamers',
  {
    clipId: uuid('clip_id')
      .notNull()
      .references(() => clipSchema.id, { onDelete: 'cascade' }),
    streamerId: uuid('streamer_id')
      .notNull()
      .references(() => streamerSchema.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.clipId, table.streamerId] }),
  })
)

export const clipStreamersRelations = relations(clipStreamersSchema, ({ one }) => ({
  clip: one(clipSchema, {
    fields: [clipStreamersSchema.clipId],
    references: [clipSchema.id],
  }),
  streamer: one(streamerSchema, {
    fields: [clipStreamersSchema.streamerId],
    references: [streamerSchema.id],
  }),
}))
