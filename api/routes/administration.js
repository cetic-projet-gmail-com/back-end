const express = require('express')
const check = require('express-validator')
const Router = express.Router();
const UserController = require(`${process.cwd()}/api/controllers/user`)
const DepartmentController = require(`${process.cwd()}/api/controllers/department`)
const ActivityController = require(`${process.cwd()}/api/controllers/activity`)
const TaskController = require(`${process.cwd()}/api/controllers/task`)
const RoleController = require(`${process.cwd()}/api/controllers/role`)
const ATypeController = require(`${process.cwd()}/api/controllers/aType`)
const EventController = require(`${process.cwd()}/api/controllers/event`)
const ActivitiesAssignmentController = require(`${process.cwd()}/api/controllers/activitiesAssignment`)
const TasksAssignmentController = require(`${process.cwd()}/api/controllers/tasksAssignment`)


//      Department      //

//check section//

Router.route('/departments')
    .get(DepartmentController.find)
    .post(DepartmentController.create)

Router.route('/departments/:id')
    .get(DepartmentController.findById)
    .patch(DepartmentController.update)
// .delete(DepartmentController.delete)

//      Activity      //

//check section//

Router.route('/activities')
    .get(ActivityController.find)
    .post(ActivityController.create)

Router.route('/activities/:id')
    .get(ActivityController.findById)
    .patch(ActivityController.update)
//     .delete(ActivityController.delete)

//      User      //

//check section//

Router.route('/users')
    .get(UserController.find)
    .post(UserController.create)

Router.route('/users/:id')
    .get(UserController.findById)
    .patch(UserController.update)
//     .delete(UserController.delete)

//      Task      //

//check section//

Router.route('/tasks')
    .get(TaskController.find)
    .post(TaskController.create)

Router.route('/tasks/:id')
    .get(TaskController.findById)
    .patch(TaskController.update)
//     .delete(TaskController.delete)

//      Role      //

//check section//

Router.route('/roles')
    .get(RoleController.find)

Router.route('/roles/:id')
    .get(RoleController.findById)

//      AType      //

//check section//

Router.route('/atypes')
    .get(ATypeController.find)

Router.route('/atypes/:id')
    .get(ATypeController.findById)

//      Event      //

//check section//

Router.route('/events')
    .get(EventController.find)
    .post(EventController.create)

Router.route('/events/:id')
    .get(ATypeController.findById)

//      TasksAssignment      //

//      check section       //

Router.route('/tasksassignments')
    .get(EventController.find)
    .post(EventController.create)

Router.route('/tasksassignments/:id')
    .get(ATypeController.findById)

//      ActivitiesAssignment      //

//      check section       //

Router.route('/activitiesassignments')
    .get(ActivitiesAssignmentController.findByUserId)
    .post(ActivitiesAssignmentController.create)

Router.route('/activitiesassignments/:userId/:activityId')
    .get(ActivitiesAssignmentController.findOne)
    .delete(ActivitiesAssignmentController.delete)

//      TasksAssignment      //

//      check section       //

Router.route('/activitiesassignments')
    .get(TasksAssignmentController.findByUserId)
    .post(TasksAssignmentController.create)

Router.route('/activitiesassignments/:userId/:activityId')
    .get(TasksAssignmentController.findOne)
    .delete(TasksAssignmentController.delete)


module.exports = Router;