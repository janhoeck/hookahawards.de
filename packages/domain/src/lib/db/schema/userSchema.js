"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationSchema = exports.accountSchema = exports.sessionSchema = exports.userSchema = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
// =======================
// USER
// =======================
exports.userSchema = (0, pg_core_1.pgTable)('user', {
    id: (0, pg_core_1.text)('id').notNull().primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    email: (0, pg_core_1.text)('email').notNull().unique(),
    emailVerified: (0, pg_core_1.boolean)('emailVerified').notNull(),
    image: (0, pg_core_1.text)('image'),
    createdAt: (0, pg_core_1.timestamp)('createdAt', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updatedAt', { withTimezone: true }).defaultNow().notNull(),
});
// =======================
// SESSION
// =======================
exports.sessionSchema = (0, pg_core_1.pgTable)('session', {
    id: (0, pg_core_1.text)('id').notNull().primaryKey(),
    expiresAt: (0, pg_core_1.timestamp)('expiresAt', { withTimezone: true }).notNull(),
    token: (0, pg_core_1.text)('token').notNull().unique(),
    createdAt: (0, pg_core_1.timestamp)('createdAt', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updatedAt', { withTimezone: true }).notNull(),
    ipAddress: (0, pg_core_1.text)('ipAddress'),
    userAgent: (0, pg_core_1.text)('userAgent'),
    userId: (0, pg_core_1.text)('userId')
        .notNull()
        .references(function () { return exports.userSchema.id; }, { onDelete: 'cascade' }),
});
// =======================
// ACCOUNT
// =======================
exports.accountSchema = (0, pg_core_1.pgTable)('account', {
    id: (0, pg_core_1.text)('id').notNull().primaryKey(),
    accountId: (0, pg_core_1.text)('accountId').notNull(),
    providerId: (0, pg_core_1.text)('providerId').notNull(),
    userId: (0, pg_core_1.text)('userId')
        .notNull()
        .references(function () { return exports.userSchema.id; }, { onDelete: 'cascade' }),
    accessToken: (0, pg_core_1.text)('accessToken'),
    refreshToken: (0, pg_core_1.text)('refreshToken'),
    idToken: (0, pg_core_1.text)('idToken'),
    accessTokenExpiresAt: (0, pg_core_1.timestamp)('accessTokenExpiresAt', {
        withTimezone: true,
    }),
    refreshTokenExpiresAt: (0, pg_core_1.timestamp)('refreshTokenExpiresAt', {
        withTimezone: true,
    }),
    scope: (0, pg_core_1.text)('scope'),
    password: (0, pg_core_1.text)('password'),
    createdAt: (0, pg_core_1.timestamp)('createdAt', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updatedAt', { withTimezone: true }).notNull(),
});
// =======================
// VERIFICATION
// =======================
exports.verificationSchema = (0, pg_core_1.pgTable)('verification', {
    id: (0, pg_core_1.text)('id').notNull().primaryKey(),
    identifier: (0, pg_core_1.text)('identifier').notNull(),
    value: (0, pg_core_1.text)('value').notNull(),
    expiresAt: (0, pg_core_1.timestamp)('expiresAt', { withTimezone: true }).notNull(),
    createdAt: (0, pg_core_1.timestamp)('createdAt', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updatedAt', { withTimezone: true }).defaultNow().notNull(),
});
