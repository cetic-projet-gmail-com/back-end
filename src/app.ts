import dotenv from 'dotenv'
dotenv.config()
import { Request, Response, NextFunction } from 'express'
import express from 'express'
import cors from 'cors'

import { createConnection } from 'typeorm'
import "reflect-metadata";

import MainRouter from './api/routes/index'

interface Token {
  id: number
  role: number
}
declare global {
  namespace Express {
    interface Request {
      token: Token
    }
  }
}

try {
  createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    ssl: process.env.NODE_ENV === 'development' ? undefined : {
      rejectUnauthorized: false
    },
    entities: [
      `${process.cwd()}/dist/api/models/*.js`,
    ],
  }).then(() => {
    console.log('Connection to database successfully established')
  })

} catch (error) {
  console.error(error)
}

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(cors({
  origin: process.env.CORS_ORIGIN,
}))

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.originalUrl}`)
  next()
})

app.use ('/', MainRouter)

export default app