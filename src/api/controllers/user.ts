import { createQueryBuilder, getRepository, QueryFailedError } from 'typeorm'
import { validate } from 'class-validator'

import { Department } from '../models/Department'
import { User } from '../models/User'
import { Role } from '../models/Role'
import { invalidData, itemNotFound, dbError } from '../helpers/errors'

//? Set role 'USER' by default
export const create = async (req, res, next) => {
  try {
    const user = Object.assign(new User(), {
      ...req.body,
      role: await getRepository(Role).findOne(1),
      createdAt: new Date(),
      updatedAt: new Date(),
    })


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
    const users = await getRepository(User).find()

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

export const setRole = async (req, res, next) => {
  try {
    const { userId, roleId } = req.params

    const userRepository = await getRepository(User)
    const role = await getRepository(Role).findOne({ id: roleId })

    const { affected } = await userRepository.update(userId, { role })

    if (!role || affected === 0) {
      return itemNotFound({ res })
    }
    const user = await userRepository.findOne({ id: userId}, { relations: ['role']})
    return res.send(user)
  } catch (error) {
    next(error)
  }
}

export const setDepartment = async (req, res, next) => {
  try {
    const { userId, departmentId } = req.params

    const userRepository = await getRepository(User)
    const department = await getRepository(Department).findOne({ id: departmentId })
    const user = await userRepository.findOne({ id: userId })

    if (!department || !user) {
      return itemNotFound({ res })
    }

    await userRepository
      .createQueryBuilder()
      .relation(Department, 'users')
      .of(department)
      .add(user)

    return res.send(user)
  } catch (error) {
    next(error)
  }
}
