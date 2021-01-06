import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'

import User from '../models/User'

export const find = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.token
    const item = await getRepository(User).findOneOrFail(id)

    return res.send(item)
  } catch (error) {
    next(error)
  }
}

export const update = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.token

  } catch (error) {
    next(error)
  }
}