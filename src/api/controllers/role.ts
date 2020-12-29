import { getRepository, QueryFailedError } from 'typeorm'
import { validate } from 'class-validator'

import { Role } from '../models/Role'
import { invalidData, itemNotFound, dbError } from '../helpers/errors'

export const create = async (req, res, next) => {
  try {
    const role = Object.assign(new Role(), req.body)

    const errors = await validate(role)
    if (errors.length) {
      return invalidData({ res, errors })
    }

    const roleCreated = await getRepository(Role).save(role)

    return res.send(roleCreated)
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
    const roles = await getRepository(Role).find()

    return res.json({ data: roles || [] })
  } catch (error) {
    next(error)
  }
}
