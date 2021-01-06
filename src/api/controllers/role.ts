import { Request, Response, NextFunction } from 'express'
import { getRepository, QueryFailedError } from 'typeorm'
import { validate } from 'class-validator'

import { invalidData, itemNotFound, dbError } from '../helpers/errors'

import Role from '../models/Role'

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = Object.assign(new Role(), req.body)

    const errors = await validate(item)
    if (errors.length) {
      return invalidData({ res, errors })
    }

    const itemCreated = await getRepository(Role).save(item)

    return res.send(itemCreated)
  } catch (error) {
    if (error instanceof QueryFailedError) {
      return dbError({ res, error })
    } else {
      next(error)
    }
  }
}

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await getRepository(Role).find()

    return res.json({ data: items || [] })
  } catch (error) {
    next(error)
  }
}
