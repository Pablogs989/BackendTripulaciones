const mongoose = require('mongoose');

const SuplierSchema = new mongoose.Schema({
    cif: {
        type: String,
        required: [true, "Please fill in the CIF field"],
    },
    company_name: {
        type: String,
        required: [true, "Please fill in the name field"],
    },
    password: {
        type: String,
        required: [true, "Please fill in the password field"],
    },
    address_contact: {
        type: String,
        required: [true, "Please fill in the address field"],
    },
    country: {
        type: String,
        required: [true, "Please fill in the country field"],
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Invalid email"],
        required: [true, "Please fill in the email field"],
    },
    phone_prefx: {
        type: Number,
        required: [true, "Please fill in the phone prefix field"],
    },
    phone_number: {
        type: Number,
        required: [true, "Please fill in the phone number field"],
    },
    type_collab: {
        type: String,
        required: [true, "Please fill in the type of collaboration field"],
        enum: ["Platinum", "Gold", "Silver"]
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
    employes: {
        type: Number,
        required: [true, "Please fill in the employes field"],
    },
    tokens: [],    
}, { timestamps: true });

const Suplier = mongoose.model('Suplier', SuplierSchema);

module.exports = Suplier;