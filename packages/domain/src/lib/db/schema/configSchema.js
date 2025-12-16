"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSchema = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
exports.configSchema = (0, pg_core_1.pgTable)('config', {
    key: (0, pg_core_1.text)('key').primaryKey(),
    value: (0, pg_core_1.jsonb)('value').$type().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
