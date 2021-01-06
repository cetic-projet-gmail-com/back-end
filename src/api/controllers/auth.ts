import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'
import jwt from 'jsonwebtoken'

import User from '../models/User'

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, login } = req.body

    const user = await getRepository(User).findOne({ login })

    if (user?.checkPassword(password)) {
      const token = jwt.sign(
        {
          user: user.id,
          role: user.role.id
        },
        process.env.JWT_SECRET,
        // { expiresIn: "1h" }
      )
      return res.send({ [process.env.JWT_NAME]: token })
    }
    return res.status(401).send()

  } catch (error) {
    next(error)
  }
}

export const register = (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (error) {
    next(error)
  }
}