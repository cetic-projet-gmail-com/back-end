import { validate } from 'class-validator'
import { getConnection, getRepository, QueryFailedError } from 'typeorm'
import { invalidData, itemNotFound, dbError } from '../helpers/errors'
import { Activity } from '../models/Activity'

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

export const list = async (req, res, next)  => {
  try {
    const items = await getRepository(Activity).find()

    return res.json({ data: items || [] })
  } catch (error) {
    next(error)
  }
}
