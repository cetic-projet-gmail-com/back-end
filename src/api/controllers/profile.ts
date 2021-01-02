import { getRepository } from 'typeorm'

import User from '../models/User'

export const find = async (req, res, next) => {
  try {
    const { id } = req.token
    const item = await getRepository(User).findOneOrFail(id)

    return res.send(item)
  } catch (error) {
    next(error)
  }
}

export const update = (req, res, next) => {
  try {
    const { id } = req.token

  } catch (error) {
    next(error)
  }
}