const express = require('express')
const check = require('express-validator')
const Router = express.Router();
const UserController = require(`${process.cwd()}/api/controllers/user`)
const DepartmentController = require(`${process.cwd()}/api/controllers/department`)
const ActivityController = require(`${process.cwd()}/api/controllers/activity`)
const TaskController = require(`${process.cwd()}/api/controllers/task`)
const RoleController = require(`${process.cwd()}/api/controllers/role`)
const ATypeController = require(`${process.cwd()}/api/controllers/aType`)


// //      Department      //

// //check section//

Router.route('/departments')
    .get(DepartmentController.find)
//     .post(DepartmentController.create)

Router.route('/department/:id')
    .get(DepartmentController.findById)
// .patch(DepartmentController.update)
// .delete(DepartmentController.delete)

// //      Activity      //

// //check section//

Router.route('/activities')
    .get(ActivityController.find)
//     .post(ActivityController.create)

Router.route('/activity/:id')
    .get(ActivityController.findById)
//     .patch(ActivityController.update)
//     .delete(ActivityController.delete)

// //      User      //

// //check section//

Router.route('/users')
    .get(UserController.find)
//     .post(UserController.create)

Router.route('/user/:id')
    .get(UserController.findById)
//     .patch(UserController.update)
//     .delete(UserController.delete)

// //      Task      //

// //check section//

Router.route('/tasks')
    .get(TaskController.find)
//     .post(TaskController.create)

Router.route('/task/:id')
    .get(TaskController.findById)
//     .patch(TaskController.update)
//     .delete(TaskController.delete)

// //      Role      //

// //check section//

Router.route('/roles')
    .get(RoleController.find)

Router.route('/role/:id')
    .get(RoleController.findById)

    // //      AType      //

// //check section//

Router.route('/atypes')
.get(ATypeController.find)

Router.route('/atype/:id')
.get(ATypeController.findById)

module.exports = Router;