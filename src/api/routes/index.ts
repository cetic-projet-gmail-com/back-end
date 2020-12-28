import express from 'express'
import homeRouter from './home'

import * as authController from '../controllers/auth'
import * as userController from '../controllers/user'

const Router = express.Router()

Router
  .use('/home', homeRouter)
  .post('/login', authController.login)
  .post('/register', userController.create)

export default Router