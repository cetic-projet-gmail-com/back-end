import { getConnection, getRepository, QueryFailedError } from 'typeorm'
import { validate } from 'class-validator'

import { Department } from '../models/Department'
import { User } from '../models/User'
import { Role } from '../models/Role'
import { invalidData, itemNotFound, dbError } from '../helpers/errors'

//? Set role 'USER' by default
export const create = async (req, res, next) => {
  try {
    const item = Object.assign(new User(), {
      ...req.body,
      role: await getRepository(Role).findOne(1),
    })

    const errors = await validate(item)
    if (errors.length) return invalidData({ res, errors })

    const itemCreated = await getRepository(User).save(item)

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
    const item = await getRepository(User).findOneOrFail(id)

    return res.send(item)
  } catch (error) {
    next(error)
  }
}

export const list = async (req, res, next) => {
  try {
    const items = await getRepository(User).find()

    return res.json({ data: items || [] })
  } catch (error) {
    next(error)
  }
}

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params

    const { affected } = await getRepository(User).delete(id)

    if (affected === 0) return itemNotFound({ res })

    return res.send()
  } catch (error) {
    next(error)
  }
}

export const setRole = async (req, res, next) => {
  try {
    const { userId, roleId } = req.params

    const userRepository = await getRepository(User)
    const role = await getRepository(Role).findOneOrFail({ id: roleId })

    const { affected } = await userRepository.update(userId, { role })

    if (affected === 0) return itemNotFound({ res })

    const user = await userRepository.findOne({ id: userId}, { relations: ['role']})
    return res.send(user)
  } catch (error) {
    next(error)
  }
}

export const setDepartment = async (req, res, next) => {
  try {
    const { userId, departmentId } = req.params

    const department = await getRepository(Department).findOneOrFail({ id: departmentId })
    const user = await getRepository(User).findOneOrFail({ id: userId })

    await getConnection()
      .createQueryBuilder()
      .relation(Department, 'users')
      .of(department)
      .add(user)

    return res.send(user)
  } catch (error) {
    if (error instanceof QueryFailedError) {
      return dbError({ res, error })
    } else {
      next(error)
    }
  }
}

export const unsetDepartment = async (req, res, next) => {
  try {
    const { userId, departmentId } = req.params

    const department = await getRepository(Department).findOneOrFail({ id: departmentId })
    const user = await getRepository(User).findOneOrFail({ id: userId })

    await getConnection()
      .createQueryBuilder()
      .relation(Department, 'users')
      .of(department)
      .remove(user)

    return res.send(user)
  } catch (error) {
    next(error)
  }
}
