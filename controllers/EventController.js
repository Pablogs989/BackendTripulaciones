const Event = require("../models/Event.js");
const User = require("../models/User.js");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, EMAILURL } = process.env;
const transporter = require("../config/nodemailer");

const EventController = {
    async create(req, res, next) {
        try {
            const { desc_event, id_place, date, hour, interests, speakerEmail } = req.body;

            if (!speakerEmail) {
                return res.status(400).send("Complete the speaker email field");
            }
            const newUser = await User.findOne({
                email: speakerEmail,
            });

            if (!newUser) {
                const password = await bcrypt.hash(speakerEmail, 10);
                const user = await User.create({
                    user_type: "speaker",
                    password,
                    email: speakerEmail,
                    completed: false,
                });
                const emailToken = jwt.sign({ email: speakerEmail }, JWT_SECRET, {
                    expiresIn: "48h",
                });
                const url = EMAILURL + "/users/confirm/" + emailToken;
                await transporter.sendMail({
                    to: speakerEmail,
                    subject: "Has sido invitado como ponente!",
                    html: `<h3>Bienvenido, confirma tu cuenta y completa tus datos para acceder a la web</h3>
                    <a href="${url}"> Click your email to confirm your registration</a>`,
                })
                const event = await Event.create({
                    speaker: user,
                    desc_event,
                    id_place,
                    date,
                    hour,
                    interests,
                });
                res.status(201).send({
                    message:
                        "Event created successfully and speaker created successfully",
                    event,
                    user
                });
            } else {
                return res.status(400).send("User already exists");
            }
        } catch (error) {
            next(error);
        }
    },
    async getAll(req, res, next) {
        try {
            const events = await Event.find();
            res.status(200).send(events);
        } catch (error) {
            next(error);
        }
    },
    async update(req, res, next) {
        try {
            const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.send(event);
        }
        catch (error) {
            next(error);
        }
    },
    async delete(req, res, next) {
        try {
            await Event.findByIdAndDelete(req.params.id);
            res.send({ message: "Event deleted" });
        } catch (error) {
            next(error);
        }
    },
    async getEventById(req, res, next) {
        try {
            const event = await Event.findById(req.params.id)
            if (!event) {
                return res.status(404).send({
                    message: "Event not found",
                });
            }
            res.send(event);
        }
        catch (error) {
            next(error);
        }
    },

    async cancelEvent(req, res, next) {
        const { id } = req.params;
        try {
            const event = await Event.findByIdAndUpdate(
                id,
                { cancelled: true },
                { new: true }
            );
            res.send(event);
        }
        catch (error) {
            next(error);
        }
    },
    async getEventByDate(req, res, next) {
        try {
            const events = await Event.find({ date: req.body.date });
            res.send(events);
        } catch (error) {
            next(error);
        }
    },
    async addUser(req, res, next) {
        const { id } = req.params;
        const userId = req.user.id;
        try {
            const event = await Event.findById(id);
            const user = await User.findById(userId);
            if (!event) {
                return res.status(404).send({ message: 'Event not found' });
            }
            if (!event.id_users.includes(userId)) {
                event.id_users.push(userId);
                user.events.push(event._id);
                await event.save();
            } else {
                return res.status(400).send({ message: 'User already registered' });
            }
            res.status(200).send(event);
        } catch (error) {
            next(error);
        }
    },
    async removeUser(req, res, next) {
        const { id } = req.params;
        const userId = req.user.id;
        try {
            const event = await Event.findById(id);
            if (!event) {
                return res.status(404).send({ message: 'Event not found' });
            }
            if (event.id_users.includes(userId)) {
                event.id_users = event.id_users.filter((id) => id != userId);
                await event.save();
            } else {
                return res.status(400).send({ message: 'User not registered' });
            }
            res.status(200).send(event);
        } catch (error) {
            next(error);
        }
    }

};

module.exports = EventController;