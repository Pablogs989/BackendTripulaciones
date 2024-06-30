const express = require('express');
const router = express.Router();
const MeetingController = require('../controllers/MeetingController');
const { authentication } = require('../middleware/authentication.js')


router.post('/',authentication, MeetingController.createMeeting);
router.put("/bookingmeeting/:_id",authentication,MeetingController.bookingMeeting)
router.put("/cancel/:_id",authentication,MeetingController.cancel)
router.delete("/delete/:_id",authentication,MeetingController.delete)
router.get("/getall",MeetingController.getAll)
router.get("/getbyid/:_id",MeetingController.getById)
//router.get("/getbysupplierid/:supplierId",MeetingController.getBySupplierId)
module.exports = router;