const jwt = require('jsonwebtoken')
/**
 *
 * @param {string} tokenCookie Bearer + Token
 * @returns Objeto isLogger {boolean}, userId {number}, access {number}
 */
const decodeToken = (tokenCookie) => {
  let tokenReal = tokenCookie
  let data = {
    isLogged: false,
    userId: 0,
    access: 0
  }
  if (tokenReal && tokenReal.includes('Bearer ')) {
    tokenReal = tokenReal.replace('Bearer ', '')

    try {
      const token = jwt.verify(tokenReal, process.env.ACCESS_TOKEN_SECRET)
      data.isLogged = true
      data.userId = token.credenciales.id
      data.access = token.credenciales.access
    } catch (error) {
      data = {
        isLogged: false,
        userId: 0,
        access: 0
      }
    }
  }
  return data
}

module.exports = decodeToken
