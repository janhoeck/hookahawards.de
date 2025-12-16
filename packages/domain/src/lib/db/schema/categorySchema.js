"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = exports.categoryType = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
exports.categoryType = (0, pg_core_1.pgEnum)('category_type', ['clip', 'survey']);
exports.categorySchema = (0, pg_core_1.pgTable)('categories', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    type: (0, exports.categoryType)('type').notNull(),
    title: (0, pg_core_1.text)('title').notNull(),
    description: (0, pg_core_1.text)('description'),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
