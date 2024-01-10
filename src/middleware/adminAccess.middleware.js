const jwt = require('jsonwebtoken')

const adminAccess = (req, res, next) => {
  const { access_token } = req.cookies
  if (!access_token) {
    return res.status(401).redirect('/')
  }
  const tokenCookie = access_token.split(' ')[1]
  let token = {}

  try {
    token = jwt.verify(tokenCookie, process.env.ACCESS_TOKEN_SECRET)
  } catch (error) {
    return res.status(401).redirect('/')
  }

  if (!token.credenciales || token.credenciales.access !== 1) {
    return res.status(401).redirect('/')
  }

  next()
}

module.exports = adminAccess
