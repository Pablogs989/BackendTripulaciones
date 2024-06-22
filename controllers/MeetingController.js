const Meeting = require("../models/Meeting.js");
require("dotenv").config();

const MeetingController = {
  async createMeeting(req, res, next) {
    try {
      //TODO : picking up user and company from Authentitification
      const newMeeting = await Meeting.create({
          ...req.body,
          id_user_suplier:req.user._id,
          id_suplier:req.user.suplier

        })
      res.status(201).send({msg:"new meeting added",newMeeting});
    } catch (error) {
      next(error);
    }
  },
  async bookingMeeting(req, res) {
    try {
      const meeting = await Meeting.findByIdAndUpdate(
        req.params._id,
        { id_user: req.user._id},
        { new: true }
      );
      res.send({ msg: req.user.name+" your meeting was booked suxcesfully", meeting })
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async cancel(req, res) {
    try {
      const meeting = await Meeting.findByIdAndUpdate(
        req.params._id,
        { cancel: true},
        { new: true }
      );
      res.send({ msg: "Your meeting was cancel", meeting })
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};

module.exports = MeetingController;
