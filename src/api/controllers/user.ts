import { getRepository } from 'typeorm'
import { User } from '../models/User'
import { validate } from "class-validator";

export const create = async (req, res, next) => {
  try {
    const user = Object.assign(new User(), req.body)

    const errors = await validate(user)
    if (errors.length) {
      return next(errors)
    }

    const userCreated = await getRepository(
      User
    ).save(user)

    return res.send(userCreated)
  } catch (error) {
    next(error)
  }
}

export const find = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await getRepository(User).findOne(id)

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