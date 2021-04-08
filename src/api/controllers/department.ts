
import { getRepository, QueryFailedError } from 'typeorm'
import { validate } from 'class-validator'

import { invalidData, itemNotFound, dbError } from '../helpers/errors'

import Department from '../models/Department'

export const create = async (req, res, next) => {
  try {
    const item = Object.assign(new Department(), {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const errors = await validate(item)
    if (errors.length) {
      return invalidData({ res, errors })
    }

    const itemCreated = await getRepository(Department).save(item)

    return res.send(itemCreated)
  } catch (error) {
    if (error instanceof QueryFailedError) {
      return dbError({ res, error })
    } else {
      next(error)
    }
  }
}

export const list = async (req, res, next) => {
  try {
    const items = await getRepository(Department).find()

    return res.json({ data: items || [] })
  } catch (error) {
    next(error)
  }
}
