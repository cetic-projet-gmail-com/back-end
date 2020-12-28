import express from 'express'

import MainRouter from './api/routes/index'

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all('*', (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`)
  next()
})

app.use ('/', MainRouter)

export default app