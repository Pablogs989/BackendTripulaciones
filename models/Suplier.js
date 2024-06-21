const mongoose = require('mongoose');

const SuplierSchema = new mongoose.Schema({
    cif: {
        type: String,
        required: [true, "Please fill in the CIF field"],
    },
    name: {
        type: String,
        required: [true, "Please fill in the name field"],
    },
    password: {
        type: String,
        required: [true, "Please fill in the password field"],
    },
    employes: {
        type: Number,
        required: [true, "Please fill in the employes field"],
    },
    tokens: [],
    confirmed: { type: Boolean }
    
}, { timestamps: true });

const Suplier = mongoose.model('Suplier', SuplierSchema);

module.exports = Suplier;