import jwt from 'jsonwebtoken'

export const checkToken = async (req, res, next) => {
  try {
    let token = req.headers?.authorization.split(' ')[1]

    if (!token) throw new Error()

    let payload = await jwt.verify(
      token,
      process.env.JWT_SECRET,
    )

    req.token = payload

    next()
  } catch (error) {
    return res.status(401).send()
  }
}

export const canAccessAdmin = (req, res, next) => {
  if (req.token.role < 2) return res.status(401).send()

  next()
}
