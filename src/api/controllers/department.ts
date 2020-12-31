
import { getRepository, QueryFailedError } from 'typeorm'
import { validate } from 'class-validator'
import { invalidData, itemNotFound, dbError } from '../helpers/errors'

import { Department } from '../models/Department'

export const create = async (req, res, next) => {
  try {
    const department = Object.assign(new Department(), {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const errors = await validate(department)
    if (errors.length) {
      return invalidData({ res, errors })
    }

    const departmentCreated = await getRepository(Department).save(department)

    return res.send(departmentCreated)
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
    const departments = await getRepository(Department).find()

    return res.json({ data: departments || [] })
  } catch (error) {
    next(error)
  }
}
