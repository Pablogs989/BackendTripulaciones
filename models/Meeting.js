const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema(
  {
    id_collab: {
      type: { type: ObjectId, ref: "supliers" },
      //required: [true, "Meeting can only be creted by colaborator, please add colaborator company"],
    },
    id_user_collab: {
      type: { type: ObjectId, ref: "users" },
      //required: [true, "Meeting can only be creted by colaborator user, pleasea dd teh colaborator user"],
    },
    id_user: {
      type: { type: ObjectId, ref: "users" },
    },
    date: {
      type: Date,
      required: [true, "Please fill in the date field"],
    },
    hour: {
      type: String,
      required: [true, "Please fill in the hour field"],
      validate: {
        validator: function (v) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid hour format! Use HH:MM format.`,
      },
    },
  },
  { timestamps: true }
);

const Meeting = mongoose.model("Meeting", MeetingSchema);

module.exports = Meeting;
