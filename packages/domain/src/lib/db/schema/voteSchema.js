"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteSchema = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var categorySchema_1 = require("./categorySchema");
var userSchema_1 = require("./userSchema");
exports.voteSchema = (0, pg_core_1.pgTable)('votes', {
    userId: (0, pg_core_1.text)('user_id')
        .notNull()
        .references(function () { return userSchema_1.userSchema.id; }, { onDelete: 'cascade' }),
    categoryId: (0, pg_core_1.uuid)('category_id')
        .notNull()
        .references(function () { return categorySchema_1.categorySchema.id; }, { onDelete: 'cascade' }),
    referenceId: (0, pg_core_1.uuid)('reference_id').notNull(), // Clip oder Survey ID
    referenceType: (0, categorySchema_1.categoryType)('reference_type').notNull(), // 'clip' | 'survey'
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
}, function (table) { return ({
    pk: (0, pg_core_1.primaryKey)({ columns: [table.userId, table.categoryId] }),
}); });
