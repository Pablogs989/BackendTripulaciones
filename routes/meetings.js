const express = require('express');
const router = express.Router();
const MeetingController = require('../controllers/MeetingController');


router.post('/meeting', MeetingController.createMeeting);
router.put("/meeting",MeetingController.bookingMeeting)

module.exports = router;