const mongoose = require('mongoose');

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
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;