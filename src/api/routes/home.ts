import express from 'express'

import * as profileController from '../controllers/profile'
import * as userController from '../controllers/user'

const Router = express.Router()

Router.route('/profile')
  .get(profileController.find)
  .patch(profileController.update)

Router.route('/user')
  .get(userController.list)

Router.route('/user/:id')
  .get(userController.find)

export default Router