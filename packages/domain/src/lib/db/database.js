"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabaseClient = void 0;
var postgres_js_1 = require("drizzle-orm/postgres-js");
var postgres_1 = require("postgres");
var schema = require("./schema");
var createDatabaseClient = function (url) {
    var client = (0, postgres_1.default)(url, { prepare: false });
    return (0, postgres_js_1.drizzle)(client, { schema: schema });
};
exports.createDatabaseClient = createDatabaseClient;
