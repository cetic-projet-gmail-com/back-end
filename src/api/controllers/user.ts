import { getRepository, QueryFailedError } from 'typeorm'
import { validate } from 'class-validator'

import { User } from '../models/User'
import { invalidData, itemNotFound, dbError } from '../helpers/errors'

export const create = async (req, res, next) => {
  try {
    const user = Object.assign(new User(), req.body)

    const errors = await validate(user)
    if (errors.length) {
      return invalidData({ res, errors })
    }

    const userCreated = await getRepository(User).save(user)

    return res.send(userCreated)
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
    const user = await getRepository(User).findOne(id)

    if (!user) {
      return itemNotFound({ res })
    }

    return res.send(user)
  } catch (error) {
    next(error)
  }
}

export const list = async (req, res, next) => {
  try {
    const users = await getRepository(User).find({ relations: ['role'] })

    return res.json({ data: users || [] })
  } catch (error) {
    next(error)
  }
}

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params

    const { affected } = await getRepository(User).delete(id)

    if (affected === 0) {
      return itemNotFound({ res })
    }

    return res.send()
  } catch (error) {
    next(error)
  }
}