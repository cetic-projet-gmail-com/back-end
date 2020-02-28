const {check} = require('express-validator');

exports.createEvent= [
    check("tasks_id").notEmpty(),
    check("start").isISO8601(),
    check("end").isISO8601(),
    check("description").notEmpty(),
];