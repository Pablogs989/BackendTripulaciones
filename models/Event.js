const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const EventSchema = new mongoose.Schema({
    speaker: {
        type: ObjectId,
        ref: 'User',    
        required: [true, "Please fill in the speaker field"],
    },
    desc_event: {
        type: String,
        required: [true, "Please fill in the description field"],
    },
    id_place: {
        type: ObjectId,
        ref: 'Place',
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
    id_users: [{
        type: ObjectId,
        ref: 'User'
    }],
    interests: {
        type: [{
            type: String,
            enum: [
                "Tecnología",
                "Gestión de Proyectos",
                "Agile",
                "Softskills",
                "Marketing Digital",
                "Negocios",
                "Emprendimiento",
                "Educación",
                "Formación",
                "Salud y Bienestar",
                "Creatividad",
                "Diseño"
            ]
        }],
    },
    cancelled: {
        type: Boolean,
        default: false,
    },
    company: {
        type: String,
    },
    id_supplier: {
        type: ObjectId,
        ref: 'Supplier',
    },
    confirmed:{type:Boolean},
    score_array:{type:[Number]},
    score_avg:{type:Number}
}, { timestamps: true });

EventSchema.methods.toJSON = function () {
    const user = this._doc;
    delete user.__v;
    return user;
};

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;