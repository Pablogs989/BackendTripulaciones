const nodemailer = require('nodemailer');
require("dotenv").config();
const { MAIL, PASS } = process.env

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: MAIL,
        pass: PASS
    }
});
module.exports = transporter;