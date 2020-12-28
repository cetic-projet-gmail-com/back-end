import http from 'http'
import dotenv from 'dotenv-flow'
import { createConnection } from 'typeorm'
import "reflect-metadata";

import app from './app'

dotenv.config()

const {
  PORT,
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
    .listen(PORT, () => {
    console.log(`server starded: http://localhost:${PORT}`)
  });

} catch (error) {
  console.error('Problem during launch server')
}
