const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please fill in the name field"],
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Invalid email"],
        required: [true, "Please fill in the email field"],
    },
    password: {
        type: String,
        required: [true, "Please fill in the password field"],
    },
    tokens: [],
    confirmed: { type: Boolean }
    
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;