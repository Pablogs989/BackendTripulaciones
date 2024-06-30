const express = require('express')
const PlaceController = require('../controllers/PlaceController.js')
const router = express.Router()
const { authentication, isAdmin } = require('../middleware/authentication.js')
const {imageLoad} =require('../middleware/multer.js')

router.post('/',authentication, isAdmin,imageLoad,PlaceController.create)
router.get('/', PlaceController.getAll)
router.put('/id/:id',authentication, isAdmin, PlaceController.update)
router.delete('/id/:id',authentication, isAdmin, PlaceController.delete)
router.get('/id/:id', PlaceController.getPlaceById)
router.put('/addevent/id/:id',authentication, isAdmin, PlaceController.addEvent)
router.put('/removeevent/id/:id',authentication, isAdmin, PlaceController.removeEvent)

module.exports = router