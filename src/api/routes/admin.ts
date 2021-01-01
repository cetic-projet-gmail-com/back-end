import express from 'express'

import * as departmentController from '../controllers/department'
import * as eventController from '../controllers/event'
import * as roleController from '../controllers/role'
import * as taskController from '../controllers/task'
import * as userController from '../controllers/user'
import * as activityController from '../controllers/activity'

const Router = express.Router()

//? ACTIVITY
Router.route('/activity')
  .get(activityController.list)
  .post(activityController.create)

//? DEPARTMENT
Router.route('/department')
  .get(departmentController.list)
  .post(departmentController.create)

//? Event
Router.route('/event')
  .get(eventController.list)
  .post(eventController.create)

//? ROLE
Router.route('/role')
  .get(roleController.list)
  .post(roleController.create)

//? TASK
Router.route('/task')
  .get(taskController.list)
  .post(taskController.create)

//? USER
Router.route('/user')
  .get(userController.list)
  .post(userController.create)

Router.route('/user/:id')
  .get(userController.find)
  .delete(userController.remove)

//? relations
Router.route('/user/:userId/role/:roleId')
  .patch(userController.setRole)

Router.route('/user/:userId/department/:departmentId')
  .post(userController.setDepartment)
  .delete(userController.unsetDepartment)

export default Router