import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { categorySchema } from './categorySchema'

export const surveySchema = pgTable('surveys', {
  id: uuid('id').primaryKey().defaultRandom(),
  categoryId: uuid('category_id')
    .notNull()
    .references(() => categorySchema.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
