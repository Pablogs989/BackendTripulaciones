const User = require('../models/User');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { JWT_SECRET } = process.env

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ _id: payload._id, tokens: token });
        if (!user) {
            return res.status(401).send({ message: 'You are not authorized' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'There was a problem with the token' })
    }
}
const isAdmin = async (req, res, next) => {
    const admins = ['admin', 'superadmin'];
    if (!admins.includes(req.user.role)) {
        return res.status(403).send({
            message: "You don't have permits"
        });
    }
    next();
}

module.exports = { authentication, isAdmin };