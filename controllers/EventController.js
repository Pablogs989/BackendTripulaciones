const Event = require("../models/Event.js");
require("dotenv").config();

const EventController = {
    async create(req, res, next) {
        try {
            const event = await Suplier.create({
                ...req.body,
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

};

module.exports = EventController;