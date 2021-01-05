import http from 'http'
import { createConnection } from 'typeorm'
import "reflect-metadata"
import dotenv from 'dotenv-flow'
dotenv.config()

import app from './app.js'

const {
  PORT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} = process.env

;(async () => {
  try {
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
        // `${process.cwd()}/src/api/models/*.ts`,
        'build/api/models/*.js'
      ],
    })
    console.log('DB Connected')
  } catch (error) {
    console.error('Problem during launch DB')
    console.error(error)
  }

  try {
    http.createServer(app)
      .listen(PORT, () => {
      console.log(`server start: http://localhost:${PORT}`)
    })

  } catch (error) {
    console.error('Problem during launch server')
  }
})()
