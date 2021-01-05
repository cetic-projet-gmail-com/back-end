import express from 'express'

import * as eventController from '../controllers/event.js'
import * as profileController from '../controllers/profile.js'

const Router = express.Router()

//? EVENT
Router.route('/event')
  .get(eventController.list)
  .post(eventController.create)

Router.route('/event/:id')
  .get(eventController.find)

//? PROFILE
Router.route('/profile')
  .get(profileController.find)
  .patch(profileController.update)

export default Router