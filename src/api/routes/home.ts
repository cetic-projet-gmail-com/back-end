import express from 'express'

import * as profileController from '../controllers/profile'

const Router = express.Router()

Router.route('/profile')
  .get(profileController.find)
  .patch(profileController.update)

export default Router