import express from 'express'

import * as roleController from '../controllers/role'
import * as userController from '../controllers/user'

const Router = express.Router()

//? ROLE
Router.route('/role')
.get(roleController.list)
.post(roleController.create)

//? USER
Router.route('/user')
  .get(userController.list)
  .post(userController.create)

Router.route('/user/:id')
  .get(userController.find)
  .delete(userController.remove)

export default Router