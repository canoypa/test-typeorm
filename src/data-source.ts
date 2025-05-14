import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./models/User.js"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db/development.sqlite",
    synchronize: true,
    logging: false,
    entities: [User],
    subscribers: [],
    migrations: [],
})
