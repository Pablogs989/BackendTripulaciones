const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET, EMAILURL } = process.env;
const transporter = require("../config/nodemailer");
const { uploadImageToImgur } = require('../config/imgurUploader.js');
const path = require('path');

const UserController = {
    async register(req, res, next) {
        try {
            const newUser = await User.findOne({
                email: req.body.email,
            });
            if (!newUser) {
                if (!req.body.password) {
                    return res.status(400).send({msg:"Complete the password field"});
                }
                if (!req.file) {
                    req.body.avatar_url = false;
                } else {
                    req.body.avatar_url = req.file.filename;
                    const staticDir = path.join(req.file.destination);
                    const imagePath = path.join(staticDir, req.file.filename);
                    const mainDirPath = path.join(__dirname, '..');
                    req.body.avatar_url = await uploadImageToImgur(mainDirPath +"/"+imagePath) || req.file.filename
                    
                }
                const password = await bcrypt.hash(req.body.password, 10);
                const user = await User.create({
                    ...req.body,
                    password,
                });
                const emailToken = jwt.sign({ email: req.body.email }, JWT_SECRET, {
                    expiresIn: "48h",
                });
                const url = EMAILURL + "/users/confirm/" + emailToken;
                // await transporter.sendMail({
                //     to: req.body.email,
                //     subject: "Confirmación de registro de tu cuenta",
                //     html: `
                //         <div style="font-family: Arial, sans-serif; color: #333;">
                //             <h2 style="color: #007BFF;">¡Bienvenido a Nuestra Comunidad!</h2>
                //             <p>Hola,</p>
                //             <p>Nos alegra que hayas decidido unirte a nuestra comunidad. Estás a solo un paso de completar tu registro.</p>
                //             <p>Para confirmar tu cuenta y activar tu perfil, por favor haz clic en el siguiente enlace:</p>
                //             <div style="text-align: center; margin: 20px 0;">
                //                 <a href="${url}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007BFF; border-radius: 5px; text-decoration: none;">Confirmar mi cuenta</a>
                //             </div>
                //             <p>Si el botón anterior no funciona, copia y pega el siguiente enlace en tu navegador:</p>
                //             <p><a href="${url}">${url}</a></p>
                //             <p>Una vez que hayas confirmado tu cuenta, podrás acceder a todas nuestras funcionalidades y servicios.</p>
                //             <h3 style="color: #007BFF;">¿Qué puedes esperar?</h3>
                //             <ul>
                //                 <li>Acceso a contenido exclusivo.</li>
                //                 <li>Participación en eventos y webinars.</li>
                //                 <li>Conexión con otros miembros de la comunidad.</li>
                //                 <li>Y mucho más...</li>
                //             </ul>
                //             <p>Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en contactarnos.</p>
                //             <p>Gracias por unirte y esperamos verte pronto en nuestra plataforma.</p>
                //             <p>Saludos,</p>
                //             <p>El equipo de [Nombre de tu organización]</p>
                //             <hr style="border: 0; border-top: 1px solid #ccc;">
                //             <p style="font-size: 12px; color: #777;">Este es un correo electrónico automático, por favor no responda a este mensaje.</p>
                //         </div>
                //     `,
                // });
                
                res.status(201).send({
                    message:
                        "Welcome, you are one step away from registering, check your email to confirm your registration",
                    user,
                });
            } else {
                return res.status(400).send("User already exists");
            }

        } catch (error) {
            next(error);
        }
    },
    async confirm(req, res) {
        try {
            const token = req.params.emailToken;
            const payload = jwt.verify(token, JWT_SECRET);
            const email = await User.findOne({ email: payload.email });
            await User.findByIdAndUpdate(email._id, { confirmed: true });
            res.status(201).send({ message: "User confirmed" });
        } catch (error) {
            console.error(error);
        }
    },
    async login(req, res, next) {
        try {
            const user = await User.findOne({
                email: req.body.email,
            })
            .populate('ids_meetings')
            .populate('ids_meetings_atendee')
            .populate('speaker_events')
            .populate('id_supplier')
            if (!user) {
                return res.status(400).send("Invalid email or password");
            }
            if (
                !req.body.password ||
                !bcrypt.compareSync(req.body.password, user.password)
            ) {
                return res.status(400).send("Invalid email or password");
            }
            if (!user.confirmed) {
                return res
                    .status(400)
                    .send({ message: "You should confirm your email" });
            }
            const token = jwt.sign({ _id: user._id }, JWT_SECRET);
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.status(200).send({
                message: "Welcome " + user.name,
                token,
                user,
            });
        } catch (error) {
            next(error);
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params._id)
            .populate('ids_meetings')
            .populate('ids_meetings_atendee')
            .populate('speaker_events')
            .populate('id_supplier')
            res.send({ message: 'Your user', user })
        } catch (error) {
            next(error);
        }
    },
    async logout(req, res) {
        try {
            await User.findByIdAndUpdate(req.user._id, {
                $pull: { tokens: req.headers.authorization },
            });
            res.send({ message: "Logged out" });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem logging out the user",
            });
        }
    },
    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.send(users);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem getting the users",
            });
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id)
            if (!user) {
                return res.status(404).send({
                    message: "User not found",
                });
            }
            res.send(user);
        }
        catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem getting the user",
            });
        }
    },
    async updateUser(req, res) {
        try {
            if (req.file) {
                req.body.avatar_url = req.file.filename;
                const staticDir = path.join(req.file.destination);
                const imagePath = path.join(staticDir, req.file.filename);
                const mainDirPath = path.join(__dirname, '..');
                req.body.avatar_url = await uploadImageToImgur(mainDirPath +"/"+imagePath) || req.file.filename
            }
            const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
            res.send(user);
        }
        catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem updating the user",
            });
        }
    },
    async deleteUser(req, res) {
        try {
            await User.findByIdAndDelete(req.user._id);
            res.send({ message: "User deleted" });
        }
        catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem deleting the user",
            });
        }
    }
};

module.exports = UserController;