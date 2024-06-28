const express = require('express')
const EventController = require('../controllers/EventController.js')
const router = express.Router()
const { authentication, isAdmin } = require('../middleware/authentication')
const {imageLoad} =require('../middleware/multer.js')

router.post('/', authentication, imageLoad,EventController.create)
router.get('/', EventController.getAll)
router.put('/id/:id', authentication, isAdmin, EventController.update)
router.delete('/id/:id', authentication, isAdmin, EventController.delete)
router.get('/id/:id', EventController.getEventById)
router.put('/cancel/id/:id', authentication, isAdmin, EventController.cancelEvent)
router.get('/getbydate', EventController.getEventByDate)
router.put('/adduser/id/:id', authentication, EventController.addUser)
router.put('/removeuser/id/:id', authentication, EventController.removeUser)
router.put('/score/:id',authentication,EventController.sccore)

module.exports = router