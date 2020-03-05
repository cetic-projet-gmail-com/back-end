const {check} = require('express-validator');

exports.createEvent= [
    check("taskId").notEmpty(),
    check("start").isISO8601(),
    check("end").isISO8601(),
    check("description").notEmpty(),
];