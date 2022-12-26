"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const Env = {
    env: String(process.env.NODE_ENV),
    name: String(process.env.API_NAME),
    key: String(process.env.API_KEY),
    host: String(process.env.DATABASE_HOST),
    port: Number(process.env.DATABASE_PORT),
    username: String(process.env.DATABASE_USER),
    password: String(process.env.DATABASE_PASSWORD),
    database: String(process.env.DATABASE_NAME),
};
exports.default = Env;
//# sourceMappingURL=config.js.map