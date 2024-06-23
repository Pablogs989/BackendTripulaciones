const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const EventSchema = new mongoose.Schema({
    speaker_name: {
        type: String,
        required: [true, "Please fill in the name field"],
    },
    desc_event: {
        type: String,
        required: [true, "Please fill in the description field"],
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
}, { timestamps: true });

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;