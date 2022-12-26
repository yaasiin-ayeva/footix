"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const config_1 = require("./conf/config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: config_1.default.host,
    port: config_1.default.port,
    username: config_1.default.username,
    password: config_1.default.password,
    database: config_1.default.database,
    synchronize: config_1.default.env === 'production',
    logging: config_1.default.env === 'production',
    entities: [
        config_1.default.env === "production" ? "./build/entity/**/*.js" : "src/entity/**/*.ts",
        config_1.default.env === "test" ? "./tests/entity/**/*.js" : "src/entity/**/*.ts",
        config_1.default.env === "development" ? "./src/entity/**/*.ts" : "src/entity/**/*.ts",
    ],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map