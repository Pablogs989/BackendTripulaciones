const express = require('express')
const SuplierController = require('../controllers/SuplierController.js')
const router = express.Router()
const { authentication } = require('../middleware/authentication.js')

router.post('/', SuplierController.register)
router.post('/login', SuplierController.login)
router.delete('/logout', authentication, SuplierController.logout)

module.exports = router