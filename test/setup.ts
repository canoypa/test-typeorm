import "reflect-metadata"
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest"
import { DataSource, type EntityManager, type QueryRunner } from "typeorm"
import { User } from "../src/models/User.js"

export const TestDataSource = new DataSource({
    type: "sqlite",
    database: "db/test.sqlite",
    synchronize: true,
    logging: false,
    entities: [User],
    subscribers: [],
    migrations: ["db/migrations/*.ts"],
})

await TestDataSource.initialize()

afterEach(async () => {
  const tableNames: Array<{ name: string }> = await TestDataSource.query(
    `select name from sqlite_master where type = 'table';`
  )
  
  const tables = tableNames
    .map(({ name }) => name)
    .filter((name) => name !== '_prisma_migrations' && name !== 'sqlite_sequence')

  for await (const table of tables) {
    try {
      await TestDataSource.query(`delete from ${table};`)
    } catch (error) {
      console.log({ error })
    }
  }
})
