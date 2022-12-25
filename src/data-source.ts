import "reflect-metadata"
import { DataSource } from "typeorm"
import Env from "./conf/config"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: Env.host,
    port: Env.port,
    username: Env.username,
    password: Env.password,
    database: Env.database,
    synchronize: Env.env === 'production',
    logging: Env.env === 'production',
    entities: [
        Env.env === "production" ? "./build/entity/**/*.js" : "src/entity/**/*.ts",
        Env.env === "test" ? "./tests/entity/**/*.js" : "src/entity/**/*.ts",
        Env.env === "development" ? "./src/entity/**/*.ts" : "src/entity/**/*.ts",
    ],
    migrations: [],
    subscribers: [],
})
