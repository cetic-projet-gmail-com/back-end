const express = require('express')
const check = require('express-validator')
const Router = express.Router();
const UserController = require(`${process.cwd()}/api/controllers/user`)
const DepartmentController = require(`${process.cwd()}/api/controllers/department`)
const ActivityController = require(`${process.cwd()}/api/controllers/activity`)
const TaskController = require(`${process.cwd()}/api/controllers/task`)
const RoleController = require(`${process.cwd()}/api/controllers/role`)
const ATypeController = require(`${process.cwd()}/api/controllers/aType`)
const ColourController = require(`${process.cwd()}/api/controllers/colour`)
const EventController = require(`${process.cwd()}/api/controllers/event`)
const ActivitiesAssignmentController = require(`${process.cwd()}/api/controllers/activitiesAssignment`)
const TasksAssignmentController = require(`${process.cwd()}/api/controllers/tasksAssignment`)


/* ------------------------------- Department ------------------------------- */

//  check section to implement

Router.route('/departments')
    .get(DepartmentController.find)
    .post(DepartmentController.create)

Router.route('/departments/:id')
    .get(DepartmentController.findById)
    .patch(DepartmentController.update)
    .delete(DepartmentController.delete)

/* -------------------------------- Activity -------------------------------- */

//  check section to implement

Router.route('/activities')
    .get(ActivityController.find)
    .post(ActivityController.create)

Router.route('/activities/:id')
    .get(ActivityController.findById)
    .patch(ActivityController.update)
    .delete(ActivityController.delete)

/* ---------------------------------- User ---------------------------------- */

//  check section to implement

Router.route('/users')
    .get(UserController.find)
    .post(UserController.create)

Router.route('/users/:id')
    .get(UserController.findById)
    .patch(UserController.update)
    .delete(UserController.delete)

/* ---------------------------------- Task ---------------------------------- */

//  check section to implement

Router.route('/tasks')
    .get(TaskController.find)
    .post(TaskController.create)

Router.route('/tasks/:id')
    .get(TaskController.findById)
    .patch(TaskController.update)
    .delete(TaskController.delete)

/* ---------------------------------- Role ---------------------------------- */

//  check section to implement

Router.route('/roles')
    .get(RoleController.find)

Router.route('/roles/:id')
    .get(RoleController.findById)

/* ---------------------------------- AType --------------------------------- */

//  check section to implement

Router.route('/atypes')
    .get(ATypeController.find)

Router.route('/atypes/:id')
    .get(ATypeController.findById)

/* ---------------------------------- Event --------------------------------- */

//  check section to implement

Router.route('/events')
    .get(EventController.find)
    .post(EventController.create)

Router.route('/events/:id')
    .get(EventController.findById)
    // .delete(EventController.delete)    handled in home controller
    // .update(EventController.update)    handled in home controller

/* -------------------------- ActivitiesAssignment -------------------------- */

//  check section to implement

Router.route('/activitiesassignments')
    // .get(ActivitiesAssignmentController.findByUserId)
    .post(ActivitiesAssignmentController.create)

Router.route('/activitiesassignments/:userId/:activityId')
    .get(ActivitiesAssignmentController.findOne)
    .delete(ActivitiesAssignmentController.delete)

/* ----------------------------- TasksAssignment ---------------------------- */

//  check section to implement

Router.route('/tasksassignments/:id')
    .get(TasksAssignmentController.findByUserId)
    .post(TasksAssignmentController.create)

Router.route('/tasksassignments/:userId/:activityId')
    .get(TasksAssignmentController.findOne)
    .delete(TasksAssignmentController.delete)

/* --------------------------------- Colour --------------------------------- */

//  check section to implement

Router.route('/colours')
    .get(ColourController.find)

Router.route('/atypes/:id')
    .get(ColourController.findById)


module.exports = Router;