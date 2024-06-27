const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    surname: {
        type: String,
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
    confirmed: {
        type: Boolean,
        default: false,
    },
    phone_prefx: {
        type: String,
    },
    phone_number: {
        type: String,
    },
    address: {
        type: String,
    },
    zip_code: {
        type: Number,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    user_type: {
        type: String,
        required: [true, "Please fill in the user type field"],
        default: "assitant"
    },
    url_linkedin: {
        type: String,
    },
    company: {
        type: String,
    },
    id_supplier: {
        type: ObjectId,
        ref: 'Supplier'
    },
    job_title: {
        type: [{
            type: String,
            enum: [
                "Desarrollador de Contenidos",
                "Instructor / Formador",
                "Coordinador de Cursos",
                "Administrador de Plataforma",
                "Especialista en Evaluación",
                "Diseñador Instruccional",
                "Director de Formación",
                "Consultor de E-learning",
                "Gestor de Proyectos",
                "Desarrollador de E-learning",
                "Investigador en E-learning",
                "Especialista en Soporte Técnico",
                "Gestor de Comunidad",
                "Responsable de Calidad",
                "Director de Tecnología",
                "Analista de Datos Educativos",
                "Especialista en Marketing de E-learning",
                "Facilitador de Talleres",
                "Asesor Pedagógico",
                "Director de Innovación",
            ]
        }],
    },
    allergies: {
        type: [{
            type: String,
            enum: [
                "Gluten",
                "Lácteos",
                "Huevos",
                "Frutos secos",
                "Cacahuetes",
                "Mariscos",
                "Pescado",
                "Soja",
                "Sésamo",
                "Mostaza",
                "Apio",
                "Sulfitos",
                "Altramuz",
                "Moluscos",
                "Azucar",
                "Sal"
            ]
        }],
    },
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
    food_preferences: {
        type: [{
            type: String,
            enum: [
                "vegetariano",
                "vegano",
                "omnivore"
            ]
        }],
    },
    eventsId: {
        type: ObjectId,
        ref: 'Event'
    },
    completed: {
        type: Boolean,
        default: true,
    },
    speaker_events: {
        type: [{
            type: ObjectId,
            ref: 'Event'
        }]
    },
    ids_meetings: [{
        type: ObjectId,
        ref: 'Meeting'
    }],
    ids_meetings_atendee: [{
        type: ObjectId,
        ref: 'Meeting'
    }],
    avatar_url:{type:String}
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;