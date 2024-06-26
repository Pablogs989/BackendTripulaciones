const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PlaceSchema = new mongoose.Schema({
    place_name: {
        type: String,
        required: [true, "Please fill in the place name field"],
    },
    capacity: {
        type: Number,
        required: [true, "Please fill in the capacity field"],
    },
    events: [{
        type: ObjectId,
        ref: 'Event'
    }],
    avatar_url:{type:String}
}, { timestamps: true });

PlaceSchema.methods.toJSON = function () {
    const user = this._doc;
    delete user.__v;
    return user;
};

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;
