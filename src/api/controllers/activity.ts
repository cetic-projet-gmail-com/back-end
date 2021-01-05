import { validate } from 'class-validator'
import { getConnection, getRepository, QueryFailedError } from 'typeorm'

import { invalidData, itemNotFound, dbError } from '../helpers/errors.js'

import Activity from '../models/Activity.js'

export const create = async (req, res, next) => {
  try {
    const item = Object.assign(new Activity(), req.body)

    const errors = await validate(item)
    if (errors.length) {
      return invalidData({ res, errors })
    }

    const itemCreated = await getRepository(Activity).save(item)

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
    const item = await getRepository(Activity).findOneOrFail(id)

    return res.send(item)
  } catch (error) {
    next(error)
  }
}

export const list = async (req, res, next)  => {
  try {
    const items = await getRepository(Activity).find({ relations: ['tasks'] })

    return res.json({ data: items || [] })
  } catch (error) {
    next(error)
  }
}
