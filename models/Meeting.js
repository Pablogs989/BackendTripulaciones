const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema(
  {
    id_supplier: {
      type: ObjectId,
      ref: 'Supplier',
      required: [true, "Meeting can only be creted by colaborator/supplier, please add colaborator company"]
    },
    id_user_supplier: {
      type: ObjectId,
      ref: 'User',
      required: [true, "Meeting can only be creted by colaborator/supplier user, pleasea dd teh colaborator user"]
    },
    id_user: {
      type: ObjectId,
      ref: 'User'
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
    cancel:{ 
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);
MeetingSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.__v;
return user;
  };
const Meeting = mongoose.model("Meeting", MeetingSchema);

module.exports = Meeting;
