import http from 'http'
import { createConnection } from 'typeorm'
import "reflect-metadata";
import dotenv from 'dotenv-flow'
dotenv.config()

import app from './app'

const {
  HTTP_PORT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} = process.env

try {
  (async () => {
    await createConnection({
      type: "postgres",
      host: DB_HOST,
      port: Number(DB_PORT),
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      synchronize: true,
      logging: false,
      entities: [
        `${process.cwd()}/src/api/models/*.ts`,
      ],
    })

    console.log('DB Connected')
  })()
} catch (error) {
  console.error('Problem during launch DB')
}

try {
  http.createServer(app)
    .listen(HTTP_PORT, () => {
    console.log(`server start: http://localhost:${HTTP_PORT}`)
  })

} catch (error) {
  console.error('Problem during launch server')
}
