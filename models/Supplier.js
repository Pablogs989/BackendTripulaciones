const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
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
    ids_user_supplier:[{ type: ObjectId, ref: 'User' }],
    ids_meetings:[{ type: ObjectId, ref: 'Meeting' }],
    avatar_url:{type:String}, 
}, { timestamps: true });

const Supplier = mongoose.model('Supplier', SupplierSchema);

module.exports = Supplier;