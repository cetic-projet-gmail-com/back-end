import express from 'express'

import homeRouter from './home.js'
import adminRouter from './admin.js'

import * as authController from '../controllers/auth.js'
import * as userController from '../controllers/user.js'

import * as authGuard from '../helpers/authGuard.js'

const Router = express.Router()

Router
  .post('/login', authController.login)
  .post('/register', userController.create)
  .use('/', [authGuard.checkToken], homeRouter)
  .use('/admin', [authGuard.checkToken, authGuard.canAccessAdmin], adminRouter)
  .use('*', (req, res) => res.status(404).json({ message: 'This route doesn\'t exist' }))

export default Router