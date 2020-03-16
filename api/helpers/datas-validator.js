const {check} = require('express-validator');

//* -- Events --
exports.createEvent= [
    check("taskId").notEmpty(),
    check("startAt").isISO8601(),
    check("endAt").isISO8601(),
    check("description").notEmpty(),
];
exports.updateEvent = [
    check("startAt").isISO8601(),
    check("endAt").isISO8601()
];

//* -- Users --

exports.createUser = [
    check("email").isEmail(),
    check("firstName").notEmpty(),
    check("lastName").notEmpty(),
    check("login").notEmpty(),
    // check("roleId").notEmpty(),
    // check("departementId").notEmpty(),
    check("password").notEmpty()
];

exports.updateUser = [
    check("email").isEmail() || check("email").isEmpty(),
    // check("firstName").notEmpty() || ,
    // check("lastName").notEmpty(),
    // check("login").notEmpty(),
    // check("roleId").notEmpty(),
    // check("departementId").notEmpty(),
    // check("password").notEmpty()
];

//* Activities

const createActivity = [
    check("name").notEmpty(),
    check("description").notEmpty(),
    check("colourId").notEmpty(),
    check("aTypeId").notEmpty(),
];
//* Tasks
const createTask = [
    check("name").notEmpty(),
    check("description").notEmpty(),
    check("activityId").notEmpty(),
];
//* Departments
const validPostDepartement = [
    check("name").notEmpty(),
    check("responsibleId").notEmpty()
];