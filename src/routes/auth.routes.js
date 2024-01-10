const { Router } = require('express')

const {
  signin,
  signup,
  signupController,
  signinController,
  logout
} = require('../controllers/auth.controller')

const router = Router()

router.get('/signin', signin)

router.post('/signin', signinController)

router.get('/signup', signup)

router.post('/signup', signupController)

router.get('/logout', logout)

module.exports = router
