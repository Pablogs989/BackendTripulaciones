const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    speaker_name: {
        type: String,
        required: [true, "Please fill in the name field"],
    },
    desc_event: {
        type: String,
        match: [/.+\@.+\..+/, "Invalid email"],
        required: [true, "Please fill in the email field"],
    },
    id_place: {
        type: String,
        required: [true, "Please fill in the password field"],
    },
    date: {
        type: String,
        required: [true, "Please fill in the password field"],
    },
    hour: {
        type: String,
        required: [true, "Please fill in the password field"],
    },
    id_users: {
        type: String,
        required: [true, "Please fill in the password field"],
    },
    
}, { timestamps: true });

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;