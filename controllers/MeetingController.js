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
  async delete(req, res) {
    try {
      let meeting= await Meeting.findById(req.params._id)
      console.log('meeting user id : ', meeting.id_user_suplier)
      console.log('req.params._id : ', req.user._id )
      console.log('meeting.id_user_suplier.equals(req.user._id: ', )
      if(req.user._id.equals(meeting.id_user_suplier)){
        meeting = await Meeting.findByIdAndDelete(req.params._id);
        res.send({ msg: "Meeting deleted", meeting });
      }else {
        res.status(500).send({ msg: "Only the user which creted the meeting can delete it" });  
      }

    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "There was a problem trying to remove the Meeting" });
    }
  },
  async getAll(req, res) {
    try {
        const { page = 1, limit = 20 } = req.query;
        const meeting = await Meeting.find()
            .limit(limit)
            .skip((page - 1) * limit);
        res.status(200).send(meeting);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            msg: "There was an issue finding the meetings",
        });
    }
},
};

module.exports = MeetingController;
