import { Request, Response, NextFunction } from 'express'
import { validate } from 'class-validator'
import { getConnection, getRepository, QueryFailedError } from 'typeorm'

import { invalidData, itemNotFound, dbError } from '../helpers/errors'

import Activity from '../models/Activity'
import Task from '../models/Task'

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = Object.assign(new Task(), {
      ...req.body,
      activity: await getRepository(Activity).findOneOrFail(req.body.activityId)
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

export const find = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const item = await getRepository(Task).findOneOrFail(id)

    return res.send(item)
  } catch (error) {
    next(error)
  }
}

export const list = async (req: Request, res: Response, next: NextFunction)  => {
  try {
    const items = await getRepository(Task).find()

    return res.json({ data: items || [] })
  } catch (error) {
    next(error)
  }
}
