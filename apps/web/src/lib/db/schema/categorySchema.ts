import { integer, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const categoryType = pgEnum('category_type', ['clip', 'survey'])

export const categorySchema = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: categoryType('type').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  position: integer('position').notNull().default(0),
})
