import express from 'express'

import * as departmentController from '../controllers/department'
import * as roleController from '../controllers/role'
import * as userController from '../controllers/user'

const Router = express.Router()

//? DEPARTMENT
Router.route('/department')
  .get(departmentController.list)
  .post(departmentController.create)

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

Router.route('/user/:userId/role/:roleId')
  .patch(userController.setRole)

Router.route('/user/:userId/department/:departmentId')
  .patch(userController.setDepartment)

export default Router