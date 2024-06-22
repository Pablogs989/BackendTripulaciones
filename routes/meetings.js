const express = require('express');
const router = express.Router();
const MeetingController = require('../controllers/MeetingController');
const { authentication } = require('../middleware/authentication.js')


router.post('/',authentication, MeetingController.createMeeting);
router.put("/bookingmeeting/:_id",authentication,MeetingController.bookingMeeting)
router.put("/cancel/:_id",authentication,MeetingController.cancel)

module.exports = router;