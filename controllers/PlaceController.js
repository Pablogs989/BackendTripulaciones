const Place = require("../models/Place.js");

const PlaceController = {
    async create(req, res, next) {
        try {
            const place = await Place.create({
                ...req.body,
            });
            res.status(201).send({
                message:
                    "Place created successfully",
                    place,
            });

        } catch (error) {
            next(error);
        }
    },
    async getAll(req, res, next) {
        try {
            const place = await Place.find();
            res.status(200).send(place);
        } catch (error) {
            next(error);
        }
    },
    async update(req, res, next) {
        try {
            const place = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.send(place);    
        }
        catch (error) {
            next(error);
        }
    },
    async delete(req, res, next) {
        try {
            await Place.findByIdAndDelete(req.params.id);
            res.send({ message: "Place deleted" });
        } catch (error) {
            next(error);
        }
    },
    async getPlaceById(req, res, next) {
        try {
            const place = await Place.findById(req.params.id)
            .populate("events");
            if (!place) {
                return res.status(404).send({
                    message: "Place not found",
                });
            }
            res.send(place);
        }
        catch (error) {
            next(error);
        }
    },
    async addEvent(req, res, next) {
        try {
            const place = await Place.findById(req.params.id);
            if (!place) {
                return res.status(404).send({
                    message: "Place not found",
                });
            }
            if (place.events.includes(req.body.eventId)) {
                return res.status(400).send({
                    message: "Event already added",
                });
            }
            place.events.push(req.body.eventId);
            await place.save();
            res.send({
                message:
                    "Event added successfully",
                    place,
            });
        } catch (error) {
            next(error);
        }
    },
    async removeEvent(req, res, next) {
        try {
            const place = await Place.findById(req.params.id);
            if (!place) {
                return res.status(404).send({
                    message: "Place not found",
                });
            }
            if (!place.events.includes(req.body.eventId)) {
                return res.status(400).send({
                    message: "Event not found",
                });
            }
            place.events = place.events.filter(
                (event) => event.toString() !== req.body.eventId
            );
            await place.save();

            res.send({
                message:
                    "Event removed successfully",
                    place,
            });
        } catch (error) {
            next(error);
        }
    },

};

module.exports = PlaceController;