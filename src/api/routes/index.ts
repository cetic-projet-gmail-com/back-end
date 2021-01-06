import { Request, Response } from 'express'
import express from 'express'

import homeRouter from './home'
import adminRouter from './admin'

import * as authController from '../controllers/auth'
import * as userController from '../controllers/user'

import * as authGuard from '../helpers/authGuard'

const Router = express.Router()

Router
  .post('/login', authController.login)
  .post('/register', userController.create)
  .use('/', [authGuard.checkToken], homeRouter)
  .use('/admin', [authGuard.checkToken, authGuard.canAccessAdmin], adminRouter)
  .use('*', (req: Request, res: Response) => res.status(404).json({ message: 'This route doesn\'t exist' }))

export default Router