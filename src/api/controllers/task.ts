import { validate } from 'class-validator'
import { getConnection, getRepository, QueryFailedError } from 'typeorm'
import { invalidData, itemNotFound, dbError } from '../helpers/errors'
import { Activity } from '../models/Activity'
import { Task } from '../models/Task'

export const create = async (req, res, next) => {
  try {
    const item = Object.assign(new Task(), {
      ...req.body,
      activity: await getRepository(Activity).findOneOrFail(req.body.taskId)
    })

    const errors = await validate(item)
    if (errors.length) {
      return invalidData({ res, errors })
    }

    const itemCreated = await getRepository(Task).save(item)

    return res.send(itemCreated)
  } catch (error) {
    if (error instanceof QueryFailedError) {
      return dbError({ res, error })
    } else {
      next(error)
    }
  }
}

export const list = async (req, res, next)  => {
  try {
    const items = await getRepository(Task).find()

    return res.json({ data: items || [] })
  } catch (error) {
    next(error)
  }
}
