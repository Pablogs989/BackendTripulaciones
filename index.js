const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const {PORT} = process.env
const { dbConnection } = require("./config/config")

dbConnection()

app.use(express.json())
app.use(cors());


app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));

module.exports = app;