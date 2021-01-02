import express from 'express'

import homeRouter from './home'
import adminRouter from './admin'

import * as authController from '../controllers/auth'
import * as userController from '../controllers/user'

import * as authGuard from '../helpers/authGuard'

const Router = express.Router()

Router
  .use('/', [authGuard.checkToken], homeRouter)
  .use('/admin', [authGuard.checkToken, authGuard.canAccessAdmin], adminRouter)
  .post('/login', authController.login)
  .post('/register', userController.create)
  .use('*', (req, res) => res.status(404).json({ message: 'This route doesn\'t exist' }))

export default Router