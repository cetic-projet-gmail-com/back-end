import { validate } from 'class-validator'
import { getConnection, getRepository, QueryFailedError, createQueryBuilder } from 'typeorm'

import { invalidData, itemNotFound, dbError } from '../helpers/errors'

import Activity from '../models/Activity'
import Event from '../models/Event'
import Task from '../models/Task'
import User from '../models/User'

export const create = async (req, res, next) => {
  try {
    const { id } = req.token

    const item = Object.assign(new Event(), {
      ...req.body,
      task: await getRepository(Task).findOneOrFail(req.body.activityId),
      user: await getRepository(User).findOneOrFail(id)
    })

    const errors = await validate(item)
    if (errors.length) {
      return invalidData({ res, errors })
    }

    const itemCreated = await getRepository(Event).save(item)

    return res.send(itemCreated)
  } catch (error) {
    if (error instanceof QueryFailedError) {
      return dbError({ res, error })
    } else {
      next(error)
    }
  }
}

export const find = async (req, res, next) => {
  try {
    const { id } = req.params

    const item = await getRepository(Event).findOneOrFail(id, {
      relations: ['task'],
    })

    return res.send(item)
  } catch (error) {
    next(error)
  }
}

export const list = async (req, res, next)  => {
  try {
    const items = await getRepository(Event).find({ relations: ['task', 'task.activity'] })

    return res.json({ data: items || [] })
  } catch (error) {
    next(error)
  }
}
