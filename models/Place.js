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
    }]
}, { timestamps: true });

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;
