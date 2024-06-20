const express = require('express')
const UserController = require('../controllers/UserController.js')
const router = express.Router()
const { authentication } = require('../middleware/authentication.js')

router.post('/', UserController.register)
router.post('/login', UserController.login)
router.delete('/logout', authentication, UserController.logout)

module.exports = router