import express from 'express'
import cors from 'cors'

import MainRouter from './api/routes/index.js'

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(cors({
  origin: process.env.CORS_ORIGIN,
}))

app.all('*', (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`)
  next()
})

app.use ('/', MainRouter)

export default app