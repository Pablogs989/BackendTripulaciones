const express = require('express')
const EventController = require('../controllers/EventController.js')
const router = express.Router()

router.post('/', EventController.create)

module.exports = router