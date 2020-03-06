const express= require('express');

const Router = express.Router();

let routeControllers = process.cwd() + '/api/controllers/';
const homeController = require(routeControllers + 'home');
const profileController = require(routeControllers + 'profile')
const validator = require(process.cwd() + '/api/helpers/datas-validator');
// find/create/update/delete
//! Use helpers validator for PATCH
Router.route('/home/:id')
    .patch(homeController.updateEvent)
    .delete(homeController.deleteEvent)
;
Router.route('/home')
    .get(homeController.find)
    .post(validator.createEvent, homeController.createEvent)
;
Router.route('/profile')
    .get(profileController.find)
    .patch(profileController.updateProfile)
;
Router.use('/', (req, res) => {
    res.status(404).json({errors: "404 not found"})
});

module.exports = Router;