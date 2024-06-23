const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { PORT } = process.env;
const { dbConnection } = require("./config/config");

dbConnection();

app.use(express.json());
app.use(cors());

app.use("/users", require("./routes/users"));
app.use("/supliers", require("./routes/supliers"));
app.use("/meetings", require("./routes/meetings"));
app.use("/events", require("./routes/events"));
app.use('/places', require('./routes/places'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
