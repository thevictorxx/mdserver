const { Router } = require('express')

const {
  add,
  edit,
  addPost,
  editPost
} = require('../controllers/file.controller')

const adminAccess = require('../middleware/adminAccess.middleware')

const router = Router()

router.get('/edit/:pathFile', adminAccess, edit)

router.post('/edit/:pathFile', adminAccess, editPost)

router.get('/add', adminAccess, add)

router.post('/add', addPost)

module.exports = router
