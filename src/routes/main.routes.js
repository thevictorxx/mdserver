const {Router} = require('express')
const index = require('../controllers/main.controller')

const router = Router();

router.get('/', index);

module.exports = router;