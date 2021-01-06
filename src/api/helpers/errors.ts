
import { Response } from 'express'
import { ValidationError } from 'class-validator'

//? 422: Unprocessable Entity
export function invalidData({ res, errors } : { res: Response, errors: ValidationError[] }) {
  let resErrors = errors.map(({ value, property, children, constraints}) => ({ value, property, children, constraints }))

  return res.status(422).json(resErrors)
}

export function dbError({ res, error } : { res: Response, error}) {
  let resErrors = [{ constraints: error.detail }]

  return res.status(422).json(resErrors)
}

export function itemNotFound({ res } : { res: Response}) {
  return res.status(404).send()
}