const Event = require("../models/Event.js");
const User = require("../models/User.js");
const Place = require("../models/Place.js");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, EMAILURL } = process.env;
const transporter = require("../config/nodemailer");

const EventController = {
    async create(req, res, next) {
        //Ponente pertenece a una empresa
        //La cuenta del ponente ya esta creada
        try {
            const { desc_event, id_place, date, hour, interests, speakerEmail, id_supplier, company } = req.body;
            let confirmed; 
            req.user.user_type == "admin" ? confirmed = true :confirmed=false 
            if (!speakerEmail) {
                return res.status(400).send({msg:"Complete the speaker email field"});
            }

            let user = await User.findOne({ email: speakerEmail });

            if (!user) {
                const password = await bcrypt.hash(speakerEmail, 10);
                user = await User.create({
                    user_type: "speaker",
                    password,
                    email: speakerEmail,
                    completed: false,
                    company: company,
                    id_supplier: id_supplier,
                });                
            }

            user.company = company;
            user.id_supplier = id_supplier;
            await user.save();

            const place = await Place.findById(id_place);
            if (!place) {
                return res.status(404).send({msg:"Place not found"});
            }
            
            const eventData = {
                speaker: user._id,
                desc_event,
                id_place: place._id,
                date,
                hour,
                interests,
                confirmed
            };

            if (company !== null && company !== undefined) {
                eventData.company = company;
            }

            if (user.id_supplier !== null && user.id_supplier !== undefined) {
                eventData.id_supplier = id_supplier;
            }
            const event = await Event.create(eventData);

            User.findByIdAndUpdate(user._id, { $push: { speaker_events: event._id } }).exec();
            const emailToken = jwt.sign({ email: speakerEmail }, JWT_SECRET, {
                expiresIn: "48h",
            });
            const url = `${EMAILURL}/users/confirm/${emailToken}`;
            // await transporter.sendMail({
            //     to: speakerEmail,
            //     subject: "¡Has sido invitado como ponente!",
            //     html: `
            //         <div style="font-family: Arial, sans-serif; color: #333;">
            //             <h2 style="color: #007BFF;">¡Bienvenido a Nuestro Evento!</h2>
            //             <p>Hola,</p>
            //             <p>Nos complace informarte que has sido invitado a participar como ponente en nuestro próximo evento. Estamos emocionados de contar con tu experiencia y conocimientos.</p>
            //             <p>Para completar tu registro y obtener acceso a la plataforma, por favor confirma tu cuenta haciendo clic en el enlace a continuación:</p>
            //             <div style="text-align: center; margin: 20px 0;">
            //                 <a href="${url}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007BFF; border-radius: 5px; text-decoration: none;">Confirmar mi cuenta</a>
            //             </div>
            //             <p>Si el botón anterior no funciona, copia y pega el siguiente enlace en tu navegador:</p>
            //             <p><a href="${url}">${url}</a></p>
            //             <p>Una vez que hayas confirmado tu cuenta, podrás completar tu perfil y obtener más información sobre el evento.</p>
            //             <h3 style="color: #007BFF;">Detalles del Evento</h3>
            //             <ul>
            //                 <li><strong>Descripción del evento:</strong> ${desc_event}</li>
            //                 <li><strong>Fecha:</strong> ${date}</li>
            //                 <li><strong>Hora:</strong> ${hour}</li>
            //                 <li><strong>Lugar:</strong> ${place.place_name}</li>
            //             </ul>
            //             <p>Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en contactarnos.</p>
            //             <p>Gracias y esperamos verte pronto.</p>
            //             <p>Saludos,</p>
            //             <p>El equipo del evento</p>
            //             <hr style="border: 0; border-top: 1px solid #ccc;">
            //             <p style="font-size: 12px; color: #777;">Este es un correo electrónico automático, por favor no responda a este mensaje.</p>
            //         </div>
            //     `,
            // });
            res.status(201).send({
                message: "Event created successfully",
                event,
                user
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
                user.eventsId.push(event._id);
                await event.save();
                await user.save();
            } else {
                return res.status(400).send({ message: 'User already registered' });
            }
            res.status(200).send({msg:"user added to event",event,user});
        } catch (error) {
            next(error);
        }
    },
    async removeUser(req, res, next) {
        const { id } = req.params;
        const userId = req.user.id;
        try {
            const event = await Event.findById(id);
            const user = await User.findById(userId);
            if (!event) {
                return res.status(404).send({ message: 'Event not found' });
            }
            if (event.id_users.includes(userId)) {
                event.id_users = event.id_users.filter((id) => id != userId);
                user.eventsId = user.eventsId.filter((id)=>id !=req.params.id)
                await event.save();
                await user.save();
            } else {
                return res.status(400).send({ message: 'User not registered' });
            }
            res.status(200).send({msg:"User "+user.name+" out of event : "+event.desc_event , 
                                  event,
                                  user
                                });
        } catch (error) {
            next(error);
        }
    },
    async sccore (req,res){
        try{
            
            const event = await Event.findById(req.params.id)
            event.score_array.push(req.body.score)
            event.score_avg= event.score_array.reduce((partialSum, a) => partialSum + a, 0) / event.score_array.length
            event.save()
            res.status(200).send({msg: "score added" , event});
        }catch(error){
            return res.status(400).send({ message: 'Event not found', error });
        }
    },
    async deleteEvent(req, res, next) {
        const { id } = req.params;
        const userId = req.user.id;
        try {
            let event = await Event.findById(id);
            const user = await User.findById(userId);
            if (!event) {
                return res.status(404).send({ message: 'Event not found' });
                }
            if (event.speaker == userId ) {
            user.speaker_events = user.speaker_events.filter((id)=> id !=event._id)
            await user.save();
            event = await Event.findByIdAndDelete(event._id)
            } else {
                return res.status(400).send({ message: "You aren't allowed to delete this event" });
            }
            res.status(200).send({msg:"User "+user.name+" deleted event : "+event.desc_event , 
                                  event,
                                  user
                                });
        } catch (error) {
            res.status(500).send({msg:"There was some problem removing the event : ",error});
        }
    },

};

module.exports = EventController;