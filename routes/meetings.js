const express = require('express');
const router = express.Router();
const MeetingController = require('../controllers/MeetingController');


router.post('/', MeetingController.createMeeting);
router.put("/id/:_id",MeetingController.bookingMeeting)

module.exports = router;