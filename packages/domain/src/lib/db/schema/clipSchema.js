"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clipSchema = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var categorySchema_1 = require("./categorySchema");
exports.clipSchema = (0, pg_core_1.pgTable)('clips', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    categoryId: (0, pg_core_1.uuid)('category_id')
        .notNull()
        .references(function () { return categorySchema_1.categorySchema.id; }, { onDelete: 'cascade' }),
    link: (0, pg_core_1.text)('link').notNull(),
    title: (0, pg_core_1.text)('title').notNull(),
    description: (0, pg_core_1.text)('description'),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
