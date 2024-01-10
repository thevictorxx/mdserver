const jwt = require('jsonwebtoken')

const isLogged = (tokenCookie) => {
  const data = {
    isLogged: false,
    userId: 0,
    access: 0
  }
  try {
    const token = jwt.verify(tokenCookie, process.env.ACCESS_TOKEN_SECRET)
    data.isLogged = true
    data.userId = token.userId
    data.access = token.access
  } catch (error) {
    data = {
      isLogged: false,
      userId: 0,
      access: 0
    }
  }
  return data
}

module.exports = isLogged
