import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { User } from './models/User.js'
import { AppDataSource } from './data-source.js'

await AppDataSource.initialize()

const app = new Hono()

app.get('/', async (c) => {
  console.log("Inserting a new user into the database...")
  const user = await User.save({
    firstName: "Timber",
    lastName: "Saw",
    age: 25,
  })
  console.log("Saved a new user with id: " + user.id)

  console.log("Loading users from the database...")
  const users = await User.find()
  console.log("Loaded users: ", users)

  console.log("Here you can setup and run express / fastify / any other framework.")

  return c.json(users)
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
