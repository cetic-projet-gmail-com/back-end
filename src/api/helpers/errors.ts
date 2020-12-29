
//? 422: Unprocessable Entity
export function invalidData({ res, errors }) {
  let resErrors = errors.map(({ value, property, children, constraints}) => ({ value, property, children, constraints }))

  return res.status(422).json(resErrors)
}

export function dbError({ res, error }) {
  let resErrors = [{ constraints: error.detail }]

  return res.status(422).json(resErrors)
}

export function itemNotFound({ res }) {
  return res.status(404).send()
}