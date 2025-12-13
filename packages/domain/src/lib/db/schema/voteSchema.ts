import { pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { categorySchema, categoryType } from './categorySchema'
import { userSchema } from './userSchema'

export const voteSchema = pgTable(
  'votes',
  {
    userId: text('user_id')
      .notNull()
      .references(() => userSchema.id, { onDelete: 'cascade' }),
    categoryId: uuid('category_id')
      .notNull()
      .references(() => categorySchema.id, { onDelete: 'cascade' }),
    referenceId: uuid('reference_id').notNull(), // Clip oder Survey ID
    referenceType: categoryType('reference_type').notNull(), // 'clip' | 'survey'
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.categoryId] }),
  })
)
