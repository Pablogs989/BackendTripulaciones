const Event = require("../models/Event.js");
const User = require("../models/User.js");
require("dotenv").config();

const EventController = {
    async create(req, res, next) {
        try {
            const { speaker, desc_event, id_place, date, hour, interests, speakerEmail } = req.body;
            const newUser = await User.findOne({
                email: req.body.email,
            });
            if (!newUser) {
                if (!speakerEmail) {
                    return res.status(400).send("Complete the speaker email field");
                }
                const password = await bcrypt.hash(speakerEmail, 10);
                const user = await User.create({
                    ...req.body,
                    password,
                });
                res.status(201).send({
                    message:
                        "Welcome, you are one step away from registering, check your email to confirm your registration",
                    user,
                });
            } else {
                return res.status(400).send("User already exists");
            }            const event = await Event.create({
                speaker,
                desc_event,
                id_place,
                date,
                hour,
                interests,
            });
            res.status(201).send({
                message:
                    "Event created successfully",
                event,
            });

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