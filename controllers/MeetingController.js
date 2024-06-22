const Meeting = require("../models/Meeting.js");
require("dotenv").config();

const MeetingController = {
  async createMeeting(req, res, next) {
    const { id_collab, id_user_collab, id_user, date, hour } = req.body;

    if (!id_collab || !id_user_collab || !date || !hour) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      //TODO : picking up user and company from Authentitification
      const newMeeting = await Meeting.create({...req.body})
      res.status(201).send({msg:"new meeting added",newMeeting});
    } catch (error) {
      next(error);
    }
  },
  async bookingMeeting(req, res) {
    try {
      const meeting = await Meeting.findByIdAndUpdate(
        req.params._id,
        { id_user: req.body.id_user, date: req.body.date, hour: req.body.hour },
        { new: true }
      );
      res.send({ msg: "Meeting updated successfully", meeting });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};

module.exports = MeetingController;
