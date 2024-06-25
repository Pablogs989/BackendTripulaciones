const Meeting = require("../models/Meeting.js");
const Supplier = require("../models/Supplier.js");
const User = require("../models/User.js");
const mongoose = require('mongoose');
require("dotenv").config();

const MeetingController = {
  async createMeeting(req, res, next) {
    try {
      const newMeeting = await Meeting.create({
        ...req.body,
        id_user_supplier: req.user._id,
        id_supplier: req.user.id_supplier

      })
      await User.findByIdAndUpdate(req.user._id, { $push: { ids_meetings: newMeeting._id } });
      await Supplier.findByIdAndUpdate(req.user.id_supplier,{$push:{ids_meetings:newMeeting._id}})
      res.status(201).send({ msg: "new meeting added", newMeeting })
    } catch (error) {
      res.status(500).send({ msg: "Meeting error ", error })
    }
  },
  async bookingMeeting(req, res) {
    try {
      const meeting = await Meeting.findByIdAndUpdate(
        req.params._id,
        { id_user: req.user._id },
        { new: true }
      );
      res.send({ msg: req.user.name + " your meeting was booked suxcesfully", meeting })
      //add meeting ID to user
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async cancel(req, res) {
    try {
      const meeting = await Meeting.findByIdAndUpdate(
        req.params._id,
        { cancel: true },
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
      let meeting = await Meeting.findById(req.params._id)
      if (req.user._id.equals(meeting.id_user_supplier)) {
        meeting = await Meeting.findByIdAndDelete(req.params._id);
        res.send({ msg: "Meeting deleted", meeting });
      } else {
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
      const meetings = await Meeting.find()
        .limit(limit)
        .skip((page - 1) * limit);
      res.status(200).send({msg:"meetings found : ",meetings});
    } catch (error) {
      console.error(error);
      res.status(500).send({
        msg: "There was an issue finding the meetings",
      });
    }
  },
  async getById(req,res){
    try{
      const meeting= await Meeting.findById(req.params._id)
      res.status(200).send({msg:"meeting found : ", meeting})
    }catch(error){
      console.error(error);
      res.status(500).send({
        msg: "Meeting not found",
      });
    }

  },
  //  async getBySupplierId(req,res){
  //    try{
  //      const meetings = await Meeting.find({id_supplier:ObjectId(req.params.supplierId)})
  //      res.status(200).send({msg:"meetings found : ",meetings});
  //    }catch(error){
  //      console.error(error);
  //      res.status(500).send({
  //        msg: "There was an issue finding the meetings",
  //      });
  //    }
  //  }
};

module.exports = MeetingController;
