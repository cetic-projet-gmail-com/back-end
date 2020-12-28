import express from 'express'
import homeRouter from './home'

import * as authController from '../controllers/auth'

const Router = express.Router()

Router
  .use('/home', homeRouter)
  .post('/login', authController.login)
  .post('/register', authController.register)

export default Router