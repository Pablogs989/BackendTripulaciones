const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please fill in the name field"],
    },
    surname: {
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
    confirmed: { type: Boolean },
    phone_prefx: {
        type: String,
        required: [true, "Please fill in the phone prefix field"],
    },
    phone_number: {
        type: String,
        required: [true, "Please fill in the phone number field"],
    },
    address: {
        type: String,
        required: [true, "Please fill in the address field"],
    },
    zip_code: {
        type: Number,
        required: [true, "Please fill in the zip code field"],
    },
    city: {
        type: String,
        required: [true, "Please fill in the city field"],
    },
    country: {
        type: String,
        required: [true, "Please fill in the country field"],
    },
    user_type: {
        type: String,
        required: [true, "Please fill in the user type field"],
        default: "assitant"
    },
    url_linkedin: {
        type: String,
        required: [true, "Please fill in the linkedin field"],
    },
    company: {
        type: String,
        required: [true, "Please fill in the company field"],
    },
    suplier: {
        type: ObjectId,
        ref: 'Suplier'
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
        required: [true, "Please fill in the job title field"],

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
    meetingsId: {
        type: ObjectId,
        ref: 'Event'
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;